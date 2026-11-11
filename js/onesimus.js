/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XLIV: Onesimus (Philemon). Scripture does not say how Philemon answered, and neither does the game. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'onesimus' };
  const pm = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('phm', a, b), text: P.vs('phm', a, b) });
  Object.assign(K.looks, {
    onesimus: { skin: '#8a5a3a', hair: '#151010', tunic: '#8a7a5a' },
    philemon: { skin: '#c49470', hair: '#5f5048', beard: '#5f5048', tunic: '#e6dfcc', mantle: '#4a6a5a' },
    apphia: { skin: '#c8a07c', hair: '#3a2416', tunic: '#d8cfb8', veil: '#7a5a3a' },
    tychicus: { skin: '#b07a50', hair: '#2a1a12', beard: '#2a1a12', tunic: '#a89a7a', mantle: '#5a4a6a' },
  });

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- Rome: a stranger at the door ----
    const h = K.interiorStage();
    h.audio = { music: 'reflect', amb: { room: 0.5, city: 0.4 } };
    SC.load(h); SC.cam = 0;
    const paul = SC.add({ frames: K.who('saul'), x: 110, y: 146, facing: 1, pose: 'sit' });
    SC.add({ frames: K.who('soldier'), x: 88, y: 146, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: 60, y: 148, pose: 'sit', facing: 1 });
    const ones = SC.add({ frames: K.who('onesimus'), x: 280, y: 147, facing: -1, speed: 16 });
    await SC.say({ kind: 'drama', text: 'He came to the door months ago, thin and frightened, a slave from the province of Asia who had run from his master. In a city of a million people he could have vanished. Instead he found his way to the one prisoner in Rome who knew his master’s name.' });
    await SC.walk(ones, 150);
    ones.pose = 'sit';
    await SC.say({ kind: 'drama', text: 'Since then he has learned the Way, been baptized, and made himself so useful that Paul calls him his own heart. And Roman law says he must go back.' });
    paul.pose = 'out';
    await pm('1:10', '1:12');
    paul.pose = 'sit';
    await SC.say({ kind: 'drama', text: 'Partway through, Paul takes the pen from you and writes the next lines himself, slowly, in large letters, the chain clinking against the table.' });
    await pm('1:19', '1:19');
    game.observe('onesimus', 'hand', 'Paul wrote to Philemon in his own hand: “If he has wronged you at all, or owes you anything, put that to my account… I will repay it” (Philemon 18–19).', false, true);

    // ---- the road to Colossae ----
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'land', amb: { birds: 0.4, wind: 0.25 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); } });
      SC.cam = 0; SC.camGoal = 48;
    });
    const tyc = SC.add({ frames: K.who('tychicus'), x: 20, y: 148, facing: 1, speed: 14 });
    const o2 = SC.add({ frames: K.who('onesimus'), x: 4, y: 149, facing: 1, speed: 14 });
    const me = SC.add({ id: 'player', frames: P0.player, x: -12, y: 150, facing: 1, speed: 14 });
    SC.walk(tyc, 200); SC.walk(o2, 184); await SC.walk(me, 168);
    await SC.say({ kind: 'history', text: 'Tychicus carried Paul’s letter to the Colossians, traveling with Onesimus, whom Paul called a faithful and beloved brother from their own town (Colossians 4:7–9).' });
    await SC.say({ kind: 'drama', text: 'The closer you get to the Lycus valley, the less Onesimus says. On the last night he asks you, very quietly, what happens to runaways. You tell him the truth. Then you tell him what Paul wrote.' });

    // ---- Philemon's house ----
    await K.fade(async () => {
      const c = K.interiorStage();
      c.audio = { music: 'silence', amb: { room: 0.6 } };
      SC.load(c); SC.cam = 0;
    });
    const phil = SC.add({ frames: K.who('philemon'), x: 180, y: 146, facing: -1, pose: 'sit' });
    SC.add({ frames: K.who('apphia'), x: 196, y: 146, facing: -1, pose: 'sit' });
    SC.add({ frames: S.person({ skin: '#c49470', hair: '#3a2416', tunic: '#a89a7a' }), x: 212, y: 147, facing: -1, pose: 'sit' });
    [40, 56, 72, 150].forEach((x, i) => SC.add({ frames: K.villager(3400 + i, i % 2 === 1), x: x, y: 148, pose: 'sit', facing: x < 128 ? 1 : -1 }));
    const o3 = SC.add({ frames: K.who('onesimus'), x: 14, y: 147, facing: 1 });
    SC.add({ frames: K.who('tychicus'), x: 28, y: 147, facing: 1 });
    const heart = await SC.choose('The whole church is gathered in Philemon’s house, and Onesimus is standing at the door. You are to read the letter. Where do you stand?', [
      'Beside Onesimus.',
      'Beside Philemon.',
      'In the middle of the room, between them.',
    ]);
    game.setHeart('onesimus', heart);
    const me2 = SC.add({ id: 'player', frames: P0.player, x: heart === 0 ? 30 : heart === 1 ? 164 : 110, y: 149, facing: heart === 1 ? -1 : 1 });
    me2.pose = 'out';
    await pm('1:1', '1:3');
    await pm('1:4', '1:7');
    await pm('1:8', '1:12');
    phil.pose = 'stand';
    phil.facing = -1;
    await pm('1:13', '1:16');
    await pm('1:17', '1:19');
    await pm('1:20', '1:22');
    await pm('1:23', '1:25');
    me2.pose = 'stand';
    AU() && AU().music('reflect');
    await SC.say({ kind: 'drama', text: 'No one speaks. Philemon stands for a long time, looking at the young man in the doorway who once ran from him. Then he crosses the room.' });
    await SC.walk(phil, 40);
    await SC.wait(900);
    await SC.say({ kind: 'history', text: 'Scripture does not tell us what Philemon did. But the letter was kept, and copied, and read in the churches ever since.' });
    void o3;
    game.observe('onesimus', 'brother', 'Paul asked Philemon to receive Onesimus “no longer as a slave, but more than a slave, a beloved brother” (Philemon 16).', false, true);
    game.addQuestion(TW.D.episodes.onesimus.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'onesimus', 'Write it down. Leave room for what happened next.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.onesimus = EP;
})(window.TW);
