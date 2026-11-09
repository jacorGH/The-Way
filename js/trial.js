/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode XV: Before the Council (Acts 4:5–37). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'trial' };
  const s4 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts4', a, b), text: P.vs('acts4', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    SC.load({ width: 256, hotspots: [], audio: { music: 'tension', amb: { room: 0.6, crowd: 0.1 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
    SC.cam = 0;
    const council = [];
    [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [14, 144], [34, 144], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].forEach((c, i) => council.push(SC.add({ frames: i % 4 === 0 ? K.who('joseph') : P0.scribe(440 + i), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 })));
    const annas = SC.add({ frames: K.who('annas'), x: 196, y: 152, facing: -1 });
    const caiaphas = SC.add({ frames: K.who('caiaphas'), x: 212, y: 153, facing: -1 });
    const nic = SC.add({ frames: K.who('nicodemus'), x: 56, y: 152, facing: 1 });
    const me = SC.add({ id: 'player', frames: P0.player, x: TW.Role.is() ? 12 : 72, y: 153, facing: 1, speed: 24 });
    void annas; void caiaphas; void nic;
    await SC.say({ kind: 'drama', text: 'The next morning you take your place among the scribes. A year ago you sat in this room through the night trial. Today you are one of the five thousand, and no one here knows it.' });
    await s4('4:5', '4:6');
    const peter = SC.add({ frames: K.who('peter'), x: -10, y: 152, facing: 1, speed: 22 });
    const john = SC.add({ frames: K.who('john'), x: -26, y: 152, facing: 1, speed: 22 });
    const healed = SC.add({ frames: K.who('lame'), x: -40, y: 153, facing: 1, speed: 22 });
    SC.walk(john, 118); SC.walk(healed, 102);
    await SC.walk(peter, 134);
    await s4('4:7', '4:7');
    peter.pose = 'out';
    await s4('4:8', '4:10');
    await s4('4:11', '4:12');
    peter.pose = 'stand';
    await s4('4:13', '4:14');
    await SC.say({ kind: 'drama', text: 'You know this man. You watched him at the high priest’s fire, swearing he had never met Jesus. Now he stands where Jesus stood and will not stop saying his name.' });
    game.observe('trial', 'recognized', 'The council recognized that Peter and John had been with Jesus (Acts 4:13).', false, true);
    [peter, john, healed].forEach((e) => { e.facing = -1; SC.walk(e, -30); });
    await s4('4:15', '4:17');
    const heart = await SC.choose('The council confers about how to silence them. Your seat is among them. What do you do?', [
      'Say nothing.',
      'Ask, as Nicodemus once did, that the council hear before it judges.',
      'Stand up and walk out after them.',
    ]);
    game.setHeart('trial', heart);
    if (heart === 1) {
      me.pose = 'out';
      await SC.say({ kind: 'drama', text: '“Does our law judge a man unless it first hears from him?” Your voice shakes. Someone laughs. Across the room, Nicodemus closes his eyes.' });
      me.pose = 'stand';
    } else if (heart === 2) {
      me.facing = -1;
      await SC.walk(me, 8);
      await SC.say({ kind: 'drama', text: 'You walk out through the doors. Behind you the room goes quiet, then the talk begins again, about you.' });
      me.visible = false;
    }
    [peter, john, healed].forEach((e, i) => { e.facing = 1; SC.walk(e, 134 - i * 16); });
    await SC.wait(1800);
    await s4('4:18', '4:18');
    peter.pose = 'out'; john.pose = 'out';
    await s4('4:19', '4:20');
    peter.pose = 'stand'; john.pose = 'stand';
    await SC.say({ kind: 'drama', text: '“The things which we saw and heard.” You think of your scroll: every line in it is something you saw and heard.' });
    await s4('4:21', '4:22');
    game.observe('trial', 'cannot', '“We can’t help telling the things which we saw and heard” (Acts 4:20).', false, true);

    // with their own company
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.3 } };
      SC.load(h); SC.cam = 0;
    });
    const company = [];
    [[40, 1], [56, 1], [72, 1], [88, 1], [168, -1], [184, -1], [200, -1], [216, -1], [232, -1]].forEach((c, i) => company.push(SC.add({ frames: i % 3 === 0 ? K.villager(207 + i) : K.villager(1120 + i, i % 3 === 1), x: c[0], y: 147, pose: 'sit', facing: c[1] })));
    const p2 = SC.add({ frames: K.who('peter'), x: 120, y: 146, facing: -1 });
    const j2 = SC.add({ frames: K.who('john'), x: 138, y: 146, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: 250, y: 148, pose: 'sit', facing: -1 });
    await s4('4:23', '4:24');
    company.forEach((c) => { c.pose = 'raise'; });
    p2.pose = 'raise'; j2.pose = 'raise';
    await s4('4:29', '4:30');
    SC.shake(1400);
    AU() && (AU().sfx('thunder'), AU().music('wonder'));
    for (let i = 0; i < 30; i++) SC.dust(Math.random() * 256, 77, 1, { spread: 2 });
    await s4('4:31', '4:31');
    company.forEach((c) => { c.pose = 'sit'; }); p2.pose = 'stand'; j2.pose = 'stand';
    game.observe('trial', 'shaken', 'When we prayed for boldness, the place where we were gathered was shaken (Acts 4:31).', false, true);
    await s4('4:32', '4:35');
    const barn = SC.add({ frames: K.who('barnabas'), x: -10, y: 146, facing: 1, speed: 20 });
    await SC.walk(barn, 106);
    SC.add({ x: 116, y: 147, z: 147.5, draw(ctx, sx, sy) { R(ctx, sx - 3, sy - 4, 6, 4, '#8a6a42'); R(ctx, sx - 2, sy - 5, 4, 1, '#6a4a2c'); } });
    AU() && AU().sfx('coins');
    await s4('4:36', '4:37');
    await SC.say({ kind: 'drama', text: 'You think of the house your father left you, and of the widows who came to the door last night with nothing to eat.' });
    game.addQuestion(TW.D.episodes.trial.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'trial', 'Write it down, all of it. You can’t help it.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.trial = EP;
})(window.TW);
