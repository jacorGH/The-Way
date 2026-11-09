/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — shared helpers */
window.TW = window.TW || {};
(function (TW) {
  const U = {};

  U.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  U.lerp = (a, b, t) => a + (b - a) * t;
  U.smooth = (e0, e1, x) => {
    const t = U.clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  };

  // Deterministic hash noise
  U.hash = (x, y, s) => {
    let h = (x * 374761393 + y * 668265263 + (s || 0) * 982451653) | 0;
    h = (h ^ (h >>> 13)) * 1274126177;
    h = h ^ (h >>> 16);
    return (h >>> 0) / 4294967295;
  };
  U.vnoise = (x, y, s) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = U.hash(xi, yi, s), b = U.hash(xi + 1, yi, s);
    const c = U.hash(xi, yi + 1, s), d = U.hash(xi + 1, yi + 1, s);
    return U.lerp(U.lerp(a, b, u), U.lerp(c, d, u), v);
  };
  U.fbm = (x, y, s, oct) => {
    let t = 0, amp = 0.5, f = 1;
    for (let i = 0; i < (oct || 4); i++) {
      t += amp * U.vnoise(x * f, y * f, (s || 0) + i * 17);
      f *= 2; amp *= 0.5;
    }
    return t;
  };

  // Colors
  U.hex = (h) => {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  U.rgb = (c) => 'rgb(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ')';
  U.shade = (h, f) => {
    const c = typeof h === 'string' ? U.hex(h) : h;
    return [U.clamp(c[0] * f, 0, 255), U.clamp(c[1] * f, 0, 255), U.clamp(c[2] * f, 0, 255)];
  };
  U.shadeHex = (h, f) => {
    const c = U.shade(h, f);
    return '#' + c.map((v) => ('0' + Math.round(v).toString(16)).slice(-2)).join('');
  };

  U.makeCanvas = (w, h) => {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    return c;
  };

  U.wait = (ms) => new Promise((r) => setTimeout(r, ms));

  U.reducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Save game (per-viewer, guarded)
  const KEY = 'the-way.save.v1';
  U.defaultSave = () => ({
    name: 'Eleazar',
    role: 'scribe',
    started: false,
    completed: {},
    obs: {},
    questions: [],
    reports: {},
    heart: {},
    heard: {},
    served: {},
    mapNode: 'jv',
    landNode: 'capernaum',
    jerNode: 'u1',
    region: 'galilee',
  });
  U.load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return U.defaultSave();
      return Object.assign(U.defaultSave(), JSON.parse(raw));
    } catch (e) {
      return U.defaultSave();
    }
  };
  U.store = (s) => {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* storage unavailable */ }
  };
  U.wipe = () => {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  };

  TW.U = U;
})(window.TW);
