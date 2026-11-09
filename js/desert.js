/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — Episode XIX: The Desert Road (Acts 8:26–40). */
window.TW = window.TW || {};
(function (TW) {
  const SC = TW.Scene, K = TW.Kit, P = TW.P, AU = () => TW.Audio;
  const R = K.R;
  const EP = { id: 'desert' };
  const s8 = (a, b) => SC.say({ kind: 'scripture', ref: P.ref('acts8', a, b), text: P.vs('acts8', a, b) });

  EP.run = async function (game) {
    const P0 = K.sprites();
    const st = { width: 400, flash: 0, audio: { music: 'land', amb: { wind: 0.6, birds: 0.15 } },
      bg(ctx, t, cam) { ctx.drawImage(K.desertArt(), -cam, 0); },
      fx(fc, k) {
        fc.globalCompositeOperation = 'lighter';
        const g = fc.createLinearGradient(0, 0, 0, 160 * k);
        g.addColorStop(0, 'rgba(255,220,160,0.12)'); g.addColorStop(1, 'rgba(255,220,160,0)');
        fc.fillStyle = g; fc.fillRect(0, 0, 256 * k, 160 * k);
        fc.globalCompositeOperation = 'source-over';
        if (st.flash > 0) { fc.fillStyle = 'rgba(255,252,240,' + st.flash + ')'; fc.fillRect(0, 0, 256 * k, 160 * k); }
      } };
    SC.load(st); SC.cam = 0; SC.camGoal = 0;
    const philip = SC.add({ frames: K.who('philip'), x: 40, y: 146, facing: 1, speed: 20 });
    const me = SC.add({ id: 'player', frames: P0.player, x: 22, y: 147, facing: 1, speed: 20 });
    await SC.say({ kind: 'drama', text: 'Philip woke you before dawn. He said an angel had spoken to him, and that you were to go south. You saw no angel. You went anyway.' });
    await s8('8:26', '8:26');
    SC.walk(me, 86);
    await SC.walk(philip, 104);
    // the carriage overtakes them
    const car = K.carriage(-60, 141, K.who('eunuch'));
    car.reader = true;
    car.speed = 9;
    SC.walk(car, 150);
    await s8('8:27', '8:28');
    await SC.say({ kind: 'drama', text: 'As it passes, you hear the man inside reading aloud in Greek, slowly, the way people read words they do not understand.' });
    await s8('8:29', '8:29');
    philip.speed = 46;
    await SC.walk(philip, 196);
    philip.facing = -1;
    car.target = null; car.moving = false;
    await s8('8:30', '8:31');
    philip.visible = false;
    car.rider2 = (K.who('philip').sit || K.who('philip').stand).r;
    await s8('8:32', '8:33');
    await SC.say({ kind: 'drama', text: 'You know those words; every scribe does. You have never heard them since you stood outside the city gate and watched a man led out to die.' });
    await s8('8:34', '8:35');
    game.observe('desert', 'isaiah', 'The Ethiopian was reading Isaiah: “He was led as a sheep to the slaughter.” Philip began there and preached Jesus (Acts 8:32–35).', false, true);

    // the water
    SC.camGoal = 144;
    car.speed = 9;
    SC.walk(me, 268);
    await SC.walk(car, 276);
    car.target = null; car.moving = false;
    await s8('8:36', '8:36');
    await SC.say({ kind: 'drama', speaker: 'The official', text: 'You are a scribe from Jerusalem. They turned me away from the inner courts. Tell me honestly: what is keeping me?' });
    const heart = await SC.choose('He is asking you.', [
      '“Nothing.”',
      'Think of the Law that keeps men like him from the assembly, and say nothing.',
      'Remember Isaiah’s promise to the eunuch who holds fast to the covenant.',
    ]);
    game.setHeart('desert', heart);
    if (heart === 1) await SC.say({ kind: 'drama', text: 'You say nothing. Philip answers for you, and you are ashamed of your silence.' });
    else if (heart === 2) await SC.say({ kind: 'drama', text: 'You tell him what Isaiah promised: that God will give eunuchs who keep his covenant a place in his house, and a name better than sons and daughters. His eyes fill.' });
    else await SC.say({ kind: 'drama', text: '“Nothing,” you say, and you are surprised how certain you are.' });
    car.rider2 = null;
    const eun = SC.add({ frames: K.who('eunuch'), x: 290, y: 140, facing: 1, speed: 16 });
    const ph = SC.add({ frames: K.who('philip'), x: 300, y: 140, facing: -1, speed: 16 });
    car.rider = null;
    await Promise.all([SC.walk(eun, 314, 138), SC.walk(ph, 330, 138)]);
    eun.pose = 'sit';
    AU() && (AU().sfx('splash'), AU().music('wonder'));
    SC.dust(316, 134, 8, { up: true, spread: 6, color: '#d8ecec' });
    await s8('8:38', '8:38');
    eun.pose = 'raise';
    await SC.wait(600);
    await SC.tween(700, (p) => { st.flash = p * 0.9; });
    ph.visible = false;
    await SC.tween(900, (p) => { st.flash = 0.9 * (1 - p); });
    await s8('8:39', '8:39');
    game.observe('desert', 'baptized', 'The Ethiopian official was baptized, Philip was caught away, and he went on his way rejoicing (Acts 8:38–39).', false, true);
    eun.pose = 'stand';
    await SC.walk(eun, 284, 141);
    car.rider = (K.who('eunuch').sit || K.who('eunuch').stand).r;
    eun.visible = false;
    car.speed = 12;
    SC.walk(car, 470);
    await SC.say({ kind: 'drama', text: 'He waves until the carriage is out of sight, singing something in a language you do not know. You are alone on the road with the wind.' });
    await s8('8:40', '8:40');
    await SC.say({ kind: 'drama', text: 'Two days later you find Philip in Azotus, preaching in the market as if nothing had happened. He says news has come from Jerusalem: Saul has letters from the high priest, and he is going to Damascus.' });
    game.addQuestion(TW.D.episodes.desert.question);
    SC.toast('A question is now open in your scroll');
    K.finish(game, 'desert', 'Write it down before the wind takes it.');
    void R;
  };

  TW.Episodes = TW.Episodes || {};
  TW.Episodes.desert = EP;
})(window.TW);
