/* The Way — Testimonies: the scribe seeks out eyewitnesses and hears their accounts.
   Rule: what a witness recounts is shown as Scripture, word for word. Only the framing around it is dramatization. */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, SC = TW.Scene, K = TW.Kit, P = TW.P, S = TW.S, D = TW.D;
  const R = K.R;

  // blocks: ['s', passage, from, to] Scripture | ['d', text] the witness speaks | ['n', text] narration | ['h', text] history
  D.testimonies = {
    attendant: {
      title: 'The synagogue attendant', witness: 'The synagogue attendant', place: 'capernaum', region: 'galilee', era: 'galilee', after: 'capernaum', set: 'synagogue',
      look: { skin: '#a06a42', hair: '#5f5048', beard: '#5f5048', tunic: '#cdbb94', mantle: '#6a5a42' },
      intro: [['n', 'The old man who keeps the scrolls in Capernaum’s synagogue is sweeping out the hall. He remembers the first Sabbath the teacher spoke here.']],
      asks: [
        { id: 'taught', scene: 'syn_teach', q: 'What was it like when he first taught here?', say: [['s', 'mark1b', '1:21', '1:22'], ['d', 'I have handed the scroll to a hundred teachers. They tell you what other teachers said. He did not.']], note: 'In Capernaum’s synagogue he taught as one having authority, not as the scribes (Mark 1:22).' },
        { id: 'spirit', scene: 'syn_spirit', q: 'They say a man cried out during the service.', say: [['c', 'cry'], ['s', 'mark1b', '1:23', '1:24'], ['c', 'rebuke'], ['s', 'mark1b', '1:25', '1:26'], ['c', 'calm'], ['s', 'mark1b', '1:27', '1:28']], note: 'He silenced an unclean spirit with a word, and the spirit obeyed (Mark 1:25–27).' },
      ],
      outro: [['n', 'He goes back to his sweeping, then stops. “Ask yourself the question we all asked,” he says. “What is this?”']],
    },
    motherinlaw: {
      title: 'Simon’s wife’s mother', witness: 'Simon’s wife’s mother', place: 'capernaum', region: 'galilee', era: 'galilee', after: 'capernaum', set: 'street',
      look: { skin: '#a8724a', hair: '#5f5048', tunic: '#7a5a3a', veil: '#6a4e3a' },
      intro: [['n', 'An older woman is sweeping the threshold of a house near the synagogue. When you ask about the teacher, she sets her broom against the wall.']],
      asks: [
        { id: 'fever', scene: 'mil_fever', q: 'They say you were sick when he first came here.', say: [['d', 'I was burning with fever. I could not lift my head.'], ['c', 'enter'], ['s', 'mark1b', '1:29', '1:30'], ['c', 'raise'], ['s', 'mark1b', '1:31', '1:31'], ['c', 'serve']], note: 'He took Simon’s mother-in-law by the hand, and the fever left her (Mark 1:31).' },
        { id: 'evening', scene: 'mil_evening', q: 'What happened that evening?', say: [['s', 'mark1b', '1:32', '1:33'], ['c', 'heal'], ['s', 'mark1b', '1:34', '1:34'], ['d', 'The whole town at our door. I have never seen this street so full, before or since.']], note: 'At sunset the whole town brought their sick to the door of Simon’s house (Mark 1:32–34).' },
      ],
      outro: [['n', 'She picks up her broom again. “Write it down, scribe. The fever left, and I got up and served them.”']],
    },
    jairus: {
      title: 'Jairus', witness: 'Jairus, a ruler of the synagogue', place: 'capernaum', region: 'galilee', era: 'galilee', after: 'legion', set: 'house',
      look: { skin: '#a8724a', hair: '#2a1a12', beard: '#2a1a12', tunic: '#d8ccae', mantle: '#4a4a5a', fringe: '#9cc0e0' },
      intro: [['n', 'Jairus is one of the rulers of the synagogue. Men like him rarely talk about this teacher to a scribe from Jerusalem. He talks to you anyway, while a girl’s voice drifts in from the next room.']],
      asks: [
        { id: 'begged', scene: 'jai_beg', q: 'Why did a ruler of the synagogue go to him?', say: [['s', 'mark5b', '5:21', '5:21'], ['c', 'kneel'], ['s', 'mark5b', '5:22', '5:23'], ['c', 'go'], ['s', 'mark5b', '5:24', '5:24'], ['d', 'I did not care who saw me on my knees. She was twelve.']], note: 'Jairus fell at his feet and begged him to come to his dying daughter (Mark 5:22–23).' },
        { id: 'woman', scene: 'jai_woman', q: 'What held him up on the way?', say: [['s', 'mark5b', '5:25', '5:26'], ['c', 'touch'], ['s', 'mark5b', '5:27', '5:29'], ['c', 'turn'], ['s', 'mark5b', '5:30', '5:32'], ['c', 'kneel'], ['s', 'mark5b', '5:33', '5:34'], ['d', 'He stopped. With my daughter dying, he stopped for her. I did not understand then.']], note: 'A woman ill for twelve years touched his clothes and was healed; he called her “Daughter” (Mark 5:25–34).' },
        { id: 'house', scene: 'jai_house', q: 'What happened at your house?', say: [['s', 'mark5b', '5:35', '5:37'], ['c', 'enter'], ['s', 'mark5b', '5:38', '5:39'], ['c', 'out'], ['s', 'mark5b', '5:40', '5:40'], ['c', 'rise'], ['s', 'mark5b', '5:41', '5:43']], note: 'He took the dead girl by the hand and said, “Talitha cumi,” and she rose (Mark 5:41–42).' },
      ],
      outro: [['n', 'From the next room comes a girl’s laugh. Jairus does not finish his sentence.'], ['h', '“Talitha cumi” is Aramaic, the everyday language of Galilee. Mark kept Jesus’ own words.']],
    },
    cana: {
      title: 'A servant from the wedding', witness: 'A servant from the wedding at Cana', place: 'cana', region: 'galilee', era: 'galilee', after: 'capernaum', set: 'village',
      look: { skin: '#9a6440', hair: '#2a1a12', tunic: '#b49a6a' },
      intro: [['n', 'In Cana you find a man who served at a wedding there. When you mention the teacher from Nazareth, he laughs out loud.']],
      asks: [
        { id: 'wine', scene: 'cana_feast', q: 'What happened at the wedding?', say: [['s', 'john2', '2:1', '2:2'], ['c', 'mary'], ['s', 'john2', '2:3', '2:4'], ['c', 'servants'], ['s', 'john2', '2:5', '2:5'], ['d', 'To run out of wine at your own wedding! The family would never have lived it down.']], note: 'At a wedding in Cana the wine ran out, and his mother told the servants, “Whatever he says to you, do it” (John 2:3–5).' },
        { id: 'jars', scene: 'cana_jars', q: 'What did he tell you to do?', say: [['s', 'john2', '2:6', '2:7'], ['c', 'fill'], ['s', 'john2', '2:8', '2:8'], ['c', 'draw'], ['h', 'The stone jars held water for ritual washing, and each held roughly 75 to 115 litres. Stone, unlike pottery, was thought not to become unclean.']], note: 'He had the servants fill six stone purification jars with water and draw some out (John 2:6–8).' },
        { id: 'taste', scene: 'cana_taste', q: 'And what was in the jars?', say: [['c', 'taste'], ['s', 'john2', '2:9', '2:11'], ['d', 'The master of the feast never knew where it came from. We knew. We drew it.']], note: 'The water became wine, the best of the feast; John calls it the beginning of his signs (John 2:9–11).' },
      ],
      outro: [['n', 'He shakes his head, still smiling. “Six jars. We filled them to the brim.”']],
    },
    loaves: {
      title: 'A man from the crowd', witness: 'A man who was in the crowd', place: 'bethsaida', region: 'galilee', era: 'galilee', after: 'legion', set: 'field',
      look: { skin: '#b8845a', hair: '#3a2416', beard: '#3a2416', tunic: '#8a7a5a' },
      intro: [['n', 'Near Bethsaida a farmer points to a slope of thick spring grass above the lake. “There,” he says. “I was sitting right there.”']],
      asks: [
        { id: 'crowd', scene: 'loaves_crowd', q: 'Why were so many people out here?', say: [['s', 'john6', '6:1', '6:2'], ['c', 'gather'], ['s', 'john6', '6:3', '6:7']], note: 'A great crowd followed him across the lake because of the signs he did (John 6:1–2).' },
        { id: 'bread', scene: 'loaves_bread', q: 'Where did the food come from?', say: [['c', 'boy'], ['s', 'john6', '6:8', '6:10'], ['c', 'bless'], ['s', 'john6', '6:11', '6:11'], ['c', 'share'], ['d', 'Barley loaves. Poor men’s bread. And everyone ate until they were full.']], note: 'From a boy’s five barley loaves and two fish he fed about five thousand men (John 6:9–11).' },
        { id: 'king', scene: 'loaves_king', q: 'What did the people do afterward?', say: [['s', 'john6', '6:12', '6:13'], ['c', 'baskets'], ['s', 'john6', '6:14', '6:14'], ['c', 'king'], ['s', 'john6', '6:15', '6:15'], ['c', 'withdraw'], ['d', 'We would have made him king that very night. He walked away from us into the hills.']], note: 'The crowd wanted to make him king by force, and he withdrew alone (John 6:15).' },
      ],
      outro: [['n', 'He pulls up a handful of grass and lets it fall. “Twelve baskets left over. I helped carry one.”']],
    },
    samaritan: {
      title: 'A woman of Sychar', witness: 'A woman of Sychar', place: 'sychar', region: 'land', era: 'galilee', after: 'levi', set: 'village', prop: 'well',
      look: { skin: '#a06a42', hair: '#1e1410', tunic: '#8a3a2a', veil: '#9a7a5a' },
      intro: [['n', 'To save days on the road you have come through Samaria. At Jacob’s well outside Sychar a woman lowers her bucket. You have none of your own, and Jews do not share vessels with Samaritans. She looks at your fringes and waits.'], ['h', 'Samaritans worshiped on Mount Gerizim, above this well, and accepted only the five books of Moses. Jews and Samaritans had despised each other for centuries.']],
      asks: [
        { id: 'well', scene: 'sam_well', q: 'Did a Galilean teacher stop at this well?', say: [['s', 'john4', '4:5', '4:6'], ['c', 'arrive'], ['s', 'john4', '4:7', '4:9'], ['d', 'A Jew, asking me for a drink. You are the second I have seen do something strange at this well.']], note: 'Tired from the road, he asked a Samaritan woman for a drink at Jacob’s well (John 4:6–9).' },
        { id: 'water', scene: 'sam_talk', q: 'What did he say to you?', say: [['s', 'john4', '4:10', '4:15']], note: 'He offered her living water that would become a spring of eternal life (John 4:10–14).' },
        { id: 'knew', scene: 'sam_talk', q: 'They say he knew all about you.', say: [['s', 'john4', '4:16', '4:18'], ['c', 'step'], ['s', 'john4', '4:19', '4:19'], ['d', 'He knew everything, and he still asked me for a drink.']], note: 'He told her the truth about her life, and she called him a prophet (John 4:16–19).' },
        { id: 'worship', scene: 'sam_talk', q: 'What did he say about where to worship?', say: [['s', 'john4', '4:20', '4:24'], ['c', 'near'], ['s', 'john4', '4:25', '4:26']], note: 'He said true worshippers will worship the Father in spirit and truth, and told her, “I am he” (John 4:23–26).' },
        { id: 'town', scene: 'sam_town', q: 'What did the town do?', say: [['s', 'john4', '4:27', '4:28'], ['c', 'run'], ['s', 'john4', '4:29', '4:30'], ['c', 'come'], ['s', 'john4', '4:39', '4:42']], note: 'Many Samaritans of Sychar believed, and called him “the Savior of the world” (John 4:39–42).' },
      ],
      outro: [['n', 'She fills her jar and, without a word, tips it toward you so you can drink.']],
    },
    bartimaeus: {
      title: 'Bartimaeus', witness: 'Bartimaeus, son of Timaeus', place: 'jericho', region: 'land', era: 'passion', after: 'nain', set: 'village',
      look: { skin: '#8a5636', hair: '#2a1a12', beard: '#2a1a12', tunic: '#9a8a6a', mantle: '#5a5a42' },
      intro: [['n', 'Outside the Jericho gate, on the pilgrim road to Jerusalem, a man with bright, restless eyes is telling anyone who will stop how he used to sit right here and beg.']],
      asks: [
        { id: 'blind', scene: 'bart_road', q: 'You were blind?', say: [['c', 'pass'], ['s', 'mark10b', '10:46', '10:47'], ['c', 'shout'], ['s', 'mark10b', '10:48', '10:48'], ['d', 'They told me to be quiet. I shouted louder.']], note: 'Blind Bartimaeus cried out, “Jesus, you son of David, have mercy on me!” (Mark 10:47).' },
        { id: 'asked', scene: 'bart_called', q: 'What did he say to you?', say: [['c', 'stop'], ['s', 'mark10b', '10:49', '10:49'], ['c', 'spring'], ['s', 'mark10b', '10:50', '10:51'], ['s', 'mark10b', '10:52', '10:52'], ['c', 'see'], ['d', 'He asked me what I wanted. Not what I deserved. What I wanted.']], note: 'He asked Bartimaeus, “What do you want me to do for you?” and gave him his sight (Mark 10:51–52).' },
      ],
      outro: [['n', 'He looks up the road toward Jerusalem. “I threw my cloak away when he called me,” he says. “I never went back for it.”']],
    },
    bethesda: {
      title: 'The man healed at Bethesda', witness: 'The man healed at Bethesda', place: 'bethesda', region: 'jerusalem', era: 'passion', after: 'nain', set: 'court',
      look: { skin: '#9a6440', hair: '#5f5048', beard: '#5f5048', tunic: '#8a7a5a' },
      intro: [['n', 'In the Temple courts a thin man is pointed out to you. People say he lay by the Pool of Bethesda for most of his life.']],
      asks: [
        { id: 'pool', scene: 'beth_pool', q: 'How long did you lie by the pool?', say: [['s', 'john5', '5:1', '5:3'], ['c', 'stir'], ['s', 'john5', '5:4', '5:5'], ['h', 'The oldest manuscripts of John lack the end of verse 3 and verse 4, about the angel stirring the water. The WEB includes them.']], note: 'A man sick for thirty-eight years lay by the Pool of Bethesda (John 5:5).' },
        { id: 'healed', scene: 'beth_heal', q: 'What did he say to you?', say: [['c', 'come'], ['s', 'john5', '5:6', '5:8'], ['c', 'rise'], ['s', 'john5', '5:9', '5:9']], note: 'He asked, “Do you want to be made well?” and told him to take up his mat and walk (John 5:6–8).' },
        { id: 'sabbath', scene: 'beth_sabbath', q: 'Why are the authorities angry about it?', say: [['c', 'stop'], ['s', 'john5', '5:10', '5:13'], ['c', 'tell'], ['s', 'john5', '5:14', '5:15']], note: 'Because it was the Sabbath, the authorities objected to the healed man carrying his mat (John 5:10).' },
      ],
      outro: [['n', '“Thirty-eight years,” he says, and walks off across the court, slowly, on his own feet.']],
    },
    blindman: {
      title: 'The man born blind', witness: 'The man born blind', place: 'siloam', region: 'jerusalem', era: 'passion', after: 'nain', set: 'court',
      look: { skin: '#a8724a', hair: '#1e1410', beard: '#1e1410', tunic: '#b49a6a' },
      intro: [['n', 'The Pharisees have already questioned this man twice. Now you, a scribe, are asking too. He sighs before you even begin.'], ['h', 'John tells this man’s story as a series of interviews. You are not the first to ask him.']],
      asks: [
        { id: 'born', scene: 'blind_mud', q: 'Is it true you were born blind?', say: [['s', 'john9', '9:1', '9:5'], ['c', 'mud'], ['s', 'john9', '9:6', '9:7'], ['c', 'siloam'], ['c', 'see']], note: 'He made mud, anointed the eyes of a man born blind, and sent him to wash in Siloam (John 9:6–7).' },
        { id: 'neighbors', scene: 'blind_neighbors', q: 'What did your neighbors say?', say: [['c', 'argue'], ['s', 'john9', '9:8', '9:12']], note: 'His neighbors could hardly believe it was the same man (John 9:8–9).' },
        { id: 'pharisees', scene: 'blind_pharisees', q: 'What did the Pharisees ask you?', say: [['s', 'john9', '9:13', '9:17'], ['c', 'answer'], ['s', 'john9', '9:24', '9:25'], ['s', 'john9', '9:30', '9:34'], ['c', 'out'], ['d', 'One thing I know. I was blind, and now I see. Write that down, since everyone else is.']], note: '“One thing I do know: that though I was blind, now I see” (John 9:25).' },
        { id: 'found', scene: 'blind_found', q: 'Did you see him again?', say: [['c', 'find'], ['s', 'john9', '9:35', '9:37'], ['c', 'kneel'], ['s', 'john9', '9:38', '9:38']], note: 'He sought out the man who had been thrown out, and the man said, “Lord, I believe!” (John 9:35–38).' },
      ],
      outro: [['n', 'He looks at you a long moment, as if he is still getting used to faces. “Are you going to throw me out too?”']],
    },
    martha: {
      title: 'Martha of Bethany', witness: 'Martha of Bethany', place: 'bethany', region: 'jerusalem', era: 'passion', after: 'nain', set: 'village',
      look: { skin: '#a8724a', hair: '#2a1a12', tunic: '#6a5a42', veil: '#b3a080' },
      intro: [['n', 'Bethany is crowded with people who have come to see Lazarus, the man who was dead. His sister Martha is serving them all, and talks to you while she works.']],
      asks: [
        { id: 'late', scene: 'mar_meet', q: 'Did he come when you sent for him?', say: [['s', 'john11', '11:17', '11:20'], ['c', 'meet'], ['s', 'john11', '11:21', '11:22'], ['d', 'Four days. I said exactly what I thought.']], note: 'Jesus came when Lazarus had been in the tomb four days (John 11:17).' },
        { id: 'resurrection', scene: 'mar_talk', q: 'What did he say to you?', say: [['s', 'john11', '11:23', '11:27']], note: '“I am the resurrection and the life” (John 11:25). Martha said, “You are the Christ, God’s Son” (John 11:27).' },
        { id: 'tomb', scene: 'mar_tomb', q: 'What happened at the tomb?', say: [['s', 'john11', '11:32', '11:34'], ['c', 'wept'], ['s', 'john11', '11:35', '11:36'], ['s', 'john11', '11:38', '11:40'], ['c', 'stone'], ['s', 'john11', '11:41', '11:42'], ['c', 'call'], ['s', 'john11', '11:43', '11:43'], ['c', 'come'], ['s', 'john11', '11:44', '11:45']], note: 'Jesus wept, then called, “Lazarus, come out!” and the dead man came out (John 11:35, 43–44).' },
      ],
      outro: [['n', 'A man laughs in the courtyard, a big, living laugh. Martha glances at him. “That is my brother,” she says, and goes back to her work.']],
    },
    peter: {
      title: 'Simon Peter: the Upper Room', witness: 'Simon Peter', place: 'upperroom', region: 'jerusalem', era: 'church', after: 'temple', set: 'upper', later: true,
      look: { skin: '#9a6440', hair: '#3a2416', beard: '#5f5048', tunic: '#8a7a5a', mantle: '#6a4a32' },
      intro: [
        ['n', 'Weeks later, in a large upper room in the city, the lamps are lit and the room is full. A broad-shouldered fisherman you have seen on the shore at Capernaum agrees to tell you about the last night.'],
        ['h', 'Told after Pentecost (Era III). Early Christian writers said Mark’s Gospel preserved Peter’s own preaching. Papias, writing in the early second century, said Mark was Peter’s interpreter.'],
      ],
      asks: [
        { id: 'room', scene: 'pet_room', q: 'Where did you eat the Passover?', say: [['s', 'mark14', '14:12', '14:14'], ['c', 'follow'], ['s', 'mark14', '14:15', '14:16']], note: 'Two disciples followed a man carrying water to a large upper room, furnished and ready (Mark 14:13–16).' },
        { id: 'feet', scene: 'pet_feet', q: 'What did he do during the supper?', say: [['s', 'john13', '13:3', '13:4'], ['c', 'rise'], ['s', 'john13', '13:5', '13:5'], ['c', 'wash'], ['s', 'john13', '13:6', '13:7'], ['c', 'peter'], ['s', 'john13', '13:8', '13:10'], ['s', 'john13', '13:12', '13:15'], ['d', 'I told him he would never wash my feet. I was wrong about that, too.']], note: 'He washed his disciples’ feet and said, “I have given you an example” (John 13:5, 15).' },
        { id: 'betray', scene: 'pet_betray', q: 'Who betrayed him?', say: [['s', 'mark14', '14:17', '14:19'], ['c', 'look'], ['s', 'mark14', '14:20', '14:21'], ['s', 'john13', '13:21', '13:25'], ['c', 'dip'], ['s', 'john13', '13:26', '13:28'], ['c', 'leave'], ['s', 'john13', '13:30', '13:30']], note: '“One of you will betray me.” Judas took the bread and went out, and it was night (John 13:21, 30).' },
        { id: 'bread', scene: 'pet_bread', q: 'What did he say over the bread and the cup?', say: [['c', 'bread'], ['s', 'mark14', '14:22', '14:22'], ['c', 'cup'], ['s', 'mark14', '14:23', '14:25'], ['d', 'We break bread together now, house to house, as he did that night.']], note: '“Take, eat. This is my body.” “This is my blood of the new covenant, which is poured out for many” (Mark 14:22–24).' },
        { id: 'command', scene: 'pet_command', q: 'What did he command you?', say: [['s', 'john13', '13:34', '13:35']], note: '“A new commandment I give to you, that you love one another, just like I have loved you” (John 13:34).' },
        { id: 'garden', scene: 'pet_garden', q: 'What happened in the garden?', say: [['s', 'mark14', '14:26', '14:31'], ['c', 'pray'], ['s', 'mark14', '14:32', '14:36'], ['c', 'sleep'], ['s', 'mark14', '14:37', '14:38'], ['c', 'torches'], ['s', 'john18', '18:3', '18:8'], ['c', 'sword'], ['s', 'john18', '18:10', '18:11']], note: 'In Gethsemane he prayed, “Not what I desire, but what you desire.” Peter drew a sword and was told to put it away (Mark 14:36; John 18:10–11).' },
        { id: 'denial', scene: 'pet_denial', q: 'Where were you while they tried him?', say: [['d', 'I will tell you, because he has forgiven me, and so I can.'], ['c', 'maid'], ['s', 'mark14', '14:66', '14:68'], ['c', 'porch'], ['s', 'mark14', '14:69', '14:70'], ['c', 'again'], ['s', 'mark14', '14:71', '14:71'], ['c', 'crow'], ['s', 'mark14', '14:72', '14:72']], note: 'In the high priest’s courtyard Peter denied him three times, then remembered his words and wept (Mark 14:66–72).' },
      ],
      outro: [['n', 'Peter is quiet for a while. Around you, people are breaking bread and passing it hand to hand.']],
    },
  };

  // ---------- gathering places ----------
  function sunFx(fc, k) {
    fc.globalCompositeOperation = 'lighter';
    const g = fc.createRadialGradient(42 * k, 20 * k, 0, 42 * k, 20 * k, 150 * k);
    g.addColorStop(0, 'rgba(255,236,190,0.34)'); g.addColorStop(1, 'rgba(255,220,160,0)');
    fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
    fc.globalCompositeOperation = 'source-over';
  }
  function upperRoom() {
    const st = K.interiorStage();
    const bg0 = st.bg, fx0 = st.fx;
    st.bg = function (ctx, t, cam, sc) {
      bg0(ctx, t, cam, sc);
      R(ctx, 44, 142, 170, 3, '#7a5a3a'); R(ctx, 44, 142, 170, 1, '#946c46');
      for (let x = 56; x < 210; x += 22) { R(ctx, x, 140, 4, 2, '#c99a58'); R(ctx, x + 8, 140, 3, 2, '#8a3a2a'); }
      [90, 168].forEach((lx) => { R(ctx, lx, 98, 1, 42, '#3a2618'); R(ctx, lx - 2, 96, 5, 2, '#8a5a3a'); R(ctx, lx, 94 - (Math.floor(t * 8) % 2), 1, 2, '#ffd27a'); });
    };
    st.fx = function (fc, k, t, cam, sc) {
      fx0(fc, k, t, cam, sc);
      fc.fillStyle = 'rgba(20,24,52,0.5)'; fc.fillRect(0, 0, 256 * k, 56 * k);
      fc.fillStyle = 'rgba(10,5,2,0.22)'; fc.fillRect(0, 77 * k, 256 * k, 83 * k);
      fc.globalCompositeOperation = 'lighter';
      [90, 168].forEach((lx) => {
        const g = fc.createRadialGradient(lx * k, 95 * k, 0, lx * k, 95 * k, 46 * k * (1 + Math.sin(t * 7 + lx) * 0.07));
        g.addColorStop(0, 'rgba(255,180,90,0.42)'); g.addColorStop(1, 'rgba(255,170,80,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
      });
      fc.globalCompositeOperation = 'source-over';
    };
    return st;
  }
  const SETS = {
    street: { make: () => K.exteriorStage(), cam: 230, y: 148, w: 300, p: 326, extras: [[262, 146], [380, 147], [410, 149]] },
    house: { make: () => K.interiorStage(), cam: 0, y: 147, w: 110, p: 146, extras: [[40, 136], [200, 136], [226, 147]] },
    upper: { make: upperRoom, cam: 0, y: 147, w: 120, p: 152, sit: true, extras: [[56, 147], [72, 147], [90, 147], [186, 147], [204, 147], [222, 147], [40, 136], [234, 136]] },
    village: { make: () => ({ width: 256, bg(ctx) { ctx.drawImage(K.nainArt(), 0, 0); }, fx: sunFx }), cam: 0, y: 148, w: 120, p: 150, extras: [[80, 146], [200, 149], [222, 150]] },
    field: { make: () => ({ width: 256, bg(ctx) { ctx.drawImage(K.fieldArt(), 0, 0); }, fx: sunFx }), cam: 0, y: 146, w: 116, p: 146, extras: [[60, 145], [200, 146]] },
    court: { make: () => K.courtStage(false), cam: 40, y: 148, w: 160, p: 190, extras: [[120, 150], [230, 147], [262, 148]] },
    synagogue: { make: () => ({ width: 256, bg(ctx) { ctx.drawImage(K.synArt(), 0, 0); } }), cam: 0, y: 152, w: 118, p: 148, extras: [] },
  };

  const run = async function (game, id) {
    const T = D.testimonies[id], SET = SETS[T.set];
    const P0 = K.sprites();
    SC.load(SET.make());
    SC.cam = SET.cam;
    (SET.extras || []).forEach((e, i) => SC.add({ frames: K.villager(950 + i * 7 + id.length, i % 3 === 1), x: e[0], y: e[1], facing: e[0] < SET.w ? 1 : -1, pose: SET.sit ? 'sit' : 'stand' }));
    if (T.prop === 'well') {
      SC.add({ x: SET.w - 22, y: SET.y - 1, z: SET.y - 2, draw(ctx, sx, sy) {
        R(ctx, sx - 10, sy - 10, 20, 10, '#8a8074'); R(ctx, sx - 10, sy - 10, 20, 2, '#a89c8c');
        for (let i = 0; i < 20; i += 5) R(ctx, sx - 10 + i, sy - 8, 1, 8, '#6e655a');
        R(ctx, sx - 9, sy - 24, 2, 14, '#5a4632'); R(ctx, sx + 7, sy - 24, 2, 14, '#5a4632'); R(ctx, sx - 10, sy - 25, 20, 2, '#6a5236');
        R(ctx, sx - 1, sy - 23, 1, 9, '#b8a070'); R(ctx, sx - 3, sy - 15, 5, 4, '#7a5a3a');
      } });
    }
    const witness = SC.add({ frames: S.person(T.look), x: SET.w, y: SET.y, facing: 1, pose: SET.sit ? 'sit' : 'stand' });
    const me = SC.add({ id: 'player', frames: P0.player, x: SET.p + 40, y: SET.y + 1, facing: -1, speed: 30, pose: 'stand' });
    void witness;
    await SC.walk(me, SET.p);
    if (SET.sit) me.pose = 'sit';
    const say = async (b) => {
      if (b[0] === 's') await SC.say({ kind: 'scripture', ref: P.ref(b[1], b[2], b[3]), text: P.vs(b[1], b[2], b[3]) });
      else if (b[0] === 'd') await SC.say({ kind: 'drama', speaker: T.witness, text: b[1] });
      else if (b[0] === 'h') await SC.say({ kind: 'history', text: b[1] });
      else await SC.say({ kind: 'drama', text: b[1] });
    };
    for (const b of T.intro) await say(b);
    const asked = {};
    for (;;) {
      const open = T.asks.filter((a) => !asked[a.id]);
      const opts = open.map((a) => a.q).concat([open.length ? 'Thank them and take your leave' : 'Thank them for their testimony']);
      const pick = await SC.choose(open.length === T.asks.length ? 'What do you ask ' + T.witness.split(',')[0].replace(/^The /, 'the ').replace(/^A /, 'a ') + '?' : 'What else do you ask?', opts, 'Your question');
      if (pick === open.length) break;
      const a = open[pick];
      asked[a.id] = true;
      let mem = null;
      if (a.scene && TW.Vignettes[a.scene]) mem = await TW.Vignettes.enter(a.scene, T.witness.split(',')[0]);
      for (const b of a.say) {
        if (b[0] === 'c') { if (mem && mem[b[1]]) await mem[b[1]](); }
        else await say(b);
      }
      if (mem) await TW.Vignettes.exit();
      game.observe('t:' + id, a.id, a.note, false, true);
      SC.toast('Added to your scroll');
    }
    for (const b of T.outro) await say(b);
    game.hear(id, Object.keys(asked).length);
    await SC.prompt('Their testimony is in your scroll.', 'Back to the map', 'script');
    game.show('map');
  };

  TW.Testimony = { run, SETS };
})(window.TW);
