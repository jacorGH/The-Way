/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — read aloud, with the voices built into the device.
   iPhone: download an Enhanced or Premium voice (Settings > Accessibility > Spoken Content > Voices > English).
   Apple does not let Safari use the Siri voices.
   Safari quirks handled here: an utterance spoken in the same instant as cancel() is silently dropped, so speaking waits
   a moment after cancelling; the engine can get stuck paused, so it is resumed; utterances are kept referenced. */
window.TW = window.TW || {};
(function (TW) {
  const S = { on: false };
  const KEY = 'the-way.read', VKEY = 'the-way.voices';
  try { S.on = localStorage.getItem(KEY) === 'on'; } catch (e) { /* storage unavailable */ }
  let chosen = {};
  try { chosen = JSON.parse(localStorage.getItem(VKEY) || '{}'); } catch (e) { chosen = {}; }
  const synth = window.speechSynthesis || null;
  S.available = !!synth;
  let voices = [];
  const wantLang = () => (TW.Settings && TW.Settings.get('lang') === 'es' ? /^es/i : /^en/i);
  const load = () => { if (synth) voices = synth.getVoices().filter((v) => wantLang().test(v.lang)); };
  if (synth) { load(); if (synth.addEventListener) synth.addEventListener('voiceschanged', load); else synth.onvoiceschanged = load; }

  // Apple's joke and robot voices, and the old Eloquence voices
  const NOVELTY = /\b(fred|albert|zarvox|trinoids|whisper|bad news|good news|bells|boing|bubbles|cellos|jester|organ|superstar|wobble|bahh|deranged|hysterical|ralph|kathy|junior|princess|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|compact)\b/i;
  const GOOD_ES = /\b(monica|mónica|paulina|jorge|juan|diego|marisol|isabela|francisca|angelica|angélica)\b/i;
  const GOOD = /\b(ava|zoe|evan|nathan|joelle|noelle|samantha|daniel|karen|moira|tessa|rishi|arthur|martha|catherine|gordon|aaron|nicky|tom|allison|susan|serena|kate|oliver|fiona|alex|jamie|lee|matilda)\b/i;
  const FEMALE = /\b(monica|mónica|paulina|marisol|isabela|francisca|angelica|angélica|ava|zoe|joelle|noelle|samantha|karen|moira|tessa|martha|catherine|nicky|allison|susan|serena|kate|fiona|victoria|matilda|female|woman)\b/i;
  const MALE = /\b(jorge|juan|diego|evan|nathan|daniel|rishi|arthur|gordon|aaron|tom|oliver|alex|lee|jamie|male|man)\b/i;
  function score(v) {
    if (NOVELTY.test(v.name)) return -1000;
    let s = 0;
    if (/premium/i.test(v.name)) s += 40;
    if (/enhanced|neural|natural/i.test(v.name)) s += 25;
    if (GOOD.test(v.name) || GOOD_ES.test(v.name)) s += 10;
    if (v.localService) s += 2;
    if (/en-(US|GB|AU|IE|CA)/i.test(v.lang)) s += 2;
    return s;
  }
  S.list = () => voices.filter((v) => score(v) > -100).sort((a, b) => score(b) - score(a));
  S.quality = (v) => (/premium/i.test(v.name) ? 'Premium' : /enhanced|neural|natural/i.test(v.name) ? 'Enhanced' : 'Standard');
  const byName = (n) => voices.find((v) => v.name === n) || null;
  function pools() {
    const all = S.list();
    const f = all.filter((v) => FEMALE.test(v.name)), m = all.filter((v) => MALE.test(v.name) && !FEMALE.test(v.name));
    return { all, f: f.length ? f : all, m: m.length ? m : all };
  }
  const WOMEN = /mary|martha|rhoda|widow|woman|mother|elisheva|lydia|tabitha|maid|wife|daughter|miriam|hannah|salome|joanna|her |she /i;
  const hash = (s) => { let h = 0; for (const c of s || '') h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
  function pick(kind, speaker) {
    const p = pools();
    if (!p.all.length) return { voice: null, pitch: 1, rate: 1 };
    const niece = TW.Role && TW.Role.is();
    if (kind === 'scripture') return { voice: byName(chosen.scripture) || (niece ? p.m : p.f)[0], pitch: 1, rate: 0.9 };
    if (!speaker) return { voice: byName(chosen.narrator) || (niece ? p.f : p.m)[0], pitch: 1, rate: 0.98 };
    const pool = WOMEN.test(speaker) ? p.f : p.m, h = hash(speaker);
    return { voice: pool[h % Math.min(pool.length, 4)], pitch: 0.9 + (h % 15) / 100, rate: 0.98 };
  }
  const clean = (t) => String(t).replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s*\n+\s*/g, '. ').replace(/\s+/g, ' ').trim();

  let current = null, timer = null, audio = null, waiters = [];
  const done = () => { const w = waiters; waiters = []; w.forEach((f) => f()); };
  S.busy = () => !!(audio && player && !player.paused) || !!(synth && (synth.speaking || synth.pending)) || !!timer;
  S.whenDone = (f) => { if (!S.busy()) setTimeout(f, 0); else waiters.push(f); };
  // a recorded voice for this line, if one has been made (see lines.js)
  // Recorded voices: try audio/<lang>/<id>.mp3 for every line. If the file is not there, remember that and use the
  // device voice instead (when read-aloud is on), so recordings can be added a batch at a time with no list to keep.
  // One audio element is reused for every line and unlocked by the first tap: iPhone Safari refuses audio that a
  // fresh element starts outside a tap, which would silence lines that begin a moment after the tap.
  const missing = new Set();
  const player = typeof Audio !== 'undefined' ? new Audio() : null;
  if (player) { player.preload = 'auto'; player.setAttribute('playsinline', ''); }
  // a tenth of a second of silence, built as a real WAV file, used only to unlock the player on the first tap
  const SILENT = (function () {
    const n = 800, rate = 8000, bytes = [];
    const u32 = (v) => [v & 255, (v >> 8) & 255, (v >> 16) & 255, (v >> 24) & 255], u16 = (v) => [v & 255, (v >> 8) & 255];
    const str = (s) => s.split('').map((c) => c.charCodeAt(0));
    bytes.push(...str('RIFF'), ...u32(36 + n), ...str('WAVE'), ...str('fmt '), ...u32(16), ...u16(1), ...u16(1), ...u32(rate), ...u32(rate), ...u16(1), ...u16(8), ...str('data'), ...u32(n));
    for (let k = 0; k < n; k++) bytes.push(128);
    let bin = ''; bytes.forEach((b) => { bin += String.fromCharCode(b); });
    return 'data:audio/wav;base64,' + (typeof btoa === 'function' ? btoa(bin) : '');
  })();
  // Voice speed (Settings → Recorded voices): recordings change speed without changing pitch; the device voice too.
  const voiceRate = () => { const r = Number(TW.Settings && TW.Settings.get('voiceSpeed')); return r >= 0.5 && r <= 2 ? r : 1; };
  if (player) { player.preservesPitch = true; player.mozPreservesPitch = true; player.webkitPreservesPitch = true; }
  // Leveler: a gentle compressor and make-up gain on a channel of its own, so quiet voices match loud ones. Only for
  // pages served over http(s): a file opened straight from disk cannot be routed through Web Audio without going silent.
  let vctx = null;
  function setupLeveler() {
    if (vctx || !player || !/^https?:$/.test(location.protocol) || (TW.Settings && TW.Settings.get('voiceLevel') === false)) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      vctx = new AC();
      const src = vctx.createMediaElementSource(player);
      const comp = vctx.createDynamicsCompressor();
      comp.threshold.value = -26; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.25;
      const gain = vctx.createGain(); gain.gain.value = 1.7;
      src.connect(comp); comp.connect(gain); gain.connect(vctx.destination);
    } catch (e) { vctx = null; }
  }
  let unlocked = false;
  const unlock = () => {
    if (vctx && vctx.state === 'suspended') vctx.resume();
    if (unlocked || !player) return;
    unlocked = true;
    setupLeveler();
    if (vctx && vctx.state === 'suspended') vctx.resume();
    try { player.src = SILENT; const pr = player.play(); if (pr && pr.catch) pr.catch(() => { unlocked = false; }); } catch (e) { unlocked = false; }
  };
  if (typeof document !== 'undefined') ['pointerdown', 'touchend', 'click', 'keydown'].forEach((ev) => document.addEventListener(ev, unlock, { capture: true, passive: true }));
  const recordingsOn = () => !TW.Settings || TW.Settings.get('recordings') !== false;
  function playDub(id, fallback) {
    const lang = TW.Settings ? TW.Settings.get('lang') : 'en';
    if (!id || !TW.Dubs || !player || !recordingsOn()) return false;
    const key = lang + ':' + id;
    if (missing.has(key) && !TW.Dubs.has(lang, id)) return false;
    const token = {};
    audio = token;
    let started = false;
    player.onplaying = () => { if (audio !== token) return; started = true; TW.Audio && TW.Audio.duck && TW.Audio.duck(true); };
    player.onended = () => { if (audio !== token) return; audio = null; TW.Audio && TW.Audio.duck && TW.Audio.duck(false); done(); };
    player.onerror = () => { if (audio !== token) return; audio = null; if (!started) { missing.add(key); fallback(); } else { TW.Audio && TW.Audio.duck && TW.Audio.duck(false); done(); } };
    player.src = TW.Dubs.url(lang, id);
    player.playbackRate = voiceRate(); player.defaultPlaybackRate = voiceRate();
    if (vctx && vctx.state === 'suspended') vctx.resume();
    const pr = player.play();
    if (pr && pr.catch) pr.catch((err) => {
      if (audio !== token || started) return;
      // a missing file reports through onerror; a refusal (not allowed to play) falls back without marking it missing
      if (err && err.name === 'NotAllowedError') { audio = null; fallback(); }
    });
    return true;
  }
  S.recordingsOn = recordingsOn;
  function speakNow(text, v) {
    const u = new SpeechSynthesisUtterance(clean(text));
    if (v.voice) { u.voice = v.voice; u.lang = v.voice.lang; }
    u.pitch = v.pitch; u.rate = Math.min(2, v.rate * voiceRate());
    u.onstart = () => TW.Audio && TW.Audio.duck && TW.Audio.duck(true);
    u.onend = u.onerror = () => { if (current === u) { current = null; done(); } TW.Audio && TW.Audio.duck && TW.Audio.duck(false); };
    current = u;
    if (synth.paused) synth.resume();
    synth.speak(u);
  }
  S.say = function (kind, text, speaker, id) {
    // recordings play whenever they are switched on; the device voice speaks only when read-aloud is on
    if (!text || (!S.on && !recordingsOn())) return;
    S.stop(true);
    const speakDevice = () => {
      if (!S.on || !synth) { done(); return; }
      const v = pick(kind, speaker);
      if (synth.speaking || synth.pending) { synth.cancel(); timer = setTimeout(() => { timer = null; speakNow(text, v); }, 120); }
      else speakNow(text, v);
    };
    if (playDub(id, speakDevice)) return;
    if (!S.on || !synth) return;
    const v = pick(kind, speaker);
    if (synth.speaking || synth.pending) { synth.cancel(); timer = setTimeout(() => { timer = null; speakNow(text, v); }, 120); }
    else speakNow(text, v);
  };
  S.stop = function (keepWaiters) {
    clearTimeout(timer); timer = null;
    if (audio) { audio = null; if (player) { try { player.pause(); } catch (e) { /* ignore */ } } }
    if (synth && (synth.speaking || synth.pending)) synth.cancel();
    if (TW.Audio && TW.Audio.duck) TW.Audio.duck(false);
    if (!keepWaiters) waiters = [];
  };
  S.setOn = function (on) {
    S.on = on;
    try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) { /* ignore */ }
    if (!on) { S.stop(); return; }
    load();
    S.say('drama', 'Read aloud is on.');
  };
  S.test = function (name, kind) {
    const v = byName(name); if (!v || !synth) return;
    clearTimeout(timer); synth.cancel();
    const sample = kind === 'scripture' ? 'In the beginning was the Word, and the Word was with God, and the Word was God.' : 'You are standing in the road outside Capernaum, and the crowd is already gathering.';
    timer = setTimeout(() => { timer = null; speakNow(sample, { voice: v, pitch: 1, rate: kind === 'scripture' ? 0.9 : 0.98 }); }, 120);
  };
  S.choose = function (slot, name) {
    chosen[slot] = name;
    try { localStorage.setItem(VKEY, JSON.stringify(chosen)); } catch (e) { /* ignore */ }
  };
  S.chosen = (slot) => chosen[slot] || (pick(slot === 'scripture' ? 'scripture' : 'drama').voice || {}).name || null;
  S.hasQualityVoice = () => voices.some((v) => /premium|enhanced|neural|natural/i.test(v.name));
  S.reload = load;
  TW.Speech = S;
})(window.TW);
