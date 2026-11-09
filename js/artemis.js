/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXXIV: Great Is Artemis (Acts 18:24–19:41). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'artemis' };
  const s19 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts19', a, b), text: P.vs('acts19', a, b) });
  const local = (i) => S.person({ skin: K.pick(K.SKINS.concat(['#c49470', '#c8a07c']), i, 1), hair: K.pick(K.HAIRS, i, 2), beard: i % 3 ? K.pick(K.HAIRS, i, 2) : null, tunic: ['#e6dfcc', '#8a6a4a', '#5a6a7a', '#a8743a', '#7a3a2a'][i % 5], mantle: i % 2 ? '#d8cfb8' : null, veil: i % 4 === 3 ? '#9a7a5a' : null });
  Object.assign(K.looks, {
    apollos: { skin: '#8a5a3a', hair: '#151010', beard: '#151010', tunic: '#e6dfcc', mantle: '#3d5a7a' },
    demetrius: { skin: '#c49470', hair: '#5f5048', beard: '#5f5048', tunic: '#8a7a6a', mantle: '#c0c0c8' },
  });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- Apollos, and Priscilla and Aquila ----
    SC.load({ width: 256, hotspots: [], audio: { music: 'reflect', amb: { room: 0.55, crowd: 0.2 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
    SC.cam = 0;
    [[10, 124], [26, 124], [12, 134], [30, 134], [222, 124], [242, 124], [204, 134], [240, 134]].forEach((c, i) => SC.add({ frames: K.villager(2600 + i, i % 3 === 1), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    const apollos = SC.add({ frames: K.who('apollos'), x: 128, y: 152, facing: 1, pose: 'out', speed: 20 });
    const pris = SC.add({ frames: K.who('priscilla'), x: 60, y: 152, facing: 1, speed: 20 });
    const aq = SC.add({ frames: K.who('aquila'), x: 44, y: 152, facing: 1, speed: 20 });
    SC.add({ id: 'player', frames: P0.player, x: niece ? 76 : 200, y: 153, facing: niece ? 1 : -1 });
    await SC.say({ kind: 'drama', text: 'Ephesus: the greatest city of Asia, a harbor full of ships, a temple that is one of the wonders of the world. Paul has gone on to Jerusalem and Antioch; Priscilla and Aquila have stayed, and so have you.' });
    await s19('18:24', '18:25');
    await s19('18:26', '18:26');
    apollos.pose = 'stand';
    await Promise.all([SC.walk(pris, 112), SC.walk(aq, 98)]);
    await SC.say({ kind: 'drama', text: niece ? 'Afterward, at their table, Priscilla does most of the talking. The great preacher from Alexandria listens like a student. You have never seen a woman teach a man like that, so gently that he thanks her.' : 'Afterward, at their table, Priscilla does most of the talking, and Aquila fills in what she leaves out. The great preacher from Alexandria listens like a student.' });
    await s19('18:27', '18:28');
    game.observe('artemis', 'apollos', 'Priscilla and Aquila took Apollos aside and explained the way of God to him more accurately (Acts 18:26).', false, true);

    // ---- Paul in Ephesus ----
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'wonder', amb: { room: 0.5, crowd: 0.3 } };
      SC.load(h); SC.cam = 0;
    });
    const twelve = [];
    for (let i = 0; i < 6; i++) twelve.push(SC.add({ frames: local(10 + i), x: 40 + i * 14 + (i > 2 ? 110 : 0), y: 147, pose: 'sit', facing: i > 2 ? -1 : 1 }));
    const paul = SC.add({ frames: K.who('saul'), x: 128, y: 146, facing: 1, pose: 'out' });
    SC.add({ id: 'player', frames: P0.player, x: 236, y: 148, pose: 'sit', facing: -1 });
    await s19('19:1', '19:4');
    paul.pose = 'raise';
    AU() && AU().sfx('whoosh');
    twelve.forEach((t) => { t.pose = 'raise'; });
    await s19('19:5', '19:7');
    paul.pose = 'stand';
    await s19('19:8', '19:10');
    await s19('19:11', '19:12');
    await s19('19:13', '19:17');
    await SC.say({ kind: 'drama', text: 'The story goes around the city in a day. People who would never come to the school of Tyrannus repeat it in the market: the name of Jesus is not a charm to be borrowed.' });

    // ---- the burning of the books ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'reflect', amb: { fire: 0.7, crowd: 0.5, city: 0.2 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); } });
      SC.cam = 32; SC.camGoal = 32;
    });
    const fire = SC.add({ x: 176, y: 150, z: 150, draw(ctx, sx, sy, t) {
      for (let k = 0; k < 7; k++) R(ctx, sx - 16 + k * 5, sy - 4, 4, 4, '#5a3e26');
      for (let k = 0; k < 14; k++) { const fx = sx - 12 + Math.floor(U_rand(k, t) * 24), fh = 6 + Math.floor(U_rand(k + 9, t) * 14); R(ctx, fx, sy - 4 - fh, 2, fh, k % 3 ? '#e8902a' : '#f4d46a'); }
    } });
    const burners = [0, 1, 2, 3, 4, 5].map((i) => SC.add({ frames: local(30 + i), x: 100 + i * 24 + (i > 2 ? 40 : 0), y: 148, facing: i > 2 ? -1 : 1, speed: 16 }));
    SC.add({ id: 'player', frames: P0.player, x: 70, y: 150, facing: 1 });
    await s19('19:18', '19:18');
    for (const b of burners.slice(0, 4)) { b.pose = 'out'; AU() && AU().sfx('flutter'); await SC.wait(500); b.pose = 'stand'; }
    await s19('19:19', '19:20');
    await SC.say({ kind: 'history', text: 'Probably fifty thousand drachmas: roughly the wages of a laborer for a hundred and sixty years, turned to ash in an afternoon.' });
    game.observe('artemis', 'books', 'At Ephesus those who had practiced magic burned their books in the sight of all, worth fifty thousand pieces of silver (Acts 19:19).', false, true);
    void fire;
    await s19('19:21', '19:21');

    // ---- Demetrius ----
    await K.fade(async () => {
      const w = K.interiorStage();
      w.audio = { music: 'tension', amb: { room: 0.5, city: 0.3 } };
      const bg0 = w.bg;
      w.bg = function (ctx, t, cam, sc) { bg0.call(w, ctx, t, cam, sc); for (let k = 0; k < 9; k++) { const sx = 30 + k * 22; R(ctx, sx, 96, 12, 3, '#9a9aa4'); R(ctx, sx + 2, 84, 8, 12, '#c8c8d0'); R(ctx, sx + 4, 80, 4, 4, '#dcdce4'); } R(ctx, 20, 99, 216, 3, '#6e5034'); };
      SC.load(w); SC.cam = 0;
    });
    const dem = SC.add({ frames: K.who('demetrius'), x: 128, y: 146, facing: 1, pose: 'out' });
    [[40, 1], [56, 1], [72, 1], [184, -1], [200, -1], [216, -1]].forEach((c, i) => SC.add({ frames: local(40 + i), x: c[0], y: 147, facing: c[1] }));
    await s19('19:23', '19:27');
    AU() && AU().music('tension');
    dem.pose = 'raise';
    await s19('19:28', '19:28');

    // ---- the theater ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'storm', amb: { crowd: 1, city: 0.3 } }, bg(ctx, t, cam) { ctx.drawImage(K.theaterArt(), -cam, 0); } });
      SC.cam = 32; SC.camGoal = 32;
    });
    // the crowd in the tiers, drawn as many small heads that bob as they shout
    SC.add({ x: 160, y: 110, z: 1, draw(ctx, sx, sy, t) {
      // sx is the theater's center on screen; every spectator is placed relative to it
      for (let row = 0; row < 14; row++) for (let i = -22; i <= 22; i++) {
        const half = 150 - row * 3, px = i * 6 + (row % 2) * 3;
        if (Math.abs(px) > half - 4) continue;
        const hx = sx + px, hy = 31 + row * 5 + Math.round(Math.pow(px / half, 2) * -10) - (Math.sin(t * 6 + i + row) > 0.5 ? 1 : 0);
        R(ctx, hx, hy + 2, 3, 2, ['#8a3a2a', '#5a6a7a', '#d8cfb8', '#a8743a', '#6a5a42'][(i + row * 3 + 40) % 5]);
        R(ctx, hx, hy, 3, 2, ['#c49470', '#a8724a', '#b8845a', '#8a5a3a'][(i + row + 40) % 4]);
      }
    } });
    const gaius = SC.add({ frames: local(60), x: 170, y: 140, facing: 1 });
    const arist = SC.add({ frames: local(61), x: 186, y: 140, facing: -1 });
    const mob = [0, 1, 2, 3, 4, 5, 6].map((i) => SC.add({ frames: local(70 + i), x: 120 + i * 22, y: 152, facing: i % 2 ? -1 : 1, pose: 'raise' }));
    const me = SC.add({ id: 'player', frames: P0.player, x: 70, y: 152, facing: 1, speed: 22 });
    await s19('19:29', '19:29');
    const heart = await SC.choose('Thousands are on their feet, shouting. Gaius and Aristarchus have been dragged into the middle. Paul is at the gate, trying to get in.', [
      'Stay hidden in the crowd and pray.',
      'Push toward Gaius and Aristarchus.',
      'Go back to the gate and help hold Paul back.',
    ]);
    game.setHeart('artemis', heart);
    if (heart === 1) await SC.walk(me, 156);
    else if (heart === 2) { me.facing = -1; await SC.walk(me, -10); }
    await s19('19:30', '19:32');
    const alex = SC.add({ frames: local(80), x: 150, y: 146, facing: 1, pose: 'out' });
    await s19('19:33', '19:34');
    alex.pose = 'stand';
    await SC.say({ kind: 'drama', text: 'Two hours. You stop being able to hear the words. Only the beat of it remains, like a drum: Great is Artemis, great is Artemis, great is Artemis.' });
    const clerk = SC.add({ frames: K.who('magistrate'), x: 160, y: 118, z: 113, facing: 1 });
    AU() && AU().music('silence');
    mob.forEach((m) => { m.pose = 'stand'; });
    clerk.pose = 'out';
    await s19('19:35', '19:37');
    await s19('19:38', '19:41');
    clerk.pose = 'stand';
    gaius.facing = -1; arist.facing = -1;
    if (heart === 1) await SC.say({ kind: 'drama', text: 'You walk out of the theater with your arms around two shaking Macedonians, and nobody stops you.' });
    else if (heart === 2) await SC.say({ kind: 'drama', text: 'At the gate Paul is still arguing to be let in when Gaius and Aristarchus walk out, alive. He holds them both for a long time.' });
    else await SC.say({ kind: 'drama', text: 'You find that you have been praying the same words for two hours, under the shouting. You do not remember starting.' });
    game.observe('artemis', 'riot', 'For two hours the theater at Ephesus shouted “Great is Artemis of the Ephesians!” until the town clerk dismissed the assembly (Acts 19:28–41).', false, true);
    game.addQuestion(TW.D.episodes.artemis.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'artemis', 'Write it down while the city is quiet again.');
  };
  // a small deterministic flicker for the fire
  function U_rand(k, t) { return TW.U.hash(k, 3, Math.floor(t * 10)); }

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.artemis = EP;
})(window.TW);
