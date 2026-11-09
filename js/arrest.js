/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXXVI: On the Stairs (Acts 21–22). The beating in the Temple court is told, not shown. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const EP = { id: 'arrest' };
  const s21 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts21', a, b), text: P.vs('acts21', a, b) });
  const s22 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts22', a, b), text: P.vs('acts22', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- Caesarea: Philip's house ----
    const h = K.interiorStage();
    h.audio = { music: 'reflect', amb: { room: 0.5, shore: 0.2 } };
    SC.load(h); SC.cam = 0;
    const philip = SC.add({ frames: K.who('philip'), x: 60, y: 146, facing: 1 });
    const daughters = [0, 1, 2, 3].map((i) => SC.add({ frames: S.person({ skin: '#b8845a', hair: '#2a1a12', tunic: ['#a8743a', '#5a6a7a', '#8a6a4a', '#7a3a2a'][i], veil: ['#8a6a4a', '#6a7a8a', '#9a7a5a', '#5a4a3a'][i] }), x: 76 + i * 13, y: 148, pose: 'sit', facing: 1 }));
    const paul = SC.add({ frames: K.who('saul'), x: 160, y: 146, facing: -1, pose: 'sit' });
    SC.add({ frames: K.who('luke'), x: 180, y: 147, facing: -1, pose: 'sit' });
    SC.add({ id: 'player', frames: P0.player, x: niece ? 128 : 200, y: 148, pose: 'sit', facing: niece ? -1 : -1 });
    await SC.say({ kind: 'drama', text: 'Caesarea, by the sea: the house of Philip, who once ran beside a chariot on the desert road. He is grey now. His four daughters pour the wine.' });
    await s21('21:8', '21:9');
    if (niece) await SC.say({ kind: 'drama', text: 'The four of them prophesy, Luke says, as easily as other girls sing. The youngest asks you about Jerusalem, and about the women who went to the tomb.' });
    const agabus = SC.add({ frames: K.who('agabus'), x: 250, y: 147, facing: -1, speed: 16 });
    await SC.walk(agabus, 196);
    await s21('21:10', '21:10');
    agabus.pose = 'sit';
    AU() && AU().music('tension');
    await SC.wait(600);
    await s21('21:11', '21:11');
    agabus.pose = 'stand';
    daughters.forEach((d) => { d.pose = 'stand'; });
    await s21('21:12', '21:12');
    paul.pose = 'stand';
    await s21('21:13', '21:14');
    void philip;

    // ---- Jerusalem: James and the elders, then the Temple ----
    await K.fade(async () => {
      const j = K.interiorStage();
      j.audio = { music: 'jerusalem', amb: { room: 0.5, city: 0.3 } };
      SC.load(j); SC.cam = 0;
    });
    [[40, 1], [56, 1], [72, 1], [184, -1], [200, -1], [216, -1]].forEach((c, i) => SC.add({ frames: K.villager(2800 + i), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    SC.add({ frames: K.who('james'), x: 150, y: 146, facing: -1 });
    SC.add({ frames: K.who('saul'), x: 110, y: 146, facing: 1, pose: 'out' });
    SC.add({ id: 'player', frames: P0.player, x: 20, y: 148, pose: 'sit', facing: 1 });
    await SC.say({ kind: 'drama', text: 'You are home. You have not seen these walls in years. The city smells the same: smoke, sheep, the sea wind that never quite reaches it.' });
    await s21('21:17', '21:20');
    await SC.say({ kind: 'history', text: 'To quiet the rumors that he taught Jews to abandon the Law, the elders asked Paul to pay for the offerings of four men completing a vow, and to join them in the Temple (21:21–25).' });

    await K.fade(async () => { const c = K.courtStage(false); SC.load(c); SC.cam = 120; SC.camGoal = 120; });
    K.antonia();
    const crowd = [];
    for (let i = 0; i < 12; i++) crowd.push(SC.add({ frames: K.villager(2810 + i, i % 4 === 3), x: 110 + i * 12, y: 146 + (i % 3) * 2, facing: i % 2 ? 1 : -1, speed: 30 }));
    const p2 = SC.add({ frames: K.who('saul'), x: 170, y: 148, facing: 1, speed: 24 });
    const me = SC.add({ id: 'player', frames: P0.player, x: niece ? 140 : 156, y: 150, facing: 1, speed: 26 });
    await s21('21:26', '21:26');
    const asians = [0, 1, 2].map((i) => SC.add({ frames: K.villager(2830 + i), x: 330 + i * 12, y: 147, facing: -1, speed: 30 }));
    await Promise.all(asians.map((a, i) => SC.walk(a, 190 + i * 10)));
    asians.forEach((a) => { a.pose = 'out'; });
    AU() && (AU().music('storm'), AU().sfx('cheer', 0.5));
    await s21('21:27', '21:29');
    await SC.say({ kind: 'drama', text: 'You saw Trophimus yesterday, in the lower city. He never came near the Temple. You open your mouth to say so, and no one could hear you if you shouted.' });
    crowd.forEach((c, i) => { c.pose = i % 2 ? 'raise' : 'out'; c.facing = c.x < p2.x ? 1 : -1; });
    SC.shake(600);
    AU() && AU().sfx('crash');
    await s21('21:30', '21:31');
    const soldiers = [0, 1, 2, 3].map((i) => SC.add({ frames: K.who('soldier'), x: 262 + i * 6, y: 125 + i * 6, facing: -1, speed: 34 }));
    const tribune = SC.add({ frames: K.who('tribune'), x: 270, y: 130, facing: -1, speed: 34 });
    await Promise.all(soldiers.map((s, i) => SC.walk(s, 200 + i * 8, 148)).concat([SC.walk(tribune, 214, 146)]));
    crowd.forEach((c) => { c.pose = 'stand'; });
    await s21('21:32', '21:34');
    // up the stairs
    soldiers.forEach((s) => { s.speed = 18; });
    p2.speed = 18; tribune.speed = 18;
    AU() && AU().sfx('cheer', 0.6);
    await Promise.all([SC.walk(p2, 262, 128), SC.walk(soldiers[0], 256, 132), SC.walk(soldiers[1], 268, 126), SC.walk(tribune, 276, 122)]);
    crowd.forEach((c) => { c.pose = 'raise'; c.facing = 1; });
    await s21('21:35', '21:36');
    const heart = await SC.choose('“Away with him!” The crowd cried the same thing outside Pilate’s gate, the morning they crucified Jesus. Where do you go?', [
      'Stay at the foot of the stairs and listen.',
      'Push toward the barracks gate to stay close to him.',
      'Run to tell James and the elders.',
    ]);
    game.setHeart('arrest', heart);
    if (heart === 1) await SC.walk(me, 236);
    else if (heart === 2) { me.facing = -1; await SC.walk(me, 90); }
    else await SC.walk(me, 220);
    crowd.forEach((c) => { c.pose = 'stand'; });
    await s21('21:37', '21:39');
    p2.facing = -1; p2.pose = 'raise';
    AU() && AU().music('silence');
    await s21('21:40', '21:40');
    p2.pose = 'out';
    await s22('22:1', '22:4');
    await SC.say({ kind: 'drama', text: heart === 2 ? 'You come back with James at a run in time to hear him tell the Damascus road. You were there for the beginning of that story. You never thought you would hear him tell it here.' : 'He tells them the Damascus road: the light at noon, the voice, the blindness, Ananias. You were there for the beginning of that story. You never thought you would hear him tell it here.' });
    await s22('22:14', '22:15');
    await s22('22:20', '22:21');
    crowd.forEach((c) => { c.pose = 'raise'; });
    AU() && (AU().music('storm'), AU().sfx('cheer', 0.7));
    SC.dust(160, 130, 20, { up: true, spread: 30, color: '#c8b89a' });
    await s22('22:22', '22:24');
    p2.visible = false;
    await s22('22:25', '22:29');
    game.observe('arrest', 'stairs', 'On the stairs of the Antonia, Paul told the crowd his story in their own language. They listened until he spoke of being sent to the Gentiles (Acts 22:21–22).', false, true);
    game.observe('arrest', 'roman', 'About to be scourged, Paul asked, “Is it lawful for you to scourge a man who is a Roman, and not found guilty?” (Acts 22:25).', false, true);
    game.addQuestion(TW.D.episodes.arrest.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'arrest', 'Write it down. You are home, and he is in chains.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.arrest = EP;
})(window.TW);
