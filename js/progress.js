/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — your place in an episode. Each choice and each goal on the main line of the story is bookmarked, with what
   you chose. Coming back to an episode, you can continue where you left off, start from any earlier moment, or start
   over. The game catches up by replaying the story instantly (turbo, without tapping anyone) with your same choices,
   then hands it back to you at the bookmark. Kept in the save, per episode and narrator. */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene;
  const PR = {};
  let inFree = 0;        // > 0 while a free walk or look-around is waiting: what happens then is a conversation, not the main line
  let rec = null;        // this run's record
  let FF = null;         // catching up: { target: { key, occ }, choices: [...], used: {}, n: 0, cap }
  const es = () => TW.Settings && TW.Settings.get('lang') === 'es';
  const T = (en, esText) => (es() ? esText : en);
  const role = () => (TW.Role && TW.Role.is() ? 'niece' : 'scribe');
  const keyOf = (kind, text) => kind + '|' + JSON.stringify(text).slice(0, 240);
  const store = () => { const s = TW.game.save; s.progress = s.progress || {}; return s.progress; };
  const slot = (ep) => ep + ':' + role();
  const persist = () => { try { (TW.Util || TW.U).store(TW.game.save); } catch (e) { /* ignore */ } };
  const episodeOn = () => { const c = TW.game && TW.game.current; return !!(c && TW.D.episodes[c] && rec && rec.ep === c); };

  function stopFF() {
    if (!FF) return;
    FF = null; TW.TURBO = false; TW.TURBO_TAP = undefined;
    const o = document.getElementById('ff-cover'); if (o) o.remove();
  }
  // a main-line event: bookmark it, or (catching up) decide whether this is where to hand control back
  function mark(kind, text, extra) {
    rec.count[kind + text] = (rec.count[kind + text] || 0) + 1;
    const key = keyOf(kind, text), occ = rec.count[kind + text];
    if (FF) {
      FF.n++;
      if ((FF.target.key === key && FF.target.occ === occ) || FF.n > FF.cap) stopFF();
    }
    if (!FF) {
      const p = store(), sl = p[slot(rec.ep)] || (p[slot(rec.ep)] = { marks: [], choices: [] });
      if (!sl.marks.some((m) => m.key === key && m.occ === occ)) sl.marks.push({ key, occ, kind, text: extra && extra.label ? extra.label : text });
      sl.resume = { key, occ };
      persist();
    }
    return { key, occ };
  }
  const say1 = SC.say, choose1 = SC.choose, prompt1 = SC.prompt;
  SC.choose = function (prompt, options, label) {
    if (!episodeOn() || inFree > 0) return choose1.call(SC, prompt, options, label);
    const m = mark('choose', prompt);
    if (FF) {
      const c = FF.choices.find((x) => x.key === m.key && x.occ === m.occ);
      return Promise.resolve(c ? Math.min(c.i, options.length - 1) : 0);
    }
    return choose1.call(SC, prompt, options, label).then((i) => {
      const sl = store()[slot(rec.ep)];
      if (sl) { sl.choices = sl.choices.filter((x) => !(x.key === m.key && x.occ === m.occ)); sl.choices.push({ key: m.key, occ: m.occ, i }); persist(); }
      return i;
    });
  };
  SC.prompt = function (text, label, mode) {
    if (!episodeOn() || inFree > 0) return prompt1.call(SC, text, label, mode);
    mark('prompt', text, { label: text });
    const free = mode === 'free' || mode === 'observe';
    const p = prompt1.call(SC, text, label, mode);
    if (!free || FF) return p;
    inFree++;
    const done = () => { inFree = Math.max(0, inFree - 1); };
    return Promise.resolve(p).then((v) => { done(); return v; }, (e) => { done(); throw e; });
  };
  // A remembered scene is a place to come back to as well (some episodes, like the Birth of Jesus, are mostly memories).
  // Its bookmark is labeled with the first line spoken in it.
  let labelNext = null;
  PR.memory = function (id, witness) {
    if (!episodeOn() || inFree > 0) return;
    const m = mark('memory', id, { label: witness ? T('As remembered by ', 'Como lo recuerda ') + (TW.tr ? TW.tr(witness) : witness) : id });
    if (!FF) labelNext = m;
  };
  SC.say = function (o) {
    if (labelNext && o && o.text && !FF && rec) {
      const sl = store()[slot(rec.ep)], mk = sl && sl.marks.find((x) => x.key === labelNext.key && x.occ === labelNext.occ);
      if (mk) { mk.text = o.kind === 'scripture' ? (o.ref ? o.ref + ' · ' : '') + o.text : o.text; persist(); }
      labelNext = null;
    }
    return say1.call(SC, o);
  };

  // the report is written: the episode is finished, so there is no place to continue from (the bookmarks stay)
  PR.finished = (ep) => { const sl = store()[slot(ep)]; if (sl) { delete sl.resume; persist(); } };

  // Before an episode starts: offer to continue, start from a moment, or start over. Calls go(ff) with a target or null.
  PR.offer = function (ep, go) {
    rec = { ep, count: {} }; inFree = 0; labelNext = null; stopFF();
    if (TW.TURBO) { go(null); return; }
    const sl = store()[slot(ep)];
    const moments = sl ? sl.marks.filter((m) => m.kind === 'choose' || m.kind === 'prompt' || m.kind === 'memory') : [];
    if (!sl || moments.length < 2) { if (sl) { sl.marks = []; sl.choices = []; delete sl.resume; } go(null); return; }
    const box = document.createElement('div'); box.className = 'resume-sheet'; box.setAttribute('role', 'dialog');
    const card = document.createElement('div'); card.className = 'resume-card';
    const h = document.createElement('h3'); h.textContent = TW.tr ? TW.tr(TW.D.episodes[ep].title) : TW.D.episodes[ep].title;
    card.appendChild(h);
    const btn = (label, cls, fn) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'btn ' + (cls || ''); b.textContent = label; b.addEventListener('click', () => { box.remove(); fn(); }); card.appendChild(b); return b; };
    if (sl.resume) btn(T('Continue where you left off', 'Continuar donde lo dejaste'), 'primary', () => go(sl.resume));
    const fresh = () => { sl.marks = []; sl.choices = []; delete sl.resume; persist(); go(null); };
    const list = document.createElement('details'); list.className = 'resume-list';
    const sum = document.createElement('summary'); sum.textContent = T('Start from a moment…', 'Empezar desde un momento…'); list.appendChild(sum);
    const G = (x) => (TW.Role && TW.Role.G ? TW.Role.G(x) : x);
    moments.forEach((m, i) => {
      if (i === 0) return;
      let t = G(m.text); t = TW.tr ? TW.tr(t) : t;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'resume-moment';
      b.textContent = (t.length > 90 ? t.slice(0, 88) + '…' : t);
      b.addEventListener('click', () => { box.remove(); go({ key: m.key, occ: m.occ }); });
      list.appendChild(b);
    });
    card.appendChild(list);
    btn(T('Start from the beginning', 'Empezar desde el principio'), 'small', fresh);
    box.appendChild(card); document.body.appendChild(box);
  };
  // Catch up to a bookmark: replay instantly with the same choices, behind a cover, then hand control back.
  PR.fastForward = function (ep, target) {
    if (!target) return;
    const sl = store()[slot(ep)];
    const idx = sl.marks.findIndex((m) => m.key === target.key && m.occ === target.occ);
    FF = { target, choices: (sl.choices || []).slice(), n: 0, cap: Math.max(20, idx + 30) };
    TW.TURBO = true; TW.TURBO_TAP = false;
    if (SC.turboReset) SC.turboReset();
    const c = document.createElement('div'); c.id = 'ff-cover'; c.className = 'ff-cover';
    c.textContent = T('Returning to your place…', 'Volviendo a donde estabas…');
    document.body.appendChild(c);
    // never leave the cover up: if the target is somehow not reached, hand control back anyway
    setTimeout(() => { if (FF) stopFF(); }, 12000);
  };
  PR.active = () => !!FF;
  TW.Progress = PR;
})(window.TW);
