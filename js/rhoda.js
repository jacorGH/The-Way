/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXIV: Rhoda at the Gate (Acts 12:1–17). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'rhoda' };
  const s12 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts12', a, b), text: P.vs('acts12', a, b) });
  const RHODA = { skin: '#b8845a', hair: '#2a1a12', tunic: '#a89a7a', veil: '#7a5a3a' };

  // the prison, as Peter told it at the door
  TW.Vignettes.prison = function () {
    const st = K.interiorStage();
    K.nightWrap(st, { dark: 0.5, lights: [{ x: 230, y: 120, r: 30 }] });
    st.audio = { amb: { room: 0.6, night: 0.15 } };
    st.chains = true;
    const bg0 = st.bg;
    st.bg = function (ctx, t, cam, sc) {
      bg0.call(st, ctx, t, cam, sc);
      for (let x = 60; x < 200; x += 6) R(ctx, x, 60, 2, 86, '#2a2420');
      R(ctx, 56, 58, 148, 3, '#3a322a');
    };
    SC.load(st); SC.cam = 0;
    const g = [SC.add({ frames: K.who('soldier'), x: 112, y: 147, pose: 'sit', facing: 1 }), SC.add({ frames: K.who('soldier'), x: 144, y: 147, pose: 'sit', facing: -1 })];
    const peter = SC.add({ frames: K.who('peter'), x: 128, y: 147, pose: 'sit', facing: 1, speed: 18 });
    const chain = SC.add({ x: 0, y: 0, z: 150, draw(ctx) { if (!st.chains) return; R(ctx, 116, 135, 9, 1, '#8a8a86'); R(ctx, 131, 135, 9, 1, '#8a8a86'); } });
    const angel = SC.add({ frames: K.who('angel'), x: 150, y: 146, facing: -1, visible: false, speed: 18 });
    st.lights.push({ ent: angel, r: 60, dy: 18, c: 'rgba(255,248,225,0.6)' });
    const door = [SC.add({ frames: K.who('soldier'), x: 220, y: 146, facing: -1 }), SC.add({ frames: K.who('soldier'), x: 236, y: 147, facing: -1 })];
    void chain;
    return {
      light: async () => { angel.visible = true; AU() && AU().sfx('chime'); await SC.wait(600); angel.pose = 'out'; await SC.wait(500); st.chains = false; AU() && AU().sfx('coins'); peter.pose = 'stand'; angel.pose = 'stand'; },
      out: async () => { SC.walk(angel, 300); await SC.walk(peter, 290); g.concat(door).forEach((x) => { x.pose = 'sit'; }); },
    };
  };

  EP.run = async function (game) {
    const P0 = K.sprites();
    const st = K.interiorStage();
    K.nightWrap(st, { dark: 0.3, stars: true, lights: [{ x: 90, y: 95, r: 50 }, { x: 168, y: 95, r: 50 }] });
    st.audio = { music: 'night', amb: { room: 0.5, night: 0.4 } };
    SC.load(st); SC.cam = 0;
    await SC.say({ kind: 'history', text: 'Herod Agrippa I, grandson of Herod the Great, now rules Judea as king. It is the week of Unleavened Bread.' });
    await s12('12:1', '12:3');
    await SC.say({ kind: 'drama', text: 'James, who stood by the lake with his brother and mended nets; James, who saw the girl in Jairus’s house rise. You say his name in the dark and cannot say anything after it.' });
    await s12('12:4', '12:5');
    const pray = [];
    [[40, 1], [56, 1], [72, 1], [88, 1], [104, 1], [150, -1], [166, -1], [182, -1], [198, -1]].forEach((c, i) => pray.push(SC.add({ frames: K.villager(1900 + i, i % 2 === 0), x: c[0], y: 147, pose: 'sit', facing: c[1] })));
    const mary = SC.add({ frames: S.person({ skin: '#a8724a', hair: '#9a9288', tunic: '#5a4a5a', veil: '#7a6a7a' }), x: 128, y: 146, pose: 'sit', facing: 1 });
    const rhoda = SC.add({ frames: S.person(RHODA), x: 216, y: 146, pose: 'sit', facing: -1, speed: 34 });
    const niece = TW.Role.is();
    const me = SC.add({ id: 'player', frames: P0.player, x: niece ? 230 : 140, y: 147, pose: 'sit', facing: -1, speed: 32 });
    void mary;
    await SC.say({ kind: 'drama', text: 'The house of Mary, the mother of John Mark, is full past midnight. Nobody has gone home. ' + (niece ? 'You sit near the door with Rhoda, the serving girl, who keeps falling asleep against your shoulder and waking to pray again.' : 'You sit among the men near the lamps, praying in a whisper with everyone else.') });
    pray.forEach((p) => { p.pose = 'raise'; });
    await SC.wait(1200);
    pray.forEach((p) => { p.pose = 'sit'; });
    // the knock
    AU() && (AU().sfx('tap'), AU().sfx('tap', 0.4), AU().sfx('tap', 0.8));
    await s12('12:12', '12:13');
    rhoda.pose = 'stand';
    await SC.walk(rhoda, 14);
    rhoda.facing = 1;
    await SC.wait(700);
    rhoda.speed = 50;
    await SC.walk(rhoda, 120);
    rhoda.pose = 'raise'; rhoda.hopping = true;
    await s12('12:14', '12:14');
    rhoda.hopping = false;
    pray.forEach((p, i) => { p.facing = p.x < 120 ? 1 : -1; if (i % 3 === 0) p.pose = 'out'; });
    await s12('12:15', '12:15');
    pray.forEach((p) => { p.pose = 'sit'; });
    const heart = await SC.choose('The knocking goes on. Rhoda is near tears. Everyone is looking at her.', [
      'Believe her, and run to the gate with her.',
      'Say what the others say: it must be his angel.',
      'Keep praying. Do not look up.',
    ]);
    game.setHeart('rhoda', heart);
    if (heart === 0) { me.pose = 'stand'; rhoda.facing = -1; await Promise.all([SC.walk(me, 20), SC.walk(rhoda, 30)]); }
    else if (heart === 1) await SC.say({ kind: 'drama', text: '“It must be his angel,” you hear yourself say. Rhoda looks at you as if you had struck her.' });
    else { me.pose = 'raise'; await SC.say({ kind: 'drama', text: 'You keep your eyes closed and your hands raised. You are praying for Peter. You do not want to be interrupted.' }); }
    AU() && (AU().sfx('tap'), AU().sfx('tap', 0.4));
    const peter = SC.add({ frames: K.who('peter'), x: -12, y: 146, facing: 1, speed: 18 });
    await SC.walk(peter, 44);
    pray.forEach((p) => { p.pose = 'stand'; p.facing = -1; });
    if (heart === 2) { me.pose = 'sit'; }
    AU() && (AU().music('wonder'), AU().sfx('cheer'));
    await s12('12:16', '12:16');
    peter.pose = 'raise';
    await SC.wait(600);
    peter.pose = 'stand';
    game.observe('rhoda', 'gate', 'Rhoda knew Peter’s voice at the gate. We told her she was mad. Then we opened it (Acts 12:13–16).', false, true);

    // Peter tells how the Lord brought him out
    const mem = await TW.Vignettes.enter('prison', 'Peter');
    await s12('12:6', '12:6');
    await mem.light();
    await s12('12:7', '12:8');
    await mem.out();
    await s12('12:9', '12:11');
    await TW.Vignettes.exit();
    game.observe('rhoda', 'prison', 'An angel woke Peter in prison; the chains fell from his hands, and the iron gate opened by itself (Acts 12:7–10).', false, true);
    await s12('12:17', '12:17');
    peter.facing = -1;
    await SC.walk(peter, -20);
    await SC.say({ kind: 'drama', text: 'He is gone before dawn. Rhoda sits by the gate until the sun comes up, and no one tells her she is mad again.' });
    game.addQuestion(TW.D.episodes.rhoda.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'rhoda', 'Write it down. Begin with Rhoda.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.rhoda = EP;
})(window.TW);
