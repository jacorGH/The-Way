/* The Way — Bible versions.
   Scripture is stored once, by passage, in the WEB (scripture*.js). Every other version is a plain lookup:
     text[Book][chapter:verse] = 'verse text'
   so any public-domain Bible can be swapped in. A verse a version lacks falls back to the WEB and is marked.
   Versions come from bible/<ID>.js files (TW.Bible.add) or are imported on the device from a text file.
   Accepted formats: eBible.org verse-per-line ("MRK 2:1 ..."), "Book 2:1 ..." in English or Spanish,
   Project Gutenberg numbered text ("Book 41 Mark" then "002:001 ..."), and JSON ({ "Mark": { "2:1": "..." } }). */
window.TW = window.TW || {};
(function (TW) {
  const P = TW.P;
  const B = { versions: {}, lastFallback: false };
  const STORE = 'the-way.bibles';

  // ---------- book names ----------
  const BOOKS = [
    ['GEN', 'Genesis', 'Génesis'], ['EXO', 'Exodus', 'Éxodo'], ['LEV', 'Leviticus', 'Levítico'], ['NUM', 'Numbers', 'Números'],
    ['DEU', 'Deuteronomy', 'Deuteronomio'], ['JOS', 'Joshua', 'Josué'], ['1SA', '1 Samuel', '1 Samuel'], ['2KI', '2 Kings', '2 Reyes'],
    ['PSA', 'Psalms', 'Salmos'], ['ISA', 'Isaiah', 'Isaías'], ['JER', 'Jeremiah', 'Jeremías'], ['DAN', 'Daniel', 'Daniel'],
    ['JOL', 'Joel', 'Joel'], ['AMO', 'Amos', 'Amós'], ['JON', 'Jonah', 'Jonás'], ['HAB', 'Habakkuk', 'Habacuc'],
    ['MAT', 'Matthew', 'Mateo'], ['MRK', 'Mark', 'Marcos'], ['LUK', 'Luke', 'Lucas'], ['JHN', 'John', 'Juan'], ['ACT', 'Acts', 'Hechos'],
    ['ROM', 'Romans', 'Romanos'], ['1CO', '1 Corinthians', '1 Corintios'], ['2CO', '2 Corinthians', '2 Corintios'], ['GAL', 'Galatians', 'Gálatas'],
    ['EPH', 'Ephesians', 'Efesios'], ['PHP', 'Philippians', 'Filipenses'], ['COL', 'Colossians', 'Colosenses'],
    ['1TH', '1 Thessalonians', '1 Tesalonicenses'], ['2TH', '2 Thessalonians', '2 Tesalonicenses'], ['1TI', '1 Timothy', '1 Timoteo'],
    ['2TI', '2 Timothy', '2 Timoteo'], ['TIT', 'Titus', 'Tito'], ['PHM', 'Philemon', 'Filemón'], ['HEB', 'Hebrews', 'Hebreos'],
    ['JAS', 'James', 'Santiago'], ['1PE', '1 Peter', '1 Pedro'], ['2PE', '2 Peter', '2 Pedro'], ['1JN', '1 John', '1 Juan'],
    ['2JN', '2 John', '2 Juan'], ['3JN', '3 John', '3 Juan'], ['JUD', 'Jude', 'Judas'], ['REV', 'Revelation', 'Apocalipsis'],
  ];
  const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.]/g, '').replace(/^(san|s|santo|el|los|la|las|evangelio segun|the gospel according to|the book of|book of)\s+/g, '').replace(/\s+/g, ' ').trim();
  const LOOKUP = {};
  BOOKS.forEach((b) => { [b[0], b[1], b[2]].forEach((n) => { LOOKUP[fold(n)] = b[1]; }); });
  Object.assign(LOOKUP, { mk: 'Mark', mar: 'Mark', mc: 'Mark', mr: 'Mark', lk: 'Luke', luk: 'Luke', lc: 'Luke', jn: 'John', jhn: 'John', joh: 'John', ac: 'Acts', act: 'Acts', hch: 'Acts', hech: 'Acts', mt: 'Matthew', psalm: 'Psalms', salmo: 'Psalms', 'acts of the apostles': 'Acts', 'hechos de los apostoles': 'Acts' });
  B.canon = (name) => LOOKUP[fold(name)] || null;
  const ES = {}; BOOKS.forEach((b) => { ES[b[1]] = b[2]; });

  // ---------- the WEB, indexed from the stored passages ----------
  const WEB = {};
  const put = (book, cv, text) => { (WEB[book] = WEB[book] || {})[cv] = text; };
  Object.keys(P).forEach((key) => {
    const p = P[key];
    if (!p || !p.verses) return;
    const m = (p.ref || '').match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+):/);
    p.bk = p.book || (m && m[1]) || '';
    const chap = m ? m[2] : '1';
    p.cvs = p.verses.map((v) => (String(v[0]).indexOf(':') >= 0 ? String(v[0]) : chap + ':' + v[0]));
    p.verses.forEach((v, i) => put(p.bk, p.cvs[i], v[1]));
  });
  // single verses stored by reference
  Object.keys(P.single || {}).forEach((ref) => {
    const m = ref.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+):(\d+)(?:–(\d+))?$/);
    if (m && !m[4]) put(m[1], m[2] + ':' + m[3], P.single[ref]);
  });
  B.versions.WEB = { id: 'WEB', name: 'World English Bible', short: 'WEB', lang: 'en', license: 'Public domain', builtin: true, text: WEB };

  // ---------- choosing and reading ----------
  B.current = () => { const id = TW.Settings ? TW.Settings.get('bible') : 'WEB'; return B.versions[id] ? id : 'WEB'; };
  B.version = () => B.versions[B.current()];
  B.lang = () => B.version().lang || 'en';
  B.verse = function (book, cv) {
    const v = B.version(), t = v.text[book] && v.text[book][cv];
    if (t) return { text: t, fallback: false };
    return { text: (WEB[book] && WEB[book][cv]) || '', fallback: v.id !== 'WEB' };
  };
  B.bookName = (book) => (B.lang() === 'es' ? ES[book] || book : book);
  // turn "Mark 2:1–12" into "Marcos 2:1–12" when a Spanish version is chosen
  const NAME_RE = new RegExp('\\b(' + BOOKS.map((b) => b[1].replace(/ /g, '\\s')).sort((a, b) => b.length - a.length).join('|') + ')\\b(?=\\s+\\d)', 'g');
  B.localRef = (ref) => (ref && B.lang() === 'es' ? String(ref).replace(NAME_RE, (n) => ES[n.replace(/\s+/g, ' ')] || n) : ref);
  B.needed = () => { const out = []; Object.keys(WEB).forEach((bk) => Object.keys(WEB[bk]).forEach((cv) => out.push([bk, cv]))); return out; };
  B.list = () => Object.values(B.versions);
  B.count = (id) => { const t = (B.versions[id] || {}).text || {}; return Object.values(t).reduce((n, b) => n + Object.keys(b).length, 0); };

  // ---------- the passages now read from the chosen version ----------
  P.vs = function (key, a, b) {
    const p = P[key], list = p.verses;
    const i = list.findIndex((v) => v[0] === String(a));
    const j = list.findIndex((v) => v[0] === String(b === undefined ? a : b));
    let fb = false;
    const out = [];
    for (let k = i; k <= j; k++) { const r = B.verse(p.bk, p.cvs[k]); if (r.fallback) fb = true; out.push(r.text); }
    B.lastFallback = fb;
    return out.join(' ');
  };
  P.verseText = (key, label) => { const p = P[key], k = p.verses.findIndex((v) => v[0] === String(label)); return B.verse(p.bk, p.cvs[k]).text; };
  P.ref = function (key, a, b) {
    const p = P[key], book = B.bookName(p.bk);
    // labels like '5' in older passages become '2:5' using the passage's chapter
    const cv = (x) => { const k = p.verses.findIndex((v) => v[0] === String(x)); return k >= 0 ? p.cvs[k] : String(x); };
    const A = cv(a);
    if (b === undefined || b === a) return book + ' ' + A;
    const Bv = cv(b), ca = A.split(':')[0], cb = Bv.split(':')[0];
    return book + ' ' + A + '–' + (ca === cb ? Bv.split(':')[1] : Bv);
  };
  P.singleText = function (ref) {
    const m = ref.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+):(\d+)(?:–(\d+))?$/);
    if (!m) return P.single[ref] || '';
    const last = m[4] ? +m[4] : +m[3], out = [];
    for (let v = +m[3]; v <= last; v++) out.push(B.verse(m[1], m[2] + ':' + v).text);
    const joined = out.filter(Boolean).join(' ');
    return joined || P.single[ref] || '';
  };

  // ---------- importing ----------
  const cleanVerse = (t) => String(t).replace(/\{[^}]*\}/g, '').replace(/\s+/g, ' ').trim();
  B.parse = function (raw) {
    const out = {};
    const set = (book, c, v, t) => { if (!book || !t) return; (out[book] = out[book] || {})[(+c) + ':' + (+v)] = cleanVerse(t); };
    const text = String(raw).replace(/^\uFEFF/, '');
    if (/^\s*[[{]/.test(text)) {
      const j = JSON.parse(text);
      if (Array.isArray(j)) j.forEach((r) => set(B.canon(r.book || r.b || r.book_name), r.chapter || r.c, r.verse || r.v, r.text || r.t));
      else Object.keys(j).forEach((bk) => {
        const book = B.canon(bk), val = j[bk];
        Object.keys(val).forEach((k) => {
          if (typeof val[k] === 'string') { const m = k.match(/^(\d+):(\d+)$/); if (m) set(book, m[1], m[2], val[k]); }
          else Object.keys(val[k]).forEach((v) => set(book, k, v, val[k][v]));
        });
      });
      return out;
    }
    let cur = null;
    text.split(/\r?\n/).forEach((line) => {
      const l = line.trim();
      if (!l) return;
      let m = l.match(/^#?\s*Book\s+\d+\s+(.+)$/i) || l.match(/^#?\s*Libro\s+\d+\s+(.+)$/i);
      if (m && B.canon(m[1])) { cur = B.canon(m[1]); return; }
      m = l.match(/^([1-3]?\s?[A-Za-zÁÉÍÓÚÑáéíóúñü.]+(?:\s+(?:de\s+los\s+)?[A-Za-zÁÉÍÓÚÑáéíóúñü.]+)?)\s+(\d+):(\d+)\s+(.+)$/);
      if (m && B.canon(m[1])) { set(B.canon(m[1]), m[2], m[3], m[4]); return; }
      m = l.match(/^(\d{1,3}):(\d{1,3})\s+(.+)$/);
      if (m && cur) { set(cur, m[1], m[2], m[3]); return; }
      // Gutenberg sometimes runs many verses together on one line: "002:001 ... 002:002 ..."
      if (cur && /\d{3}:\d{3}\s/.test(l)) l.split(/(?=\b\d{3}:\d{3}\s)/).forEach((seg) => { const s = seg.match(/^(\d{3}):(\d{3})\s+(.+)$/); if (s) set(cur, s[1], s[2], s[3]); });
    });
    return out;
  };
  // keep only the verses this game uses
  B.filter = function (all) {
    const t = {};
    let n = 0;
    B.needed().forEach(([bk, cv]) => { const x = all[bk] && all[bk][cv]; if (x) { (t[bk] = t[bk] || {})[cv] = x; n++; } });
    return { text: t, matched: n, needed: B.needed().length };
  };
  const saveStore = () => {
    const keep = {};
    B.list().filter((v) => v.imported).forEach((v) => { keep[v.id] = v; });
    try { localStorage.setItem(STORE, JSON.stringify(keep)); return true; } catch (e) { return false; }
  };
  B.add = function (v) { if (!v || !v.id || !v.text) return; B.versions[v.id] = Object.assign({ lang: 'en', license: '' }, v); };
  B.importText = function (raw, meta) {
    const f = B.filter(B.parse(raw));
    if (!f.matched) return { ok: false, matched: 0, needed: f.needed };
    const id = String(meta.short || meta.name || 'BIBLE').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10) || 'BIBLE';
    B.add({ id, name: meta.name || id, short: meta.short || id, lang: meta.lang || 'en', license: meta.license || 'Public domain', imported: true, text: f.text });
    const stored = saveStore();
    return { ok: true, id, matched: f.matched, needed: f.needed, stored };
  };
  B.remove = function (id) { if (B.versions[id] && !B.versions[id].builtin) { delete B.versions[id]; saveStore(); if (B.current() === id && TW.Settings) TW.Settings.set('bible', 'WEB'); } };
  try { Object.values(JSON.parse(localStorage.getItem(STORE) || '{}')).forEach((v) => B.add(v)); } catch (e) { /* storage unavailable */ }

  TW.Bible = B;
})(window.TW);
