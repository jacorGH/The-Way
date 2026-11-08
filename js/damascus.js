/* The Way — Episode XX: The Road to Damascus (Acts 9:1–31).
   The scribe comes north to warn the believers, and arrives to find Saul blind and praying. Saul's account of the road
   plays as his own memory. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'damascus' };
  const sayS = (key, a, b) => SC.say({ kind: 'scripture', ref: P.ref(key, a, b), text: P.vs(key, a, b) });

  // Saul's memory of the road
  TW.Vignettes.road = function () {
    const st = { width: 400, flash: 0, audio: { amb: { wind: 0.6 } },
      bg(ctx, t, cam) { ctx.drawImage(K.desertArt(), -cam, 0); },
      fx(fc, k) { if (st.flash > 0) { fc.fillStyle = 'rgba(255,252,240,' + st.flash + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); } } };
    SC.load(st); SC.cam = 0; SC.camGoal = 0;
    const saul = SC.add({ frames: K.who('saul'), x: -10, y: 146, facing: 1, speed: 18 });
    const men = [0, 1, 2].map((i) => SC.add({ frames: i ? K.who('guard') : K.villager(1600), x: -30 - i * 16, y: 147 + (i % 2), facing: 1, speed: 18 }));
    let down = null;
    return {
      walk: async () => { men.forEach((m, i) => SC.walk(m, 96 - i * 16)); await SC.walk(saul, 120); },
      light: async () => {
        AU() && AU().sfx('thunder');
        await SC.tween(500, (p) => { st.flash = p; });
        saul.visible = false;
        down = SC.add({ x: 120, y: 147, z: 146, draw(ctx, sx, sy) { ctx.drawImage(S.lying(K.looks.saul), sx - 14, sy - 10); } });
        men.forEach((m) => { m.pose = 'raise'; });
        await SC.tween(1400, (p) => { st.flash = 1 - p * 0.6; });
      },
      rise: async () => {
        SC.ents = SC.ents.filter((e) => e !== down);
        saul.visible = true; saul.pose = 'stand';
        men.forEach((m) => { m.pose = 'stand'; });
        await SC.tween(900, (p) => { st.flash = 0.4 * (1 - p); });
        men[0].speed = 10; saul.speed = 10;
        SC.walk(men[0], 200); await SC.walk(saul, 186);
      },
    };
  };

  EP.run = async function (game) {
    const P0 = K.sprites();
    SC.load({ width: 320, audio: { music: 'land', amb: { crowd: 0.45, city: 0.55, doves: 0.2, birds: 0.15 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt(), -cam, 0); } });
    SC.cam = 0; SC.camGoal = 0;
    const me = SC.add({ id: 'player', frames: P0.player, x: -10, y: 148, facing: 1, speed: 24 });
    for (let i = 0; i < 6; i++) SC.add({ frames: K.villager(1610 + i, i % 2 === 0), x: 60 + i * 40, y: 146 + (i % 3), facing: i % 2 ? -1 : 1 });
    await SC.say({ kind: 'drama', text: 'You walked north for a week to warn the believers in Damascus that Saul was coming with letters. You are too late, though not in the way you feared.' });
    await sayS('acts9', '9:1', '9:2');
    await SC.say({ kind: 'history', text: '“The Way” is what the believers are called. Saul’s letters name you, too, though he does not know your face.' });
    await SC.walk(me, 120);

    // Ananias's house
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5 } };
      h.glow = 0;
      const fx0 = h.fx;
      h.fx = function (fc, k, t, cam, sc) {
        if (fx0) fx0.call(h, fc, k, t, cam, sc);
        if (h.glow > 0) { fc.globalCompositeOperation = 'lighter'; const g = fc.createRadialGradient(128 * k, 120 * k, 0, 128 * k, 120 * k, 50 * k); g.addColorStop(0, 'rgba(255,248,225,' + h.glow + ')'); g.addColorStop(1, 'rgba(255,248,225,0)'); fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k); fc.globalCompositeOperation = 'source-over'; }
      };
      SC.load(h); SC.cam = 0;
    });
    const H = SC.stage;
    const ananias = SC.add({ frames: K.who('ananias'), x: 128, y: 147, pose: 'sit', facing: -1, speed: 20 });
    SC.add({ id: 'player', frames: P0.player, x: 80, y: 148, pose: 'sit', facing: 1 });
    await SC.say({ kind: 'drama', text: 'An old disciple named Ananias takes you in. Before supper he kneels to pray, and does not get up for a long time. Then he speaks aloud, to someone you cannot see.' });
    await SC.tween(1400, (p) => { H.glow = p * 0.45; });
    await sayS('acts9b', '9:10', '9:12');
    await sayS('acts9b', '9:13', '9:14');
    await sayS('acts9b', '9:15', '9:16');
    await SC.tween(1000, (p) => { H.glow = 0.45 * (1 - p); });
    ananias.pose = 'stand';
    await SC.say({ kind: 'drama', speaker: 'Ananias', text: 'He says Saul of Tarsus is praying on Straight Street, at the house of Judah. He says I am to lay my hands on him.' });
    const sawFace = game.save.heart.stephen === 1;
    const heart = await SC.choose(sawFace ? 'You stood beside Saul when Stephen died. You know his face. Ananias is looking at you.' : 'Saul has your name on his list. Ananias is looking at you.', [
      'Tell him you are afraid too.',
      'Go with him without a word.',
      'Pray for Saul before you go.',
    ]);
    game.setHeart('damascus', heart);
    if (heart === 0) await SC.say({ kind: 'drama', speaker: 'Ananias', text: 'Good. So am I. Let us be afraid together, then, and go.' });
    else if (heart === 2) await SC.say({ kind: 'drama', text: 'You pray for the man who kept the cloaks. It is the hardest prayer you have ever prayed. Somewhere across the city, he is praying too.' });

    // the house of Judah
    await K.fade(async () => {
      const h2 = K.interiorStage();
      K.nightWrap(h2, { dark: 0.3, lights: [{ x: 150, y: 120, r: 46, c: 'rgba(255,190,120,0.35)' }] });
      h2.audio = { music: 'night', amb: { room: 0.5 } };
      SC.load(h2); SC.cam = 0;
    });
    const saul = SC.add({ frames: K.who('saul'), x: 160, y: 147, pose: 'sit', facing: -1 });
    const an2 = SC.add({ frames: K.who('ananias'), x: -10, y: 146, facing: 1, speed: 18 });
    const me3 = SC.add({ id: 'player', frames: P0.player, x: -26, y: 147, facing: 1, speed: 18 });
    SC.walk(me3, 110);
    await SC.walk(an2, 140);
    await SC.say({ kind: 'drama', text: 'He has not eaten in three days. His eyes are open, and they see nothing.' });
    an2.pose = 'out';
    await sayS('acts9', '9:17', '9:17');
    SC.dust(160, 125, 10, { up: false, spread: 4, color: '#f4f0e6' });
    AU() && (AU().sfx('chime'), AU().music('wonder'));
    await sayS('acts9', '9:18', '9:18');
    saul.pose = 'stand';
    an2.pose = 'stand';
    await sayS('acts9b', '9:19', '9:19');
    game.observe('damascus', 'brother', 'Ananias laid his hands on Saul and called him “Brother Saul.” Something like scales fell from his eyes (Acts 9:17–18).', false, true);

    // Saul remembers the road
    await SC.choose('Saul sits down to eat. You have one question.', ['What happened on the road?'], 'Your question');
    const mem = await TW.Vignettes.enter('road', 'Saul of Tarsus');
    await mem.walk();
    await sayS('acts9', '9:3', '9:3');
    await mem.light();
    await sayS('acts9', '9:4', '9:6');
    await sayS('acts9', '9:7', '9:7');
    await mem.rise();
    await sayS('acts9', '9:8', '9:9');
    await TW.Vignettes.exit();
    if (sawFace) await SC.say({ kind: 'drama', speaker: 'Saul', text: 'I know you. You were by the cloaks, watching me as I watched him. I thought I was serving God that day.' });
    else await SC.say({ kind: 'drama', speaker: 'Saul', text: 'They tell me you were outside the gate when Stephen died. I was there too. I kept the cloaks. I thought I was serving God.' });
    await SC.say({ kind: 'drama', text: 'Years from now he will tell a crowd in Jerusalem what he told you tonight:' });
    await sayS('acts22', '22:20', '22:20');
    game.observe('damascus', 'road', 'On the road, a light from the sky; a voice: “I am Jesus, whom you are persecuting” (Acts 9:3–5).', false, true);
    await K.answerAll(game, 'damascus');

    // Saul preaches
    await K.fade(async () => {
      SC.load({ width: 256, hotspots: [], audio: { music: 'reflect', amb: { room: 0.55, crowd: 0.2 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
      SC.cam = 0;
    });
    [[10, 124], [26, 124], [12, 134], [30, 134], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].forEach((c, i) => SC.add({ frames: K.villager(1620 + i, i % 3 === 1), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    SC.add({ frames: K.who('saul'), x: 128, y: 152, facing: 1, pose: 'out' });
    SC.add({ id: 'player', frames: P0.player, x: 56, y: 153, facing: 1 });
    await sayS('acts9b', '9:20', '9:22');
    await SC.say({ kind: 'drama', text: 'When Saul goes up to Jerusalem at last, the believers there will be afraid of him. It will take a Levite from Cyprus to vouch for him.' });
    await sayS('acts9', '9:26', '9:27');
    game.addQuestion(TW.D.episodes.damascus.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'damascus', 'Write it down. No one in Jerusalem will believe it.');
    void R;
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.damascus = EP;
})(window.TW);
