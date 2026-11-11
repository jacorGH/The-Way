/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — letters for the rest of Acts (Nicodemus, now very old, writing by way of travelers) and for Era V
   (Timothy, from Ephesus). Adds to js/discover.js. English and Spanish side by side. */
window.TW = window.TW || {};
(function (TW) {
  const D = TW.Discover;
  if (!D) return;
  Object.assign(D.letters, {
    pisidia: [
      { en: '“Justified.” Paul uses a word from the courts. I spent my life before that court, gathering proofs of my righteousness. He says the verdict has already been given. I am trying to stop gathering.', es: '“Justificado.” Pablo usa una palabra de los tribunales. Pasé la vida ante ese tribunal, reuniendo pruebas de mi justicia. Él dice que el veredicto ya se ha dado. Trato de dejar de reunirlas.' },
      { en: 'Almost the whole city came. Gentiles, hungry for the Scriptures we kept to ourselves for so long. We thought we were guarding a treasure. We were sitting on a feast.', es: 'Vino casi toda la ciudad. Gentiles hambrientos de las Escrituras que guardamos para nosotros tanto tiempo. Creíamos que custodiábamos un tesoro. Estábamos sentados sobre un banquete.' },
      { en: 'Thrown out, and filled with joy. I was never thrown out of anywhere, and I was never filled with joy. I am beginning to think those two things are related.', es: 'Expulsados, y llenos de gozo. A mí nunca me expulsaron de ningún lugar, y nunca estuve lleno de gozo. Empiezo a pensar que ambas cosas están relacionadas.' },
    ],
    lystra: [
      { en: 'Gods one hour, stones the next. Crowds have not changed since Jerusalem. “Hosanna” on Sunday, “Crucify” on Friday. Do not trust a crowd. Trust the one they keep misunderstanding.', es: 'Dioses en una hora, piedras en la siguiente. Las multitudes no han cambiado desde Jerusalén. “Hosanna” el domingo, “Crucifícale” el viernes. No confíes en una multitud. Confía en aquel a quien no dejan de malentender.' },
      { en: 'He got up and walked back into the city that stoned him. I have reread your report many times. I would have walked the other way, and I would have called it wisdom.', es: 'Se levantó y volvió a entrar en la ciudad que lo apedreó. He releído tu informe muchas veces. Yo habría caminado en dirección contraria, y lo habría llamado sabiduría.' },
      { en: 'You went through the door with them. An old man in Jerusalem is proud of you. Tell me about the boy who wept, the one called Timothy.', es: 'Cruzaste la puerta con ellos. Un anciano en Jerusalén está orgulloso de ti. Háblame del muchacho que lloraba, el que se llama Timoteo.' },
    ],
    jcouncil: [
      { en: 'I was in the room. I am a Pharisee and a believer, and I stood with Peter. My old friends will not speak to me in the market now. It is a small price for being on the right side of that table.', es: 'Estuve en la sala. Soy fariseo y creyente, y me puse de parte de Pedro. Mis viejos amigos ya no me hablan en el mercado. Es un precio pequeño por estar del lado correcto de esa mesa.' },
      { en: 'James was wise. Ask little of the Gentiles, and only what lets us share a table. That is what the whole quarrel was about, in the end: who may eat with whom.', es: 'Jacobo fue sabio. Pedir poco a los gentiles, y solo lo que nos deja compartir una mesa. De eso trataba al final toda la disputa: quién puede comer con quién.' },
      { en: 'Even good men part. I have parted from better men than Barnabas and Paul, and over smaller things. Pray they find their way back to each other. I think they will.', es: 'Hasta los hombres buenos se separan. Yo me he separado de hombres mejores que Bernabé y Pablo, y por cosas más pequeñas. Ora para que vuelvan a encontrarse. Creo que lo harán.' },
    ],
    lydia: [
      { en: 'A man of Macedonia called, and you crossed into Europe. My grandfather used to say the Greeks were the end of the world. Now the end of the world has a church.', es: 'Un varón macedonio llamó, y cruzaste a Europa. Mi abuelo decía que los griegos eran el fin del mundo. Ahora el fin del mundo tiene una iglesia.' },
      { en: 'A few women by a river. That is how the church began in Europe. That is how it began here too, if you remember: a few women at a tomb.', es: 'Unas pocas mujeres junto a un río. Así comenzó la iglesia en Europa. Así comenzó aquí también, si lo recuerdas: unas pocas mujeres junto a un sepulcro.' },
      { en: 'The Lord opened her heart. Not Paul, not her own cleverness. I opened my heart once, at night, and I thought I was the one doing it. I was not.', es: 'El Señor abrió su corazón. No Pablo, ni su propia astucia. Yo abrí el mío una vez, de noche, y creí que era yo quien lo hacía. No lo era.' },
    ],
    jailer: [
      { en: 'The girl was freed and her masters were furious. Money again. It was money that bought Judas too. Watch who loses money when the Good News comes; they are often the loudest.', es: 'La muchacha fue liberada y sus amos se enfurecieron. Otra vez el dinero. También fue el dinero lo que compró a Judas. Observa quién pierde dinero cuando llega el evangelio; suelen ser los que más gritan.' },
      { en: 'Singing in the stocks at midnight. I read your report to the believers here, and an old woman who has buried three sons stood up and sang the same psalm.', es: 'Cantando en el cepo a medianoche. Leí tu informe a los creyentes de aquí, y una anciana que ha enterrado a tres hijos se puso de pie y cantó el mismo salmo.' },
      { en: '“What must I do to be saved?” The jailer asked it in one night. I asked it over three years. The answer was the same.', es: '“¿Qué es menester que yo haga para ser salvo?” El carcelero lo preguntó en una noche. Yo lo pregunté a lo largo de tres años. La respuesta fue la misma.' },
    ],
    berea: [
      { en: '“Another king, Jesus.” They meant it as an accusation. Pilate wrote it over his head as a charge. It keeps being true no matter who says it.', es: '“Otro rey, Jesús.” Lo dijeron como acusación. Pilato lo escribió sobre su cabeza como cargo. Sigue siendo verdad, no importa quién lo diga.' },
      { en: 'The Bereans examined the Scriptures daily. Do you remember when I taught you to read? That was the whole reason. I did not know yet what you would find.', es: 'Los de Berea escudriñaban cada día las Escrituras. ¿Recuerdas cuando te enseñé a leer? Esa era toda la razón. Todavía no sabía lo que ibas a encontrar.' },
      { en: 'It does not depend on Paul. Nor on Peter, nor on me, nor on you. I find that a great relief at my age.', es: 'No depende de Pablo. Ni de Pedro, ni de mí, ni de ti. A mi edad, eso me resulta un gran alivio.' },
    ],
    athens: [
      { en: 'An unknown god. All those philosophers, and their best altar was a question. Paul gave them the answer by name. I gave him a name once too, in the dark: Rabbi. I had no idea.', es: 'Un dios no conocido. Tantos filósofos, y su mejor altar era una pregunta. Pablo les dio la respuesta con nombre. Yo también le di un nombre una vez, en la oscuridad: Rabí. No tenía idea.' },
      { en: '“Not far from each one of us.” I have had that line read to me every night this week. My eyes are failing, but my ears are good.', es: '“No está lejos de cada uno de nosotros.” He hecho que me lean esa línea cada noche esta semana. Mis ojos fallan, pero mis oídos están bien.' },
      { en: 'A few believed. A judge, a woman, some others. Do not count the few as failure. There were only a few at the cross.', es: 'Unos pocos creyeron. Un juez, una mujer, algunos otros. No cuentes a los pocos como un fracaso. Solo había unos pocos junto a la cruz.' },
    ],
    corinth: [
      { en: 'Paul, sewing tents. A Pharisee trained by Gamaliel, sitting at a bench with a needle. I have never sewn anything in my life. I envy him.', es: 'Pablo, cosiendo tiendas. Un fariseo formado por Gamaliel, sentado en un banco con una aguja. Yo nunca he cosido nada en mi vida. Le tengo envidia.' },
      { en: '“Do not be afraid… I have many people in this city.” Corinth, of all places. If he has many people in Corinth, he has a few in Jerusalem still. I am trying to find them.', es: '“No temas… yo tengo mucho pueblo en esta ciudad.” Corinto, nada menos. Si tiene mucho pueblo en Corinto, todavía tiene algunos en Jerusalén. Estoy tratando de encontrarlos.' },
      { en: 'Gallio would not judge “words and names.” A Roman who refused to decide a religious case. If only Pilate had been so indifferent.', es: 'Galión no quiso juzgar “palabras y nombres”. Un romano que se negó a decidir un caso religioso. Ojalá Pilato hubiera sido tan indiferente.' },
    ],
    artemis: [
      { en: 'The teacher was taught, by a tentmaker’s wife, at her own table. I sat for decades as a teacher who could not be taught. Apollos is a better man than I was.', es: 'Al maestro le enseñaron, la esposa de un fabricante de tiendas, a su propia mesa. Yo pasé décadas como un maestro al que no se le podía enseñar. Apolos es mejor hombre de lo que yo fui.' },
      { en: 'They burned the books themselves. No one made them. When a man burns what he used to treasure, something has changed in him that no council could order.', es: 'Quemaron ellos mismos los libros. Nadie los obligó. Cuando un hombre quema lo que antes atesoraba, algo ha cambiado en él que ningún concilio podría ordenar.' },
      { en: 'Two hours of shouting, and no one harmed. Thank God for town clerks. Thank God too for whoever kept Paul out of that theater.', es: 'Dos horas de gritos, y nadie salió herido. Gracias a Dios por los escribanos. Gracias a Dios también por quien mantuvo a Pablo fuera de ese teatro.' },
    ],
    farewell: [
      { en: 'A boy fell, and was taken up alive, and then they went back upstairs and broke bread until dawn. That is the church I want to belong to: people who go back upstairs.', es: 'Un muchacho cayó, y lo levantaron vivo, y luego volvieron a subir y partieron el pan hasta el amanecer. Esa es la iglesia a la que quiero pertenecer: gente que vuelve a subir.' },
      { en: '“Finish my race with joy.” I am at the end of mine. I did not start running until I was old. I hope it counts.', es: '“Acabar mi carrera con gozo.” Yo estoy al final de la mía. No empecé a correr hasta que fui viejo. Espero que cuente.' },
      { en: 'Grown men weeping on a beach. Paul inspires that. So did his master. Love that makes men weep at partings is not a weakness.', es: 'Hombres hechos y derechos llorando en una playa. Pablo inspira eso. También su Maestro. Un amor que hace llorar a los hombres en las despedidas no es una debilidad.' },
    ],
    arrest: [
      { en: 'He knew what waited for him, and he came anyway. I saw someone else do that once, riding a donkey down the Mount of Olives.', es: 'Sabía lo que le esperaba, y vino de todos modos. Vi a otro hacer eso una vez, montado en un asno, bajando del monte de los Olivos.' },
      { en: 'A rumor, and the whole city ran. I stood at my window and watched them run past. Some of them I taught.', es: 'Un rumor, y toda la ciudad corrió. Me quedé en mi ventana viéndolos pasar. A algunos de ellos les enseñé.' },
      { en: 'They listened until “Gentiles.” I would have stopped listening at that word too, once. Now it is the word that saved me: if the door is open for the nations, it is open for an old Pharisee.', es: 'Escucharon hasta “gentiles”. Yo también habría dejado de escuchar en esa palabra, una vez. Ahora es la palabra que me salvó: si la puerta está abierta para las naciones, está abierta para un viejo fariseo.' },
    ],
    plot: [
      { en: 'The same council. The same room where I sat silent. This time a Pharisee stood up for the prisoner. I wish it had been me, thirty years ago.', es: 'El mismo concilio. La misma sala donde me senté en silencio. Esta vez un fariseo se puso de pie por el preso. Ojalá hubiera sido yo, hace treinta años.' },
      { en: '“Let us not fight against God.” Gamaliel said that once, about the apostles. Maybe his students were listening after all.', es: '“No resistamos a Dios.” Gamaliel dijo algo así una vez, sobre los apóstoles. Quizá sus alumnos sí estaban escuchando después de todo.' },
      { en: 'Forty men with an oath, and one boy who listened at a pillar. God used a child to undo forty men. He likes doing that.', es: 'Cuarenta hombres con un juramento, y un muchacho que escuchó detrás de una columna. Dios usó a un niño para deshacer a cuarenta hombres. Le gusta hacer eso.' },
    ],
    felix: [
      { en: '“After the Way.” Paul said it to a governor. I remember when that name was whispered. Now it is said in court.', es: '“Conforme al Camino.” Pablo se lo dijo a un gobernador. Recuerdo cuando ese nombre se susurraba. Ahora se dice en los tribunales.' },
      { en: 'Felix trembled, and waited for a convenient time. I waited for a convenient time for three years. There is no such thing. Tell Felix, if you ever see him.', es: 'Félix se espantó, y esperó un momento oportuno. Yo esperé un momento oportuno durante tres años. No existe tal cosa. Díselo a Félix, si alguna vez lo ves.' },
      { en: 'To Caesar. He will see Rome. I will not. Write me from there, and I will have it read to me twice.', es: 'A César. Él verá Roma. Yo no. Escríbeme desde allí, y haré que me lo lean dos veces.' },
    ],
    agrippa: [
      { en: 'The third time he has told it, you say. Every time I hear it, it gets better. A good testimony does not wear out.', es: 'La tercera vez que lo cuenta, dices. Cada vez que lo oigo, es mejor. Un buen testimonio no se gasta.' },
      { en: '“Almost.” A king said almost. I said almost for three years. I hope Agrippa did not need as long as I did.', es: '“Por poco.” Un rey dijo por poco. Yo dije por poco durante tres años. Espero que Agripa no haya necesitado tanto como yo.' },
      { en: 'He could have gone free. He chose Rome. I think he wanted the emperor to hear it too.', es: 'Podría haber quedado libre. Escogió Roma. Creo que quería que el emperador también lo oyera.' },
    ],
    storm: [
      { en: 'They overruled the prisoner, and the prisoner was right. That happened once before, in a garden, and the prisoner was right then too.', es: 'No le hicieron caso al preso, y el preso tenía razón. Eso ya pasó una vez, en un huerto, y entonces también el preso tenía razón.' },
      { en: '“God has granted you everyone who sails with you.” Every one. Not only the believers. I am sure there were people on that ship who did not deserve saving. I was one of them, once.', es: '“Dios te ha dado todos los que navegan contigo.” Todos. No solo los creyentes. Estoy seguro de que en ese barco había gente que no merecía ser salvada. Yo fui uno de ellos, una vez.' },
      { en: 'He gave thanks and broke bread, in a storm, with soldiers and sailors and prisoners. I have heard that sentence before: he took bread, gave thanks, and broke it.', es: 'Dio gracias y partió el pan, en una tormenta, con soldados, marineros y presos. Ya he oído esa frase antes: tomó el pan, dio gracias, y lo partió.' },
    ],
    malta: [
      { en: 'Strangers who did not speak your language built you a fire in the rain. The Law says to love the stranger. The Maltese did not need the Law to do it.', es: 'Unos extraños que no hablaban tu lengua te encendieron un fuego bajo la lluvia. La Ley dice que se ame al extranjero. Los malteses no necesitaron la Ley para hacerlo.' },
      { en: 'A murderer, then a god, in one afternoon. He was neither. People keep trying to make Jesus’ servants into something they are not. They did it to him too.', es: 'Homicida, y luego dios, en una tarde. No era ninguna de las dos cosas. La gente no deja de querer convertir a los siervos de Jesús en lo que no son. Se lo hicieron a él también.' },
      { en: 'Paul prayed, and the old man was healed. Then the whole island came. It is always like that: one healing, and then everyone.', es: 'Pablo oró, y el anciano fue sanado. Luego vino toda la isla. Siempre es así: una sanidad, y luego todos.' },
    ],
    rome: [
      { en: 'They walked out to meet him, and he took courage. Even Paul needed courage from others. Be someone who walks out along the road.', es: 'Salieron a su encuentro, y él cobró aliento. Hasta Pablo necesitó aliento de otros. Sé alguien que sale al camino.' },
      { en: '“The hope of Israel.” In chains, in Rome, he still calls it that. So do I. It has a name now.', es: '“La esperanza de Israel.” Encadenado, en Roma, todavía la llama así. Yo también. Ahora tiene nombre.' },
      { en: '“Without hindrance.” I have had your scroll read to me from the beginning: Capernaum, the roof, the scribes, me. You were sent to watch. You were made a witness. My eyes are nearly gone, but I have seen enough.', es: '“Sin impedimento.” He hecho que me lean tu rollo desde el principio: Capernaúm, el techo, los escribas, yo. Te enviaron a observar. Te hicieron testigo. Mis ojos ya casi no ven, pero he visto lo suficiente.' },
    ],
    letter: [
      { en: 'His chains advanced the Good News. Mine never advanced anything. I was never brave enough to wear any.', es: 'Sus cadenas hicieron progresar el evangelio. Las mías nunca hicieron progresar nada. Nunca fui lo bastante valiente para llevar ninguna.' },
      { en: '“He emptied himself.” I was full of myself for most of my life: my learning, my seat, my name. Emptying is harder than filling. I am still learning it.', es: '“Se anonadó a sí mismo.” Estuve lleno de mí mismo casi toda mi vida: mi saber, mi asiento, mi nombre. Vaciarse es más difícil que llenarse. Todavía lo estoy aprendiendo.' },
      { en: '“Rejoice in the Lord always.” Written in chains, and read aloud by you. Have it read to me too, when you come home. I would like those to be among the last words I hear.', es: '“Gozaos en el Señor siempre.” Escrito entre cadenas, y leído por ti en voz alta. Haz que me lo lean a mí también, cuando vuelvas a casa. Me gustaría que estuvieran entre las últimas palabras que oiga.' },
    ],
    onesimus: [
      { en: 'A runaway slave, now a son. A rich household like mine had servants who were not free, and I never once asked what they thought of me. Paul asks Philemon for more than freedom for Onesimus. He asks him to call him brother.', es: 'Un esclavo fugitivo, ahora un hijo. Una casa rica como la mía tenía siervos que no eran libres, y nunca pregunté qué pensaban de mí. Pablo le pide a Filemón algo más que la libertad de Onésimo. Le pide que lo llame hermano.' },
      { en: '“Charge it to my account.” Someone once paid what I owed, and I never even saw the bill.', es: '“Ponlo a mi cuenta.” Alguien pagó una vez lo que yo debía, y nunca vi siquiera la cuenta.' },
      { en: 'We are not told what Philemon did. I think that is on purpose. Every reader has to decide what he would have done. I know what I hope.', es: 'No se nos dice qué hizo Filemón. Creo que es a propósito. Cada lector tiene que decidir qué habría hecho él. Yo sé lo que espero.' },
    ],
    goodfight: { from: 'timothy', list: [
      { en: 'You were with me when the letter came, and you saw my hands shake. I keep that letter still. Rome burned, the emperor blamed us, and Paul was chained like a thief. I read his words to the church here every year, and my hands still shake.', es: 'Estabas conmigo cuando llegó la carta, y viste temblar mis manos. Todavía guardo esa carta. Roma ardió, el emperador nos culpó, y a Pablo lo encadenaron como a un ladrón. Leo sus palabras a la iglesia de aquí cada año, y todavía me tiemblan las manos.' },
      { en: 'His cloak, the books, the parchments. We carried them across the sea together, before winter, as he asked. I still see you with that leather case on your knees the whole way, as if it were the most precious thing on the ship. Perhaps it was.', es: 'Su capote, los libros, los pergaminos. Los llevamos juntos por el mar, antes del invierno, como él pidió. Todavía te veo con ese estuche de cuero sobre las rodillas todo el viaje, como si fuera lo más precioso del barco. Quizá lo era.' },
      { en: '“I have kept the faith.” He taught me everything, and at the end he taught me how to finish. I was the boy crying outside the gate at Lystra. I am not crying now. Well, a little.', es: '“He guardado la fe.” Me lo enseñó todo, y al final me enseñó cómo terminar. Yo era el muchacho que lloraba fuera de la puerta de Listra. Ahora no lloro. Bueno, un poco.' },
    ] },
    fall: { from: 'timothy', list: [
      { en: 'Not one stone. You wrote down his words forty years ago, and now they have happened. Your old scroll is proof that he said it before it came. Keep it safe. People will say the words were written afterward.', es: 'Ni piedra sobre piedra. Escribiste sus palabras hace cuarenta años, y ahora han sucedido. Tu viejo rollo es prueba de que lo dijo antes de que pasara. Guárdalo bien. Habrá quien diga que las palabras se escribieron después.' },
      { en: 'They remembered his words and fled. Words kept a whole church alive. I teach the young ones here to memorize his sayings, for the day they need them in a hurry.', es: 'Recordaron sus palabras y huyeron. Unas palabras mantuvieron viva a toda una iglesia. Aquí enseño a los jóvenes a memorizar sus dichos, para el día en que los necesiten de prisa.' },
      { en: 'The Temple is gone, and his words remain. Paul used to say that we are God’s temple now. I did not understand him then. Come to Ephesus. We will read his letters together, and grieve, and hope.', es: 'El Templo ya no está, y sus palabras permanecen. Pablo solía decir que ahora nosotros somos el templo de Dios. Entonces no lo entendía. Ven a Éfeso. Leeremos juntos sus cartas, lloraremos, y tendremos esperanza.' },
    ] },
  });
})(window.TW);
