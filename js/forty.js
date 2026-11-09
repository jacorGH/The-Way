/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XII: Forty Days (John 20:19–29; Acts 1:1–14).
   The scribe is welcomed into the upper room and hears what the disciples saw: the locked room, Thomas, the Ascension. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'forty' };
  const VG = TW.Vignettes;
  const sayS = (key, a, b) => SC.say({ kind: 'scripture', ref: P.ref(key, a, b), text: P.vs(key, a, b) });
  const ELEVEN = ['peter', 'john', 'thomas', null, null, null, null, null, null, null, null];
  const who = (n, i) => (n ? K.who(n) : K.villager(207 + i));

  // the locked room on the first evening, and eight days later
  function lockedRoom() {
    const st = K.interiorStage();
    K.nightWrap(st, { dark: 0.28, lights: [{ x: 90, y: 95, r: 50 }, { x: 168, y: 95, r: 50 }] });
    st.audio = { amb: { room: 0.5, night: 0.4 } };
    SC.load(st); SC.cam = 0;
    const ds = ELEVEN.map((n, i) => SC.add({ frames: who(n, i), x: 40 + i * 18 + (i > 4 ? 30 : 0), y: 147, pose: 'sit', facing: i > 4 ? -1 : 1 }));
    const j = SC.add({ frames: K.sprites().jesus, x: 136, y: 146, visible: false });
    st.lights.push({ ent: j, r: 60, dy: 16, c: 'rgba(255,245,215,0.5)' });
    return { st, ds, j };
  }
  VG.locked = function () {
    const r = lockedRoom();
    return {
      appear: async () => { AU() && AU().sfx('chime'); r.j.visible = true; r.ds.forEach((d) => { d.facing = d.x < 136 ? 1 : -1; }); await SC.wait(700); },
      hands: async () => { r.j.pose = 'out'; await SC.wait(1000); r.j.pose = 'stand'; r.ds.forEach((d, i) => { if (i % 2) d.hopping = true; }); await SC.wait(600); r.ds.forEach((d) => { d.hopping = false; }); },
      breathe: async () => { r.j.pose = 'raise'; await SC.wait(1100); r.j.pose = 'stand'; },
    };
  };
  VG.thomas = function () {
    const r = lockedRoom();
    const th = r.ds[2];
    return {
      doubt: async () => { th.pose = 'stand'; th.y = 146; th.pose = 'out'; await SC.wait(900); th.pose = 'sit'; th.y = 147; },
      appear: async () => { AU() && AU().sfx('chime'); r.j.visible = true; r.ds.forEach((d) => { d.facing = d.x < 136 ? 1 : -1; }); await SC.wait(600); },
      reach: async () => { r.j.pose = 'out'; th.pose = 'stand'; th.y = 146; th.speed = 16; await SC.walk(th, 120); th.facing = 1; await SC.wait(500); },
      kneel: async () => { th.pose = 'sit'; AU() && AU().music('wonder'); await SC.wait(900); r.j.pose = 'stand'; },
    };
  };
  VG.ascend = function () {
    const A = K.art();
    const st = { width: 400, audio: { amb: { wind: 0.45, birds: 0.5 } }, rise: 0, cloud: 0,
      bg(ctx, t, cam) { ctx.drawImage(A.sky, 0, 0); ctx.drawImage(K.cityView(), -Math.round(cam * 0.35), 0); ctx.drawImage(K.valley(), -Math.round(cam * 0.6), 0); ctx.drawImage(K.slope(), -cam, 0); },
      fx(fc, k, t, cam) {
        if (st.cloud <= 0) return;
        fc.globalCompositeOperation = 'lighter';
        const cx = (st.cx - cam) * k, cy = st.cy * k;
        const g = fc.createRadialGradient(cx, cy, 0, cx, cy, 46 * k);
        g.addColorStop(0, 'rgba(255,252,240,' + 0.8 * st.cloud + ')'); g.addColorStop(1, 'rgba(255,252,240,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        fc.globalCompositeOperation = 'source-over';
        fc.fillStyle = 'rgba(250,248,240,' + 0.85 * st.cloud + ')';
        for (let i = 0; i < 7; i++) { fc.beginPath(); fc.ellipse(cx + (i - 3) * 9 * k, cy + Math.sin(i * 2) * 4 * k, 14 * k, 8 * k, 0, 0, Math.PI * 2); fc.fill(); }
      } };
    SC.load(st); SC.cam = 100; SC.camGoal = 100;
    const ds = ELEVEN.map((n, i) => SC.add({ frames: who(n, i), x: 150 + i * 9 - (i % 2) * 3, y: 145 + (i % 3), facing: i < 5 ? 1 : -1 }));
    const j = SC.add({ frames: K.sprites().jesus, x: 200, y: 144, facing: -1 });
    const men = [SC.add({ frames: K.who('young'), x: 168, y: 146, visible: false, facing: 1 }), SC.add({ frames: K.who('young'), x: 238, y: 146, visible: false, facing: -1 })];
    return {
      up: async () => {
        ds.forEach((d) => { d.facing = d.x < 200 ? 1 : -1; });
        st.cx = 200; st.cy = 120;
        await SC.tween(4200, (p) => { j.y = 144 - p * 110; st.cy = j.y - 12; st.cloud = Math.min(1, p * 2); });
        j.visible = false;
        await SC.tween(1500, (p) => { st.cloud = 1 - p; });
        ds.forEach((d) => { d.pose = 'raise'; });
      },
      men: async () => { ds.forEach((d) => { d.pose = 'stand'; }); men.forEach((m) => { m.visible = true; }); AU() && AU().sfx('chime'); await SC.wait(600); },
    };
  };

  EP.run = async function (game) {
    const P0 = K.sprites();
    const st = K.interiorStage();
    st.audio = { music: 'reflect', amb: { room: 0.5, crowd: 0.15 } };
    SC.load(st); SC.cam = 0;
    const ds = ELEVEN.map((n, i) => SC.add({ frames: who(n, i), x: 60 + i * 15 + (i > 4 ? 26 : 0), y: 147, pose: 'sit', facing: i > 4 ? -1 : 1 }));
    const women = [SC.add({ frames: K.who('marymother'), x: 228, y: 146, facing: -1 }), SC.add({ frames: K.who('salome'), x: 242, y: 147, facing: -1 })];
    const mag = SC.add({ frames: K.who('magdalene'), x: 30, y: 145, facing: 1, speed: 20 });
    const me = SC.add({ id: 'player', frames: P0.player, x: -10, y: 147, facing: 1, speed: 20 });
    void women;
    await SC.say({ kind: 'drama', text: 'Some days after the empty tomb, Mary of Magdala leads you up the outside stairs of a house in the Upper City. The door is barred. She knocks twice, and it opens.' });
    await SC.walk(me, 44);
    await SC.say({ kind: 'drama', speaker: 'Mary of Magdala', text: 'This is the scribe who helped Nicodemus bury him. He has been writing down everything. Tell him what you told me.' });
    void mag;

    const asks = [
      { id: 'evening', q: 'What happened on the evening of that first day?', who: 'John', scene: 'locked',
        say: [['s', 'john20b', '20:19', '20:19'], ['c', 'appear'], ['s', 'john20b', '20:20', '20:20'], ['c', 'hands'], ['s', 'john20b', '20:21', '20:21'], ['c', 'breathe'], ['s', 'john20b', '20:22', '20:23']],
        note: 'The risen Jesus came through locked doors and said, “Peace be to you,” and showed them his hands and side (John 20:19–20).' },
      { id: 'thomas', q: 'Thomas, they say you would not believe them.', who: 'Thomas', scene: 'thomas',
        say: [['s', 'john20b', '20:24', '20:24'], ['c', 'doubt'], ['s', 'john20b', '20:25', '20:25'], ['c', 'appear'], ['s', 'john20b', '20:26', '20:26'], ['c', 'reach'], ['s', 'john20b', '20:27', '20:27'], ['c', 'kneel'], ['s', 'john20b', '20:28', '20:29']],
        note: 'Thomas, who would not believe without seeing, said, “My Lord and my God!” (John 20:28).' },
      { id: 'olivet', q: 'Where is he now?', who: 'Peter', scene: 'ascend',
        say: [['s', 'acts1', '1:3', '1:5'], ['s', 'acts1', '1:6', '1:8'], ['c', 'up'], ['s', 'acts1', '1:9', '1:9'], ['c', 'men'], ['s', 'acts1', '1:10', '1:11']],
        note: 'On the Mount of Olives he was taken up, and a cloud received him out of their sight (Acts 1:9).' },
    ];
    const done = {};
    for (;;) {
      const open = asks.filter((a) => !done[a.id]);
      if (!open.length) break;
      const pick = await SC.choose(open.length === asks.length ? 'Eleven men and several women are looking at you. What do you ask?' : 'What else do you ask?', open.map((a) => a.q), 'Your question');
      const a = open[pick];
      done[a.id] = true;
      if (a.id === 'thomas') await SC.say({ kind: 'drama', speaker: 'Thomas', text: 'They told me, and I said they were fools. You of all people will understand that.' });
      const mem = await VG.enter(a.scene, a.who);
      for (const b of a.say) { if (b[0] === 'c') await mem[b[1]](); else await sayS(b[1], b[2], b[3]); }
      await VG.exit();
      game.observe('forty', a.id, a.note, false, true);
      if (a.id === 'thomas') {
        const heart = await SC.choose('“Blessed are those who have not seen, and have believed.” What rises in you?', [
          'He meant me.',
          'I still want to see him for myself.',
          'No words. Only tears.',
        ]);
        game.setHeart('forty', heart);
        await K.answerAll(game, 'forty');
      }
    }
    ds.forEach((d) => { d.pose = 'sit'; });
    await sayS('acts1', '1:12', '1:14');
    await sayS('acts1', '1:15', '1:15');
    await SC.say({ kind: 'drama', text: 'Someone counts the names aloud: about a hundred and twenty. No one asks you to leave. You sit down by the door and pray with them.' });
    me.pose = 'sit';
    await SC.say({ kind: 'drama', text: '“You will be witnesses to me.” You look at the scroll in your lap, a year of reports, and wonder if he meant you too.' });
    game.addQuestion(TW.D.episodes.forty.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'forty', 'Write down what the witnesses told you.');
    void R;
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.forty = EP;
})(window.TW);
