/* The Way — sound. Everything is synthesized live with Web Audio, so there are no sound files to load.
   Music: a plucked lyre (kinnor), a reed flute, a low drone and a frame drum, in modes chosen per mood.
   Ambience: layered beds (waves, wind, birds, crowd, room, night, fire, storm) cross-faded per scene. */
window.TW = window.TW || {};
(function (TW) {
  const A = { on: true, ready: false };
  const KEY = 'the-way.sound';
  try { A.on = localStorage.getItem(KEY) !== 'off'; } catch (e) { /* storage unavailable */ }

  let ctx = null, master, musicBus, musicFilter, ambBus, sfxBus, reverb, noiseBuf, timer = null;
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ---------- setup ----------
  function impulse(sec, decay) {
    const len = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return b;
  }
  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 4;
    master = ctx.createGain(); master.gain.value = 0.9;
    master.connect(comp); comp.connect(ctx.destination);
    reverb = ctx.createConvolver(); reverb.buffer = impulse(3.4, 2.4);
    const revOut = ctx.createGain(); revOut.gain.value = 0.5;
    reverb.connect(revOut); revOut.connect(master);
    musicBus = ctx.createGain(); musicBus.gain.value = 0.2;
    musicFilter = ctx.createBiquadFilter(); musicFilter.type = 'lowpass'; musicFilter.frequency.value = 16000;
    musicBus.connect(musicFilter); musicFilter.connect(master);
    const mRev = ctx.createGain(); mRev.gain.value = 0.55; musicFilter.connect(mRev); mRev.connect(reverb);
    ambBus = ctx.createGain(); ambBus.gain.value = 0.42; ambBus.connect(master);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.55; sfxBus.connect(master);
    const sRev = ctx.createGain(); sRev.gain.value = 0.3; sfxBus.connect(sRev); sRev.connect(reverb);
    const len = ctx.sampleRate * 2;
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    A.ready = true;
    timer = setInterval(tick, 60);
    return true;
  }
  const noise = () => { const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; s.start(0, Math.random() * 1.9); return s; };
  const filt = (type, f, q) => { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; return b; };
  const gain = (v) => { const g = ctx.createGain(); g.gain.value = v; return g; };
  const lfo = (rate, depth, target, offset) => {
    const o = ctx.createOscillator(); o.frequency.value = rate; const g = gain(depth); o.connect(g); g.connect(target);
    if (offset !== undefined) target.value = offset;
    o.start(); return o;
  };

  // Unlock on a user gesture (iOS requires it). Ask Safari to play even when the ringer switch is off.
  A.unlock = function () {
    if (!A.on) return;
    if (!ctx && !build()) return;
    if (ctx.state === 'suspended') ctx.resume();
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* not supported */ }
    const lv = Object.assign({}, levels);
    if (Object.keys(lv).length) A.amb(lv);
    if (pending) { const p = pending; pending = null; A.scene(p); }
  };
  A.setOn = function (on) {
    A.on = on;
    try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) { /* ignore */ }
    if (on) { A.unlock(); if (ctx) master.gain.setTargetAtTime(0.9, ctx.currentTime, 0.3); }
    else if (ctx) master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
  };
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend(); else if (A.on) ctx.resume();
  });

  // ---------- ambience beds ----------
  const BED_VOL = { shore: 0.9, wind: 0.6, crowd: 0.55, room: 0.7, storm: 1.1, fire: 0.5, birds: 1, night: 1 };
  const beds = {};
  const levels = {};
  const makeBed = {
    shore() {
      const out = gain(0), g1 = gain(0.5), g2 = gain(0.1);
      noise().connect(filt('lowpass', 520)).connect(g1); lfo(0.11, 0.4, g1.gain, 0.55);
      noise().connect(filt('bandpass', 2400, 0.6)).connect(g2); lfo(0.11, 0.09, g2.gain, 0.1);
      g1.connect(out); g2.connect(out); return out;
    },
    wind() {
      const out = gain(0), bp = filt('bandpass', 500, 0.8), g = gain(0.5);
      noise().connect(bp).connect(g).connect(out); lfo(0.06, 260, bp.frequency, 520); lfo(0.13, 0.25, g.gain, 0.45);
      return out;
    },
    crowd() {
      const out = gain(0), lp = filt('lowpass', 1800);
      lp.connect(out);
      const voices = [];
      for (let i = 0; i < 4; i++) {
        const bp = filt('bandpass', rand(350, 1100), 5), g = gain(0.3);
        noise().connect(bp).connect(g).connect(lp); voices.push({ bp, g });
      }
      out.voices = voices; return out;
    },
    room() { const out = gain(0); noise().connect(filt('lowpass', 170)).connect(gain(0.9)).connect(out); return out; },
    storm() {
      const out = gain(0), howl = filt('bandpass', 700, 3);
      noise().connect(filt('lowpass', 1100)).connect(gain(0.8)).connect(out);
      noise().connect(filt('highpass', 4200)).connect(gain(0.3)).connect(out);
      noise().connect(howl).connect(gain(0.5)).connect(out); lfo(0.17, 300, howl.frequency, 650);
      return out;
    },
    fire() { const out = gain(0); noise().connect(filt('lowpass', 260)).connect(gain(0.6)).connect(out); return out; },
    birds() { return gain(0); },
    night() { return gain(0); },
  };
  A.amb = function (lv) {
    Object.keys(BED_VOL).forEach((name) => {
      const v = lv[name] || 0;
      levels[name] = v;
      if (!ctx) return;
      if (v > 0 && !beds[name]) { beds[name] = makeBed[name](); beds[name].connect(ambBus); }
      if (beds[name]) beds[name].gain.setTargetAtTime(v * BED_VOL[name], ctx.currentTime, 1.1);
    });
  };

  // ---------- music ----------
  const DOR = [0, 2, 3, 5, 7, 9, 10], PHR = [0, 1, 3, 5, 7, 8, 10], PDOM = [0, 1, 4, 5, 7, 8, 10], MIX = [0, 2, 4, 5, 7, 9, 10], AEO = [0, 2, 3, 5, 7, 8, 10];
  const MOODS = {
    title: { root: 62, mode: DOR, bpm: 64, drone: [38, 45], lyre: 0.75, flute: 0.7, drum: 0, theme: true },
    galilee: { root: 62, mode: DOR, bpm: 70, drone: [38, 45], lyre: 0.8, flute: 0.5, drum: 0 },
    land: { root: 62, mode: DOR, bpm: 58, drone: [38, 45], lyre: 0.55, flute: 0.45, drum: 0 },
    reflect: { root: 64, mode: DOR, bpm: 56, drone: [40, 47], lyre: 0.5, flute: 0.35, drum: 0 },
    tension: { root: 62, mode: PHR, bpm: 54, drone: [38], lyre: 0.35, flute: 0, drum: 0.5, heart: true },
    wonder: { root: 67, mode: MIX, bpm: 58, drone: [43, 50], lyre: 0.55, flute: 0.8, drum: 0, pad: true },
    lament: { root: 62, mode: PDOM, bpm: 50, drone: [38, 45], lyre: 0.3, flute: 0.85, drum: 0 },
    jerusalem: { root: 57, mode: AEO, bpm: 76, drone: [33, 40], lyre: 0.8, flute: 0.45, drum: 0.75 },
    night: { root: 62, mode: DOR, bpm: 48, drone: [38], lyre: 0.3, flute: 0.2, drum: 0 },
    storm: { root: 62, mode: PHR, bpm: 96, drone: [38, 39], lyre: 0, flute: 0, drum: 1, roll: true },
    silence: { root: 62, mode: DOR, bpm: 60, drone: [], lyre: 0, flute: 0, drum: 0 },
  };
  const THEME = [[0, 1], [2, 1], [3, 1], [4, 2], [6, 1], [4, 1], [3, 1], [4, 3], [2, 1], [3, 1], [1, 1], [0, 4]];
  let mood = null, moodName = null, drone = null, nextBeat = 0, beat = 0, fluteBusyUntil = 0, themePlayed = false;
  const note = (M, deg, oct) => {
    const n = M.mode.length, d = ((deg % n) + n) % n, o = Math.floor(deg / n);
    return M.root + M.mode[d] + 12 * (o + (oct || 0));
  };

  function pluck(m, t, v, bus) {
    const f = mtof(m), o = ctx.createOscillator(), o2 = ctx.createOscillator(), g2 = gain(0.22);
    o.type = 'triangle'; o.frequency.value = f; o2.type = 'sawtooth'; o2.frequency.value = f * 1.003;
    const lp = filt('lowpass', Math.min(9000, f * 9));
    lp.frequency.setValueAtTime(Math.min(9000, f * 9), t); lp.frequency.exponentialRampToValueAtTime(Math.max(300, f * 1.4), t + 0.7);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.9);
    o.connect(lp); o2.connect(g2); g2.connect(lp); lp.connect(g); g.connect(bus || musicBus);
    o.start(t); o2.start(t); o.stop(t + 2); o2.stop(t + 2);
  }
  function flute(m, t, d, v) {
    const f = mtof(m), o = ctx.createOscillator(), o2 = ctx.createOscillator(), g2 = gain(0.07);
    o.type = 'sine'; o.frequency.value = f; o2.type = 'triangle'; o2.frequency.value = f * 2;
    const vib = ctx.createOscillator(), vg = ctx.createGain();
    vib.frequency.value = 5.2; vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(f * 0.006, t + Math.min(0.5, d));
    vib.connect(vg); vg.connect(o.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.12); g.gain.setValueAtTime(v, t + d); g.gain.linearRampToValueAtTime(0.0001, t + d + 0.25);
    const br = noise(), bg = ctx.createGain();
    bg.gain.setValueAtTime(0, t); bg.gain.linearRampToValueAtTime(v * 0.12, t + 0.08); bg.gain.linearRampToValueAtTime(0, t + d + 0.25);
    br.connect(filt('bandpass', f * 1.5, 1.2)).connect(bg); bg.connect(musicBus);
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(musicBus);
    [o, o2, vib].forEach((x) => { x.start(t); x.stop(t + d + 0.35); }); br.stop(t + d + 0.35);
  }
  function pad(ms, t, d, v) {
    ms.forEach((m) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = mtof(m);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 1.4); g.gain.linearRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(musicBus); o.start(t); o.stop(t + d + 0.1);
    });
  }
  function drum(kind, t, v) {
    if (kind === 'doum') {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(115, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.25);
      g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.connect(g); g.connect(musicBus); o.start(t); o.stop(t + 0.55);
    } else {
      const n = noise(), g = ctx.createGain();
      g.gain.setValueAtTime(v * 0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      n.connect(filt('highpass', 2200)).connect(g); g.connect(musicBus); n.stop(t + 0.1);
    }
  }
  function startDrone(notes) {
    const out = ctx.createGain(); out.gain.value = 0.0001; out.connect(musicBus);
    const lp = filt('lowpass', 420); lp.connect(out);
    const oscs = [];
    notes.forEach((m) => [-5, 5].forEach((c) => {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = c;
      o.connect(lp); o.start(); oscs.push(o);
    }));
    out.gain.setTargetAtTime(notes.length ? 0.075 : 0.0001, ctx.currentTime, 1.6);
    return { stop() { out.gain.setTargetAtTime(0.0001, ctx.currentTime, 1.2); oscs.forEach((o) => o.stop(ctx.currentTime + 6)); } };
  }
  A.music = function (name) {
    if (!MOODS[name]) return;
    if (!ctx) { pending = Object.assign(pending || {}, { music: name }); return; }
    if (name === moodName && mood) return;
    moodName = name;
    mood = MOODS[name];
    if (drone) drone.stop();
    drone = startDrone(mood.drone);
    if (nextBeat < ctx.currentTime) nextBeat = ctx.currentTime + 0.1;
  };
  A.memory = function (on) {
    if (!ctx) return;
    musicFilter.frequency.setTargetAtTime(on ? 1100 : 16000, ctx.currentTime, 0.5);
    ambBus.gain.setTargetAtTime(on ? 0.22 : 0.42, ctx.currentTime, 0.5);
  };

  function scheduleBeat(t) {
    const M = mood, spb = 60 / M.bpm, b = beat % 4;
    if (M.lyre > 0) {
      if (b === 0) pluck(note(M, 0, -1), t, 0.16 * M.lyre);
      [0, 0.5].forEach((off) => {
        if (Math.random() < M.lyre * 0.55) pluck(note(M, pick([0, 2, 4, 4, 7, 2]), 0), t + off * spb, rand(0.06, 0.11) * M.lyre);
      });
    }
    if (M.drum > 0) {
      if (M.roll) { for (let i = 0; i < 4; i++) if (Math.random() < 0.7) drum(i % 2 ? 'tek' : 'doum', t + (i * spb) / 4, 0.25 * M.drum); }
      else if (M.heart) { if (b === 0) { drum('doum', t, 0.3 * M.drum); drum('doum', t + spb * 0.32, 0.18 * M.drum); } }
      else { if (b === 0 || b === 2) drum('doum', t, 0.3 * M.drum); if (b === 1 || b === 3) drum('tek', t + spb * 0.5, 0.25 * M.drum); }
    }
    if (M.pad && b === 0 && beat % 8 === 0) pad([note(M, 0, -1), note(M, 2, -1), note(M, 4, -1)], t, spb * 8, 0.035);
    if (M.flute > 0 && b === 0 && t > fluteBusyUntil) {
      if (M.theme && !themePlayed) {
        themePlayed = true;
        let tt = t;
        THEME.forEach((n) => { flute(note(M, n[0], 0), tt, n[1] * spb * 0.95, 0.12); tt += n[1] * spb; });
        fluteBusyUntil = tt + spb * 4;
      } else if (Math.random() < M.flute * 0.65) {
        let deg = pick([2, 4, 7]), tt = t;
        const len = 3 + Math.floor(Math.random() * 4);
        for (let i = 0; i < len; i++) {
          const dur = pick([1, 1, 2, 0.5]) * spb;
          flute(note(M, deg, 0), tt, dur * 0.95, 0.1);
          tt += dur; deg += pick([-2, -1, -1, 1, 1, 2]);
          deg = Math.max(-1, Math.min(9, deg));
        }
        flute(note(M, pick([0, 4]), 0), tt, spb * 2, 0.09);
        fluteBusyUntil = tt + spb * (4 + Math.floor(Math.random() * 6));
      }
    }
  }

  // ---------- ambient events and the scheduler ----------
  function chirp(t) {
    const o = ctx.createOscillator(), g = ctx.createGain(), base = rand(2600, 4200), n = 2 + Math.floor(Math.random() * 4);
    o.type = 'sine';
    g.gain.setValueAtTime(0.0001, t);
    for (let i = 0; i < n; i++) {
      const s = t + i * 0.09;
      o.frequency.setValueAtTime(base, s); o.frequency.exponentialRampToValueAtTime(base * rand(1.2, 1.6), s + 0.05);
      g.gain.setValueAtTime(0.0001, s); g.gain.linearRampToValueAtTime(0.05, s + 0.01); g.gain.linearRampToValueAtTime(0.0001, s + 0.06);
    }
    o.connect(g); g.connect(ambBus); o.start(t); o.stop(t + n * 0.09 + 0.1);
  }
  function cricket(t) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = rand(4300, 4700); g.gain.value = 0.0001;
    for (let i = 0; i < 3; i++) { const s = t + i * 0.045; g.gain.setValueAtTime(0.025, s); g.gain.setValueAtTime(0.0001, s + 0.025); }
    o.connect(g); g.connect(ambBus); o.start(t); o.stop(t + 0.2);
  }
  function crackle(t, v) {
    const n = noise(), g = ctx.createGain();
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    n.connect(filt('highpass', 1800)).connect(g); g.connect(ambBus); n.stop(t + 0.04);
  }
  let last = 0;
  function tick() {
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime, dt = last ? now - last : 0.06;
    last = now;
    if ((levels.birds || 0) > 0 && Math.random() < dt * 0.45 * levels.birds) chirp(now + rand(0, 0.2));
    if ((levels.night || 0) > 0 && Math.random() < dt * 1.2 * levels.night) cricket(now + rand(0, 0.2));
    if ((levels.fire || 0) > 0 && Math.random() < dt * 6 * levels.fire) crackle(now + rand(0, 0.1), 0.06);
    if ((levels.room || 0) > 0 && Math.random() < dt * 0.25 * levels.room) crackle(now + rand(0, 0.1), 0.02);
    if (beds.crowd && (levels.crowd || 0) > 0) beds.crowd.voices.forEach((v) => {
      if (Math.random() < dt * 3) { v.bp.frequency.setTargetAtTime(rand(300, 1200), now, 0.08); v.g.gain.setTargetAtTime(rand(0.1, 0.45), now, 0.1); }
    });
    if (mood) {
      while (nextBeat < now + 0.25) {
        if (nextBeat < now - 0.5) nextBeat = now + 0.05;
        scheduleBeat(nextBeat);
        nextBeat += 60 / mood.bpm; beat++;
      }
    }
  }

  // ---------- scenes ----------
  let pending = null;
  A.scene = function (cfg) {
    if (!cfg) return;
    if (!ctx) { pending = Object.assign(pending || {}, cfg); if (cfg.amb) A.amb(cfg.amb); return; }
    if (cfg.music) A.music(cfg.music);
    if (cfg.amb) A.amb(cfg.amb);
  };

  // ---------- effects ----------
  const burst = (t, f0, f1, dur, v, type) => {
    const n = noise(), b = filt(type || 'bandpass', f0, 0.9), g = ctx.createGain();
    if (f1 !== f0) b.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + Math.min(0.03, dur / 4)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    n.connect(b).connect(g); g.connect(sfxBus); n.stop(t + dur + 0.05);
  };
  const SFX = {
    tap(t) { pluck(79, t, 0.05, sfxBus); },
    page(t) { burst(t, 3200, 2400, 0.06, 0.05); },
    chime(t) { pluck(86, t, 0.07, sfxBus); pluck(93, t + 0.12, 0.05, sfxBus); },
    whoosh(t) { burst(t, 350, 1400, 0.45, 0.06); },
    dig(t) { for (let i = 0; i < 4; i++) burst(t + i * 0.18 + rand(0, 0.05), 700, 400, 0.12, 0.12, 'lowpass'); },
    crumble(t) { burst(t, 900, 200, 0.9, 0.25, 'lowpass'); for (let i = 0; i < 6; i++) burst(t + rand(0, 0.6), 2400, 1200, 0.05, 0.08); },
    crash(t) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(50, t + 0.2);
      g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35); o.connect(g); g.connect(sfxBus); o.start(t); o.stop(t + 0.4);
      burst(t, 1600, 500, 0.35, 0.25, 'lowpass');
    },
    coins(t) {
      for (let i = 0; i < 9; i++) {
        const s = t + 0.05 + i * rand(0.04, 0.11), o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'square'; o.frequency.value = rand(2800, 4200);
        g.gain.setValueAtTime(0.03, s); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.12); o.connect(g); g.connect(sfxBus); o.start(s); o.stop(s + 0.13);
      }
    },
    flutter(t) { for (let i = 0; i < 14; i++) burst(t + i * 0.045, 1500, 1200, 0.035, 0.07); },
    splash(t) { burst(t, 1400, 260, 0.8, 0.3); },
    thunder(t) { burst(t, 3000, 800, 0.15, 0.22, 'highpass'); burst(t + 0.05, 220, 60, 2.6, 0.6, 'lowpass'); },
    cheer(t) {
      const n = noise(), b = filt('bandpass', 900, 0.7), g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.22, t + 0.5); g.gain.linearRampToValueAtTime(0.0001, t + 2.4);
      n.connect(b).connect(g); g.connect(sfxBus); n.stop(t + 2.5);
      b.frequency.setValueAtTime(700, t); b.frequency.linearRampToValueAtTime(1300, t + 0.6);
    },
    rooster(t) {
      const o = ctx.createOscillator(), g = ctx.createGain(), lp = filt('lowpass', 2600);
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(520, t); o.frequency.linearRampToValueAtTime(760, t + 0.15); o.frequency.setValueAtTime(760, t + 0.5);
      o.frequency.linearRampToValueAtTime(820, t + 0.6); o.frequency.linearRampToValueAtTime(480, t + 1.1);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.07, t + 0.05); g.gain.setValueAtTime(0.07, t + 0.95); g.gain.linearRampToValueAtTime(0.0001, t + 1.15);
      o.connect(lp).connect(g); g.connect(sfxBus); o.start(t); o.stop(t + 1.2);
    },
  };
  A.sfx = function (name, delay) {
    if (!ctx || !A.on || ctx.state !== 'running' || !SFX[name]) return;
    SFX[name](ctx.currentTime + 0.01 + (delay || 0));
  };

  // output level, for testing and an optional meter
  let analyser = null;
  A.level = function () {
    if (!ctx) return 0;
    if (!analyser) { analyser = ctx.createAnalyser(); analyser.fftSize = 2048; master.connect(analyser); }
    const d = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(d);
    let s = 0; for (let i = 0; i < d.length; i++) s += d[i] * d[i];
    return Math.sqrt(s / d.length);
  };

  TW.Audio = A;
})(window.TW);
