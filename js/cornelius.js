/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXII: Peter and Cornelius (Acts 10:1–11:18). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'cornelius' };
  const s10 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts10', a, b), text: P.vs('acts10', a, b) });
  const s11 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts11', a, b), text: P.vs('acts11', a, b) });
  const glowFx = (st) => function (fc, k, t, cam) {
    if (!st.glow) return;
    fc.globalCompositeOperation = 'lighter';
    const x = ((st.gx || 128) - cam) * k, y = (st.gy || 110) * k;
    const g = fc.createRadialGradient(x, y, 0, x, y, (st.gr || 50) * k);
    g.addColorStop(0, 'rgba(255,250,232,' + st.glow + ')'); g.addColorStop(1, 'rgba(255,250,232,0)');
    fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
    fc.globalCompositeOperation = 'source-over';
  };
  function atrium(extra) {
    const st = Object.assign({ width: 256, glow: 0, audio: { music: 'reflect', amb: { room: 0.45, city: 0.2 } }, bg(ctx) { ctx.drawImage(K.atriumArt(), 0, 0); } }, extra || {});
    st.fx = glowFx(st);
    SC.load(st); SC.cam = 0; SC.camGoal = 0;
    return st;
  }

  // Peter's trance, as he later told it
  TW.Vignettes.sheet = function () {
    const A = K.art();
    const st = { width: 256, sheetY: null, audio: { amb: { wind: 0.3 } }, bg(ctx) { ctx.drawImage(A.sky, 0, 0); ctx.drawImage(A.sky, 0, 40, 256, 40, 0, 80, 256, 80); } };
    SC.load(st); SC.cam = 0;
    K.sheet(st);
    const peter = SC.add({ frames: K.who('peter'), x: 128, y: 150, pose: 'sit', facing: 1 });
    const down = () => SC.tween(1600, (p) => { st.sheetY = -30 + p * 100; });
    const up = () => SC.tween(900, (p) => { st.sheetY = 70 - p * 110; });
    return {
      down: async () => { AU() && AU().sfx('chime'); await down(); },
      refuse: async () => { peter.pose = 'out'; await SC.wait(700); peter.pose = 'sit'; },
      thrice: async () => { await up(); await down(); await up(); await down(); },
      up: async () => { await up(); st.sheetY = null; },
    };
  };

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- Caesarea, the ninth hour ----
    const C = atrium();
    const corn = SC.add({ frames: K.who('centurion'), x: 128, y: 150, pose: 'sit', facing: 1 });
    await SC.say({ kind: 'history', text: 'Meanwhile, about fifty kilometers up the coast in Caesarea, the most Roman city in the land.' });
    await s10('10:1', '10:2');
    C.gx = 160; C.gy = 120;
    const angel = SC.add({ frames: K.who('angel'), x: 160, y: 150, facing: -1, visible: false });
    await SC.tween(1200, (p) => { C.glow = p * 0.6; });
    angel.visible = true; corn.facing = 1;
    await s10('10:3', '10:6');
    angel.visible = false;
    await SC.tween(900, (p) => { C.glow = 0.6 * (1 - p); });
    corn.pose = 'stand';
    const envoys = [SC.add({ frames: K.villager(1700), x: 20, y: 150, facing: 1, speed: 24 }), SC.add({ frames: K.villager(1701), x: 6, y: 151, facing: 1, speed: 24 }), SC.add({ frames: K.who('soldier'), x: -10, y: 150, facing: 1, speed: 24 })];
    await Promise.all(envoys.map((e, i) => SC.walk(e, 96 - i * 12)));
    await s10('10:7', '10:8');
    envoys.forEach((e) => { e.facing = -1; SC.walk(e, -30); });
    await SC.wait(900);

    // ---- Joppa, the next day at noon ----
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'land', amb: { room: 0.3, shore: 0.45, birds: 0.3 } };
      const bg0 = h.bg;
      h.bg = function (ctx, t, cam, sc) { bg0.call(h, ctx, t, cam, sc); R(ctx, 182, 140, 26, 3, '#7a5a3a'); R(ctx, 186, 137, 6, 3, '#c99a58'); R(ctx, 196, 136, 6, 4, '#9a6a44'); };
      SC.load(h); SC.cam = 0; SC.camGoal = 0;
    });
    const peter = SC.add({ frames: K.who('peter'), x: 120, y: 147, facing: 1, speed: 20 });
    const simon = SC.add({ frames: K.who('tanner'), x: 200, y: 147, facing: -1 });
    const wife = SC.add({ frames: TW.S.person({ skin: '#a06a42', hair: '#2a1a12', tunic: '#6a5a42', veil: '#5a4a3a' }), x: 214, y: 148, pose: 'sit', facing: -1 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 176, y: 148, facing: 1, speed: 22 });
    void simon; void wife;
    await SC.say({ kind: 'drama', text: 'Noon in the tanner’s house. You are helping Simon’s wife with the bread when Peter climbs the outside stairs to the roof to pray.' });
    await SC.walkPath(peter, [[230, 147], [244, 100], [150, 55]]);
    peter.pose = 'sit';
    await s10('10:9', '10:10');
    const mem = await TW.Vignettes.enter('sheet', 'Peter');
    await s10('10:11', '10:12');
    await mem.down();
    await s10('10:13', '10:13');
    await mem.refuse();
    await s10('10:14', '10:15');
    await mem.thrice();
    await s10('10:16', '10:16');
    await mem.up();
    await TW.Vignettes.exit();
    game.observe('cornelius', 'vision', 'Peter saw a sheet full of unclean animals, and heard, “What God has cleansed, you must not call unclean” (Acts 10:15).', false, true);

    // the knock at the gate
    const men = [SC.add({ frames: K.villager(1700), x: -10, y: 147, facing: 1, speed: 20 }), SC.add({ frames: K.villager(1701), x: -26, y: 148, facing: 1, speed: 20 }), SC.add({ frames: K.who('soldier'), x: -42, y: 147, facing: 1, speed: 20 })];
    await Promise.all(men.map((m, i) => SC.walk(m, 20 - i * 12)));
    AU() && AU().sfx('tap');
    await SC.walk(me, 40);
    me.facing = -1;
    await s10('10:17', '10:18');
    await SC.say({ kind: 'drama', text: 'You are the one who opens the gate. Two household servants and a soldier of Rome stand in the street of a Jewish house, asking for Peter by name.' });
    await s10('10:19', '10:20');
    peter.pose = 'stand';
    await SC.walkPath(peter, [[244, 100], [230, 147], [60, 147]]);
    peter.facing = -1;
    await s10('10:21', '10:22');
    await s10('10:23', '10:23');
    game.observe('cornelius', 'gate', 'Men sent by a Roman centurion came to the tanner’s gate, and Peter took them in as his guests (Acts 10:23).', false, true);

    // ---- Caesarea: the house of Cornelius ----
    await K.fade(async () => { atrium(); });
    const A2 = SC.stage;
    const household = [];
    [[150, 'roman'], [166, 'romanw'], [182, 'roman'], [198, 'romanw'], [214, 'roman'], [230, 'soldier']].forEach((h, i) => household.push(SC.add({ frames: K.who(h[1]), x: h[0], y: 148 + (i % 2) * 3, facing: -1 })));
    const corn2 = SC.add({ frames: K.who('centurion'), x: 120, y: 149, facing: -1, speed: 22 });
    const p2 = SC.add({ frames: K.who('peter'), x: 18, y: 148, facing: 1, speed: 20 });
    const brothers = [0, 1].map((i) => SC.add({ frames: K.villager(1710 + i), x: 2 - i * 12, y: 149, facing: 1, speed: 20 }));
    const me2 = SC.add({ id: 'player', frames: P0.player, x: 30, y: 150, facing: 1, speed: 20 });
    await s10('10:24', '10:24');
    await SC.say({ kind: 'drama', text: 'The doorway is painted red and gold. Beyond it the floor is a mosaic of a kind you have only heard described. You have never in your life crossed a Gentile’s threshold.' });
    const heart = await SC.choose('Peter stops at the door for a moment. So do you.', [
      'Step over the threshold behind Peter.',
      'Wait in the doorway.',
      'Go in first, so that he will not be the only one.',
    ]);
    game.setHeart('cornelius', heart);
    if (heart === 2) await SC.walk(me2, 64);
    await SC.walk(p2, 72);
    if (heart === 0) await SC.walk(me2, 50);
    corn2.facing = -1;
    await SC.walk(corn2, 86);
    corn2.pose = 'sit';
    await s10('10:25', '10:26');
    corn2.pose = 'stand';
    await s10('10:27', '10:29');
    await s10('10:30', '10:33');
    p2.pose = 'out';
    await s10('10:34', '10:36');
    await s10('10:37', '10:39');
    await s10('10:40', '10:43');
    // the Spirit falls
    A2.gx = 170; A2.gy = 80; A2.gr = 120;
    AU() && (AU().sfx('chime'), AU().music('wonder'), AU().sfx('cheer', 0.4));
    await SC.tween(1400, (p) => { A2.glow = p * 0.5; });
    household.concat([corn2]).forEach((h, i) => { h.pose = i % 2 ? 'raise' : 'out'; });
    p2.pose = 'stand';
    await s10('10:44', '10:46');
    if (heart === 1) { await SC.walk(me2, 50); await SC.say({ kind: 'drama', text: 'You are inside before you have decided to be.' }); }
    await SC.say({ kind: 'drama', text: 'The brothers from Joppa stare. So do you. It is the same as Pentecost: the same gift, the same praise in other languages, on Romans.' });
    await SC.tween(900, (p) => { A2.glow = 0.5 * (1 - p * 0.6); });
    household.forEach((h) => { h.pose = 'stand'; });
    p2.pose = 'out';
    await s10('10:47', '10:47');
    corn2.pose = 'stand';
    await SC.walk(corn2, 112, 141);
    corn2.pose = 'sit';
    AU() && AU().sfx('splash');
    SC.dust(112, 138, 6, { up: true, spread: 6, color: '#d8ecec' });
    await s10('10:48', '10:48');
    corn2.pose = 'stand';
    game.observe('cornelius', 'spirit', 'While Peter was still speaking, the Holy Spirit fell on the Gentiles, and they were baptized in the name of Jesus Christ (Acts 10:44–48).', false, true);
    await K.answerAll(game, 'cornelius');

    // ---- Jerusalem: they contend with Peter ----
    await K.fade(async () => {
      const ct = K.courtStage(false);
      ct.audio = { music: 'tension', amb: { crowd: 0.4, city: 0.4 } };
      SC.load(ct); SC.cam = 0; SC.camGoal = 0;
    });
    const critics = [0, 1, 2, 3].map((i) => SC.add({ frames: P0.scribe(520 + i), x: 150 + i * 14, y: 148 + (i % 2), facing: -1 }));
    const p3 = SC.add({ frames: K.who('peter'), x: 110, y: 148, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: 84, y: 149, facing: 1 });
    critics[0].pose = 'out';
    await s11('11:1', '11:4');
    critics[0].pose = 'stand';
    p3.pose = 'out';
    await SC.say({ kind: 'drama', text: 'He tells them everything in order: the roof, the sheet, the men at the gate, the house in Caesarea.' });
    await s11('11:15', '11:17');
    p3.pose = 'stand';
    critics.forEach((c) => { c.pose = 'raise'; });
    AU() && AU().music('reflect');
    await s11('11:18', '11:18');
    game.addQuestion(TW.D.episodes.cornelius.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'cornelius', 'Write down who God has made clean.');
    void R;
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.cornelius = EP;
})(window.TW);
