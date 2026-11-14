/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — The Birth of Jesus: five episodes told as Mary's memories, years later in Jerusalem (Luke 1–2; Matthew 1–2).
   Angels and the glory of the Lord are shown only as light. Carols: see the advent, manger, gloria, child and kings
   moods in js/audio.js. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio, VG = () => TW.Vignettes;
  const MARY = 'Mary, the mother of Jesus';
  const read = (key) => (a, b) => SC.say({ kind: 'scripture', ref: P.ref(key, a, b), text: P.vs(key, a, b) });
  const L1 = read('luke1'), L2 = read('luke2'), M1 = read('matt1'), M2 = read('matt2');
  const mary = (text) => SC.say({ kind: 'drama', speaker: MARY, text });
  const drama = (text) => SC.say({ kind: 'drama', text });
  const hist = (text) => SC.say({ kind: 'history', text });
  const music = (m) => AU() && AU().music(m);
  async function memory(id, run) {
    const mem = await VG().enter(id, MARY);
    try { await run(mem); } finally { await VG().exit(); }
  }

  // the frame: an upper room in Jerusalem, years after Pentecost, by lamplight
  function room() {
    const h = K.interiorStage();
    K.nightWrap(h, { dark: 0.32, lights: [{ x: 128, y: 104, r: 64 }] });
    h.audio = { music: 'advent', amb: { room: 0.5, night: 0.25 } };
    SC.load(h); SC.cam = 0;
    const P0 = K.sprites();
    const m = SC.add({ frames: K.who('marymother'), x: 138, y: 147, pose: 'sit', facing: -1 });
    SC.add({ id: 'player', frames: P0.player, x: 112, y: 148, pose: 'sit', facing: 1 });
    [[40, 1], [58, 1], [200, -1], [218, -1]].forEach((c, i) => SC.add({ frames: K.villager(4100 + i, i % 2 === 0), x: c[0], y: 147, pose: 'sit', facing: c[1] }));
    return m;
  }
  const choose = (ep, prompt, options) => SC.choose(prompt, options).then((i) => { TW.game.setHeart(ep, i); return i; });
  const done = (game, ep, text) => { game.addQuestion(TW.D.episodes[ep].question); SC.toast('A question is now open in your scroll'); K.finish(game, ep, text); };

  // ---------- ✦ I. The Angel's Word ----------
  const annunciation = { id: 'annunciation' };
  annunciation.run = async function (game) {
    const m = room();
    await drama('Jerusalem, some years after Pentecost. In the upper room where the believers meet, an old woman is mending a cloak by the lamp. Mary, the mother of Jesus. You have written down everything you saw; but there is a part of the story you could never have seen.');
    await hist('Luke says that he “traced the course of all things accurately from the first,” from those who “from the beginning were eyewitnesses” (Luke 1:2–3), and twice that Mary kept these things in her heart (2:19, 51).');
    await L1('1:1', '1:4');
    m.pose = 'out';
    await mary('You want to know how it began. Everyone does. I was younger than you are now, and I was not expecting anything at all.');
    m.pose = 'sit';
    await memory('bth_angel', async (v) => {
      await v.come();
      await L1('1:26', '1:29');
      await v.afraid();
      await L1('1:30', '1:33');
      await L1('1:34', '1:37');
      await v.yes();
      await L1('1:38', '1:38');
      await v.go();
      await mary('I did not understand how. I said yes anyway. You can say yes to God before you understand him.');
    });
    game.observe('annunciation', 'gabriel', 'The angel Gabriel told Mary she would bear a son, Jesus, the Son of the Most High; she answered, “Let it be done to me according to your word” (Luke 1:31–38).', false, true);
    const h1 = await choose('annunciation', 'Mary said yes before she understood. What do you say to her?', TW.D.episodes.annunciation.hearts);
    await mary([
      'Courage came later. First there was only the word, and a yes. Then I went to see Elizabeth, as fast as I could walk.',
      'I was afraid. He said, “Do not be afraid,” and I still was. You can be afraid and say yes. Then I went to see Elizabeth, as fast as I could walk.',
      'Your hand is cold. Mine was too, that night. In the morning I went to see Elizabeth, as fast as I could walk.',
    ][h1]);
    await memory('bth_visit', async (v) => {
      await v.arrive();
      await L1('1:39', '1:40');
      await v.greet();
      await L1('1:41', '1:45');
      await v.song();
      await L1('1:46', '1:50');
      await L1('1:51', '1:56');
    });
    game.observe('annunciation', 'magnificat', 'Elizabeth called Mary “the mother of my Lord,” and Mary sang, “My soul magnifies the Lord” (Luke 1:43, 46).', false, true);
    await mary('And then I came home, and had to tell Joseph. You can imagine what he thought. Matthew tells it as Joseph told it.');
    await memory('bth_dream', async (v) => {
      await M1('1:18', '1:19');
      await v.dream();
      await M1('1:20', '1:21');
      await M1('1:22', '1:23');
      await v.wake();
      await M1('1:24', '1:25');
    });
    game.observe('annunciation', 'joseph', 'In a dream an angel told Joseph to take Mary as his wife and to name the child Jesus, “for it is he who shall save his people from their sins” (Matthew 1:20–21).', false, true);
    await hist('Luke tells the story from Mary’s side, Matthew from Joseph’s. Neither repeats the other’s half, and they agree on what matters: a virgin named Mary, a man of David’s line named Joseph, and a name given by an angel.');
    done(game, 'annunciation', 'Write down what she told you. You were not there, but she was.');
  };

  // ---------- ✦ II. No Room ----------
  const nativity = { id: 'nativity' };
  nativity.run = async function (game) {
    const m = room();
    await drama('Another evening. Mary has saved you the place by the lamp.');
    m.pose = 'out';
    await mary('Then the emperor wanted everyone counted. Joseph was of David’s house, so we had to go to David’s town. I was very near my time.');
    m.pose = 'sit';
    await memory('bth_road', async (v) => {
      await L2('2:1', '2:3');
      await v.walk();
      await L2('2:4', '2:5');
    });
    await memory('bth_manger', async (v) => {
      music('manger');
      await L2('2:6', '2:6');
      await v.birth();
      await L2('2:7', '2:7');
      await mary('There was no room, so I laid him where the animals ate. The Lord of everything, in a feeding trough. I counted his fingers.');
    });
    game.observe('nativity', 'birth', 'Mary gave birth to her firstborn son in Bethlehem and laid him in a feeding trough, because there was no room for them in the inn (Luke 2:7).', false, true);
    await mary('That night, out in the fields, there were shepherds. They told us everything. I made them tell it twice.');
    await memory('bth_field', async (v) => {
      music('night');
      await v.watch();
      await L2('2:8', '2:8');
      await v.glory();
      await L2('2:9', '2:12');
      music('gloria');
      await v.host();
      await L2('2:13', '2:14');
      await v.gone();
      await L2('2:15', '2:15');
      await v.go();
    });
    game.observe('nativity', 'angels', 'An angel told the shepherds, “There is born to you today, in David’s city, a Savior, who is Christ the Lord,” and the heavenly army sang, “Glory to God in the highest” (Luke 2:11, 14).', false, true);
    await memory('bth_manger', async (v) => {
      music('manger');
      await v.birth();
      await v.shepherds();
      await L2('2:16', '2:18');
      await v.ponder();
      await L2('2:19', '2:20');
    });
    game.observe('nativity', 'shepherds', 'The shepherds found Mary and Joseph and the baby lying in the feeding trough, and told what they had heard; Mary kept these sayings, pondering them in her heart (Luke 2:16–19).', false, true);
    const h2 = await choose('nativity', 'God’s sign was a baby lying in a feeding trough. What rises in you?', TW.D.episodes.nativity.hearts);
    await mary([
      'Wonder is the right word. I have pondered it for thirty years and more. I am still pondering it.',
      'So were the shepherds, and they were the first to be told. I have pondered that for thirty years and more.',
      'Joy. The angels sang it, and the shepherds went back praising God. I am still pondering it.',
    ][h2]);
    await K.answerAll(game, 'nativity');
    done(game, 'nativity', 'Write it down: the night, the trough, the shepherds running.');
  };

  // ---------- ✦ III. Simeon and Anna ----------
  const presentation = { id: 'presentation' };
  presentation.run = async function (game) {
    const m = room();
    await drama('Mary is quiet tonight. When she speaks, she looks at the lamp, not at you.');
    m.pose = 'out';
    await mary('Forty days later we brought him up to the Temple, as the Law says. We could not afford a lamb. We brought two pigeons.');
    m.pose = 'sit';
    await memory('bth_temple', async (v) => {
      music('child');
      await L2('2:21', '2:24');
      await v.come();
      await L2('2:25', '2:27');
      await v.take();
      await L2('2:28', '2:32');
      await v.bless();
      await L2('2:33', '2:35');
      await mary('A sword. I did not know what he meant, not for thirty years. Then I stood by the cross, and I knew.');
      await v.anna();
      await L2('2:36', '2:38');
    });
    game.observe('presentation', 'named', 'On the eighth day the child was named Jesus, the name the angel had given; after forty days his parents presented him in the Temple and offered two young pigeons (Luke 2:21–24).', false, true);
    game.observe('presentation', 'simeon', 'Simeon took Jesus in his arms and said, “My eyes have seen your salvation… a light for revelation to the nations” (Luke 2:30–32).', false, true);
    game.observe('presentation', 'anna', 'Anna, a prophetess of great age, gave thanks to God and spoke of him to all who were looking for redemption in Jerusalem (Luke 2:38).', false, true);
    await choose('presentation', 'Simeon could die in peace now. Which of his words do you keep?', TW.D.episodes.presentation.hearts);
    await mary('He held my son for a moment and was ready to die. I held him for thirty-three years, and I was never ready.');
    await K.answerAll(game, 'presentation');
    done(game, 'presentation', 'Write down what Simeon said, and Anna. Both of them waited a long time.');
  };

  // ---------- ✦ IV. The Star and the Flight ----------
  const magi = { id: 'magi' };
  magi.run = async function (game) {
    const m = room();
    await drama('The last evening of her story. Mary has a small box in her lap, very old, and keeps her hands on it while she talks.');
    m.pose = 'out';
    await mary('We were still in Bethlehem, in a house by then, when visitors came that no one expected. From the east. Following a star.');
    m.pose = 'sit';
    await hist('Herod the Great ruled Judea from 37 to 4 BC, an able builder and a suspicious, cruel king. The historian Josephus says he executed three of his own sons.');
    await memory('bth_magi', async (v) => {
      music('kings');
      await M2('2:1', '2:2');
      await M2('2:3', '2:6');
      await M2('2:7', '2:8');
      await v.arrive();
      await M2('2:9', '2:10');
      await v.kneel();
      await M2('2:11', '2:11');
      await v.gifts();
      await mary('Gold. Incense. And myrrh, the spice for the dead. I did not understand that gift either. Nicodemus brought myrrh to his burial.');
      await M2('2:12', '2:12');
      await v.go();
    });
    game.observe('magi', 'magi', 'Wise men from the east followed a star, found the child with Mary his mother, worshiped him, and gave him gold, frankincense and myrrh (Matthew 2:11).', false, true);
    await memory('bth_flight', async (v) => {
      music('night');
      await M2('2:13', '2:13');
      await v.flee();
      await M2('2:14', '2:15');
    });
    game.observe('magi', 'egypt', 'Warned in a dream, Joseph took the child and his mother by night and fled into Egypt (Matthew 2:13–14).', false, true);
    music('lament');
    await M2('2:16', '2:18');
    await mary('We were safe. Others were not. I have never stopped grieving for the mothers of Bethlehem.');
    music('advent');
    await M2('2:19', '2:23');
    await L2('2:39', '2:40');
    game.observe('magi', 'nazareth', 'When Herod was dead, Joseph brought the child and his mother back and settled in Nazareth in Galilee (Matthew 2:19–23; Luke 2:39).', false, true);
    const h4 = await choose('magi', 'The wise men opened their treasures. What would you bring him?', TW.D.episodes.magi.hearts);
    await mary([
      'Then bring him that. The wise men brought what they had. You have a scroll.',
      'That is what he asked of his friends. Most of them gave it.',
      'Yourself. That is all he ever asked of anyone.',
    ][h4]);
    m.pose = 'out';
    await mary('That is enough for tonight. There is one more thing I keep, from when he was twelve. Come back tomorrow.');
    m.pose = 'sit';
    done(game, 'magi', 'Write down the beginning of the story, as she told it to you.');
  };

  // ---------- ✦ V. My Father's House ----------
  const temple12 = { id: 'temple12' };
  temple12.run = async function (game) {
    const m = room();
    await drama('You thought her story was finished. Tonight Mary is the one who asks you to stay.');
    m.pose = 'out';
    await mary('He was twelve. Every year we went up to Jerusalem for the Passover, half of Nazareth together, singing on the road.');
    m.pose = 'sit';
    await hist('Pilgrims from Galilee walked to Jerusalem in large companies of relatives and neighbors, more than a hundred kilometers, four or five days on foot. On the way they sang the Psalms of Ascents (Psalms 120–134).');
    await memory('bth_caravan', async (v) => {
      music('child');
      await L2('2:41', '2:42');
      await v.walk();
      await L2('2:43', '2:44');
      await v.search();
      await mary('I thought he was walking with my sister’s boys. Joseph thought he was with me. By evening no one had seen him since the city.');
      await L2('2:45', '2:45');
      await v.turn();
    });
    game.observe('temple12', 'lost', 'When Jesus was twelve, he stayed behind in Jerusalem after the Passover; his parents went a day’s journey before they missed him, and turned back to look for him (Luke 2:43–45).', false, true);
    await memory('bth_search', async (v) => {
      music('night');
      await v.look();
      await mary('Three days. I asked at every gate and in every courtyard. The second night I did not sleep at all.');
      await v.again();
    });
    await memory('bth_teachers', async (v) => {
      music('child');
      await v.listen();
      await L2('2:46', '2:46');
      await v.ask();
      await L2('2:47', '2:47');
      await v.find();
      await L2('2:48', '2:48');
      await v.answer();
      await L2('2:49', '2:50');
      await mary('“Your father and I,” I said. And he said, “my Father.” I had told him about Gabriel. I had never told him what it meant. He already knew.');
      await v.go();
      await L2('2:51', '2:52');
    });
    game.observe('temple12', 'teachers', 'After three days his parents found him in the Temple, sitting among the teachers, listening to them and asking them questions; all who heard him were amazed at his understanding (Luke 2:46–47).', false, true);
    game.observe('temple12', 'father', 'He said, “Why were you looking for me? Didn’t you know that I must be in my Father’s house?” They did not understand the saying (Luke 2:49–50).', false, true);
    game.observe('temple12', 'grew', 'He went down to Nazareth and was subject to them, and grew in wisdom and stature, and in favor with God and men; his mother kept all these sayings in her heart (Luke 2:51–52).', false, true);
    const h5 = await choose('temple12', 'He called the Temple his Father’s house. What do you hear in it?', TW.D.episodes.temple12.hearts);
    await mary([
      'He knew. I think he always knew, long before I had words for it.',
      'I am still learning. Every day I had with him, I learned.',
      'Eighteen more years in Nazareth. He worked beside Joseph, and did what I asked. Think of it.',
    ][h5]);
    m.pose = 'out';
    await mary('Three days I searched for him when he was twelve. Years later there were three more days, and a tomb. Both times, on the third day, he was about his Father’s business.');
    await mary('Now you know the beginning. You saw the end, and the empty tomb, and the beginning again. Write it all down. Someone will need it.');
    m.pose = 'sit';
    await drama('She goes back to her mending. Some years from now a physician named Luke will come to Jerusalem asking the same questions.');
    done(game, 'temple12', 'Write down the last thing she told you, and the first words of his that anyone remembered.');
  };

  TW.Episodes = TW.Episodes || {};
  Object.assign(TW.Episodes, { annunciation, nativity, presentation, magi, temple12 });
})(window.TW);
