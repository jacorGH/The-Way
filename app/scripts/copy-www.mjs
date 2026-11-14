// Copy the game into app/www for Capacitor: every file the game plays from, and nothing it does not
// (the voice batches, the tools, this app folder, the GitHub workflows, the web service worker).
import { cpSync, rmSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = join(dirname(fileURLToPath(import.meta.url)), '..');
const game = join(app, '..');
const www = join(app, 'www');
const SKIP = new Set(['app', 'dub', 'tools', '.github', '.git', 'node_modules', 'sw.js', 'README.md', 'RECORDING.md', 'privacy.html']);

rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });
let files = 0, bytes = 0;
for (const name of readdirSync(game)) {
  if (SKIP.has(name) || name.startsWith('.')) continue;
  cpSync(join(game, name), join(www, name), { recursive: true, filter: (src) => !/\/\.DS_Store$/.test(src) });
}
const walk = (d) => readdirSync(d).forEach((n) => { const p = join(d, n), s = statSync(p); if (s.isDirectory()) walk(p); else { files++; bytes += s.size; } });
walk(www);
// the store apps do not use the web app manifest's start URL or the Home Screen tags; harmless, but keep the page clean
const idx = join(www, 'index.html');
writeFileSync(idx, readFileSync(idx, 'utf8').replace(/<link rel="manifest"[^>]*>\n?/, ''));
console.log('www: ' + files + ' files, ' + (bytes / 1048576).toFixed(1) + ' MB');
