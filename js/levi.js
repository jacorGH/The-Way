/* The Way — Episode II: The Tax Booth (Mark 2:13–17) */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, SC = TW.Scene, K = TW.Kit, P = TW.P;
  const R = K.R;
  const EP = { id: 'levi' };

  function boothTable() {
    return function (ctx, sx, sy) {
      // awning, posts and counter of a toll booth
      R(ctx, sx - 13, sy - 30, 1, 30, '#4a3220'); R(ctx, sx + 13, sy - 30, 1, 30, '#4a3220');
      for (let x = -15; x <= 15; x++) R(ctx, sx + x, sy - 33, 1, 4, (x + 16) % 6 < 3 ? '#8a3a2a' : '#cdbb94');
      R(ctx, sx - 12, sy - 9, 25, 3, '#6a4a2c'); R(ctx, sx - 12, sy - 9, 25, 1, '#86603a');
      R(ctx, sx - 11, sy - 6, 2, 6, '#4a3220'); R(ctx, sx + 10, sy - 6, 2, 6, '#4a3220');
      [[-7, 0], [-5, 1], [-2, 0], [3, 0], [5, 1]].forEach((c) => R(ctx, sx + c[0], sy - 10 - c[1], 2, 1, '#d8b04a'));
      R(ctx, sx + 7, sy - 12, 1, 3, '#3a2618'); R(ctx, sx + 5, sy - 12, 5, 1, '#3a2618');
    };
  }

  EP.run = async function (game) {
    const P0 = K.sprites();
    SC.load(K.exteriorStage());
    const st = SC.stage;
    SC.cam = 224;
    const player = SC.add({ id: 'player', frames: P0.player, x: 410, y: 148, facing: -1 });
    SC.player = player;

    // the teacher on the shore with a crowd
    const jesus = SC.add({ id: 'jesus', frames: P0.jesus, x: 110, y: 146, facing: 1, speed: 26 });
    const disc = [[96, 7], [124, 8], [86, 9], [134, 10]].map((c) => SC.add({ frames: K.villager(200 + c[1]), x: c[0], y: 148, facing: 1, speed: 26 }));
    const crowd = [];
    [[146, -1, 'sit'], [158, -1, 'sit'], [170, -1, 'stand'], [74, 1, 'sit'], [62, 1, 'stand']].forEach((c, i) => {
      crowd.push(SC.add({ frames: K.villager(220 + i, i % 3 === 1), x: c[0], y: 150 + (i % 2), facing: c[1], pose: c[2] }));
    });
    const levi = SC.add({ id: 'levi', frames: K.villager(251), pose: 'sit', x: 206, y: 140, facing: -1, speed: 24 });
    SC.add({ x: 206, y: 141, z: 141, draw: boothTable() });
    const merchant = SC.add({ frames: K.villager(260), x: 228, y: 148, facing: -1, pose: 'out' });
    const colleague = SC.add({ frames: P0.scribe(31), x: 330, y: 147, facing: -1 });

    const GOAL = 'The teacher is by the water again. Go and listen.';
    const goal = () => K.freeGoal(GOAL, 'Go to the shore', async () => {
      SC.busy = true; await SC.walk(player, 176); SC.busy = false; reach();
    });
    let reach;
    const reached = new Promise((r) => { reach = r; });
    const talk = (fn) => async () => { SC.mode = 'script'; await fn(); goal(); };

    merchant.onTap = talk(async () => {
      await SC.say({ kind: 'drama', speaker: 'A merchant with a bundle of cloth', text: 'Toll on the way out of Philip’s land, toll on the way into this one. By the time I reach Tiberias, I’ll have paid for the cloth twice.' });
      game.observe('levi', 'toll', 'A merchant complains of paying tolls at every border.');
    });
    levi.onTap = talk(async () => {
      await SC.say({ kind: 'drama', text: 'The toll collector does not look up from his counting. No one stands near his booth who does not have to.' });
      game.observe('levi', 'booth', 'No one stands near the toll booth unless they must.');
    });
    colleague.onTap = talk(async () => {
      await SC.say({ kind: 'drama', speaker: 'A Pharisee from Capernaum', text: 'You were at the house yesterday? Then you know why we watch him. A teacher is known by the company he keeps. Watch where he goes.' });
      game.observe('levi', 'company', 'A Pharisee told me a teacher is known by the company he keeps.');
    });
    st.hotspots.push({ x0: 40, x1: 182, y0: 100, y1: 160, walkX: 176, onTap: () => { SC.mode = 'script'; reach(); } });

    await SC.say({ kind: 'scripture', ref: 'Mark 2:13', text: P.vs('mark2b', 13) });
    await SC.say({ kind: 'history', text: 'Capernaum lay near the border between Herod Antipas’s Galilee and Philip’s territory. Goods crossing it paid tolls, collected by local men who bought the right. Most people despised them as cheats who served foreign rulers.' });
    goal();
    await reached;
    SC.mode = 'script';
    player.facing = -1;

    // he passes by the booth
    SC.camGoal = 110;
    await SC.say({ kind: 'drama', text: 'When the teaching ends, he does not go back toward the town. He walks along the shore, straight toward the toll booth.' });
    disc.forEach((d, i) => SC.wait(i * 200).then(() => SC.walk(d, 150 + i * 10)));
    await SC.walk(jesus, 188);
    jesus.facing = 1;
    await SC.say({ kind: 'scripture', ref: 'Mark 2:14', text: P.vs('mark2b', 14) });
    levi.pose = 'stand';
    TW.Audio && TW.Audio.sfx('coins');
    await SC.wait(500);
    levi.y = 148;
    await SC.walk(levi, 200);
    levi.facing = -1;
    await SC.say({ kind: 'drama', text: 'He leaves the coins where they lie. The merchant stares at the empty booth, then at the money, and does not touch it.' });
    game.observe('levi', 'follow', 'Levi, the toll collector, left his booth to follow him (Mark 2:14).', false, true);

    const heart = await SC.choose('A toll collector, of all people. What do you think?', [
      'He should repent before any teacher eats with him.',
      'If he truly leaves the booth, perhaps that is repentance.',
      'Wait and see what this teacher does with him.',
    ]);
    game.setHeart('levi', heart);
    SC.camGoal = null;

    // evening at Levi's house
    await K.fade(async () => {
      const inside = K.interiorStage();
      const bg0 = inside.bg, fx0 = inside.fx;
      inside.bg = function (ctx, t, cam, sc) {
        bg0(ctx, t, cam, sc);
        R(ctx, 44, 142, 170, 3, '#7a5a3a'); R(ctx, 44, 142, 170, 1, '#946c46');
        for (let x = 52; x < 210; x += 14) { R(ctx, x, 140, 4, 2, '#c99a58'); R(ctx, x + 6, 141, 3, 1, '#9fb0b4'); R(ctx, x + 10, 140, 2, 2, '#8a3a2a'); }
        [90, 168].forEach((lx) => { R(ctx, lx, 98, 1, 42, '#3a2618'); R(ctx, lx - 2, 96, 5, 2, '#8a5a3a'); R(ctx, lx, 94 - (Math.floor(t * 8) % 2), 1, 2, '#ffd27a'); });
      };
      inside.fx = function (fc, k, t, cam, sc) {
        fx0(fc, k, t, cam, sc);
        fc.fillStyle = 'rgba(60,24,44,0.42)'; fc.fillRect(0, 0, 256 * k, 56 * k);
        fc.fillStyle = 'rgba(10,5,2,0.2)'; fc.fillRect(0, 77 * k, 256 * k, 83 * k);
        fc.globalCompositeOperation = 'lighter';
        [90, 168].forEach((lx) => {
          const fl = 1 + Math.sin(t * 7 + lx) * 0.07;
          const g = fc.createRadialGradient(lx * k, 95 * k, 0, lx * k, 95 * k, 46 * k * fl);
          g.addColorStop(0, 'rgba(255,180,90,0.42)'); g.addColorStop(1, 'rgba(255,170,80,0)');
          fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        });
        fc.globalCompositeOperation = 'source-over';
      };
      inside.audio = { music: 'reflect', amb: { room: 0.55, crowd: 0.55 } };
      SC.load(inside);
      SC.cam = 0;
    });
    const IN = SC.stage;
    const guests = [];
    [[54, 1, 0], [70, 1, 1], [86, 1, 2], [102, 1, 3], [150, -1, 4], [166, -1, 5], [182, -1, 6], [198, -1, 7], [214, -1, 8]].forEach((c) => {
      const rich = c[2] % 3 === 0;
      const f = rich ? TW.S.person({ skin: K.pick(K.SKINS, c[2], 1), hair: K.pick(K.HAIRS, c[2], 2), beard: K.pick(K.HAIRS, c[2], 2), tunic: K.pick(['#8a3a2a', '#3d4f6a', '#6a3a5a'], c[2], 3), stripe: '#d8b04a' }) : K.villager(400 + c[2], c[2] === 5);
      guests.push(SC.add({ frames: f, pose: 'sit', x: c[0], y: 147, facing: c[1] }));
    });
    const j2 = SC.add({ id: 'jesus', frames: P0.jesus, pose: 'sit', x: 128, y: 147, facing: -1 });
    const l2 = SC.add({ frames: K.villager(251), pose: 'sit', x: 116, y: 148, facing: 1 });
    [228, 240].forEach((x, i) => SC.add({ frames: K.villager(200 + i + 7), pose: 'sit', x: x, y: 147, facing: -1 }));
    const scribes = [[20, 33], [34, 34]].map((c) => SC.add({ frames: P0.scribe(c[1]), x: c[0], y: 137, facing: 1 }));
    const me = SC.add({ id: 'player', frames: P0.player, x: 44, y: 137, facing: 1 });
    void l2; void scribes; void me;

    await SC.say({ kind: 'scripture', ref: 'Mark 2:15', text: P.vs('mark2b', 15) });
    await SC.say({ kind: 'drama', text: 'You and the other scribes stand just inside the door. None of you sits down.' });
    const obs = [
      { id: 'guests', x0: 40, x1: 112, y0: 118, y1: 156, text: 'Toll collectors and known sinners recline at the same table as the teacher.' },
      { id: 'friends', x0: 112, x1: 140, y0: 118, y1: 156, text: 'He eats with them as if they were old friends.' },
      { id: 'meal', x0: 140, x1: 220, y0: 118, y1: 156, text: 'Bread, fish and wine. A full feast, not a hurried meal.' },
    ];
    obs.forEach((o) => IN.hotspots.push(Object.assign({}, o, { active: () => SC.mode === 'observe', onTap: () => game.observe('levi', o.id, o.text, true) })));
    await SC.prompt('Look at who is at this table. Tap what you want to note.', 'Keep watching', 'observe');
    IN.hotspots.length = 0;

    const ask = await SC.choose('The question is on the lips of every scribe by the door. Do you ask it too?', [
      'Ask it with the others.',
      'Stay silent and listen.',
    ]);
    await SC.say({ kind: 'drama', text: ask === 0 ? 'You say it with them, to one of his disciples, loud enough for the room to hear.' : 'You say nothing. The others say it for you, loud enough for the room to hear.' });
    await SC.say({ kind: 'scripture', ref: 'Mark 2:16', text: P.vs('mark2b', 16) });
    j2.facing = -1;
    guests.forEach((g) => { if (g.x < 128) g.facing = -1; });
    await SC.say({ kind: 'scripture', ref: 'Mark 2:17', text: P.vs('mark2b', 17) });
    await SC.say({ kind: 'drama', text: 'You came to Capernaum as one of the healthy. You are still standing by the door.' });
    game.observe('levi', 'eats', 'He reclined at table with tax collectors and sinners (Mark 2:15).', false, true);
    game.observe('levi', 'physician', 'He said the sick need a physician, and that he came to call sinners (Mark 2:17).', false, true);
    game.addQuestion(D().episodes.levi.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'levi', 'The lamps are burning low. Step outside and write down what you saw.');
  };
  const D = () => TW.D;

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.levi = EP;
})(window.TW);
