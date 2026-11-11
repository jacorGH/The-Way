/* The Way — Bible versions shipped with the game.
   Any file listed here that exists in this folder is loaded at startup; a missing one is simply skipped.
   To add one: download the version in the game (Settings → Bible translation), open the game with ?dev at the end of
   its address, tap "Save … as a game file", and put the saved file in this folder. Then add its name below if it is
   not already listed. */
(function () {
  var files = ['ASV', 'KJV', 'RV1909', 'RV1858'];
  var base = (document.currentScript && document.currentScript.src) ? document.currentScript.src.replace(/versions\.js(\?.*)?$/, '') : 'bible/';
  for (var i = 0; i < files.length; i++) document.write('<script src="' + base + files[i] + '.js" onerror="this.remove()"><\/script>');
})();
