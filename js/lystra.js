/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXVII: Lystra (Acts 14).
   The stoning is shown as Stephen's was: the scene darkens and no stones are seen. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'lystra' };
  const s14 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts14', a, b), text: P.vs('acts14', a, b) });
  const local = (i) => S.person({ skin: K.pick(K.SKINS.concat(['#c49470', '#b8845a']), i, 1), hair: K.pick(K.HAIRS, i, 2), beard: i % 3 ? K.pick(K.HAIRS, i, 2) : null, tunic: ['#8a7a5a', '#6a5a42', '#9a8a6a', '#7a3a2a', '#5a6a5a'][i % 5], veil: i % 4 === 3 ? '#8a6a4a' : null });

  // the temple of Zeus before the city gate, and an ox with garlands
  function lystraStage() {
    const st = { width: 320, dark: 0,
      audio: { music: 'land', amb: { crowd: 0.55, village: 0.35, birds: 0.3, wind: 0.15 } },
      bg(ctx, t, cam) {
        ctx.drawImage(K.nainArt(), -Math.round(cam * 0.5), 0);
        const x = 236 - cam;
        R(ctx, x - 22, 112, 48, 4, '#d8d0bc'); R(ctx, x - 20, 108, 44, 4, '#e6dfcc');
        for (let k = 0; k < 4; k++) R(ctx, x - 18 + k * 12, 84, 4, 24, '#ece6d6');
        R(ctx, x - 22, 80, 48, 4, '#e6dfcc');
        for (let k = 0; k < 12; k++) R(ctx, x - 22 + k * 4, 76 + Math.abs(k - 6) * 0.7, 4, 4 - Math.abs(k - 6) * 0.6, '#ece6d6');
        R(ctx, x - 6, 124, 14, 8, '#cfc4a8'); R(ctx, x - 7, 123, 16, 2, '#e0d8c4');
        if (st.smoke) for (let i = 0; i < 4; i++) R(ctx, x + Math.round(Math.sin(t * 2 + i) * 2), 112 - i * 5 - Math.floor((t * 6) % 5), 2, 2, '#c9c1b2');
      },
      fx(fc, k) { if (st.dark > 0) { fc.fillStyle = 'rgba(8,6,4,' + st.dark + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); } },
    };
    return st;
  }
  function ox(x, y) {
    return SC.add({ x: x, y: y, speed: 10, draw(ctx, sx, sy, t) {
      const step = this.moving ? Math.floor(t * 5) % 2 : 0;
      R(ctx, sx - 12, sy - 14, 22, 9, '#7a5a3a'); R(ctx, sx + 9, sy - 16, 6, 7, '#6a4a2c'); R(ctx, sx + 9, sy - 18, 1, 2, '#e6dfcc'); R(ctx, sx + 14, sy - 18, 1, 2, '#e6dfcc');
      R(ctx, sx - 10, sy - 5, 2, 5 - step, '#5a3e26'); R(ctx, sx + 6, sy - 5, 2, 4 + step, '#5a3e26'); R(ctx, sx - 13, sy - 13, 1, 6, '#5a3e26');
      for (let i = 0; i < 6; i++) R(ctx, sx - 8 + i * 3, sy - 15 + (i % 2), 2, 2, i % 2 ? '#d8b04a' : '#c84a3a');
    } });
  }

  EP.run = async function (game) {
    const P0 = K.sprites();
    // Iconium, briefly
    SC.load({ width: 320, audio: { music: 'land', amb: { crowd: 0.5, city: 0.4 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); } });
    SC.cam = 0; SC.camGoal = 0;
    for (let i = 0; i < 10; i++) SC.add({ frames: local(i), x: 60 + i * 18, y: 147 + (i % 2), facing: i < 5 ? 1 : -1, pose: i % 3 === 0 ? 'out' : 'stand' });
    SC.add({ id: 'player', frames: P0.player, x: 30, y: 148, facing: 1 });
    await s14('14:1', '14:4');
    AU() && AU().music('tension');
    await s14('14:5', '14:7');

    // Lystra
    await K.fade(async () => { SC.load(lystraStage()); SC.cam = 0; SC.camGoal = 0; });
    const L = SC.stage;
    const crowd = [];
    for (let i = 0; i < 12; i++) crowd.push(SC.add({ frames: local(i + 30), x: 30 + i * 14, y: 146 + (i % 3), facing: 1, speed: 26 }));
    const lame = SC.add({ frames: local(55), x: 120, y: 151, pose: 'sit', facing: 1 });
    const paul = SC.add({ frames: K.who('saul'), x: 170, y: 148, facing: -1, speed: 26 });
    const barn = SC.add({ frames: K.who('barnabas'), x: 186, y: 148, facing: -1, speed: 26 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 100, y: 150, facing: 1, speed: 26 });
    await SC.say({ kind: 'history', text: 'Lystra: a small Roman colony on the plain of Lycaonia, where most people spoke their own Lycaonian tongue. Outside the gate stood a temple of Zeus.' });
    paul.pose = 'out';
    await s14('14:8', '14:9');
    await s14('14:10', '14:10');
    paul.pose = 'stand';
    lame.pose = 'stand'; lame.hopping = true;
    AU() && (AU().music('wonder'), AU().sfx('cheer'));
    await SC.wait(1000);
    lame.hopping = false; lame.pose = 'raise';
    crowd.forEach((c, i) => { c.pose = 'raise'; c.hopping = i % 2 === 0; });
    await s14('14:11', '14:12');
    crowd.forEach((c) => { c.hopping = false; });
    await SC.say({ kind: 'drama', text: 'You do not understand a word of Lycaonian. You do not need to. You see them point at Barnabas, the tall one, and at Paul, the one who does the talking.' });
    SC.camGoal = 64;
    const priest = SC.add({ frames: S.person({ skin: '#c49470', hair: '#8a7a6a', beard: '#8a7a6a', tunic: '#f0eadb', mantle: '#d8b04a' }), x: 330, y: 146, facing: -1, speed: 12 });
    const oxen = [ox(350, 146), ox(372, 147)];
    L.smoke = true;
    SC.walk(priest, 214);
    oxen.forEach((o, i) => SC.walk(o, 236 + i * 22));
    await s14('14:13', '14:13');
    paul.pose = 'raise'; barn.pose = 'raise';
    SC.dust(paul.x, 128, 8, { up: true, spread: 6, color: '#e6dfcc' }); SC.dust(barn.x, 128, 8, { up: true, spread: 6, color: '#e6dfcc' });
    AU() && AU().sfx('crash');
    await s14('14:14', '14:14');
    paul.pose = 'out';
    await SC.walk(paul, 200);
    await s14('14:15', '14:17');
    paul.pose = 'stand';
    await s14('14:18', '14:18');
    L.smoke = false;
    game.observe('lystra', 'gods', 'At Lystra a man lame from birth leaped up and walked, and the crowd tried to sacrifice to Paul and Barnabas as Zeus and Hermes (Acts 14:8–18).', false, true);

    // the stoning, shown with restraint
    AU() && AU().music('silence');
    const hostile = [0, 1, 2].map((i) => SC.add({ frames: K.villager(2100 + i), x: -20 - i * 14, y: 147, facing: 1, speed: 28 }));
    await Promise.all(hostile.map((h, i) => SC.walk(h, 140 + i * 12)));
    hostile.forEach((h) => { h.pose = 'out'; });
    crowd.forEach((c) => { c.pose = 'stand'; c.facing = 1; });
    await SC.tween(1500, (p) => { L.dark = p * 0.85; });
    await s14('14:19', '14:19');
    crowd.forEach((c) => { c.visible = false; }); hostile.forEach((h) => { h.visible = false; }); priest.visible = false; oxen.forEach((o) => { o.visible = false; });
    paul.visible = false;
    const fallen = SC.add({ x: 110, y: 150, z: 149, draw(ctx, sx, sy) { ctx.drawImage(S.lying(K.looks.saul), sx - 14, sy - 10); } });
    barn.x = 136; barn.facing = -1;
    const disciples = [0, 1, 2, 3].map((i) => SC.add({ frames: local(70 + i), x: 84 + (i % 2) * 40 + (i > 1 ? 6 : 0), y: 146 + (i > 1 ? 6 : 0), facing: (i % 2) ? -1 : 1 }));
    const tim = SC.add({ frames: S.person({ skin: '#b8845a', hair: '#2a1a12', tunic: '#a89a7a' }), x: 100, y: 155, facing: 1 });
    me.x = 124; me.y = 154; me.facing = -1;
    SC.camGoal = 0; SC.cam = 0;
    await SC.tween(1500, (p) => { L.dark = 0.85 * (1 - p * 0.75); });
    const heart = await SC.choose('Outside the city they have left him in the dust. The disciples stand around him. A boy from the town is crying.', [
      'Kneel in the dust beside him and pray.',
      'Run for water.',
      'Stand with the others, in a ring around him, and wait.',
    ]);
    game.setHeart('lystra', heart);
    if (heart === 0) { me.pose = 'sit'; await SC.say({ kind: 'drama', text: 'You kneel and pray the only words that come: “Lord Jesus.” Over and over. Nothing else.' }); }
    else if (heart === 1) { await SC.walk(me, 30); await SC.walk(me, 124); await SC.say({ kind: 'drama', text: 'You come back with a jar from the well and kneel to wet his lips.' }); }
    else await SC.say({ kind: 'drama', text: 'You stand with the others. No one speaks. Barnabas has not moved since they dragged him out.' });
    await SC.wait(800);
    SC.ents = SC.ents.filter((e) => e !== fallen);
    paul.visible = true; paul.x = 110; paul.y = 150; paul.pose = 'sit';
    AU() && AU().music('wonder');
    await SC.wait(700);
    paul.pose = 'stand';
    await s14('14:20', '14:20');
    me.pose = 'stand';
    await SC.walk(paul, 210);
    await SC.say({ kind: 'history', text: 'Years later Paul would remind Timothy, a young man of Lystra, of what he had suffered at Antioch, Iconium and Lystra (2 Timothy 3:11).' });
    void tim; void disciples;
    game.observe('lystra', 'stoned', 'They stoned Paul and dragged him out of the city for dead. When the disciples stood around him, he got up and went back into the city (Acts 14:19–20).', false, true);

    // home again
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.25 } };
      SC.load(h); SC.cam = 0; SC.camGoal = 0;
    });
    [[40, 1], [56, 1], [72, 1], [88, 1], [168, -1], [184, -1], [200, -1], [216, -1]].forEach((c, i) => SC.add({ frames: local(80 + i), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    const p3 = SC.add({ frames: K.who('saul'), x: 120, y: 146, facing: 1, pose: 'out' });
    SC.add({ frames: K.who('barnabas'), x: 138, y: 146, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 236, y: 148, pose: 'sit', facing: -1 });
    await s14('14:21', '14:23');
    await s14('14:24', '14:26');
    await s14('14:27', '14:28');
    p3.pose = 'stand';
    await K.answerAll(game, 'lystra');
    game.addQuestion(TW.D.episodes.lystra.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'lystra', 'Write it down. All of it, from Perga to here.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.lystra = EP;
})(window.TW);
