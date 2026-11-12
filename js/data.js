/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — content data.
   Scripture quotations: World English Bible (WEB), public domain (see scripture.js).
   Rule of the project: Scripture is never altered. Anything invented is labelled "Dramatization". */
window.TW = window.TW || {};
(function (TW) {
  const D = {};

  D.translation = 'World English Bible (public domain)';

  D.timeline = { start: 25, end: 100 };

  D.events = [
    { year: 28, label: 'Ministry in Galilee begins', approx: true },
    { year: 30, label: 'Cross and resurrection (AD 30 or 33)', approx: true },
    { year: 34, label: 'Saul meets the risen Jesus', approx: true },
    { year: 49, label: 'Council at Jerusalem', approx: true },
    { year: 62, label: 'James, brother of Jesus, killed', approx: false },
    { year: 64, label: 'Fire of Rome, Nero’s persecution', approx: false },
    { year: 70, label: 'Jerusalem and the Temple destroyed', approx: false },
    { year: 95, label: 'John on Patmos', approx: true },
  ];

  D.eras = [
    {
      id: 'galilee', num: 'I', title: 'The Ministry in Galilee', dates: 'c. AD 28–29',
      span: [28, 30], open: true, view: 'A skeptical scribe',
      summary:
        'Luke dates John the Baptist’s ministry to the fifteenth year of Tiberius (Luke 3:1), about AD 28–29. Soon after, Jesus makes Capernaum his base (Matthew 4:13). You arrive from Jerusalem as a young scribe, sent to watch him.',
      world: [
        ['Emperor', 'Tiberius (AD 14–37)'],
        ['Tetrarch of Galilee', 'Herod Antipas (4 BC–AD 39)'],
        ['Prefect of Judea', 'Pontius Pilate (AD 26–36)'],
        ['High priest', 'Joseph Caiaphas (c. AD 18–36)'],
      ],
      episodes: ['capernaum', 'levi', 'sabbath', 'legion', 'nain'],
    },
    {
      id: 'passion', num: 'II', title: 'The Road to Jerusalem', dates: 'c. AD 30 or 33',
      span: [30, 33], open: true, view: 'A troubled witness',
      summary:
        'You are home in Jerusalem for Passover, and so is Jesus of Nazareth. From his entry into the city to the empty tomb, these events are witnessed, never played: you watch, you choose how your heart answers, and the story unfolds exactly as it is written. Scholars place the crucifixion at Passover in AD 30 or AD 33.',
      world: [
        ['Prefect of Judea', 'Pontius Pilate'],
        ['High priest', 'Joseph Caiaphas'],
        ['Tetrarch of Galilee', 'Herod Antipas'],
      ],
      episodes: [
        'entry', 'temple', 'council', 'cross', 'burial', 'tomb', 'forty',
      ],
    },
    {
      id: 'church', num: 'III', title: 'The Jerusalem Church', dates: 'c. AD 30–36',
      span: [33, 36], open: true, view: 'A new believer',
      summary:
        'Pentecost, the apostles’ teaching in the Temple courts, the sharing of goods, and the death of Stephen. Your scribe is still a scribe, and still sits in the council, but he is no longer only watching. Healing comes through prayer in Jesus’ name, never by technique (Acts 3:6, 19:13–16).',
      world: [['Prefect of Judea', 'Pontius Pilate'], ['High priest', 'Caiaphas, with Annas (Acts 4:6)']],
      episodes: [
        'pentecost', 'gate', 'trial', 'seven', 'stephen',
      ],
    },
    {
      id: 'spread', num: 'IV', title: 'The Spreading Word', dates: 'c. AD 36–62',
      span: [36, 62], view: 'A believer sent out', open: true,
      summary:
        'Scattered from Jerusalem, the believers carry the word into Samaria, down the desert road, and north to Damascus, where the persecutor meets the one he persecuted. Then Antioch, the council at Jerusalem, and Paul’s journeys across the Mediterranean.',
      world: [['Emperors', 'Tiberius, Caligula, Claudius, Nero'], ['Prefect of Judea', 'Pontius Pilate, then Marcellus (from AD 36)']],
      episodes: [
        'samaria', 'desert', 'damascus', 'tabitha', 'cornelius', 'antioch', 'rhoda', 'cyprus', 'pisidia', 'lystra', 'jcouncil', 'lydia', 'jailer', 'berea', 'athens', 'corinth', 'artemis', 'farewell',
        'arrest', 'plot', 'felix', 'agrippa', 'storm', 'malta', 'rome', 'letter', 'onesimus',
      ],
    },
    {
      id: 'war', num: 'V', title: 'Fire and War', dates: 'AD 64–70',
      span: [64, 70], view: 'An elder of the church',
      summary:
        'Nero blames Christians for the fire of Rome. In Judea, revolt against Rome ends with Jerusalem and the Temple destroyed in AD 70, as Jesus foretold (Mark 13:1–2).',
      world: [['Emperors', 'Nero, then Vespasian'], ['Roman general', 'Titus']],
      open: true,
      episodes: ['goodfight', 'fall'],
    },
    {
      id: 'patmos', num: 'VI', title: 'Patmos and the Seven Churches', dates: 'c. AD 95',
      span: [94, 96], view: 'The next generation',
      summary:
        'John, exiled on Patmos, writes to seven churches in Asia (Revelation 1:9–11). Most date this to Domitian’s reign; some argue for the late 60s.',
      world: [['Emperor', 'Domitian (AD 81–96)']],
      open: true,
      episodes: ['lamps', 'allnew'],
    },
  ];

  // ---------- Episodes of Era I ----------
  D.episodes = {
    capernaum: {
      num: 'I', title: 'At Home in Capernaum', ref: 'Mark 2:1–12', passage: 'mark2a', place: 'capernaum',
      scene: 'Capernaum, Mark 2:1–12', parallels: 'Matthew 9:1–8, Luke 5:17–26',
      question: { id: 'forgive', text: 'Who can forgive sins but God alone?', ref: 'Mark 2:7' },
      hearts: ['You asked who can forgive sins but God alone.', 'You wondered who he thinks he is.', 'You kept silent and watched.'],
      conclusions: [
        'He speaks blasphemy. Only God can forgive sins.',
        'He claimed what belongs to God alone, and the lame man walked. I do not know what to make of it.',
        'I must see more before I write anything certain.',
      ],
      notes: [
        ['“In the house” (v. 1)', 'Capernaum had become Jesus’ base (Matthew 4:13). Mark earlier mentions the house of Simon and Andrew here (Mark 1:29), so many readers connect the two. A house that early Christians venerated now lies under a fifth-century octagonal church.'],
        ['The roof (v. 4)', 'Mark says the friends dug through the roof. Excavated houses in Capernaum had basalt walls and roofs of beams, branches and packed earth, reached by outside stairs. Luke says they lowered him “through the tiles” (Luke 5:19), a detail familiar to a wider Greco-Roman audience.'],
        ['The scribes’ objection (v. 7)', 'Their premise comes from Scripture: God himself blots out transgressions (Isaiah 43:25). They are right that only God forgives sin. That is exactly what makes Jesus’ words so startling.'],
        ['“Which is easier?” (v. 9)', 'Anyone could say “your sins are forgiven” with nothing to show for it. Healing could be checked on the spot. Jesus does the visible thing to show his authority for the invisible one.'],
        ['“Son of Man” (v. 10)', 'Jesus’ most common name for himself. It echoes Daniel 7:13–14, where one like a son of man receives authority and an everlasting kingdom from the Ancient of Days.'],
      ],
      reflect: [
        'Jesus “saw” the four friends’ faith (v. 5). What did it look like?',
        'The scribes reasoned silently, yet Jesus answered them. What does that say about him?',
        'Why might Jesus speak to the man’s sins before his paralysis?',
      ],
    },
    levi: {
      num: 'II', title: 'The Tax Booth', ref: 'Mark 2:13–17', passage: 'mark2b', place: 'capernaum',
      scene: 'Capernaum, Mark 2:13–17', parallels: 'Matthew 9:9–13, Luke 5:27–32',
      question: { id: 'sinners', text: 'Why does he eat with tax collectors and sinners?', ref: 'Mark 2:16' },
      hearts: ['You thought he should repent before any teacher ate with him.', 'You wondered whether leaving the booth was repentance.', 'You waited to see what Jesus would do.'],
      conclusions: [
        'He makes himself unclean by eating with sinners.',
        'He calls sinners and they come. I have never seen a teacher do this.',
        'I cannot tell yet whether he excuses sin or heals it.',
      ],
      reveal: 'Roads to the coast and to Samaria are now on your map of the Land.',
      notes: [
        ['The tax office (v. 14)', 'Levi most likely collected tolls on goods crossing between Herod Antipas’s Galilee and Philip’s territory. Collectors bought the right to collect and kept what they took above it, so they were widely distrusted.'],
        ['Levi and Matthew', 'Matthew’s Gospel tells the same call with the name Matthew (Matthew 9:9). Most readers take them to be the same man.'],
        ['Reclining at the table (v. 15)', 'At a formal meal guests reclined on mats or couches, leaning on one elbow. Sharing a table was a sign of acceptance and friendship.'],
        ['Scribes and Pharisees (v. 16)', 'Pharisees tried to keep purity in everyday life, especially at meals. Eating with people known as sinners seemed to them to make light of God’s law.'],
        ['“A physician” (v. 17)', 'Jesus does not say his hosts are well. He says that is exactly why he is with them. A physician goes where the sick are.'],
      ],
      reflect: [
        'What did it cost Levi to stand up from the booth?',
        'Whom would you avoid sitting at a table with, and why?',
        'Why might Jesus’ answer have stung the scribes who heard it?',
      ],
    },
    sabbath: {
      num: 'III', title: 'Lord of the Sabbath', ref: 'Mark 2:23–3:6', passage: 'mark2c', place: 'capernaum',
      scene: 'Galilee, Mark 2:23–3:6', parallels: 'Matthew 12:1–14, Luke 6:1–11',
      question: { id: 'sabbathlord', text: 'Who is this Son of Man who is lord even of the Sabbath?', ref: 'Mark 2:28' },
      hearts: ['You stayed silent, afraid of the men beside you.', 'You stayed silent because you had no answer.', 'You stayed silent though you knew the answer.'],
      conclusions: [
        'He breaks the Sabbath and teaches others to break it.',
        'He kept the purpose of the Sabbath better than we did.',
        'My own colleagues now plot against him, and I do not know where I stand.',
      ],
      reveal: 'Crowds came from Judea, Idumaea, beyond the Jordan, Tyre and Sidon. Those lands are now on your map.',
      notes: [
        ['Plucking grain (2:23)', 'The Law let a hungry traveler pluck grain by hand from a neighbor’s field (Deuteronomy 23:25). The question was the day. Pharisees counted plucking as reaping, one of the kinds of work later listed in the Mishnah as forbidden on the Sabbath.'],
        ['David and the bread (2:25–26)', 'The story is in 1 Samuel 21:1–6, where the priest is Ahimelech, Abiathar’s father. Why Mark names Abiathar has long been discussed; it may point to the section of Scripture known by his name.'],
        ['“Made for man” (2:27)', 'God gave the Sabbath as rest and as a reminder of freedom from slavery (Exodus 20:8–11, Deuteronomy 5:12–15).'],
        ['The synagogue (3:1)', 'First-century synagogues found at Magdala and Gamla had stepped benches along the walls facing a central floor. The white limestone synagogue at Capernaum today was built centuries later, over older basalt foundations.'],
        ['“They watched him” (3:2)', 'Jewish teaching agreed that saving a life overrides the Sabbath (later written in Mishnah Yoma 8:6). A withered hand was not life-threatening, so healing it could be argued to be work that could wait a day.'],
        ['The Herodians (3:6)', 'Supporters of Herod Antipas’s rule. Pharisees and Herodians made unlikely partners, which shows how threatening Jesus had become to both.'],
      ],
      reflect: [
        'Jesus asked a direct question and no one answered. Why do you think they were silent?',
        'Is it possible to keep a rule carefully and miss its purpose?',
        'Mark says Jesus was angry and grieved at the same time (3:5). What grieved him?',
      ],
    },
    legion: {
      num: 'IV', title: 'Across the Lake', ref: 'Mark 4:35–5:20', passage: 'mark4', place: 'capernaum', endNode: 'kursi',
      scene: 'The Sea of Galilee, Mark 4:35–5:20', parallels: 'Matthew 8:23–34, Luke 8:22–39',
      question: { id: 'windsea', text: 'Who then is this, that even the wind and the sea obey him?', ref: 'Mark 4:41' },
      hearts: ['You remembered that only God stills the sea (Psalm 107:29).', 'You thought of the prophets, like Elijah.', 'You were too afraid to think at all.'],
      conclusions: [
        'He has power over the sea and over unclean spirits. I am afraid of him.',
        'Only God commands the sea. I do not know how to write about this man.',
        'I must see more, but I no longer think he is an ordinary teacher.',
      ],
      reveal: 'The healed man told his story across the Decapolis. Its cities are now on your map.',
      notes: [
        ['Sudden storms (4:37)', 'The lake lies about 210 m below sea level, ringed by hills. Cool air can pour down the slopes and raise steep waves very quickly.'],
        ['“Asleep on the cushion” (4:38)', 'A fishing boat from this period, found near Magdala in 1986, is about 8 m long. The stern was where the helmsman sat.'],
        ['“Peace! Be still!” (4:39)', 'In the Scriptures, God alone rules the raging sea (Psalm 89:9, Psalm 107:28–29). That is why the disciples’ question in verse 41 matters so much.'],
        ['The other side (5:1)', 'This was largely Gentile country. Tombs, pigs and an unclean spirit: a devout Jew would avoid all three.'],
        ['Legion (5:9)', 'A Roman legion was a unit of roughly five thousand soldiers.'],
        ['The place name', 'Manuscripts read Gadarenes, Gerasenes or Gergesenes. Gadara lay about 10 km from the shore and Gerasa much farther. Kursi, on the shore below steep slopes, is the traditional site.'],
        ['Decapolis (5:20)', 'A league of Greek-speaking cities, mostly east of the Jordan. The healed man became the first to tell about Jesus there.'],
      ],
      reflect: [
        'The disciples were more afraid after the calm than during the storm (4:41). Why?',
        'The townspeople begged Jesus to leave. What were they afraid of losing?',
        'Why might Jesus send the healed man home instead of letting him follow?',
      ],
    },
    nain: {
      num: 'V', title: 'The Widow of Nain', ref: 'Luke 7:11–17', passage: 'luke7', place: 'nain',
      scene: 'Nain, Luke 7:11–17', parallels: 'told only by Luke',
      question: { id: 'prophet', text: 'A great prophet, or more than a prophet?', ref: 'Luke 7:16' },
      hearts: ['You cried out, “A great prophet has arisen among us!”', 'You cried out, “God has visited his people!”', 'You had no words left.'],
      conclusions: [
        'A great prophet has arisen among us.',
        'God has visited his people.',
        'He is more than a prophet. I am not yet ready to write what I think.',
      ],
      reveal: 'The report spread through all Judea. The whole land is now on your map.',
      final: true,
      notes: [
        ['Nain and Shunem', 'Nain sits on the Hill of Moreh. On the other side of the same hill lies Shunem, where Elisha raised a woman’s son (2 Kings 4:8–37).'],
        ['A widow’s only son (7:12)', 'Without a husband or son, a widow had lost her support and her family’s future. Elijah also raised a widow’s son, and “gave him to his mother” (1 Kings 17:17–24), the same words Luke uses in 7:15.'],
        ['Funerals', 'Burial usually took place the day of death. The body was wrapped and carried on an open bier outside the town to the tombs. Later Jewish tradition says even the poorest family hired flute players and a wailing woman (Mishnah Ketubot 4:4).'],
        ['Touching the bier (7:14)', 'Under the Law of Moses, contact with the dead made a person unclean (Numbers 19:11–16). Jesus touches it, and life goes the other way.'],
        ['“God has visited his people” (7:16)', 'The crowd echoes Zechariah’s song at the birth of John the Baptist (Luke 1:68).'],
      ],
      reflect: [
        'Jesus spoke to the widow before anyone asked him for anything. What does that tell you?',
        'The crowd called him a great prophet. Was that enough?',
        'Why do you think Luke made a point of telling us she was a widow?',
      ],
    },
  };
  Object.assign(D.episodes, {
    entry: {
      num: 'VI', title: 'The Entry', ref: 'Mark 11:1–11', passage: 'mark11a', place: 'olivet', region: 'jerusalem', era: 'passion',
      scene: 'The Mount of Olives, Mark 11:1–11', parallels: 'Matthew 21:1–11, Luke 19:28–44, John 12:12–19',
      question: { id: 'king', text: 'Is he the king who comes in the name of the Lord?', ref: 'Mark 11:9–10' },
      hearts: ['You spread your mantle on the road.', 'You kept your mantle on your shoulders and watched.', 'You stepped back, because scribes from the Temple were watching you.'],
      conclusions: [
        'The crowd hails him as David’s heir. This will end in Roman swords.',
        'He came as a king, but on a young donkey. I do not understand what kind of king.',
        'I have watched him for a year. I am no longer sure I am only watching.',
      ],
      notes: [
        ['Bethphage and Bethany (v. 1)', 'Two villages on the eastern slope of the Mount of Olives, on the road up from Jericho. Most manuscripts spell the first Bethphage; the WEB follows those that read Bethsphage. Bethany was the home of Mary, Martha and Lazarus (John 11:1).'],
        ['A young donkey (v. 2)', 'Kings rode horses to war. Zechariah 9:9 pictures Zion’s king coming “lowly, and riding on a donkey.” Mark does not quote the prophecy; Matthew 21:5 and John 12:15 do.'],
        ['Garments on the road (v. 8)', 'When Jehu was proclaimed king, the people spread their garments under him (2 Kings 9:13). The gesture said: this is our king.'],
        ['“Hosanna!” (v. 9)', 'A Hebrew cry meaning “save us, we pray.” The words come from Psalm 118:25–26, one of the psalms sung by pilgrims at the great feasts.'],
        ['The view of the city', 'From the Mount of Olives the whole Temple lay open across the Kidron Valley. Josephus wrote that from a distance it looked like a mountain covered with snow, where it was not plated with gold.'],
        ['He looked around (v. 11)', 'Mark’s Jesus enters the Temple, looks at everything, and leaves. The next day he will come back to act on what he saw.'],
      ],
      reflect: [
        'The crowd spread their garments for him. What would it have cost you to spread yours?',
        'What kind of king rides a borrowed young donkey?',
        'Why do you think Jesus only looked around the Temple that first evening?',
      ],
    },
    temple: {
      num: 'VII', title: 'The Temple', ref: 'Mark 11:15–18; 12:28–34', passage: 'mark11b', place: 'temple', region: 'jerusalem', era: 'passion',
      scene: 'The Temple courts, Mark 11–12', parallels: 'Matthew 21:12–17; 22:34–40, Luke 19:45–48; 10:25–28',
      question: { id: 'notfar', text: 'Am I far from the Kingdom of God?', ref: 'Mark 12:34' },
      hearts: ['You thought he had no right to touch the high priest’s court.', 'You asked yourself whether the prophets he quoted were wrong.', 'You realized the court of the nations had become a market and you had never noticed.'],
      conclusions: [
        'He has made enemies of every chief priest in the city. They will not let him live.',
        'He spoke the Shema as I have spoken it every day of my life, and he meant it more than I do.',
        'He told one of us that he was not far from the Kingdom. I keep wondering how far I am.',
      ],
      notes: [
        ['The Court of the Gentiles', 'Herod’s Temple sat on a vast platform. Its outer court was open to everyone, including Gentiles. A low barrier marked where they could go no farther; two of its Greek warning inscriptions have been found, threatening death to any foreigner who passed it.'],
        ['Money changers (11:15)', 'The yearly Temple tax had to be paid in silver shekels of Tyre, prized for their purity. Pilgrims from everywhere changed their coins here, for a fee.'],
        ['Doves (11:15)', 'Doves were the offering of the poor. A mother who could not afford a lamb brought two doves or pigeons (Leviticus 12:8), as Mary did (Luke 2:24).'],
        ['“A house of prayer for all the nations” (11:17)', 'Jesus joins Isaiah 56:7, a promise that foreigners would worship there, with Jeremiah 7:11, a warning to people who thought the Temple would protect them however they lived.'],
        ['The greatest commandment (12:29–31)', 'Jesus answers with the Shema (Deuteronomy 6:4–5), recited by devout Jews every morning and evening, and joins it to Leviticus 19:18.'],
        ['“Not far from the Kingdom” (12:34)', 'The only scribe in Mark whom Jesus praises. Not far is not the same as in. Mark leaves the man there, close, with nothing more said.'],
      ],
      reflect: [
        'What made the market in the outer court so wrong, when every stall served the Temple?',
        'The scribe said love is worth more than every sacrifice. Why did that answer please Jesus?',
        'What do you think the scribe still lacked?',
      ],
    },
  });
  D.eraOrder = ['capernaum', 'levi', 'sabbath', 'legion', 'nain', 'entry', 'temple'];
  Object.assign(D.episodes, {
    council: {
      num: 'VIII', title: 'The Council by Night', ref: 'Mark 14:53–72', passage: 'mark14', from: '14:53', place: 'highpriest', region: 'jerusalem', era: 'passion',
      scene: 'The high priest’s house, Mark 14:53–72', parallels: 'Matthew 26:57–75, Luke 22:54–71, John 18:12–27',
      question: { id: 'christ', text: 'Is he the Christ, the Son of the Blessed?', ref: 'Mark 14:61' },
      hearts: ['You kept your eyes on the high priest, as you were trained to.', 'You looked at the floor.', 'You looked at him, and he was already looking at you.'],
      conclusions: [
        'He condemned himself with two words: “I am.”',
        'They condemned him for the very claim I first heard in Capernaum.',
        'The witnesses lied, and no one cared. I am ashamed of my teachers.',
      ],
      notes: [
        ['The council (14:55)', 'The Sanhedrin, Jerusalem’s high court of chief priests, elders and scribes, met under the high priest. Later tradition says it sat in a half circle so that its members could see one another.'],
        ['Witnesses (14:56–59)', 'The Law required two or three witnesses who agreed (Deuteronomy 19:15). Mark stresses twice that their testimony did not agree.'],
        ['“I am” (14:62)', 'Jesus joins two Scriptures: the one who sits at God’s right hand (Psalm 110:1) and one like a son of man coming with the clouds (Daniel 7:13).'],
        ['Tearing his clothes (14:63)', 'An old sign of grief or horror at blasphemy (2 Kings 18:37). The charge is the same one the scribes thought in silence in Capernaum (Mark 2:7).'],
        ['A trial at night', 'Rules later written in the Mishnah forbid capital trials at night or on the eve of a feast. Whether those rules were followed in Jesus’ day is debated.'],
        ['Peter below (14:54, 66–72)', 'Mark sets the two scenes side by side: upstairs Jesus confesses who he is, downstairs Peter denies knowing him.'],
      ],
      reflect: [
        'Jesus said nothing to the false witnesses, but answered the high priest plainly. Why then?',
        'Where else in this story has someone been accused of blasphemy for speaking as God speaks?',
        'Peter wept. What is the difference between his failure and the council’s?',
      ],
    },
    cross: {
      num: 'IX', title: 'The Cross', ref: 'Mark 15:16–41', passage: 'mark15', from: '15:16', to: '15:41', place: 'golgotha', region: 'jerusalem', era: 'passion',
      scene: 'Golgotha, Mark 15:16–41', parallels: 'Matthew 27:27–56, Luke 23:26–49, John 19:16–37',
      question: { id: 'forsaken', text: 'Why did he cry, “My God, my God, why have you forsaken me?”', ref: 'Mark 15:34' },
      hearts: ['You said nothing while your teachers mocked him.', 'You turned your back on the men you had studied with.', 'You stayed, and kept your eyes on him to the end.'],
      conclusions: [
        '“He saved others. He can’t save himself.” My teachers said it. I keep hearing it.',
        'A Roman soldier said what my teachers would not: “Truly this man was the Son of God!”',
        'I have no words. I watched him die.',
      ],
      notes: [
        ['Simon of Cyrene (15:21)', 'Cyrene was a city in North Africa with a large Jewish community. Mark names Simon’s sons, Alexander and Rufus, as if his readers knew them.'],
        ['Golgotha (15:22)', 'Aramaic for “skull.” The Latin word, calvaria, gives us “Calvary.” It lay outside the city wall but near the city (John 19:20).'],
        ['Crucifixion', 'Rome reserved crucifixion for slaves, rebels and the lowest criminals. It was meant to be public, slow and shameful.'],
        ['“The King of the Jews” (15:26)', 'The written charge. In Roman eyes it was treason: claiming a throne Caesar had not given.'],
        ['“My God, my God” (15:34)', 'Jesus prays the first line of Psalm 22, a psalm that moves from abandonment to the nations turning to the Lord (22:27–28).'],
        ['The veil (15:38)', 'The curtain before the Most Holy Place, which only the high priest entered, once a year (Leviticus 16).'],
        ['The centurion (15:39)', 'A Gentile soldier says what Mark announced in his first line: “the Son of God” (Mark 1:1).'],
        ['The women (15:40–41)', 'They had followed him from Galilee. They will watch his death, his burial, and the tomb.'],
      ],
      reflect: [
        'The mockers said he could not save himself. In what sense were they right?',
        'Why might Mark want a Roman soldier to be the first person to say it?',
        'Read Psalm 22 to the end. How does that change the cry from the cross?',
      ],
    },
    burial: {
      num: 'X', title: 'The Burial', ref: 'John 19:38–42; Mark 15:42–47', passage: 'john19b', passages: [['mark15', '15:42', '15:47'], ['john19b'], ['john3', '3:1', '3:16']], place: 'golgotha', region: 'jerusalem', era: 'passion',
      scene: 'The garden tomb, John 19:38–42', parallels: 'Matthew 27:57–61, Mark 15:42–47, Luke 23:50–56',
      question: { id: 'born', text: 'How can a man be born when he is old?', ref: 'John 3:4' },
      hearts: ['You carried him with Nicodemus, and gave up your Passover.', 'You carried the spices, and kept yourself clean for the feast.', 'You held back, and watched from the garden wall.'],
      conclusions: [
        'It is finished. We buried him before the Sabbath began.',
        'Nicodemus came to him by night once. Today he came in daylight, and so did I.',
        'I helped bury him, and I do not understand why I still hope.',
      ],
      notes: [
        ['Joseph of Arimathea', 'A respected member of the council (Mark 15:43) and a secret disciple (John 19:38). Asking Pilate for the body was a public risk.'],
        ['A hundred pounds (19:39)', 'About 33 kg of myrrh and aloes: an amount fit for a king’s burial.'],
        ['Before the Sabbath', 'The Law did not allow a hanged body to remain overnight (Deuteronomy 21:22–23), and the Sabbath began at sunset.'],
        ['Unclean for the feast', 'Touching the dead made a person unclean for seven days (Numbers 19:11). Those who were unclean could keep the Passover a month later (Numbers 9:6–11).'],
        ['Nicodemus in John', 'He appears three times: coming by night (3:1–21), asking that Jesus be given a hearing (7:50–51), and bringing the spices (19:39).'],
        ['A new tomb (19:41)', 'A rock-cut tomb in a garden near the place of crucifixion. Mark says a stone was rolled across its door (15:46).'],
      ],
      reflect: [
        'Nicodemus came by night at first. What do you think changed in him?',
        'What did it cost Joseph and Nicodemus to do this, and what did it say?',
        'Read John 3:14–16 again. Why might those words have come back to Nicodemus that evening?',
      ],
    },
    tomb: {
      num: 'XI', title: 'The Empty Tomb', ref: 'Mark 16:1–8; John 20:1–18', passage: 'mark16', passages: [['mark16'], ['john20']], place: 'golgotha', region: 'jerusalem', era: 'passion',
      scene: 'The garden tomb at dawn, Mark 16; John 20', parallels: 'Matthew 28:1–10, Luke 24:1–12',
      question: { id: 'risen', text: 'He has risen. What does that mean for everything I have seen?', ref: 'Mark 16:6' },
      hearts: ['You stooped and looked in, as the first disciple did.', 'You went inside, as Peter did.', 'You could not make yourself look.'],
      conclusions: [
        'The tomb is empty. I saw the linen cloths myself.',
        'Mary of Magdala says she has seen the Lord. I believe she is telling the truth.',
        'He is risen. Every question in my scroll looks different this morning.',
      ],
      notes: [
        ['The first day of the week (16:2)', 'Sunday. The Sabbath ended at sunset on Saturday, and the women bought spices then (16:1).'],
        ['The women as witnesses', 'In that culture a woman’s testimony often counted for less. Many historians note that a made-up story would hardly have chosen women as its first witnesses.'],
        ['“He has risen” (16:6)', 'The young man in white points to the empty place where the body had lain.'],
        ['The ending of Mark (16:8)', 'The oldest manuscripts of Mark end with the women afraid and silent. Verses 9–20, found in most later manuscripts, were probably added early to complete the account.'],
        ['The linen cloths (John 20:5–7)', 'Grave robbers would not unwrap a body and leave the cloths behind, the head cloth rolled up by itself.'],
        ['“Rhabbouni” (John 20:16)', 'Aramaic for “my teacher.” She knew him the moment he said her name.'],
      ],
      reflect: [
        'The women ran away afraid and told no one, at first. Why might Mark end there?',
        'The disciple “saw and believed.” What did he see?',
        'Mary did not recognize him until he spoke her name. What does that tell you?',
      ],
    },
  });
  D.eraOrder.push('council', 'cross', 'burial', 'tomb');
  Object.assign(D.episodes, {
    forty: {
      num: 'XII', title: 'Forty Days', ref: 'John 20:19–29; Acts 1:1–14', passage: 'john20b', passages: [['john20b', '20:19', '20:31'], ['acts1', '1:1', '1:14']], place: 'upperroom', region: 'jerusalem', era: 'passion',
      scene: 'The upper room, John 20; Acts 1', parallels: 'Luke 24:36–53, Mark 16:19',
      question: { id: 'witness', text: 'He said, “You will be witnesses to me.” Does that mean me?', ref: 'Acts 1:8' },
      hearts: ['You heard “Blessed are those who have not seen,” and knew he meant you.', 'You still wanted to see him for yourself, as Thomas had.', 'You had no answer, only tears.'],
      conclusions: [
        'Thomas doubted as I doubted, and he called him “My Lord and my God.”',
        'He was taken up from the Mount of Olives. They are waiting in Jerusalem, as he told them.',
        'I have been writing reports for a year. He calls them testimony.',
      ],
      final: 'passion',
      answers: { forgive: ['Thomas called him “My Lord and my God!”', 'John 20:28'], risen: ['He showed himself alive by many proofs over forty days.', 'Acts 1:3'], prophet: ['More than a prophet: “My Lord and my God!”', 'John 20:28'] },
      notes: [
        ['Locked doors (John 20:19)', 'The disciples hid for fear of the authorities. The risen Jesus came and stood among them anyway, and his first word was “Peace.”'],
        ['Thomas (20:24–29)', 'Called Didymus, “the Twin.” He refused to believe on someone else’s word, and then made the fullest confession in the Gospel: “My Lord and my God!”'],
        ['Those who have not seen (20:29)', 'John wrote for readers who would never see Jesus with their own eyes, so that they too might believe (20:31).'],
        ['Forty days (Acts 1:3)', 'Luke, who also wrote Acts, says Jesus appeared over forty days, teaching about God’s Kingdom.'],
        ['Witnesses (1:8)', 'The outline of all of Acts: Jerusalem, Judea and Samaria, the ends of the earth.'],
        ['A Sabbath day’s journey (1:12)', 'About a kilometer, the distance later tradition allowed on the Sabbath. Olivet is that close to the city.'],
      ],
      reflect: [
        'Thomas wanted to see and touch. Was that wrong?',
        'Why might the first thing the risen Jesus said be “Peace”?',
        'The disciples asked about the kingdom for Israel, and Jesus answered with a mission to the world. Why?',
      ],
    },
    pentecost: {
      num: 'XIII', title: 'Pentecost', ref: 'Acts 2', passage: 'acts2', place: 'temple', region: 'jerusalem', era: 'church',
      scene: 'Jerusalem at the feast, Acts 2',
      parallels: 'told only in Acts',
      question: { id: 'spirit', text: 'What does it mean to receive the gift of the Holy Spirit?', ref: 'Acts 2:38' },
      hearts: ['You went down into the water at once, cut to the heart.', 'You waited and went down last, after watching thousands go before you.'],
      conclusions: [
        'I was baptized in the name of Jesus Christ today, with about three thousand others.',
        'Peter, who denied him by the fire, stood up and preached him to the whole city.',
        'The promise is for me, and for all who are far off.',
      ],
      answers: { christ: ['God has made him both Lord and Christ.', 'Acts 2:36'], king: ['God raised him up to sit on David’s throne.', 'Acts 2:30–36'], notfar: ['“Repent, and be baptized… the promise is to you.”', 'Acts 2:38–39'], born: ['Born of water and the Spirit.', 'John 3:5; Acts 2:38'] },
      notes: [
        ['Pentecost (2:1)', 'The Feast of Weeks, fifty days after Passover, a harvest festival that brought pilgrims to Jerusalem from across the world.'],
        ['Wind and fire (2:2–3)', 'In the Scriptures God’s presence often came with wind and fire, as at Sinai (Exodus 19:18). In Hebrew and Greek the same word means wind and spirit.'],
        ['Every nation (2:9–11)', 'Luke’s list runs from Persia in the east to Rome in the west: a preview of the gospel going to the ends of the earth.'],
        ['Joel (2:17–21)', 'Peter quotes Joel 2:28–32: God’s Spirit poured out on all flesh, young and old, men and women, servants too.'],
        ['Where it happened', 'Acts says only “the house” and the gathered crowd. Many ritual immersion pools have been excavated near the Temple’s southern steps, where a crowd of thousands could have been baptized.'],
        ['The first church (2:42–47)', 'Teaching, fellowship, breaking bread and prayer, daily in the Temple and in homes.'],
      ],
      reflect: [
        'Peter denied Jesus to a servant girl, and now preaches him to thousands. What changed?',
        'Why does it matter that everyone heard in their own language?',
        'Which of the four things in 2:42 do you find hardest to keep?',
      ],
    },
    gate: {
      num: 'XIV', title: 'The Beautiful Gate', ref: 'Acts 3:1–4:4', passage: 'acts3', passages: [['acts3', '3:1', '3:19'], ['acts4', '4:1', '4:4']], place: 'temple', region: 'jerusalem', era: 'church',
      scene: 'The Temple courts, Acts 3', parallels: 'told only in Acts',
      question: { id: 'name', text: 'What is it about his name?', ref: 'Acts 3:16' },
      hearts: ['You gave the lame man a coin, as you always had.', 'You passed him by, as you always had.', 'You had nothing to give, and stopped anyway.'],
      conclusions: [
        '“Silver and gold have I none.” Peter gave him something better.',
        'The man I passed every day at the gate is walking, leaping and praising God.',
        'They were arrested for proclaiming the resurrection. I did nothing to stop it.',
      ],
      notes: [
        ['The ninth hour (3:1)', 'About three in the afternoon, the time of the afternoon sacrifice and prayer.'],
        ['The Beautiful Gate (3:2)', 'Not named elsewhere. Many identify it with the great bronze gate between the outer court and the inner courts, which Josephus describes as more splendid than the gold-plated gates.'],
        ['Gifts for the needy (3:2)', 'Giving alms was a central act of Jewish piety, and beggars sat where the devout passed.'],
        ['“In the name of Jesus Christ” (3:6)', 'Peter claims no power of his own (3:12). The healing is done in Jesus’ name, through faith in him (3:16).'],
        ['Solomon’s porch (3:11)', 'A colonnade along the eastern side of the Temple courts, where Jesus had walked (John 10:23) and the believers gathered (Acts 5:12).'],
      ],
      reflect: [
        'The man asked for money and received something else. What do you usually ask God for?',
        'Peter said, “Why do you fasten your eyes on us?” Why did he refuse the credit?',
        'What does the man’s leaping say about what had happened to him?',
      ],
    },
    trial: {
      num: 'XV', title: 'Before the Council', ref: 'Acts 4:5–37', passage: 'acts4', from: '4:5', place: 'temple', region: 'jerusalem', era: 'church',
      scene: 'The council, Acts 4', parallels: 'told only in Acts',
      question: { id: 'boldness', text: 'Where does boldness like theirs come from?', ref: 'Acts 4:13, 31' },
      hearts: ['You said nothing, as you had said nothing a year ago.', 'You asked, as Nicodemus once did, that the council hear before it judge.', 'You stood up and walked out with them.'],
      conclusions: [
        '“We can’t help telling the things which we saw and heard.” Neither can I.',
        'They recognized that these men had been with Jesus. I hope someone will say that of me.',
        'The place was shaken where we prayed. I was there.',
      ],
      notes: [
        ['Annas and Caiaphas (4:6)', 'Annas had been high priest years before and still held great influence; Caiaphas, his son-in-law, held the office.'],
        ['“Unlearned and ignorant” (4:13)', 'Meaning they had no formal training as scribes. The council noticed what training could not explain: they had been with Jesus.'],
        ['The cornerstone (4:11)', 'Peter quotes Psalm 118:22, the psalm the crowds sang when Jesus entered Jerusalem.'],
        ['“We can’t help telling” (4:20)', 'The heart of this whole game: what they saw and heard, they had to testify.'],
        ['The prayer (4:24–31)', 'They did not pray for safety, but for boldness, and that God would stretch out his hand to heal.'],
        ['Barnabas (4:36–37)', 'Joseph, a Levite from Cyprus, called “Son of Encouragement.” He will later bring Saul to the apostles (9:27).'],
      ],
      reflect: [
        'The council could not deny the miracle. Why did they still forbid them to speak?',
        'What did the believers ask for when they prayed? What would you have asked for?',
        'What is one thing you have “seen and heard” that you cannot help telling?',
      ],
    },
  });
  D.eraOrder.push('forty', 'pentecost', 'gate', 'trial');
  Object.assign(D.episodes, {
    seven: {
      num: 'XVI', title: 'The Seven', ref: 'Acts 6:1–7', passage: 'acts6', from: '6:1', to: '6:7', place: 'upperroom', region: 'jerusalem', era: 'church',
      scene: 'The daily distribution, Acts 6:1–7', parallels: 'told only in Acts',
      question: { id: 'serve', text: 'What does it mean to serve tables and the word?', ref: 'Acts 6:2–4' },
      hearts: ['You gave out bread by the order of the line, as you were told.', 'You asked each widow about her household and gave by need.', 'You went to the back of the line first, where the Greek-speaking widows stood.'],
      conclusions: [
        'The widows who spoke Greek were being missed. Now seven men will see that no one is.',
        'Stephen asked me to keep the lists. A scribe’s hand has found new work.',
        'Even priests are believing now. The word keeps growing.',
      ],
      notes: [
        ['Hellenists and Hebrews (6:1)', 'Both groups were Jewish believers. The Hellenists spoke Greek and often came from the cities of the Dispersion; the Hebrews spoke Aramaic and were mostly from the land itself.'],
        ['The daily service (6:1)', 'Widows without family had no income. The believers shared food daily so that no one lacked (4:34).'],
        ['The Seven (6:5)', 'All seven names are Greek. The church answered a complaint from Greek speakers by putting Greek speakers in charge.'],
        ['Laying on of hands (6:6)', 'A sign of blessing and of handing on a task, as Moses did for Joshua (Numbers 27:18–23).'],
        ['A great company of the priests (6:7)', 'Even members of the Temple priesthood were becoming believers.'],
      ],
      reflect: [
        'Who might be overlooked in your own community, and why?',
        'The apostles did not solve the problem themselves. Why was that wise?',
        'Is serving tables less spiritual than prayer and preaching?',
      ],
    },
    stephen: {
      num: 'XVII', title: 'Stephen', ref: 'Acts 6:8–8:4', passage: 'acts6', passages: [['acts6', '6:8', '6:15'], ['acts7', '7:1', '8:4']], place: 'freedmen', region: 'jerusalem', era: 'church',
      scene: 'Jerusalem, Acts 6–8', parallels: 'told only in Acts',
      question: { id: 'saul', text: 'Who is the young man named Saul?', ref: 'Acts 7:58' },
      hearts: ['You stood far off with the believers, praying.', 'You stood near the young man guarding the cloaks, and saw his face.', 'You could not watch.'],
      conclusions: [
        'Stephen saw the heavens opened. His last words were a prayer for the men who killed him.',
        'He died as Jesus died: “Receive my spirit,” and “Don’t hold this sin against them.”',
        'A young man named Saul watched it all and approved. The believers are scattering.',
      ],
      final: 'church',
      notes: [
        ['The Freedmen (6:9)', 'Descendants of Jews taken to Rome as slaves and later freed. A first-century Greek inscription found in Jerusalem in 1913 records a synagogue built for Jews from abroad; some connect it with this one.'],
        ['Cilicia (6:9)', 'The province whose chief city was Tarsus. Acts later tells us Saul was from Tarsus in Cilicia (21:39), though it does not say he was in this debate.'],
        ['Stephen’s speech (7:2–53)', 'The longest speech in Acts: a retelling of Israel’s story showing how God was with his people outside the land and outside any building, and how the prophets were rejected.'],
        ['The Son of Man standing (7:56)', 'Elsewhere he is pictured seated at God’s right hand. Here he stands, as if to welcome his witness.'],
        ['Echoes of the cross (7:59–60)', 'Stephen commits his spirit to Jesus and prays for his killers, as Jesus did (Luke 23:34, 46).'],
        ['Scattered (8:1–4)', 'Persecution did what the believers had not yet done: it sent them out into Judea and Samaria, as Jesus had said (1:8).'],
      ],
      reflect: [
        'Stephen was chosen to serve tables. How did that become the work of a witness?',
        'What did Stephen see that his judges could not?',
        'How could a man pray for the people killing him?',
      ],
    },
  });
  D.eraOrder.push('seven', 'stephen');
  Object.assign(D.episodes, {
    samaria: {
      num: 'XVIII', title: 'Philip in Samaria', ref: 'Acts 8:4–25', passage: 'acts8', from: '8:5', to: '8:25', place: 'samaria', region: 'land', era: 'spread',
      scene: 'The city of Samaria, Acts 8', parallels: 'told only in Acts',
      question: { id: 'sorcery', text: 'What is the difference between power and the gift of God?', ref: 'Acts 8:20' },
      hearts: ['You ate at a Samaritan table for the first time in your life.', 'You hesitated at the door, then went in.', 'You let the woman from Sychar lead you in by the sleeve.'],
      conclusions: [
        'Samaritans are being baptized in the name of Jesus. Jews and Samaritans eat at one table.',
        'Simon the sorcerer tried to buy the gift of God. Peter told him his heart was not right.',
        'Persecution scattered us, and the word went with us, as he said: “Judea and Samaria.”',
      ],
      notes: [
        ['Samaria (8:5)', 'Jews and Samaritans shared the five books of Moses but had been bitterly divided for centuries over where God should be worshiped (John 4:20).'],
        ['Philip (8:5)', 'Not the apostle, but one of the Seven chosen to serve tables (6:5). Later called “Philip the evangelist” (21:8).'],
        ['Simon (8:9–24)', 'Later Christian writers made him the father of heresies, but Acts says only that he practiced sorcery, believed, was baptized, and tried to buy spiritual power. The word “simony,” the buying of church office, comes from his name.'],
        ['Peter and John (8:14–17)', 'The apostles came from Jerusalem, so that the Samaritan believers were joined to the same church, not a rival one.'],
        ['John in Samaria', 'The same John once wanted to call down fire on a Samaritan village (Luke 9:54). Now he prays for Samaritans to receive the Spirit.'],
      ],
      reflect: [
        'What walls did the gospel have to cross to reach Samaria?',
        'Simon believed and was baptized, yet his heart was not right. How can both be true?',
        'Who are the “Samaritans” you were raised to avoid?',
      ],
    },
    desert: {
      num: 'XIX', title: 'The Desert Road', ref: 'Acts 8:26–40', passage: 'acts8', from: '8:26', to: '8:40', place: 'desertroad', region: 'land', era: 'spread',
      scene: 'The road from Jerusalem to Gaza, Acts 8', parallels: 'told only in Acts',
      question: { id: 'isaiah', text: 'Who is the prophet talking about?', ref: 'Acts 8:34' },
      hearts: ['“Nothing,” you said, before Philip could.', 'You thought of the Law that kept men like him from the assembly, and said nothing.', 'You remembered Isaiah’s promise to the eunuch who holds fast to the covenant.'],
      conclusions: [
        'An official of the queen of Ethiopia was baptized in a desert pool, and went on his way rejoicing.',
        '“He was led as a sheep to the slaughter.” I watched it happen, and never knew Isaiah had written it.',
        'Philip vanished, and the eunuch did not need him any more. He had what he came for.',
      ],
      notes: [
        ['Ethiopia and the Candace (8:27)', 'Greeks called the kingdom of Kush, on the Nile south of Egypt, “Ethiopia.” Its queen mother bore the title Kandake.'],
        ['A eunuch at the Temple', 'The Law kept eunuchs from the assembly of the Lord (Deuteronomy 23:1). Isaiah promised that eunuchs who hold fast to God’s covenant would have a place in his house and a name better than sons and daughters (Isaiah 56:3–5).'],
        ['Isaiah 53 (8:32–33)', 'He was reading the Greek translation of Isaiah, which is why the wording differs slightly from Hebrew-based translations.'],
        ['Verse 37', 'The confession “I believe that Jesus Christ is the Son of God” appears only in later manuscripts. The WEB, like most modern translations, leaves it in a footnote.'],
        ['Azotus (8:40)', 'Old Ashdod, one of the five Philistine cities, on the coastal road north toward Caesarea, where Philip later lived (21:8).'],
      ],
      reflect: [
        'The eunuch had gone all the way to Jerusalem to worship. What do you think he found there, and what did he find on the road?',
        'Philip began “from this Scripture.” Where would you begin?',
        'Why might Luke want this story right before Saul’s?',
      ],
    },
    damascus: {
      num: 'XX', title: 'The Road to Damascus', ref: 'Acts 9:1–31', passage: 'acts9', passages: [['acts9', '9:1', '9:9'], ['acts9b', '9:10', '9:22'], ['acts9', '9:17', '9:27']], place: 'damascus', region: 'land', era: 'spread',
      scene: 'Damascus, Acts 9', parallels: 'Acts 22:3–16; 26:9–18; Galatians 1:13–17',
      question: { id: 'chosen', text: 'How can the man who guarded the cloaks be a chosen vessel?', ref: 'Acts 9:15' },
      hearts: ['You told Ananias you were afraid too.', 'You went with Ananias without a word.', 'You prayed for Saul, not knowing he was praying too.'],
      conclusions: [
        'Saul of Tarsus is blind and praying on Straight Street. Ananias called him “Brother.”',
        '“I am Jesus, whom you are persecuting.” To persecute the believers was to persecute him.',
        'The man who guarded the cloaks at Stephen’s death is preaching that Jesus is the Son of God.',
      ],
      answers: { saul: ['Saul of Tarsus, a Pharisee, who met the risen Jesus on the road and became his chosen vessel.', 'Acts 9:15'] },
      notes: [
        ['The Way (9:2)', 'One of the earliest names for the believers: those who followed “the Way” (also 19:9, 22:4, 24:14).'],
        ['Damascus', 'An ancient city about 220 km north of Jerusalem with a large Jewish community. A long colonnaded Roman street, the “Straight Street,” still crosses the old city.'],
        ['Three tellings', 'Luke tells Saul’s conversion three times (Acts 9, 22, 26). Paul himself mentions it in Galatians 1:15–17.'],
        ['“Why do you persecute me?” (9:4)', 'Jesus does not say “my followers.” He so identifies with his people that what is done to them is done to him.'],
        ['Ananias (9:10–17)', 'An ordinary disciple, known only from this story. His first words to his enemy were “Brother Saul.”'],
        ['Barnabas (9:26–27)', 'When the Jerusalem believers were afraid of Saul, the Son of Encouragement vouched for him.'],
      ],
      reflect: [
        'Ananias was afraid, and said so. What did he do with his fear?',
        'What did Saul lose on the road, and what did he gain?',
        'Is there someone you have written off as beyond change?',
      ],
    },
  });
  D.eraOrder.push('samaria', 'desert', 'damascus');
  Object.assign(D.episodes, {
    tabitha: {
      num: 'XXI', title: 'Tabitha', ref: 'Acts 9:32–43', passage: 'acts9c', place: 'joppa', region: 'land', era: 'spread',
      scene: 'Joppa, Acts 9', parallels: 'compare Mark 5:35–43',
      question: { id: 'mercy', text: 'What does a life full of good works and acts of mercy look like?', ref: 'Acts 9:36' },
      hearts: ['You sat with the widows and let them show you what she had made.', 'You asked them about Tabitha.', 'You went down to the gate to watch the road for Peter.'],
      conclusions: [
        'The widows showed Peter the coats Tabitha made them. Then he put everyone out and prayed.',
        '“Tabitha, get up!” She opened her eyes and sat up.',
        'Peter is staying with a tanner by the sea. He is already crossing lines I was taught never to cross.',
      ],
      notes: [
        ['Tabitha and Dorcas (9:36)', 'Tabitha is Aramaic and Dorcas is Greek; both mean “gazelle.” She is the only woman in the New Testament called a disciple with the feminine form of the word.'],
        ['Washed and laid out (9:37)', 'The body was washed for burial and laid in an upper room. Burial normally followed quickly, which is why they sent for Peter at once.'],
        ['“Tabitha, get up!” (9:40)', 'Very close to Jesus’ words to Jairus’s daughter, “Talitha cumi” (Mark 5:41). Peter had been in that room (Mark 5:37), and like Jesus he sent everyone out before he spoke.'],
        ['Simon the tanner (9:43)', 'Tanners worked with the hides of dead animals, and their work was smelly and ritually unclean. Later Jewish law kept tanneries well away from towns. Acts says his house was by the sea.'],
        ['Joppa', 'Jerusalem’s old port, where Jonah once boarded a ship to flee from a mission to Gentiles (Jonah 1:3).'],
      ],
      reflect: [
        'The widows did not describe Tabitha. They held up what she had made. What would people hold up for you?',
        'Why might Peter have sent everyone out of the room?',
        'Jonah ran from Joppa to avoid the Gentiles. What will happen to Peter here?',
      ],
    },
    cornelius: {
      num: 'XXII', title: 'Peter and Cornelius', ref: 'Acts 10:1–11:18', passage: 'acts10', passages: [['acts10'], ['acts11', '11:1', '11:18']], place: 'joppa', region: 'land', era: 'spread',
      scene: 'Joppa and Caesarea, Acts 10', parallels: 'Acts 11:1–18; 15:7–11',
      question: { id: 'nations', text: 'If God shows no favoritism, who else have I been calling unclean?', ref: 'Acts 10:28, 34' },
      hearts: ['You stepped over the threshold of a Gentile’s house for the first time, behind Peter.', 'You waited in the doorway until the Spirit fell, and then went in.', 'You went in ahead of Peter, so that he would not be the only one.'],
      conclusions: [
        '“What God has cleansed, you must not call unclean.” The vision was not about food alone.',
        'The Holy Spirit fell on Gentiles before anyone had laid a hand on them, as on us at the beginning.',
        'A Roman centurion and his household were baptized in the name of Jesus Christ. God shows no favoritism.',
      ],
      answers: { sinners: ['God shows no favoritism. What God has cleansed, you must not call unclean.', 'Acts 10:15, 34'] },
      notes: [
        ['Cornelius (10:1–2)', 'A centurion commanded about eighty men. He was a “God-fearer”: a Gentile who worshiped the God of Israel, prayed and gave alms, but had not become a Jew.'],
        ['The Italian Regiment (10:1)', 'An auxiliary cohort of Roman citizens. Inscriptions show such a unit stationed in Syria in the first century.'],
        ['The sheet (10:11–16)', 'The Law divided animals into clean and unclean (Leviticus 11). The vision repeated three times, as Peter had once denied Jesus three times and been asked three times, “Do you love me?” (John 21:15–17).'],
        ['“Unlawful” (10:28)', 'The Law of Moses did not forbid all contact with Gentiles, but many Jews of the time avoided entering Gentile homes or eating with Gentiles, because of food laws and idolatry.'],
        ['The Spirit first (10:44)', 'This time the Spirit came before baptism and before any laying on of hands, so that no one could doubt that God himself had accepted them.'],
        ['Caesarea', 'Herod the Great’s harbor city and the seat of the Roman governors of Judea: the most Roman city in the land.'],
      ],
      reflect: [
        'Peter needed a vision three times before he understood. What would it take to change your mind about someone?',
        'Cornelius was already devout and generous. What did he still need?',
        'Why did God pour out the Spirit before Peter had finished speaking?',
      ],
    },
  });
  D.eraOrder.push('tabitha', 'cornelius');
  Object.assign(D.episodes, {
    antioch: {
      num: 'XXIII', title: 'Antioch', ref: 'Acts 11:19–30', passage: 'acts11', from: '11:19', to: '11:30', place: 'antioch', region: 'east', era: 'spread',
      scene: 'Antioch on the Orontes, Acts 11', parallels: 'told only in Acts',
      question: { id: 'christian', text: 'What does it mean to be called by his name?', ref: 'Acts 11:26' },
      hearts: ['You ate at the Greeks’ table, whatever was on it.', 'You ate their bread and nothing else.', 'You thanked them, and ate later, alone.'],
      conclusions: [
        'Men from Cyprus and Cyrene told Greeks about the Lord Jesus, and a great number believed.',
        'Barnabas went to Tarsus and came back with Saul. For a whole year they taught together.',
        'In Antioch they call us Christians: the people of the Christ. The name is meant as a label. We are wearing it.',
      ],
      answers: { nations: ['The Greeks of Antioch, who believed and turned to the Lord.', 'Acts 11:20–21'] },
      notes: [
        ['Antioch (11:19)', 'Capital of the Roman province of Syria and one of the three greatest cities of the empire, with a large and long-established Jewish community.'],
        ['Hellenists (11:20)', 'Here it means Greek-speaking Gentiles. Until now the scattered believers had spoken “to Jews only” (11:19).'],
        ['Barnabas (11:22–24)', 'Sent by Jerusalem to look into the news, “he was glad.” Acts calls him a good man, full of the Holy Spirit and of faith.'],
        ['Tarsus (11:25)', 'Saul had been sent home there for his safety (9:30). Barnabas had to go looking for him.'],
        ['“Christians” (11:26)', 'Christianoi, “Christ’s people.” The ending is a Latin-style one used for a leader’s followers, and the name was probably given by outsiders.'],
        ['The famine (11:28)', 'Ancient historians record food shortages in several provinces during the reign of Claudius (AD 41–54).'],
      ],
      reflect: [
        'The first preachers to Greeks are not named. Why might that be fitting?',
        'Barnabas “saw the grace of God” and was glad. What would he have seen?',
        'The church at Antioch sent help to Jerusalem. What does that say about the new family?',
      ],
    },
    rhoda: {
      num: 'XXIV', title: 'Rhoda at the Gate', ref: 'Acts 12:1–17', passage: 'acts12', place: 'upperroom', region: 'jerusalem', era: 'spread',
      scene: 'The house of Mary, mother of John Mark, Acts 12', parallels: 'told only in Acts',
      question: { id: 'prayer', text: 'Why were they so astonished when their prayer was answered?', ref: 'Acts 12:15–16' },
      hearts: ['You believed Rhoda and ran with her to the gate.', 'You said what the others said: it must be his angel.', 'You kept praying, and did not look up until the gate was opened.'],
      conclusions: [
        'We prayed all night for Peter, and when he knocked we told the girl she was mad.',
        'The chains fell from his hands and the iron gate opened by itself.',
        'Herod killed James with the sword. Peter is alive. I do not know why, and I thank God for both men.',
      ],
      notes: [
        ['Herod the king (12:1)', 'Herod Agrippa I, grandson of Herod the Great, who ruled Judea as king from AD 41 to 44.'],
        ['James (12:2)', 'James son of Zebedee, the brother of John, one of the three closest to Jesus, and the first of the Twelve to die for him.'],
        ['Sixteen soldiers (12:4)', 'Four squads of four, taking the watches of the night in turn.'],
        ['Mary’s house (12:12)', 'Large enough to have a gate and a serving girl, and to hold many people praying. Her son John Mark would travel with Barnabas and Saul (12:25).'],
        ['Rhoda (12:13)', 'Her name means “Rose.” A household servant, and the first to recognize that the prayer had been answered.'],
        ['“His angel” (12:15)', 'Many Jews of the time believed that a person had a guardian angel who could resemble them.'],
        ['James (12:17)', 'Not the apostle who had died, but James the brother of the Lord, who led the Jerusalem church.'],
      ],
      reflect: [
        'Why do you think God rescued Peter but not James?',
        'They were praying for Peter, and did not believe he was at the door. Where do you see yourself in that?',
        'Who would be the “Rhoda” in your church: the one nobody believes?',
      ],
    },
  });
  D.eraOrder.push('antioch', 'rhoda');
  Object.assign(D.episodes, {
    cyprus: {
      num: 'XXV', title: 'Cyprus', ref: 'Acts 13:1–13', passage: 'acts13', place: 'antioch', region: 'east', era: 'spread',
      scene: 'Antioch, the sea, and Paphos, Acts 13', parallels: 'told only in Acts',
      question: { id: 'paul', text: 'Why does Saul now go by the name Paul?', ref: 'Acts 13:9' },
      hearts: ['You told the governor what you had seen with your own eyes.', 'You let Paul answer for both of you.', 'You handed the governor your scroll and let him read.'],
      conclusions: [
        'The Spirit said, “Separate Barnabas and Saul for me,” and the church laid hands on them and let them go.',
        'A Roman proconsul believed, astonished at the teaching of the Lord.',
        'Saul, who is also called Paul. The name changes as the road turns toward the nations.',
      ],
      notes: [
        ['Prophets and teachers (13:1)', 'A mixed company: Simeon called Niger (Latin for “black”), Lucius from Cyrene in Africa, Manaen who was raised with Herod Antipas, a Levite from Cyprus, and a Pharisee from Tarsus.'],
        ['Seleucia (13:4)', 'Antioch’s seaport, about 25 km away at the mouth of the Orontes.'],
        ['Cyprus', 'Barnabas’s home (4:36). Salamis was its chief city in the east; Paphos, the Roman capital, lay about 150 km away on the west coast.'],
        ['The proconsul (13:7)', 'Cyprus was a senatorial province, ruled by a proconsul: Luke uses exactly the right title. An inscription from Cyprus names a proconsul Paulus; whether he is this man is debated.'],
        ['“Saul, who is also called Paul” (13:9)', 'Paulus was his Roman name. As a Roman citizen he probably bore both from birth. From here on, as the mission turns to the Gentile world, Luke calls him Paul.'],
        ['Blind for a season (13:11)', 'The persecutor who was once led by the hand into Damascus now pronounces blindness on another man, but only “for a season.”'],
        ['John Mark (13:13)', 'He turned back at Perga. Later Paul would refuse to take him again, and Paul and Barnabas would part over it (15:37–39).'],
      ],
      reflect: [
        'The church at Antioch gave away its two best teachers. What does that cost a church?',
        'A Roman governor wanted to hear the word of God. Who opposed it, and why?',
        'What is the difference between Paul’s power and Elymas’s sorcery?',
      ],
    },
  });
  D.eraOrder.push('cyprus');
  Object.assign(D.episodes, {
    pisidia: {
      num: 'XXVI', title: 'Antioch of Pisidia', ref: 'Acts 13:14–52', passage: 'acts13b', place: 'pisidia', region: 'east', era: 'spread',
      scene: 'Antioch of Pisidia, Acts 13', parallels: 'told only in Acts',
      question: { id: 'light', text: 'What does it mean to be a light for the Gentiles?', ref: 'Acts 13:47' },
      hearts: ['You rejoiced with the Gentiles who had begged to hear more.', 'You grieved for your own people, who would not.', 'You did both, and could not have said which was stronger.'],
      conclusions: [
        'Paul told the story of Israel from Egypt to David to Jesus, and said that through him everyone who believes is justified.',
        'The Gentiles begged to hear it again, and the next Sabbath almost the whole city came.',
        'They were thrown out of the city, shook the dust off their feet, and were filled with joy.',
      ],
      notes: [
        ['Antioch of Pisidia (13:14)', 'A Roman colony founded by Augustus for veteran soldiers, high on the Anatolian plateau. Not the same city as Antioch in Syria.'],
        ['A word of exhortation (13:15)', 'After the readings from the Law and the Prophets, a visiting teacher could be invited to speak.'],
        ['Those who fear God (13:16)', 'Gentiles who worshiped Israel’s God and attended the synagogue without becoming Jews, like Cornelius.'],
        ['Justified (13:39)', 'Paul’s first recorded use in Acts of the language he would develop in his letters to the Galatians and the Romans.'],
        ['A light for the Gentiles (13:47)', 'Isaiah 49:6, spoken of the Servant of the Lord. Simeon had spoken of the infant Jesus as a light for the nations (Luke 2:32).'],
        ['Shaking off the dust (13:51)', 'Jesus told his disciples to do this when a town rejected them (Luke 9:5).'],
      ],
      reflect: [
        'Why do you think the Gentiles were so eager to hear Paul again?',
        'Paul turned to the Gentiles, but in the next city he went to the synagogue first again (14:1). Why?',
        'How can people be thrown out of a city and be filled with joy?',
      ],
    },
    lystra: {
      num: 'XXVII', title: 'Lystra', ref: 'Acts 14', passage: 'acts14', place: 'lystra', region: 'east', era: 'spread',
      scene: 'Iconium, Lystra and home, Acts 14', parallels: 'compare Acts 3:1–10; 2 Timothy 3:11',
      question: { id: 'afflictions', text: 'Why must we enter the Kingdom of God through many afflictions?', ref: 'Acts 14:22' },
      hearts: ['You knelt in the dust beside him and prayed.', 'You ran for water.', 'You stood with the disciples in a ring around him, and waited.'],
      conclusions: [
        'A man who had never walked leaped up and walked. Within the hour the crowd wanted to worship Paul and Barnabas as gods.',
        'They stoned Paul and dragged him out of the city. He got up and walked back in.',
        'God opened a door of faith to the nations. I went through it with them.',
      ],
      answers: { light: ['God opened a door of faith to the nations.', 'Acts 14:27'] },
      notes: [
        ['Iconium (14:1–6)', 'Modern Konya. The city split over the message, and the apostles fled before they could be stoned.'],
        ['The man who never walked (14:8–10)', 'Luke tells it in nearly the same words as Peter’s healing at the Beautiful Gate (3:1–10): the same Lord, at work through both apostles.'],
        ['Zeus and Hermes (14:11–13)', 'The WEB uses their Latin names, Jupiter and Mercury. The poet Ovid tells a legend, set in neighboring Phrygia, of these two gods visiting in human form and of the old couple who alone welcomed them.'],
        ['Tearing their clothes (14:14)', 'The Jewish sign of horror at blasphemy, the same act as the high priest’s at Jesus’ trial (Mark 14:63).'],
        ['Stoned and left for dead (14:19)', 'Paul later listed it among his sufferings: “Once I was stoned” (2 Corinthians 11:25). He reminded Timothy, who was from Lystra, of what happened there (2 Timothy 3:11).'],
        ['Elders in every assembly (14:23)', 'On the way home they went back through the cities that had driven them out, to strengthen the new believers and appoint leaders.'],
      ],
      reflect: [
        'The crowd moved from worshiping Paul to stoning him. What does that say about crowds?',
        'Why would Paul walk back into the city that had just stoned him?',
        'What “door of faith” has been opened to you?',
      ],
    },
  });
  D.eraOrder.push('pisidia', 'lystra');
  Object.assign(D.episodes, {
    jcouncil: {
      num: 'XXVIII', title: 'The Council at Jerusalem', ref: 'Acts 15', passage: 'acts15', place: 'upperroom', region: 'jerusalem', era: 'spread',
      scene: 'Antioch and Jerusalem, Acts 15', parallels: 'compare Galatians 2:1–14',
      question: { id: 'grace', text: 'Are we really saved through grace, just as they are?', ref: 'Acts 15:11' },
      hearts: ['You stood with the believing Pharisees: the Law is God’s gift, not a burden.', 'You stood with Peter: saved through grace, just as they are.', 'You listened, and let the apostles and elders decide.'],
      conclusions: [
        'Peter said God made no distinction between us and the Gentiles, cleansing their hearts by faith.',
        'James said we should not trouble the Gentiles who turn to God. The letter was read at Antioch, and they rejoiced.',
        'Paul and Barnabas could not agree about John Mark, and they parted. Even good men part.',
      ],
      notes: [
        ['Circumcision (15:1)', 'The sign of God’s covenant with Abraham (Genesis 17). The question was whether Gentile believers had to become Jews to belong to the people of God.'],
        ['Believing Pharisees (15:5)', 'Pharisees who had become disciples of Jesus, and who still held the Law in high honor, as Paul himself did (Acts 23:6).'],
        ['James (15:13)', 'The brother of the Lord, who led the church in Jerusalem. He quoted Amos 9:11–12: the Gentiles who are called by God’s name.'],
        ['The four requests (15:20, 29)', 'Avoid food offered to idols, sexual immorality, what is strangled, and blood. Several echo what the Law asked of foreigners living among Israel (Leviticus 17–18), and they made shared meals possible.'],
        ['A yoke (15:10)', 'Peter did not call the Law evil, but asked why Gentiles should carry what no one had carried perfectly.'],
        ['The parting (15:36–40)', 'Paul and Barnabas disagreed sharply over Mark. Years later Paul would write that Mark was useful to him for ministry (2 Timothy 4:11).'],
      ],
      reflect: [
        'What does it cost to welcome people without asking them to become like you first?',
        'How did the council settle a deep disagreement? What can we learn from how they did it?',
        'Paul and Barnabas parted. Was that a failure, or a way the work spread?',
      ],
    },
    lydia: {
      num: 'XXIX', title: 'Lydia', ref: 'Acts 16:1–15', passage: 'acts16', from: '16:1', to: '16:15', place: 'philippi', region: 'aegean', era: 'spread',
      scene: 'Troas and Philippi, Acts 16', parallels: 'told only in Acts',
      question: { id: 'opened', text: 'What does it mean that the Lord opened her heart?', ref: 'Acts 16:14' },
      hearts: ['You accepted Lydia’s welcome at once.', 'You looked to Paul before you answered.', 'You hesitated at a Gentile woman’s door, and then went in.'],
      conclusions: [
        'A man of Macedonia called us in a vision, and we crossed the sea into Europe.',
        'There was no synagogue in Philippi, only a place of prayer by the river, and a few women.',
        'The Lord opened Lydia’s heart. She and her household were baptized, and her house became the church.',
      ],
      notes: [
        ['Timothy (16:1–2)', 'The son of a Jewish believer and a Greek father, from Lystra. Paul’s letters call him his true child in the faith (1 Timothy 1:2).'],
        ['Forbidden by the Spirit (16:6–7)', 'Twice the way was closed, into Asia and into Bithynia, before the way into Macedonia opened.'],
        ['“We” (16:10)', 'Here Luke’s account changes from “they” to “we”: most readers take it that the author himself joined Paul at Troas.'],
        ['Philippi (16:12)', 'A Roman colony, governed like a piece of Rome itself. There seems to have been no synagogue; by later Jewish custom one needed ten Jewish men.'],
        ['Lydia (16:14)', 'From Thyatira, a city known for purple dye. Selling purple cloth was a trade of some wealth. She already worshiped God.'],
        ['Her household (16:15)', 'Ancient households included family, servants and workers. Lydia’s house became the meeting place of the church (16:40).'],
      ],
      reflect: [
        'The Spirit closed two doors before opening a third. Has that happened to you?',
        'The first church in Europe began with a few women praying by a river. What does that say?',
        'Lydia opened her house. What would that look like for you?',
      ],
    },
    jailer: {
      num: 'XXX', title: 'Midnight in Philippi', ref: 'Acts 16:16–40', passage: 'acts16', from: '16:16', to: '16:40', place: 'philippi', region: 'aegean', era: 'spread',
      scene: 'The prison at Philippi, Acts 16', parallels: 'compare Acts 12:6–11',
      question: { id: 'saved', text: 'What must I do to be saved?', ref: 'Acts 16:30' },
      hearts: ['You brought bread and water to the prison gate, as friends of prisoners did.', 'You stayed at Lydia’s house and prayed through the night.', 'You walked the streets outside the prison, unable to sleep.'],
      conclusions: [
        'A slave girl was freed from a spirit, and her masters had Paul and Silas beaten and thrown into prison.',
        'At midnight they were singing hymns. Then the earth shook, and every door opened.',
        'The jailer asked what he must do to be saved, and by morning his whole household had believed.',
      ],
      answers: { afflictions: ['Through many afflictions: and at midnight in the stocks, Paul and Silas were singing.', 'Acts 14:22; 16:25'] },
      notes: [
        ['A spirit of divination (16:16)', 'Literally “a spirit of Python,” the serpent linked with the oracle of Apollo at Delphi. Her masters made money from her fortune telling.'],
        ['Beaten with rods (16:22)', 'A Roman punishment carried out by the magistrates’ attendants. Paul later wrote that three times he was beaten with rods (2 Corinthians 11:25).'],
        ['The inner prison (16:24)', 'The darkest, most secure cell; the stocks held the feet apart for long, painful hours.'],
        ['Midnight hymns (16:25)', 'Paul would later write to this church from another prison: “Rejoice in the Lord always” (Philippians 4:4).'],
        ['The jailer (16:27)', 'A guard who lost his prisoners could face their penalty himself. That is why he despaired.'],
        ['Romans (16:37)', 'Beating a Roman citizen without trial was illegal. Paul’s protest protected the young church after he left.'],
      ],
      reflect: [
        'What do you think the other prisoners thought, hearing hymns at midnight?',
        'The jailer washed their wounds, and they washed him in baptism. What do you notice?',
        'Three people were changed in Philippi: a merchant, a slave girl, a jailer. What do they have in common?',
      ],
    },
  });
  D.eraOrder.push('jcouncil', 'lydia', 'jailer');
  Object.assign(D.episodes, {
    berea: {
      num: 'XXXI', title: 'Thessalonica and Berea', ref: 'Acts 17:1–15', passage: 'acts17', from: '17:1', to: '17:15', place: 'thessalonica', region: 'aegean', era: 'spread',
      scene: 'Thessalonica and Berea, Acts 17', parallels: 'compare 1 Thessalonians 1–3',
      question: { id: 'examine', text: 'Do I examine the Scriptures to see whether these things are so?', ref: 'Acts 17:11' },
      hearts: ['You stood at Jason’s door with him and faced the crowd.', 'You hid Paul and Silas in the back of the house.', 'You slipped out the back to warn the brothers.'],
      conclusions: [
        'In Thessalonica they said we had turned the world upside down, and that we say there is another king, Jesus.',
        'In Berea they did what I was trained to do: they examined the Scriptures daily to see whether these things were so.',
        'The word goes on even when Paul is sent away by night. It does not depend on him.',
      ],
      notes: [
        ['The Via Egnatia (17:1)', 'The great Roman road across Macedonia, from the Adriatic to Thrace. Amphipolis, Apollonia and Thessalonica lay along it.'],
        ['The rulers of the city (17:6)', 'Luke calls them politarchs, an unusual title. Inscriptions found in Thessalonica use exactly this word for its magistrates.'],
        ['Another king (17:7)', 'The charge was treason against Caesar: the same charge written over the cross (Mark 15:26).'],
        ['Jason (17:5–9)', 'Paul’s host, who paid a security for the believers’ good behavior.'],
        ['More noble (17:11)', 'The Bereans did not believe Paul because he was Paul; they checked what he said against the Scriptures, every day.'],
        ['Letters to Thessalonica', 'Soon afterward Paul wrote 1 and 2 Thessalonians, among the earliest of his letters, longing to see the young church he had to leave so quickly.'],
      ],
      reflect: [
        '“Turned the world upside down.” Was the accusation true?',
        'What would it look like for you to “examine the Scriptures daily”?',
        'Why might Luke praise the Bereans for checking Paul’s message?',
      ],
    },
    athens: {
      num: 'XXXII', title: 'The Unknown God', ref: 'Acts 17:16–34', passage: 'acts17', from: '17:16', to: '17:34', place: 'athens', region: 'aegean', era: 'spread',
      scene: 'Athens, Acts 17', parallels: 'compare Romans 1:18–25',
      question: { id: 'unknown', text: 'What did the Athenians already know about God, and what did they not know?', ref: 'Acts 17:23' },
      hearts: ['You turned away from the statues and the altars.', 'You walked with Paul and read the inscriptions with him.', 'You watched the people instead of the statues.'],
      conclusions: [
        'Paul found an altar to an unknown God, and told the Athenians who he is.',
        '“He is not far from each one of us.” Not from a philosopher on the Areopagus, and not from me.',
        'When he spoke of the resurrection, some mocked. A few believed: a judge of the Areopagus, a woman named Damaris, and others.',
      ],
      notes: [
        ['Athens (17:16)', 'No longer powerful, but still one of the most famous seats of learning in the world, crowded with temples, altars and statues.'],
        ['Epicureans and Stoics (17:18)', 'Two great schools of philosophy. Epicureans sought a quiet life free of fear, and thought the gods distant; Stoics saw divine reason running through all things.'],
        ['The Areopagus (17:19)', 'The “hill of Ares,” and also the ancient council that met there and still oversaw matters of religion and teaching in the city.'],
        ['An unknown god (17:23)', 'Ancient writers mention altars in and around Athens dedicated to unknown or unnamed gods.'],
        ['Your own poets (17:28)', '“We are also his offspring” comes from the Greek poet Aratus. Paul met the Athenians on their own ground before he spoke of Jesus.'],
        ['The resurrection (17:31–32)', 'Many Greeks hoped the soul would escape the body. A body raised from the dead seemed foolish to them, as Paul later wrote (1 Corinthians 1:23).'],
      ],
      reflect: [
        'Paul began with what the Athenians already knew. Where would you begin with your friends?',
        'What “unknown gods” does our own culture build altars to?',
        'Only a few believed. Was Athens a failure?',
      ],
    },
  });
  D.eraOrder.push('berea', 'athens');
  Object.assign(D.episodes, {
    corinth: {
      num: 'XXXIII', title: 'Corinth', ref: 'Acts 18:1–18', passage: 'acts18', place: 'corinth', region: 'aegean', era: 'spread',
      scene: 'Corinth, Acts 18', parallels: 'compare 1 Corinthians 1–2; 2:1–5',
      question: { id: 'afraid', text: '“Don’t be afraid… for I am with you.” What did that promise mean for Paul, and what does it mean for me?', ref: 'Acts 18:9–10' },
      hearts: ['You pushed through the crowd toward Sosthenes.', 'You stood back, sick at heart, and did nothing.', 'You prayed for him, a ruler of the synagogue who had stood against you.'],
      conclusions: [
        'Paul made tents with Priscilla and Aquila, and reasoned in the synagogue every Sabbath.',
        'The Lord told him in the night not to be afraid, for he had many people in this city. He stayed a year and a half.',
        'The proconsul Gallio would not judge “questions about words and names.” The Roman courts let the Way alone.',
      ],
      notes: [
        ['Corinth (18:1)', 'Destroyed by Rome in 146 BC and refounded by Julius Caesar as a Roman colony: rich, crowded, and proud, the capital of Achaia, with a port on each sea.'],
        ['Claudius’s order (18:2)', 'The Roman historian Suetonius says Claudius expelled the Jews from Rome after disturbances over “Chrestus,” probably around AD 49.'],
        ['Tentmakers (18:3)', 'Paul worked with his hands so that he would not be a burden to the churches (1 Thessalonians 2:9; 1 Corinthians 9).'],
        ['Crispus (18:8)', 'A ruler of the synagogue, baptized by Paul himself (1 Corinthians 1:14).'],
        ['Gallio (18:12)', 'Brother of the philosopher Seneca. An inscription found at Delphi dates his time as proconsul to about AD 51–52, one of the firmest dates in Paul’s life.'],
        ['The judgment seat (18:12)', 'The Greek word is bema. A raised stone speaker’s platform has been excavated in the forum at Corinth, and is often identified with this one.'],
        ['Sosthenes (18:17)', 'Paul’s later letter to Corinth is sent from Paul “and our brother Sosthenes” (1 Corinthians 1:1). It may be the same man.'],
        ['A vow (18:18)', 'Probably a vow like the Nazirite vow (Numbers 6), ended by cutting the hair.'],
      ],
      reflect: [
        'Paul came to Corinth after Athens “in weakness, in fear, and in much trembling” (1 Corinthians 2:3). Why might he have needed that vision?',
        'Priscilla and Aquila made room for Paul in their work and their home. Who has done that for you?',
        'Sosthenes may have gone from accuser to brother. What would that take?',
      ],
    },
  });
  D.eraOrder.push('corinth');
  Object.assign(D.episodes, {
    artemis: {
      num: 'XXXIV', title: 'Great Is Artemis', ref: 'Acts 18:24–19:41', passage: 'acts19', place: 'ephesus', region: 'aegean', era: 'spread',
      scene: 'Ephesus, Acts 19', parallels: 'compare 1 Corinthians 15:32; 16:8–9',
      question: { id: 'name', text: 'What is the difference between using the name of Jesus and knowing him?', ref: 'Acts 19:13–15' },
      hearts: ['You stayed hidden in the crowd and prayed.', 'You pushed toward Gaius and Aristarchus in the middle of the theater.', 'You helped the disciples hold Paul back at the gate.'],
      conclusions: [
        'Priscilla and Aquila took Apollos aside and taught him the way of God more accurately. The teacher was taught.',
        'Those who practiced magic burned their books in the sight of all: fifty thousand pieces of silver.',
        'For two hours a city shouted “Great is Artemis!” A town clerk quieted them, and no one was harmed.',
      ],
      notes: [
        ['Apollos (18:24)', 'A learned Jew from Alexandria in Egypt, a great center of learning. Paul later wrote, “I planted. Apollos watered. But God gave the increase” (1 Corinthians 3:6).'],
        ['Priscilla and Aquila (18:26)', 'Luke often names Priscilla first. Here a woman and her husband take a gifted preacher aside and teach him privately.'],
        ['The school of Tyrannus (19:9)', 'A lecture hall. One ancient manuscript adds that Paul taught there from about 11 in the morning to 4 in the afternoon, the hot hours when others rested.'],
        ['Fifty thousand pieces of silver (19:19)', 'Probably drachmas: about a day’s wage each, so the books were worth the wages of a laborer for some 160 years.'],
        ['Artemis of the Ephesians (19:24)', 'Her temple at Ephesus was one of the Seven Wonders of the ancient world, and a great center of pilgrimage, banking and trade.'],
        ['The theater (19:29)', 'Its ruins still stand at the foot of Mount Pion and held around 24,000 people.'],
        ['The Asiarchs (19:31)', 'Leading men of the province of Asia. That some were Paul’s friends shows how widely his teaching had reached.'],
        ['The town clerk (19:35)', 'The chief officer of the city’s assembly, responsible to Rome for keeping order.'],
      ],
      reflect: [
        'What made the sons of Sceva different from Paul?',
        'The book-burners counted the cost. What would it cost you to give something up for Christ?',
        'The riot was about money as much as religion. Where do those two still get mixed up?',
      ],
    },
    farewell: {
      num: 'XXXV', title: 'Farewell at Miletus', ref: 'Acts 20', passage: 'acts20', place: 'miletus', region: 'aegean', era: 'spread',
      scene: 'Troas and Miletus, Acts 20', parallels: 'compare 2 Timothy 4:6–8',
      question: { id: 'give', text: '“It is more blessed to give than to receive.” Why did Paul end with these words?', ref: 'Acts 20:35' },
      hearts: ['You held him and wept with the elders.', 'You knelt on the shore and prayed with them.', 'You carried his things down to the ship, because someone had to.'],
      conclusions: [
        'At Troas a young man fell from a window during the meeting and was taken up alive. We broke bread until dawn.',
        'At Miletus Paul said he did not hold his life dear, so that he might finish his race with joy.',
        'They wept because they would not see his face again. He knelt on the shore and prayed with them all.',
      ],
      notes: [
        ['The first day of the week (20:7)', 'One of the earliest mentions of believers gathering on Sunday, the day of the resurrection, to break bread.'],
        ['Eutychus (20:9)', 'His name means “fortunate” or “lucky.”'],
        ['Hurrying to Jerusalem (20:16)', 'Paul was carrying a collection from the Gentile churches for the poor believers in Jerusalem (Romans 15:25–26; 1 Corinthians 16:1–4).'],
        ['Miletus (20:17)', 'About 50 km south of Ephesus. The elders had to make a long journey to meet him.'],
        ['Elders and overseers (20:17, 28)', 'Paul calls the same leaders both “elders” and “overseers,” and gives them a shepherd’s work.'],
        ['“More blessed to give” (20:35)', 'A saying of Jesus that is not found in the four Gospels. Paul had heard it from those who knew him.'],
      ],
      reflect: [
        'Paul knew what was waiting for him in Jerusalem, and went anyway. Why?',
        'What does it mean to “finish the race with joy”?',
        'Who would weep at the shore for you? For whom would you?',
      ],
    },
  });
  D.eraOrder.push('artemis', 'farewell');
  Object.assign(D.episodes, {
    arrest: {
      num: 'XXXVI', title: 'On the Stairs', ref: 'Acts 21–22', passage: 'acts21', place: 'antonia', region: 'jerusalem', era: 'spread',
      scene: 'Caesarea and Jerusalem, Acts 21–22', parallels: 'compare John 19:15; Acts 9:1–19',
      question: { id: 'gentiles', text: 'Why did the crowd listen to Paul until he spoke of the Gentiles?', ref: 'Acts 22:21–22' },
      hearts: ['You stayed at the foot of the stairs and listened to every word.', 'You pushed toward the barracks gate to stay close to him.', 'You ran to tell James and the elders.'],
      conclusions: [
        'Agabus bound his own hands and feet with Paul’s belt. Paul said he was ready to die in Jerusalem.',
        'A rumor about a Greek in the Temple set the whole city running. Roman soldiers carried Paul up the stairs to save his life.',
        'Paul told the crowd what happened on the Damascus road. They listened until he said “the Gentiles.”',
      ],
      notes: [
        ['Philip’s daughters (21:9)', 'Four unmarried daughters who prophesied: Luke mentions them in passing, a glimpse of women’s ministry in the early church.'],
        ['Agabus (21:10–11)', 'The same prophet who foretold the famine at Antioch (11:28). Like the old prophets, he acted his message out.'],
        ['The Temple warning (21:28)', 'Stone inscriptions on the barrier around the inner courts warned Gentiles not to pass on pain of death. Two such inscriptions have been found.'],
        ['The commander (21:31)', 'A tribune over a cohort of up to a thousand soldiers, stationed in the Fortress Antonia beside the Temple. Acts later gives his name: Claudius Lysias (23:26).'],
        ['“Away with him!” (21:36)', 'The same cry the crowd raised against Jesus before Pilate (John 19:15).'],
        ['The Egyptian (21:38)', 'A false prophet who led a large following to the Mount of Olives a few years earlier; the historian Josephus also tells of him.'],
        ['Born a Roman (22:28)', 'Roman citizens could not be flogged to extract a confession. The commander had bought his citizenship; Paul was born with his.'],
      ],
      reflect: [
        'Paul’s friends begged him not to go. Was he right to go anyway?',
        'The crowd listened to Paul’s whole story until one word. What words make people stop listening today?',
        'Paul used his Roman citizenship to protect himself. When is it right to claim your rights?',
      ],
    },
    plot: {
      num: 'XXXVII', title: 'The Forty Who Swore', ref: 'Acts 23', passage: 'acts23', place: 'antonia', region: 'jerusalem', era: 'spread',
      scene: 'Jerusalem to Caesarea, Acts 23', parallels: 'compare Mark 14:53–65',
      question: { id: 'rome', text: '“You must testify also at Rome.” How would a prisoner get to Rome?', ref: 'Acts 23:11' },
      hearts: ['You stood up with the scribes of the Pharisees: “We find no evil in this man.”', 'You stayed seated, and watched the council tear itself apart.', 'You slipped out to wait by the barracks.'],
      conclusions: [
        'Paul stood before the same council that condemned Jesus, and cried out that he was on trial for the hope of the resurrection.',
        'Some of the scribes of the Pharisees stood up for him: “If a spirit or angel has spoken to him, let’s not fight against God!”',
        'More than forty men swore to kill him. A boy, Paul’s nephew, heard of it, and four hundred and seventy soldiers took Paul to Caesarea by night.',
      ],
      answers: { afraid: ['The Lord stood by him in the barracks at night and said, “Cheer up, Paul.”', 'Acts 23:11'] },
      notes: [
        ['The council (23:1)', 'The Sanhedrin, the same high court that had tried Jesus and Stephen.'],
        ['Ananias (23:2)', 'High priest about AD 47–59. The historian Josephus remembers him as greedy and violent.'],
        ['Pharisees and Sadducees (23:6–8)', 'The Sadducees, the party of the leading priests, denied the resurrection and angels; the Pharisees believed in both. Paul’s cry split the council along that line.'],
        ['Paul’s nephew (23:16)', 'The only mention of Paul’s family in the New Testament: a sister living in Jerusalem and her son.'],
        ['Four hundred and seventy (23:23)', 'Two hundred soldiers, seventy horsemen and two hundred spearmen: the commander took no chances with a Roman citizen.'],
        ['Antipatris (23:31)', 'About 60 km from Jerusalem, a night’s forced march. From there the horsemen alone went on to Caesarea.'],
        ['Herod’s palace (23:35)', 'Herod the Great’s seaside palace at Caesarea, now the Roman governor’s headquarters.'],
      ],
      reflect: [
        'Why do you think some Pharisees defended Paul?',
        'The Lord said “Cheer up” to a man in a cell. What would it take for you to hear that?',
        'A boy who overheard something saved Paul’s life. What small faithfulness might matter more than you know?',
      ],
    },
  });
  D.eraOrder.push('arrest', 'plot');
  Object.assign(D.episodes, {
    felix: {
      num: 'XXXVIII', title: 'Two Years in Caesarea', ref: 'Acts 24:1–25:12', passage: 'acts24', passages: [['acts24'], ['acts25', '25:1', '25:12']], place: 'caesarea', region: 'land', era: 'spread',
      scene: 'Herod’s palace at Caesarea, Acts 24–25', parallels: 'compare Luke 1:1–4',
      question: { id: 'convenient', text: 'Felix said, “When it is convenient for me, I will summon you.” Is there ever a convenient time?', ref: 'Acts 24:25' },
      hearts: ['You visited Paul nearly every day.', 'You traveled Judea and Galilee with Luke, finding people who had seen and heard.', 'You copied Paul’s letters for the churches.'],
      conclusions: [
        'Before Felix, Paul confessed that he served the God of the fathers “after the Way,” in hope of the resurrection.',
        'Felix trembled when Paul spoke of righteousness, self-control and the judgment to come, and sent him away until it was convenient. It never was.',
        'After two years, before a new governor, Paul appealed to Caesar. To Caesar he would go.',
      ],
      notes: [
        ['Tertullus (24:1)', 'A professional orator hired to present the high priest’s case in proper Roman style.'],
        ['“The sect of the Nazarenes” (24:5)', 'An outsider’s name for the believers. Paul calls it “the Way” (24:14), the name this game takes.'],
        ['Felix (24:22)', 'Governor of Judea about AD 52–59, a former slave who rose through the favor of the imperial household. The Roman historian Tacitus judged him harshly as a cruel and greedy ruler.'],
        ['Drusilla (24:24)', 'Daughter of King Herod Agrippa I, who had killed James and imprisoned Peter (Acts 12), and sister of Agrippa II.'],
        ['Two years (24:27)', 'Paul waited in custody at Caesarea for two years. Many scholars think Luke may have gathered material for his Gospel during this time, from the eyewitnesses he mentions in Luke 1:2.'],
        ['Festus (25:1)', 'Felix’s successor, governor about AD 59–62, who tried to start his rule on good terms with Jerusalem’s leaders.'],
        ['I appeal to Caesar (25:11)', 'A Roman citizen could ask to have his case heard by the emperor himself, by then Nero.'],
      ],
      reflect: [
        'Felix was frightened by the truth, and then hoped for a bribe. What do you make of him?',
        'What would you do with two years of waiting?',
        'Why do you think Paul appealed to Caesar instead of going back to Jerusalem?',
      ],
    },
    agrippa: {
      num: 'XXXIX', title: 'Almost Persuaded', ref: 'Acts 25:13–26:32', passage: 'acts26', passages: [['acts25', '25:13', '25:27'], ['acts26']], place: 'caesarea', region: 'land', era: 'spread',
      scene: 'The hall of hearing at Caesarea, Acts 25–26', parallels: 'Acts 9:1–19; 22:1–21',
      question: { id: 'corner', text: '“This has not been done in a corner.” What did Paul mean?', ref: 'Acts 26:26' },
      hearts: ['In your heart you answered him: “I am such as you are.”', 'In your heart you answered: “Almost.”', 'In your heart you answered: “Not yet. But I am still writing.”'],
      conclusions: [
        'For the third time in Acts, Paul told how the risen Jesus met him on the road and sent him to open eyes.',
        'Festus said he was crazy. Agrippa asked if he was trying, with so little, to make him a Christian.',
        'They agreed he had done nothing worthy of death or chains. He might have been set free, if he had not appealed to Caesar.',
      ],
      answers: { gentiles: ['The Christ would “proclaim light both to these people and to the Gentiles.” For Paul that was the hope of Israel itself, not a betrayal of it.', 'Acts 26:23'] },
      notes: [
        ['Agrippa and Bernice (25:13)', 'Herod Agrippa II, great-grandson of Herod the Great, ruled lands north and east of Galilee and had charge of the Temple and the choice of high priest. Bernice was his sister.'],
        ['Great pomp (25:23)', 'Roman officers, city leaders, the king and queen in royal dress: the grandest audience Paul ever had, and he arrived in chains.'],
        ['The third telling (26:12–18)', 'Luke tells Paul’s conversion three times (chapters 9, 22 and 26), each time to a different audience.'],
        ['Kicking against the goads (26:14)', 'A proverb about an ox kicking against the pointed stick that drives it: resisting only hurts the one who resists.'],
        ['“Christian” (26:28)', 'The name first given to the disciples at Antioch (11:26). It appears only three times in the New Testament.'],
        ['Not done in a corner (26:26)', 'The death and resurrection of Jesus were public events in Jerusalem, at a feast, before crowds, under Roman authority.'],
      ],
      reflect: [
        'Paul spoke to a king as if he were any other person who needed to hear. What does that say about status?',
        'How would you have answered Paul’s last words?',
        'Why do you think Luke tells Paul’s conversion three times?',
      ],
    },
  });
  D.eraOrder.push('felix', 'agrippa');
  Object.assign(D.episodes, {
    storm: {
      num: 'XL', title: 'The Storm', ref: 'Acts 27', passage: 'acts27', place: 'fairhavens', region: 'west', era: 'spread',
      scene: 'From Caesarea to the shipwreck, Acts 27', parallels: 'compare Jonah 1; Mark 4:35–41',
      question: { id: 'cheer', text: '“Cheer up! For I believe God.” How could Paul say that in the middle of a storm?', ref: 'Acts 27:25' },
      hearts: ['You took the bread he gave thanks for, and ate.', 'You gave your piece to the frightened ship’s boy beside you.', 'You kept watch at the rail while the others ate.'],
      conclusions: [
        'Paul warned them not to sail on from Crete. The master and the owner overruled him.',
        'Fourteen days without sun or stars. Then an angel stood by Paul: God had granted him everyone who sailed with him.',
        'He broke bread and gave thanks before all of us. The ship broke apart, and all two hundred seventy-six reached the land.',
      ],
      notes: [
        ['Julius (27:1)', 'A centurion of an imperial cohort. He treated Paul kindly throughout, and in the end saved his life (27:3, 43).'],
        ['A ship of Alexandria (27:6)', 'One of the great grain ships that carried Egypt’s wheat to Rome. Its cargo was the wheat they finally threw overboard (27:38).'],
        ['The Fast (27:9)', 'The Day of Atonement, in late September or October. Sailing was risky after mid-September and the open sea was all but closed by November.'],
        ['Euroclydon (27:14)', 'A violent northeast wind sweeping down from Crete’s mountains.'],
        ['The Syrtis (27:17)', 'The shoals and quicksands off the coast of Libya, dreaded by every sailor.'],
        ['The Adriatic Sea (27:27)', 'In ancient usage the name covered the open sea between Greece, Italy and Sicily, not only today’s Adriatic.'],
        ['Fourteen days (27:27)', 'A nineteenth-century yachtsman and scholar, James Smith, calculated that a ship drifting before a northeaster from Clauda would reach Malta in about fourteen days.'],
      ],
      reflect: [
        'Paul was a prisoner, yet by the end everyone on the ship was listening to him. Why?',
        'What does it mean to “believe God” when everything around you says otherwise?',
        'Why do you think Luke tells the storm in such detail?',
      ],
    },
    malta: {
      num: 'XLI', title: 'Malta', ref: 'Acts 28:1–10', passage: 'acts28', from: '28:1', to: '28:10', place: 'malta', region: 'west', era: 'spread',
      scene: 'The island of Malta, Acts 28', parallels: 'compare Mark 16:18; Luke 10:19',
      question: { id: 'kindness', text: 'The islanders showed “uncommon kindness” to strangers washed up from the sea. Who has shown you kindness like that?', ref: 'Acts 28:2' },
      hearts: ['You prayed, out loud, for the first time in front of strangers.', 'You reached for the snake.', 'You froze, like everyone else.'],
      conclusions: [
        'Strangers who did not speak our language built a fire for us in the rain.',
        'A viper fastened on Paul’s hand. He shook it into the fire, and they decided he was a god. He was not.',
        'Paul prayed for the father of Publius, laid his hands on him, and he was healed. Then the sick of the whole island came.',
      ],
      notes: [
        ['The natives (28:2)', 'Luke’s Greek word means people who did not speak Greek. The Maltese spoke a language descended from Phoenician.'],
        ['The viper (28:3)', 'Malta has no venomous snakes today. Some suggest they died out as the island was cleared; others that this was a snake the islanders believed deadly.'],
        ['Justice (28:4)', 'The islanders spoke of Justice as a goddess who pursues the guilty, and assumed the sea had only delayed her.'],
        ['Publius (28:7)', 'Luke calls him “the chief man of the island.” Inscriptions found on Malta use this same title for the island’s leading official.'],
        ['Fever and dysentery (28:8)', 'Some doctors have suggested “Malta fever,” long spread on the island through goats’ milk.'],
        ['The Twin Brothers (28:11)', 'Castor and Pollux, sons of Zeus in Greek myth, believed to protect sailors. Their figures were carved on the next ship’s prow.'],
      ],
      reflect: [
        'The islanders went from “murderer” to “god” in an afternoon. What do you notice about how people judge?',
        'Paul gathered sticks for the fire. What does that say about him?',
        'How could you show uncommon kindness to a stranger this week?',
      ],
    },
    rome: {
      num: 'XLII', title: 'Rome', ref: 'Acts 28:11–31', passage: 'acts28', from: '28:11', to: '28:31', place: 'rome', region: 'west', era: 'spread',
      scene: 'The Appian Way and Rome, Acts 28', parallels: 'compare Romans 1:8–15; Philippians 1:12–14',
      question: { id: 'unfinished', text: 'Acts ends with Paul teaching “without hindrance,” and does not say what happened next. Why might Luke end there?', ref: 'Acts 28:30–31' },
      hearts: ['You gave your scroll to Luke.', 'You read it aloud to the believers in Rome.', 'You kept writing.'],
      answers: { rome: ['“So we came to Rome”: as a prisoner, by storm and shipwreck, at the emperor’s expense.', 'Acts 28:14'] },
      conclusions: [
        'The believers walked out along the Appian Way to meet a prisoner in chains, and when Paul saw them, he thanked God and took courage.',
        'Chained to a soldier in a rented house, he told the leaders of the Jews that he was bound “because of the hope of Israel.”',
        'For two whole years he welcomed everyone who came, teaching about the Lord Jesus with all boldness, without hindrance.',
      ],
      notes: [
        ['Puteoli (28:13)', 'The main port of Italy for the grain ships from Alexandria, on the Bay of Naples. There were already believers there.'],
        ['The Appian Way (28:15)', 'The great paved road south from Rome. The Market of Appius lay about 65 km from the city, the Three Taverns about 50.'],
        ['Under guard (28:16)', 'Paul lived in rented rooms under house arrest, probably chained at the wrist to a soldier who changed with each watch.'],
        ['Letters from prison', 'Philippians, Colossians, Philemon and Ephesians all speak of Paul’s chains; many believe some or all were written during these two years in Rome.'],
        ['Isaiah 6 (28:26–27)', 'The same words Jesus used of those who heard his parables and did not understand (Mark 4:12).'],
        ['Without hindrance (28:31)', 'In Greek the very last word of Acts. Early Christian writers say Paul was later put to death in Rome under Nero, but Luke ends with the word still going out.'],
      ],
      reflect: [
        'Acts began in Jerusalem and ends in Rome. Look back: how did the word travel?',
        'Why do you think the book ends without telling us Paul’s fate?',
        'You have followed the Way from a roof in Capernaum to a rented house in Rome. What do you believe now?',
      ],
    },
  });
  D.eraOrder.push('storm', 'malta', 'rome');
  Object.assign(D.episodes, {
    letter: {
      num: 'XLIII', title: 'The Letter to Philippi', ref: 'Philippians', passage: 'phil', place: 'philippi', region: 'aegean', era: 'spread',
      scene: 'Rome and Philippi, c. AD 61', parallels: 'Acts 16; 28:30–31',
      question: { id: 'content', text: 'Paul wrote that he had learned to be content in every state. How do you learn that?', ref: 'Philippians 4:11–13' },
      hearts: ['You read it plainly, exactly as it was written.', 'You read it gently, looking at each of them.', 'You handed the letter to Lydia for that part.'],
      answers: { cheer: ['“Rejoice in the Lord always!” Written in chains: his joy did not rest on his circumstances, but on the Lord who is near.', 'Philippians 4:4–7'] },
      conclusions: [
        'Paul wrote from his chains that they had turned out to advance the Good News, even in the praetorian guard.',
        'He told them to have the mind of Christ, who emptied himself, took the form of a servant, and humbled himself to the death of the cross.',
        'In the room where the church began, I read aloud: “Rejoice in the Lord always! Again I will say, Rejoice!”',
      ],
      notes: [
        ['Written in chains (1:13)', 'Most think Paul wrote from his house arrest in Rome; some suggest an earlier imprisonment, at Ephesus or Caesarea.'],
        ['A scribe (Romans 16:22)', 'Paul usually dictated his letters. A secretary named Tertius wrote Romans; Paul often added a closing line in his own hand (Galatians 6:11).'],
        ['Epaphroditus (2:25)', 'The Philippians’ messenger, who brought their gift to Paul in prison and fell sick almost to death.'],
        ['The mind of Christ (2:5–11)', 'Many scholars think these lines were an early hymn about Christ that Paul quoted and the churches already sang.'],
        ['Euodia and Syntyche (4:2–3)', 'Two women who had “labored with” Paul in the Good News, now at odds with each other. Paul names them with honor and pleads for peace.'],
        ['Caesar’s household (4:22)', 'Slaves and freedmen in the imperial service. The Good News had reached the emperor’s own staff.'],
      ],
      reflect: [
        'Paul wrote “Rejoice” from prison. What would make that honest rather than forced?',
        'What would it mean for you to “empty yourself” as Christ did?',
        'Why do you think Paul named Euodia and Syntyche in a letter read to the whole church?',
      ],
    },
    onesimus: {
      num: 'XLIV', title: 'Onesimus', ref: 'Philemon', passage: 'phm', place: 'colossae', region: 'aegean', era: 'spread',
      scene: 'Rome and Colossae, c. AD 61', parallels: 'Colossians 4:7–9; Galatians 3:28',
      question: { id: 'brother', text: 'What would it take to receive someone “no longer as a slave, but more than a slave, a beloved brother”?', ref: 'Philemon 16' },
      hearts: ['You stood beside Onesimus while you read.', 'You stood beside Philemon while you read.', 'You read from the middle of the room, between them.'],
      conclusions: [
        'A runaway slave became Paul’s child in the faith, and Paul sent him home with a letter.',
        'Paul did not command. He asked Philemon to receive Onesimus as he would receive Paul himself, and to put any debt on Paul’s account.',
        'The letter was read before the whole church in Philemon’s house. It does not tell us what Philemon did; it was kept, and copied, and read again.',
      ],
      notes: [
        ['Slavery in Rome', 'A large part of the empire’s people were slaves, of every nation, owned with near total legal power. A runaway could be branded, beaten or killed.'],
        ['Onesimus (10–11)', 'The name means “useful.” Paul plays on it: once useless to you, now useful to you and to me.'],
        ['In his own hand (19)', 'Paul takes the pen himself to sign a promise to pay whatever Onesimus owed.'],
        ['Read to a church (2)', 'The letter is addressed to Philemon, but also to Apphia, Archippus and “the assembly in your house.” Philemon would answer in front of them all.'],
        ['Tychicus (Colossians 4:7–9)', 'He carried Paul’s letter to Colossae, traveling with Onesimus, whom Paul called a faithful and beloved brother from their own town.'],
        ['Afterward', 'About fifty years later, Ignatius of Antioch wrote warmly of Onesimus, bishop of Ephesus. Whether he was this Onesimus no one can say.'],
      ],
      reflect: [
        'Why do you think Paul asked rather than commanded?',
        'Where do people who belong to the same church still live as master and slave, rich and poor, insider and outsider?',
        'Whose debt might you offer to put on your own account?',
      ],
    },
  });
  D.eraOrder.push('letter', 'onesimus');

















  const galPlaces = [
    {
      id: 'capernaum', name: 'Capernaum', alt: 'Kefar Nahum, “village of Nahum”',
      lon: 35.575, lat: 32.886, kind: 'episode', episodes: ['capernaum', 'levi', 'sabbath', 'legion'], label: 'r',
      text:
        'A fishing village of black basalt on the north shore, perhaps a thousand people or so. Jesus made it his base (Matthew 4:13). A customs post stood here near the border with Philip’s territory.',
    },
    {
      id: 'chorazin', name: 'Chorazin', alt: 'Korazim', lon: 35.564, lat: 32.912, kind: 'locked', label: 'l',
      ref: 'Matthew 11:21',
      text: 'A basalt village in the hills above Capernaum. Jesus rebuked it for not repenting after seeing his works.',
    },
    {
      id: 'bethsaida', name: 'Bethsaida', alt: '“House of fishing”', lon: 35.631, lat: 32.910, kind: 'locked', label: 'r',
      ref: 'Mark 8:22–26',
      text:
        'Home of Philip, Andrew and Peter (John 1:44), just across the Jordan in Philip the tetrarch’s territory. Its exact site is still debated.',
    },
    {
      id: 'magdala', name: 'Magdala', alt: 'Migdal', lon: 35.510, lat: 32.826, kind: 'history', label: 'l',
      ref: 'Luke 8:1–3',
      text:
        'A prosperous lakeside town known for salted fish, and home of Mary called Magdalene (Luke 8:2). Excavations since 2009 have uncovered a first-century synagogue.',
    },
    {
      id: 'tiberias', name: 'Tiberias', alt: 'Antipas’s new capital', lon: 35.528, lat: 32.792, kind: 'history', label: 'l',
      ref: 'John 6:23',
      text:
        'Founded by Herod Antipas around AD 20 and named for the emperor. Josephus says it was built partly over graves, which observant Jews avoided. The Gospels never record Jesus entering it.',
    },
    {
      id: 'kursi', name: 'Country of the Gadarenes', short: 'Gadarenes', alt: 'Kursi, on the eastern shore', lon: 35.652, lat: 32.826, kind: 'episode', episodes: ['legion'], label: 'r',
      text:
        'Largely Gentile country across the lake, with tombs in the hills and herds of pigs. Kursi is the traditional site of the Legion account. Manuscripts name the region differently: Gadarenes, Gerasenes or Gergesenes.',
    },
    {
      id: 'hippos', name: 'Hippos', alt: 'Sussita, a city of the Decapolis', lon: 35.661, lat: 32.778, kind: 'history', label: 'r',
      text:
        'A Greek city on a ridge above the eastern shore, one of the ten cities of the Decapolis (Mark 5:20). Its temples were visible from the Jewish villages across the water.',
    },
    {
      id: 'arbel', name: 'Mount Arbel', alt: 'Cliffs above Gennesaret', lon: 35.495, lat: 32.818, kind: 'history', label: 'b',
      text:
        'Sheer cliffs over the lake. Josephus records Herod the Great lowering soldiers in chests to drive rebels out of its caves, around 38 BC.',
    },
    {
      id: 'cana', name: 'Cana', alt: 'Khirbet Qana (debated)', lon: 35.322, lat: 32.796, kind: 'locked', label: 'r',
      ref: 'John 2:1–11',
      text:
        'Where Jesus turned water into wine. Khirbet Qana, on the edge of the Beit Netofa valley, is a leading candidate for the site.',
    },
    {
      id: 'sepphoris', name: 'Sepphoris', alt: 'Tzippori', lon: 35.279, lat: 32.753, kind: 'history', label: 'l',
      text:
        'Antipas rebuilt this city as his first capital after Roman troops burned it in 4 BC. Only about 6 km from Nazareth, it is never mentioned in the Gospels.',
    },
    {
      id: 'nazareth', name: 'Nazareth', alt: 'A small hill village', lon: 35.297, lat: 32.702, kind: 'locked', label: 'r',
      ref: 'Luke 4:16–30',
      text:
        'Where Jesus grew up. A village of perhaps a few hundred people on a ridge above the Jezreel Valley. Its synagogue would reject him.',
    },
    {
      id: 'tabor', name: 'Mount Tabor', alt: '575 m', lon: 35.390, lat: 32.687, kind: 'history', label: 'r',
      text:
        'An isolated dome rising above the plain. From the fourth century, tradition placed the Transfiguration here; the Gospels say only “a high mountain” (Mark 9:2).',
    },
    {
      id: 'nain', name: 'Nain', alt: 'On the Hill of Moreh', lon: 35.348, lat: 32.630, kind: 'episode', episodes: ['nain'], label: 'r',
      text: 'A small village on the slope of the Hill of Moreh, looking north across the valley to Mount Tabor.',
    },
    {
      id: 'meron', name: 'Mount Meron', alt: '1,208 m', lon: 35.410, lat: 32.998, kind: 'history', label: 'r',
      text: 'The highest peak in Galilee, in the rugged Upper Galilee. Few roads crossed these hills.',
    },
  ];

  // Road and boat network (invisible waypoints included)
  const galNodes = {
    jv: { lon: 35.555, lat: 32.612, name: 'Road from Jerusalem' },
    w1: { lon: 35.545, lat: 32.712 },
    g1: { lon: 35.522, lat: 32.872 },
    n1: { lon: 35.605, lat: 32.897 },
    a1: { lon: 35.455, lat: 32.812 },
    a2: { lon: 35.455, lat: 32.745 },
    a3: { lon: 35.470, lat: 32.955 },
    h1: { lon: 35.647, lat: 32.790 },
  };
  galPlaces.forEach((p) => { galNodes[p.id] = { lon: p.lon, lat: p.lat, name: p.name }; });

  const galEdges = [
    ['jv', 'w1'], ['w1', 'tiberias'], ['tiberias', 'magdala'], ['magdala', 'g1'], ['g1', 'capernaum'],
    ['capernaum', 'chorazin'], ['capernaum', 'n1'], ['n1', 'bethsaida'],
    ['magdala', 'arbel'], ['arbel', 'a1'], ['a1', 'cana'], ['cana', 'sepphoris'], ['sepphoris', 'nazareth'],
    ['nazareth', 'nain'], ['nazareth', 'tabor'], ['tabor', 'nain'], ['tabor', 'a2'], ['a2', 'tiberias'],
    ['chorazin', 'a3'], ['a3', 'meron'], ['kursi', 'h1'], ['h1', 'hippos'],
    ['capernaum', 'kursi', 'boat'], ['magdala', 'kursi', 'boat'],
  ];

  const galLabels = [
    { text: 'Sea of Galilee', lon: 35.592, lat: 32.818, style: 'water' },
    { text: 'Jordan', lon: 35.583, lat: 32.655, style: 'river' },
    { text: 'Upper Galilee', lon: 35.30, lat: 32.985, style: 'region' },
    { text: 'Lower Galilee', lon: 35.42, lat: 32.765, style: 'region' },
    { text: 'Gaulanitis', lon: 35.705, lat: 32.95, style: 'region' },
    { text: 'Decapolis', lon: 35.71, lat: 32.72, style: 'region' },
    { text: 'Jezreel Valley', lon: 35.255, lat: 32.632, style: 'region' },
    { text: 'Beit Netofa', lon: 35.385, lat: 32.815, style: 'small' },
    { text: 'Gennesaret', lon: 35.538, lat: 32.852, style: 'small' },
  ];


  // ---------- The Land: Galilee to Idumaea, the coast to the Transjordan plateau ----------
  // reveal: the episode after which a place appears through the fog ('start' = known from the beginning)
  const landPlaces = [
    { id: 'jerusalem', name: 'Jerusalem', alt: 'The holy city, about 750 m up in the Judean hills', lon: 35.235, lat: 31.778, kind: 'zoom', zoom: 'jerusalem', reveal: 'start', label: 'r',
      text: 'Your home, and the home of the Temple that Herod the Great rebuilt on a vast platform. Pilgrims crowded the city at Passover. Every road in this game eventually leads back here.' },
    { id: 'bethlehem', name: 'Bethlehem', alt: 'The town of David', lon: 35.202, lat: 31.700, kind: 'history', reveal: 'start', label: 'l', ref: 'Luke 2:4; Micah 5:2',
      text: 'A small town about 9 km south of Jerusalem. Luke records that Jesus was born here, in the city of David.' },
    { id: 'jericho', name: 'Jericho', alt: 'City of palms, about 250 m below sea level', lon: 35.444, lat: 31.857, kind: 'history', reveal: 'start', label: 'l', ref: 'Luke 19:1–10',
      text: 'An oasis on the road from Galilee to Jerusalem. Pilgrims from Galilee often came down the Jordan valley and climbed from here up to the city, some 1,000 m higher.' },
    { id: 'qumran', name: 'Qumran', alt: 'Above the Salt Sea', lon: 35.459, lat: 31.741, kind: 'history', reveal: 'nain', label: 'r',
      text: 'A settlement on a dry terrace above the Dead Sea. The scrolls found in nearby caves from 1947 onward include the oldest known copies of books of the Hebrew Bible.' },
    { id: 'masada', name: 'Masada', alt: 'Herod’s desert fortress', lon: 35.354, lat: 31.316, kind: 'history', reveal: 'nain', label: 'l',
      text: 'A mesa-top palace fortress built by Herod the Great. Rebels held it after Jerusalem fell, until the Romans took it in AD 73 or 74.' },
    { id: 'hebron', name: 'Hebron', alt: 'The hills of Idumaea and Judea', lon: 35.095, lat: 31.530, kind: 'history', reveal: 'sabbath', label: 'l',
      text: 'Burial place of Abraham, Isaac and Jacob (Genesis 23, 49:29–31). Herod the Great built the massive stone enclosure over the cave that still stands.' },
    { id: 'beersheba', name: 'Beersheba', alt: 'Edge of the Negev', lon: 34.840, lat: 31.245, kind: 'history', reveal: 'sabbath', label: 'l',
      text: 'The old southern limit of Israel, as in the saying “from Dan to Beersheba.” South of here the hills give way to desert.' },
    { id: 'gaza', name: 'Gaza', alt: 'On the road to Egypt', lon: 34.462, lat: 31.505, kind: 'history', reveal: 'nain', label: 'r', ref: 'Acts 8:26',
      text: 'A port city on the coastal road to Egypt. Later, Philip will meet an Ethiopian official on the desert road leading here.' },
    { id: 'emmaus', name: 'Emmaus', alt: 'Site debated', lon: 34.990, lat: 31.840, kind: 'locked', reveal: 'nain', label: 'l', ref: 'Luke 24:13–35',
      text: 'A village west of Jerusalem where the risen Jesus was recognized at a meal. Several sites have been proposed; this marker shows Emmaus Nicopolis.' },
    { id: 'joppa', name: 'Joppa', alt: 'Jerusalem’s old port', lon: 34.752, lat: 32.054, kind: 'episode', episodes: ['tabitha', 'cornelius'], reveal: 'levi', label: 'l', ref: 'Acts 9:36–10:23',
      text: 'An ancient harbor on the coast. Peter will raise Tabitha here and receive a vision that sends him to a Gentile’s house.' },
    { id: 'caesarea', name: 'Caesarea', alt: 'Caesarea Maritima', lon: 34.890, lat: 32.500, kind: 'episode', episodes: ['felix', 'agrippa'], reveal: 'levi', label: 'l', ref: 'Acts 10',
      text: 'Herod the Great’s harbor city and the seat of the Roman prefects. A stone found here in 1961 bears Pontius Pilate’s name. Taxes from the province flowed through Roman officials based here.' },
    { id: 'samaria', name: 'Sebaste', alt: 'The city of Samaria', lon: 35.192, lat: 32.276, kind: 'episode', episodes: ['samaria'], reveal: 'levi', label: 'l',
      text: 'The old capital of the northern kingdom, rebuilt by Herod the Great and renamed for Augustus (Sebastos in Greek).' },
    { id: 'sychar', name: 'Sychar', alt: 'Jacob’s well, below Mount Gerizim', lon: 35.285, lat: 32.213, kind: 'locked', reveal: 'levi', label: 'r', ref: 'John 4:1–42',
      text: 'Samaritans worshiped on Mount Gerizim rather than in Jerusalem. Many Galileans traveling to Jerusalem went around Samaria by the Jordan valley.' },
    { id: 'ptolemais', name: 'Ptolemais', alt: 'Akko', lon: 35.080, lat: 32.925, kind: 'history', reveal: 'levi', label: 'l', ref: 'Acts 21:7',
      text: 'A busy harbor north of Mount Carmel, linked by road to the cities of Galilee.' },
    { id: 'tyre', name: 'Tyre', alt: 'Phoenicia', lon: 35.196, lat: 33.272, kind: 'locked', reveal: 'sabbath', label: 'l', ref: 'Mark 7:24–30',
      text: 'An old Phoenician island city, joined to the mainland since Alexander the Great built a causeway in 332 BC. People from here came to hear Jesus (Mark 3:8).' },
    { id: 'sidon', name: 'Sidon', alt: 'Phoenicia', lon: 35.385, lat: 33.560, kind: 'history', reveal: 'sabbath', label: 'l', ref: 'Mark 3:8',
      text: 'A Phoenician port city about 35 km north of Tyre, known for glass and purple dye.' },
    { id: 'machaerus', name: 'Machaerus', alt: 'Herod’s fortress in Perea', lon: 35.626, lat: 31.565, kind: 'history', reveal: 'sabbath', label: 'r', ref: 'Mark 6:17–29',
      text: 'A fortress above the Dead Sea. Josephus names it as the place where Herod Antipas imprisoned and executed John the Baptist.' },
    { id: 'bethabara', name: 'Bethany beyond the Jordan', short: 'Bethany beyond Jordan', alt: 'Where John baptized', lon: 35.553, lat: 31.837, kind: 'history', reveal: 'sabbath', label: 'r', ref: 'John 1:28',
      text: 'John baptized across the Jordan from Jericho. The traditional site lies near the river, a few kilometers north of the Dead Sea.' },
    { id: 'scythopolis', name: 'Scythopolis', alt: 'Beth Shean', lon: 35.500, lat: 32.500, kind: 'history', reveal: 'start', label: 'l',
      text: 'The largest city of the Decapolis and the only one west of the Jordan, on the valley road between Galilee and Judea.' },
    { id: 'gadara', name: 'Gadara', alt: 'A city of the Decapolis', lon: 35.680, lat: 32.655, kind: 'history', reveal: 'legion', label: 'r', ref: 'Matthew 8:28',
      text: 'A Greek city on the heights south of the lake, about 10 km from the shore. Matthew calls the area where the Legion was cast out “the country of the Gadarenes.”' },
    { id: 'gerasa', name: 'Gerasa', alt: 'Jerash', lon: 35.891, lat: 32.280, kind: 'history', reveal: 'legion', label: 'r',
      text: 'A prosperous Decapolis city in the hills of Gilead, some 50 km from the lake. Some manuscripts of Mark name the region after it.' },
    { id: 'hippos2', name: 'Hippos', alt: 'Sussita', lon: 35.661, lat: 32.778, kind: 'history', reveal: 'legion', label: 'r',
      text: 'A Decapolis city on a ridge above the eastern shore of the lake.' },
    { id: 'caesphil', name: 'Caesarea Philippi', short: 'Caesarea Philippi', alt: 'At the springs of the Jordan', lon: 35.694, lat: 33.248, kind: 'locked', reveal: 'capernaum', label: 'r', ref: 'Mark 8:27–30',
      text: 'Philip the tetrarch’s capital, beside a spring and a cave shrine to the god Pan. Here Peter will say, “You are the Christ.”' },
    { id: 'hermon', name: 'Mount Hermon', alt: '2,814 m', lon: 35.857, lat: 33.416, kind: 'history', reveal: 'capernaum', label: 'r',
      text: 'The highest mountain of the region, snow-capped much of the year. Its snowmelt feeds the springs of the Jordan.' },
    { id: 'tosyria', name: 'North to Syria', short: 'To Syria', alt: 'Phoenicia, Antioch, Tarsus and Cyprus', lon: 35.700, lat: 33.600, kind: 'zoom', zoom: 'east', reveal: 'stephen', label: 'r' },
    { id: 'desertroad', name: 'The desert road', short: 'Desert road', alt: 'From Jerusalem down to Gaza', lon: 34.800, lat: 31.600, kind: 'episode', episodes: ['desert'], reveal: 'stephen', label: 'l',
      text: 'The road that drops from the Judean hills through dry country to Gaza and the coastal road to Egypt. Acts 8:26 calls it “a desert.”' },
    { id: 'azotus', name: 'Azotus', alt: 'Ashdod', lon: 34.648, lat: 31.800, kind: 'history', reveal: 'stephen', label: 'l', ref: 'Acts 8:40',
      text: 'One of the old Philistine cities on the coast. Philip was found here after the desert road, and preached his way north to Caesarea.' },
    { id: 'damascus', name: 'Damascus', alt: 'Capital of an ancient kingdom, 220 km north of Jerusalem', lon: 36.292, lat: 33.513, kind: 'episode', episodes: ['damascus'], reveal: 'stephen', label: 'l',
      text: 'An oasis city at the foot of the Anti-Lebanon, with many synagogues. Saul came here with letters from the high priest to arrest anyone “of the Way.”' },
    { id: 'capernaum', name: 'Capernaum', alt: 'Your base in Galilee', lon: 35.572, lat: 32.896, kind: 'zoom', zoom: 'galilee', reveal: 'start', label: 'r',
      text: 'Open the Galilee map to see the villages around the lake up close.' },
    { id: 'nazareth', name: 'Nazareth', alt: 'Lower Galilee', lon: 35.297, lat: 32.702, kind: 'zoom', zoom: 'galilee', reveal: 'start', label: 'l',
      text: 'Where Jesus grew up. Open the Galilee map to see it up close.' },
    { id: 'tiberias', name: 'Tiberias', alt: 'Antipas’s capital', lon: 35.530, lat: 32.790, kind: 'zoom', zoom: 'galilee', reveal: 'start', label: 'l',
      text: 'Herod Antipas’s capital on the lake. Open the Galilee map to see it up close.' },
  ];
  const landNodes = {
    j1: { lon: 35.232, lat: 31.930 }, j2: { lon: 35.300, lat: 32.460 }, j3: { lon: 35.560, lat: 32.640 },
    j4: { lon: 35.540, lat: 32.200 }, c1: { lon: 34.960, lat: 32.660 }, c2: { lon: 35.130, lat: 32.720 },
    e1: { lon: 35.365, lat: 31.470 }, e0: { lon: 35.430, lat: 31.660 }, m1: { lon: 35.505, lat: 32.830 }, g1: { lon: 35.525, lat: 32.873 },
    s2: { lon: 34.830, lat: 32.210 }, s3: { lon: 34.880, lat: 32.360 }, n1: { lon: 35.120, lat: 33.090 }, n2: { lon: 35.230, lat: 33.170 },
    n3: { lon: 35.280, lat: 33.350 }, n4: { lon: 35.380, lat: 33.470 }, p1: { lon: 35.810, lat: 31.800 }, d1: { lon: 35.615, lat: 32.450 },
    t1: { lon: 35.620, lat: 33.050 }, s1: { lon: 34.950, lat: 31.700 },
    dm1: { lon: 35.950, lat: 33.330 }, dm2: { lon: 36.120, lat: 33.430 },
  };
  landPlaces.forEach((p) => { landNodes[p.id] = { lon: p.lon, lat: p.lat, name: p.name }; });
  const landEdges = [
    ['jerusalem', 'bethlehem'], ['bethlehem', 'hebron'], ['hebron', 'beersheba'], ['beersheba', 'gaza'],
    ['jerusalem', 'j1'], ['j1', 'sychar'], ['sychar', 'samaria'], ['sychar', 'j2'], ['j2', 'nazareth'],
    ['jerusalem', 'jericho'], ['jericho', 'qumran'], ['qumran', 'e0'], ['e0', 'e1'], ['e1', 'masada'],
    ['jericho', 'bethabara'], ['bethabara', 'p1'], ['p1', 'machaerus'],
    ['jericho', 'j4'], ['j4', 'scythopolis'], ['scythopolis', 'j3'], ['j3', 'tiberias'], ['tiberias', 'm1'], ['m1', 'g1'], ['g1', 'capernaum'],
    ['jerusalem', 'emmaus'], ['emmaus', 'joppa'], ['joppa', 's2'], ['s2', 's3'], ['s3', 'caesarea'], ['caesarea', 'samaria'], ['caesarea', 'c1'],
    ['c1', 'c2'], ['c2', 'ptolemais'], ['c2', 'nazareth'], ['ptolemais', 'n1'], ['n1', 'n2'], ['n2', 'tyre'], ['tyre', 'n3'], ['n3', 'n4'], ['n4', 'sidon'], ['caesphil', 'hermon'],
    ['nazareth', 'tiberias'], ['capernaum', 't1'], ['t1', 'caesphil'],
    ['j3', 'gadara'], ['gadara', 'd1'], ['d1', 'gerasa'], ['scythopolis', 'd1'], ['gaza', 's1'], ['s1', 'emmaus'],
    ['capernaum', 'hippos2', 'boat'],
    ['s1', 'desertroad'], ['desertroad', 'gaza'], ['gaza', 'azotus'], ['azotus', 'joppa'],
    ['caesphil', 'dm1'], ['dm1', 'dm2'], ['dm2', 'damascus'], ['dm1', 'tosyria'],
  ];
  const landLabels = [
    { text: 'Galilee', lon: 35.33, lat: 32.86, style: 'region' },
    { text: 'Samaria', lon: 35.06, lat: 32.40, style: 'region' },
    { text: 'Judea', lon: 34.93, lat: 31.74, style: 'region' },
    { text: 'Idumaea', lon: 34.98, lat: 31.38, style: 'region' },
    { text: 'Perea', lon: 35.78, lat: 31.98, style: 'region' },
    { text: 'Decapolis', lon: 35.98, lat: 32.52, style: 'region' },
    { text: 'Gaulanitis', lon: 35.80, lat: 32.95, style: 'region' },
    { text: 'Phoenicia', lon: 35.38, lat: 33.38, style: 'region' },
    { text: 'The Great Sea', lon: 34.55, lat: 32.55, style: 'water' },
    { text: 'Salt Sea', lon: 35.495, lat: 31.48, style: 'water' },
    { text: 'Jordan', lon: 35.60, lat: 32.30, style: 'river' },
    { text: 'Plain of Sharon', lon: 34.92, lat: 32.30, style: 'small' },
    { text: 'Jezreel Valley', lon: 35.28, lat: 32.60, style: 'small' },
    { text: 'Wilderness of Judea', lon: 35.30, lat: 31.53, style: 'small' },
  ];


  // ---------- Jerusalem and the Mount of Olives ----------
  const jerPlaces = [
    { id: 'antonia', name: 'Fortress Antonia', alt: 'The Roman barracks over the Temple courts', lon: 35.2334, lat: 31.7803, kind: 'episode', episodes: ['arrest', 'plot'], label: 'l',
      text: 'Herod’s fortress at the northwest corner of the Temple platform, garrisoned by a Roman cohort. Stairs led down from it into the Temple courts.' },
    { id: 'temple', name: 'The Temple', alt: 'Herod’s Temple on its great platform', lon: 35.2356, lat: 31.7781, kind: 'episode', episodes: ['entry', 'temple', 'pentecost', 'gate', 'trial'], label: 'r',
      text: 'Herod the Great began rebuilding the Temple around 20 BC, and work was still going on in Jesus’ day (John 2:20). Its platform covered about 14 hectares, one of the largest sacred precincts in the Roman world.' },
    { id: 'olivet', name: 'Mount of Olives road', short: 'Olivet road', alt: 'The descent toward the city', lon: 35.2428, lat: 31.7784, kind: 'episode', episodes: ['entry', 'fall'], label: 'r',
      text: 'The road from Bethany crosses the ridge and drops toward the Kidron Valley. Here the whole city suddenly comes into view.' },
    { id: 'antonia', name: 'Antonia Fortress', short: 'Antonia', alt: 'Roman garrison', lon: 35.2341, lat: 31.7809, kind: 'history', label: 'l',
      text: 'A fortress Herod named for Mark Antony, overlooking the Temple courts. Roman soldiers watched the crowds from it, especially at the feasts (Acts 21:31–35).' },
    { id: 'bethesda', name: 'Pool of Bethesda', short: 'Bethesda', alt: 'Two pools by the Sheep Gate', lon: 35.2362, lat: 31.7818, kind: 'locked', label: 'r', ref: 'John 5:1–15',
      text: 'John describes a pool with five porches. Excavations north of the Temple uncovered two large pools with porticoes, matching his description.' },
    { id: 'gethsemane', name: 'Gethsemane', alt: '“Oil press”', lon: 35.2397, lat: 31.7795, kind: 'locked', label: 'r', ref: 'Mark 14:32–50',
      text: 'An olive grove at the foot of the Mount of Olives, just across the Kidron from the Temple.' },
    { id: 'summit', name: 'Mount of Olives', alt: 'About 820 m', lon: 35.2455, lat: 31.7790, kind: 'locked', label: 'r', ref: 'Acts 1:12',
      text: 'The ridge east of the city, covered with olive groves and tombs. From here Luke places the ascension (Acts 1:12).' },
    { id: 'bethphage', name: 'Bethphage', alt: 'Village on the eastern slope', lon: 35.2532, lat: 31.7790, kind: 'history', label: 'r', ref: 'Mark 11:1',
      text: 'A small village on the road from Jericho, just over the ridge from Jerusalem.' },
    { id: 'bethany', name: 'Bethany', alt: 'Home of Mary, Martha and Lazarus', lon: 35.2615, lat: 31.7712, kind: 'locked', label: 'l', ref: 'John 11',
      text: 'A village about 3 km from Jerusalem on the road to Jericho. Jesus stayed here during the week before Passover (Mark 11:11).' },
    { id: 'siloam', name: 'Pool of Siloam', short: 'Siloam', alt: 'At the foot of the City of David', lon: 35.2352, lat: 31.7707, kind: 'locked', label: 'r', ref: 'John 9:1–11',
      text: 'A pool fed by Hezekiah’s tunnel. The steps of the first-century pool were uncovered in 2004.' },
    { id: 'palace', name: 'Herod’s Palace', short: 'Herod’s Palace', alt: 'Likely the Praetorium', lon: 35.2284, lat: 31.7762, kind: 'locked', label: 'l', ref: 'Mark 15:16',
      text: 'Herod the Great’s palace and towers on the western hill. Many historians think Pilate stayed and judged here when he came up for the feasts.' },
    { id: 'upperroom', name: 'The Upper Room', alt: 'Traditional site on Mount Zion', lon: 35.2288, lat: 31.7714, kind: 'episode', episodes: ['forty', 'seven', 'rhoda', 'jcouncil'], label: 'l',
      text: 'Mark says the disciples found “a large upper room furnished and ready.” Tradition places it on Mount Zion; the vaulted hall shown there today was built by Crusaders in the twelfth century.' },
    { id: 'highpriest', name: 'House of the High Priest', short: 'High priest’s house', alt: 'The Upper City', lon: 35.2314, lat: 31.7733, kind: 'episode', episodes: ['council'], label: 'r',
      text: 'The priestly families lived in fine houses on the western hill. Its exact location is not known.' },
    { id: 'freedmen', name: 'Synagogue of the Freedmen', short: 'Freedmen’s synagogue', alt: 'Site unknown; shown in the City of David', lon: 35.2358, lat: 31.7742, kind: 'episode', episodes: ['stephen'], label: 'r',
      text: 'Where Stephen debated Jews from Cyrene, Alexandria, Cilicia and Asia. Its location is unknown; a synagogue inscription found here in the City of David in 1913 may belong to it.' },
    { id: 'golgotha', name: 'Golgotha', alt: '“The place of a skull,” outside the wall', lon: 35.2296, lat: 31.7786, kind: 'episode', episodes: ['cross', 'burial', 'tomb'], label: 'l',
      text: 'An old quarry just outside the city wall of the time. The Church of the Holy Sepulchre has marked this site since the fourth century, covering both Golgotha and a rock-cut tomb.' },
  ];
  const jerNodes = {
    u1: { lon: 35.2310, lat: 31.7748, name: 'Upper City' }, t2: { lon: 35.2341, lat: 31.7760 }, l1: { lon: 35.2350, lat: 31.7735 },
    k1: { lon: 35.2386, lat: 31.7793 }, eg: { lon: 35.2377, lat: 31.7790 }, w1: { lon: 35.2290, lat: 31.7774 }, nb: { lon: 35.2352, lat: 31.7810 },
  };
  jerPlaces.forEach((p) => { jerNodes[p.id] = { lon: p.lon, lat: p.lat, name: p.name }; });
  const jerEdges = [
    ['bethany', 'bethphage'], ['bethphage', 'summit'], ['summit', 'olivet'], ['olivet', 'gethsemane'], ['gethsemane', 'k1'], ['k1', 'eg'], ['eg', 'temple'],
    ['temple', 't2'], ['t2', 'freedmen'], ['freedmen', 'l1'], ['t2', 'l1'], ['l1', 'siloam'], ['t2', 'u1'], ['u1', 'palace'], ['u1', 'highpriest'], ['u1', 'upperroom'], ['palace', 'w1'], ['w1', 'golgotha'],
    ['temple', 'antonia'], ['antonia', 'nb'], ['nb', 'bethesda'],
  ];
  const jerLabels = [
    { text: 'Kidron Valley', lon: 35.2392, lat: 31.7742, style: 'small' },
    { text: 'Hinnom Valley', lon: 35.2262, lat: 31.7712, style: 'small' },
    { text: 'Upper City', lon: 35.2296, lat: 31.7742, style: 'region' },
    { text: 'City of David', lon: 35.2360, lat: 31.7722, style: 'small' },
    { text: 'Mount of Olives', lon: 35.2462, lat: 31.7745, style: 'region' },
    { text: 'To Jericho', lon: 35.2640, lat: 31.7690, style: 'small' },
  ];

  D.regions = {
    galilee: {
      id: 'galilee', title: 'Galilee', lon0: 35.20, lon1: 35.75, lat0: 32.60, lat1: 33.05, w: 256, h: 250,
      texelKm: 0.2, scaleKm: 5, start: 'jv', places: galPlaces, nodes: galNodes, edges: galEdges, labels: galLabels,
    },
    land: {
      id: 'land', title: 'The Land', lon0: 34.20, lon1: 36.40, lat0: 30.95, lat1: 33.65, w: 192, h: 300,
      texelKm: 1.0, scaleKm: 20, start: 'capernaum', fog: true, places: landPlaces, nodes: landNodes, edges: landEdges, labels: landLabels,
      // the Galilee map, outlined on this one
      box: { lon0: 35.20, lon1: 35.75, lat0: 32.60, lat1: 33.05 },
    },
    jerusalem: {
      id: 'jerusalem', title: 'Jerusalem', lon0: 35.2150, lon1: 35.2680, lat0: 31.7570, lat1: 31.8000, w: 250, h: 238,
      texelKm: 0.02, scaleKm: 0.5, start: 'u1', places: jerPlaces, nodes: jerNodes, edges: jerEdges, labels: jerLabels, city: true,
    },
  };
  // ---------- Era IV: Syria, Cilicia and Cyprus ----------
  const eastPlaces = [
    { id: 'toland', name: 'Judea, Samaria and Galilee', short: 'The Land', alt: 'Back to the map of the Land', lon: 35.25, lat: 32.10, kind: 'zoom', zoom: 'land', label: 'r' },
    { id: 'caesarea', name: 'Caesarea', alt: 'The governors’ harbor city', lon: 34.890, lat: 32.500, kind: 'history', label: 'l', ref: 'Acts 10:1',
      text: 'Herod’s great harbor, where Peter preached to Cornelius. The believers later brought Saul down here to send him home to Tarsus (Acts 9:30).' },
    { id: 'ptolemais', name: 'Ptolemais', alt: 'Akko', lon: 35.070, lat: 32.925, kind: 'history', label: 'l', ref: 'Acts 21:7', text: 'An old Phoenician port on the coastal road north.' },
    { id: 'tyre', name: 'Tyre', alt: 'The island city of the Phoenicians', lon: 35.200, lat: 33.270, kind: 'history', label: 'l', ref: 'Acts 11:19',
      text: 'Phoenicia was one of the first places the scattered believers reached (Acts 11:19). Jesus had once gone to the region of Tyre and Sidon (Mark 7:24).' },
    { id: 'sidon', name: 'Sidon', alt: 'Phoenician port', lon: 35.370, lat: 33.560, kind: 'history', label: 'l', ref: 'Acts 27:3', text: 'A Phoenician harbor city on the road north to Syria.' },
    { id: 'damascus', name: 'Damascus', alt: 'Where Saul received his sight', lon: 36.292, lat: 33.513, kind: 'history', label: 'r', ref: 'Acts 9',
      text: 'The oasis city where Saul was led blind into Straight Street, and later let down the wall in a basket (Acts 9:25).' },
    { id: 'antioch', name: 'Antioch', alt: 'Capital of Syria, third city of the empire', lon: 36.160, lat: 36.200, kind: 'episode', episodes: ['antioch', 'cyprus'], label: 'r',
      text: 'Antioch on the Orontes, seat of the governor of Syria, with perhaps a quarter of a million people and a large Jewish community.' },
    { id: 'seleucia', name: 'Seleucia', alt: 'Antioch’s port', lon: 35.930, lat: 36.120, kind: 'history', label: 'l', ref: 'Acts 13:4', text: 'The harbor at the mouth of the Orontes, from which Barnabas and Saul would one day sail for Cyprus.' },
    { id: 'tarsus', name: 'Tarsus', alt: 'Chief city of Cilicia', lon: 34.900, lat: 36.920, kind: 'history', label: 'l', ref: 'Acts 9:30; 11:25',
      text: 'Saul’s home city, “a citizen of no insignificant city” (Acts 21:39). After Damascus and Jerusalem he went home here, until Barnabas came looking for him.' },
    { id: 'salamis', name: 'Salamis', alt: 'Cyprus', lon: 33.900, lat: 35.180, kind: 'history', label: 'r', ref: 'Acts 13:5', text: 'The chief port of eastern Cyprus. Barnabas was a Levite of Cyprus (Acts 4:36), and believers from Cyprus first preached to Greeks in Antioch (11:20).' },
    { id: 'paphos', name: 'Paphos', alt: 'Seat of the governor of Cyprus', lon: 32.420, lat: 34.760, kind: 'history', label: 'l', ref: 'Acts 13:6', text: 'The Roman capital of Cyprus, on its western coast.' },
    { id: 'perga', name: 'Perga', alt: 'Pamphylia', lon: 30.854, lat: 36.961, kind: 'history', label: 'r', ref: 'Acts 13:13; 14:25', text: 'A Greek city on the Pamphylian plain, where John Mark turned back.' },
    { id: 'attalia', name: 'Attalia', alt: 'The port of Pamphylia', lon: 30.704, lat: 36.886, kind: 'history', label: 'l', ref: 'Acts 14:25–26', text: 'The harbor from which Paul and Barnabas sailed home to Syrian Antioch.' },
    { id: 'pisidia', name: 'Antioch of Pisidia', alt: 'A Roman colony in the highlands', lon: 31.189, lat: 38.306, kind: 'episode', episodes: ['pisidia'], label: 'r',
      text: 'A Roman colony settled by veteran soldiers, over 1,000 m up on the plateau, with a Jewish community and its synagogue.' },
    { id: 'iconium', name: 'Iconium', alt: 'Konya', lon: 32.494, lat: 37.874, kind: 'history', label: 'r', ref: 'Acts 14:1–6', text: 'A prosperous city where a great multitude of Jews and Greeks believed, and the city was divided.' },
    { id: 'lystra', name: 'Lystra', alt: 'A Roman colony in Lycaonia', lon: 32.330, lat: 37.580, kind: 'episode', episodes: ['lystra'], label: 'l',
      text: 'A small Roman colony on the Lycaonian plain, home of Timothy and his mother and grandmother (Acts 16:1; 2 Timothy 1:5).' },
    { id: 'towest', name: 'West to Rome', short: 'Rome', alt: 'Crete, Malta, Sicily and Italy', lon: 29.85, lat: 36.55, kind: 'zoom', zoom: 'west', label: 'r' },
    { id: 'toaegean', name: 'West to Asia and Macedonia', short: 'The Aegean', alt: 'Troas, Philippi, Athens, Corinth and Ephesus', lon: 29.90, lat: 38.45, kind: 'zoom', zoom: 'aegean', label: 'r' },
    { id: 'derbe', name: 'Derbe', alt: 'The edge of Lycaonia', lon: 33.360, lat: 37.350, kind: 'history', label: 'r', ref: 'Acts 14:20–21', text: 'The farthest city of the first journey, where many became disciples.' },
  ];
  const eastNodes = {
    e1: { lon: 35.500, lat: 33.890 }, e2: { lon: 35.640, lat: 34.120 }, e3: { lon: 35.840, lat: 34.440 }, e4: { lon: 35.820, lat: 35.400 },
    e5: { lon: 36.000, lat: 35.900 }, e6: { lon: 36.200, lat: 36.480 }, e7: { lon: 36.170, lat: 36.620 }, e8: { lon: 36.180, lat: 36.850 },
    e9: { lon: 35.320, lat: 36.990 }, e10: { lon: 35.850, lat: 33.600 }, c1: { lon: 33.350, lat: 35.050 },
    g1: { lon: 30.950, lat: 37.400 }, g2: { lon: 31.900, lat: 38.050 }, g3: { lon: 34.750, lat: 37.280 },
  };
  const eastEdges = [
    ['toland', 'caesarea'], ['caesarea', 'ptolemais'], ['ptolemais', 'tyre'], ['tyre', 'sidon'], ['sidon', 'e1'], ['e1', 'e2'], ['e2', 'e3'], ['e3', 'e4'], ['e4', 'e5'], ['e5', 'antioch'],
    ['antioch', 'seleucia'], ['antioch', 'e6'], ['e6', 'e7'], ['e7', 'e8'], ['e8', 'e9'], ['e9', 'tarsus'],
    ['sidon', 'e10'], ['e10', 'damascus'], ['toland', 'damascus'],
    ['seleucia', 'salamis', 'boat'], ['salamis', 'c1'], ['c1', 'paphos'], ['caesarea', 'seleucia', 'boat'],
    ['paphos', 'perga', 'boat'], ['perga', 'attalia'], ['attalia', 'seleucia', 'boat'], ['perga', 'g1'], ['g1', 'pisidia'],
    ['pisidia', 'g2'], ['g2', 'iconium'], ['iconium', 'lystra'], ['lystra', 'derbe'], ['derbe', 'g3'], ['g3', 'tarsus'],
    ['pisidia', 'toaegean'], ['attalia', 'towest', 'boat'],
  ];
  const eastLabels = [
    { text: 'Syria', lon: 36.75, lat: 35.05, style: 'region' },
    { text: 'Phoenicia', lon: 35.95, lat: 33.95, style: 'small' },
    { text: 'Cilicia', lon: 34.30, lat: 37.12, style: 'region' },
    { text: 'Cyprus', lon: 33.15, lat: 34.95, style: 'small' },
    { text: 'The Great Sea', lon: 33.30, lat: 33.30, style: 'water' },
    { text: 'Orontes', lon: 36.55, lat: 35.45, style: 'river' },
    { text: 'Taurus', lon: 33.40, lat: 37.20, style: 'small' },
    { text: 'Amanus', lon: 36.62, lat: 36.70, style: 'small' },
    { text: 'Pamphylia', lon: 31.30, lat: 36.98, style: 'small' },
    { text: 'Pisidia', lon: 30.95, lat: 37.70, style: 'small' },
    { text: 'Lycaonia', lon: 33.10, lat: 37.80, style: 'small' },
    { text: 'Galatia', lon: 32.20, lat: 38.45, style: 'region' },
  ];
  eastPlaces.forEach((p) => { eastNodes[p.id] = { lon: p.lon, lat: p.lat, name: p.name }; });
  D.regions.east = {
    id: 'east', title: 'The Roman East', lon0: 29.60, lon1: 37.20, lat0: 31.60, lat1: 38.60, w: 250, h: 292,
    texelKm: 2.7, scaleKm: 50, start: 'tyre', places: eastPlaces, nodes: eastNodes, edges: eastEdges, labels: eastLabels,
    box: { lon0: 34.20, lon1: 36.40, lat0: 31.60, lat1: 33.65 }, boxZoom: 'land', boxLabel: 'Tap to open the map of the Land',
  };
  D.regions.east.subtitle = 'c. AD 36–49';
  // ---------- Era IV: the Aegean ----------
  const aegPlaces = [
    { id: 'toeast', name: 'East to Galatia and Syria', short: 'The East', alt: 'Back to the map of the Roman East', lon: 28.40, lat: 38.70, kind: 'zoom', zoom: 'east', label: 'l' },
    { id: 'troas', name: 'Troas', alt: 'Alexandria Troas, a port near old Troy', lon: 26.155, lat: 39.752, kind: 'history', label: 'l', ref: 'Acts 16:8–11; 20:6–12',
      text: 'A Roman colony and harbor on the Aegean. Here Paul saw the man of Macedonia in a vision, and here the “we” of Acts begins.' },
    { id: 'samothrace', name: 'Samothrace', alt: 'An island on the way', lon: 25.55, lat: 40.47, kind: 'history', label: 'r', ref: 'Acts 16:11', text: 'A mountainous island where ships from Troas put in overnight.' },
    { id: 'neapolis', name: 'Neapolis', alt: 'Kavala, the port of Philippi', lon: 24.410, lat: 40.937, kind: 'history', label: 'r', ref: 'Acts 16:11', text: 'The harbor where Paul first set foot in Europe.' },
    { id: 'philippi', name: 'Philippi', alt: 'A Roman colony in Macedonia', lon: 24.287, lat: 41.013, kind: 'episode', episodes: ['lydia', 'jailer', 'letter'], label: 'l',
      text: 'A Roman colony on the Via Egnatia, settled with veterans after the battle fought here in 42 BC. Few Jews lived here; there seems to have been no synagogue.' },
    { id: 'amphipolis', name: 'Amphipolis', alt: 'On the Strymon', lon: 23.845, lat: 40.822, kind: 'history', label: 'r', ref: 'Acts 17:1', text: 'A Macedonian city on the Via Egnatia, passed through on the road to Thessalonica.' },
    { id: 'thessalonica', name: 'Thessalonica', alt: 'Capital of Macedonia', lon: 22.944, lat: 40.632, kind: 'episode', episodes: ['berea'], label: 'r', text: 'The capital of the province, a great port, where Paul reasoned three Sabbaths in the synagogue.' },
    { id: 'berea', name: 'Berea', alt: 'Veria', lon: 22.203, lat: 40.524, kind: 'history', label: 'l', ref: 'Acts 17:10–14', text: 'Where the Jews “received the word with all readiness,” examining the Scriptures daily.' },
    { id: 'athens', name: 'Athens', alt: 'The city of the philosophers', lon: 23.727, lat: 37.972, kind: 'episode', episodes: ['athens'], label: 'r', text: 'Past its greatest days but still the home of philosophy, full of temples and statues. Paul spoke at the Areopagus.' },
    { id: 'corinth', name: 'Corinth', alt: 'Capital of Achaia', lon: 22.880, lat: 37.906, kind: 'episode', episodes: ['corinth'], label: 'l', text: 'A rich Roman colony on the isthmus between two seas, where Paul stayed eighteen months with Priscilla and Aquila.' },
    { id: 'cenchreae', name: 'Cenchreae', alt: 'Corinth’s eastern port', lon: 22.990, lat: 37.884, kind: 'history', label: 'r', ref: 'Acts 18:18; Romans 16:1', text: 'Home of Phoebe, a servant of the church there (Romans 16:1).' },
    { id: 'ephesus', name: 'Ephesus', alt: 'Chief city of Asia', lon: 27.341, lat: 37.940, kind: 'episode', episodes: ['artemis', 'lamps'], label: 'r', text: 'A great harbor city with the temple of Artemis, one of the wonders of the world. Paul taught here for two years.' },
    { id: 'miletus', name: 'Miletus', alt: 'An old Ionian port', lon: 27.278, lat: 37.530, kind: 'episode', episodes: ['farewell'], label: 'r', text: 'Where Paul said farewell to the elders of Ephesus.' },
    { id: 'thyatira', name: 'Thyatira', alt: 'A city of dyers', lon: 27.837, lat: 38.918, kind: 'history', label: 'r', ref: 'Acts 16:14; Revelation 2:18', text: 'Lydia’s home city, known for its trade guilds and its purple dye.' },
    { id: 'smyrna', name: 'Smyrna', alt: 'İzmir', lon: 27.140, lat: 38.420, kind: 'history', label: 'l', ref: 'Revelation 2:8', text: 'A great harbor city of Asia, one of the seven churches of Revelation.' },
    { id: 'colossae', name: 'Colossae', alt: 'A town in the Lycus valley', lon: 29.22, lat: 37.79, kind: 'episode', episodes: ['onesimus'], label: 'r',
      text: 'A small town in the valley of the Lycus, home of Philemon, Apphia, Archippus and the church that met in their house. Paul had never visited it.' },
    { id: 'laodicea', name: 'Laodicea', alt: 'A rich city of bankers and wool', lon: 29.11, lat: 37.84, kind: 'history', label: 'l', ref: 'Colossians 4:16; Revelation 3:14–22', text: 'A wealthy city a few hours’ walk from Colossae, famous for banking, black wool and an eye salve.' },
    { id: 'hierapolis', name: 'Hierapolis', alt: 'The city of the hot springs', lon: 29.12, lat: 37.93, kind: 'history', label: 'r', ref: 'Colossians 4:13', text: 'Known for its hot mineral springs and white terraces, across the valley from Laodicea.' },
    { id: 'patmos', name: 'Patmos', alt: 'A small rocky island', lon: 26.55, lat: 37.32, kind: 'episode', episodes: ['allnew'], label: 'l',
      text: 'A small, bare island off the coast of Asia, where John was “because of God’s Word and the testimony of Jesus Christ” (Revelation 1:9).' },
    { id: 'pergamum', name: 'Pergamum', alt: 'A royal city on its hill', lon: 27.18, lat: 39.13, kind: 'history', label: 'r', ref: 'Revelation 2:12–17', text: 'An old royal capital with a great altar of Zeus and a temple to the emperor: “where Satan’s throne is.”' },
    { id: 'sardis', name: 'Sardis', alt: 'Once the city of Croesus', lon: 28.04, lat: 38.49, kind: 'history', label: 'r', ref: 'Revelation 3:1–6', text: 'A city living on its famous past: “you have a reputation of being alive, but you are dead.”' },
    { id: 'philadelphia', name: 'Philadelphia', alt: 'A small city on the road east', lon: 28.52, lat: 38.35, kind: 'history', label: 'r', ref: 'Revelation 3:7–13', text: 'A small church with “a little power,” before which stood an open door.' },
    { id: 'assos', name: 'Assos', alt: 'A harbor on the Troad', lon: 26.337, lat: 39.488, kind: 'history', label: 'r', ref: 'Acts 20:13–14', text: 'Paul walked here overland from Troas to meet the ship.' },
  ];
  const aegNodes = {
    a1: { lon: 27.50, lat: 39.60 }, a2: { lon: 23.50, lat: 40.65 }, a3: { lon: 22.55, lat: 40.30 }, a4: { lon: 23.45, lat: 38.02 }, a5: { lon: 27.80, lat: 38.30 },
  };
  aegPlaces.forEach((p) => { aegNodes[p.id] = { lon: p.lon, lat: p.lat, name: p.name }; });
  const aegEdges = [
    ['toeast', 'a1'], ['a1', 'troas'], ['ephesus', 'patmos', 'boat'], ['thyatira', 'pergamum'], ['thyatira', 'sardis'], ['sardis', 'philadelphia'], ['philadelphia', 'laodicea'], ['a5', 'laodicea'], ['laodicea', 'colossae'], ['laodicea', 'hierapolis'], ['troas', 'assos'], ['a1', 'thyatira'], ['thyatira', 'smyrna'], ['toeast', 'a5'], ['a5', 'ephesus'], ['ephesus', 'smyrna'], ['ephesus', 'miletus'],
    ['troas', 'samothrace', 'boat'], ['samothrace', 'neapolis', 'boat'], ['neapolis', 'philippi'], ['philippi', 'amphipolis'], ['amphipolis', 'a2'], ['a2', 'thessalonica'],
    ['thessalonica', 'berea'], ['berea', 'a3'], ['a3', 'athens', 'boat'], ['athens', 'a4'], ['a4', 'corinth'], ['corinth', 'cenchreae'], ['cenchreae', 'ephesus', 'boat'],
  ];
  const aegLabels = [
    { text: 'Macedonia', lon: 22.90, lat: 41.20, style: 'region' }, { text: 'Achaia', lon: 22.30, lat: 37.55, style: 'region' }, { text: 'Asia', lon: 28.00, lat: 39.20, style: 'region' },
    { text: 'Thrace', lon: 25.80, lat: 41.30, style: 'small' }, { text: 'Mysia', lon: 27.30, lat: 39.90, style: 'small' }, { text: 'Aegean Sea', lon: 25.10, lat: 38.90, style: 'water' },
    { text: 'Olympus', lon: 22.15, lat: 40.15, style: 'small' }, { text: 'Hellespont', lon: 26.55, lat: 40.15, style: 'river' },
  ];
  D.regions.aegean = {
    id: 'aegean', title: 'The Aegean', lon0: 21.60, lon1: 29.70, lat0: 36.60, lat1: 41.60, w: 296, h: 238,
    texelKm: 2.3, scaleKm: 50, start: 'troas', places: aegPlaces, nodes: aegNodes, edges: aegEdges, labels: aegLabels,
  };
  D.regions.aegean.subtitle = 'c. AD 49–57';
  // ---------- Era IV: the voyage to Rome ----------
  const westPlaces = [
    { id: 'toeastw', name: 'East to Pamphylia and Syria', short: 'The East', alt: 'Back to the map of the Roman East', lon: 30.15, lat: 37.20, kind: 'zoom', zoom: 'east', label: 'l' },
    { id: 'myra', name: 'Myra', alt: 'A port of Lycia', lon: 29.98, lat: 36.26, kind: 'history', label: 'l', ref: 'Acts 27:5–6', text: 'Where the centurion found a grain ship of Alexandria bound for Italy.' },
    { id: 'cnidus', name: 'Cnidus', alt: 'A headland of Caria', lon: 27.37, lat: 36.68, kind: 'history', label: 'l', ref: 'Acts 27:7', text: 'Here the northwest wind stopped them, and they ran south for the shelter of Crete.' },
    { id: 'salmone', name: 'Salmone', alt: 'The eastern cape of Crete', lon: 26.30, lat: 35.30, kind: 'history', label: 'r', ref: 'Acts 27:7', text: 'They rounded Crete’s eastern point and crept along its southern shore.' },
    { id: 'fairhavens', name: 'Fair Havens', alt: 'Near Lasea, on Crete’s south coast', lon: 24.80, lat: 34.93, kind: 'episode', episodes: ['storm'], label: 'r',
      text: 'A small open bay on the south coast of Crete, poor shelter for a winter. Paul warned them not to sail on.' },
    { id: 'phoenix', name: 'Phoenix', alt: 'The harbor they never reached', lon: 24.08, lat: 35.20, kind: 'history', label: 'l', ref: 'Acts 27:12', text: 'A better harbor further west, where they hoped to spend the winter.' },
    { id: 'clauda', name: 'Clauda', alt: 'Gavdos', lon: 24.08, lat: 34.84, kind: 'history', label: 'l', ref: 'Acts 27:16', text: 'A small island in whose lee they hauled in the ship’s boat and bound the hull with cables.' },
    { id: 'malta', name: 'Malta', alt: 'Melita', lon: 14.43, lat: 35.90, kind: 'episode', episodes: ['malta'], label: 'r',
      text: 'Where the ship ran aground after fourteen days adrift, and all 276 aboard reached land.' },
    { id: 'syracuse', name: 'Syracuse', alt: 'The great city of Sicily', lon: 15.29, lat: 37.07, kind: 'history', label: 'r', ref: 'Acts 28:12', text: 'An old Greek city and harbor, where they stayed three days.' },
    { id: 'rhegium', name: 'Rhegium', alt: 'Reggio, on the toe of Italy', lon: 15.65, lat: 38.11, kind: 'history', label: 'r', ref: 'Acts 28:13', text: 'On the straits between Sicily and Italy.' },
    { id: 'puteoli', name: 'Puteoli', alt: 'The port for Rome’s grain', lon: 14.12, lat: 40.82, kind: 'history', label: 'r', ref: 'Acts 28:13–14', text: 'The great harbor on the Bay of Naples where the grain ships of Alexandria unloaded. Believers were already here.' },
    { id: 'forumappii', name: 'The Market of Appius', alt: 'Forum Appii, on the Appian Way', lon: 13.04, lat: 41.43, kind: 'history', label: 'r', ref: 'Acts 28:15', text: 'A market town about 65 km from Rome, where believers came out to meet Paul.' },
    { id: 'threetaverns', name: 'The Three Taverns', alt: 'A way station on the Appian Way', lon: 12.86, lat: 41.66, kind: 'history', label: 'l', ref: 'Acts 28:15', text: 'About 50 km from Rome, where a second group of believers met him.' },
    { id: 'rome', name: 'Rome', alt: 'The city of the emperor', lon: 12.48, lat: 41.89, kind: 'episode', episodes: ['rome', 'goodfight'], label: 'l',
      text: 'The capital of the empire, a city of perhaps a million people, with a Jewish community and a church that had existed for years before Paul came.' },
  ];
  const westNodes = { w1: { lon: 20.0, lat: 35.2 }, w2: { lon: 17.0, lat: 35.6 } };
  westPlaces.forEach((p) => { westNodes[p.id] = { lon: p.lon, lat: p.lat, name: p.name }; });
  const westEdges = [
    ['toeastw', 'myra'], ['myra', 'cnidus', 'boat'], ['cnidus', 'salmone', 'boat'], ['salmone', 'fairhavens', 'boat'], ['fairhavens', 'phoenix', 'boat'], ['fairhavens', 'clauda', 'boat'],
    ['clauda', 'w1', 'boat'], ['w1', 'w2', 'boat'], ['w2', 'malta', 'boat'], ['malta', 'syracuse', 'boat'], ['syracuse', 'rhegium', 'boat'], ['rhegium', 'puteoli', 'boat'],
    ['puteoli', 'forumappii'], ['forumappii', 'threetaverns'], ['threetaverns', 'rome'],
  ];
  const westLabels = [
    { text: 'Italia', lon: 15.4, lat: 41.2, style: 'region' }, { text: 'Sicilia', lon: 14.1, lat: 37.4, style: 'small' }, { text: 'Achaia', lon: 21.9, lat: 37.6, style: 'region' },
    { text: 'Creta', lon: 25.0, lat: 35.62, style: 'small' }, { text: 'Lycia', lon: 29.4, lat: 36.75, style: 'small' }, { text: 'Africa', lon: 13.0, lat: 32.7, style: 'small' },
    { text: 'Sea of Adria', lon: 18.8, lat: 37.3, style: 'water' }, { text: 'Mare Nostrum', lon: 21.0, lat: 34.0, style: 'water' }, { text: 'Via Appia', lon: 13.7, lat: 41.15, style: 'river' },
  ];
  D.regions.west = {
    id: 'west', title: 'The Voyage to Rome', lon0: 11.0, lon1: 30.6, lat0: 32.4, lat1: 42.6, w: 280, h: 190,
    texelKm: 6.0, scaleKm: 200, start: 'myra', places: westPlaces, nodes: westNodes, edges: westEdges, labels: westLabels,
  };
  D.regions.west.subtitle = 'c. AD 59–62';
  D.regions.galilee.subtitle = 'c. AD 28';
  D.regions.land.subtitle = 'c. AD 28–30';
  D.regions.jerusalem.subtitle = 'Passover, c. AD 30';
  // map ids shared between the two regions (for keeping the traveller in the same place)
  D.sameNode = { capernaum: 'capernaum', tiberias: 'tiberias', nazareth: 'nazareth', hippos: 'hippos2' };

  TW.D = D;
})(window.TW);
