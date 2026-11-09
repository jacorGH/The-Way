/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XLI: Malta (Acts 28:1–10). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'malta' };
  const s28 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts28', a, b), text: P.vs('acts28', a, b) });
  const islander = (i) => S.person({ skin: K.pick(['#a8724a', '#8a5a3a', '#b8845a', '#9a6a46'], i, 1), hair: '#2a1a12', beard: i % 2 ? '#2a1a12' : null, tunic: ['#6a5a42', '#8a7a5a', '#5a4a3a'][i % 3], veil: i % 3 === 2 ? '#7a6a52' : null });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- the beach ----
    K.beachStage();
    const wet = [];
    [30, 46, 62, 172, 188, 206, 222].forEach((x, i) => wet.push(SC.add({ frames: K.villager(3200 + i), x: x, y: 148, pose: 'sit', facing: x < 118 ? 1 : -1 })));
    const isl = [0, 1, 2, 3].map((i) => SC.add({ frames: islander(i), x: 84 + i * 12 + (i > 1 ? 40 : 0), y: 146, facing: i > 1 ? -1 : 1 }));
    const paul = SC.add({ frames: K.who('saul'), x: 240, y: 148, facing: -1, speed: 18 });
    SC.add({ id: 'player', frames: P0.player, x: 150, y: 150, pose: 'sit', facing: -1 });
    await s28('28:1', '28:2');
    await SC.say({ kind: 'drama', text: 'They do not speak Greek, or Aramaic, or Latin. They speak with their hands: a blanket, a cup of something hot, a place nearer the fire. No one has been this kind to you in a long time.' });
    await SC.walk(paul, 132);
    paul.pose = 'out';
    await SC.wait(500);
    await s28('28:3', '28:3');
    const viper = SC.add({ x: 0, y: 0, z: 152, draw(ctx, sx, sy, t) { const hx = paul.x - SC.cam + 6, hy = 134; for (let k = 0; k < 8; k++) R(ctx, hx + k, hy + Math.round(Math.sin(t * 8 + k) * 1.5) + k, 2, 2, k % 2 ? '#4a4a2a' : '#5a5a32'); } });
    isl.forEach((i) => { i.pose = 'out'; i.facing = i.x < paul.x ? 1 : -1; });
    AU() && AU().music('tension');
    await s28('28:4', '28:4');
    const heart = await SC.choose('The snake is hanging from his hand. Everyone has frozen. What do you do?', [
      'Pray, out loud, in front of everyone.',
      'Reach for the snake.',
      'Freeze, like everyone else.',
    ]);
    game.setHeart('malta', heart);
    await SC.say({ kind: 'drama', text: heart === 0 ? 'Your voice shakes, but it carries: “Lord Jesus.” Paul glances at you, almost amused.' : heart === 1 ? 'You are halfway to him when Paul shakes his hand once, hard.' : 'Nobody breathes.' });
    SC.ents = SC.ents.filter((e) => e !== viper);
    paul.pose = 'stand';
    SC.dust(118, 140, 8, { up: true, spread: 6, color: '#f4d46a' });
    await s28('28:5', '28:6');
    isl.forEach((i) => { i.pose = 'raise'; });
    await SC.say({ kind: 'drama', text: 'An hour ago he was a murderer. Now he is a god. Paul quietly goes back to gathering sticks.' });
    isl.forEach((i) => { i.pose = 'stand'; });
    void wet;

    // ---- the house of Publius ----
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, birds: 0.2 } };
      SC.load(h); SC.cam = 0;
    });
    SC.add({ frames: S.person({ skin: '#a8724a', hair: '#3a2416', tunic: '#e6dfcc', mantle: '#8a3a2a' }), x: 70, y: 146, facing: 1 });
    const father = SC.add({ x: 150, y: 148, z: 147, draw(ctx, sx, sy) { ctx.drawImage(S.lying({ skin: '#a8724a', hair: '#c8c0b4', beard: '#c8c0b4', tunic: '#d8cfb8' }), sx - 14, sy - 10); } });
    const p2 = SC.add({ frames: K.who('saul'), x: 120, y: 147, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: niece ? 178 : 90, y: 148, facing: niece ? -1 : 1 });
    await s28('28:7', '28:7');
    if (niece) await SC.say({ kind: 'drama', text: 'Publius’s wife lets you help her nurse the old man: water, cool cloths, the things you learned caring for the sick in Jerusalem. He is burning with fever.' });
    p2.pose = 'raise';
    await SC.wait(700);
    AU() && AU().sfx('chime');
    await s28('28:8', '28:8');
    SC.ents = SC.ents.filter((e) => e !== father);
    const up = SC.add({ frames: S.person({ skin: '#a8724a', hair: '#c8c0b4', beard: '#c8c0b4', tunic: '#d8cfb8' }), x: 150, y: 148, facing: -1, pose: 'sit' });
    AU() && AU().music('wonder');
    await SC.wait(700);
    up.pose = 'stand'; p2.pose = 'stand';
    await s28('28:9', '28:10');
    game.observe('malta', 'viper', 'On Malta a viper fastened on Paul’s hand; he shook it into the fire and was not harmed (Acts 28:3–6).', false, true);
    game.observe('malta', 'publius', 'Paul prayed for the father of Publius and laid hands on him, and he was healed; then the sick of the whole island came (Acts 28:8–9).', false, true);
    await SC.say({ kind: 'drama', text: 'You stay three months, until the sailing season opens again. When you leave, half the island comes down to the harbor with bread and oil and cloaks for the voyage.' });
    game.addQuestion(TW.D.episodes.malta.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'malta', 'Write it down by the fire.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.malta = EP;
})(window.TW);
