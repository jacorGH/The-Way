/* The Way — Episode VIII: The Council by Night (Mark 14:53–72) */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const EP = { id: 'council' };
  const say = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('mark14', a, b), text: P.vs('mark14', a, b) });

  function courtyard() {
    const st = K.interiorStage();
    st.audio = { music: 'tension', amb: { night: 0.5, fire: 0.6, room: 0.3 } };
    K.nightWrap(st, { stars: true, dark: 0.32, lights: [{ x: 128, y: 140, r: 64, c: 'rgba(255,150,60,0.55)' }, { x: 20, y: 110, r: 36 }] });
    SC.load(st); SC.cam = 0;
    K.fireAt(128, 147);
    return st;
  }

  EP.run = async function (game) {
    const P0 = K.sprites();
    courtyard();
    const peter = SC.add({ frames: K.who('peter'), x: 112, y: 148, pose: 'sit', facing: 1, speed: 18 });
    const officers = [SC.add({ frames: K.villager(940), x: 144, y: 148, pose: 'sit', facing: -1 }), SC.add({ frames: K.villager(941), x: 160, y: 146, facing: -1 }), SC.add({ frames: K.villager(942), x: 96, y: 146, facing: 1 })];
    const me = SC.add({ id: 'player', frames: P0.player, x: -10, y: 146, facing: 1, speed: 26 });
    await SC.say({ kind: 'drama', text: 'Past midnight, a servant of the high priest pounds on your door. The council is gathering at once, and every scribe who can take notes is wanted.' });
    await SC.walk(me, 52);
    const guards = [SC.add({ frames: K.who('soldier'), x: -20, y: 145, speed: 22 }), SC.add({ frames: K.villager(943), x: -50, y: 145, speed: 22 })];
    const jesus = SC.add({ frames: P0.jesus, x: -35, y: 146, speed: 22 });
    guards.forEach((g, i) => SC.walk(g, 230 + i * 30));
    SC.walk(jesus, 245);
    await say('14:53', '14:54');
    await SC.say({ kind: 'drama', text: 'By the fire sits a big Galilean you have seen before, on the shore at Capernaum. He keeps his face to the flames.' });
    game.observe('council', 'peterfire', 'A Galilean fisherman, one of his disciples, sat warming himself at the high priest’s fire.', false, true);
    void officers; void peter;

    // ---- the council ----
    await K.fade(async () => {
      const st = { width: 256, hotspots: [], audio: { music: 'tension', amb: { room: 0.6, night: 0.2 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } };
      K.nightWrap(st, { dark: 0.38, lights: [{ x: 40, y: 64, r: 50 }, { x: 216, y: 64, r: 50 }, { x: 128, y: 120, r: 46, c: 'rgba(255,170,90,0.3)' }] });
      st.black = 0;
      const fx1 = st.fx;
      st.fx = function (fc, k, t, cam, sc) { fx1.call(st, fc, k, t, cam, sc); if (st.black > 0) { fc.fillStyle = 'rgba(6,4,2,' + st.black + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); } };
      SC.load(st); SC.cam = 0;
    });
    const CH = SC.stage;
    const council = [];
    [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [14, 144], [34, 144], [54, 144], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].forEach((c, i) => {
      council.push(SC.add({ frames: i % 3 === 0 ? K.who('joseph') : P0.scribe(400 + i), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    });
    const nic = SC.add({ frames: K.who('nicodemus'), x: 62, y: 152, facing: 1 });
    const caiaphas = SC.add({ frames: K.who('caiaphas'), x: 196, y: 152, facing: -1, speed: 18 });
    const j2 = SC.add({ frames: P0.jesus, x: 128, y: 152, facing: 1 });
    [SC.add({ frames: K.villager(943), x: 108, y: 152, facing: 1 }), SC.add({ frames: K.villager(944), x: 146, y: 153, facing: -1 })];
    const me2 = SC.add({ id: 'player', frames: P0.player, x: 78, y: 153, facing: 1 });
    void nic; void me2;
    await SC.say({ kind: 'drama', text: 'The council sits in a half circle in the lamplight. Your teacher Nicodemus stands at the end of a bench. He does not look at you.' });
    await say('14:55', '14:56');
    const wit = [SC.add({ frames: K.villager(950), x: -10, y: 152, facing: 1, speed: 30 }), SC.add({ frames: K.villager(951), x: -26, y: 152, facing: 1, speed: 30 })];
    await Promise.all(wit.map((w, i) => SC.walk(w, 96 - i * 10)));
    wit[0].pose = 'out';
    await say('14:57', '14:59');
    wit[0].pose = 'stand'; wit[1].pose = 'out';
    await SC.wait(500);
    wit[1].pose = 'stand';
    wit.forEach((w) => { w.facing = -1; SC.walk(w, -20); });
    game.observe('council', 'witnesses', 'False witnesses spoke against him, but their testimony did not agree (Mark 14:56, 59).', false, true);
    await SC.walk(caiaphas, 158);
    await say('14:60', '14:61');
    const heart = await SC.choose('The room waits for his answer. Where are your eyes?', [
      'On the high priest, as you were trained.',
      'On the floor.',
      'On him.',
    ]);
    game.setHeart('council', heart);
    if (heart === 2) await SC.say({ kind: 'drama', text: 'He is already looking at you, the way he looked along the row of scribes in Capernaum.' });
    await say('14:62', '14:62');
    caiaphas.pose = 'raise';
    SC.dust(caiaphas.x, 132, 10, { up: true, spread: 6, color: '#e8e0cc' });
    AU() && AU().sfx('crash');
    await say('14:63', '14:64');
    council.forEach((c, i) => SC.wait(i * 60).then(() => { c.pose = 'raise'; }));
    await SC.wait(1000);
    await SC.say({ kind: 'drama', text: 'You are a junior scribe; no one asks for your vote. Every hand around you goes up. In Capernaum you thought the same word in silence: blasphemy.' });
    game.observe('council', 'iam', 'Asked if he was the Christ, he answered, “I am” (Mark 14:62).', false, true);
    game.observe('council', 'condemned', 'The council condemned him for blasphemy (Mark 14:64).', false, true);
    await SC.tween(1400, (p) => { CH.black = p * 0.85; });
    await say('14:65', '14:65');

    // ---- the courtyard below ----
    await K.fade(async () => { courtyard(); });
    const p2 = SC.add({ frames: K.who('peter'), x: 112, y: 148, pose: 'sit', facing: 1, speed: 20 });
    const off2 = [SC.add({ frames: K.villager(940), x: 144, y: 148, pose: 'sit', facing: -1 }), SC.add({ frames: K.villager(941), x: 160, y: 146, facing: -1 }), SC.add({ frames: K.villager(942), x: 96, y: 146, facing: 1 })];
    const me3 = SC.add({ id: 'player', frames: P0.player, x: 214, y: 140, facing: -1 });
    const maid = SC.add({ frames: TW.S.person({ skin: '#b8845a', hair: '#2a1a12', tunic: '#9a8a6a', veil: '#8a4a3a' }), x: 248, y: 146, facing: -1, speed: 20 });
    void me3;
    await SC.say({ kind: 'drama', text: 'You come down the stairs into the courtyard, your notes under your arm. The Galilean is still at the fire.' });
    await SC.walk(maid, 150); maid.pose = 'out';
    await say('14:66', '14:68');
    maid.pose = 'stand';
    p2.pose = 'stand'; p2.facing = -1;
    await SC.walk(p2, 50);
    AU() && AU().sfx('rooster');
    p2.facing = 1;
    await SC.walk(maid, 82); maid.pose = 'out';
    await say('14:69', '14:70');
    off2.forEach((o) => { o.pose = 'out'; o.facing = -1; });
    p2.pose = 'raise'; p2.hopping = true;
    await say('14:71', '14:71');
    p2.hopping = false; p2.pose = 'stand';
    AU() && AU().sfx('rooster');
    await SC.wait(1200);
    await say('14:72', '14:72');
    p2.facing = -1;
    await SC.walk(p2, 16);
    p2.pose = 'sit';
    await SC.say({ kind: 'drama', text: 'He goes out into the dark, weeping. For a moment you want to follow him.' });
    game.observe('council', 'denied', 'Below in the courtyard, Peter denied him three times and wept (Mark 14:66–72).', false, true);
    game.addQuestion(TW.D.episodes.council.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'council', 'Dawn is coming. Write down what you saw this night.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.council = EP;
})(window.TW);
