/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — free to play, kept going by gifts. A quiet invitation to give, never in the way of the story:
   a line on the title screen, a section in Settings, and once (after the third episode) a short note on the study page.
   · On the web, the gift goes through TW.ABOUT.donate (js/about.js), your giving page. Empty: nothing is shown.
   · In the store apps, Apple and Google require tips to go through their own in-app purchase, so the same places open a
     tip jar instead: four optional tips (TW.ABOUT.tips, consumable products in App Store Connect and Google Play).
     Until those products exist in the stores, the apps show nothing. A tip unlocks nothing; every part stays free. */
window.TW = window.TW || {};
(function (TW) {
  const S = {};
  const es = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const T = (en, esText) => (es() ? esText : en);
  const native = () => !!(TW.Native && TW.Native.is());
  const save = () => (TW.game && TW.game.save) || {};
  const persist = () => { try { (TW.Util || TW.U).store(TW.game.save); } catch (e) { /* storage unavailable */ } };
  S.products = [];
  S.url = () => (TW.ABOUT && TW.ABOUT.donate) || '';
  S.mode = () => (native() ? (S.products.length ? 'tips' : '') : (S.url() ? 'web' : ''));
  S.on = () => !!S.mode();
  S.supporter = () => (save().tips || 0) > 0;
  const kofi = () => /(^|\.)ko-fi\.com$/i.test((() => { try { return new URL(S.url()).hostname; } catch (e) { return ''; } })());
  const giveLabel = () => (S.mode() === 'tips' ? T('♥ Leave a tip', '♥ Dejar una propina') : kofi() ? T('♥ Support on Ko-fi', '♥ Apoyar en Ko-fi') : T('♥ Give a gift', '♥ Hacer un donativo'));

  // the tips, named for gifts along the road
  const NAMES = {
    tip1: ['A cup of cold water', 'Un vaso de agua fría'],
    tip3: ['Bread for the road', 'Pan para el camino'],
    tip5: ['Oil for the lamp', 'Aceite para la lámpara'],
    tip10: ['A gift for the journey', 'Un regalo para el camino'],
  };
  const nameOf = (id) => { const k = String(id).split('.').pop(); const n = NAMES[k]; return n ? T(n[0], n[1]) : T('A tip', 'Una propina'); };

  // the apps ask the store which tips exist (and their prices in the player's currency), then show the invitation
  S.init = async function () {
    if (!native() || !TW.Native.tips) return;
    const ids = TW.ABOUT && Array.isArray(TW.ABOUT.tips) ? TW.ABOUT.tips : [];
    S.products = await TW.Native.tips(ids);
    S.titleLine();
  };

  const give = () => { if (S.mode() === 'tips') S.jar(); else if (S.url()) window.open(S.url(), '_blank', 'noopener'); };

  // under the title's buttons
  S.titleLine = function () {
    const p = document.getElementById('support-line'); if (!p) return;
    p.innerHTML = ''; p.hidden = !S.on();
    if (!S.on()) return;
    const a = document.createElement('a'); a.className = 'support-link'; a.href = S.mode() === 'web' ? S.url() : '#';
    if (S.mode() === 'web') { a.target = '_blank'; a.rel = 'noopener'; }
    a.addEventListener('click', (e) => { if (S.mode() === 'tips') { e.preventDefault(); S.jar(); } });
    if (S.supporter()) {
      p.appendChild(document.createTextNode(T('Thank you for supporting The Way. ', 'Gracias por apoyar The Way. ')));
      a.textContent = T('♥ Give again', '♥ Dar otra vez');
    } else {
      p.appendChild(document.createTextNode(T('The Way is free, with no ads. ', 'The Way es gratis y sin anuncios. ')));
      a.textContent = S.mode() === 'tips' ? T('♥ Leave a tip', '♥ Deja una propina') : kofi() ? T('♥ Buy it a coffee on Ko-fi', '♥ Invítale un café en Ko-fi') : T('♥ Support it with a gift', '♥ Apóyalo con un donativo');
    }
    p.appendChild(a);
  };

  // Settings → Support The Way
  S.settings = function (body, el, section) {
    if (!S.on()) return;
    section(body, T('Support The Way', 'Apoya The Way'));
    body.appendChild(el('p', '', T(
      'The Way is free for everyone, with no ads and nothing to buy. It is made by one person, with recorded voices, music and art that take time and cost money. If it has helped you, your family or your church, a gift keeps it growing.',
      'The Way es gratis para todos, sin anuncios y sin nada que comprar. Lo hace una sola persona, con voces grabadas, música y arte que cuestan tiempo y dinero. Si te ha ayudado a ti, a tu familia o a tu iglesia, un donativo lo mantiene creciendo.')));
    const b = el('button', 'btn small primary support-btn', giveLabel()); b.type = 'button';
    b.addEventListener('click', give);
    body.appendChild(b);
    if (S.supporter()) body.appendChild(el('p', 'fine', T('You have supported The Way. Thank you!', 'Has apoyado The Way. ¡Gracias!')));
    body.appendChild(el('p', 'fine', T('Giving is never needed to play. Every part of the game stays free.', 'Nunca hace falta donar para jugar. Todo el juego sigue siendo gratis.')));
  };

  // once, on the study page after the third finished episode
  S.studyNote = function (b, el, fresh) {
    const g = save();
    if (!S.on() || !fresh || g.supportAsked || S.supporter()) return;
    if (Object.keys(g.completed || {}).length < 3) return;
    g.supportAsked = Date.now(); persist();
    const d = el('div', 'support-note');
    d.appendChild(el('p', 'plabel', T('A word from the maker', 'Unas palabras del autor')));
    d.appendChild(el('p', '', T(
      'Thank you for walking The Way this far. The game is free and always will be. If it has been a blessing, you can help keep it going with a gift of any size.',
      'Gracias por recorrer The Way hasta aquí. El juego es gratis y siempre lo será. Si ha sido de bendición, puedes ayudar a que siga adelante con un donativo de cualquier cantidad.')));
    const row = el('div', 'support-row');
    const g1 = el('button', 'btn small primary', giveLabel()); g1.type = 'button';
    g1.addEventListener('click', () => { give(); d.remove(); });
    const later = el('button', 'btn small', T('Not now', 'Ahora no')); later.type = 'button';
    later.addEventListener('click', () => d.remove());
    row.appendChild(g1); row.appendChild(later); d.appendChild(row);
    d.appendChild(el('p', 'fine', T('You will not be asked again. It is always in Settings.', 'No se te volverá a pedir. Siempre está en Ajustes.')));
    b.appendChild(d);
  };

  // ---------- the tip jar (store apps) ----------
  const mk = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  S.jar = function () {
    if (!S.products.length) return;
    const ov = mk('div', 'tip-jar'); ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', T('Leave a tip', 'Dejar una propina'));
    const card = mk('div', 'tip-card'); ov.appendChild(card);
    const close = () => ov.remove();
    ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
    const choose = () => {
      card.innerHTML = '';
      const head = mk('div', 'tip-head');
      head.appendChild(mk('h3', '', T('Support The Way', 'Apoya The Way')));
      const x = mk('button', 'btn-text', T('Close', 'Cerrar')); x.type = 'button'; x.addEventListener('click', close); head.appendChild(x);
      card.appendChild(head);
      card.appendChild(mk('p', 'tip-lead', T('The Way is free, and always will be. If you would like to help it grow, leave a tip.', 'The Way es gratis, y siempre lo será. Si quieres ayudar a que crezca, deja una propina.')));
      const list = mk('div', 'tip-list');
      S.products.forEach((p) => {
        const b = mk('button', 'tip-btn'); b.type = 'button';
        b.appendChild(mk('span', 'tip-name', nameOf(p.id)));
        b.appendChild(mk('span', 'tip-price', p.price));
        b.addEventListener('click', async () => {
          list.querySelectorAll('button').forEach((y) => { y.disabled = true; });
          b.classList.add('busy');
          const ok = await TW.Native.tip(p.id);
          if (ok) thanks(); else { list.querySelectorAll('button').forEach((y) => { y.disabled = false; }); b.classList.remove('busy'); }
        });
        list.appendChild(b);
      });
      card.appendChild(list);
      card.appendChild(mk('p', 'fine tip-fine', T('A tip is a gift: it unlocks nothing, and every part of the game stays free. Payment is handled by ', 'Una propina es un regalo: no desbloquea nada, y todo el juego sigue siendo gratis. El pago lo gestiona ') + (TW.Native.platform() === 'ios' ? 'Apple.' : 'Google Play.')));
    };
    const thanks = () => {
      const g = save(); g.tips = (g.tips || 0) + 1; g.tipAt = Date.now(); persist();
      TW.Audio && TW.Audio.sfx('joy'); TW.Native && TW.Native.haptic('firm');
      card.innerHTML = '';
      card.appendChild(mk('h3', 'tip-thanks', T('Thank you! ♥', '¡Gracias! ♥')));
      card.appendChild(mk('p', '', T('Your gift helps more people walk The Way, in more languages, with more of the story told.', 'Tu regalo ayuda a que más personas recorran The Way, en más idiomas y con más de la historia contada.')));
      card.appendChild(mk('blockquote', 'verse-text', T('“God loves a cheerful giver.” (2 Corinthians 9:7)', '“Dios ama al dador alegre.” (2 Corintios 9:7)')));
      const d = mk('button', 'btn small primary', T('Back to the journey', 'Volver al camino')); d.type = 'button';
      d.addEventListener('click', close); card.appendChild(d);
      S.titleLine();
    };
    choose();
    document.body.appendChild(ov);
  };

  TW.Support = S;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => S.init()); else setTimeout(() => S.init(), 0);
})(window.TW);
