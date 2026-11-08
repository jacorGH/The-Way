/* The Way — Episode XI: The Empty Tomb (Mark 16:1–8; John 20:1–18).
   The scribe sees the women flee and the disciples run, and looks in himself. Mary Magdalene's meeting with
   the risen Jesus is hers alone: he hears it from her, as a memory. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const EP = { id: 'tomb' };
  const sayS = (key, a, b) => SC.say({ kind: 'scripture', ref: P.ref(key, a, b), text: P.vs(key, a, b) });

  function garden(st) {
    st.width = 256; st.stoneX = 186 + 28; st.cloths = true; st.dawn = st.dawn === undefined ? 0.6 : st.dawn;
    st.bg = function (ctx) { ctx.drawImage(K.gardenArt(), 0, 0); };
    st.fx = function (fc, k) {
      if (st.dawn > 0) {
        const g = fc.createLinearGradient(0, 0, 0, 160 * k);
        g.addColorStop(0, 'rgba(40,40,80,' + st.dawn + ')'); g.addColorStop(0.45, 'rgba(120,70,90,' + st.dawn * 0.7 + ')'); g.addColorStop(1, 'rgba(30,26,40,' + st.dawn * 0.8 + ')');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
      }
      fc.globalCompositeOperation = 'lighter';
      const s = fc.createRadialGradient(256 * k, 70 * k, 0, 256 * k, 70 * k, 180 * k);
      s.addColorStop(0, 'rgba(255,200,130,' + (0.35 - st.dawn * 0.3) + ')'); s.addColorStop(1, 'rgba(255,200,130,0)');
      fc.fillStyle = s; fc.fillRect(0, 0, 256 * k, 160 * k);
      if (st.glow) {
        const g2 = fc.createRadialGradient(184 * k, 128 * k, 0, 184 * k, 128 * k, 26 * k);
        g2.addColorStop(0, 'rgba(255,250,235,' + st.glow + ')'); g2.addColorStop(1, 'rgba(255,250,235,0)');
        fc.fillStyle = g2; fc.fillRect(0, 0, 256 * k, 160 * k);
      }
      fc.globalCompositeOperation = 'source-over';
    };
    return st;
  }

  // Mary's memory
  TW.Vignettes.mary_garden = function () {
    const st = garden({ dawn: 0.15, audio: { amb: { birds: 0.6, wind: 0.3 } } });
    SC.load(st); SC.cam = 0;
    K.tombStone(st);
    const mary = SC.add({ frames: K.who('magdalene'), x: 160, y: 147, facing: 1, speed: 26 });
    const angels = [SC.add({ frames: K.who('young'), x: 178, y: 141, pose: 'sit', facing: 1, visible: false, z: 146 }), SC.add({ frames: K.who('young'), x: 192, y: 141, pose: 'sit', facing: -1, visible: false, z: 146 })];
    const j = SC.add({ frames: K.sprites().jesus, x: 104, y: 148, facing: 1, visible: false });
    return {
      look: async () => { mary.pose = 'sit'; await SC.wait(500); angels.forEach((a) => { a.visible = true; }); st.glow = 0.45; await SC.wait(700); mary.pose = 'stand'; },
      turn: async () => { j.visible = true; mary.facing = -1; await SC.wait(700); },
      name: async () => { AU() && AU().music('wonder'); await SC.walk(mary, 120); mary.pose = 'sit'; await SC.wait(900); },
      go: async () => { mary.pose = 'stand'; mary.speed = 50; await SC.walk(mary, -20); },
    };
  };

  EP.run = async function (game) {
    const P0 = K.sprites();
    const st = garden({ audio: { music: 'silence', amb: { birds: 0.2, wind: 0.3 } } });
    SC.load(st); SC.cam = 0; SC.camGoal = 0;
    K.tombStone(st);
    const me = SC.add({ id: 'player', frames: P0.player, x: -10, y: 149, facing: 1, speed: 18 });
    const women = ['magdalene', 'maryj', 'salome'].map((n, i) => SC.add({ frames: K.who(n), x: -40 - i * 14, y: 147 + (i % 2), facing: 1, speed: 16, pose: 'carry' }));
    await SC.say({ kind: 'history', text: 'The Sabbath ended at sunset yesterday. This is the first day of the week, before the sun is fully up.' });
    await SC.say({ kind: 'drama', text: 'You have not slept. Before dawn you find yourself walking back to the garden, though you could not say why.' });
    SC.tween(9000, (p) => { st.dawn = 0.6 * (1 - p); AU() && p > 0.5 && AU().amb({ birds: 0.6, wind: 0.25 }); });
    women.forEach((w, i) => SC.walk(w, 120 + i * 12));
    await SC.walk(me, 30);
    await sayS('mark16', '16:1', '16:3');
    await SC.say({ kind: 'drama', text: 'From where you stand you can see the stone. It has already been rolled aside.' });
    await sayS('mark16', '16:4', '16:4');
    women.forEach((w) => { w.pose = 'stand'; });
    await Promise.all(women.map((w, i) => SC.wait(i * 300).then(() => SC.walk(w, 184)).then(() => { w.visible = false; })));
    st.glow = 0.4;
    await sayS('mark16', '16:5', '16:7');
    st.glow = 0;
    women.forEach((w) => { w.visible = true; w.speed = 46; w.facing = -1; });
    await Promise.all(women.map((w, i) => SC.wait(i * 150).then(() => SC.walk(w, -30))));
    await sayS('mark16', '16:8', '16:8');
    await SC.say({ kind: 'history', text: 'The oldest manuscripts of Mark end here, with the women afraid and silent. The other Gospels tell what happened next.' });
    game.observe('tomb', 'women', 'At dawn the women found the stone rolled back; a young man in white told them, “He has risen” (Mark 16:4–6).', false, true);

    // the two disciples run
    await sayS('john20', '20:1', '20:2');
    const peter = SC.add({ frames: K.who('peter'), x: -40, y: 147, facing: 1, speed: 40 });
    const john = SC.add({ frames: K.who('john'), x: -20, y: 148, facing: 1, speed: 52 });
    SC.walk(peter, 168);
    await SC.walk(john, 178);
    await sayS('john20', '20:3', '20:4');
    john.pose = 'sit';
    await sayS('john20', '20:5', '20:5');
    await SC.walk(peter, 184); peter.visible = false;
    await sayS('john20', '20:6', '20:7');
    john.pose = 'stand'; await SC.walk(john, 184); john.visible = false;
    await sayS('john20', '20:8', '20:10');
    [peter, john].forEach((d) => { d.visible = true; d.facing = -1; SC.walk(d, -30); });

    const look = await SC.choose('They are gone. The tomb is open in front of you. What do you do?', [
      'Stoop and look in.',
      'Go inside.',
      'Stay where you are.',
    ]);
    game.setHeart('tomb', look);
    if (look < 2) {
      await SC.walk(me, look === 1 ? 184 : 168);
      if (look === 1) me.visible = false; else me.pose = 'sit';
      const helped = game.save.heart.burial === 0;
      await SC.say({ kind: 'drama', text: 'The linen cloths lie where the body was laid, and the cloth from his head is rolled up in a place by itself.' + (helped ? ' Two evenings ago you helped wind those cloths around him.' : ' Two evenings ago you watched them carry him in.') });
      game.observe('tomb', 'cloths', 'I saw the linen cloths lying in the empty tomb, the head cloth rolled up by itself (John 20:5–7).', false, true);
      me.visible = true; me.pose = 'stand'; me.facing = -1;
      await SC.walk(me, 60);
    } else {
      await SC.say({ kind: 'drama', text: 'You cannot make yourself go closer. The open doorway is enough.' });
      game.observe('tomb', 'cloths', 'I saw the stone rolled away and the tomb standing open.', false, true);
    }

    // Mary returns
    const mary = SC.add({ frames: K.who('magdalene'), x: -20, y: 147, facing: 1, speed: 22 });
    await SC.walk(mary, 160);
    mary.pose = 'sit';
    await sayS('john20', '20:11', '20:11');
    await SC.say({ kind: 'drama', text: 'A woman stands at the tomb, weeping. You step back among the trees. This is not yours to watch.' });
    me.facing = -1;
    await SC.walk(me, 20);
    await K.fade(async () => { mary.x = 150; mary.pose = 'stand'; me.x = 40; me.facing = 1; });
    AU() && AU().music('wonder');
    mary.facing = -1; mary.speed = 30;
    await SC.walk(mary, 66);
    await SC.say({ kind: 'drama', speaker: 'Mary of Magdala', text: 'You were at the burial, scribe. I saw you. Then hear this, and write it down: I have seen the Lord!' });
    await SC.choose('What do you ask her?', ['What happened?'], 'Your question');
    const mem = await TW.Vignettes.enter('mary_garden', 'Mary of Magdala');
    await sayS('john20', '20:11', '20:12');
    await mem.look();
    await sayS('john20', '20:13', '20:13');
    await mem.turn();
    await sayS('john20', '20:14', '20:15');
    await mem.name();
    await sayS('john20', '20:16', '20:17');
    await mem.go();
    await TW.Vignettes.exit();
    await sayS('john20', '20:18', '20:18');
    mary.facing = -1;
    SC.walk(mary, -30);
    game.observe('tomb', 'mary', 'Mary Magdalene told me she had seen the Lord, and he had called her by name (John 20:16–18).', false, true);
    await SC.say({ kind: 'drama', text: 'She runs toward the city. You stand alone in the garden with your scroll, and every question in it looks different this morning.' });
    game.addQuestion(TW.D.episodes.tomb.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'tomb', 'Write the report you never expected to write.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.tomb = EP;
})(window.TW);
