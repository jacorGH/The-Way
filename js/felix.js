/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXXVIII: Two Years in Caesarea (Acts 24:1–25:12). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'felix' };
  const s24 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts24', a, b), text: P.vs('acts24', a, b) });
  const s25 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts25', a, b), text: P.vs('acts25', a, b) });
  Object.assign(K.looks, {
    felix: { skin: '#c49470', hair: '#5f5048', tunic: '#f0eadb', stripe: '#6a1a2a', mantle: '#8a2a3a' },
    drusilla: { skin: '#c8a07c', hair: '#2a1a12', tunic: '#e6dfcc', veil: '#6a2a5a', stripe: '#d8b04a' },
    tertullus: { skin: '#c49470', hair: '#3a2416', tunic: '#f0eadb', mantle: '#d8cfb8' },
    festus: { skin: '#c8a07c', hair: '#8a7a6a', tunic: '#f0eadb', stripe: '#6a1a2a', mantle: '#f4f0e6' },
  });
  const hall = (opts) => {
    const st = Object.assign({ width: 256, audio: { music: 'tension', amb: { room: 0.5, shore: 0.15 } }, bg(ctx) { ctx.drawImage(K.atriumArt(), 0, 0); } }, opts || {});
    SC.load(st); SC.cam = 0;
    return st;
  };

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- before Felix ----
    hall();
    const felix = SC.add({ frames: K.who('felix'), x: 200, y: 146, pose: 'sit', facing: -1 });
    const hp = SC.add({ frames: K.who('highpriest'), x: 60, y: 147, facing: 1 });
    const tert = SC.add({ frames: K.who('tertullus'), x: 84, y: 148, facing: 1 });
    [40, 26].forEach((x, i) => SC.add({ frames: K.villager(3000 + i), x: x, y: 148, facing: 1 }));
    const paul = SC.add({ frames: K.who('saul'), x: 140, y: 150, facing: -1 });
    SC.add({ frames: K.who('soldier'), x: 156, y: 150, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 236, y: 151, facing: -1 });
    await s24('24:1', '24:1');
    tert.pose = 'out';
    await SC.say({ kind: 'drama', text: 'Tertullus begins with a long compliment to Felix on the peace and reforms of his rule. Everyone in the hall knows how much of it is true.' });
    await s24('24:5', '24:5');
    tert.pose = 'stand';
    void hp;
    paul.pose = 'out';
    await s24('24:10', '24:10');
    await s24('24:14', '24:16');
    paul.pose = 'stand';
    await s24('24:22', '24:23');
    game.observe('felix', 'way', 'Before Felix, Paul said he served the God of the fathers “after the Way, which they call a sect,” hoping for the resurrection (Acts 24:14–15).', false, true);

    // ---- Felix and Drusilla ----
    await K.fade(async () => {
      const st = hall({ audio: { music: 'night', amb: { room: 0.4, shore: 0.2 } } });
      K.nightWrap(st, { dark: 0.35, lights: [{ x: 128, y: 110, r: 60 }] });
    });
    const f2 = SC.add({ frames: K.who('felix'), x: 160, y: 146, pose: 'sit', facing: -1 });
    SC.add({ frames: K.who('drusilla'), x: 180, y: 146, pose: 'sit', facing: -1 });
    const p2 = SC.add({ frames: K.who('saul'), x: 100, y: 148, facing: 1, pose: 'out' });
    await s24('24:24', '24:24');
    await s24('24:25', '24:25');
    f2.pose = 'stand'; f2.facing = 1;
    await SC.wait(500);
    p2.pose = 'stand';
    await s24('24:26', '24:26');
    void felix;

    // ---- two years ----
    await K.fade(async () => {
      const g = K.interiorStage();
      g.audio = { music: 'reflect', amb: { room: 0.4, shore: 0.3 } };
      SC.load(g); SC.cam = 0;
    });
    SC.add({ frames: K.who('saul'), x: 110, y: 147, pose: 'sit', facing: 1 });
    SC.add({ frames: K.who('soldier'), x: 70, y: 147, facing: 1 });
    SC.add({ frames: K.who('luke'), x: 150, y: 147, pose: 'sit', facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 190, y: 148, pose: 'sit', facing: -1 });
    await SC.say({ kind: 'history', text: 'Felix kept Paul in custody for two years, until he was replaced as governor by Porcius Festus; wanting to do the Jews a favor, he left Paul in bonds (24:27).' });
    const heart = await SC.choose('Two years is a long time to wait. How do you spend them?', [
      'Visit Paul nearly every day.',
      'Travel Judea and Galilee with Luke, finding people who saw and heard.',
      'Copy Paul’s letters for the churches.',
    ]);
    game.setHeart('felix', heart);
    if (heart === 1) {
      await SC.say({ kind: 'drama', text: 'Luke has a list of names, and you know half of them. You take him to Nain, to a man who was once carried out on a bier, and to Capernaum, to a fisherman’s widow who still keeps the roof patched where it was broken open. Luke writes until his hand cramps.' });
      await SC.say({ kind: 'drama', speaker: 'Luke', text: 'Many have tried to put these things in order. I want to set it down carefully, from the beginning, from those who saw it.' });
    } else if (heart === 2) {
      await SC.say({ kind: 'drama', text: 'You sit by the window with a stack of fresh sheets and copy what Paul once wrote to the Galatians and the Corinthians, so that more churches can read it. Your old training was for this, too.' });
    } else {
      await SC.say({ kind: 'drama', text: 'Most days you bring bread, and news, and sometimes an argument. Some days you just sit. The guard learns your name, and then your story.' });
    }
    game.observe('felix', 'years', heart === 1 ? 'During the two years at Caesarea I traveled with Luke to find those who had seen and heard.' : heart === 2 ? 'During the two years at Caesarea I copied Paul’s letters for the churches.' : 'During the two years at Caesarea I visited Paul in custody.', false, true);

    // ---- Festus ----
    await K.fade(async () => { hall(); });
    const festus = SC.add({ frames: K.who('festus'), x: 200, y: 146, pose: 'sit', facing: -1 });
    const accusers = [0, 1, 2, 3].map((i) => SC.add({ frames: K.villager(3010 + i), x: 30 + i * 16, y: 148, facing: 1 }));
    const p3 = SC.add({ frames: K.who('saul'), x: 140, y: 150, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 236, y: 151, facing: -1 });
    await s25('25:1', '25:3');
    await s25('25:6', '25:7');
    accusers.forEach((a) => { a.pose = 'out'; });
    p3.pose = 'out';
    await s25('25:8', '25:8');
    accusers.forEach((a) => { a.pose = 'stand'; });
    festus.pose = 'sit';
    await s25('25:9', '25:9');
    p3.pose = 'raise';
    AU() && AU().music('wonder');
    await s25('25:10', '25:11');
    p3.pose = 'stand';
    await s25('25:12', '25:12');
    game.observe('felix', 'caesar', 'Paul appealed to Caesar. Festus answered, “You have appealed to Caesar. To Caesar you shall go” (Acts 25:11–12).', false, true);
    game.addQuestion(TW.D.episodes.felix.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'felix', 'Write it down. Two years in a few lines.');
    void R;
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.felix = EP;
})(window.TW);
