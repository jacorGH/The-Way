/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXX: Midnight in Philippi (Acts 16:16–40).
   The beating is told, not shown. The jailer's despair is shown no further than Scripture's own words. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'jailer' };
  const s16 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts16', a, b), text: P.vs('acts16', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- the forum: the slave girl ----
    SC.load({ width: 320, dark: 0, audio: { music: 'land', amb: { city: 0.5, crowd: 0.45, birds: 0.15 } },
      bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); },
      fx(fc, k) { const st = SC.stage; if (st.dark > 0) { fc.fillStyle = 'rgba(8,6,4,' + st.dark + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); } } });
    SC.cam = 0; SC.camGoal = 0;
    const F = SC.stage;
    const paul = SC.add({ frames: K.who('saul'), x: 120, y: 147, facing: 1, speed: 20 });
    const silas = SC.add({ frames: K.who('silas'), x: 104, y: 148, facing: 1, speed: 20 });
    const girl = SC.add({ frames: K.who('slavegirl'), x: 70, y: 147, facing: 1, speed: 20, pose: 'out' });
    const masters = [SC.add({ frames: K.who('roman'), x: 30, y: 146, facing: 1, speed: 26 }), SC.add({ frames: S.person({ skin: '#c49470', hair: '#3a2416', beard: '#3a2416', tunic: '#7a5a3a', mantle: '#c99a3a' }), x: 14, y: 147, facing: 1, speed: 26 })];
    const me = SC.add({ id: 'player', frames: P0.player, x: 150, y: 149, facing: -1, speed: 22 });
    await s16('16:16', '16:17');
    await SC.say({ kind: 'drama', text: 'Day after day she follows you through the forum, shouting. What she says is true, and it is terrible to hear it from her: it is not her voice.' });
    paul.facing = -1; paul.pose = 'out';
    await s16('16:18', '16:18');
    girl.pose = 'sit';
    AU() && AU().music('silence');
    await SC.wait(800);
    paul.pose = 'stand';
    await SC.say({ kind: 'drama', text: 'She looks up, bewildered, like someone waking. For the first time you hear her own voice. She asks what day it is.' });
    game.observe('jailer', 'girl', 'In Jesus’ name Paul set free a slave girl from a spirit of divination (Acts 16:18).', false, true);
    AU() && AU().music('tension');
    masters.forEach((m, i) => SC.walk(m, 100 + i * 12));
    await SC.wait(900);
    masters.forEach((m) => { m.pose = 'out'; });
    await s16('16:19', '16:19');
    const mags = [SC.add({ frames: K.who('magistrate'), x: 330, y: 146, facing: -1, speed: 22 }), SC.add({ frames: K.who('magistrate'), x: 346, y: 147, facing: -1, speed: 22 })];
    SC.camGoal = 40;
    await Promise.all(mags.map((m, i) => SC.walk(m, 220 + i * 14)));
    await SC.tween(1400, (p) => { F.dark = p * 0.85; });
    await s16('16:22', '16:23');
    await SC.say({ kind: 'drama', text: 'You cannot reach them through the crowd. You can only hear it.' });
    [paul, silas, girl].concat(masters, mags).forEach((e) => { e.visible = false; });
    me.x = 230;

    // ---- where are you at night? ----
    await SC.tween(1200, (p) => { F.dark = 0.85 * (1 - p * 0.5); });
    const heart = await SC.choose('Night falls. Paul and Silas are in the inner prison with their feet in the stocks. Where are you?', [
      'At the prison gate, with bread and water, as friends of prisoners did.',
      'At Lydia’s house, praying with the others.',
      'Walking the streets outside the prison. You cannot sleep.',
    ]);
    game.setHeart('jailer', heart);
    await SC.say({ kind: 'history', text: 'Roman prisons fed their prisoners little or nothing; friends and family brought food. Lydia’s household would have done what they could.' });

    // ---- midnight ----
    await K.fade(async () => {
      const st = K.interiorStage();
      K.nightWrap(st, { dark: 0.55, lights: [{ x: 236, y: 120, r: 30 }] });
      st.audio = { music: 'silence', amb: { room: 0.6, night: 0.2 } };
      const bg0 = st.bg;
      st.bg = function (ctx, t, cam, sc) { bg0.call(st, ctx, t, cam, sc); for (let x = 60; x < 200; x += 6) R(ctx, x, 60, 2, 86, '#2a2420'); R(ctx, 56, 58, 148, 3, '#3a322a'); };
      SC.load(st); SC.cam = 0;
    });
    const PR = SC.stage;
    K.stocks(124, 150);
    const p2 = SC.add({ frames: K.who('saul'), x: 114, y: 148, pose: 'sit', facing: 1 });
    const s2 = SC.add({ frames: K.who('silas'), x: 134, y: 148, pose: 'sit', facing: -1 });
    const prisoners = [70, 86, 170, 186].map((x, i) => SC.add({ frames: K.villager(2300 + i), x: x, y: 147, pose: 'sit', facing: x < 128 ? 1 : -1 }));
    const jailer = SC.add({ frames: K.who('jailer'), x: 240, y: 146, pose: 'sit', facing: -1, speed: 30 });
    const me2 = SC.add({ id: 'player', frames: P0.player, x: heart === 0 ? 228 : 300, y: 147, facing: -1, speed: 34, visible: heart === 0 });
    await s16('16:24', '16:24');
    p2.pose = 'raise'; s2.pose = 'raise';
    AU() && AU().music('reflect');
    await s16('16:25', '16:25');
    prisoners.forEach((p) => { p.facing = p.x < 124 ? 1 : -1; });
    await SC.say({ kind: 'drama', text: heart === 0 ? 'From the gate you hear it: two voices singing a psalm in the dark, and no one telling them to stop.' : heart === 1 ? 'At Lydia’s house someone says, “Listen,” and from across the sleeping town comes the faint sound of singing.' : 'Outside the prison wall you stop walking. Someone inside is singing.' });
    SC.shake(1800);
    AU() && (AU().sfx('thunder'), AU().sfx('crumble', 0.3), AU().music('wonder'));
    for (let i = 0; i < 40; i++) SC.dust(Math.random() * 256, 70, 1, { spread: 3 });
    await s16('16:26', '16:26');
    prisoners.forEach((p) => { p.pose = 'stand'; });
    jailer.pose = 'stand';
    PR.lights.push({ x: 120, y: 120, r: 70, c: 'rgba(255,248,225,0.18)' });
    jailer.pose = 'out';
    await s16('16:27', '16:27');
    p2.pose = 'stand'; p2.y = 147; p2.pose = 'out';
    await s16('16:28', '16:28');
    p2.pose = 'stand';
    jailer.pose = 'stand';
    if (heart !== 0) { me2.visible = true; await SC.walk(me2, 220); }
    await SC.say({ kind: 'drama', text: 'Someone has to bring a light. It is you. Your hands are shaking so that the lamp flame jumps on the walls.' });
    PR.lights.push({ ent: me2, r: 46, dy: 22, c: 'rgba(255,190,110,0.45)' });
    await SC.walk(jailer, 140);
    jailer.pose = 'sit';
    await s16('16:29', '16:30');
    jailer.pose = 'stand';
    p2.pose = 'out'; s2.pose = 'out';
    await s16('16:31', '16:32');
    p2.pose = 'stand'; s2.pose = 'stand';
    AU() && AU().sfx('splash');
    await s16('16:33', '16:34');
    game.observe('jailer', 'midnight', 'At midnight Paul and Silas were singing in the stocks. The earth shook, every door opened, and the jailer and his household believed (Acts 16:25–34).', false, true);
    await K.answerAll(game, 'jailer');

    // ---- morning, and Lydia's house ----
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.3, birds: 0.3 } };
      SC.load(h); SC.cam = 0;
    });
    [[50, 1], [66, 1], [82, 1], [170, -1], [186, -1], [202, -1]].forEach((c, i) => SC.add({ frames: K.villager(2310 + i, i % 2 === 0), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    SC.add({ frames: K.who('lydia'), x: 216, y: 146, facing: -1 });
    SC.add({ frames: K.who('saul'), x: 120, y: 146, facing: 1, pose: 'out' });
    SC.add({ frames: K.who('silas'), x: 138, y: 146, facing: -1 });
    SC.add({ frames: K.who('jailer'), x: 236, y: 147, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 30, y: 148, facing: 1 });
    await SC.say({ kind: 'history', text: 'In the morning the magistrates sent word to let them go quietly. Paul refused: they were Roman citizens, beaten in public without a trial, and the magistrates had to come and escort them out themselves (Acts 16:35–39).' });
    await s16('16:40', '16:40');
    await SC.say({ kind: 'drama', text: 'Around one table in Lydia’s house: a seller of purple, a jailer and his family, and two men who cannot lean back for their wounds. This is the church in Philippi. Somewhere in the city, a slave girl knows her own voice again; Acts does not tell us what became of her.' });
    game.addQuestion(TW.D.episodes.jailer.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'jailer', 'Write it down. Begin at midnight.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.jailer = EP;
})(window.TW);
