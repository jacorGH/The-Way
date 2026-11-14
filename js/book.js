/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — your book: the whole journey as one printable page, in the language the game is set to.
   Everything comes from the player's own save: reports, conclusions, letters, word studies, their own reflections,
   witnesses heard, finds and threads. */
window.TW = window.TW || {};
(function (TW) {
  const es = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const T = (en, esText) => (es() ? esText : en);
  const tr = (x) => (TW.tr && typeof x === 'string' ? TW.tr(x) : x);
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const B = {};
  B.html = function () {
    const g = TW.game, s = g.save, D = TW.D, X = TW.Discover;
    const name = s.name || (TW.Role.is() ? 'Elisheva' : 'Eleazar');
    const parts = [];
    const eps = D.eraOrder.filter((k) => s.completed[k]);
    parts.push('<header><p class="kick">' + esc(T('The Way: An Eyewitness Account', 'El Camino: Relato de un testigo')) + '</p><h1>' + esc(T('The account of ', 'El relato de ') + name) + '</h1>');
    if (X && X.endingLine) parts.push('<p class="sum">' + esc(X.endingLine()) + '</p>');
    parts.push('<p class="date">' + esc(new Date().toLocaleDateString(es() ? 'es' : 'en', { year: 'numeric', month: 'long', day: 'numeric' })) + '</p></header>');
    if (!eps.length) parts.push('<p>' + esc(T('No accounts written yet. Finish an episode and seal your report.', 'Todavía no hay relatos escritos. Termina un episodio y sella tu informe.')) + '</p>');
    let era = null;
    eps.forEach((k) => {
      const E = D.episodes[k], r = (s.reports || {})[k] || {};
      const er = D.eras.find((e) => e.episodes.includes(k));
      if (er && er !== era) { era = er; parts.push('<h2 class="era">' + esc((es() ? 'Era ' : 'Era ') + er.num + '. ' + tr(er.title)) + '</h2>'); }
      parts.push('<section><h3>' + esc(E.num + '. ' + tr(E.title)) + '</h3><p class="ref">' + esc(tr(E.scene)) + '</p>');
      if (r.obs && r.obs.length) parts.push('<h4>' + esc(T('What I saw', 'Lo que vi')) + '</h4><ul>' + r.obs.map((o) => '<li>' + esc(tr(o)) + '</li>').join('') + '</ul>');
      if (s.heart && s.heart[k] !== undefined && E.hearts) parts.push('<p class="heart">' + esc(tr(TW.Role.G(E.hearts[s.heart[k]]))) + '</p>');
      if (r.conclusion) parts.push('<h4>' + esc(T('What I concluded', 'Lo que concluí')) + '</h4><p class="concl">“' + esc(tr(r.conclusion)) + '”' + (r.ordered ? ' <span class="badge">' + esc(T('set in order', 'puesto en orden')) + '</span>' : '') + '</p>');
      const lt = X && X.letter(k);
      if (lt) parts.push('<div class="letter"><p class="kick">' + esc(lt.kicker || (TW.Role.is() ? T('A letter from your uncle', 'Una carta de tu tío') : T('A letter from Nicodemus', 'Una carta de Nicodemo'))) + '</p><p>' + esc(lt.greet) + ',</p><p>' + esc(lt.body) + '</p><p class="sign">' + esc(lt.sign) + '</p></div>');
      const w = X && X.words && X.words[k];
      if (w) parts.push('<p class="word"><b>' + esc(w.word) + '</b> <i>' + esc(w.tr) + '</i>: ' + esc(es() ? w.es : w.en) + '</p>');
      const mine = (s.mine || {})[k] || {};
      const qs = (E.reflect || []).map((q, i) => [q, mine[i]]).filter((x) => x[1] && x[1].trim());
      if (qs.length) parts.push('<h4>' + esc(T('My reflections', 'Mis reflexiones')) + '</h4>' + qs.map((x) => '<p class="q">' + esc(tr(x[0])) + '</p><p class="a">' + esc(x[1]).replace(/\n/g, '<br>') + '</p>').join(''));
      parts.push('</section>');
    });
    const heard = Object.keys(D.testimonies || {}).filter((k) => s.heard && s.heard[k]);
    if (heard.length) parts.push('<h2 class="era">' + esc(T('Witnesses I heard', 'Testigos que escuché')) + '</h2><ul>' + heard.map((k) => '<li>' + esc(tr(D.testimonies[k].witness)) + '</li>').join('') + '</ul>');
    if (X) {
      const th = X.unlockedThreads(), fi = X.unlockedFinds();
      if (th.length) parts.push('<h2 class="era">' + esc(T('Threads between the accounts', 'Hilos entre los relatos')) + '</h2>' + th.map((t) => '<section><h3>' + esc(X.L(t.title)) + '</h3><p>' + esc(X.L(t.a)) + '</p><p>' + esc(X.L(t.b)) + '</p></section>').join(''));
      if (fi.length) parts.push('<h2 class="era">' + esc(T('Finds', 'Hallazgos')) + '</h2>' + fi.map((f) => '<section><h3>' + esc(X.L(f.title)) + '</h3><p>' + esc(X.L(f.text)) + '</p></section>').join(''));
    }
    parts.push('<footer><p>' + esc(T('“These are written, that you may believe that Jesus is the Christ, the Son of God, and that believing you may have life in his name” (John 20:31).', '“Estas se han escrito, para que creáis que Jesús es el Cristo, el Hijo de Dios; y para que creyendo, tengáis vida en su nombre” (Juan 20:31).')) + '</p><p class="small">' + esc(T('Scripture quotations are from the ' + (TW.Bible ? TW.Bible.version().name : 'World English Bible') + '.', 'Las citas bíblicas son de la ' + (TW.Bible ? TW.Bible.version().name : 'World English Bible') + '.')) + '</p></footer>');
    const css = 'body{margin:0;background:#f4ecd8;color:#2a2016;font:17px/1.6 Georgia,"Times New Roman",serif}main{max-width:40rem;margin:0 auto;padding:2rem 1.2rem 3rem}' +
      'h1{font-size:1.9rem;margin:.2rem 0}h2.era{margin:2.4rem 0 .6rem;padding-top:1rem;border-top:2px solid #b89f74;font-size:1.3rem}h3{margin:1.4rem 0 .2rem;font-size:1.12rem}h4{margin:.8rem 0 .2rem;font-size:.95rem;text-transform:uppercase;letter-spacing:.05em;color:#6a5a42}' +
      '.kick{margin:0;font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#7a6a52}.ref,.date,.small{color:#6a5a42;font-style:italic;margin:0}.sum{font-size:1.05rem}.heart{font-style:italic}.concl{font-size:1.05rem}' +
      '.letter{margin:.8rem 0;padding:.7rem .9rem;border:1px solid #d8c8a4;border-radius:6px;background:#fbf6e8;font-style:italic}.letter p{margin:.25rem 0}.sign{text-align:right}' +
      '.word{margin:.6rem 0;padding:.4rem .7rem;border-left:3px solid #4a6a7a}.q{margin:.5rem 0 0;font-style:italic;color:#5a4a32}.a{margin:.1rem 0 .4rem;padding-left:.8rem;border-left:2px solid #b89f74}.badge{font-size:.75rem;padding:.05rem .4rem;border:1px solid #b89f74;border-radius:9px;color:#6a5a42}' +
      'section{break-inside:avoid}footer{margin-top:2.5rem;border-top:1px solid #d8c8a4;padding-top:1rem}@media print{body{background:#fff}main{padding:0}}';
    return '<!DOCTYPE html><html lang="' + (es() ? 'es' : 'en') + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + esc(T('The account of ', 'El relato de ') + name) + '</title><style>' + css + '</style></head><body><main>' + parts.join('\n') + '</main></body></html>';
  };
  B.save = function () {
    const html = B.html();
    const name = (TW.game.save.name || 'account').replace(/[^\w-]+/g, '-');
    // in the store apps, through the share sheet (save to Files, print, send)
    if (TW.Native && TW.Native.is()) { TW.Native.shareFile((es() ? 'relato-' : 'account-') + name + '.html', html, T('The account of ', 'El relato de ') + name); return; }
    try {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
      a.download = (es() ? 'relato-' : 'account-') + name + '.html';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 60000);
    } catch (e) { /* ignore */ }
    try { const w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); } } catch (e) { /* popup blocked */ }
  };
  B.button = function (el, cls) {
    const b = el('button', cls || 'btn', T('Your book: save or print your account', 'Tu libro: guarda o imprime tu relato'));
    b.type = 'button';
    b.addEventListener('click', B.save);
    return b;
  };
  TW.Book = B;
})(window.TW);
