/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXXIX: Almost Persuaded (Acts 25:13–26:32). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'agrippa' };
  const s25 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts25', a, b), text: P.vs('acts25', a, b) });
  const s26 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts26', a, b), text: P.vs('acts26', a, b) });
  Object.assign(K.looks, {
    agrippa: { skin: '#c49470', hair: '#3a2416', beard: '#3a2416', tunic: '#e6dfcc', mantle: '#6a2a7a', stripe: '#d8b04a' },
    bernice: { skin: '#c8a07c', hair: '#2a1a12', tunic: '#e6dfcc', veil: '#7a2a6a', stripe: '#d8b04a' },
  });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // the hall of hearing, with purple hangings
    const st = { width: 256, audio: { music: 'jerusalem', amb: { room: 0.5, crowd: 0.3 } },
      bg(ctx) {
        ctx.drawImage(K.atriumArt(), 0, 0);
        for (let k = 0; k < 4; k++) { R(ctx, 30 + k * 60, 40, 14, 46, '#5a2a6a'); R(ctx, 30 + k * 60, 40, 14, 3, '#d8b04a'); R(ctx, 34 + k * 60, 86, 6, 4, '#d8b04a'); }
        R(ctx, 160, 132, 70, 6, '#cfc4a8'); R(ctx, 158, 130, 74, 3, '#e6dfcc');
      } };
    SC.load(st); SC.cam = 0;
    await s25('25:13', '25:13');
    await SC.say({ kind: 'drama', text: 'Festus tells the king about his strange prisoner, and the case he cannot make sense of.' });
    await s25('25:19', '25:19');
    await s25('25:22', '25:22');
    AU() && AU().sfx('cheer', 0.3);
    const agrippa = SC.add({ frames: K.who('agrippa'), x: 186, y: 132, z: 133, pose: 'sit', facing: -1 });
    const bernice = SC.add({ frames: K.who('bernice'), x: 204, y: 132, z: 133, pose: 'sit', facing: -1 });
    const festus = SC.add({ frames: K.who('festus'), x: 168, y: 133, z: 134, pose: 'sit', facing: -1 });
    [[226, 'soldier'], [242, 'soldier'], [20, 'roman'], [34, 'tribune'], [48, 'roman'], [62, 'romanw']].forEach((c) => SC.add({ frames: K.who(c[1]), x: c[0], y: 148, facing: c[0] > 128 ? -1 : 1 }));
    SC.add({ id: 'player', frames: P0.player, x: niece ? 76 : 90, y: 150, facing: 1 });
    const paul = SC.add({ frames: K.who('saul'), x: -10, y: 149, facing: 1, speed: 14 });
    await SC.walk(paul, 128);
    await s25('25:23', '25:23');
    festus.pose = 'out';
    await s25('25:26', '25:27');
    festus.pose = 'sit';
    agrippa.pose = 'out';
    await s26('26:1', '26:1');
    agrippa.pose = 'sit';
    paul.pose = 'out';
    AU() && AU().music('reflect');
    await s26('26:2', '26:3');
    await s26('26:4', '26:8');
    await s26('26:9', '26:11');
    await SC.say({ kind: 'drama', text: 'You remember him as he was then: the young man guarding the cloaks while they stoned Stephen. He does not spare himself a word of it.' });
    await s26('26:12', '26:15');
    await s26('26:16', '26:18');
    await s26('26:19', '26:21');
    await s26('26:22', '26:23');
    await K.answerAll(game, 'agrippa');
    festus.pose = 'raise';
    AU() && AU().music('tension');
    await s26('26:24', '26:24');
    festus.pose = 'sit';
    paul.pose = 'out';
    await s26('26:25', '26:27');
    agrippa.pose = 'out';
    await s26('26:28', '26:28');
    agrippa.pose = 'sit';
    AU() && AU().music('silence');
    paul.pose = 'raise';
    await s26('26:29', '26:29');
    const heart = await SC.choose('“Not only you, but also all that hear me today.” You are one of them. In your heart, you answer him.', [
      '“I am such as you are.”',
      '“Almost.”',
      '“Not yet. But I am still writing.”',
    ]);
    game.setHeart('agrippa', heart);
    paul.pose = 'stand';
    AU() && AU().music('wonder');
    await SC.say({ kind: 'drama', text: heart === 0 ? 'Paul’s eyes find yours across the hall for a moment, as if he heard.' : heart === 1 ? 'The king said almost too. You wonder whether he ever got further. You wonder whether you will.' : 'You look down at the scroll in your hands, years of it now, and keep writing.' });
    agrippa.pose = 'stand'; bernice.pose = 'stand'; festus.pose = 'stand';
    await s26('26:30', '26:32');
    game.observe('agrippa', 'almost', 'Agrippa said to Paul, “With a little persuasion are you trying to make me a Christian?” (Acts 26:28).', false, true);
    game.observe('agrippa', 'innocent', 'The king and the governor agreed: “This man does nothing worthy of death or of bonds” (Acts 26:31).', false, true);
    game.addQuestion(TW.D.episodes.agrippa.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'agrippa', 'Write it down. Your own answer too.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.agrippa = EP;
})(window.TW);
