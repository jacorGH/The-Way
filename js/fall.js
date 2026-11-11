/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XLVI: Not One Stone (Luke 21). The siege itself is told, not shown. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const EP = { id: 'fall' };
  const l21 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('luke21', a, b), text: P.vs('luke21', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- a memory: the Mount of Olives, forty years before ----
    const then = K.jerusalemStage(0, { music: 'reflect', amb: { wind: 0.25, birds: 0.4, doves: 0.2 } });
    const jesus = SC.add({ frames: P0.jesus, x: 150, y: 148, facing: -1 });
    [['peter', 110], ['john', 126]].forEach((c) => SC.add({ frames: K.who(c[0]), x: c[1], y: 149, facing: 1 }));
    [70, 88].forEach((x, i) => SC.add({ frames: K.villager(3600 + i), x: x, y: 150, facing: 1 }));
    SC.add({ id: 'player', frames: P0.player, x: 196, y: 150, facing: -1 });
    TW.Audio && TW.Audio.memory && TW.Audio.memory(true);
    await SC.say({ kind: 'drama', text: 'You are old now, and you remember a spring day forty years ago. The Temple stood across the valley, white and gold, so bright in the sun you could hardly look at it. Someone said how beautiful the stones were.' });
    jesus.pose = 'out';
    await l21('21:5', '21:6');
    jesus.pose = 'stand';
    await SC.say({ kind: 'drama', text: niece ? 'You were a girl then. You thought: no one could throw down stones like those.' : 'You were a young scribe then. You thought: no one could throw down stones like those.' });
    await l21('21:20', '21:21');
    TW.Audio && TW.Audio.memory && TW.Audio.memory(false);
    void then;

    // ---- the flight ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'tension', amb: { wind: 0.5, crowd: 0.3 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); } });
      SC.cam = 0; SC.camGoal = 64;
    });
    const refugees = [];
    for (let i = 0; i < 8; i++) refugees.push(SC.add({ frames: K.villager(3610 + i, i % 2 === 0), x: -10 - i * 18, y: 147 + (i % 3), facing: 1, speed: 14 }));
    const me = SC.add({ id: 'player', frames: P0.player, x: -30, y: 150, facing: 1, speed: 14 });
    refugees.forEach((r, i) => SC.walk(r, 280 - i * 18));
    SC.walk(me, 200);
    await SC.say({ kind: 'history', text: 'AD 66. Judea rises against Rome. Legions march south. By later tradition, the believers of Jerusalem remembered his words, left the city, and crossed the Jordan to Pella.' });
    await SC.say({ kind: 'drama', text: 'You leave with them. You lock a door you will never open again, and you do not look back until the ridge, and then you do.' });
    await SC.say({ kind: 'history', text: 'AD 70. Titus surrounds the city at Passover, when it is crowded with pilgrims. The siege lasts through the summer. Hunger does what the legions cannot. In late summer the Temple burns.' });

    // ---- the ruins ----
    await K.fade(async () => { K.jerusalemStage(1, { music: 'silence', amb: { wind: 0.6 } }); });
    const me2 = SC.add({ id: 'player', frames: P0.player, x: 150, y: 150, facing: -1 });
    await SC.say({ kind: 'drama', text: 'Months later you climb the Mount of Olives one last time. Where the Temple stood there is smoke-blackened rubble. The great stones lie in heaps at the foot of the platform, exactly where the soldiers levered them over.' });
    await l21('21:22', '21:24');
    const heart = await SC.choose(niece ? 'This was your uncle’s city, and yours. The place where you learned to pray is gone.' : 'You were trained in those courts. The place where you learned to pray is gone.', [
      'Tear your garment, and weep.',
      'Say the Shema over the ruins.',
      'Remember his words, and lift up your head.',
    ]);
    game.setHeart('fall', heart);
    if (heart === 0) { me2.pose = 'sit'; await SC.say({ kind: 'drama', text: 'You sit down in the dust where he once wept over this city, and you weep over it too.' }); }
    else if (heart === 1) { me2.pose = 'raise'; await SC.say({ kind: 'drama', text: '“Hear, Israel, the Lord our God, the Lord is one.” Your voice is the only sound on the hill. It is still true.' }); }
    else { me2.pose = 'raise'; }
    AU() && AU().music('reflect');
    await l21('21:28', '21:28');
    me2.pose = 'stand';
    await l21('21:33', '21:33');
    await SC.say({ kind: 'drama', text: 'Everything he said about this place has happened. You open your scroll, there on the hill, and find the page where you wrote it down forty years ago in a young hand.' });
    game.observe('fall', 'stone', 'Jesus said of the Temple that not one stone would be left on another (Luke 21:6). In AD 70 it was burned and thrown down.', false, true);
    game.observe('fall', 'words', '“Heaven and earth will pass away, but my words will by no means pass away” (Luke 21:33).', false, true);
    game.addQuestion(TW.D.episodes.fall.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'fall', 'Write it down, beside what you wrote forty years ago.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.fall = EP;
})(window.TW);
