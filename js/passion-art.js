/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — shared art for the Passion episodes.
   The crucifixion is shown reverently: from a distance, as dark silhouettes against the sky, with no wounds or gore. */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, K = TW.Kit, S = TW.S, SC = TW.Scene;
  const R = K.R;

  K.looks = {
    nicodemus: { skin: '#a8724a', hair: '#8a8278', beard: '#9a9288', tunic: '#d8ccae', mantle: '#5a4a3a', fringe: '#9cc0e0', phylactery: true, belt: null },
    joseph: { skin: '#b07a50', hair: '#3a2416', beard: '#5f5048', tunic: '#d8ccae', mantle: '#6a3a5a', fringe: '#9cc0e0', belt: null },
    caiaphas: { skin: '#b07a50', hair: '#5f5048', beard: '#5f5048', tunic: '#e8e0cc', mantle: '#3d4f6a', stripe: '#d8b04a', fringe: '#d8b04a' },
    magdalene: { skin: '#a8724a', hair: '#2a1a12', tunic: '#7a3a2a', veil: '#8a5a4a' },
    maryj: { skin: '#a06a42', hair: '#2a1a12', tunic: '#5a4a3a', veil: '#4a4a5a' },
    salome: { skin: '#b8845a', hair: '#2a1a12', tunic: '#6a6a52', veil: '#9a8a6a' },
    soldier: { skin: '#b8845a', hair: '#7d7d78', beard: null, tunic: '#8a2a22', belt: '#6a6a64', mantle: '#5a2018' },
    centurion: { skin: '#b07a50', hair: '#8f8f88', beard: null, tunic: '#8a2a22', stripe: '#c9a040', belt: '#6a6a64', mantle: '#6a1a14' },
    simon: { skin: '#6a4430', hair: '#1e1410', beard: '#1e1410', tunic: '#b49a6a' },
    peter: { skin: '#9a6440', hair: '#3a2416', beard: '#5f5048', tunic: '#8a7a5a', mantle: '#6a4a32' },
    john: { skin: '#b8845a', hair: '#3a2416', tunic: '#9a8a6a', mantle: '#4a5a72' },
    young: { skin: '#e8e2d4', hair: '#e8e2d4', tunic: '#f4f0e6', belt: '#e0dace' },
    thomas: { skin: '#a06a42', hair: '#2a1a12', beard: '#2a1a12', tunic: '#7a6a4a', mantle: '#4a5a42' },
    marymother: { skin: '#a8724a', hair: '#5f5048', tunic: '#5a6a8a', veil: '#3d4f6a' },
    annas: { skin: '#a8724a', hair: '#b8b0a4', beard: '#c8c0b4', tunic: '#e8e0cc', mantle: '#4a3a5a', stripe: '#d8b04a', fringe: '#d8b04a' },
    guard: { skin: '#b07a50', hair: '#2a1a12', beard: '#2a1a12', tunic: '#6a6a52', belt: '#3a2a1a', mantle: '#4a4a3a' },
    barnabas: { skin: '#b07a50', hair: '#3a2416', beard: '#3a2416', tunic: '#cdbb94', mantle: '#3d6a6a' },
    lame: { skin: '#9a6440', hair: '#2a1a12', beard: '#2a1a12', tunic: '#8a7a5a' },
    stephen: { skin: '#b07a50', hair: '#3a2416', beard: '#3a2416', tunic: '#d8ccae', mantle: '#3d5a7a' },
    saul: { skin: '#b07a50', hair: '#2a1a12', beard: '#2a1a12', tunic: '#e8e0cc', mantle: '#5a4a3a', fringe: '#9cc0e0', phylactery: true },
  };
  const cache = {};
  K.who = (name) => cache[name] || (cache[name] = S.person(K.looks[name]));

  // ---------- the city wall, a gate, and the knoll of Golgotha (320 wide) ----------
  let GATE = null;
  K.gateArt = function () {
    if (GATE) return GATE;
    const A = K.art(), W = 320;
    const c = U.makeCanvas(W, 160), x = c.getContext('2d');
    x.drawImage(A.sky, 0, 0); x.drawImage(A.sky, 100, 0, 64, 80, 256, 0, 64, 80);
    for (let i = 0; i < W; i++) {
      const top = 60 + Math.round((U.fbm(i * 0.03, 2.2, 7, 3) - 0.5) * 8);
      R(x, i, top, 1, 70, '#b2aca2'); R(x, i, top + 18, 1, 52, '#a39d92');
    }
    // the city beyond the wall: roofs, Antonia, the sanctuary
    for (let row = 0; row < 3; row++) for (let hx = 0; hx < 176; hx += 7) {
      const r = K.rnd(hx, row + 30);
      R(x, hx + (row % 2) * 3, 62 + row * 5, 7, 8, r > 0.5 ? '#d6cbb2' : '#c8bc9f'); R(x, hx + (row % 2) * 3, 62 + row * 5, 7, 1, '#e4dbc6');
    }
    R(x, 140, 30, 18, 34, '#f3eee0'); R(x, 136, 40, 26, 24, '#f3eee0'); R(x, 140, 30, 18, 2, '#e3b04f'); R(x, 145, 42, 8, 22, '#e3b04f');
    R(x, 112, 40, 8, 26, '#8f8370'); R(x, 124, 46, 10, 20, '#8f8370');
    // the wall, with towers and a gate
    const ashlar = (x0, y0, w, h) => {
      R(x, x0, y0, w, h, '#c9bd9f');
      for (let yy = y0 + 4; yy < y0 + h; yy += 5) R(x, x0, yy, w, 1, '#b3a687');
      for (let yy = y0; yy < y0 + h; yy += 5) for (let xx = x0 + ((yy / 5) % 2) * 4; xx < x0 + w; xx += 9) R(x, xx, yy, 1, 5, '#b3a687');
      for (let xx = x0; xx < x0 + w; xx += 6) R(x, xx, y0 - 3, 4, 3, '#c9bd9f');
    };
    ashlar(0, 78, 176, 48); ashlar(18, 62, 22, 64); ashlar(118, 64, 22, 62);
    R(x, 66, 92, 30, 34, '#2a2018'); R(x, 68, 90, 26, 2, '#2a2018'); R(x, 64, 88, 34, 3, '#b3a687');
    R(x, 66, 94, 5, 32, '#5a4632'); R(x, 91, 94, 5, 32, '#5a4632');
    // the knoll outside the wall: an old quarry with rock and scrub
    const top = (i) => (i < 176 ? 126 : i < 214 ? Math.round(U.lerp(126, 94, (i - 176) / 38)) : i < 292 ? 94 + Math.round(Math.sin(i * 0.15)) : Math.round(U.lerp(94, 112, (i - 292) / 28)));
    K.golgothaTop = top;
    for (let i = 0; i < W; i++) {
      const t0 = top(i);
      for (let y = t0; y < 160; y++) {
        const r = K.rnd(i * 3, y);
        let col = i < 176 ? (r > 0.8 ? '#a8926c' : '#b49e78') : r > 0.88 ? '#8f8470' : r > 0.5 ? '#a99c84' : '#9e9178';
        if (i >= 176 && y - t0 < 2) col = r > 0.6 ? '#7d8450' : '#8a8a5a';
        R(x, i, y, 1, 1, col);
      }
    }
    for (let i = 0; i < 9; i++) { const qx = 186 + i * 13; R(x, qx, top(qx) + 6 + (i % 3) * 5, 8, 1, '#7d7260'); }
    R(x, 0, 126, 176, 1, '#9a8462');
    GATE = c;
    return c;
  };

  // ---------- the garden and the new tomb ----------
  let GARDEN = null;
  K.gardenArt = function () {
    if (GARDEN) return GARDEN;
    const A = K.art();
    const c = U.makeCanvas(256, 160), x = c.getContext('2d');
    x.drawImage(A.sky, 0, 0);
    for (let i = 0; i < 256; i++) { const top = 64 + Math.round((U.fbm(i * 0.04, 3.1, 9, 3) - 0.5) * 8); R(x, i, top, 1, 30, '#a8a296'); }
    R(x, 0, 74, 60, 30, '#c9bd9f'); for (let xx = 0; xx < 60; xx += 6) R(x, xx, 71, 4, 3, '#c9bd9f');
    for (let y = 96; y < 160; y++) for (let i = 0; i < 256; i++) { const r = K.rnd(i * 7, y); R(x, i, y, 1, 1, r > 0.85 ? '#6e7646' : r > 0.4 ? '#7d8450' : '#8a8a5a'); }
    for (let i = 0; i < 150; i++) R(x, i, 140 + Math.round(Math.sin(i * 0.05) * 2), 1, 7, K.rnd(i, 4) > 0.8 ? '#a8926c' : '#b49e78');
    [[22, 0], [64, 1], [108, 2]].forEach((t) => {
      const tx = t[0];
      R(x, tx, 104, 3, 34, '#5a4632'); R(x, tx + 1, 112, 2, 6, '#6e5a42');
      for (let k = 0; k < 30; k++) R(x, tx - 12 + Math.floor(K.rnd(t[1], k + 5) * 27), 86 + Math.floor(K.rnd(t[1], k + 40) * 20), 3, 2, k % 3 ? '#6f7a48' : '#8a9058');
    });
    // rock face with the tomb door
    for (let y = 66; y < 152; y++) {
      const x0 = 140 + Math.round(Math.sin(y * 0.18) * 3 + (y < 90 ? (90 - y) * 0.8 : 0));
      R(x, x0, y, 256 - x0, 1, y % 6 === 0 ? '#a99c84' : y % 3 ? '#b9ac92' : '#b2a58b');
    }
    R(x, 172, 110, 24, 36, '#1a1512'); R(x, 174, 107, 20, 3, '#1a1512'); R(x, 170, 108, 2, 38, '#8d826c');
    R(x, 150, 146, 92, 3, '#8d826c'); R(x, 150, 149, 92, 1, '#7a705c');
    GARDEN = c;
    return c;
  };
  // the rolling stone, and what can be seen inside when it is open
  K.tombStone = function (st) {
    return SC.add({ x: 0, y: 0, z: 145.5, draw(ctx) {
      const cam = Math.round(SC.cam);
      if (st.cloths) { R(ctx, 177 - cam, 141, 12, 2, '#e6dfcc'); R(ctx, 190 - cam, 139, 4, 3, '#d8d0bc'); }
      const sx = Math.round(st.stoneX) - cam;
      for (let dy = -17; dy <= 17; dy++) {
        const w = Math.round(Math.sqrt(289 - dy * dy) * 0.55);
        R(ctx, sx - w, 129 + dy, w * 2, 1, dy % 5 ? '#a59a84' : '#8f846f');
      }
      R(ctx, sx - 2, 112, 1, 34, '#b8ad97');
    } });
  };

  // ---------- night ----------
  K.nightWrap = function (st, o) {
    o = o || {};
    st.lights = o.lights || [];
    const bg0 = st.bg, fx0 = st.fx;
    if (o.stars) st.bg = function (ctx, t, cam, sc) {
      bg0.call(st, ctx, t, cam, sc);
      ctx.fillStyle = '#0e1426'; ctx.globalAlpha = 0.65; ctx.fillRect(0, 0, 256, o.sky || 56); ctx.globalAlpha = 1;
      for (let i = 0; i < 46; i++) { const sx = Math.floor(K.rnd(i, 81) * 256), sy = Math.floor(K.rnd(i, 82) * ((o.sky || 56) - 6)); if (U.hash(i, Math.floor(t * 2), 4) > 0.15) R(ctx, sx, sy, 1, 1, '#e8e2cc'); }
    };
    st.fx = function (fc, k, t, cam, sc) {
      if (fx0) fx0.call(st, fc, k, t, cam, sc);
      fc.fillStyle = 'rgba(12,16,40,' + (o.dark === undefined ? 0.45 : o.dark) + ')';
      fc.fillRect(0, 0, 256 * k, 160 * k);
      fc.globalCompositeOperation = 'lighter';
      st.lights.forEach((L) => {
        if (L.ent && L.ent.visible === false) return;
        const lx = L.ent ? L.ent.x : L.x, ly = L.ent ? L.ent.y - (L.dy || 26) : L.y;
        const fl = 1 + Math.sin(t * 9 + lx) * 0.08;
        const g = fc.createRadialGradient((lx - cam) * k, ly * k, 0, (lx - cam) * k, ly * k, (L.r || 40) * k * fl);
        g.addColorStop(0, L.c || 'rgba(255,170,80,0.5)'); g.addColorStop(1, 'rgba(255,170,80,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
      });
      fc.globalCompositeOperation = 'source-over';
    };
    return st;
  };
  K.fireAt = (x, y) => SC.add({ x: x, y: y, z: y, draw(ctx, sx, sy, t) {
    R(ctx, sx - 6, sy - 2, 12, 2, '#3a2a1e');
    for (let i = 0; i < 7; i++) { const h = 3 + Math.round((Math.sin(t * 12 + i * 1.7) + 1) * 2); R(ctx, sx - 5 + Math.round(i * 1.6), sy - 2 - h, 1, h, i % 2 ? '#ffb54a' : '#ffd88a'); }
  } });

  // ---------- a cross, seen from a distance: dark wood and a dark figure against the sky ----------
  K.cross = function (x, base, o) {
    o = o || {};
    return SC.add({ x: x, y: base, z: base - 1, visible: o.visible !== false, draw(ctx, sx, sy) {
      const wood = '#5a4634', fig = '#2a221c';
      R(ctx, sx - 1, sy - 44, 3, 44, wood); R(ctx, sx - 11, sy - 38, 23, 3, wood);
      if (o.figure !== false) {
        R(ctx, sx - 1, sy - 41, 3, 3, fig); R(ctx, sx - 2, sy - 37, 5, 15, fig);
        R(ctx, sx - 9, sy - 37, 7, 2, fig); R(ctx, sx + 3, sy - 37, 7, 2, fig);
        R(ctx, sx - 1, sy - 22, 3, 8, fig);
      }
      if (o.title) { R(ctx, sx - 5, sy - 48, 11, 4, '#e8e0cc'); R(ctx, sx - 4, sy - 47, 9, 1, '#7a6a52'); }
    } });
  };
})(window.TW);
