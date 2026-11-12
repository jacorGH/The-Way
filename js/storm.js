/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XL: The Storm (Acts 27). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const EP = { id: 'storm' };
  const s27 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts27', a, b), text: P.vs('acts27', a, b) });
  const deckY = 108;
  Object.assign(K.looks, {
    julius: { skin: '#c49470', hair: '#3a2416', tunic: '#a83a2a', belt: '#d8b04a', helmet: '#b8a070' },
    aristarchus: { skin: '#c49470', hair: '#5f5048', beard: '#5f5048', tunic: '#8a7a5a', mantle: '#5a6a7a' },
  });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    // ---- the long way west ----
    const sea = K.seaStage({ audio: { music: 'land', amb: { shore: 0.8, wind: 0.4 } } });
    [['saul', 110], ['luke', 124], ['aristarchus', 138], ['julius', 152]].forEach((c) => SC.add({ frames: K.who(c[0]), x: c[1], y: 124, z: 137, facing: 1 }));
    SC.add({ id: 'player', frames: P0.player, x: 96, y: 124, z: 137, facing: 1 });
    await s27('27:1', '27:2');
    await s27('27:3', '27:6');
    await s27('27:7', '27:8');
    await SC.tween(1500, (p) => { sea.land = p; });

    // ---- Fair Havens: the warning ----
    await K.fade(async () => { K.shoreStage({ audio: { music: 'tension', amb: { shore: 0.7, wind: 0.5 } } }); });
    const paul = SC.add({ frames: K.who('saul'), x: 110, y: 148, facing: 1 });
    const julius = SC.add({ frames: K.who('julius'), x: 150, y: 148, facing: -1 });
    const master = SC.add({ frames: S.person({ skin: '#a8724a', hair: '#5f5048', beard: '#8a7a6a', tunic: '#5a4a3a', mantle: '#3a4a5a' }), x: 170, y: 148, facing: -1 });
    const owner = SC.add({ frames: S.person({ skin: '#c49470', hair: '#2a1a12', tunic: '#e6dfcc', mantle: '#8a6a3a' }), x: 186, y: 148, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 84, y: 150, facing: 1 });
    await s27('27:9', '27:10');
    paul.pose = 'stand';
    master.pose = 'out'; owner.pose = 'out';
    await s27('27:11', '27:12');
    master.pose = 'stand'; owner.pose = 'stand';
    void julius;
    await s27('27:13', '27:13');

    // ---- the storm ----
    await K.fade(async () => { K.stormStage(); });
    const ST = SC.stage;
    const crew = [];
    [70, 92, 160, 182].forEach((x, i) => crew.push(SC.add({ frames: K.villager(3100 + i), x: x, y: deckY, z: 121, facing: i < 2 ? 1 : -1 })));
    const p2 = SC.add({ frames: K.who('saul'), x: 120, y: deckY, z: 121, facing: 1 });
    SC.add({ frames: K.who('luke'), x: 104, y: deckY, z: 121, facing: 1 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 140, y: deckY, z: 121, facing: -1 });
    const bob = () => { const t = SC.t || 0, amp = 8 * (1 - ST.calm) + 1, dy = Math.round(Math.sin(t * 1.6 + 2.9) * amp); [p2, me].concat(crew).forEach((e) => { e.y = deckY + dy; }); };
    const bobber = setInterval(bob, 50);
    const flash = () => { ST.flash = 0.8; AU() && AU().sfx('thunder'); };
    flash();
    SC.shake(900);
    await s27('27:14', '27:15');
    await s27('27:16', '27:17');
    crew.forEach((c) => { c.pose = 'out'; });
    AU() && AU().sfx('splash');
    await s27('27:18', '27:19');
    ST.bare = true;
    crew.forEach((c) => { c.pose = 'sit'; });
    flash();
    await s27('27:20', '27:20');
    await SC.say({ kind: 'drama', text: niece ? 'Below deck the women have stopped crying. A merchant’s wife holds her little girl and stares at nothing. You hold the girl’s other hand, and tell her about a boat on the Sea of Galilee, and the man who stood up in it and spoke to the wind.' : 'You have not been dry for days. No one has cooked anything. A sailor older than your father is praying to gods you have never heard of, and you find yourself praying beside him.' });
    // the angel's message
    p2.pose = 'stand';
    p2.pose = 'raise';
    AU() && AU().music('wonder');
    await s27('27:21', '27:22');
    await s27('27:23', '27:24');
    await s27('27:25', '27:26');
    p2.pose = 'stand';
    game.observe('storm', 'angel', 'In the storm an angel told Paul, “Don’t be afraid… You must stand before Caesar. Behold, God has granted you all those who sail with you” (Acts 27:24).', false, true);
    flash();
    AU() && AU().music('storm');
    await s27('27:27', '27:29');
    crew.slice(2).forEach((c) => { c.pose = 'stand'; });
    await s27('27:30', '27:32');
    // bread at dawn
    AU() && AU().music('reflect');
    ST.calm = 0.35;
    await s27('27:33', '27:34');
    p2.pose = 'raise';
    await s27('27:35', '27:35');
    const heart = await SC.choose('He breaks the bread in front of all of them: sailors, soldiers, prisoners, merchants. Someone hands you a piece.', [
      'Take it, and eat.',
      'Give it to the frightened ship’s boy beside you.',
      'Keep watch at the rail while the others eat.',
    ]);
    game.setHeart('storm', heart);
    p2.pose = 'stand';
    crew.forEach((c) => { c.pose = 'sit'; });
    await s27('27:36', '27:38');
    if (TW.Hands) await TW.Hands.moment('storm', 'grain', 'Throw the grain', [
      'Now everyone has eaten, and the sailors are throwing the cargo of wheat into the sea. Help them.',
      'Another sack. The ship rides a little higher.',
      'And another. Your arms ache, and the deck rises under your feet.',
    ]);
    // the wreck
    ST.calm = 0.6;
    await s27('27:39', '27:40');
    SC.shake(1200);
    AU() && (AU().sfx('crash'), AU().sfx('crumble'), AU().music('storm'));
    ST.calm = 0.1;
    await s27('27:41', '27:41');
    await s27('27:42', '27:43');
    clearInterval(bobber);
    AU() && AU().sfx('splash');
    await SC.tween(1200, (p) => { [p2, me].concat(crew).forEach((e) => { e.y = deckY + p * 30; }); });
    AU() && AU().music('wonder');
    await s27('27:44', '27:44');
    game.observe('storm', 'bread', 'On the fourteenth day Paul took bread, gave thanks to God before them all, broke it and ate. All 276 of us reached the land (Acts 27:35–37, 44).', false, true);
    game.addQuestion(TW.D.episodes.storm.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'storm', 'Write it down, when your hands stop shaking.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.storm = EP;
})(window.TW);
