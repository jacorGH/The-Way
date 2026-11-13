/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — small pixel portraits beside the speaker's name in dialogue. Named characters use the same look they
   have in the scenes; anyone else gets a look worked out from their description (a woman, an elder, a soldier…),
   the same every time. */
window.TW = window.TW || {};
(function (TW) {
  const P = {};
  const cache = {};
  const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; };
  // English and Spanish forms: in Spanish the speaker's name arrives already translated
  const NAMED = [
    [/mother of jesus|madre de jesús/i, 'marymother'], [/^nicodem/i, 'nicodemus'], [/simon peter|simón pedro|^peter|^pedro/i, 'peter'], [/^thomas|^tomás/i, 'thomas'], [/mary of magdala|magdalene|magdalena/i, 'magdalene'],
    [/^stephen|^esteban/i, 'stephen'], [/^saul/i, 'saul'], [/^barnab/i, 'barnabas'], [/^luke|^lucas/i, 'luke'], [/^timot/i, 'timothy'], [/^lydia|^lidia/i, 'lydia'],
    [/^silas/i, 'silas'], [/^john mark|^juan marcos|^mark$|^marcos$/i, 'johnmark'], [/^caiaphas|^caifás/i, 'caiaphas'], [/^annas|^anás/i, 'annas'], [/^joseph of arimath|^josé de arimatea/i, 'joseph'],
    [/^salome|^salomé/i, 'salome'], [/the lame man|el cojo/i, 'lame'], [/^sergius paulus|^sergio paulo/i, 'sergius'], [/jailer|carcelero/i, 'jailer'],
  ];
  const WOMEN = /mary|martha|rhoda|widow|woman|women|mother|elisheva|lydia|tabitha|maid|wife|daughter|miriam|hannah|salome|joanna|damaris|priscilla|euodia|theodora|rivka|dinah|shoshanna|yohanna|her |girl|sister|bride|aunt|mujer|madre|viuda|hija|esposa|criada|muchacha|niña|hermana|suegra|novia|tía|señora|maría|marta|rode|lidia|tabita|juana|priscila|dámaris|evodia|teodora|salomé|ana\b|miriam|una /i;
  function lookFor(speaker) {
    const K = TW.Kit;
    for (const [re, key] of NAMED) if (re.test(speaker) && K.looks && K.looks[key]) return K.looks[key];
    // a testimony's witness has their own look
    const T = TW.D && TW.D.testimonies;
    if (T) for (const k of Object.keys(T)) {
      const w = T[k].witness || '', wt = TW.tr ? TW.tr(w) : w;
      for (const x of [w, wt]) if (x && (speaker === x || speaker.startsWith(x.split(',')[0]))) if (T[k].look) return T[k].look;
    }
    if (/centurion|soldier|roman|officer|tribune|guard|centurión|soldado|romano|oficial|tribuno|guardia/i.test(speaker) && K.looks && K.looks.soldier) return K.looks.soldier;
    const h = hash(speaker), pick = (arr, n) => (arr && arr.length ? arr[(h >>> n) % arr.length] : undefined);
    const old = /elder|old|aged|grand|anciano|anciana|viejo|vieja|abuel/i.test(speaker);
    const grey = '#8f8f88';
    if (WOMEN.test(speaker)) return { skin: pick(K.SKINS, 1), hair: old ? grey : pick(K.HAIRS, 5), tunic: pick(K.TUNICS, 9), veil: pick(K.VEILS, 13) };
    const hair = old ? grey : pick(K.HAIRS, 5);
    return { skin: pick(K.SKINS, 1), hair, beard: /boy|child|young|muchacho|niño|joven/i.test(speaker) ? null : hair, tunic: pick(K.TUNICS, 9), mantle: (h & 1) ? pick(K.TUNICS, 17) : undefined };
  }
  // a canvas of the head and shoulders, enlarged with crisp pixels
  P.canvas = function (speaker) {
    if (!speaker || !TW.S || !TW.Kit) return null;
    if (cache[speaker]) return cache[speaker];
    try {
      const frames = TW.S.person(lookFor(speaker));
      const src = frames.stand.r;
      const crop = Math.min(src.height, 16), w = src.width, scale = 3;
      const c = document.createElement('canvas');
      c.width = w * scale; c.height = crop * scale;
      const g = c.getContext('2d'); g.imageSmoothingEnabled = false;
      g.drawImage(src, 0, 0, w, crop, 0, 0, w * scale, crop * scale);
      c.className = 'portrait'; c.setAttribute('aria-hidden', 'true');
      return (cache[speaker] = c);
    } catch (e) { return null; }
  };
  P.look = lookFor;
  TW.Portrait = P;
})(window.TW);
