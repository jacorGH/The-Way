/* The Way — overworld maps (Galilee in detail, and the whole Land with fog that lifts as the story goes on) */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, D = TW.D;

  // ---------- coordinates ----------
  const tToLL = (R, x, y) => [R.lon0 + ((x + 0.5) / R.w) * (R.lon1 - R.lon0), R.lat1 - ((y + 0.5) / R.h) * (R.lat1 - R.lat0)];
  const llToT = (R, lon, lat) => [((lon - R.lon0) / (R.lon1 - R.lon0)) * R.w, ((R.lat1 - lat) / (R.lat1 - R.lat0)) * R.h];
  const kmBetween = (a, b) => Math.hypot((a.lon - b.lon) * 94, (a.lat - b.lat) * 111);

  // ---------- generation ----------
  const WATER = { lake: 1, sea: 3, salt: 4, river: 2 };
  function generate(R) {
    const W = R.w, H = R.h, sample = TW.Geo[R.id];
    const elev = new Float32Array(W * H), water = new Uint8Array(W * H), arid = new Float32Array(W * H);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const ll = tToLL(R, x, y);
        const s = sample(ll[0], ll[1]);
        const i = y * W + x;
        elev[i] = s.e; water[i] = s.water ? WATER[s.water] : 0; arid[i] = s.arid || 0;
      }
    // distance (texels) from open water to land, for shallows
    const shore = new Float32Array(W * H).fill(99);
    const q = [];
    for (let i = 0; i < W * H; i++) if (water[i] !== 1 && water[i] !== 3 && water[i] !== 4) { shore[i] = 0; q.push(i); }
    for (let h = 0; h < q.length; h++) {
      const i = q[h], x = i % W, y = (i / W) | 0, d = shore[i] + 1;
      if (d > 12) continue;
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach((o) => {
        const nx = x + o[0], ny = y + o[1];
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) return;
        const j = ny * W + nx;
        if (shore[j] > d) { shore[j] = d; q.push(j); }
      });
    }
    return { elev, water, arid, shore, W, H };
  }

  const BANDS = [
    [-150, '#6b8244'], [-50, '#7b8e4c'], [100, '#949558'], [250, '#ab9c62'], [400, '#bca46b'],
    [600, '#ae8f5d'], [850, '#957756'], [1400, '#7c634f'], [2100, '#857263'], [9999, '#ddd5c4'],
  ];
  const DESERT = [
    [-150, '#c9b17e'], [-50, '#c7ab76'], [100, '#c9a56b'], [250, '#c49e65'], [400, '#bc965f'],
    [600, '#ae895b'], [850, '#9e7c56'], [1400, '#8d7052'], [2100, '#8e7a68'], [9999, '#ddd5c4'],
  ];
  const LEVELS = [0.7, 0.82, 0.93, 1.03, 1.12];
  const band = (tbl, e) => { for (let i = 0; i < tbl.length; i++) if (e < tbl[i][0]) return U.hex(tbl[i][1]); return U.hex(tbl[tbl.length - 1][1]); };
  const mix = (a, b, t) => [U.lerp(a[0], b[0], t), U.lerp(a[1], b[1], t), U.lerp(a[2], b[2], t)];

  function bresenham(x0, y0, x1, y1, fn) {
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx + dy, i = 0;
    for (;;) {
      fn(x0, y0, i++);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }


  // ---------- Jerusalem's walls, houses and Temple, drawn over the terrain ----------
  const CITY_WALL = [[35.2275, 31.7770], [35.2303, 31.7772], [35.2312, 31.7800], [35.2338, 31.7810], [35.2378, 31.7800],
    [35.2368, 31.7757], [35.2365, 31.7730], [35.2360, 31.7710], [35.2350, 31.7699], [35.2320, 31.7700], [35.2290, 31.7714],
    [35.2273, 31.7730], [35.2271, 31.7755]];
  const PLATFORM_LL = [[35.2342, 31.7806], [35.2378, 31.7800], [35.2368, 31.7757], [35.2340, 31.7760]];
  function pip(x, y, poly) {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const a = poly[i], b = poly[j];
      if (a[1] > y !== b[1] > y && x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
  }
  function decorateCity(ctx, R) {
    const T = (pts) => pts.map((p) => llToT(R, p[0], p[1]));
    const wall = T(CITY_WALL), plat = T(PLATFORM_LL);
    const px = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };
    const box = (lon, lat, w, h, c) => { const p = llToT(R, lon, lat); ctx.fillStyle = c; ctx.fillRect(Math.round(p[0] - w / 2), Math.round(p[1] - h / 2), w, h); return [Math.round(p[0] - w / 2), Math.round(p[1] - h / 2)]; };
    // olive groves on the Mount of Olives, tombs on the Kidron slope
    for (let y = 0; y < R.h; y++)
      for (let x = 0; x < R.w; x++) {
        const ll = tToLL(R, x, y);
        if (ll[0] > 35.2390 && ll[0] < 35.2565 && U.hash(x, y, 9) > 0.86) px(x, y, U.hash(x, y, 10) > 0.5 ? '#5f6a3c' : '#6e7a46');
        else if (ll[0] > 35.2388 && ll[0] < 35.2402 && ll[1] < 31.7780 && U.hash(x, y, 11) > 0.95) px(x, y, '#bfb6a2');
        else if (ll[0] < 35.2265 && U.hash(x, y, 12) > 0.93) px(x, y, '#66703f');
      }
    // houses inside the walls
    for (let y = 0; y < R.h; y++)
      for (let x = 0; x < R.w; x++) {
        if (!pip(x + 0.5, y + 0.5, wall) || pip(x + 0.5, y + 0.5, plat)) continue;
        const gap = (x % 3 === 0 || y % 3 === 0) && U.hash(x >> 1, y >> 1, 3) > 0.35;
        const r = U.hash(x, y, 4);
        px(x, y, gap ? '#9e9074' : r > 0.7 ? '#dcd2b9' : r > 0.35 ? '#cfc4a8' : '#c4b89b');
      }
    // the Temple platform, its porticoes, courts and sanctuary
    for (let y = 0; y < R.h; y++)
      for (let x = 0; x < R.w; x++) {
        if (!pip(x + 0.5, y + 0.5, plat)) continue;
        const edge = !pip(x - 0.5, y + 0.5, plat) || !pip(x + 1.5, y + 0.5, plat) || !pip(x + 0.5, y - 0.5, plat) || !pip(x + 0.5, y + 1.5, plat);
        px(x, y, edge ? '#b9aa88' : (x + y) % 7 === 0 ? '#ddd3bb' : '#e8dfc9');
      }
    const sw = llToT(R, 35.2340, 31.7760), se = llToT(R, 35.2368, 31.7757);
    for (let x = Math.round(sw[0]) + 1; x < Math.round(se[0]); x++) { px(x, Math.round(sw[1]) - 1, '#c8bb9c'); px(x, Math.round(sw[1]) - 2, x % 2 ? '#a99a7a' : '#c8bb9c'); }
    const ic = box(35.2353, 31.7784, 9, 12, '#b3a483');
    ctx.fillStyle = '#d9cfb6'; ctx.fillRect(ic[0] + 1, ic[1] + 1, 7, 10);
    const sa = box(35.2352, 31.7786, 3, 5, '#f6f1e4');
    ctx.fillStyle = '#e3b04f'; ctx.fillRect(sa[0], sa[1], 3, 1);
    ctx.fillStyle = '#7a6a50'; ctx.fillRect(sa[0] + 1, sa[1] + 4, 1, 1);
    // Antonia and Herod's palace
    const an = box(35.2340, 31.7811, 6, 4, '#8f8370');
    ctx.fillStyle = '#6b604f'; [[0, 0], [5, 0], [0, 3], [5, 3]].forEach((o) => ctx.fillRect(an[0] + o[0], an[1] + o[1], 1, 1));
    const hp = box(35.2281, 31.7763, 5, 8, '#a89a7c');
    ctx.fillStyle = '#6b604f'; [[0, 0], [0, 3], [0, 6]].forEach((o) => ctx.fillRect(hp[0] + o[0] - 1, hp[1] + o[1], 2, 2));
    // pools
    box(35.2358, 31.7819, 2, 2, '#4f8a96'); box(35.2364, 31.7816, 2, 2, '#4f8a96'); box(35.2352, 31.7706, 2, 1, '#4f8a96');
    // the city wall with towers
    for (let i = 0; i < wall.length; i++) {
      const a = wall[i], b = wall[(i + 1) % wall.length];
      bresenham(a[0], a[1], b[0], b[1], (x, y, n) => {
        px(x, y, '#6b5e4c');
        if (n % 9 === 0) { ctx.fillStyle = '#5a4f40'; ctx.fillRect(x - 1, y - 1, 2, 2); }
      });
    }
  }

  function renderBase(R, geo) {
    const { elev, water, arid, shore, W, H } = geo;
    const c = U.makeCanvas(W, H), ctx = c.getContext('2d');
    const img = ctx.createImageData(W, H);
    const at = (x, y) => elev[U.clamp(y, 0, H - 1) * W + U.clamp(x, 0, W - 1)];
    const step = R.texelKm * 1000 * 2;
    const ci = R.texelKm > 0.5 ? 200 : 100;
    const L = [-0.62, -0.62, 0.48], ll = Math.hypot(L[0], L[1], L[2]);
    const k = R.texelKm > 0.5 ? 6 : 3.2;
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const i = y * W + x, wv = water[i];
        let col;
        if (wv) {
          const sd = shore[i];
          if (wv === 2) col = U.hex('#3f7380');
          else if (wv === 4) col = U.hex(sd < 2 ? '#8cbcb4' : sd < 5 ? '#6aa5a2' : '#57928f');
          else if (wv === 3) col = U.hex(sd < 2 ? '#5a8e95' : sd < 6 ? '#447a87' : (x + y) % 2 && U.hash(x, y, 5) > 0.6 ? '#2d5c6e' : '#325f71');
          else col = U.hex(sd < 2 ? '#5a8e95' : sd < 6 ? '#467d88' : '#3a6d7a');
        } else {
          const e = elev[i];
          const gx = (at(x + 1, y) - at(x - 1, y)) / step, gy = (at(x, y + 1) - at(x, y - 1)) / step;
          const nx = -gx * k, ny = -gy * k, nl = Math.hypot(nx, ny, 1);
          let sh = (nx * L[0] + ny * L[1] + L[2]) / nl / ll;
          sh = 0.5 + sh * 0.62;
          let q = LEVELS[0];
          for (let j = 0; j < LEVELS.length; j++) if (sh >= LEVELS[j] - 0.06) q = LEVELS[j];
          col = U.shade(mix(band(BANDS, e), band(DESERT, e), arid[i]), q);
          if (Math.floor(e / ci) !== Math.floor(at(x + 1, y) / ci) || Math.floor(e / ci) !== Math.floor(at(x, y + 1) / ci)) col = U.shade(col, 0.8);
          const nearW = (xx, yy) => { const v = water[U.clamp(yy, 0, H - 1) * W + U.clamp(xx, 0, W - 1)]; return v && v !== 2; };
          if (nearW(x + 1, y) || nearW(x - 1, y) || nearW(x, y + 1) || nearW(x, y - 1)) col = U.hex(arid[i] > 0.6 ? '#9a8a6c' : '#544a3e');
          col = U.shade(col, 0.965 + U.hash(x, y, 77) * 0.07);
        }
        img.data[i * 4] = col[0]; img.data[i * 4 + 1] = col[1]; img.data[i * 4 + 2] = col[2]; img.data[i * 4 + 3] = 255;
      }
    ctx.putImageData(img, 0, 0);
    if (R.city) decorateCity(ctx, R);
    const setPx = (x, y, hex) => { if (x >= 0 && y >= 0 && x < W && y < H) { ctx.fillStyle = hex; ctx.fillRect(x, y, 1, 1); } };
    R.edges.forEach((e) => {
      const a = R.nodes[e[0]], b = R.nodes[e[1]];
      const pa = llToT(R, a.lon, a.lat), pb = llToT(R, b.lon, b.lat);
      bresenham(pa[0], pa[1], pb[0], pb[1], (x, y, n) => {
        const wv = water[y * W + x];
        if (e[2] === 'boat') { if (wv && n % 3 === 0) setPx(x, y, '#9fbfc0'); }
        else if (!wv && n % 2 === 0) setPx(x, y, '#5e4126');
      });
    });
    return c;
  }

  // Fog: parchment over every place the scribe has not yet heard of
  function renderFog(R, geo, revealed) {
    const { W, H } = geo;
    const centers = [];
    R.places.forEach((p) => { if (revealed.has(p.id)) centers.push([p.lon, p.lat, p.r || 22]); });
    const isPlace = (id) => R.places.some((p) => p.id === id);
    // a waypoint is known once every place it connects to is known
    const known = (id) => {
      if (isPlace(id)) return revealed.has(id);
      const nb = R.edges.filter((e) => e[0] === id || e[1] === id).map((e) => (e[0] === id ? e[1] : e[0])).filter(isPlace);
      return nb.length > 0 && nb.every((n) => revealed.has(n));
    };
    R.edges.forEach((e) => {
      if (!known(e[0]) || !known(e[1])) return;
      const a = R.nodes[e[0]], b = R.nodes[e[1]];
      for (let t = 0; t <= 1; t += 0.1) centers.push([U.lerp(a.lon, b.lon, t), U.lerp(a.lat, b.lat, t), 9]);
    });
    const mask = new Float32Array(W * H);
    const c = U.makeCanvas(W, H), ctx = c.getContext('2d');
    const img = ctx.createImageData(W, H);
    const paper = U.hex('#dccb9f'), hatch = U.hex('#cbb68a'), edge = U.hex('#a58c61');
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const ll = tToLL(R, x, y);
        let m = 1e9;
        for (let k = 0; k < centers.length; k++) {
          const cc = centers[k];
          const d = Math.hypot((ll[0] - cc[0]) * 94, (ll[1] - cc[1]) * 111) - cc[2];
          if (d < m) m = d;
        }
        mask[y * W + x] = m;
      }
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const i = y * W + x, m = mask[i];
        let col = null;
        if (m > 2.5) col = (x - y) % 5 === 0 ? hatch : paper;
        else if (m > 0) col = (x + y) % 2 ? edge : null;
        if (!col) continue;
        img.data[i * 4] = col[0]; img.data[i * 4 + 1] = col[1]; img.data[i * 4 + 2] = col[2]; img.data[i * 4 + 3] = 255;
      }
    ctx.putImageData(img, 0, 0);
    return { canvas: c, mask };
  }

  // ---------- view ----------
  const cache = {};
  const V = {
    R: null, G: null, canvas: null, ctx: null, running: false, cam: { x: 0, y: 0 }, follow: true, scale: 2, dpr: 1,
    pos: { x: 0, y: 0 }, path: [], node: null, moving: false, t: 0, selected: null,
  };

  function regionData(id) {
    if (!cache[id]) {
      const R = D.regions[id];
      const geo = generate(R);
      cache[id] = { R, geo, base: renderBase(R, geo), fog: null, fogKey: '' };
    }
    return cache[id];
  }
  V.prepare = (id) => { regionData(id); };

  V.init = function (canvas) {
    V.canvas = canvas;
    V.ctx = canvas.getContext('2d');
    if (!V.walker) { V.walker = TW.S.walker(); V.boatSprite = TW.S.mapBoat(); }
    bindInput();
  };

  V.isWater = (x, y) => {
    const g = V.G.geo, xi = Math.round(x), yi = Math.round(y);
    if (xi < 0 || yi < 0 || xi >= g.W || yi >= g.H) return false;
    const w = g.water[yi * g.W + xi];
    return w === 1 || w === 3 || w === 4;
  };

  V.revealed = (id) => !V.G.R.fog || !V.fogSet || V.fogSet.has(id);
  V.isFogged = (x, y) => {
    if (!V.G.R.fog || !V.G.fog) return false;
    const g = V.G.geo, xi = U.clamp(Math.round(x), 0, g.W - 1), yi = U.clamp(Math.round(y), 0, g.H - 1);
    return V.G.fog.mask[yi * g.W + xi] > 1;
  };

  V.start = function (opts) {
    V.G = regionData(opts.region);
    V.R = V.G.R;
    V.onPlace = opts.onPlace; V.onBox = opts.onBox; V.status = opts.status || (() => null); V.badge = opts.badge || (() => null);
    if (V.R.fog) {
      V.fogSet = opts.revealed;
      const key = [...opts.revealed].sort().join(',');
      if (V.G.fogKey !== key) { V.G.fog = renderFog(V.R, V.G.geo, opts.revealed); V.G.fogKey = key; }
    } else V.fogSet = null;
    V.node = opts.node && V.R.nodes[opts.node] ? opts.node : V.R.start;
    const n = V.R.nodes[V.node];
    const p = llToT(V.R, n.lon, n.lat);
    V.pos.x = p[0]; V.pos.y = p[1];
    V.cam.x = p[0]; V.cam.y = p[1];
    V.follow = true; V.path = []; V.moving = false; V.selected = null;
    resize();
    if (V.running) return;
    V.running = true;
    let last = performance.now();
    const loop = (now) => {
      if (!V.running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt); draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };
  V.stop = () => { V.running = false; };
  V.focus = function (id) {
    const n = V.R.nodes[id];
    if (!n) return;
    const p = llToT(V.R, n.lon, n.lat);
    V.follow = false;
    V.cam.x = p[0]; V.cam.y = p[1] + (V.cssH || 600) * 0.22 / V.scale;
  };

  function resize() {
    const r = V.canvas.getBoundingClientRect();
    V.dpr = Math.min(window.devicePixelRatio || 1, 3);
    V.canvas.width = Math.round(r.width * V.dpr);
    V.canvas.height = Math.round(r.height * V.dpr);
    V.cssW = r.width; V.cssH = r.height;
    V.scale = U.clamp(Math.round(Math.max(r.width / V.R.w, r.height / V.R.h) + 0.2), 2, V.R.city ? 3 : 5);
  }
  window.addEventListener('resize', () => { if (V.running) resize(); });

  function shortestPath(R, from, to) {
    const dist = {}, prev = {}, seen = {};
    Object.keys(R.nodes).forEach((k) => { dist[k] = Infinity; });
    dist[from] = 0;
    for (;;) {
      let u = null;
      Object.keys(dist).forEach((k) => { if (!seen[k] && dist[k] < Infinity && (u === null || dist[k] < dist[u])) u = k; });
      if (u === null || u === to) break;
      seen[u] = true;
      R.edges.forEach((e) => {
        const v = e[0] === u ? e[1] : e[1] === u ? e[0] : null;
        if (!v) return;
        const nd = dist[u] + kmBetween(R.nodes[u], R.nodes[v]) * (e[2] === 'boat' ? 1.4 : 1);
        if (nd < dist[v]) { dist[v] = nd; prev[v] = u; }
      });
    }
    if (dist[to] === Infinity) return null;
    const out = [to];
    while (out[0] !== from) out.unshift(prev[out[0]]);
    return out;
  }

  V.travelTo = function (id) {
    if (V.moving) return;
    if (id === V.node) { V.onPlace && V.onPlace(id, true); return; }
    const ids = shortestPath(V.R, V.node, id);
    if (!ids) return;
    V.path = ids.slice(1).map((k) => { const p = llToT(V.R, V.R.nodes[k].lon, V.R.nodes[k].lat); return { id: k, x: p[0], y: p[1] }; });
    V.target = id; V.moving = true; V.follow = true;
  };

  function update(dt) {
    V.t += dt;
    if (V.moving && V.path.length) {
      const nxt = V.path[0];
      const dx = nxt.x - V.pos.x, dy = nxt.y - V.pos.y, dist = Math.hypot(dx, dy);
      const step = (U.reducedMotion() ? 90 : 26) * dt;
      if (dist <= step) {
        V.pos.x = nxt.x; V.pos.y = nxt.y; V.node = nxt.id; V.path.shift();
        if (!V.path.length) {
          V.moving = false;
          TW.game && TW.game.setMapNode(V.R.id, V.node);
          V.onPlace && V.onPlace(V.target, true);
        }
      } else {
        V.pos.x += (dx / dist) * step; V.pos.y += (dy / dist) * step;
        V.facing = dx < 0 ? -1 : 1;
      }
    }
    V.boat = V.isWater(V.pos.x, V.pos.y);
    const snd = V.moving ? (V.boat ? 'boat' : 'walk') : '';
    if (snd !== V._snd && TW.Audio) { V._snd = snd; TW.Audio.travel(snd); }
    if (V.follow) {
      const k = 1 - Math.pow(0.002, dt);
      V.cam.x += (V.pos.x - V.cam.x) * k; V.cam.y += (V.pos.y - V.cam.y) * k;
    }
    const s = V.scale, halfW = V.cssW / 2 / s, halfH = V.cssH / 2 / s, pad = 6;
    V.cam.x = halfW * 2 >= V.R.w + pad * 2 ? V.R.w / 2 : U.clamp(V.cam.x, halfW - pad, V.R.w - halfW + pad);
    // allow scrolling past the bottom edge by the height of the place card, so a place can sit above it
    const padB = (V.cssH * 0.3) / s;
    if (halfH * 2 >= V.R.h + pad * 2) V.cam.y = U.clamp(V.cam.y, V.R.h / 2, V.R.h / 2 + padB);
    else V.cam.y = U.clamp(V.cam.y, halfH - pad, V.R.h - halfH + pad + padB);
  }

  const toScreen = (x, y) => {
    const k = V.scale * V.dpr;
    return [Math.round((x - V.cam.x) * k + V.canvas.width / 2), Math.round((y - V.cam.y) * k + V.canvas.height / 2)];
  };
  const toWorld = (cx, cy) => [(cx - V.cssW / 2) / V.scale + V.cam.x, (cy - V.cssH / 2) / V.scale + V.cam.y];

  function draw() {
    const ctx = V.ctx, k = V.scale * V.dpr, cw = V.canvas.width, ch = V.canvas.height, g = V.G.geo, R = V.R;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#2e2a27';
    ctx.fillRect(0, 0, cw, ch);
    const o = toScreen(0, 0);
    ctx.drawImage(V.G.base, o[0], o[1], R.w * k, R.h * k);

    const frame = Math.floor(V.t * 5);
    ctx.fillStyle = 'rgba(214,232,226,0.75)';
    const x0 = Math.max(0, Math.floor(V.cam.x - cw / k / 2)), x1 = Math.min(R.w - 1, Math.ceil(V.cam.x + cw / k / 2));
    const y0 = Math.max(0, Math.floor(V.cam.y - ch / k / 2)), y1 = Math.min(R.h - 1, Math.ceil(V.cam.y + ch / k / 2));
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) {
        const w = g.water[y * R.w + x];
        if (w !== 1 && w !== 3 && w !== 4) continue;
        if (U.hash(x, y, frame) > (w === 3 ? 0.993 : 0.988)) { const p = toScreen(x, y); ctx.fillRect(p[0], p[1], k * 2, k); }
      }

    if (!U.reducedMotion()) {
      for (let i = 0; i < 3; i++) {
        const cx = ((V.t * (3 + i) + i * 97) % (R.w + 120)) - 60, cy = R.h * (0.18 + i * 0.3) + Math.sin(V.t * 0.1 + i) * 10;
        const p = toScreen(cx, cy), r = (36 + i * 10) * k;
        const gr = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], r);
        gr.addColorStop(0, 'rgba(30,22,14,0.16)'); gr.addColorStop(1, 'rgba(30,22,14,0)');
        ctx.fillStyle = gr; ctx.fillRect(p[0] - r, p[1] - r, r * 2, r * 2);
      }
    }
    if (R.fog && V.G.fog) ctx.drawImage(V.G.fog.canvas, o[0], o[1], R.w * k, R.h * k);

    if (R.box) {
      const a = llToT(R, R.box.lon0, R.box.lat1), b = llToT(R, R.box.lon1, R.box.lat0);
      const pa = toScreen(a[0], a[1]), pb = toScreen(b[0], b[1]);
      ctx.save();
      ctx.setLineDash([6 * V.dpr, 4 * V.dpr]);
      ctx.strokeStyle = 'rgba(232,190,92,0.9)'; ctx.lineWidth = 1.6 * V.dpr;
      ctx.strokeRect(pa[0], pa[1], pb[0] - pa[0], pb[1] - pa[1]);
      ctx.restore();
      ctx.font = 'italic ' + 11.5 * V.dpr + 'px "EB Garamond", Georgia, serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(244,214,140,0.95)';
      ctx.fillText(R.boxLabel || 'Tap to open the Galilee map', pa[0] + 4 * V.dpr, pb[1] + 3 * V.dpr);
    }

    drawLabels(ctx, k);
    drawMarkers(ctx, k);

    const p = toScreen(V.pos.x, V.pos.y);
    if (V.boat) {
      const b = V.boatSprite, bob = Math.round(Math.sin(V.t * 4)) * V.dpr;
      ctx.drawImage(b, p[0] - (b.width * k) / 2, p[1] - b.height * k + 2 * k + bob, b.width * k, b.height * k);
    } else {
      const fr = V.moving ? V.walker[Math.floor(V.t * 6) % 2] : V.walker[0];
      ctx.save();
      if (V.facing === -1) { ctx.translate(p[0], 0); ctx.scale(-1, 1); ctx.translate(-p[0], 0); }
      ctx.drawImage(fr, p[0] - (fr.width * k) / 2, p[1] - fr.height * k + k, fr.width * k, fr.height * k);
      ctx.restore();
    }
    drawChrome(ctx);
  }

  function drawMarkers(ctx, k) {
    const ink = '#22170f';
    V.R.places.forEach((pl) => {
      if (!V.revealed(pl.id)) return;
      const t = llToT(V.R, pl.lon, pl.lat), p = toScreen(t[0], t[1]);
      const px = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(p[0] + x * k, p[1] + y * k, w * k, h * k); };
      const st = V.status(pl);
      if (pl.kind === 'episode') {
        if (st === 'next') {
          const pulse = U.reducedMotion() ? 0.5 : (Math.sin(V.t * 3) + 1) / 2;
          ctx.strokeStyle = 'rgba(232,190,92,' + (0.35 + pulse * 0.5) + ')';
          ctx.lineWidth = 2 * V.dpr;
          ctx.beginPath(); ctx.arc(p[0], p[1], (6 + pulse * 3) * k, 0, Math.PI * 2); ctx.stroke();
        }
        px(-3, -1, 7, 3, ink); px(-1, -3, 3, 7, ink); px(-2, -2, 5, 5, ink);
        const gold = st === 'done' ? '#b9a272' : '#e3b04f';
        px(-2, -1, 5, 3, gold); px(-1, -2, 3, 5, gold); px(0, -1, 1, 1, '#fff1c4');
      } else if (pl.kind === 'locked') {
        px(-2, -2, 5, 5, ink); px(-1, -1, 3, 3, '#9a3f2a'); px(-1, -1, 1, 1, '#c86a4c');
      } else if (pl.kind === 'zoom') {
        px(-2, -2, 5, 5, ink); px(-1, -1, 3, 3, '#e3b04f');
      } else {
        px(-1, -1, 3, 3, ink); px(0, 0, 1, 1, '#efe2c2');
      }
      const bd = V.badge(pl);
      if (bd) {
        // a small speech mark: someone here has a testimony to give
        const bx = p[0] + 3 * k, by = p[1] - 6 * k;
        ctx.fillStyle = ink; ctx.fillRect(bx - k, by - k, 5 * k, 4 * k); ctx.fillRect(bx, by + 3 * k, k, k);
        ctx.fillStyle = bd === 'new' ? '#f2d38a' : '#b9a272'; ctx.fillRect(bx, by, 3 * k, 2 * k);
      }
      if (V.selected === pl.id) {
        ctx.strokeStyle = '#efe2c2'; ctx.lineWidth = 1.5 * V.dpr;
        ctx.strokeRect(p[0] - 5 * k, p[1] - 5 * k, 10 * k, 10 * k);
      }
      const fs = 12.5 * V.dpr;
      ctx.font = (pl.kind === 'episode' ? '600 ' : '500 ') + fs + 'px "EB Garamond", Georgia, serif';
      ctx.textBaseline = 'middle';
      const pos = pl.label || 'r';
      ctx.textAlign = pos === 'r' ? 'left' : pos === 'l' ? 'right' : 'center';
      const lx = p[0] + (pos === 'r' ? 6 : pos === 'l' ? -6 : 0) * k;
      const ly = p[1] + (pos === 'b' ? 7 * k + 6 * V.dpr : 0);
      const name = pl.short || pl.name;
      ctx.lineJoin = 'round'; ctx.lineWidth = 3.5 * V.dpr;
      ctx.strokeStyle = 'rgba(234,222,192,0.92)'; ctx.strokeText(name, lx, ly);
      ctx.fillStyle = pl.kind === 'locked' ? '#5b2a1d' : ink; ctx.fillText(name, lx, ly);
    });
  }

  function drawLabels(ctx) {
    V.R.labels.forEach((lb) => {
      const t = llToT(V.R, lb.lon, lb.lat);
      if (V.isFogged(t[0], t[1])) return;
      const p = toScreen(t[0], t[1]);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (lb.style === 'water' || lb.style === 'river') {
        ctx.font = 'italic ' + (lb.style === 'water' ? 15 : 12) * V.dpr + 'px "EB Garamond", Georgia, serif';
        ctx.fillStyle = 'rgba(214,232,226,0.88)';
        ctx.fillText(lb.text, p[0], p[1]);
      } else {
        ctx.font = (lb.style === 'small' ? 10 : 12) * V.dpr + 'px Cinzel, "Trajan Pro", Georgia, serif';
        if ('letterSpacing' in ctx) ctx.letterSpacing = 2 * V.dpr + 'px';
        ctx.fillStyle = 'rgba(42,28,18,0.6)';
        ctx.fillText(lb.text, p[0], p[1]);
        if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      }
    });
  }

  function drawChrome(ctx) {
    const d = V.dpr, cw = V.canvas.width, ch = V.canvas.height;
    const g = ctx.createRadialGradient(cw / 2, ch / 2, Math.min(cw, ch) * 0.35, cw / 2, ch / 2, Math.max(cw, ch) * 0.75);
    g.addColorStop(0, 'rgba(20,12,6,0)'); g.addColorStop(1, 'rgba(20,12,6,0.45)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch);
    const k = V.scale * d, len = (V.R.scaleKm / V.R.texelKm) * k, x = 16 * d, y = ch - 22 * d;
    ctx.fillStyle = 'rgba(234,222,192,0.9)'; ctx.fillRect(x - 4 * d, y - 16 * d, len + 8 * d, 26 * d);
    ctx.fillStyle = '#22170f'; ctx.fillRect(x, y, len, 3 * d);
    ctx.fillRect(x, y - 3 * d, 1.5 * d, 6 * d); ctx.fillRect(x + len - 1.5 * d, y - 3 * d, 1.5 * d, 6 * d);
    ctx.font = 11 * d + 'px "EB Garamond", Georgia, serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(V.R.scaleKm + ' km', x, y - 5 * d);
    const nx = cw - 26 * d, ny = 30 * d;
    ctx.beginPath();
    ctx.moveTo(nx, ny - 12 * d); ctx.lineTo(nx + 6 * d, ny + 6 * d); ctx.lineTo(nx, ny + 2 * d); ctx.lineTo(nx - 6 * d, ny + 6 * d);
    ctx.closePath(); ctx.fillStyle = 'rgba(234,222,192,0.92)'; ctx.fill();
    ctx.strokeStyle = '#22170f'; ctx.lineWidth = 1.2 * d; ctx.stroke();
    ctx.font = 11 * d + 'px Cinzel, Georgia, serif'; ctx.textAlign = 'center';
    ctx.fillText('N', nx, ny + 19 * d);
  }

  function bindInput() {
    if (V.bound) return;
    V.bound = true;
    const c = V.canvas;
    let down = null;
    c.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, cx: V.cam.x, cy: V.cam.y, drag: false }; c.setPointerCapture(e.pointerId); });
    c.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (!down.drag && Math.hypot(dx, dy) > 7) { down.drag = true; V.follow = false; }
      if (down.drag) { V.cam.x = down.cx - dx / V.scale; V.cam.y = down.cy - dy / V.scale; }
    });
    c.addEventListener('pointerup', (e) => {
      if (!down) return;
      const wasDrag = down.drag;
      down = null;
      if (wasDrag) return;
      const r = c.getBoundingClientRect();
      const w = toWorld(e.clientX - r.left, e.clientY - r.top);
      let best = null, bd = 9;
      V.R.places.forEach((pl) => {
        if (!V.revealed(pl.id)) return;
        const t = llToT(V.R, pl.lon, pl.lat), dd = Math.hypot(t[0] - w[0], t[1] - w[1]);
        if (dd < bd) { bd = dd; best = pl; }
      });
      if (best) { V.selected = best.id; TW.game && TW.game.previewPlace(best.id); return; }
      if (V.R.box) {
        const a = llToT(V.R, V.R.box.lon0, V.R.box.lat1), b = llToT(V.R, V.R.box.lon1, V.R.box.lat0);
        if (w[0] >= a[0] && w[0] <= b[0] && w[1] >= a[1] && w[1] <= b[1]) V.onBox && V.onBox();
      }
    });
    c.addEventListener('pointercancel', () => { down = null; });
  }

  TW.MapView = V;
  TW.MapGen = { generate, llToT, tToLL, shortestPath, renderFog };
})(window.TW);
