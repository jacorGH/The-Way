/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode IX: The Cross (Mark 15:16–41).
   Shown with restraint: from a distance, the crucified as dark silhouettes, no wounds. The words are Scripture's own. */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'cross' };
  const say = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('mark15', a, b), text: P.vs('mark15', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const st = {
      width: 320, dark: 0, black: 0,
      audio: { music: 'lament', amb: { wind: 0.45, crowd: 0.3, city: 0.2 } },
      bg(ctx, t, cam) { ctx.drawImage(K.gateArt(), -cam, 0); },
      fx(fc, k) {
        if (st.dark > 0) { fc.fillStyle = 'rgba(20,16,24,' + st.dark + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); }
        if (st.black > 0) { fc.fillStyle = 'rgba(6,4,2,' + st.black + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); }
      },
    };
    SC.load(st); SC.cam = 0; SC.camGoal = 0;
    K.gateArt();
    const top = K.golgothaTop;
    const crosses = [K.cross(222, top(222) + 1, { visible: false }), K.cross(252, top(252) + 1, { visible: false, title: true }), K.cross(282, top(282) + 1, { visible: false })];

    const crowd = [];
    [[104, 1], [118, -1], [150, -1], [164, 1], [186, -1]].forEach((c, i) => crowd.push(SC.add({ frames: K.villager(960 + i, i % 2 === 1), x: c[0], y: 146 + (i % 2), facing: c[1], speed: 18 })));
    const women = ['magdalene', 'maryj', 'salome'].map((n, i) => SC.add({ frames: K.who(n), x: 22 + i * 12, y: 147, facing: 1, speed: 16 }));
    const me = SC.add({ id: 'player', frames: P0.player, x: 132, y: 149, facing: -1, speed: 22 });

    await SC.say({ kind: 'drama', text: 'Morning. The council has handed him to Pilate, and Pilate has handed him to the soldiers. You stand by the road outside the gate with the crowd.' });
    await say('15:16', '15:20');
    // out through the gate
    const sold = [0, 1, 2].map((i) => SC.add({ frames: K.who('soldier'), x: 80, y: 146 + (i % 2), facing: 1, speed: 13, visible: false }));
    const cent = SC.add({ frames: K.who('centurion'), x: 80, y: 145, facing: 1, speed: 13, visible: false });
    const jesus = SC.add({ frames: P0.jesus, x: 80, y: 147, facing: 1, speed: 13, visible: false });
    const simon = SC.add({ frames: K.who('simon'), x: 150, y: 148, facing: -1, speed: 13 });
    SC.add({ x: 0, y: 0, z: 999, draw(ctx) { if (!simon.carrying) return; const sx = Math.round(simon.x - SC.cam), sy = simon.y; R(ctx, sx - 13, sy - 18, 26, 3, '#5a4632'); R(ctx, sx - 13, sy - 18, 26, 1, '#6e5a42'); } });
    const order = [[cent, 0], [sold[0], 300], [jesus, 700], [sold[1], 1100], [sold[2], 1400]];
    order.forEach((o) => SC.wait(o[1]).then(() => { o[0].visible = true; return SC.walk(o[0], 126 - o[1] / 40); }));
    await SC.wait(2600);
    await SC.walk(simon, 132);
    simon.facing = -1;
    await say('15:21', '15:21');
    simon.carrying = true; simon.facing = 1;
    crowd.forEach((c) => { c.facing = c.x < 140 ? 1 : -1; });
    SC.camGoal = 64;
    const pathTo = [[cent, 208], [sold[0], 220], [jesus, 236], [simon, 248], [sold[1], 262], [sold[2], 276]];
    pathTo.forEach((p, i) => SC.wait(i * 250).then(() => SC.walkPath(p[0], [[176, p[0].y], [p[1], top(p[1]) + 1]])));
    await say('15:22', '15:22');
    await SC.wait(1500);
    simon.carrying = false;

    const where = await SC.choose('They have reached the place. Where do you stand?', [
      'Near the road, with the crowd and the scribes.',
      'Far off, with the women from Galilee.',
    ]);
    if (where === 0) await SC.walk(me, 196);
    else { women.forEach((w, i) => SC.walk(w, 132 + i * 12)); await SC.walk(me, 120); me.facing = 1; }
    game.observe('cross', 'stood', where === 0 ? 'I stood near the road where the crowd and my teachers stood.' : 'I stood far off, with the women who had followed him from Galilee.', false, true);

    // the crucifixion itself is not shown, only told
    await SC.tween(1200, (p) => { st.black = p * 0.9; });
    await say('15:23', '15:25');
    [jesus, simon].forEach((e) => { e.visible = false; });
    crosses.forEach((c) => { c.visible = true; });
    sold.forEach((s, i) => { s.x = 214 + i * 30; s.y = top(s.x) + 2; s.facing = -1; s.pose = 'stand'; });
    cent.x = 240; cent.y = top(240) + 4; cent.facing = 1;
    simon.visible = false;
    await say('15:26', '15:28');
    await SC.tween(1500, (p) => { st.black = 0.9 * (1 - p); });
    game.observe('cross', 'title', 'Over him was written the charge: “THE KING OF THE JEWS” (Mark 15:26).', false, true);

    // the mockers
    const passers = [0, 1, 2].map((i) => SC.add({ frames: K.villager(980 + i), x: 330 + i * 16, y: 146 + (i % 2), facing: -1, speed: 16 }));
    passers.forEach((p, i) => SC.walk(p, 150 + i * 14).then(() => { p.facing = 1; p.pose = 'out'; }));
    await say('15:29', '15:30');
    const priests = [SC.add({ frames: K.who('caiaphas'), x: 186, y: 141, facing: 1 }), SC.add({ frames: P0.scribe(51), x: 198, y: 142, facing: 1 }), SC.add({ frames: P0.scribe(52), x: 172, y: 143, facing: 1 })];
    priests.forEach((p, i) => { p.pose = i % 2 ? 'out' : 'stand'; });
    await say('15:31', '15:32');
    const heart = await SC.choose('Two of the men laughing at the foot of the hill taught you the Law. What do you do?', [
      'Say nothing.',
      'Turn your back on them.',
      'Keep your eyes on him.',
    ]);
    game.setHeart('cross', heart);
    if (heart === 1) me.facing = -1;
    passers.forEach((p) => { p.pose = 'stand'; p.facing = -1; SC.walk(p, 60); });

    // darkness
    AU() && AU().music('silence');
    AU() && AU().amb({ wind: 0.8 });
    await SC.tween(3500, (p) => { st.dark = p * 0.62; });
    await say('15:33', '15:33');
    await say('15:34', '15:34');
    const s0 = sold[0];
    await say('15:35', '15:36');
    s0.pose = 'raise';
    await SC.wait(900);
    s0.pose = 'stand';
    await say('15:37', '15:37');
    AU() && AU().amb({ wind: 0.25 });
    await SC.wait(1800);
    AU() && AU().sfx('crumble');
    await say('15:38', '15:38');
    await SC.say({ kind: 'history', text: 'The veil hung before the Most Holy Place in the Temple, where only the high priest went, once a year.' });
    cent.facing = 1;
    await say('15:39', '15:39');
    game.observe('cross', 'cried', 'At the ninth hour he cried, “My God, my God, why have you forsaken me?” (Mark 15:34).', false, true);
    game.observe('cross', 'centurion', 'The centurion who stood facing him said, “Truly this man was the Son of God!” (Mark 15:39).', false, true);
    await SC.tween(3000, (p) => { st.dark = 0.62 * (1 - p * 0.6); });
    AU() && AU().music('lament');
    await say('15:40', '15:41');
    crowd.forEach((c) => { c.facing = -1; SC.walk(c, -20); });
    priests.forEach((p) => { p.facing = -1; SC.walk(p, -20); });
    await SC.say({ kind: 'drama', text: 'People drift back toward the gate. The women do not move. Neither do you.' });
    game.addQuestion(TW.D.episodes.cross.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'cross', 'Stay with the women until evening. Then write what you saw.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.cross = EP;
})(window.TW);
