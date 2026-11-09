/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXXVII: The Forty Who Swore (Acts 23). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const EP = { id: 'plot' };
  const s23 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts23', a, b), text: P.vs('acts23', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- the council ----
    SC.load({ width: 256, hotspots: [], audio: { music: 'tension', amb: { room: 0.6, crowd: 0.2 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
    SC.cam = 0;
    const sadducees = [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134]].map((c, i) => SC.add({ frames: K.villager(2900 + i), x: c[0], y: c[1], pose: 'sit', facing: 1 }));
    const pharisees = [[222, 124], [242, 124], [204, 134], [240, 134]].map((c, i) => SC.add({ frames: P0.scribe(600 + i), x: c[0], y: c[1], pose: 'sit', facing: -1 }));
    const hp = SC.add({ frames: K.who('highpriest'), x: 70, y: 146, pose: 'sit', facing: 1 });
    const paul = SC.add({ frames: K.who('saul'), x: 128, y: 152, facing: -1 });
    SC.add({ frames: K.who('tribune'), x: 160, y: 154, facing: -1 });
    const me = SC.add({ id: 'player', frames: P0.player, x: niece ? 250 : 222, y: niece ? 154 : 144, pose: niece ? 'stand' : 'sit', facing: -1 });
    await SC.say({ kind: 'drama', text: niece ? 'The Roman commander has summoned the council. You slip in behind the servants at the door, as you did the night they tried Jesus, and stand where you can see.' : 'The Roman commander has summoned the council. You take your old place on the scribes’ bench, among the Pharisees. Some of them still greet you by name.' });
    await s23('23:1', '23:1');
    await SC.say({ kind: 'history', text: 'At this the high priest Ananias ordered Paul struck on the mouth, and Paul answered him sharply, not knowing he was the high priest (23:2–5).' });
    hp.pose = 'out';
    await SC.wait(400);
    hp.pose = 'sit';
    paul.pose = 'raise';
    await s23('23:6', '23:6');
    paul.pose = 'stand';
    AU() && AU().sfx('cheer', 0.4);
    sadducees.forEach((s) => { s.pose = 'out'; });
    await s23('23:7', '23:8');
    pharisees.slice(0, 2).forEach((p) => { p.pose = 'stand'; });
    const heart = await SC.choose(niece ? 'Some of the Pharisees’ scribes are rising to their feet. One of them is an old friend of your uncle’s.' : 'Some of the scribes of the Pharisees are rising to their feet. They are your teachers and your friends.', niece ? [
      'Catch your uncle’s friend’s eye, and nod.',
      'Stay still by the door, and watch the council tear itself apart.',
      'Slip out to wait by the barracks.',
    ] : [
      'Stand up with them.',
      'Stay seated, and watch the council tear itself apart.',
      'Slip out to wait by the barracks.',
    ]);
    game.setHeart('plot', heart);
    if (heart === 0) { if (!niece) { me.pose = 'stand'; me.y = 144; } pharisees.forEach((p) => { p.pose = 'stand'; }); }
    else if (heart === 2) { me.pose = 'stand'; me.facing = 1; await SC.walk(me, 290); me.visible = false; }
    pharisees.slice(0, 2).forEach((p) => { p.pose = 'out'; });
    await s23('23:9', '23:9');
    if (heart === 0 && !niece) await SC.say({ kind: 'drama', text: 'You hear your own voice among theirs: “We find no evil in this man.” Years ago you sat on this same bench and said nothing.' });
    SC.shake(500);
    AU() && AU().sfx('crash', 0.4);
    await s23('23:10', '23:10');
    paul.visible = false;

    // ---- the barracks at night ----
    await K.fade(async () => {
      const n = K.interiorStage();
      K.nightWrap(n, { dark: 0.55, lights: [{ x: 128, y: 120, r: 58, c: 'rgba(255,248,225,0.3)' }] });
      n.audio = { music: 'night', amb: { room: 0.5, night: 0.3 } };
      SC.load(n); SC.cam = 0;
    });
    const p2 = SC.add({ frames: K.who('saul'), x: 128, y: 147, pose: 'sit', facing: 1 });
    p2.pose = 'raise';
    AU() && AU().sfx('chime');
    await s23('23:11', '23:11');
    p2.pose = 'sit';
    await K.answerAll(game, 'plot');

    // ---- the oath, and the boy ----
    await K.fade(async () => { const c = K.courtStage(true); SC.load(c); SC.cam = 120; SC.camGoal = 120; });
    K.antonia();
    const forty = [];
    for (let i = 0; i < 10; i++) forty.push(SC.add({ frames: K.villager(2920 + i), x: 110 + (i % 5) * 12, y: 144 + Math.floor(i / 5) * 6, facing: 1, pose: i % 3 ? 'stand' : 'raise' }));
    AU() && AU().music('tension');
    await s23('23:12', '23:13');
    forty.forEach((f) => { f.pose = 'stand'; });
    const boy = SC.add({ frames: K.who('nephew'), x: 100, y: 150, facing: 1, speed: 36 });
    const me2 = SC.add({ id: 'player', frames: P0.player, x: 200, y: 152, facing: -1, speed: 30 });
    await SC.say({ kind: 'drama', text: 'A boy is crouched behind a pillar where no one is looking at him. When the men move off he runs, straight past you, toward the barracks stairs.' });
    await SC.walk(boy, 236, 132);
    await s23('23:16', '23:17');
    boy.visible = false;
    void me2;
    await SC.say({ kind: 'history', text: 'The centurion took the boy to the commander, who heard him privately and told him to say nothing to anyone (23:18–22).' });

    // ---- the night march ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'night', amb: { night: 0.5, wind: 0.3 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); },
        fx(fc, k) { fc.fillStyle = 'rgba(10,14,32,0.62)'; fc.fillRect(0, 0, 256 * k, 160 * k); } });
      SC.cam = 0; SC.camGoal = 64;
    });
    AU() && AU().travel('walk');
    const column = [];
    for (let i = 0; i < 9; i++) column.push(SC.add({ frames: K.who('soldier'), x: -20 - i * 16, y: 146 + (i % 2) * 3, facing: 1, speed: 26 }));
    const horses = [0, 1, 2].map((i) => K.horse(-40 - i * 30, 152, K.looks.tribune));
    const rider = K.horse(-60, 156, K.looks.saul);
    await s23('23:23', '23:24');
    await Promise.all(column.map((c, i) => SC.walk(c, 300 - i * 16)).concat(horses.map((h, i) => SC.walk(h, 260 - i * 30)), [SC.walk(rider, 230)]));
    await s23('23:31', '23:31');
    AU() && AU().travel('');

    // ---- Caesarea ----
    await K.fade(async () => {
      const g = K.interiorStage();
      g.audio = { music: 'reflect', amb: { room: 0.4, shore: 0.3 } };
      SC.load(g); SC.cam = 0;
    });
    SC.add({ frames: K.who('roman'), x: 150, y: 146, pose: 'sit', facing: -1 });
    SC.add({ frames: K.who('saul'), x: 110, y: 147, facing: 1 });
    SC.add({ frames: K.who('soldier'), x: 86, y: 147, facing: 1 });
    await s23('23:33', '23:33');
    await SC.say({ kind: 'history', text: 'The governor Felix read the commander’s letter, asked which province Paul came from, and said:' });
    await s23('23:35', '23:35');
    game.observe('plot', 'cheer', 'In the barracks at night the Lord stood by Paul: “Cheer up, Paul, for as you have testified about me at Jerusalem, so you must testify also at Rome” (Acts 23:11).', false, true);
    game.observe('plot', 'nephew', 'Paul’s sister’s son overheard the plot of more than forty men and warned him; the commander sent Paul to Caesarea by night (Acts 23:16–33).', false, true);
    await SC.say({ kind: 'drama', text: 'You follow the road to Caesarea two days behind the soldiers. When you get there, he is in Herod’s palace, under guard, and he asks the guard to let you in.' });
    game.addQuestion(TW.D.episodes.plot.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'plot', 'Write it down in Caesarea, outside Herod’s palace.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.plot = EP;
})(window.TW);
