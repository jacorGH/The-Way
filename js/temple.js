/* The Way — Episode VII: The Temple (Mark 11:15–18; 12:28–34) */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S;
  const EP = { id: 'temple' };

  function setCourt(P0) {
    SC.load(K.courtStage(false));
    const st = SC.stage;
    const tables = [], sellers = [];
    [[40, 1], [70, 2], [100, 3]].forEach((c) => {
      tables.push(SC.add(Object.assign(K.table(c[1]), { x: c[0], y: 140 })));
      sellers.push(SC.add({ frames: K.villager(860 + c[1]), pose: 'sit', x: c[0] + 4, y: 132, facing: 1, speed: 30 }));
    });
    const cage = SC.add(Object.assign(K.cages(), { x: 134, y: 142 }));
    const doveman = SC.add({ frames: K.villager(866), pose: 'sit', x: 148, y: 134, facing: -1, speed: 30 });
    const priests = [[232, 1], [250, -1], [266, -1]].map((c) => SC.add({ frames: S.person({ skin: '#a8724a', hair: '#2a1a12', beard: '#2a1a12', tunic: '#eee8da', belt: '#5a6aa0' }), x: c[0], y: 126, facing: c[1] }));
    return { st, tables, sellers, cage, doveman, priests };
  }

  EP.run = async function (game) {
    const P0 = K.sprites();
    const C = setCourt(P0);
    SC.cam = 0;
    const player = SC.add({ id: 'player', frames: P0.player, x: 196, y: 150, facing: -1 });
    SC.player = player;
    const pilgrims = [[60, 1], [86, -1], [118, 1], [176, -1], [210, 1]].map((c, i) => SC.add({ frames: K.villager(880 + i, i === 3), x: c[0], y: 151 + (i % 2), facing: c[1] }));
    const fisher = SC.add({ frames: K.villager(3), x: 226, y: 150, facing: -1 });
    const colleagues = [[290, 51], [302, 52]].map((c) => SC.add({ frames: P0.scribe(c[1]), x: c[0], y: 146, facing: -1 }));

    const GOAL = 'Walk through the outer court. The teacher from Galilee has not come yet.';
    let start;
    const started = new Promise((r) => { start = r; });
    const goal = () => K.freeGoal(GOAL, 'Wait by the tables', async () => {
      SC.busy = true; await SC.walk(player, 118); SC.busy = false; start();
    });
    const talk = (fn) => async () => { SC.mode = 'script'; await fn(); goal(); };
    C.sellers[1].onTap = talk(async () => {
      await SC.say({ kind: 'drama', speaker: 'A money changer', text: 'The Temple tax is paid in silver of Tyre and nothing else. Your Roman coins carry Caesar’s face. I can change them for you, for a small fee.' });
      game.observe('temple', 'changer', 'The money changers turn every pilgrim’s coins into Tyrian silver, for a fee.');
    });
    C.doveman.onTap = talk(async () => {
      await SC.say({ kind: 'drama', speaker: 'A dove seller', text: 'Two doves for a mother’s purification, if she cannot afford a lamb. The priests will reject any bird with a blemish, so buy here and be sure.' });
      game.observe('temple', 'doves', 'Poor families buy doves here for their offerings (Leviticus 12:8).');
    });
    fisher.onTap = talk(async () => {
      await SC.say({ kind: 'drama', speaker: 'The fisherman from Capernaum', text: 'Scribe! You came up for the feast too? Half of Capernaum is here. They say he will come back to the Temple today.' });
      game.observe('temple', 'galileans', 'The fisherman from Capernaum is here with half his village for Passover.');
    });
    C.st.hotspots.push({
      x0: 150, x1: 320, y0: 112, y1: 126, walkX: 200,
      onTap: async () => {
        SC.mode = 'script';
        await SC.say({ kind: 'history', text: 'Notices in Greek and Latin were set along this barrier. Two have been found. They warn that any foreigner who goes past it will have only himself to blame for the death that follows.' });
        game.observe('temple', 'soreg', 'A stone barrier marks where Gentiles may go no farther, on pain of death.');
        goal();
      },
    });

    await SC.say({ kind: 'history', text: 'The outer court of Herod’s Temple was open to everyone, Jews and Gentiles alike. At Passover it filled with pilgrims changing money and buying animals for sacrifice.' });
    goal();
    await started;
    SC.mode = 'script';

    // he comes in, and the tables go over
    const jesus = SC.add({ id: 'jesus', frames: P0.jesus, x: 330, y: 146, facing: -1, speed: 34 });
    const dis = [0, 1, 2].map((i) => SC.add({ frames: K.villager(207 + i), x: 346 + i * 12, y: 148 + (i % 2), facing: -1, speed: 26 }));
    dis.forEach((d, i) => SC.walk(d, 170 + i * 14));
    await SC.walk(jesus, 112);
    await SC.say({ kind: 'scripture', ref: 'Mark 11:15', text: P.vs('mark11b', '11:15') });
    jesus.pose = 'out';
    const upset = async (ent, x) => {
      await SC.walk(jesus, x);
      jesus.pose = 'out';
      ent.upset = true;
      if (TW.Audio) { TW.Audio.sfx(ent === C.cage ? 'flutter' : 'crash'); if (ent !== C.cage) TW.Audio.sfx('coins'); }
      SC.dust(ent.x, 128, 14, { up: true, spread: 16, color: '#d8b04a' });
    };
    await upset(C.tables[2], 112); C.sellers[2].pose = 'stand'; SC.walk(C.sellers[2], 20);
    await upset(C.tables[1], 82); C.sellers[1].pose = 'stand'; SC.walk(C.sellers[1], 12);
    await upset(C.tables[0], 52); C.sellers[0].pose = 'stand'; SC.walk(C.sellers[0], 4);
    jesus.facing = 1;
    await upset(C.cage, 124);
    for (let i = 0; i < 9; i++) C.st.birds.push({ x: 126 + (i % 3) * 6, y: 124 - (i % 2) * 4, vx: 20 + i * 6, vy: -30 - i * 4, p: i });
    C.doveman.pose = 'stand'; SC.walk(C.doveman, 200);
    pilgrims.forEach((p, i) => { p.facing = p.x < 112 ? 1 : -1; if (i % 2) SC.walk(p, p.x + (p.x < 112 ? -20 : 24)); });
    jesus.pose = 'stand';
    await SC.say({ kind: 'scripture', ref: 'Mark 11:16–17', text: P.vs('mark11b', '11:16', '11:17') });
    const heart = await SC.choose('Coins are still rolling across the paving. What do you think?', [
      'He has no right. This is the high priest’s court.',
      'He quoted Isaiah and Jeremiah. Were the prophets wrong?',
      'The court of the nations became a market, and I never noticed.',
    ]);
    game.setHeart('temple', heart);
    colleagues.forEach((c) => { c.facing = -1; });
    TW.Audio && TW.Audio.music('tension');
    await SC.say({ kind: 'scripture', ref: 'Mark 11:18', text: P.vs('mark11b', '11:18') });
    await SC.say({ kind: 'drama', text: 'In the shade of a portico, two of your teachers speak quietly with a priest of the high priest’s family. When they see you, they stop.' });
    game.observe('temple', 'tables', 'He overturned the tables of the money changers and the seats of the dove sellers (Mark 11:15).', false, true);
    game.observe('temple', 'prayer', 'He said the Temple should be a house of prayer for all the nations (Mark 11:17).', false, true);

    // ---- a few days later ----
    await K.fade(async () => {
      const C2 = setCourt(P0);
      C2.tables.forEach((t) => { t.upset = false; });
      SC.cam = 40;
    });
    SC.player = null;
    TW.Audio && TW.Audio.music('reflect');
    const j2 = SC.add({ id: 'jesus', frames: P0.jesus, x: 170, y: 146, facing: -1 });
    const circle = [[146, 1], [156, 1], [192, -1], [204, -1], [180, -1]].map((c, i) => SC.add({ frames: i < 2 ? P0.scribe(60 + i) : K.villager(890 + i), x: c[0], y: 148 + (i % 2), facing: c[1] }));
    const asker = SC.add({ frames: P0.scribe(70), x: 250, y: 147, facing: -1, speed: 22 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 226, y: 150, facing: -1 });
    void circle; void me;
    await SC.say({ kind: 'drama', text: 'A few days later the teacher is back in the courts, answering questions from priests, Pharisees and Sadducees one after another. A scribe you know by sight has been listening at your elbow.' });
    await SC.walk(asker, 186);
    asker.facing = -1;
    await SC.say({ kind: 'scripture', ref: 'Mark 12:28', text: P.vs('mark11b', '12:28') });
    j2.facing = 1;
    await SC.say({ kind: 'scripture', ref: 'Mark 12:29–31', text: P.vs('mark11b', '12:29', '12:31') });
    const shema = await SC.choose('“Hear, Israel.” You have said these words every morning and every evening of your life.', [
      'Say them with him, under your breath.',
      'Listen as if you had never heard them before.',
    ]);
    game.observe('temple', 'shema', shema === 0 ? 'When he spoke the Shema, I said it with him under my breath.' : 'When he spoke the Shema, I listened as if I had never heard it.', false, true);
    await SC.say({ kind: 'scripture', ref: 'Mark 12:32–33', text: P.vs('mark11b', '12:32', '12:33') });
    await SC.say({ kind: 'scripture', ref: 'Mark 12:34', text: P.vs('mark11b', '12:34') });
    await SC.say({ kind: 'drama', text: 'No one asks him anything after that. You find you have one question left, and you are afraid of the answer.' });
    game.observe('temple', 'notfar', 'He told the scribe, “You are not far from the Kingdom of God” (Mark 12:34).', false, true);
    game.addQuestion(TW.D.episodes.temple.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'temple', 'The evening sacrifice is over. Write down what you saw these days in the Temple.');
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.temple = EP;
})(window.TW);
