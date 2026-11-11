/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XVI: The Seven (Acts 6:1–7).
   The scribe helps with the daily distribution. Bread is limited; the Greek-speaking widows stand at the back.
   However he serves, the complaint of 6:1 has already been made: Scripture is not changed, only seen from inside. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'seven' };
  // lines assembled during play are built in Spanish when Spanish is chosen
  const ES = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const NAMES_ES = { 'Lydia of Antioch': 'Lidia de Antioquía', 'Miriam of Alexandria': 'Miriam de Alejandría', 'Euodia of Alexandria': 'Evodia de Alejandría', 'Theodora of Cyrene': 'Teodora de Cirene', 'Yohanna of Bethany': 'Yohanna de Betania', 'Dinah': 'Dina' };
  const NM = (n) => NAMES_ES[n] || n;
  const s6 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts6', a, b), text: P.vs('acts6', a, b) });

  const WIDOWS = [
    { name: 'Yohanna of Bethany', greek: false, kids: 2, look: { skin: '#a8724a', hair: '#2a1a12', tunic: '#5a4a3a', veil: '#4a3e34' } },
    { name: 'Shoshanna', greek: false, kids: 0, look: { skin: '#a06a42', hair: '#5f5048', tunic: '#6a5a42', veil: '#5a4a3a' } },
    { name: 'Rivka', greek: false, kids: 1, look: { skin: '#b07a50', hair: '#2a1a12', tunic: '#4a4a3a', veil: '#3e342c' } },
    { name: 'Dinah', greek: false, kids: 0, look: { skin: '#9a6440', hair: '#9a9288', tunic: '#5a4a3a', veil: '#4a3e34' } },
    { name: 'Theodora of Cyrene', greek: true, kids: 3, look: { skin: '#8a5636', hair: '#1e1410', tunic: '#6a7a8a', veil: '#9a7a5a' } },
    { name: 'Lydia of Antioch', greek: true, kids: 0, look: { skin: '#b8845a', hair: '#5f5048', tunic: '#8a5a6a', veil: '#b3a080' } },
    { name: 'Euodia of Alexandria', greek: true, kids: 1, look: { skin: '#a8724a', hair: '#2a1a12', tunic: '#5a7a6a', veil: '#a8946c' } },
    { name: 'Miriam of Alexandria', greek: true, kids: 0, look: { skin: '#a8724a', hair: '#9a9288', tunic: '#5a4a3a', veil: '#7a6a5a' } },
  ];
  const need = (w) => 1 + (w.kids > 0 ? 1 : 0);

  EP.run = async function (game) {
    const P0 = K.sprites();
    const st = K.interiorStage();
    st.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.4 } };
    st.loaves = 12;
    const bg0 = st.bg;
    st.bg = function (ctx, t, cam, sc) {
      bg0.call(st, ctx, t, cam, sc);
      R(ctx, 60, 140, 46, 3, '#7a5a3a'); R(ctx, 60, 140, 46, 1, '#946c46'); R(ctx, 62, 143, 2, 5, '#5a3e26'); R(ctx, 102, 143, 2, 5, '#5a3e26');
      R(ctx, 64, 132, 18, 8, '#a88e5c'); R(ctx, 64, 132, 18, 1, '#c9ae78');
      for (let i = 0; i < st.loaves; i++) R(ctx, 66 + (i % 6) * 3 - (i % 2), 130 - Math.floor(i / 6) * 2, 3, 2, '#c99a58');
      R(ctx, 88, 134, 6, 6, '#9a6a44'); R(ctx, 89, 133, 4, 1, '#7a5034');
    };
    SC.load(st); SC.cam = 0;
    const helper = SC.add({ frames: K.villager(1300), x: 54, y: 146, facing: 1 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 84, y: 148, facing: 1, speed: 26 });
    const line = WIDOWS.map((w, i) => {
      const e = SC.add({ frames: S.person(w.look), x: 120 + i * 17 + (w.greek ? 12 : 0), y: 146 + (i % 2), facing: -1, speed: 20 });
      e.w = w; e.given = 0; e.asked = false;
      return e;
    });
    await SC.say({ kind: 'drama', text: 'The believers now number in the thousands. Every afternoon the widows come to this courtyard for bread. Today the man who usually helps is sick, and you have been asked to take his place.' });
    await SC.say({ kind: 'drama', speaker: 'Your helper', text: 'Twelve loaves today, that is all. Start at the front. The ones at the back are the Greek speakers; they came late from the lower city, and they can wait.' });
    const order = await SC.choose('Twelve loaves, eight widows. Where do you begin?', [
      'At the front of the line, as you were told.',
      'At the back, where the Greek-speaking widows stand.',
    ], 'Daily bread');
    const queue = order === 0 ? line.slice() : line.slice().reverse();
    let askedCount = 0;
    for (const e of queue) {
      if (st.loaves <= 0) break;
      await SC.walk(e, 104);
      e.facing = -1;
      let pick;
      for (;;) {
        const opts = ['One loaf.', 'Two loaves.'];
        if (!e.asked) opts.push('Ask about her household first.');
        pick = await SC.choose(ES()
          ? NM(e.w.name) + (e.asked ? (e.w.kids ? ', con ' + e.w.kids + (e.w.kids > 1 ? ' hijos' : ' hijo') + ' en casa' : ', sola') : '') + '. Panes restantes: ' + st.loaves + '.'
          : e.w.name + (e.asked ? (e.w.kids ? ', with ' + e.w.kids + (e.w.kids > 1 ? ' children' : ' child') + ' at home' : ', alone') : '') + '. Loaves left: ' + st.loaves + '.', opts, 'Daily bread');
        if (pick < 2) break;
        e.asked = true; askedCount++;
        await SC.say({ kind: 'drama', speaker: e.w.name, text: e.w.kids ? (ES()
          ? (e.w.greek ? 'Tengo ' + e.w.kids + ' en casa. No nos dejan acercarnos al frente.' : e.w.kids + (e.w.kids > 1 ? ' hijos' : ' hijo') + ', y nada en la casa.')
          : (e.w.greek ? 'I have ' + e.w.kids + ' at home. They do not let us near the front.' : e.w.kids + (e.w.kids > 1 ? ' children' : ' child') + ', and nothing in the house.')) : 'Only me now.' });
      }
      const give = Math.min(st.loaves, pick + 1);
      st.loaves -= give; e.given = give;
      AU() && AU().sfx('tap');
      e.pose = 'carry';
      await SC.walk(e, -20);
      e.visible = false;
    }
    const unfed = line.filter((e) => e.given === 0);
    const short = line.filter((e) => e.given > 0 && e.given < need(e.w));
    const heart = order === 1 ? 2 : askedCount >= 5 ? 1 : 0;
    game.setHeart('seven', heart);
    if (unfed.length) {
      for (const e of unfed) { e.facing = -1; }
      await SC.say({ kind: 'drama', text: ES()
        ? 'La canasta está vacía. ' + unfed.map((e) => NM(e.w.name)).join(', ') + (unfed.length > 1 ? ' siguen' : ' sigue') + ' de pie en el patio con las manos vacías.' + (unfed.some((e) => e.w.greek) ? (unfed.length > 1 ? ' Todas hablan griego.' : ' Habla griego.') : '')
        : 'The basket is empty. ' + unfed.map((e) => e.w.name).join(', ') + (unfed.length > 1 ? ' are' : ' is') + ' still standing in the courtyard with empty hands.' + (unfed.some((e) => e.w.greek) ? ' Every one of them speaks Greek.' : '') });
      game.observe('seven', 'unfed', 'The bread ran out before everyone was fed. ' + (unfed.some((e) => e.w.greek) ? 'The Greek-speaking widows at the back went home with nothing.' : 'Some widows went home with nothing.'), false, true);
    } else {
      await SC.say({ kind: 'drama', text: ES()
        ? 'Cada viuda vuelve a casa con pan.' + (short.length ? ' No todas con suficiente.' : ' Por una vez, alcanzó.')
        : 'Every widow goes home with bread.' + (short.length ? ' Not all of them with enough.' : ' For once, it was enough.') });
      game.observe('seven', 'fed', 'Every widow received bread today' + (short.length ? ', though not every family had enough.' : ', each by her need.'), false, true);
    }
    await SC.say({ kind: 'drama', text: 'You have run this courtyard for one afternoon. The widows from the Dispersion have stood at the back of it every day for months.' });
    helper.facing = -1;

    // the assembly
    await K.fade(async () => {
      const a = K.courtStage(false);
      a.audio = { music: 'reflect', amb: { crowd: 0.55, city: 0.4, doves: 0.3 } };
      SC.load(a); SC.cam = 0; SC.camGoal = 0;
    });
    const crowd = [];
    for (let i = 0; i < 14; i++) crowd.push(SC.add({ frames: K.villager(1320 + i, i % 3 === 1), x: 20 + i * 16, y: 148 + (i % 3), facing: 1 }));
    const twelve = ['peter', 'john', 'thomas'].concat([0, 1, 2, 3, 4, 5, 6, 7, 8]).map((n, i) => SC.add({ frames: typeof n === 'string' ? K.who(n) : K.villager(207 + n), x: 250 + (i % 6) * 8, y: 124 + Math.floor(i / 6) * 5, facing: -1 }));
    SC.camGoal = 64;
    SC.add({ id: 'player', frames: P0.player, x: 160, y: 152, facing: 1 });
    twelve[0].pose = 'out';
    await s6('6:1', '6:4');
    twelve[0].pose = 'stand';
    const sevenNames = ['stephen', 1340, 1341, 1342, 1343, 1344, 1345];
    const seven = sevenNames.map((n, i) => SC.add({ frames: typeof n === 'string' ? K.who(n) : K.villager(n), x: 80 + i * 18, y: 147 + (i % 2), facing: 1, speed: 20 }));
    await s6('6:5', '6:5');
    await Promise.all(seven.map((s, i) => SC.wait(i * 150).then(() => SC.walk(s, 214 + i * 6, 136 + (i % 2) * 3))));
    seven.forEach((s) => { s.pose = 'sit'; });
    twelve.forEach((t) => { t.pose = 'out'; });
    await s6('6:6', '6:6');
    twelve.forEach((t) => { t.pose = 'stand'; }); seven.forEach((s) => { s.pose = 'stand'; });
    game.observe('seven', 'chosen', 'Seven men full of the Spirit and of wisdom were chosen to serve, Stephen first among them (Acts 6:5).', false, true);
    const stephen = seven[0];
    await SC.walkPath(stephen, [[200, 146], [176, 151]]);
    stephen.facing = -1;
    await SC.say({ kind: 'drama', speaker: 'Stephen', text: 'They tell me you are a scribe, and that you counted the widows at the back of the line. I need someone who can keep lists, and who knows why they matter. Will you help me?' });
    await s6('6:7', '6:7');
    await SC.say({ kind: 'drama', text: 'From now on there are people in this city who need you. Look for them on the map.' });
    game.addQuestion(TW.D.episodes.seven.question);
    SC.toast('Service is open on the Jerusalem map');
    K.finish(game, 'seven', 'Write down what happened in the courtyard.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.seven = EP;
})(window.TW);
