/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXXIII: Corinth (Acts 18:1–18). The beating of Sosthenes is told, not shown. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'corinth' };
  const s18 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts18', a, b), text: P.vs('acts18', a, b) });
  Object.assign(K.looks, {
    aquila: { skin: '#b07a50', hair: '#3a2416', beard: '#3a2416', tunic: '#8a7a5a', belt: '#5a3e26' },
    priscilla: { skin: '#c49470', hair: '#2a1a12', tunic: '#a8743a', veil: '#5a6a7a' },
    gallio: { skin: '#c8a07c', hair: '#8a7a6a', tunic: '#f0eadb', stripe: '#6a1a2a', mantle: '#f4f0e6' },
  });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- the workshop ----
    const h = K.interiorStage();
    h.audio = { music: 'reflect', amb: { room: 0.5, city: 0.3 } };
    const bg0 = h.bg;
    h.bg = function (ctx, t, cam, sc) { bg0.call(h, ctx, t, cam, sc); for (let k = 0; k < 5; k++) { R(ctx, 30 + k * 44, 70, 30, 34, k % 2 ? '#8a6a42' : '#a8865a'); R(ctx, 30 + k * 44, 70, 30, 2, '#5a3e26'); } R(ctx, 70, 126, 116, 4, '#6e5034'); R(ctx, 74, 130, 3, 16, '#5a3e26'); R(ctx, 178, 130, 3, 16, '#5a3e26'); };
    SC.load(h); SC.cam = 0;
    SC.add({ frames: K.who('aquila'), x: 100, y: 147, pose: 'sit', facing: 1 });
    SC.add({ frames: K.who('priscilla'), x: 156, y: 147, pose: 'sit', facing: -1 });
    const paul = SC.add({ frames: K.who('saul'), x: 128, y: 147, pose: 'sit', facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: niece ? 176 : 80, y: 148, pose: 'sit', facing: niece ? -1 : 1 });
    await SC.say({ kind: 'drama', text: 'After Athens, Paul is quiet. He came to Corinth, he will later write, “in weakness, in fear, and in much trembling.” For now he cuts goat-hair cloth and says little.' });
    await s18('18:1', '18:3');
    await SC.say({ kind: 'drama', text: niece ? 'Priscilla shows you how to wax the thread and set the awl. She talks while she sews, about Rome, about the night they had to leave, about the Scriptures, which she knows better than most men you have met.' : 'Aquila shows you how to wax the thread and set the awl. Your stitches are crooked. He unpicks them without a word and hands the work back to you.' });
    paul.pose = 'sit';

    // ---- the synagogue, and the house next door ----
    await K.fade(async () => {
      SC.load({ width: 256, hotspots: [], audio: { music: 'tension', amb: { room: 0.55, crowd: 0.3 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
      SC.cam = 0;
    });
    const seats = [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].map((c, i) => SC.add({ frames: K.villager(2500 + i, i % 3 === 1), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    const crispus = SC.add({ frames: K.villager(2520), x: 196, y: 152, facing: -1 });
    const p2 = SC.add({ frames: K.who('saul'), x: 128, y: 152, facing: 1, pose: 'out', speed: 22 });
    SC.add({ frames: K.who('silas'), x: 100, y: 152, facing: 1 });
    SC.add({ frames: K.who('timothy'), x: 84, y: 152, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: niece ? 236 : 62, y: 153, facing: niece ? -1 : 1 });
    await s18('18:4', '18:5');
    seats.slice(0, 4).forEach((s) => { s.pose = 'out'; });
    p2.pose = 'raise';
    SC.dust(p2.x, 132, 10, { up: true, spread: 8, color: '#c8b89a' });
    await s18('18:6', '18:6');
    p2.pose = 'stand';
    await SC.walk(p2, 270);
    await s18('18:7', '18:7');
    crispus.facing = 1;
    await SC.walk(crispus, 270);
    AU() && AU().music('wonder');
    await s18('18:8', '18:8');
    await SC.say({ kind: 'drama', text: 'The ruler of the synagogue walks next door to the house where Paul has gone. Half the room watches him go.' });

    // ---- the vision in the night ----
    await K.fade(async () => {
      const n = K.interiorStage();
      K.nightWrap(n, { dark: 0.45, lights: [{ x: 128, y: 120, r: 60, c: 'rgba(255,248,225,0.35)' }] });
      n.audio = { music: 'night', amb: { room: 0.4, night: 0.4 } };
      SC.load(n); SC.cam = 0;
    });
    const p3 = SC.add({ frames: K.who('saul'), x: 128, y: 147, pose: 'sit', facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: 200, y: 148, pose: 'sit', facing: -1 });
    await SC.say({ kind: 'drama', text: 'You wake in the night. Paul is on his knees by the window, and the room is full of a light that does not come from the lamp.' });
    p3.pose = 'raise';
    AU() && AU().sfx('chime');
    await s18('18:9', '18:10');
    p3.pose = 'sit';
    await s18('18:11', '18:11');
    game.observe('corinth', 'vision', 'In the night the Lord told Paul, “Don’t be afraid… for I am with you… for I have many people in this city” (Acts 18:9–10).', false, true);

    // ---- Gallio's judgment seat ----
    await K.fade(async () => {
      SC.load({ width: 320, dark: 0, audio: { music: 'tension', amb: { city: 0.5, crowd: 0.7 } }, bg(ctx, t, cam) { ctx.drawImage(K.corinthArt(), -cam, 0); },
        fx(fc, k) { const st = SC.stage; if (st.dark > 0) { fc.fillStyle = 'rgba(8,6,4,' + st.dark + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); } } });
      SC.cam = 32; SC.camGoal = 32;
    });
    const F = SC.stage;
    K.bema(190, 140);
    const gallio = SC.add({ frames: K.who('gallio'), x: 190, y: 128, z: 141, pose: 'sit', facing: -1 });
    const accusers = [0, 1, 2, 3].map((i) => SC.add({ frames: K.villager(2530 + i), x: 110 + i * 13, y: 148, facing: 1, speed: 24 }));
    const sosthenes = accusers[0];
    const p4 = SC.add({ frames: K.who('saul'), x: 160, y: 150, facing: 1 });
    const greeks = [0, 1, 2, 3, 4].map((i) => SC.add({ frames: K.villager(2540 + i), x: 230 + i * 14, y: 147 + (i % 2), facing: -1, speed: 26 }));
    SC.add({ id: 'player', frames: P0.player, x: 80, y: 150, facing: 1, speed: 24 });
    accusers.forEach((a) => { a.pose = 'out'; });
    await s18('18:12', '18:13');
    accusers.forEach((a) => { a.pose = 'stand'; });
    p4.pose = 'out';
    await SC.wait(400);
    gallio.pose = 'sit';
    await s18('18:14', '18:15');
    p4.pose = 'stand';
    await s18('18:16', '18:16');
    accusers.slice(1).forEach((a) => { a.facing = -1; SC.walk(a, -20); });
    greeks.forEach((g, i) => SC.walk(g, 128 + i * 6));
    await SC.wait(700);
    await SC.tween(1200, (p) => { F.dark = p * 0.8; });
    await s18('18:17', '18:17');
    const heart = await SC.choose('They are beating the ruler of the synagogue in front of the judgment seat, and the proconsul is looking the other way.', [
      'Push through the crowd toward Sosthenes.',
      'Stand back, sick at heart.',
      'Pray for him: the man who just accused you.',
    ]);
    game.setHeart('corinth', heart);
    await SC.tween(1000, (p) => { F.dark = 0.8 * (1 - p); });
    greeks.forEach((g) => { g.visible = false; });
    sosthenes.pose = 'sit';
    await SC.say({ kind: 'drama', text: heart === 0 ? 'By the time you reach him the crowd has had its fill and drifted away. You help him sit up. He looks at you, a believer from Jerusalem, and does not understand why you came.' : heart === 1 ? 'When the crowd drifts away he is sitting alone in the dust below the judgment seat. You cannot stop thinking about it.' : 'You pray for him by name, and are surprised to find that you mean it.' });
    await SC.say({ kind: 'history', text: 'Years later, Paul’s first letter to this city was sent from Paul “and our brother Sosthenes” (1 Corinthians 1:1). It may be the same man.' });
    void gallio;
    game.observe('corinth', 'gallio', 'The proconsul Gallio refused to judge “questions about words and names and your own law” and drove the accusers from the judgment seat (Acts 18:14–16).', false, true);

    // ---- Cenchreae ----
    await K.fade(async () => { K.seaStage({ audio: { music: 'reflect', amb: { shore: 0.8, wind: 0.3 } } }); });
    [['saul', 112], ['priscilla', 126], ['aquila', 140]].forEach((c) => SC.add({ frames: K.who(c[0]), x: c[1], y: 124, z: 137, facing: 1 }));
    await s18('18:18', '18:18');
    await SC.say({ kind: 'drama', text: 'You stand on the quay at Cenchreae and watch the ship go: Paul with his head newly shaved, and Priscilla and Aquila, who left Rome with nothing and are leaving Corinth with a church.' });
    game.addQuestion(TW.D.episodes.corinth.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'corinth', 'Write it down on the quay at Cenchreae.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.corinth = EP;
})(window.TW);
