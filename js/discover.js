/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Discoveries: threads between the accounts (undesigned coincidences), finds (keepsakes and archaeology),
   letters from Nicodemus in answer to your reports, and the personal last page.
   Everything is data, in English and Spanish side by side. Unlocks depend only on what the player has witnessed. */
window.TW = window.TW || {};
(function (TW) {
  const es = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const L = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? (es() ? x.es || x.en : x.en) : x);
  const save = () => TW.game && TW.game.save;
  // a key is an episode id, or 't:<id>' for a testimony heard
  const has = (k) => { const s = save(); if (!s) return false; return k.startsWith('t:') ? !!s.heard[k.slice(2)] : !!s.completed[k]; };

  // ---------- threads: one account quietly explains another ----------
  const THREADS = [
    { id: 'philip', needs: ['t:loaves'], title: { en: 'Why ask Philip?', es: '¿Por qué preguntarle a Felipe?' },
      a: { en: 'John says that before feeding the five thousand Jesus asked Philip, “Where are we to buy bread?” (John 6:5). He does not say why Philip.', es: 'Juan dice que antes de alimentar a los cinco mil, Jesús le preguntó a Felipe: “¿De dónde compraremos pan?” (Juan 6:5). No dice por qué a Felipe.' },
      b: { en: 'Luke places the feeding near Bethsaida (Luke 9:10), and John mentions elsewhere that Philip was from Bethsaida (John 1:44). He was the local man.', es: 'Lucas sitúa la alimentación cerca de Betsaida (Lucas 9:10), y Juan menciona en otro lugar que Felipe era de Betsaida (Juan 1:44). Era el del lugar.' } },
    { id: 'grass', needs: ['t:loaves'], title: { en: 'Green grass', es: 'Hierba verde' },
      a: { en: 'Mark notes that the crowd sat down “on the green grass” (Mark 6:39). In that dry country, grass is green only for a few weeks.', es: 'Marcos observa que la multitud se sentó “sobre la hierba verde” (Marcos 6:39). En aquella tierra seca, la hierba solo está verde unas semanas.' },
      b: { en: 'John, who never mentions the grass’s color, says it was near Passover (John 6:4): spring, the one season it would be green, and the season when crowds were on the roads.', es: 'Juan, que nunca menciona el color de la hierba, dice que estaba cerca la Pascua (Juan 6:4): la primavera, la única estación en que estaría verde, y cuando los caminos se llenaban de gente.' } },
    { id: 'blindfold', needs: ['council'], title: { en: '“Who struck you?”', es: '“¿Quién es el que te golpeó?”' },
      a: { en: 'In Matthew the guards strike Jesus and say, “Prophesy to us, you Christ! Who hit you?” (Matthew 26:67–68). Why would that be a test, if he could see who did it?', es: 'En Mateo los guardias golpean a Jesús y dicen: “Profetízanos, Cristo, quién es el que te golpeó” (Mateo 26:67–68). ¿Por qué sería una prueba, si él podía ver quién lo hacía?' },
      b: { en: 'Luke supplies the detail Matthew leaves out: they had blindfolded him (Luke 22:64).', es: 'Lucas da el detalle que Mateo omite: le habían vendado los ojos (Lucas 22:64).' } },
    { id: 'kingdom', needs: ['cross'], title: { en: 'Not this kind of king', es: 'No esta clase de rey' },
      a: { en: 'In Luke, Pilate asks, “Are you the King of the Jews?” Jesus answers, “So you say,” and Pilate at once declares, “I find no basis for a charge” (Luke 23:3–4). A man who admits to being a king is innocent?', es: 'En Lucas, Pilato pregunta: “¿Eres tú el Rey de los judíos?” Jesús responde: “Tú lo dices”, y Pilato declara enseguida: “Ningún delito hallo en este hombre” (Lucas 23:3–4). ¿Un hombre que admite ser rey es inocente?' },
      b: { en: 'John records the rest of the conversation: “My Kingdom is not of this world” (John 18:36). Pilate understood that this king was no threat to Rome.', es: 'Juan registra el resto de la conversación: “Mi reino no es de este mundo” (Juan 18:36). Pilato entendió que este rey no era una amenaza para Roma.' } },
    { id: 'malchus', needs: ['council', 't:peter'], title: { en: 'The servant with a name', es: 'El siervo con nombre' },
      a: { en: 'All four Gospels mention the servant whose ear was cut off. Only John knows his name, Malchus (John 18:10), and that a relative of his later questioned Peter (18:26).', es: 'Los cuatro Evangelios mencionan al siervo al que le cortaron la oreja. Solo Juan sabe su nombre, Malco (Juan 18:10), y que un pariente suyo interrogó después a Pedro (18:26).' },
      b: { en: 'John also says, in passing, that one disciple was known to the high priest and could go in and out of his house (John 18:15–16). That disciple would know the servants by name.', es: 'Juan también dice, de paso, que un discípulo era conocido del sumo sacerdote y podía entrar y salir de su casa (Juan 18:15–16). Ese discípulo conocería por nombre a los siervos.' } },
    { id: 'joanna', needs: ['tomb'], title: { en: 'A source in Herod’s house', es: 'Una fuente en la casa de Herodes' },
      a: { en: 'Matthew reports what Herod Antipas said privately to his servants about Jesus (Matthew 14:1–2). How would anyone know?', es: 'Mateo informa lo que Herodes Antipas dijo en privado a sus siervos acerca de Jesús (Mateo 14:1–2). ¿Cómo lo sabría nadie?' },
      b: { en: 'Luke names among the women who followed Jesus “Joanna, the wife of Chuza, Herod’s steward” (Luke 8:3), and she was at the empty tomb (Luke 24:10).', es: 'Lucas nombra entre las mujeres que seguían a Jesús a “Juana, mujer de Chuza, intendente de Herodes” (Lucas 8:3), y ella estuvo en el sepulcro vacío (Lucas 24:10).' } },
    { id: 'rufus', needs: ['cross', 'rome'], title: { en: 'Alexander and Rufus', es: 'Alejandro y Rufo' },
      a: { en: 'Only Mark identifies Simon of Cyrene as “the father of Alexander and Rufus” (Mark 15:21), as if his readers knew the sons.', es: 'Solo Marcos identifica a Simón de Cirene como “padre de Alejandro y de Rufo” (Marcos 15:21), como si sus lectores conocieran a los hijos.' },
      b: { en: 'Early tradition says Mark wrote for the church in Rome, and Paul, writing to Rome, greets “Rufus, the chosen in the Lord, and his mother and mine” (Romans 16:13). It may be the same family.', es: 'Una tradición antigua dice que Marcos escribió para la iglesia de Roma, y Pablo, escribiendo a Roma, saluda a “Rufo, escogido en el Señor, y a su madre y mía” (Romanos 16:13). Puede que sea la misma familia.' } },
    { id: 'morethanthese', needs: ['t:peter', 'forty'], title: { en: '“More than these?”', es: '“¿Más que estos?”' },
      a: { en: 'After the resurrection Jesus asks Peter, “Do you love me more than these?” (John 21:15). More than the other disciples? It is a strange question.', es: 'Después de la resurrección, Jesús le pregunta a Pedro: “¿Me amas más que estos?” (Juan 21:15). ¿Más que los otros discípulos? Es una pregunta extraña.' },
      b: { en: 'John never records Peter’s boast at the supper, but Mark does: “Although all will be offended, yet I will not” (Mark 14:29). Jesus is gently answering that boast.', es: 'Juan nunca registra la jactancia de Pedro en la cena, pero Marcos sí: “Aunque todos sean escandalizados, yo no” (Marcos 14:29). Jesús responde con delicadeza a esa jactancia.' } },
    { id: 'greeks', needs: ['entry'], title: { en: 'The Greeks find Philip', es: 'Los griegos buscan a Felipe' },
      a: { en: 'In Passover week some Greeks ask to see Jesus. They go to Philip, “who was from Bethsaida of Galilee,” and Philip goes to Andrew (John 12:20–22).', es: 'En la semana de la Pascua, unos griegos piden ver a Jesús. Se acercan a Felipe, “que era de Betsaida de Galilea”, y Felipe va a Andrés (Juan 12:20–22).' },
      b: { en: 'Philip and Andrew are the only two of the Twelve with Greek names, from a town on the edge of Greek-speaking country. John never explains; he simply records whom the Greeks approached.', es: 'Felipe y Andrés son los únicos dos de los Doce con nombres griegos, de un pueblo al borde de la tierra de habla griega. Juan nunca lo explica; solo registra a quiénes se acercaron los griegos.' } },
    { id: 'friends', needs: ['cross', 'trial'], title: { en: 'Herod and Pilate', es: 'Herodes y Pilato' },
      a: { en: 'Luke alone says that Herod and Pilate, once enemies, became friends that very day (Luke 23:12).', es: 'Solo Lucas dice que Herodes y Pilato, antes enemigos, se hicieron amigos aquel mismo día (Lucas 23:12).' },
      b: { en: 'In Acts, the believers’ prayer names the two side by side, gathered together against God’s holy servant Jesus (Acts 4:27).', es: 'En Hechos, la oración de los creyentes los nombra juntos, unidos contra el santo Hijo de Dios, Jesús (Hechos 4:27).' } },
    { id: 'cousin', needs: ['jcouncil', 'goodfight'], title: { en: 'Why Barnabas stood by Mark', es: 'Por qué Bernabé defendió a Marcos' },
      a: { en: 'Barnabas insisted on taking John Mark again, so sharply that he and Paul parted (Acts 15:37–39). Acts never says why he cared so much.', es: 'Bernabé insistió en llevar otra vez a Juan Marcos, con tanta firmeza que él y Pablo se separaron (Hechos 15:37–39). Hechos nunca dice por qué le importaba tanto.' },
      b: { en: 'A greeting in another letter mentions, in passing, “Mark, the cousin of Barnabas” (Colossians 4:10). And by the end Paul asks for him: “he is useful to me” (2 Timothy 4:11).', es: 'Un saludo en otra carta menciona, de paso, a “Marcos el sobrino de Bernabé” (Colosenses 4:10). Y al final Pablo pide por él: “me es útil” (2 Timoteo 4:11).' } },
    { id: 'timothy', needs: ['lystra', 'goodfight'], title: { en: 'What Timothy saw', es: 'Lo que vio Timoteo' },
      a: { en: 'Acts says Timothy’s mother was a believing Jewish woman and his father a Greek (Acts 16:1).', es: 'Hechos dice que la madre de Timoteo era una judía creyente y su padre griego (Hechos 16:1).' },
      b: { en: 'Paul’s letter names her, Eunice, and her mother Lois (2 Timothy 1:5), says Timothy knew the Scriptures from infancy (3:15), and recalls his sufferings “at Antioch, Iconium, and Lystra” (3:11): exactly the cities Timothy would have known.', es: 'La carta de Pablo la nombra, Eunice, y a su madre Loida (2 Timoteo 1:5), dice que Timoteo conocía las Escrituras desde la niñez (3:15) y recuerda sus padecimientos “en Antioquía, en Iconio, en Listra” (3:11): justamente las ciudades que Timoteo habría conocido.' } },
    { id: 'archippus', needs: ['onesimus'], title: { en: 'A message for Archippus', es: 'Un mensaje para Arquipo' },
      a: { en: 'The letter to Philemon is also addressed to “Archippus, our fellow soldier” (Philemon 2).', es: 'La carta a Filemón también está dirigida a “Arquipo, nuestro compañero de milicia” (Filemón 2).' },
      b: { en: 'The letter to the Colossians, carried on the same journey, ends: “Tell Archippus, ‘Take heed to the ministry which you have received’” (Colossians 4:17), and calls Onesimus “one of you” (4:9). Two letters, one household in Colossae.', es: 'La carta a los colosenses, llevada en el mismo viaje, termina: “Decid a Arquipo: Mira que cumplas el ministerio que recibiste” (Colosenses 4:17), y llama a Onésimo “uno de vosotros” (4:9). Dos cartas, una misma casa en Colosas.' } },
    { id: 'trophimus', needs: ['farewell', 'arrest'], title: { en: 'Trophimus the Ephesian', es: 'Trófimo el efesio' },
      a: { en: 'Among Paul’s companions to Jerusalem Luke lists Trophimus “of Asia” (Acts 20:4). Later the riot begins because Asian Jews recognized “Trophimus the Ephesian” with Paul in the city (21:27–29).', es: 'Entre los compañeros de Pablo hacia Jerusalén, Lucas nombra a Trófimo “de Asia” (Hechos 20:4). Después, el alboroto comienza porque unos judíos de Asia reconocieron a “Trófimo, de Éfeso” con Pablo en la ciudad (21:27–29).' },
      b: { en: 'Of course they recognized him: they came from his own province. Years later Paul writes, “but I left Trophimus at Miletus sick” (2 Timothy 4:20).', es: 'Claro que lo reconocieron: venían de su misma provincia. Años después Pablo escribe: “a Trófimo dejé en Mileto enfermo” (2 Timoteo 4:20).' } },
    { id: 'guard', needs: ['rome', 'letter'], title: { en: 'The whole guard', es: 'Todo el pretorio' },
      a: { en: 'Acts says that in Rome Paul lived under guard, “with the soldier who guarded him” (Acts 28:16), soldiers changing watch after watch.', es: 'Hechos dice que en Roma Pablo vivía bajo custodia, “con un soldado que le guardase” (Hechos 28:16), soldados que se relevaban guardia tras guardia.' },
      b: { en: 'Philippians says his chains had become known “throughout the whole praetorian guard” (Philippians 1:13), and sends greetings from “those who are of Caesar’s household” (4:22). Two years of guards, one at a time, had heard.', es: 'Filipenses dice que sus prisiones se habían hecho notorias “en todo el pretorio” (Filipenses 1:13), y envía saludos de “los que son de casa de César” (4:22). Dos años de guardias, uno por uno, habían oído.' } },
    { id: 'yoke', needs: ['jcouncil', 'pentecost'], title: { en: 'Peter’s voice', es: 'La voz de Pedro' },
      a: { en: 'At the council in Jerusalem Peter warns against putting “a yoke on the neck of the disciples” (Acts 15:10).', es: 'En el concilio de Jerusalén, Pedro advierte contra poner “sobre la cerviz de los discípulos un yugo” (Hechos 15:10).' },
      b: { en: 'He had spent years with a teacher who said, “Take my yoke upon you… for my yoke is easy” (Matthew 11:29–30). The disciples kept their teacher’s words in their own mouths.', es: 'Había pasado años con un maestro que dijo: “Llevad mi yugo sobre vosotros… porque mi yugo es fácil” (Mateo 11:29–30). Los discípulos guardaban las palabras de su maestro en su propia boca.' } },
    { id: 'martha', needs: ['t:lazarus', 't:martha'], title: { en: 'Martha served', es: 'Marta servía' },
      a: { en: 'At the supper in Bethany, John notes in passing, “Martha served” (John 12:2). He gives no reason to mention it.', es: 'En la cena de Betania, Juan observa de paso: “Marta servía” (Juan 12:2). No da ninguna razón para mencionarlo.' },
      b: { en: 'Luke, telling a different visit, describes Martha “distracted with much serving” while her sister sat at Jesus’ feet (Luke 10:39–40). Two writers, two meals, the same Martha.', es: 'Lucas, contando otra visita, describe a Marta “ocupada en muchos servicios” mientras su hermana se sentaba a los pies de Jesús (Lucas 10:39–40). Dos escritores, dos comidas, la misma Marta.' } },
    { id: 'eyes', needs: ['capernaum', 'pisidia'], title: { en: 'Forgiveness, again', es: 'El perdón, otra vez' },
      a: { en: 'In Capernaum the scribes asked, “Who can forgive sins but God alone?” (Mark 2:7).', es: 'En Capernaúm los escribas preguntaron: “¿Quién puede perdonar pecados, sino solo Dios?” (Marcos 2:7).' },
      b: { en: 'Years later, a former Pharisee stood in a synagogue in Asia and proclaimed: “through this man is proclaimed to you remission of sins” (Acts 13:38). The scribes’ question, answered by one of their own.', es: 'Años después, un antiguo fariseo se puso de pie en una sinagoga de Asia y proclamó: “por medio de él se os anuncia perdón de pecados” (Hechos 13:38). La pregunta de los escribas, respondida por uno de los suyos.' } },
  ];

  // ---------- finds: keepsakes, and things you can still see today ----------
  const FINDS = [
    { id: 'basalt', ep: 'capernaum', title: { en: 'A chip of black basalt', es: 'Un trozo de basalto negro' }, text: { en: 'From the roof that was opened. Capernaum’s houses were built of this dark volcanic stone. Under a fifth-century church there, archaeologists found a house that early believers venerated, its walls covered with prayers scratched in Greek and Aramaic.', es: 'Del techo que abrieron. Las casas de Capernaúm se construían con esta oscura piedra volcánica. Bajo una iglesia del siglo V, los arqueólogos hallaron allí una casa que veneraban los primeros creyentes, con las paredes cubiertas de oraciones grabadas en griego y en arameo.' } },
    { id: 'reedcoin', ep: 'levi', title: { en: 'A coin of Herod Antipas', es: 'Una moneda de Herodes Antipas' }, text: { en: 'Antipas’s coins carried no portrait, only a reed or a palm, to avoid offending Jewish law. Some think Jesus had them in mind when he asked the crowds what they went out to see: “a reed shaken by the wind?” (Matthew 11:7).', es: 'Las monedas de Antipas no llevaban retrato, solo una caña o una palmera, para no ofender la Ley judía. Algunos creen que Jesús pensaba en ellas cuando preguntó a la gente qué salieron a ver: “¿una caña sacudida por el viento?” (Mateo 11:7).' } },
    { id: 'magdala', ep: 'sabbath', title: { en: 'The Magdala stone', es: 'La piedra de Magdala' }, text: { en: 'Found in 2009 in a first-century synagogue at Magdala, a short walk from Capernaum: a carved stone table showing a seven-branched lampstand, carved while the Temple still stood. Jesus “went about in all Galilee, teaching in their synagogues” (Matthew 4:23).', es: 'Hallada en 2009 en una sinagoga del siglo I en Magdala, a poca distancia de Capernaúm: una mesa de piedra tallada con un candelero de siete brazos, tallada cuando el Templo todavía estaba en pie. Jesús “recorría toda Galilea, enseñando en las sinagogas” (Mateo 4:23).' } },
    { id: 'boat', ep: 'legion', title: { en: 'The Galilee boat', es: 'La barca de Galilea' }, text: { en: 'In 1986, during a drought, two brothers found the hull of a fishing boat in the mud near Magdala, dated to around the first century: about 8 m long, patched again and again with many kinds of wood. Boats like this one carried the disciples across the lake.', es: 'En 1986, durante una sequía, dos hermanos hallaron en el barro cerca de Magdala el casco de una barca de pesca fechada hacia el siglo I: de unos 8 m, remendada una y otra vez con muchas clases de madera. Barcas como esta llevaban a los discípulos al otro lado del lago.' } },
    { id: 'flute', ep: 'nain', title: { en: 'A mourner’s flute', es: 'Una flauta de duelo' }, text: { en: 'Played at the widow’s procession, and then not needed. Mourners with flutes appear in the Gospels too, at Jairus’s house (Matthew 9:23).', es: 'Se tocaba en el cortejo de la viuda, y luego ya no hizo falta. También aparecen en los Evangelios plañideros con flautas, en casa de Jairo (Mateo 9:23).' } },
    { id: 'palm', ep: 'entry', title: { en: 'A palm branch', es: 'Una rama de palmera' }, text: { en: 'Only John mentions palms (John 12:13). Palms were a symbol of national victory; in Revelation a great multitude from every nation stands before the Lamb with palms in their hands (Revelation 7:9).', es: 'Solo Juan menciona las palmas (Juan 12:13). Las palmas eran símbolo de victoria nacional; en el Apocalipsis una gran multitud de todas las naciones está delante del Cordero con palmas en las manos (Apocalipsis 7:9).' } },
    { id: 'shekel', ep: 'temple', title: { en: 'A Tyrian shekel', es: 'Un siclo de Tiro' }, text: { en: 'The Temple tax was paid in these, prized for their pure silver, though they bore the head of the god Melqart. Many think coins like these were the “thirty pieces of silver” (Matthew 26:15).', es: 'El impuesto del Templo se pagaba con estas monedas, apreciadas por su plata pura, aunque llevaban la cabeza del dios Melqart. Muchos creen que monedas como estas fueron las “treinta piezas de plata” (Mateo 26:15).' } },
    { id: 'ossuary', ep: 'council', title: { en: 'The Caiaphas ossuary', es: 'El osario de Caifás' }, text: { en: 'In 1990 workmen in Jerusalem broke into a family tomb. Inside was an ornate bone box inscribed “Yehosef bar Qayafa,” Joseph son of Caiaphas. Many scholars think it held the bones of the high priest who questioned Jesus that night.', es: 'En 1990, unos obreros en Jerusalén abrieron por accidente una tumba familiar. Dentro había una caja de huesos adornada con la inscripción “Yehosef bar Qayafa”, José hijo de Caifás. Muchos estudiosos creen que guardaba los huesos del sumo sacerdote que interrogó a Jesús aquella noche.' } },
    { id: 'heel', ep: 'cross', title: { en: 'A heel bone and a nail', es: 'Un hueso del talón y un clavo' }, text: { en: 'In 1968 an ossuary north of Jerusalem held the bones of a man named Yehohanan, crucified in the first century. An iron nail was still driven through his heel bone, bent against a knot in the wood. It is a silent witness to what “they crucified him” meant.', es: 'En 1968, un osario al norte de Jerusalén guardaba los huesos de un hombre llamado Yehohanán, crucificado en el siglo I. Un clavo de hierro todavía atravesaba su hueso del talón, doblado contra un nudo de la madera. Es un testigo mudo de lo que significaba “lo crucificaron”.' } },
    { id: 'stone', ep: 'burial', title: { en: 'A rolling stone', es: 'Una piedra rodante' }, text: { en: 'Most tombs were closed with a square block. Round rolling stones, set in a groove, are found mostly in the tombs of the wealthy, and Joseph of Arimathea was “a rich man” (Matthew 27:57).', es: 'La mayoría de los sepulcros se cerraban con un bloque cuadrado. Las piedras redondas que rodaban en una ranura se encuentran sobre todo en los sepulcros de los ricos, y José de Arimatea era “un hombre rico” (Mateo 27:57).' } },
    { id: 'nazareth', ep: 'tomb', title: { en: 'The Nazareth inscription', es: 'La inscripción de Nazaret' }, text: { en: 'A marble slab said to come from Nazareth records an imperial order forbidding anyone to move bodies or disturb tombs, on pain of death. Its date and origin are debated; some link it to stories that the disciples had stolen the body (Matthew 28:13).', es: 'Una lápida de mármol que, según se dice, procede de Nazaret recoge una orden imperial que prohíbe trasladar cuerpos o violar sepulcros, so pena de muerte. Su fecha y origen se discuten; algunos la relacionan con el rumor de que los discípulos habían robado el cuerpo (Mateo 28:13).' } },
    { id: 'fish', ep: 'forty', title: { en: 'A piece of broiled fish', es: 'Un pedazo de pez asado' }, text: { en: 'He asked, “Do you have anything here to eat?” and ate it in front of them (Luke 24:41–43). The risen Jesus was no ghost.', es: 'Preguntó: “¿Tenéis aquí algo de comer?”, y lo comió delante de ellos (Lucas 24:41–43). Jesús resucitado no era un fantasma.' } },
    { id: 'steps', ep: 'pentecost', title: { en: 'The southern steps', es: 'Las escalinatas del sur' }, text: { en: 'The broad stairs that led up to the Temple’s southern gates have been uncovered, with many ritual baths nearby. Pilgrims climbed them at every feast, and three thousand may have been baptized within sight of them.', es: 'Se han descubierto las amplias escalinatas que subían a las puertas del sur del Templo, con muchos baños rituales cerca. Los peregrinos las subían en cada fiesta, y es posible que tres mil fueran bautizados a la vista de ellas.' } },
    { id: 'theodotus', ep: 'stephen', title: { en: 'The Theodotus inscription', es: 'La inscripción de Teodoto' }, text: { en: 'Found in Jerusalem in 1913: a Greek inscription for a synagogue built “for the reading of the Law” and with rooms for travelers from abroad. Some connect it with the synagogue of the Freedmen where Stephen debated (Acts 6:9).', es: 'Hallada en Jerusalén en 1913: una inscripción griega de una sinagoga construida “para la lectura de la Ley” y con cuartos para viajeros del extranjero. Algunos la relacionan con la sinagoga de los Libertos donde discutió Esteban (Hechos 6:9).' } },
    { id: 'basket', ep: 'damascus', title: { en: 'A rope basket', es: 'Una canasta de cuerda' }, text: { en: 'The disciples let Saul down the wall of Damascus in one of these (Acts 9:25). Years later he still remembered it, among his weaknesses: “through a window I was let down in a basket by the wall” (2 Corinthians 11:33).', es: 'Los discípulos bajaron a Saulo por el muro de Damasco en una de estas (Hechos 9:25). Años después todavía lo recordaba entre sus debilidades: “fui descolgado del muro en un serón por una ventana” (2 Corintios 11:33).' } },
    { id: 'pilate', ep: 'cornelius', title: { en: 'The Pilate stone', es: 'La piedra de Pilato' }, text: { en: 'In 1961, in the theater at Caesarea, archaeologists turned over a reused block and found a Latin dedication naming “Pontius Pilatus, Prefect of Judea.” It is the only stone inscription with his name ever found.', es: 'En 1961, en el teatro de Cesarea, los arqueólogos dieron vuelta un bloque reutilizado y hallaron una dedicatoria en latín que nombra a “Poncio Pilato, prefecto de Judea”. Es la única inscripción en piedra con su nombre que se ha encontrado.' } },
    { id: 'paulus', ep: 'cyprus', title: { en: 'A proconsul named Paulus', es: 'Un procónsul llamado Paulo' }, text: { en: 'Luke gives Sergius Paulus exactly the right title for the governor of Cyprus. An inscription from the island mentions a proconsul Paulus, and a Roman inscription names a Lucius Sergius Paullus; whether either is this man is debated.', es: 'Lucas da a Sergio Paulo exactamente el título correcto para el gobernador de Chipre. Una inscripción de la isla menciona a un procónsul Paulo, y una inscripción romana nombra a un Lucio Sergio Paulo; se discute si alguno es este hombre.' } },
    { id: 'politarch', ep: 'berea', title: { en: 'The politarchs’ gate', es: 'La puerta de los politarcas' }, text: { en: 'Luke calls Thessalonica’s rulers “politarchs” (Acts 17:6), a title critics once doubted. An inscription from a Thessalonica gateway, now in the British Museum, uses the very word, and dozens more have since been found.', es: 'Lucas llama “politarcas” a las autoridades de Tesalónica (Hechos 17:6), un título del que antes dudaban los críticos. Una inscripción de una puerta de Tesalónica, hoy en el Museo Británico, usa exactamente esa palabra, y desde entonces se han hallado decenas más.' } },
    { id: 'erastus', ep: 'corinth', title: { en: 'The Erastus pavement', es: 'El pavimento de Erasto' }, text: { en: 'Paul, writing from Corinth, sends greetings from “Erastus, the treasurer of the city” (Romans 16:23). A paving stone in Corinth says that an Erastus laid the pavement at his own expense in return for his office. Many think it is the same man.', es: 'Pablo, escribiendo desde Corinto, envía saludos de “Erasto, tesorero de la ciudad” (Romanos 16:23). Una losa del pavimento de Corinto dice que un tal Erasto colocó el pavimento a su propia costa a cambio de su cargo. Muchos creen que es el mismo hombre.' } },
    { id: 'gallio', ep: 'corinth', title: { en: 'Gallio’s letter at Delphi', es: 'La carta de Galión en Delfos' }, text: { en: 'An inscription of the emperor Claudius at Delphi names Gallio as proconsul of Achaia, which dates Paul’s stay in Corinth to about AD 51–52: one of the anchor points for the whole of Paul’s life.', es: 'Una inscripción del emperador Claudio en Delfos nombra a Galión como procónsul de Acaya, lo que fecha la estancia de Pablo en Corinto hacia el 51–52 d. C.: uno de los puntos de anclaje de toda la vida de Pablo.' } },
    { id: 'shrine', ep: 'artemis', title: { en: 'A silver shrine', es: 'Un templecillo de plata' }, text: { en: 'Demetrius made “silver shrines of Artemis” (Acts 19:24). Small votive figures of the goddess in clay and metal have been found at Ephesus, and the theater where the crowd shouted for two hours still stands.', es: 'Demetrio hacía “templecillos de plata de Artemisa” (Hechos 19:24). En Éfeso se han hallado pequeñas figuras votivas de la diosa en barro y metal, y el teatro donde la multitud gritó dos horas todavía está en pie.' } },
    { id: 'miletus', ep: 'farewell', title: { en: 'A seat in the theater at Miletus', es: 'Un asiento en el teatro de Mileto' }, text: { en: 'Carved into a row of seats in the theater at Miletus is an inscription usually read as “place of the Jews, who are also God-fearers.” Its exact meaning is debated, but Jews and God-fearers were part of the city where Paul said farewell.', es: 'Tallada en una fila de asientos del teatro de Mileto hay una inscripción que suele leerse “lugar de los judíos, que también son temerosos de Dios”. Su sentido exacto se discute, pero judíos y temerosos de Dios formaban parte de la ciudad donde Pablo se despidió.' } },
    { id: 'appian', ep: 'rome', title: { en: 'A stone from the Appian Way', es: 'Una piedra de la Vía Apia' }, text: { en: 'Stretches of the original paving still survive south of Rome, rutted by cart wheels. Paul walked this road in chains, and the believers walked out along it to meet him (Acts 28:15).', es: 'Al sur de Roma todavía se conservan tramos del pavimento original, marcados por las ruedas de los carros. Pablo recorrió este camino encadenado, y los creyentes salieron por él a su encuentro (Hechos 28:15).' } },
    { id: 'capta', ep: 'fall', title: { en: 'A “Judaea Capta” coin', es: 'Una moneda de “Judaea Capta”' }, text: { en: 'After AD 70 Rome minted coins showing a woman mourning under a palm tree, with the words “Judaea Capta,” Judea captured. The palm that once welcomed a king into Jerusalem became the sign of its fall.', es: 'Después del año 70, Roma acuñó monedas con una mujer de luto bajo una palmera y las palabras “Judaea Capta”, Judea capturada. La palma que una vez recibió a un rey en Jerusalén se volvió el signo de su caída.' } },
    { id: 'pipes', ep: 'lamps', title: { en: 'Laodicea’s water pipes', es: 'Las tuberías de Laodicea' }, text: { en: 'Laodicea brought its water several kilometers by stone pipes, still heavily crusted inside with mineral deposits. Hot springs nearby, cold water at Colossae, and lukewarm water at Laodicea: “I wish you were cold or hot” (Revelation 3:15).', es: 'Laodicea traía su agua desde varios kilómetros por tuberías de piedra, que aún tienen gruesas costras de minerales por dentro. Aguas termales cerca, agua fría en Colosas y agua tibia en Laodicea: “¡Ojalá fueses frío, o caliente!” (Apocalipsis 3:15).' } },
    { id: 'jar', ep: 't:cana', title: { en: 'A stone water jar', es: 'Una tinaja de piedra' }, text: { en: 'Stone vessels were prized because stone, unlike clay, was thought not to become impure. Workshops for chalk-stone vessels have been found in Galilee, one of them only a few kilometers from Cana.', es: 'Las vasijas de piedra se apreciaban porque se creía que la piedra, a diferencia del barro, no se volvía impura. En Galilea se han hallado talleres de vasijas de piedra caliza, uno de ellos a pocos kilómetros de Caná.' } },
    { id: 'gerizim', ep: 't:samaritan', title: { en: 'Ruins on Mount Gerizim', es: 'Ruinas en el monte Gerizim' }, text: { en: '“Our fathers worshiped in this mountain,” the woman said (John 4:20), in the past tense. The Samaritan temple on Gerizim had been destroyed about 110 BC; its ruins still lay above the well when Jesus sat there.', es: '“Nuestros padres adoraron en este monte”, dijo la mujer (Juan 4:20), en pasado. El templo samaritano del Gerizim había sido destruido hacia el 110 a. C.; sus ruinas todavía estaban sobre el pozo cuando Jesús se sentó allí.' } },
  ];

  // ---------- letters from Nicodemus, in answer to the conclusion you sealed ----------
  const NAME = () => (TW.Role && TW.Role.is() ? { en: 'My dear niece', es: 'Mi querida sobrina' } : { en: 'Eleazar', es: 'Eleazar' });
  const SIGN = () => (TW.Role && TW.Role.is() ? { en: 'Your uncle, Nicodemus', es: 'Tu tío, Nicodemo' } : { en: 'Nicodemus', es: 'Nicodemo' });
  const LETTERS = {
    capernaum: [
      { en: 'You write that he blasphemes, and by the Law you may be right; only God forgives sins. But you also write that the man walked. Do not let the first sentence keep you from weighing the second.', es: 'Escribes que blasfema, y según la Ley puede que tengas razón: solo Dios perdona pecados. Pero también escribes que el hombre caminó. No dejes que la primera frase te impida sopesar la segunda.' },
      { en: 'You do not know what to make of it. Neither do I, and I have read your report three times by lamplight. Keep watching. Write down only what you see.', es: 'No sabes qué pensar. Yo tampoco, y he leído tu informe tres veces a la luz de la lámpara. Sigue observando. Escribe solo lo que veas.' },
      { en: 'Good. A scribe who waits before he judges is rarer than you know. The council will want certainty. Give them honesty instead.', es: 'Bien. Un escriba que espera antes de juzgar es más raro de lo que crees. El concilio querrá certezas. Dales honestidad en su lugar.' },
    ],
    levi: [
      { en: 'You worry that he makes himself unclean. I worried too, once, at the door of a house I would not enter. Ask yourself which is the greater uncleanness: the table, or the heart that will not sit at it.', es: 'Te preocupa que se haga impuro. A mí también me preocupó, una vez, a la puerta de una casa en la que no quise entrar. Pregúntate qué es mayor impureza: la mesa, o el corazón que no quiere sentarse a ella.' },
      { en: 'He calls sinners, and they come. I have taught in Jerusalem for thirty years, and no tax collector ever came to me.', es: 'Llama a pecadores, y vienen. He enseñado en Jerusalén treinta años, y ningún cobrador de impuestos vino nunca a mí.' },
      { en: 'Whether he excuses sin or heals it: that is the right question. A physician does not excuse a fever. Watch what happens to the people at his table.', es: 'Si excusa el pecado o lo sana: esa es la pregunta correcta. Un médico no excusa la fiebre. Mira qué les pasa a los que se sientan a su mesa.' },
    ],
    sabbath: [
      { en: 'You write that he breaks the Sabbath. Then tell me why the man’s hand was restored on the Sabbath, if God was displeased. I have no answer to that, and I find I want one.', es: 'Escribes que quebranta el sábado. Entonces dime por qué la mano del hombre fue restaurada en sábado, si Dios estaba disgustado. No tengo respuesta para eso, y descubro que quiero tenerla.' },
      { en: '“The Sabbath was made for man.” I wrote it on a scrap and kept it in my sleeve all week. You saw truly.', es: '“El sábado fue hecho para el hombre.” Lo escribí en un pedazo de papel y lo guardé en la manga toda la semana. Viste con verdad.' },
      { en: 'You do not know where you stand. I am told our colleagues have spoken with Herod’s men. Be careful whom you show your scroll to. Not everyone who asks for it wants the truth.', es: 'No sabes dónde estás. Me dicen que nuestros colegas han hablado con los hombres de Herodes. Ten cuidado a quién le muestras tu rollo. No todos los que lo piden quieren la verdad.' },
    ],
    legion: [
      { en: 'You are afraid of him. So were the men in the boat, and so was the town that begged him to leave. Fear is honest. Do not let it be the last thing you feel.', es: 'Le tienes miedo. También lo tuvieron los hombres de la barca, y el pueblo que le rogó que se fuera. El miedo es honesto. No dejes que sea lo último que sientas.' },
      { en: '“Only God commands the sea.” I opened the Psalms after reading your report: “He makes the storm a calm, so that its waves are still.” I sat a long time with that.', es: '“Solo Dios manda al mar.” Abrí los Salmos después de leer tu informe: “Hace parar la tempestad en sosiego, y se apaciguan sus ondas.” Me quedé largo rato con eso.' },
      { en: 'No ordinary teacher. Yes. I begin to think we were sent north to watch the wrong thing. We came to judge his teaching, and he keeps showing us who he is.', es: 'No es un maestro común. Sí. Empiezo a pensar que nos enviaron al norte a observar lo que no era. Vinimos a juzgar su enseñanza, y él no deja de mostrarnos quién es.' },
    ],
    nain: [
      { en: '“A great prophet.” Elijah raised a widow’s son, and so did Elisha. But Elijah stretched himself on the boy three times and cried to the Lord. You write that this man only spoke.', es: '“Un gran profeta.” Elías resucitó al hijo de una viuda, y también Eliseo. Pero Elías se tendió sobre el niño tres veces y clamó al Señor. Tú escribes que este hombre solo habló.' },
      { en: '“God has visited his people.” Those are Zechariah’s words at the birth of John. Our people have waited four hundred years to say them again.', es: '“Dios ha visitado a su pueblo.” Son palabras de Zacarías en el nacimiento de Juan. Nuestro pueblo ha esperado cuatrocientos años para volver a decirlas.' },
      { en: 'More than a prophet. You are not ready to write it; I am not ready to read it. But I kept your report under my pillow, and not in my desk.', es: 'Más que un profeta. Tú no estás listo para escribirlo; yo no estoy listo para leerlo. Pero guardé tu informe bajo mi almohada, y no en mi escritorio.' },
    ],
    entry: [
      { en: 'You fear Roman swords. So do the chief priests; it is all they speak of. A king who rides a donkey, though: Zechariah wrote of such a king, “humble, and riding on a donkey.” Rome does not fear donkeys.', es: 'Temes las espadas romanas. También los principales sacerdotes; no hablan de otra cosa. Pero un rey que monta un asno: Zacarías escribió de un rey así, “humilde, y cabalgando sobre un asno”. Roma no les teme a los asnos.' },
      { en: 'What kind of king. That is the question the whole city is asking this week, and most are answering it wrongly. Keep asking it.', es: 'Qué clase de rey. Esa es la pregunta que toda la ciudad se hace esta semana, y la mayoría la responde mal. Sigue haciéndotela.' },
      { en: 'No longer only watching. I know. I stopped only watching on a night three years ago, when I went to him alone. I never told you that. Now you know why I sent you.', es: 'Ya no solo observando. Lo sé. Yo dejé de solo observar una noche hace tres años, cuando fui a verlo a solas. Nunca te lo conté. Ahora sabes por qué te envié.' },
    ],
    temple: [
      { en: 'You are right. They will not let him live. I sit in their councils and I hear it in every silence. Stay close to him this week, and write everything down.', es: 'Tienes razón. No lo dejarán vivir. Me siento en sus concilios y lo oigo en cada silencio. Quédate cerca de él esta semana, y escríbelo todo.' },
      { en: '“He meant it more than I do.” I have said the Shema ten thousand times. I said it again last night, slowly, and could not finish it.', es: '“Lo dijo con más sentido que yo.” He dicho el Shemá diez mil veces. Lo dije otra vez anoche, despacio, y no pude terminarlo.' },
      { en: '“Not far from the Kingdom.” I have been not far for three years now. It is a strange country to live in.', es: '“No lejos del reino.” Llevo tres años sin estar lejos. Es una tierra extraña para vivir en ella.' },
    ],
    council: [
      { en: 'Two words. Yes. And I said nothing. Write that down too: that Nicodemus was in the room, and said nothing.', es: 'Dos palabras. Sí. Y yo no dije nada. Escribe eso también: que Nicodemo estaba en la sala, y no dijo nada.' },
      { en: 'The same claim you heard in Capernaum. We have spent three years deciding whether it was blasphemy or truth. Tonight they decided. I have not.', es: 'La misma afirmación que oíste en Capernaúm. Hemos pasado tres años decidiendo si era blasfemia o verdad. Esta noche ellos decidieron. Yo no.' },
      { en: 'You are ashamed of your teachers. So am I, and I am one of them.', es: 'Te avergüenzas de tus maestros. Yo también, y soy uno de ellos.' },
    ],
    cross: [
      { en: '“He saved others.” They meant it as mockery. I cannot stop hearing it as a description.', es: '“A otros salvó.” Lo dijeron para burlarse. Yo no puedo dejar de oírlo como una descripción.' },
      { en: 'A Gentile soldier saw it, and we did not. Joseph has gone to Pilate to ask for the body. I am going to buy spices. Meet me at the garden before sunset.', es: 'Un soldado gentil lo vio, y nosotros no. José ha ido a pedirle el cuerpo a Pilato. Yo voy a comprar especias. Encuéntrame en el huerto antes de la puesta del sol.' },
      { en: 'No words. Then do not write any yet. Come to the garden before sunset; there is something we can still do for him.', es: 'Sin palabras. Entonces no escribas ninguna todavía. Ven al huerto antes de la puesta del sol; hay algo que todavía podemos hacer por él.' },
    ],
    burial: [
      { en: '“It is finished.” I have been turning those words over all Sabbath. Finished is not the same as ended.', es: '“Consumado es.” He estado dándole vueltas a esas palabras todo el sábado. Consumado no es lo mismo que terminado.' },
      { en: 'In daylight. Yes. It was too late for courage, and I went anyway. I do not think he minded.', es: 'A plena luz. Sí. Ya era tarde para el valor, y fui de todos modos. No creo que a él le importara.' },
      { en: 'You still hope. So do I, and I cannot say why. He told me once that the Son of Man must be lifted up. I keep thinking of what comes after lifting up.', es: 'Todavía tienes esperanza. Yo también, y no sé decir por qué. Una vez me dijo que es necesario que el Hijo del Hombre sea levantado. No dejo de pensar en lo que viene después de ser levantado.' },
    ],
    tomb: [
      { en: 'The linen cloths. I bought them myself, and wrapped them with these hands. You say they were lying there, and the cloth for his head rolled up apart. I am coming to Jerusalem at once.', es: 'Los lienzos. Yo mismo los compré, y los envolví con estas manos. Dices que estaban allí puestos, y el sudario enrollado aparte. Voy a Jerusalén de inmediato.' },
      { en: 'The council would never accept a woman’s testimony. I find that I do. Tell Mary of Magdala that an old Pharisee believes her.', es: 'El concilio nunca aceptaría el testimonio de una mujer. Descubro que yo sí. Dile a María Magdalena que un viejo fariseo le cree.' },
      { en: 'Every question looks different. Yes. I went to him by night and asked how a man can be born when he is old. This morning I think I know.', es: 'Cada pregunta se ve distinta. Sí. Fui a verlo de noche y le pregunté cómo puede un hombre nacer siendo viejo. Esta mañana creo que lo sé.' },
    ],
    forty: [
      { en: 'Thomas doubted, and then he said it plainly: “My Lord and my God.” We are scribes; we know what those words mean. So did he.', es: 'Tomás dudó, y luego lo dijo sin rodeos: “¡Señor mío, y Dios mío!” Somos escribas; sabemos lo que significan esas palabras. Él también lo sabía.' },
      { en: 'They are waiting in Jerusalem, as he told them. I am waiting with them. Bring your scroll.', es: 'Están esperando en Jerusalén, como él les dijo. Yo espero con ellos. Trae tu rollo.' },
      { en: 'Testimony. I sent you to write reports for the council. You have written something better. Keep it safe. Someone will need it.', es: 'Testimonio. Te envié a escribir informes para el concilio. Has escrito algo mejor. Guárdalo bien. Alguien lo necesitará.' },
    ],
  };

  const D = {};
  D.threads = THREADS; D.finds = FINDS; D.letters = LETTERS;
  D.L = L;
  D.unlockedThreads = () => THREADS.filter((t) => t.needs.every(has));
  D.unlockedFinds = () => FINDS.filter((f) => has(f.ep));
  // what an episode newly unlocks when its report is sealed (call before and after marking it complete)
  D.snapshot = () => new Set(D.unlockedThreads().map((t) => 'th:' + t.id).concat(D.unlockedFinds().map((f) => 'f:' + f.id)));
  // Other writers, for the years beyond Nicodemus's letters. A letter set may be a plain list (Nicodemus) or
  // { from: '<sender>', list: [...] }.
  const SENDERS = {
    timothy: {
      kicker: { en: 'A letter from Timothy', es: 'Una carta de Timoteo' },
      greet: () => (TW.Role && TW.Role.is() ? { en: 'To my dear sister', es: 'A mi querida hermana' } : { en: 'To my old friend', es: 'A mi viejo amigo' }),
      sign: { en: 'Timothy', es: 'Timoteo' },
    },
  };
  D.senders = SENDERS;
  D.letter = (ep) => {
    const s = save(); const r = s && s.reports && s.reports[ep];
    const raw = LETTERS[ep];
    if (!raw || !r || r.ci === undefined) return null;
    const set = Array.isArray(raw) ? raw : raw.list;
    const who = !Array.isArray(raw) && SENDERS[raw.from];
    return who
      ? { kicker: L(who.kicker), greet: L(who.greet()), body: L(set[r.ci] || set[0]), sign: L(who.sign) }
      : { kicker: null, greet: L(NAME()), body: L(set[r.ci] || set[0]), sign: L(SIGN()) };
  };

  const T = (en, esText) => (es() ? esText : en);
  function letterBox(el, ep) {
    const lt = D.letter(ep);
    if (!lt) return null;
    const box = el('div', 'disc-letter');
    box.appendChild(el('p', 'disc-kicker', lt.kicker || (TW.Role && TW.Role.is() ? T('A letter from your uncle', 'Una carta de tu tío') : T('A letter from Nicodemus', 'Una carta de Nicodemo'))));
    box.appendChild(el('p', 'disc-greet', lt.greet + ','));
    box.appendChild(el('p', 'disc-body', lt.body));
    box.appendChild(el('p', 'disc-sign', lt.sign));
    return box;
  }
  function threadBox(el, t) {
    const box = el('div', 'disc-thread');
    box.appendChild(el('p', 'disc-kicker', T('A thread between the accounts', 'Un hilo entre los relatos')));
    box.appendChild(el('h4', '', L(t.title)));
    box.appendChild(el('p', '', L(t.a)));
    box.appendChild(el('p', '', L(t.b)));
    return box;
  }
  function findBox(el, f) {
    const box = el('div', 'disc-find');
    box.appendChild(el('p', 'disc-kicker', T('Find', 'Hallazgo')));
    box.appendChild(el('h4', '', L(f.title)));
    box.appendChild(el('p', '', L(f.text)));
    return box;
  }
  // On the study page: the letter, and anything this report unlocked
  D.study = function (ep, fresh, b, el, newly) {
    const lt = letterBox(el, ep);
    if (lt) b.appendChild(lt);
    const ids = newly || new Set();
    if (fresh) {
      THREADS.filter((t) => ids.has('th:' + t.id)).forEach((t) => b.appendChild(threadBox(el, t)));
      FINDS.filter((f) => ids.has('f:' + f.id)).forEach((f) => b.appendChild(findBox(el, f)));
    }
  };
  // The Discoveries tab in the scroll
  D.journal = function (body, el) {
    const s = save();
    const th = D.unlockedThreads(), fi = D.unlockedFinds();
    const letters = Object.keys(LETTERS).filter((k) => D.letter(k));
    const inOrder = Object.values((s && s.reports) || {}).filter((r) => r && r.ordered).length;
    body.appendChild(el('p', 'empty', T('Threads: ' + th.length + ' of ' + THREADS.length + ' · Finds: ' + fi.length + ' of ' + FINDS.length + ' · Letters: ' + letters.length + ' · Accounts set in order: ' + inOrder + ' · Hands-on moments: ' + (TW.Hands ? TW.Hands.count() : 0),
      'Hilos: ' + th.length + ' de ' + THREADS.length + ' · Hallazgos: ' + fi.length + ' de ' + FINDS.length + ' · Cartas: ' + letters.length + ' · Relatos puestos en orden: ' + inOrder + ' · Momentos con tus manos: ' + (TW.Hands ? TW.Hands.count() : 0))));
    if (!th.length && !fi.length && !letters.length) {
      body.appendChild(el('p', 'empty', T('Finish episodes to receive letters, collect finds, and notice threads where one account explains another.', 'Termina episodios para recibir cartas, reunir hallazgos y descubrir hilos donde un relato explica otro.')));
      return;
    }
    if (letters.length) {
      body.appendChild(el('h3', '', T('Letters', 'Cartas')));
      letters.forEach((k) => { const box = letterBox(el, k); if (box) { box.insertBefore(el('p', 'disc-ep', TW.tr ? TW.tr(TW.D.episodes[k].title) : TW.D.episodes[k].title), box.firstChild); body.appendChild(box); } });
    }
    if (th.length) { body.appendChild(el('h3', '', T('Threads between the accounts', 'Hilos entre los relatos'))); th.forEach((t) => body.appendChild(threadBox(el, t))); }
    if (fi.length) { body.appendChild(el('h3', '', T('Finds', 'Hallazgos'))); fi.forEach((f) => body.appendChild(findBox(el, f))); }
    const more = THREADS.length - th.length + FINDS.length - fi.length;
    if (more) body.appendChild(el('p', 'empty', T(more + ' more to discover as you witness more.', 'Quedan ' + more + ' por descubrir a medida que presencies más.')));
    void s;
  };

  // ---------- your last page ----------
  const KEY_MOMENTS = ['capernaum', 'sabbath', 'temple', 'council', 'cross', 'tomb', 'forty', 'pentecost', 'trial', 'stephen', 'cornelius', 'jailer', 'agrippa', 'rome'];
  D.ending = function () {
    const s = save(); if (!s) return null;
    const done = TW.D.eraOrder.filter((k) => s.completed[k]).length;
    const answered = (s.questions || []).filter((q) => q.open === false).length;
    const moments = KEY_MOMENTS.filter((k) => s.heart[k] !== undefined && TW.D.episodes[k] && TW.D.episodes[k].hearts).map((k) => {
      const h = TW.Role.G(TW.D.episodes[k].hearts[s.heart[k]]);
      return { title: TW.tr ? TW.tr(TW.D.episodes[k].title) : TW.D.episodes[k].title, text: TW.tr ? TW.tr(h) : h };
    });
    return { done, answered, finds: D.unlockedFinds().length, threads: D.unlockedThreads().length, moments };
  };
  const N = (n, one, many) => n + ' ' + (n === 1 ? one : many);
  D.endingLine = function () {
    const e = D.ending(); if (!e) return '';
    return es()
      ? 'Tu rollo guarda ' + N(e.done, 'relato', 'relatos') + ', ' + N(e.answered, 'pregunta que la Escritura respondió', 'preguntas que la Escritura respondió') + ', ' + N(e.finds, 'hallazgo', 'hallazgos') + ' y ' + N(e.threads, 'hilo', 'hilos') + ' entre los testigos.'
      : 'Your scroll holds ' + N(e.done, 'account', 'accounts') + ', ' + N(e.answered, 'question that Scripture answered', 'questions that Scripture answered') + ', ' + N(e.finds, 'find', 'finds') + ', and ' + N(e.threads, 'thread', 'threads') + ' between the witnesses.';
  };
  D.endingPage = function (b, el) {
    const e = D.ending(); if (!e) return;
    const box = el('div', 'disc-letter');
    box.appendChild(el('p', 'disc-kicker', T('Your account', 'Tu relato')));
    box.appendChild(el('p', 'disc-body', D.endingLine()));
    if (e.moments.length) {
      box.appendChild(el('p', 'disc-greet', T('Along the way:', 'En el camino:')));
      const ul = el('ul', 'notes');
      e.moments.forEach((m) => ul.appendChild(el('li', '', m.title + ': ' + m.text)));
      box.appendChild(ul);
    }
    box.appendChild(el('p', 'disc-sign', T('“These are written, that you may believe that Jesus is the Christ, the Son of God, and that believing you may have life in his name” (John 20:31).', '“Estas se han escrito, para que creáis que Jesús es el Cristo, el Hijo de Dios; y para que creyendo, tengáis vida en su nombre” (Juan 20:31).')));
    b.appendChild(box);
  };

  TW.Discover = D;
})(window.TW);
