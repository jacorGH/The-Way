/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — geography: simplified real elevations for each map region */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U;
  // ---------- geography ----------
  const kx = (lon) => (lon - 35.2) * 93.5;
  const ky = (lat) => (33.05 - lat) * 111;
  const LAKE = [
    [35.575, 32.882], [35.600, 32.890], [35.625, 32.893], [35.640, 32.880], [35.645, 32.860],
    [35.648, 32.830], [35.645, 32.800], [35.640, 32.770], [35.630, 32.740], [35.610, 32.715],
    [35.585, 32.705], [35.565, 32.712], [35.555, 32.735], [35.545, 32.765], [35.535, 32.790],
    [35.520, 32.815], [35.515, 32.830], [35.522, 32.855], [35.540, 32.868], [35.555, 32.875],
  ].map((p) => [kx(p[0]), ky(p[1])]);
  const RIVN = [[35.628, 32.893], [35.630, 32.93], [35.634, 32.97], [35.630, 33.01], [35.626, 33.06]].map((p) => [kx(p[0]), ky(p[1])]);
  const RIVS = [[35.572, 32.708], [35.576, 32.68], [35.569, 32.65], [35.576, 32.62], [35.570, 32.59]].map((p) => [kx(p[0]), ky(p[1])]);

  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const t = U.clamp(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy), 0, 1);
    const x = ax + t * dx - px, y = ay + t * dy - py;
    return Math.sqrt(x * x + y * y);
  }
  function lineDist(px, py, pts, closed) {
    let d = 1e9;
    const n = pts.length;
    for (let i = 0; i < (closed ? n : n - 1); i++) {
      const a = pts[i], b = pts[(i + 1) % n];
      d = Math.min(d, segDist(px, py, a[0], a[1], b[0], b[1]));
    }
    return d;
  }
  function inPoly(px, py, pts) {
    let c = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const a = pts[i], b = pts[j];
      if (a[1] > py !== b[1] > py && px < ((b[0] - a[0]) * (py - a[1])) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
  }
  const gauss = (lon, lat, clon, clat, sx, sy) => {
    const dx = (kx(lon) - kx(clon)) / sx, dy = (ky(lat) - ky(clat)) / sy;
    return Math.exp(-(dx * dx + dy * dy) / 2);
  };
  function axisLon(lat) {
    if (lat >= 32.893) return 35.63;
    if (lat >= 32.86) return U.lerp(35.59, 35.63, (lat - 32.86) / 0.033);
    if (lat >= 32.74) return 35.59;
    if (lat >= 32.708) return U.lerp(35.572, 35.59, (lat - 32.708) / 0.032);
    return 35.572;
  }

  function sampleGalilee(lon, lat) {
    const px = kx(lon), py = ky(lat);
    const inLake = inPoly(px, py, LAKE);
    const dLake = inLake ? 0 : lineDist(px, py, LAKE, true);
    const dN = lineDist(px, py, RIVN, false), dS = lineDist(px, py, RIVS, false);
    const d = Math.min(dLake, dN, dS);
    let floor = -210;
    if (lat > 32.893) floor = -210 + ((lat - 32.893) / 0.157) * 260;
    else if (lat < 32.708) floor = -210 - ((32.708 - lat) / 0.108) * 45;

    const west = lon < axisLon(lat);
    let H, w;
    if (west) {
      H = 380 - (lon - 35.2) * 800;
      H += U.smooth(32.90, 33.05, lat) * 520;
      H += gauss(lon, lat, 35.41, 32.998, 6, 6) * 590;
      H += 80 * Math.sin(((lat - 32.6) / 0.072) * 2 * Math.PI + (lon - 35.2) * 6) * (1 - U.smooth(32.9, 32.97, lat));
      H -= gauss(lon, lat, 35.34, 32.797, 7, 1.6) * 120;
      H += gauss(lon, lat, 35.30, 32.706, 6, 1.6) * 170;
      const jz = U.smooth(32.688, 32.66, lat) * U.smooth(35.43, 35.37, lon);
      H = U.lerp(H, 70, jz * 0.92);
      H += gauss(lon, lat, 35.378, 32.612, 2.6, 2.6) * 330;
      H += gauss(lon, lat, 35.390, 32.687, 1.4, 1.4) * 300;
      H += gauss(lon, lat, 35.495, 32.818, 1.3, 1.3) * 10;
      w = 3.2 - gauss(lon, lat, 35.50, 32.80, 4, 4) * 1.6;
    } else {
      H = 110 + U.clamp((lon - 35.645) * 4300, 0, 480);
      H += U.smooth(32.85, 33.05, lat) * 230;
      H -= U.smooth(32.715, 32.665, lat) * 260 * U.smooth(35.60, 35.66, lon);
      w = 2.2;
    }
    const s = U.smooth(0, w, d);
    let e = floor + (H - floor) * s;
    e = U.lerp(e, -195, gauss(lon, lat, 35.532, 32.858, 2.2, 1.4) * 0.85 * (inLake ? 0 : 1));
    e = U.lerp(e, -200, gauss(lon, lat, 35.648, 32.893, 1.8, 1.2) * 0.8 * (inLake ? 0 : 1));
    e += (U.fbm(px * 0.33, py * 0.33, 3, 4) - 0.5) * 110 * s;
    e += (U.fbm(px * 1.3, py * 1.3, 9, 3) - 0.5) * 34 * s;
    const river = !inLake && (dN < 0.13 || dS < 0.13);
    return { e: inLake ? -210 : e, water: inLake ? 'lake' : river ? 'river' : null, arid: 0 };
  }


  // ---------- the whole Land ----------
  const LX = (lon) => (lon - 34.2) * 94.2, LY = (lat) => (33.65 - lat) * 111;
  const toL = (pts) => pts.map((p) => [LX(p[0]), LY(p[1])]);
  const pw = (tbl, x) => {
    if (x <= tbl[0][0]) return tbl[0][1];
    for (let i = 1; i < tbl.length; i++)
      if (x <= tbl[i][0]) return U.lerp(tbl[i - 1][1], tbl[i][1], (x - tbl[i - 1][0]) / (tbl[i][0] - tbl[i - 1][0]));
    return tbl[tbl.length - 1][1];
  };
  const SEA = toL([[33.9, 34.0], [35.42, 34.0], [35.40, 33.62], [35.37, 33.56], [35.33, 33.45], [35.24, 33.33], [35.19, 33.27],
    [35.20, 33.15], [35.10, 33.09], [35.085, 32.98], [35.070, 32.925], [35.085, 32.88], [35.07, 32.83], [35.00, 32.815],
    [34.955, 32.835], [34.94, 32.70], [34.915, 32.61], [34.885, 32.50], [34.85, 32.33], [34.80, 32.20], [34.745, 32.05],
    [34.69, 31.90], [34.64, 31.80], [34.54, 31.66], [34.43, 31.52], [34.30, 31.40], [34.22, 31.32], [34.10, 31.27], [33.9, 31.27]]);
  const LLAKE = toL([[35.575, 32.882], [35.600, 32.890], [35.625, 32.893], [35.640, 32.880], [35.645, 32.860], [35.648, 32.830],
    [35.645, 32.800], [35.640, 32.770], [35.630, 32.740], [35.610, 32.715], [35.585, 32.705], [35.565, 32.712], [35.555, 32.735],
    [35.545, 32.765], [35.535, 32.790], [35.520, 32.815], [35.515, 32.830], [35.522, 32.855], [35.540, 32.868], [35.555, 32.875]]);
  const HULA = toL([[35.605, 33.105], [35.62, 33.10], [35.625, 33.08], [35.615, 33.06], [35.60, 33.065], [35.598, 33.085]]);
  const DEAD = toL([[35.49, 31.77], [35.53, 31.775], [35.585, 31.74], [35.59, 31.60], [35.575, 31.45], [35.545, 31.33],
    [35.56, 31.20], [35.51, 31.10], [35.44, 31.10], [35.42, 31.20], [35.40, 31.30], [35.39, 31.40], [35.395, 31.50],
    [35.42, 31.60], [35.455, 31.68], [35.475, 31.73]]);
  const RN = toL([[35.628, 32.893], [35.63, 32.95], [35.62, 33.03], [35.61, 33.08], [35.625, 33.20], [35.65, 33.26]]);
  const RS = toL([[35.572, 32.708], [35.565, 32.50], [35.555, 32.30], [35.545, 32.10], [35.54, 31.95], [35.545, 31.85], [35.535, 31.774]]);
  const ARABAH = toL([[35.47, 31.10], [35.40, 31.0], [35.33, 30.90]]);
  const AXIS = [[30.95, 35.33], [31.10, 35.47], [31.40, 35.48], [31.77, 35.53], [32.2, 35.55], [32.71, 35.57], [32.80, 35.59], [32.89, 35.62], [33.25, 35.65], [33.65, 35.66]];
  const FLOOR = [[30.95, -150], [31.10, -400], [31.80, -400], [32.71, -210], [32.893, -210], [33.03, 70], [33.20, 75], [33.30, 300], [33.65, 500]];
  const RIDGE_LON = [[30.95, 34.95], [31.25, 34.95], [31.53, 35.10], [31.78, 35.21], [31.93, 35.23], [32.21, 35.27], [32.40, 35.28], [32.55, 35.30], [32.70, 35.32], [32.85, 35.35], [33.0, 35.41], [33.3, 35.50], [33.65, 35.80]];
  const RIDGE_H = [[30.95, 450], [31.25, 450], [31.40, 800], [31.53, 1000], [31.78, 780], [31.93, 880], [32.21, 900], [32.40, 550], [32.50, 180], [32.58, 60], [32.66, 80], [32.72, 420], [32.85, 380], [32.95, 650], [33.0, 1050], [33.30, 900], [33.65, 1700]];
  const CARMEL = toL([[34.96, 32.83], [35.17, 32.57]]), GILBOA = toL([[35.37, 32.52], [35.45, 32.42]]);
  const JABBOK = toL([[35.55, 32.17], [35.75, 32.20], [35.95, 32.17], [36.10, 32.10]]);
  const ARNON = toL([[35.57, 31.46], [35.75, 31.45], [35.95, 31.43]]);
  const YARMUK = toL([[35.59, 32.69], [35.75, 32.71], [35.95, 32.72], [36.2, 32.70]]);
  const gL = (px, py, lon, lat, s) => { const dx = (px - LX(lon)) / s, dy = (py - LY(lat)) / s; return Math.exp(-(dx * dx + dy * dy) / 2); };
  const ridgeG = (d, s) => Math.exp(-(d * d) / (2 * s * s));

  function sampleLand(lon, lat) {
    const px = LX(lon), py = LY(lat);
    if (inPoly(px, py, SEA)) return { e: -60, water: 'sea', arid: 0 };
    const inG = inPoly(px, py, LLAKE), inH = inPoly(px, py, HULA), inD = inPoly(px, py, DEAD);
    if (inG || inH) return { e: -210, water: 'lake', arid: 0 };
    if (inD) return { e: -400, water: 'salt', arid: 1 };
    const dRiv = Math.min(lineDist(px, py, RN, false), lineDist(px, py, RS, false));
    const d = Math.min(lineDist(px, py, LLAKE, true), lineDist(px, py, DEAD, true), lineDist(px, py, HULA, true), dRiv, lineDist(px, py, ARABAH, false));
    const floor = pw(FLOOR, lat);
    const west = lon < pw(AXIS, lat);
    const rl = pw(RIDGE_LON, lat), rh = pw(RIDGE_H, lat);
    const dW = LX(rl) - px;
    let H, w;
    if (west) {
      if (dW > 0) {
        const plain = U.lerp(45, 260, U.smooth(31.55, 31.2, lat));
        H = plain + (rh - plain) * ridgeG(dW, lat > 32.95 ? 11 : 17);
      } else {
        H = rh * ridgeG(-dW, 12) + 120 * (1 - ridgeG(-dW, 12)) * U.smooth(32.5, 32.9, lat);
      }
      H += ridgeG(lineDist(px, py, CARMEL, false), 2.6) * 470;
      H += ridgeG(lineDist(px, py, GILBOA, false), 2.4) * 420;
      H += gL(px, py, 35.375, 32.61, 3) * 330 + gL(px, py, 35.39, 32.687, 1.5) * 380;
      w = lat > 32.7 && lat < 32.92 ? 3.5 : lat < 31.85 ? 7 : 6;
    } else {
      H = lat < 32.66 ? 920 : U.lerp(380, 900, U.smooth(32.7, 33.25, lat));
      H += gL(px, py, 35.857, 33.416, 8) * 1900 + gL(px, py, 35.75, 32.35, 12) * 300;
      H += U.smooth(36.0, 36.4, lon) * -150;
      H -= ridgeG(lineDist(px, py, JABBOK, false), 1.6) * 480;
      H -= ridgeG(lineDist(px, py, ARNON, false), 1.5) * 560;
      H -= ridgeG(lineDist(px, py, YARMUK, false), 1.6) * 420;
      w = 4.5;
    }
    const fw = lat > 31.76 && lat < 32.05 ? 8 : lat >= 32.05 && lat < 32.45 ? 5 : lat >= 32.45 && lat < 32.70 ? 4 : 0.3;
    const s = U.smooth(fw, fw + w, d);
    let e = floor + (H - floor) * s;
    e += (U.fbm(px * 0.11, py * 0.11, 21, 4) - 0.5) * 180 * s;
    e += (U.fbm(px * 0.42, py * 0.42, 33, 3) - 0.5) * 60 * s;
    let arid = 0;
    if (west && dW < 0) arid = Math.max(arid, U.smooth(2, 16, -dW) * U.smooth(32.55, 32.1, lat));
    arid = Math.max(arid, U.smooth(31.5, 31.15, lat));
    arid = Math.max(arid, (1 - s) * U.smooth(32.45, 32.0, lat));
    arid = Math.max(arid, U.smooth(36.0, 36.38, lon) * 0.7);
    if (!west) arid = Math.max(arid, U.smooth(31.7, 31.3, lat) * 0.6);
    if (dRiv < 0.5) return { e: e, water: 'river', arid: arid };
    return { e: e, water: null, arid: U.clamp(arid, 0, 1) };
  }

  // ---------- Jerusalem: the city hills, its valleys and the Mount of Olives ----------
  const JX = (lon) => (lon - 35.215) * 94.8, JY = (lat) => (31.792 - lat) * 111; // origin kept fixed; works beyond it
  const toJ = (pts) => pts.map((p) => [JX(p[0]), JY(p[1])]);
  const KIDRON = toJ([[35.2405, 31.7920], [35.2392, 31.7850], [35.2384, 31.7790], [35.2376, 31.7740], [35.2368, 31.7690], [35.2372, 31.7620]]);
  const TYRO = toJ([[35.2305, 31.7860], [35.2318, 31.7800], [35.2335, 31.7755], [35.2348, 31.7720], [35.2360, 31.7695]]);
  const HINNOM = toJ([[35.2235, 31.7860], [35.2245, 31.7790], [35.2252, 31.7735], [35.2280, 31.7698], [35.2325, 31.7690], [35.2368, 31.7690]]);
  const OLIVES = toJ([[35.2450, 31.7920], [35.2456, 31.7820], [35.2452, 31.7740], [35.2440, 31.7640]]);
  const PLATFORM = toJ([[35.2342, 31.7806], [35.2378, 31.7800], [35.2368, 31.7757], [35.2340, 31.7760]]);
  function sampleJerusalem(lon, lat) {
    const px = JX(lon), py = JY(lat);
    let e = 765 - Math.max(0, py - 2.2) * 25;
    e += ridgeG(lineDist(px, py, OLIVES, false), 0.45) * 62;
    e -= U.smooth(35.247, 35.268, lon) * 150;
    e -= ridgeG(lineDist(px, py, KIDRON, false), 0.17) * (105 + Math.max(0, py - 1) * 15);
    e -= ridgeG(lineDist(px, py, TYRO, false), 0.08) * 55;
    e -= ridgeG(lineDist(px, py, HINNOM, false), 0.12) * (70 + Math.max(0, py - 2) * 20);
    e += (U.fbm(px * 2.2, py * 2.2, 41, 3) - 0.5) * 14;
    if (inPoly(px, py, PLATFORM)) e = 738;
    const arid = U.smooth(35.249, 35.266, lon) * 0.75 + U.smooth(31.770, 31.762, lat) * 0.3;
    return { e: e, water: null, arid: U.clamp(arid, 0, 1) };
  }

  TW.Geo = { galilee: sampleGalilee, land: sampleLand, jerusalem: sampleJerusalem };
})(window.TW);
