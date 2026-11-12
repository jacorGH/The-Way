/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — group mode, for families and classes: take turns reading Scripture aloud, decide choices together,
   show discussion questions full-screen to the room, and print a leader's guide. */
window.TW = window.TW || {};
(function (TW) {
  const es = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const T = (en, esText) => (es() ? esText : en);
  const tr = (x) => (TW.tr && typeof x === 'string' ? TW.tr(x) : x);
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const G = {};
  G.on = () => !!(TW.Settings && TW.Settings.get('group'));
  G.names = () => String((TW.Settings && TW.Settings.get('groupNames')) || '').split(',').map((s) => s.trim()).filter(Boolean);
  let turn = 0;
  // whose turn it is to read the next Scripture passage aloud
  G.reader = () => { const n = G.names(); if (!n.length) return ''; const who = n[turn % n.length]; turn++; return who; };
  G.hint = () => T('Talk it over together, then choose.', 'Conversen juntos y luego elijan.');

  // full-screen questions for the room
  G.room = function (questions) {
    if (!questions.length) return;
    let i = 0;
    const o = document.createElement('div'); o.className = 'room'; o.setAttribute('role', 'dialog');
    const n = document.createElement('p'); n.className = 'room-n';
    const q = document.createElement('p'); q.className = 'room-q';
    const hint = document.createElement('p'); hint.className = 'room-hint';
    const close = document.createElement('button'); close.className = 'room-close'; close.type = 'button'; close.textContent = '✕'; close.setAttribute('aria-label', T('Close', 'Cerrar'));
    const show = () => { n.textContent = (i + 1) + ' / ' + questions.length; q.textContent = questions[i]; hint.textContent = i < questions.length - 1 ? T('Tap for the next question', 'Toca para la siguiente pregunta') : T('Tap to close', 'Toca para cerrar'); };
    o.addEventListener('click', (e) => { if (e.target === close) return; if (i < questions.length - 1) { i++; show(); } else o.remove(); });
    close.addEventListener('click', () => o.remove());
    o.append(close, n, q, hint); document.body.appendChild(o); show();
  };

  // a printable leader's guide for one episode, or all of them
  G.guide = function (keys) {
    const D = TW.D, X = TW.Discover;
    const parts = [];
    parts.push('<header><p class="kick">' + esc(T('The Way: An Eyewitness Account', 'El Camino: Relato de un testigo')) + '</p><h1>' + esc(T('Leader’s guide', 'Guía para el líder')) + '</h1>');
    parts.push('<p class="ref">' + esc(T('For families and groups. Play an episode together, taking turns to read Scripture aloud, then talk it over with these questions. About 20–30 minutes each.', 'Para familias y grupos. Jueguen un episodio juntos, turnándose para leer la Escritura en voz alta, y luego conversen con estas preguntas. Unos 20–30 minutos cada uno.')) + '</p></header>');
    keys.forEach((k) => {
      const E = D.episodes[k]; if (!E) return;
      parts.push('<section><h2>' + esc(E.num + '. ' + tr(E.title)) + '</h2><p class="ref">' + esc(tr(E.scene)) + (E.parallels ? ' · ' + esc(T('Also: ', 'También: ') + tr(E.parallels)) : '') + '</p>');
      parts.push('<h4>' + esc(T('Read together', 'Lean juntos')) + '</h4><p>' + esc(E.ref) + '</p>');
      if (E.question) parts.push('<h4>' + esc(T('The question this episode raises', 'La pregunta que plantea este episodio')) + '</h4><p class="big">“' + esc(tr(E.question.text)) + '” (' + esc(E.question.ref) + ')</p>');
      if (E.reflect && E.reflect.length) parts.push('<h4>' + esc(T('Talk about it', 'Conversen')) + '</h4><ol>' + E.reflect.map((r) => '<li>' + esc(tr(r)) + '</li>').join('') + '</ol>');
      if (E.conclusions && E.conclusions.length) parts.push('<h4>' + esc(T('Where people land', 'Dónde llega cada uno')) + '</h4><p class="ref">' + esc(T('The report asks players to choose one of these. Ask the group which they chose, and why.', 'El informe pide a los jugadores elegir una de estas. Pregunten al grupo cuál eligieron, y por qué.')) + '</p><ul>' + E.conclusions.map((c) => '<li>' + esc(tr(TW.Role.G(c))) + '</li>').join('') + '</ul>');
      const w = X && X.words && X.words[k];
      if (w) parts.push('<h4>' + esc(T('Word study', 'Estudio de palabras')) + '</h4><p><b>' + esc(w.word) + '</b> <i>' + esc(w.tr) + '</i>: ' + esc(es() ? w.es : w.en) + '</p>');
      const th = X ? X.threads.filter((t) => t.needs.includes(k)) : [];
      if (th.length) parts.push('<h4>' + esc(T('A thread to explore', 'Un hilo para explorar')) + '</h4>' + th.map((t) => '<p><b>' + esc(X.L(t.title)) + '.</b> ' + esc(X.L(t.a)) + ' ' + esc(X.L(t.b)) + '</p>').join(''));
      if (E.notes && E.notes.length) parts.push('<h4>' + esc(T('Background for the leader', 'Trasfondo para el líder')) + '</h4><ul>' + E.notes.map((n) => '<li><b>' + esc(tr(n[0])) + '.</b> ' + esc(tr(n[1])) + '</li>').join('') + '</ul>');
      parts.push('</section>');
    });
    const css = 'body{margin:0;background:#fff;color:#222;font:16px/1.55 Georgia,"Times New Roman",serif}main{max-width:44rem;margin:0 auto;padding:1.6rem 1.2rem 3rem}h1{margin:.2rem 0;font-size:1.8rem}h2{margin:2rem 0 .1rem;padding-top:1rem;border-top:2px solid #b89f74;font-size:1.3rem}h4{margin:.9rem 0 .2rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em;color:#6a5a42}.kick{margin:0;font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#7a6a52}.ref{color:#555;font-style:italic;margin:.1rem 0}.big{font-size:1.15rem}section{break-inside:avoid-page}ol,ul{padding-left:1.3rem}li{margin:.2rem 0}';
    return '<!DOCTYPE html><html lang="' + (es() ? 'es' : 'en') + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + esc(T('Leader’s guide', 'Guía para el líder')) + '</title><style>' + css + '</style></head><body><main>' + parts.join('\n') + '</main></body></html>';
  };
  G.openGuide = function (keys) {
    const html = G.guide(keys);
    try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' })); a.download = (es() ? 'guia-' : 'leader-guide-') + (keys.length === 1 ? keys[0] : 'all') + '.html'; document.body.appendChild(a); a.click(); a.remove(); } catch (e) { /* ignore */ }
    try { const w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); } } catch (e) { /* popup blocked */ }
  };

  // on the study page, in group mode: show the questions to the room, and the leader's guide for this episode
  if (TW.Discover) {
    const study0 = TW.Discover.study;
    TW.Discover.study = function (ep, fresh, b, el, newly) {
      study0(ep, fresh, b, el, newly);
      if (!G.on()) return;
      const E = TW.D.episodes[ep]; if (!E) return;
      const box = el('div', 'disc-thread group-box');
      box.appendChild(el('p', 'disc-kicker', T('Group', 'Grupo')));
      const qs = (E.question ? [tr(E.question.text)] : []).concat((E.reflect || []).map(tr));
      const room = el('button', 'btn primary', T('Show the questions to the room', 'Mostrar las preguntas al grupo')); room.type = 'button';
      room.addEventListener('click', () => G.room(qs));
      const guide = el('button', 'btn small', T('Leader’s guide for this episode', 'Guía para el líder de este episodio')); guide.type = 'button';
      guide.addEventListener('click', () => G.openGuide([ep]));
      box.append(room, guide);
      b.appendChild(box);
    };
  }
  TW.Group = G;
})(window.TW);
