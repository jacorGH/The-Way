/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XLV: The Good Fight (2 Timothy). Scripture does not say whether Timothy reached Paul in time;
   the episode ends at the prison gate. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'goodfight' };
  const t2 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('tim2', a, b), text: P.vs('tim2', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- Rome burns ----
    SC.load({ width: 320, audio: { music: 'storm', amb: { fire: 1, crowd: 0.6, wind: 0.4 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); },
      fx(fc, k, t) { fc.fillStyle = 'rgba(20,8,4,0.55)'; fc.fillRect(0, 0, 256 * k, 160 * k); const g = fc.createLinearGradient(0, 40 * k, 0, 130 * k); g.addColorStop(0, 'rgba(255,90,20,0)'); g.addColorStop(1, 'rgba(255,110,30,' + (0.45 + Math.sin(t * 5) * 0.08) + ')'); fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k); } });
    SC.cam = 32;
    await SC.say({ kind: 'history', text: 'Rome, July of AD 64. Fire breaks out near the Circus and burns for days. When it is over, much of the city is gone, and the emperor Nero needs someone to blame. He chooses the Christians.' });
    await SC.say({ kind: 'history', text: 'Some time after this, Paul is arrested again. This time there is no rented house: he is chained as a criminal, and most of his friends are far away.' });

    // ---- Ephesus: the letter comes ----
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, city: 0.25 } };
      SC.load(h); SC.cam = 0;
    });
    const tim = SC.add({ frames: K.who('timothy'), x: 120, y: 146, facing: 1, pose: 'sit' });
    SC.add({ frames: K.who('eunice'), x: 170, y: 147, facing: -1, pose: 'sit' });
    const me = SC.add({ id: 'player', frames: P0.player, x: niece ? 186 : 90, y: 148, pose: 'sit', facing: niece ? -1 : 1 });
    const courier = SC.add({ frames: K.villager(3500), x: 280, y: 147, facing: -1, speed: 20 });
    await SC.say({ kind: 'drama', text: niece ? 'Ephesus. You have grown old in this city, beside Timothy’s mother Eunice, who still tells him to eat. Timothy leads the church now. He is no longer the boy who cried outside the gate at Lystra.' : 'Ephesus. You have grown old in this city. Timothy leads the church now; he is no longer the boy who cried outside the gate at Lystra. His mother Eunice still tells him to eat.' });
    await SC.walk(courier, 150);
    courier.pose = 'out';
    await SC.say({ kind: 'drama', text: 'A traveler from Rome, grey with dust, puts a small sealed letter into Timothy’s hands. He knows the writing on the outside before he breaks the seal.' });
    courier.pose = 'stand';
    tim.pose = 'stand';
    await t2('1:3', '1:5');
    await t2('1:7', '1:8');
    await t2('1:12', '1:12');
    await t2('2:8', '2:9');
    AU() && AU().music('lament');
    await t2('4:6', '4:8');
    tim.pose = 'sit';
    const heart = await SC.choose('Timothy has stopped reading. His hands are shaking so that the papyrus rattles.', [
      'Take the letter gently and read the rest for him.',
      'Begin packing for Rome at once.',
      'Sit with him in silence.',
    ]);
    game.setHeart('goodfight', heart);
    if (heart === 0) me.pose = 'stand';
    await t2('4:9', '4:13');
    await SC.say({ kind: 'drama', text: 'A cloak, because the cell is cold. The books. “Especially the parchments.” You have carried a scroll for nearly forty years; you know exactly what that means to a man.' });
    await t2('4:16', '4:18');
    await t2('4:21', '4:22');
    await K.answerAll(game, 'goodfight');
    game.observe('goodfight', 'fight', 'From his last prison Paul wrote to Timothy: “I have fought the good fight. I have finished the course. I have kept the faith” (2 Timothy 4:7).', false, true);

    // ---- Troas: the cloak and the parchments ----
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, shore: 0.3 } };
      SC.load(h); SC.cam = 0;
    });
    SC.add({ frames: K.who('carpus'), x: 150, y: 146, facing: -1, pose: 'out' });
    SC.add({ frames: K.who('timothy'), x: 110, y: 146, facing: 1 });
    SC.add({ frames: K.who('johnmark'), x: 92, y: 147, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: 74, y: 148, facing: 1 });
    SC.add({ x: 130, y: 150, z: 150, draw(ctx, sx, sy) { R(ctx, sx - 10, sy - 6, 20, 6, '#5a4632'); R(ctx, sx - 8, sy - 10, 6, 4, '#e6dcc4'); R(ctx, sx, sy - 10, 6, 4, '#d8cba8'); R(ctx, sx - 9, sy - 13, 18, 3, '#6a4a3a'); } });
    await SC.say({ kind: 'drama', text: 'Troas, at the house of Carpus. He has kept everything exactly as Paul left it: a heavy traveling cloak, a bundle of scrolls, and a flat leather case of parchments. Mark has come from the coast to go with you.' });
    await SC.say({ kind: 'drama', text: 'It is already autumn. The sailing season is closing. “Be diligent to come before winter.”' });

    // ---- the last voyage ----
    await K.fade(async () => { K.seaStage({ audio: { music: 'lament', amb: { shore: 0.8, wind: 0.5 } } }); });
    [['timothy', 112], ['johnmark', 126]].forEach((c) => SC.add({ frames: K.who(c[0]), x: c[1], y: 124, z: 137, facing: 1 }));
    SC.add({ id: 'player', frames: P0.player, x: 98, y: 124, z: 137, facing: 1 });
    await SC.say({ kind: 'drama', text: 'You sailed this sea with him once, in a storm, as a prisoner’s friend. You are old now, and the ship is small, and you hold the leather case in your lap the whole way.' });

    // ---- Rome: the gate ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'night', amb: { night: 0.5, wind: 0.3 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); },
        fx(fc, k) { fc.fillStyle = 'rgba(10,14,32,0.6)'; fc.fillRect(0, 0, 256 * k, 160 * k); const x = 190 * k, y = 120 * k, g = fc.createRadialGradient(x, y, 0, x, y, 46 * k); g.addColorStop(0, 'rgba(255,190,110,0.5)'); g.addColorStop(1, 'rgba(255,190,110,0)'); fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k); } });
      SC.cam = 32; SC.camGoal = 32;
    });
    const luke = SC.add({ frames: K.who('luke'), x: 222, y: 147, facing: -1 });
    const t3 = SC.add({ frames: K.who('timothy'), x: 60, y: 147, facing: 1, speed: 14 });
    const m3 = SC.add({ frames: K.who('johnmark'), x: 44, y: 148, facing: 1, speed: 14 });
    const me3 = SC.add({ id: 'player', frames: P0.player, x: 28, y: 149, facing: 1, speed: 14 });
    SC.walk(t3, 190); SC.walk(m3, 174); await SC.walk(me3, 158);
    await t2('4:11', '4:11');
    luke.pose = 'out';
    await SC.say({ kind: 'drama', text: 'Luke is waiting at the gate with a lamp. He looks at the cloak in Timothy’s arms, and at Mark, and at you, and for a moment he cannot speak. Then he says, “Come.”' });
    await SC.say({ kind: 'history', text: 'Scripture does not tell us whether they reached Paul in time. Early Christian writers say he was put to death in Rome under Nero. His letters were kept, copied, and read in the churches.' });
    game.addQuestion(TW.D.episodes.goodfight.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'goodfight', 'Write it down. Especially this.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.goodfight = EP;
})(window.TW);
