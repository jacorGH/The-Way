/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XIV: The Beautiful Gate (Acts 3:1–4:4). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'gate' };
  const s3 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts3', a, b), text: P.vs('acts3', a, b) });
  const s4 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts4', a, b), text: P.vs('acts4', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const st = K.courtStage(false);
    st.audio = { music: 'jerusalem', amb: { crowd: 0.5, city: 0.6, doves: 0.5 } };
    SC.load(st); SC.cam = 64; SC.camGoal = 64;
    const lame = SC.add({ frames: K.who('lame'), x: 214, y: 127, pose: 'sit', facing: 1, speed: 30 });
    const bowl = SC.add({ x: 0, y: 0, z: 128, draw(ctx) { if (lame.pose === 'sit') { const x = Math.round(lame.x - SC.cam) + 8; R(ctx, x, 124, 5, 2, '#8a5a3a'); } } });
    void bowl;
    const people = [];
    [[120, 1], [150, -1], [176, 1], [262, -1], [280, 1]].forEach((c, i) => people.push(SC.add({ frames: K.villager(1100 + i, i % 2 === 0), x: c[0], y: 147 + (i % 2), facing: c[1], speed: 22 })));
    const me = SC.add({ id: 'player', frames: P0.player, x: 140, y: 150, facing: 1, speed: 22 });
    SC.player = me;

    await SC.say({ kind: 'history', text: 'The ninth hour, about three in the afternoon: the hour of the afternoon sacrifice, when the devout went up to the Temple to pray.' });
    await SC.say({ kind: 'drama', text: 'You have passed the same beggar at the inner gate every day for years. Men carry him there each morning. You do not know his name.' });
    await SC.walk(me, 196);
    me.facing = 1;
    await SC.say({ kind: 'drama', speaker: 'The lame man', text: 'Alms, master. Alms for the love of God.' });
    const heart = await SC.choose('He holds out his bowl to you, as he does to everyone.', [
      'Give him a coin, as you always have.',
      'Pass by, as you always have.',
      'You have nothing with you. Stop anyway.',
    ]);
    game.setHeart('gate', heart);
    if (heart === 0) { AU() && AU().sfx('coins'); await SC.say({ kind: 'drama', text: 'The coin rings in the bowl. He thanks you without looking up.' }); }
    else if (heart === 2) { await SC.say({ kind: 'drama', text: 'You tell him you have nothing. For the first time in years, he looks at your face.' }); }
    else { await SC.walk(me, 176); }
    game.observe('gate', 'alms', ['I gave the lame man at the gate a coin.', 'I passed the lame man by, as I always had.', 'I had nothing to give the lame man, but stopped.'][heart], false, true);

    // Peter and John come up
    const peter = SC.add({ frames: K.who('peter'), x: 20, y: 147, facing: 1, speed: 22 });
    const john = SC.add({ frames: K.who('john'), x: 6, y: 148, facing: 1, speed: 22 });
    SC.walk(john, 190);
    await SC.walk(peter, 204);
    await s3('3:1', '3:3');
    peter.facing = 1; john.facing = 1;
    await s3('3:4', '3:5');
    peter.pose = 'out';
    await s3('3:6', '3:6');
    await SC.walk(peter, 208);
    await s3('3:7', '3:7');
    lame.pose = 'stand'; lame.y = 125;
    await SC.wait(400);
    lame.hopping = true; lame.pose = 'raise';
    AU() && (AU().music('wonder'), AU().sfx('cheer'));
    await s3('3:8', '3:8');
    people.forEach((p) => { p.facing = p.x < lame.x ? 1 : -1; p.pose = 'raise'; });
    await s3('3:9', '3:10');
    game.observe('gate', 'healed', 'Peter said, “In the name of Jesus Christ of Nazareth, get up and walk!” and the lame man leaped up (Acts 3:6–8).', false, true);

    // Solomon's porch
    SC.camGoal = 0;
    lame.hopping = false; lame.pose = 'stand'; lame.y = 147;
    SC.walk(lame, 74); SC.walk(john, 60);
    await SC.walk(peter, 88);
    peter.facing = 1; john.facing = 1; lame.facing = 1;
    people.forEach((p, i) => { p.pose = 'stand'; SC.walk(p, 110 + i * 14).then(() => { p.facing = -1; }); });
    SC.walk(me, 180).then(() => { me.facing = -1; });
    await s3('3:11', '3:11');
    await SC.say({ kind: 'history', text: 'Solomon’s porch was a colonnade along the eastern side of the Temple courts. Jesus had walked there (John 10:23).' });
    peter.pose = 'out';
    await s3('3:12', '3:13');
    await s3('3:14', '3:16');
    await s3('3:17', '3:19');
    peter.pose = 'stand';

    // arrest
    const guards = [0, 1, 2].map((i) => SC.add({ frames: K.who('guard'), x: 330 + i * 14, y: 147 + (i % 2), facing: -1, speed: 30 }));
    const sadd = [SC.add({ frames: K.who('caiaphas'), x: 360, y: 146, facing: -1, speed: 24 })];
    AU() && AU().music('tension');
    await Promise.all(guards.map((g, i) => SC.walk(g, 104 + i * 10)));
    SC.walk(sadd[0], 150);
    await s4('4:1', '4:3');
    guards.forEach((g) => { g.facing = 1; });
    [peter, john].forEach((a, i) => { a.speed = 20; SC.walk(a, 340 + i * 12); });
    guards.forEach((g, i) => SC.walk(g, 350 + i * 12));
    await SC.wait(1500);
    await s4('4:4', '4:4');
    game.observe('gate', 'arrested', 'Peter and John were arrested for proclaiming the resurrection, but about five thousand believed (Acts 4:3–4).', false, true);
    await SC.say({ kind: 'drama', text: 'Tomorrow morning the council will meet to examine them. You will be expected to take your seat with the other scribes.' });
    game.addQuestion(TW.D.episodes.gate.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'gate', 'Write down what you saw at the gate.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.gate = EP;
})(window.TW);
