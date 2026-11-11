/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — interface language. t('English text') returns the current language's version, or the English.
   Static labels in index.html carry data-i18n; they are translated whenever the language changes. */
window.TW = window.TW || {};
(function (TW) {
  const ES = {
    'Begin the journey': 'Comenzar el viaje', 'Continue the journey': 'Continuar el viaje', 'Continue': 'Continuar',
    'Your name': 'Tu nombre', 'Sound on': 'Sonido activado', 'Sound off': 'Sonido desactivado',
    'Read aloud on': 'Lectura en voz alta activada', 'Read aloud off': 'Lectura en voz alta desactivada',
    'Your scroll': 'Tu rollo', 'Close': 'Cerrar', 'Observations': 'Observaciones', 'Testimonies': 'Testimonios',
    'Service': 'Servicio', 'Reports': 'Informes', 'Letters': 'Cartas', 'Questions': 'Preguntas', 'Settings': 'Ajustes',
    'Map': 'Mapa', 'Scroll': 'Rollo', 'Timeline': 'Cronología', 'Galilee': 'Galilea', 'The Land': 'La Tierra',
    'Jerusalem': 'Jerusalén', 'The East': 'El Oriente', 'Back to the map': 'Volver al mapa',
    'An Eyewitness Account': 'Relato de un testigo', 'a young scribe': 'un joven escriba', 'Nicodemus’s niece': 'sobrina de Nicodemo',
    'two accounts': 'dos relatos', 'Both': 'Ambos',
    'Walk through the Gospels and the early church as one who was not yet convinced.': 'Recorre los Evangelios y la iglesia primitiva como alguien que aún no estaba convencido.',
    'Scripture quotations are from the World English Bible, which is in the public domain.': 'Las citas bíblicas provienen de la versión elegida en Ajustes. La World English Bible y la Reina-Valera 1909 son de dominio público.',
    'Seal the report': 'Sellar el informe', 'Seal the letter': 'Sellar la carta', 'What you saw': 'Lo que viste', 'What you conclude': 'Lo que concluyes',
    'Scripture': 'Escritura', 'Dramatization': 'Dramatización', 'History': 'Historia', 'What to do': 'Qué hacer',
    'Reading': 'Lectura', 'Text size': 'Tamaño del texto', 'Text speed': 'Velocidad del texto', 'Small': 'Pequeño', 'Medium': 'Mediano',
    'Large': 'Grande', 'Extra large': 'Muy grande', 'Slow': 'Lenta', 'Normal': 'Normal', 'Fast': 'Rápida', 'Instant': 'Instantánea',
    'Move on by itself after each line': 'Avanzar solo después de cada línea', 'Let me select dialog text (for Speak Selection)': 'Permitir seleccionar el texto (para Leer selección)',
    'Comfort': 'Comodidad', 'Reduce motion': 'Reducir movimiento', 'Higher contrast': 'Más contraste',
    'Language': 'Idioma', 'Bible translation': 'Traducción de la Biblia', 'Voices': 'Voces', 'Your progress': 'Tu progreso',
    'Back up progress': 'Guardar copia del progreso', 'Restore progress': 'Restaurar progreso', 'Add a Bible translation': 'Añadir una traducción de la Biblia',
    'The Way': 'El Camino', 'Title': 'Inicio', 'Open the timeline': 'Abrir la cronología', 'Tap a place. Drag to look around.': 'Toca un lugar. Arrastra para mirar alrededor.',
    'Aegean': 'Egeo', 'Rome': 'Roma', 'Capernaum': 'Capernaúm', 'Report to Nicodemus': 'Informe para Nicodemo', 'Letter to Nicodemus': 'Carta a Nicodemo',
    'Letter to uncle Nicodemus': 'Carta al tío Nicodemo', 'Choose what goes in your report.': 'Elige lo que va en tu informe.', 'Choose what goes in your letter.': 'Elige lo que va en tu carta.',
    'Your report is sealed. Now read the passage.': 'Tu informe está sellado. Ahora lee el pasaje.', 'Your letter is sealed. Now read the passage.': 'Tu carta está sellada. Ahora lee el pasaje.',
    'Your heart': 'Tu corazón', 'Added to your scroll': 'Añadido a tu rollo', 'A question in your scroll is answered': 'Una pregunta de tu rollo ha sido respondida',
    'Whose account?': '¿El relato de quién?', 'Study notes': 'Notas de estudio', 'To reflect on': 'Para reflexionar', 'Back to the timeline': 'Volver a la cronología',
    'Recorded voices': 'Voces grabadas', 'Play recorded voices when available': 'Usar voces grabadas cuando las haya', 
    'Test': 'Probar', 'About and license': 'Acerca de y licencia', 'Narrator': 'Narrador', 'Remove': 'Quitar', 'Go': 'Ir', 'Again': 'Otra vez',
  };
  const DICT = { es: ES };
  const I = {
    lang: () => (TW.Settings ? TW.Settings.get('lang') : 'en'),
    t(en) { const d = DICT[I.lang()]; return (d && d[en]) || en; },
    add(lang, map) { DICT[lang] = Object.assign(DICT[lang] || {}, map); },
    // translate static labels marked with data-i18n (the English is kept in data-en)
    apply(root) {
      (root || document).querySelectorAll('[data-i18n]').forEach((n) => {
        if (!n.dataset.en) n.dataset.en = n.textContent.trim();
        n.textContent = I.t(n.dataset.en);
      });
      if (!root) I.sweep();
    },
  };
  // Sweep: when the language is not English, translate any text node whose whole text is a known line.
  // The English is remembered so that switching back restores it.
  const original = new WeakMap();
  function visit(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      if (node.parentElement && node.parentElement.closest && node.parentElement.closest('.passage, .kind-scripture, .verse')) return;
      const raw = node.nodeValue, key = raw.trim();
      if (!key || key.length > 600) return;
      const en = original.has(node) && original.get(node).shown === raw ? original.get(node).en : key;
      const tr = TW.tr ? TW.tr(en) : en;
      if (tr !== key) { const out = raw.replace(key, tr); original.set(node, { en: en, shown: out }); node.nodeValue = out; }
      return;
    }
    if (node.nodeType !== 1 || /^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION|CANVAS)$/.test(node.tagName)) return;
    // Scripture is never translated here: it comes from the chosen Bible version
    if (node.classList && (node.classList.contains('passage') || node.classList.contains('kind-scripture') || node.classList.contains('verse'))) return;
    for (let c = node.firstChild; c; c = c.nextSibling) visit(c);
  }
  let watcher = null;
  I.sweep = function () {
    if (typeof MutationObserver === 'undefined' || !document.body) return;
    if (!watcher) {
      watcher = new MutationObserver((list) => { if (I.lang() === 'en') return; list.forEach((m) => { if (m.type === 'characterData') visit(m.target); else m.addedNodes.forEach(visit); }); });
      watcher.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
    visit(document.body);
  };
  TW.I18n = I;
  TW.t = I.t;
})(window.TW);
