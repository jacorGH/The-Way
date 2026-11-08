/* The Way — read aloud, with the voices built into the device.
   On iPhone, download an Enhanced or Premium voice (Settings > Accessibility > Spoken Content > Voices) for the best sound.
   Narration takes the player's voice (a man's for Eleazar, a woman's for Elisheva); Scripture is read more slowly in a
   second voice; each character keeps the same voice and pitch, matched to whether the speaker is a man or a woman. */
window.TW = window.TW || {};
(function (TW) {
  const S = { on: false };
  const KEY = 'the-way.read';
  try { S.on = localStorage.getItem(KEY) === 'on'; } catch (e) { /* storage unavailable */ }
  const synth = window.speechSynthesis || null;
  S.available = !!synth;
  let voices = [];
  const load = () => { if (synth) voices = synth.getVoices().filter((v) => /^en/i.test(v.lang)); };
  if (synth) { load(); if (synth.addEventListener) synth.addEventListener('voiceschanged', load); else synth.onvoiceschanged = load; }

  const NOVELTY = /compact|novelty|bells|bubbles|whisper|zarvox|trinoids|bad news|good news|organ|boing|cellos|deranged|hysterical|jester|pipe|superstar|wobble|albert|bahh|grandma|grandpa|rocko|shelley|sandy|flo|eddy|reed/i;
  const FEMALE = /samantha|karen|moira|tessa|fiona|victoria|allison|ava|susan|zoe|serena|kate|nicky|catherine|martha|veena|female|woman|joanna|salli|kimberly|kendra|ivy|emma|amy|olivia|aria|jenny|sonia|libby|natasha|clara/i;
  const MALE = /daniel|alex|tom|fred|oliver|aaron|arthur|gordon|lee|rishi|evan|nathan|male|man\b|matthew|joey|justin|brian|guy|ryan|william|thomas|liam|james/i;
  function score(v) {
    let s = 0;
    if (/premium/i.test(v.name)) s += 30;
    if (/enhanced|neural|natural/i.test(v.name)) s += 20;
    if (v.localService) s += 3;
    if (/en-(US|GB|AU|IE|CA)/i.test(v.lang)) s += 2;
    if (NOVELTY.test(v.name)) s -= 100;
    return s;
  }
  const ranked = (pool) => pool.slice().sort((a, b) => score(b) - score(a)).filter((v) => score(v) > -50);
  const pools = () => {
    const all = ranked(voices);
    const f = all.filter((v) => FEMALE.test(v.name)), m = all.filter((v) => MALE.test(v.name) && !FEMALE.test(v.name));
    return { all, f: f.length ? f : all, m: m.length ? m : all };
  };
  // speakers who are women in this story
  const WOMEN = /mary|martha|rhoda|widow|woman|mother|elisheva|lydia|tabitha|maid|wife|daughter|miriam|hannah|salome|joanna|her |she /i;
  const hash = (s) => { let h = 0; for (const c of s || '') h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };

  function pick(kind, speaker) {
    const p = pools();
    if (!p.all.length) return { voice: null, pitch: 1, rate: 1 };
    const niece = TW.Role && TW.Role.is();
    if (kind === 'scripture') { const pool = niece ? p.m : p.f; return { voice: pool[Math.min(1, pool.length - 1)] || pool[0], pitch: 0.95, rate: 0.9 }; }
    if (!speaker) { const pool = niece ? p.f : p.m; return { voice: pool[0], pitch: 1, rate: 0.98 }; }
    const pool = WOMEN.test(speaker) ? p.f : p.m, h = hash(speaker);
    return { voice: pool[h % Math.min(pool.length, 5)], pitch: 0.85 + (h % 25) / 100, rate: 0.98 };
  }
  const clean = (t) => String(t).replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s*\n+\s*/g, '. ').replace(/\s+/g, ' ').trim();

  S.say = function (kind, text, speaker) {
    if (!S.on || !synth || !text) return;
    synth.cancel();
    const v = pick(kind, speaker), u = new SpeechSynthesisUtterance(clean(text));
    if (v.voice) { u.voice = v.voice; u.lang = v.voice.lang; }
    u.pitch = v.pitch; u.rate = v.rate;
    u.onstart = () => TW.Audio && TW.Audio.duck && TW.Audio.duck(true);
    u.onend = u.onerror = () => TW.Audio && TW.Audio.duck && TW.Audio.duck(false);
    synth.speak(u);
  };
  S.stop = function () { if (synth) synth.cancel(); if (TW.Audio && TW.Audio.duck) TW.Audio.duck(false); };
  S.setOn = function (on) {
    S.on = on;
    try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) { /* ignore */ }
    if (!on) { S.stop(); return; }
    load();
    S.say('drama', 'Read aloud is on.');
  };
  S.voiceName = () => { const v = pick('drama'); return v.voice ? v.voice.name : null; };
  S.hasQualityVoice = () => voices.some((v) => /premium|enhanced|neural|natural/i.test(v.name));
  TW.Speech = S;
})(window.TW);
