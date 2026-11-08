/* The Way — Episode XXV: Cyprus (Acts 13:1–13). */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'cyprus' };
  const s13 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts13', a, b), text: P.vs('acts13', a, b) });
  Object.assign(K.looks, {
    simeon: { skin: '#3e2418', hair: '#151010', beard: '#151010', tunic: '#d8ccae', mantle: '#4a5a42' },
    lucius: { skin: '#5a3626', hair: '#151010', beard: '#151010', tunic: '#b49a6a', mantle: '#6a4a3a' },
    manaen: { skin: '#b07a50', hair: '#5f5048', beard: '#5f5048', tunic: '#e8e0cc', mantle: '#5a2a5a', stripe: '#d8b04a' },
    johnmark: { skin: '#b8845a', hair: '#2a1a12', tunic: '#a89a7a', mantle: '#4a5a72' },
    sergius: { skin: '#c49470', hair: '#8a7a6a', tunic: '#f0eadb', stripe: '#5a2a5a', mantle: '#f4f0e6' },
    elymas: { skin: '#a8724a', hair: '#151010', beard: '#151010', tunic: '#2a2a3a', mantle: '#4a2a4a' },
  });

  // the open sea, a merchant ship, and Cyprus on the horizon
  function seaStage() {
    const A = K.art();
    const st = { width: 256, land: 0, audio: { music: 'land', amb: { shore: 0.8, wind: 0.35 } },
      bg(ctx, t) {
        ctx.drawImage(A.sky, 0, 0);
        if (st.land > 0) { for (let i = 0; i < 256; i++) { const h = Math.round(st.land * (6 + (U.fbm(i * 0.04, 5.5, 3, 3) - 0.3) * 14)); if (i > 120 && h > 0) R(ctx, i, 82 - h, 1, h, '#8a9078'); } }
        for (let y = 82; y < 160; y++) R(ctx, 0, y, 256, 1, y < 84 ? '#9cbcc4' : y % 4 ? '#3f7a88' : '#4a8592');
        const fr = Math.floor(t * 3);
        for (let i = 0; i < 70; i++) if (U.hash(i, 9, fr) > 0.55) R(ctx, Math.floor(U.hash(i, 2, 0) * 256), 86 + Math.floor(U.hash(i, 3, 0) * 70), 3, 1, '#8fbcc0');
      } };
    return st;
  }
  function ship(st) {
    return SC.add({ x: 128, y: 136, z: 136, draw(ctx, sx, sy, t) {
      const bob = Math.round(Math.sin(t * 1.6) * 1.5), y = sy + bob, x = sx;
      // hull
      for (let i = 0; i < 9; i++) R(ctx, x - 46 + i * 2, y - 12 + i, 92 - i * 4, 1, i < 2 ? '#7a5634' : i % 2 ? '#5a3e26' : '#4c341f');
      R(ctx, x + 40, y - 18, 4, 7, '#5a3e26'); R(ctx, x - 48, y - 15, 5, 4, '#5a3e26');
      // mast, yard and a striped square sail
      R(ctx, x - 1, y - 70, 3, 58, '#4a3420'); R(ctx, x - 26, y - 66, 54, 2, '#4a3420');
      const fill = Math.sin(t * 0.8) * 2;
      for (let r = 0; r < 40; r++) { const w = 50 + Math.round(fill * Math.sin((r / 40) * Math.PI)); R(ctx, x - 25, y - 64 + r, w, 1, Math.floor(r / 5) % 2 ? '#e6dcc4' : '#a83a2a'); }
      R(ctx, x - 25, y - 24, 1, 12, '#3a2a1a'); R(ctx, x + 24, y - 24, 1, 12, '#3a2a1a');
      // foam at the bow
      if (Math.floor(t * 4) % 2) R(ctx, x + 44, y - 5, 4, 1, '#d8ecec');
    } });
  }

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- the church at Antioch ----
    const h = K.interiorStage();
    h.audio = { music: 'reflect', amb: { room: 0.5, city: 0.15 } };
    SC.load(h); SC.cam = 0;
    const five = [['barnabas', 70], ['simeon', 92], ['lucius', 114], ['manaen', 162], ['saul', 184]].map((c, i) => SC.add({ frames: K.who(c[0]), x: c[1], y: 147, pose: 'sit', facing: i < 3 ? 1 : -1 }));
    const others = [0, 1, 2, 3].map((i) => SC.add({ frames: K.villager(2000 + i, i % 2 === 0), x: 30 + i * 12 + (i > 1 ? 180 : 0), y: 148, pose: 'sit', facing: i > 1 ? -1 : 1 }));
    SC.add({ id: 'player', frames: P0.player, x: 140, y: 149, pose: 'sit', facing: 1 });
    await s13('13:1', '13:1');
    await SC.say({ kind: 'drama', text: 'A Levite from Cyprus, Simeon called Niger, “the Black,” a man from Cyrene, a man who grew up in Herod’s palace, and the Pharisee from Tarsus. You have never seen a council like this one.' });
    five.forEach((f) => { f.pose = 'raise'; });
    await s13('13:2', '13:2');
    five[0].pose = 'stand'; five[4].pose = 'stand';
    [five[1], five[2], five[3]].concat(others).forEach((o) => { o.pose = 'out'; });
    await s13('13:3', '13:3');
    game.observe('cyprus', 'sent', 'The church at Antioch fasted, prayed, laid hands on Barnabas and Saul, and sent them away (Acts 13:2–3).', false, true);
    await SC.say({ kind: 'drama', text: TW.Role.pick('Barnabas asks you to come as far as Cyprus. He has kin in Salamis, and letters for them, and he would like a witness from Jerusalem along.', 'Barnabas asks you to come as far as Cyprus with his cousin’s family, who are going home to Salamis. He has letters for his kin, and he would like a witness from Jerusalem along.') });

    // ---- the sea ----
    await K.fade(async () => { const st = seaStage(); SC.load(st); SC.cam = 0; ship(st); });
    const SEA = SC.stage;
    const deck = [['barnabas', 108], ['saul', 120], ['johnmark', 140]].map((c) => SC.add({ frames: K.who(c[0]), x: c[1], y: 124, z: 137, facing: 1 }));
    SC.add({ id: 'player', frames: P0.player, x: 92, y: 124, z: 137, facing: 1 });
    await s13('13:4', '13:4');
    await SC.say({ kind: 'drama', text: 'You have never been to sea. By the second hour you are sick over the rail, and Saul, who has sailed before, brings you water and does not laugh.' });
    await SC.tween(3000, (p) => { SEA.land = p; });
    deck.forEach((d) => { d.facing = 1; });
    await SC.say({ kind: 'drama', text: 'Toward evening a long blue island lifts out of the sea. Barnabas stands at the bow and says nothing at all.' });

    // ---- Salamis ----
    await K.fade(async () => {
      SC.load({ width: 256, hotspots: [], audio: { music: 'reflect', amb: { room: 0.5, crowd: 0.15 } }, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } });
      SC.cam = 0;
    });
    [[10, 124], [26, 124], [12, 134], [30, 134], [222, 124], [242, 124], [204, 134], [240, 134]].forEach((c, i) => SC.add({ frames: K.villager(2010 + i, i % 3 === 1), x: c[0], y: c[1], pose: 'sit', facing: c[0] < 128 ? 1 : -1 }));
    SC.add({ frames: K.who('saul'), x: 128, y: 152, facing: 1, pose: 'out' });
    SC.add({ frames: K.who('barnabas'), x: 104, y: 152, facing: 1 });
    SC.add({ frames: K.who('johnmark'), x: 82, y: 153, facing: 1 });
    SC.add({ id: 'player', frames: P0.player, x: 60, y: 153, facing: 1 });
    await s13('13:5', '13:5');

    // ---- Paphos: the proconsul ----
    await K.fade(async () => {
      const st = { width: 256, dark: 0, audio: { music: 'reflect', amb: { room: 0.45, city: 0.15 } }, bg(ctx) { ctx.drawImage(K.atriumArt(), 0, 0); },
        fx(fc, k, t, cam) {
          if (!st.dark || !st.at) return;
          const x = (st.at.x - cam) * k, y = (st.at.y - 18) * k;
          const g = fc.createRadialGradient(x, y, 0, x, y, 26 * k);
          g.addColorStop(0, 'rgba(14,12,20,' + st.dark + ')'); g.addColorStop(1, 'rgba(14,12,20,0)');
          fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        } };
      SC.load(st); SC.cam = 0;
    });
    const PH = SC.stage;
    await SC.say({ kind: 'history', text: 'Paphos, the Roman capital of Cyprus, a hundred and fifty kilometers west across the island.' });
    const sergius = SC.add({ frames: K.who('sergius'), x: 190, y: 149, pose: 'sit', facing: -1 });
    const elymas = SC.add({ frames: K.who('elymas'), x: 210, y: 148, facing: -1, speed: 8 });
    const guards = [SC.add({ frames: K.who('soldier'), x: 236, y: 147, facing: -1 }), SC.add({ frames: K.who('soldier'), x: 160, y: 152, facing: -1 })];
    const paul = SC.add({ frames: K.who('saul'), x: 120, y: 150, facing: 1 });
    SC.add({ frames: K.who('barnabas'), x: 102, y: 150, facing: 1 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 82, y: 151, facing: 1, speed: 20 });
    void guards;
    await s13('13:6', '13:7');
    elymas.pose = 'out';
    await s13('13:8', '13:8');
    elymas.pose = 'stand';
    await SC.say({ kind: 'drama', speaker: 'Sergius Paulus', text: 'My adviser says these are fables from Judea. You there, from Jerusalem. Were you there? Did you see any of it yourself?' });
    const heart = await SC.choose('The governor of Cyprus is looking at you.', [
      'Tell him what you saw with your own eyes.',
      'Let Paul answer for both of you.',
      'Hand him your scroll and let him read.',
    ]);
    game.setHeart('cyprus', heart);
    if (heart === 0) {
      await SC.walk(me, 140);
      await SC.say({ kind: 'drama', text: 'You tell him plainly, the way you learned to write it: the roof in Capernaum, the cross outside the gate, the stone rolled away, the cloths lying where the body had been. You say only what you saw.' });
    } else if (heart === 2) {
      await SC.walk(me, 140);
      await SC.say({ kind: 'drama', text: 'You hand him the scroll. He unrolls it and reads in silence for a long time, a year and more of things seen and heard, with the dates and the names of witnesses.' });
    } else {
      await SC.say({ kind: 'drama', text: 'You look at Paul, and Paul begins. You realize that he too is a witness: of the road to Damascus, and of the man he once hunted.' });
    }
    if (heart !== 1) {
      const q = game.answer('witness', 'Yes. In Paphos a Roman governor asked what I had seen, and I told him.', 'Acts 1:8; 4:20');
      if (q) { AU() && AU().sfx('chime'); await SC.say({ kind: 'answer', text: '“' + q.text + '” (' + q.ref + ')\n\nYes. In Paphos a Roman governor asked what I had seen, and I told him. (Acts 1:8; 4:20)' }); }
    }
    elymas.pose = 'out'; elymas.facing = -1;
    await SC.wait(500);
    paul.pose = 'out';
    await s13('13:9', '13:10');
    PH.at = elymas;
    AU() && AU().music('tension');
    await SC.tween(1400, (p) => { PH.dark = p * 0.85; });
    await s13('13:11', '13:11');
    elymas.pose = 'out';
    await SC.walk(elymas, 196); await SC.walk(elymas, 222);
    paul.pose = 'stand';
    sergius.pose = 'stand';
    AU() && AU().music('wonder');
    await s13('13:12', '13:12');
    game.observe('cyprus', 'proconsul', 'At Paphos the proconsul Sergius Paulus believed, astonished at the teaching of the Lord (Acts 13:12).', false, true);
    game.observe('cyprus', 'paul', 'From Paphos on, Saul is called Paul (Acts 13:9).', false, true);
    await s13('13:13', '13:13');
    await SC.say({ kind: 'drama', text: 'At the harbor John Mark says he is going home. Paul says nothing, and his silence is louder than anything he could have said. You go back to Antioch with letters, and they go on to the mountains of Galatia.' });
    game.addQuestion(TW.D.episodes.cyprus.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'cyprus', 'Write it down. Begin with the name.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.cyprus = EP;
})(window.TW);
