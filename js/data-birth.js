/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — data for The Birth of Jesus: four episodes, told as Mary's memories years later (Luke 1–2; Matthew 1–2).
   Loaded after data.js and data-finale.js. */
window.TW = window.TW || {};
(function (TW) {
  const D = TW.D;
  Object.assign(D.episodes, {
    annunciation: {
      num: '✦ I', title: 'The Angel’s Word', ref: 'Luke 1:26–56; Matthew 1:18–25', passage: 'luke1', from: '1:26', to: '1:56', place: 'nazareth', region: 'galilee', era: 'birth',
      scene: 'Jerusalem, remembering Nazareth', parallels: 'Matthew 1:18–25 tells Joseph’s side',
      question: { id: 'savior', text: 'Why was he named Jesus?', ref: 'Matthew 1:21' },
      hearts: ['“How did you have the courage?”', '“I would have been afraid.”', 'You say nothing, and take her hand.'],
      conclusions: [
        'The angel Gabriel came to Mary in Nazareth, and she answered, “Behold, the servant of the Lord; let it be done to me according to your word.”',
        'Elizabeth, filled with the Holy Spirit, called Mary “the mother of my Lord,” and Mary sang, “My soul magnifies the Lord.”',
        'An angel told Joseph in a dream to take Mary as his wife, and to name the child Jesus, “for it is he who shall save his people from their sins.”',
      ],
      notes: [
        ['Nazareth (1:26)', 'A small hill village in Galilee, probably a few hundred people. Nothing in the Old Testament mentions it; Nathanael later asked, “Can any good thing come out of Nazareth?” (John 1:46).'],
        ['Gabriel (1:26)', 'The angel who explained Daniel’s visions (Daniel 8:16; 9:21), and who had come to Zacharias six months before (Luke 1:19).'],
        ['Pledged to be married (1:27)', 'A betrothal was legally binding, the first stage of marriage; ending it took a divorce. That is why Matthew says Joseph “intended to put her away secretly” (Matthew 1:19).'],
        ['Mary’s song (1:46–55)', 'Its words echo Hannah’s prayer in 1 Samuel 2:1–10, and the Psalms. Mary was steeped in Scripture.'],
        ['Immanuel (Matthew 1:23)', 'Matthew quotes Isaiah 7:14 and translates the Hebrew name for his readers: “God with us.”'],
        ['Two accounts', 'Luke tells the story from Mary’s side, Matthew from Joseph’s. Each includes what the other leaves out, and they agree on the essentials: Mary, a virgin; Joseph, of David’s line; the name Jesus, given by an angel.'],
      ],
      reflect: [
        'Mary said yes before she understood how it would happen. What does that kind of trust look like for you?',
        'Joseph obeyed a dream at the cost of his reputation. What did his “yes” cost him?',
        'Mary’s song is about God lifting the lowly and filling the hungry. Why is that the first thing she sings about?',
      ],
    },
    nativity: {
      num: '✦ II', title: 'No Room', ref: 'Luke 2:1–20', passage: 'luke2', from: '2:1', to: '2:20', place: 'bethlehem', region: 'land', era: 'birth',
      scene: 'Jerusalem, remembering Bethlehem', parallels: 'Matthew 1:25; 2:1 also places the birth in Bethlehem',
      question: { id: 'sign', text: 'Why would God’s sign be a baby lying in a feeding trough?', ref: 'Luke 2:12' },
      answers: { savior: ['“There is born to you today, in David’s city, a Savior, who is Christ the Lord.” The name Jesus means “the Lord saves.”', 'Luke 2:11; Matthew 1:21'] },
      hearts: ['Wonder.', 'Unworthy, like shepherds called in from the dark.', 'Joy, like the angels.'],
      conclusions: [
        'Jesus was born in Bethlehem, David’s city, and laid in a feeding trough because there was no room for them in the inn.',
        'An angel told shepherds in the fields, “There is born to you today, in David’s city, a Savior, who is Christ the Lord,” and a heavenly army sang, “Glory to God in the highest.”',
        'The shepherds found the baby as they had been told, and told everyone; Mary kept all these sayings, pondering them in her heart.',
      ],
      notes: [
        ['The enrollment (2:1–2)', 'A Roman census for taxation. Luke links it to Quirinius, governor of Syria; how this fits with other records is debated, and several solutions have been proposed.'],
        ['David’s city (2:4)', 'Bethlehem, about 9 km south of Jerusalem, where David was born and anointed king (1 Samuel 16). Micah 5:2 had said a ruler would come from it.'],
        ['The inn (2:7)', 'The Greek kataluma usually means a guest room. Luke uses the same word for the “guest room” of the Last Supper (Luke 22:11). The family may have been in the lower room of a crowded house, where animals were kept at night.'],
        ['Shepherds (2:8)', 'Ordinary working men, often looked down on. Bethlehem’s fields had sheep near enough to Jerusalem to serve the Temple. David himself had been a shepherd here.'],
        ['A Savior, who is Christ the Lord (2:11)', 'Three titles together: Savior (what he does), Christ, “Anointed One” (who he is for Israel), and Lord, the word the Greek Old Testament uses for God’s name.'],
        ['Mary pondered (2:19)', 'Luke says it twice (2:19, 51). Many readers think Mary herself was one of Luke’s eyewitness sources (Luke 1:2).'],
      ],
      reflect: [
        'God’s sign was not a palace but a feeding trough. What does that tell you about him?',
        'Why do you think the news came first to shepherds?',
        'Mary “pondered” what she did not yet understand. What are you pondering?',
      ],
    },
    presentation: {
      num: '✦ III', title: 'Simeon and Anna', ref: 'Luke 2:21–40', passage: 'luke2', from: '2:21', to: '2:40', place: 'temple', region: 'jerusalem', era: 'birth',
      scene: 'Jerusalem, remembering the Temple', parallels: 'told only in Luke',
      question: { id: 'sword', text: 'What did Simeon mean: “a sword will pierce through your own soul”?', ref: 'Luke 2:35' },
      answers: { sign: ['Simeon took the child in his arms and said, “My eyes have seen your salvation… a light for revelation to the nations.” The sign was God himself come near, small enough to hold.', 'Luke 2:28–32'] },
      hearts: ['“My eyes have seen your salvation.”', '“Now you are releasing your servant… in peace.”', '“A light for revelation to the nations.”'],
      conclusions: [
        'On the eighth day the child was named Jesus, and after forty days his parents presented him in the Temple, offering two young pigeons.',
        'Simeon, waiting for the consolation of Israel, took Jesus in his arms and said, “My eyes have seen your salvation.”',
        'Anna, a prophetess of great age, gave thanks to God and spoke of him to all who were looking for redemption in Jerusalem.',
      ],
      notes: [
        ['Forty days (2:22)', 'The Law set a time of purification after a birth, and the presentation of a firstborn son to the Lord (Leviticus 12; Exodus 13:2, 12).'],
        ['A pair of turtledoves (2:24)', 'The offering the Law allowed for those who could not afford a lamb (Leviticus 12:8). Mary and Joseph were poor.'],
        ['Simeon (2:25)', 'Luke says only that he was righteous and devout, and waiting for “the consolation of Israel,” the comfort promised in Isaiah 40:1.'],
        ['“Now you are releasing your servant” (2:29)', 'Simeon’s song, sung for centuries in evening prayers as the Nunc Dimittis, from its first words in Latin.'],
        ['Anna (2:36)', 'Of the tribe of Asher, one of the northern tribes scattered centuries before. She had been a widow for about eighty-four years, or was eighty-four; the Greek allows either.'],
        ['A sword (2:35)', 'Simeon spoke the first hint of the cross over a child forty days old. John says that Mary stood by the cross (John 19:25).'],
      ],
      reflect: [
        'Simeon waited his whole life and then held the answer in his arms. What are you waiting for?',
        'Anna was very old, and still “looking for redemption.” What keeps hope alive over a lifetime?',
        'What would it take for you to say, “My eyes have seen your salvation”?',
      ],
    },
    magi: {
      num: '✦ IV', title: 'The Star and the Flight', ref: 'Matthew 2:1–23; Luke 2:39–40', passage: 'matt2', from: '2:1', to: '2:23', place: 'bethlehem', region: 'land', era: 'birth',
      scene: 'Jerusalem, remembering Bethlehem and Egypt', parallels: 'Luke 2:39 tells of the return to Nazareth',
      question: { id: 'king', text: 'What kind of king do wise men from the nations come to worship?', ref: 'Matthew 2:2' },
      hearts: ['Your scroll: everything you have seen.', 'Your years: whatever is left of them.', 'Nothing but yourself.'],
      conclusions: [
        'Wise men from the east followed a star to Bethlehem, and finding the child with Mary his mother, they worshiped him and gave him gold, frankincense and myrrh.',
        'Warned in a dream, Joseph took the child and his mother by night into Egypt, and Herod killed the boys of Bethlehem.',
        'When Herod was dead, Joseph brought them back and settled in Nazareth in Galilee.',
      ],
      notes: [
        ['Wise men (2:1)', 'The Greek magoi meant a priestly class of the Persians and Babylonians, known for studying the stars. Matthew does not say there were three; the number comes from the three gifts.'],
        ['His star (2:2)', 'Many explanations have been offered: a conjunction of planets, a comet, a nova, or a sign beyond nature. Matthew says only that it went before them and stood over the place.'],
        ['Into the house (2:11)', 'By the time the wise men came, the family was in a house, and Herod killed boys “two years old and under” (2:16): the visit may have been months after the birth.'],
        ['Herod (2:16)', 'Herod the Great ruled Judea from 37 to 4 BC. The historian Josephus describes his cruelty and suspicion: he executed three of his own sons.'],
        ['Out of Egypt (2:15)', 'Matthew hears in the journey Hosea 11:1, “Out of Egypt I called my son,” said of Israel: Jesus relives his people’s story.'],
        ['Archelaus (2:22)', 'Herod’s son, who ruled Judea so harshly that Rome removed him in AD 6. Joseph had good reason to go home to Galilee instead.'],
      ],
      reflect: [
        'The first people in Matthew to worship Jesus were foreigners, and the king in Jerusalem tried to kill him. What does that tell you?',
        'The wise men gave their treasures. What would you give?',
        'Joseph obeyed every dream at once. What does quick obedience look like for you?',
      ],
    },
  });
  // the part's episodes, in order, at the front of the whole account
  const era = D.eras.find((e) => e.id === 'birth');
  if (era) era.episodes = ['annunciation', 'nativity', 'presentation', 'magi'];
  D.eraOrder.unshift('annunciation', 'nativity', 'presentation', 'magi');
  // questions raised here and answered later in the main story
  D.episodes.cross.answers = Object.assign(D.episodes.cross.answers || {}, { sword: ['Mary stood by the cross of her son (John 19:25). Simeon’s word had come true: the sword was this.', 'John 19:25; Luke 2:35'] });
  D.episodes.entry.answers = Object.assign(D.episodes.entry.answers || {}, { king: ['A king who comes “lowly, and riding on a donkey” (Zechariah 9:9), welcomed with palms, and crowned at last with thorns.', 'Matthew 21:5; John 19:2'] });
  // places on the maps
  const place = (region, id) => D.regions[region].places.find((p) => p.id === id);
  const naz = place('galilee', 'nazareth');
  if (naz) { naz.kind = 'episode'; naz.episodes = ['annunciation']; }
  const beth = place('land', 'bethlehem');
  if (beth) { beth.kind = 'episode'; beth.episodes = ['nativity', 'magi']; }
  const tem = place('jerusalem', 'temple');
  if (tem) tem.episodes = ['presentation'].concat(tem.episodes || []);
})(window.TW);
