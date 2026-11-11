/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — player settings: reading comfort, accessibility, language and Bible version.
   Stored per device. apply() reflects them on <html> so CSS can respond. */
window.TW = window.TW || {};
(function (TW) {
  const KEY = 'the-way.settings';
  const DEFAULTS = {
    textSize: 'm',          // s, m, l, xl
    textSpeed: 'normal',    // slow, normal, fast, instant
    autoAdvance: false,     // move on by itself after a line is read or spoken
    reduceMotion: false,    // no typing animation, no shaking, gentler fades
    contrast: false,        // darker text and stronger borders
    selectable: false,      // dialog text can be selected (for the iPhone's Speak Selection)
    lang: 'en',             // interface and story language
    bible: 'WEB',           // Bible version for Scripture
    recordings: true,       // play recorded voices from audio/<lang>/ when present
  };
  let s = Object.assign({}, DEFAULTS);
  try { Object.assign(s, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* storage unavailable */ }
  const S = {
    get: (k) => s[k],
    set(k, v) {
      s[k] = v;
      try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
      S.apply();
      (S.listeners[k] || []).forEach((f) => f(v));
    },
    listeners: {},
    on(k, f) { (S.listeners[k] = S.listeners[k] || []).push(f); },
    all: () => Object.assign({}, s),
    apply() {
      const h = document.documentElement;
      h.dataset.size = s.textSize;
      h.classList.toggle('contrast', !!s.contrast);
      h.classList.toggle('calm', !!s.reduceMotion);
      h.classList.toggle('selectable', !!s.selectable);
      h.lang = s.lang === 'es' ? 'es' : 'en';
    },
    // milliseconds between typing steps, or 0 for instant
    typeDelay: () => ({ slow: 40, normal: 22, fast: 10, instant: 0 }[s.textSpeed] ?? 22),
  };
  S.apply();
  TW.Settings = S;
  // the player's own reduced-motion choice joins the system setting
  if (TW.U) {
    const sys = TW.U.reducedMotion;
    TW.U.reducedMotion = () => !!s.reduceMotion || (sys ? sys() : false);
  }
})(window.TW);
