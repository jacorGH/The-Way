/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — art for the Aegean episodes: the river outside Philippi, the prison, and a crossing by sea. */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, K = TW.Kit, SC = TW.Scene, S = TW.S;
  const R = K.R;
  Object.assign(K.looks, {
    silas: { skin: '#b07a50', hair: '#2a1a12', beard: '#2a1a12', tunic: '#cdbb94', mantle: '#5a4a6a' },
    timothy: { skin: '#b8845a', hair: '#3a2416', tunic: '#a89a7a', mantle: '#4a6a5a' },
    luke: { skin: '#c49470', hair: '#5f5048', beard: '#5f5048', tunic: '#d8cfb8', mantle: '#3d5a7a' },
    lydia: { skin: '#c8a07c', hair: '#3a2416', tunic: '#e6dfcc', veil: '#6a2a5a', stripe: '#d8b04a' },
    slavegirl: { skin: '#b8845a', hair: '#2a1a12', tunic: '#8a7a5a' },
    magistrate: { skin: '#c49470', hair: '#8a7a6a', tunic: '#f0eadb', stripe: '#6a1a2a', mantle: '#f4f0e6' },
    jailer: { skin: '#a8724a', hair: '#2a1a12', beard: '#2a1a12', tunic: '#6a5a42', belt: '#3a2a1a' },
    macedonian: { skin: '#c49470', hair: '#3a2416', tunic: '#8a3a2a', mantle: '#d8b04a' },
  });

  // the river Gangites outside the gate of Philippi
  let RIV = null;
  K.riverArt = function () {
    if (RIV) return RIV;
    const W = 320, c = U.makeCanvas(W, 160), x = c.getContext('2d'), A = K.art();
    x.drawImage(A.sky, 0, 0); x.drawImage(A.sky, 100, 0, 64, 80, 256, 0, 64, 80);
    for (let i = 0; i < W; i++) { const t = 58 + Math.round((U.fbm(i * 0.015, 8.8, 3, 3) - 0.5) * 22); R(x, i, t, 1, 92 - t, '#a8a69a'); }
    for (let i = 0; i < W; i++) { const t = 72 + Math.round((U.fbm(i * 0.03, 2.1, 5, 3) - 0.5) * 18); R(x, i, t, 1, 92 - t, K.rnd(i, 7) > 0.85 ? '#7f8662' : '#8a8f6a'); }
    for (let i = 0; i < W; i++) for (let y = 92; y < 160; y++) R(x, i, y, 1, 1, K.rnd(i * 7, y) > 0.86 ? '#6e7646' : '#7d8450');
    // the city wall far off on the left
    R(x, 0, 86, 70, 10, '#c9bd9f'); for (let k = 0; k < 70; k += 6) R(x, k, 83, 4, 3, '#c9bd9f'); R(x, 40, 88, 10, 8, '#2a2018');
    // the river and its banks
    for (let i = 0; i < W; i++) { const y = 128 + Math.round(Math.sin(i * 0.03) * 3); R(x, i, y, 1, 12, '#4f8a96'); R(x, i, y, 1, 1, '#86b0b4'); R(x, i, y + 12, 1, 2, '#8a7656'); }
    for (let k = 0; k < 9; k++) { const tx = 20 + k * 36; R(x, tx, 100, 3, 26, '#5a4632'); for (let n = 0; n < 24; n++) R(x, tx - 10 + Math.floor(K.rnd(k, n) * 23), 84 + Math.floor(K.rnd(k, n + 30) * 18), 3, 2, n % 3 ? '#6f7a48' : '#8a9058'); }
    RIV = c;
    return c;
  };
  // the stocks in the inner prison
  K.stocks = (x, y) => SC.add({ x: x, y: y, z: y + 0.5, draw(ctx, sx, sy) { R(ctx, sx - 16, sy - 6, 32, 5, '#5a3e26'); R(ctx, sx - 16, sy - 6, 32, 1, '#6e5034'); R(ctx, sx - 15, sy - 1, 2, 3, '#4a3420'); R(ctx, sx + 13, sy - 1, 2, 3, '#4a3420'); for (let k = 0; k < 4; k++) R(ctx, sx - 11 + k * 7, sy - 5, 2, 2, '#2a1e14'); } });
  // a crossing by sea, with an island rising ahead
  K.seaStage = function (opts) {
    const A = K.art(), st = { width: 256, land: 0, audio: { music: 'land', amb: { shore: 0.8, wind: 0.35 } },
      bg(ctx, t) {
        ctx.drawImage(A.sky, 0, 0);
        if (st.land > 0) for (let i = 0; i < 256; i++) { const h = Math.round(st.land * (8 + (U.fbm(i * 0.05, 3.3, 3, 3) - 0.3) * 30)); if (i > 140 && h > 0) R(ctx, i, 82 - h, 1, h, '#8a8a80'); }
        for (let y = 82; y < 160; y++) R(ctx, 0, y, 256, 1, y < 84 ? '#9cbcc4' : y % 4 ? '#3f7a88' : '#4a8592');
        const fr = Math.floor(t * 3);
        for (let i = 0; i < 70; i++) if (U.hash(i, 9, fr) > 0.55) R(ctx, Math.floor(U.hash(i, 2, 0) * 256), 86 + Math.floor(U.hash(i, 3, 0) * 70), 3, 1, '#8fbcc0');
      } };
    Object.assign(st, opts || {});
    SC.load(st); SC.cam = 0;
    SC.add({ x: 128, y: 136, z: 136, draw(ctx, sx, sy, t) {
      const y = sy + Math.round(Math.sin(t * 1.6) * 1.5), x = sx;
      for (let i = 0; i < 9; i++) R(ctx, x - 46 + i * 2, y - 12 + i, 92 - i * 4, 1, i < 2 ? '#7a5634' : i % 2 ? '#5a3e26' : '#4c341f');
      R(ctx, x - 1, y - 70, 3, 58, '#4a3420'); R(ctx, x - 26, y - 66, 54, 2, '#4a3420');
      for (let r = 0; r < 40; r++) R(ctx, x - 25, y - 64 + r, 50, 1, Math.floor(r / 5) % 2 ? '#e6dcc4' : '#3d5a7a');
    } });
    return st;
  };
  // Athens: the Acropolis and the Parthenon above the agora, with its colonnade and statues
  let ATH = null;
  K.athensArt = function () {
    if (ATH) return ATH;
    const W = 320, c = U.makeCanvas(W, 160), x = c.getContext('2d'), A = K.art();
    x.drawImage(A.sky, 0, 0); x.drawImage(A.sky, 100, 0, 64, 80, 256, 0, 64, 80);
    for (let i = 0; i < W; i++) { const t = 62 + Math.round((U.fbm(i * 0.012, 4.4, 3, 3) - 0.5) * 18); R(x, i, t, 1, 40, '#aaa598'); }
    // the rock of the Acropolis
    for (let i = 150; i < 300; i++) { const t = Math.round(100 - Math.min(28, Math.min(i - 150, 300 - i) * 0.6)); R(x, i, t, 1, 104 - t, K.rnd(i, 3) > 0.7 ? '#b5a586' : '#c2b392'); }
    // the Parthenon
    R(x, 190, 64, 64, 6, '#efe8d6'); for (let k = 0; k < 11; k++) R(x, 192 + k * 6, 50, 3, 14, '#f4efe2'); R(x, 189, 47, 66, 3, '#efe8d6');
    for (let k = 0; k < 33; k++) R(x, 189 + k * 2, 47 - Math.round((16 - Math.abs(k - 16)) * 0.45), 2, Math.round((16 - Math.abs(k - 16)) * 0.45), '#ece5d2');
    R(x, 262, 66, 18, 6, '#e6dfcc'); for (let k = 0; k < 3; k++) R(x, 264 + k * 6, 58, 2, 8, '#efe8d6');
    // the agora: a long colonnade (stoa) and paving
    R(x, 0, 92, W, 3, '#e6dfcc');
    R(x, 0, 95, W, 31, '#8f826a'); R(x, 0, 95, W, 6, '#7a6e58');
    for (let k = 0; k < 16; k++) R(x, 14 + k * 20, 106, 8, 20, '#6e624e');
    for (let k = 0; k < 14; k++) R(x, 6 + k * 22, 95, 4, 31, '#e8e1cd');
    for (let y = 126; y < 160; y++) for (let i = 0; i < W; i++) R(x, i, y, 1, 1, (Math.floor(i / 10) + Math.floor(y / 5)) % 2 ? '#cfc4a8' : '#c4b799');
    // statues and herms on pedestals
    [[40, '#d8d0bc'], [100, '#b8a888'], [160, '#d8d0bc'], [228, '#a89878']].forEach((st) => {
      const sx = st[0]; R(x, sx - 4, 118, 9, 8, '#cfc4a8'); R(x, sx - 2, 102, 5, 16, st[1]); R(x, sx - 1, 98, 3, 4, st[1]);
    });
    ATH = c;
    return c;
  };
  // Corinth: Acrocorinth above the forum
  let COR = null;
  K.corinthArt = function () {
    if (COR) return COR;
    const W = 320, c = U.makeCanvas(W, 160), x = c.getContext('2d'), A = K.art();
    x.drawImage(A.sky, 0, 0); x.drawImage(A.sky, 100, 0, 64, 80, 256, 0, 64, 80);
    for (let i = 0; i < W; i++) { const t = 66 + Math.round((U.fbm(i * 0.015, 1.7, 3, 3) - 0.5) * 16); R(x, i, t, 1, 104 - t, '#b0aa9c'); }
    for (let i = 0; i < W; i++) { const h = Math.max(0, 70 - Math.abs(i - 210) * 0.75) + (U.fbm(i * 0.04, 6.6, 3, 3) - 0.5) * 10; const t = Math.round(96 - h); R(x, i, t, 1, 104 - t, K.rnd(i, 4) > 0.75 ? '#9a8f78' : '#a89c84'); }
    R(x, 200, 26, 16, 6, '#e6dfcc'); for (let k = 0; k < 4; k++) R(x, 201 + k * 4, 30, 2, 6, '#efe8d6');
    R(x, 0, 96, W, 3, '#e6dfcc'); R(x, 0, 99, W, 27, '#8f826a'); R(x, 0, 99, W, 5, '#7a6e58');
    for (let k = 0; k < 16; k++) R(x, 14 + k * 20, 108, 8, 18, '#6e624e');
    for (let k = 0; k < 14; k++) R(x, 6 + k * 24, 99, 4, 27, '#e8e1cd');
    for (let y = 126; y < 160; y++) for (let i = 0; i < W; i++) R(x, i, y, 1, 1, (Math.floor(i / 12) + Math.floor(y / 6)) % 2 ? '#cfc4a8' : '#c6b99c');
    COR = c;
    return c;
  };
  // the bema, the raised judgment seat in the forum
  K.bema = (bx, by) => SC.add({ x: bx, y: by, z: by - 6, draw(ctx, sx, sy) { R(ctx, sx - 22, sy - 10, 44, 10, '#d8d0bc'); R(ctx, sx - 24, sy - 12, 48, 3, '#e6dfcc'); for (let k = 0; k < 3; k++) R(ctx, sx - 30 + k * 2, sy - 3 - k * 3, 8, 3, '#cfc4a8'); R(ctx, sx - 6, sy - 20, 12, 8, '#8a6a42'); } });
  // the theater at Ephesus, cut into the hillside, tier above tier
  let THE = null;
  K.theaterArt = function () {
    if (THE) return THE;
    const W = 320, c = U.makeCanvas(W, 160), x = c.getContext('2d'), A = K.art();
    x.drawImage(A.sky, 0, 0); x.drawImage(A.sky, 100, 0, 64, 80, 256, 0, 64, 80);
    for (let i = 0; i < W; i++) { const t = 18 + Math.round((U.fbm(i * 0.02, 9.1, 3, 3) - 0.5) * 20); R(x, i, t, 1, 60, '#8a8f6a'); }
    for (let i = 0; i < W; i++) R(x, i, 26, 1, 86, '#8f826a');
    for (let row = 0; row < 16; row++) {
      const y = 30 + row * 5, half = 150 - row * 3;
      for (let i = 160 - half; i < 160 + half; i++) {
        const yy = y + Math.round(Math.pow((i - 160) / half, 2) * -10);
        R(x, i, yy, 1, 4, row % 2 ? '#cfc4a8' : '#c2b699'); R(x, i, yy + 4, 1, 1, '#9a8e74');
      }
    }
    for (let k = 0; k < 7; k++) { const sx = 160 + (k - 3) * 40; R(x, sx, 26, 2, 84, '#b3a78c'); }
    for (let y = 110; y < 160; y++) R(x, 0, y, W, 1, y < 112 ? '#e6dfcc' : '#cdbf9f');
    R(x, 60, 112, 200, 3, '#b8ab8e');
    THE = c;
    return c;
  };
  // a shore with a ship waiting offshore
  K.shoreStage = function (opts) {
    const A = K.art(), st = { width: 256, audio: { music: 'reflect', amb: { shore: 0.8, wind: 0.25, birds: 0.2 } },
      bg(ctx, t) {
        ctx.drawImage(A.sky, 0, 0);
        for (let i = 0; i < 256; i++) { const h = Math.round(6 + (U.fbm(i * 0.04, 2.2, 3, 3) - 0.3) * 10); R(ctx, i, 82 - h, 1, h, '#9a9888'); }
        for (let y = 82; y < 122; y++) R(ctx, 0, y, 256, 1, y % 4 ? '#3f7a88' : '#4a8592');
        const fr = Math.floor(t * 3);
        for (let i = 0; i < 40; i++) if (U.hash(i, 9, fr) > 0.55) R(ctx, Math.floor(U.hash(i, 2, 0) * 256), 86 + Math.floor(U.hash(i, 3, 0) * 34), 3, 1, '#8fbcc0');
        const sx = 190, sy = 104 + Math.round(Math.sin(t * 1.4));
        for (let i = 0; i < 4; i++) R(ctx, sx - 18 + i, sy + i, 36 - i * 2, 1, '#5a3e26');
        R(ctx, sx, sy - 24, 1, 24, '#4a3420'); for (let r = 0; r < 16; r++) R(ctx, sx - 9, sy - 23 + r, 19, 1, Math.floor(r / 4) % 2 ? '#e6dcc4' : '#a83a2a');
        for (let y = 122; y < 160; y++) R(ctx, 0, y, 256, 1, y < 124 ? '#d8ecec' : y % 3 ? '#cdb98e' : '#c4ae82');
      } };
    Object.assign(st, opts || {});
    SC.load(st); SC.cam = 0;
    return st;
  };
})(window.TW);