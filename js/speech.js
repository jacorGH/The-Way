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
  S.busy = () => !!(audio && !audio.paused) || !!(synth && (synth.speaking || synth.pending)) || !!timer;
  S.whenDone = (f) => { if (!S.busy()) setTimeout(f, 0); else waiters.push(f); };
  // a recorded voice for this line, if one has been made (see lines.js)
  // Recorded voices: try audio/<lang>/<id>.mp3 for every line. If the file is not there, remember that and use the
  // device voice instead, so recordings can be added a batch at a time with no list to keep up to date.
  const missing = new Set();
  function playDub(id, fallback) {
    const lang = TW.Settings ? TW.Settings.get('lang') : 'en';
    if (!id || !TW.Dubs || (TW.Settings && TW.Settings.get('recordings') === false)) return false;
    const key = lang + ':' + id;
    if (missing.has(key) && !TW.Dubs.has(lang, id)) return false;
    const a = new Audio(TW.Dubs.url(lang, id));
    audio = a;
    let started = false;
    a.onplaying = () => { started = true; TW.Audio && TW.Audio.duck && TW.Audio.duck(true); };
    a.onended = () => { if (audio === a) audio = null; TW.Audio && TW.Audio.duck && TW.Audio.duck(false); done(); };
    a.onerror = () => { if (audio !== a) return; audio = null; if (!started) { missing.add(key); fallback(); } else { TW.Audio && TW.Audio.duck && TW.Audio.duck(false); done(); } };
    a.play().catch(() => { if (audio !== a) return; audio = null; if (!started) fallback(); });
    return true;
  }
  function speakNow(text, v) {
    const u = new SpeechSynthesisUtterance(clean(text));
    if (v.voice) { u.voice = v.voice; u.lang = v.voice.lang; }
    u.pitch = v.pitch; u.rate = v.rate;
    u.onstart = () => TW.Audio && TW.Audio.duck && TW.Audio.duck(true);
    u.onend = u.onerror = () => { if (current === u) { current = null; done(); } TW.Audio && TW.Audio.duck && TW.Audio.duck(false); };
    current = u;
    if (synth.paused) synth.resume();
    synth.speak(u);
  }
  S.say = function (kind, text, speaker, id) {
    if (!S.on || !text) return;
    S.stop(true);
    const speakDevice = () => {
      if (!synth) { done(); return; }
      const v = pick(kind, speaker);
      if (synth.speaking || synth.pending) { synth.cancel(); timer = setTimeout(() => { timer = null; speakNow(text, v); }, 120); }
      else speakNow(text, v);
    };
    if (playDub(id, speakDevice)) return;
    if (!synth) return;
    const v = pick(kind, speaker);
    if (synth.speaking || synth.pending) { synth.cancel(); timer = setTimeout(() => { timer = null; speakNow(text, v); }, 120); }
    else speakNow(text, v);
  };
  S.stop = function (keepWaiters) {
    clearTimeout(timer); timer = null;
    if (audio) { audio.onended = audio.onerror = null; audio.pause(); audio = null; }
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
