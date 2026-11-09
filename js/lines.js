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
  L.id = function (kind, text) {
    if (kind === 'scripture') return 's-' + ((TW.Bible && TW.Bible.current()) || 'WEB') + '-' + fnv(String(text));
    return 'd-' + fnv(String(text));
  };
  // record every line shown, for export to voice actors, voice services and translators
  L.note = function (id, o) { if (!L.seen.has(id)) L.seen.set(id, { id, kind: o.kind, speaker: o.speaker || '', ref: o.ref || '', text: o.text }); };
  L.translate = function (id, text) {
    const lang = TW.Settings ? TW.Settings.get('lang') : 'en';
    const t = lang !== 'en' && L.translations[lang] && L.translations[lang][id];
    return t || text;
  };
  L.export = () => JSON.stringify({ game: 'The Way', exported: new Date().toISOString(), lines: Array.from(L.seen.values()) }, null, 1);

  // recorded voices
  const D = { ids: {}, base: 'audio/' };
  D.add = function (lang, ids) { (D.ids[lang] = D.ids[lang] || new Set()); ids.forEach((i) => D.ids[lang].add(i)); };
  D.has = (lang, id) => !!(D.ids[lang] && D.ids[lang].has(id));
  D.url = (lang, id) => D.base + lang + '/' + id + '.mp3';
  TW.Lines = L;
  TW.Dubs = D;
})(window.TW);
