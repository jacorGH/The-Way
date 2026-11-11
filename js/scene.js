/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — scene engine: low-res pixel stage + full-res light layer + dialogue */
window.TW = window.TW || {};
(function (TW) {
  const U = TW.U;
  const SC = { W: 256, H: 160, ents: [], parts: [], motes: [], cam: 0, camGoal: null, mode: 'script', t: 0, session: 0 };
  // Each episode run gets a session; leaving the scene orphans any pending steps of the old run.
  SC.begin = () => ++SC.session;
  const guard = (fn) => function () {
    const s = SC.session;
    const p = fn.apply(null, arguments);
    return new Promise((res) => p.then((v) => { if (s === SC.session) res(v); }));
  };

  SC.init = function (els) {
    SC.el = els;
    SC.pix = els.pix; SC.px = SC.pix.getContext('2d');
    SC.pix.width = SC.W; SC.pix.height = SC.H;
    SC.fx = els.fx; SC.fc = SC.fx.getContext('2d');
    if (SC.bound) return;
    SC.bound = true;
    els.fx.addEventListener('pointerup', onStageTap);
    els.dialog.addEventListener('click', onDialogTap);
    els.dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onDialogTap(e); }
    });
    window.addEventListener('resize', () => { if (SC.running) sizeFx(); });
  };

  function sizeFx() {
    const r = SC.fx.getBoundingClientRect();
    SC.dpr = Math.min(window.devicePixelRatio || 1, 3);
    SC.fx.width = Math.round(r.width * SC.dpr);
    SC.fx.height = Math.round(r.height * SC.dpr);
    SC.k = SC.fx.width / SC.W;
  }

  SC.load = function (stage) {
    SC.stage = stage;
    if (stage.audio && TW.Audio) TW.Audio.scene(stage.audio);
    SC.ents = []; SC.parts = []; SC.motes = [];
    SC.cam = 0; SC.camGoal = null; SC.player = null;
    SC.mode = 'script';
  };

  SC.add = function (e) {
    e = Object.assign({ x: 0, y: 140, facing: 1, pose: 'stand', speed: 42, hop: 0, step: 0, visible: true, par: 1 }, e);
    SC.ents.push(e);
    return e;
  };
  SC.get = (id) => SC.ents.find((e) => e.id === id);
  SC.remove = (id) => { SC.ents = SC.ents.filter((e) => e.id !== id); };

  SC.start = function () {
    sizeFx();
    SC.running = true;
    let last = performance.now();
    const loop = (now) => {
      if (!SC.running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt);
      draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };
  SC.stop = () => { SC.running = false; };

  // ---------- movement ----------
  SC.walk = function (e, x, y) {
    return new Promise((res) => {
      e.target = { x: x, y: y === undefined ? e.y : y };
      e.onArrive = res;
    });
  };
  SC.walkPath = async function (e, pts) {
    for (const p of pts) await SC.walk(e, p[0], p[1]);
  };

  function update(dt) {
    SC.t += dt;
    if (SC.shakeT > 0) SC.shakeT -= dt;
    SC.ents.forEach((e) => {
      if (e.target) {
        const dx = e.target.x - e.x, dy = e.target.y - e.y;
        const d = Math.hypot(dx, dy);
        const step = e.speed * dt * (U.reducedMotion() ? 2 : 1);
        if (Math.abs(dx) > 0.5) e.facing = dx < 0 ? -1 : 1;
        if (d <= step) {
          e.x = e.target.x; e.y = e.target.y; e.target = null; e.moving = false;
          const cb = e.onArrive; e.onArrive = null; cb && cb();
        } else {
          e.x += (dx / d) * step; e.y += (dy / d) * step; e.moving = true; e.step += step;
        }
      }
      if (e.hopping) e.hop = -Math.abs(Math.sin(SC.t * 7 + e.x)) * 3;
      else e.hop = 0;
    });
    // camera
    const worldW = SC.stage.width || SC.W;
    let goal = SC.camGoal !== null ? SC.camGoal : SC.player ? SC.player.x - SC.W / 2 : SC.cam;
    goal = U.clamp(goal, 0, worldW - SC.W);
    SC.cam += (goal - SC.cam) * (1 - Math.pow(0.004, dt));
    if (Math.abs(goal - SC.cam) < 0.2) SC.cam = goal;
    // pixel particles
    SC.parts.forEach((p) => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += (p.g || 0) * dt; p.life -= dt; });
    SC.parts = SC.parts.filter((p) => p.life > 0);
    SC.stage.update && SC.stage.update(dt, SC);
  }

  SC.dust = function (x, y, n, opts) {
    opts = opts || {};
    for (let i = 0; i < n; i++)
      SC.parts.push({
        x: x + (Math.random() - 0.5) * (opts.spread || 10), y: y,
        vx: (Math.random() - 0.5) * 8, vy: opts.up ? -10 - Math.random() * 14 : 6 + Math.random() * 14,
        g: opts.up ? 4 : 30, life: 0.8 + Math.random() * 1.2,
        c: opts.color || (Math.random() < 0.5 ? '#8a7356' : '#a89070'),
      });
  };

  // ---------- drawing ----------
  function frameFor(e) {
    if (!e.frames) return null;
    let pose = e.pose;
    if (e.moving && (pose === 'stand' || pose === 'walk1' || pose === 'walk2')) {
      const cyc = ['walk1', 'stand', 'walk2', 'stand'];
      pose = cyc[Math.floor(e.step / 4) % 4];
    }
    const f = e.frames[pose] || e.frames.stand;
    return e.facing < 0 ? f.l : f.r;
  }

  SC.shake = function (ms) { if (U.reducedMotion()) return; SC.shakeT = (ms || 800) / 1000; };
  function draw() {
    const ctx = SC.px, cam = Math.round(SC.cam + (SC.shakeT > 0 ? (Math.random() - 0.5) * 5 : 0));
    ctx.imageSmoothingEnabled = false;
    SC.stage.bg(ctx, SC.t, cam, SC);
    const list = SC.ents.filter((e) => e.visible).sort((a, b) => (a.z || a.y) - (b.z || b.y));
    list.forEach((e) => {
      const sx = Math.round(e.x - cam * e.par), sy = Math.round(e.y + e.hop);
      if (e.draw) { e.draw(ctx, sx, sy, SC.t, e); return; }
      const f = frameFor(e);
      if (!f) return;
      const bob = e.moving && e.pose === 'carry' ? (Math.floor(e.step / 4) % 2) : 0;
      ctx.drawImage(f, sx - (f.width >> 1), sy - f.height + 1 + bob);
    });
    SC.parts.forEach((p) => {
      ctx.fillStyle = p.c;
      ctx.fillRect(Math.round(p.x - cam), Math.round(p.y), 1, 1);
    });
    SC.stage.fg && SC.stage.fg(ctx, SC.t, cam, SC);

    // light layer
    const fc = SC.fc, k = SC.k;
    fc.setTransform(1, 0, 0, 1, 0, 0);
    fc.clearRect(0, 0, SC.fx.width, SC.fx.height);
    SC.stage.fx && SC.stage.fx(fc, k, SC.t, cam, SC);
    const w = SC.fx.width, h = SC.fx.height;
    const g = fc.createRadialGradient(w / 2, h * 0.55, h * 0.3, w / 2, h * 0.55, w * 0.75);
    g.addColorStop(0, 'rgba(18,10,4,0)');
    g.addColorStop(1, 'rgba(18,10,4,0.5)');
    fc.globalCompositeOperation = 'source-over';
    fc.fillStyle = g;
    fc.fillRect(0, 0, w, h);
  }

  // ---------- input ----------
  function stagePoint(ev) {
    const r = SC.fx.getBoundingClientRect();
    const x = ((ev.clientX - r.left) / r.width) * SC.W;
    const y = ((ev.clientY - r.top) / r.height) * SC.H;
    return { sx: x, sy: y, wx: x + SC.cam, wy: y };
  }

  function onStageTap(ev) {
    const p = stagePoint(ev);
    if (SC.mode === 'script') { onDialogTap(ev); return; }
    const spots = (SC.stage.hotspots || []).filter((h) => h.active === undefined || h.active());
    if (SC.mode === 'observe') {
      const hs = spots.find((h) => p.wx >= h.x0 && p.wx <= h.x1 && p.wy >= h.y0 && p.wy <= h.y1);
      if (hs) hs.onTap(hs);
      return;
    }
    if (SC.mode !== 'free' || !SC.player || SC.busy) return;
    const hit = SC.ents
      .filter((e) => e.visible && e.onTap && e !== SC.player)
      .find((e) => p.wx >= e.x - 9 && p.wx <= e.x + 9 && p.wy >= e.y - 26 && p.wy <= e.y + 2);
    const hs = spots.find((h) => p.wx >= h.x0 && p.wx <= h.x1 && p.wy >= h.y0 && p.wy <= h.y1);
    const go = async (tx, cb) => {
      SC.busy = true;
      await SC.walk(SC.player, tx);
      SC.busy = false;
      cb && cb();
    };
    if (hit) {
      const side = SC.player.x < hit.x ? -1 : 1;
      go(hit.x + side * 14, () => {
        SC.player.facing = hit.x < SC.player.x ? -1 : 1;
        hit.onTap(hit);
      });
    } else if (hs) {
      go(hs.walkX !== undefined ? hs.walkX : (hs.x0 + hs.x1) / 2, () => hs.onTap(hs));
    } else {
      const lim = SC.stage.walkLimits || [8, (SC.stage.width || SC.W) - 8];
      go(U.clamp(p.wx, lim[0], lim[1]));
    }
  }

  // ---------- dialogue ----------
  const T = (x) => (TW.t ? TW.t(x) : x);
  const LABELS = {
    scripture: (r) => T('Scripture') + ', ' + r,
    drama: () => T('Dramatization'),
    history: () => T('History'),
    observe: () => T('Added to your scroll'),
    goal: () => T('What to do'),
    answer: () => T('A question in your scroll is answered'),
  };
  let pending = null, typing = null;

  const G = (x) => (TW.Role ? TW.Role.G(x) : x);
  SC.say = function (o) {
    if (o && o.kind !== 'scripture') o = Object.assign({}, o, { text: G(o.text), speaker: G(o.speaker) });
    // Scripture references follow the chosen Bible's language; a verse that version lacks is shown from the WEB, marked
    if (o && o.kind === 'scripture' && TW.Bible) { o = Object.assign({}, o, { ref: TW.Bible.localRef(o.ref) + (TW.Bible.lastFallback ? ' · WEB' : '') }); TW.Bible.lastFallback = false; }
    // every line has a permanent ID (see lines.js): used for translations and recorded voices
    const lineId = TW.Lines ? TW.Lines.id(o.kind, o.text) : null;
    if (lineId) {
      TW.Lines.note(lineId, o);
      if (o.kind !== 'scripture') o = Object.assign({}, o, { text: TW.Lines.translate(lineId, o.text), speaker: o.speaker ? T(o.speaker) : o.speaker });
    }
    if (TW.Speech && o && o.kind !== 'goal') TW.Speech.say(o.kind, o.text, o.speaker, lineId);
    const el = SC.el;
    SC.mode = 'script';
    el.dialog.className = 'dialog kind-' + o.kind;
    el.dialog.dataset.line = lineId || '';
    el.label.textContent = LABELS[o.kind](o.ref || '');
    el.speaker.textContent = o.speaker || '';
    el.speaker.hidden = !o.speaker;
    el.choices.innerHTML = '';
    el.next.hidden = true;
    const full = o.text;
    return new Promise((res) => {
      const finish = () => {
        clearInterval(typing); typing = null;
        el.text.textContent = full;
        el.next.hidden = false;
        const mine = () => { pending = null; TW.Audio && TW.Audio.sfx('page'); TW.Speech && TW.Speech.stop(); res(); };
        pending = mine;
        // auto-advance: after the voice finishes, or after time enough to read the line
        if (TW.Settings && TW.Settings.get('autoAdvance')) {
          const go = () => { if (pending === mine) mine(); };
          if (TW.Speech && TW.Speech.on && TW.Speech.busy()) TW.Speech.whenDone(() => setTimeout(go, 700));
          else setTimeout(go, Math.max(1800, full.length * 45));
        }
      };
      const delay = TW.Settings ? TW.Settings.typeDelay() : 22;
      if (U.reducedMotion() || !delay) { finish(); return; }
      let i = 0;
      el.text.textContent = '';
      clearInterval(typing);
      typing = setInterval(() => {
        i += 2;
        el.text.textContent = full.slice(0, i);
        if (i >= full.length) finish();
      }, delay);
      pending = finish;
    });
  };

  function onDialogTap(e) {
    if (e && e.target && e.target.closest && e.target.closest('button')) return;
    if (pending) pending();
  }

  SC.choose = function (prompt, options, label) {
    prompt = G(prompt); options = options.map(G);
    if (TW.Speech) TW.Speech.say('drama', prompt);
    const el = SC.el;
    SC.mode = 'script';
    el.dialog.className = 'dialog kind-choice';
    el.label.textContent = label || 'Your heart';
    el.speaker.hidden = true;
    el.text.textContent = prompt;
    el.next.hidden = true;
    el.choices.innerHTML = '';
    pending = null;
    return new Promise((res) => {
      options.forEach((txt, i) => {
        const b = document.createElement('button');
        b.className = 'choice';
        b.textContent = txt;
        b.addEventListener('click', (ev) => {
          ev.stopPropagation();
          TW.Audio && TW.Audio.sfx('tap');
          el.choices.innerHTML = '';
          res(i);
        });
        el.choices.appendChild(b);
      });
      const first = el.choices.querySelector('button');
      first && first.focus({ preventScroll: true });
    });
  };

  SC.goal = function (text) {
    text = G(text);
    const el = SC.el;
    clearInterval(typing); typing = null; pending = null;
    el.dialog.className = 'dialog kind-goal';
    el.label.textContent = LABELS.goal();
    el.speaker.hidden = true;
    el.text.textContent = text;
    el.choices.innerHTML = '';
    el.next.hidden = true;
  };

  SC.prompt = function (text, label, mode) {
    text = G(text); label = G(label);
    SC.goal(text);
    SC.mode = mode || 'script';
    return new Promise((res) => {
      const b = document.createElement('button');
      b.className = 'choice primary';
      b.textContent = label;
      b.addEventListener('click', (ev) => {
        ev.stopPropagation();
        TW.Audio && TW.Audio.sfx('tap');
        SC.el.choices.innerHTML = '';
        SC.mode = 'script';
        res();
      });
      SC.el.choices.appendChild(b);
    });
  };

  SC.tween = function (ms, fn) {
    if (U.reducedMotion()) ms = Math.min(ms, 200);
    return new Promise((res) => {
      const t0 = performance.now();
      const step = (now) => {
        const p = U.clamp((now - t0) / ms, 0, 1);
        fn(p);
        if (p < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
  };

  SC.free = function (text) {
    SC.goal(text);
    SC.mode = 'free';
  };
  SC.observeMode = function (text) {
    SC.goal(text);
    SC.mode = 'observe';
  };

  SC.toast = function (text) {
    text = G(text);
    TW.Audio && TW.Audio.sfx('chime');
    const t = SC.el.toast;
    t.textContent = text;
    t.classList.remove('show');
    void t.offsetWidth;
    t.classList.add('show');
  };

  SC.wait = (ms) => U.wait(U.reducedMotion() ? Math.min(ms, 150) : ms);
  // ---------- every prompt, option, hint and toast is also a line: recorded, and translated when a translation exists ----------
  // ---------- turbo: a developer mode in which the game plays itself at full speed, used to catalog every line ----------
  (function () {
    const say0 = SC.say, choose0 = SC.choose, prompt0 = SC.prompt, goal0 = SC.goal, toast0 = SC.toast, walk0 = SC.walk, tween0 = SC.tween, wait0 = SC.wait;
    const line = (kind, text) => {
      if (!TW.Lines || !text) return text;
      const id = TW.Lines.id(kind, text);
      TW.Lines.note(id, { kind: kind, text: text });
      return TW.Lines.translate(id, text);
    };
    SC.say = function (o) {
      if (!TW.TURBO) return say0(o);
      if (o && o.kind !== 'scripture') o = Object.assign({}, o, { text: G(o.text), speaker: G(o.speaker) });
      if (o && o.kind === 'scripture' && TW.Bible) TW.Bible.lastFallback = false;
      if (TW.Lines && o && o.text) TW.Lines.note(TW.Lines.id(o.kind, o.text), o);
      return Promise.resolve();
    };
    SC.choose = function (prompt, options, label) {
      prompt = line('prompt', G(prompt)); options = options.map((x) => line('option', G(x)));
      if (TW.TURBO) { const n = options.length, i = TW.TURBO_CYCLE ? (TW.TURBO_SEQ = (TW.TURBO_SEQ || 0) + 1) % n : Math.min(n - 1, TW.TURBO_CHOICE || 0); return Promise.resolve(i); }
      return choose0(prompt, options, label);
    };
    SC.goal = function (text) { return goal0(line('goal', G(text))); };
    SC.prompt = function (text, label, mode) {
      text = line('goal', G(text)); label = line('ui', G(label));
      if (TW.TURBO) return Promise.resolve();
      return prompt0(text, label, mode);
    };
    SC.toast = function (text) { return toast0(line('ui', G(text))); };
    SC.walk = function (e, x, y) { if (!TW.TURBO) return walk0(e, x, y); e.x = x; if (y !== undefined) e.y = y; e.target = null; return Promise.resolve(); };
    SC.tween = function (ms, fn) { if (!TW.TURBO) return tween0(ms, fn); fn(1); return Promise.resolve(); };
    SC.wait = function (ms) { return TW.TURBO ? Promise.resolve() : wait0(ms); };
    // in turbo, also record everything that could be tapped and noted in a room
    const load0 = SC.load;
    SC.load = function (stage) {
      if (TW.TURBO && stage && stage.hotspots) {
        const walk = (o, depth) => { if (typeof o === 'string') { if (/\s/.test(o)) line('observe', G(o)); } else if (o && typeof o === 'object' && depth < 3) Object.values(o).forEach((v) => walk(v, depth + 1)); };
        stage.hotspots.forEach((h) => walk(h, 0));
      }
      return load0(stage);
    };
    const uwait = U.wait;
    U.wait = (ms) => (TW.TURBO ? Promise.resolve() : uwait(ms));
  })();
  ['say', 'choose', 'prompt', 'tween', 'walk', 'walkPath', 'wait'].forEach((k) => { SC[k] = guard(SC[k]); });

  TW.Scene = SC;
})(window.TW);
