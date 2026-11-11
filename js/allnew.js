/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XLVIII: All Things New (Revelation 21–22). The last episode. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'allnew' };
  const rv = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('rev', a, b), text: P.vs('rev', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- Patmos: John writes ----
    K.shoreStage({ audio: { music: 'reflect', amb: { shore: 0.8, wind: 0.3, birds: 0.2 } } });
    const john = SC.add({ frames: K.who('oldjohn'), x: 128, y: 148, pose: 'sit', facing: 1 });
    SC.add({ x: 144, y: 150, z: 150, draw(ctx, sx, sy) { R(ctx, sx - 8, sy - 6, 16, 2, '#efe6cf'); R(ctx, sx - 9, sy - 7, 2, 4, '#8a6a42'); R(ctx, sx + 7, sy - 7, 2, 4, '#8a6a42'); } });
    await SC.say({ kind: 'drama', text: 'Patmos: bare rock, salt wind, and an old man writing. He was a fisherman’s son from Galilee. He stood at the cross. He ran to the tomb. He has outlived them all, and he is still writing down what he sees.' });
    john.pose = 'raise';

    // ---- the vision ----
    await K.fade(async () => { K.newCityStage(); });
    const N = SC.stage;
    AU() && AU().sfx('chime');
    await rv('21:1', '21:2');
    await SC.tween(2000, (p) => { N.light = p; });
    await rv('21:3', '21:4');
    await rv('21:5', '21:7');
    await K.answerAll(game, 'allnew');
    await rv('21:22', '21:25');
    await rv('22:1', '22:2');
    await rv('22:3', '22:5');

    // ---- the last page ----
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'wonder', amb: { room: 0.4, birds: 0.5 } };
      SC.load(h); SC.cam = 0;
    });
    const reader = SC.add({ frames: K.who('reader'), x: 140, y: 146, facing: -1, pose: 'out' });
    const me = SC.add({ id: 'player', frames: P0.player, x: 108, y: 148, pose: 'sit', facing: 1 });
    await SC.say({ kind: 'drama', text: 'It is nearly dawn in Ephesus. The others have gone home. The girl is still reading to you, and there is only a little of the scroll left in her right hand.' });
    await rv('22:16', '22:17');
    const heart = await SC.choose('“He who hears, let him say, ‘Come!’” She stops, and waits for you. Your own scroll lies open on your knees, with room for one more line.', [
      '“Amen. Come, Lord Jesus.”',
      '“I was there. It is true.”',
      '“Read it, and see for yourself.”',
    ]);
    game.setHeart('allnew', heart);
    reader.pose = 'stand';
    await SC.say({ kind: 'drama', text: 'She writes it for you, in a young, clear hand, under all the years of yours. Then she reads the end.' });
    reader.pose = 'out';
    await rv('22:20', '22:21');
    reader.pose = 'stand';
    me.pose = 'sit';
    AU() && AU().sfx('chime');
    if (TW.Discover) await SC.say({ kind: 'drama', text: TW.Discover.endingLine() });
    await SC.say({ kind: 'drama', text: 'You began as someone sent to watch a carpenter from Nazareth, to see whether there was anything in it. You have told what you saw. The scroll is hers now, and whoever she reads it to.' });
    game.observe('allnew', 'new', '“Behold, I am making all things new” (Revelation 21:5).', false, true);
    game.observe('allnew', 'come', '“He who is thirsty, let him come. He who desires, let him take the water of life freely” (Revelation 22:17).', false, true);
    game.addQuestion(TW.D.episodes.allnew.question);
    SC.toast('You have reached the end of the account');
    K.finish(game, 'allnew', 'The last line is yours.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.allnew = EP;
})(window.TW);
