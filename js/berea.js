/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXXI: Thessalonica and Berea (Acts 17:1–15). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'berea' };
  const s17 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts17', a, b), text: P.vs('acts17', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- Thessalonica: the synagogue ----
    SC.load({ width: 256, hotspots: [], audio: { music: 'reflect', amb: { room: 0.55, crowd: 0.2 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
    SC.cam = 0;
    const seats = [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].map((c, i) => SC.add({ frames: K.villager(2400 + i, i % 3 === 1), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    const paul = SC.add({ frames: K.who('saul'), x: 128, y: 152, facing: 1, pose: 'out' });
    SC.add({ frames: K.who('silas'), x: 100, y: 152, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: TW.Role.is() ? 236 : 70, y: 153, facing: TW.Role.is() ? -1 : 1 });
    await SC.say({ kind: 'drama', text: 'From Philippi you walk west for days along the Via Egnatia, the great paved road of Macedonia, still stiff from the night in Philippi.' });
    await s17('17:1', '17:3');
    seats.forEach((s, i) => { if (i % 3 === 0) s.pose = 'raise'; });
    await s17('17:4', '17:4');
    paul.pose = 'stand';

    // ---- Jason's house: the mob ----
    await K.fade(async () => {
      const h = K.interiorStage();
      K.nightWrap(h, { dark: 0.3, lights: [{ x: 90, y: 95, r: 50 }, { x: 20, y: 120, r: 40, c: 'rgba(255,150,70,0.5)' }] });
      h.audio = { music: 'tension', amb: { room: 0.4, crowd: 0.8, night: 0.2 } };
      SC.load(h); SC.cam = 0;
    });
    const jason = SC.add({ frames: K.villager(2420), x: 60, y: 146, facing: -1, speed: 22 });
    const p2 = SC.add({ frames: K.who('saul'), x: 170, y: 147, facing: -1, speed: 26 });
    const s2 = SC.add({ frames: K.who('silas'), x: 186, y: 147, facing: -1, speed: 26 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 120, y: 148, facing: -1, speed: 26 });
    AU() && (AU().sfx('crash'), AU().sfx('crash', 0.5));
    SC.shake(500);
    await s17('17:5', '17:5');
    const heart = await SC.choose('Fists on the door. Torches in the street. Jason looks at you.', [
      'Stand at the door with Jason and face the crowd.',
      'Hide Paul and Silas in the back of the house.',
      'Slip out the back to warn the brothers.',
    ]);
    game.setHeart('berea', heart);
    if (heart === 0) { await SC.walk(me, 74); await SC.say({ kind: 'drama', text: 'You stand beside Jason in the doorway. The torchlight is in your eyes. Someone spits.' }); }
    else if (heart === 1) { await Promise.all([SC.walk(p2, 236), SC.walk(s2, 248)]); await SC.say({ kind: 'drama', text: 'You pull a hanging behind them and stand in front of it, as if you were only a guest who had been asleep.' }); }
    else { me.facing = 1; await SC.walk(me, 270); me.visible = false; await SC.say({ kind: 'drama', text: 'You run through the alleys knocking on doors you were shown only three days ago.' }); }
    p2.visible = false; s2.visible = false;
    jason.speed = 30;
    await SC.walk(jason, -20);
    await s17('17:6', '17:9');
    game.observe('berea', 'upside', 'In Thessalonica the mob cried that we had turned the world upside down, saying there is another king, Jesus (Acts 17:6–7).', false, true);
    await s17('17:10', '17:10');

    // ---- Berea: examining the Scriptures ----
    await K.fade(async () => {
      SC.load({ width: 256, hotspots: [], audio: { music: 'reflect', amb: { room: 0.55, crowd: 0.15, birds: 0.1 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
      SC.cam = 0;
    });
    [[10, 124], [26, 124], [12, 134], [30, 134], [222, 124], [242, 124], [204, 134], [240, 134]].forEach((c, i) => SC.add({ frames: K.villager(2430 + i, i % 2 === 1), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    // a reading table with open scrolls
    SC.add({ x: 128, y: 150, z: 150, draw(ctx, sx, sy) { R(ctx, sx - 30, sy - 12, 60, 3, '#7a5a3a'); R(ctx, sx - 28, sy - 9, 2, 9, '#5a3e26'); R(ctx, sx + 26, sy - 9, 2, 9, '#5a3e26'); for (let k = 0; k < 3; k++) { R(ctx, sx - 24 + k * 18, sy - 15, 12, 3, '#e6dcc4'); R(ctx, sx - 25 + k * 18, sy - 16, 2, 5, '#8a6a42'); R(ctx, sx - 13 + k * 18, sy - 16, 2, 5, '#8a6a42'); } } });
    SC.add({ frames: K.who('saul'), x: 96, y: 152, facing: 1, pose: 'out' });
    const elder = SC.add({ frames: K.villager(2440), x: 160, y: 152, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 140, y: 153, facing: -1 });
    await s17('17:11', '17:11');
    await SC.say({ kind: 'drama', speaker: 'An elder of the synagogue', text: 'You are from Jerusalem, and you can read. Good. He says the Christ had to suffer and rise. Show us where.' });
    const look = await SC.choose('Three scrolls lie open on the table. Which do you unroll first?', [
      'Isaiah: “He was led as a sheep to the slaughter.”',
      'The Psalm: “You will not leave my soul in Hades.”',
      'The Psalm: “The Lord said to my Lord, ‘Sit by my right hand.’”',
    ]);
    await SC.say({ kind: 'drama', text: ['You find the place in Isaiah that the Ethiopian was reading on the desert road, and read it aloud. The room is quiet for a long time.', 'You find the psalm Peter quoted at Pentecost, and the old man reads it again with his finger under every word.', 'You find the psalm that Jesus himself asked the scribes about in the Temple courts, and tell them what he asked.'][look] });
    elder.pose = 'out';
    await SC.say({ kind: 'drama', speaker: 'The elder', text: 'Tomorrow we will read it again. And the day after.' });
    elder.pose = 'stand';
    await s17('17:12', '17:12');
    game.observe('berea', 'examine', 'The Bereans received the word with readiness, examining the Scriptures daily to see whether these things were so (Acts 17:11).', false, true);
    AU() && AU().music('tension');
    await s17('17:13', '17:15');
    await SC.say({ kind: 'drama', text: 'You go down to the coast with the brothers who are taking Paul to Athens. Silas and Timothy stay behind. So, for now, does the old man with his finger on the page.' });
    game.addQuestion(TW.D.episodes.berea.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'berea', 'Write it down. Then check what you wrote against the Scriptures.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.berea = EP;
})(window.TW);
