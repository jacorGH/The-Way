/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXI: Tabitha (Acts 9:32–43). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'tabitha' };
  const s9 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts9c', a, b), text: P.vs('acts9c', a, b) });
  const COLORS = ['#7a3a5a', '#3d5a7a', '#6a7a3a', '#9a6a2a', '#5a3a2a'];

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    SC.load({ width: 320, audio: { music: 'land', amb: { shore: 0.6, village: 0.35, birds: 0.4 } }, bg(ctx, t, cam) { ctx.drawImage(K.joppaArt(), -cam, 0); } });
    SC.cam = 0; SC.camGoal = 0;
    const me = SC.add({ id: 'player', frames: P0.player, x: 330, y: 148, facing: -1, speed: 24 });
    await SC.say({ kind: 'history', text: 'After Saul’s turning, the assemblies throughout Judea, Galilee and Samaria had peace for a time (Acts 9:31).' });
    await SC.say({ kind: 'drama', text: 'You come down to the coast with letters for the believers in Joppa. You find them in mourning.' });
    SC.camGoal = 60;
    await SC.walk(me, 230);
    await s9('9:36', '9:38');

    // the upper chamber
    await K.fade(async () => {
      const st = K.interiorStage();
      st.audio = { music: 'lament', amb: { room: 0.5, shore: 0.2 } };
      SC.load(st); SC.cam = 0; SC.camGoal = 0;
    });
    const body = SC.add({ x: 150, y: 146, z: 145, draw(ctx, sx, sy) { ctx.drawImage(S.lying({ skin: '#cdb8a0', hair: '#5f5048', beard: '#cdb8a0', tunic: '#ece6d6' }), sx - 14, sy - 10); } });
    const widows = [0, 1, 2, 3, 4].map((i) => {
      const e = SC.add({ frames: S.person({ skin: K.pick(K.SKINS, i + 9, 1), hair: i % 2 ? '#9a9288' : '#2a1a12', tunic: '#5a4a3a', veil: ['#4a3e34', '#5a4a3a', '#6a5a4a', '#3e342c', '#7a6a5a'][i] }), x: 100 + i * 22 + (i > 1 ? 24 : 0), y: 144 + (i % 2) * 3, facing: i > 1 ? -1 : 1, speed: 20 });
      SC.add({ x: 0, y: 0, z: 999, draw(ctx) { if (e.pose === 'out' && e.visible) { const x = Math.round(e.x - SC.cam) + e.facing * 6 - 4, y = Math.round(e.y) - 22; R(ctx, x, y, 9, 12, COLORS[i]); R(ctx, x, y, 9, 1, '#e6dfcc'); } } });
      return e;
    });
    const me2 = SC.add({ id: 'player', frames: P0.player, x: niece ? 82 : 30, y: 146, facing: 1, speed: 20 });
    await SC.say({ kind: 'drama', text: 'They have washed her and laid her out in the upper room. The widows of Joppa sit around her, and none of them will leave.' });
    const heart = await SC.choose('A widow holds a coat out toward you without a word.', [
      'Sit with the widows and let them show you what she made.',
      'Ask them about Tabitha.',
      'Go down to the gate and watch the road for Peter.',
    ]);
    game.setHeart('tabitha', heart);
    if (heart === 0) { widows.forEach((w, i) => SC.wait(i * 200).then(() => { w.pose = 'out'; })); await SC.say({ kind: 'drama', text: 'One after another they hold up what she made: a child’s coat, a mantle, a tunic let out for a woman who was carrying a child. Every one has been worn thin.' }); widows.forEach((w) => { w.pose = 'stand'; }); }
    else if (heart === 1) await SC.say({ kind: 'drama', speaker: 'A widow', text: 'She had a loom and two good hands, and she would not keep either for herself. When my husband died she was at my door before the mourners were.' });
    else { await SC.walk(me2, 10); await SC.say({ kind: 'drama', text: 'You wait at the gate until the light changes. Then you see them on the Lydda road: two men from Joppa, and a big fisherman walking between them.' }); }
    game.observe('tabitha', 'widows', 'Tabitha was full of good works and acts of mercy. The widows mourned her and showed the garments she had made (Acts 9:36, 39).', false, true);

    const peter = SC.add({ frames: K.who('peter'), x: -10, y: 146, facing: 1, speed: 22 });
    await SC.walk(peter, 120);
    widows.forEach((w) => { w.pose = 'out'; w.facing = -1; });
    await s9('9:39', '9:39');
    widows.forEach((w) => { w.pose = 'stand'; });
    // Peter puts everyone out
    peter.pose = 'out';
    await SC.wait(600);
    peter.pose = 'stand';
    await Promise.all(widows.concat([me2]).map((w, i) => SC.wait(i * 120).then(() => SC.walk(w, -24))));
    await SC.say({ kind: 'drama', text: 'You wait on the outside stairs with the widows. No one says anything. Through the shutter you hear one man praying.' });
    await SC.walk(peter, 136); peter.facing = 1; peter.pose = 'sit';
    await s9('9:40', '9:40');
    SC.ents = SC.ents.filter((e) => e !== body);
    const tab = SC.add({ frames: K.who('tabitha'), x: 150, y: 146, pose: 'sit', facing: -1 });
    AU() && (AU().music('wonder'), AU().sfx('chime'));
    await SC.wait(900);
    peter.pose = 'stand'; tab.pose = 'stand';
    await s9('9:41', '9:41');
    AU() && AU().sfx('cheer');
    await Promise.all(widows.concat([me2]).map((w, i) => SC.wait(i * 120).then(() => SC.walk(w, 60 + i * 12))));
    widows.forEach((w) => { w.pose = 'raise'; w.facing = 1; });
    game.observe('tabitha', 'raised', 'Peter knelt and prayed, and said, “Tabitha, get up!” She opened her eyes and sat up (Acts 9:40).', false, true);
    await s9('9:42', '9:42');

    // the tanner's house by the sea
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'land', amb: { shore: 0.7, village: 0.2, birds: 0.4 } }, bg(ctx, t, cam) { ctx.drawImage(K.joppaArt(), -cam, 0); } });
      SC.cam = 0; SC.camGoal = 0;
    });
    const simon = SC.add({ frames: K.who('tanner'), x: 70, y: 146, facing: 1 });
    const p2 = SC.add({ frames: K.who('peter'), x: 160, y: 146, facing: -1, speed: 20 });
    SC.add({ id: 'player', frames: P0.player, x: 190, y: 148, facing: -1 });
    await SC.walk(p2, 90);
    await s9('9:43', '9:43');
    await SC.say({ kind: 'history', text: 'Tanners worked the hides of dead animals. The work was foul-smelling and ritually unclean, and tanneries were kept away from where people lived. Simon’s was by the sea.' });
    await SC.say({ kind: 'drama', text: 'The house smells of lime and hides. Peter does not seem to notice. You notice that he does not notice.' });
    void simon;
    game.addQuestion(TW.D.episodes.tabitha.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'tabitha', 'Write it down. Then stay a while by the sea.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.tabitha = EP;
})(window.TW);
