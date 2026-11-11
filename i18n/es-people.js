/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Spanish (español): speaker names, the conversations behind taps in Eras I–II, and interface labels
   for the map, the timeline and the episode lists. */
window.TW = window.TW || {};
(function (TW) {
  // speaker names and interface labels, translated wherever they appear
  TW.I18n.add('es', {
    'A Pharisee from Capernaum': 'Un fariseo de Capernaúm', 'A dove seller': 'Un vendedor de palomas', 'A fisherman mending nets': 'Un pescador remendando redes',
    'A man in the market': 'Un hombre en el mercado', 'A man who was in the crowd': 'Un hombre que estaba en la multitud', 'A merchant with a bundle of cloth': 'Un mercader con un fardo de tela',
    'A money changer': 'Un cambista', 'A servant from the wedding at Cana': 'Un sirviente de la boda de Caná', 'A widow': 'Una viuda', 'A woman from Sychar': 'Una mujer de Sicar',
    'A woman grinding grain': 'Una mujer moliendo grano', 'A woman of Sychar': 'Una mujer de Sicar', 'An elder of the synagogue': 'Un anciano de la sinagoga', 'Ananias': 'Ananías',
    'Bartimaeus, son of Timaeus': 'Bartimeo, hijo de Timeo', 'Euodia of Alexandria': 'Evodia de Alejandría', 'Her mother': 'Su madre', 'Jairus, a ruler of the synagogue': 'Jairo, principal de la sinagoga',
    'Luke': 'Lucas', 'Martha of Bethany': 'Marta de Betania', 'Mary of Magdala': 'María Magdalena', 'Miriam': 'Miriam', 'Miriam of Alexandria': 'Miriam de Alejandría', 'Nicodemus': 'Nicodemo',
    'One of four friends': 'Uno de los cuatro amigos', 'One of the four friends': 'Uno de los cuatro amigos', 'Rivka': 'Rivka', 'Saul': 'Saulo', 'Sergius Paulus': 'Sergio Paulo', 'Simon Peter': 'Simón Pedro',
    'Simon’s wife’s mother': 'La suegra de Simón', 'Someone in the crowd': 'Alguien entre la multitud', 'Stephen': 'Esteban', 'The elder': 'El anciano', 'The fisherman from Capernaum': 'El pescador de Capernaúm',
    'The fisherman from the beach': 'El pescador de la playa', 'The lame man': 'El cojo', 'The man born blind': 'El ciego de nacimiento', 'The official': 'El oficial', 'The synagogue attendant': 'El ayudante de la sinagoga',
    'The woman at the quern': 'La mujer del molino', 'The woman of Sychar': 'La mujer de Sicar', 'Theodora of Cyrene': 'Teodora de Cirene', 'Thomas': 'Tomás', 'Tobiah': 'Tobías', 'Yosef': 'Yosef', 'Your helper': 'Tu ayudante',
    // map, timeline and episode lists
    'Voice speed': 'Velocidad de la voz', 'Even out voice volume (experimental; turn off if recordings go silent)': 'Igualar el volumen de las voces (experimental; desactívalo si las grabaciones dejan de oírse)', 'Your question': 'Tu pregunta', 'Care': 'Cuidar', 'Pray': 'Orar', 'Your choice': 'Tu elección', 'Replay': 'Repetir', 'Study': 'Estudiar', 'Enter': 'Entrar', 'Play': 'Jugar', 'Open': 'Abrir', 'Completed': 'Completado', 'completed': 'completado',
    'Episodes': 'Episodios', 'A later episode': 'Un episodio posterior', 'Historical background': 'Trasfondo histórico', 'Closer view': 'Vista de cerca',
    'People to talk to here': 'Personas con quienes hablar aquí', 'Eyewitnesses to seek out': 'Testigos que buscar', 'Episode': 'Episodio',
    'heard': 'escuchado', 'after': 'después de', 'Listen': 'Escuchar', 'Again': 'Otra vez', 'waiting for you': 'te espera', 'not yet heard': 'aún no escuchado', 'told after Pentecost': 'contado después de Pentecostés',
    'Galilee': 'Galilea', 'The Land': 'La Tierra', 'Jerusalem': 'Jerusalén', 'The Roman East': 'El Oriente romano', 'The Aegean': 'El Egeo', 'The Voyage to Rome': 'El viaje a Roma',
    'Study notes': 'Notas de estudio', 'To reflect on': 'Para reflexionar', 'Your heart': 'Tu corazón', 'What you saw': 'Lo que viste', 'What you concluded': 'Lo que concluiste',
    'A young scribe, trained in the Law of Moses. His teacher Nicodemus sends him north with other teachers to watch the man from Nazareth.': 'Un joven escriba, instruido en la Ley de Moisés. Su maestro Nicodemo lo envía al norte con otros maestros para observar al hombre de Nazaret.',
    'Few women in Judea could read and write, but some daughters of learned households did. Nicodemus taught his niece so she could keep his accounts. Where women went with Jesus, she goes; where they could not, she stands at the door.': 'Pocas mujeres de Judea sabían leer y escribir, pero algunas hijas de familias instruidas sí. Nicodemo enseñó a su sobrina para que llevara sus cuentas. Adonde iban las mujeres con Jesús, ella va; adonde no podían ir, ella se queda en la puerta.',
    'Two accounts, one story. Before each scene you choose whose eyes to see it through: Eleazar on the scribes’ bench, or Elisheva among the women who followed Jesus. Between them you see what neither could see alone.': 'Dos relatos, una historia. Antes de cada escena eliges con qué ojos verla: Eleazar en el banco de los escribas, o Elisheva entre las mujeres que seguían a Jesús. Entre los dos ves lo que ninguno podría ver por sí solo.',
    'You have finished this era. Era II, The Road to Jerusalem, comes next.': 'Has terminado esta era. Sigue la Era II, El camino a Jerusalén.',
    'You have finished this era. Era III, The Jerusalem Church, comes next.': 'Has terminado esta era. Sigue la Era III, La iglesia de Jerusalén.',
    'You have finished this era. Era V, Fire and War, comes next.': 'Has terminado esta era. Sigue la Era V, Fuego y guerra.',
    'You have finished this era. Era VI, Patmos and the Seven Churches, comes next.': 'Has terminado esta era. Sigue la Era VI, Patmos y las siete iglesias.',
    'You have reached the end of the account: from a roof in Capernaum to the last page of the scroll.': 'Has llegado al final del relato: desde un techo en Capernaúm hasta la última página del rollo.',
    'Service is open: look for people who need you on the Jerusalem map.': 'El servicio está abierto: busca en el mapa de Jerusalén a personas que te necesitan.',
    'Nothing written yet. In each place, tap people and things to note what you see.': 'Todavía no hay nada escrito. En cada lugar, toca a las personas y las cosas para anotar lo que ves.',
    'No one served yet. Look for people who need you on the Jerusalem map.': 'Todavía no has servido a nadie. Busca en el mapa de Jerusalén a personas que te necesitan.',
    'Service opens in Era III, after the Seven are chosen.': 'El servicio se abre en la Era III, después de que se elige a los siete.',
    'No open questions yet. Questions raised by what you witness are kept here until Scripture answers them later in your journey.': 'Todavía no hay preguntas abiertas. Las preguntas que surgen de lo que presencias se guardan aquí hasta que la Escritura las responde más adelante en tu viaje.',
    'No reports sealed yet. Finish an episode to write one.': 'Todavía no has sellado ningún informe. Termina un episodio para escribir uno.',
    'No letters sealed yet. Finish an episode to write one.': 'Todavía no has sellado ninguna carta. Termina un episodio para escribir una.',
    'Download a public-domain translation (only the verses this game uses, about 150 KB):': 'Descarga una traducción de dominio público (solo los versículos que usa este juego, unos 150 KB):',
    'Texts come from getBible.net or bible-api.com. The King James Version is public domain in the US; in the UK the Crown holds rights to it.': 'Los textos vienen de getBible.net o bible-api.com. La versión King James es de dominio público en los Estados Unidos; en el Reino Unido la Corona tiene derechos sobre ella.',
    'Safari lets web pages use only some of the voices on your phone. Enhanced, Premium and Siri voices you download in Settings → Accessibility → Read & Speak usually do not appear here, even when set as the default. The best voice in this list is chosen automatically, and any recorded voices added to the game are used first.': 'Safari permite a las páginas web usar solo algunas de las voces de tu teléfono. Las voces mejoradas, Premium y de Siri que descargas en Ajustes → Accesibilidad → Leer y hablar normalmente no aparecen aquí, aunque estén elegidas como predeterminadas. Se elige automáticamente la mejor voz de esta lista, y las voces grabadas que se añadan al juego se usan primero.',
    'No voices are available yet. Turn Read aloud on once, then reopen this tab.': 'Todavía no hay voces disponibles. Activa una vez la lectura en voz alta y vuelve a abrir esta pestaña.',
    'Recorded voices play wherever they exist. Any other line is read by your device’s voice.': 'Las voces grabadas suenan dondequiera que existan. Cualquier otra línea la lee la voz de tu dispositivo.',
    'Free to play and to share unchanged with others. The code, art, music and story may not be copied, changed, reused or sold without permission. Scripture texts are public domain and are not covered by this license.': 'Libre para jugar y para compartir sin cambios con otros. El código, el arte, la música y la historia no pueden copiarse, modificarse, reutilizarse ni venderse sin permiso. Los textos bíblicos son de dominio público y no están cubiertos por esta licencia.',
    'Backup copies your journey to a file (and to the clipboard), so you can move it to another device.': 'La copia de seguridad guarda tu viaje en un archivo (y en el portapapeles), para que puedas llevarlo a otro dispositivo.',
    'Use a public-domain Bible as a plain text file with one verse per line. On eBible.org, for example, the American Standard Version (eng-asv), the King James Version (eng-kjv) and the Reina-Valera 1909 (spaRV1909) are offered as “VPL” text. Download it, unzip it in the Files app, then choose the .txt file here. Only the verses this game uses are kept.': 'Usa una Biblia de dominio público como archivo de texto simple, con un versículo por línea. En eBible.org, por ejemplo, la American Standard Version (eng-asv), la King James Version (eng-kjv) y la Reina-Valera 1909 (spaRV1909) se ofrecen como texto “VPL”. Descárgala, descomprímela en la app Archivos y luego elige aquí el archivo .txt. Solo se guardan los versículos que usa este juego.',
    'Back to the map': 'Volver al mapa', 'Back to the timeline': 'Volver a la cronología', 'Map': 'Mapa', 'Timeline': 'Cronología', 'Scroll': 'Rollo',
  });
  Object.assign(TW.Lines.translations.es, {
    // ---- Capernaum ----
    'd-28162c44': '¿Buscas a Jesús de Nazaret? Sigue el ruido. Medio pueblo ha estado frente a esa puerta desde el amanecer.',
    'd-bc9b5a92': '¿Vienes por él? Sanó a la suegra de Simón, aquí en este pueblo. La fiebre la dejó, y ella se levantó y les servía.',
    'd-a8a849b6': 'Ella describe un día anterior en Capernaúm, narrado en Marcos 1:29–31.',
    'd-4ba6c986': 'Lo trajimos desde el otro extremo del pueblo. No hay manera de pasar por esa puerta. Hoy no.',
    'd-a218f6e0': 'Otro levanta la vista hacia la escalera que sube por el muro hasta el techo. Los cuatro se miran.',
    'd-59ce7028': 'Los cuatro hombres ya están subiendo la escalera exterior hacia el techo, cargando a su amigo entre ellos.',
    'd-3ea74f80': '¿Lo viste? ¡Pasó junto a mí cargando su propia camilla!',
    'd-8283cfaa': 'No pudimos hacerlo pasar por la puerta. Así que subimos.',
    'd-c41ebed2': 'Añadido a tu rollo',
    // ---- Levi ----
    'd-aef1a000': 'El cobrador de impuestos no levanta la vista de su cuenta. Nadie se acerca a su puesto si no tiene que hacerlo.',
    'd-b76c91c3': 'Peaje al salir de la tierra de Felipe, peaje al entrar en esta. Para cuando llegue a Tiberias, habré pagado la tela dos veces.',
    'd-ec49c1d5': '¿Estuviste ayer en la casa? Entonces sabes por qué lo vigilamos. A un maestro se le conoce por la compañía que tiene. Mira adónde va.',
    // ---- the Sabbath ----
    'd-78dcc9c4': 'Sabía que la Ley permite al hambriento arrancar espigas con la mano.',
    'd-c7a306e8': 'Esperé a oír su respuesta antes de juzgar.',
    // ---- Legion ----
    'd-808efc21': 'Tuve más compasión del hombre de lo que me importó el costo.',
    'd-d99c8637': 'Me repugnó aquella tierra impura.',
    // ---- the Temple ----
    'd-6930db73': '¡Escriba! ¿También subiste a la fiesta? Medio Capernaúm está aquí. Dicen que hoy volverá al Templo.',
    'd-1c284589': '¡Hija! ¿También subiste a la fiesta? Medio Capernaúm está aquí. Dicen que hoy volverá al Templo.',
    'd-af77928d': 'El impuesto del Templo se paga en plata de Tiro y en nada más. Tus monedas romanas llevan el rostro del César. Te las puedo cambiar, por una pequeña comisión.',
    'd-f026f3e0': 'Dos palomas para la purificación de una madre, si no puede pagar un cordero. Los sacerdotes rechazan cualquier ave con defecto, así que compra aquí y asegúrate.',
    'd-708600ba': 'Cuando recitó el Shemá, lo escuché como si nunca lo hubiera oído.',
    'd-5a7e66e5': 'A lo largo de esta barrera había avisos en griego y en latín. Se han hallado dos. Advierten que cualquier extranjero que la cruce será el único culpable de la muerte que le sobrevenga.',
    // ---- the Cross ----
    'd-653a498c': 'Me quedé lejos, con las mujeres que lo habían seguido desde Galilea.',
    // ---- the Burial ----
    'd-1e338a36': 'Cargué las especias para Nicodemo.',
    'd-2d76c6ab': 'Me quedé atrás y observé desde el muro del huerto.',
    'd-4165f9c0': 'Observé con las mujeres de Galilea.',
    'd-99b5e9f1': 'Cargué los frascos de especias para mi tío.',
    // ---- the Empty Tomb (shown in two parts) ----
    'd-9391b6be': 'Los lienzos están donde fue puesto el cuerpo, y el sudario que tenía en la cabeza está enrollado en un lugar aparte.',
    'd-5f5d30af': ' Hace dos tardes ayudaste a envolverlo con esos lienzos.',
    'd-6920180c': ' Hace dos tardes los viste llevarlo adentro.',
  });
})(window.TW);
