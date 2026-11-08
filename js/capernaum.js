/* The Way — Episode: At Home in Capernaum (Mark 2:1–12) */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, S = TW.S, SC = TW.Scene, D = TW.D;
  const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
  const rnd = (a, b) => U.hash(a, b, 911);

  // ---------- people ----------
  const SKINS = ['#a8724a', '#9a6440', '#b8845a', '#8a5636', '#a06a42'];
  const HAIRS = ['#2a1a12', '#3a2416', '#1e1410', '#5f5048', '#4a3020'];
  const TUNICS = ['#cdbb94', '#b49a6a', '#8a7a5a', '#7a5a3a', '#9a8a6a', '#6a6a52', '#8a3a2a', '#3d4f6a', '#a08a62'];
  const MANTLES = ['#6a4a32', '#5a5a42', '#8a6a42', '#4a4a5a', '#7a6a4a', null, null];
  const VEILS = ['#9a7a5a', '#6a4e3a', '#b3a080', '#5a4a5a', '#8a4a3a'];
  const pick = (arr, s, i) => arr[Math.floor(rnd(s, i) * arr.length) % arr.length];
  const cache = {};
  function villager(seed, woman) {
    const key = seed + (woman ? 'w' : 'm');
    if (cache[key]) return cache[key];
    const hair = pick(HAIRS, seed, 2);
    const o = { skin: pick(SKINS, seed, 1), hair: hair, tunic: pick(TUNICS, seed, 3) };
    if (woman) o.veil = pick(VEILS, seed, 5);
    else {
      if (rnd(seed, 6) > 0.25) o.beard = hair;
      o.mantle = pick(MANTLES, seed, 4);
      if (rnd(seed, 7) > 0.6) o.stripe = U.shadeHex(o.tunic, 0.7);
    }
    return (cache[key] = S.person(o));
  }
  let SPR = null;
  function sprites() {
    if (SPR) return SPR;
    SPR = {
      player: S.person({ skin: '#b07a50', hair: '#2a1a12', beard: '#2a1a12', tunic: '#ddd0b0', mantle: '#4e5a72', fringe: '#9cc0e0', phylactery: true, belt: null }),
      scribe: (n) => S.person({ skin: pick(SKINS, n, 1), hair: pick(HAIRS, n, 2), beard: pick(HAIRS, n, 2), tunic: '#d8ccae', mantle: pick(['#5a4a3a', '#4a4a5a', '#6a5a42'], n, 3), fringe: '#9cc0e0', phylactery: true, belt: null }),
      jesus: S.person({ skin: '#a26c44', hair: '#24160e', beard: '#24160e', tunic: '#d6c8a6', stripe: '#7a5232', mantle: '#8b6140', fringe: '#cdb98a' }),
      healed: S.person({ skin: '#9a6440', hair: '#3a2416', beard: '#3a2416', tunic: '#8a7a5a' }),
      lying: S.lying({ skin: '#9a6440', hair: '#3a2416', beard: '#3a2416', tunic: '#8a7a5a' }),
    };
    return SPR;
  }

  // ---------- shared art ----------
  function basalt(ctx, x, y, w, h, seed) {
    R(ctx, x, y, w, h, '#3d3835');
    const cols = ['#3d3835', '#45403c', '#36322f', '#4a4440', '#403a36'];
    let row = 0;
    for (let yy = y; yy < y + h; yy += 6, row++) {
      R(ctx, x, yy, w, 1, '#5b5248');
      let xx = x - Math.floor(rnd(seed + row, 1) * 8);
      let b = 0;
      while (xx < x + w) {
        const bw = 6 + Math.floor(rnd(seed + row, b + 3) * 6);
        const x0 = Math.max(x, xx), x1 = Math.min(x + w, xx + bw);
        if (x1 > x0) {
          R(ctx, x0, yy + 1, x1 - x0, Math.min(5, y + h - yy - 1), cols[Math.floor(rnd(seed + row, b) * cols.length)]);
          R(ctx, x0, yy + 1, 1, 1, '#5a544f');
          if (xx >= x) R(ctx, xx, yy + 1, 1, Math.min(5, y + h - yy - 1), '#2a2623');
        }
        xx += bw; b++;
      }
    }
  }
  function mudRoof(ctx, x, y, w, h) {
    R(ctx, x, y, w, h, '#7d684e');
    R(ctx, x, y, w, 1, '#9a8466');
    for (let i = x; i < x + w; i += 3) {
      R(ctx, i, y + h, 1, 1 + (i % 2), '#5d4a30');
      if (rnd(i, y) > 0.7) R(ctx, i, y - 1, 1, 1, '#6d5a3c');
    }
  }

  let ART = null;
  function art() {
    if (ART) return ART;
    ART = {};
    // sky
    const sky = U.makeCanvas(256, 80), sc = sky.getContext('2d');
    const SKY = ['#9fb8be', '#adc1bf', '#bfcbbd', '#d0d3ba', '#e0d9b6', '#ece0b6'];
    SKY.forEach((c, i) => {
      R(sc, 0, i * 12, 256, 12, c);
      if (i < SKY.length - 1) for (let x = 0; x < 256; x++) for (let y = i * 12 + 10; y < i * 12 + 12; y++) if ((x + y) % 2 === 0) R(sc, x, y, 1, 1, SKY[i + 1]);
    });
    R(sc, 0, 72, 256, 8, '#ece0b6');
    for (let dy = -6; dy <= 6; dy++) for (let dx = -6; dx <= 6; dx++) if (dx * dx + dy * dy <= 36) R(sc, 42 + dx, 20 + dy, 1, 1, dx * dx + dy * dy > 25 ? '#f3e9c4' : '#fbf3d6');
    ART.sky = sky;
    // far hills across the lake
    const HW = 256 + 120;
    const hills = U.makeCanvas(HW, 80), hc = hills.getContext('2d');
    for (let x = 0; x < HW; x++) {
      const top = 58 + Math.round((U.fbm(x * 0.02, 1.3, 3, 3) - 0.5) * 16 + Math.sin(x * 0.013) * 3);
      R(hc, x, top, 1, 74 - top, '#918984'); R(hc, x, top, 1, 1, '#a9a19a');
      const t2 = 66 + Math.round((U.fbm(x * 0.035, 7.1, 5, 3) - 0.5) * 8);
      R(hc, x, t2, 1, 74 - t2, '#7f7873');
    }
    ART.hills = hills;
    // town behind the street (parallax 0.85)
    const TW_ = 256 + Math.ceil((480 - 256) * 0.85);
    const town = U.makeCanvas(TW_, 160), tc = town.getContext('2d');
    let x = 150, n = 0;
    while (x < TW_) {
      const w = 34 + Math.floor(rnd(n, 9) * 40), top = 78 + Math.floor(rnd(n, 10) * 12);
      basalt(tc, x, top + 4, w, 122 - top - 4, n * 13);
      mudRoof(tc, x - 1, top, w + 2, 4);
      if (rnd(n, 11) > 0.4) R(tc, x + Math.floor(w / 2), top + 14, 2, 6, '#1a1512');
      x += w + (rnd(n, 12) > 0.6 ? 5 : 0); n++;
    }
    ART.town = town;
    // street level (parallax 1)
    const g = U.makeCanvas(480, 160), gc = g.getContext('2d');
    R(gc, 0, 120, 480, 40, '#9b8563');
    for (let i = 0; i < 520; i++) {
      const sx = Math.floor(rnd(i, 1) * 480), sy = 122 + Math.floor(rnd(i, 2) * 38);
      R(gc, sx, sy, 1 + Math.floor(rnd(i, 3) * 3), 1, rnd(i, 4) > 0.5 ? '#86704f' : '#ab9672');
    }
    for (let i = 0; i < 70; i++) {
      const sx = Math.floor(rnd(i, 5) * 480), sy = 126 + Math.floor(rnd(i, 6) * 32);
      R(gc, sx, sy, 3, 2, '#4f4945'); R(gc, sx, sy, 1, 1, '#6a635d');
    }
    // beach and beached boat: their own layer, drawn behind the houses so the shore never cuts into the town
    const bc = U.makeCanvas(480, 160), bx = bc.getContext('2d');
    for (let y = 98; y < 124; y++)
      for (let xx = 0; xx < 164 - (y - 98); xx++) {
        const r = rnd(xx * 3, y);
        R(bx, xx, y, 1, 1, r > 0.85 ? '#5f584f' : r > 0.7 ? '#958b7d' : '#7a7166');
      }
    const hull = [[26, 66], [27, 65], [28, 64], [30, 62], [32, 60], [35, 57]];
    hull.forEach((h, i) => {
      R(bx, h[0], 108 + i, h[1] - h[0], 1, i === 0 ? '#7a5634' : i % 2 ? '#5a3e26' : '#4c341f');
    });
    R(bx, 44, 92, 1, 16, '#3a2618');
    R(bx, 40, 93, 9, 2, '#d8ccae');
    for (let i = 0; i < 6; i++) R(bx, 30 + i * 5, 109, 1, 4, '#3e2a18');
    ART.beach = bc;
    // net on the beach
    for (let yy = 0; yy < 7; yy++) for (let xx = 0; xx < 18; xx++) if ((xx + yy) % 3 === 0 || (xx - yy) % 3 === 0) R(gc, 96 + xx, 138 + yy, 1, 1, '#b5a582');
    // quern
    R(gc, 168, 137, 14, 4, '#3e3a37'); R(gc, 170, 134, 10, 3, '#4a4541'); R(gc, 174, 131, 2, 3, '#5a3b22');
    R(gc, 167, 141, 16, 1, '#7a6a52');
    // palm
    for (let yy = 70; yy < 140; yy++) R(gc, 236 + Math.round(Math.sin(yy * 0.05) * 1.5), yy, 3, 1, yy % 5 ? '#6a5236' : '#54402a');
    const frond = (ang, len) => {
      for (let i = 0; i < len; i++) {
        const fx = 237 + Math.cos(ang) * i, fy = 70 + Math.sin(ang) * i + (i * i) / 30;
        R(gc, Math.round(fx), Math.round(fy), 2, 1, i % 3 ? '#5d6b3a' : '#73804a');
      }
    };
    [-2.9, -2.4, -1.9, -1.2, -0.7, -0.2, 0.3].forEach((a, i) => frond(a, 16 + (i % 3) * 3));
    // courtyard wall
    basalt(gc, 252, 114, 34, 20, 501);
    R(gc, 252, 113, 34, 1, '#57514c');
    // the house
    basalt(gc, 286, 92, 114, 42, 777);
    mudRoof(gc, 285, 86, 116, 6);
    R(gc, 284, 84, 3, 4, '#5a544f'); R(gc, 398, 84, 3, 4, '#5a544f');
    R(gc, 300, 100, 2, 8, '#1a1512'); R(gc, 380, 100, 2, 8, '#1a1512');
    R(gc, 326, 103, 26, 4, '#5f5954'); R(gc, 326, 103, 26, 1, '#77706a');
    R(gc, 330, 107, 18, 27, '#16110e');
    R(gc, 331, 128, 16, 6, '#2a1d14');
    // outside stairs up to the roof
    for (let i = 0; i < 11; i++) {
      const sx = 440 - i * 4, sy = 130 - i * 4;
      basalt(gc, sx, sy, 4, 134 - sy, 900 + i);
      R(gc, sx, sy, 4, 1, '#6a635d');
    }
    R(gc, 444, 130, 2, 4, '#3d3835');
    basalt(gc, 448, 96, 32, 38, 1200);
    mudRoof(gc, 447, 90, 34, 6);
    R(gc, 0, 133, 480, 1, '#7d6a50');
    ART.ground = g;
    // foreground tufts (parallax 1.2)
    const FW = 256 + Math.ceil((480 - 256) * 1.2);
    const fg = U.makeCanvas(FW, 160), fc = fg.getContext('2d');
    for (let i = 0; i < 14; i++) {
      const fx = 10 + i * 38 + Math.floor(rnd(i, 1) * 20);
      if (rnd(i, 2) > 0.5) {
        R(fc, fx, 154, 8, 6, '#2e2a27'); R(fc, fx + 1, 153, 5, 1, '#3e3936'); R(fc, fx + 1, 154, 2, 1, '#4a4541');
      } else {
        for (let j = 0; j < 7; j++) R(fc, fx + j, 160 - 3 - ((j * 7) % 5), 1, 3 + ((j * 7) % 5), j % 2 ? '#3c4526' : '#4f5a32');
      }
    }
    ART.front = fg;

    // ---- interior: a cut-away of the house, roof and sky above ----
    const inn = U.makeCanvas(256, 160), ic = inn.getContext('2d');
    const SKYI = ['#a9c0c2', '#bccabe', '#cdd2bb', '#ddd8b7', '#e9deb6'];
    SKYI.forEach((c, i) => {
      R(ic, 0, i * 11, 256, 11, c);
      if (i < SKYI.length - 1) for (let x = 0; x < 256; x++) if (x % 2 === 0) R(ic, x, i * 11 + 10, 1, 1, SKYI[i + 1]);
    });
    R(ic, 0, 55, 256, 2, SKYI[4]);
    for (let x = 0; x < 256; x++) {
      const top = 36 + Math.round((U.fbm(x * 0.03, 4.2, 6, 3) - 0.5) * 10);
      R(ic, x, top, 1, 56 - top, '#9d958d'); R(ic, x, top, 1, 1, '#b1a99f');
    }
    for (let bx = -6, i = 0; bx < 256; i++) {
      const w = 26 + Math.floor(rnd(i, 51) * 30), top = 44 + Math.floor(rnd(i, 52) * 6);
      if (rnd(i, 53) > 0.3) { R(ic, bx, top, w, 56 - top, '#57514b'); R(ic, bx, top, w, 2, '#8a7356'); }
      bx += w + 4;
    }
    R(ic, 0, 56, 256, 3, '#7d684e'); R(ic, 0, 56, 256, 1, '#9a8466');
    R(ic, 0, 59, 256, 9, '#4c3e2d');
    for (let i = 0; i < 260; i++) R(ic, Math.floor(rnd(i, 21) * 256), 59 + Math.floor(rnd(i, 22) * 9), 2, 1, rnd(i, 23) > 0.5 ? '#5e4d37' : '#382d20');
    R(ic, 0, 68, 256, 4, '#6b5a3c');
    for (let xx = 0; xx < 256; xx += 2) R(ic, xx, 68 + (xx % 3 === 0 ? 1 : 0), 1, 3, '#57492f');
    R(ic, 0, 72, 256, 5, '#3d2a1a'); R(ic, 0, 72, 256, 1, '#5a4029'); R(ic, 0, 76, 256, 1, '#24180f');
    basalt(ic, 0, 77, 256, 63, 4242);
    [58, 198].forEach((px) => { R(ic, px, 77, 5, 63, '#4a3220'); R(ic, px, 77, 1, 63, '#5e4129'); R(ic, px + 4, 77, 1, 63, '#2e1f14'); });
    R(ic, 4, 106, 22, 34, '#2a2420');
    R(ic, 6, 108, 18, 32, '#e9d9b0');
    R(ic, 6, 130, 18, 10, '#c9b48a');
    R(ic, 2, 103, 26, 4, '#5f5954');
    R(ic, 222, 86, 18, 14, '#221d1a'); R(ic, 222, 86, 18, 1, '#57514c');
    R(ic, 226, 96, 9, 3, '#8a5a3a'); R(ic, 227, 99, 7, 1, '#6a4028'); R(ic, 234, 95, 2, 2, '#8a5a3a');
    [238, 247].forEach((jx, i) => {
      R(ic, jx - 3, 122 + i * 2, 8, 18 - i * 2, '#9a6a44'); R(ic, jx - 2, 120 + i * 2, 6, 2, '#7a5034');
      R(ic, jx - 3, 122 + i * 2, 1, 18 - i * 2, '#7a5034'); R(ic, jx + 3, 124 + i * 2, 1, 14 - i * 2, '#b07e56');
    });
    R(ic, 0, 140, 256, 20, '#55463a');
    R(ic, 0, 140, 256, 1, '#3d3229');
    for (let i = 0; i < 160; i++) R(ic, Math.floor(rnd(i, 31) * 256), 141 + Math.floor(rnd(i, 32) * 19), 2, 1, rnd(i, 33) > 0.5 ? '#6a5844' : '#7d6a4a');
    ART.inside = inn;
    return ART;
  }

  // ---------- stages ----------
  function lakeBand(ctx, t, cam) {
    R(ctx, 0, 72, 256, 28, '#5d8b92');
    R(ctx, 0, 72, 256, 3, '#82a8a6');
    R(ctx, 0, 92, 256, 8, '#527f88');
    const frame = Math.floor(t * 3);
    const off = Math.floor(cam * 0.5);
    for (let y = 76; y < 98; y += 3)
      for (let x = 0; x < 256; x += 4)
        if (U.hash((x + off) >> 2, y, frame) > 0.86) R(ctx, x - (off % 4), y, 3, 1, y < 86 ? '#a3c2bd' : '#8db2b0');
    const bx = Math.round(((t * 4 + 200 - cam * 0.5) % 380) - 60);
    R(ctx, bx, 86, 11, 2, '#4a3220'); R(ctx, bx + 1, 88, 9, 1, '#3a2618');
    R(ctx, bx + 5, 76, 1, 10, '#3a2618');
    for (let i = 0; i < 8; i++) R(ctx, bx + 6, 77 + i, Math.min(i, 5), 1, '#e6dcc4');
  }

  function exteriorStage() {
    const A = art();
    return {
      width: 480,
      audio: { music: 'galilee', amb: { shore: 0.7, birds: 0.6, crowd: 0.3, wind: 0.2 } },
      walkLimits: [12, 468],
      hotspots: [],
      bg(ctx, t, cam) {
        ctx.drawImage(A.sky, 0, 0);
        ctx.drawImage(A.hills, -Math.round(cam * 0.25), 0);
        lakeBand(ctx, t, cam);
        R(ctx, 0, 98, 256, 26, '#7a7166');
        ctx.drawImage(A.beach, -cam, 0);
        const fr = Math.floor(t * 2);
        for (let x = 0; x < 166; x++) {
          const sx = x - cam;
          if (sx < 0 || sx > 255) continue;
          if (U.hash(x >> 1, 7, fr) > 0.55) R(ctx, sx, 98, 1, 1, '#d2ddd4');
          if (U.hash(x >> 1, 8, fr) > 0.8) R(ctx, sx, 99, 1, 1, '#b9cbc4');
        }
        ctx.drawImage(A.town, -Math.round(cam * 0.85), 0);
        ctx.drawImage(A.ground, -cam, 0);
      },
      fg(ctx, t, cam) { ctx.drawImage(A.front, -Math.round(cam * 1.2), 0); },
      fx(fc, k, t) {
        fc.globalCompositeOperation = 'lighter';
        const g = fc.createRadialGradient(42 * k, 20 * k, 0, 42 * k, 20 * k, 120 * k);
        g.addColorStop(0, 'rgba(255,236,190,0.42)');
        g.addColorStop(0.4, 'rgba(255,220,160,0.12)');
        g.addColorStop(1, 'rgba(255,220,160,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        const h = fc.createLinearGradient(0, 64 * k, 0, 100 * k);
        h.addColorStop(0, 'rgba(255,240,210,0.16)'); h.addColorStop(1, 'rgba(255,240,210,0)');
        fc.fillStyle = h; fc.fillRect(0, 64 * k, 256 * k, 36 * k);
        fc.globalCompositeOperation = 'source-over';
      },
      update(dt) {
        if (this.digging && Math.random() < dt * 10) SC.dust(368 + Math.random() * 10, 87, 2, { up: true });
        if (this.onUpdate) this.onUpdate(dt);
      },
    };
  }

  function interiorStage() {
    const A = art();
    const st = {
      width: 256, hole: 0, beam: 0, digging: false, hotspots: [],
      audio: { amb: { room: 0.7, crowd: 0.35 } },
      bg(ctx, t) {
        ctx.drawImage(A.inside, 0, 0);
        if (st.hole > 0) {
          const half = 17 * st.hole;
          for (let x = 104; x <= 144; x++) {
            const edge = Math.abs(x - 124) - (half - U.hash(x, 3, 1) * 3);
            if (edge < 0) R(ctx, x, 56, 1, 21, x % 2 ? '#e9deb6' : '#e4d8ae');
            else if (edge < 1.5) R(ctx, x, 56, 1, 21, '#2f251a');
          }
        }
        const fl = Math.floor(t * 8) % 3;
        R(ctx, 235, 92 - (fl === 1 ? 1 : 0), 1, 3, '#ffd27a'); R(ctx, 235, 93, 1, 1, '#fff2c0');
      },
      fx(fc, k, t, cam, sc) {
        const w = 256 * k, h = 160 * k;
        fc.fillStyle = 'rgba(14,8,3,0.26)';
        fc.fillRect(0, 77 * k, w, h - 77 * k);
        const sun = fc.createLinearGradient(0, 0, 0, 56 * k);
        sun.addColorStop(0, 'rgba(255,240,200,0)'); sun.addColorStop(1, 'rgba(255,236,190,0.18)');
        fc.globalCompositeOperation = 'lighter';
        fc.fillStyle = sun; fc.fillRect(0, 0, w, 56 * k);
        const dl = fc.createRadialGradient(15 * k, 124 * k, 0, 15 * k, 124 * k, 70 * k);
        dl.addColorStop(0, 'rgba(255,226,170,0.32)'); dl.addColorStop(1, 'rgba(255,226,170,0)');
        fc.fillStyle = dl; fc.fillRect(0, 0, w, h);
        const fl = 1 + Math.sin(t * 9) * 0.06 + Math.sin(t * 23) * 0.04;
        const lg = fc.createRadialGradient(235 * k, 93 * k, 0, 235 * k, 93 * k, 30 * k * fl);
        lg.addColorStop(0, 'rgba(255,180,90,0.45)'); lg.addColorStop(1, 'rgba(255,170,80,0)');
        fc.fillStyle = lg; fc.fillRect(0, 0, w, h);
        if (st.beam > 0) {
          const b = st.beam, half = 17 * st.hole;
          const gr = fc.createLinearGradient(0, 77 * k, 0, 145 * k);
          gr.addColorStop(0, 'rgba(255,238,196,' + 0.55 * b + ')');
          gr.addColorStop(1, 'rgba(255,238,196,' + 0.1 * b + ')');
          fc.fillStyle = gr;
          fc.beginPath();
          fc.moveTo((124 - half) * k, 77 * k); fc.lineTo((124 + half) * k, 77 * k);
          fc.lineTo((124 + half + 22) * k, 145 * k); fc.lineTo((124 - half - 14) * k, 145 * k);
          fc.closePath(); fc.fill();
          const pool = fc.createRadialGradient(128 * k, 144 * k, 0, 128 * k, 144 * k, 44 * k);
          pool.addColorStop(0, 'rgba(255,232,180,' + 0.3 * b + ')'); pool.addColorStop(1, 'rgba(255,232,180,0)');
          fc.fillStyle = pool; fc.fillRect(0, 100 * k, w, 60 * k);
          fc.fillStyle = 'rgba(255,246,220,' + 0.7 * b + ')';
          sc.motes.forEach((m) => fc.fillRect(m.x * k, m.y * k, k * 0.6, k * 0.6));
        }
        fc.globalCompositeOperation = 'source-over';
      },
      update(dt, sc) {
        if (st.diggers) {
          const ph = Math.floor(sc.t * 3.5);
          st.diggers.forEach((d, i) => { if (st.digging) d.pose = (ph + i) % 2 ? 'out' : 'stand'; });
        }
        if (st.digging && Math.random() < dt * 1.1) TW.Audio && TW.Audio.sfx('dig');
        if (st.digging && Math.random() < dt * 14) {
          SC.dust(108 + Math.random() * 32, 77, 1, { spread: 2 });
          SC.dust(108 + Math.random() * 32, 56, 1, { spread: 2, up: true });
        }
        if (st.beam > 0) {
          while (sc.motes.length < 40) sc.motes.push({ x: 104 + Math.random() * 44, y: 78 + Math.random() * 62, v: 2 + Math.random() * 4, p: Math.random() * 6 });
          sc.motes.forEach((m) => {
            m.y += m.v * dt; m.x += Math.sin(sc.t + m.p) * 2 * dt;
            if (m.y > 142) { m.y = 79; m.x = 104 + Math.random() * 44; }
          });
        }
      },
    };
    return st;
  }

  // ---------- helpers ----------
  const GOAL1 = 'Find the house where the teacher is staying. Tap the street to walk; tap people to talk.';
  const GOAL2 = 'Go down to the shore by the boat and write your report.';

  function matCarried(f1, f2) {
    return function (ctx, sx, sy, t, e) {
      const cam = Math.round(SC.cam);
      const ax = Math.round(f1.x - cam), ay = Math.round(f1.y - 12);
      const bx = Math.round(f2.x - cam), by = Math.round(f2.y - 12);
      const n = Math.max(Math.abs(bx - ax), Math.abs(by - ay), 1);
      for (let i = 0; i <= n; i++) {
        const x = Math.round(ax + ((bx - ax) * i) / n), y = Math.round(ay + ((by - ay) * i) / n);
        R(ctx, x, y, 1, 2, '#b39a62'); R(ctx, x, y + 2, 1, 1, '#1b130d');
        if (i > 3 && i < n - 3) R(ctx, x, y - 2, 1, 2, i < 6 ? '#9a6440' : '#8a7a5a');
      }
    };
  }

  // ---------- the episode ----------
  const EP = { id: 'capernaum' };

  EP.run = async function (game) {
    const P = sprites();
    SC.load(exteriorStage());
    const st = SC.stage;
    const player = SC.add({ id: 'player', frames: P.player, x: 24, y: 148 });
    SC.player = player;
    SC.cam = 0;

    const fisher = SC.add({ id: 'fisher', frames: villager(3), pose: 'sit', x: 90, y: 146, facing: -1 });
    const woman = SC.add({ id: 'woman', frames: villager(8, true), pose: 'sit', x: 190, y: 146, facing: -1 });
    const crowd = [];
    [[300, 1, 141], [312, 1, 140], [322, 1, 139], [336, -1, 139], [348, -1, 140], [360, -1, 141], [328, 1, 143]].forEach((c, i) => {
      crowd.push(SC.add({ id: 'c' + i, frames: villager(20 + i, i === 2 || i === 5), x: c[0], y: c[2], facing: c[1] }));
    });
    const f1 = SC.add({ id: 'f1', frames: villager(41), x: 394, y: 147, facing: 1, speed: 26 });
    const f2 = SC.add({ id: 'f2', frames: villager(42), x: 420, y: 147, facing: -1, speed: 26 });
    const f3 = SC.add({ id: 'f3', frames: villager(43), x: 432, y: 149, facing: -1, speed: 26 });
    const f4 = SC.add({ id: 'f4', frames: villager(44), x: 380, y: 149, facing: 1, speed: 26 });
    const matE = SC.add({
      id: 'mat', x: 407, y: 150, z: 149.5,
      draw(ctx, sx, sy) { ctx.drawImage(P.lying, sx - 14, sy - 10); },
    });

    let climbing = false;
    const climb = async () => {
      if (climbing) return;
      climbing = true;
      matE.draw = matCarried(f1, f2);
      matE.z = 200;
      const up = async (f, rx, delay) => {
        await SC.wait(delay);
        await SC.walkPath(f, [[446, 137], [402, 91], [rx, 88]]);
        f.facing = -1;
      };
      up(f3, 344, 0);
      up(f2, 380, 500);
      up(f1, 356, 900);
      await up(f4, 368, 1500);
      st.digging = true;
      f1.pose = 'out'; f2.pose = 'out';
    };
    st.onUpdate = () => { if (player.x > 262 && !climbing) climb(); };

    let doorTap = null;
    const goal1 = () => freeGoal(GOAL1, 'Go to the house', async () => {
      SC.busy = true;
      await SC.walk(player, 318);
      SC.busy = false;
      doorTap();
    });
    const talk = (fn) => async () => {
      SC.mode = 'script';
      await fn();
      goal1();
    };
    fisher.onTap = talk(async () => {
      fisher.facing = player.x < fisher.x ? -1 : 1;
      await SC.say({ kind: 'drama', speaker: 'A fisherman mending nets', text: 'Looking for the teacher? Follow the noise. Half the village has been at that door since dawn.' });
      game.observe('capernaum', 'fisher', 'A fisherman said half the village had waited at one door since dawn.');
      fisher.facing = -1;
    });
    woman.onTap = talk(async () => {
      await SC.say({ kind: 'drama', speaker: 'A woman grinding grain', text: 'You’ve come about him? He healed Simon’s wife’s mother, here in this village. The fever left her, and she got up and served them.' });
      await SC.say({ kind: 'history', text: 'She is describing an earlier day in Capernaum, recorded in Mark 1:29–31.' });
      game.observe('capernaum', 'fever', 'Villagers say he healed Simon’s mother-in-law of a fever here (Mark 1:29–31).');
    });
    const friendTalk = talk(async () => {
      if (climbing) {
        await SC.say({ kind: 'drama', text: 'The four men are already climbing the outside stairs to the roof, carrying their friend between them.' });
      } else {
        await SC.say({ kind: 'drama', speaker: 'One of four friends', text: 'We carried him from the other end of the village. There’s no getting through that door. Not today.' });
        await SC.say({ kind: 'drama', text: 'Another looks up at the stairs that run along the wall to the roof. The four exchange a glance.' });
        climb();
      }
      game.observe('capernaum', 'friends', 'Four men carried a paralyzed friend and would not turn back.');
    });
    [f1, f2, f3, f4].forEach((f) => { f.onTap = friendTalk; });
    matE.onTap = friendTalk;

    let enter;
    const entered = new Promise((r) => { enter = r; });
    st.hotspots.push({
      x0: 326, x1: 352, y0: 100, y1: 152, walkX: 318,
      onTap: async () => {
        SC.mode = 'script';
        player.facing = 1;
        await SC.say({ kind: 'drama', speaker: 'Someone in the crowd', text: 'You won’t get in that way, friend. Oh — a teacher of the Law. Make way, make way!' });
        enter();
      },
    });
    doorTap = st.hotspots[0].onTap;
    crowd[1].onTap = doorTap;

    // ---- arrival ----
    await SC.say({ kind: 'history', text: 'Capernaum, on the north shore of the Sea of Galilee. Houses of black basalt crowd around shared courtyards. Their flat roofs are beams and branches packed with earth.' });
    await SC.say({ kind: 'scripture', ref: 'Mark 2:1–2', text: TW.P.vs('mark2a', 1, 2) });
    goal1();
    await entered;
    climb();

    // ---- inside the house ----
    await fade(async () => {
      SC.load(interiorStage());
      SC.cam = 0;
    });
    const IN = SC.stage;
    // a crowded room: "no more room, not even around the door"
    [22, 34, 46, 58, 70, 82, 94, 104].forEach((x, i) => SC.add({ frames: villager(100 + i, i % 3 === 1), x: x, y: 136, facing: 1 }));
    [28, 44, 60, 76, 92].forEach((x, i) => SC.add({ frames: villager(120 + i, i === 2), pose: 'sit', x: x, y: 147, facing: 1 }));
    [172, 186, 200, 216, 232, 246].forEach((x, i) => SC.add({ frames: i < 3 ? P.scribe(10 + i) : villager(300 + i, i === 4), x: x, y: 136, facing: -1 }));
    [176, 212, 230].forEach((x, i) => SC.add({ frames: P.scribe(20 + i), pose: 'sit', x: x, y: 147, facing: -1 }));
    const me = SC.add({ id: 'player', frames: P.player, pose: 'sit', x: 194, y: 148, facing: -1 });
    const jesus = SC.add({ id: 'jesus', frames: P.jesus, pose: 'sit', x: 152, y: 143, facing: -1 });
    const everyone = SC.ents.filter((e) => e !== jesus && e !== me);

    await SC.say({ kind: 'drama', text: 'Inside, the air is close and warm. Bodies press against the walls. As a teacher of the Law, you are waved to a place on the floor near the front, among the other scribes.' });
    await SC.say({ kind: 'scripture', ref: 'Luke 5:17', text: TW.P.single['Luke 5:17'] });

    const obs = [
      { id: 'authority', x0: 140, x1: 166, y0: 118, y1: 146, text: 'He teaches with authority, not as the scribes do (Mark 1:22).' },
      { id: 'people', x0: 14, x1: 110, y0: 108, y1: 154, text: 'Fishermen, farmers, women and children all crowd in to listen.' },
      { id: 'scribes', x0: 166, x1: 254, y0: 108, y1: 154, text: 'Teachers of the Law from Galilee, Judea and Jerusalem sit beside me, watching closely.' },
      { id: 'roof', x0: 0, x1: 256, y0: 56, y1: 78, text: 'The roof is beams, branches and packed earth.' },
    ];
    obs.forEach((o) => IN.hotspots.push(Object.assign({}, o, {
      active: () => SC.mode === 'observe',
      onTap: () => game.observe('capernaum', o.id, o.text, true),
    })));
    await SC.prompt('He is speaking the word to them. Look around the room and tap anything worth noting in your scroll.', 'Keep listening', 'observe');
    IN.hotspots.length = 0;

    // four men arrive on the roof
    const roofMat = SC.add({ x: 300, y: 56, z: 54, draw(ctx, sx, sy) { ctx.drawImage(P.lying, sx - 14, sy - 10); } });
    const rf = [41, 42, 43, 44].map((n, i) => SC.add({ frames: villager(n), x: 262 + i * 12, y: 55, z: 55, facing: -1, speed: 50 }));
    const spots = [[94, 1], [104, 1], [146, -1], [156, -1]];
    SC.wait(300).then(() => SC.tween(2400, (p) => { roofMat.x = U.lerp(300, 190, p); }));
    await Promise.all(rf.map((f, i) => SC.wait(i * 180).then(() => SC.walk(f, spots[i][0])).then(() => { f.facing = spots[i][1]; })));
    IN.diggers = rf;
    IN.digging = true;
    everyone.forEach((e) => { if (Math.random() > 0.4) e.facing = e.x < 124 ? 1 : -1; });
    await SC.say({ kind: 'drama', text: 'Something scrapes overhead. Dust sifts down between the beams. One by one, faces turn upward.' });
    TW.Audio && TW.Audio.sfx('crumble');
    await SC.tween(2600, (p) => { IN.hole = p; IN.beam = U.smooth(0.15, 1, p); });
    IN.digging = false;
    rf.forEach((f) => { f.pose = 'out'; });
    await SC.say({ kind: 'scripture', ref: 'Mark 2:3–4', text: TW.P.vs('mark2a', 3, 4) });

    SC.ents = SC.ents.filter((e) => e !== roofMat);
    const lowered = SC.add({
      id: 'lowered', x: 124, y: 62, z: 144,
      draw(ctx, sx, sy) {
        ctx.drawImage(P.lying, sx - 14, sy - 10);
        const rope = (x0, y0, x1, y1) => {
          const n = Math.max(Math.abs(y1 - y0), Math.abs(x1 - x0), 1);
          for (let i = 0; i <= n; i++) R(ctx, Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), 1, 1, '#c9b07a');
        };
        if (lowered.ropes) {
          rope(sx - 13, sy - 2, 110, 43); rope(sx - 11, sy - 2, 100, 44);
          rope(sx + 13, sy - 2, 140, 43); rope(sx + 11, sy - 2, 150, 44);
        }
      },
    });
    lowered.ropes = true;
    await SC.tween(3400, (p) => { lowered.y = Math.round(U.lerp(62, 144, U.smooth(0, 1, p))); });
    lowered.ropes = false;
    everyone.forEach((e) => { e.facing = e.x < 124 ? 1 : -1; });
    await SC.wait(400);

    await SC.say({ kind: 'scripture', ref: 'Mark 2:5', text: TW.P.vs('mark2a', 5, 5) });
    const heart = await SC.choose('Words like these belong to God alone. What rises in your heart?', [
      '“Why does this man speak blasphemies like that? Who can forgive sins but God alone?”',
      'Only God forgives sins. So who does he think he is?',
      'Say nothing. Watch what happens next.',
    ]);
    game.setHeart('capernaum', heart);
    await SC.say({ kind: 'scripture', ref: 'Mark 2:6–7', text: TW.P.vs('mark2a', 6, 7) });
    jesus.facing = 1;
    await SC.say({ kind: 'drama', text: 'No one has spoken aloud. Yet he turns from the man on the mat and looks along the row of scribes. At you.' });
    await SC.say({ kind: 'scripture', ref: 'Mark 2:8–9', text: TW.P.vs('mark2a', 8, 9) });
    jesus.facing = -1;
    await SC.say({ kind: 'scripture', ref: 'Mark 2:10–11', text: TW.P.vs('mark2a', 10, 11) });

    // he rises
    SC.mode = 'script';
    SC.goal('…');
    await SC.wait(600);
    SC.remove('lowered');
    const mat = SC.add({ x: 124, y: 145, z: 143, draw(ctx, sx, sy) { ctx.drawImage(P.lying, 0, 8, 28, 3, sx - 14, sy - 2, 28, 3); } });
    const healed = SC.add({ id: 'healed', frames: P.healed, pose: 'sit', x: 124, y: 144, facing: -1, speed: 24 });
    await SC.wait(900);
    healed.pose = 'stand';
    TW.Audio && TW.Audio.music('wonder');
    await SC.wait(700);
    SC.ents = SC.ents.filter((e) => e !== mat);
    healed.pose = 'carry';
    await SC.wait(500);
    everyone.forEach((e, i) => { e.hopping = i % 2 === 0; if (e.pose === 'stand' && i % 3 === 0) e.pose = 'raise'; });
    rf.forEach((f, i) => { f.pose = i % 2 ? 'raise' : 'stand'; f.hopping = i % 2 === 0; });
    SC.walk(healed, 12).then(() => { healed.visible = false; });
    TW.Audio && TW.Audio.sfx('cheer');
    await SC.say({ kind: 'scripture', ref: 'Mark 2:12', text: TW.P.vs('mark2a', 12, 12) });
    game.observe('capernaum', 'forgive', 'He told the paralyzed man his sins were forgiven (Mark 2:5).', false, true);
    game.observe('capernaum', 'knew', 'He answered what the scribes were thinking before anyone spoke (Mark 2:8).', false, true);
    game.observe('capernaum', 'walked', 'The paralyzed man got up, took his mat, and walked out in front of everyone (Mark 2:12).', false, true);
    await SC.say({ kind: 'drama', text: 'People are praising God on every side. You came to write down what you saw. You saw this.' });
    game.addQuestion({ id: 'forgive', text: 'Who can forgive sins but God alone?', ref: 'Mark 2:7' });
    SC.toast('A question is now open in your scroll');
    await SC.wait(400);

    // ---- outside again ----
    await fade(async () => {
      SC.load(exteriorStage());
      SC.cam = 230;
    });
    const OUT = SC.stage;
    const p2 = SC.add({ id: 'player', frames: P.player, x: 322, y: 148, facing: -1 });
    SC.player = p2;
    SC.add({ id: 'fisher', frames: villager(3), pose: 'sit', x: 90, y: 146, facing: -1 });
    const w2 = SC.add({ id: 'woman', frames: villager(8, true), pose: 'raise', x: 190, y: 146, facing: 1 });
    [[300, 1, 141], [312, 1, 140], [348, -1, 140], [360, -1, 141], [274, 1, 144]].forEach((c, i) => {
      SC.add({ frames: villager(20 + i, i === 3), x: c[0], y: c[2], facing: c[1], pose: i % 2 ? 'raise' : 'stand', hopping: i === 0 });
    });
    const g1 = SC.add({ id: 'f1', frames: villager(41), x: 404, y: 148, facing: -1 });
    SC.add({ id: 'f2', frames: villager(42), x: 420, y: 147, facing: -1 });
    SC.add({ id: 'f3', frames: villager(43), x: 434, y: 149, facing: -1 });
    SC.add({ id: 'f4', frames: villager(44), x: 390, y: 149, facing: -1 });
    const h2 = SC.add({ id: 'healed', frames: P.healed, pose: 'carry', x: 300, y: 150, facing: -1, speed: 28 });
    SC.walk(h2, -30).then(() => { h2.visible = false; });

    const goal2 = () => {
      SC.prompt(GOAL2, 'Walk to the shore', 'free').then(async () => {
        SC.busy = true;
        await SC.walk(p2, 70);
        SC.busy = false;
        p2.facing = -1;
        game.openReport('capernaum');
      });
    };
    const talk2 = (fn) => async () => { SC.mode = 'script'; await fn(); goal2(); };
    g1.onTap = talk2(async () => {
      await SC.say({ kind: 'drama', speaker: 'One of the four friends', text: 'We couldn’t get him through the door. So we went up.' });
    });
    w2.onTap = talk2(async () => {
      await SC.say({ kind: 'drama', speaker: 'The woman at the quern', text: 'Did you see him? He walked past me carrying his own mat!' });
    });
    OUT.hotspots.push({
      x0: 14, x1: 80, y0: 90, y1: 156, walkX: 70,
      onTap: async () => {
        SC.mode = 'script';
        game.openReport('capernaum');
      },
    });

    await SC.say({ kind: 'drama', text: 'Outside, the street is full of people talking at once.' });
    goal2();
  };

  // answer the open questions this episode resolves, one by one
  async function answerAll(game, ep) {
    const A = (TW.D.episodes[ep] || {}).answers || {};
    for (const id of Object.keys(A)) {
      const q = game.answer(id, A[id][0], A[id][1]);
      if (!q) continue;
      TW.Audio && TW.Audio.sfx('chime');
      await SC.say({ kind: 'answer', text: '“' + q.text + '” (' + q.ref + ')\n\n' + A[id][0] + ' (' + A[id][1] + ')' });
    }
  }

  // end of an episode: one button leads to the report
  function finish(game, ep, text) {
    SC.prompt(text || 'Find a quiet place and write down what you saw.', 'Write your report', 'script').then(() => game.openReport(ep));
  }

  function freeGoal(text, label, action) {
    SC.prompt(text, label, 'free').then(action);
  }

  async function fade(fn) {
    TW.Audio && TW.Audio.sfx('whoosh');
    const v = SC.el.veil;
    v.classList.add('on');
    await SC.wait(U.reducedMotion() ? 50 : 450);
    await fn();
    await SC.wait(80);
    v.classList.remove('on');
  }

  // vista for the title screen
  EP.vista = function (ctx, t) {
    const A = art();
    const cam = (t * 6) % 120;
    ctx.drawImage(A.sky, 0, 0);
    ctx.drawImage(A.hills, -Math.round(cam), 0);
    lakeBand(ctx, t, cam * 2);
    R(ctx, 0, 100, 256, 60, '#4f7e88');
    for (let y = 100; y < 160; y += 3)
      for (let x = 0; x < 256; x += 4)
        if (U.hash((x + Math.floor(cam * 2)) >> 2, y, Math.floor(t * 3)) > 0.88) R(ctx, x, y, 3, 1, '#7aa3a4');
  };

  TW.Kit = { R, rnd, pick, villager, sprites, art, basalt, mudRoof, exteriorStage, interiorStage, lakeBand, fade, freeGoal, finish, answerAll, SKINS, HAIRS, TUNICS, VEILS };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.capernaum = EP;
})(window.TW);
