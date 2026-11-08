/* The Way — Episode V: The Widow of Nain (Luke 7:11–17) */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S;
  const R = K.R;
  const EP = { id: 'nain' };
  const roadY = (x) => Math.round(141 + (x / 256) * 9);

  let ART = null;
  function nainArt() {
    if (ART) return ART;
    const A = K.art();
    const c = U.makeCanvas(256, 160), x = c.getContext('2d');
    x.drawImage(A.sky, 0, 0);
    // Nazareth ridge across the valley, and Mount Tabor standing alone
    for (let i = 0; i < 256; i++) {
      const top = 66 + Math.round((U.fbm(i * 0.03, 5.5, 4, 3) - 0.5) * 10);
      R(x, i, top, 1, 84 - top, '#a0988d'); R(x, i, top, 1, 1, '#b4ab9f');
    }
    for (let i = 150; i < 250; i++) {
      const d = (i - 200) / 50;
      const top = Math.round(84 - 30 * Math.max(0, 1 - d * d) ** 0.8);
      for (let y = top; y < 86; y++) R(x, i, y, 1, 1, i < 200 ? '#8a8a6a' : '#7c7c5f');
      R(x, i, top, 1, 1, '#a2a07c');
    }
    // the Jezreel valley in spring
    const fields = ['#8f9a55', '#a7a25e', '#bca76a', '#7f8c4c', '#b4a05c'];
    for (let y = 84; y < 114; y++) {
      for (let i = 0; i < 256; i++) {
        const band = Math.floor((i + y * 2.2) / 34) % fields.length;
        R(x, i, y, 1, 1, K.rnd(i, y) > 0.9 ? '#6f7a46' : fields[band]);
      }
    }
    // the slope of the Hill of Moreh
    for (let y = 112; y < 160; y++)
      for (let i = 0; i < 256; i++) {
        const r = K.rnd(i * 5, y);
        R(x, i, y, 1, 1, r > 0.88 ? '#7d8450' : r > 0.5 ? '#a08a62' : '#977f58');
      }
    for (let i = 0; i < 256; i++) { const ry = roadY(i); R(x, i, ry - 6, 1, 9, K.rnd(i, 19) > 0.8 ? '#b9a27a' : '#ad9670'); }
    // the village wall and gate
    for (let h = 0; h < 5; h++) { const hx = 2 + h * 13; R(x, hx, 72 + (h % 2) * 4, 12, 16, '#8a8074'); R(x, hx, 72 + (h % 2) * 4, 12, 2, '#a2958a'); }
    K.basalt(x, 0, 86, 66, 56, 909);
    for (let i = 0; i < 66; i += 6) R(x, i, 83, 4, 3, '#4a4440');
    R(x, 20, 106, 24, 4, '#6a645e');
    R(x, 22, 110, 20, 32, '#16110e');
    R(x, 24, 108, 16, 2, '#16110e');
    ART = c;
    return c;
  }

  EP.run = async function (game) {
    const P0 = K.sprites();
    SC.load({
      width: 256, hotspots: [],
      audio: { music: 'lament', amb: { wind: 0.5, birds: 0.4, crowd: 0.35 } },
      bg(ctx) { ctx.drawImage(nainArt(), 0, 0); },
      fg(ctx) { R(ctx, 0, 140, 22, 2, '#3d3835'); },
      fx(fc, k) {
        fc.globalCompositeOperation = 'lighter';
        const g = fc.createRadialGradient(42 * k, 20 * k, 0, 42 * k, 20 * k, 140 * k);
        g.addColorStop(0, 'rgba(255,236,190,0.34)'); g.addColorStop(1, 'rgba(255,220,160,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        fc.globalCompositeOperation = 'source-over';
      },
    });
    SC.cam = 0;
    const IN = SC.stage;
    const at = (x) => roadY(x) + 3;

    // the teacher and the multitude, coming up the road
    const jesus = SC.add({ id: 'jesus', frames: P0.jesus, x: 300, y: at(200), facing: -1, speed: 24 });
    const followers = [];
    [[316, 207], [330, 208], [344, 209], [358, 701], [372, 702], [386, 703]].forEach((c, i) => followers.push(SC.add({ frames: K.villager(c[1], i === 4), x: c[0], y: at(200) + (i % 2), facing: -1, speed: 24 })));
    const me = SC.add({ id: 'player', frames: P0.player, x: 400, y: at(220) + 1, facing: -1, speed: 24 });

    // the funeral, coming out of the gate
    const bearers = [0, 1, 2, 3].map((i) => SC.add({ frames: K.villager(720 + i), x: 32, y: at(40) + (i % 2), facing: 1, speed: 16, visible: false }));
    const bierE = SC.add({
      x: 32, y: at(40), z: 300, speed: 16, visible: false, risen: false,
      draw(ctx, sx, sy, t, e) { ctx.drawImage(e.risen ? RISEN : DEAD, sx - 17, sy - 32 + (e.lowered ? 14 : 0)); },
    });
    const DEAD = S.bier(false), RISEN = S.bier(true);
    const widow = SC.add({ id: 'widow', frames: S.person({ skin: '#a06a42', hair: '#1e1410', tunic: '#3a2e2a', veil: '#2a2220' }), x: 32, y: at(30), facing: 1, speed: 16, visible: false });
    const mourners = [0, 1, 2, 3, 4].map((i) => SC.add({ frames: K.villager(740 + i, i < 3), x: 32, y: at(30) + (i % 2), facing: 1, speed: 16, visible: false, pose: i >= 3 ? 'out' : 'stand' }));

    await SC.say({ kind: 'history', text: 'Nain sat on the slope of the Hill of Moreh. From its gate you could look across the Jezreel Valley to Mount Tabor. On the other side of this same hill lay Shunem, where Elisha once raised a widow’s son (2 Kings 4).' });
    SC.walk(jesus, 196);
    followers.forEach((f, i) => SC.walk(f, 210 + i * 10));
    SC.walk(me, 250);
    await SC.say({ kind: 'scripture', ref: 'Luke 7:11', text: P.vs('luke7', '11') });
    // the procession comes out
    const order = [[bearers[0], 108], [bearers[1], 116], [bierE, 120], [bearers[2], 126], [bearers[3], 134], [widow, 94], [mourners[0], 82], [mourners[1], 72], [mourners[2], 62], [mourners[3], 50], [mourners[4], 40]];
    order.forEach((o, i) => SC.wait(i * 260).then(() => { o[0].visible = true; return SC.walk(o[0], o[1], at(o[1]) + (o[0] === bierE ? 0 : 0)); }));
    let walking = true;
    (async () => {
      while (walking) { bearers.forEach((b) => { if (!b.moving) b.pose = 'stand'; }); await SC.wait(300); }
    })();
    await SC.say({ kind: 'scripture', ref: 'Luke 7:12', text: P.vs('luke7', '12') });
    await SC.wait(1500);
    await SC.say({ kind: 'history', text: 'Burial usually followed on the day of death. Even the poorest family hired flute players and a wailing woman (later recorded in Mishnah Ketubot 4:4). A widow who lost her only son had lost her support and her family’s future.' });
    const obs = [
      { id: 'widow', x0: 84, x1: 102, y0: 118, y1: 156, text: 'His mother walks behind the bier. She is a widow, and he was her only son.' },
      { id: 'bier', x0: 100, x1: 140, y0: 108, y1: 156, text: 'The young man lies wrapped in linen on an open bier.' },
      { id: 'mourners', x0: 32, x1: 84, y0: 118, y1: 156, text: 'Flute players and wailing women walk with half the town.' },
    ];
    obs.forEach((o) => IN.hotspots.push(Object.assign({}, o, { active: () => SC.mode === 'observe', onTap: () => game.observe('nain', o.id, o.text, true) })));
    await SC.prompt('Two crowds meet on the road. Tap what you see.', 'Keep watching', 'observe');
    IN.hotspots.length = 0;
    walking = false;

    await SC.walk(jesus, 102);
    jesus.facing = -1;
    await SC.say({ kind: 'scripture', ref: 'Luke 7:13', text: P.vs('luke7', '13') });
    jesus.facing = 1;
    await SC.walk(jesus, 114);
    jesus.pose = 'out';
    await SC.say({ kind: 'scripture', ref: 'Luke 7:14', text: P.vs('luke7', '14') });
    await SC.say({ kind: 'history', text: 'Under the Law of Moses, touching the dead, or what carried the dead, made a person unclean for seven days (Numbers 19:11–16).' });
    await SC.say({ kind: 'drama', text: 'You know the purity laws by heart. He has just put his hand on the bier.' });
    jesus.pose = 'stand';
    bierE.lowered = true;
    await SC.wait(500);
    bierE.risen = true;
    TW.Audio && TW.Audio.music('wonder');
    await SC.wait(900);
    await SC.say({ kind: 'scripture', ref: 'Luke 7:15', text: P.vs('luke7', '15') });
    const son = SC.add({ frames: S.person({ skin: '#9a6440', hair: '#2a1a12', tunic: '#e6dfcc' }), x: 122, y: at(122), facing: -1, speed: 18 });
    bierE.risen = false; bierE.empty = true;
    bierE.draw = function (ctx, sx, sy) { R(ctx, sx - 17, sy - 3, 34, 1, '#6a4a2c'); R(ctx, sx - 14, sy - 4, 28, 1, '#86603a'); };
    await SC.walk(son, 100);
    widow.pose = 'raise';
    TW.Audio && TW.Audio.sfx('cheer');
    [...mourners, ...followers, ...bearers].forEach((p, i) => { if (i % 2) p.hopping = true; if (i % 3 === 0) p.pose = 'raise'; });

    const heart = await SC.choose('Fear takes hold of everyone. The crowd is crying out. What do you say?', [
      '“A great prophet has arisen among us!”',
      '“God has visited his people!”',
      'Nothing. You have no words left.',
    ]);
    game.setHeart('nain', heart);
    await SC.say({ kind: 'scripture', ref: 'Luke 7:16–17', text: P.vs('luke7', '16', '17') });
    game.observe('nain', 'touched', 'He had compassion on the widow and touched the bier (Luke 7:13–14).', false, true);
    game.observe('nain', 'arose', 'The dead young man sat up and began to speak (Luke 7:15).', false, true);
    game.observe('nain', 'gave', 'He gave him back to his mother (Luke 7:15).', false, true);
    await SC.say({ kind: 'drama', text: 'You came north to write down what you saw. Tonight your report to Nicodemus will be the hardest one yet to write.' });
    game.addQuestion(TW.D.episodes.nain.question);
    SC.toast('A question is now open in your scroll');
    void me;
    K.finish(game, 'nain', 'Sit by the road outside the gate and write your report.');
  };

  K.nainArt = nainArt;
  TW.Episodes = TW.Episodes || {};
  TW.Episodes.nain = EP;
})(window.TW);
