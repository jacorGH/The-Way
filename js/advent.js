/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — the Advent calendar: twenty-five doors, December 1 to Christmas Day. Each door opens on a passage from
   the Birth of Jesus (the same readings the game uses, so their recordings play), a short thought, a carol, and the
   memory it belongs to. In December one door opens each day; the rest of the year every door is open.
   Advent candles (hope, peace, joy, love, and Christ on Christmas Day) light with the Sundays of Advent. */
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

  // ---------- the season ----------
  const today = () => (AD.now ? AD.now() : new Date());
  // the first Sunday of Advent: four Sundays before Christmas
  AD.adventStart = (year) => { const x = new Date(year, 11, 25), back = x.getDay() === 0 ? 7 : x.getDay(); return new Date(year, 11, 25 - back - 21); };
  AD.state = function () {
    const d = today(), y = d.getFullYear(), m = d.getMonth(), day = d.getDate();
    const start = AD.adventStart(y);
    if (DEV) return { mode: 'open', year: y, upTo: 25, sundays: 0 };
    if (m === 11 && day <= 25) {
      const sundays = Math.min(4, Math.floor((new Date(y, m, day) - start) / (7 * 864e5)) + 1);
      return { mode: 'advent', year: y, upTo: day, sundays: day === 25 ? 5 : sundays };
    }
    if (d >= start && m === 10) return { mode: 'waiting', year: y, upTo: 0, sundays: 1 };
    return { mode: 'open', year: y, upTo: 25, sundays: 0 };
  };
  AD.inSeason = () => { const d = today(), m = d.getMonth(), day = d.getDate(); return (m === 10 && day >= 15) || m === 11 || (m === 0 && day <= 6); };

  const save = () => (TW.game && TW.game.save) || {};
  const opened = (year) => { const s = save(); s.advent = s.advent || {}; return (s.advent[year] = s.advent[year] || []); };
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
    b.appendChild(candles(st));
    b.appendChild(el('p', 'adv-note', note(st)));
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
          btn.classList.add('opening');
          TW.Audio && TW.Audio.sfx(d.day === 25 ? 'joy' : 'bells');
          TW.Native && TW.Native.haptic('medium');
          setTimeout(() => door(d), U().reducedMotion() ? 0 : 520);
        } else door(d);
      });
      g.appendChild(btn);
    });
    b.appendChild(g);
    // in the store apps: a reminder each morning of Advent
    if (TW.Native && TW.Native.canRemind()) {
      const s = save(), row = el('label', 'set-check adv-remind'), box = el('input');
      box.type = 'checkbox'; box.checked = !!s.adventRemind;
      box.addEventListener('change', async () => {
        const ok = await TW.Native.adventReminders(box.checked, AD.doors, es());
        if (!ok && box.checked) box.checked = false;
        s.adventRemind = box.checked; persist();
      });
      row.appendChild(box); row.appendChild(el('span', '', es() ? 'Recuérdame cada mañana de Adviento (8:00)' : 'Remind me each morning of Advent (8:00)'));
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
    tt.appendChild(el('p', 'adv-date', (es() ? d.day + ' de diciembre' : 'December ' + d.day)));
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
    if (d.day === 25) {
      const sing = el('p', 'adv-fine fine', es() ? 'En el recuerdo de los pastores puedes pasar el dedo sobre los ángeles y cantar con ellos.' : 'In the shepherds’ memory you can sweep your finger across the angels and sing with them.');
      b.appendChild(sing);
    }
    ov.scrollTop = 0;
  }
  function $(s) { return document.querySelector(s); }
  function U() { return TW.U || { reducedMotion: () => false }; }

  AD.open = function () {
    overlay();
    document.querySelectorAll('.overlay').forEach((o) => { o.hidden = true; });
    ov.hidden = false; ov.scrollTop = 0;
    const st = AD.state();
    TW.Audio && TW.Audio.music(st.mode === 'advent' && st.upTo >= 22 ? 'gloria' : 'advent');
    grid();
  };
  AD.close = function (quiet) {
    if (!ov) return;
    ov.hidden = true;
    TW.Speech && TW.Speech.stop();
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
  AD.titleButton = function () {
    const box = document.querySelector('.title-actions');
    if (!box) return;
    const old = box.querySelector('.adv-btn'); if (old) old.remove();
    if (AD.inSeason()) box.appendChild(AD.button('btn adv-btn'));
  };
  TW.Advent = AD;
})(window.TW);
// keep the title button in the chosen language
document.addEventListener('click', (e) => { if (e.target && e.target.closest && e.target.closest('#btn-title-lang') && TW.Advent) setTimeout(() => TW.Advent.titleButton(), 60); });
