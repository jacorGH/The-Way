/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — permanent line IDs, translations by ID, and recorded voices (dubs).
   A line's ID comes from its kind and its exact words, so it never needs hand-numbering. If the words change, the ID
   changes, so an old recording or translation is never played over new text by mistake.
     drama/history/answer lines:  d-xxxxxxxx    Scripture: s-<VERSION>-xxxxxxxx
   Recorded voices: audio/<lang>/<id>.mp3, listed in audio/manifest.js (TW.Dubs.add([...ids])).
   Translations: TW.Lines.translations.es[id] = 'texto' (see i18n/es-lines.js). Missing ones fall back to English. */
window.TW = window.TW || {};
(function (TW) {
  const fnv = (str) => { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return ('0000000' + h.toString(16)).slice(-8); };
  const L = { seen: new Map(), translations: { es: {} } };
  // lines seen are remembered on the device, grouped by episode, for recording and translating
  const SEEN = 'the-way.lines';
  try { (JSON.parse(localStorage.getItem(SEEN) || '[]')).forEach((r) => L.seen.set(r.id, r)); } catch (e) { /* storage unavailable */ }
  let saveT = null;
  const saveSeen = () => { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(SEEN, JSON.stringify(Array.from(L.seen.values()))); } catch (e) { /* full: keep in memory */ } }, 800); };
  L.id = function (kind, text) {
    if (kind === 'scripture') return 's-' + ((TW.Bible && TW.Bible.current()) || 'WEB') + '-' + fnv(String(text));
    return 'd-' + fnv(String(text));
  };
  // record every line shown, for export to voice actors, voice services and translators
  L.note = function (id, o) {
    if (L.seen.has(id)) return;
    const ep = (TW.game && TW.game.current) || '';
    const role = TW.Role && TW.Role.is && TW.Role.is() ? 'niece' : 'scribe';
    L.seen.set(id, { id, kind: o.kind, speaker: o.speaker || '', ref: o.ref || '', text: o.text, ep, role, n: L.seen.size });
    saveSeen();
  };
  // A translation may be { m: '…', f: '…' } where the language marks gender and English does not:
  // m for Eleazar's account, f for Elisheva's.
  const pickForm = (t) => (t && typeof t === 'object' ? ((TW.Role && TW.Role.is && TW.Role.is()) ? t.f : t.m) || t.m || t.f : t);
  L.translate = function (id, text) {
    const lang = TW.Settings ? TW.Settings.get('lang') : 'en';
    const t = lang !== 'en' && L.translations[lang] && L.translations[lang][id];
    return pickForm(t) || text;
  };
  // Translate any displayed text: by line ID first, then the interface dictionary; otherwise unchanged.
  TW.tr = function (text) {
    if (typeof text !== 'string' || !text) return text;
    const lang = TW.Settings ? TW.Settings.get('lang') : 'en';
    if (lang === 'en') return text;
    const t = pickForm(L.translations[lang] && L.translations[lang][L.id('data', text)]);
    if (t) return t;
    return TW.t ? TW.t(text) : text;
  };
  L.export = () => JSON.stringify({ game: 'The Way', exported: new Date().toISOString(), lines: Array.from(L.seen.values()) }, null, 1);

  // recorded voices
  // TW.Dubs.add('en', ['d-1a2b3c4d', ...], 'm4a')  (iPhone Shortcuts makes .m4a; voice services usually make .mp3)
  const D = { ids: {}, ext: {}, base: 'audio/' };
  D.add = function (lang, ids, ext) { (D.ids[lang] = D.ids[lang] || new Set()); ids.forEach((i) => { D.ids[lang].add(i); D.ext[lang + ':' + i] = ext || 'mp3'; }); };
  D.has = (lang, id) => !!(D.ids[lang] && D.ids[lang].has(id));
  // Files named by the TTS Studio: characters other than letters, digits, dot, dash and underscore become '_'.
  // A line translated with two forms ({ m, f }) has a second recording, <id>-f, read when Elisheva tells the story.
  const fem = (lang, id) => { const t = L.translations[lang] && L.translations[lang][id]; return t && typeof t === 'object' && TW.Role && TW.Role.is && TW.Role.is(); };
  D.url = (lang, id) => D.base + lang + '/' + String(id).replace(/[^a-zA-Z0-9._-]/g, '_') + (fem(lang, id) ? '-f' : '') + '.' + (D.ext[lang + ':' + id] || D.defaultExt || 'mp3');
  // ---------- Dub Studio helpers ----------
  // voice tags: N narrator (Eleazar's account), W narrator (Elisheva's), S Scripture, M a man speaking, F a woman speaking
  const WOMEN = /mary|martha|rhoda|widow|woman|mother|elisheva|lydia|tabitha|maid|wife|daughter|miriam|hannah|salome|joanna|damaris|priscilla/i;
  L.tag = (r) => (r.kind === 'scripture' ? 'S' : r.speaker ? (WOMEN.test(r.speaker) ? 'F' : 'M') : r.role === 'niece' ? 'W' : 'N');
  const REC = 'the-way.recorded';
  let rec = {};
  try { rec = JSON.parse(localStorage.getItem(REC) || '{}'); } catch (e) { rec = {}; }
  const saveRec = () => { try { localStorage.setItem(REC, JSON.stringify(rec)); } catch (e) { /* ignore */ } };
  L.recorded = (lang) => new Set(rec[lang] || []);
  L.markRecorded = (lang, ids) => { const set = L.recorded(lang); ids.forEach((i) => set.add(i)); rec[lang] = Array.from(set); saveRec(); };
  L.unmark = (lang) => { rec[lang] = []; saveRec(); };
  L.groups = function () {
    const g = {};
    Array.from(L.seen.values()).forEach((r) => { if (r.kind === 'goal') return; (g[r.ep || 'other'] = g[r.ep || 'other'] || []).push(r); });
    Object.values(g).forEach((list) => list.sort((a, b) => (a.n || 0) - (b.n || 0)));
    return g;
  };
  const one = (t) => String(t).replace(/\s*\n+\s*/g, ' ').replace(/\|/g, '/').trim();
  L.batch = function (ep, size, lang, tag) {
    const done = L.recorded(lang), list = (L.groups()[ep] || []).filter((r) => !done.has(r.id) && !TW.Dubs.has(lang, r.id) && (!tag || L.tag(r) === tag)).slice(0, size);
    return { ids: list.map((r) => r.id), text: list.map((r) => r.id + '|' + L.tag(r) + '|' + one(r.text)).join('\n'), lines: list };
  };
  L.manifest = (lang, ext) => "TW.Dubs.add('" + lang + "', " + JSON.stringify(Array.from(L.recorded(lang))) + ", '" + (ext || 'm4a') + "');";
  TW.Lines = L;
  TW.Dubs = D;
})(window.TW);
