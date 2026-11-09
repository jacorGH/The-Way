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
    'Test': 'Probar', 'Narrator': 'Narrador', 'Remove': 'Quitar', 'Go': 'Ir', 'Again': 'Otra vez',
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
    },
  };
  TW.I18n = I;
  TW.t = I.t;
})(window.TW);
