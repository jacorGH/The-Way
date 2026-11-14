/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — the few things the store apps (iPhone and Android, built with Capacitor; see app/README.md) do that a web
   page cannot: a light touch of the phone's haptics, the share sheet for files, and Advent reminders.
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

  // the app's status bar matches the dark frame of the game
  if (N.is()) {
    document.documentElement.classList.add('native', 'native-' + N.platform());
    try { const SB = plugin('StatusBar'); if (SB) { SB.setStyle({ style: 'DARK' }); if (N.platform() === 'android') SB.setBackgroundColor({ color: '#2e2a27' }); } } catch (e) { /* ignore */ }
  }
  TW.Native = N;
})(window.TW);
