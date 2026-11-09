/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXIX: Lydia (Acts 16:1–15). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'lydia' };
  const s16 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts16', a, b), text: P.vs('acts16', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- Lystra: Timothy ----
    SC.load({ width: 256, audio: { music: 'land', amb: { village: 0.4, birds: 0.4, wind: 0.15 } }, bg(ctx) { ctx.drawImage(K.nainArt(), 0, 0); } });
    SC.cam = 0;
    const paul = SC.add({ frames: K.who('saul'), x: 100, y: 147, facing: 1 });
    SC.add({ frames: K.who('silas'), x: 84, y: 148, facing: 1 });
    const tim = SC.add({ frames: K.who('timothy'), x: 150, y: 147, facing: -1 });
    const mother = SC.add({ frames: S.person({ skin: '#b8845a', hair: '#5f5048', tunic: '#5a4a3a', veil: '#7a6a5a' }), x: 168, y: 148, facing: -1 });
    SC.add({ frames: S.person({ skin: '#a8724a', hair: '#c8c0b4', tunic: '#4a4a3a', veil: '#8a8a7a' }), x: 184, y: 148, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 60, y: 149, facing: 1 });
    await SC.say({ kind: 'drama', text: 'Back over the Taurus with Paul and Silas, to Lystra, where you once stood in a ring of disciples around a man left for dead. A boy who was crying that day is a young man now.' });
    await s16('16:1', '16:2');
    await SC.say({ kind: 'history', text: 'Paul later wrote of the faith that lived first in Timothy’s grandmother Lois and his mother Eunice (2 Timothy 1:5).' });
    tim.facing = -1; void mother; void paul;

    // ---- Troas: the vision ----
    await K.fade(async () => {
      const st = K.interiorStage();
      K.nightWrap(st, { dark: 0.35, stars: true, lights: [{ x: 128, y: 120, r: 50, c: 'rgba(255,248,225,0.0)' }] });
      st.audio = { music: 'night', amb: { room: 0.4, shore: 0.4, night: 0.3 } };
      SC.load(st); SC.cam = 0;
    });
    const NS = SC.stage;
    await s16('16:6', '16:8');
    const sleeper = SC.add({ x: 110, y: 147, z: 146, draw(ctx, sx, sy) { ctx.drawImage(S.lying(K.looks.saul), sx - 14, sy - 10); } });
    const mac = SC.add({ frames: K.who('macedonian'), x: 150, y: 146, facing: -1, visible: false });
    NS.lights[0].ent = mac; NS.lights[0].c = 'rgba(255,248,225,0.5)';
    await SC.wait(600);
    mac.visible = true; mac.pose = 'out';
    AU() && AU().sfx('chime');
    await s16('16:9', '16:9');
    mac.visible = false;
    SC.ents = SC.ents.filter((e) => e !== sleeper);
    const p2 = SC.add({ frames: K.who('saul'), x: 110, y: 147, facing: 1 });
    const luke = SC.add({ frames: K.who('luke'), x: 170, y: 147, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 196, y: 148, facing: -1 });
    p2.pose = 'out';
    await s16('16:10', '16:10');
    p2.pose = 'stand';
    await SC.say({ kind: 'history', text: 'Here Luke’s account turns from “they” to “we.” Most readers take it that the author of Luke and Acts joined Paul at Troas.' });
    await SC.say({ kind: 'drama', speaker: 'Luke', text: 'You are the one with the scroll. Paul says you were in Jerusalem from the beginning. I am a physician, and I ask a great many questions. May I read it?' });
    const share = await SC.choose('He holds out his hand for your scroll.', ['Give it to him.', 'Tell him you will read it to him on the ship.']);
    await SC.say({ kind: 'drama', text: share === 0 ? 'He reads it standing up, by the lamp, for a long time. When he gives it back, he says only: “You write down what you saw, and you say when you did not see it. Good.”' : 'On the ship you read it to him, and he stops you every few lines to ask who else was there.' });
    game.observe('lydia', 'luke', 'At Troas a physician named Luke joined us. He asked to hear everything I had written.', false, true);
    void luke;

    // ---- the crossing ----
    await K.fade(async () => { K.seaStage(); });
    const SEA = SC.stage;
    [['saul', 112], ['silas', 124], ['timothy', 136], ['luke', 148]].forEach((c) => SC.add({ frames: K.who(c[0]), x: c[1], y: 124, z: 137, facing: 1 }));
    SC.add({ id: 'player', frames: P0.player, x: 98, y: 124, z: 137, facing: 1 });
    await s16('16:11', '16:11');
    await SC.tween(2500, (p) => { SEA.land = p; });
    await SC.say({ kind: 'drama', text: 'On the second day the mountains of Macedonia rise out of the sea. Paul stands at the bow. It is the first time any of you has seen Europe.' });

    // ---- Philippi ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'land', amb: { city: 0.4, crowd: 0.35, birds: 0.2 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); } });
      SC.cam = 0; SC.camGoal = 0;
    });
    for (let i = 0; i < 6; i++) SC.add({ frames: i % 2 ? K.who('roman') : K.who('soldier'), x: 70 + i * 34, y: 147 + (i % 2), facing: i % 2 ? 1 : -1 });
    SC.add({ id: 'player', frames: P0.player, x: 40, y: 149, facing: 1 });
    await s16('16:12', '16:12');
    await SC.say({ kind: 'history', text: 'Philippi was a Roman colony: Latin on the inscriptions, veterans’ families on the farms, and Roman law in the forum. There seems to have been no synagogue.' });

    // ---- the river ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'reflect', amb: { birds: 0.6, wind: 0.2, shore: 0.25 } }, bg(ctx, t, cam) { ctx.drawImage(K.riverArt(), -cam, 0); } });
      SC.cam = 40; SC.camGoal = 40;
    });
    const women = [];
    [[160, 'romanw'], [176, null], [192, null], [210, 'lydia']].forEach((w, i) => women.push(SC.add({ frames: w[1] ? K.who(w[1]) : S.person({ skin: K.pick(K.SKINS, i + 4, 1), hair: '#2a1a12', tunic: '#7a6a52', veil: ['#5a4a3a', '#8a6a4a'][i % 2] }), x: w[0], y: 122, pose: 'sit', facing: -1 })));
    const lydia = women[3];
    const p3 = SC.add({ frames: K.who('saul'), x: 120, y: 122, pose: 'sit', facing: 1 });
    SC.add({ frames: K.who('silas'), x: 104, y: 123, pose: 'sit', facing: 1 });
    SC.add({ frames: K.who('luke'), x: 88, y: 123, pose: 'sit', facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: niece ? 226 : 72, y: 123, pose: 'sit', facing: niece ? -1 : 1 });
    if (niece) await SC.say({ kind: 'drama', text: 'You sit down among the women by the water. One of them, in a mantle dyed a purple you have only seen on the rich, makes room for you without a word.' });
    await s16('16:13', '16:13');
    p3.pose = 'out';
    await s16('16:14', '16:14');
    p3.pose = 'sit';
    lydia.pose = 'stand'; lydia.y = 126;
    AU() && AU().music('wonder');
    await SC.walk(lydia, 200, 136);
    lydia.pose = 'sit';
    AU() && AU().sfx('splash');
    SC.dust(200, 132, 8, { up: true, spread: 6, color: '#d8ecec' });
    await SC.wait(700);
    lydia.pose = 'stand';
    await SC.walk(lydia, 150, 124);
    lydia.facing = -1; lydia.pose = 'out';
    await s16('16:15', '16:15');
    const heart = await SC.choose('“Come into my house, and stay.” She is looking at you too.', [
      'Accept at once.',
      'Look to Paul before you answer.',
      'Hesitate at a Gentile woman’s door, then go in.',
    ]);
    game.setHeart('lydia', heart);
    await SC.say({ kind: 'drama', text: heart === 0 ? 'Lydia laughs and claps her hands, and sends a servant running ahead to tell the house.' : heart === 1 ? 'Paul nods to you, very slightly, as if to say that you no longer need to ask.' : 'Her house is the largest you have entered since Caesarea. On the threshold you think of Peter and the sheet let down from heaven, and you go in.' });
    game.observe('lydia', 'lydia', 'By the river at Philippi, the Lord opened Lydia’s heart. She and her household were baptized, and she took us into her house (Acts 16:14–15).', false, true);
    game.addQuestion(TW.D.episodes.lydia.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'lydia', 'Write it down in Lydia’s house.');
    void R;
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.lydia = EP;
})(window.TW);
