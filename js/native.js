/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — the few things the store apps (iPhone and Android, built with Capacitor; see app/README.md) do that a web
   page cannot: a light touch of the phone's haptics, the share sheet for files, Advent reminders, keeping the screen
   on during play, tips, a safe copy of your journey in the app's own storage, and Android's back button.
   On the web every call here quietly does the web's best (or nothing). */
window.TW = window.TW || {};
(function (TW) {
  const N = {};
  const cap = () => window.Capacitor;
  const plugin = (name) => { const c = cap(); return c && c.Plugins ? c.Plugins[name] : null; };
  N.is = () => { const c = cap(); return !!(c && c.isNativePlatform && c.isNativePlatform()); };
  N.platform = () => { const c = cap(); return c && c.getPlatform ? c.getPlatform() : 'web'; };

  // a light tap (choices, an angel's note), a medium one (opening a door), a firm one (sealing a report)
  N.haptic = function (kind) {
    try {
      const H = N.is() && plugin('Haptics');
      if (H) { H.impact({ style: kind === 'firm' ? 'HEAVY' : kind === 'medium' ? 'MEDIUM' : 'LIGHT' }); return; }
      if (navigator.vibrate) navigator.vibrate(kind === 'firm' ? 18 : kind === 'medium' ? 12 : 7);
    } catch (e) { /* not supported */ }
  };

  // save a file through the share sheet (in the apps a download link does nothing)
  N.shareFile = async function (name, content, title) {
    const F = plugin('Filesystem'), S = plugin('Share');
    if (!N.is() || !F || !S) return false;
    try {
      await F.writeFile({ path: name, data: content, directory: 'CACHE', encoding: 'utf8' });
      const u = await F.getUri({ path: name, directory: 'CACHE' });
      await S.share({ title: title || name, files: [u.uri] });
      return true;
    } catch (e) { return false; }
  };

  // Advent reminders: one each morning, December 1 to 25, at 8:00
  N.canRemind = () => N.is() && !!plugin('LocalNotifications');
  N.adventReminders = async function (on, doors, es) {
    const LN = plugin('LocalNotifications');
    if (!LN) return false;
    const ids = doors.map((d) => ({ id: 1200 + d.day }));
    try { await LN.cancel({ notifications: ids }); } catch (e) { /* none yet */ }
    if (!on) return true;
    try {
      const p = await LN.requestPermissions();
      if (p && p.display && p.display !== 'granted') return false;
    } catch (e) { return false; }
    const now = new Date();
    const year = now.getMonth() === 11 && now.getDate() > 25 ? now.getFullYear() + 1 : now.getFullYear();
    const list = doors.map((d) => ({
      id: 1200 + d.day,
      title: es ? 'Calendario de Adviento · ' + d.day + ' de diciembre' : 'Advent calendar · December ' + d.day,
      body: (es ? d.title.es : d.title.en) + (es ? '. Hoy se abre una puerta nueva.' : '. Today a new door opens.'),
      schedule: { at: new Date(year, 11, d.day, 8, 0, 0), allowWhileIdle: true },
    })).filter((n) => n.schedule.at > now);
    try { if (list.length) await LN.schedule({ notifications: list }); return true; } catch (e) { return false; }
  };

  // Keep the screen on while an episode is playing or a voice is reading (a phone that dims and locks halfway through a
  // memory, or in the middle of a passage, breaks the scene). Let it sleep again on the map, the timeline, the title.
  // The apps use the KeepAwake plugin; the web uses the Screen Wake Lock (Safari 16.4 and later, Chrome, Edge).
  let lock = null, nativeOn = false, asking = false;
  const wanted = () => {
    if (document.visibilityState !== 'visible') return false;
    const g = TW.game;
    if (g && g.screen === 'scene') return true;
    if (TW.Speech && TW.Speech.busy && TW.Speech.busy()) return true;
    return !!document.querySelector('.verse-game');
  };
  async function hold(on) {
    const K = N.is() && plugin('KeepAwake');
    if (K) {
      if (on === nativeOn) return;
      nativeOn = on;
      try { await (on ? K.keepAwake() : K.allowSleep()); } catch (e) { nativeOn = !on; }
      return;
    }
    if (!('wakeLock' in navigator)) return;
    if (on && !lock && !asking) {
      asking = true;
      try { lock = await navigator.wakeLock.request('screen'); lock.addEventListener('release', () => { lock = null; }); } catch (e) { lock = null; }
      asking = false;
    } else if (!on && lock) { const l = lock; lock = null; try { await l.release(); } catch (e) { /* already gone */ } }
  }
  N.keepAwake = () => hold(wanted());
  setInterval(N.keepAwake, 2000);
  document.addEventListener('visibilitychange', N.keepAwake);
  // a lock asked for without a tap can be refused, so ask again on every tap
  document.addEventListener('pointerup', () => { if (wanted()) hold(true); }, { passive: true });

  // Tips: optional gifts through the App Store or Google Play (consumable in-app products; the @capgo/native-purchases
  // plugin). A tip unlocks nothing. Products that do not exist in the store yet simply come back empty, and then the
  // game shows no tip jar at all.
  const IAP = () => (N.is() ? plugin('NativePurchases') : null);
  let tipCache = null;
  N.tips = async function (ids) {
    if (tipCache) return tipCache;
    const P = IAP(); if (!P || !ids || !ids.length) return (tipCache = []);
    try {
      const ok = await P.isBillingSupported();
      if (ok && ok.isBillingSupported === false) return (tipCache = []);
      const r = await P.getProducts({ productIdentifiers: ids, productType: 'inapp' });
      const list = (r && r.products) || [];
      // keep the order of ids (the stores return them in any order)
      tipCache = ids.map((id) => list.find((p) => p.identifier === id || p.productIdentifier === id)).filter(Boolean)
        .map((p) => ({ id: p.identifier || p.productIdentifier, price: p.priceString || '', value: p.price || 0 }));
    } catch (e) { tipCache = []; }
    return tipCache;
  };
  // resolves true when the tip went through, false when cancelled or failed
  N.tip = async function (id) {
    const P = IAP(); if (!P) return false;
    try {
      const t = await P.purchaseProduct({ productIdentifier: id, productType: 'inapp', quantity: 1, isConsumable: true });
      return !!(t && (t.transactionId || t.purchaseToken || t.productIdentifier));
    } catch (e) { return false; }
  };

  // ---------- keeping your journey safe ----------
  // An app's web storage can be cleared by the phone when space runs low. In the apps, the journey (and your settings)
  // is copied into the app's own preferences as you play; if web storage ever comes back empty, it is put back.
  const KEEP = ['the-way.save.v1', 'the-way.settings', 'the-way.sound', 'the-way.read', 'the-way.voices', 'the-way.recorded'];
  const BACKUP = 'the-way.backup';
  let lastBackup = '';
  N.backup = async function () {
    const P = N.is() && plugin('Preferences'); if (!P) return;
    const o = {};
    try { KEEP.forEach((k) => { const v = localStorage.getItem(k); if (v != null) o[k] = v; }); } catch (e) { return; }
    if (!o['the-way.save.v1']) return;          // never write an empty journey over a good one
    const v = JSON.stringify(o); if (v === lastBackup) return;
    try { await P.set({ key: BACKUP, value: v }); lastBackup = v; } catch (e) { /* try again later */ }
  };
  N.restore = async function () {
    const P = N.is() && plugin('Preferences'); if (!P) return false;
    let have = null; try { have = localStorage.getItem('the-way.save.v1'); } catch (e) { return false; }
    if (have) return false;
    try {
      const r = await P.get({ key: BACKUP }); if (!r || !r.value) return false;
      const o = JSON.parse(r.value); if (!o['the-way.save.v1']) return false;
      Object.keys(o).forEach((k) => localStorage.setItem(k, o[k]));
      location.reload(); return true;
    } catch (e) { return false; }
  };
  if (N.is()) {
    N.restore().then((back) => { if (!back) { N.backup(); setInterval(N.backup, 15000); } });
    document.addEventListener('visibilitychange', () => { if (document.hidden) N.backup(); });
  }

  // ---------- Android's back button ----------
  // Close whatever is open on top, then step back one screen (scene → map → timeline → title); from the title, the app
  // goes to the background, as Android apps do.
  N.back = function () {
    const vis = (e) => e && !e.hidden && e.getClientRects().length > 0;
    const top = [...document.querySelectorAll('.room, .book-view, .tip-jar, .verse-game, #o-voice, .resume-sheet')].filter(vis).pop();   // the last opened is on top
    if (top) {
      const b = top.querySelector('[data-close], .room-close, .vg-close, .book-bar .btn, .tip-head .btn-text, .btn-text');
      if (b) b.click(); else top.remove();
      return true;
    }
    const ov = [...document.querySelectorAll('.overlay')].filter((o) => !o.hidden).pop();
    if (ov) {
      if (ov.id === 'o-advent' && TW.Advent && TW.Advent.close) { TW.Advent.close(); return true; }
      if (ov.id === 'o-study') { const b = [...ov.querySelectorAll('button.btn')].find((x) => /^(Back to|Volver a)/.test(x.textContent)); if (b) { b.click(); return true; } }
      const b = ov.querySelector('[data-close]');
      if (b) { b.click(); return true; }
      if (ov.id === 'o-report') return true;     // a report is finished with its own buttons
      ov.hidden = true; return true;
    }
    const g = TW.game, sc = g && g.screen;
    const click = (q) => { const b = document.querySelector(q); if (b) { b.click(); return true; } return false; };
    if (sc === 'scene') return click('#btn-leave');
    if (sc === 'map') return click('#s-map [data-go="timeline"]');
    if (sc === 'timeline') return click('#s-timeline [data-go="title"]');
    if (sc === 'prologue') { g.show('title'); return true; }
    return false;
  };
  if (N.is() && N.platform() === 'android') {
    const A = plugin('App');
    if (A && A.addListener) A.addListener('backButton', () => { if (!N.back()) { try { A.minimizeApp(); } catch (e) { /* ignore */ } } });
  }

  // ---------- the app's version, for About ----------
  N.version = async function () {
    const A = N.is() && plugin('App'); if (!A) return '';
    try { const i = await A.getInfo(); return i.version + ' (' + i.build + ')'; } catch (e) { return ''; }
  };

  // ---------- sound with the ring/silent switch on ----------
  // Web audio on an iPhone follows the silent switch, so a phone left on silent heard no music. As a game whose voices
  // and music are the point, The Way plays like a video or a podcast app: through the speaker even on silent.
  try { if (navigator.audioSession && N.platform() !== 'android') navigator.audioSession.type = 'playback'; } catch (e) { /* not supported */ }

  // the app's status bar matches the dark frame of the game
  if (N.is()) {
    document.documentElement.classList.add('native', 'native-' + N.platform());
    try { const SB = plugin('StatusBar'); if (SB) { SB.setStyle({ style: 'DARK' }); if (N.platform() === 'android') SB.setBackgroundColor({ color: '#2e2a27' }); } } catch (e) { /* ignore */ }
  }
  TW.Native = N;
})(window.TW);
