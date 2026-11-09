/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXXV: Farewell at Miletus (Acts 20). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'farewell' };
  const s20 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts20', a, b), text: P.vs('acts20', a, b) });
  const local = (i) => S.person({ skin: K.pick(K.SKINS.concat(['#c49470', '#c8a07c']), i, 1), hair: K.pick(K.HAIRS, i, 2), beard: i % 3 ? K.pick(K.HAIRS, i, 2) : null, tunic: ['#d8cfb8', '#8a6a4a', '#5a6a7a', '#a8743a'][i % 4], mantle: i % 2 ? '#e6dfcc' : null, veil: i % 4 === 3 ? '#8a6a4a' : null });

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- Troas: the upper room ----
    const st = K.interiorStage();
    K.nightWrap(st, { dark: 0.35, lights: [{ x: 60, y: 110, r: 40 }, { x: 128, y: 104, r: 46 }, { x: 196, y: 110, r: 40 }] });
    st.audio = { music: 'night', amb: { room: 0.5, night: 0.25 } };
    const bg0 = st.bg;
    st.bg = function (ctx, t, cam, sc) { bg0.call(st, ctx, t, cam, sc); R(ctx, 222, 70, 26, 30, '#1a2238'); R(ctx, 220, 68, 30, 3, '#5a4632'); R(ctx, 220, 100, 30, 4, '#5a4632'); for (let k = 0; k < 6; k++) R(ctx, 224 + k * 4, 74 + (k % 3) * 7, 1, 1, '#d8dce8'); for (let k = 0; k < 5; k++) { const lx = 40 + k * 40; R(ctx, lx, 96, 3, 4, '#c99a3a'); R(ctx, lx + 1, 93, 1, 3, '#f4d46a'); } };
    SC.load(st); SC.cam = 0;
    const room = [[40, 1], [56, 1], [72, 1], [88, 1], [168, -1], [184, -1], [200, -1]].map((c, i) => SC.add({ frames: local(2700 + i), x: c[0], y: 147, pose: 'sit', facing: c[1], speed: 34 }));
    const paul = SC.add({ frames: K.who('saul'), x: 128, y: 146, facing: 1, pose: 'out', speed: 30 });
    const boy = SC.add({ frames: S.person({ skin: '#b8845a', hair: '#2a1a12', tunic: '#a89a7a' }), x: 236, y: 101, z: 101, pose: 'sit', facing: -1 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 20, y: 148, pose: 'sit', facing: 1, speed: 34 });
    await SC.say({ kind: 'drama', text: 'After the riot Paul sails for Macedonia and Greece, and then turns back for Jerusalem. At Troas the believers crowd into a third-floor room to hear him one last time.' });
    await s20('20:7', '20:8');
    await SC.say({ kind: 'drama', text: 'The lamps make the room hot and close. Paul talks on past midnight. In the window a young man’s head keeps dropping onto his chest.' });
    boy.pose = 'stand';
    AU() && AU().music('silence');
    await SC.wait(600);
    boy.visible = false;
    AU() && AU().sfx('crash', 0.5);
    await s20('20:9', '20:9');
    room.forEach((r) => { r.pose = 'stand'; });
    await SC.say({ kind: 'drama', text: 'Someone screams. Everyone is on the stairs at once, and you are carried down with them.' });

    // ---- the street below ----
    await K.fade(async () => {
      SC.load({ width: 256, dark: 0.45, audio: { music: 'silence', amb: { night: 0.5, wind: 0.15 } }, bg(ctx) { ctx.drawImage(K.nainArt(), 0, 0); },
        fx(fc, k) { fc.fillStyle = 'rgba(10,12,24,0.5)'; fc.fillRect(0, 0, 256 * k, 160 * k); } });
      SC.cam = 0;
    });
    const fallen = SC.add({ x: 128, y: 150, z: 149, draw(ctx, sx, sy) { ctx.drawImage(S.lying({ skin: '#b8845a', hair: '#2a1a12', tunic: '#a89a7a' }), sx - 14, sy - 10); } });
    [[96, 1], [110, 1], [150, -1], [164, -1]].forEach((c, i) => SC.add({ frames: local(2700 + i), x: c[0], y: 148, facing: c[1] }));
    SC.add({ id: 'player', frames: P0.player, x: 80, y: 150, facing: 1 });
    const p2 = SC.add({ frames: K.who('saul'), x: 200, y: 148, facing: -1, speed: 34 });
    await SC.walk(p2, 140);
    p2.pose = 'sit';
    await SC.wait(900);
    await s20('20:10', '20:10');
    SC.ents = SC.ents.filter((e) => e !== fallen);
    const alive = SC.add({ frames: S.person({ skin: '#b8845a', hair: '#2a1a12', tunic: '#a89a7a' }), x: 128, y: 150, facing: 1, pose: 'sit' });
    AU() && AU().music('wonder');
    await SC.wait(800);
    alive.pose = 'stand'; p2.pose = 'stand';
    await s20('20:11', '20:12');
    game.observe('farewell', 'eutychus', 'At Troas, on the first day of the week, Eutychus fell from the third story and was taken up dead. Paul embraced him; they brought the boy in alive (Acts 20:7–12).', false, true);
    await SC.say({ kind: 'drama', text: 'Paul goes back upstairs, breaks bread, and talks until dawn. Nobody falls asleep again.' });

    // ---- the shore at Miletus ----
    await K.fade(async () => { K.shoreStage(); });
    await s20('20:13', '20:16');
    const elders = [];
    [[40, 1], [56, 1], [72, 1], [92, 1], [164, -1], [180, -1], [196, -1], [214, -1]].forEach((c, i) => elders.push(SC.add({ frames: local(2720 + i), x: c[0], y: 148, facing: c[1] })));
    const p3 = SC.add({ frames: K.who('saul'), x: 128, y: 146, facing: 1, pose: 'out' });
    SC.add({ frames: K.who('luke'), x: 112, y: 150, facing: 1 });
    SC.add({ frames: K.who('timothy'), x: 146, y: 150, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 232, y: 150, facing: -1 });
    await s20('20:17', '20:21');
    await s20('20:22', '20:24');
    elders.forEach((e) => { e.facing = e.x < 128 ? 1 : -1; });
    await s20('20:25', '20:25');
    await s20('20:28', '20:29');
    await s20('20:31', '20:32');
    p3.pose = 'raise';
    await s20('20:33', '20:35');
    p3.pose = 'sit';
    elders.forEach((e) => { e.pose = 'sit'; });
    AU() && AU().music('lament');
    await s20('20:36', '20:36');
    const heart = await SC.choose('Grown men are weeping on the sand. Paul is getting up to go.', [
      'Hold him, and weep with them.',
      'Kneel on the shore and pray with them.',
      'Carry his things down to the ship, because someone has to.',
    ]);
    game.setHeart('farewell', heart);
    elders.forEach((e) => { e.pose = 'stand'; });
    p3.pose = 'stand';
    await s20('20:37', '20:38');
    await SC.say({ kind: 'drama', text: heart === 0 ? 'When he lets go of you, Paul’s face is wet too. “Write it down,” he says. “All of it.”' : heart === 1 ? 'You pray on your knees in the wet sand until the ship is only a sail.' : 'You carry his cloak and his books down to the boat. He thanks you as if you had given him something far greater.' });
    game.observe('farewell', 'miletus', 'At Miletus Paul said he did not hold his life dear, so that he might finish his race with joy. They wept, knowing they would not see his face again (Acts 20:24, 37–38).', false, true);
    game.addQuestion(TW.D.episodes.farewell.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'farewell', 'Write it down. He asked you to.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.farewell = EP;
})(window.TW);
