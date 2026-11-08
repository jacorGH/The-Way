/* The Way — Era IV art: the city of Samaria (Sebaste), the desert road to Gaza, and Straight Street in Damascus. */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, K = TW.Kit, S = TW.S, SC = TW.Scene;
  const R = K.R;

  Object.assign(K.looks, {
    philip: { skin: '#b07a50', hair: '#2a1a12', beard: '#2a1a12', tunic: '#cdbb94', mantle: '#6a4a3a' },
    simonmagus: { skin: '#a8724a', hair: '#1e1410', beard: '#1e1410', tunic: '#5a2a5a', mantle: '#c99a3a', stripe: '#d8b04a' },
    eunuch: { skin: '#4a2c1e', hair: '#151010', tunic: '#ece4d0', mantle: '#b8862e', stripe: '#2a5a7a' },
    driver: { skin: '#5a3626', hair: '#151010', tunic: '#a89a7a' },
    ananias: { skin: '#a8724a', hair: '#5f5048', beard: '#7a6a5a', tunic: '#cdbb94', mantle: '#5a6a4a' },
    sychar: { skin: '#a06a42', hair: '#1e1410', tunic: '#8a3a2a', veil: '#9a7a5a' },
  });

  const skyAnd = (x, W, hills) => {
    const A = K.art();
    for (let i = 0; i < W; i += 256) x.drawImage(A.sky, i, 0);
    for (let i = 0; i < W; i++) { const top = hills.top + Math.round((U.fbm(i * hills.f, hills.seed, 7, 3) - 0.5) * hills.amp); R(x, i, top, 1, 160 - top, hills.color); }
  };

  // ---------- Sebaste: a hill city with Herod's temple to Augustus ----------
  let SEB = null;
  K.sebasteArt = function () {
    if (SEB) return SEB;
    const W = 320, c = U.makeCanvas(W, 160), x = c.getContext('2d');
    skyAnd(x, W, { top: 64, f: 0.03, seed: 4.4, amp: 10, color: '#a9a497' });
    // the hill
    for (let i = 0; i < W; i++) { const top = 84 - Math.round(Math.max(0, 30 - Math.abs(i - 200) * 0.28)); for (let y = top; y < 126; y++) R(x, i, y, 1, 1, K.rnd(i * 5, y) > 0.8 ? '#7d8450' : '#97905e'); }
    // temple of Augustus on the summit: podium, columns, pediment
    R(x, 176, 56, 48, 10, '#e6dfcc'); R(x, 176, 56, 48, 1, '#f3eee0');
    for (let k = 0; k < 7; k++) R(x, 180 + k * 6, 40, 3, 16, '#f0eadb');
    R(x, 177, 38, 46, 3, '#e6dfcc');
    for (let k = 0; k < 9; k++) R(x, 186 + k * 2, 36 - Math.min(k, 8 - k), 28 - k * 4 > 0 ? 2 : 2, 1, '#e6dfcc');
    R(x, 182, 30, 36, 1, '#d8cfb8'); for (let k = 0; k < 18; k++) R(x, 182 + k * 2, 30 + Math.abs(k - 9) * 0.6, 2, 8 - Math.abs(k - 9) * 0.6, '#ece6d6');
    // houses and wall on the slopes
    for (let k = 0; k < 26; k++) { const hx = 110 + k * 7, top = 84 - Math.round(Math.max(0, 30 - Math.abs(hx - 200) * 0.28)); if (hx > 172 && hx < 228) continue; R(x, hx, top + 4, 6, 7, k % 2 ? '#d6cbb2' : '#c8bc9f'); R(x, hx, top + 4, 6, 1, '#e4dbc6'); }
    R(x, 60, 96, 260, 4, '#bdb194'); for (let i = 60; i < W; i += 6) R(x, i, 93, 4, 3, '#bdb194');
    // a colonnaded street in front
    for (let y = 126; y < 160; y++) for (let i = 0; i < W; i++) R(x, i, y, 1, 1, K.rnd(i * 3, y) > 0.82 ? '#b5a888' : '#c4b799');
    for (let k = 0; k < 12; k++) { R(x, 8 + k * 28, 100, 4, 26, '#e0d8c4'); R(x, 6 + k * 28, 98, 8, 2, '#ece6d6'); }
    R(x, 0, 98, W, 1, '#d8cfb8');
    SEB = c;
    return c;
  };

  // ---------- the desert road: dry hills, a wadi with a pool ----------
  let DES = null;
  K.desertArt = function () {
    if (DES) return DES;
    const W = 400, c = U.makeCanvas(W, 160), x = c.getContext('2d');
    skyAnd(x, W, { top: 70, f: 0.02, seed: 9.1, amp: 12, color: '#b9ab8c' });
    for (let i = 0; i < W; i++) { const top = 92 + Math.round((U.fbm(i * 0.05, 3.3, 2, 3) - 0.5) * 14); for (let y = top; y < 160; y++) { const r = K.rnd(i * 7, y); R(x, i, y, 1, 1, y - top < 2 ? '#c9b58a' : r > 0.9 ? '#a8926c' : r > 0.5 ? '#c4ad80' : '#bba377'); } }
    for (let i = 0; i < 40; i++) R(x, Math.floor(K.rnd(i, 3) * W), 100 + Math.floor(K.rnd(i, 4) * 30), 2, 1, '#7d7a50');
    for (let i = 0; i < W; i++) R(x, i, 140 + Math.round(Math.sin(i * 0.02) * 2), 1, 7, K.rnd(i, 9) > 0.85 ? '#a08a64' : '#b19a70');
    // the wadi and its pool (seen once the road reaches it)
    R(x, 290, 132, 70, 2, '#a08a64'); R(x, 296, 134, 58, 6, '#5d8b92'); R(x, 296, 134, 58, 1, '#86b0b4'); R(x, 292, 140, 66, 1, '#8a7656');
    for (let k = 0; k < 4; k++) { R(x, 286 + k * 22, 120, 2, 12, '#5a4a32'); R(x, 282 + k * 22, 114, 10, 7, '#6f7a48'); }
    DES = c;
    return c;
  };

  // ---------- Damascus: Straight Street ----------
  let STR = null;
  K.straightArt = function () {
    if (STR) return STR;
    const W = 320, c = U.makeCanvas(W, 160), x = c.getContext('2d');
    skyAnd(x, W, { top: 52, f: 0.025, seed: 6.2, amp: 16, color: '#a7a6a2' });
    for (let i = 0; i < W; i++) { const top = 52 + Math.round((U.fbm(i * 0.025, 6.2, 7, 3) - 0.5) * 16); R(x, i, top, 1, 4, '#ecebe6'); }
    // houses behind the colonnade
    for (let k = 0; k < 22; k++) { const hx = k * 15, h = 26 + (k % 3) * 8; R(x, hx, 104 - h, 14, h, k % 2 ? '#d6cbb2' : '#c8bc9f'); R(x, hx, 104 - h, 14, 1, '#e4dbc6'); R(x, hx + 4, 98 - h + 12, 4, 6, '#3a2e24'); }
    R(x, 0, 104, W, 22, '#cdbf9f');
    for (let k = 0; k < 11; k++) { R(x, 10 + k * 30, 74, 4, 52, '#e0d8c4'); R(x, 8 + k * 30, 72, 8, 3, '#ece6d6'); R(x, 6 + k * 30, 124, 12, 2, '#bfb294'); }
    R(x, 0, 70, W, 3, '#e6dfcc');
    for (let k = 0; k < 10; k++) { R(x, 18 + k * 30, 108, 12, 14, '#3a2e24'); R(x, 18 + k * 30, 106, 12, 2, ['#8a3a2a', '#3d5a7a', '#c99a3a'][k % 3]); }
    for (let y = 126; y < 160; y++) for (let i = 0; i < W; i++) R(x, i, y, 1, 1, K.rnd(i * 3, y) > 0.8 ? '#a89a7c' : (Math.floor(i / 12) + Math.floor(y / 6)) % 2 ? '#b8aa8c' : '#c0b296');
    STR = c;
    return c;
  };

  // ---------- a horse-drawn carriage, pointing right ----------
  K.carriage = function (x, y, rider) {
    const e = SC.add({ x: x, y: y, speed: 10, draw(ctx, sx, sy, t) {
      const moving = e.moving, step = moving ? Math.floor(t * 6) % 2 : 0;
      // horses
      for (let h = 0; h < 2; h++) {
        const hx = sx + 22 + h * 3, hy = sy - h;
        R(ctx, hx, hy - 14, 16, 7, h ? '#5a3a26' : '#6a4630'); R(ctx, hx + 14, hy - 20, 4, 8, h ? '#5a3a26' : '#6a4630'); R(ctx, hx + 16, hy - 21, 4, 3, '#4a2e1e');
        R(ctx, hx + 1, hy - 7, 2, 7 - step, '#4a2e1e'); R(ctx, hx + 13, hy - 7, 2, 6 + step, '#4a2e1e'); R(ctx, hx - 1, hy - 13, 2, 5, '#2a1a12');
      }
      R(ctx, sx + 10, sy - 12, 14, 1, '#3a2a1a');
      // the carriage
      R(ctx, sx - 12, sy - 16, 24, 8, '#8a6a42'); R(ctx, sx - 12, sy - 16, 24, 1, '#a8885a');
      R(ctx, sx - 12, sy - 30, 2, 14, '#6a4a2c'); R(ctx, sx + 10, sy - 30, 2, 14, '#6a4a2c'); R(ctx, sx - 13, sy - 32, 27, 3, '#d8b04a');
      for (let w = 0; w < 2; w++) { const wx = sx - 6 + w * 12; R(ctx, wx - 4, sy - 8, 8, 8, '#4a3420'); R(ctx, wx - 2, sy - 6, 4, 4, '#8a6a42'); }
      if (e.rider) ctx.drawImage(e.rider, sx - Math.round(e.rider.width / 2) - 3, sy - 10 - e.rider.height);
      if (e.rider2) ctx.drawImage(e.rider2, sx - Math.round(e.rider2.width / 2) + 6, sy - 10 - e.rider2.height);
      if (e.reader) { R(ctx, sx - 4, sy - 27, 6, 3, '#e6dcc4'); R(ctx, sx - 5, sy - 27, 1, 3, '#8a6a42'); R(ctx, sx + 2, sy - 27, 1, 3, '#8a6a42'); }
    } });
    e.rider = rider ? (rider.sit || rider.stand).r : null;
    return e;
  };
})(window.TW);
