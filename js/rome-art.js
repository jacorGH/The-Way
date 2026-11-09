/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — art for Paul's arrest and imprisonment: the Fortress Antonia and its stairs, horsemen, and a night march. */
window.TW = window.TW || {};
(function (TW) {
  const K = TW.Kit, SC = TW.Scene, S = TW.S;
  const R = K.R;
  Object.assign(K.looks, {
    agabus: { skin: '#a8724a', hair: '#8a7a6a', beard: '#c8c0b4', tunic: '#6a5a42', mantle: '#4a3a2a' },
    james: { skin: '#b07a50', hair: '#8a7a6a', beard: '#a89a8a', tunic: '#e6dfcc', mantle: '#8a7a5a' },
    tribune: { skin: '#c49470', hair: '#3a2416', tunic: '#a83a2a', belt: '#d8b04a', helmet: '#b8a070' },
    highpriest: { skin: '#b8845a', hair: '#c8c0b4', beard: '#d8d0c4', tunic: '#3d4a7a', mantle: '#e6dfcc', stripe: '#d8b04a' },
    nephew: { skin: '#b8845a', hair: '#2a1a12', tunic: '#a89a7a' },
  });
  // the fortress and its stairs, drawn over the right end of the Temple court (world x 236–320)
  K.antonia = () => SC.add({ x: 280, y: 150, z: 60, draw(ctx, sx, sy) {
    const x0 = sx - 44;
    R(ctx, x0 + 20, 20, 70, 112, '#c2b392'); R(ctx, x0 + 20, 20, 70, 3, '#d8cba8');
    for (let k = 0; k < 4; k++) R(ctx, x0 + 24 + k * 16, 30, 6, 10, '#2a2018');
    R(ctx, x0 + 54, 4, 20, 18, '#b5a586'); for (let k = 0; k < 4; k++) R(ctx, x0 + 54 + k * 6, 1, 3, 4, '#b5a586');
    R(ctx, x0 + 26, 100, 14, 22, '#2a2018');
    // the stairs, down to the court floor
    for (let k = 0; k < 9; k++) R(ctx, x0 + 10 - k * 4, 120 + k * 3, 40, 3, k % 2 ? '#d8cba8' : '#cfc0a0');
  } });
  // a horseman
  K.horse = (x, y, look) => SC.add({ x: x, y: y, speed: 30, draw(ctx, sx, sy, t) {
    const step = this.moving ? Math.floor(t * 8) % 2 : 0;
    R(ctx, sx - 12, sy - 15, 22, 8, '#4a3424'); R(ctx, sx + 8, sy - 20, 5, 8, '#4a3424'); R(ctx, sx + 11, sy - 21, 4, 4, '#3a2818');
    R(ctx, sx - 10, sy - 7, 2, 7 - step, '#3a2818'); R(ctx, sx - 5, sy - 7, 2, 6 + step, '#3a2818'); R(ctx, sx + 4, sy - 7, 2, 7 - step, '#3a2818'); R(ctx, sx + 8, sy - 7, 2, 6 + step, '#3a2818');
    R(ctx, sx - 14, sy - 14, 2, 7, '#2a1a10');
    R(ctx, sx - 3, sy - 25, 6, 10, (look && look.tunic) || '#a83a2a'); R(ctx, sx - 2, sy - 29, 4, 4, '#c49470'); R(ctx, sx - 2, sy - 31, 4, 2, '#b8a070');
  } });
  // ---------- the voyage ----------
  const U = TW.U;
  // a grain ship tossed in a storm: dark sky, rain, lightning, heavy swells
  K.stormStage = function () {
    const st = { width: 256, flash: 0, calm: 0, audio: { music: 'storm', amb: { storm: 1, shore: 0.9, wind: 0.8 } },
      bg(ctx, t) {
        const c = st.calm;
        for (let y = 0; y < 90; y++) R(ctx, 0, y, 256, 1, c > 0.5 ? (y < 40 ? '#5a6a78' : '#7a8890') : (y < 40 ? '#1e232c' : '#2a3038'));
        if (st.flash > 0) { ctx.globalAlpha = st.flash; R(ctx, 0, 0, 256, 90, '#dfe6ee'); ctx.globalAlpha = 1; st.flash = Math.max(0, st.flash - 0.08); }
        const amp = 10 * (1 - c) + 2;
        for (let x = 0; x < 256; x++) {
          const h = Math.round(92 + Math.sin(x * 0.045 + t * 1.6) * amp + Math.sin(x * 0.11 - t * 2.3) * amp * 0.4);
          R(ctx, x, h, 1, 160 - h, '#203a44'); R(ctx, x, h, 1, 2, c > 0.5 ? '#9cc0c4' : '#6f8f98');
          if (Math.sin(x * 0.045 + t * 1.6) > 0.85 && c < 0.5) R(ctx, x, h - 1, 1, 2, '#d8e4e6');
        }
        if (c < 0.7) for (let i = 0; i < 90; i++) { const rx = Math.floor(U.hash(i, 1, Math.floor(t * 12)) * 256), ry = Math.floor(U.hash(i, 2, Math.floor(t * 12)) * 150); R(ctx, rx, ry, 1, 4, 'rgba(200,210,220,0.45)'); }
      } };
    SC.load(st); SC.cam = 0;
    st.ship = SC.add({ x: 128, y: 120, z: 120, draw(ctx, sx, sy, t) {
      const amp = 8 * (1 - st.calm) + 1, y = sy + Math.round(Math.sin(t * 1.6 + 2.9) * amp), tilt = Math.sin(t * 1.3) * (1 - st.calm);
      for (let i = 0; i < 10; i++) { const off = Math.round(tilt * (i - 5) * 0.8); R(ctx, sx - 50 + i * 2, y - 12 + i + off, 100 - i * 4, 1, i < 2 ? '#6a4a2c' : i % 2 ? '#4c341f' : '#5a3e26'); }
      R(ctx, sx - 1 + Math.round(tilt * 4), y - 60, 3, 50, '#3a2818');
      if (!st.bare) for (let r = 0; r < 16; r++) R(ctx, sx - 12 + Math.round(tilt * 4), y - 56 + r, 24, 1, '#c8bca0');
    } });
    return st;
  };
  // night on a beach in the rain, with a fire and the wreck offshore
  K.beachStage = function () {
    const A = K.art(), st = { width: 256, audio: { music: 'reflect', amb: { shore: 0.9, storm: 0.35, fire: 0.6, wind: 0.3 } },
      bg(ctx, t) {
        for (let y = 0; y < 82; y++) R(ctx, 0, y, 256, 1, y < 40 ? '#1c2028' : '#262c34');
        for (let i = 0; i < 256; i++) { const h = Math.round(10 + (U.fbm(i * 0.04, 4.4, 3, 3) - 0.3) * 14); R(ctx, i, 82 - h, 1, h, '#2a2e30'); }
        for (let y = 82; y < 116; y++) R(ctx, 0, y, 256, 1, y % 4 ? '#1e3640' : '#24404a');
        R(ctx, 190, 98, 40, 6, '#3a2818'); R(ctx, 206, 80, 2, 18, '#2a1e14'); R(ctx, 196, 92, 18, 2, '#2a1e14');
        for (let y = 116; y < 160; y++) R(ctx, 0, y, 256, 1, y % 3 ? '#4a4034' : '#423a30');
        for (let i = 0; i < 70; i++) { const rx = Math.floor(U.hash(i, 1, Math.floor(t * 12)) * 256), ry = Math.floor(U.hash(i, 2, Math.floor(t * 12)) * 150); R(ctx, rx, ry, 1, 3, 'rgba(190,200,210,0.35)'); }
      },
      fx(fc, k) {
        const g = fc.createRadialGradient(118 * k, 136 * k, 0, 118 * k, 136 * k, 70 * k);
        g.addColorStop(0, 'rgba(255,170,90,0.42)'); g.addColorStop(1, 'rgba(255,170,90,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
      } };
    void A;
    SC.load(st); SC.cam = 0;
    st.fire = SC.add({ x: 118, y: 150, z: 150, draw(ctx, sx, sy, t) {
      for (let k = 0; k < 6; k++) R(ctx, sx - 12 + k * 4, sy - 3, 4, 3, '#4a3020');
      for (let k = 0; k < 12; k++) { const fx = sx - 9 + Math.floor(U.hash(k, 3, Math.floor(t * 10)) * 18), fh = 4 + Math.floor(U.hash(k + 9, 3, Math.floor(t * 10)) * 12); R(ctx, fx, sy - 3 - fh, 2, fh, k % 3 ? '#e8902a' : '#f4d46a'); }
    } });
    return st;
  };
  // the Appian Way: paving, tombs, umbrella pines
  let APP = null;
  K.appianArt = function () {
    if (APP) return APP;
    const W = 320, c = U.makeCanvas(W, 160), x = c.getContext('2d'), A = K.art();
    x.drawImage(A.sky, 0, 0); x.drawImage(A.sky, 100, 0, 64, 80, 256, 0, 64, 80);
    for (let i = 0; i < W; i++) { const t = 70 + Math.round((U.fbm(i * 0.015, 7.7, 3, 3) - 0.5) * 14); R(x, i, t, 1, 40, '#a8a690'); }
    for (let y = 96; y < 160; y++) R(x, 0, y, W, 1, K.rnd(3, y) > 0.8 ? '#7d8450' : '#868c58');
    [[30, 18], [110, 14], [200, 20], [280, 16]].forEach((tb) => { R(x, tb[0], 118 - tb[1] * 2, tb[1] * 2, tb[1] * 2, '#d8d0bc'); R(x, tb[0] - 2, 118 - tb[1] * 2, tb[1] * 2 + 4, 3, '#e6dfcc'); });
    [[70, 0], [160, 1], [250, 0]].forEach((p) => { R(x, p[0], 92, 3, 34, '#5a4632'); for (let k = 0; k < 40; k++) R(x, p[0] - 16 + Math.floor(K.rnd(p[0], k) * 34), 78 + Math.floor(K.rnd(k, p[0]) * 12), 4, 3, k % 3 ? '#4f6a3a' : '#5d7a44'); });
    for (let y = 132; y < 160; y++) for (let i = 0; i < W; i++) R(x, i, y, 1, 1, (Math.floor(i / 9) + Math.floor(y / 5)) % 3 ? '#8a8578' : '#7a766a');
    R(x, 0, 130, W, 2, '#6a665a');
    APP = c;
    return c;
  };
})(window.TW);