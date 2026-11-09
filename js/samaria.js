/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XVIII: Philip in Samaria (Acts 8:4–25). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'samaria' };
  const s8 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts8', a, b), text: P.vs('acts8', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    SC.load({ width: 320, audio: { music: 'galilee', amb: { crowd: 0.45, city: 0.4, birds: 0.3, wind: 0.15 } }, bg(ctx, t, cam) { ctx.drawImage(K.sebasteArt(), -cam, 0); } });
    SC.cam = 0; SC.camGoal = 0;
    const philip = SC.add({ frames: K.who('philip'), x: -10, y: 146, facing: 1, speed: 22 });
    const me = SC.add({ id: 'player', frames: P0.player, x: -30, y: 148, facing: 1, speed: 22 });
    await SC.say({ kind: 'drama', text: 'You left Jerusalem by night with Philip and a handful of others. Three days north, the road climbs to the city Herod rebuilt and named for Augustus. You have never set foot in a Samaritan city. You were raised to walk around them.' });
    await SC.walk(me, 40);
    await SC.walk(philip, 120);
    await SC.say({ kind: 'history', text: 'Sebaste stood on the hill of old Samaria, capital of the northern kingdom. Herod the Great crowned it with a temple to the emperor.' });
    const crowd = [];
    for (let i = 0; i < 9; i++) crowd.push(SC.add({ frames: K.villager(1500 + i, i % 3 === 1), x: 160 + i * 15, y: 146 + (i % 3), facing: -1, speed: 22 }));
    philip.pose = 'out';
    await s8('8:5', '8:6');
    // a lame man stands; a tormented woman grows calm
    const lame = SC.add({ frames: K.villager(1520), x: 200, y: 150, pose: 'sit', facing: -1 });
    const torm = SC.add({ frames: K.villager(1521, true), x: 236, y: 149, pose: 'raise', hopping: true, facing: -1 });
    await s8('8:7', '8:7');
    torm.hopping = false; torm.pose = 'sit';
    await SC.wait(600);
    lame.pose = 'stand'; lame.hopping = true;
    AU() && (AU().sfx('cheer'), AU().music('wonder'));
    await SC.wait(900);
    lame.hopping = false;
    await s8('8:8', '8:8');
    philip.pose = 'stand';
    game.observe('samaria', 'signs', 'In Samaria unclean spirits came out and the lame were healed, and there was great joy in that city (Acts 8:7–8).', false, true);

    // Simon
    const simon = SC.add({ frames: K.who('simonmagus'), x: 330, y: 146, facing: -1, speed: 18 });
    const fans = [0, 1].map((i) => SC.add({ frames: K.villager(1530 + i), x: 346 + i * 12, y: 147, facing: -1, speed: 18 }));
    SC.camGoal = 64;
    fans.forEach((f, i) => SC.walk(f, 296 + i * 12));
    await SC.walk(simon, 270);
    await s8('8:9', '8:11');
    simon.facing = -1;
    await s8('8:12', '8:13');
    simon.pose = 'raise';
    game.observe('samaria', 'simon', 'Simon the sorcerer believed and was baptized, and followed Philip, amazed at the signs (Acts 8:13).', false, true);

    // the Samaritan table
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.3 } };
      const bg0 = h.bg;
      h.bg = function (ctx, t, cam, sc) {
        bg0.call(h, ctx, t, cam, sc);
        R(ctx, 70, 142, 120, 3, '#7a5a3a'); R(ctx, 70, 142, 120, 1, '#946c46');
        for (let x = 80; x < 180; x += 20) { R(ctx, x, 140, 4, 2, '#c99a58'); R(ctx, x + 8, 140, 3, 2, '#7a8a4a'); }
      };
      SC.load(h); SC.cam = 0; SC.camGoal = 0;
    });
    const fam = [[84, 1], [100, 1], [160, -1], [176, -1]].map((c, i) => SC.add({ frames: K.villager(1540 + i, i % 2 === 1), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    SC.add({ frames: K.who('philip'), x: 120, y: 147, pose: 'sit', facing: 1 });
    const woman = SC.add({ frames: K.who('sychar'), x: 230, y: 146, facing: -1, speed: 20 });
    const me2 = SC.add({ id: 'player', frames: P0.player, x: 14, y: 147, facing: 1, speed: 20 });
    void fam;
    await SC.say({ kind: 'drama', text: 'A Samaritan family has taken Philip in, and they want you at their table too. Their bread is Samaritan bread. Every rule you were taught says you do not eat it.' });
    if (game.save.heard && game.save.heard.samaritan) await SC.say({ kind: 'drama', speaker: 'The woman of Sychar', text: 'Scribe! I told you about the well, and the man who knew everything I ever did. Now look: he has sent his people to us.' });
    else await SC.say({ kind: 'drama', speaker: 'A woman from Sychar', text: 'I met him at Jacob’s well, years ago. He asked me for a drink. Sit down, scribe. He would.' });
    const heart = await SC.choose('They are waiting for you.', [
      'Sit down and eat.',
      'Hesitate at the door, then go in.',
      'Let the woman lead you in by the sleeve.',
    ]);
    game.setHeart('samaria', heart);
    if (heart === 2) { await SC.walk(woman, 40); woman.facing = 1; await Promise.all([SC.walk(woman, 194), SC.walk(me2, 140)]); }
    else { if (heart === 1) await SC.wait(1200); await SC.walk(me2, 140); }
    me2.pose = 'sit';
    await SC.say({ kind: 'drama', text: 'The bread is good. Nobody chokes. Philip catches your eye and smiles.' });
    game.observe('samaria', 'table', 'I ate at a Samaritan table with Philip and a family of new believers.', false, true);

    // Peter and John, and Simon's offer
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'reflect', amb: { crowd: 0.4, city: 0.3, birds: 0.3 } }, bg(ctx, t, cam) { ctx.drawImage(K.sebasteArt(), -cam, 0); } });
      SC.cam = 64; SC.camGoal = 64;
    });
    const bel = [];
    for (let i = 0; i < 7; i++) bel.push(SC.add({ frames: K.villager(1550 + i, i % 2 === 0), x: 120 + i * 14, y: 147 + (i % 2), pose: 'sit', facing: 1 }));
    const peter = SC.add({ frames: K.who('peter'), x: 260, y: 146, facing: -1, speed: 20 });
    const john = SC.add({ frames: K.who('john'), x: 276, y: 147, facing: -1, speed: 20 });
    const simon2 = SC.add({ frames: K.who('simonmagus'), x: 300, y: 148, facing: -1, speed: 18 });
    SC.add({ id: 'player', frames: P0.player, x: 104, y: 150, facing: 1 });
    await s8('8:14', '8:16');
    peter.pose = 'out'; john.pose = 'out';
    await SC.walk(peter, 224); await SC.walk(john, 236);
    peter.pose = 'out'; john.pose = 'out';
    bel.forEach((b) => { b.pose = 'raise'; });
    await s8('8:17', '8:17');
    peter.pose = 'stand'; john.pose = 'stand';
    await SC.walk(simon2, 252);
    simon2.pose = 'out';
    AU() && AU().sfx('coins');
    await s8('8:18', '8:19');
    simon2.pose = 'stand';
    peter.facing = 1; peter.pose = 'out';
    AU() && AU().music('tension');
    await s8('8:20', '8:23');
    peter.pose = 'stand';
    simon2.pose = 'sit';
    await s8('8:24', '8:24');
    game.observe('samaria', 'money', 'Simon offered money for the power to give the Spirit. Peter said, “May your silver perish with you” (Acts 8:20).', false, true);
    AU() && AU().music('reflect');
    await s8('8:25', '8:25');
    await SC.say({ kind: 'drama', text: 'Philip does not go back to Jerusalem with them. He says the Lord has something else for him, and that you should come.' });
    game.addQuestion(TW.D.episodes.samaria.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'samaria', 'Write down what happened in Samaria.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.samaria = EP;
})(window.TW);
