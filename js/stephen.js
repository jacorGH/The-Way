/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XVII: Stephen (Acts 6:8–8:4).
   The stoning is shown with restraint: no stones are seen striking, the scene darkens, and the words are Scripture's own. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'stephen' };
  const sayS = (key, a, b) => SC.say({ kind: 'scripture', ref: P.ref(key, a, b), text: P.vs(key, a, b) });

  function glowStage(base) {
    base.glow = 0; base.beam = 0; base.black = 0;
    const fx0 = base.fx;
    base.fx = function (fc, k, t, cam, sc) {
      if (fx0) fx0.call(base, fc, k, t, cam, sc);
      fc.globalCompositeOperation = 'lighter';
      if (base.glowAt && base.glow > 0) {
        const x = (base.glowAt.x - cam) * k, y = (base.glowAt.y - 22) * k;
        const g = fc.createRadialGradient(x, y, 0, x, y, 30 * k);
        g.addColorStop(0, 'rgba(255,248,225,' + base.glow + ')'); g.addColorStop(1, 'rgba(255,248,225,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
      }
      if (base.glowAt && base.beam > 0) {
        const x = (base.glowAt.x - cam) * k;
        const g = fc.createLinearGradient(0, 0, 0, base.glowAt.y * k);
        g.addColorStop(0, 'rgba(255,250,230,' + 0.55 * base.beam + ')'); g.addColorStop(1, 'rgba(255,250,230,' + 0.15 * base.beam + ')');
        fc.fillStyle = g; fc.fillRect(x - 12 * k, 0, 24 * k, base.glowAt.y * k);
      }
      fc.globalCompositeOperation = 'source-over';
      if (base.black > 0) { fc.fillStyle = 'rgba(6,4,2,' + base.black + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); }
    };
    return base;
  }

  EP.run = async function (game) {
    const P0 = K.sprites();
    const outsider = game.save.heart.trial === 2;
    // ---- the synagogue of the Freedmen ----
    SC.load({ width: 256, hotspots: [], audio: { music: 'reflect', amb: { room: 0.55, crowd: 0.2 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
    SC.cam = 0;
    [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [14, 144], [34, 144]].forEach((c, i) => SC.add({ frames: K.villager(1400 + i, i % 3 === 1), x: c[0], y: c[1], pose: 'sit', facing: 1 }));
    const disputers = [[176, 152], [194, 153], [212, 152], [230, 153]].map((c, i) => SC.add({ frames: i === 2 ? K.who('saul') : P0.scribe(460 + i), x: c[0], y: c[1], facing: -1, speed: 26 }));
    const saul = disputers[2];
    const stephen = SC.add({ frames: K.who('stephen'), x: 128, y: 152, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: 84, y: 153, facing: 1 });
    await SC.say({ kind: 'drama', text: 'You go with Stephen to the synagogue where Jews from Cyrene, Alexandria and Cilicia gather. He means to tell them about Jesus in Greek, their own language.' });
    await sayS('acts6', '6:8', '6:9');
    stephen.pose = 'out';
    await sayS('acts6', '6:10', '6:10');
    stephen.pose = 'stand';
    await SC.say({ kind: 'drama', text: 'One of the men from Cilicia argues hardest: young, learned, quick with the Scriptures. Someone calls him Saul.' });
    game.observe('stephen', 'saulmet', 'A young man from Cilicia named Saul argued hardest against Stephen.', false, true);
    disputers[0].facing = 1; disputers[1].facing = 1;
    await SC.walk(disputers[0], 250); await SC.walk(disputers[1], 262);
    await sayS('acts6', '6:11', '6:12');
    [disputers[0], disputers[1], disputers[3]].forEach((d) => { d.facing = -1; SC.walk(d, 140 + Math.random() * 20); });
    await SC.wait(1200);
    void saul;

    // ---- the council ----
    await K.fade(async () => {
      const c = glowStage({ width: 256, hotspots: [], audio: { music: 'tension', amb: { room: 0.6 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
      SC.load(c); SC.cam = 0;
    });
    const CS = SC.stage;
    const council = [];
    [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [14, 144], [34, 144], [222, 124], [242, 124], [204, 134], [240, 134], [184, 144], [222, 144]].forEach((c, i) => council.push(SC.add({ frames: P0.scribe(480 + i), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1, speed: 34 })));
    SC.add({ frames: K.who('caiaphas'), x: 200, y: 152, facing: -1 });
    const st2 = SC.add({ frames: K.who('stephen'), x: 128, y: 152, facing: 1 });
    const wit = [SC.add({ frames: K.villager(1420), x: 96, y: 152, facing: 1 }), SC.add({ frames: K.villager(1421), x: 82, y: 153, facing: 1 })];
    SC.add({ id: 'player', frames: P0.player, x: outsider || TW.Role.is() ? 8 : 64, y: 153, facing: 1 });
    if (outsider) await SC.say({ kind: 'drama', text: 'You are no longer welcome on the scribes’ bench. You stand in the doorway and watch.' });
    else await SC.say({ kind: 'drama', text: 'You take your seat on the scribes’ bench. No one here knows that you break bread with the man on trial.' });
    wit[0].pose = 'out';
    await sayS('acts6', '6:13', '6:14');
    wit[0].pose = 'stand';
    CS.glowAt = st2;
    await SC.tween(1600, (p) => { CS.glow = p * 0.55; });
    await sayS('acts6', '6:15', '6:15');
    await sayS('acts7', '7:1', '7:2');
    st2.pose = 'out';
    await SC.say({ kind: 'drama', text: 'He tells them the whole story of Israel: Abraham called out of Mesopotamia, Joseph sold into Egypt, Moses at the burning bush, the tent in the wilderness. He knows it as well as any scribe in the room.' });
    await sayS('acts7', '7:48', '7:50');
    await sayS('acts7', '7:51', '7:53');
    st2.pose = 'stand';
    council.forEach((c, i) => { c.pose = 'raise'; if (i % 2) c.hopping = true; });
    AU() && AU().music('silence');
    await sayS('acts7', '7:54', '7:54');
    st2.pose = 'raise';
    AU() && AU().sfx('chime');
    await SC.tween(1800, (p) => { CS.beam = p; CS.glow = 0.55 + p * 0.3; });
    await sayS('acts7', '7:55', '7:56');
    game.observe('stephen', 'vision', 'Stephen said, “I see the heavens opened, and the Son of Man standing at the right hand of God!” (Acts 7:56).', false, true);
    council.forEach((c) => { c.hopping = false; c.pose = 'stand'; c.y = 152; SC.walk(c, 128 + (Math.random() - 0.5) * 30); });
    AU() && AU().sfx('cheer');
    await sayS('acts7', '7:57', '7:57');
    await SC.tween(900, (p) => { CS.black = p; });

    // ---- outside the city ----
    await K.fade(async () => {
      const g = glowStage({ width: 320, audio: { music: 'silence', amb: { wind: 0.6, crowd: 0.5 } }, bg(ctx, t, cam) { ctx.drawImage(K.gateArt(), -cam, 0); } });
      SC.load(g); SC.cam = 40; SC.camGoal = 40;
    });
    K.gateArt();
    const OS = SC.stage;
    const ring = [];
    for (let i = 0; i < 10; i++) ring.push(SC.add({ frames: P0.scribe(500 + i), x: 196 + Math.cos(i * 0.63) * 24, y: 140 + Math.sin(i * 0.63) * 5, facing: Math.cos(i * 0.63) > 0 ? -1 : 1 }));
    const st3 = SC.add({ frames: K.who('stephen'), x: 196, y: 141, facing: -1, z: 139 });
    const saul2 = SC.add({ frames: K.who('saul'), x: 132, y: 149, facing: 1 });
    const pile = { n: 0 };
    SC.add({ x: 140, y: 150, z: 149.5, draw(ctx, sx, sy) { for (let i = 0; i < pile.n; i++) R(ctx, sx - 6 + (i % 2) * 2, sy - 2 - i * 2, 11, 2, ['#5a4a3a', '#8a7a5a', '#6a3a2a', '#4a5a6a'][i % 4]); } });
    const believers = [SC.add({ frames: K.who('john'), x: 60, y: 148, facing: 1 }), SC.add({ frames: K.villager(1430, true), x: 46, y: 149, facing: 1 })];
    void believers;
    await sayS('acts7', '7:58', '7:58');
    for (let i = 0; i < 5; i++) { pile.n = i + 1; await SC.wait(250); }
    const where = await SC.choose('Where are you?', [
      'Far off, with the believers, praying.',
      'Near the young man guarding the cloaks.',
      'You cannot watch. You turn your face to the wall.',
    ]);
    game.setHeart('stephen', where);
    const me = SC.add({ id: 'player', frames: P0.player, x: where === 0 ? 72 : where === 1 ? 118 : 30, y: 149, facing: where === 2 ? -1 : 1 });
    if (where === 1) await SC.say({ kind: 'drama', text: 'You are close enough to see his face. He is not angry. He watches as carefully as you do, as if it were his duty.' });
    ring.forEach((r) => { r.pose = 'raise'; });
    await SC.tween(1600, (p) => { OS.black = p * 0.55; });
    await sayS('acts7', '7:59', '7:59');
    st3.pose = 'sit';
    OS.glowAt = st3;
    await SC.tween(1200, (p) => { OS.glow = p * 0.4; });
    await sayS('acts7', '7:60', '7:60');
    await SC.tween(2200, (p) => { OS.black = 0.55 + p * 0.45; OS.glow = 0.4 * (1 - p); });
    ring.forEach((r) => { r.visible = false; }); st3.visible = false;
    await SC.wait(1200);
    await sayS('acts7', '8:1', '8:1');
    await SC.tween(1500, (p) => { OS.black = 1 - p * 0.7; });
    game.observe('stephen', 'died', 'Stephen knelt and cried, “Lord, don’t hold this sin against them!” and fell asleep (Acts 7:60).', false, true);
    game.observe('stephen', 'saul', 'The witnesses laid their cloaks at the feet of a young man named Saul, who consented to his death (Acts 7:58; 8:1).', false, true);
    AU() && AU().music('lament');
    const bearers = [0, 1, 2].map((i) => SC.add({ frames: K.villager(1440 + i), x: 196 + i * 10, y: 146, facing: -1, speed: 12 }));
    const bier = TW.S.bier(false);
    const b = SC.add({ x: 200, y: 146, z: 200, speed: 12, draw(ctx, sx, sy) { ctx.drawImage(bier, sx - 17, sy - 30); } });
    bearers.forEach((x, i) => SC.walk(x, 60 + i * 10));
    SC.walk(b, 64);
    await sayS('acts7', '8:2', '8:2');
    saul2.facing = 1;
    await sayS('acts7', '8:3', '8:4');
    me.facing = 1;
    await SC.say({ kind: 'drama', text: 'That night the believers who speak Greek begin to leave the city. Philip goes north toward Samaria. Someone has put your name on a list, and it is not Stephen’s.' });
    game.addQuestion(TW.D.episodes.stephen.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'stephen', 'Write down what you saw. Then leave the city.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.stephen = EP;
})(window.TW);
