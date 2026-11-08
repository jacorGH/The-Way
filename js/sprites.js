/* The Way — pixel sprites, built procedurally so every villager can differ */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U;
  const OUT = '#1b130d';

  function grid(w, h) {
    const g = [];
    for (let y = 0; y < h; y++) g.push(new Array(w).fill(null));
    return g;
  }
  function put(g, x, y, c) {
    if (y >= 0 && y < g.length && x >= 0 && x < g[0].length) g[y][x] = c;
  }
  function rect(g, x0, y0, x1, y1, c) {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) put(g, x, y, c);
  }
  function outline(g) {
    const h = g.length, w = g[0].length;
    const o = g.map((r) => r.slice());
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        if (g[y][x]) continue;
        const n = (yy, xx) => yy >= 0 && yy < h && xx >= 0 && xx < w && g[yy][xx];
        if (n(y - 1, x) || n(y + 1, x) || n(y, x - 1) || n(y, x + 1)) o[y][x] = OUT;
      }
    return o;
  }
  function toCanvas(g) {
    const h = g.length, w = g[0].length;
    const c = U.makeCanvas(w, h);
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const col = g[y][x];
        if (!col) continue;
        const rgb = U.hex(col);
        const i = (y * w + x) * 4;
        img.data[i] = rgb[0]; img.data[i + 1] = rgb[1]; img.data[i + 2] = rgb[2]; img.data[i + 3] = 255;
      }
    ctx.putImageData(img, 0, 0);
    return c;
  }
  function flip(c) {
    const f = U.makeCanvas(c.width, c.height);
    const ctx = f.getContext('2d');
    ctx.translate(c.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(c, 0, 0);
    return f;
  }
  const both = (g) => {
    const r = toCanvas(outline(g));
    return { r, l: flip(r) };
  };

  /* opts: skin, hair, beard, tunic, stripe, mantle, fringe, veil, phylactery, belt */
  function drawUpper(g, o, dy, arm) {
    const sk = o.skin, hr = o.hair;
    const skD = U.shadeHex(sk, 0.82);
    if (o.veil) {
      rect(g, 5, 3 + dy, 10, 4 + dy, o.veil);
      rect(g, 4, 5 + dy, 6, 13 + dy, o.veil);
      rect(g, 7, 5 + dy, 10, 9 + dy, sk);
      put(g, 9, 6 + dy, '#20160f');
      put(g, 11, 7 + dy, sk);
      rect(g, 7, 10 + dy, 8, 10 + dy, skD);
      rect(g, 4, 11 + dy, 11, 12 + dy, o.veil);
    } else {
      rect(g, 6, 3 + dy, 9, 3 + dy, hr);
      rect(g, 5, 4 + dy, 10, 4 + dy, hr);
      rect(g, 5, 5 + dy, 6, 5 + dy, hr);
      rect(g, 7, 5 + dy, 10, 5 + dy, sk);
      put(g, 5, 6 + dy, hr); rect(g, 6, 6 + dy, 10, 6 + dy, sk);
      put(g, 5, 7 + dy, hr); rect(g, 6, 7 + dy, 10, 7 + dy, sk); put(g, 11, 7 + dy, sk);
      put(g, 9, 6 + dy, '#20160f');
      if (o.beard) {
        rect(g, 6, 8 + dy, 7, 8 + dy, sk); rect(g, 8, 8 + dy, 10, 8 + dy, o.beard);
        rect(g, 7, 9 + dy, 10, 9 + dy, o.beard);
        rect(g, 7, 10 + dy, 7, 10 + dy, skD); rect(g, 8, 10 + dy, 9, 10 + dy, o.beard);
      } else {
        rect(g, 6, 8 + dy, 10, 8 + dy, sk);
        rect(g, 7, 9 + dy, 9, 9 + dy, sk);
        rect(g, 7, 10 + dy, 8, 10 + dy, skD);
      }
      if (o.phylactery) rect(g, 8, 4 + dy, 9, 4 + dy, '#140e0a');
    }
    // torso
    const t = o.tunic, tD = U.shadeHex(t, 0.8), tL = U.shadeHex(t, 1.1);
    rect(g, 5, 11 + dy, 10, 11 + dy, t);
    rect(g, 4, 12 + dy, 11, 21 + dy, t);
    rect(g, 4, 12 + dy, 4, 21 + dy, tD);
    rect(g, 11, 13 + dy, 11, 21 + dy, tL);
    if (o.stripe) { rect(g, 6, 11 + dy, 6, 21 + dy, o.stripe); rect(g, 9, 11 + dy, 9, 21 + dy, o.stripe); }
    if (o.belt) rect(g, 4, 16 + dy, 11, 16 + dy, o.belt);
    if (o.mantle) {
      const m = o.mantle, mD = U.shadeHex(m, 0.8);
      rect(g, 4, 11 + dy, 10, 12 + dy, m);
      rect(g, 4, 13 + dy, 8, 20 + dy, m);
      rect(g, 4, 13 + dy, 4, 20 + dy, mD);
      put(g, 9, 13 + dy, m); put(g, 9, 14 + dy, m);
      if (o.fringe) { put(g, 4, 21 + dy, o.fringe); put(g, 6, 21 + dy, o.fringe); put(g, 8, 21 + dy, o.fringe); }
    }
    // front arm
    const sl = U.shadeHex(t, 0.9);
    if (arm === 'raise') {
      rect(g, 11, 7 + dy, 12, 12 + dy, sl);
      rect(g, 11, 5 + dy, 12, 6 + dy, sk);
    } else if (arm === 'out') {
      rect(g, 10, 12 + dy, 11, 13 + dy, sl);
      rect(g, 12, 13 + dy, 13, 13 + dy, sl);
      put(g, 14, 13 + dy, sk);
    } else {
      rect(g, 10, 12 + dy, 11, 16 + dy, sl);
      rect(g, 10, 17 + dy, 11, 17 + dy, sk);
    }
  }

  function person(o) {
    o = Object.assign({ skin: '#a8724a', hair: '#2a1a12', tunic: '#cdbb94', belt: '#5a3b22' }, o);
    const sandal = '#5a3b22';
    const frames = {};
    const legs = (g, mode) => {
      if (o.veil) { rect(g, 4, 22, 11, 23, o.tunic); rect(g, 4, 22, 4, 23, U.shadeHex(o.tunic, 0.8)); }
      const sk = o.skin;
      if (mode === 'stand' || mode === 'raise' || mode === 'carry' || mode === 'out') {
        if (!o.veil) { put(g, 6, 22, sk); put(g, 6, 23, sk); put(g, 9, 22, sk); put(g, 9, 23, sk); }
        rect(g, 5, 24, 7, 24, sandal); rect(g, 9, 24, 11, 24, sandal);
      } else if (mode === 'walk1') {
        if (!o.veil) { put(g, 5, 22, sk); put(g, 5, 23, sk); put(g, 10, 22, sk); put(g, 10, 23, sk); }
        rect(g, 4, 24, 6, 24, sandal); rect(g, 10, 24, 12, 24, sandal);
      } else if (mode === 'walk2') {
        if (!o.veil) { put(g, 7, 22, sk); put(g, 7, 23, sk); put(g, 8, 22, sk); put(g, 8, 23, sk); }
        rect(g, 7, 24, 9, 24, sandal);
      }
    };
    ['stand', 'walk1', 'walk2', 'raise', 'carry', 'out'].forEach((mode) => {
      const g = grid(18, 26);
      const bob = mode === 'walk2' ? -1 : 0;
      drawUpper(g, o, bob, mode === 'raise' ? 'raise' : mode === 'out' ? 'out' : null);
      if (bob) {
        // close the gap left by the bob at the hem
        rect(g, 4, 21, 11, 21, o.tunic);
      }
      legs(g, mode);
      if (mode === 'carry') {
        rect(g, 1, 14, 15, 16, '#b39a62');
        for (let x = 2; x <= 14; x += 2) put(g, x, 15, '#8e7646');
        rect(g, 1, 14, 1, 16, '#8e7646'); rect(g, 15, 14, 15, 16, '#8e7646');
      }
      frames[mode] = both(g);
    });
    // seated on the floor
    {
      const g = grid(18, 26);
      drawUpper(g, o, 4, null);
      // clear torso bottom and draw lap
      for (let y = 21; y <= 25; y++) for (let x = 0; x < 18; x++) g[y][x] = null;
      const lap = o.mantle || o.tunic;
      rect(g, 3, 21, 13, 23, lap);
      rect(g, 3, 21, 3, 23, U.shadeHex(lap, 0.8));
      rect(g, 2, 24, 14, 24, U.shadeHex(lap, 0.85));
      put(g, 14, 23, o.skin);
      frames.sit = both(g);
    }
    return frames;
  }

  function lying(o) {
    o = Object.assign({ skin: '#a8724a', hair: '#2a1a12', tunic: '#9a8a6a', beard: '#2a1a12' }, o);
    const g = grid(28, 11);
    const reed = '#b39a62', reedD = '#8e7646';
    rect(g, 0, 8, 27, 9, reed);
    for (let x = 0; x <= 27; x += 2) put(g, x, 9, reedD);
    rect(g, 0, 8, 0, 9, reedD); rect(g, 27, 8, 27, 9, reedD);
    // head (left), face up
    rect(g, 2, 3, 3, 7, o.hair);
    rect(g, 4, 3, 7, 7, o.skin);
    put(g, 6, 3, '#20160f');
    rect(g, 5, 2, 6, 2, o.skin);
    rect(g, 6, 6, 8, 7, o.beard);
    // body
    rect(g, 8, 4, 21, 7, o.tunic);
    rect(g, 8, 4, 21, 4, U.shadeHex(o.tunic, 1.1));
    rect(g, 12, 5, 16, 5, U.shadeHex(o.tunic, 0.85));
    rect(g, 22, 5, 23, 7, o.skin);
    rect(g, 24, 4, 24, 7, '#5a3b22');
    return toCanvas(outline(g));
  }

  function walker() {
    const make = (step) => {
      const g = grid(9, 12);
      rect(g, 3, 1, 5, 1, '#2a1a12');
      rect(g, 2, 2, 6, 2, '#2a1a12');
      rect(g, 3, 3, 6, 4, '#b07a50');
      put(g, 5, 3, '#20160f');
      rect(g, 2, 5, 6, 9, '#e6dcc4');
      rect(g, 2, 5, 3, 8, '#4e5a72');
      put(g, 2, 9, '#7aa0c8');
      if (step) { put(g, 2, 10, '#5a3b22'); put(g, 6, 10, '#5a3b22'); }
      else { put(g, 4, 10, '#5a3b22'); put(g, 5, 10, '#5a3b22'); }
      return toCanvas(outline(g));
    };
    return [make(0), make(1)];
  }

  function mapBoat() {
    const g = grid(13, 11);
    rect(g, 6, 1, 6, 6, '#3a2618');
    rect(g, 3, 2, 5, 5, '#e2d6b6');
    rect(g, 1, 7, 11, 7, '#6a4a2c');
    rect(g, 2, 8, 10, 8, '#5a3e26');
    rect(g, 3, 9, 9, 9, '#4a321e');
    rect(g, 7, 5, 8, 6, '#e6dcc4');
    return toCanvas(outline(g));
  }

  // the man from the tombs: torn tunic, wild hair, broken fetters
  function wildman() {
    const f = person({ skin: '#8e5c3a', hair: '#1e1410', beard: '#1e1410', tunic: '#6f6250' });
    const fix = (c) => {
      const ctx = c.getContext('2d');
      ctx.clearRect(4, 21, 1, 2); ctx.clearRect(7, 22, 2, 1); ctx.clearRect(11, 21, 1, 2);
      ctx.fillStyle = '#1e1410';
      ctx.fillRect(5, 1, 1, 2); ctx.fillRect(8, 1, 1, 2); ctx.fillRect(10, 2, 1, 2); ctx.fillRect(4, 4, 1, 3);
      ctx.fillStyle = '#8a8a86'; ctx.fillRect(9, 17, 3, 1); ctx.fillRect(12, 18, 1, 1);
    };
    ['stand', 'walk1', 'walk2', 'raise', 'out'].forEach((k) => { fix(f[k].r); f[k].l = flip(f[k].r); });
    return f;
  }

  function pig() {
    const make = (step) => {
      const g = grid(14, 9);
      const b = '#4e3a30', d = '#3a2a22', sn = '#8a6a5a';
      rect(g, 2, 2, 10, 6, b);
      rect(g, 2, 2, 10, 2, U.shadeHex(b, 1.15));
      rect(g, 11, 3, 12, 5, b); put(g, 13, 4, sn); put(g, 12, 3, '#140e0a');
      put(g, 11, 1, d); put(g, 1, 3, d);
      if (step) { put(g, 3, 7, d); put(g, 9, 7, d); put(g, 4, 8, d); put(g, 10, 8, d); }
      else { put(g, 4, 7, d); put(g, 8, 7, d); put(g, 4, 8, d); put(g, 8, 8, d); }
      return toCanvas(outline(g));
    };
    const a = make(0), b2 = make(1);
    return { r: [a, b2], l: [flip(a), flip(b2)] };
  }

  // open bier with a body wrapped in linen; risen = the young man sitting up
  function bier(risen) {
    const g = grid(34, 18);
    const wood = '#6a4a2c', linen = '#e6dfcc', band = '#b9ad92';
    rect(g, 0, 15, 33, 15, wood); rect(g, 3, 14, 30, 14, U.shadeHex(wood, 1.15));
    if (!risen) {
      rect(g, 4, 10, 29, 13, linen);
      rect(g, 4, 10, 29, 10, '#f2ecdc');
      [9, 14, 19, 24].forEach((x) => rect(g, x, 10, x, 13, band));
      rect(g, 26, 9, 29, 13, linen); put(g, 27, 9, band);
    } else {
      rect(g, 4, 11, 22, 13, linen);
      [9, 14, 19].forEach((x) => rect(g, x, 11, x, 13, band));
      rect(g, 23, 4, 28, 13, linen); rect(g, 22, 8, 23, 10, linen);
      rect(g, 24, 0, 28, 4, '#9a6440'); rect(g, 24, 0, 28, 0, '#2a1a12'); put(g, 23, 1, '#2a1a12');
      put(g, 25, 2, '#20160f');
    }
    return toCanvas(outline(g));
  }

  // side-view fishing boat, about 8 m long
  function boat(hull) {
    hull = hull || '#5a3e26';
    const g = grid(70, 16);
    for (let y = 6; y < 15; y++) {
      const inset = Math.max(0, y - 9) * 2;
      const bow = y < 9 ? 0 : 0;
      rect(g, 2 + inset + bow, y, 67 - inset, y, y === 6 ? '#7a5634' : y % 2 ? hull : U.shadeHex(hull, 0.85));
    }
    rect(g, 0, 3, 3, 6, hull); rect(g, 66, 2, 69, 6, hull);
    rect(g, 0, 3, 3, 3, '#7a5634'); rect(g, 66, 2, 69, 2, '#7a5634');
    for (let x = 10; x < 64; x += 9) put(g, x, 8, '#3e2a18');
    return toCanvas(outline(g));
  }

  // a young donkey, two walking frames
  function donkey() {
    const make = (step) => {
      const g = grid(24, 18);
      const c = '#7a6e62', d = '#5e544a', l = '#a59a8c';
      rect(g, 5, 7, 17, 12, c); rect(g, 5, 7, 17, 7, U.shadeHex(c, 1.12)); rect(g, 7, 11, 15, 12, l);
      rect(g, 17, 4, 19, 9, c); rect(g, 19, 3, 22, 6, c); rect(g, 21, 5, 22, 6, '#4a423a'); put(g, 20, 4, '#140e0a');
      rect(g, 18, 0, 18, 3, d); rect(g, 20, 0, 20, 2, d);
      rect(g, 4, 8, 4, 11, d);
      const legs = step ? [[6, 13], [9, 14], [14, 13], [16, 14]] : [[7, 13], [8, 13], [15, 13], [16, 13]];
      legs.forEach((p) => { rect(g, p[0], 13, p[0], 16, d); put(g, p[0], 17, '#2a241e'); });
      return toCanvas(outline(g));
    };
    const a = make(0), b2 = make(1);
    return { r: [a, b2], l: [flip(a), flip(b2)] };
  }

  function dove() {
    const make = (up) => {
      const g = grid(9, 7);
      rect(g, 2, 3, 6, 4, '#e8e4dc'); rect(g, 6, 2, 7, 3, '#e8e4dc'); put(g, 8, 3, '#c9a07a'); put(g, 7, 2, '#20160f');
      put(g, 1, 4, '#cfcac0');
      if (up) { rect(g, 3, 0, 5, 2, '#d8d4cc'); } else { rect(g, 3, 5, 5, 6, '#d8d4cc'); }
      return toCanvas(outline(g));
    };
    return [make(0), make(1)];
  }

  TW.S = { person, lying, walker, mapBoat, wildman, pig, bier, boat, flip, donkey, dove };
})(window.TW);
