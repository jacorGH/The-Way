/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — study for The Birth of Jesus: "One story, two accounts" (how Luke and Matthew fit together), word studies,
   finds and threads. English and Spanish side by side. */
window.TW = window.TW || {};
(function (TW) {
  const X = TW.Discover;
  if (!X) return;
  const es = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const T = (en, esText) => (es() ? esText : en);
  const B = {};
  // the events in a usual harmony, with which Gospel tells each, and which episode it belongs to
  B.harmony = [
    { en: 'Luke’s prologue: an orderly account from eyewitnesses', es: 'El prólogo de Lucas: un relato ordenado de testigos', l: 'Luke 1:1–4', ep: 'annunciation' },
    { en: 'Gabriel announces John’s birth to Zacharias', es: 'Gabriel anuncia a Zacarías el nacimiento de Juan', l: 'Luke 1:5–25' },
    { en: 'Gabriel comes to Mary in Nazareth', es: 'Gabriel viene a María en Nazaret', l: 'Luke 1:26–38', ep: 'annunciation' },
    { en: 'Mary visits Elizabeth; Mary’s song', es: 'María visita a Elisabet; el cántico de María', l: 'Luke 1:39–56', ep: 'annunciation' },
    { en: 'John the Baptist is born', es: 'Nace Juan el Bautista', l: 'Luke 1:57–80' },
    { en: 'An angel speaks to Joseph in a dream', es: 'Un ángel habla a José en sueños', m: 'Matthew 1:18–25', ep: 'annunciation' },
    { en: 'The census; Jesus born in Bethlehem', es: 'El censo; Jesús nace en Belén', l: 'Luke 2:1–7', m: 'Matthew 2:1', ep: 'nativity' },
    { en: 'Angels and shepherds', es: 'Los ángeles y los pastores', l: 'Luke 2:8–20', ep: 'nativity' },
    { en: 'Named Jesus on the eighth day', es: 'Llamado Jesús al octavo día', l: 'Luke 2:21', m: 'Matthew 1:25', ep: 'presentation' },
    { en: 'Presented in the Temple; Simeon and Anna', es: 'Presentado en el Templo; Simeón y Ana', l: 'Luke 2:22–38', ep: 'presentation' },
    { en: 'Wise men from the east; the star', es: 'Los magos del oriente; la estrella', m: 'Matthew 2:1–12', ep: 'magi' },
    { en: 'Flight to Egypt; Herod kills the boys of Bethlehem', es: 'Huida a Egipto; Herodes mata a los niños de Belén', m: 'Matthew 2:13–18', ep: 'magi' },
    { en: 'Home to Nazareth', es: 'De regreso a Nazaret', l: 'Luke 2:39–40', m: 'Matthew 2:19–23', ep: 'magi' },
    { en: 'The boy Jesus in the Temple at twelve', es: 'El niño Jesús en el Templo a los doce años', l: 'Luke 2:41–52' },
  ];
  B.agree = [
    { en: 'Born in Bethlehem', es: 'Nació en Belén', r: 'Luke 2:4–7; Matthew 2:1' },
    { en: 'In the days of King Herod', es: 'En los días del rey Herodes', r: 'Luke 1:5; Matthew 2:1' },
    { en: 'Mary, a virgin, conceived by the Holy Spirit', es: 'María, virgen, concibió por el Espíritu Santo', r: 'Luke 1:34–35; Matthew 1:18–23' },
    { en: 'Joseph, of David’s house', es: 'José, de la casa de David', r: 'Luke 1:27; Matthew 1:20' },
    { en: 'The name Jesus, given by an angel', es: 'El nombre Jesús, dado por un ángel', r: 'Luke 1:31; Matthew 1:21' },
    { en: 'Raised in Nazareth', es: 'Criado en Nazaret', r: 'Luke 2:39; Matthew 2:23' },
  ];
  function harmonyBox(ep, el) {
    const box = el('div', 'disc-thread harmony');
    box.appendChild(el('p', 'disc-kicker', T('One story, two accounts', 'Una historia, dos relatos')));
    box.appendChild(el('p', '', T('Luke tells the story from Mary’s side, Matthew from Joseph’s. Mark begins with John at the Jordan, and John goes back before the beginning: “the Word became flesh, and lived among us” (John 1:14). Here is the usual order, with the parts in this episode marked.',
      'Lucas cuenta la historia desde el lado de María; Mateo, desde el de José. Marcos comienza con Juan en el Jordán, y Juan se remonta a antes del principio: “aquel Verbo fue hecho carne, y habitó entre nosotros” (Juan 1:14). Este es el orden habitual, con las partes de este episodio marcadas.')));
    const tb = el('table', 'harmony-table');
    const head = el('tr'); [T('Event', 'Suceso'), 'Luke', 'Matthew'].forEach((h, i) => head.appendChild(el('th', '', i === 1 ? T('Luke', 'Lucas') : i === 2 ? T('Matthew', 'Mateo') : h))); tb.appendChild(head);
    const ref = (r) => (r && TW.tr ? TW.tr(r) : r) || '';
    B.harmony.forEach((h) => {
      const tr = el('tr', h.ep === ep ? 'here' : '');
      const cv = (r) => (r ? r.replace(/^[A-Za-z]+\s+/, '') : '—');
      tr.appendChild(el('td', '', es() ? h.es : h.en)); tr.appendChild(el('td', '', cv(h.l))); tr.appendChild(el('td', '', cv(h.m)));
      tb.appendChild(tr);
    });
    const wrap = el('div', 'harmony-wrap'); wrap.appendChild(tb); box.appendChild(wrap);
    box.appendChild(el('p', 'help', T('Luke goes straight from the Temple to Nazareth (2:39) and does not mention the wise men; Matthew does not mention the shepherds or the Temple. Most harmonies place the wise men and Egypt between the presentation and the return, since Herod killed boys “two years old and under” (Matthew 2:16). That order is a reasonable fit, not something either Gospel states.',
      'Lucas pasa directamente del Templo a Nazaret (2:39) y no menciona a los magos; Mateo no menciona a los pastores ni el Templo. La mayoría de las armonías sitúan a los magos y Egipto entre la presentación y el regreso, porque Herodes mató a los niños “de dos años abajo” (Mateo 2:16). Ese orden encaja razonablemente, pero ninguno de los dos Evangelios lo afirma.')));
    box.appendChild(el('h4', '', T('Where the two accounts agree', 'En qué coinciden los dos relatos')));
    const ul = el('ul', 'notes'); B.agree.forEach((a) => ul.appendChild(el('li', '', (es() ? a.es : a.en) + ' (' + ref(a.r) + ')'))); box.appendChild(ul);
    return box;
  }
  const study0 = X.study;
  X.study = function (ep, fresh, b, el, newly) {
    study0(ep, fresh, b, el, newly);
    if (TW.D.episodes[ep] && TW.D.episodes[ep].era === 'birth') b.appendChild(harmonyBox(ep, el));
  };

  // word studies
  const W = (word, tr, en, esText) => ({ word, tr, en, es: esText });
  Object.assign(X.words, {
    annunciation: W('κεχαριτωμένη', 'kecharitōmenē', '“Highly favored one” (1:28), from charis, grace: literally “you who have been graced.” The favor is God’s gift, not Mary’s achievement, which is why she “was greatly troubled” and asked what it could mean.', '“Muy favorecida” (1:28), de charis, gracia: literalmente “tú que has recibido gracia”. El favor es don de Dios, no logro de María; por eso ella “se turbó” y se preguntó qué podía significar.'),
    nativity: W('κατάλυμα', 'kataluma', '“Inn” (2:7), usually a guest room rather than an innkeeper’s house. Luke uses the same word for the “guest room” where Jesus ate the last Passover (Luke 22:11): no room for him at the beginning; a room borrowed at the end.', '“Mesón” (2:7), por lo general un cuarto de huéspedes, no la casa de un posadero. Lucas usa la misma palabra para el “aposento” donde Jesús comió la última Pascua (Lucas 22:11): no hubo lugar para él al principio; un cuarto prestado al final.'),
    presentation: W('ἀπολύεις', 'apolyeis', '“Now you are releasing” (2:29): the word for setting a servant free, or dismissing a guard at the end of his watch. Simeon’s long watch is over.', '“Ahora despides” (2:29): la palabra para dejar libre a un siervo, o despedir a un centinela al final de su guardia. La larga vigilia de Simeón ha terminado.'),
    magi: W('μάγοι', 'magoi', '“Wise men” (2:1): a priestly class of Persia and Babylon, known for interpreting dreams and the stars. Daniel was set over the wise men of Babylon (Daniel 2:48). Matthew never says there were three or that they were kings.', '“Magos” (2:1): una clase sacerdotal de Persia y Babilonia, conocida por interpretar sueños y estrellas. Daniel fue puesto sobre los sabios de Babilonia (Daniel 2:48). Mateo nunca dice que fueran tres ni que fueran reyes.'),
  });
  // finds
  X.finds.push(
    { id: 'nazhouse', ep: 'annunciation', title: { en: 'A house in Nazareth', es: 'Una casa en Nazaret' }, text: { en: 'In 2009 archaeologists uncovered the remains of a first-century house next to the Church of the Annunciation: simple rooms, a courtyard and a cistern, from a small village of perhaps a few hundred people. Nazareth in Mary’s day looked like this.', es: 'En 2009 los arqueólogos descubrieron los restos de una casa del siglo I junto a la Basílica de la Anunciación: cuartos sencillos, un patio y una cisterna, en una aldea de quizá unos pocos cientos de personas. Así era Nazaret en tiempos de María.' } },
    { id: 'eleazar', ep: 'annunciation', title: { en: 'Eleazar in the family line', es: 'Eleazar en el linaje' }, text: { en: 'Matthew’s genealogy of Jesus includes the line “Eliud became the father of Eleazar. Eleazar became the father of Matthan” (Matthew 1:15): Joseph’s great-grandfather bore the narrator’s name.', es: 'La genealogía de Jesús en Mateo incluye la línea “Eliud engendró a Eleazar; y Eleazar engendró a Matán” (Mateo 1:15): el bisabuelo de José llevaba el nombre del narrador.' } },
    { id: 'cave', ep: 'nativity', title: { en: 'The cave at Bethlehem', es: 'La cueva de Belén' }, text: { en: 'Around AD 150, Justin Martyr wrote that Jesus was born in a cave near Bethlehem. Many houses there were built over caves used for animals. The Church of the Nativity, first built under Constantine in the 300s, stands over the cave the tradition remembers.', es: 'Hacia el año 150, Justino Mártir escribió que Jesús nació en una cueva cerca de Belén. Muchas casas de allí se construían sobre cuevas que servían para los animales. La Basílica de la Natividad, construida primero bajo Constantino en el siglo IV, está sobre la cueva que recuerda la tradición.' } },
    { id: 'pigeons', ep: 'presentation', title: { en: 'Two young pigeons', es: 'Dos palominos' }, text: { en: 'The Law asked for a lamb and a bird after a birth, but allowed two birds for a family who could not afford a lamb (Leviticus 12:8). Joseph and Mary brought the offering of the poor (Luke 2:24).', es: 'La Ley pedía un cordero y un ave después de un parto, pero permitía dos aves a la familia que no podía pagar un cordero (Levítico 12:8). José y María llevaron la ofrenda de los pobres (Lucas 2:24).' } },
    { id: 'herodium', ep: 'magi', title: { en: 'Herod’s tomb at Herodium', es: 'La tumba de Herodes en el Herodión' }, text: { en: 'Herod built Herodium, a palace-fortress on a cone-shaped hill visible from Bethlehem, and Josephus says he was buried there. In 2007 the archaeologist Ehud Netzer found what most scholars accept as Herod’s tomb on its slope.', es: 'Herodes construyó el Herodión, un palacio fortaleza sobre un monte en forma de cono que se ve desde Belén, y Josefo dice que allí fue sepultado. En 2007 el arqueólogo Ehud Netzer halló en su ladera lo que la mayoría de los estudiosos acepta como la tumba de Herodes.' } },
  );
  // threads
  X.threads.push(
    { id: 'myrrh', needs: ['magi', 'burial'], title: { en: 'Myrrh at the beginning and the end', es: 'Mirra al principio y al final' },
      a: { en: 'The wise men brought the child gold, frankincense and myrrh (Matthew 2:11); myrrh was a spice used for the dead.', es: 'Los magos llevaron al niño oro, incienso y mirra (Mateo 2:11); la mirra era una especia que se usaba para los muertos.' },
      b: { en: 'At his burial, John says, Nicodemus brought “a mixture of myrrh and aloes, about a hundred Roman pounds” (John 19:39). Matthew does not mention it, and John does not mention the wise men.', es: 'En su sepultura, dice Juan, Nicodemo trajo “un compuesto de mirra y de áloe, como cien libras” (Juan 19:39). Mateo no lo menciona, y Juan no menciona a los magos.' } },
    { id: 'nazareth', needs: ['annunciation', 'magi'], title: { en: 'Why Nazareth?', es: '¿Por qué Nazaret?' },
      a: { en: 'Read alone, Matthew sounds as if the family first settled in Nazareth after Egypt, choosing it because Archelaus ruled Judea (Matthew 2:22–23).', es: 'Leído solo, Mateo parece decir que la familia se estableció por primera vez en Nazaret después de Egipto, escogiéndola porque Arquelao gobernaba Judea (Mateo 2:22–23).' },
      b: { en: 'Luke supplies what Matthew assumes: Nazareth was already Mary’s home (Luke 1:26), and they “returned… to their own city” (2:39). Matthew explains why they did not stay in Bethlehem; Luke explains why Nazareth.', es: 'Lucas aporta lo que Mateo da por supuesto: Nazaret ya era el hogar de María (Lucas 1:26), y “se volvieron… a su ciudad” (2:39). Mateo explica por qué no se quedaron en Belén; Lucas explica por qué Nazaret.' } },
    { id: 'light', needs: ['presentation', 'pisidia'], title: { en: 'A light for the nations', es: 'Luz para las naciones' },
      a: { en: 'Simeon, holding the child, called him “a light for revelation to the nations” (Luke 2:32), echoing Isaiah 49:6.', es: 'Simeón, con el niño en brazos, lo llamó “luz para revelación a los gentiles” (Lucas 2:32), con eco de Isaías 49:6.' },
      b: { en: 'Years later Paul, turning to the Gentiles at Pisidian Antioch, quoted the same verse: “I have set you as a light for the Gentiles” (Acts 13:47). The same author, Luke, recorded both.', es: 'Años después Pablo, volviéndose a los gentiles en Antioquía de Pisidia, citó el mismo versículo: “Te he puesto para luz de los gentiles” (Hechos 13:47). El mismo autor, Lucas, registró ambas cosas.' } },
  );
  TW.Birth = B;
})(window.TW);
