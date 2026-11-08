/* The Way — game controller */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, D = TW.D, SC = TW.Scene, MV = TW.MapView;
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };

  const game = { save: U.load(), screen: null, era: 'galilee' };
  const AU = TW.Audio;
  // sound: unlocked by the first tap anywhere (browsers require a gesture)
  document.addEventListener('pointerdown', () => AU.unlock(), { passive: true });
  function syncSound() {
    document.querySelectorAll('.sound-toggle').forEach((b) => {
      b.textContent = AU.on ? 'Sound on' : 'Sound off';
      b.setAttribute('aria-pressed', AU.on);
    });
  }
  document.querySelectorAll('.sound-toggle').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    AU.setOn(!AU.on);
    syncSound();
  }));
  syncSound();
  const REGION_SOUND = {
    galilee: { music: 'galilee', amb: { wind: 0.45, birds: 0.55, shore: 0.25 } },
    land: { music: 'land', amb: { wind: 0.7, birds: 0.25 } },
    jerusalem: { music: 'jerusalem', amb: { wind: 0.4, birds: 0.3, crowd: 0.2 } },
  };
  TW.game = game;
  const persist = () => U.store(game.save);

  // ---------- screens ----------
  const screens = ['title', 'prologue', 'timeline', 'map', 'scene'];
  game.show = function (name) {
    if (game.screen === 'map' && name !== 'map') MV.stop();
    if (game.screen === 'scene' && name !== 'scene') { SC.stop(); SC.begin(); }
    if (game.screen === 'title' && name !== 'title') titleRunning = false;
    screens.forEach((s) => $('#s-' + s).classList.toggle('active', s === name));
    closeOverlays();
    game.screen = name;
    if (name === 'title' || name === 'prologue' || name === 'timeline') AU.scene({ music: 'title', amb: { wind: 0.45, shore: name === 'title' ? 0.35 : 0 } });
    if (name === 'title') showTitle();
    if (name === 'prologue') renderPrologue();
    if (name === 'timeline') renderTimeline();
    if (name === 'map') showMap();
  };

  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) { game.show(go.dataset.go); return; }
    const op = e.target.closest('[data-open]');
    if (op) { openJournal('obs'); return; }
    const cl = e.target.closest('[data-close]');
    if (cl) closeOverlays();
  });

  // ---------- title ----------
  let titleRunning = false;
  function showTitle() {
    const s = game.save;
    $('#name-input').value = s.name || 'Eleazar';
    $('#btn-continue').hidden = !s.started;
    $('#btn-begin').classList.toggle('primary', !s.started);
    const c = $('#title-vista'), ctx = c.getContext('2d');
    titleRunning = true;
    const t0 = performance.now();
    const loop = (now) => {
      if (!titleRunning) return;
      TW.Episodes.capernaum.vista(ctx, (now - t0) / 1000);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
  const readName = () => ($('#name-input').value.trim() || 'Eleazar').slice(0, 20);
  let armed = null;
  $('#btn-begin').addEventListener('click', () => {
    const btn = $('#btn-begin');
    if (game.save.started && !armed) {
      // confirm in place: dialogs can be blocked inside embedded pages
      btn.textContent = 'Tap again to clear your scroll and start over';
      armed = setTimeout(() => { armed = null; btn.textContent = 'Begin the journey'; }, 4000);
      return;
    }
    clearTimeout(armed); armed = null;
    btn.textContent = 'Begin the journey';
    game.save = U.defaultSave();
    game.save.name = readName();
    game.save.started = true;
    game.region = 'galilee';
    persist();
    game.show('prologue');
  });
  $('#btn-continue').addEventListener('click', () => {
    game.save.name = readName();
    persist();
    game.show('timeline');
  });

  // ---------- prologue ----------
  function block(kind, label, text, cls) {
    const wrap = el('div', 'pblock kind-' + kind);
    wrap.appendChild(el('p', 'plabel', label));
    wrap.appendChild(el('p', cls || '', text));
    return wrap;
  }
  function renderPrologue() {
    const b = $('#prologue-body');
    b.innerHTML = '';
    const n = game.save.name;
    b.appendChild(block('drama', 'Dramatization', 'Jerusalem, in the reign of Tiberius Caesar. You are ' + n + ', a young scribe trained in the Law of Moses. Word has come south of a teacher in Galilee who heals the sick and casts out unclean spirits. People say something about him that unsettles the teachers of Jerusalem.'));
    b.appendChild(block('scripture', 'Scripture, Mark 1:22', 'They were astonished at his teaching, for he taught them as having authority, and not as the scribes.', 'verse'));
    b.appendChild(block('history', 'History', 'Nicodemus was a Pharisee and a ruler of the Jews (John 3:1). Mark records scribes coming down from Jerusalem to observe Jesus (Mark 3:22).'));
    b.appendChild(block('drama', 'Dramatization', 'Nicodemus sends you north with other teachers of the Law. “Watch him closely,” he says. “Write down what you see. Only what you see.”'));
  }
  $('#btn-prologue').addEventListener('click', () => game.show('timeline'));

  // ---------- timeline ----------
  // Piecewise scale: the Gospel years are short but dense, so they get more room.
  const yearPct = (y) => (y <= 36 ? ((y - 26) / 10) * 40 : 40 + ((y - 36) / 64) * 60);
  function renderTimeline() {
    const bar = $('#tl-bar');
    bar.innerHTML = '';
    [28, 30, 33, 36, 50, 64, 70, 95].forEach((y, i) => {
      const t = el('span', 'tl-tick', (i === 0 ? 'AD ' : '') + y);
      t.style.left = yearPct(y) + '%';
      bar.appendChild(t);
    });
    const brk = el('span', 'tl-break');
    brk.style.left = yearPct(36) + 2 + '%';
    brk.title = 'The scale widens after AD 36';
    bar.appendChild(brk);
    D.eras.forEach((e) => {
      const s = el('button', 'tl-era' + (e.open ? ' open' : '') + (game.era === e.id ? ' sel' : ''), e.num);
      s.style.left = yearPct(e.span[0]) + '%';
      s.style.width = Math.max(yearPct(e.span[1]) - yearPct(e.span[0]), 3.2) + '%';
      s.setAttribute('aria-label', 'Era ' + e.num + ', ' + e.title);
      s.addEventListener('click', () => { game.era = e.id; renderTimeline(); });
      bar.appendChild(s);
    });
    D.events.forEach((ev, i) => {
      const d = el('button', 'tl-event');
      d.style.left = yearPct(ev.year) + '%';
      d.setAttribute('aria-label', ev.label);
      d.addEventListener('click', () => setCaption(i));
      bar.appendChild(d);
    });
    setCaption(game.capIdx || 0);

    const list = $('#eras');
    list.innerHTML = '';
    D.eras.forEach((e) => {
      const li = el('li');
      const b = el('button', 'era-card' + (e.open ? ' open' : '') + (game.era === e.id ? ' sel' : ''));
      b.appendChild(el('span', 'era-num', e.num));
      b.appendChild(el('span', 'era-name', e.title));
      b.appendChild(el('span', 'era-dates', e.dates));
      b.addEventListener('click', () => { game.era = e.id; renderTimeline(); });
      li.appendChild(b);
      list.appendChild(li);
    });
    const selCard = list.querySelector('.sel');
    selCard && selCard.scrollIntoView({ block: 'nearest', inline: 'center' });

    const era = D.eras.find((e) => e.id === game.era);
    const det = $('#era-detail');
    det.innerHTML = '';
    det.appendChild(el('h3', 'era-title', era.title));
    det.appendChild(el('p', 'era-meta', era.dates + '. You play as ' + era.view.toLowerCase() + '.'));
    det.appendChild(el('p', 'era-summary', era.summary));
    const dl = el('dl', 'world');
    era.world.forEach((w) => { dl.appendChild(el('dt', '', w[0])); dl.appendChild(el('dd', '', w[1])); });
    det.appendChild(dl);
    if (era.id === 'galilee' && eraDone(era)) det.appendChild(el('p', 'era-done', 'You have finished this era. Era II, The Road to Jerusalem, comes next.'));
    if (era.id === 'passion' && eraDone(era)) det.appendChild(el('p', 'era-done', 'You have finished this era. Era III, The Jerusalem Church, comes next.'));
    if (era.id === 'church') det.appendChild(el('p', 'era-done', 'Still being built: The Seven and Stephen.'));
    const ol = el('ol', 'episodes');
    const next = nextEpisode();
    era.episodes.forEach((raw) => {
      const ep = typeof raw === 'string' ? Object.assign({ id: raw, open: true }, D.episodes[raw]) : raw;
      const li = el('li', 'episode' + (ep.open ? ' open' : ''));
      const txt = el('div', 'ep-text');
      txt.appendChild(el('span', 'ep-title', ep.title));
      txt.appendChild(el('span', 'ep-ref', ep.ref + (ep.open ? ', ' + placeName(ep.place) : '')));
      li.appendChild(txt);
      if (ep.open) {
        const done = game.save.completed[ep.id];
        const b = el('button', 'btn small' + (ep.id === next ? ' primary' : ''), done ? 'Replay' : ep.id === next ? 'Play' : 'Open');
        b.addEventListener('click', () => { game.goToPlace(ep.region || 'galilee', ep.place); });
        li.appendChild(b);
        if (done) li.appendChild(el('span', 'ep-done', 'Completed'));
      } else {
        li.appendChild(el('span', 'ep-later', 'Coming later'));
      }
      ol.appendChild(li);
    });
    det.appendChild(ol);
    const ts = Object.keys(D.testimonies || {}).filter((k) => D.testimonies[k].era === era.id);
    if (ts.length) {
      det.appendChild(el('h4', 'era-sub', 'Eyewitnesses to seek out'));
      const ul = el('ul', 'witness-list');
      ts.forEach((k) => {
        const T = D.testimonies[k];
        const pl = D.regions[T.region].places.find((p) => p.id === T.place);
        const li = el('li', game.save.heard[k] ? 'heard' : '');
        li.appendChild(el('span', 'ep-title', T.witness));
        li.appendChild(el('span', 'ep-ref', (pl ? pl.short || pl.name : '') + ', ' + (game.save.heard[k] ? 'heard' : tOpen(k) ? 'waiting for you' : 'after ' + D.episodes[T.after].title)));
        li.addEventListener('click', () => { if (tOpen(k)) game.goToPlace(T.region, T.place); });
        ul.appendChild(li);
      });
      det.appendChild(ul);
    }
  }
  function setCaption(i) {
    game.capIdx = i;
    const ev = D.events[i];
    $('#tl-caption').textContent = (ev.approx ? 'c. ' : '') + 'AD ' + ev.year + ': ' + ev.label;
    document.querySelectorAll('.tl-event').forEach((d, j) => d.classList.toggle('sel', j === i));
  }

  // ---------- progress ----------
  const placeName = (id) => {
    for (const k in D.regions) { const p = D.regions[k].places.find((x) => x.id === id && x.kind === 'episode'); if (p) return p.name; }
    return id;
  };
  function nextEpisode() { return D.eraOrder.find((id) => !game.save.completed[id]) || null; }
  function eraDone(era) { return era.episodes.every((id) => typeof id !== 'string' || game.save.completed[id]); }
  function revealedSet() {
    const s = new Set();
    D.regions.land.places.forEach((p) => { if (p.reveal === 'start' || game.save.completed[p.reveal]) s.add(p.id); });
    return s;
  }
  game.revealedSet = revealedSet;

  // ---------- map ----------
  game.region = game.save.region || 'galilee';
  function showMap() {
    MV.init($('#map-canvas'));
    hideCard();
    const R = D.regions[game.region];
    AU.scene(REGION_SOUND[game.region]);
    $('#map-title').textContent = R.title + ', ' + R.subtitle;
    document.querySelectorAll('.region-switch button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.region === game.region));
    $('#map-hint').hidden = false;
    $('#map-hint').textContent = game.region === 'land'
      ? 'Blank parchment marks lands you have not heard of yet.'
      : game.region === 'jerusalem' ? 'Your home city at Passover. Tap a place.' : 'Tap a place. Drag to look around.';
    clearTimeout(game.hintTimer);
    game.hintTimer = setTimeout(() => { $('#map-hint').hidden = true; }, 5000);
    MV.start({
      region: game.region,
      node: game.region === 'land' ? game.save.landNode : game.region === 'jerusalem' ? game.save.jerNode : game.save.mapNode,
      revealed: revealedSet(),
      onPlace: (id, arrived) => game.previewPlace(id, arrived),
      onBox: () => game.switchRegion('galilee'),
      status: placeStatus,
      badge: (pl) => game.badge(game.region, pl),
    });
    if (game.pendingPlace) { const p = game.pendingPlace; game.pendingPlace = null; MV.focus(p); game.previewPlace(p); }
  }
  game.switchRegion = function (id, place) {
    if (id === game.region && game.screen === 'map') { if (place) game.previewPlace(place); return; }
    // keep the traveller in the same spot when both maps share it
    if (id === game.region || id === 'jerusalem') { /* nothing to sync */ } else if (id === 'land') {
      const n = game.region === 'jerusalem' ? 'jerusalem' : D.sameNode[game.save.mapNode];
      if (n) game.save.landNode = n;
    } else {
      const back = Object.keys(D.sameNode).find((k) => D.sameNode[k] === game.save.landNode);
      if (back) game.save.mapNode = back;
    }
    game.region = id; game.save.region = id; persist();
    game.pendingPlace = place || null;
    if (game.screen === 'map') showMap(); else game.show('map');
  };
  game.goToPlace = (region, place) => game.switchRegion(region, place);
  document.querySelectorAll('.region-switch button').forEach((b) =>
    b.addEventListener('click', () => game.switchRegion(b.dataset.region)));

  game.setMapNode = (region, id) => {
    if (region === 'land') game.save.landNode = id; else if (region === 'jerusalem') game.save.jerNode = id; else game.save.mapNode = id;
    persist();
  };
  function placeStatus(pl) {
    if (!pl.episodes) return null;
    const next = nextEpisode();
    if (pl.episodes.includes(next)) return 'next';
    if (pl.episodes.every((e) => game.save.completed[e])) return 'done';
    return 'open';
  }

  const KINDS = { episode: 'Episodes', locked: 'A later episode', history: 'Historical background', zoom: 'Closer view' };
  game.previewPlace = function (id, arrived) {
    const R = D.regions[game.region];
    const pl = R.places.find((p) => p.id === id);
    if (!pl) return;
    $('#map-hint').hidden = true;
    MV.selected = id;
    const here = MV.node === id && !MV.moving;
    $('#card-kind').textContent = pl.kind === 'episode' && pl.episodes.length === 1 ? 'Episode' : KINDS[pl.kind];
    $('#card-name').textContent = pl.name;
    $('#card-alt').textContent = pl.alt || '';
    $('#card-text').textContent = pl.text;
    $('#card-ref').textContent = pl.ref || '';
    $('#card-ref').hidden = !pl.ref;
    const act = $('#card-actions');
    act.innerHTML = '';
    act.className = 'sheet-actions';
    if (pl.kind === 'episode') {
      act.className = 'sheet-episodes';
      const next = nextEpisode();
      pl.episodes.forEach((eid) => {
        const ep = D.episodes[eid];
        const row = el('div', 'ep-row');
        const t = el('div', 'ep-text');
        t.appendChild(el('span', 'ep-title', ep.num + '. ' + ep.title));
        t.appendChild(el('span', 'ep-ref', ep.ref + (game.save.completed[eid] ? ', completed' : '')));
        row.appendChild(t);
        if (here) {
          const done = game.save.completed[eid];
          const b = el('button', 'btn small' + (eid === next ? ' primary' : ''), done ? 'Replay' : 'Enter');
          b.addEventListener('click', () => enterEpisode(eid));
          row.appendChild(b);
          if (done) {
            const s2 = el('button', 'btn small', 'Study');
            s2.addEventListener('click', () => openStudy(eid));
            row.appendChild(s2);
          }
        }
        act.appendChild(row);
      });
      if (!here) act.appendChild(travelBtn(pl, true));
    } else if (pl.kind === 'zoom') {
      const Z = D.regions[pl.zoom];
      const b = el('button', 'btn primary', 'Open the ' + Z.title + ' map');
      b.addEventListener('click', () => game.switchRegion(pl.zoom, Z.places.some((p) => p.id === id) ? id : null));
      act.appendChild(b);
    } else if (!here) {
      act.appendChild(travelBtn(pl, false));
    } else if (arrived) {
      act.appendChild(el('p', 'sheet-note', pl.kind === 'locked' ? 'This story comes in a later episode.' : 'You have arrived.'));
    }
    const tl = testimoniesAt(game.region, pl.id);
    if (tl.length) {
      const box = el('div', 'sheet-episodes sheet-testimonies');
      box.appendChild(el('p', 'sheet-kind', 'People to talk to here'));
      tl.forEach((k) => {
        const T = D.testimonies[k];
        const row = el('div', 'ep-row');
        const t = el('div', 'ep-text');
        t.appendChild(el('span', 'ep-title', T.witness));
        const after = T.after && D.episodes[T.after];
        const status = !tOpen(k) ? 'after ' + after.num + '. ' + after.title : game.save.heard[k] ? 'heard' : T.later ? 'told after Pentecost' : 'not yet heard';
        t.appendChild(el('span', 'ep-ref', status));
        row.appendChild(t);
        if (here && tOpen(k)) {
          const b = el('button', 'btn small' + (game.save.heard[k] ? '' : ' primary'), game.save.heard[k] ? 'Again' : 'Listen');
          b.addEventListener('click', () => game.enterTestimony(k));
          row.appendChild(b);
        }
        box.appendChild(row);
      });
      act.appendChild(box);
      if (!here && pl.kind !== 'episode' && !act.querySelector('.btn')) act.appendChild(travelBtn(pl, true));
    }
    $('#place-card').hidden = false;
  };
  function travelBtn(pl, primary) {
    const b = el('button', 'btn' + (primary ? ' primary' : ''), 'Travel to ' + (pl.short || pl.name));
    b.addEventListener('click', () => { hideCard(); MV.travelTo(pl.id); });
    return b;
  }
  function hideCard() { $('#place-card').hidden = true; MV.selected = null; }
  $('#card-close').addEventListener('click', hideCard);

  // ---------- testimonies ----------
  const testimoniesAt = (region, place) => Object.keys(D.testimonies || {}).filter((k) => {
    const T = D.testimonies[k];
    return T.region === region && T.place === place;
  });
  const tOpen = (k) => { const T = D.testimonies[k]; return !T.after || !!game.save.completed[T.after]; };
  game.badge = (region, pl) => {
    const list = testimoniesAt(region, pl.id).filter(tOpen);
    if (!list.length) return null;
    return list.some((k) => !game.save.heard[k]) ? 'new' : 'heard';
  };
  game.hear = (id, n) => { game.save.heard[id] = Math.max(game.save.heard[id] || 0, n || 1); persist(); };
  game.enterTestimony = function (id) {
    const T = D.testimonies[id];
    game.show('scene');
    game.current = 't:' + id;
    $('#scene-title').textContent = 'Testimony: ' + T.title;
    SC.init(sceneEls);
    SC.begin();
    SC.start();
    TW.Testimony.run(game, id);
  };
  const epTitle = (k) => (k.startsWith('t:') ? 'Testimony: ' + D.testimonies[k.slice(2)].title : D.episodes[k].title);

  // ---------- episodes ----------
  const sceneEls = {
    pix: $('#scene-pix'), fx: $('#scene-fx'), dialog: $('#dialog'), label: $('#dlg-label'),
    speaker: $('#dlg-speaker'), text: $('#dlg-text'), choices: $('#dlg-choices'), next: $('#dlg-next'),
    toast: $('#toast'), veil: $('#veil'), stage: $('#stage'), memchip: $('#memchip'),
  };
  function enterEpisode(id) {
    const ep = TW.Episodes[id];
    if (!ep) return;
    game.show('scene');
    game.current = id;
    $('#scene-title').textContent = D.episodes[id].scene;
    SC.init(sceneEls);
    SC.begin();
    SC.start();
    ep.run(game);
  }
  game.enterEpisode = enterEpisode;
  $('#btn-leave').addEventListener('click', () => game.show('map'));

  game.observe = function (ep, id, text, showText, auto) {
    const list = (game.save.obs[ep] = game.save.obs[ep] || []);
    if (list.find((o) => o.id === id)) return;
    list.push({ id, text, auto: !!auto });
    persist();
    if (!auto) SC.toast(showText ? text : 'Added to your scroll');
  };
  game.addQuestion = function (q) {
    if (game.save.questions.find((x) => x.id === q.id)) return;
    game.save.questions.push(Object.assign({ open: true }, q));
    persist();
  };
  game.setHeart = function (ep, i) { game.save.heart[ep] = i; persist(); };
  // an open question in the scroll receives its answer
  game.answer = function (id, text, ref) {
    const q = game.save.questions.find((x) => x.id === id);
    if (!q || !q.open) return null;
    q.open = false; q.answer = text; q.answerRef = ref;
    persist();
    return q;
  };

  // ---------- overlays ----------
  function closeOverlays() { document.querySelectorAll('.overlay').forEach((o) => { o.hidden = true; }); }
  function openOverlay(id) {
    closeOverlays();
    const o = $(id);
    o.hidden = false;
    o.scrollTop = 0;
    const s = o.querySelector('.scroll');
    s && (s.scrollTop = 0);
  }

  function openJournal(tab) {
    openOverlay('#o-journal');
    renderJournal(tab);
  }
  document.querySelectorAll('#o-journal [data-tab]').forEach((b) =>
    b.addEventListener('click', () => renderJournal(b.dataset.tab)));
  function renderJournal(tab) {
    document.querySelectorAll('#o-journal [data-tab]').forEach((b) => b.setAttribute('aria-selected', b.dataset.tab === tab));
    const body = $('#journal-body');
    body.innerHTML = '';
    const s = game.save;
    if (tab === 'obs') {
      const eps = D.eraOrder.filter((id) => (s.obs[id] || []).length).concat(Object.keys(s.obs).filter((k) => k.startsWith('t:') && s.obs[k].length));
      if (!eps.length) { body.appendChild(el('p', 'empty', 'Nothing written yet. In each place, tap people and things to note what you see.')); return; }
      eps.forEach((id) => {
        body.appendChild(el('h3', '', epTitle(id)));
        const ul = el('ul', 'notes');
        s.obs[id].forEach((o) => ul.appendChild(el('li', '', o.text)));
        body.appendChild(ul);
      });
    } else if (tab === 'testimonies') {
      const all = Object.keys(D.testimonies);
      const heard = all.filter((k) => s.heard[k]);
      body.appendChild(el('p', 'empty', 'Heard ' + heard.length + ' of ' + all.length + ' testimonies so far. Look for people to talk to on the maps.'));
      heard.forEach((k) => {
        const T = D.testimonies[k];
        body.appendChild(el('h3', '', T.witness));
        const ul = el('ul', 'notes');
        (s.obs['t:' + k] || []).forEach((o) => ul.appendChild(el('li', '', o.text)));
        body.appendChild(ul);
      });
    } else if (tab === 'questions') {
      if (!s.questions.length) { body.appendChild(el('p', 'empty', 'No open questions yet. Questions raised by what you witness are kept here until Scripture answers them later in your journey.')); return; }
      const ul = el('ul', 'questions');
      s.questions.forEach((q) => {
        const li = el('li', q.open ? 'open' : 'answered');
        li.appendChild(el('span', 'q-text', q.text));
        li.appendChild(el('span', 'q-ref', q.ref + (q.open ? ', still open' : ', answered')));
        if (!q.open && q.answer) li.appendChild(el('span', 'q-answer', q.answer + ' (' + q.answerRef + ')'));
        ul.appendChild(li);
      });
      body.appendChild(ul);
    } else {
      const eps = D.eraOrder.filter((id) => s.reports[id]);
      if (!eps.length) { body.appendChild(el('p', 'empty', 'No reports sealed yet. Finish an episode to write one.')); return; }
      eps.forEach((id) => {
        const E = D.episodes[id], r = s.reports[id];
        body.appendChild(el('h3', '', E.num + '. ' + E.title));
        if (s.heart[id] !== undefined) body.appendChild(el('p', 'heart', E.hearts[s.heart[id]]));
        const ul = el('ul', 'notes');
        r.obs.forEach((t) => ul.appendChild(el('li', '', t)));
        body.appendChild(ul);
        body.appendChild(el('p', 'conclusion', '“' + r.conclusion + '”'));
        const b = el('button', 'btn small', 'Study ' + E.ref);
        b.addEventListener('click', () => openStudy(id));
        body.appendChild(b);
      });
    }
  }

  game.openReport = function (ep) {
    const E = D.episodes[ep];
    openOverlay('#o-report');
    $('#report-from').textContent = 'From ' + game.save.name + ', a scribe. ' + E.scene + '.';
    const box = $('#report-obs');
    box.innerHTML = '';
    (game.save.obs[ep] || []).forEach((o, i) => {
      const lab = el('label', 'check');
      const cb = el('input');
      cb.type = 'checkbox'; cb.value = i; cb.checked = !!o.auto;
      lab.appendChild(cb);
      lab.appendChild(el('span', '', o.text));
      box.appendChild(lab);
    });
    const rc = $('#report-conc');
    rc.innerHTML = '';
    const seal = $('#btn-seal');
    seal.disabled = true;
    E.conclusions.forEach((c, i) => {
      const lab = el('label', 'radio');
      const r = el('input');
      r.type = 'radio'; r.name = 'conc'; r.value = i;
      r.addEventListener('change', () => { seal.disabled = false; });
      lab.appendChild(r);
      lab.appendChild(el('span', '', c));
      rc.appendChild(lab);
    });
    seal.onclick = () => {
      const before = revealedSet();
      const all = game.save.obs[ep] || [];
      const picked = [...box.querySelectorAll('input:checked')].map((c) => all[+c.value].text);
      const ci = +rc.querySelector('input:checked').value;
      game.save.reports[ep] = { obs: picked, conclusion: E.conclusions[ci] };
      game.save.completed[ep] = true;
      if (E.endNode) { game.save.mapNode = E.endNode; game.save.region = game.region = 'galilee'; }
      if (E.region === 'jerusalem') { game.save.jerNode = E.place; game.save.region = game.region = 'jerusalem'; }
      persist();
      const after = revealedSet();
      const fresh = [...after].filter((x) => !before.has(x));
      openStudy(ep, fresh);
    };
  };

  function openStudy(ep, fresh) {
    const E = D.episodes[ep];
    openOverlay('#o-study');
    const b = $('#study-body');
    b.innerHTML = '';
    b.appendChild(el('p', 'study-kicker', fresh ? 'Your report is sealed. Now read the passage.' : 'Study'));
    b.appendChild(el('h2', 'scroll-title', E.title));
    b.appendChild(el('p', 'study-ref', E.ref + ', World English Bible. ' + (E.parallels.startsWith('told') ? 'This account is ' + E.parallels + '.' : 'Also told in ' + E.parallels + '.')));
    // one or more passages, each optionally limited to a verse range
    const parts = E.passages || [[E.passage, E.from, E.to]];
    parts.forEach((pt) => {
      const src = TW.P[pt[0]].verses;
      const i = pt[1] ? src.findIndex((v) => v[0] === pt[1]) : 0;
      const j = pt[2] ? src.findIndex((v) => v[0] === pt[2]) : src.length - 1;
      if (parts.length > 1) b.appendChild(el('p', 'study-ref', TW.P.ref ? (TW.P[pt[0]].book ? TW.P.ref(pt[0], src[i][0], src[j][0]) : TW.P[pt[0]].ref) : ''));
      const pass = el('div', 'passage');
      src.slice(i, j + 1).forEach((v) => {
        const s = el('span', 'v');
        s.appendChild(el('sup', '', v[0]));
        s.appendChild(document.createTextNode(v[1] + ' '));
        pass.appendChild(s);
      });
      b.appendChild(pass);
    });
    b.appendChild(el('h3', '', 'Background'));
    E.notes.forEach((n) => {
      const d = el('div', 'note');
      d.appendChild(el('h4', '', n[0]));
      d.appendChild(el('p', '', n[1]));
      b.appendChild(d);
    });
    b.appendChild(el('h3', '', 'For reflection'));
    const ol = el('ol', 'reflect');
    E.reflect.forEach((q) => ol.appendChild(el('li', '', q)));
    b.appendChild(ol);
    const q = game.save.questions.find((x) => x.id === E.question.id);
    if (q) {
      const d = el('div', 'open-q');
      d.appendChild(el('p', 'plabel', 'Still open in your scroll'));
      d.appendChild(el('p', '', '“' + q.text + '” (' + q.ref + ')'));
      d.appendChild(el('p', 'fine', 'Your journey will return to this question.'));
      b.appendChild(d);
    }
    const acts = el('div', 'study-actions');
    if (fresh && fresh.length && E.reveal) {
      const d = el('div', 'reveal-note');
      d.appendChild(el('p', 'plabel', 'Your map has grown'));
      d.appendChild(el('p', '', E.reveal));
      const names = fresh.map((id) => D.regions.land.places.find((p) => p.id === id)).filter(Boolean).map((p) => p.short || p.name);
      d.appendChild(el('p', 'fine', 'New: ' + names.join(', ') + '.'));
      b.appendChild(d);
      const land = el('button', 'btn primary', 'See the map of the Land');
      land.addEventListener('click', () => { closeOverlays(); game.region = 'galilee'; game.switchRegion('land', fresh[0]); });
      acts.appendChild(land);
    }
    if (fresh && E.final) {
      const d = el('div', 'reveal-note');
      if (E.final === 'passion') {
        d.appendChild(el('p', 'plabel', 'The Road to Jerusalem'));
        d.appendChild(el('p', '', 'You watched him die, helped to bury him, stood at an empty tomb, and heard from those who saw him alive. Era III, The Jerusalem Church, begins at Pentecost.'));
      } else {
        d.appendChild(el('p', 'plabel', 'Era I complete'));
        d.appendChild(el('p', '', 'You have finished The Ministry in Galilee. Your road now turns south, toward Jerusalem.'));
      }
      b.appendChild(d);
    }
    const home = E.region || 'galilee';
    const m = el('button', 'btn' + (fresh && fresh.length && E.reveal ? '' : ' primary'), 'Back to ' + D.regions[home].title);
    m.addEventListener('click', () => { closeOverlays(); game.region = home; game.switchRegion(home); });
    const t = el('button', 'btn', 'Timeline');
    t.addEventListener('click', () => { closeOverlays(); game.show('timeline'); });
    acts.appendChild(m); acts.appendChild(t);
    b.appendChild(acts);
  }

  // ---------- boot ----------
  game.show('title');
})(window.TW);
