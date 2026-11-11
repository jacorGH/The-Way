/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XLIII: The Letter to Philippi (Philippians). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'letter' };
  const ph = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('phil', a, b), text: P.vs('phil', a, b) });
  Object.assign(K.looks, {
    epaphroditus: { skin: '#c49470', hair: '#3a2416', beard: '#3a2416', tunic: '#a89a7a', mantle: '#6a5a42' },
  });
  // a writing desk with a sheet and an inkpot
  const desk = (x, y) => SC.add({ x: x, y: y, z: y, draw(ctx, sx, sy) { R(ctx, sx - 14, sy - 10, 28, 3, '#6e5034'); R(ctx, sx - 12, sy - 7, 2, 7, '#5a3e26'); R(ctx, sx + 10, sy - 7, 2, 7, '#5a3e26'); R(ctx, sx - 8, sy - 12, 14, 2, '#efe6cf'); R(ctx, sx + 8, sy - 13, 3, 3, '#2a2018'); } });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- Rome: the letter is written ----
    const h = K.interiorStage();
    h.audio = { music: 'reflect', amb: { room: 0.5, city: 0.35 } };
    SC.load(h); SC.cam = 0;
    const paul = SC.add({ frames: K.who('saul'), x: 100, y: 146, facing: 1, pose: 'sit' });
    SC.add({ frames: K.who('soldier'), x: 78, y: 146, facing: 1 });
    SC.add({ x: 90, y: 136, z: 147, draw(ctx, sx, sy) { for (let k = 0; k < 6; k++) R(ctx, sx - 6 + k * 2, sy + 1, 2, 1, k % 2 ? '#8a8a90' : '#a8a8b0'); } });
    const epa = SC.add({ frames: K.who('epaphroditus'), x: 190, y: 147, facing: -1, pose: 'sit' });
    desk(140, 150);
    SC.add({ id: 'player', frames: P0.player, x: 146, y: 150, pose: 'sit', facing: -1 });
    await SC.say({ kind: 'drama', text: 'Epaphroditus came from Philippi with a gift for Paul, and then nearly died of a fever in Rome. He is well enough to travel now. Paul wants to send a letter back with him, and he wants you to write it.' });
    await SC.say({ kind: 'history', text: 'Paul usually dictated his letters to a scribe and added the last lines in his own hand (Romans 16:22; Galatians 6:11).' });
    paul.pose = 'out';
    await SC.say({ kind: 'drama', text: 'He paces as far as the chain allows, and talks. You write as fast as you can. Sometimes he stops in the middle of a sentence and says nothing for a long time, and you wait with the pen lifted.' });
    await ph('1:3', '1:6');
    await ph('1:12', '1:14');
    await ph('1:21', '1:24');
    paul.pose = 'sit';
    await SC.say({ kind: 'drama', text: niece ? 'At one point he stops pacing and begins to sing under his breath, and you realize the next lines are a song the churches already know. You write them down as he sings.' : 'At one point he stops pacing and begins to sing under his breath, and you realize the next lines are a song the churches already know. Your pen keeps time.' });
    AU() && AU().music('wonder');
    await ph('2:5', '2:11');
    AU() && AU().music('reflect');
    epa.pose = 'stand';
    await ph('2:25', '2:28');
    game.observe('letter', 'hymn', 'In chains, Paul wrote that Christ Jesus emptied himself, took the form of a servant, and humbled himself to the death of the cross (Philippians 2:5–8).', false, true);

    // ---- the road home ----
    await K.fade(async () => { const st = K.seaStage({ audio: { music: 'land', amb: { shore: 0.8, wind: 0.3 } } }); void st; });
    SC.add({ frames: K.who('epaphroditus'), x: 118, y: 124, z: 137, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: 104, y: 124, z: 137, facing: 1 });
    await SC.say({ kind: 'drama', text: 'Brundisium, the crossing to Greece, the Via Egnatia east across Macedonia. The letter rides inside your cloak the whole way, against your chest.' });

    // ---- Lydia's house ----
    await K.fade(async () => {
      const l = K.interiorStage();
      l.audio = { music: 'reflect', amb: { room: 0.5, birds: 0.25 } };
      SC.load(l); SC.cam = 0;
    });
    const lydia = SC.add({ frames: K.who('lydia'), x: 60, y: 146, facing: 1, pose: 'sit' });
    SC.add({ frames: K.who('jailer'), x: 196, y: 147, facing: -1, pose: 'sit' });
    const euodia = SC.add({ frames: S.person({ skin: '#c49470', hair: '#2a1a12', tunic: '#a8743a', veil: '#5a6a7a' }), x: 40, y: 147, facing: 1, pose: 'sit' });
    const syntyche = SC.add({ frames: S.person({ skin: '#b8845a', hair: '#3a2416', tunic: '#5a6a5a', veil: '#8a6a4a' }), x: 214, y: 147, facing: -1, pose: 'sit' });
    [76, 92, 168, 182].forEach((x, i) => SC.add({ frames: K.villager(3300 + i, i % 2 === 0), x: x, y: 148, pose: 'sit', facing: x < 128 ? 1 : -1 }));
    SC.add({ frames: K.who('epaphroditus'), x: 230, y: 146, facing: -1 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 128, y: 146, facing: 1 });
    await SC.say({ kind: 'drama', text: 'The same room where the church began, years ago, with a few women from the riverbank. Now it is full. Epaphroditus is home, alive, and everyone wants to hold him. Then they all sit down, and look at you.' });
    me.pose = 'out';
    await ph('1:1', '1:2');
    await ph('1:3', '1:7');
    await SC.say({ kind: 'drama', text: 'Lydia is weeping before you finish the first sentence. The jailer, grey now, has his eyes shut.' });
    await ph('3:4', '3:8');
    await ph('3:13', '3:14');
    await ph('4:1', '4:1');
    me.pose = 'stand';
    const heart = await SC.choose('The next line names two women who have not spoken to each other in months. Both are sitting in this room.', [
      'Read it plainly, exactly as it is written.',
      'Read it gently, looking at each of them.',
      'Hand the letter to Lydia for that part.',
    ]);
    game.setHeart('letter', heart);
    if (heart === 2) { lydia.pose = 'stand'; }
    await ph('4:2', '4:3');
    euodia.facing = 1; syntyche.facing = -1;
    await SC.say({ kind: 'drama', text: heart === 1 ? 'Euodia looks at the floor. Syntyche looks at Euodia. Neither moves, but neither leaves.' : heart === 2 ? 'Lydia reads it in her merchant’s voice, the one that closes bargains. Then she sets the letter down and looks at both of them until they look at each other.' : 'You read it as Paul said it. The room goes very quiet.' });
    lydia.pose = 'sit';
    me.pose = 'out';
    AU() && AU().music('wonder');
    await ph('4:4', '4:7');
    await ph('4:11', '4:13');
    await ph('4:21', '4:23');
    me.pose = 'stand';
    await K.answerAll(game, 'letter');
    game.observe('letter', 'rejoice', 'In Lydia’s house I read Paul’s letter aloud: “Rejoice in the Lord always! Again I will say, Rejoice!” (Philippians 4:4).', false, true);
    game.addQuestion(TW.D.episodes.letter.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'letter', 'Write it down. This time you are writing about a letter you wrote.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.letter = EP;
})(window.TW);
