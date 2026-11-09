/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXVIII: The Council at Jerusalem (Acts 15). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const EP = { id: 'jcouncil' };
  const s15 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts15', a, b), text: P.vs('acts15', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- Antioch: teachers from Judea ----
    const h = K.interiorStage();
    h.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.3 } };
    SC.load(h); SC.cam = 0;
    const greeks = [[40, 1], [56, 1], [72, 1], [88, 1], [168, -1], [184, -1], [200, -1]].map((c, i) => SC.add({ frames: K.villager(2200 + i, i % 3 === 1), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    const teachers = [0, 1].map((i) => SC.add({ frames: P0.scribe(540 + i), x: 120 + i * 14, y: 146, facing: -1 }));
    const paul = SC.add({ frames: K.who('saul'), x: 222, y: 146, facing: -1, speed: 22 });
    const barn = SC.add({ frames: K.who('barnabas'), x: 238, y: 146, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 20, y: 148, pose: 'sit', facing: 1 });
    await SC.say({ kind: 'drama', text: TW.Role.pick('Two teachers have come down from Judea. You know their kind: careful, learned, devout. You were trained in the same school.', 'Two teachers have come down from Judea. You know their kind from your uncle’s table: careful, learned, devout.') });
    teachers[0].pose = 'out';
    await s15('15:1', '15:1');
    greeks.forEach((g) => { g.facing = g.x < 120 ? 1 : -1; });
    await SC.say({ kind: 'drama', text: 'The Greek believers look at one another. Some of them have been baptized for years.' });
    teachers[0].pose = 'stand';
    await SC.walk(paul, 160);
    paul.pose = 'out';
    await s15('15:2', '15:2');
    paul.pose = 'stand';
    void barn;

    // ---- Jerusalem: the apostles and elders ----
    await K.fade(async () => {
      SC.load({ width: 256, hotspots: [], audio: { music: 'tension', amb: { room: 0.6, crowd: 0.2 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
      SC.cam = 0;
    });
    const elders = [];
    [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [222, 124], [242, 124], [204, 134], [240, 134]].forEach((c, i) => elders.push(SC.add({ frames: K.villager(2210 + i), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 })));
    const pharisees = [0, 1, 2].map((i) => SC.add({ frames: P0.scribe(550 + i), x: 176 + i * 14, y: 144, pose: 'sit', facing: -1 }));
    const peter = SC.add({ frames: K.who('peter'), x: 34, y: 144, pose: 'sit', facing: 1 });
    const james = SC.add({ frames: K.who('ananias'), x: 128, y: 152, facing: 1 });
    const p2 = SC.add({ frames: K.who('saul'), x: 80, y: 152, facing: 1 });
    const b2 = SC.add({ frames: K.who('barnabas'), x: 64, y: 152, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: TW.Role.is() ? 12 : 160, y: 153, facing: 1 });
    await s15('15:4', '15:4');
    pharisees.forEach((ph) => { ph.pose = 'stand'; ph.y = 152; ph.pose = 'out'; });
    await s15('15:5', '15:5');
    pharisees.forEach((ph) => { ph.pose = 'stand'; });
    await SC.say({ kind: 'drama', text: TW.Role.pick('They are believers, and Pharisees, and they are saying exactly what you would have said a few years ago. Some of what they say you still believe.', 'They are believers, and Pharisees, and they speak exactly as your uncle’s friends would. Some of what they say you still believe.') });
    const heart = await SC.choose('Where do you stand?', [
      'With the believing Pharisees: the Law is God’s gift, not a burden.',
      'With Peter, when he stands up to speak.',
      'You will listen, and let the apostles and elders decide.',
    ]);
    game.setHeart('jcouncil', heart);
    await s15('15:6', '15:6');
    peter.pose = 'stand'; peter.y = 152; peter.pose = 'out';
    await s15('15:7', '15:9');
    await s15('15:10', '15:11');
    peter.pose = 'stand';
    elders.forEach((e) => { e.facing = 1; });
    p2.pose = 'out'; b2.pose = 'out';
    await s15('15:12', '15:12');
    p2.pose = 'stand'; b2.pose = 'stand';
    james.pose = 'out';
    await s15('15:13', '15:14');
    await SC.say({ kind: 'history', text: 'James quotes the prophet Amos: God will rebuild the fallen tent of David, so that the Gentiles who are called by his name may seek the Lord (Amos 9:11–12).' });
    await s15('15:19', '15:20');
    james.pose = 'stand';
    game.observe('jcouncil', 'peter', 'Peter said, “We believe that we are saved through the grace of the Lord Jesus, just as they are” (Acts 15:11).', false, true);
    await s15('15:22', '15:22');
    await s15('15:28', '15:29');
    game.observe('jcouncil', 'letter', 'The apostles and elders wrote that the Gentiles should not be troubled, only asked to keep a few necessary things (Acts 15:19–29).', false, true);
    if (heart === 0) await SC.say({ kind: 'drama', text: 'One of the believing Pharisees catches your eye on the way out. He looks the way you feel: not defeated, but not sure what to do with what he has heard.' });

    // ---- Antioch again: the letter is read ----
    await K.fade(async () => {
      const h2 = K.interiorStage();
      h2.audio = { music: 'wonder', amb: { room: 0.5, crowd: 0.35 } };
      SC.load(h2); SC.cam = 0;
    });
    const g2 = [[40, 1], [56, 1], [72, 1], [88, 1], [168, -1], [184, -1], [200, -1], [216, -1]].map((c, i) => SC.add({ frames: K.villager(2200 + i, i % 3 === 1), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    const silas = SC.add({ frames: K.who('silas'), x: 128, y: 146, facing: 1, pose: 'out' });
    SC.add({ frames: K.who('saul'), x: 146, y: 146, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 232, y: 148, pose: 'sit', facing: -1 });
    await s15('15:30', '15:31');
    g2.forEach((g, i) => { g.pose = i % 2 ? 'raise' : 'sit'; });
    AU() && AU().sfx('cheer');
    silas.pose = 'stand';
    await SC.wait(900);

    // ---- the parting ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'reflect', amb: { city: 0.4, crowd: 0.3 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); } });
      SC.cam = 0; SC.camGoal = 0;
    });
    const p3 = SC.add({ frames: K.who('saul'), x: 130, y: 147, facing: 1, speed: 18 });
    const b3 = SC.add({ frames: K.who('barnabas'), x: 156, y: 147, facing: -1, speed: 18 });
    const mark = SC.add({ frames: K.who('johnmark'), x: 176, y: 148, facing: -1, speed: 18 });
    const s3 = SC.add({ frames: K.who('silas'), x: 104, y: 148, facing: 1, speed: 18 });
    SC.add({ id: 'player', frames: P0.player, x: 70, y: 149, facing: 1 });
    await s15('15:36', '15:38');
    p3.pose = 'out'; b3.pose = 'out';
    await s15('15:39', '15:40');
    p3.pose = 'stand'; b3.pose = 'stand';
    b3.facing = 1; mark.facing = 1;
    SC.walk(b3, 340); SC.walk(mark, 352);
    p3.facing = -1; s3.facing = -1;
    await SC.say({ kind: 'drama', text: 'Barnabas, who once took Saul by the arm and brought him to the apostles when no one else would, walks away with his cousin toward the harbor. Paul watches him go, and does not call after him.' });
    game.observe('jcouncil', 'parting', 'Paul and Barnabas disagreed so sharply over John Mark that they parted: Barnabas to Cyprus, Paul with Silas (Acts 15:39–40).', false, true);
    game.addQuestion(TW.D.episodes.jcouncil.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'jcouncil', 'Write down what the council decided, and what it cost.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.jcouncil = EP;
})(window.TW);
