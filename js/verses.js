/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — a verse to keep from each episode ("I have hidden your word in my heart", Psalm 119:11).
   On the study page, "Learn it by heart" opens three short rounds: a few words are missing, then half, then all, and
   you tap the words back in order. The verse comes from the Bible you chose, so it is learned in your own translation.
   Verses you have learned are kept in the journal, to practice again. */
window.TW = window.TW || {};
(function (TW) {
  const V = {};
  const es = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const T = (en, esText) => (es() ? esText : en);
  const save = () => TW.game && TW.game.save;
  const persist = () => { try { (TW.Util || TW.U).store(TW.game.save); } catch (e) { /* storage unavailable */ } };

  // the verse to keep from each episode (always inside a passage the game carries, in every Bible it ships)
  V.REF = {
    annunciation: 'Luke 1:37', nativity: 'Luke 2:11', presentation: 'Luke 2:30', magi: 'Matthew 2:2', temple12: 'Luke 2:52',
    capernaum: 'Mark 2:5', levi: 'Mark 2:17', sabbath: 'Mark 2:27', legion: 'Mark 5:19', nain: 'Luke 7:13',
    entry: 'Mark 11:9', temple: 'Mark 12:30', council: 'Mark 14:62', cross: 'Mark 15:39', burial: 'John 19:41',
    tomb: 'Mark 16:6', forty: 'John 20:29', pentecost: 'Acts 2:42', gate: 'Acts 3:6', trial: 'Acts 4:12',
    seven: 'Acts 6:7', stephen: 'Acts 6:15', samaria: 'Acts 8:8', desert: 'Acts 8:35', damascus: 'Acts 9:4',
    tabitha: 'Acts 9:36', cornelius: 'Acts 10:34–35', antioch: 'Acts 11:26', rhoda: 'Acts 12:5', cyprus: 'Acts 13:2',
    pisidia: 'Acts 13:47', lystra: 'Acts 14:22', jcouncil: 'Acts 15:11', lydia: 'Acts 16:14', jailer: 'Acts 16:31',
    berea: 'Acts 17:11', athens: 'Acts 17:28', corinth: 'Acts 18:9–10', artemis: 'Acts 19:20', farewell: 'Acts 20:35',
    arrest: 'Acts 21:13', plot: 'Acts 23:11', felix: 'Acts 24:16', agrippa: 'Acts 26:28', storm: 'Acts 27:25',
    malta: 'Acts 28:2', rome: 'Acts 28:31', letter: 'Philippians 4:4', onesimus: 'Philemon 1:16', goodfight: '2 Timothy 4:7',
    fall: 'Luke 21:33', lamps: 'Revelation 3:20', allnew: 'Revelation 21:5',
  };
  V.text = (ep) => { const r = V.REF[ep]; return r && TW.P && TW.P.singleText ? TW.P.singleText(r) : ''; };
  V.ref = (ep) => { const r = V.REF[ep]; return r ? (TW.Bible && TW.Bible.localRef ? TW.Bible.localRef(r) : r) : ''; };
  V.learned = (ep) => { const s = save(); return !!(s && s.verses && s.verses[ep]); };
  V.count = () => { const s = save(); return s && s.verses ? Object.keys(s.verses).length : 0; };

  // ---------- the study page card ----------
  V.studyCard = function (ep, b, el) {
    const text = V.text(ep); if (!text) return;
    const card = el('div', 'verse-card' + (V.learned(ep) ? ' learned' : ''));
    card.appendChild(el('p', 'plabel', T('A verse to keep', 'Un versículo para guardar')));
    const q = el('blockquote', 'verse-text', text);
    card.appendChild(q);
    card.appendChild(el('p', 'verse-ref', V.ref(ep) + (TW.Bible && TW.Bible.current ? ' (' + TW.Bible.current() + ')' : '')));
    const b1 = el('button', 'btn small primary', V.learned(ep) ? T('Practice it again', 'Practicarlo otra vez') : T('Learn it by heart', 'Aprenderlo de memoria'));
    b1.type = 'button'; b1.addEventListener('click', () => V.play(ep, () => { card.classList.add('learned'); b1.textContent = T('Practice it again', 'Practicarlo otra vez'); }));
    card.appendChild(b1);
    if (V.learned(ep)) card.appendChild(el('p', 'fine verse-kept', T('Hidden in your heart ✓', 'Guardado en tu corazón ✓')));
    b.appendChild(card);
  };

  // ---------- the journal ----------
  V.journal = function (body, el) {
    const s = save(); const eps = s && s.verses ? TW.D.eraOrder.filter((k) => s.verses[k]) : [];
    if (!eps.length) return;
    body.appendChild(el('h3', '', T('Verses by heart', 'Versículos de memoria') + ' · ' + eps.length));
    eps.forEach((ep) => {
      const d = el('div', 'verse-card learned small');
      d.appendChild(el('p', 'disc-ep', TW.tr ? TW.tr(TW.D.episodes[ep].title) : TW.D.episodes[ep].title));
      d.appendChild(el('blockquote', 'verse-text', V.text(ep)));
      d.appendChild(el('p', 'verse-ref', V.ref(ep)));
      const p = el('button', 'btn small', T('Practice', 'Practicar')); p.type = 'button';
      p.addEventListener('click', () => V.play(ep));
      d.appendChild(p);
      body.appendChild(d);
    });
  };

  // ---------- the game: three rounds of tapping the words back in ----------
  const bare = (w) => w.replace(/^[“”"'‘’¿¡(«]+|[“”"'‘’.,;:!?)»—–-]+$/g, '').toLowerCase();
  V.play = function (ep, onDone) {
    const text = V.text(ep); if (!text) return;
    const words = text.split(/\s+/).filter(Boolean);
    const ov = document.createElement('div'); ov.className = 'verse-game'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', T('Learn the verse by heart', 'Aprender el versículo de memoria'));
    const card = document.createElement('div'); card.className = 'verse-game-card'; ov.appendChild(card);
    document.body.appendChild(ov);
    const AU = TW.Audio;
    let round = 0;
    const close = () => { ov.remove(); };
    // round three hides every word, or for a long verse three words in four
    const ROUNDS = [(i) => i % 4 === 2, (i) => i % 2 === 1, (i) => i > 0 && (words.length <= 24 || i % 4 !== 0)];
    const startRound = () => {
      const hide = words.map((w, i) => ROUNDS[round](i) && bare(w).length > 0);
      if (round === 0 && !hide.some(Boolean)) hide[words.length - 1] = true;
      const need = words.map((w, i) => (hide[i] ? i : -1)).filter((i) => i >= 0);
      let at = 0;
      card.innerHTML = '';
      const head = document.createElement('div'); head.className = 'vg-head';
      head.innerHTML = '<span class="vg-round"></span><button type="button" class="btn-text vg-close"></button>';
      head.querySelector('.vg-round').textContent = T('Round ' + (round + 1) + ' of 3', 'Ronda ' + (round + 1) + ' de 3') + ' · ' + V.ref(ep);
      head.querySelector('.vg-close').textContent = T('Close', 'Cerrar');
      head.querySelector('.vg-close').addEventListener('click', close);
      card.appendChild(head);
      const line = document.createElement('p'); line.className = 'vg-line'; card.appendChild(line);
      const spans = words.map((w, i) => { const s = document.createElement('span'); s.className = 'vg-word' + (hide[i] ? ' blank' : ''); s.textContent = hide[i] ? ' '.repeat(Math.max(3, Math.min(10, w.length))) : w; line.appendChild(s); line.appendChild(document.createTextNode(' ')); return s; });
      const mark = () => spans.forEach((s, i) => s.classList.toggle('next', need[at] === i));
      mark();
      const hint = document.createElement('p'); hint.className = 'vg-hint';
      hint.textContent = round === 2 ? T('Now the whole verse: tap every word in order.', 'Ahora todo el versículo: toca cada palabra en orden.') : T('Tap the missing words in order.', 'Toca las palabras que faltan, en orden.');
      card.appendChild(hint);
      const pool = document.createElement('div'); pool.className = 'vg-pool'; card.appendChild(pool);
      const chips = need.map((i) => words[i]).map((w, k) => ({ w, k })).sort(() => Math.random() - 0.5);
      chips.forEach((c) => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'vg-chip'; b.textContent = c.w;
        b.addEventListener('click', () => {
          const want = words[need[at]];
          if (bare(c.w) === bare(want)) {
            const s = spans[need[at]]; s.textContent = want; s.classList.remove('blank'); s.classList.add('filled');
            b.remove(); at++; mark();
            AU && AU.sfx('tap'); TW.Native && TW.Native.haptic('light');
            if (at >= need.length) {
              round++;
              AU && AU.sfx(round >= 3 ? 'joy' : 'answer');
              setTimeout(() => (round >= 3 ? finish() : startRound()), 650);
            }
          } else {
            b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
            TW.Native && TW.Native.haptic('medium');
          }
        });
        pool.appendChild(b);
      });
    };
    const finish = () => {
      const s = save(); s.verses = s.verses || {};
      const first = !s.verses[ep];
      s.verses[ep] = { at: Date.now(), ref: V.REF[ep] }; persist();
      card.innerHTML = '';
      const h = document.createElement('h3'); h.className = 'vg-done'; h.textContent = T('Hidden in your heart', 'Guardado en tu corazón'); card.appendChild(h);
      const q = document.createElement('blockquote'); q.className = 'verse-text'; q.textContent = text; card.appendChild(q);
      const r = document.createElement('p'); r.className = 'verse-ref'; r.textContent = V.ref(ep); card.appendChild(r);
      const ps = document.createElement('p'); ps.className = 'fine'; ps.textContent = T('“I have hidden your word in my heart” (Psalm 119:11). ', '“En mi corazón he guardado tus dichos” (Salmo 119:11). ') + T('Verses by heart: ', 'Versículos de memoria: ') + V.count() + '.'; card.appendChild(ps);
      const row = document.createElement('div'); row.className = 'vg-actions';
      const hear = document.createElement('button'); hear.type = 'button'; hear.className = 'btn small'; hear.textContent = T('Hear it', 'Escucharlo');
      hear.addEventListener('click', () => TW.Speech && TW.Speech.say('scripture', text, null, TW.Lines ? TW.Lines.id('scripture', text) : null));
      const done = document.createElement('button'); done.type = 'button'; done.className = 'btn small primary'; done.textContent = T('Done', 'Listo');
      done.addEventListener('click', () => { TW.Speech && TW.Speech.stop(); close(); });
      row.appendChild(hear); row.appendChild(done); card.appendChild(row);
      TW.Native && TW.Native.haptic('firm');
      if (first && onDone) onDone();
    };
    startRound();
  };
  TW.Verses = V;
})(window.TW);
