/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode XXIII: Antioch (Acts 11:19–30). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'antioch' };
  const s11 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts11', a, b), text: P.vs('acts11', a, b) });
  const greek = (i) => S.person({ skin: K.pick(K.SKINS.concat(['#c49470', '#c8a07c']), i, 1), hair: K.pick(K.HAIRS, i, 2), tunic: ['#d8cfb8', '#7a5a8a', '#3d6a6a', '#c9a86a', '#8a2a22'][i % 5], mantle: i % 2 ? '#e6dfcc' : null, veil: i % 4 === 3 ? '#c9a86a' : null });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const street = () => ({ width: 320, audio: { music: 'land', amb: { crowd: 0.5, city: 0.55, doves: 0.2, birds: 0.2 } }, bg(ctx, t, cam) { ctx.drawImage(K.straightArt({ hills: true }), -cam, 0); } });
    SC.load(street()); SC.cam = 0; SC.camGoal = 0;
    await SC.say({ kind: 'history', text: 'Antioch on the Orontes: capital of Syria, one of the three great cities of the empire, with temples to the gods of Greece and Rome and a large Jewish quarter.' });
    await s11('11:19', '11:19');
    const preachers = [SC.add({ frames: K.villager(1800), x: 150, y: 146, facing: 1, pose: 'out' }), SC.add({ frames: K.who('simon'), x: 166, y: 147, facing: 1 })];
    const crowd = [];
    for (let i = 0; i < 8; i++) crowd.push(SC.add({ frames: greek(i), x: 190 + i * 14, y: 146 + (i % 2) * 2, facing: -1 }));
    await s11('11:20', '11:21');
    crowd.forEach((c, i) => { if (i % 2) c.pose = 'raise'; });
    const barn = SC.add({ frames: K.who('barnabas'), x: -10, y: 147, facing: 1, speed: 20 });
    const me = SC.add({ id: 'player', frames: P0.player, x: -28, y: 148, facing: 1, speed: 20 });
    await SC.say({ kind: 'drama', text: 'You came north with Barnabas, sent by the apostles to see whether the news from Antioch was true. It is.' });
    SC.walk(me, 110);
    await SC.walk(barn, 128);
    await s11('11:22', '11:24');
    barn.pose = 'raise';
    AU() && AU().music('wonder');
    game.observe('antioch', 'greeks', 'In Antioch, men from Cyprus and Cyrene preached the Lord Jesus to Greeks, and a great number believed (Acts 11:20–21).', false, true);

    // a Greek table
    await K.fade(async () => {
      const h = K.interiorStage();
      h.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.3 } };
      const bg0 = h.bg;
      h.bg = function (ctx, t, cam, sc) {
        bg0.call(h, ctx, t, cam, sc);
        R(ctx, 60, 142, 140, 3, '#7a5a3a'); R(ctx, 60, 142, 140, 1, '#946c46');
        for (let x = 70; x < 190; x += 24) { R(ctx, x, 140, 4, 2, '#c99a58'); R(ctx, x + 8, 139, 4, 3, '#8a3a3a'); R(ctx, x + 15, 140, 3, 2, '#d8d0bc'); }
      };
      SC.load(h); SC.cam = 0; SC.camGoal = 0;
    });
    [[74, 1], [90, 1], [106, 1], [150, -1], [166, -1], [182, -1]].forEach((c, i) => SC.add({ frames: greek(i + 3), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    SC.add({ frames: K.who('barnabas'), x: 128, y: 147, pose: 'sit', facing: 1 });
    const me2 = SC.add({ id: 'player', frames: P0.player, x: 220, y: 147, facing: -1, speed: 18 });
    await SC.say({ kind: 'drama', text: 'A Greek believer, a dealer in dyed wool, invites Barnabas and you to supper. There is bread, and olives, and a dish of meat from the market. No one at this table knows where the meat was bought, or whether it was ever offered on an altar.' });
    const heart = await SC.choose('Barnabas is already eating. Your host passes you the dish.', [
      'Eat whatever is set before you.',
      'Eat the bread and the olives, and nothing else.',
      'Thank them warmly, and eat later, alone.',
    ]);
    game.setHeart('antioch', heart);
    if (heart < 2) { await SC.walk(me2, 200); me2.pose = 'sit'; }
    await SC.say({ kind: 'drama', text: heart === 0 ? 'Your host laughs and fills your cup. You think of a sheet let down from heaven, and of a voice that said three times not to call unclean what God has cleansed.' : heart === 1 ? 'Nobody minds. Your host keeps the bread coming. Later the believers will argue about these tables for years.' : 'He nods, a little hurt, and lets you go. Barnabas watches you leave and says nothing.' });
    game.observe('antioch', 'table', ['I ate at a Greek believer’s table, whatever was set before me.', 'I ate bread and olives at a Greek believer’s table.', 'I thanked my Greek host and ate later, alone.'][heart], false, true);

    // Tarsus: Barnabas looks for Saul
    await K.fade(async () => {
      const w = K.interiorStage();
      w.audio = { music: 'land', amb: { room: 0.5, city: 0.2 } };
      const bg0 = w.bg;
      w.bg = function (ctx, t, cam, sc) {
        bg0.call(w, ctx, t, cam, sc);
        // goat-hair tent cloth hung to work
        for (let k = 0; k < 3; k++) { R(ctx, 150 + k * 30, 96, 22, 40, k % 2 ? '#3a3028' : '#4a3e34'); for (let y = 98; y < 136; y += 4) R(ctx, 150 + k * 30, y, 22, 1, '#2e2620'); }
      };
      SC.load(w); SC.cam = 0;
    });
    const saul = SC.add({ frames: K.who('saul'), x: 170, y: 147, pose: 'sit', facing: -1 });
    const b2 = SC.add({ frames: K.who('barnabas'), x: -10, y: 146, facing: 1, speed: 20 });
    SC.add({ id: 'player', frames: P0.player, x: -26, y: 147, facing: 1, speed: 20 });
    await SC.say({ kind: 'history', text: 'Tarsus, chief city of Cilicia. Saul had been sent home here for his safety (Acts 9:30). By trade he was a tentmaker (18:3), working goat-hair cloth.' });
    await SC.walk(b2, 130);
    await s11('11:25', '11:25');
    saul.pose = 'stand';
    await SC.say({ kind: 'drama', speaker: 'Saul', text: game.save.completed.damascus ? 'You again: the one from Damascus who writes everything down. Barnabas, you have brought me a witness.' : 'Barnabas. And you have brought a witness with you.' });
    await s11('11:26', '11:26');
    game.observe('antioch', 'christians', 'Barnabas brought Saul to Antioch, and the disciples were first called Christians there (Acts 11:26).', false, true);

    // the name, and the famine
    await K.fade(async () => { SC.load(street()); SC.cam = 40; SC.camGoal = 40; });
    for (let i = 0; i < 6; i++) SC.add({ frames: greek(i + 9), x: 70 + i * 22, y: 147 + (i % 2), facing: i % 2 ? 1 : -1 });
    const agabus = SC.add({ frames: K.villager(1820), x: 200, y: 146, facing: -1 });
    SC.add({ frames: K.who('barnabas'), x: 230, y: 147, facing: -1 });
    SC.add({ frames: K.who('saul'), x: 246, y: 147, facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 170, y: 148, facing: 1 });
    await SC.say({ kind: 'drama', speaker: 'A man in the market', text: 'There go the Christianoi. Christ’s people.' });
    agabus.pose = 'out';
    await s11('11:27', '11:28');
    agabus.pose = 'stand';
    AU() && AU().sfx('coins');
    await s11('11:29', '11:30');
    await SC.say({ kind: 'drama', text: 'You put in what you have, and watch Barnabas and Saul load the relief for Jerusalem: Greek money for Jewish believers, carried by a Levite and a Pharisee.' });
    await K.answerAll(game, 'antioch');
    game.addQuestion(TW.D.episodes.antioch.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'antioch', 'Write down the name they gave us.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.antioch = EP;
})(window.TW);
