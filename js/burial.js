/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode X: The Burial (Mark 15:42–47; John 19:38–42).
   Afterward Nicodemus tells the scribe about the night he first came to Jesus (John 3) and the day he spoke up for him (John 7). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'burial' };
  const sayS = (key, a, b) => SC.say({ kind: 'scripture', ref: P.ref(key, a, b), text: P.vs(key, a, b) });
  const dusk = (st, amount) => {
    const fx0 = st.fx;
    st.fx = function (fc, k, t, cam, sc) {
      if (fx0) fx0.call(st, fc, k, t, cam, sc);
      fc.fillStyle = 'rgba(80,34,40,' + amount + ')'; fc.fillRect(0, 0, 256 * k, 160 * k);
      fc.globalCompositeOperation = 'lighter';
      const g = fc.createLinearGradient(256 * k, 0, 0, 0);
      g.addColorStop(0, 'rgba(255,150,80,0.22)'); g.addColorStop(1, 'rgba(255,150,80,0)');
      fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
      fc.globalCompositeOperation = 'source-over';
    };
    return st;
  };

  // ---------- Nicodemus's memories ----------
  const VG = TW.Vignettes;
  VG.nic_night = function () {
    const st = K.interiorStage();
    K.nightWrap(st, { stars: true, dark: 0.3, lights: [{ x: 124, y: 46, r: 40, c: 'rgba(255,190,110,0.4)' }] });
    st.audio = { amb: { night: 0.6, wind: 0.25 } };
    SC.load(st); SC.cam = 0;
    SC.add({ x: 124, y: 55, z: 54, draw(ctx, sx, sy, t) { R(ctx, sx - 3, sy - 3, 7, 3, '#8a5a3a'); R(ctx, sx, sy - 5 - (Math.floor(t * 8) % 2), 1, 2, '#ffd27a'); } });
    const j = SC.add({ frames: K.sprites().jesus, x: 106, y: 55, pose: 'sit', facing: 1 });
    const nic = SC.add({ frames: K.who('nicodemus'), x: 280, y: 55, facing: -1, speed: 20 });
    return {
      arrive: async () => { await SC.walk(nic, 144); nic.pose = 'sit'; nic.facing = -1; },
      wind: async () => { AU() && AU().amb({ night: 0.4, wind: 0.9 }); j.pose = 'out'; await SC.wait(900); j.pose = 'sit'; },
      lifted: async () => { AU() && AU().amb({ night: 0.6, wind: 0.25 }); j.pose = 'raise'; await SC.wait(1100); j.pose = 'sit'; },
    };
  };
  VG.nic_feast = function () {
    SC.load({ width: 256, audio: { amb: { room: 0.6, crowd: 0.15 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } }); SC.cam = 0;
    [[10, 124], [26, 124], [12, 134], [30, 134], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].forEach((c, i) => SC.add({ frames: K.sprites().scribe(420 + i), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    const nic = SC.add({ frames: K.who('nicodemus'), x: 46, y: 144, pose: 'sit', facing: 1 });
    const off = [0, 1].map((i) => SC.add({ frames: K.villager(990 + i), x: -10 - i * 14, y: 152, facing: 1, speed: 28 }));
    return {
      officers: async () => { await Promise.all(off.map((o, i) => SC.walk(o, 110 - i * 12))); },
      speak: async () => { nic.pose = 'stand'; nic.y = 152; nic.pose = 'out'; await SC.wait(900); nic.pose = 'stand'; },
    };
  };

  EP.run = async function (game) {
    const P0 = K.sprites();
    const st1 = dusk({ width: 320, audio: { music: 'lament', amb: { wind: 0.5 } }, bg(ctx, t, cam) { ctx.drawImage(K.gateArt(), -cam, 0); } }, 0.3);
    SC.load(st1); SC.cam = 40; SC.camGoal = 40;
    K.gateArt();
    const top = K.golgothaTop;
    K.cross(222, top(222) + 1, { figure: false }); K.cross(252, top(252) + 1, { figure: false, title: true }); K.cross(282, top(282) + 1, { figure: false });
    const women = ['magdalene', 'maryj'].map((n, i) => SC.add({ frames: K.who(n), x: 140 + i * 12, y: 147, facing: 1, speed: 16 }));
    const me = SC.add({ id: 'player', frames: P0.player, x: 170, y: 149, facing: -1, speed: 20 });
    await SC.say({ kind: 'history', text: 'It is the afternoon of the Preparation Day. At sunset the Sabbath begins, and the Law does not allow a body to be left hanging overnight (Deuteronomy 21:22–23).' });
    const joseph = SC.add({ frames: K.who('joseph'), x: 80, y: 146, facing: 1, speed: 24 });
    await sayS('mark15', '15:42', '15:43');
    await SC.walk(joseph, 120);
    await sayS('mark15', '15:44', '15:45');
    const nic = SC.add({ frames: K.who('nicodemus'), x: 80, y: 147, facing: 1, speed: 18 });
    const servants = [0, 1].map((i) => SC.add({ frames: K.villager(1000 + i), x: 64 - i * 14, y: 147 + i, facing: 1, speed: 18, pose: 'carry' }));
    servants.forEach((s, i) => SC.walk(s, 134 - i * 14));
    await SC.walk(nic, 152);
    nic.facing = 1; me.facing = -1;
    await sayS('john19b', '19:38', '19:39');
    await SC.say({ kind: 'drama', speaker: 'Nicodemus', text: 'You came. Good. Joseph has the governor’s permission, and we have until sunset. I need another pair of hands.' });
    const help = await SC.choose('Touching the dead will make you unclean for seven days. You will not eat the Passover with your family (Numbers 9:6). What do you do?', [
      'Help carry him.',
      'Carry the spices only.',
      'Hold back and watch.',
    ]);
    game.setHeart('burial', help);
    game.observe('burial', 'help', ['I helped Joseph and Nicodemus carry his body, and gave up my Passover.', 'I carried the spices for Nicodemus.', 'I held back and watched from the garden wall.'][help], false, true);

    // ---- the garden tomb ----
    await K.fade(async () => {
      const st2 = dusk({ width: 256, audio: { music: 'lament', amb: { wind: 0.4, birds: 0.15 } }, bg(ctx) { ctx.drawImage(K.gardenArt(), 0, 0); } }, 0.32);
      st2.stoneX = 214; st2.cloths = false;
      SC.load(st2); SC.cam = 0; SC.camGoal = 0;
    });
    const GS = SC.stage;
    K.tombStone(GS);
    const bearers = [SC.add({ frames: K.who('joseph'), x: -10, y: 146, facing: 1, speed: 14 }), SC.add({ frames: K.who('nicodemus'), x: -40, y: 147, facing: 1, speed: 14 })];
    const niece = TW.Role.is();
    if (help === 0 && !niece) bearers.push(SC.add({ id: 'player', frames: P0.player, x: -25, y: 148, facing: 1, speed: 14 }));
    const bier = SC.add({ x: -25, y: 147, z: 200, speed: 14, draw(ctx, sx, sy) { if (!bier.hidden) ctx.drawImage(BIER, sx - 17, sy - 30); } });
    const BIER = S.bier(false);
    const srv = [0, 1].map((i) => SC.add({ frames: K.villager(1000 + i), x: -60 - i * 14, y: 146 + i, facing: 1, speed: 14, pose: help === 1 && i === 0 ? 'stand' : 'carry' }));
    let me2 = null;
    if (help === 1 || (help === 0 && niece)) me2 = SC.add({ id: 'player', frames: P0.player, x: -70, y: 149, facing: 1, speed: 14, pose: 'carry' });
    if (help === 2) me2 = SC.add({ id: 'player', frames: P0.player, x: 46, y: 150, facing: 1 });
    const ws = ['magdalene', 'maryj'].map((n, i) => SC.add({ frames: K.who(n), x: -90 - i * 12, y: 148, facing: 1, speed: 14 }));
    bearers.forEach((b, i) => SC.walk(b, 150 + (i % 2 ? -10 : 10) - (i === 2 ? 20 : 0)));
    SC.walk(bier, 150);
    srv.forEach((s, i) => SC.walk(s, 110 - i * 14));
    if (me2 && (help === 1 || (help === 0 && niece))) SC.walk(me2, help === 0 ? 168 : 96);
    ws.forEach((w, i) => SC.walk(w, 40 + i * 12));
    await sayS('john19b', '19:40', '19:42');
    await SC.walk(bier, 184);
    bier.hidden = true;
    await SC.wait(800);
    bearers.forEach((b) => { b.facing = -1; });
    AU() && AU().sfx('crumble');
    await SC.tween(2600, (p) => { GS.stoneX = 214 - p * 28; });
    await sayS('mark15', '15:46', '15:47');
    game.observe('burial', 'laid', 'Joseph and Nicodemus wrapped his body with the spices in linen and laid it in a new tomb in a garden (John 19:40–41).', false, true);
    game.observe('burial', 'stone', 'A stone was rolled against the door of the tomb, and the women saw where he was laid (Mark 15:46–47).', false, true);
    ws.forEach((w) => { w.facing = -1; SC.walk(w, -30); });

    // ---- Nicodemus remembers ----
    bearers.forEach((b) => { if (b.id !== 'player') b.pose = 'sit'; });
    await SC.say({ kind: 'drama', text: 'Joseph goes home before the light fails. Nicodemus sits down on a stone in the garden, his hands still smelling of myrrh, and does not get up.' });
    const asks = [
      { id: 'night', q: 'You knew him before, didn’t you?', scene: 'nic_night', say: [['s', 'john3', '3:1', '3:2'], ['c', 'arrive'], ['s', 'john3', '3:3', '3:4'], ['c', 'wind'], ['s', 'john3', '3:5', '3:8'], ['s', 'john3', '3:9', '3:13'], ['c', 'lifted'], ['s', 'john3', '3:14', '3:16']],
        note: 'Nicodemus came to him by night, and was told, “You must be born anew” (John 3:7).' },
      { id: 'feast', q: 'Did you ever speak up for him in the council?', scene: 'nic_feast', say: [['s', 'john7n', '7:45', '7:49'], ['c', 'speak'], ['s', 'john7n', '7:50', '7:52']],
        note: 'Nicodemus asked the council to give him a hearing first, and they mocked him for it (John 7:50–52).' },
    ];
    const done = {};
    for (;;) {
      const open = asks.filter((a) => !done[a.id]);
      const pick = await SC.choose(open.length === asks.length ? 'What do you ask your teacher?' : 'What else do you ask?', open.map((a) => a.q).concat(['Sit with him in silence']), 'Your question');
      if (pick === open.length) break;
      const a = open[pick];
      done[a.id] = true;
      if (a.id === 'night') await SC.say({ kind: 'drama', speaker: 'Nicodemus', text: 'I went to him at night, so that no one would see me. I am an old man, and I asked him how a man could be born again.' });
      const mem = await VG.enter(a.scene, 'Nicodemus');
      for (const b of a.say) { if (b[0] === 'c') await mem[b[1]](); else await sayS(b[1], b[2], b[3]); }
      await VG.exit();
      if (a.id === 'night') await SC.say({ kind: 'drama', speaker: 'Nicodemus', text: '“So must the Son of Man be lifted up.” I did not understand it then. Tonight I think I do.' });
      else await SC.say({ kind: 'drama', speaker: 'Nicodemus', text: 'They laughed at me. I let them. I should have said more, and sooner.' });
      game.observe('burial', a.id, a.note, false, true);
    }
    await SC.say({ kind: 'drama', text: 'The sun goes down behind the city wall. The Sabbath has begun, and the tomb is sealed.' });
    game.addQuestion(TW.D.episodes.burial.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'burial', 'Write your report by lamplight, when the Sabbath is over.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.burial = EP;
})(window.TW);
