/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode VI: The Entry (Mark 11:1–11). Also builds the Temple courts used in Episode VII. */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S;
  const R = K.R;
  const EP = { id: 'entry' };
  const WORLD = 400;

  // ---------- the city seen from the Mount of Olives ----------
  let VIEW = null;
  function cityView() {
    if (VIEW) return VIEW;
    const W = 256 + Math.ceil((WORLD - 256) * 0.35);
    const c = U.makeCanvas(W, 160), x = c.getContext('2d');
    for (let i = 0; i < W; i++) {
      const top = 50 + Math.round((U.fbm(i * 0.03, 8.8, 5, 3) - 0.5) * 8);
      R(x, i, top, 1, 60, '#aaa59c'); R(x, i, top, 1, 1, '#bdb8ae');
    }
    // the western hill: Herod's palace towers and the Upper City
    [[22, 34], [31, 40], [40, 37]].forEach((t) => { R(x, t[0], t[1], 7, 60 - t[1], '#b8ad97'); R(x, t[0], t[1], 7, 2, '#cfc4ae'); R(x, t[0] + 2, t[1] + 6, 2, 3, '#5e5446'); });
    const house = (hx, hy, w, h, s) => {
      const r = K.rnd(hx, hy + s);
      R(x, hx, hy, w, h, r > 0.6 ? '#d9cfb8' : r > 0.3 ? '#cdc2a8' : '#c2b69a');
      R(x, hx, hy, w, 1, '#e6ddc8'); R(x, hx + w - 1, hy + 1, 1, h - 1, '#a99b7f');
      if (r > 0.5) R(x, hx + 1, hy + 2, 1, 2, '#5e5446');
    };
    for (let row = 0; row < 7; row++)
      for (let hx = -4; hx < 92; hx += 5 + (row % 3)) house(hx + (row % 2) * 3, 56 + row * 5, 6 + (hx % 3), 6, row);
    for (let row = 0; row < 4; row++)
      for (let hx = 228; hx < W; hx += 6) house(hx + (row % 2) * 2, 58 + row * 6, 7, 7, row + 9);
    // the great eastern wall of the Temple platform
    R(x, 90, 74, 136, 30, '#d4c9ae');
    for (let yy = 76; yy < 104; yy += 4) for (let xx = 90 + ((yy / 4) % 2) * 5; xx < 226; xx += 10) R(x, xx, yy, 1, 4, '#b8ab8d');
    for (let yy = 76; yy < 104; yy += 4) R(x, 90, yy, 136, 1, '#c3b799');
    // porticoes along the top of the wall, the Royal Stoa at the south end
    R(x, 90, 68, 136, 6, '#bfb08f'); for (let xx = 92; xx < 226; xx += 4) R(x, xx, 70, 1, 4, '#9e8f70');
    R(x, 90, 56, 32, 12, '#cdbf9e'); R(x, 90, 56, 32, 2, '#e0d4b8'); for (let xx = 92; xx < 122; xx += 3) R(x, xx, 60, 1, 8, '#a99a7a');
    // inner courts and the sanctuary, white and gold
    R(x, 132, 60, 76, 9, '#e2d8c2'); R(x, 132, 60, 76, 1, '#efe7d4');
    R(x, 164, 62, 10, 7, '#e3b04f');
    R(x, 152, 24, 34, 37, '#f3eee0'); R(x, 146, 34, 46, 27, '#f3eee0');
    R(x, 152, 24, 34, 2, '#e3b04f'); for (let xx = 152; xx < 186; xx += 3) R(x, xx, 22, 1, 2, '#e3b04f');
    R(x, 162, 36, 14, 25, '#e3b04f'); R(x, 165, 40, 8, 21, '#b8862e');
    R(x, 146, 34, 6, 27, '#ddd6c6'); R(x, 186, 34, 6, 27, '#e8e1d0');
    // Antonia
    R(x, 228, 50, 18, 36, '#8f8370'); R(x, 226, 42, 6, 44, '#7d7262'); R(x, 242, 44, 6, 42, '#7d7262');
    R(x, 226, 42, 6, 1, '#a69a86'); R(x, 242, 44, 6, 1, '#a69a86');
    VIEW = c;
    return c;
  }
  let VALLEY = null;
  function valley() {
    if (VALLEY) return VALLEY;
    const W = 256 + Math.ceil((WORLD - 256) * 0.6);
    const c = U.makeCanvas(W, 160), x = c.getContext('2d');
    for (let i = 0; i < W; i++) {
      const top = 102 + Math.round(Math.sin(i * 0.02) * 2);
      for (let y = top; y < 132; y++) R(x, i, y, 1, 1, K.rnd(i, y) > 0.8 ? '#7d8450' : y < top + 4 ? '#8a8a5a' : '#958563');
    }
    // the tall pyramid-roofed tomb in the Kidron, built in this century
    R(x, 60, 98, 10, 14, '#cdbf9e'); R(x, 62, 92, 6, 6, '#bfb08f'); R(x, 64, 86, 2, 6, '#b3a483'); R(x, 60, 98, 10, 1, '#e0d4b8');
    for (let i = 0; i < 26; i++) {
      const ox = Math.floor(K.rnd(i, 31) * W), oy = 104 + Math.floor(K.rnd(i, 32) * 18);
      R(x, ox, oy, 5, 3, '#5f6a3c'); R(x, ox + 1, oy - 1, 3, 1, '#6f7a48'); R(x, ox + 2, oy + 3, 1, 2, '#4a3a2a');
    }
    VALLEY = c;
    return c;
  }
  let SLOPE = null;
  function slope() {
    if (SLOPE) return SLOPE;
    const c = U.makeCanvas(WORLD, 160), x = c.getContext('2d');
    for (let y = 124; y < 160; y++)
      for (let i = 0; i < WORLD; i++) {
        const r = K.rnd(i * 3, y);
        R(x, i, y, 1, 1, r > 0.88 ? '#7d8450' : r > 0.5 ? '#a08a62' : '#977f58');
      }
    for (let i = 0; i < WORLD; i++) R(x, i, 138, 1, 10, K.rnd(i, 51) > 0.85 ? '#b9a27a' : '#ad9670');
    // gnarled olive trees on the slope behind the road
    for (let t = 0; t < 9; t++) {
      const tx = 20 + t * 44 + Math.floor(K.rnd(t, 1) * 16);
      R(x, tx, 112, 3, 24, '#5a4632'); R(x, tx + 1, 118, 2, 6, '#6e5a42'); R(x, tx - 2, 126, 2, 4, '#5a4632');
      for (let k = 0; k < 26; k++) {
        const lx = tx - 10 + Math.floor(K.rnd(t, k + 5) * 23), ly = 98 + Math.floor(K.rnd(t, k + 40) * 16);
        R(x, lx, ly, 3, 2, k % 3 ? '#7f8a5c' : '#97a070');
      }
    }
    SLOPE = c;
    return c;
  }

  // ---------- the Temple courts (shared with Episode VII) ----------
  let COURT = null, DOVES = null;
  function courtArt() {
    if (COURT) return COURT;
    const A = K.art();
    const W = 320;
    const c = U.makeCanvas(W, 160), x = c.getContext('2d');
    x.drawImage(A.sky, 0, 0); x.drawImage(A.sky, 100, 0, 64, 80, 256, 0, 64, 80);
    // the sanctuary rising above the inner courts
    R(x, 214, 6, 60, 98, '#f3eee0'); R(x, 204, 26, 80, 78, '#f3eee0');
    R(x, 214, 6, 60, 3, '#e3b04f'); for (let xx = 214; xx < 274; xx += 4) R(x, xx, 3, 2, 3, '#e3b04f');
    R(x, 232, 30, 24, 60, '#e3b04f'); R(x, 236, 36, 16, 54, '#b8862e');
    R(x, 204, 26, 10, 78, '#e2dbcb'); R(x, 274, 26, 10, 78, '#e8e1d0');
    // inner court wall and gate with steps
    R(x, 150, 74, W - 150, 44, '#e2d8c2'); R(x, 150, 74, W - 150, 2, '#efe7d4');
    for (let yy = 80; yy < 118; yy += 6) R(x, 150, yy, W - 150, 1, '#cfc4ab');
    R(x, 228, 84, 32, 34, '#e3b04f'); R(x, 232, 88, 24, 30, '#c99a3c');
    for (let s = 0; s < 5; s++) R(x, 218 - s * 3, 118 + s, 52 + s * 6, 1, '#d8cdb4');
    // the low barrier that Gentiles could not pass
    for (let xx = 150; xx < W; xx++) {
      R(x, xx, 119, 1, 5, (xx % 6 < 3) === ((xx >> 1) % 2 === 0) ? '#d6ccb6' : '#bdb29a');
    }
    R(x, 150, 118, W - 150, 1, '#e6decb');
    // the Royal Stoa: a forest of columns along the south of the court
    R(x, 0, 30, 150, 94, '#9e937c');
    R(x, 0, 30, 150, 12, '#c8bb9c'); R(x, 0, 30, 150, 2, '#ddd2b8'); R(x, 0, 41, 150, 1, '#a89a7c');
    for (let cx = 4; cx < 150; cx += 14) {
      R(x, cx, 42, 7, 82, '#e2d9c4'); R(x, cx, 42, 2, 82, '#f0e9d8'); R(x, cx + 5, 42, 2, 82, '#c4b99f');
      R(x, cx - 1, 42, 9, 3, '#d4c8ab'); R(x, cx - 1, 121, 9, 3, '#c4b99f');
    }
    // paving
    R(x, 0, 124, W, 36, '#d8cdb4');
    for (let yy = 124; yy < 160; yy += 6) {
      R(x, 0, yy, W, 1, '#c4b799');
      for (let xx = (yy / 6) % 2 ? 0 : 9; xx < W; xx += 18) R(x, xx, yy, 1, 6, '#c4b799');
    }
    COURT = c;
    return c;
  }
  // tables of the money changers and seats of the dove sellers, as entities so they can be overturned
  function table(seed) {
    return {
      z: 0, upset: false, seed: seed,
      draw(ctx, sx, sy, t, e) {
        if (!e.upset) {
          R(ctx, sx - 10, sy - 9, 21, 3, '#6a4a2c'); R(ctx, sx - 10, sy - 9, 21, 1, '#86603a');
          R(ctx, sx - 9, sy - 6, 2, 6, '#4a3220'); R(ctx, sx + 8, sy - 6, 2, 6, '#4a3220');
          for (let i = 0; i < 6; i++) R(ctx, sx - 7 + i * 3, sy - 10 - (i % 2), 2, 1, i % 3 ? '#d8b04a' : '#c9cbcf');
        } else {
          R(ctx, sx - 12, sy - 2, 21, 3, '#6a4a2c'); R(ctx, sx - 12, sy - 2, 1, 3, '#86603a');
          R(ctx, sx - 13, sy - 9, 3, 2, '#4a3220'); R(ctx, sx + 6, sy - 8, 2, 2, '#4a3220');
          for (let i = 0; i < 5; i++) R(ctx, sx + 8 + i * 4, sy - (i % 2), 1, 1, '#d8b04a');
        }
      },
    };
  }
  function cages() {
    const D2 = S.dove();
    return {
      z: 0, upset: false,
      draw(ctx, sx, sy, t, e) {
        if (!e.upset) {
          [[-10, 0], [2, 0], [-4, -9]].forEach((o) => {
            R(ctx, sx + o[0], sy - 10 + o[1], 11, 9, '#a88e5c');
            for (let i = 1; i < 11; i += 3) R(ctx, sx + o[0] + i, sy - 10 + o[1], 1, 9, '#7a6440');
            ctx.drawImage(D2[Math.floor(t * 2 + o[0]) % 2 ? 0 : 1], sx + o[0] + 1, sy - 9 + o[1]);
          });
        } else {
          [[-14, 0], [4, 0]].forEach((o) => { R(ctx, sx + o[0], sy - 4, 9, 4, '#a88e5c'); R(ctx, sx + o[0], sy - 4, 9, 1, '#7a6440'); });
        }
      },
    };
  }
  function courtStage(evening) {
    const st = {
      width: 320, hotspots: [], walkLimits: [10, 300], birds: [],
      audio: evening ? { music: 'reflect', amb: { crowd: 0.2, city: 0.3, doves: 0.3, wind: 0.1 } } : { music: 'jerusalem', amb: { crowd: 0.5, city: 0.6, doves: 0.5, wind: 0.1 } },
      bg(ctx) { ctx.drawImage(courtArt(), -Math.round(SC.cam), 0); },
      fx(fc, k, t, cam) {
        if (evening) {
          fc.fillStyle = 'rgba(70,32,46,0.30)'; fc.fillRect(0, 0, 256 * k, 160 * k);
          fc.globalCompositeOperation = 'lighter';
          const g = fc.createLinearGradient(0, 0, 256 * k, 0);
          g.addColorStop(0, 'rgba(255,170,90,0.0)'); g.addColorStop(1, 'rgba(255,170,90,0.22)');
          fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        } else {
          fc.globalCompositeOperation = 'lighter';
          const g = fc.createRadialGradient((250 - cam) * k, 0, 0, (250 - cam) * k, 0, 200 * k);
          g.addColorStop(0, 'rgba(255,240,200,0.32)'); g.addColorStop(1, 'rgba(255,240,200,0)');
          fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        }
        fc.globalCompositeOperation = 'source-over';
        // doves taking flight
        const D2 = DOVES || (DOVES = S.dove());
        st.birds.forEach((b) => {
          const f = D2[Math.floor(t * 10 + b.p) % 2];
          fc.imageSmoothingEnabled = false;
          fc.drawImage(f, (b.x - cam) * k, b.y * k, f.width * k, f.height * k);
        });
      },
      update(dt) {
        st.birds.forEach((b) => { b.x += b.vx * dt; b.y += b.vy * dt; b.vy -= 6 * dt; });
        st.birds = st.birds.filter((b) => b.y > -20);
      },
    };
    return st;
  }
  K.courtStage = courtStage; K.table = table; K.cages = cages; K.cityView = cityView; K.valley = valley; K.slope = slope;

  // ---------- the episode ----------
  EP.run = async function (game) {
    const P0 = K.sprites(), A = K.art();
    const items = [];
    const roadY = 144;
    const st = {
      width: WORLD,
      audio: { music: 'jerusalem', amb: { crowd: 0.7, birds: 0.5, wind: 0.3 } },
      bg(ctx, t, cam) {
        ctx.drawImage(A.sky, 0, 0);
        ctx.drawImage(cityView(), -Math.round(cam * 0.35), 0);
        ctx.drawImage(valley(), -Math.round(cam * 0.6), 0);
        ctx.drawImage(slope(), -cam, 0);
        items.forEach((it) => {
          const x = Math.round(it.x - cam);
          if (it.kind === 'garment') { R(ctx, x - 6, it.y, 13, 3, it.c); R(ctx, x - 6, it.y, 13, 1, U.shadeHex(it.c, 1.2)); if (it.fringe) { R(ctx, x - 6, it.y + 3, 1, 1, it.fringe); R(ctx, x + 6, it.y + 3, 1, 1, it.fringe); } }
          else { for (let i = 0; i < 9; i++) R(ctx, x - 4 + i, it.y + (i % 3 === 0 ? 0 : 1), 1, 1, i % 2 ? '#5f6a3c' : '#7f8a4c'); R(ctx, x - 5, it.y + 1, 2, 1, '#5a4632'); }
        });
      },
      fx(fc, k) {
        fc.globalCompositeOperation = 'lighter';
        const g = fc.createRadialGradient(40 * k, 18 * k, 0, 40 * k, 18 * k, 170 * k);
        g.addColorStop(0, 'rgba(255,236,190,0.36)'); g.addColorStop(1, 'rgba(255,220,160,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        fc.globalCompositeOperation = 'source-over';
      },
      update() {
        if (st.follow) SC.camGoal = st.follow.x - 150;
        if (st.drop && st.follow) {
          const x = st.follow.x;
          if (st.lastDrop === undefined || st.lastDrop - x > 13) {
            st.lastDrop = x;
            const n = items.length;
            items.push(n % 3 === 2 ? { kind: 'branch', x: x - 30, y: roadY + (n % 2) * 2 } : { kind: 'garment', x: x - 30, y: roadY - 1 + (n % 2) * 2, c: ['#8a3a2a', '#9a8a6a', '#3d4f6a', '#b49a6a', '#6a3a5a'][n % 5] });
          }
        }
      },
    };
    SC.load(st);
    SC.cam = 0;
    for (let i = 0; i < 7; i++) items.push({ kind: 'branch', x: 40 + i * 33 + (i % 2) * 7, y: roadY + (i % 2) * 3 });

    const roadside = [];
    [[120, 1, 'raise'], [136, -1, 'stand'], [212, -1, 'stand'], [228, 1, 'out'], [252, -1, 'stand'], [96, 1, 'stand'], [66, 1, 'out']].forEach((c, i) => {
      roadside.push(SC.add({ frames: K.villager(800 + i, i % 3 === 1), x: c[0], y: roadY + 10 + (i % 2), facing: c[1], pose: c[2] }));
    });
    const me = SC.add({ id: 'player', frames: P0.player, x: 176, y: roadY + 11, facing: 1, speed: 20 });
    const D0 = S.donkey(), rider = P0.jesus.sit;
    const ride = SC.add({
      x: 440, y: roadY + 4, speed: 13, facing: -1,
      draw(ctx, sx, sy, t, e) {
        const fr = e.moving ? Math.floor(e.step / 5) % 2 : 0;
        const d = e.facing < 0 ? D0.l[fr] : D0.r[fr];
        R(ctx, sx - 7, sy - 12, 14, 2, '#8a3a2a');
        ctx.drawImage(e.facing < 0 ? rider.l : rider.r, sx - 9, sy - 34 + (fr ? 1 : 0));
        ctx.drawImage(d, sx - 12, sy - 17);
      },
    });
    const ahead = [0, 1, 2].map((i) => SC.add({ frames: K.villager(207 + i), x: 410 - i * 14, y: roadY + 2 + i % 2, facing: -1, speed: 13 }));
    const behind = [0, 1, 2, 3, 4].map((i) => SC.add({ frames: K.villager(820 + i, i === 2), x: 462 + i * 13, y: roadY + 2 + i % 2, facing: -1, speed: 13, pose: i % 2 ? 'raise' : 'stand' }));

    await SC.say({ kind: 'drama', text: 'Passover is a week away, and you are home in Jerusalem. Nicodemus has read all five of your reports. He rolls up the last one and says only, “He is coming up for the feast. Go and see.”' });
    await SC.say({ kind: 'history', text: 'Pilgrims from Galilee often came up by Jericho and crossed the Mount of Olives past Bethany and Bethphage. Over the ridge, the whole city suddenly lies open across the Kidron Valley.' });
    await SC.say({ kind: 'scripture', ref: 'Mark 11:1–3', text: P.vs('mark11a', 1, 3) });
    await SC.say({ kind: 'scripture', ref: 'Mark 11:4–7', text: P.vs('mark11a', 4, 7) });
    st.follow = ride; st.drop = true;
    const targets = [[ride, 60], ...ahead.map((a, i) => [a, 30 - i * 14]), ...behind.map((b, i) => [b, 84 + i * 13])];
    targets.forEach((t) => SC.walk(t[0], t[1]));
    await SC.say({ kind: 'scripture', ref: 'Mark 11:8', text: P.vs('mark11a', 8) });
    while (ride.x > 230) await SC.wait(100);
    ride.speed = 0; ahead.forEach((a) => { a.speed = 0; }); behind.forEach((b) => { b.speed = 0; });
    const heart = await SC.choose('He is almost level with you. The people beside you are throwing their cloaks on the road. Your mantle, with its long fringes, is on your shoulders.', [
      'Spread your mantle on the road.',
      'Keep it on and watch.',
      'Step back. Scribes from the Temple are watching you.',
    ]);
    game.setHeart('entry', heart);
    if (heart === 0) {
      me.facing = 1;
      await SC.walk(me, 196, roadY + 5);
      items.push({ kind: 'garment', x: 198, y: roadY + 1, c: '#4e5a72', fringe: '#9cc0e0' });
      me.frames = TW.S.person({ skin: '#b07a50', hair: '#2a1a12', beard: '#2a1a12', tunic: '#ddd0b0', phylactery: true, belt: '#5a3b22' });
      await SC.walk(me, 180, roadY + 11);
      game.observe('entry', 'mantle', 'I spread my own mantle on the road in front of him.', false, true);
    } else if (heart === 2) {
      await SC.walk(me, 160, roadY + 14);
      game.observe('entry', 'stepback', 'I stepped back from the road so the Temple scribes would not see me.', false, true);
    }
    me.facing = 1;
    ride.speed = 13; ahead.forEach((a) => { a.speed = 13; }); behind.forEach((b) => { b.speed = 13; });
    roadside.forEach((p, i) => { p.pose = 'raise'; p.hopping = i % 2 === 0; });
    behind.forEach((b, i) => { b.pose = 'raise'; b.hopping = i % 2 === 1; });
    TW.Audio && (TW.Audio.sfx('cheer'), TW.Audio.sfx('cheer', 1.6));
    await SC.say({ kind: 'scripture', ref: 'Mark 11:9–10', text: P.vs('mark11a', 9, 10) });
    st.drop = false;
    const IN = SC.stage;
    IN.hotspots = [
      { id: 'city', x0: 0, x1: WORLD, y0: 0, y1: 100, text: 'Across the valley the Temple shines white and gold above the city.' },
      { id: 'garments', x0: 0, x1: WORLD, y0: 136, y1: 152, text: 'The road is covered with cloaks and branches.' },
      { id: 'donkey', x0: 0, x1: WORLD, y0: 100, y1: 136, text: 'He rides a young donkey, not a war horse.' },
    ].map((o) => Object.assign(o, { active: () => SC.mode === 'observe', onTap: () => game.observe('entry', o.id, o.text, true) }));
    await SC.prompt('The whole slope is shouting. Tap what you want to remember.', 'Keep watching', 'observe');
    IN.hotspots = [];
    await SC.say({ kind: 'history', text: '“Hosanna” means “save us, we pray.” The words come from Psalm 118, sung by pilgrims at the feasts. Zechariah 9:9 had pictured Zion’s king coming “lowly, and riding on a donkey.”' });
    st.follow = null; SC.camGoal = 0;
    await SC.say({ kind: 'history', text: 'Josephus wrote that from a distance the Temple looked like a mountain covered with snow, where it was not plated with gold.' });

    // ---- evening in the Temple courts ----
    await K.fade(async () => { SC.load(courtStage(true)); SC.cam = 40; });
    [[40, 1], [70, 2], [100, 3]].forEach((c) => {
      SC.add(Object.assign(table(c[1]), { x: c[0], y: 140 }));
      SC.add({ frames: K.villager(860 + c[1]), pose: 'sit', x: c[0] + 4, y: 132, facing: 1 });
    });
    SC.add(Object.assign(cages(), { x: 134, y: 142 }));
    [[180, -1], [196, 1], [268, -1], [282, 1]].forEach((c, i) => SC.add({ frames: K.villager(870 + i, i === 2), x: c[0], y: 146 + (i % 2), facing: c[1] }));
    const j2 = SC.add({ id: 'jesus', frames: P0.jesus, x: 330, y: 144, facing: -1, speed: 22 });
    const dis = [0, 1, 2].map((i) => SC.add({ frames: K.villager(207 + i), x: 346 + i * 12, y: 146 + (i % 2), facing: -1, speed: 22 }));
    SC.add({ id: 'player', frames: me.frames, x: 156, y: 150, facing: 1 });
    await SC.say({ kind: 'scripture', ref: 'Mark 11:11', text: P.vs('mark11a', 11) });
    dis.forEach((d, i) => SC.walk(d, 200 + i * 12));
    await SC.walk(j2, 170);
    j2.facing = -1; await SC.wait(1100); j2.facing = 1; await SC.wait(900); j2.facing = -1; await SC.wait(900);
    await SC.say({ kind: 'drama', text: 'He looks at everything: the tables, the coins, the cages of doves, the barrier the nations may not pass. He says nothing. Then he turns and goes out toward Bethany.' });
    j2.facing = 1; SC.walk(j2, 340); dis.forEach((d, i) => SC.walk(d, 352 + i * 12));
    game.observe('entry', 'hosanna', 'The crowd cried “Hosanna! Blessed is he who comes in the name of the Lord!” (Mark 11:9).', false, true);
    game.observe('entry', 'looked', 'He entered the Temple, looked around at everything, and left for Bethany (Mark 11:11).', false, true);
    game.addQuestion(TW.D.episodes.entry.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'entry', 'The lamps are being lit in the porticoes. Write down what you saw today.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.entry = EP;
})(window.TW);
