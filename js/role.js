/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — who you play.
   Eleazar: a young scribe, a student of Nicodemus.
   Elisheva: Nicodemus's niece, raised in his house and taught to read and write so she could keep his accounts and copy
   his letters. Few women in Judea could read and write; some daughters of wealthy, learned households did.
   Where a woman could not have been (the council benches, a banquet couch), Elisheva stands at the door with the household
   servants. Where women were (following Jesus in Galilee, at the cross, preparing spices, at the tomb), she is there too.
   G() swaps exact phrases in dramatized and historical text only. Scripture is never passed through it. */
window.TW = window.TW || {};
(function (TW) {
  const R = {};
  const sv = () => (TW.game && TW.game.save) || {};
  // in the mixed account, the voice of each scene is chosen as it begins
  R.both = () => sv().role === 'both';
  R.is = () => sv().role === 'niece' || (sv().role === 'both' && sv().cur === 'niece');
  R.voiceName = () => (R.both() ? (R.is() ? 'Elisheva' : 'Eleazar') : sv().name);
  R.pick = (m, f) => (R.is() ? f : m);
  R.defaultName = (role) => (role === 'niece' ? 'Elisheva' : role === 'both' ? 'Eleazar and Elisheva' : 'Eleazar');
  // where each of them stands, episode by episode; rec = the richer view
  R.VIEW = {
    capernaum: ['scribe', 'Among the scribes on the floor, near Jesus', 'In the doorway crowd, with the women of the house'],
    levi: ['scribe', 'By the door with the scribes who object', 'With the women of the house, carrying dishes'],
    sabbath: ['scribe', 'With the Pharisees, watching for a charge', 'Among the people in the synagogue'],
    legion: ['scribe', 'In the fisherman’s boat', 'In the fisherman’s boat, with his wife'],
    nain: ['niece', 'In the crowd on the road', 'Among the women walking beside the widow'],
    entry: ['scribe', 'On the road, with Temple scribes watching', 'On the road, with your uncle’s friends watching'],
    temple: ['scribe', 'Among the scribes who question him', 'In the outer court with the crowd'],
    council: ['scribe', 'On the scribes’ bench in the council', 'At the door, with the servants of the house'],
    cross: ['niece', 'Near the road, with the crowd', 'With the women from Galilee'],
    burial: ['niece', 'Carrying his body with Nicodemus', 'Winding the linen and spices'],
    tomb: ['niece', 'Arriving after the women have fled', 'Inside the tomb, with the women'],
    forty: ['niece', 'Questioning the eleven', 'Brought in by Mary of Magdala'],
    pentecost: ['scribe', 'In the Temple crowd', 'In the Temple crowd'],
    gate: ['scribe', 'At the gate, on your way to prayer', 'At the gate, on your way to prayer'],
    trial: ['scribe', 'On the scribes’ bench, judging Peter', 'At the door, holding your uncle’s writing case'],
    seven: ['niece', 'Handing out the daily bread', 'Handing out the daily bread'],
    stephen: ['scribe', 'On the scribes’ bench at his trial', 'At the council door'],
    samaria: ['niece', 'At a Samaritan table', 'At a Samaritan table'],
    desert: ['scribe', 'Asked by the Ethiopian, as a Jerusalem scribe', 'Traveling with Philip’s household'],
    damascus: ['scribe', 'Face to face with Saul', 'Face to face with Saul'],
    tabitha: ['niece', 'At the door of the upper room', 'Among the widows holding up her garments'],
    cornelius: ['scribe', 'A scribe crossing a Gentile’s threshold', 'Answering the gate at the tanner’s house'],
    antioch: ['scribe', 'Traveling with Barnabas, and to Tarsus for Saul', 'Traveling with Barnabas’s party, and at a Greek table'],
    rhoda: ['niece', 'Praying in the crowded room', 'Beside Rhoda, at the gate'],
    goodfight: ['scribe', 'With Timothy when the letter comes', 'With Timothy’s mother Eunice when the letter comes'],
    fall: ['scribe', 'A scribe of the Temple, looking at its ruins', 'A daughter of Jerusalem, looking at its ruins'],
    lamps: ['niece', 'An old witness, listening as the scroll is read', 'An old witness, listening as the scroll is read'],
    allnew: ['scribe', 'The last page of your account', 'The last page of your account'],
    letter: ['scribe', 'The scribe who writes it down, then reads it aloud', 'The one who writes it down, then reads it aloud in Lydia’s house'],
    onesimus: ['scribe', 'Reading the letter aloud in Philemon’s house', 'Reading the letter aloud in Philemon’s house'],
    storm: ['scribe', 'On the deck of the grain ship', 'Among the women passengers below deck'],
    malta: ['niece', 'By the fire on the beach', 'By the fire, and at the bedside of Publius’s father'],
    rome: ['scribe', 'On the Appian Way, then in Paul’s rented house', 'On the Appian Way, then in Paul’s rented house'],
    felix: ['scribe', 'A visitor to the prisoner, and a traveler with Luke', 'A visitor to the prisoner, and a traveler with Luke'],
    agrippa: ['scribe', 'Among the principal men of the city in the hall', 'Among the women of the court, near Bernice'],
    arrest: ['scribe', 'In the Temple courts, then at the foot of the stairs', 'In the Court of the Women, then at the foot of the stairs'],
    plot: ['scribe', 'Among the scribes of the Pharisees in the council', 'At the barracks gate, where a boy comes running'],
    artemis: ['niece', 'In the theater with the crowd', 'With Priscilla, and then in the theater'],
    farewell: ['scribe', 'Among the elders on the shore', 'Among the believers on the shore'],
    corinth: ['niece', 'At the workbench with Aquila', 'At the workbench with Priscilla'],
    berea: ['scribe', 'A scribe examining the Scriptures with the Bereans', 'With the prominent Greek women of Berea'],
    athens: ['scribe', 'On the Areopagus beside Paul', 'Among the listeners, near a woman named Damaris'],
    jcouncil: ['scribe', 'A Pharisee’s student among the believing Pharisees', 'Among the whole assembly'],
    lydia: ['niece', 'Sitting with the men by the river', 'Among the women at the place of prayer'],
    jailer: ['niece', 'At the prison gate at midnight', 'At the prison gate with Lydia, at midnight'],
    pisidia: ['scribe', 'Among the men of the synagogue', 'Among the devout women of the city'],
    lystra: ['niece', 'In the crowd at the gate', 'Kneeling in the dust beside Paul'],
    cyprus: ['scribe', 'A Jerusalem scribe before a Roman governor', 'A woman of Jerusalem before a Roman governor'],
  };
  R.look = {
    scribe: { skin: '#b07a50', hair: '#2a1a12', beard: '#2a1a12', tunic: '#ddd0b0', mantle: '#4e5a72', fringe: '#9cc0e0', phylactery: true, belt: null },
    niece: { skin: '#c08c62', hair: '#3a2014', tunic: '#a8505e', veil: '#efe4cc', veilEdge: '#c49a3c', dress: true, sash: '#d4a848', hem: '#c49a3c', braid: true, belt: null },
  };

  // [as written for Eleazar, as it reads for Elisheva]
  R.MAP = [
    // prologue and eras
    ['You arrive from Jerusalem as a young scribe, sent to watch him.', 'You arrive from Jerusalem to stay with relatives in Capernaum, sent by your uncle to watch him.'],
    ['A skeptical scribe', 'A skeptical niece of Nicodemus'],
    ['Your scribe is still a scribe, and still sits in the council, but he is no longer only watching.', 'You still keep your uncle’s accounts and still carry his writing case to the council door, but you are no longer only watching.'],
    // Capernaum
    ['As a teacher of the Law, you are waved to a place on the floor near the front, among the other scribes.', 'You squeeze in by the door with the women of the household. From here you can see the teacher, and the row of scribes from Jerusalem sitting on the floor in front of him.'],
    ['Yet he turns from the man on the mat and looks along the row of scribes. At you.', 'Yet he turns from the man on the mat, looks along the row of scribes, and then past them to the doorway. At you.'],
    ['Teachers of the Law from Galilee, Judea and Jerusalem sit beside me, watching closely.', 'Teachers of the Law from Galilee, Judea and Jerusalem sit near the front, watching closely.'],
    // Levi
    ['You and the other scribes stand just inside the door. None of you sits down.', 'You stand just inside the door with the women of Levi’s household, who are carrying in the dishes. The scribes stand by the door too. None of them sits down.'],
    ['The question is on the lips of every scribe by the door. Do you ask it too?', 'The question is on the lips of every scribe by the door. Do you whisper it too?'],
    // Legion
    ['There is room in my boat, scribe, if you want to see where he goes.', 'There is room in my boat for you and my wife, daughter, if you want to see where he goes.'],
    // Nain, Entry, Temple
    ['Tonight your report to Nicodemus will be the hardest one yet to write.', 'Tonight your letter to your uncle will be the hardest one yet to write.'],
    ['Nicodemus has read all five of your reports.', 'Your uncle has read all five of your letters.'],
    ['Step back. Scribes from the Temple are watching you.', 'Step back. Men from your uncle’s circle are watching you.'],
    ['I stepped back from the road so the Temple scribes would not see me.', 'I stepped back from the road so the men of my uncle’s circle would not see me.'],
    ['You stepped back, because scribes from the Temple were watching you.', 'You stepped back, because men of your uncle’s circle were watching you.'],
    ['Scribe! You came up for the feast too?', 'Daughter! You came up for the feast too?'],
    ['two of your teachers speak quietly with a priest of the high priest’s family', 'two men who eat at your uncle’s table speak quietly with a priest of the high priest’s family'],
    // The Council by Night
    ['Past midnight, a servant of the high priest pounds on your door. The council is gathering at once, and every scribe who can take notes is wanted.', 'Past midnight, a servant of the high priest pounds on your uncle’s door. The council is gathering at once. Nicodemus takes you with him to carry his writing case; you will wait with the servants of the house.'],
    ['The council sits in a half circle in the lamplight. Your teacher Nicodemus stands at the end of a bench. He does not look at you.', 'You stand by the door with the servants of the house, holding your uncle’s writing case. The council sits in a half circle in the lamplight. Nicodemus does not look at you.'],
    ['He is already looking at you, the way he looked along the row of scribes in Capernaum.', 'He is already looking at you across the room, the way he looked to the doorway in Capernaum.'],
    ['You are a junior scribe; no one asks for your vote. Every hand around you goes up. In Capernaum you thought the same word in silence: blasphemy.', 'No one in this room would ask a woman by the door what she thinks. Every hand on the benches goes up. In Capernaum you heard the same word muttered by the scribes: blasphemy.'],
    ['You kept your eyes on the high priest, as you were trained to.', 'You kept your eyes on the high priest, as a servant would.'],
    ['On the high priest, as you were trained.', 'On the high priest, as a servant would.'],
    // The Cross
    ['Two of the men laughing at the foot of the hill taught you the Law. What do you do?', 'Two of the men laughing at the foot of the hill have eaten at your uncle’s table. What do you do?'],
    ['You said nothing while your teachers mocked him.', 'You said nothing while your uncle’s friends mocked him.'],
    ['You turned your back on the men you had studied with.', 'You turned your back on men who had eaten at your uncle’s table.'],
    ['I stood near the road where the crowd and my teachers stood.', 'I stood near the road where the crowd and my uncle’s friends stood.'],
    // The Burial
    ['You came. Good. Joseph has the governor’s permission, and we have until sunset. I need another pair of hands.', 'You came. Good. Joseph has the governor’s permission, and we have until sunset. Joseph’s servants will carry him. I need your hands for the linen and the spices.'],
    ['Touching the dead will make you unclean for seven days. You will not eat the Passover with your family (Numbers 9:6). What do you do?', 'Helping to wrap the body will make you unclean for seven days. You will not eat the Passover with your family (Numbers 9:6). What do you do?'],
    ['Help carry him.', 'Help wind the linen and the spices.'],
    ['Carry the spices only.', 'Carry the spice jars only.'],
    ['Hold back and watch.', 'Watch with the women from Galilee.'],
    ['I helped Joseph and Nicodemus carry his body, and gave up my Passover.', 'I helped my uncle wind the linen and spices around his body, and gave up my Passover.'],
    ['I carried the spices for Nicodemus.', 'I carried the spice jars for my uncle.'],
    ['I held back and watched from the garden wall.', 'I watched with the women from Galilee.'],
    ['You carried him with Nicodemus, and gave up your Passover.', 'You wound the linen and spices with your uncle, and gave up your Passover.'],
    ['You carried the spices, and kept yourself clean for the feast.', 'You carried the spice jars, and kept yourself clean for the feast.'],
    ['You held back, and watched from the garden wall.', 'You watched with the women from Galilee.'],
    ['Nicodemus sits down on a stone in the garden, his hands still smelling of myrrh, and does not get up.', 'Your uncle sits down on a stone in the garden, his hands still smelling of myrrh, and does not get up.'],
    ['What do you ask your teacher?', 'What do you ask your uncle?'],
    ['Two evenings ago you helped wind those cloths around him.', 'Two evenings ago you wound those cloths around him with your own hands.'],
    // The Empty Tomb and Forty Days
    ['You were at the burial, scribe. I saw you.', 'You were at the burial with us, Elisheva. I saw you.'],
    ['This is the scribe who helped Nicodemus bury him. He has been writing down everything. Tell him what you told me.', 'This is Nicodemus’s niece. She helped wrap him for burial, and she has been writing everything down. Tell her what you told me.'],
    ['a year of reports', 'a year of letters'],
    ['I have been writing reports for a year. He calls them testimony.', 'I have been writing letters for a year. He calls them testimony.'],
    ['They told me, and I said they were fools. You of all people will understand that.', 'They told me, and I said they were fools. Your uncle’s niece will understand that.'],
    // Pentecost to Stephen
    ['and he calls you brother.', 'and he calls you sister.'],
    ['Tomorrow morning the council will meet to examine them. You will be expected to take your seat with the other scribes.', 'Tomorrow morning the council will meet to examine them. Your uncle asks you to come with him and carry his writing case.'],
    ['The next morning you take your place among the scribes. A year ago you sat in this room through the night trial. Today you are one of the five thousand, and no one here knows it.', 'The next morning you stand by the door with your uncle’s writing case. A year ago you stood in this house through the night trial. Today you are one of the five thousand, and only your uncle knows it.'],
    ['The council confers about how to silence them. Your seat is among them. What do you do?', 'The council confers about how to silence them. You are standing among the servants by the door. What do you do?'],
    ['Ask, as Nicodemus once did, that the council hear before it judges.', 'Catch your uncle’s eye, and plead with him to speak.'],
    ['Stand up and walk out after them.', 'Slip out of the door after them.'],
    ['“Does our law judge a man unless it first hears from him?” Your voice shakes. Someone laughs. Across the room, Nicodemus closes his eyes.', 'Your uncle holds your gaze a long moment. Then he looks down at his hands. You know what it costs him to sit there, and what it costs him to stay silent.'],
    ['You walk out through the doors. Behind you the room goes quiet, then the talk begins again, about you.', 'You slip out through the doors. A servant watches you go and says nothing.'],
    ['You said nothing, as you had said nothing a year ago.', 'You said nothing, as you had said nothing a year ago.'],
    ['You asked, as Nicodemus once did, that the council hear before it judge.', 'You pleaded with your uncle, with your eyes, to speak.'],
    ['You stood up and walked out with them.', 'You slipped out of the door after them.'],
    ['They tell me you are a scribe, and that you counted the widows at the back of the line.', 'They tell me you can read and write, and that you counted the widows at the back of the line.'],
    ['Stephen asked me to keep the lists. A scribe’s hand has found new work.', 'Stephen asked me to keep the lists. My uncle’s accounts taught me how.'],
    ['You are no longer welcome on the scribes’ bench. You stand in the doorway and watch.', 'You are no longer welcome in this house. You stand at the outer door and watch.'],
    ['You take your seat on the scribes’ bench. No one here knows that you break bread with the man on trial.', 'You stand by the door with your uncle’s writing case. No one here knows that you break bread with the man on trial.'],
    // Era IV
    ['Scribe! I told you about the well', 'Daughter! I told you about the well'],
    ['Sit down, scribe. He would.', 'Sit down, daughter. He would.'],
    ['Philip woke you before dawn. He said an angel had spoken to him, and that you were to go south. You saw no angel. You went anyway.', 'Philip woke his household before dawn. He said an angel had spoken to him, and that they were to go south. You saw no angel. You went with his wife and daughters anyway.'],
    ['You know those words; every scribe does.', 'You know those words; you copied them once for your uncle.'],
    ['You are a scribe from Jerusalem. They turned me away from the inner courts.', 'You are a woman of Jerusalem, and you can read. They turned me away from the inner courts.'],
    ['You walked north for a week to warn the believers in Damascus that Saul was coming with letters.', 'You traveled north for a week with a caravan of believers to warn the disciples in Damascus that Saul was coming with letters.'],
    ['An old disciple named Ananias takes you in.', 'An old disciple named Ananias and his wife take you in.'],
    // testimonies
    ['Write it down, scribe.', 'Write it down, daughter.'],
    ['Men like him rarely talk about Jesus to a scribe from Jerusalem.', 'Men like him rarely talk about Jesus to a Pharisee’s niece from Jerusalem.'],
    ['You won’t get in that way, friend. Oh — a teacher of the Law. Make way, make way!', 'You won’t get in that way, daughter. Squeeze in by the door with the women of the house; you will see from there.'],
    ['Now you, a scribe, are asking too.', 'Now you, a Pharisee’s niece, are asking too.'],
    // service
    ['he has asked for “the scribe who writes things down.”', 'he has asked for “the girl who writes things down.”'],
    ['Give him your cloak.', 'Give him a cloak from your uncle’s house.'],
    ['“A scribe’s cloak, on a quarryman.”', '“A Pharisee’s cloak, on a quarryman.”'],
    ['I was invisible, scribe.', 'I was invisible, daughter.'],
    // conclusions in the scroll
    ['The witnesses lied, and no one cared. I am ashamed of my teachers.', 'The witnesses lied, and no one cared. I am ashamed of the men who eat at my uncle’s table.'],
    ['“He saved others. He can’t save himself.” My teachers said it. I keep hearing it.', '“He saved others. He can’t save himself.” My uncle’s friends said it. I keep hearing it.'],
    ['A Roman soldier said what my teachers would not:', 'A Roman soldier said what my uncle’s friends would not:'],
    ['He spoke the Shema as I have spoken it every day of my life, and he meant it more than I do.', 'He spoke the Shema as I have heard it spoken every day of my life, and he meant it more than any of us.'],
    ['He told one of us that he was not far from the Kingdom. I keep wondering how far I am.', 'He told a scribe that he was not far from the Kingdom. I keep wondering how far I am.'],
    // reports become letters
    ['Write your report', 'Write your letter'],
    ['write your report', 'write your letter'],
    ['Write the report you never expected to write.', 'Write the letter you never expected to write.'],
    ['Write your report by lamplight', 'Write your letter by lamplight'],
  ];
  R.G = function (text) {
    if (!text || !R.is()) return text;
    let out = text;
    for (const m of R.MAP) if (out.indexOf(m[0]) >= 0) out = out.split(m[0]).join(m[1]);
    return out;
  };
  TW.Role = R;
})(window.TW);
