/* The Way — geography of Syria, Cilicia and Cyprus, for Era IV.
   Hand-placed coastline, islands, ranges and rivers at roughly true positions; heights are approximate. */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U;
  const EX = (lon) => (lon - 31.6) * 91.5, EY = (lat) => (37.4 - lat) * 111; // kilometers
  const pts = (a) => a.map((p) => [EX(p[0]), EY(p[1])]);
  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
    const t = l ? U.clamp(((px - ax) * dx + (py - ay) * dy) / l, 0, 1) : 0;
    const qx = ax + t * dx - px, qy = ay + t * dy - py;
    return Math.sqrt(qx * qx + qy * qy);
  }
  function lineDist(px, py, p, closed) {
    let d = 1e9;
    for (let i = 0; i < p.length - (closed ? 0 : 1); i++) { const a = p[i], b = p[(i + 1) % p.length]; d = Math.min(d, segDist(px, py, a[0], a[1], b[0], b[1])); }
    return d;
  }
  function inPoly(px, py, p) {
    let c = false;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      if ((p[i][1] > py) !== (p[j][1] > py) && px < ((p[j][0] - p[i][0]) * (py - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) c = !c;
    }
    return c;
  }
  const G = (d, s) => Math.exp(-(d * d) / (2 * s * s));

  // the coast from Gaza north to the Gulf of Issus, then west along Cilicia
  const COAST_LL = [[34.42, 31.55], [34.55, 31.78], [34.68, 31.98], [34.75, 32.06], [34.82, 32.30], [34.89, 32.50], [34.93, 32.70], [34.96, 32.82], [35.07, 32.92], [35.10, 33.10], [35.20, 33.27], [35.30, 33.45], [35.37, 33.56], [35.48, 33.90], [35.64, 34.12], [35.75, 34.30], [35.82, 34.44], [35.88, 34.70], [35.89, 34.90], [35.92, 35.20], [35.92, 35.36], [35.78, 35.50], [35.77, 35.60], [35.85, 35.85], [35.93, 36.05], [35.88, 36.30], [35.92, 36.45], [36.17, 36.59], [36.20, 36.78], [36.05, 36.88], [35.80, 36.78], [35.55, 36.62], [35.38, 36.57], [35.00, 36.75], [34.63, 36.80], [34.30, 36.60], [33.93, 36.33], [33.55, 36.15], [33.10, 36.10], [32.83, 36.02], [32.40, 36.25], [32.00, 36.54], [31.70, 36.62], [31.39, 36.77], [31.00, 36.85], [30.70, 36.89], [30.58, 36.70], [30.55, 36.45], [30.40, 36.25], [29.90, 36.20], [29.55, 36.18]];
  const COAST = pts(COAST_LL);
  const SEA = pts(COAST_LL.concat([[29.55, 31.55]]));
  const CYPRUS = pts([[34.59, 35.69], [34.10, 35.42], [33.92, 35.18], [34.08, 34.97], [33.64, 34.90], [33.04, 34.66], [32.98, 34.56], [32.42, 34.75], [32.28, 35.10], [32.92, 35.18], [32.93, 35.40], [33.32, 35.34], [33.90, 35.40], [34.30, 35.58]]);
  const GALILEE = pts([[35.52, 32.89], [35.64, 32.88], [35.65, 32.74], [35.56, 32.71]]);
  const DEAD = pts([[35.45, 31.78], [35.59, 31.78], [35.59, 31.50], [35.40, 31.50]]);
  const BEYSEHIR = pts([[31.40, 37.90], [31.62, 37.80], [31.60, 37.60], [31.42, 37.65]]);
  const EGIRDIR = pts([[30.80, 38.05], [30.92, 38.05], [30.92, 37.80], [30.80, 37.85]]);
  const AMUQ = pts([[36.30, 36.38], [36.42, 36.38], [36.44, 36.28], [36.30, 36.26]]);
  const ORONTES = pts([[36.35, 34.40], [36.48, 34.90], [36.45, 35.20], [36.38, 35.60], [36.40, 36.00], [36.30, 36.18], [36.16, 36.20], [36.00, 36.12], [35.93, 36.05]]);
  const JORDAN = pts([[35.58, 33.25], [35.60, 32.88], [35.57, 32.72], [35.55, 32.20], [35.55, 31.78]]);
  const RIDGES = [
    [pts([[35.58, 33.35], [35.75, 33.75], [35.95, 34.10], [36.08, 34.40], [36.10, 34.65]]), 2300, 14],
    [pts([[35.85, 33.40], [36.05, 33.70], [36.35, 34.10], [36.50, 34.40]]), 1900, 13],
    [pts([[35.10, 31.50], [35.22, 31.80], [35.25, 32.20], [35.25, 32.50]]), 900, 13],
    [pts([[35.25, 32.80], [35.40, 33.05]]), 900, 10],
    [pts([[34.98, 32.78], [35.15, 32.60]]), 450, 4],
    [pts([[35.80, 31.60], [35.85, 32.30], [35.95, 32.70]]), 1000, 14],
    [pts([[36.05, 34.75], [36.15, 35.20], [36.12, 35.60], [36.00, 35.85]]), 1300, 9],
    [pts([[36.12, 36.38], [36.25, 36.55], [36.45, 36.85], [36.60, 37.20]]), 1700, 8],
    [pts([[32.00, 36.90], [33.00, 37.00], [34.00, 37.25], [35.20, 37.45], [35.80, 37.45]]), 2600, 15],
    [pts([[32.30, 36.50], [33.20, 36.40], [33.90, 36.60]]), 1500, 13],
    [pts([[32.95, 35.30], [33.50, 35.30], [34.10, 35.40]]), 1000, 4],
    [pts([[30.50, 36.55], [30.65, 37.05], [31.30, 37.25], [32.00, 36.95]]), 2300, 11],
    [pts([[31.10, 38.00], [31.60, 38.50]]), 1900, 6],
  ];
  // low plains: Cilicia around Tarsus, the Amuq and the lower Orontes around Antioch
  const PLAINS = [[EX(35.15), EY(36.92), 34], [EX(36.30), EY(36.30), 16], [EX(36.12), EY(36.18), 9], [EX(30.85), EY(36.97), 16]];
  const PEAKS = [[EX(35.86), EY(33.42), 2700, 7], [EX(35.97), EY(35.95), 1700, 6], [EX(32.86), EY(34.93), 1900, 13]];

  function sampleEast(lon, lat) {
    const px = EX(lon), py = EY(lat);
    const onCyprus = inPoly(px, py, CYPRUS);
    if (!onCyprus && inPoly(px, py, SEA)) return { e: -80, water: 'sea', arid: 0 };
    if (inPoly(px, py, GALILEE) || inPoly(px, py, AMUQ) || inPoly(px, py, BEYSEHIR) || inPoly(px, py, EGIRDIR)) return { e: -200, water: 'lake', arid: 0 };
    if (inPoly(px, py, DEAD)) return { e: -400, water: 'salt', arid: 1 };
    const dRiv = Math.min(lineDist(px, py, ORONTES, false), lineDist(px, py, JORDAN, false));
    const dCoast = onCyprus ? lineDist(px, py, CYPRUS, true) : lineDist(px, py, COAST, false);
    let e = 20 + Math.min(onCyprus ? 120 : 650, dCoast * (onCyprus ? 6 : 9));
    for (const r of RIDGES) e = Math.max(e, r[1] * G(lineDist(px, py, r[0], false), r[2]) + e * 0.3);
    for (const p of PEAKS) e = Math.max(e, p[2] * G(Math.hypot(px - p[0], py - p[1]), p[3]));
    e -= G(dRiv, 7) * Math.min(e * 0.6, 500);
    for (const pl of PLAINS) e *= 1 - 0.85 * G(Math.hypot(px - pl[0], py - pl[1]), pl[2]);
    // the Anatolian plateau north of the Taurus, about a thousand meters up
    if (!onCyprus && lon < 34.6) e = Math.max(e, 1050 * U.smooth(37.15, 37.6, lat) + (U.fbm(px * 0.04, py * 0.04, 61, 3) - 0.5) * 220);
    e += (U.fbm(px * 0.05, py * 0.05, 51, 4) - 0.5) * 260 * U.clamp(dCoast / 20, 0.2, 1);
    e = Math.max(e, 4);
    let arid = U.smooth(36.3, 36.9, lon) * U.smooth(35.8, 34.8, lat) * 0.85;
    arid = Math.max(arid, U.smooth(31.9, 31.6, lat) * 0.6);
    arid = Math.max(arid, U.smooth(32.6, 31.9, lat) * U.smooth(35.5, 35.9, lon) * 0.7);
    arid = Math.max(arid, U.smooth(37.2, 37.5, lat) * U.smooth(32.0, 32.6, lon) * U.smooth(34.6, 34.0, lon) * 0.55);
    if (dRiv < 1.2) return { e: e, water: 'river', arid: arid };
    return { e: e, water: null, arid: U.clamp(arid, 0, 1) };
  }
  TW.Geo.east = sampleEast;
})(window.TW);
