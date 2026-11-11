/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — episode entries for Era V (Fire and War) and Era VI (Patmos and the Seven Churches). */
window.TW = window.TW || {};
(function (TW) {
  const D = TW.D;
  Object.assign(D.episodes, {
    goodfight: {
      num: 'XLV', title: 'The Good Fight', ref: '2 Timothy', passage: 'tim2', place: 'rome', region: 'west', era: 'war',
      scene: 'Ephesus, Troas and Rome, c. AD 64–67', parallels: 'compare Acts 20:24; Philippians 1:21–24',
      question: { id: 'finish', text: 'What would it take for me to say, “I have finished the course. I have kept the faith”?', ref: '2 Timothy 4:7' },
      hearts: ['You read the letter to the end for Timothy.', 'You began packing for Rome at once.', 'You sat with him in silence.'],
      answers: { unfinished: ['Because the story was never Paul’s to finish. He wrote from his last prison: “God’s word isn’t chained.”', '2 Timothy 2:9'] },
      conclusions: [
        'After the fire of Rome, the emperor turned on the Christians. Paul was in chains again, as a criminal.',
        'He asked Timothy to come before winter, and to bring his cloak, the books, and especially the parchments.',
        '“I have fought the good fight. I have finished the course. I have kept the faith.”',
      ],
      notes: [
        ['The fire of Rome (AD 64)', 'A great fire destroyed much of Rome in July of AD 64. The Roman historian Tacitus says Nero, to turn suspicion from himself, blamed the Christians and put many to death cruelly.'],
        ['Paul’s last letter', '2 Timothy is traditionally read as Paul’s final letter, from a harsher imprisonment than the rented house of Acts 28.'],
        ['Only Luke (4:11)', 'The physician stayed. And Paul asks for Mark, “for he is useful to me”: the same John Mark he once refused to take with him (Acts 15:38).'],
        ['The cloak, the books, the parchments (4:13)', 'A warm cloak for a cold cell, and his writings. Parchment was costly and durable, used for texts meant to last.'],
        ['The mouth of the lion (4:17)', 'A picture of deadly danger, and perhaps a memory of Daniel (Daniel 6).'],
        ['Afterward', 'A letter sent from Rome about thirty years later says that Peter and Paul both bore witness there to the end. Later tradition says Paul was beheaded on the road to Ostia.'],
      ],
      reflect: [
        'Paul asked for a cloak and for books. What does that tell you about him at the end?',
        'He asked for Mark, whom he once sent away. What changed?',
        'What is the “course” set before you?',
      ],
    },
    fall: {
      num: 'XLVI', title: 'Not One Stone', ref: 'Luke 21:5–33', passage: 'luke21', place: 'olivet', region: 'jerusalem', era: 'war',
      scene: 'Jerusalem, AD 30 and AD 70', parallels: 'Mark 13:1–2, 14–20; Matthew 24:1–2; Luke 19:41–44',
      question: { id: 'dwell', text: 'Where does God dwell, now that the Temple is gone?', ref: 'Luke 21:6' },
      hearts: ['You tore your garment and wept.', 'You said the Shema over the ruins.', 'You remembered his words, and lifted up your head.'],
      conclusions: [
        'Forty years before, on this hill, he said that not one stone would be left on another.',
        'When the armies came, the believers remembered his words and fled across the Jordan.',
        'The Temple I grew up in is ash and tumbled stone. Heaven and earth will pass away, but his words have not passed away.',
      ],
      notes: [
        ['The revolt (AD 66–70)', 'Judea rose against Rome in AD 66. In AD 70 the general Titus, son of the new emperor Vespasian, besieged Jerusalem. The city fell that summer, and the Temple was burned.'],
        ['Josephus', 'A Jewish commander who went over to the Romans and watched the siege wrote the main account of it. He describes famine in the city and the Temple in flames.'],
        ['Flight to the mountains (21:21)', 'The church historian Eusebius, writing much later, says the believers of Jerusalem left before the siege and settled at Pella, across the Jordan.'],
        ['One stone on another (21:6)', 'Great stones thrown down from the Temple platform by the Romans still lie where they fell, at the foot of its western wall.'],
        ['The Arch of Titus', 'In Rome, a triumphal arch still shows soldiers carrying the Temple’s lampstand and silver trumpets in procession.'],
        ['Until the times are fulfilled (21:24)', 'Jesus spoke of the fall of the city as real and terrible, but not as the end of the story.'],
      ],
      reflect: [
        'Jesus wept over this city before it fell (Luke 19:41). What does that tell you about him?',
        'What is it like to lose a place where you met God?',
        '“My words will by no means pass away.” What have you found you can still stand on?',
      ],
    },
    lamps: {
      num: 'XLVII', title: 'The Seven Lamps', ref: 'Revelation 1–3', passage: 'rev', from: '1:9', to: '3:22', place: 'ephesus', region: 'aegean', era: 'patmos',
      scene: 'Ephesus, c. AD 95', parallels: 'compare Daniel 7:9–14; Acts 19–20',
      question: { id: 'firstlove', text: 'Have I left my first love?', ref: 'Revelation 2:4' },
      hearts: ['A roof torn open in Capernaum, and a man who took up his mat and walked.', 'A tomb in a garden, with the stone rolled away.', 'A table where you were welcome before you believed.'],
      conclusions: [
        'John, an old man in exile on Patmos, saw one like a son of man among seven golden lampstands.',
        'To Ephesus: you have worked and endured, but you left your first love.',
        'To Laodicea: “Behold, I stand at the door and knock.”',
      ],
      notes: [
        ['Patmos (1:9)', 'A small island about 60 km off the coast near Miletus. Early writers say John was sent there in the reign of Domitian (AD 81–96); some date the book earlier.'],
        ['The seven assemblies (1:11)', 'Seven real cities in the province of Asia, in the order a messenger would reach them on the road: Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, Laodicea.'],
        ['One like a son of man (1:13)', 'The words of Daniel’s vision (Daniel 7:13), which Jesus took for himself.'],
        ['Ephesus (2:1–7)', 'The church where Paul taught for three years and wept on the shore at Miletus. A generation later it was still working hard, but love had cooled.'],
        ['Smyrna (2:8–11)', 'A poor church under pressure. Its later bishop Polycarp, by tradition a hearer of John, died for the faith there as an old man.'],
        ['Laodicea (3:14–22)', 'A banking city proud of its wealth, its black wool and its eye salve. Its piped water arrived lukewarm, unlike the hot springs of Hierapolis and the cold water of Colossae.'],
      ],
      reflect: [
        'What was your “first love” for Christ like? What has happened to it?',
        'The door in 3:20 belongs to a church. What does it mean that he stands outside it and knocks?',
        'Which of the letters would be written to your church?',
      ],
    },
    allnew: {
      num: 'XLVIII', title: 'All Things New', ref: 'Revelation 21–22', passage: 'rev', from: '21:1', to: '22:21', place: 'patmos', region: 'aegean', era: 'patmos',
      scene: 'The last pages of the scroll', parallels: 'compare Isaiah 65:17–19; Genesis 2:8–10',
      question: { id: 'come', text: '“He who hears, let him say, ‘Come!’” What will you say?', ref: 'Revelation 22:17' },
      hearts: ['“Amen. Come, Lord Jesus.”', '“I was there. It is true.”', '“Read it, and see for yourself.”'],
      answers: { dwell: ['“I saw no temple in it, for the Lord God, the Almighty, and the Lamb, are its temple.” God’s dwelling is with people.', 'Revelation 21:3, 22'] },
      conclusions: [
        'A new heaven and a new earth, and God’s dwelling with people: every tear wiped away, and death no more.',
        'No temple in the city, for the Lord God and the Lamb are its temple; a river of the water of life, and a tree whose leaves heal the nations.',
        '“He who is thirsty, let him come.” The account ends with an invitation.',
      ],
      notes: [
        ['A new heaven and a new earth (21:1)', 'The promise of Isaiah 65:17, and the answer to the first chapters of Genesis: creation not abandoned, but made new.'],
        ['God’s dwelling with people (21:3)', 'The word is “tent” or “tabernacle,” closely related to the word John’s Gospel uses when it says the Word became flesh and lived among us (John 1:14).'],
        ['No temple (21:22)', 'For a people who had lost the Temple, the city’s center is God himself.'],
        ['The tree of life (22:2)', 'Barred to humanity in Genesis 3:24, it stands again in the middle of the city, its leaves “for the healing of the nations.”'],
        ['Alpha and Omega (21:6)', 'The first and last letters of the Greek alphabet: the beginning and the end.'],
        ['Come (22:17, 20)', 'The Bible’s last pages are an invitation and a prayer. An early Aramaic form of the prayer, “Marana tha,” is preserved in 1 Corinthians 16:22.'],
      ],
      reflect: [
        'Which promise in these chapters do you most long for?',
        'You have walked from Capernaum to this last page. What did you see? What do you believe?',
        'To whom will you say, “Come”?',
      ],
    },
  });
  D.eraOrder.push('goodfight', 'fall', 'lamps', 'allnew');
})(window.TW);
