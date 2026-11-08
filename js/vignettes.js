/* The Way — memory scenes. When a witness tells what happened, the stage fades into a remembered scene
   that plays out in step with the Scripture. Cues in the testimony data (['c', name]) drive each step. */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, SC = TW.Scene, K = TW.Kit, S = TW.S;
  const R = K.R;
  const VG = {};
  const P = () => K.sprites();
  const add = (frames, x, y, o) => SC.add(Object.assign({ frames: frames, x: x, y: y, facing: 1, speed: 26 }, o || {}));
  const dis = (i) => K.villager(207 + i);
  const W = (ms) => SC.wait(ms);
  const crowd = (n, x0, x1, y, seed, o) => {
    const out = [];
    for (let i = 0; i < n; i++) {
      const x = x0 + ((x1 - x0) * i) / Math.max(1, n - 1);
      out.push(add(K.villager(seed + i, i % 3 === 1), Math.round(x), y + (i % 2), Object.assign({ facing: x < 128 ? 1 : -1 }, o || {})));
    }
    return out;
  };
  // a person lying on a mat, who can later get up
  function lying(look, x, y) {
    const spr = S.lying(look);
    const e = SC.add({ x: x, y: y, z: y - 1, draw(ctx, sx, sy) { ctx.drawImage(spr, sx - 14, sy - 10); } });
    e.rise = function (o) {
      SC.ents = SC.ents.filter((q) => q !== e);
      return add(S.person(Object.assign({}, look, o || {})), x, y, { pose: 'sit', facing: -1 });
    };
    return e;
  }

  // ---------- stages ----------
  function memStage(kind, o) {
    o = o || {};
    let st;
    const A = K.art();
    if (kind === 'house') st = K.interiorStage();
    else if (kind === 'street') st = K.exteriorStage();
    else if (kind === 'court') st = K.courtStage(false);
    else if (kind === 'olives') {
      st = { width: 400, bg(ctx, t, cam) {
        ctx.drawImage(A.sky, 0, 0);
        ctx.drawImage(K.cityView(), -Math.round(cam * 0.35), 0);
        ctx.drawImage(K.valley(), -Math.round(cam * 0.6), 0);
        ctx.drawImage(K.slope(), -cam, 0);
      } };
    } else {
      const art = { syn: K.synArt, village: K.nainArt, field: K.fieldArt }[kind];
      st = { width: 256, bg(ctx) { ctx.drawImage(art(), 0, 0); } };
    }
    st.props = []; st.lights = o.lights || [];
    // remembered places keep the current music and bring their own sounds
    const base = (st.audio && st.audio.amb) || {};
    st.audio = { amb: o.night ? { night: 0.6, room: kind === 'house' ? 0.4 : 0, wind: kind === 'olives' ? 0.35 : 0, fire: o.fire ? 0.6 : 0 }
      : kind === 'village' ? { wind: 0.3, birds: 0.5, village: 0.5 } : kind === 'field' ? { wind: 0.5, birds: 0.6, crowd: 0.2 }
      : kind === 'syn' ? { room: 0.6, crowd: 0.1 } : base };
    const bg0 = st.bg;
    st.bg = function (ctx, t, cam, sc) { bg0.call(st, ctx, t, cam, sc); st.props.forEach((p) => p(ctx, t, cam)); };
    if (o.night || o.dusk) {
      const fx0 = st.fx;
      st.fx = function (fc, k, t, cam, sc) {
        if (fx0) fx0.call(st, fc, k, t, cam, sc);
        fc.fillStyle = o.night ? (kind === 'house' ? 'rgba(20,24,46,0.24)' : 'rgba(14,20,46,0.42)') : 'rgba(70,32,46,0.26)';
        fc.fillRect(0, 0, 256 * k, 160 * k);
        fc.globalCompositeOperation = 'lighter';
        st.lights.forEach((L) => {
          const lx = L.ent ? L.ent.x : L.x, ly = L.ent ? L.ent.y - (L.dy || 26) : L.y;
          if (L.ent && !L.ent.visible) return;
          const fl = 1 + Math.sin(t * 9 + lx) * 0.08;
          const g = fc.createRadialGradient((lx - cam) * k, ly * k, 0, (lx - cam) * k, ly * k, (L.r || 40) * k * fl);
          g.addColorStop(0, L.c || 'rgba(255,170,80,0.5)'); g.addColorStop(1, 'rgba(255,170,80,0)');
          fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        });
        fc.globalCompositeOperation = 'source-over';
      };
    }
    return st;
  }
  const load = (kind, o, cam) => { const st = memStage(kind, o); SC.load(st); SC.cam = cam || 0; SC.camGoal = cam || 0; return st; };

  // ---------- props ----------
  const tableProp = (ctx) => {
    R(ctx, 44, 142, 170, 3, '#7a5a3a'); R(ctx, 44, 142, 170, 1, '#946c46');
    for (let x = 56; x < 210; x += 22) { R(ctx, x, 140, 4, 2, '#c99a58'); R(ctx, x + 8, 140, 3, 2, '#8a3a2a'); }
  };
  const lampProp = (ctx, t) => {
    [90, 168].forEach((lx) => { R(ctx, lx, 98, 1, 42, '#3a2618'); R(ctx, lx - 2, 96, 5, 2, '#8a5a3a'); R(ctx, lx, 94 - (Math.floor(t * 8) % 2), 1, 2, '#ffd27a'); });
  };
  const wellProp = (x, y) => (ctx, t, cam) => {
    const sx = x - cam, sy = y;
    R(ctx, sx - 10, sy - 10, 20, 10, '#8a8074'); R(ctx, sx - 10, sy - 10, 20, 2, '#a89c8c');
    for (let i = 0; i < 20; i += 5) R(ctx, sx - 10 + i, sy - 8, 1, 8, '#6e655a');
    R(ctx, sx - 9, sy - 24, 2, 14, '#5a4632'); R(ctx, sx + 7, sy - 24, 2, 14, '#5a4632'); R(ctx, sx - 10, sy - 25, 20, 2, '#6a5236');
    R(ctx, sx - 1, sy - 23, 1, 9, '#b8a070'); R(ctx, sx - 3, sy - 15, 5, 4, '#7a5a3a');
  };
  const poolProp = (st) => (ctx, t, cam) => {
    const x0 = 60 - cam;
    R(ctx, x0 - 4, 128, 180, 3, '#c4b799');
    R(ctx, x0, 131, 172, 16, '#4f8a96'); R(ctx, x0, 131, 172, 2, '#6aa0a8');
    for (let i = 0; i < 18; i++) if (U.hash(i, 3, Math.floor(t * 3)) > 0.6) R(ctx, x0 + 6 + i * 9, 135 + (i % 3) * 3, 4, 1, '#8fbcc0');
    if (st.stir) for (let i = 0; i < 8; i++) R(ctx, x0 + 60 + Math.sin(t * 6 + i) * 30, 138 + (i % 3), 3, 1, '#d8ecec');
    for (let s = 0; s < 3; s++) R(ctx, x0 - 4 + s * 2, 131 + s * 5, 4, 5, '#bfb294');
  };
  const jarsProp = (st) => (ctx) => {
    for (let i = 0; i < 6; i++) {
      const x = 150 + i * 13, y = 128;
      R(ctx, x, y, 10, 16, '#b8ad97'); R(ctx, x + 1, y - 2, 8, 2, '#cfc4ae'); R(ctx, x, y, 1, 16, '#9a8f7a'); R(ctx, x + 9, y, 1, 16, '#d8cdb8');
      if (st.fill > i) R(ctx, x + 2, y - 1, 6, 1, st.wine ? '#8a2a3a' : '#5d8b92');
    }
  };
  const basketsProp = (st) => (ctx) => {
    for (let i = 0; i < (st.baskets || 0); i++) {
      const x = 30 + i * 17, y = 150;
      R(ctx, x, y - 6, 12, 6, '#a88e5c'); R(ctx, x, y - 6, 12, 1, '#c9ae78'); for (let j = 1; j < 12; j += 3) R(ctx, x + j, y - 5, 1, 5, '#7a6440');
      R(ctx, x + 2, y - 8, 3, 2, '#d8b878'); R(ctx, x + 6, y - 8, 4, 2, '#c99a58');
    }
  };
  const tombProp = (st) => (ctx) => {
    for (let y = 92; y < 150; y++) R(ctx, 176 + Math.round(Math.sin(y * 0.2) * 2), y, 80, 1, y % 5 ? '#8a7e68' : '#7d7260');
    R(ctx, 196, 116, 24, 30, '#1a1512'); R(ctx, 198, 113, 20, 3, '#1a1512');
    const sx = Math.round(st.stoneX === undefined ? 208 : st.stoneX);
    for (let dy = -13; dy <= 13; dy++) { const w = Math.round(Math.sqrt(169 - dy * dy)); R(ctx, sx - w / 3, 133 + dy, (w * 2) / 3, 1, dy % 4 ? '#a59a84' : '#8f846f'); }
  };
  const fireProp = (x, y) => (ctx, t, cam) => {
    const sx = x - cam;
    R(ctx, sx - 6, y - 2, 12, 2, '#3a2a1e');
    for (let i = 0; i < 7; i++) { const h = 3 + Math.round((Math.sin(t * 12 + i * 1.7) + 1) * 2); R(ctx, sx - 5 + i * 1.6, y - 2 - h, 1, h, i % 2 ? '#ffb54a' : '#ffd88a'); }
  };
  // something carried in the hand of an entity (bread, cup, basin, torch)
  const held = (ent, draw) => SC.add({ x: 0, y: 0, z: 999, draw(ctx) { if (ent.visible) draw(ctx, Math.round(ent.x - SC.cam), Math.round(ent.y + ent.hop), ent.facing); } });

  // ---------- the synagogue attendant ----------
  VG.syn_teach = () => {
    load('syn');
    [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [14, 144], [34, 144], [54, 144], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].forEach((c, i) => add(K.villager(500 + i, i % 4 === 2), c[0], c[1], { pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    const j = add(P().jesus, 128, 152, { facing: 1, pose: 'out' });
    held(j, (ctx, x, y, f) => { R(ctx, x + f * 5 - 2, y - 15, 5, 3, '#e6dcc4'); R(ctx, x + f * 5 - 3, y - 15, 1, 3, '#8a6a42'); R(ctx, x + f * 5 + 3, y - 15, 1, 3, '#8a6a42'); });
    return {};
  };
  VG.syn_spirit = () => {
    load('syn');
    const people = [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [14, 144], [34, 144], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].map((c, i) => add(K.villager(500 + i, i % 4 === 2), c[0], c[1], { pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    const man = add(K.villager(560), 56, 144, { pose: 'sit', facing: 1, speed: 30 });
    const j = add(P().jesus, 140, 152, { facing: 1 });
    return {
      cry: async () => { man.pose = 'stand'; man.y = 152; await SC.walk(man, 92); man.hopping = true; man.pose = 'raise'; people.forEach((p) => { p.facing = p.x < man.x ? 1 : -1; }); },
      rebuke: async () => { j.facing = -1; j.pose = 'out'; await W(500); },
      calm: async () => { man.hopping = false; man.pose = 'sit'; SC.dust(man.x, 140, 8, { up: true, spread: 10, color: '#cfc6b2' }); await W(700); j.pose = 'stand'; people.forEach((p, i) => { if (i % 2) p.facing *= -1; }); },
    };
  };

  // ---------- Simon's wife's mother ----------
  VG.mil_fever = () => {
    load('house');
    const look = { skin: '#a8724a', hair: '#5f5048', beard: '#a8724a', tunic: '#7a5a3a' };
    let bed = lying(look, 160, 146);
    const j = add(P().jesus, -10, 144, { speed: 30 });
    const ds = [0, 1, 2, 3].map((i) => add(dis(i), -26 - i * 14, 145 + (i % 2), { speed: 30 }));
    let her = null;
    return {
      enter: async () => { ds.forEach((d, i) => SC.walk(d, 70 - i * 13)); await SC.walk(j, 138); },
      raise: async () => {
        j.pose = 'out'; await W(600);
        her = bed.rise({ veil: '#6a4e3a', beard: null }); await W(600); her.pose = 'stand'; j.pose = 'stand';
      },
      serve: async () => {
        her.speed = 22; await SC.walk(her, 104); her.facing = -1;
        held(her, (ctx, x, y) => { R(ctx, x - 7, y - 14, 5, 2, '#9a6a44'); R(ctx, x - 6, y - 15, 3, 1, '#d8b878'); });
        await W(500);
      },
    };
  };
  VG.mil_evening = () => {
    load('street', { dusk: true, lights: [{ x: 339, y: 118, r: 50 }] }, 230);
    const sick = [];
    [[300, 151], [318, 152], [360, 151], [384, 152]].forEach((c, i) => sick.push(lying({ skin: K.pick(K.SKINS, i, 1), hair: '#2a1a12', tunic: K.pick(K.TUNICS, i, 3) }, c[0], c[1])));
    crowd(8, 270, 430, 144, 600, { facing: -1 }).forEach((p) => { p.facing = p.x < 339 ? 1 : -1; });
    const j = add(P().jesus, 339, 141, { facing: 1, speed: 20 });
    return {
      heal: async () => {
        for (let i = 0; i < sick.length; i++) {
          const s = sick[i];
          await SC.walk(j, s.x + (i < 2 ? 10 : -10)); j.pose = 'out'; await W(400);
          const p = s.rise({ beard: '#2a1a12' }); p.pose = 'stand'; p.hopping = i % 2 === 0; j.pose = 'stand';
        }
      },
    };
  };

  // ---------- Jairus ----------
  VG.jai_beg = () => {
    load('street', {}, 20);
    const cr = crowd(9, 60, 220, 146, 620);
    const j = add(P().jesus, 120, 148, { facing: 1 });
    const jai = add(S.person({ skin: '#a8724a', hair: '#2a1a12', beard: '#2a1a12', tunic: '#d8ccae', mantle: '#4a4a5a', fringe: '#9cc0e0' }), 270, 149, { facing: -1, speed: 44 });
    void cr;
    return {
      kneel: async () => { await SC.walk(jai, 136); jai.pose = 'sit'; j.facing = 1; await W(500); },
      go: async () => { jai.pose = 'stand'; j.facing = -1; SC.walk(j, 70); await SC.walk(jai, 84); },
    };
  };
  VG.jai_woman = () => {
    load('street', {}, 20);
    const cr = crowd(10, 40, 240, 147, 640);
    const j = add(P().jesus, 150, 149, { facing: -1, speed: 16 });
    const jai = add(S.person({ skin: '#a8724a', hair: '#2a1a12', beard: '#2a1a12', tunic: '#d8ccae', mantle: '#4a4a5a', fringe: '#9cc0e0' }), 132, 150, { facing: -1, speed: 16 });
    const w = add(S.person({ skin: '#9a6440', hair: '#1e1410', tunic: '#5a4a3a', veil: '#4a3e34' }), 230, 151, { facing: -1, speed: 18 });
    cr.forEach((c) => { c.speed = 16; });
    return {
      touch: async () => {
        SC.walk(j, 110); SC.walk(jai, 92); cr.forEach((c) => SC.walk(c, c.x - 40));
        await SC.walk(w, 128); w.pose = 'out'; await W(500); w.pose = 'stand';
      },
      turn: async () => { j.target = null; j.moving = false; cr.forEach((c) => { c.target = null; c.moving = false; }); j.facing = 1; await W(700); },
      kneel: async () => { await SC.walk(w, 122); w.facing = -1; w.pose = 'sit'; await W(500); },
    };
  };
  VG.jai_house = () => {
    load('house');
    const girl = lying({ skin: '#b8845a', hair: '#2a1a12', beard: '#b8845a', tunic: '#e6dcc4' }, 170, 146);
    const mourn = [0, 1, 2, 3, 4].map((i) => add(K.villager(660 + i, i % 2 === 0), 120 + i * 22, 140 + (i % 2) * 5, { pose: 'raise', facing: i % 2 ? -1 : 1, speed: 34 }));
    const j = add(P().jesus, -10, 145, { speed: 26 });
    const par = [add(S.person({ skin: '#a8724a', hair: '#2a1a12', beard: '#2a1a12', tunic: '#d8ccae', mantle: '#4a4a5a' }), -24, 146, { speed: 26 }), add(S.person({ skin: '#a8724a', hair: '#2a1a12', tunic: '#8a3a2a', veil: '#6a4e3a' }), -38, 147, { speed: 26 })];
    const three = [0, 1, 2].map((i) => add(dis(i), -52 - i * 13, 146, { speed: 26 }));
    let her;
    return {
      enter: async () => { SC.walk(par[0], 70); SC.walk(par[1], 58); three.forEach((d, i) => SC.walk(d, 44 - i * 12)); await SC.walk(j, 96); },
      out: async () => { j.pose = 'out'; await Promise.all(mourn.map((m, i) => { m.pose = 'stand'; return SC.wait(i * 120).then(() => SC.walk(m, -20 - i * 10)); })); j.pose = 'stand'; await SC.walk(j, 150); },
      rise: async () => { j.pose = 'out'; await W(600); her = girl.rise({ beard: null }); await W(700); her.pose = 'stand'; j.pose = 'stand'; await SC.walk(her, 140); par.forEach((p) => { p.pose = 'raise'; }); },
    };
  };

  // ---------- Cana ----------
  function canaSet(st) {
    const s = load('house', { dusk: true, lights: [{ x: 90, y: 95, r: 46 }, { x: 168, y: 95, r: 46 }] });
    s.props.push(lampProp); s.props.push(tableProp); s.props.push(jarsProp(st));
    const guests = [[50, 1], [66, 1], [82, 1], [98, 1], [118, -1], [134, -1]].map((c, i) => add(K.villager(680 + i, i % 2 === 1), c[0], 147, { pose: 'sit', facing: c[1] }));
    return guests;
  }
  VG.cana_feast = () => {
    const st = { fill: 0 };
    canaSet(st);
    const j = add(P().jesus, 146, 147, { pose: 'sit', facing: -1 });
    const mary = add(S.person({ skin: '#a8724a', hair: '#2a1a12', tunic: '#3d4f6a', veil: '#5a6a8a' }), 30, 146, { speed: 20 });
    const serv = [0, 1].map((i) => add(K.villager(700 + i), 232 + i * 12, 145, { facing: -1 }));
    void j;
    return {
      mary: async () => { await SC.walk(mary, 128); mary.facing = 1; await W(400); },
      servants: async () => { mary.facing = 1; await SC.walk(mary, 206); mary.pose = 'out'; serv.forEach((s) => { s.facing = -1; }); await W(500); mary.pose = 'stand'; },
    };
  };
  VG.cana_jars = () => {
    const st = { fill: 0 };
    canaSet(st);
    add(P().jesus, 214, 145, { facing: -1, pose: 'out' });
    const serv = [0, 1, 2].map((i) => add(K.villager(700 + i), 120 - i * 12, 146, { speed: 34 }));
    return {
      fill: async () => {
        for (let i = 0; i < 6; i++) {
          const s = serv[i % 3];
          s.pose = 'carry'; await SC.walk(s, 152 + i * 13); s.pose = 'stand'; st.fill = i + 1; s.facing = -1; SC.walk(s, 120 - (i % 3) * 12);
          await W(150);
        }
      },
      draw: async () => { st.wine = true; const s = serv[0]; await SC.walk(s, 150); s.pose = 'out'; await W(400); s.pose = 'stand'; },
    };
  };
  VG.cana_taste = () => {
    const st = { fill: 6, wine: true };
    canaSet(st);
    const master = add(S.person({ skin: '#a8724a', hair: '#5f5048', beard: '#5f5048', tunic: '#8a3a2a', stripe: '#d8b04a' }), 112, 146, { facing: 1, speed: 22 });
    const groom = add(S.person({ skin: '#b8845a', hair: '#2a1a12', beard: '#2a1a12', tunic: '#e6dcc4', stripe: '#d8b04a' }), 40, 146, { facing: 1 });
    const serv = add(K.villager(700), 146, 145, { facing: -1, pose: 'out' });
    void serv;
    held(master, (ctx, x, y, f) => { R(ctx, x + f * 5 - 1, y - 18, 3, 3, '#9a6a44'); R(ctx, x + f * 5, y - 18, 1, 1, '#8a2a3a'); });
    return {
      taste: async () => { master.pose = 'raise'; await W(900); master.pose = 'stand'; master.facing = -1; await SC.walk(master, 58); groom.facing = 1; master.pose = 'out'; await W(500); master.pose = 'stand'; },
    };
  };

  // ---------- the loaves ----------
  VG.loaves_crowd = () => {
    load('field');
    const j = add(P().jesus, 200, 144, { facing: -1 });
    [0, 1, 2, 3].forEach((i) => add(dis(i), 214 + i * 10, 145 + (i % 2), { facing: -1 }));
    const cr = [];
    for (let i = 0; i < 16; i++) cr.push(add(K.villager(720 + i, i % 4 === 1), -20 - i * 9, 145 + (i % 3), { speed: 30, facing: 1 }));
    void j;
    return {
      gather: async () => { await Promise.all(cr.map((c, i) => SC.wait(i * 60).then(() => SC.walk(c, 20 + (i % 8) * 20 + (i >= 8 ? 8 : 0), 140 + (i >= 8 ? 8 : 0))))); cr.forEach((c) => { c.pose = 'sit'; }); },
    };
  };
  VG.loaves_bread = () => {
    load('field');
    const j = add(P().jesus, 200, 144, { facing: -1 });
    const ds = [0, 1, 2, 3].map((i) => add(dis(i), 214 + i * 10, 145 + (i % 2), { facing: -1, speed: 30 }));
    for (let i = 0; i < 16; i++) add(K.villager(720 + i, i % 4 === 1), 20 + (i % 8) * 20 + (i >= 8 ? 8 : 0), 140 + (i >= 8 ? 8 : 0), { pose: 'sit' });
    const boy = add(S.person({ skin: '#b8845a', hair: '#2a1a12', tunic: '#b49a6a' }), 176, 147, { facing: 1, speed: 20 });
    held(boy, (ctx, x, y) => { R(ctx, x + 3, y - 14, 6, 4, '#a88e5c'); R(ctx, x + 4, y - 15, 4, 1, '#d8b878'); });
    return {
      boy: async () => { await SC.walk(boy, 188); ds[0].facing = -1; await W(500); },
      bless: async () => { j.pose = 'raise'; await W(1200); j.pose = 'stand'; },
      share: async () => { await Promise.all(ds.map((d, i) => SC.walk(d, 30 + i * 40, 146))); },
    };
  };
  VG.loaves_king = () => {
    const st = load('field');
    st.baskets = 0; st.props.push(basketsProp(st));
    const j = add(P().jesus, 210, 144, { facing: -1, speed: 22 });
    const cr = [];
    for (let i = 0; i < 16; i++) cr.push(add(K.villager(720 + i, i % 4 === 1), 20 + (i % 8) * 20 + (i >= 8 ? 8 : 0), 140 + (i >= 8 ? 8 : 0), { pose: 'sit', speed: 22 }));
    return {
      baskets: async () => { for (let i = 0; i < 12; i++) { st.baskets = i + 1; await W(170); } },
      king: async () => { TW.Audio && TW.Audio.sfx('cheer'); cr.forEach((c, i) => { c.pose = 'raise'; c.hopping = i % 2 === 0; SC.wait(i * 40).then(() => SC.walk(c, 120 + (i % 6) * 10)); }); await W(1200); },
      withdraw: async () => { j.facing = 1; await SC.walk(j, 300); },
    };
  };

  // ---------- Sychar ----------
  function wellSet() {
    const st = load('village');
    st.props.push(wellProp(150, 149));
    return st;
  }
  VG.sam_well = () => {
    wellSet();
    const j = add(P().jesus, 132, 148, { pose: 'sit', facing: 1 });
    const w = add(S.person({ skin: '#a06a42', hair: '#1e1410', tunic: '#8a3a2a', veil: '#9a7a5a' }), 280, 150, { facing: -1, speed: 18 });
    held(w, (ctx, x, y, f) => { if (!w.leftJar) { R(ctx, x - f * 2 - 2, y - 30, 5, 5, '#9a6a44'); R(ctx, x - f * 2 - 1, y - 31, 3, 1, '#7a5034'); } });
    void j;
    return { arrive: async () => { await SC.walk(w, 168); w.facing = -1; await W(300); } };
  };
  VG.sam_talk = () => {
    wellSet();
    add(P().jesus, 132, 148, { pose: 'sit', facing: 1 });
    const w = add(S.person({ skin: '#a06a42', hair: '#1e1410', tunic: '#8a3a2a', veil: '#9a7a5a' }), 168, 150, { facing: -1, speed: 16 });
    return { step: async () => { await SC.walk(w, 182); w.facing = -1; await W(300); }, near: async () => { await SC.walk(w, 166); w.facing = -1; } };
  };
  VG.sam_town = () => {
    wellSet();
    const j = add(P().jesus, 132, 148, { pose: 'sit', facing: -1 });
    const w = add(S.person({ skin: '#a06a42', hair: '#1e1410', tunic: '#8a3a2a', veil: '#9a7a5a' }), 168, 150, { facing: -1, speed: 40 });
    const ds = [0, 1, 2].map((i) => add(dis(i), 260 + i * 12, 150, { facing: -1, speed: 24 }));
    const town = [];
    for (let i = 0; i < 7; i++) town.push(add(K.villager(760 + i, i % 3 === 1), 32, 146, { visible: false, speed: 26 }));
    return {
      run: async () => { ds.forEach((d, i) => SC.walk(d, 176 + i * 12)); await SC.walk(w, 32); w.visible = false; },
      come: async () => { j.pose = 'stand'; await Promise.all(town.map((t, i) => SC.wait(i * 220).then(() => { t.visible = true; return SC.walk(t, 70 + i * 9); }))); town.forEach((t) => { t.facing = 1; }); },
    };
  };

  // ---------- Bartimaeus ----------
  VG.bart_road = () => {
    load('village');
    const bart = add(S.person({ skin: '#8a5636', hair: '#2a1a12', beard: '#2a1a12', tunic: '#9a8a6a', mantle: '#5a5a42' }), 150, 151, { pose: 'sit', facing: -1, speed: 40 });
    const j = add(P().jesus, 30, 147, { facing: 1, speed: 18 });
    const cr = [0, 1, 2, 3, 4, 5].map((i) => add(i < 3 ? dis(i) : K.villager(780 + i), 14 - i * 12, 146 + (i % 2), { speed: 18 }));
    return {
      pass: async () => { cr.forEach((c, i) => SC.walk(c, 120 - i * 11)); await SC.walk(j, 132); },
      shout: async () => { bart.pose = 'raise'; bart.hopping = true; await W(500); cr.slice(3).forEach((c) => { c.facing = 1; c.pose = 'out'; }); await W(900); },
      bart, j, cr,
    };
  };
  VG.bart_called = () => {
    const v = VG.bart_road();
    v.j.x = 132; v.cr.forEach((c, i) => { c.x = 120 - i * 11; });
    const cloak = SC.add({ x: 150, y: 152, z: 151, visible: false, draw(ctx, sx, sy) { R(ctx, sx - 7, sy - 2, 14, 3, '#5a5a42'); R(ctx, sx - 7, sy - 2, 14, 1, '#6a6a52'); } });
    return {
      stop: async () => { v.j.facing = 1; v.cr.forEach((c) => { c.pose = 'stand'; c.facing = 1; }); await W(500); },
      spring: async () => {
        v.bart.hopping = false; v.bart.pose = 'stand'; cloak.visible = true;
        v.bart.frames = S.person({ skin: '#8a5636', hair: '#2a1a12', beard: '#2a1a12', tunic: '#9a8a6a' });
        await SC.walk(v.bart, 144); v.bart.facing = -1;
      },
      see: async () => { v.j.pose = 'out'; await W(700); v.j.pose = 'stand'; v.bart.pose = 'raise'; await W(600); v.bart.pose = 'stand'; v.j.facing = 1; SC.walk(v.j, 300); await W(300); v.bart.facing = 1; SC.walk(v.bart, 290); v.cr.forEach((c) => SC.walk(c, 280)); await W(1500); },
    };
  };

  // ---------- Bethesda ----------
  function bethSet() {
    const st = load('court', {}, 30);
    st.props.push(poolProp(st));
    [[70, 156], [118, 157], [180, 156], [222, 157]].forEach((c, i) => lying({ skin: K.pick(K.SKINS, i + 5, 1), hair: '#2a1a12', tunic: K.pick(K.TUNICS, i + 2, 3) }, c[0], c[1]));
    return st;
  }
  VG.beth_pool = () => {
    const st = bethSet();
    const man = lying({ skin: '#9a6440', hair: '#5f5048', beard: '#5f5048', tunic: '#8a7a5a' }, 150, 125);
    void man;
    return { stir: async () => { st.stir = true; await W(1200); st.stir = false; } };
  };
  VG.beth_heal = () => {
    bethSet();
    const man = lying({ skin: '#9a6440', hair: '#5f5048', beard: '#5f5048', tunic: '#8a7a5a' }, 150, 125);
    const j = add(P().jesus, 300, 124, { facing: -1, speed: 24 });
    let p;
    return {
      come: async () => { await SC.walk(j, 172); j.facing = -1; },
      rise: async () => { j.pose = 'out'; await W(500); p = man.rise({}); await W(500); p.pose = 'stand'; await W(400); p.pose = 'carry'; j.pose = 'stand'; await SC.walk(p, 90); },
    };
  };
  VG.beth_sabbath = () => {
    load('court', {}, 30);
    const man = add(S.person({ skin: '#9a6440', hair: '#5f5048', beard: '#5f5048', tunic: '#8a7a5a' }), 280, 148, { pose: 'carry', facing: -1, speed: 22 });
    const officials = [0, 1, 2].map((i) => add(P().scribe(80 + i), 120 + i * 14, 147, { facing: 1 }));
    return {
      stop: async () => { await SC.walk(man, 166); man.pose = 'stand'; officials.forEach((o) => { o.pose = 'out'; }); await W(600); officials.forEach((o) => { o.pose = 'stand'; }); },
      tell: async () => { man.facing = 1; await SC.walk(man, 220); man.facing = -1; await W(300); },
    };
  };

  // ---------- the man born blind ----------
  VG.blind_mud = () => {
    load('court', {}, 30);
    const man = add(S.person({ skin: '#a8724a', hair: '#1e1410', beard: '#1e1410', tunic: '#b49a6a' }), 150, 150, { pose: 'sit', facing: -1, speed: 22 });
    const j = add(P().jesus, 60, 148, { facing: 1, speed: 24 });
    [0, 1, 2].forEach((i) => add(dis(i), 40 - i * 12, 148 + (i % 2), { facing: 1 }));
    return {
      mud: async () => { await SC.walk(j, 136); j.pose = 'sit'; SC.dust(140, 146, 10, { up: true, spread: 6, color: '#7a5a3a' }); await W(900); j.pose = 'stand'; j.pose = 'out'; await W(600); j.pose = 'stand'; },
      siloam: async () => {
        await K.fade(async () => {
          const st = load('court', {}, 30); st.props.push(poolProp(st));
          man.x = 300; SC.ents = [];
          SC.ents.push(man); man.pose = 'stand'; man.y = 126;
        });
        await SC.walk(man, 150); man.pose = 'sit'; SC.dust(150, 128, 12, { up: true, spread: 10, color: '#d8ecec' }); await W(900);
      },
      see: async () => { man.pose = 'raise'; man.hopping = true; await W(1200); man.hopping = false; },
    };
  };
  VG.blind_neighbors = () => {
    load('village');
    const man = add(S.person({ skin: '#a8724a', hair: '#1e1410', beard: '#1e1410', tunic: '#b49a6a' }), 128, 148, { facing: 1 });
    const ns = crowd(6, 70, 196, 147, 800);
    return { argue: async () => { ns.forEach((n, i) => { n.pose = i % 2 ? 'out' : 'stand'; n.facing = i % 2 ? 1 : -1; }); await W(600); ns.forEach((n) => { n.facing = n.x < man.x ? 1 : -1; }); man.pose = 'out'; await W(500); man.pose = 'stand'; } };
  };
  VG.blind_pharisees = () => {
    load('syn');
    [[222, 124, 81], [242, 124, 82], [204, 134, 83], [240, 134, 84], [184, 144, 85], [222, 144, 86], [10, 124, 87], [26, 134, 88], [14, 144, 89]].forEach((c) => add(P().scribe(c[2]), c[0], c[1], { pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    const man = add(S.person({ skin: '#a8724a', hair: '#1e1410', beard: '#1e1410', tunic: '#b49a6a' }), 128, 152, { facing: 1, speed: 26 });
    return {
      answer: async () => { man.pose = 'out'; await W(600); man.pose = 'stand'; man.facing = -1; man.pose = 'out'; await W(500); man.pose = 'stand'; },
      out: async () => { man.facing = -1; await SC.walk(man, -20); },
    };
  };
  VG.blind_found = () => {
    load('village');
    const man = add(S.person({ skin: '#a8724a', hair: '#1e1410', beard: '#1e1410', tunic: '#b49a6a' }), 150, 149, { facing: 1 });
    const j = add(P().jesus, 300, 150, { facing: -1, speed: 22 });
    return {
      find: async () => { await SC.walk(j, 176); man.facing = 1; await W(300); },
      kneel: async () => { man.pose = 'sit'; await W(800); },
    };
  };

  // ---------- Martha ----------
  VG.mar_meet = () => {
    load('village');
    crowd(5, 30, 80, 146, 820, { pose: 'raise' });
    const m = add(S.person({ skin: '#a8724a', hair: '#2a1a12', tunic: '#6a5a42', veil: '#b3a080' }), 40, 147, { speed: 30 });
    const j = add(P().jesus, 300, 150, { facing: -1, speed: 22 });
    [0, 1, 2].forEach((i) => SC.walk(add(dis(i), 316 + i * 12, 150, { facing: -1, speed: 22 }), 220 + i * 12));
    return { meet: async () => { SC.walk(j, 196); await SC.walk(m, 170); m.facing = 1; j.facing = -1; await W(300); } };
  };
  VG.mar_talk = () => {
    load('village');
    add(S.person({ skin: '#a8724a', hair: '#2a1a12', tunic: '#6a5a42', veil: '#b3a080' }), 170, 149, { facing: 1 });
    add(P().jesus, 196, 150, { facing: -1 });
    return {};
  };
  VG.mar_tomb = () => {
    const st = load('village');
    st.stoneX = 208; st.props.push(tombProp(st));
    const people = crowd(6, 40, 150, 147, 840);
    const mary = add(S.person({ skin: '#a8724a', hair: '#2a1a12', tunic: '#3d4f6a', veil: '#7a8aa0' }), 160, 150, { pose: 'sit', facing: 1 });
    const martha = add(S.person({ skin: '#a8724a', hair: '#2a1a12', tunic: '#6a5a42', veil: '#b3a080' }), 140, 149, { facing: 1 });
    const j = add(P().jesus, 176, 150, { facing: 1 });
    const laz = add(S.person({ skin: '#e6dfcc', hair: '#e6dfcc', tunic: '#e6dfcc', belt: '#b9ad92' }), 208, 146, { visible: false, speed: 7, facing: -1, z: 160 });
    void martha;
    return {
      wept: async () => { j.facing = -1; await W(900); j.facing = 1; },
      stone: async () => { people.slice(3).forEach((p, i) => SC.walk(p, 178 + i * 7)); await SC.tween(1800, (q) => { st.stoneX = 208 + q * 40; }); },
      call: async () => { j.pose = 'raise'; await W(900); j.pose = 'stand'; },
      come: async () => { laz.visible = true; TW.Audio && TW.Audio.sfx('cheer', 2.5); await SC.walk(laz, 206, 152); people.forEach((p) => { p.pose = 'raise'; }); mary.pose = 'stand'; await W(600); },
    };
  };

  // ---------- Simon Peter ----------
  const PETER = { skin: '#9a6440', hair: '#3a2416', beard: '#5f5048', tunic: '#8a7a5a', mantle: '#6a4a32' };
  function upper() {
    const st = load('house', { night: true, lights: [{ x: 90, y: 95, r: 50 }, { x: 168, y: 95, r: 50 }] });
    st.props.push(lampProp); st.props.push(tableProp);
    const twelve = [];
    const seats = [[52, 1], [66, 1], [80, 1], [94, 1], [108, 1], [146, -1], [160, -1], [174, -1], [188, -1], [202, -1], [216, -1]];
    seats.forEach((c, i) => twelve.push(add(i === 1 ? S.person(PETER) : K.villager(207 + i), c[0], 147, { pose: 'sit', facing: c[1], speed: 24 })));
    const j = add(P().jesus, 128, 147, { pose: 'sit', facing: -1, speed: 20 });
    return { st, twelve, j, peter: twelve[1], judas: twelve[8] };
  }
  VG.pet_room = () => {
    load('village');
    const carrier = add(K.villager(900), 120, 148, { facing: -1, speed: 16 });
    held(carrier, (ctx, x, y) => { R(ctx, x - 3, y - 31, 6, 6, '#9a6a44'); R(ctx, x - 2, y - 32, 4, 1, '#7a5034'); });
    const two = [add(S.person(PETER), 230, 149, { facing: -1, speed: 16 }), add(dis(9), 246, 150, { facing: -1, speed: 16 })];
    return { follow: async () => { SC.walk(carrier, 32).then(() => { carrier.visible = false; }); await Promise.all(two.map((t, i) => SC.wait(400 + i * 200).then(() => SC.walk(t, 32 + i * 4)))); two.forEach((t) => { t.visible = false; }); } };
  };
  VG.pet_feet = () => {
    const u = upper();
    let basin = null;
    return {
      rise: async () => { u.j.pose = 'stand'; await W(400); u.j.frames = S.person({ skin: '#a26c44', hair: '#24160e', beard: '#24160e', tunic: '#d6c8a6', stripe: '#7a5232' }); await W(500); },
      wash: async () => {
        basin = held(u.j, (ctx, x, y, f) => { if (u.j.pose === 'sit') { R(ctx, x + f * 9 - 4, y - 3, 8, 3, '#8a5a3a'); R(ctx, x + f * 9 - 3, y - 3, 6, 1, '#7aa3a4'); } });
        for (let i = 4; i >= 2; i--) { const d = u.twelve[i]; await SC.walk(u.j, d.x + 10); u.j.facing = -1; u.j.pose = 'sit'; await W(600); u.j.pose = 'stand'; }
      },
      peter: async () => { await SC.walk(u.j, u.peter.x + 10); u.j.facing = -1; u.peter.pose = 'out'; u.peter.facing = 1; await W(900); u.peter.pose = 'sit'; u.j.pose = 'sit'; await W(900); u.j.pose = 'stand'; void basin; },
    };
  };
  VG.pet_betray = () => {
    const u = upper();
    return {
      look: async () => { u.twelve.forEach((d, i) => { d.facing = i % 2 ? 1 : -1; }); await W(700); u.twelve.forEach((d) => { d.facing = d.x < 128 ? 1 : -1; }); },
      dip: async () => {
        u.j.facing = 1;
        const bread = held(u.j, (ctx, x, y, f) => { if (!u.given) R(ctx, x + f * 6, y - 14, 3, 2, '#c99a58'); });
        u.j.pose = 'out'; await W(800); u.given = true; u.j.pose = 'sit'; void bread;
      },
      leave: async () => { u.judas.pose = 'stand'; u.judas.y = 140; u.judas.facing = -1; await SC.walk(u.judas, 14); u.judas.visible = false; await W(400); },
    };
  };
  VG.pet_bread = () => {
    const u = upper();
    let what = null;
    held(u.j, (ctx, x, y, f) => {
      if (what === 'bread') R(ctx, x + f * 6, y - 19, 4, 2, '#c99a58');
      if (what === 'cup') { R(ctx, x + f * 6, y - 20, 3, 3, '#b8862e'); R(ctx, x + f * 6, y - 20, 3, 1, '#8a2a3a'); }
    });
    return {
      bread: async () => { u.j.pose = 'stand'; what = 'bread'; u.j.pose = 'raise'; await W(1400); u.j.pose = 'sit'; },
      cup: async () => { what = 'cup'; u.j.pose = 'raise'; await W(1400); u.j.pose = 'sit'; what = null; },
    };
  };
  VG.pet_command = () => { upper(); return {}; };
  VG.pet_garden = () => {
    const st = load('olives', { night: true }, 60);
    const j = add(P().jesus, 150, 145, { facing: 1, speed: 24 });
    st.lights.push({ x: 40, y: 10, r: 160, c: 'rgba(170,190,230,0.22)' });
    st.lights.push({ ent: j, r: 50, dy: 14, c: 'rgba(200,210,240,0.18)' });
    const three = [add(S.person(PETER), 110, 146, { speed: 24 }), add(dis(10), 96, 146), add(dis(11), 84, 147)];
    const lies = [];
    const mob = [];
    for (let i = 0; i < 6; i++) mob.push(add(K.villager(920 + i), 400 + i * 14, 146 + (i % 2), { facing: -1, speed: 34, pose: i % 2 ? 'raise' : 'stand' }));
    mob.forEach((m, i) => { if (i % 2) st.lights.push({ ent: m, r: 34, dy: 28, c: 'rgba(255,160,70,0.55)' }); });
    return {
      pray: async () => { await SC.walk(j, 176); j.pose = 'sit'; await W(800); },
      sleep: async () => {
        three.forEach((t, i) => { t.visible = false; lies.push(lying(i === 0 ? PETER : { skin: '#a8724a', hair: '#2a1a12', tunic: '#7a5a3a' }, t.x, t.y)); });
        await W(900); j.pose = 'stand'; await SC.walk(j, 124); await W(500); await SC.walk(j, 176); j.pose = 'sit'; await W(600);
      },
      torches: async () => { j.pose = 'stand'; lies.forEach((l, i) => { SC.ents = SC.ents.filter((q) => q !== l); three[i].visible = true; }); await Promise.all(mob.map((m, i) => SC.walk(m, 210 + i * 12))); },
      sword: async () => { const p = three[0]; await SC.walk(p, 196); p.pose = 'out'; TW.Audio && TW.Audio.sfx('crash'); SC.dust(p.x + 8, 132, 8, { up: true, spread: 4, color: '#e8e4dc' }); await W(800); p.pose = 'stand'; j.pose = 'out'; await W(600); j.pose = 'stand'; },
    };
  };
  VG.pet_denial = () => {
    const st = load('house', { night: true, fire: true, lights: [{ x: 128, y: 140, r: 60, c: 'rgba(255,150,60,0.55)' }] });
    st.props.push(fireProp(128, 146));
    const p = add(S.person(PETER), 112, 147, { pose: 'sit', facing: 1, speed: 20 });
    const off = [add(K.villager(940), 144, 147, { pose: 'sit', facing: -1 }), add(K.villager(941), 158, 146, { facing: -1 }), add(K.villager(942), 98, 146, { facing: 1 })];
    const maid = add(S.person({ skin: '#b8845a', hair: '#2a1a12', tunic: '#9a8a6a', veil: '#8a4a3a' }), 240, 146, { facing: -1, speed: 20 });
    return {
      maid: async () => { await SC.walk(maid, 150); maid.pose = 'out'; await W(800); maid.pose = 'stand'; },
      porch: async () => { p.pose = 'stand'; p.facing = -1; await SC.walk(p, 50); p.facing = 1; maid.facing = -1; maid.pose = 'out'; await SC.walk(maid, 80); },
      again: async () => { off.forEach((o) => { o.pose = 'out'; o.facing = -1; }); await W(700); p.pose = 'raise'; p.hopping = true; await W(900); p.hopping = false; p.pose = 'stand'; },
      crow: async () => { TW.Audio && TW.Audio.sfx('rooster'); SC.toast('A rooster crows.'); await W(1200); p.facing = -1; await SC.walk(p, 18); p.pose = 'sit'; await W(800); },
    };
  };

  // ---------- running a memory ----------
  let saved = null;
  VG.enter = async function (id, witness) {
    const el = SC.el;
    let mem = null;
    await K.fade(async () => {
      saved = { stage: SC.stage, ents: SC.ents, cam: SC.cam, camGoal: SC.camGoal, player: SC.player, parts: SC.parts, motes: SC.motes };
      SC.player = null;
      mem = VG[id]() || {};
      TW.Audio && TW.Audio.memory(true);
      el.stage.classList.add('memory');
      el.memchip.textContent = 'As remembered by ' + witness.replace(/^The /, 'the ').replace(/^A /, 'a ');
    });
    return mem;
  };
  VG.exit = async function () {
    const el = SC.el;
    await K.fade(async () => {
      Object.assign(SC, { stage: saved.stage, ents: saved.ents, cam: saved.cam, camGoal: saved.camGoal, player: saved.player, parts: saved.parts, motes: saved.motes });
      el.stage.classList.remove('memory');
      if (TW.Audio) { TW.Audio.memory(false); if (saved.stage.audio) TW.Audio.amb(saved.stage.audio.amb || {}); }
      saved = null;
    });
  };

  TW.Vignettes = VG;
})(window.TW);
