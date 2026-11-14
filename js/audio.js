/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — sound. Everything is synthesized live with Web Audio, so there are no sound files to load.
   Music: a plucked lyre (kinnor), a reed flute, a low drone and a frame drum, in modes chosen per mood.
   Ambience: layered beds (waves, wind, birds, crowd, room, night, fire, storm) cross-faded per scene. */
window.TW = window.TW || {};
(function (TW) {
  const A = { on: true, ready: false };
  const KEY = 'the-way.sound';
  try { A.on = localStorage.getItem(KEY) !== 'off'; } catch (e) { /* storage unavailable */ }

  let ctx = null, master, musicBus, musicFilter, musicUser, ambBus, ambOut, ambUser, sfxBus, reverb, noiseBuf, brownBuf, timer = null;
  // the player's own levels (Settings → Sound): off, soft or full for background sounds; quiet, normal or loud for music
  const LEVELS = { off: 0, soft: 0.45, full: 1, quiet: 0.55, normal: 1, loud: 1.45 };
  const userLevel = (k) => { const v = TW.Settings && TW.Settings.get(k); return v in LEVELS ? LEVELS[v] : 1; };
  A.applyLevels = function () {
    if (!ctx) return;
    ambUser.gain.setTargetAtTime(userLevel('ambience'), ctx.currentTime, 0.3);
    musicUser.gain.setTargetAtTime(userLevel('musicLevel'), ctx.currentTime, 0.3);
  };
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ---------- setup ----------
  // A warm room: the echo is darkened noise (a one-pole lowpass, about 1.4 kHz) so its tail never hisses.
  function impulse(sec, decay) {
    const len = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, len, ctx.sampleRate);
    const k = Math.min(0.5, (2 * Math.PI * 1400) / ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c);
      let lp = 0;
      for (let i = 0; i < len; i++) {
        lp += ((Math.random() * 2 - 1) - lp) * k;
        const env = Math.pow(1 - i / len, decay) * Math.min(1, i / (ctx.sampleRate * 0.01));
        d[i] = lp * env * 2.4;
      }
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
    reverb = ctx.createConvolver(); reverb.buffer = impulse(2.4, 2.8);
    const revOut = ctx.createGain(); revOut.gain.value = 0.5;
    reverb.connect(revOut); revOut.connect(master);
    musicBus = ctx.createGain(); musicBus.gain.value = 0.2;
    musicFilter = ctx.createBiquadFilter(); musicFilter.type = 'lowpass'; musicFilter.frequency.value = 16000;
    musicUser = ctx.createGain(); musicUser.gain.value = userLevel('musicLevel');
    musicBus.connect(musicFilter); musicFilter.connect(musicUser); musicUser.connect(master);
    const mRev = ctx.createGain(); mRev.gain.value = 0.55; musicUser.connect(mRev); mRev.connect(reverb);
    ambBus = ctx.createGain(); ambBus.gain.value = 0.34;
    // background sounds are kept low and dark (2.2 kHz), so nothing in them reads as static on a phone speaker
    ambOut = ctx.createBiquadFilter(); ambOut.type = 'lowpass'; ambOut.frequency.value = 2200; ambOut.Q.value = 0.5;
    ambUser = ctx.createGain(); ambUser.gain.value = userLevel('ambience');
    ambBus.connect(ambOut); ambOut.connect(ambUser); ambUser.connect(master);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.55; sfxBus.connect(master);
    const sRev = ctx.createGain(); sRev.gain.value = 0.3; sfxBus.connect(sRev); sRev.connect(reverb);
    const len = ctx.sampleRate * 8;
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    brownBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0), br = brownBuf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0, sm = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      last = (last + 0.02 * w) / 1.02; sm += (last - sm) * 0.06; br[i] = sm * 3.5;
    }
    // fade the loop seam so the repeat point is silent
    const fade = Math.floor(ctx.sampleRate * 0.05);
    for (let i = 0; i < fade; i++) { const k = i / fade; d[i] *= k; d[len - 1 - i] *= k; br[i] *= k; br[len - 1 - i] *= k; }
    A.ready = true;
    timer = setInterval(tick, 60);
    return true;
  }
  const noise = (brown) => { const s = ctx.createBufferSource(); s.buffer = brown ? brownBuf : noiseBuf; s.loop = true; s.start(0, Math.random() * 7.5); return s; };
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
    if (Object.keys(base).length) applyLevels(travelLevels());
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

  // ---------- ambience ----------
  // Continuous layers are only low, soft textures (brown noise, never hiss). Everything you can pick out is a distinct
  // event: a wave on the stones, a voice, a hammer, a dove, a dog, a footstep. Each layer has its own gain node.
  const BED_VOL = { shore: 1, wind: 0.5, crowd: 1, room: 0.7, storm: 1.1, fire: 0.5, birds: 1, night: 1, city: 1, village: 1, doves: 1, steps: 1, oars: 1, market: 1, pasture: 1, desert: 1 };
  const beds = {};
  const levels = {};
  let base = {};
  const makeBed = {
    wind() {
      const out = gain(0), lp = filt('lowpass', 300), lp2 = filt('lowpass', 300), g = gain(0.3);
      noise(true).connect(lp).connect(lp2).connect(g).connect(out);
      lfo(0.05, 0.06, g.gain, 0.26); lfo(0.09, 40, lp.frequency, 280);
      return out;
    },
    // a quiet room is quiet: no continuous layer at all (a low rumble on a phone speaker is heard only as static)
    storm() {
      const out = gain(0), g = gain(0.8);
      noise(true).connect(filt('lowpass', 900)).connect(g).connect(out); lfo(0.17, 0.3, g.gain, 0.75);
      noise().connect(filt('bandpass', 1400, 0.5)).connect(gain(0.08)).connect(out);
      return out;
    },
    // a fire is its occasional soft pops, and a crowd is many separate voices: both are events, with no bed under them
  };
  const eventBed = () => gain(0);
  function applyLevels(lv) {
    Object.keys(BED_VOL).forEach((name) => {
      const v = lv[name] || 0;
      levels[name] = v;
      if (!ctx) return;
      if (v > 0 && !beds[name]) { beds[name] = (makeBed[name] || eventBed)(); beds[name].connect(ambBus); }
      if (beds[name]) beds[name].gain.setTargetAtTime(v * BED_VOL[name], ctx.currentTime, 1.1);
    });
  }
  let travelMode = '';
  A.amb = function (lv) { base = Object.assign({}, lv); applyLevels(travelLevels()); };
  function travelLevels() {
    const lv = Object.assign({}, base);
    if (travelMode === 'walk') lv.steps = 0.9;
    if (travelMode === 'boat') { lv.oars = 0.9; lv.shore = Math.max(lv.shore || 0, 0.7); }
    return lv;
  }
  // footsteps on the road, or oars on the lake, while the marker moves on the map
  A.travel = function (mode) { if (mode === travelMode) return; travelMode = mode; applyLevels(travelLevels()); };

  // ---------- music ----------
  const DOR = [0, 2, 3, 5, 7, 9, 10], PHR = [0, 1, 3, 5, 7, 8, 10], PDOM = [0, 1, 4, 5, 7, 8, 10], MIX = [0, 2, 4, 5, 7, 9, 10], AEO = [0, 2, 3, 5, 7, 8, 10];
  const MAJ = [0, 2, 4, 5, 7, 9, 11];
  const MOODS = {
    title: { root: 62, mode: DOR, bpm: 64, drone: [38, 45], lyre: 0.75, flute: 0.7, drum: 0, theme: true },
    galilee: { root: 62, mode: DOR, bpm: 70, drone: [38, 45], lyre: 0.8, flute: 0.5, drum: 0 },
    land: { root: 62, mode: DOR, bpm: 58, drone: [38, 45], lyre: 0.55, flute: 0.45, drum: 0 },
    reflect: { root: 64, mode: DOR, bpm: 56, drone: [40, 47], lyre: 0.5, flute: 0.35, drum: 0 },
    tension: { root: 62, mode: PHR, bpm: 54, drone: [38], lyre: 0.35, flute: 0, drum: 0.5, heart: true },
    wonder: { root: 67, mode: MIX, bpm: 58, drone: [43, 50], lyre: 0.55, flute: 0.8, drum: 0, pad: true },
    lament: { root: 62, mode: PDOM, bpm: 50, drone: [38, 45], lyre: 0.3, flute: 0.85, drum: 0 },
    jerusalem: { root: 57, mode: AEO, bpm: 76, drone: [33, 40], lyre: 0.8, flute: 0.45, drum: 0.45 },
    night: { root: 62, mode: DOR, bpm: 48, drone: [38], lyre: 0.3, flute: 0.2, drum: 0 },
    storm: { root: 62, mode: PHR, bpm: 96, drone: [38, 39], lyre: 0, flute: 0, drum: 1, roll: true },
    silence: { root: 62, mode: DOR, bpm: 60, drone: [], lyre: 0, flute: 0, drum: 0 },
    // The Birth of Jesus
    advent: { root: 67, mode: MAJ, bpm: 56, drone: [43, 50], lyre: 0.35, flute: 0, drum: 0, pad: true, carol: 'faithful' },
    manger: { root: 60, mode: MAJ, bpm: 50, drone: [36, 43], lyre: 0.25, flute: 0, drum: 0, pad: true, carol: 'silent' },
    gloria: { root: 65, mode: MAJ, bpm: 60, drone: [41, 48], lyre: 0.4, flute: 0, drum: 0, pad: true, carol: 'angels' },
    host: { root: 65, mode: MAJ, bpm: 60, drone: [41, 48, 53], lyre: 0.12, flute: 0, drum: 0, pad: true },
    child: { root: 69, mode: AEO, bpm: 54, drone: [45, 52], lyre: 0.3, flute: 0, drum: 0, pad: true, carol: 'child' },
    kings: { root: 64, mode: AEO, bpm: 58, drone: [40, 47], lyre: 0.35, flute: 0, drum: 0.25, pad: true, carol: 'kings' },
  };
  const THEME = [[0, 1], [2, 1], [3, 1], [4, 2], [6, 1], [4, 1], [3, 1], [4, 3], [2, 1], [3, 1], [1, 1], [0, 4]];
  // Christmas carols for The Birth of Jesus: public-domain melodies, as [MIDI note, beats] (0 = rest). spb: seconds per beat.
  const CAROLS = {
    // Silent Night (Franz Gruber, 1818), C major, in eighth notes
    silent: { spb: 0.36, notes: [[67, 3], [69, 1], [67, 2], [64, 6], [67, 3], [69, 1], [67, 2], [64, 6], [74, 4], [74, 2], [71, 6], [72, 4], [72, 2], [67, 6],
      [69, 4], [69, 2], [72, 3], [71, 1], [69, 2], [67, 3], [69, 1], [67, 2], [64, 6], [69, 4], [69, 2], [72, 3], [71, 1], [69, 2], [67, 3], [69, 1], [67, 2], [64, 6],
      [74, 4], [74, 2], [77, 3], [74, 1], [71, 2], [72, 6], [76, 6], [72, 3], [67, 1], [64, 2], [67, 3], [65, 1], [62, 2], [60, 9]] },
    // O Come, All Ye Faithful (Adeste Fideles, 18th century), G major, the opening, in quarter notes
    faithful: { spb: 0.62, notes: [[67, 1], [67, 2], [62, 1], [67, 1], [69, 2], [62, 2], [71, 1], [69, 1], [71, 1], [72, 1], [71, 2], [69, 1], [0, 1]] },
    // What Child Is This (Greensleeves, 16th century), A minor, in quarter notes
    child: { spb: 0.5, notes: [[69, 1], [72, 2], [74, 1], [76, 1.5], [77, 0.5], [76, 1], [74, 2], [71, 1], [67, 1.5], [69, 0.5], [71, 1], [72, 2], [69, 1],
      [69, 1.5], [68, 0.5], [69, 1], [71, 2], [68, 1], [64, 2], [69, 1], [72, 2], [74, 1], [76, 1.5], [77, 0.5], [76, 1], [74, 2], [71, 1],
      [67, 1.5], [69, 0.5], [71, 1], [72, 1.5], [71, 0.5], [69, 1], [68, 1.5], [66, 0.5], [68, 1], [69, 3]] },
    // We Three Kings (John Henry Hopkins, 1857), E minor, in eighth notes
    kings: { spb: 0.26, notes: [[71, 2], [69, 1], [67, 2], [64, 1], [66, 1], [67, 1], [66, 1], [64, 3], [71, 2], [69, 1], [67, 2], [64, 1], [66, 1], [67, 1], [66, 1], [64, 3],
      [67, 2], [67, 1], [69, 2], [69, 1], [71, 2], [71, 1], [74, 1], [72, 1], [71, 1], [69, 1], [71, 1], [69, 1], [67, 2], [66, 1], [64, 6]] },
    // Angels We Have Heard on High (French carol), F major, the verse, in quarter notes
    angels: { spb: 0.48, notes: [[69, 1], [69, 1], [69, 1], [72, 1], [72, 1.5], [70, 0.5], [69, 2], [69, 1], [67, 1], [69, 1], [72, 1], [69, 1.5], [67, 0.5], [65, 2],
      [69, 1], [69, 1], [69, 1], [72, 1], [72, 1.5], [70, 0.5], [69, 2], [69, 1], [67, 1], [69, 1], [72, 1], [69, 1.5], [67, 0.5], [65, 2]] },
  };
  A.GLORIA = [72, 74, 72, 70, 69, 70, 72, 69, 70, 72, 70, 69, 67, 69, 70, 67, 69, 70, 69, 67, 65, 67, 69, 65, 67, 60, 65, 67, 69, 67, 65];
  let mood = null, moodName = null, drone = null, nextBeat = 0, beat = 0, fluteBusyUntil = 0, themePlayed = false, carolRest = 0;
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
    // a short tuned 'chiff' at the start of the note instead of breath noise
    const ch = ctx.createOscillator(), cg = ctx.createGain();
    ch.frequency.value = f * 3;
    cg.gain.setValueAtTime(v * 0.08, t); cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    ch.connect(cg); cg.connect(musicBus); ch.start(t); ch.stop(t + 0.06);
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(musicBus);
    [o, o2, vib].forEach((x) => { x.start(t); x.stop(t + d + 0.35); });
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
      // the tek: a tuned tap near the rim of the frame drum. No noise, so it never sounds like a hiss.
      const o = ctx.createOscillator(), g = ctx.createGain(), o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o.type = 'triangle'; o.frequency.setValueAtTime(420, t); o.frequency.exponentialRampToValueAtTime(300, t + 0.05);
      g.gain.setValueAtTime(v * 0.45, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
      o2.type = 'sine'; o2.frequency.setValueAtTime(840, t);
      g2.gain.setValueAtTime(v * 0.12, t); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      o.connect(g); g.connect(musicBus); o2.connect(g2); g2.connect(musicBus);
      o.start(t); o.stop(t + 0.08); o2.start(t); o2.stop(t + 0.04);
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
  // lower the music and ambience while a line is read aloud
  A.duck = function (on) {
    if (!ctx) return;
    musicBus.gain.setTargetAtTime(on ? 0.08 : musicBase, ctx.currentTime, 0.25);
    ambBus.gain.setTargetAtTime(on ? 0.2 : 0.34, ctx.currentTime, 0.25);
  };
  // the music swells (0..1), for moments like the heavenly host
  let musicBase = 0.2;
  A.swell = function (x) {
    musicBase = 0.2 + 0.24 * Math.max(0, Math.min(1, x || 0));
    if (ctx) musicBus.gain.setTargetAtTime(musicBase, ctx.currentTime, 0.4);
  };
  // a choir voice: detuned saws through the formants of an open "ah", with a slow swell and vibrato
  function choirNote(m, t, d, v) {
    const f = mtof(m), out = gain(0.0001), body = gain(1);
    [[800, 6, 1], [1150, 8, 0.55], [2900, 10, 0.18]].forEach(([ff, q, a]) => { const b = filt('bandpass', ff, q), g = gain(a); body.connect(b); b.connect(g); g.connect(out); });
    const lp = filt('lowpass', 1600), lg = gain(0.35); body.connect(lp); lp.connect(lg); lg.connect(out);
    const vib = ctx.createOscillator(), vg = ctx.createGain();
    vib.frequency.value = 5; vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(f * 0.005, t + 0.35); vib.connect(vg);
    const oscs = [[-9, 1], [0, 1], [9, 1], [-1200, 0.5]].map(([c, a]) => {
      const o = ctx.createOscillator(), g = gain(a * 0.25); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = c;
      vg.connect(o.frequency); o.connect(g); g.connect(body); return o;
    });
    out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(v, t + 0.14); out.gain.setValueAtTime(v, t + d);
    out.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.9);
    out.connect(musicBus); toRev(out, 1.4);
    oscs.concat([vib]).forEach((o) => { o.start(t); o.stop(t + d + 1); });
  }
  A.choir = function (m, d, v) {
    if (!ctx || !A.on || ctx.state !== 'running') return;
    const t = ctx.currentTime + 0.01;
    choirNote(m, t, d || 0.5, v || 0.09); pluck(m + 12, t, 0.02);
  };
  A.chorus = function (notes, d, v) {
    if (!ctx || !A.on || ctx.state !== 'running') return;
    const t = ctx.currentTime + 0.02;
    notes.forEach((m, i) => choirNote(m, t + i * 0.04, d || 3, (v || 0.05)));
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
    // a carol: the melody on the flute (with a soft bell under each note), then a long rest before it comes round again
    if (M.carol && b === 0 && t > fluteBusyUntil) {
      const C = CAROLS[M.carol];
      let tt = t;
      C.notes.forEach((n, i) => {
        const d = n[1] * C.spb;
        if (n[0]) { flute(n[0], tt, d * 0.92, 0.085); if (n[1] >= 1 || i === 0) pluck(n[0] + 12, tt, 0.018); }
        tt += d;
      });
      carolRest = 14 + Math.floor(Math.random() * 10);
      fluteBusyUntil = tt + spb * carolRest;
    }
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
  const pan = (dest, p) => {
    if (!ctx.createStereoPanner) return dest;
    const sp = ctx.createStereoPanner(); sp.pan.value = p; sp.connect(dest); return sp;
  };
  const toRev = (node, v) => { const g = gain(v * 0.35); node.connect(g); g.connect(reverb); };
  function chirp(t, dest) {
    const o = ctx.createOscillator(), g = ctx.createGain(), base0 = rand(2600, 4000), n = 2 + Math.floor(Math.random() * 4);
    o.type = 'sine';
    g.gain.setValueAtTime(0.0001, t);
    for (let i = 0; i < n; i++) {
      const s = t + i * 0.09;
      o.frequency.setValueAtTime(base0, s); o.frequency.exponentialRampToValueAtTime(base0 * rand(1.2, 1.5), s + 0.05);
      g.gain.setValueAtTime(0.0001, s); g.gain.linearRampToValueAtTime(0.04, s + 0.01); g.gain.linearRampToValueAtTime(0.0001, s + 0.06);
    }
    o.connect(g); g.connect(pan(dest, rand(-0.8, 0.8))); o.start(t); o.stop(t + n * 0.09 + 0.1);
  }
  function cricket(t, dest) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = rand(4300, 4700); g.gain.value = 0.0001;
    for (let i = 0; i < 3; i++) { const s = t + i * 0.045; g.gain.setValueAtTime(0.02, s); g.gain.setValueAtTime(0.0001, s + 0.025); }
    o.connect(g); g.connect(pan(dest, rand(-0.9, 0.9))); o.start(t); o.stop(t + 0.2);
  }
  function owl(t, dest) {
    [0, 0.5].forEach((d, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(i ? 340 : 380, t + d); o.frequency.linearRampToValueAtTime(i ? 320 : 360, t + d + 0.35);
      g.gain.setValueAtTime(0.0001, t + d); g.gain.linearRampToValueAtTime(0.03, t + d + 0.08); g.gain.linearRampToValueAtTime(0.0001, t + d + 0.4);
      o.connect(g); g.connect(dest); toRev(g, 0.6); o.start(t + d); o.stop(t + d + 0.45);
    });
  }
  function crackle(t, v, dest) {
    const n = noise(), g = ctx.createGain();
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    n.connect(filt('bandpass', 520, 1.2)).connect(g); g.connect(dest); n.stop(t + 0.04);
  }
  // one wavelet on the lakeshore: the water draws up, laps the stones, and slides back
  function wavelet(t, big) {
    const d = big ? rand(2.6, 3.6) : rand(1.6, 2.6), peak = t + d * 0.35;
    const n = noise(true), lp = filt('lowpass', 220), g = ctx.createGain();
    lp.frequency.setValueAtTime(200, t); lp.frequency.linearRampToValueAtTime(big ? 1000 : 760, peak); lp.frequency.linearRampToValueAtTime(240, t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(big ? 0.55 : 0.36, peak); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    const out = pan(beds.shore, rand(-0.5, 0.5));
    n.connect(lp).connect(g).connect(out); n.stop(t + d + 0.05);
    // the soft fizz of water running back through pebbles
    const n2 = noise(), bp = filt('bandpass', 650, 0.9), g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.0001, peak); g2.gain.linearRampToValueAtTime(big ? 0.07 : 0.045, peak + d * 0.15); g2.gain.exponentialRampToValueAtTime(0.0001, t + d * 0.95);
    n2.connect(bp).connect(g2).connect(out); n2.stop(t + d);
  }
  function oar(t) {
    const n = noise(true), lp = filt('lowpass', 500), g = ctx.createGain();
    lp.frequency.setValueAtTime(300, t); lp.frequency.linearRampToValueAtTime(700, t + 0.15);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.3, t + 0.06); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    n.connect(lp).connect(g).connect(beds.oars); n.stop(t + 0.5);
    for (let i = 0; i < 3; i++) {
      const s = t + 0.5 + i * rand(0.08, 0.16), o = ctx.createOscillator(), gg = ctx.createGain();
      o.frequency.setValueAtTime(rand(900, 1400), s); o.frequency.exponentialRampToValueAtTime(rand(500, 700), s + 0.04);
      gg.gain.setValueAtTime(0.012, s); gg.gain.exponentialRampToValueAtTime(0.0001, s + 0.06);
      o.connect(gg).connect(beds.oars); o.start(s); o.stop(s + 0.07);
    }
  }
  // a distant voice: a few murmured syllables, a sawtooth through two moving vowel formants
  function voice(t, dest, loud) {
    const o = ctx.createOscillator(); o.type = 'sawtooth';
    const pitch = rand(90, 215), f1 = filt('bandpass', 600, 5), f2 = filt('bandpass', 1300, 6), g = ctx.createGain(), g2 = gain(0.25), lp = filt('lowpass', 1000);
    o.connect(f1).connect(g); o.connect(f2).connect(g2).connect(g);
    const out = pan(dest, rand(-0.8, 0.8));
    g.connect(lp).connect(out); toRev(lp, 0.5);
    g.gain.value = 0.0001;
    let tt = t;
    const syl = 2 + Math.floor(Math.random() * 5), v = (loud || 1) * rand(0.022, 0.04);
    for (let i = 0; i < syl; i++) {
      const d = rand(0.08, 0.2);
      o.frequency.setValueAtTime(pitch * rand(0.92, 1.16), tt); o.frequency.linearRampToValueAtTime(pitch * rand(0.86, 1.08), tt + d);
      f1.frequency.setValueAtTime(rand(350, 800), tt); f2.frequency.setValueAtTime(rand(1000, 1800), tt);
      g.gain.setValueAtTime(0.0001, tt); g.gain.linearRampToValueAtTime(v, tt + 0.03); g.gain.linearRampToValueAtTime(0.0001, tt + d);
      tt += d + rand(0.02, 0.09);
    }
    o.start(t); o.stop(tt + 0.05);
  }
  // a stonemason's hammer: the Temple was still being built
  function hammer(t, dest) {
    const n = 1 + Math.floor(Math.random() * 3), out = pan(dest, rand(-0.8, 0.8));
    for (let i = 0; i < n; i++) {
      const s = t + i * rand(0.35, 0.5), o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle'; o.frequency.setValueAtTime(rand(900, 1250), s); o.frequency.exponentialRampToValueAtTime(600, s + 0.06);
      g.gain.setValueAtTime(0.05, s); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.12);
      o.connect(g).connect(out); toRev(g, 0.5); o.start(s); o.stop(s + 0.14);
    }
  }
  function bleat(t, goat, dest) {
    const o = ctx.createOscillator(), vib = ctx.createOscillator(), f = goat ? rand(420, 520) : rand(270, 330);
    o.type = 'sawtooth'; o.frequency.value = f; vib.frequency.value = goat ? 9 : 6;
    const vg = gain(f * 0.05); vib.connect(vg).connect(o.frequency);
    const g = ctx.createGain(), d = rand(0.5, 0.8);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.03, t + 0.06); g.gain.setValueAtTime(0.03, t + d * 0.7); g.gain.linearRampToValueAtTime(0.0001, t + d);
    o.connect(filt('bandpass', goat ? 1100 : 850, 3)).connect(g).connect(pan(dest, rand(-0.8, 0.8))); toRev(g, 0.5);
    o.start(t); vib.start(t); o.stop(t + d + 0.05); vib.stop(t + d + 0.05);
  }
  function coo(t, dest) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    g.gain.value = 0.0001;
    [[0, 0.22, 520], [0.32, 0.42, 560], [0.85, 0.3, 480]].forEach((nt) => {
      o.frequency.setValueAtTime(nt[2], t + nt[0]); o.frequency.linearRampToValueAtTime(nt[2] * 0.9, t + nt[0] + nt[1]);
      g.gain.setValueAtTime(0.0001, t + nt[0]); g.gain.linearRampToValueAtTime(0.035, t + nt[0] + 0.06); g.gain.linearRampToValueAtTime(0.0001, t + nt[0] + nt[1]);
    });
    o.connect(filt('lowpass', 900)).connect(g).connect(pan(dest, rand(-0.6, 0.6))); o.start(t); o.stop(t + 1.3);
  }
  function bark(t, dest) {
    const out = pan(dest, rand(-0.8, 0.8));
    for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
      const s = t + i * 0.28, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(rand(300, 380), s); o.frequency.exponentialRampToValueAtTime(180, s + 0.12);
      g.gain.setValueAtTime(0.0001, s); g.gain.linearRampToValueAtTime(0.04, s + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.14);
      o.connect(filt('bandpass', 800, 1.5)).connect(g).connect(out); toRev(g, 0.6); o.start(s); o.stop(s + 0.16);
    }
  }
  // a footstep: a soft, low thud of a sandal on packed earth (no noise, so it never hisses)
  function step(t, side, dest) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(rand(100, 125), t); o.frequency.exponentialRampToValueAtTime(55, t + 0.07);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.16, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    o.connect(g).connect(pan(dest, side * 0.15)); o.start(t); o.stop(t + 0.12);
    const o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o2.type = 'triangle'; o2.frequency.setValueAtTime(rand(260, 320), t); o2.frequency.exponentialRampToValueAtTime(180, t + 0.03);
    g2.gain.setValueAtTime(0.02, t); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    o2.connect(g2).connect(dest); o2.start(t); o2.stop(t + 0.05);
  }
  // ---------- the market: carts, donkeys, coins, merchants calling ----------
  function cart(t, dest) {
    const out = pan(dest, rand(-0.8, 0.8)), n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      const s = t + i * rand(0.35, 0.5), o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(rand(480, 620), s); o.frequency.linearRampToValueAtTime(rand(380, 450), s + 0.16);
      g.gain.setValueAtTime(0.0001, s); g.gain.linearRampToValueAtTime(0.01, s + 0.03); g.gain.linearRampToValueAtTime(0.0001, s + 0.18);
      o.connect(filt('bandpass', 900, 4)).connect(g).connect(out); o.start(s); o.stop(s + 0.2);
      const th = ctx.createOscillator(), tg = ctx.createGain();
      th.frequency.setValueAtTime(80, s); th.frequency.exponentialRampToValueAtTime(50, s + 0.06);
      tg.gain.setValueAtTime(0.04, s); tg.gain.exponentialRampToValueAtTime(0.0001, s + 0.08);
      th.connect(tg).connect(out); th.start(s); th.stop(s + 0.09);
    }
  }
  function bray(t, dest) {
    const out = pan(dest, rand(-0.9, 0.9));
    [[0, 0.35, 520, 440], [0.38, 0.45, 260, 220], [0.9, 0.35, 500, 430], [1.28, 0.45, 250, 210]].forEach((b) => {
      const s = t + b[0], o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(b[2], s); o.frequency.linearRampToValueAtTime(b[3], s + b[1]);
      g.gain.setValueAtTime(0.0001, s); g.gain.linearRampToValueAtTime(0.014, s + 0.05); g.gain.linearRampToValueAtTime(0.0001, s + b[1]);
      o.connect(filt('bandpass', b[2] * 1.8, 2)).connect(g).connect(out); toRev(g, 0.4); o.start(s); o.stop(s + b[1] + 0.02);
    });
  }
  function clink(t, dest) {
    const out = pan(dest, rand(-0.7, 0.7));
    for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
      const s = t + i * rand(0.06, 0.14), o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = rand(2300, 3400);
      g.gain.setValueAtTime(0.008, s); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.12);
      o.connect(g).connect(out); o.start(s); o.stop(s + 0.13);
    }
  }
  // ---------- the slopes and the wilderness: goat bells, a hawk ----------
  function bell(t, dest) {
    const f = rand(900, 1300), out = pan(dest, rand(-0.9, 0.9));
    [1, 2.76, 5.4].forEach((m, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = f * m;
      g.gain.setValueAtTime(0.01 / (i + 1), t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7 / (i + 1));
      o.connect(g).connect(out); o.start(t); o.stop(t + 0.75);
    });
  }
  function hawk(t, dest) {
    const out = pan(dest, rand(-0.9, 0.9));
    [0, 0.7].forEach((d) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(2300, t + d); o.frequency.exponentialRampToValueAtTime(1600, t + d + 0.55);
      g.gain.setValueAtTime(0.0001, t + d); g.gain.linearRampToValueAtTime(0.012, t + d + 0.05); g.gain.linearRampToValueAtTime(0.0001, t + d + 0.55);
      o.connect(g).connect(out); toRev(g, 0.6); o.start(t + d); o.stop(t + d + 0.6);
    });
  }
  let last = 0, nextWave = 0, nextStep = 0, nextOar = 0, side = 1;
  function tick() {
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime, dt = last ? now - last : 0.06;
    last = now;
    const L = (k) => (beds[k] && (levels[k] || 0) > 0 ? levels[k] : 0);
    const chance = (rate) => Math.random() < dt * rate;
    const soon = () => now + rand(0.02, 0.25);
    if (L('birds') && chance(0.45 * L('birds'))) chirp(soon(), beds.birds);
    if (L('night')) { if (chance(1.2 * L('night'))) cricket(soon(), beds.night); if (chance(0.03)) owl(soon(), beds.night); }
    if (L('fire') && chance(1.1 * L('fire'))) crackle(soon(), 0.02, beds.fire);
    if (L('shore') && now > nextWave) { wavelet(now + 0.05, Math.random() < 0.2); nextWave = now + rand(1.5, 3.6); }
    if (L('crowd') && chance(3.5 * L('crowd'))) voice(soon(), beds.crowd);
    if (L('city')) {
      if (chance(0.35)) hammer(soon(), beds.city);
      if (chance(0.05)) bleat(soon(), false, beds.city);
      if (L('crowd') && chance(1.0)) voice(soon(), beds.city, 0.6);
    }
    if (L('doves') && chance(0.12)) coo(soon(), beds.doves);
    if (L('market')) {
      const m = L('market');
      if (chance(2.4 * m)) voice(soon(), beds.market, 0.8);
      if (chance(0.3 * m)) voice(soon(), beds.market, 1.5);
      if (chance(0.14 * m)) cart(soon(), beds.market);
      if (chance(0.03 * m)) bray(soon(), beds.market);
      if (chance(0.16 * m)) clink(soon(), beds.market);
    }
    if (L('pasture')) {
      if (chance(0.35)) { const n = 2 + Math.floor(Math.random() * 4); let tt = now + 0.05; for (let i = 0; i < n; i++) { bell(tt, beds.pasture); tt += rand(0.15, 0.45); } }
      if (chance(0.05)) bleat(soon(), true, beds.pasture);
      if (chance(0.03)) bleat(soon(), false, beds.pasture);
    }
    if (L('desert') && chance(0.035)) hawk(soon(), beds.desert);
    if (L('village')) {
      if (chance(0.04)) bark(soon(), beds.village);
      if (chance(0.05)) bleat(soon(), true, beds.village);
      if (L('crowd') && chance(0.5)) voice(soon(), beds.village, 0.5);
    }
    if (L('steps') && now > nextStep) { step(now + 0.02, side, beds.steps); side = -side; nextStep = now + 0.42; }
    if (L('oars') && now > nextOar) { oar(now + 0.02); nextOar = now + 1.7; }
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
    page(t) { pluck(88, t, 0.016, sfxBus); },
    chime(t) { pluck(86, t, 0.07, sfxBus); pluck(93, t + 0.12, 0.05, sfxBus); },
    // The Birth of Jesus: the opening of Joy to the World (public domain), when a report is sealed
    joy(t) { [[84, 0.75], [83, 0.25], [81, 0.5], [79, 0.75], [77, 0.25], [76, 0.5], [74, 0.5], [72, 1.2]].reduce((tt, n) => { pluck(n[0], tt, 0.06, sfxBus); return tt + n[1] * 0.42; }, t); },
    // the glory of the Lord, or the star: a high shimmer that rises and fades
    shimmer(t) { [84, 88, 91, 96, 100, 103, 108].forEach((m, i) => pluck(m, t + i * 0.07, 0.035 - i * 0.003, sfxBus)); [96, 100, 103].forEach((m, i) => pluck(m, t + 0.9 + i * 0.11, 0.02, sfxBus)); },
    // small bells on the wise men's camels
    bells(t) { for (let i = 0; i < 7; i++) { const tt = t + i * rand(0.12, 0.22); pluck(pick([91, 93, 96, 98]), tt, rand(0.012, 0.025), sfxBus); } },
    // a sheep in the night field
    sheep(t) {
      [0, 0.32].forEach((d, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain(), bp = filt('bandpass', 900, 2.2), vib = ctx.createOscillator(), vg = ctx.createGain();
        o.type = 'sawtooth'; o.frequency.setValueAtTime(i ? 300 : 330, t + d); o.frequency.linearRampToValueAtTime(i ? 270 : 300, t + d + 0.4);
        vib.frequency.value = 22; vg.gain.value = 18; vib.connect(vg); vg.connect(o.frequency);
        g.gain.setValueAtTime(0.0001, t + d); g.gain.linearRampToValueAtTime(0.05, t + d + 0.05); g.gain.linearRampToValueAtTime(0.0001, t + d + (i ? 0.55 : 0.28));
        o.connect(bp); bp.connect(g); g.connect(sfxBus); [o, vib].forEach((x) => { x.start(t + d); x.stop(t + d + 0.6); });
      });
    },
    // when Scripture answers a question in your scroll: a short rising phrase
    answer(t) { pluck(74, t, 0.06, sfxBus); pluck(78, t + 0.14, 0.055, sfxBus); pluck(81, t + 0.28, 0.055, sfxBus); pluck(86, t + 0.46, 0.07, sfxBus); pluck(90, t + 0.62, 0.045, sfxBus); },
    whoosh(t) { pluck(74, t, 0.03, sfxBus); pluck(71, t + 0.08, 0.026, sfxBus); pluck(67, t + 0.16, 0.022, sfxBus); },
    dig(t) { for (let i = 0; i < 4; i++) burst(t + i * 0.18 + rand(0, 0.05), 600, 350, 0.12, 0.1, 'lowpass'); },
    crumble(t) { burst(t, 800, 200, 0.9, 0.22, 'lowpass'); for (let i = 0; i < 6; i++) burst(t + rand(0, 0.6), 1200, 700, 0.05, 0.05); },
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
    flutter(t) { for (let i = 0; i < 14; i++) burst(t + i * 0.045, 1000, 800, 0.035, 0.05); },
    splash(t) { burst(t, 1000, 240, 0.8, 0.22); },
    thunder(t) { burst(t, 1400, 600, 0.15, 0.16); burst(t + 0.05, 220, 60, 2.6, 0.6, 'lowpass'); },
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

  A._levels = () => Object.assign({}, levels);
  // test helper: energy above 3 kHz and total energy at the output
  A._spec = function () {
    if (!ctx) return [0, 0];
    A.level();
    if (!A._an) { A._an = ctx.createAnalyser(); A._an.fftSize = 4096; master.connect(A._an); }
    const f = new Float32Array(A._an.frequencyBinCount); A._an.getFloatFrequencyData(f);
    const hz = ctx.sampleRate / A._an.fftSize; let hi = 0, all = 0;
    for (let i = 1; i < f.length; i++) { const p = Math.pow(10, f[i] / 10); all += p; if (i * hz > 3000) hi += p; }
    return [hi, all];
  };

  TW.Audio = A;
})(window.TW);
