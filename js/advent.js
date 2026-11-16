/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — the Advent calendar: twenty-five doors, December 1 to Christmas Day. Each door opens on a passage from
   the Birth of Jesus (the same readings the game uses, so their recordings play), a short thought, a carol, and the
   memory it belongs to. In December one door opens each day; the rest of the year every door is open.
   Advent candles (hope, peace, joy, love, and Christ on Christmas Day) light with the Sundays of Advent.
   After Christmas, one more door: Three Kings Day (January 6, Epiphany; Día de Reyes), with two of its traditions to
   play: leaving your shoes out for the Kings on the night of January 5, and the rosca de Reyes with the Child hidden
   inside. */
window.TW = window.TW || {};
(function (TW) {
  const AD = {};
  const es = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const L = (o) => (es() ? o.es : o.en);
  const DEV = /[?&]dev\b/.test(location.search);

  // day, reference (as the game reads it), title, thought, carol, memory, icon
  const D = (day, ref, en, es, ten, tes, mood, ep, icon) => ({ day, ref, title: { en, es }, thought: { en: ten, es: tes }, mood, ep, icon });
  AD.doors = [
    D(1, 'Luke 1:1–4', 'An orderly account', 'Una historia ordenada', 'Luke checked everything with the eyewitnesses before he wrote. This Advent, read it as they told it.', 'Lucas lo comprobó todo con los testigos antes de escribir. Este Adviento, léelo como ellos lo contaron.', 'advent', 'annunciation', 'scroll'),
    D(2, 'Luke 1:26–29', 'Greetings, favored one', 'Salve, muy favorecida', 'God sent his messenger to a small town, to a young woman no one had heard of.', 'Dios envió a su mensajero a un pueblo pequeño, a una joven de quien nadie había oído hablar.', 'advent', 'annunciation', 'angel'),
    D(3, 'Luke 1:30–33', 'No end to his kingdom', 'Su reino no tendrá fin', 'Every kingdom Mary knew had ended. This one would not.', 'Todos los reinos que María conocía habían terminado. Este no terminaría.', 'advent', 'annunciation', 'crown'),
    D(4, 'Luke 1:34–37', 'Nothing is impossible with God', 'Ninguna cosa es imposible para Dios', 'Mary asked how. Gabriel did not scold her; he answered.', 'María preguntó cómo. Gabriel no la reprendió; le respondió.', 'advent', 'annunciation', 'star'),
    D(5, 'Luke 1:38', 'The servant of the Lord', 'La sierva del Señor', 'She said yes before she understood. What would it take for you to say it?', 'Dijo que sí antes de entender. ¿Qué te haría falta a ti para decirlo?', 'advent', 'annunciation', 'lamp'),
    D(6, 'Luke 1:39–40', 'Into the hill country', 'A la montaña', 'The first thing Mary did with the news was go to someone who would understand.', 'Lo primero que hizo María con la noticia fue ir a alguien que la entendería.', 'advent', 'annunciation', 'path'),
    D(7, 'Luke 1:41–45', 'The baby leaped', 'La criatura saltó', 'Before he was born, John was already pointing to Jesus.', 'Antes de nacer, Juan ya señalaba a Jesús.', 'advent', 'annunciation', 'star'),
    D(8, 'Luke 1:46–50', 'My soul magnifies the Lord', 'Engrandece mi alma al Señor', 'Mary’s song is full of the Psalms. She had been learning them all her life.', 'El cántico de María está lleno de los Salmos. Los había aprendido toda su vida.', 'advent', 'annunciation', 'note'),
    D(9, 'Luke 1:51–56', 'He has filled the hungry', 'A los hambrientos colmó de bienes', 'In Mary’s song the proud are scattered and the humble lifted up. Advent turns the world upside down.', 'En el cántico de María los soberbios son esparcidos y los humildes levantados. El Adviento pone el mundo al revés.', 'advent', 'annunciation', 'note'),
    D(10, 'Matthew 1:18–19', 'A righteous man', 'Un varón justo', 'Joseph meant to be kind even when he thought he had been wronged.', 'José quiso ser bondadoso aun cuando creyó que le habían hecho mal.', 'advent', 'annunciation', 'lamp'),
    D(11, 'Matthew 1:20–21', 'He will save his people', 'Él salvará a su pueblo', 'Jesus means “the Lord saves.” The name was the promise.', 'Jesús significa “el Señor salva”. El nombre era la promesa.', 'advent', 'annunciation', 'scroll'),
    D(12, 'Matthew 1:22–23', 'God with us', 'Dios con nosotros', 'Immanuel: not God far off, but God with us.', 'Emanuel: no un Dios lejano, sino Dios con nosotros.', 'advent', 'annunciation', 'star'),
    D(13, 'Matthew 1:24–25', 'Joseph did as he was told', 'José hizo como el ángel le mandó', 'Joseph never speaks in the Gospels. He simply does what God asks.', 'José nunca habla en los Evangelios. Simplemente hace lo que Dios le pide.', 'advent', 'annunciation', 'lamp'),
    D(14, 'Luke 2:1–3', 'A decree from Caesar', 'Un edicto de César', 'The most powerful man in the world signed an order, and it moved a carpenter to Bethlehem, where the prophet said the Messiah would be born.', 'El hombre más poderoso del mundo firmó una orden, y esta llevó a un carpintero a Belén, donde el profeta dijo que nacería el Mesías.', 'manger', 'nativity', 'scroll'),
    D(15, 'Luke 2:4–5', 'To the city of David', 'A la ciudad de David', 'About a hundred and fifty kilometers on foot, with Mary near her time.', 'Unos ciento cincuenta kilómetros a pie, con María cerca de dar a luz.', 'manger', 'nativity', 'path'),
    D(16, 'Luke 2:25–27', 'Waiting for the consolation of Israel', 'Esperaba la consolación de Israel', 'Simeon had waited his whole life. Advent is for people who wait.', 'Simeón había esperado toda su vida. El Adviento es para los que esperan.', 'child', 'presentation', 'candle'),
    D(17, 'Luke 2:28–32', 'A light for the nations', 'Luz para los gentiles', 'Simeon held the baby and saw the light of the whole world.', 'Simeón tomó al niño en brazos y vio la luz de todo el mundo.', 'child', 'presentation', 'candle'),
    D(18, 'Luke 2:36–38', 'Anna gave thanks', 'Ana daba gracias', 'A widow of eighty-four, and the first to tell everyone who was waiting.', 'Una viuda de ochenta y cuatro años, y la primera en contarlo a todos los que esperaban.', 'child', 'presentation', 'lamp'),
    D(19, 'Matthew 2:1–2', 'We saw his star', 'Hemos visto su estrella', 'Strangers from the east came looking, while Jerusalem stayed home.', 'Extranjeros del oriente vinieron a buscarlo, mientras Jerusalén se quedó en casa.', 'kings', 'magi', 'star'),
    D(20, 'Matthew 2:9–10', 'Exceeding great joy', 'Muy grande gozo', 'Matthew piles up the words: they rejoiced with great joy, exceedingly.', 'Mateo amontona las palabras: se regocijaron con muy grande gozo.', 'kings', 'magi', 'star'),
    D(21, 'Matthew 2:11', 'Gold, frankincense and myrrh', 'Oro, incienso y mirra', 'Gifts for a king, for worship, and for a burial. They brought what they had.', 'Regalos para un rey, para la adoración y para una sepultura. Trajeron lo que tenían.', 'kings', 'magi', 'gift'),
    D(22, 'Luke 2:8', 'Shepherds in the field', 'Pastores en el campo', 'The news came first to men working the night watch.', 'La noticia llegó primero a unos hombres que velaban de noche.', 'gloria', 'nativity', 'sheep'),
    D(23, 'Luke 2:9–12', 'Good news of great joy', 'Nuevas de gran gozo', 'For all the people: a Savior, who is Christ the Lord. And the sign is a baby.', 'Para todo el pueblo: un Salvador, que es Cristo el Señor. Y la señal es un niño.', 'gloria', 'nativity', 'angel'),
    D(24, 'Luke 2:7', 'No room', 'No había lugar', 'Christmas Eve. The Lord of everything, laid where the animals ate.', 'Nochebuena. El Señor de todo, acostado donde comían los animales.', 'manger', 'nativity', 'manger'),
    D(25, 'Luke 2:13–14', 'Glory to God in the highest', 'Gloria en las alturas a Dios', 'Christmas Day. Sing it with the angels.', 'Navidad. Cántalo con los ángeles.', 'gloria', 'nativity', 'angel'),
  ];
  // Three Kings Day, January 6
  AD.reyes = {
    day: 'reyes', ref: 'Matthew 2:11', title: { en: 'Three Kings Day', es: 'Día de Reyes' },
    thought: {
      en: 'January 6, Epiphany: the church remembers the Magi, the first of the nations to worship Jesus. In Spain, Mexico, Puerto Rico and across Latin America it is Día de Reyes, as big a feast as Christmas. Matthew never says how many came or that they were kings; three gifts gave us three Kings, and tradition named them Melchior, Caspar and Balthazar.',
      es: '6 de enero, Epifanía: la iglesia recuerda a los Magos, los primeros de las naciones en adorar a Jesús. En España, México, Puerto Rico y toda Latinoamérica es el Día de Reyes, una fiesta tan grande como la Navidad. Mateo nunca dice cuántos vinieron ni que fueran reyes; tres regalos nos dieron tres Reyes, y la tradición los llamó Melchor, Gaspar y Baltasar.',
    },
    mood: 'kings', ep: 'magi', icon: 'kings',
  };

  // ---------- the season ----------
  const today = () => (AD.now ? AD.now() : new Date());
  // the first Sunday of Advent: four Sundays before Christmas
  AD.adventStart = (year) => { const x = new Date(year, 11, 25), back = x.getDay() === 0 ? 7 : x.getDay(); return new Date(year, 11, 25 - back - 21); };
  AD.state = function () {
    const d = today(), m = d.getMonth(), day = d.getDate(), y = m === 0 ? d.getFullYear() - 1 : d.getFullYear();   // early January belongs to last December
    const start = AD.adventStart(y);
    if (DEV) return { mode: 'open', year: y, upTo: 25, sundays: 0 };
    if ((m === 11 && day > 25) || (m === 0 && day <= 6)) return { mode: 'christmas', year: y, upTo: 25, sundays: 5, reyesIn: m === 0 ? 6 - day : 31 - day + 6 };
    if (m === 11 && day <= 25) {
      const sundays = Math.min(4, Math.floor((new Date(y, m, day) - start) / (7 * 864e5)) + 1);
      return { mode: 'advent', year: y, upTo: day, sundays: day === 25 ? 5 : sundays };
    }
    if (d >= start && m === 10) return { mode: 'waiting', year: y, upTo: 0, sundays: 1 };
    return { mode: 'open', year: y, upTo: 25, sundays: 0 };
  };
  // the Kings' door opens on January 6 (and stays open outside the season, like the others)
  AD.reyesOpen = (st) => { st = st || AD.state(); return st.mode === 'open' || (st.mode === 'christmas' && st.reyesIn <= 1); };   // from the eve, for the shoes
  AD.inSeason = () => { const m = today().getMonth(), day = today().getDate(); return m === 10 || m === 11 || (m === 0 && day <= 6); };

  const save = () => (TW.game && TW.game.save) || {};
  const opened = (year) => { const s = save(); s.advent = s.advent || {}; return (s.advent[year] = s.advent[year] || []); };
  const rey = (year) => { const s = save(); s.reyes = s.reyes || {}; return (s.reyes[year] = s.reyes[year] || {}); };
  const persist = () => { try { TW.U && TW.U.store && TW.game && TW.U.store(TW.game.save); } catch (e) { /* storage unavailable */ } };

  // ---------- little pictures for the doors (16 by 16, drawn in pixels) ----------
  const ICON = {
    star(R) { R(7, 1, 2, 14, '#e8c35a'); R(1, 7, 14, 2, '#e8c35a'); R(4, 4, 8, 8, '#e8c35a'); R(6, 6, 4, 4, '#fffbe8'); R(3, 3, 1, 1, '#f6e2a0'); R(12, 3, 1, 1, '#f6e2a0'); R(3, 12, 1, 1, '#f6e2a0'); R(12, 12, 1, 1, '#f6e2a0'); },
    angel(R) { for (let j = 1; j <= 5; j++) { R(6 - j, 3 + (j >> 1), 1, 6 - (j >> 1), '#f3e6c4'); R(9 + j, 3 + (j >> 1), 1, 6 - (j >> 1), '#f3e6c4'); } for (let r = 0; r < 9; r++) R(8 - ((3 + (r >> 1)) >> 1), 6 + r, 3 + (r >> 1), 1, '#fffaf0'); R(7, 2, 3, 3, '#f4e1c0'); R(7, 1, 3, 1, '#e8c35a'); },
    crown(R) { R(2, 10, 12, 3, '#d9a93a'); R(2, 6, 2, 4, '#d9a93a'); R(7, 4, 2, 6, '#d9a93a'); R(12, 6, 2, 4, '#d9a93a'); R(2, 13, 12, 1, '#a87a22'); R(5, 11, 1, 1, '#b8323a'); R(10, 11, 1, 1, '#2a5a9a'); R(7, 3, 2, 1, '#fff4c8'); },
    lamp(R) { R(2, 10, 10, 3, '#a8643a'); R(3, 9, 8, 1, '#c27a48'); R(11, 9, 3, 2, '#a8643a'); R(12, 5, 2, 4, '#ffcf5a'); R(12, 7, 2, 2, '#ff9a3a'); R(11, 4, 1, 2, '#fff0b0'); R(3, 13, 8, 1, '#7a4426'); },
    path(R) { R(0, 11, 16, 5, '#8a7a54'); R(0, 8, 6, 3, '#9aa06a'); R(9, 7, 7, 4, '#9aa06a'); [[3, 14], [5, 13], [7, 12], [9, 11], [11, 10], [12, 9]].forEach(([x, y]) => R(x, y, 2, 1, '#e8dcb8')); R(12, 2, 2, 2, '#fffbe8'); },
    note(R) { R(4, 3, 1, 9, '#e8dcb8'); R(2, 11, 3, 2, '#e8dcb8'); R(11, 2, 1, 9, '#e8dcb8'); R(9, 10, 3, 2, '#e8dcb8'); R(4, 2, 8, 2, '#e8c35a'); },
    scroll(R) { R(3, 4, 10, 8, '#efe2c0'); R(2, 3, 2, 10, '#8a5a32'); R(12, 3, 2, 10, '#8a5a32'); [6, 8, 10].forEach((y) => R(5, y, 6, 1, '#8a7a5a')); },
    candle(R) { R(6, 7, 4, 8, '#8a5aa8'); R(6, 7, 1, 8, '#a87ac4'); R(7, 2, 2, 4, '#ffcf5a'); R(7, 4, 2, 2, '#ff9a3a'); R(7, 1, 1, 1, '#fff0b0'); R(4, 14, 8, 1, '#c9a85a'); },
    gift(R) { R(2, 7, 12, 7, '#a8323a'); R(1, 5, 14, 2, '#c4404a'); R(7, 5, 2, 9, '#e8c35a'); R(5, 3, 3, 2, '#e8c35a'); R(9, 3, 3, 2, '#e8c35a'); },
    sheep(R) { R(2, 7, 10, 5, '#efe8da'); R(3, 6, 8, 1, '#fffaf0'); R(11, 6, 3, 3, '#3a3028'); R(3, 12, 1, 2, '#3a3028'); R(10, 12, 1, 2, '#3a3028'); R(12, 2, 2, 2, '#fffbe8'); },
    manger(R) { R(2, 10, 12, 3, '#8a8070'); R(2, 13, 2, 2, '#6e6658'); R(12, 13, 2, 2, '#6e6658'); R(3, 9, 10, 1, '#d9b85a'); R(5, 7, 6, 3, '#f6efe0'); R(10, 7, 2, 2, '#f0d8b8'); R(7, 1, 2, 2, '#fffbe8'); R(7, 3, 2, 3, 'rgba(255,240,190,0.5)'); },
    kings(R) {
      [[0, '#d9a93a', '#b8323a'], [5, '#e8c35a', '#2a7a5a'], [10, '#d9a93a', '#2a5a9a']].forEach(([x, g, j], i) => {
        const y = i === 1 ? 6 : 8;
        R(x + 1, y + 2, 5, 3, g); R(x + 1, y, 1, 2, g); R(x + 3, y - 1, 1, 3, g); R(x + 5, y, 1, 2, g); R(x + 3, y + 3, 1, 1, j);
      });
      R(7, 1, 2, 2, '#fffbe8'); R(8, 0, 1, 1, '#fff4c8'); R(2, 14, 12, 1, '#a87a22');
    },
  };
  function iconCanvas(name) {
    const c = document.createElement('canvas'); c.width = 16; c.height = 16; c.className = 'adv-icon';
    const x = c.getContext('2d');
    (ICON[name] || ICON.star)((a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); });
    return c;
  }

  // ---------- the calendar ----------
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const T = (s) => (TW.t ? TW.t(s) : s);
  let ov = null;
  function overlay() {
    if (ov) return ov;
    ov = el('section', 'overlay adv-overlay'); ov.id = 'o-advent'; ov.hidden = true;
    const sc = el('div', 'scroll adv'); sc.id = 'advent-body'; ov.appendChild(sc);
    const host = document.querySelector('#o-study') ? document.querySelector('#o-study').parentNode : document.body;
    host.appendChild(ov);
    return ov;
  }
  function candles(st) {
    const row = el('div', 'adv-candles');
    const colors = ['#6a3a8a', '#6a3a8a', '#c86a9a', '#6a3a8a'];
    const names = es() ? ['Esperanza', 'Paz', 'Gozo', 'Amor'] : ['Hope', 'Peace', 'Joy', 'Love'];
    colors.forEach((c, i) => {
      const lit = st.sundays > i;
      const k = el('span', 'adv-candle' + (lit ? ' lit' : ''));
      k.style.setProperty('--wax', c); k.title = names[i];
      k.appendChild(el('span', 'flame')); k.appendChild(el('span', 'wax'));
      k.appendChild(el('span', 'adv-cname', names[i]));
      row.appendChild(k);
      if (i === 1) {
        const cx = el('span', 'adv-candle christ' + (st.sundays >= 5 ? ' lit' : ''));
        cx.style.setProperty('--wax', '#f4eee0'); cx.appendChild(el('span', 'flame')); cx.appendChild(el('span', 'wax'));
        cx.appendChild(el('span', 'adv-cname', es() ? 'Cristo' : 'Christ'));
        row.appendChild(cx);
      }
    });
    return row;
  }
  function note(st) {
    const names = es() ? ['Esperanza', 'Paz', 'Gozo', 'Amor'] : ['Hope', 'Peace', 'Joy', 'Love'];
    const ord = es() ? ['Primera', 'Segunda', 'Tercera', 'Cuarta'] : ['First', 'Second', 'Third', 'Fourth'];
    if (st.mode === 'christmas') return st.reyesIn > 0 ? (es() ? 'Feliz Navidad. Doce días hasta Reyes: la última puerta se abre el 6 de enero.' : 'Merry Christmas. Twelve days to the Kings: the last door opens on January 6.') : (es() ? '¡Feliz Día de Reyes! La puerta de los Reyes está abierta.' : 'Happy Three Kings Day! The Kings’ door is open.');
    if (st.mode === 'advent' && st.sundays >= 5) return es() ? 'Navidad. Cristo ha nacido.' : 'Christmas Day. Christ is born.';
    if (st.mode === 'advent') return es() ? ord[st.sundays - 1] + ' semana de Adviento: ' + names[st.sundays - 1] + '. Se abre una puerta cada día.' : ord[st.sundays - 1] + ' week of Advent: ' + names[st.sundays - 1] + '. One door opens each day.';
    if (st.mode === 'waiting') return es() ? 'El Adviento ha comenzado. La primera puerta se abre el 1 de diciembre.' : 'Advent has begun. The first door opens on December 1.';
    return es() ? 'Fuera del Adviento, todas las puertas están abiertas. En diciembre se abre una cada día.' : 'Outside Advent, every door is open. In December, one opens each day.';
  }
  function grid() {
    const st = AD.state(), done = opened(st.year), b = $('#advent-body');
    b.innerHTML = '';
    const head = el('header', 'ov-head');
    head.appendChild(el('h2', 'scroll-title', es() ? 'Calendario de Adviento' : 'Advent calendar'));
    const close = el('button', 'btn-text', T('Close')); close.type = 'button';
    close.addEventListener('click', AD.close);
    head.appendChild(close);
    b.appendChild(head);
    const sky = el('div', 'adv-sky');
    sky.appendChild(starCanvas());
    sky.appendChild(candles(st));
    sky.appendChild(el('p', 'adv-note', note(st)));
    const g = el('div', 'adv-grid');
    AD.doors.forEach((d) => {
      const can = d.day <= st.upTo, isOpen = done.indexOf(d.day) >= 0;
      const btn = el('button', 'adv-door' + (isOpen ? ' opened' : '') + (can ? '' : ' locked') + (d.day === 25 ? ' xmas' : '') + (st.mode === 'advent' && d.day === st.upTo && !isOpen ? ' today' : ''));
      btn.type = 'button';
      btn.setAttribute('aria-label', (es() ? 'Día ' : 'Day ') + d.day + (isOpen ? ': ' + L(d.title) : can ? '' : (es() ? ', todavía cerrada' : ', not open yet')));
      if (isOpen) { btn.appendChild(iconCanvas(d.icon)); btn.appendChild(el('span', 'adv-day small', String(d.day))); }
      else btn.appendChild(el('span', 'adv-day', String(d.day)));
      btn.disabled = !can;
      btn.addEventListener('click', () => {
        if (!isOpen) {
          done.push(d.day); persist();
          btn.classList.add('opening'); burst(btn, d.day === 25);
          TW.Audio && TW.Audio.sfx(d.day === 25 ? 'joy' : 'bells');
          TW.Native && TW.Native.haptic('medium');
          setTimeout(() => door(d), U().reducedMotion() ? 0 : 520);
        } else door(d);
      });
      g.appendChild(btn);
    });
    // January 6: the Kings' door
    {
      const R = AD.reyes, can = AD.reyesOpen(st), isOpen = !!rey(st.year).opened;
      const btn = el('button', 'adv-door xmas reyes' + (isOpen ? ' opened' : '') + (can ? '' : ' locked') + (can && !isOpen && st.mode === 'christmas' ? ' today' : ''));
      btn.type = 'button';
      btn.setAttribute('aria-label', L(R.title) + (can ? '' : (es() ? ', se abre el 6 de enero' : ', opens on January 6')));
      if (isOpen) btn.appendChild(iconCanvas('kings'));
      btn.appendChild(el('span', 'adv-day reyes-label', can ? L(R.title) : (es() ? '6 de enero · Reyes' : 'January 6 · Three Kings')));
      btn.disabled = !can;
      btn.addEventListener('click', () => {
        if (!isOpen) {
          rey(st.year).opened = Date.now(); persist();
          btn.classList.add('opening'); burst(btn, true);
          TW.Audio && TW.Audio.sfx('joy'); TW.Native && TW.Native.haptic('medium');
          setTimeout(() => door(R), U().reducedMotion() ? 0 : 520);
        } else door(R);
      });
      g.appendChild(btn);
    }
    sky.appendChild(g);
    b.appendChild(sky);
    // in the store apps: a reminder each morning of Advent
    if (TW.Native && TW.Native.canRemind()) {
      const s = save(), row = el('label', 'set-check adv-remind'), box = el('input');
      box.type = 'checkbox'; box.checked = !!s.adventRemind;
      box.addEventListener('change', async () => {
        const ok = await TW.Native.adventReminders(box.checked, AD.doors, es(), [
          { id: 1301, month: 0, day: 5, hour: 19, title: es() ? 'Víspera de Reyes' : 'The eve of Three Kings Day', body: es() ? 'Esta noche, deja tus zapatos para los Reyes (con hierba para los camellos).' : 'Tonight, leave your shoes out for the Kings (with hay for the camels).' },
          { id: 1302, month: 0, day: 6, hour: 8, title: es() ? '¡Feliz Día de Reyes!' : 'Happy Three Kings Day!', body: es() ? 'La puerta de los Reyes está abierta.' : 'The Kings’ door is open.' },
        ]);
        if (!ok && box.checked) box.checked = false;
        s.adventRemind = box.checked; persist();
      });
      row.appendChild(box); row.appendChild(el('span', '', es() ? 'Recuérdame cada mañana de Adviento (8:00) y el Día de Reyes' : 'Remind me each morning of Advent (8:00) and on Three Kings Day'));
      b.appendChild(row);
    }
    b.appendChild(el('p', 'fine adv-fine', es() ? 'Cada puerta abre una lectura de El nacimiento de Jesús, con su villancico y el recuerdo al que pertenece.' : 'Each door opens a reading from The Birth of Jesus, with its carol and the memory it belongs to.'));
  }
  function door(d) {
    const b = $('#advent-body'); b.innerHTML = '';
    TW.Audio && TW.Audio.music(d.mood);
    const head = el('header', 'ov-head');
    const back = el('button', 'btn-text', es() ? '‹ Calendario' : '‹ Calendar'); back.type = 'button';
    back.addEventListener('click', () => { TW.Speech && TW.Speech.stop(); grid(); });
    head.appendChild(back);
    const close = el('button', 'btn-text', T('Close')); close.type = 'button'; close.addEventListener('click', AD.close);
    head.appendChild(close);
    b.appendChild(head);
    const top = el('div', 'adv-door-head');
    const ic = iconCanvas(d.icon); ic.classList.add('big'); top.appendChild(ic);
    const tt = el('div');
    tt.appendChild(el('p', 'adv-date', d.day === 'reyes' ? (es() ? '6 de enero · Epifanía' : 'January 6 · Epiphany') : (es() ? d.day + ' de diciembre' : 'December ' + d.day)));
    tt.appendChild(el('h3', 'adv-title', L(d.title)));
    top.appendChild(tt);
    b.appendChild(top);
    const ref = TW.Bible ? TW.Bible.localRef(d.ref) : d.ref;
    const text = TW.P && TW.P.singleText ? TW.P.singleText(d.ref) : '';
    const q = el('blockquote', 'adv-text');
    q.appendChild(el('p', '', text));
    q.appendChild(el('cite', '', ref + (TW.Bible && TW.Bible.current ? ' (' + TW.Bible.current() + ')' : '')));
    b.appendChild(q);
    b.appendChild(el('p', 'adv-thought', L(d.thought)));
    const acts = el('div', 'adv-actions');
    const hear = el('button', 'btn', es() ? 'Escuchar la lectura' : 'Hear it read'); hear.type = 'button';
    hear.addEventListener('click', () => {
      if (!TW.Speech || !text) return;
      const id = TW.Lines ? TW.Lines.id('scripture', text) : null;
      TW.Speech.say('scripture', text, null, id);
    });
    acts.appendChild(hear);
    const ep = TW.D && TW.D.episodes[d.ep];
    if (ep && TW.game && TW.game.enterEpisode) {
      const play = el('button', 'btn primary', (es() ? 'Vivir el recuerdo: ' : 'Live the memory: ') + (TW.tr ? TW.tr(ep.title) : ep.title)); play.type = 'button';
      play.addEventListener('click', () => { AD.close(true); TW.game.enterEpisode(d.ep); });
      acts.appendChild(play);
    }
    b.appendChild(acts);
    if (d.day === 'reyes') traditions(b);
    if (d.day === 25) {
      const sing = el('p', 'adv-fine fine', es() ? 'En el recuerdo de los pastores, los ángeles cantan Noche de paz: tócalos mientras cantan.' : 'In the shepherds’ memory the angels sing Silent Night: touch them as they sing.');
      b.appendChild(sing);
    }
    ov.scrollTop = 0;
  }
  // ---------- Día de Reyes: two traditions to play ----------
  function traditions(b) {
    const st = AD.state(), r = rey(st.year);
    const eve = st.mode === 'christmas' && st.reyesIn > 0;   // before the morning of January 6
    b.appendChild(el('h3', 'adv-trad-h', es() ? 'Las tradiciones' : 'The traditions'));

    // 1. the shoes
    const sh = el('div', 'adv-trad');
    sh.appendChild(el('h4', '', es() ? 'Los zapatos para los Reyes' : 'Shoes for the Kings'));
    sh.appendChild(el('p', '', es()
      ? 'La noche del 5 de enero, los niños dejan sus zapatos junto a la puerta o el árbol, con hierba o paja y agua para los camellos. Por la mañana, los Reyes han dejado regalos, como los Magos dejaron los suyos ante el Niño.'
      : 'On the night of January 5, children leave their shoes by the door or the tree, with grass or hay and water for the camels. In the morning, the Kings have left gifts, as the Magi left theirs before the Child.'));
    const cv = document.createElement('canvas'); cv.width = 96; cv.height = 44; cv.className = 'adv-scene'; sh.appendChild(cv);
    const info = el('p', 'adv-gift-note fine'); sh.appendChild(info);
    const row = el('div', 'adv-actions'); sh.appendChild(row);
    const GIFTS = [
      { x: 10, en: ['Gold', 'for a king'], es: ['Oro', 'para un rey'] },
      { x: 30, en: ['Frankincense', 'for worship, for God'], es: ['Incienso', 'para la adoración, para Dios'] },
      { x: 50, en: ['Myrrh', 'for a burial: he came to die for us'], es: ['Mirra', 'para una sepultura: vino a morir por nosotros'] },
    ];
    const drawShoes = () => {
      const x = cv.getContext('2d'), R = (a, c, w, h, col) => { x.fillStyle = col; x.fillRect(a, c, w, h); };
      x.clearRect(0, 0, 96, 44);
      R(0, 0, 96, 30, eve || !r.shoes ? '#241d3a' : '#5a4a6a');                   // the wall: night, or morning light
      R(0, 30, 96, 14, '#6a5240'); R(0, 30, 96, 1, '#8a6a50');
      R(70, 4, 20, 26, '#3a2a1e'); R(72, 6, 16, 24, eve || !r.shoes ? '#1a1428' : '#d8c08a');   // the door (a window of dawn)
      R(6, 6, 2, 2, '#fff4c8'); R(20, 3, 1, 1, '#fff'); R(50, 8, 1, 1, '#fff'); R(36, 2, 2, 2, '#ffe9a0');
      if (!r.shoes) { x.fillStyle = '#c9b890'; x.font = '6px serif'; return; }
      // two pairs of shoes, hay for the camels, a bowl of water
      [[6, '#7a3a2a', '#9a5a3a'], [26, '#2a4a7a', '#4a6a9a']].forEach(([sx, col, hi]) => {
        [0, 7].forEach((o) => { R(sx + o, 34, 6, 4, col); R(sx + o, 32, 3, 2, col); R(sx + o + 1, 32, 1, 1, hi); R(sx + o, 38, 7, 1, '#2a1e16'); R(sx + o + 3, 35, 2, 1, hi); });
      });
      for (let i = 0; i < 10; i++) R(44 + i * 1.6 | 0, 35 - (i % 3), 1, 4 + (i % 3), i % 2 ? '#d9b85a' : '#c4a040');
      R(60, 36, 8, 3, '#8a8a9a'); R(61, 36, 6, 1, '#7ab8e8');
      if (!eve) GIFTS.forEach((gf, i) => {
        const gx = gf.x, gy = 24;
        if (i === 0) { R(gx, gy + 2, 8, 7, '#e8c35a'); R(gx, gy + 2, 8, 1, '#fff4c8'); R(gx + 3, gy + 2, 2, 7, '#c8323a'); R(gx + 2, gy, 4, 2, '#c8323a'); }
        if (i === 1) { R(gx + 1, gy + 3, 6, 6, '#d8d0c0'); R(gx, gy + 3, 8, 1, '#b8b0a0'); R(gx + 3, gy - 1, 1, 3, 'rgba(240,240,255,0.7)'); R(gx + 4, gy - 4, 1, 3, 'rgba(240,240,255,0.5)'); R(gx + 3, gy - 6, 1, 2, 'rgba(240,240,255,0.3)'); }
        if (i === 2) { R(gx + 2, gy + 2, 3, 2, '#8a3a5a'); R(gx + 1, gy + 4, 5, 5, '#8a3a5a'); R(gx + 2, gy + 1, 3, 1, '#c9a85a'); R(gx + 2, gy + 5, 1, 2, '#b85a7a'); }
        R(gx - 1, gy + 9, 10, 1, 'rgba(255,240,190,0.4)');
      });
    };
    const render = () => {
      drawShoes(); row.innerHTML = '';
      if (!r.shoes) {
        info.textContent = '';
        const put = el('button', 'btn primary', es() ? 'Dejar mis zapatos' : 'Leave my shoes out'); put.type = 'button';
        put.addEventListener('click', () => {
          r.shoes = Date.now(); persist(); TW.Audio && TW.Audio.sfx(eve ? 'tap' : 'joy'); TW.Native && TW.Native.haptic('light');
          if (!eve) burst(cv, true);
          render();
        });
        row.appendChild(put);
      } else if (eve) {
        info.textContent = es() ? 'Tus zapatos esperan junto a la puerta, con paja para los camellos. Vuelve el 6 de enero.' : 'Your shoes wait by the door, with hay for the camels. Come back on January 6.';
      } else {
        info.textContent = es() ? 'Los Reyes vinieron por la noche. Toca cada regalo.' : 'The Kings came in the night. Touch each gift.';
        GIFTS.forEach((gf) => {
          const t = el('button', 'btn small', L({ en: gf.en[0], es: gf.es[0] })); t.type = 'button';
          t.addEventListener('click', () => { info.textContent = L({ en: gf.en[0] + ': ' + gf.en[1] + '.', es: gf.es[0] + ': ' + gf.es[1] + '.' }) + (es() ? ' (Mateo 2:11)' : ' (Matthew 2:11)'); TW.Audio && TW.Audio.sfx('tap'); });
          row.appendChild(t);
        });
      }
    };
    render();
    b.appendChild(sh);

    // 2. the rosca
    const ro = el('div', 'adv-trad');
    ro.appendChild(el('h4', '', es() ? 'La rosca de Reyes' : 'The rosca de Reyes'));
    ro.appendChild(el('p', '', es()
      ? 'Un pan dulce en forma de corona, con frutas como joyas. Dentro se esconde un Niño Jesús: escondido como cuando José huyó con él a Egipto. Quien lo encuentra invita los tamales el 2 de febrero, Día de la Candelaria, cuando Jesús fue presentado en el templo.'
      : 'A sweet bread shaped like a crown, with candied fruit for jewels. Hidden inside is a tiny figure of the Christ Child, hidden as he was when Joseph fled with him to Egypt. Whoever finds him brings the tamales on February 2, Candlemas, when Jesus was presented in the Temple.'));
    const rc = document.createElement('canvas'); rc.width = 96; rc.height = 52; rc.className = 'adv-scene rosca'; ro.appendChild(rc);
    const rn = el('p', 'adv-gift-note fine'); ro.appendChild(rn);
    const N = 8;
    r.rosca = r.rosca || { cut: [], baby: Math.floor(Math.random() * N), found: false };
    const k = r.rosca;
    const cx = 48, cy = 26, A = 44, B = 23;
    const drawRosca = () => {
      const x = rc.getContext('2d'); x.clearRect(0, 0, 96, 52);
      for (let py = 0; py < 52; py++) for (let px = 0; px < 96; px++) {
        const nx = (px + 0.5 - cx) / A, ny = (py + 0.5 - cy) / B, rr = Math.hypot(nx, ny);
        if (rr > 1 || rr < 0.5) continue;
        const ang = (Math.atan2(ny, nx) + Math.PI * 2) % (Math.PI * 2), sec = Math.floor(ang / (Math.PI * 2 / N));
        const edge = Math.abs(((ang / (Math.PI * 2 / N)) % 1)) < 0.04;
        let col;
        if (k.cut.indexOf(sec) >= 0) {
          col = edge ? '#5a3a22' : (rr > 0.92 || rr < 0.57 ? '#9a5a2a' : (rr > 0.86 || rr < 0.63 ? '#e0b070' : '#f6dca0'));   // the crumb, inside the crust
          if (sec === k.baby && !k.found && Math.abs(rr - 0.75) < 0.1 && Math.abs((ang / (Math.PI * 2 / N)) % 1 - 0.5) < 0.14) col = '#fffaf0';
        } else {
          col = rr > 0.92 ? '#8a5228' : '#c4803e';
          if (Math.abs(rr - 0.74) < 0.07 && Math.floor(ang * 9) % 3 === 0) col = '#f0e2c0';          // stripes of sugar paste
          if (Math.abs(rr - 0.74) < 0.06 && Math.floor(ang * 9) % 3 === 1 && (px + py) % 7 === 0) col = ['#c8323a', '#3a8a3a', '#e88a2a'][sec % 3];   // candied fruit
        }
        x.fillStyle = col; x.fillRect(px, py, 1, 1);
      }
      if (k.found) {   // the Child, lifted out into the middle of the crown, shining
        const R = (a, c, w, h, col) => { x.fillStyle = col; x.fillRect(a, c, w, h); };
        R(cx - 11, cy - 7, 22, 14, 'rgba(255,236,170,0.35)'); R(cx - 9, cy - 5, 18, 10, 'rgba(255,236,170,0.45)');
        R(cx - 7, cy - 2, 11, 5, '#fffaf0'); R(cx - 6, cy - 3, 9, 1, '#fffaf0'); R(cx - 7, cy + 3, 10, 1, '#d8ccb8');   // swaddled
        R(cx + 4, cy - 3, 4, 4, '#f0d0a8'); R(cx + 5, cy - 4, 2, 1, '#8a5a32'); R(cx + 6, cy - 2, 1, 1, '#5a3a22');      // his face
        R(cx - 4, cy - 1, 6, 1, '#e8dcc8'); R(cx - 4, cy + 1, 6, 1, '#e8dcc8');
        [[-13, -6], [12, -7], [-10, 6], [13, 5]].forEach(([a, c]) => R(cx + a, cy + c, 1, 1, '#ffe9a0'));
      }
    };
    const say = () => {
      if (k.found) rn.textContent = es() ? '¡Encontraste al Niño! Te tocan los tamales el 2 de febrero.' : 'You found the Child! The tamales are yours to bring on February 2.';
      else if (!k.cut.length) rn.textContent = es() ? 'Toca la rosca para cortar una rebanada.' : 'Tap the rosca to cut a slice.';
      else rn.textContent = es() ? 'Todavía no... corta otra.' : 'Not yet... cut another.';
    };
    rc.addEventListener('click', (ev) => {
      if (k.found) return;
      const rect = rc.getBoundingClientRect();
      const px = ((ev.clientX - rect.left) / rect.width) * 96, py = ((ev.clientY - rect.top) / rect.height) * 52;
      const nx = (px - cx) / A, ny = (py - cy) / B;
      if (Math.hypot(nx, ny) > 1.1) return;
      const sec = Math.floor(((Math.atan2(ny, nx) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2 / N));
      if (k.cut.indexOf(sec) >= 0) return;
      k.cut.push(sec);
      TW.Audio && TW.Audio.sfx('tap'); TW.Native && TW.Native.haptic('light');
      if (sec === k.baby) { k.found = Date.now(); TW.Audio && TW.Audio.sfx('joy'); TW.Native && TW.Native.haptic('firm'); setTimeout(() => burst(rc, true), 150); renderLink(); }
      persist(); drawRosca(); say();
    });
    const links = el('div', 'adv-actions'); ro.appendChild(links);
    const renderLink = () => {
      links.innerHTML = '';
      if (!k.found) return;
      const ep = TW.D && TW.D.episodes.presentation;
      if (ep && TW.game && TW.game.enterEpisode) {
        const go = el('button', 'btn', (es() ? 'Vivir el recuerdo: ' : 'Live the memory: ') + (TW.tr ? TW.tr(ep.title) : ep.title)); go.type = 'button';
        go.addEventListener('click', () => { AD.close(true); TW.game.enterEpisode('presentation'); });
        links.appendChild(go);
      }
      const again = el('button', 'btn small', es() ? 'Otra rosca' : 'Another rosca'); again.type = 'button';
      again.addEventListener('click', () => { r.rosca = { cut: [], baby: Math.floor(Math.random() * N), found: false }; persist(); door(AD.reyes); });
      links.appendChild(again);
    };
    drawRosca(); say(); renderLink();
    b.appendChild(ro);
    b.appendChild(el('p', 'fine adv-fine', es()
      ? 'En muchos lugares hay también cabalgatas de Reyes por las calles la tarde del 5 de enero. Y en Puerto Rico los niños llenan una caja de zapatos con hierba para los camellos.'
      : 'In many towns the Kings ride through the streets in parades (cabalgatas) on the evening of January 5. In Puerto Rico, children fill a shoebox with grass for the camels.'));
  }
  function $(s) { return document.querySelector(s); }
  function U() { return TW.U || { reducedMotion: () => false }; }

  AD.open = function () {
    overlay();
    document.querySelectorAll('.overlay').forEach((o) => { o.hidden = true; });
    ov.hidden = false; ov.scrollTop = 0;
    const st = AD.state();
    TW.Audio && TW.Audio.music(st.mode === 'christmas' ? 'kings' : st.mode === 'advent' && st.upTo >= 22 ? 'gloria' : 'advent');
    grid();
  };
  AD.close = function (quiet) {
    if (!ov) return;
    ov.hidden = true;
    TW.Speech && TW.Speech.stop();
    AD.titleButton();
    // back to the music of the screen underneath
    if (!quiet && TW.game && TW.game.screen && TW.game.screen !== 'scene' && TW.game.show) TW.game.show(TW.game.screen);
  };
  // a button for the title (in season) and for the Birth of Jesus on the timeline (always)
  AD.button = function (cls) {
    const b = el('button', cls || 'btn adv-btn');
    b.type = 'button';
    const st = AD.state(), n = opened(st.year).length;
    b.textContent = (es() ? 'Calendario de Adviento' : 'Advent calendar') + (st.mode === 'advent' && n < st.upTo ? ' · ' + (es() ? 'nueva puerta' : 'a new door') : '');
    b.addEventListener('click', AD.open);
    return b;
  };
  // the star over Bethlehem, in pixels, above the doors
  function starCanvas() {
    const c = document.createElement('canvas'); c.width = 32; c.height = 32; c.className = 'adv-bigstar'; c.setAttribute('aria-hidden', 'true');
    const x = c.getContext('2d'), R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(15, 0, 2, 32, 'rgba(255,240,190,0.35)'); R(0, 15, 32, 2, 'rgba(255,240,190,0.25)');
    R(15, 4, 2, 24, '#ffe9a0'); R(4, 15, 24, 2, '#ffe9a0');
    R(11, 11, 10, 10, '#f3cf5a'); R(13, 9, 6, 14, '#f3cf5a'); R(9, 13, 14, 6, '#f3cf5a');
    R(13, 13, 6, 6, '#fffbe8'); R(15, 15, 2, 2, '#ffffff');
    [[8, 8], [23, 8], [8, 23], [23, 23]].forEach(([a, b]) => R(a, b, 1, 1, '#fff2c0'));
    return c;
  }
  // golden sparks from a door as it opens
  function burst(btn, big) {
    if (U().reducedMotion()) return;
    const r = btn.getBoundingClientRect(), n = big ? 28 : 14;
    for (let i = 0; i < n; i++) {
      const p = el('span', 'adv-spark');
      const a = Math.random() * Math.PI * 2, d = (big ? 70 : 40) + Math.random() * (big ? 90 : 45);
      p.style.left = (r.left + r.width / 2) + 'px'; p.style.top = (r.top + r.height / 2) + 'px';
      p.style.setProperty('--dx', Math.cos(a) * d + 'px'); p.style.setProperty('--dy', Math.sin(a) * d - 20 + 'px');
      p.style.animationDelay = (Math.random() * 0.12) + 's';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }
  // what the title banner says today
  function banner(st) {
    const d = today(), y = d.getFullYear(), start = AD.adventStart(y), n = opened(st.year).length;
    const days = Math.ceil((new Date(start.getFullYear(), start.getMonth(), start.getDate()) - new Date(y, d.getMonth(), d.getDate())) / 864e5);
    const dayName = es() ? 'domingo ' + start.getDate() + ' de noviembre' : 'Sunday, November ' + start.getDate();
    if (st.mode === 'christmas') {
      const r = rey(st.year);
      if (st.reyesIn <= 0) return { line: r.opened ? (es() ? '¡Feliz Día de Reyes!' : 'Happy Three Kings Day!') : (es() ? '¡Feliz Día de Reyes! Abre la puerta de los Reyes' : 'Happy Three Kings Day! Open the Kings’ door'), fresh: !r.opened, kings: true };
      if (st.reyesIn === 1) return { line: es() ? 'Esta noche, deja tus zapatos para los Reyes' : 'Tonight, leave your shoes out for the Kings', fresh: !r.shoes, kings: true };
      return { line: es() ? '¡Feliz Navidad! Día de Reyes: faltan ' + st.reyesIn + ' días' : 'Merry Christmas! Three Kings Day in ' + st.reyesIn + ' days', fresh: false, kings: true };
    }
    if (d.getMonth() === 0) return { line: es() ? '¡Feliz Navidad! Las 25 puertas están abiertas.' : 'Merry Christmas! All 25 doors are open.', fresh: false };
    if (st.mode === 'advent') {
      const todayOpen = opened(st.year).indexOf(st.upTo) >= 0;
      if (st.upTo === 25) return { line: todayOpen ? (es() ? 'Navidad. Cristo ha nacido.' : 'Christmas Day. Christ is born.') : (es() ? 'Navidad: abre la última puerta' : 'Christmas Day: open the last door'), fresh: !todayOpen };
      if (!todayOpen) return { line: (es() ? st.upTo + ' de diciembre · la puerta de hoy te espera' : 'December ' + st.upTo + ' · today’s door is waiting'), fresh: true };
      return { line: es() ? 'Abriste la puerta de hoy. Vuelve mañana.' : 'Today’s door is open. Come back tomorrow.', fresh: false };
    }
    if (st.mode === 'waiting') return { line: es() ? 'El Adviento ha comenzado. La primera puerta se abre el 1 de diciembre.' : 'Advent has begun. The first door opens on December 1.', fresh: false };
    if (days > 0) return { line: es() ? 'El Adviento empieza el ' + dayName + (days > 1 ? ' · faltan ' + days + ' días' : ' · mañana') : 'Advent begins ' + dayName + (days > 1 ? ' · ' + days + ' days to go' : ' · tomorrow'), fresh: false };
    return { line: n ? (es() ? n + ' de 25 puertas abiertas' : n + ' of 25 doors opened') : (es() ? 'Veinticinco puertas hasta Navidad' : 'Twenty-five doors to Christmas'), fresh: false };
  }
  // on the title, from November to Epiphany: a window onto the night sky with the wreath, today's news, and the doors
  AD.titleButton = function () {
    const slot = document.getElementById('adv-slot');
    const box = document.querySelector('.title-actions');
    if (box) { const old = box.querySelector('.adv-btn'); if (old) old.remove(); }
    if (!slot) return;
    slot.innerHTML = '';
    if (!AD.inSeason()) return;
    const st = AD.state(), done = opened(st.year), info = banner(st);
    const b = el('button', 'adv-banner' + (info.fresh ? ' fresh' : '')); b.type = 'button';
    b.setAttribute('aria-label', (es() ? 'Calendario de Adviento. ' : 'Advent calendar. ') + info.line);
    const left = el('span', 'adv-banner-wreath');
    left.appendChild(candles(st));
    left.appendChild(el('span', 'adv-greens'));
    b.appendChild(left);
    const right = el('span', 'adv-banner-text');
    right.appendChild(el('span', 'adv-banner-kicker', info.kings ? (es() ? 'Tiempo de Navidad' : 'Christmastide') : (es() ? 'Temporada de Adviento' : 'The season of Advent')));
    right.appendChild(el('span', 'adv-banner-title', info.kings ? (es() ? 'Día de Reyes' : 'Three Kings Day') : (es() ? 'Calendario de Adviento' : 'Advent Calendar')));
    right.appendChild(el('span', 'adv-banner-line', info.line));
    const dots = el('span', 'adv-dots');
    for (let i = 1; i <= 25; i++) dots.appendChild(el('span', 'adv-dot' + (done.indexOf(i) >= 0 ? ' on' : '') + (st.mode === 'advent' && i === st.upTo && done.indexOf(i) < 0 ? ' now' : '')));
    dots.appendChild(el('span', 'adv-dot kings' + (rey(st.year).opened ? ' on' : '') + (st.mode === 'christmas' && st.reyesIn <= 0 && !rey(st.year).opened ? ' now' : '')));
    right.appendChild(dots);
    b.appendChild(right);
    if (info.fresh) b.appendChild(el('span', 'adv-new', es() ? 'Nueva' : 'New'));
    b.addEventListener('click', () => { TW.Audio && TW.Audio.sfx('bells'); AD.open(); });
    slot.appendChild(b);
  };
  TW.Advent = AD;
})(window.TW);
