/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — game controller */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U, D = TW.D, SC = TW.Scene, MV = TW.MapView;
  // developer tools (Dub Studio, line export) appear only with ?dev in the address
  const DEV = /[?&]dev\b/.test(location.search);
  // pieces of assembled labels pass through the translator before they are joined
  const TR = (x) => (TW.tr ? TW.tr(x) : x);
  const REF = (x) => (TW.Bible ? TW.Bible.localRef(x) : x);
  // "c. AD 28" → "h. 28 d. C." in Spanish
  const AD = (x) => (TW.Settings && TW.Settings.get('lang') === 'es' && typeof x === 'string' ? x.replace(/^(c\. )?AD (.+)$/, (s, c, y) => (c ? 'h. ' : '') + y + ' d. C.') : x);
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = TW.tr ? TW.tr(text) : text;
    return e;
  };

  const game = { save: U.load(), screen: null, era: 'galilee' };
  const AU = TW.Audio;
  // sound: unlocked by the first tap anywhere (browsers require a gesture)
  document.addEventListener('pointerdown', () => AU.unlock(), { passive: true });
  function syncSound() {
    document.querySelectorAll('.sound-toggle').forEach((b) => {
      b.textContent = TW.t(AU.on ? 'Sound on' : 'Sound off');
      b.setAttribute('aria-pressed', AU.on);
    });
  }
  document.querySelectorAll('.sound-toggle').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    AU.setOn(!AU.on);
    syncSound();
  }));
  syncSound();
  function syncRead() {
    document.querySelectorAll('.read-toggle').forEach((b) => {
      b.hidden = !TW.Speech.available;
      b.textContent = TW.t(TW.Speech.on ? 'Read aloud on' : 'Read aloud off');
      b.setAttribute('aria-pressed', TW.Speech.on);
      b.title = TW.Speech.on && !TW.Speech.hasQualityVoice() ? 'For a more natural voice, download an Enhanced or Premium voice in your device’s Spoken Content settings.' : '';
    });
  }
  document.querySelectorAll('.read-toggle').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    TW.Speech.setOn(!TW.Speech.on);
    syncRead();
  }));
  syncRead();
  // Jerusalem: market bustle at the center, thinning toward the walls; gardens, flocks and birds on the slopes;
  // wind and wilderness east of the Mount of Olives.
  let lastCity = null;
  function cityAmbience(lon, lat) {
    const km = Math.hypot((lon - 35.2325) * 94.8, (lat - 31.7765) * 111);
    const cf = 1 - U.smooth(0.5, 1.5, km);
    const df = U.smooth(35.246, 35.262, lon);
    const nf = (1 - cf) * (1 - df);
    const lv = {
      market: 0.75 * cf, crowd: 0.45 * cf, city: 0.08 + 0.45 * cf, doves: 0.1 + 0.4 * cf,
      birds: 0.12 + 0.5 * nf + 0.08 * df, pasture: 0.5 * nf + 0.25 * df, wind: 0.04 + 0.12 * nf + 0.4 * df, desert: df,
    };
    const key = Object.values(lv).map((v) => v.toFixed(2)).join();
    if (key === lastCity) return;
    lastCity = key;
    AU.amb(lv);
  }
  const REGION_SOUND = {
    galilee: { music: 'galilee', amb: { wind: 0.2, birds: 0.55, village: 0.15 } },
    land: { music: 'land', amb: { wind: 0.25, birds: 0.3 } },
    jerusalem: { music: 'jerusalem', amb: { city: 0.4, doves: 0.3, birds: 0.25 } },
    east: { music: 'land', amb: { birds: 0.3, village: 0.15, wind: 0.1 } },
    aegean: { music: 'land', amb: { birds: 0.3, village: 0.1, wind: 0.12 } },
    west: { music: 'land', amb: { birds: 0.2, wind: 0.15 } },
  };
  TW.game = game;
  const persist = () => U.store(game.save);

  // ---------- screens ----------
  const screens = ['title', 'prologue', 'timeline', 'map', 'scene'];
  game.show = function (name) {
    if (name !== 'scene' && TW.Speech) TW.Speech.stop();
    if (game.screen === 'map' && name !== 'map') MV.stop();
    if (game.screen === 'scene' && name !== 'scene') { SC.stop(); SC.begin(); }
    if (game.screen === 'title' && name !== 'title') titleRunning = false;
    screens.forEach((s) => $('#s-' + s).classList.toggle('active', s === name));
    closeOverlays();
    game.screen = name;
    if (name === 'title' || name === 'prologue' || name === 'timeline') AU.scene({ music: 'title', amb: { wind: 0.35, birds: 0.3 } });
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
  let pickRole = 'scribe';
  const ROLE_NOTE = {
    scribe: 'A young scribe, trained in the Law of Moses. His teacher Nicodemus sends him north with other teachers to watch the man from Nazareth.',
    niece: 'Few women in Judea could read and write, but some daughters of learned households did. Nicodemus taught his niece so she could keep his accounts. Where women went with Jesus, she goes; where they could not, she stands at the door.',
    both: 'Two accounts, one story. Before each scene you choose whose eyes to see it through: Eleazar on the scribes’ bench, or Elisheva among the women who followed Jesus. Between them you see what neither could see alone.',
  };
  function setRole(r) {
    const nameEl = $('#name-input');
    if (nameEl.value.trim() === TW.Role.defaultName(pickRole) || !nameEl.value.trim()) nameEl.value = TW.Role.defaultName(r);
    pickRole = r;
    $('.name-field').hidden = r === 'both';
    document.querySelectorAll('.role-btn').forEach((b) => b.setAttribute('aria-pressed', b.dataset.role === r));
    $('#role-note').textContent = TW.t(ROLE_NOTE[r]);
  }
  document.querySelectorAll('.role-btn').forEach((b) => b.addEventListener('click', () => setRole(b.dataset.role)));
  function showTitle() {
    const s = game.save;
    pickRole = s.role || 'scribe';
    $('#name-input').value = s.name || TW.Role.defaultName(pickRole);
    setRole(pickRole);
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
  const readName = () => ($('#name-input').value.trim() || TW.Role.defaultName(pickRole)).slice(0, 20);
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
    game.save.role = pickRole;
    game.save.name = readName();
    game.save.started = true;
    game.region = 'galilee';
    persist();
    game.show('prologue');
  });
  $('#btn-continue').addEventListener('click', () => {
    if (pickRole !== (game.save.role || 'scribe')) { setRole(game.save.role || 'scribe'); $('#role-note').textContent = 'Your saved journey is as ' + game.save.name + '. To play as the other character, begin a new journey.'; return; }
    game.save.name = readName();
    persist();
    game.show('timeline');
  });

  // ---------- prologue ----------
  function block(kind, label, text, cls) {
    label = /^(Dramatization|History)$/.test(label) ? TW.t(label) : label;
    const wrap = el('div', 'pblock kind-' + kind);
    wrap.appendChild(el('p', 'plabel', label));
    wrap.appendChild(el('p', cls || '', text));
    return wrap;
  }
  function renderPrologue() {
    const b = $('#prologue-body');
    b.innerHTML = '';
    const n = game.save.name;
    if (TW.Role.both()) {
      b.appendChild(block('drama', 'Dramatization', 'Jerusalem, in the reign of Tiberius Caesar. Word has come south of a teacher from Nazareth named Jesus, who heals the sick in Galilee and casts out unclean spirits. People say something about him that unsettles the teachers of Jerusalem.'));
      b.appendChild(block('scripture', TW.t('Scripture') + ', ' + TW.Bible.localRef('Mark 1:22'), TW.P.singleText('Mark 1:22'), 'verse'));
      b.appendChild(block('history', 'History', 'Nicodemus was a Pharisee and a ruler of the Jews (John 3:1). Mark records scribes coming down from Jerusalem to observe Jesus (Mark 3:22), and Luke records women who followed Jesus in Galilee and supported him (Luke 8:1–3).'));
      b.appendChild(block('drama', 'Dramatization', 'Nicodemus sends two people north. Eleazar, a young scribe who studies under him, goes with the other teachers of the Law. Elisheva, his niece, whom he taught to read and write, goes to stay with his cousin’s family in Capernaum. “Watch him closely,” he tells them both. “Write to me what you see. Only what you see.”'));
      return;
    }
    if (TW.Role.is()) {
      b.appendChild(block('drama', 'Dramatization', 'Jerusalem, in the reign of Tiberius Caesar. You are ' + n + ', niece of Nicodemus. You grew up in his house, and he taught you to read and write so that you could keep his accounts and copy his letters. Word has come south of a teacher from Nazareth named Jesus, who heals the sick in Galilee and casts out unclean spirits. People say something about him that unsettles the teachers of Jerusalem.'));
      b.appendChild(block('scripture', TW.t('Scripture') + ', ' + TW.Bible.localRef('Mark 1:22'), TW.P.singleText('Mark 1:22'), 'verse'));
      b.appendChild(block('history', 'History', 'Nicodemus was a Pharisee and a ruler of the Jews (John 3:1). Few women in Judea could read and write, but some in learned households did. Luke records that women followed Jesus in Galilee and supported him from their own means (Luke 8:1–3).'));
      b.appendChild(block('drama', 'Dramatization', 'Nicodemus sends you north to stay with his cousin’s family in Capernaum. “Watch him closely,” he says. “Write to me what you see. Only what you see.”'));
      return;
    }
    b.appendChild(block('drama', 'Dramatization', 'Jerusalem, in the reign of Tiberius Caesar. You are ' + n + ', a young scribe trained in the Law of Moses. Word has come south of a teacher from Nazareth named Jesus, who heals the sick in Galilee and casts out unclean spirits. People say something about him that unsettles the teachers of Jerusalem.'));
    b.appendChild(block('scripture', TW.t('Scripture') + ', ' + TW.Bible.localRef('Mark 1:22'), TW.P.singleText('Mark 1:22'), 'verse'));
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
    det.appendChild(el('p', 'era-meta', TW.Settings.get('lang') === 'es' ? TR(era.dates) + '. Juegas como ' + TR(TW.Role.G(era.view)).replace(/^U/, 'u') + '.' : era.dates + '. You play as ' + TW.Role.G(era.view).toLowerCase().replace('nicodemus', 'Nicodemus') + '.'));
    det.appendChild(el('p', 'era-summary', TW.Role.G(era.summary)));
    const dl = el('dl', 'world');
    era.world.forEach((w) => { dl.appendChild(el('dt', '', w[0])); dl.appendChild(el('dd', '', w[1])); });
    det.appendChild(dl);
    if (era.id === 'galilee' && eraDone(era)) det.appendChild(el('p', 'era-done', 'You have finished this era. Era II, The Road to Jerusalem, comes next.'));
    if (era.id === 'passion' && eraDone(era)) det.appendChild(el('p', 'era-done', 'You have finished this era. Era III, The Jerusalem Church, comes next.'));
    if (era.id === 'spread' && eraDone(era)) det.appendChild(el('p', 'era-done', 'You have finished this era. Era V, Fire and War, comes next.'));
    if (era.id === 'war' && eraDone(era)) det.appendChild(el('p', 'era-done', 'You have finished this era. Era VI, Patmos and the Seven Churches, comes next.'));
    if (era.id === 'patmos' && eraDone(era)) det.appendChild(el('p', 'era-done', 'You have reached the end of the account: from a roof in Capernaum to the last page of the scroll.'));
    if (era.id === 'church' && game.save.completed.seven) det.appendChild(el('p', 'era-done', 'Service is open: look for people who need you on the Jerusalem map.'));
    const ol = el('ol', 'episodes');
    const next = nextEpisode();
    era.episodes.forEach((raw) => {
      const ep = typeof raw === 'string' ? Object.assign({ id: raw, open: true }, D.episodes[raw]) : raw;
      const li = el('li', 'episode' + (ep.open ? ' open' : ''));
      const txt = el('div', 'ep-text');
      txt.appendChild(el('span', 'ep-title', ep.title));
      txt.appendChild(el('span', 'ep-ref', REF(ep.ref) + (ep.open ? ', ' + TR(placeName(ep.place)) : '')));
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
        li.appendChild(el('span', 'ep-title', TR(T.witness)));
        li.appendChild(el('span', 'ep-ref', TR(pl ? pl.short || pl.name : '') + ', ' + (game.save.heard[k] ? TW.t('heard') : tOpen(k) ? TW.t('waiting for you') : TW.t('after') + ' ' + TR(D.episodes[T.after].title))));
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
    AU.travel('');
    MV.init($('#map-canvas'));
    hideCard();
    const R = D.regions[game.region];
    AU.scene(REGION_SOUND[game.region]);
    $('#map-title').textContent = TR(R.title) + ', ' + AD(R.subtitle);
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
      onBox: () => game.switchRegion(D.regions[game.region].boxZoom || 'galilee'),
      onPos: (lon, lat, rid) => { if (rid === 'jerusalem') cityAmbience(lon, lat); },
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
    $('#card-kind').textContent = TW.t(pl.kind === 'episode' && pl.episodes.length === 1 ? 'Episode' : KINDS[pl.kind]);
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
        t.appendChild(el('span', 'ep-title', ep.num + '. ' + TR(ep.title)));
        t.appendChild(el('span', 'ep-ref', REF(ep.ref) + (game.save.completed[eid] ? ', ' + TW.t('completed') : '')));
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
    const svl = serviceAt(game.region, pl.id).filter(sOpen);
    if (svl.length) {
      const box = el('div', 'sheet-episodes sheet-testimonies');
      box.appendChild(el('p', 'sheet-kind', 'People who need you'));
      svl.forEach((k) => {
        const V = D.service[k];
        const row = el('div', 'ep-row');
        const t = el('div', 'ep-text');
        t.appendChild(el('span', 'ep-title', V.title));
        t.appendChild(el('span', 'ep-ref', game.save.served[k] ? 'served' : 'waiting'));
        row.appendChild(t);
        if (here) {
          const b = el('button', 'btn small' + (game.save.served[k] ? '' : ' primary'), game.save.served[k] ? 'Again' : 'Go');
          b.addEventListener('click', () => game.enterService(k));
          row.appendChild(b);
        }
        box.appendChild(row);
      });
      act.appendChild(box);
      if (!here && !act.querySelector('.btn')) act.appendChild(travelBtn(pl, true));
    }
    const tl = testimoniesAt(game.region, pl.id);
    if (tl.length) {
      const box = el('div', 'sheet-episodes sheet-testimonies');
      box.appendChild(el('p', 'sheet-kind', 'People to talk to here'));
      tl.forEach((k) => {
        const T = D.testimonies[k];
        const row = el('div', 'ep-row');
        const t = el('div', 'ep-text');
        t.appendChild(el('span', 'ep-title', TR(T.witness)));
        const after = T.after && D.episodes[T.after];
        const status = !tOpen(k) ? TW.t('after') + ' ' + after.num + '. ' + TR(after.title) : TW.t(game.save.heard[k] ? 'heard' : T.later ? 'told after Pentecost' : 'not yet heard');
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
    const b = el('button', 'btn' + (primary ? ' primary' : ''), (TW.Settings.get('lang') === 'es' ? 'Viajar a ' : 'Travel to ') + TR(pl.short || pl.name));
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
  const serviceAt = (region, place) => Object.keys(D.service || {}).filter((k) => D.service[k].region === region && D.service[k].place === place);
  const sOpen = (k) => !!game.save.completed[D.service[k].after];
  game.badge = (region, pl) => {
    const list = testimoniesAt(region, pl.id).filter(tOpen);
    const sv = serviceAt(region, pl.id).filter(sOpen);
    if (!list.length && !sv.length) return null;
    return list.some((k) => !game.save.heard[k]) || sv.some((k) => !game.save.served[k]) ? 'new' : 'heard';
  };
  game.serve = (id, details) => {
    game.save.served[id] = details;
    game.observe('s:' + id, 'log', D.service[id].log, false, true);
    persist();
  };
  game.enterService = function (id) { chooseVoice('s:' + id, 'Service: ' + D.service[id].title, () => startService(id)); };
  function startService(id) {
    game.show('scene');
    game.current = 's:' + id;
    $('#scene-title').textContent = 'Service: ' + D.service[id].title;
    SC.init(sceneEls); SC.begin(); SC.start();
    TW.Service.run(game, id);
  }
  game.hear = (id, n) => { game.save.heard[id] = Math.max(game.save.heard[id] || 0, n || 1); persist(); };
  game.enterTestimony = function (id) { chooseVoice('t:' + id, 'Testimony: ' + D.testimonies[id].title, () => startTestimony(id)); };
  function startTestimony(id) {
    const T = D.testimonies[id];
    game.show('scene');
    game.current = 't:' + id;
    $('#scene-title').textContent = 'Testimony: ' + T.title;
    SC.init(sceneEls);
    SC.begin();
    SC.start();
    TW.Testimony.run(game, id);
  }
  const epTitle = (k) => (k.startsWith('t:') ? 'Testimony: ' + D.testimonies[k.slice(2)].title : k.startsWith('s:') ? 'Service: ' + D.service[k.slice(2)].title : D.episodes[k].title);

  // ---------- episodes ----------
  const sceneEls = {
    pix: $('#scene-pix'), fx: $('#scene-fx'), dialog: $('#dialog'), label: $('#dlg-label'),
    speaker: $('#dlg-speaker'), text: $('#dlg-text'), choices: $('#dlg-choices'), next: $('#dlg-next'),
    toast: $('#toast'), veil: $('#veil'), stage: $('#stage'), memchip: $('#memchip'),
  };
  // In the mixed account, ask whose eyes this scene is seen through.
  function chooseVoice(key, title, go) {
    if (!TW.Role.both()) { go(); return; }
    const V = TW.Role.VIEW[key] || ['scribe', 'Eleazar asks the questions', 'Elisheva asks the questions'];
    const wrap = el('div', 'voice-card');
    wrap.appendChild(el('p', 'voice-kicker', 'Whose account?'));
    wrap.appendChild(el('h2', 'voice-title', title));
    [['scribe', 'Eleazar', V[1]], ['niece', 'Elisheva', V[2]]].forEach((o) => {
      const b = el('button', 'voice-btn' + (V[0] === o[0] ? ' rec' : ''));
      b.type = 'button';
      b.appendChild(el('span', 'voice-name', o[1] + (V[0] === o[0] ? '  ·  Recommended' : '')));
      b.appendChild(el('span', 'voice-where', o[2]));
      b.addEventListener('click', () => { game.save.cur = o[0]; persist(); ov.remove(); go(); });
      wrap.appendChild(b);
    });
    const back = el('button', 'btn-text', 'Back');
    back.type = 'button';
    back.addEventListener('click', () => ov.remove());
    wrap.appendChild(back);
    const ov = el('div', 'voice-overlay');
    ov.id = 'o-voice';
    ov.appendChild(wrap);
    document.body.appendChild(ov);
    wrap.querySelector('.voice-btn.rec, .voice-btn').focus();
  }
  function enterEpisode(id) {
    if (TW.TURBO && SC.turboReset) SC.turboReset();
    const ep = TW.Episodes[id];
    if (!ep) return;
    chooseVoice(id, D.episodes[id].title, () => startEpisode(id, ep));
  }
  function startEpisode(id, ep) {
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
    text = TW.Role.G(text);
    if (TW.Lines && text) TW.Lines.note(TW.Lines.id('observe', text), { kind: 'observe', text: text });
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

  // ---------- Settings: reading, comfort, language, Bible, voices, progress ----------
  const T = (x) => TW.t(x);
  function section(body, title) { body.appendChild(el('h3', 'set-head', T(title))); }
  function pickRow(body, label, key, opts, after) {
    const row = el('label', 'set-row');
    row.appendChild(el('span', 'set-label', T(label)));
    const sel = el('select', 'voice-select');
    opts.forEach((o) => { const op = el('option', '', T(o[1])); op.value = o[0]; if (String(TW.Settings.get(key)) === String(o[0])) op.selected = true; sel.appendChild(op); });
    sel.addEventListener('change', () => { TW.Settings.set(key, sel.value); if (after) after(sel.value); });
    row.appendChild(sel);
    body.appendChild(row);
    return sel;
  }
  function checkRow(body, label, key, after) {
    const row = el('label', 'set-check');
    const box = el('input'); box.type = 'checkbox'; box.checked = !!TW.Settings.get(key);
    box.addEventListener('change', () => { TW.Settings.set(key, box.checked); if (after) after(box.checked); });
    row.appendChild(box); row.appendChild(el('span', '', T(label)));
    body.appendChild(row);
  }
  function download(name, text, type) {
    try {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([text], { type: type || 'application/json' }));
      a.download = name; document.body.appendChild(a); a.click(); a.remove();
    } catch (e) { /* fall through to the copy below */ }
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
  }
  function readFile(input, then) {
    const f = input.files && input.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => then(String(r.result), f.name);
    r.readAsText(f);
  }
  function renderSettings(body) {
    const rerender = () => openJournal('settings');
    section(body, 'Reading');
    pickRow(body, 'Text size', 'textSize', [['s', 'Small'], ['m', 'Medium'], ['l', 'Large'], ['xl', 'Extra large']]);
    pickRow(body, 'Text speed', 'textSpeed', [['slow', 'Slow'], ['normal', 'Normal'], ['fast', 'Fast'], ['instant', 'Instant']]);
    checkRow(body, 'Move on by itself after each line', 'autoAdvance');
    checkRow(body, 'Let me select dialog text (for Speak Selection)', 'selectable');
    section(body, 'Comfort');
    checkRow(body, 'Reduce motion', 'reduceMotion');
    checkRow(body, 'Higher contrast', 'contrast');
    section(body, 'Language');
    pickRow(body, 'Language', 'lang', [['en', 'English'], ['es', 'Español']], (v) => { setLanguage(v); rerender(); });
    if (TW.Settings.get('lang') === 'es') body.appendChild(el('p', 'empty', 'El menú está en español. La historia se mostrará en español a medida que se traduzca; mientras tanto aparece en inglés. Para las Escrituras en español, añade la Reina-Valera 1909 abajo.'));
    section(body, 'Bible translation');
    pickRow(body, 'Bible translation', 'bible', TW.Bible.list().map((v) => [v.id, v.name + (v.id === 'WEB' ? '' : ' (' + TW.Bible.count(v.id) + ')')]), () => { relabel(); rerender(); });
    const cur = TW.Bible.version();
    body.appendChild(el('p', 'empty', cur.name + ' · ' + (cur.license || '') + (cur.id !== 'WEB' ? ' · ' + TW.Bible.count(cur.id) + ' / ' + TW.Bible.needed().length + ' verses; any missing verse is shown from the WEB, marked “WEB”.' : '')));
    if (DEV) {
      const dv = el('div', 'set-buttons');
      TW.Bible.list().filter((v) => v.imported).forEach((v) => {
        const sb = el('button', 'btn small', 'Save ' + v.id + ' as a game file'); sb.type = 'button';
        sb.addEventListener('click', () => { const f = TW.Bible.exportFile(v.id); if (f) download(f.name, f.text, 'text/javascript'); });
        dv.appendChild(sb);
      });
      if (dv.childNodes.length) { body.appendChild(el('p', 'empty', 'Developer: save a downloaded version as a file, put it in the game’s bible folder and push. It then ships with the game, with no download.')); body.appendChild(dv); }
      TW.Bible.list().filter((v) => v.shipped).forEach((v) => body.appendChild(el('p', 'empty', 'Shipped with the game: ' + v.name + '.')));
    }
    if (cur.imported) { const rm = el('button', 'btn small', T('Remove')); rm.type = 'button'; rm.addEventListener('click', () => { TW.Bible.remove(cur.id); relabel(); rerender(); }); body.appendChild(rm); }
    // one-tap downloads of public-domain versions
    const dl = el('div', 'set-downloads');
    dl.appendChild(el('p', '', 'Download a public-domain translation (only the verses this game uses, about 150 KB):'));
    const dstatus = el('p', 'empty', '');
    TW.Bible.DOWNLOADS.forEach((d) => {
      const have = TW.Bible.versions[d.id] || (d.alt && TW.Bible.versions[d.alt.id]);
      const b = el('button', 'btn small', (have ? '✓ ' : '') + d.name);
      b.type = 'button';
      b.disabled = !!have;
      b.addEventListener('click', async () => {
        dl.querySelectorAll('button').forEach((x) => { x.disabled = true; });
        const r = await TW.Bible.download(d.id, (msg) => { dstatus.textContent = msg; });
        if (r.ok) { TW.Settings.set('bible', r.id); dstatus.textContent = 'Added ' + r.name + ': ' + r.matched + ' of ' + r.needed + ' verses.' + (r.stored ? '' : ' (Too large to keep on this device.)'); relabel(); setTimeout(rerender, 1500); }
        else { dstatus.textContent = r.error; dl.querySelectorAll('button').forEach((x) => { x.disabled = false; }); }
      });
      dl.appendChild(b);
    });
    dl.appendChild(dstatus);
    dl.appendChild(el('p', 'empty', 'Texts come from getBible.net or bible-api.com. The King James Version is public domain in the US; in the UK the Crown holds rights to it.'));
    body.appendChild(dl);
    const imp = el('details', 'set-import');
    imp.appendChild(el('summary', '', T('Add a Bible translation')));
    imp.appendChild(el('p', '', 'Use a public-domain Bible as a plain text file with one verse per line. On eBible.org, for example, the American Standard Version (eng-asv), the King James Version (eng-kjv) and the Reina-Valera 1909 (spaRV1909) are offered as “VPL” text. Download it, unzip it in the Files app, then choose the .txt file here. Only the verses this game uses are kept.'));
    const name = el('input', 'set-text'); name.placeholder = 'Name, e.g. American Standard Version';
    const short = el('input', 'set-text'); short.placeholder = 'Short name, e.g. ASV'; short.maxLength = 10;
    const lang = el('select', 'voice-select'); [['en', 'English'], ['es', 'Español']].forEach((o) => { const op = el('option', '', o[1]); op.value = o[0]; lang.appendChild(op); });
    const file = el('input'); file.type = 'file'; file.accept = '.txt,.json,.vpl,text/plain,application/json';
    const status = el('p', 'empty', '');
    file.addEventListener('change', () => readFile(file, (text, fname) => {
      const base = fname.replace(/\.[^.]+$/, '').replace(/_vpl$/i, '');
      if (!short.value) short.value = base.replace(/^(eng|spa)-?/i, '').toUpperCase().slice(0, 10);
      if (!name.value) name.value = base;
      if (/^spa|reina|valera/i.test(fname)) lang.value = 'es';
      const r = TW.Bible.importText(text, { name: name.value, short: short.value, lang: lang.value });
      if (!r.ok) { status.textContent = 'No verses this game uses were found in that file. Is it one verse per line, like “MRK 2:1 …”?'; return; }
      TW.Settings.set('bible', r.id);
      status.textContent = 'Added ' + r.id + ': ' + r.matched + ' of ' + r.needed + ' verses.' + (r.stored ? '' : ' (It is too large to save on this device, so it will be gone next time.)');
      relabel(); setTimeout(rerender, 1200);
    }));
    [name, short, lang, file, status].forEach((n) => imp.appendChild(n));
    body.appendChild(imp);
    section(body, 'Voices');
    renderVoices(body);
    section(body, 'Recorded voices');
    renderStudio(body);
    section(body, 'About and license');
    body.appendChild(el('p', '', (TW.Settings.get('lang') === 'es' ? 'El Camino: Relato de un testigo' : TW.ABOUT.title) + ' · © ' + TW.ABOUT.year + ' ' + TW.ABOUT.holder + '.'));
    body.appendChild(el('p', '', TW.ABOUT.summary));
    body.appendChild(el('p', 'empty', (TW.Settings.get('lang') === 'es' ? 'Los términos completos están en LICENSE.md, junto con el juego. Para permisos: ' : 'Full terms are in LICENSE.md with the game. For permissions: ') + TW.ABOUT.contact + '.'));
    section(body, 'Your progress');
    const row = el('div', 'set-buttons');
    const back = el('button', 'btn small', T('Back up progress')); back.type = 'button';
    back.addEventListener('click', () => download('the-way-progress.json', JSON.stringify(game.save)));
    const restore = el('input'); restore.type = 'file'; restore.accept = '.json,application/json'; restore.hidden = true;
    const rb = el('button', 'btn small', T('Restore progress')); rb.type = 'button';
    rb.addEventListener('click', () => restore.click());
    restore.addEventListener('change', () => readFile(restore, (text) => {
      try { const sv = JSON.parse(text); if (!sv || typeof sv !== 'object' || !sv.completed) throw new Error(); game.save = Object.assign(U.defaultSave(), sv); persist(); relabel(); rerender(); } catch (e) { alert('That file is not a saved journey.'); }
    }));
    const lines = el('button', 'btn small', 'Export lines'); lines.type = 'button'; lines.hidden = !DEV;
    lines.title = 'Every line you have seen, with its permanent ID, for recorded voices or translation';
    lines.addEventListener('click', () => download('the-way-lines.json', TW.Lines.export()));
    [back, rb, restore, lines].forEach((n) => row.appendChild(n));
    body.appendChild(row);
    body.appendChild(el('p', 'empty', 'Backup copies your journey to a file (and to the clipboard), so you can move it to another device.' + (DEV ? ' Export lines lists every line you have seen with its permanent ID, for recording voices or translating.' : '')));
  }
  function renderVoices(body) {
    const SP = TW.Speech;
    SP.reload();
    if (!SP.available) { body.appendChild(el('p', 'empty', 'This browser has no built-in voices.')); return; }
    const list = SP.list();
    body.appendChild(el('p', 'heart', 'Safari lets web pages use only some of the voices on your phone. Enhanced, Premium and Siri voices you download in Settings → Accessibility → Read & Speak usually do not appear here, even when set as the default. The best voice in this list is chosen automatically, and any recorded voices added to the game are used first.'));
    if (!list.length) { body.appendChild(el('p', 'empty', 'No voices are available yet. Turn Read aloud on once, then reopen this tab.')); return; }
    [['narrator', 'Narrator', 'drama'], ['scripture', 'Scripture', 'scripture']].forEach((slot) => {
      const row = el('div', 'voice-row');
      const lab = el('label', 'voice-label', T(slot[1]));
      const sel = el('select', 'voice-select');
      list.forEach((v) => {
        const o = el('option', '', v.name.replace(/\s*\((enhanced|premium)\)/i, '') + ' · ' + SP.quality(v) + ' · ' + v.lang);
        o.value = v.name;
        if (v.name === SP.chosen(slot[0])) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', () => { SP.choose(slot[0], sel.value); SP.test(sel.value, slot[2]); });
      const test = el('button', 'btn small', T('Test'));
      test.type = 'button';
      test.addEventListener('click', () => SP.test(sel.value, slot[2]));
      lab.appendChild(sel);
      row.appendChild(lab); row.appendChild(test);
      body.appendChild(row);
    });
  }
  // ---------- Dub Studio: record the game's lines on the iPhone, a batch at a time ----------
  function copyText(text, box) {
    box.value = text; box.hidden = false;
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => { box.select(); });
    else box.select();
  }
  function renderStudio(body) {
    const L = TW.Lines, lang = TW.Settings.get('lang') || 'en';
    const groups = L.groups(), keys = Object.keys(groups);
    checkRow(body, 'Play recorded voices when available', 'recordings');
    if (!DEV) { body.appendChild(el('p', 'empty', 'Recorded voices play wherever they exist. Any other line is read by your device’s voice.')); return; }
    body.appendChild(el('p', '', 'Developer tools (shown because the address has ?dev). Recordings in the game’s audio/' + lang + ' folder play automatically, line by line; any line without one is read by the device. Ready-made batches for TTS Studio, one per episode, are in the dub folder (dub/index.html on your published copy). You can also record your own with the iPhone’s Shortcuts app; see RECORDING.md.'));
    if (!keys.length) { body.appendChild(el('p', 'empty', 'Play an episode first; its lines will appear here.')); return; }
    const done = L.recorded(lang);
    const title = (k) => (D.episodes[k] ? D.episodes[k].num + '. ' + D.episodes[k].title : k.indexOf('t:') === 0 ? 'Testimony: ' + k.slice(2) : k.indexOf('s:') === 0 ? 'Service: ' + k.slice(2) : 'Other');
    const sel = el('select', 'voice-select');
    keys.sort((a, b) => (D.eraOrder.indexOf(a) + 1 || 999) - (D.eraOrder.indexOf(b) + 1 || 999)).forEach((k) => {
      const n = groups[k].length, r = groups[k].filter((x) => done.has(x.id)).length;
      const o = el('option', '', title(k) + ' · ' + r + ' of ' + n + ' recorded'); o.value = k; sel.appendChild(o);
    });
    const size = el('select', 'voice-select');
    [1, 5, 10, 25, 50].forEach((n) => { const o = el('option', '', n + (n === 1 ? ' line (a test)' : ' lines per batch')); o.value = n; if (n === 10) o.selected = true; size.appendChild(o); });
    // only one voice at a time, for a simple one-voice shortcut
    const voice = el('select', 'voice-select');
    [['', 'All voices'], ['N', 'N · narrator, Eleazar’s account'], ['W', 'W · narrator, Elisheva’s account'], ['S', 'S · Scripture'], ['M', 'M · a man speaking'], ['F', 'F · a woman speaking']].forEach((v) => { const o = el('option', '', v[1]); o.value = v[0]; voice.appendChild(o); });
    // the kind of file the shortcut makes (check one in the Files app)
    const EXT = 'the-way.dubext';
    let ext = 'm4a';
    try { ext = localStorage.getItem(EXT) || 'm4a'; } catch (e) { /* ignore */ }
    const extSel = el('select', 'voice-select');
    ['m4a', 'wav', 'aiff', 'caf', 'mp3'].forEach((x) => { const o = el('option', '', 'Recordings are .' + x + ' files'); o.value = x; if (x === ext) o.selected = true; extSel.appendChild(o); });
    extSel.addEventListener('change', () => { ext = extSel.value; try { localStorage.setItem(EXT, ext); } catch (e) { /* ignore */ } });
    const box = el('textarea', 'set-text studio-box'); box.hidden = true; box.readOnly = true; box.rows = 6;
    const status = el('p', 'empty', '');
    let pending = [];
    const row = el('div', 'set-buttons');
    const next = el('button', 'btn small', 'Copy next batch'); next.type = 'button';
    next.addEventListener('click', () => {
      const b = L.batch(sel.value, +size.value, lang, voice.value);
      if (!b.ids.length) { status.textContent = voice.value ? 'No unrecorded lines for that voice in this episode.' : 'Every line of this episode is recorded.'; return; }
      pending = b.ids; copyText(b.text, box);
      status.textContent = b.ids.length + ' lines copied. Run your “The Way: record” shortcut, then tap “Mark batch recorded”.';
    });
    const mark = el('button', 'btn small', 'Mark batch recorded'); mark.type = 'button';
    mark.addEventListener('click', () => { if (!pending.length) { status.textContent = 'Copy a batch first.'; return; } L.markRecorded(lang, pending); status.textContent = pending.length + ' lines marked as recorded.'; pending = []; setTimeout(() => openJournal('settings'), 900); });
    const man = el('button', 'btn small', 'Copy manifest'); man.type = 'button';
    man.addEventListener('click', () => { copyText(L.manifest(lang, ext), box); status.textContent = 'Paste this into audio/manifest.js, replacing the line for ' + lang + '. Put the recordings in audio/' + lang + '/.'; });
    const chk = el('button', 'btn small', 'Check recordings'); chk.type = 'button';
    chk.addEventListener('click', async () => {
      const ids = (groups[sel.value] || []).filter((r) => /^(d|s)-/.test(r.id) && r.kind !== 'goal' && r.kind !== 'option' && r.kind !== 'observe').map((r) => r.id).slice(0, 40);
      if (!ids.length) { status.textContent = 'Play this episode first.'; return; }
      status.textContent = 'Checking ' + ids.length + ' lines…';
      let found = 0;
      for (const id of ids) { try { const r = await fetch(TW.Dubs.url(lang, id), { method: 'HEAD', cache: 'no-store' }); if (r.ok) found++; } catch (e) { /* not reachable */ } }
      const where = new URL(TW.Dubs.url(lang, ids[0]), location.href).href;
      status.textContent = found + ' of ' + ids.length + ' spoken lines in this episode have recordings. The game looks for files like: ' + where + (found ? '' : '  (None found: check that the MP3s are in an audio/' + lang + ' folder at the top of the game, next to index.html.)');
    });
    const svc = el('button', 'btn small', 'Copy batch for a voice service'); svc.type = 'button';
    svc.addEventListener('click', () => {
      const b = L.batch(sel.value, +size.value, lang, voice.value);
      pending = b.ids;
      copyText(JSON.stringify(b.lines.map((r) => ({ id: r.id, voice: L.tag(r), text: r.text })), null, 1), box);
      status.textContent = 'Copied as JSON for tools/dub-openai.mjs (a paid OpenAI service). See RECORDING.md.';
    });
    [chk, next, mark, man, svc].forEach((x) => row.appendChild(x));
    [sel, size, voice, extSel, row, status, box].forEach((x) => body.appendChild(x));
    const how = el('details', 'set-import');
    how.appendChild(el('summary', '', 'How to record on iPhone'));
    [
      'Once: in Settings → Accessibility → Read & Speak → Voices → English, download the voices you like (for example Evan (Enhanced) and Ava (Premium)).',
      'Once: build the “The Way: record” shortcut described in RECORDING.md. It reads each copied line (ID | voice | text), makes spoken audio with the voice for that tag, and saves it named by its ID in Files → iCloud Drive → Shortcuts → The Way Audio. In each voice branch, end with Set Variable “Audio”, and name and save the Audio variable after the If blocks.',
      'Test with a batch of 1 line first. Then look at the file in the Files app and set “Recordings are … files” above to its extension.',
      'Each time: choose an episode here, tap Copy next batch, run the shortcut, then tap Mark batch recorded. Small batches are kinder to the phone.',
      'When you have a few batches: copy the files into the game’s audio/' + lang + ' folder (for example with GitMobile), tap Copy manifest, and paste it into audio/manifest.js.',
      'Voice tags: N narrator for Eleazar’s account, W narrator for Elisheva’s, S Scripture, M a man speaking, F a woman speaking.',
    ].forEach((t, i) => how.appendChild(el('p', '', (i + 1) + '. ' + t)));
    body.appendChild(how);
    const reset = el('button', 'btn-text', 'Forget which lines were recorded'); reset.type = 'button';
    reset.addEventListener('click', () => { if (confirm('Forget the record of which lines were recorded? Your audio files are not touched.')) { L.unmark(lang); openJournal('settings'); } });
    body.appendChild(reset);
  }
  // Change the language. Choosing Spanish also fetches a Spanish Bible the first time (kept on the device).
  let fetchingSpanish = false;
  const langNote = (msg) => { const n = $('#lang-status'); if (n) { n.textContent = msg; n.hidden = !msg; } };
  function setLanguage(v) {
    TW.Settings.set('lang', v);
    if (v === 'en' && TW.Bible.lang() !== 'en') TW.Settings.set('bible', 'WEB');
    if (v === 'es' && TW.Bible.lang() !== 'es') {
      const sp = TW.Bible.list().find((x) => x.lang === 'es');
      if (sp) TW.Settings.set('bible', sp.id);
      else if (!fetchingSpanish) {
        fetchingSpanish = true;
        langNote('Descargando la Reina-Valera…');
        TW.Bible.download('RV1909', () => {}).then((r) => {
          fetchingSpanish = false;
          if (r.ok) { if (TW.Settings.get('lang') === 'es') TW.Settings.set('bible', r.id); langNote('Escrituras en español: ' + r.name + '.'); relabel(); }
          else langNote('Sin conexión: las Escrituras siguen en inglés por ahora. Puedes descargarlas después en Ajustes.');
        });
      }
    }
    TW.Speech.reload(); relabel();
  }
  // relabel everything that depends on language or Bible version
  function relabel() {
    TW.I18n.apply();
    syncSound(); syncRead();
    const v = TW.Bible.version();
    $('#bible-credit').textContent = TW.Settings.get('lang') === 'es'
      ? 'Las citas bíblicas son de la ' + v.name + (v.license ? ' (' + v.license.toLowerCase().replace('public domain', 'dominio público') + ')' : '') + '.'
      : 'Scripture quotations are from the ' + v.name + (/public domain/i.test(v.license) ? ', which is in the public domain.' : '.');
    const rep = document.querySelector('[data-tab=reports]');
    if (rep) rep.textContent = T(TW.Role.is() ? 'Letters' : 'Reports');
    const rn = $('#role-note'), cur = document.querySelector('[data-role][aria-pressed="true"]');
    if (rn && cur && ROLE_NOTE[cur.dataset.role]) rn.textContent = TW.t(ROLE_NOTE[cur.dataset.role]);
    const lb = $('#btn-title-lang');
    if (lb) { lb.textContent = TW.Settings.get('lang') === 'es' ? 'English' : 'Español'; lb.setAttribute('lang', TW.Settings.get('lang') === 'es' ? 'en' : 'es'); }
    $('#copyright').textContent = '© ' + TW.ABOUT.year + ' ' + TW.ABOUT.holder + '. ' + (TW.Settings.get('lang') === 'es' ? 'Libre para jugar y compartir. Todos los demás derechos reservados.' : 'Free to play and share. All other rights reserved.');
  }
  function openJournal(tab) {
    document.querySelector('[data-tab=reports]').textContent = TW.t(TW.Role.is() ? 'Letters' : 'Reports');
    openOverlay('#o-journal');
    renderJournal(tab);
  }
  document.querySelectorAll('#o-journal [data-tab]').forEach((b) =>
    b.addEventListener('click', () => renderJournal(b.dataset.tab)));
  function renderJournal(tab) {
    document.querySelectorAll('#o-journal [data-tab]').forEach((b) => b.setAttribute('aria-selected', b.dataset.tab === tab));
    const selTab = document.querySelector('#o-journal [data-tab="' + tab + '"]');
    if (selTab && selTab.scrollIntoView) selTab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    const body = $('#journal-body');
    body.innerHTML = '';
    const s = game.save;
    if (tab === 'obs') {
      const eps = D.eraOrder.filter((id) => (s.obs[id] || []).length).concat(Object.keys(s.obs).filter((k) => (k.startsWith('t:') || k.startsWith('s:')) && s.obs[k].length));
      if (!eps.length) { body.appendChild(el('p', 'empty', 'Nothing written yet. In each place, tap people and things to note what you see.')); return; }
      eps.forEach((id) => {
        body.appendChild(el('h3', '', epTitle(id)));
        const ul = el('ul', 'notes');
        s.obs[id].forEach((o) => ul.appendChild(el('li', '', o.text)));
        body.appendChild(ul);
      });
    } else if (tab === 'settings') {
      renderSettings(body);
    } else if (tab === 'service') {
      const all = Object.keys(D.service || {});
      const done = all.filter((k) => s.served[k]);
      if (!done.length) { body.appendChild(el('p', 'empty', game.save.completed.seven ? 'No one served yet. Look for people who need you on the Jerusalem map.' : 'Service opens in Era III, after the Seven are chosen.')); return; }
      body.appendChild(el('p', 'empty', 'Served ' + done.length + ' of ' + all.length + '. You cannot make God heal. You can listen, care, and pray.'));
      done.forEach((k) => {
        const V = D.service[k], r = s.served[k];
        body.appendChild(el('h3', '', V.title));
        body.appendChild(el('p', '', V.log));
        body.appendChild(el('p', 'heart', 'You chose to: ' + [r.listen, r.care, r.pray].map((x) => x.replace(/\.$/, '').toLowerCase()).join('; ') + '.'));
      });
    } else if (tab === 'testimonies') {
      const all = Object.keys(D.testimonies);
      const heard = all.filter((k) => s.heard[k]);
      body.appendChild(el('p', 'empty', TW.Settings.get('lang') === 'es' ? 'Has escuchado ' + heard.length + ' de ' + all.length + ' testimonios. Busca en los mapas personas con quienes hablar.' : 'Heard ' + heard.length + ' of ' + all.length + ' testimonies so far. Look for people to talk to on the maps.'));
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
      if (!eps.length) { body.appendChild(el('p', 'empty', TW.Role.is() ? 'No letters sealed yet. Finish an episode to write one.' : 'No reports sealed yet. Finish an episode to write one.')); return; }
      eps.forEach((id) => {
        const E = D.episodes[id], r = s.reports[id];
        body.appendChild(el('h3', '', E.num + '. ' + E.title));
        if (s.heart[id] !== undefined) body.appendChild(el('p', 'heart', TW.Role.G(E.hearts[s.heart[id]])));
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
    const ltr = TW.Role.is();
    document.querySelector('#o-report .scroll-title').textContent = TW.t(ltr ? 'Letter to Nicodemus' : 'Report to Nicodemus');
    document.querySelector('#o-report .help').textContent = ltr ? 'Choose what goes in your letter.' : 'Choose what goes in your report.';
    $('#btn-seal').textContent = ltr ? 'Seal the letter' : 'Seal the report';
    document.querySelector('[data-tab=reports]').textContent = TW.t(ltr ? 'Letters' : 'Reports');
    const es = TW.Settings.get('lang') === 'es', scene = TW.tr(E.scene);
    $('#report-from').textContent = TW.Role.is()
      ? (es ? 'De ' + TW.Role.voiceName() + ', para su tío Nicodemo. ' : 'From ' + TW.Role.voiceName() + ', to her uncle Nicodemus. ') + scene + '.'
      : (es ? 'De ' + TW.Role.voiceName() + ', escriba. ' : 'From ' + TW.Role.voiceName() + ', a scribe. ') + scene + '.';
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
      lab.appendChild(el('span', '', TW.Role.G(c)));
      rc.appendChild(lab);
    });
    seal.onclick = () => {
      const before = revealedSet();
      const all = game.save.obs[ep] || [];
      const picked = [...box.querySelectorAll('input:checked')].map((c) => all[+c.value].text);
      const ci = +rc.querySelector('input:checked').value;
      game.save.reports[ep] = { obs: picked, conclusion: TW.Role.G(E.conclusions[ci]) };
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
    b.appendChild(el('p', 'study-kicker', fresh ? (TW.Role.is() ? 'Your letter is sealed. Now read the passage.' : 'Your report is sealed. Now read the passage.') : 'Study'));
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
        s.appendChild(document.createTextNode(TW.P.verseText(pt[0], v[0]) + ' '));
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
      if (E.final === 'church') {
        d.appendChild(el('p', 'plabel', 'The Jerusalem Church'));
        d.appendChild(el('p', '', 'You were baptized, served the widows and the sick, and watched Stephen die. The believers are scattering. Era IV, The Way Spreads, follows them into Samaria and out to the nations, and a light on the Damascus road is coming.'));
      } else if (E.final === 'passion') {
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
  $('#btn-title-lang').addEventListener('click', (e) => { e.stopPropagation(); setLanguage(TW.Settings.get('lang') === 'es' ? 'en' : 'es'); });
  // Settings straight from the title screen
  $('#btn-title-settings').addEventListener('click', (e) => { e.stopPropagation(); openJournal('settings'); });
  relabel();
  game.show('title');
})(window.TW);
