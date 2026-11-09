/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XLII: Rome (Acts 28:11–31). The end of Acts. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'rome' };
  const s28 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts28', a, b), text: P.vs('acts28', a, b) });
  const roman = (i) => S.person({ skin: K.pick(K.SKINS.concat(['#c49470', '#c8a07c']), i, 1), hair: K.pick(K.HAIRS, i, 2), beard: i % 3 ? K.pick(K.HAIRS, i, 2) : null, tunic: ['#e6dfcc', '#8a6a4a', '#5a6a7a', '#a8743a'][i % 4], veil: i % 3 === 2 ? '#8a6a4a' : null });

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- from Malta to Puteoli ----
    const sea = K.seaStage({ audio: { music: 'land', amb: { shore: 0.8, wind: 0.3 } } });
    [['saul', 112], ['luke', 126], ['aristarchus', 140], ['julius', 154]].forEach((c) => SC.add({ frames: K.who(c[0]), x: c[1], y: 124, z: 137, facing: 1 }));
    SC.add({ id: 'player', frames: P0.player, x: 98, y: 124, z: 137, facing: 1 });
    await s28('28:11', '28:13');
    await SC.tween(1800, (p) => { sea.land = p; });
    await s28('28:14', '28:14');
    await K.answerAll(game, 'rome');

    // ---- the Appian Way ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'wonder', amb: { birds: 0.5, wind: 0.2, crowd: 0.2 } }, bg(ctx, t, cam) { ctx.drawImage(K.appianArt(), -cam, 0); } });
      SC.cam = 0; SC.camGoal = 32;
    });
    const paul = SC.add({ frames: K.who('saul'), x: 40, y: 148, facing: 1, speed: 14 });
    const guard = SC.add({ frames: K.who('soldier'), x: 24, y: 148, facing: 1, speed: 14 });
    SC.add({ frames: K.who('luke'), x: 10, y: 149, facing: 1, speed: 14 });
    const me = SC.add({ id: 'player', frames: P0.player, x: -6, y: 150, facing: 1, speed: 14 });
    const friends = [0, 1, 2, 3, 4, 5].map((i) => SC.add({ frames: roman(i), x: 330 + i * 14, y: 147 + (i % 2), facing: -1, speed: 26 }));
    SC.walk(paul, 150); SC.walk(guard, 134); SC.walk(me, 104);
    await Promise.all(friends.map((f, i) => SC.walk(f, 172 + i * 14)));
    friends.forEach((f) => { f.pose = 'raise'; });
    AU() && AU().sfx('cheer', 0.4);
    await s28('28:15', '28:15');
    friends.forEach((f) => { f.pose = 'stand'; });
    await SC.say({ kind: 'drama', text: 'Some of them know Paul only from a letter he once wrote to them, before he had ever seen their city. One of them can recite it. They have walked forty miles to meet a man in chains.' });
    game.observe('rome', 'appian', 'Believers from Rome walked out along the Appian Way to meet Paul. When he saw them, he thanked God and took courage (Acts 28:15).', false, true);

    // ---- the rented house ----
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, city: 0.4 } };
      SC.load(h); SC.cam = 0;
    });
    const p2 = SC.add({ frames: K.who('saul'), x: 128, y: 146, facing: 1, pose: 'sit' });
    const sold = SC.add({ frames: K.who('soldier'), x: 104, y: 146, facing: 1 });
    // the chain from the soldier's wrist to Paul's
    SC.add({ x: 116, y: 136, z: 147, draw(ctx, sx, sy) { for (let k = 0; k < 10; k++) R(ctx, sx - 8 + k * 2, sy + (k > 2 && k < 7 ? 2 : 1), 2, 1, k % 2 ? '#8a8a90' : '#a8a8b0'); } });
    SC.add({ id: 'player', frames: P0.player, x: 220, y: 148, pose: 'sit', facing: -1 });
    void sold;
    await s28('28:16', '28:16');
    const leaders = [0, 1, 2, 3, 4].map((i) => SC.add({ frames: roman(20 + i), x: 160 + i * 14, y: 147, pose: 'sit', facing: -1 }));
    p2.pose = 'stand'; p2.pose = 'out';
    await s28('28:17', '28:20');
    leaders[0].pose = 'out';
    await s28('28:21', '28:22');
    leaders[0].pose = 'sit';
    await s28('28:23', '28:24');
    leaders.forEach((l, i) => { if (i % 2) l.pose = 'stand'; });
    await s28('28:25', '28:27');
    await s28('28:28', '28:29');
    leaders.forEach((l) => { l.visible = false; });
    p2.pose = 'sit';

    // ---- two whole years ----
    AU() && AU().music('wonder');
    const visitors = [0, 1, 2, 3, 4, 5, 6].map((i) => SC.add({ frames: roman(40 + i), x: 150 + i * 12, y: 147 + (i % 2), facing: -1, pose: 'sit' }));
    void visitors;
    await s28('28:30', '28:31');
    await SC.say({ kind: 'history', text: 'Here Luke’s account ends: not with Paul’s trial or his death, but with the word going out “without hindrance,” the last word of the book.' });
    const heart = await SC.choose('Your scroll is full. Years of it: a roof in Capernaum, a tomb in a garden, a storm off Crete. What will you do with it?', [
      'Give it to Luke.',
      'Read it aloud to the believers in Rome.',
      'Keep writing.',
    ]);
    game.setHeart('rome', heart);
    await SC.say({ kind: 'drama', text: heart === 0 ? 'Luke takes it in both hands, the way you once saw a priest lift the Law. “I will be careful with it,” he says. You know he will.' : heart === 1 ? 'They crowd into the rented room to hear it, Romans and Jews and Greeks, slaves and freedmen, and the soldier on the chain listens too.' : 'You cut a fresh sheet and sharpen your reed. The story is not finished. It never was.' });
    game.observe('rome', 'end', 'In Rome Paul stayed two whole years in his own rented house, welcoming all who came, teaching about the Lord Jesus Christ with all boldness, without hindrance (Acts 28:30–31).', false, true);
    game.addQuestion(TW.D.episodes.rome.question);
    SC.toast('You have reached the end of Acts');
    K.finish(game, 'rome', 'Write the last lines of your account. Or the next ones.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.rome = EP;
})(window.TW);
