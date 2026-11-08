/* The Way — Episode XIII: Pentecost (Acts 2). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'pentecost' };
  const sayS = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts2', a, b), text: P.vs('acts2', a, b) });
  // pilgrims from every nation: brighter, foreign clothing
  const NATIONS = ['#7a2a5a', '#2a5a7a', '#c99a3a', '#3a7a4a', '#9a4a2a', '#5a3a8a', '#d8d0bc', '#2a2a2a'];
  const pilgrim = (i) => S.person({ skin: K.pick(K.SKINS.concat(['#6a4430', '#c8946a']), i, 1), hair: K.pick(K.HAIRS, i, 2), beard: i % 3 ? K.pick(K.HAIRS, i, 2) : null, tunic: NATIONS[i % NATIONS.length], mantle: i % 2 ? K.pick(['#d8b04a', '#e6dfcc', '#4a3a2a', '#8a2a22'], i, 4) : null, veil: i % 5 === 4 ? '#c99a3a' : null });

  // a small flame above someone's head, and a speech mark in a foreign script
  function flame(ent) {
    return SC.add({ x: 0, y: 0, z: 998, draw(ctx, sx, sy, t) {
      if (!ent.visible || !ent.fire) return;
      const x = Math.round(ent.x - SC.cam), y = Math.round(ent.y + ent.hop) - 31, f = Math.floor(t * 10 + ent.x) % 3;
      R(ctx, x - 1, y, 3, 3, '#ff9a3a'); R(ctx, x, y - 1 - (f === 1 ? 1 : 0), 1, 2, '#ffd27a'); R(ctx, x, y + 1, 1, 1, '#fff2c0');
    } });
  }
  const SCRIPTS = ['#2a3a6a', '#6a2a2a', '#2a5a2a', '#5a3a1a', '#3a2a5a'];
  function speech(ent, k) {
    return SC.add({ x: 0, y: 0, z: 997, draw(ctx, sx, sy, t) {
      if (!ent.visible || !ent.speaking) return;
      const x = Math.round(ent.x - SC.cam) - 7, y = Math.round(ent.y) - 46 - (k % 2) * 5;
      R(ctx, x, y, 15, 7, '#f4ecd8'); R(ctx, x + 6, y + 7, 2, 2, '#f4ecd8');
      const c = SCRIPTS[k % SCRIPTS.length], fr = Math.floor(t * 2 + k);
      for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) if (TW.U.hash(i + k * 7, j, fr) > 0.35) R(ctx, x + 2 + i * 2 + (j % 2), y + 2 + j * 2, 1, 1, c);
    } });
  }

  EP.run = async function (game) {
    const P0 = K.sprites();
    const st = K.courtStage(false);
    st.audio = { music: 'jerusalem', amb: { crowd: 0.6, wind: 0.2 } };
    SC.load(st); SC.cam = 0; SC.camGoal = 0;
    const crowd = [];
    for (let i = 0; i < 12; i++) crowd.push(SC.add({ frames: pilgrim(i), x: 70 + i * 17 + (i % 2) * 5, y: 147 + (i % 3), facing: i % 2 ? -1 : 1, speed: 22 }));
    const me = SC.add({ id: 'player', frames: P0.player, x: 150, y: 152, facing: 1, speed: 22 });
    await SC.say({ kind: 'history', text: 'Pentecost, the Feast of Weeks: fifty days after Passover. The city is crowded again with pilgrims from every land where Jews have settled, from Persia to Rome.' });
    await SC.say({ kind: 'drama', text: 'It is the third hour of the morning. You are in the Temple courts among the pilgrims when the sound begins.' });
    AU() && (AU().amb({ wind: 1, crowd: 0.4 }), AU().sfx('whoosh'), AU().sfx('whoosh', 0.6), AU().sfx('whoosh', 1.2));
    SC.shake(900);
    for (let i = 0; i < 40; i++) SC.dust(Math.random() * 320, 120 + Math.random() * 30, 1, { up: true, spread: 4, color: '#e8e0cc' });
    crowd.forEach((c) => { c.facing = -1; });
    await sayS('2:1', '2:4');
    AU() && AU().amb({ wind: 0.3, crowd: 0.7 });
    // the apostles come out among the crowd
    const twelve = [];
    ['peter', 'john', 'thomas'].concat([0, 1, 2, 3, 4, 5, 6, 7, 8]).forEach((n, i) => {
      const e = SC.add({ frames: typeof n === 'string' ? K.who(n) : K.villager(207 + n), x: -20 - i * 14, y: 146 + (i % 2) * 2, facing: 1, speed: 26 });
      e.fire = true; twelve.push(e); flame(e); speech(e, i);
    });
    await Promise.all(twelve.map((a, i) => SC.wait(i * 120).then(() => SC.walk(a, 30 + i * 12 + (i > 5 ? 60 : 0)))));
    twelve.forEach((a) => { a.speaking = true; a.pose = a.x % 2 ? 'out' : 'raise'; });
    crowd.forEach((c) => { c.facing = c.x < 120 ? -1 : -1; SC.walk(c, c.x - 20); });
    await sayS('2:5', '2:8');
    await SC.say({ kind: 'drama', text: 'The man beside you hears Greek. The woman behind him hears the speech of Egypt. You hear the Aramaic of your own mother, spoken by a Galilean fisherman.' });
    await sayS('2:9', '2:13');
    twelve.forEach((a) => { a.speaking = false; a.pose = 'stand'; });

    // Peter preaches from the steps
    const peter = twelve[0];
    peter.speed = 30;
    SC.camGoal = 64;
    await SC.walkPath(peter, [[200, 146], [232, 121]]);
    peter.facing = -1;
    twelve.slice(1).forEach((a, i) => SC.walk(a, 196 + (i % 5) * 8, 124 + Math.floor(i / 5) * 6));
    crowd.forEach((c, i) => { SC.walk(c, 120 + (i % 6) * 14, 146 + (i % 3)).then(() => { c.facing = 1; }); });
    SC.walk(me, 168).then(() => { me.facing = 1; });
    peter.pose = 'out';
    await sayS('2:14', '2:15');
    await sayS('2:16', '2:21');
    await sayS('2:22', '2:24');
    await SC.say({ kind: 'drama', text: 'This is the man you watched by the fire, cursing and swearing that he did not know him. He is not afraid now.' });
    await sayS('2:29', '2:32');
    await sayS('2:33', '2:36');
    peter.pose = 'stand';
    crowd.forEach((c, i) => { if (i % 2) c.pose = 'raise'; });
    await sayS('2:37', '2:37');
    const heart = await SC.choose('“Brothers, what shall we do?” The question is yours as much as anyone’s.', [
      'Go down to the water now.',
      'Watch the others, and go down last.',
    ]);
    game.setHeart('pentecost', heart);
    peter.pose = 'out';
    await sayS('2:38', '2:40');
    peter.pose = 'stand';

    // baptism in the immersion pools
    await K.fade(async () => {
      const b = K.courtStage(false);
      b.audio = { music: 'wonder', amb: { crowd: 0.5, wind: 0.15 } };
      const bg0 = b.bg;
      b.bg = function (ctx, t, cam) {
        bg0.call(b, ctx, t, cam);
        const x0 = 70 - cam;
        R(ctx, x0 - 8, 134, 160, 3, '#c4b799');
        for (let s = 0; s < 4; s++) R(ctx, x0 - 8 + s * 4, 137 + s * 3, 150 - s * 8, 3, s % 2 ? '#bfb294' : '#cfc4a8');
        R(ctx, x0 + 10, 140, 120, 14, '#4f8a96'); R(ctx, x0 + 10, 140, 120, 1, '#7aa8b0');
      };
      b.fg = function (ctx, t, cam) {
        const x0 = 70 - cam;
        ctx.globalAlpha = 0.6; R(ctx, x0 + 10, 146, 120, 8, '#4f8a96'); ctx.globalAlpha = 1;
        for (let i = 0; i < 10; i++) if (TW.U.hash(i, 1, Math.floor(t * 3)) > 0.5) R(ctx, x0 + 14 + i * 11, 146, 4, 1, '#a8d0d4');
      };
      SC.load(b); SC.cam = 0; SC.camGoal = 0;
    });
    const line = [];
    for (let i = 0; i < 8; i++) line.push(SC.add({ frames: pilgrim(i + 20), x: 230 + i * 10, y: 146 + (i % 2), facing: -1, speed: 24 }));
    const ap = [SC.add({ frames: K.who('john'), x: 120, y: 150, facing: -1 }), SC.add({ frames: K.villager(209), x: 160, y: 150, facing: 1 })];
    void ap;
    const me2 = SC.add({ id: 'player', frames: P0.player, x: heart === 0 ? 220 : 320, y: 147, facing: -1, speed: 22 });
    const dip = async (e, x) => {
      await SC.walk(e, x, 150);
      e.pose = 'sit'; AU() && AU().sfx('splash'); SC.dust(x, 146, 6, { up: true, spread: 6, color: '#d8ecec' });
      await SC.wait(700);
      e.pose = 'raise'; await SC.wait(400); e.pose = 'stand';
      await SC.walk(e, 30, 146);
    };
    if (heart === 0) { await dip(me2, 140); me2.facing = 1; }
    for (let i = 0; i < 4; i++) await dip(line[i], 100 + i * 16);
    if (heart === 1) { await dip(me2, 140); me2.facing = 1; }
    line.slice(4).forEach((e, i) => dip(e, 110 + i * 14));
    await sayS('2:41', '2:41');
    game.observe('pentecost', 'baptized', 'I was baptized in the name of Jesus Christ, with about three thousand others (Acts 2:41).', false, true);
    game.observe('pentecost', 'peter', 'Peter, who denied him by the fire, preached him boldly to the whole city (Acts 2:14–36).', false, true);
    await K.answerAll(game, 'pentecost');

    // the first days together
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.35 } };
      const bg0 = h.bg;
      h.bg = function (ctx, t, cam, sc) {
        bg0.call(h, ctx, t, cam, sc);
        R(ctx, 44, 142, 170, 3, '#7a5a3a'); R(ctx, 44, 142, 170, 1, '#946c46');
        for (let x = 56; x < 210; x += 22) { R(ctx, x, 140, 4, 2, '#c99a58'); R(ctx, x + 8, 140, 3, 2, '#8a3a2a'); }
      };
      SC.load(h); SC.cam = 0;
    });
    [[54, 1], [70, 1], [86, 1], [102, 1], [150, -1], [166, -1], [182, -1], [198, -1]].forEach((c, i) => SC.add({ frames: i % 3 ? pilgrim(i + 40) : K.villager(207 + i), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    SC.add({ frames: K.who('peter'), x: 126, y: 147, pose: 'sit', facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 214, y: 148, pose: 'sit', facing: -1 });
    await sayS('2:42', '2:47');
    await SC.say({ kind: 'drama', text: 'That evening you break bread in the house of a stranger from Cyrene, and he calls you brother.' });
    game.addQuestion(TW.D.episodes.pentecost.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'pentecost', 'Write down what you saw and heard today.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.pentecost = EP;
})(window.TW);
