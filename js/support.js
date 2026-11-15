/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — free to play, kept going by gifts. A quiet invitation to give, never in the way of the story:
   a line on the title screen, a section in Settings, and once (after the third episode) a short note on the study page.
   The gift page is TW.ABOUT.donate (js/about.js); with no address there, nothing is shown.
   The store apps show none of it: Apple asks that tips to a developer inside an iPhone app go through its own in-app
   purchase, so a link out could keep the app from being approved. On the web there is no such rule. */
window.TW = window.TW || {};
(function (TW) {
  const S = {};
  const es = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const T = (en, esText) => (es() ? esText : en);
  S.url = () => (TW.ABOUT && TW.ABOUT.donate) || '';
  S.on = () => !!S.url() && !(TW.Native && TW.Native.is());
  const open = () => { const u = S.url(); if (u) window.open(u, '_blank', 'noopener'); };
  const link = (cls, text) => {
    const a = document.createElement('a'); a.className = cls; a.href = S.url(); a.target = '_blank'; a.rel = 'noopener';
    a.textContent = text; return a;
  };

  // under the title's buttons
  S.titleLine = function () {
    const p = document.getElementById('support-line'); if (!p) return;
    p.innerHTML = ''; p.hidden = !S.on();
    if (!S.on()) return;
    p.appendChild(document.createTextNode(T('The Way is free, with no ads. ', 'The Way es gratis y sin anuncios. ')));
    p.appendChild(link('support-link', T('♥ Support it with a gift', '♥ Apóyalo con un donativo')));
  };

  // Settings → Support The Way
  S.settings = function (body, el, section) {
    if (!S.on()) return;
    section(body, T('Support The Way', 'Apoya The Way'));
    body.appendChild(el('p', '', T(
      'The Way is free for everyone, with no ads and nothing to buy. It is made by one person, with recorded voices, music and art that take time and cost money. If it has helped you, your family or your church, a gift keeps it growing.',
      'The Way es gratis para todos, sin anuncios y sin nada que comprar. Lo hace una sola persona, con voces grabadas, música y arte que cuestan tiempo y dinero. Si te ha ayudado a ti, a tu familia o a tu iglesia, un donativo lo mantiene creciendo.')));
    const b = el('button', 'btn small primary support-btn', T('♥ Give a gift', '♥ Hacer un donativo')); b.type = 'button';
    b.addEventListener('click', open);
    body.appendChild(b);
    body.appendChild(el('p', 'fine', T('Giving is never needed to play. Every part of the game stays free.', 'Nunca hace falta donar para jugar. Todo el juego sigue siendo gratis.')));
  };

  // once, on the study page after the third finished episode
  S.studyNote = function (b, el, fresh) {
    const g = TW.game && TW.game.save;
    if (!S.on() || !fresh || !g || g.supportAsked) return;
    if (Object.keys(g.completed || {}).length < 3) return;
    g.supportAsked = Date.now();
    try { (TW.Util || TW.U).store(g); } catch (e) { /* storage unavailable */ }
    const d = el('div', 'support-note');
    d.appendChild(el('p', 'plabel', T('A word from the maker', 'Unas palabras del autor')));
    d.appendChild(el('p', '', T(
      'Thank you for walking The Way this far. The game is free and always will be. If it has been a blessing, you can help keep it going with a gift of any size.',
      'Gracias por recorrer The Way hasta aquí. El juego es gratis y siempre lo será. Si ha sido de bendición, puedes ayudar a que siga adelante con un donativo de cualquier cantidad.')));
    const row = el('div', 'support-row');
    const give = el('button', 'btn small primary', T('♥ Give a gift', '♥ Hacer un donativo')); give.type = 'button';
    give.addEventListener('click', () => { open(); d.remove(); });
    const later = el('button', 'btn small', T('Not now', 'Ahora no')); later.type = 'button';
    later.addEventListener('click', () => d.remove());
    row.appendChild(give); row.appendChild(later); d.appendChild(row);
    d.appendChild(el('p', 'fine', T('You will not be asked again. It is always in Settings.', 'No se te volverá a pedir. Siempre está en Ajustes.')));
    b.appendChild(d);
  };
  TW.Support = S;
})(window.TW);
