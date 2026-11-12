/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — hands-on moments: a few seconds where the player does what someone in the story did with their hands
   (wind the linen, hold the lamp, unroll the scroll…). Each step is one tap. Remembered in the save. */
window.TW = window.TW || {};
(function (TW) {
  const H = {};
  H.moment = async function (ep, key, label, steps, onStep) {
    for (let i = 0; i < steps.length; i++) {
      await TW.Scene.prompt(steps[i], label, 'script');
      if (onStep) { try { await onStep(i); } catch (e) { /* keep going */ } }
    }
    const s = TW.game && TW.game.save;
    if (s) { s.hands = s.hands || {}; s.hands[ep + ':' + key] = true; }
  };
  H.count = () => Object.keys((TW.game && TW.game.save && TW.game.save.hands) || {}).length;
  TW.Hands = H;
})(window.TW);
