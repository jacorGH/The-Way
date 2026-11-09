/* Copyright © 2026. All rights reserved; see LICENSE.md. */
/* The Way — Episode IV: Across the Lake (Mark 4:35–5:20) */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S;
  const R = K.R;
  const EP = { id: 'legion' };

  const lerpC = (a, b, t) => { const A = U.hex(a), B = U.hex(b); return U.rgb([U.lerp(A[0], B[0], t), U.lerp(A[1], B[1], t), U.lerp(A[2], B[2], t)]); };
  const DUSK = ['#6f6a86', '#8d7f8e', '#b5918a', '#d1a582', '#dfb784', '#e6c592'];
  const NIGHT = ['#151b2e', '#1b2238', '#232b45', '#2e3550', '#3b3f5a', '#4a4862'];
  const STORM = ['#24282d', '#2b3035', '#32373c', '#393e42', '#3f4447', '#45494b'];

  // ---------- the storm ----------
  function stormStage(A) {
    const st = { width: 256, storm: 0, night: 0, flash: 0, bail: 0, audio: { music: 'night', amb: { shore: 0.6, wind: 0.3 } } };
    let ambT = 0;
    st.update = function (dt) {
      ambT += dt;
      if (ambT < 0.4 || !TW.Audio) return;
      ambT = 0;
      TW.Audio.amb({ storm: st.storm, shore: 0.6 * (1 - st.storm) + 0.15, wind: 0.3 + 0.4 * st.storm, night: st.night > 0.6 && st.storm < 0.2 ? 0.5 : 0 });
    };
    const wave = (x, layer, t) => {
      const amp = [1.2, 2, 3][layer] + st.storm * [3, 6, 9][layer];
      return amp * Math.sin(x * [0.09, 0.07, 0.05][layer] + t * [1.4, 1.9, 2.4][layer] * (1 + st.storm)) +
        amp * 0.45 * Math.sin(x * [0.23, 0.17, 0.13][layer] - t * 1.1);
    };
    st.wave = wave;
    const drawBoat = (ctx, bx, by, crew, hull) => {
      crew.forEach((c) => {
        const f = c.frames[c.pose || 'sit'];
        ctx.drawImage(c.facing < 0 ? f.l : f.r, bx + c.dx - 9, by + 11 - 26 + (c.lift || 0));
      });
      ctx.drawImage(hull, bx - 35, by);
    };
    st.bg = function (ctx, t) {
      for (let i = 0; i < 6; i++) {
        const base = lerpC(DUSK[i], NIGHT[i], st.night);
        R(ctx, 0, i * 12, 256, 12, mixRgb(base, STORM[i], st.storm));
      }
      R(ctx, 0, 72, 256, 8, mixRgb(lerpC(DUSK[5], NIGHT[5], st.night), STORM[5], st.storm));
      if (st.night > 0.5 && st.storm < 0.2) {
        for (let i = 0; i < 40; i++) {
          const sx = Math.floor(K.rnd(i, 11) * 256), sy = Math.floor(K.rnd(i, 12) * 60);
          if (U.hash(i, Math.floor(t * 2), 3) > 0.2) R(ctx, sx, sy, 1, 1, '#e8e2cc');
        }
        R(ctx, 196, 14, 5, 5, '#efe7cf'); R(ctx, 195, 15, 7, 3, '#efe7cf'); R(ctx, 197, 15, 2, 2, '#d9d0b8');
      }
      if (st.storm > 0.05) {
        for (let i = 0; i < 9; i++) {
          const cx = ((i * 47 + t * (8 + i) * (0.4 + st.storm)) % 320) - 40, cy = 6 + (i % 4) * 12;
          ctx.globalAlpha = st.storm * 0.85;
          R(ctx, Math.round(cx), cy, 46, 8, i % 2 ? '#1c1f23' : '#262a2e');
          R(ctx, Math.round(cx) + 6, cy - 3, 30, 4, '#22262a');
          ctx.globalAlpha = 1;
        }
      }
      ctx.drawImage(A.hills, -20, 2);
      ctx.globalAlpha = 0.55 + st.night * 0.3; R(ctx, 0, 56, 256, 26, mixRgb('#2a2630', '#141618', st.storm)); ctx.globalAlpha = 1;
      const water = mixRgb(lerpC('#4f7e88', '#1f3340', st.night), '#25373d', st.storm);
      R(ctx, 0, 80, 256, 80, water);
      for (let y = 82; y < 160; y += 3)
        for (let x = 0; x < 256; x += 4)
          if (U.hash(x >> 2, y, Math.floor(t * (3 + st.storm * 6))) > 0.9 - st.storm * 0.08)
            R(ctx, x, y, 3, 1, st.storm > 0.5 ? '#8fa6a6' : lerpC('#88aead', '#3e5a6a', st.night));
      const crest = (layer, yb, col) => {
        for (let x = 0; x < 256; x++) {
          const y = Math.round(yb + wave(x, layer, t));
          R(ctx, x, y, 1, 1, col);
          if (st.storm > 0.55 && U.hash(x >> 1, layer, Math.floor(t * 6)) > 0.75) R(ctx, x, y - 1, 1, 1, '#d8e2dc');
        }
      };
      crest(0, 96, mixRgb('#78a0a2', '#4b6468', st.storm));
      // far boat
      const fy = Math.round(98 + wave(222, 0, t));
      R(ctx, 214, fy, 16, 2, '#3a2a1c'); R(ctx, 221, fy - 9, 1, 9, '#2a1d12');
      crest(1, 120, mixRgb('#6f979b', '#40595e', st.storm));
      drawBoat(ctx, 78, Math.round(112 + wave(78, 1, t)), st.crew1, st.hull1);
      crest(2, 136, mixRgb('#6c9398', '#3a5257', st.storm));
      drawBoat(ctx, 180, Math.round(132 + wave(180, 2, t)), st.crew2, st.hull2);
      for (let x = 0; x < 256; x++) {
        const y = Math.round(152 + wave(x, 2, t + 1.3) * 0.8);
        R(ctx, x, y, 1, 160 - y, water);
        R(ctx, x, y, 1, 1, st.storm > 0.5 ? '#c9d6d0' : '#82a6a6');
      }
    };
    st.fx = function (fc, k, t) {
      const w = 256 * k, h = 160 * k;
      if (st.night > 0) { fc.fillStyle = 'rgba(10,14,30,' + 0.25 * st.night + ')'; fc.fillRect(0, 0, w, h); }
      if (st.storm > 0.1) {
        fc.strokeStyle = 'rgba(200,210,220,' + 0.35 * st.storm + ')';
        fc.lineWidth = Math.max(1, k * 0.4);
        fc.beginPath();
        for (let i = 0; i < 90 * st.storm; i++) {
          const x = ((i * 37 + t * 900) % (w + 200)) - 100, y = ((i * 53 + t * 1400) % (h + 100)) - 50;
          fc.moveTo(x, y); fc.lineTo(x - 6 * k, y + 14 * k);
        }
        fc.stroke();
        if (st.storm > 0.6 && Math.random() < 0.012) { st.flash = 1; TW.Audio && TW.Audio.sfx('thunder'); }
      }
      if (st.flash > 0) {
        fc.fillStyle = 'rgba(235,240,255,' + st.flash * 0.55 + ')'; fc.fillRect(0, 0, w, h);
        st.flash = Math.max(0, st.flash - 0.08);
      }
      if (st.night > 0.5 && st.storm < 0.2) {
        fc.globalCompositeOperation = 'lighter';
        const g = fc.createRadialGradient(198 * k, 16 * k, 0, 198 * k, 16 * k, 60 * k);
        g.addColorStop(0, 'rgba(220,220,200,0.25)'); g.addColorStop(1, 'rgba(220,220,200,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, w, h);
        fc.globalCompositeOperation = 'source-over';
      }
    };
    return st;
  }
  function mixRgb(a, b, t) {
    const pa = a.startsWith('#') ? U.hex(a) : a.match(/\d+/g).map(Number);
    const pb = b.startsWith('#') ? U.hex(b) : b.match(/\d+/g).map(Number);
    return U.rgb([U.lerp(pa[0], pb[0], t), U.lerp(pa[1], pb[1], t), U.lerp(pa[2], pb[2], t)]);
  }

  // ---------- the eastern shore ----------
  const hill = (x) => {
    if (x < 110) return 148;
    if (x < 168) return Math.round(U.lerp(148, 64, (x - 110) / 58) + Math.sin(x * 0.35) * 2 + Math.sin(x * 0.11) * 3);
    if (x < 214) return 64;
    if (x < 228) return Math.round(U.lerp(64, 124, (x - 214) / 14));
    return 124;
  };
  let SHORE = null;
  function shoreArt(A) {
    if (SHORE) return SHORE;
    const c = U.makeCanvas(256, 160), x = c.getContext('2d');
    x.drawImage(A.sky, 0, 0);
    x.drawImage(A.hills, -90, -4);
    R(x, 0, 70, 256, 90, '#5d8b92');
    R(x, 0, 70, 256, 3, '#82a8a6');
    // the long slope of the heights behind the shore
    for (let i = 70; i < 256; i++) {
      const top = Math.round(U.lerp(84, 30, U.smooth(70, 230, i)) + (U.fbm(i * 0.05, 3.3, 12, 3) - 0.5) * 10);
      for (let y = top; y < 130; y++) R(x, i, y, 1, 1, K.rnd(i, y * 3) > 0.85 ? '#6f6650' : y - top < 2 ? '#8c8566' : '#7a7058');
    }
    for (let i = 0; i < 40; i++) { const bx = 80 + Math.floor(K.rnd(i, 21) * 170), by = 50 + Math.floor(K.rnd(i, 22) * 60); R(x, bx, by, 3, 2, '#5f6a3c'); }
    for (let i = 0; i < 256; i++) {
      const top = hill(i);
      if (i >= 228) continue;
      for (let y = top; y < 160; y++) {
        const r = K.rnd(i * 3, y);
        let col = r > 0.85 ? '#7a6a4c' : r > 0.5 ? '#8a7a58' : '#837352';
        if (y - top < 3 && i >= 110) col = r > 0.5 ? '#7d8450' : '#6e7646';
        if (i < 110) col = r > 0.8 ? '#958264' : r > 0.4 ? '#a8916a' : '#9c875f';
        if (i >= 214) col = r > 0.6 ? '#9a8e78' : '#8a7e68';
        R(x, i, y, 1, 1, col);
      }
    }
    for (let i = 0; i < 40; i++) R(x, Math.floor(K.rnd(i, 3) * 44), 120 + Math.floor(K.rnd(i, 4) * 40), 3, 1, '#7aa3a4');
    [[128, 128], [146, 108], [160, 90], [198, 50]].forEach((t) => {
      R(x, t[0] - 1, t[1] - 1, 10, 11, '#a89a80');
      R(x, t[0], t[1], 8, 10, '#1a1512'); R(x, t[0] + 1, t[1] - 1, 6, 1, '#1a1512');
    });
    for (let i = 0; i < 30; i++) {
      const bx = 170 + Math.floor(K.rnd(i, 7) * 40);
      R(x, bx, 63, 2, 1, '#5f6a3c');
    }
    SHORE = c;
    return c;
  }

  EP.run = async function (game) {
    const P0 = K.sprites(), A = K.art();
    const st = stormStage(A);
    const sitF = (n) => K.villager(n);
    const sleeper = S.lying({ skin: '#a26c44', hair: '#24160e', beard: '#24160e', tunic: '#d6c8a6' });
    st.hull1 = S.boat('#5a3e26'); st.hull2 = S.boat('#4e3a28');
    const jesusCrew = { frames: { sit: { r: sleeper, l: sleeper } }, dx: -24, facing: 1, lift: 6 };
    st.crew1 = [jesusCrew, { frames: sitF(207), dx: -6, facing: -1 }, { frames: sitF(208), dx: 6, facing: -1 }, { frames: sitF(209), dx: 18, facing: -1 }, { frames: sitF(210), dx: 28, facing: -1 }];
    st.crew2 = [{ frames: sitF(3), dx: -26, facing: 1 }, { frames: sitF(612), dx: -10, facing: 1 }, { frames: P0.player, dx: 6, facing: -1 }, { frames: sitF(613), dx: 22, facing: -1 }];
    SC.load(st);
    SC.cam = 0;

    await SC.say({ kind: 'scripture', ref: 'Mark 4:35–36', text: P.vs('mark4', '4:35', '4:36') });
    await SC.say({ kind: 'drama', speaker: 'The fisherman from the beach', text: 'There is room in my boat, scribe, if you want to see where he goes.' });
    await SC.say({ kind: 'history', text: 'The lake lies about 210 m below sea level, ringed by hills. Cool air can pour down the slopes in the evening and raise steep waves very quickly.' });
    TW.Audio && TW.Audio.music('storm');
    await SC.tween(3500, (p) => { st.storm = p * 0.6; st.night = p * 0.7; });
    await SC.say({ kind: 'scripture', ref: 'Mark 4:37', text: P.vs('mark4', '4:37') });
    await SC.tween(1500, (p) => { st.storm = 0.6 + p * 0.4; st.night = 0.7 + p * 0.3; });
    for (let i = 0; i < 5; i++) {
      await SC.prompt(i === 0 ? 'Water is pouring over the side. Bail, or the boat will sink.' : ['The water is still rising.', 'Again. The fisherman shouts something you cannot hear.', 'Your hands are numb.', 'One more.'][i - 1], 'Bail', 'script');
      SC.dust(186, 128, 10, { up: true, spread: 30, color: '#b8d0cc' });
      TW.Audio && TW.Audio.sfx('splash');
    }
    await SC.say({ kind: 'scripture', ref: 'Mark 4:38', text: P.vs('mark4', '4:38') });
    st.crew1[0] = { frames: P0.jesus, dx: -24, facing: 1, pose: 'stand', lift: 6 };
    await SC.wait(500);
    st.crew1[0].pose = 'out';
    await SC.say({ kind: 'scripture', ref: 'Mark 4:39', text: P.vs('mark4', '4:39') });
    await SC.tween(900, (p) => { st.storm = 1 - U.smooth(0, 1, p); });
    TW.Audio && TW.Audio.music('wonder');
    st.crew1[0].pose = 'stand';
    await SC.wait(1200);
    await SC.say({ kind: 'drama', text: 'The water is so still you can see the stars in it. No one in your boat says anything.' });
    await SC.say({ kind: 'scripture', ref: 'Mark 4:40–41', text: P.vs('mark4', '4:40', '4:41') });
    const heart = await SC.choose('“Who then is this?” What answer comes to you?', [
      'The Scriptures say God alone stills the sea (Psalm 107:29).',
      'A prophet, like Elijah, with power from God.',
      'I am too afraid to think at all.',
    ]);
    game.setHeart('legion', heart);
    game.observe('legion', 'storm', 'A storm filled the boats with water while he slept (Mark 4:37–38).', false, true);
    game.observe('legion', 'calm', 'He rebuked the wind and said to the sea, “Peace! Be still!” and it was calm (Mark 4:39).', false, true);
    game.addQuestion(TW.D.episodes.legion.question);
    SC.toast('A question is now open in your scroll');
    await SC.wait(600);

    // ---- the other side ----
    await K.fade(async () => {
      SC.load({
        width: 256,
        audio: { music: 'tension', amb: { shore: 0.6, wind: 0.4, birds: 0.3 } },
        bg(ctx, t) {
          ctx.drawImage(shoreArt(A), 0, 0);
          const fr = Math.floor(t * 2);
          for (let x = 0; x < 256; x += 2) {
            if (x > 44 && x < 228) continue;
            if (U.hash(x, 9, fr) > 0.7) R(ctx, x, x < 44 ? 118 + (x % 7) * 5 : 128 + (x % 5) * 6, 2, 1, '#9fc0c0');
          }
        },
        fx(fc, k) {
          fc.globalCompositeOperation = 'lighter';
          const g = fc.createRadialGradient(220 * k, 10 * k, 0, 220 * k, 10 * k, 160 * k);
          g.addColorStop(0, 'rgba(255,236,190,0.32)'); g.addColorStop(1, 'rgba(255,220,160,0)');
          fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
          fc.globalCompositeOperation = 'source-over';
        },
      });
      SC.cam = 0;
    });
    SC.add({ x: 22, y: 146, z: 100, draw(ctx, sx, sy) { ctx.drawImage(st.hull1, sx - 35, sy - 16); } });
    const j2 = SC.add({ id: 'jesus', frames: P0.jesus, x: 92, y: 149, facing: 1, speed: 26 });
    const disc = [[60, 207], [74, 208], [50, 209], [104, 210]].map((c) => SC.add({ frames: sitF(c[1]), x: c[0], y: 150, facing: 1 }));
    const me = SC.add({ id: 'player', frames: P0.player, x: 36, y: 152, facing: 1, speed: 24 });
    const pigF = S.pig();
    const pigs = [];
    for (let i = 0; i < 16; i++) {
      const p = SC.add({
        x: 172 + (i * 37) % 40, y: 64 + (i % 3 === 0 ? 0 : 0), z: 60 + i * 0.01, speed: 70, frame: i % 2, phase: i,
        draw(ctx, sx, sy, t, e) {
          const set = e.facing < 0 ? pigF.l : pigF.r;
          const fr = e.moving ? Math.floor(t * 10 + e.phase) % 2 : Math.floor(t * 0.7 + e.phase) % 2;
          ctx.drawImage(set[fr], sx - 7, sy - 8);
        },
      });
      p.facing = i % 2 ? 1 : -1;
      pigs.push(p);
    }
    const herders = [186, 204].map((x, i) => SC.add({ frames: sitF(640 + i), x: x, y: 64, facing: -1, speed: 40 }));
    const wild = SC.add({ id: 'wild', frames: S.wildman(), x: 150, y: hill(150), facing: -1, speed: 46, visible: false });

    await SC.say({ kind: 'scripture', ref: 'Mark 5:1–2', text: P.vs('mark4', '5:1', '5:2') });
    await SC.say({ kind: 'history', text: 'This is largely Gentile country. The Law of Moses counted tombs, pigs and unclean spirits as defiling. A devout Jew would avoid all three, and here are all three at once.' });
    wild.visible = true;
    await SC.say({ kind: 'scripture', ref: 'Mark 5:3–4', text: P.vs('mark4', '5:3', '5:4') });
    me.facing = 1;
    await SC.walkPath(wild, [[130, hill(130)], [112, 148], [104, 149]]);
    wild.facing = -1;
    await SC.say({ kind: 'scripture', ref: 'Mark 5:6–7', text: P.vs('mark4', '5:6', '5:7') });
    wild.pose = 'sit';
    await SC.say({ kind: 'scripture', ref: 'Mark 5:8–10', text: P.vs('mark4', '5:8', '5:10') });
    await SC.say({ kind: 'scripture', ref: 'Mark 5:11–12', text: P.vs('mark4', '5:11', '5:12') });
    await SC.say({ kind: 'scripture', ref: 'Mark 5:13', text: P.vs('mark4', '5:13') });
    pigs.forEach((p, i) => {
      SC.wait(i * 110).then(async () => {
        await SC.walkPath(p, [[214, 64], [227, 122], [236, 128]]);
        SC.dust(236, 126, 8, { up: true, spread: 8, color: '#d8e6e2' });
        if (i % 3 === 0) TW.Audio && TW.Audio.sfx('splash');
        p.visible = false;
      });
    });
    await SC.wait(2600);
    herders.forEach((h) => { h.facing = -1; SC.walk(h, 168).then(() => SC.walk(h, 166, 58)).then(() => { h.visible = false; }); });
    const felt = await SC.choose('The herders run for the town. What do you feel?', [
      'Fear. What kind of power is this?',
      'Pity for the man, whatever it cost.',
      'Disgust. Pigs, tombs and Gentiles. I should not be here.',
    ]);
    game.observe('legion', 'felt', ['I was afraid of the power I saw on that shore.', 'I pitied the man more than I counted the cost.', 'I was disgusted by that unclean country.'][felt], false, true);
    await SC.say({ kind: 'scripture', ref: 'Mark 5:14', text: P.vs('mark4', '5:14') });
    wild.frames = K.villager(660);
    wild.pose = 'sit';
    const town = [0, 1, 2, 3, 4].map((i) => SC.add({ frames: sitF(670 + i), x: 168 + i * 4, y: 64, facing: -1, speed: 30 }));
    await Promise.all(town.map((t, i) => SC.wait(i * 250).then(() => SC.walkPath(t, [[150, hill(150)], [126 + i * 8, hill(126 + i * 8)]]))));
    TW.Audio && TW.Audio.music('wonder');
    await SC.say({ kind: 'scripture', ref: 'Mark 5:15–17', text: P.vs('mark4', '5:15', '5:17') });
    j2.facing = -1;
    await SC.walk(j2, 50);
    disc.forEach((d) => SC.walk(d, 30 + Math.random() * 20));
    wild.pose = 'stand';
    await SC.walk(wild, 64);
    await SC.say({ kind: 'scripture', ref: 'Mark 5:18–19', text: P.vs('mark4', '5:18', '5:19') });
    wild.facing = 1;
    SC.walkPath(wild, [[110, 148], [150, hill(150)], [168, 64], [200, 64]]);
    await SC.say({ kind: 'scripture', ref: 'Mark 5:20', text: P.vs('mark4', '5:20') });
    await SC.say({ kind: 'history', text: 'The Decapolis was a league of Greek-speaking cities, mostly east of the Jordan. The first person to tell about Jesus there was a man the whole region had been afraid of.' });
    game.observe('legion', 'legion', 'A man with an unclean spirit, called Legion, was set free and sat clothed and in his right mind (Mark 5:15).', false, true);
    game.observe('legion', 'sent', 'He sent the man home to tell what the Lord had done for him (Mark 5:19).', false, true);
    K.finish(game, 'legion', 'The boats are pushing off. Sit in the stern and write down what you saw.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.legion = EP;
})(window.TW);
