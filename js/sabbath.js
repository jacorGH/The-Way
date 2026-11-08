/* The Way — Episode III: Lord of the Sabbath (Mark 2:23–3:6) */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, SC = TW.Scene, K = TW.Kit, P = TW.P;
  const R = K.R;
  const EP = { id: 'sabbath' };

  let FIELD = null, SYN = null;
  function fieldArt() {
    if (FIELD) return FIELD;
    const A = K.art();
    const c = U.makeCanvas(256, 160), x = c.getContext('2d');
    x.drawImage(A.sky, 0, 0);
    x.drawImage(A.hills, -40, -2);
    // rolling Galilean hills with olive trees
    for (let i = 0; i < 256; i++) {
      const top = 74 + Math.round(Math.sin(i * 0.025) * 5 + (U.fbm(i * 0.04, 2, 8, 3) - 0.5) * 8);
      R(x, i, top, 1, 104 - top, '#8f9257'); R(x, i, top, 1, 1, '#a3a466');
    }
    for (let i = 0; i < 22; i++) {
      const ox = Math.floor(K.rnd(i, 61) * 256), oy = 82 + Math.floor(K.rnd(i, 62) * 16);
      R(x, ox, oy, 4, 3, '#5f6a3c'); R(x, ox + 1, oy - 1, 2, 1, '#6f7a48'); R(x, ox + 2, oy + 3, 1, 2, '#4a3a2a');
    }
    // the field, ripe in spring
    for (let y = 100; y < 160; y++)
      for (let i = 0; i < 256; i++) {
        const r = K.rnd(i * 7, y);
        R(x, i, y, 1, 1, r > 0.86 ? '#e2c47c' : r > 0.62 ? '#c9a85a' : r > 0.3 ? '#bf9c4e' : '#b18d42');
      }
    // footpath
    for (let i = 0; i < 256; i++) R(x, i, 138 + Math.round(Math.sin(i * 0.03)), 1, 11, K.rnd(i, 71) > 0.8 ? '#9a8462' : '#ab9672');
    R(x, 0, 148, 256, 1, '#8a744f');
    FIELD = c;
    return c;
  }
  function wheatFront(ctx, t) {
    for (let i = 0; i < 256; i += 2) {
      const sway = Math.round(Math.sin(t * 1.6 + i * 0.12));
      const h = 6 + Math.floor(K.rnd(i, 81) * 6);
      R(ctx, i + sway, 160 - h, 1, h, '#a8843c');
      R(ctx, i + sway, 160 - h - 2, 1, 2, '#e8cc86');
    }
  }

  function synArt() {
    if (SYN) return SYN;
    const c = U.makeCanvas(256, 160), x = c.getContext('2d');
    K.basalt(x, 0, 0, 256, 150, 7070);
    x.globalAlpha = 0.18; R(x, 0, 0, 256, 150, '#d8d0c0'); x.globalAlpha = 1;
    R(x, 0, 0, 256, 10, '#3d2a1a'); R(x, 0, 9, 256, 1, '#24180f');
    for (let b = 8; b < 256; b += 40) R(x, b, 0, 6, 10, '#4a3220');
    [40, 120, 200].forEach((wx) => { R(x, wx, 22, 10, 18, '#e9d9b0'); R(x, wx - 1, 21, 12, 1, '#6a645e'); });
    [84, 168].forEach((cx) => {
      R(x, cx, 10, 8, 140, '#7a736b'); R(x, cx, 10, 2, 140, '#8c857d'); R(x, cx + 6, 10, 2, 140, '#5e5852');
      R(x, cx - 2, 10, 12, 4, '#8c857d'); R(x, cx - 2, 146, 12, 4, '#6a645e');
    });
    const tier = (x0, x1, y) => { R(x, x0, y, x1 - x0, 150 - y, '#7d756b'); R(x, x0, y, x1 - x0, 2, '#a39a8c'); R(x, x0, y + 2, x1 - x0, 1, '#5e574f'); };
    tier(0, 44, 124); tier(0, 62, 134); tier(0, 80, 144);
    tier(212, 256, 124); tier(194, 256, 134); tier(176, 256, 144);
    R(x, 0, 150, 256, 10, '#4c463f');
    for (let i = 0; i < 120; i++) R(x, Math.floor(K.rnd(i, 91) * 256), 150 + Math.floor(K.rnd(i, 92) * 10), 3, 1, '#5c564e');
    R(x, 122, 140, 12, 10, '#6a4a2c'); R(x, 122, 140, 12, 1, '#86603a');
    R(x, 124, 137, 8, 3, '#d8ccae'); R(x, 124, 137, 1, 3, '#8a6a42'); R(x, 131, 137, 1, 3, '#8a6a42');
    SYN = c;
    return c;
  }

  EP.run = async function (game) {
    const P0 = K.sprites();
    // ---- the grain fields ----
    SC.load({
      width: 256,
      audio: { music: 'galilee', amb: { wind: 0.5, birds: 0.7, village: 0.15 } },
      bg(ctx) { ctx.drawImage(fieldArt(), 0, 0); },
      fg(ctx, t) { wheatFront(ctx, t); },
      fx(fc, k) {
        fc.globalCompositeOperation = 'lighter';
        const g = fc.createRadialGradient(42 * k, 20 * k, 0, 42 * k, 20 * k, 140 * k);
        g.addColorStop(0, 'rgba(255,236,190,0.38)'); g.addColorStop(1, 'rgba(255,220,160,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        fc.globalCompositeOperation = 'source-over';
      },
    });
    SC.cam = 0;
    const phar = [[214, 41], [232, 42], [246, 43]].map((c) => SC.add({ frames: P0.scribe(c[1]), x: c[0], y: 145, facing: -1 }));
    const me = SC.add({ id: 'player', frames: P0.player, x: 200, y: 146, facing: -1 });
    const jesus = SC.add({ id: 'jesus', frames: P0.jesus, x: -20, y: 145, facing: 1, speed: 22 });
    const disc = [0, 1, 2, 3, 4].map((i) => SC.add({ frames: K.villager(200 + i + 7), x: -40 - i * 14, y: 144 + (i % 2) * 2, facing: 1, speed: 22 }));

    await SC.say({ kind: 'history', text: 'Grain ripens in Galilee in spring. The Law let a hungry traveler pluck heads of grain by hand from a neighbor’s field (Deuteronomy 23:25). But this is the Sabbath, and the Pharisees count plucking as reaping, a kind of work.' });
    SC.walk(jesus, 120);
    disc.forEach((d, i) => SC.walk(d, 104 - i * 14));
    await SC.say({ kind: 'scripture', ref: 'Mark 2:23', text: P.vs('mark2c', '2:23') });
    let plucking = true;
    (async () => {
      while (plucking) {
        disc.forEach((d, i) => { if (!d.moving) d.pose = (Math.floor(SC.t * 3) + i) % 2 ? 'out' : 'stand'; });
        await SC.wait(200);
      }
      disc.forEach((d) => { d.pose = 'stand'; });
    })();
    await SC.wait(1200);
    const law = await SC.choose('You know the Law as well as anyone here. Is this work?', [
      'Yes. Plucking is reaping, and reaping is forbidden on the Sabbath.',
      'The Law lets the hungry pluck by hand. The day is the only question.',
      'I will hear what he says first.',
    ]);
    game.observe('sabbath', 'law', ['I judged that plucking grain on the Sabbath is reaping.', 'I knew the Law allows the hungry to pluck by hand.', 'I waited to hear his answer before judging.'][law], false, true);
    plucking = false;
    jesus.facing = 1;
    await SC.say({ kind: 'scripture', ref: 'Mark 2:24', text: P.vs('mark2c', '2:24') });
    await SC.say({ kind: 'scripture', ref: 'Mark 2:25–26', text: P.vs('mark2c', '2:25', '2:26') });
    await SC.say({ kind: 'scripture', ref: 'Mark 2:27–28', text: P.vs('mark2c', '2:27', '2:28') });
    game.observe('sabbath', 'made', 'He said the Sabbath was made for man, and the Son of Man is lord of it (Mark 2:27–28).', false, true);
    void me; void phar;

    // ---- the synagogue ----
    await K.fade(async () => {
      SC.load({
        width: 256, hotspots: [],
        audio: { music: 'reflect', amb: { room: 0.6, crowd: 0.15 } },
        bg(ctx) { ctx.drawImage(synArt(), 0, 0); },
        fx(fc, k, t, cam, sc) {
          fc.fillStyle = 'rgba(14,8,3,0.22)'; fc.fillRect(0, 0, 256 * k, 160 * k);
          fc.globalCompositeOperation = 'lighter';
          [40, 120, 200].forEach((wx) => {
            const gr = fc.createLinearGradient(0, 22 * k, 0, 150 * k);
            gr.addColorStop(0, 'rgba(255,238,196,0.3)'); gr.addColorStop(1, 'rgba(255,238,196,0.02)');
            fc.fillStyle = gr;
            fc.beginPath();
            fc.moveTo(wx * k, 40 * k); fc.lineTo((wx + 10) * k, 40 * k); fc.lineTo((wx + 34) * k, 150 * k); fc.lineTo((wx + 14) * k, 150 * k);
            fc.closePath(); fc.fill();
          });
          fc.globalCompositeOperation = 'source-over';
        },
      });
      SC.cam = 0;
    });
    const IN = SC.stage;
    const left = [];
    [[10, 124], [26, 124], [12, 134], [30, 134], [46, 134], [14, 144], [34, 144], [54, 144]].forEach((c, i) => left.push(SC.add({ frames: K.villager(500 + i, i % 3 === 2), pose: 'sit', x: c[0], y: c[1], facing: 1 })));
    const man = SC.add({ id: 'man', frames: K.villager(530), pose: 'sit', x: 72, y: 144, facing: 1, speed: 20 });
    const pharisees = [];
    [[222, 124, 51], [242, 124, 52], [204, 134, 53], [240, 134, 54], [184, 144, 55], [222, 144, 56], [242, 144, 57]].forEach((c) => pharisees.push(SC.add({ frames: P0.scribe(c[2]), pose: 'sit', x: c[0], y: c[1], facing: -1, speed: 24 })));
    const me2 = SC.add({ id: 'player', frames: P0.player, pose: 'sit', x: 204, y: 145, facing: -1, speed: 24 });
    const j2 = SC.add({ id: 'jesus', frames: P0.jesus, x: 146, y: 152, facing: -1 });

    await SC.say({ kind: 'history', text: 'First-century synagogues found at Magdala and Gamla had stepped benches along the walls, facing a central floor where Scripture was read. The white limestone synagogue at Capernaum today was built centuries later, over older basalt foundations.' });
    TW.Audio && TW.Audio.music('tension');
    await SC.say({ kind: 'scripture', ref: 'Mark 3:1–2', text: P.vs('mark2c', '3:1', '3:2') });
    const obs = [
      { id: 'hand', x0: 60, x1: 84, y0: 118, y1: 150, text: 'A man with a withered hand sits near the front.' },
      { id: 'watching', x0: 176, x1: 256, y0: 98, y1: 150, text: 'Every Pharisee on these benches is watching him, not the reading.' },
      { id: 'center', x0: 134, x1: 160, y0: 124, y1: 156, text: 'He stands on the open floor where everyone can see him.' },
    ];
    obs.forEach((o) => IN.hotspots.push(Object.assign({}, o, { active: () => SC.mode === 'observe', onTap: () => game.observe('sabbath', o.id, o.text, true) })));
    await SC.prompt('They are watching him. So are you. Tap what you notice.', 'Keep watching', 'observe');
    IN.hotspots.length = 0;

    await SC.say({ kind: 'scripture', ref: 'Mark 3:3', text: P.vs('mark2c', '3:3') });
    man.pose = 'stand';
    man.y = 152;
    await SC.walk(man, 118);
    man.facing = 1;
    j2.facing = 1;
    await SC.say({ kind: 'scripture', ref: 'Mark 3:4', text: P.vs('mark2c', '3:4') });
    const heart = await SC.choose('The answer is not hard. No one gives it. Why are you silent?', [
      'Because I am afraid of the men beside me.',
      'Because I have no answer.',
      'Because I know the answer and will not give it.',
    ]);
    game.setHeart('sabbath', heart);
    j2.facing = -1; await SC.wait(500); j2.facing = 1; await SC.wait(500); j2.facing = -1;
    await SC.say({ kind: 'scripture', ref: 'Mark 3:5', text: P.vs('mark2c', '3:5') });
    man.pose = 'out'; man.facing = 1;
    await SC.wait(900);
    man.pose = 'raise';
    TW.Audio && TW.Audio.music('wonder');
    left.forEach((p, i) => { if (i % 2) p.hopping = true; });
    await SC.wait(700);
    game.observe('sabbath', 'restored', 'He told the man to stretch out his hand, and it was restored (Mark 3:5).', false, true);

    TW.Audio && TW.Audio.music('tension');
    await SC.say({ kind: 'scripture', ref: 'Mark 3:6', text: P.vs('mark2c', '3:6') });
    pharisees.forEach((p, i) => { p.pose = 'stand'; SC.wait(i * 150).then(() => SC.walk(p, 300)); });
    const go = await SC.choose('They rise and file out. Your place has always been with them.', [
      'Follow them out.',
      'Stay where you are.',
    ]);
    if (go === 0) {
      me2.pose = 'stand';
      await SC.walk(me2, 262);
      await SC.say({ kind: 'drama', text: 'Outside, two men from Herod’s household are already waiting. You hear the word “destroy.” You came to write down what you saw. You did not expect to see this.' });
      game.observe('sabbath', 'plot', 'I followed my colleagues out and heard them plotting with the Herodians.', false, true);
    } else {
      await SC.say({ kind: 'drama', text: 'They go without you. Through the doorway you see men in Herod’s colors waiting for them. You stay on the bench, alone on your side of the room.' });
      game.observe('sabbath', 'plot', 'I stayed behind while my colleagues went out to plot with the Herodians.', false, true);
    }
    await SC.say({ kind: 'scripture', ref: 'Mark 3:7–8', text: P.single['Mark 3:7–8'] });
    game.addQuestion(TW.D.episodes.sabbath.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'sabbath');
  };

  K.fieldArt = fieldArt; K.synArt = synArt;
  TW.Episodes = TW.Episodes || {};
  TW.Episodes.sabbath = EP;
})(window.TW);
