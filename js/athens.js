/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXXII: The Unknown God (Acts 17:16–34). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'athens' };
  const s17 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts17', a, b), text: P.vs('acts17', a, b) });
  const athenian = (i) => S.person({ skin: K.pick(K.SKINS.concat(['#c49470', '#c8a07c']), i, 1), hair: K.pick(K.HAIRS, i, 2), beard: i % 4 ? K.pick(K.HAIRS, i, 2) : null, tunic: ['#e6dfcc', '#d8cfb8', '#5a6a7a', '#8a6a4a'][i % 4], mantle: i % 2 ? '#f0eadb' : '#8a7a5a', veil: i % 5 === 4 ? '#c9a86a' : null });

  EP.run = async function (game) {
    const P0 = K.sprites();
    SC.load({ width: 320, audio: { music: 'land', amb: { city: 0.45, crowd: 0.4, birds: 0.25, doves: 0.2 } }, bg(ctx, t, cam) { ctx.drawImage(K.athensArt(), -cam, 0); } });
    SC.cam = 0; SC.camGoal = 0;
    const altar = SC.add({ x: 270, y: 148, z: 148, draw(ctx, sx, sy) { R(ctx, sx - 9, sy - 12, 18, 12, '#d8d0bc'); R(ctx, sx - 10, sy - 13, 20, 2, '#e6dfcc'); for (let k = 0; k < 5; k++) R(ctx, sx - 7 + k * 3, sy - 8, 2, 1, '#6a5a42'); for (let k = 0; k < 4; k++) R(ctx, sx - 6 + k * 3, sy - 5, 2, 1, '#6a5a42'); } });
    const paul = SC.add({ frames: K.who('saul'), x: 60, y: 147, facing: 1, speed: 18 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 40, y: 148, facing: 1, speed: 18 });
    const crowd = [];
    for (let i = 0; i < 8; i++) crowd.push(SC.add({ frames: athenian(i), x: 110 + i * 22, y: 146 + (i % 2) * 2, facing: i % 2 ? 1 : -1 }));
    await SC.say({ kind: 'drama', text: 'Paul is alone in Athens, waiting for Silas and Timothy. Everywhere you look there is a god: in marble on the corners, in bronze at the doors, painted on the walls, carved into the very hill above the city.' });
    await s17('17:16', '17:17');
    const heart = await SC.choose('Your whole upbringing turns away from the statues. What do you do?', [
      'Turn away, and keep your eyes on the paving stones.',
      'Walk with Paul and read the inscriptions with him.',
      'Watch the people instead of the statues.',
    ]);
    game.setHeart('athens', heart);
    if (heart === 1) { SC.camGoal = 64; await Promise.all([SC.walk(paul, 252), SC.walk(me, 236)]); await SC.say({ kind: 'drama', text: 'At the edge of the agora Paul stops at a small altar and reads the inscription aloud, twice, as if he cannot quite believe it.' }); }
    else if (heart === 2) await SC.say({ kind: 'drama', text: 'You watch them instead: a woman leaving a cake of incense at a shrine, an old man touching a statue’s worn foot for luck, a boy asking his father which god is which. They are looking for something.' });
    else await SC.say({ kind: 'drama', text: 'You keep your eyes on the paving stones, and still the city looks back at you from every side.' });
    void altar;
    const phil = [SC.add({ frames: athenian(20), x: 160, y: 146, facing: -1 }), SC.add({ frames: athenian(21), x: 176, y: 147, facing: -1 })];
    phil[0].pose = 'out';
    await s17('17:18', '17:21');
    phil[0].pose = 'stand';

    // ---- the Areopagus ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'reflect', amb: { wind: 0.3, birds: 0.3, crowd: 0.25 } }, bg(ctx, t, cam) { ctx.drawImage(K.athensArt(), -cam, 0); } });
      SC.cam = 64; SC.camGoal = 64;
    });
    const council = [];
    for (let i = 0; i < 10; i++) council.push(SC.add({ frames: athenian(30 + i), x: 130 + i * 15, y: 146 + (i % 2) * 3, facing: -1, pose: i % 3 === 0 ? 'sit' : 'stand' }));
    const dion = council[2], damaris = SC.add({ frames: K.who('romanw'), x: 300, y: 148, facing: -1 });
    const p2 = SC.add({ frames: K.who('saul'), x: 110, y: 146, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: TW.Role.is() ? 290 : 92, y: 149, facing: TW.Role.is() ? -1 : 1 });
    p2.pose = 'out';
    await s17('17:22', '17:23');
    await s17('17:24', '17:26');
    await s17('17:27', '17:29');
    await SC.say({ kind: 'drama', text: '“He is not far from each one of us.” You remember a scribe in the Temple courts, and Jesus telling him he was not far from the Kingdom of God.' });
    await s17('17:30', '17:31');
    p2.pose = 'stand';
    council.forEach((c, i) => { if (i % 3 === 1) c.pose = 'out'; });
    await s17('17:32', '17:33');
    council.forEach((c) => { c.pose = c.pose === 'out' ? 'stand' : c.pose; });
    dion.facing = -1; damaris.facing = -1;
    await SC.walk(dion, 128); await SC.walk(damaris, 140);
    AU() && AU().music('wonder');
    await s17('17:34', '17:34');
    game.observe('athens', 'unknown', 'On the Areopagus Paul proclaimed the unknown God: not far from each one of us, who raised Jesus from the dead (Acts 17:23–31).', false, true);
    game.observe('athens', 'few', 'Some mocked; a few believed, among them Dionysius of the Areopagus and a woman named Damaris (Acts 17:32–34).', false, true);
    await SC.say({ kind: 'drama', text: 'Most of the Areopagus goes home to dinner. Two people stay behind to ask Paul where he is lodging. It does not look like much. You write it down anyway.' });
    game.addQuestion(TW.D.episodes.athens.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'athens', 'Write it down in the shadow of the Acropolis.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.athens = EP;
})(window.TW);
