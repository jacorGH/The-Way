/* Copyright © 2026 Jacob Cooper. All rights reserved; see LICENSE.md. */
/* The Way — art for Paul's arrest and imprisonment: the Fortress Antonia and its stairs, horsemen, and a night march. */
window.TW = window.TW || {};
(function (TW) {
  const K = TW.Kit, SC = TW.Scene, S = TW.S;
  const R = K.R;
  Object.assign(K.looks, {
    agabus: { skin: '#a8724a', hair: '#8a7a6a', beard: '#c8c0b4', tunic: '#6a5a42', mantle: '#4a3a2a' },
    james: { skin: '#b07a50', hair: '#8a7a6a', beard: '#a89a8a', tunic: '#e6dfcc', mantle: '#8a7a5a' },
    tribune: { skin: '#c49470', hair: '#3a2416', tunic: '#a83a2a', belt: '#d8b04a', helmet: '#b8a070' },
    highpriest: { skin: '#b8845a', hair: '#c8c0b4', beard: '#d8d0c4', tunic: '#3d4a7a', mantle: '#e6dfcc', stripe: '#d8b04a' },
    nephew: { skin: '#b8845a', hair: '#2a1a12', tunic: '#a89a7a' },
  });
  // the fortress and its stairs, drawn over the right end of the Temple court (world x 236–320)
  K.antonia = () => SC.add({ x: 280, y: 150, z: 60, draw(ctx, sx, sy) {
    const x0 = sx - 44;
    R(ctx, x0 + 20, 20, 70, 112, '#c2b392'); R(ctx, x0 + 20, 20, 70, 3, '#d8cba8');
    for (let k = 0; k < 4; k++) R(ctx, x0 + 24 + k * 16, 30, 6, 10, '#2a2018');
    R(ctx, x0 + 54, 4, 20, 18, '#b5a586'); for (let k = 0; k < 4; k++) R(ctx, x0 + 54 + k * 6, 1, 3, 4, '#b5a586');
    R(ctx, x0 + 26, 100, 14, 22, '#2a2018');
    // the stairs, down to the court floor
    for (let k = 0; k < 9; k++) R(ctx, x0 + 10 - k * 4, 120 + k * 3, 40, 3, k % 2 ? '#d8cba8' : '#cfc0a0');
  } });
  // a horseman
  K.horse = (x, y, look) => SC.add({ x: x, y: y, speed: 30, draw(ctx, sx, sy, t) {
    const step = this.moving ? Math.floor(t * 8) % 2 : 0;
    R(ctx, sx - 12, sy - 15, 22, 8, '#4a3424'); R(ctx, sx + 8, sy - 20, 5, 8, '#4a3424'); R(ctx, sx + 11, sy - 21, 4, 4, '#3a2818');
    R(ctx, sx - 10, sy - 7, 2, 7 - step, '#3a2818'); R(ctx, sx - 5, sy - 7, 2, 6 + step, '#3a2818'); R(ctx, sx + 4, sy - 7, 2, 7 - step, '#3a2818'); R(ctx, sx + 8, sy - 7, 2, 6 + step, '#3a2818');
    R(ctx, sx - 14, sy - 14, 2, 7, '#2a1a10');
    R(ctx, sx - 3, sy - 25, 6, 10, (look && look.tunic) || '#a83a2a'); R(ctx, sx - 2, sy - 29, 4, 4, '#c49470'); R(ctx, sx - 2, sy - 31, 4, 2, '#b8a070');
  } });
})(window.TW);
