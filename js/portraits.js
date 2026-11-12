/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — small pixel portraits beside the speaker's name in dialogue. Named characters use the same look they
   have in the scenes; anyone else gets a look worked out from their description (a woman, an elder, a soldier…),
   the same every time. */
window.TW = window.TW || {};
(function (TW) {
  const P = {};
  const cache = {};
  const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; };
  const NAMED = [
    [/^nicodemus/i, 'nicodemus'], [/simon peter|^peter/i, 'peter'], [/^thomas/i, 'thomas'], [/mary of magdala|magdalene/i, 'magdalene'],
    [/^stephen/i, 'stephen'], [/^saul/i, 'saul'], [/^barnabas/i, 'barnabas'], [/^luke/i, 'luke'], [/^timothy/i, 'timothy'], [/^lydia/i, 'lydia'],
    [/^silas/i, 'silas'], [/^john mark|^mark$/i, 'johnmark'], [/^caiaphas/i, 'caiaphas'], [/^annas/i, 'annas'], [/^joseph of arimath/i, 'joseph'],
    [/^salome/i, 'salome'], [/the lame man/i, 'lame'], [/^sergius paulus/i, 'sergius'], [/^the jailer|jailer/i, 'jailer'],
  ];
  const WOMEN = /mary|martha|rhoda|widow|woman|mother|elisheva|lydia|tabitha|maid|wife|daughter|miriam|hannah|salome|joanna|damaris|priscilla|euodia|theodora|rivka|dinah|shoshanna|yohanna|her /i;
  function lookFor(speaker) {
    const K = TW.Kit;
    for (const [re, key] of NAMED) if (re.test(speaker) && K.looks && K.looks[key]) return K.looks[key];
    // a testimony's witness has their own look
    const T = TW.D && TW.D.testimonies;
    if (T) for (const k of Object.keys(T)) { const w = T[k].witness || ''; if (w && (speaker === w || speaker.startsWith(w.split(',')[0]))) if (T[k].look) return T[k].look; }
    if (/centurion|soldier|roman|officer|tribune|guard/i.test(speaker) && K.looks && K.looks.soldier) return K.looks.soldier;
    const h = hash(speaker), pick = (arr, n) => (arr && arr.length ? arr[(h >>> n) % arr.length] : undefined);
    const old = /elder|old|aged|grand/i.test(speaker);
    const grey = '#8f8f88';
    if (WOMEN.test(speaker)) return { skin: pick(K.SKINS, 1), hair: old ? grey : pick(K.HAIRS, 5), tunic: pick(K.TUNICS, 9), veil: pick(K.VEILS, 13) };
    const hair = old ? grey : pick(K.HAIRS, 5);
    return { skin: pick(K.SKINS, 1), hair, beard: /boy|child|young/i.test(speaker) ? null : hair, tunic: pick(K.TUNICS, 9), mantle: (h & 1) ? pick(K.TUNICS, 17) : undefined };
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
  TW.Portrait = P;
})(window.TW);
