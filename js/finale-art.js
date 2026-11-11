/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — art for the last era: Jerusalem in ruins, the seven lampstands, and the city of light. */
window.TW = window.TW || {};
(function (TW) {
  const K = TW.Kit, SC = TW.Scene, S = TW.S, U = TW.U;
  const R = K.R;
  Object.assign(K.looks, {
    oldjohn: { skin: '#b07a50', hair: '#e6e0d4', beard: '#e6e0d4', tunic: '#d8cfb8', mantle: '#6a5a4a' },
    reader: { skin: '#b8845a', hair: '#2a1a12', tunic: '#a8743a', veil: '#5a6a7a' },
    eunice: { skin: '#b8845a', hair: '#8a7a6a', tunic: '#5a4a3a', veil: '#7a6a5a' },
    carpus: { skin: '#c49470', hair: '#5f5048', beard: '#5f5048', tunic: '#8a7a5a' },
  });

  // Jerusalem seen from the Mount of Olives. ruin: 0 = as it stood, 1 = after the fire
  K.jerusalemStage = function (ruin, audio) {
    const st = { width: 256, ruin: ruin || 0, audio: audio || { music: 'jerusalem', amb: { wind: 0.3, birds: 0.3 } },
      bg(ctx, t) {
        ctx.drawImage(K.cityView(), 0, 0);
        if (st.ruin > 0) {
          ctx.globalAlpha = 0.72 * st.ruin; R(ctx, 0, 0, 256, 124, '#2a2622'); ctx.globalAlpha = 1;
          // the Temple is gone: smoke-stained sky where it stood, and a heap of fallen stone on the platform
          ctx.globalAlpha = st.ruin; R(ctx, 128, 8, 66, 62, '#34302c');
          for (let i = 0; i < 46; i++) { const x = 130 + Math.floor(K.rnd(i, 11) * 60), top = 70 - Math.floor(Math.max(0, 14 - Math.abs(x - 160) * 0.45) * K.rnd(i, 12)), w = 4 + Math.floor(K.rnd(i, 13) * 8), h = 3 + Math.floor(K.rnd(i, 14) * 5); R(ctx, x, top - h, w, h + 4, i % 3 ? '#4f4840' : '#625a4e'); }
          [136, 152, 181].forEach((cx, i) => { R(ctx, cx, 54 - i * 3, 4, 16 + i * 3, '#5a5248'); });
          ctx.globalAlpha = 1;
          // broken walls and tumbled stones where the city stood
          for (let i = 0; i < 60; i++) { const x = Math.floor(K.rnd(i, 1) * 250), y = 70 + Math.floor(K.rnd(i, 2) * 46), w = 3 + Math.floor(K.rnd(i, 3) * 9), h = 2 + Math.floor(K.rnd(i, 4) * 6); ctx.globalAlpha = st.ruin; R(ctx, x, y, w, h, i % 3 ? '#4a443c' : '#5a5348'); }
          ctx.globalAlpha = 1;
          // smoke
          for (let c = 0; c < 5; c++) { const sx = 40 + c * 44; for (let k = 0; k < 14; k++) { const yy = 70 - k * 5, dx = Math.round(Math.sin(t * 0.6 + k * 0.5 + c) * (2 + k * 0.6)); ctx.globalAlpha = (0.5 - k * 0.03) * st.ruin; R(ctx, sx + dx - k, yy, 6 + k * 2, 5, '#5a5650'); } }
          ctx.globalAlpha = 1;
        }
      },
      fx(fc, k) { if (st.ruin > 0) { fc.fillStyle = 'rgba(40,24,16,' + 0.25 * st.ruin + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); } } };
    SC.load(st); SC.cam = 0;
    return st;
  };

  // the seven golden lampstands, and one like a son of man among them (shown only as light)
  K.lampStage = function () {
    const st = { width: 256, glow: 0, audio: { music: 'wonder', amb: { shore: 0.5, wind: 0.2 } },
      bg(ctx, t) {
        for (let y = 0; y < 160; y++) R(ctx, 0, y, 256, 1, y < 100 ? '#0e1220' : '#141a2a');
        for (let i = 0; i < 50; i++) if (U.hash(i, 5, Math.floor(t * 2 + i)) > 0.3) R(ctx, Math.floor(U.hash(i, 1, 0) * 256), Math.floor(U.hash(i, 2, 0) * 90), 1, 1, '#c8d0e0');
        for (let k = 0; k < 7; k++) {
          const x = 38 + k * 30, y = 120 - Math.round(Math.sin((k / 6) * Math.PI) * 14);
          // a tall stand with a wide foot and a shallow oil bowl, and a flame above it
          R(ctx, x - 6, y + 19, 13, 2, '#b8902a'); R(ctx, x - 3, y + 16, 7, 3, '#c9a03a'); R(ctx, x - 1, y - 2, 3, 18, '#d8b04a');
          R(ctx, x - 6, y - 7, 13, 2, '#e6c05a'); R(ctx, x - 5, y - 5, 11, 2, '#d8b04a'); R(ctx, x - 3, y - 3, 7, 2, '#c9a03a');
          const f = Math.floor(t * 9 + k) % 3;
          R(ctx, x - 2, y - 12 - f, 5, 5 + f, '#f08a2a'); R(ctx, x - 1, y - 15 - f, 3, 7 + f, '#f8d05a'); R(ctx, x, y - 13 - f, 1, 5, '#fffbe8');
        }
      },
      fx(fc, k, t) {
        for (let i = 0; i < 7; i++) { const x = (38 + i * 30) * k, y = (108 - Math.sin((i / 6) * Math.PI) * 14) * k, g = fc.createRadialGradient(x, y, 0, x, y, 26 * k); g.addColorStop(0, 'rgba(255,214,120,0.35)'); g.addColorStop(1, 'rgba(255,214,120,0)'); fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k); }
        if (st.glow > 0) { const x = 128 * k, y = 78 * k, g = fc.createRadialGradient(x, y, 0, x, y, 70 * k); g.addColorStop(0, 'rgba(255,252,235,' + 0.95 * st.glow + ')'); g.addColorStop(0.25, 'rgba(255,240,190,' + 0.6 * st.glow + ')'); g.addColorStop(1, 'rgba(255,240,190,0)'); fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k); }
      } };
    SC.load(st); SC.cam = 0;
    return st;
  };

  // the city of light: walls like jewels, a river clear as crystal, and the tree of life on both banks
  K.newCityStage = function () {
    const st = { width: 256, light: 0, audio: { music: 'wonder', amb: { birds: 0.5, shore: 0.2 } },
      bg(ctx, t) {
        for (let y = 0; y < 160; y++) { const p = y / 160; R(ctx, 0, y, 256, 1, U.mix ? U.mix('#fff4cf', '#bfe3ee', p) : (p < 0.5 ? '#fff0c4' : '#cfe9ee')); }
        // the city
        R(ctx, 58, 46, 140, 44, '#f6e9bf'); R(ctx, 58, 46, 140, 3, '#fffaf0');
        const jewels = ['#7fb7d8', '#6fc3a0', '#d9a7d8', '#e6c05a', '#e58f7a', '#9fd0e6'];
        for (let k = 0; k < 12; k++) { R(ctx, 60 + k * 11.6, 84, 10, 6, jewels[k % 6]); }
        for (let k = 0; k < 3; k++) { R(ctx, 78 + k * 44, 62, 14, 28, '#fffdf4'); R(ctx, 80 + k * 44, 58, 10, 4, '#fffdf4'); }
        // the river
        for (let y = 90; y < 160; y++) { const w = 10 + (y - 90) * 0.9, cx = 128 + Math.sin(y * 0.08) * 4; R(ctx, Math.round(cx - w / 2), y, Math.round(w), 1, (y + Math.floor(t * 6)) % 5 ? '#8fd0e0' : '#d6f2f6'); }
        // the land and the tree of life on either bank
        for (let y = 96; y < 160; y++) { const w = 10 + (y - 90) * 0.9; R(ctx, 0, y, Math.round(128 - w / 2 - 4), 1, y % 3 ? '#9cc78a' : '#a8d096'); R(ctx, Math.round(128 + w / 2 + 6), y, 256, 1, y % 3 ? '#9cc78a' : '#a8d096'); }
        [[86, 128], [174, 128]].forEach((p) => { R(ctx, p[0], p[1] - 26, 4, 28, '#7a5a3a'); for (let n = 0; n < 44; n++) { const lx = p[0] - 16 + Math.floor(K.rnd(n, p[0]) * 36), ly = p[1] - 50 + Math.floor(K.rnd(p[0], n) * 26); R(ctx, lx, ly, 4, 3, n % 5 ? '#5f9a52' : '#e58f5a'); } });
      },
      fx(fc, k) { const x = 128 * k, y = 40 * k, g = fc.createRadialGradient(x, y, 0, x, y, 150 * k); g.addColorStop(0, 'rgba(255,255,245,' + (0.5 + 0.4 * st.light) + ')'); g.addColorStop(1, 'rgba(255,255,245,0)'); fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k); } };
    SC.load(st); SC.cam = 0;
    return st;
  };
})(window.TW);
