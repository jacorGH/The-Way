/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XLVII: The Seven Lamps (Revelation 1–3). The one "like a son of man" is shown only as light. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const EP = { id: 'lamps' };
  const rv = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('rev', a, b), text: P.vs('rev', a, b) });

  function room(audio) {
    const h = K.interiorStage();
    K.nightWrap(h, { dark: 0.3, lights: [{ x: 128, y: 104, r: 60 }] });
    h.audio = audio || { music: 'reflect', amb: { room: 0.5, night: 0.2 } };
    SC.load(h); SC.cam = 0;
    const P0 = K.sprites();
    const people = [[40, 1], [56, 1], [72, 1], [184, -1], [200, -1], [216, -1]].map((c, i) => SC.add({ frames: K.villager(3700 + i, i % 2 === 0), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    const reader = SC.add({ frames: K.who('reader'), x: 128, y: 146, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: 100, y: 148, pose: 'sit', facing: 1 });
    return { reader, people };
  }

  EP.run = async function (game) {
    let r = room();
    await SC.say({ kind: 'drama', text: 'Ephesus, some thirty years after Paul. You are very old. Most of those you knew are gone, Peter and Paul among them. Your eyes are too dim for small letters now, so a girl you taught to read reads for you.' });
    await SC.say({ kind: 'drama', text: 'Tonight a fisherman has come over from Patmos, the prison island, with a scroll hidden in a net. It is from John, the last, they say, of the Twelve. The church has lit every lamp it owns.' });
    r.reader.pose = 'out';
    await rv('1:9', '1:11');

    // ---- the vision ----
    await K.fade(async () => { K.lampStage(); });
    const V = SC.stage;
    const john = SC.add({ frames: K.who('oldjohn'), x: 128, y: 150, facing: 1 });
    await rv('1:12', '1:13');
    await SC.tween(1800, (p) => { V.glow = p; });
    await rv('1:14', '1:16');
    john.pose = 'sit';
    AU() && AU().sfx('chime');
    await rv('1:17', '1:18');
    await SC.say({ kind: 'drama', text: 'You saw him die. You saw the stone rolled away, and the cloths lying where he had been. “I was dead, and behold, I am alive forevermore.” You are too old to stand, but you try.' });
    await rv('1:19', '1:20');
    await SC.tween(1200, (p) => { V.glow = 1 - p; });

    // ---- the letters ----
    await K.fade(async () => { r = room({ music: 'reflect', amb: { room: 0.5, night: 0.2 } }); });
    r.reader.pose = 'out';
    await SC.say({ kind: 'drama', text: 'The first letter is to this very church. The girl looks up, and then reads it.' });
    await rv('2:1', '2:3');
    AU() && AU().music('silence');
    await rv('2:4', '2:5');
    r.people.forEach((p) => { p.facing = p.x < 128 ? 1 : -1; });
    const heart = await SC.choose('“You left your first love.” The room is very still. You are the oldest one here. What was it, at the first?', [
      'A roof torn open in Capernaum, and a man who took up his mat and walked.',
      'A tomb in a garden, with the stone rolled away.',
      'A table where you were welcome before you believed.',
    ]);
    game.setHeart('lamps', heart);
    await SC.say({ kind: 'drama', text: 'You tell them. It takes a long time; you are old, and you forget nothing. When you finish, a young man near the door is crying, and you do not think it is for you.' });
    AU() && AU().music('reflect');
    await rv('2:7', '2:7');
    game.observe('lamps', 'firstlove', 'To the church at Ephesus: “I have this against you, that you left your first love. Remember therefore from where you have fallen” (Revelation 2:4–5).', false, true);
    await SC.say({ kind: 'history', text: 'The scroll was copied and carried on along the road, to each of the seven churches in turn.' });
    await rv('2:8', '2:11');
    await rv('3:14', '3:17');
    await rv('3:18', '3:19');
    AU() && AU().music('wonder');
    await rv('3:20', '3:22');
    r.reader.pose = 'stand';
    game.observe('lamps', 'door', 'To the church at Laodicea: “Behold, I stand at the door and knock” (Revelation 3:20).', false, true);
    game.addQuestion(TW.D.episodes.lamps.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'lamps', 'Tell the girl what to write. She will write it for you.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.lamps = EP;
})(window.TW);
