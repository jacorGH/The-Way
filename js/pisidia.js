/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXVI: Antioch of Pisidia (Acts 13:14–52). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const EP = { id: 'pisidia' };
  const s13 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts13b', a, b), text: P.vs('acts13b', a, b) });
  const local = (i) => S.person({ skin: K.pick(K.SKINS.concat(['#c49470', '#c8a07c']), i, 1), hair: K.pick(K.HAIRS, i, 2), beard: i % 3 ? K.pick(K.HAIRS, i, 2) : null, tunic: ['#d8cfb8', '#8a6a4a', '#5a6a7a', '#a89a7a', '#7a3a2a'][i % 5], mantle: i % 2 ? '#e6dfcc' : null, veil: i % 4 === 3 ? '#9a7a5a' : null });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const niece = TW.Role.is();
    SC.load({ width: 256, hotspots: [], audio: { music: 'reflect', amb: { room: 0.55, crowd: 0.15 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
    SC.cam = 0;
    const seats = [];
    [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [14, 144], [34, 144], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].forEach((c, i) => seats.push(SC.add({ frames: local(i), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 })));
    const ruler = SC.add({ frames: K.who('ananias'), x: 196, y: 152, facing: -1 });
    const paul = SC.add({ frames: K.who('saul'), x: 96, y: 152, pose: 'sit', facing: 1, speed: 18 });
    SC.add({ frames: K.who('barnabas'), x: 80, y: 152, pose: 'sit', facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: niece ? 236 : 62, y: 152, pose: 'sit', facing: niece ? -1 : 1 });
    await SC.say({ kind: 'drama', text: 'From Perga the road climbs for days through the passes of the Taurus. On the high plateau stands Antioch of Pisidia, a colony of Roman veterans, with a synagogue for its Jews and for the Gentiles who fear God.' });
    await s13('13:14', '13:15');
    paul.pose = 'stand'; paul.y = 152;
    await SC.walk(paul, 128);
    paul.facing = 1; paul.pose = 'out';
    await s13('13:16', '13:17');
    await s13('13:22', '13:23');
    await s13('13:26', '13:29');
    await SC.say({ kind: 'drama', text: 'You were there for every line of it: the council by night, the governor, the tree, the tomb in the garden. He tells it to strangers on a plateau a month’s walk from Jerusalem, and they lean forward.' });
    await s13('13:30', '13:33');
    await s13('13:38', '13:39');
    paul.pose = 'stand';
    seats.forEach((s, i) => { if (i % 3 === 0) s.facing *= -1; });
    await s13('13:42', '13:43');
    game.observe('pisidia', 'sermon', 'In the synagogue at Antioch of Pisidia, Paul preached that through Jesus everyone who believes is justified (Acts 13:38–39).', false, true);
    void ruler;

    // the next Sabbath: the whole city comes
    await K.fade(async () => {
      SC.load({ width: 320, audio: { music: 'land', amb: { crowd: 0.7, city: 0.35, birds: 0.2 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); } });
      SC.cam = 32; SC.camGoal = 32;
    });
    const crowd = [];
    for (let i = 0; i < 16; i++) crowd.push(SC.add({ frames: local(i + 20), x: 40 + i * 15, y: 146 + (i % 3), facing: i % 2 ? 1 : -1 }));
    const p2 = SC.add({ frames: K.who('saul'), x: 160, y: 140, facing: -1 });
    const b2 = SC.add({ frames: K.who('barnabas'), x: 176, y: 140, facing: -1 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 120, y: 150, facing: 1 });
    void me;
    await s13('13:44', '13:45');
    crowd.slice(0, 4).forEach((c) => { c.pose = 'out'; c.facing = 1; });
    p2.pose = 'out'; b2.pose = 'out';
    await s13('13:46', '13:47');
    p2.pose = 'stand'; b2.pose = 'stand';
    const heart = await SC.choose('“We turn to the Gentiles.” Around you, Greeks are cheering. Some of your own people are shouting them down.', [
      'Rejoice with the Gentiles.',
      'Grieve for your own people.',
      'Both, and you cannot say which is stronger.',
    ]);
    game.setHeart('pisidia', heart);
    crowd.slice(4).forEach((c, i) => { if (i % 2) c.pose = 'raise'; });
    AU() && AU().music('wonder');
    await s13('13:48', '13:49');
    await SC.say({ kind: 'drama', text: heart === 1 ? 'You think of the synagogue in Capernaum, and of your own family at home, and you cannot stop the tears.' : heart === 0 ? 'A Greek veteran with one ear claps you on the back as if you had done it yourself.' : 'You find you are weeping and smiling at once, and so, you notice, is Paul.' });
    AU() && AU().music('tension');
    const chiefs = [SC.add({ frames: K.who('roman'), x: 330, y: 146, facing: -1, speed: 22 }), SC.add({ frames: K.who('romanw'), x: 346, y: 147, facing: -1, speed: 22 }), SC.add({ frames: K.who('soldier'), x: 362, y: 146, facing: -1, speed: 22 })];
    await Promise.all(chiefs.map((c, i) => SC.walk(c, 206 + i * 12)));
    chiefs[0].pose = 'out';
    await s13('13:50', '13:50');
    p2.facing = 1; b2.facing = 1;
    await Promise.all([SC.walk(p2, 70), SC.walk(b2, 80)]);
    p2.facing = -1; b2.facing = -1;
    SC.dust(70, 146, 8, { up: true, spread: 6, color: '#c8b89a' }); SC.dust(80, 146, 8, { up: true, spread: 6, color: '#c8b89a' });
    await s13('13:51', '13:52');
    game.observe('pisidia', 'dust', 'Thrown out of the city, they shook off the dust of their feet and went on to Iconium, filled with joy (Acts 13:51–52).', false, true);
    game.addQuestion(TW.D.episodes.pisidia.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'pisidia', 'Write it down on the road to Iconium.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.pisidia = EP;
})(window.TW);
