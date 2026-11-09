/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — art for the coast: Joppa, Simon the tanner's house, Cornelius's house in Caesarea, Peter's sheet. */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, K = TW.Kit, SC = TW.Scene;
  const R = K.R;

  Object.assign(K.looks, {
    roman: { skin: '#c49470', hair: '#3a2416', tunic: '#d8cfb8', mantle: '#8a2a22', belt: '#6a5a42' },
    romanw: { skin: '#c8a07c', hair: '#5a3a26', tunic: '#7a5a8a', veil: '#c9a86a' },
    tanner: { skin: '#9a6440', hair: '#2a1a12', beard: '#2a1a12', tunic: '#7a6a4a', belt: '#4a3a2a' },
    tabitha: { skin: '#b8845a', hair: '#5f5048', tunic: '#e6dcc4', veil: '#d8ccae' },
    angel: { skin: '#f0ebe0', hair: '#f0ebe0', tunic: '#fbf8f0', belt: '#ece6d6' },
  });

  // ---------- Joppa: a harbor town on a hill above the sea ----------
  let JOP = null;
  K.joppaArt = function () {
    if (JOP) return JOP;
    const W = 320, c = U.makeCanvas(W, 160), x = c.getContext('2d'), A = K.art();
    x.drawImage(A.sky, 0, 0); x.drawImage(A.sky, 100, 0, 64, 80, 256, 0, 64, 80);
    // the sea to the west, with the rocks off the harbor
    for (let y = 78; y < 128; y++) R(x, 0, y, W, 1, y < 82 ? '#9cbcc4' : y % 3 ? '#4f8a96' : '#5d96a0');
    // the low rocks off the harbor
    [[24, 112, 22], [56, 115, 12], [80, 113, 16]].forEach((r) => {
      for (let i = 0; i < r[2]; i++) { const h = Math.round(Math.sin((i / r[2]) * Math.PI) * 3) + 1; R(x, r[0] + i, r[1] - h, 1, h + 2, i % 3 ? '#7d7466' : '#6e665a'); }
      for (let i = 0; i < r[2] + 4; i += 2) R(x, r[0] - 2 + i, r[1] + 2, 1, 1, '#d2ddd4');
    });
    // the hill and the town climbing it
    for (let i = 110; i < W; i++) { const top = Math.round(118 - Math.min(40, (i - 110) * 0.45)); for (let y = top; y < 128; y++) R(x, i, y, 1, 1, K.rnd(i * 5, y) > 0.82 ? '#a8926c' : '#bba377'); }
    for (let k = 0; k < 22; k++) {
      const hx = 120 + k * 9, top = Math.round(118 - Math.min(40, (hx - 110) * 0.45)) - 2;
      R(x, hx, top - 9, 8, 10, k % 3 ? '#d6cbb2' : '#c8bc9f'); R(x, hx, top - 9, 8, 1, '#e4dbc6'); if (k % 4 === 1) { R(x, hx + 1, top - 15, 5, 6, '#cfc4a8'); }
      R(x, hx + 3, top - 5, 2, 3, '#3a2e24');
    }
    // the beach, the street and the tanner's drying racks by the water
    for (let y = 124; y < 160; y++) for (let i = 0; i < W; i++) R(x, i, y, 1, 1, y < 130 && i < 120 ? (K.rnd(i, y) > 0.7 ? '#958b7d' : '#a89c88') : K.rnd(i * 3, y) > 0.82 ? '#a8926c' : '#b49e78');
    for (let i = 0; i < 120; i++) if (K.rnd(i, 2) > 0.5) R(x, i, 124, 1, 1, '#d2ddd4');
    [[18, '#7a5a3a'], [36, '#8a6a42'], [54, '#6a4a2c']].forEach((h) => { R(x, h[0], 114, 1, 14, '#4a3420'); R(x, h[0] + 14, 114, 1, 14, '#4a3420'); R(x, h[0], 114, 15, 1, '#4a3420'); R(x, h[0] + 2, 115, 11, 8, h[1]); });
    JOP = c;
    return c;
  };

  // ---------- Cornelius's house: a Roman atrium ----------
  let ATR = null;
  K.atriumArt = function () {
    if (ATR) return ATR;
    const c = U.makeCanvas(256, 160), x = c.getContext('2d');
    R(x, 0, 0, 256, 160, '#3a2a22');
    // painted walls: red panels framed in black and ochre
    R(x, 0, 30, 256, 100, '#7e2a22');
    for (let k = 0; k < 6; k++) { const px = 8 + k * 42; R(x, px, 44, 34, 60, '#1e1612'); R(x, px + 2, 46, 30, 56, '#8a2e24'); R(x, px + 4, 48, 26, 52, '#9a3a2c'); R(x, px + 13, 62, 8, 20, '#c99a3a'); }
    R(x, 0, 104, 256, 4, '#c99a3a'); R(x, 0, 108, 256, 22, '#2a1e18');
    R(x, 0, 28, 256, 3, '#e6dfcc');
    // the roof opening and the light falling through it
    R(x, 92, 0, 72, 22, '#9cc0dc'); R(x, 88, 22, 80, 8, '#b8a888');
    // columns
    [70, 186].forEach((cx) => { R(x, cx, 30, 8, 104, '#e6dfcc'); R(x, cx - 2, 28, 12, 3, '#f0eadb'); R(x, cx + 1, 30, 1, 104, '#d0c8b4'); });
    // mosaic floor and the rain pool
    for (let y = 130; y < 160; y++) for (let i = 0; i < 256; i++) R(x, i, y, 1, 1, (Math.floor(i / 4) + Math.floor(y / 4)) % 2 ? '#e8e0cc' : (y > 150 ? '#2a2a2a' : '#d8d0bc'));
    R(x, 96, 136, 64, 10, '#a89c88'); R(x, 98, 138, 60, 6, '#5d8b92'); R(x, 98, 138, 60, 1, '#8ab4b8');
    // the doorway on the left
    R(x, 6, 60, 26, 70, '#1a1410'); R(x, 4, 58, 30, 3, '#c99a3a');
    ATR = c;
    return c;
  };

  // ---------- Peter's vision: a sheet let down from the sky ----------
  K.sheet = function (st) {
    return SC.add({ x: 0, y: 0, z: 900, draw(ctx) {
      if (!st.sheetY && st.sheetY !== 0) return;
      const y = Math.round(st.sheetY), cx = 128;
      for (let k = 0; k < 4; k++) R(ctx, cx - 40 + k * 26 + (k > 1 ? 2 : 0), 0, 1, y, '#f4f0e6');
      R(ctx, cx - 44, y, 88, 4, '#f6f2e8'); R(ctx, cx - 40, y + 4, 80, 18, '#efe9dc'); R(ctx, cx - 44, y + 22, 88, 3, '#f6f2e8');
      // creatures in the sheet, shown as small dark silhouettes
      const sil = '#4a3e34';
      R(ctx, cx - 32, y + 10, 10, 5, sil); R(ctx, cx - 31, y + 15, 2, 3, sil); R(ctx, cx - 24, y + 15, 2, 3, sil); R(ctx, cx - 22, y + 9, 3, 3, sil);
      R(ctx, cx - 14, y + 8, 4, 3, sil); R(ctx, cx - 16, y + 9, 2, 1, sil); R(ctx, cx - 10, y + 8, 2, 1, sil);
      R(ctx, cx - 2, y + 15, 14, 2, sil); R(ctx, cx + 10, y + 13, 3, 2, sil);
      R(ctx, cx + 18, y + 9, 9, 6, sil); R(ctx, cx + 17, y + 15, 2, 3, sil); R(ctx, cx + 25, y + 15, 2, 3, sil); R(ctx, cx + 26, y + 7, 2, 3, sil);
    } });
  };
})(window.TW);
