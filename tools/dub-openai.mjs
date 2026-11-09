#!/usr/bin/env node
/* The Way — make recordings with OpenAI's text-to-speech API (paid). See RECORDING.md.
   Usage: OPENAI_API_KEY=sk-... node tools/dub-openai.mjs batch.json [--lang en]
   batch.json comes from Settings → Recorded voices → Copy batch for a voice service: [{ id, voice, text }, ...] */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// The cast: an OpenAI voice and written direction for each tag. Change these freely.
const CAST = {
  N: { voice: 'ash', instructions: 'A thoughtful young man in first-century Judea, telling what he saw. Warm, unhurried, plain. No theatrics.' },
  W: { voice: 'coral', instructions: 'A thoughtful young woman in first-century Judea, telling what she saw. Warm, unhurried, plain. No theatrics.' },
  S: { voice: 'sage', instructions: 'Reverent, clear and measured, as Scripture read aloud to a gathering. Pause gently at commas and between sentences.' },
  M: { voice: 'onyx', instructions: 'A man speaking sincerely in the moment, natural and conversational, never exaggerated.' },
  F: { voice: 'nova', instructions: 'A woman speaking sincerely in the moment, natural and conversational, never exaggerated.' },
};
const MODEL = 'gpt-4o-mini-tts';   // check OpenAI's documentation for current models and prices
const PAUSE_MS = 1500;             // go gently

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const lang = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : 'en';
const key = process.env.OPENAI_API_KEY;
if (!file || !key) { console.error('Usage: OPENAI_API_KEY=sk-... node tools/dub-openai.mjs batch.json [--lang en]'); process.exit(1); }
const lines = JSON.parse(fs.readFileSync(file, 'utf8'));
const outDir = path.join(root, 'audio', lang);
fs.mkdirSync(outDir, { recursive: true });
const made = [];
for (const [i, line] of lines.entries()) {
  const out = path.join(outDir, line.id + '.mp3');
  if (fs.existsSync(out)) { made.push(line.id); continue; }
  const cast = CAST[line.voice] || CAST.N;
  process.stdout.write(`(${i + 1}/${lines.length}) ${line.id} ${line.voice} … `);
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, voice: cast.voice, instructions: cast.instructions, input: line.text, response_format: 'mp3' }),
  });
  if (!res.ok) { console.log('failed: ' + res.status + ' ' + (await res.text()).slice(0, 200)); break; }
  fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  made.push(line.id);
  console.log('saved');
  await new Promise((r) => setTimeout(r, PAUSE_MS));
}
console.log('\nAdd to audio/manifest.js:\nTW.Dubs.add(' + JSON.stringify(lang) + ', ' + JSON.stringify(made) + ", 'mp3');");
