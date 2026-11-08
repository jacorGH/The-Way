# The Way: An Eyewitness Account

A Bible study game. Walk through the Gospels and the early church as a young scribe who is not yet convinced.

Scripture quotations are from the World English Bible (public domain). Every line in the game is labelled
Scripture, History or Dramatization; invented material never puts words in Jesus' mouth.

## Play
Open `index.html` (works from GitHub Pages or locally; plain scripts, no build step, no modules).

## Icon and home screen
`icons/icon.svg` is the master. PNGs: `icon-512.png`, `icon-192.png`, `apple-touch-icon.png` (180), `favicon-32.png`, `icon-1024.png` (store size).
`manifest.webmanifest` lets the game be added to a home screen and open full screen.

## Structure
- `index.html` – screens: title, prologue, timeline, overworld map, scene, plus scroll/report/study overlays
- `css/style.css` – basalt, papyrus, lapis, madder, ochre; Cinzel + EB Garamond
- `js/util.js` – math, noise, colour helpers, save game (localStorage, guarded)
- `js/audio.js` – all sound, synthesized live with Web Audio (no audio files): period music in moods (title, galilee, land, reflect, tension, wonder, lament, jerusalem, night, storm), ambience beds (shore, wind, birds, crowd, room, night, fire, storm) and effects. Stages set their soundscape with an `audio` property; `TW.Audio.music(mood)` and `TW.Audio.sfx(name)` handle story beats.
- `js/scripture.js`, `js/scripture2.js` – every Scripture passage, word for word from the WEB (scripture2 also holds Mark 14–16 and John 19 for the coming Passion episodes)
- `js/data.js` – eras, timeline, episode registry (notes, reflections, report choices), both map regions, reveal schedule
- `js/geo.js` – simplified real elevations: Galilee in detail, the whole Land, and Jerusalem with its valleys and the Mount of Olives
- `js/sprites.js` – procedural pixel people, the man on the mat, pigs, bier, boats, map walker
- `js/map.js` – overworld: relief rendering, roads, fog of the unexplored, travel, Galilee/Land switch
- `js/scene.js` – scene engine: 256×160 pixel stage, full-res light layer, entities, dialogue, choices
- `js/capernaum.js` – Episode I, At Home in Capernaum (Mark 2:1–12); also exports the shared art kit (TW.Kit)
- `js/levi.js` – Episode II, The Tax Booth (Mark 2:13–17)
- `js/sabbath.js` – Episode III, Lord of the Sabbath (Mark 2:23–3:6)
- `js/legion.js` – Episode IV, Across the Lake (Mark 4:35–5:20)
- `js/nain.js` – Episode V, The Widow of Nain (Luke 7:11–17)
- `js/entry.js` – Episode VI, The Entry (Mark 11:1–11); also builds the shared Temple courts set
- `js/temple.js` – Episode VII, The Temple (Mark 11:15–18; 12:28–34)
- `js/passion-art.js` – shared Passion art: the city gate and Golgotha, the garden tomb, night lighting, distant crosses, character looks
- `js/council.js` – Episode VIII, The Council by Night (Mark 14:53–72)
- `js/cross.js` – Episode IX, The Cross (Mark 15:16–41), shown with restraint from a distance
- `js/burial.js` – Episode X, The Burial (Mark 15:42–47; John 19:38–42), with Nicodemus’s memories of John 3 and John 7
- `js/tomb.js` – Episode XI, The Empty Tomb (Mark 16:1–8; John 20:1–18)
- `js/testimony.js` – testimonies: the interview engine, gathering places, and every eyewitness (add new ones to `D.testimonies`)
- `js/vignettes.js` – memory scenes: sepia flashbacks that act out each testimony answer in step with its verses
- `js/main.js` – game controller

## Adding an episode
1. Put the passage in `scripture.js` (copied exactly from the WEB).
2. Add an entry to `D.episodes` in `data.js` (title, ref, passage, place, question, hearts, conclusions, notes, reflect),
   add its id to the era's `episodes` list and `D.eraOrder`, and list it on its map place's `episodes`.
3. Create `js/<id>.js` exporting `TW.Episodes.<id> = { run(game) { ... } }` using `TW.Scene` and `TW.Kit`;
   end with `TW.Kit.finish(game, '<id>')`.
4. Add its `<script>` tag before `main.js`. To reveal Land places when it is finished, set their `reveal: '<id>'`.

## Adding a testimony
Add an entry to `D.testimonies` in `testimony.js`: witness, map region and place, the episode it unlocks after,
a set (street, house, upper, village, field, court, synagogue), and a list of questions. Each answer is a list of blocks:
`['s', passage, from, to]` shows Scripture word for word; `['d', text]` is the witness speaking (dramatization);
`['n', text]` is narration; `['h', text]` is a history note; `['c', cue]` plays the next step of the answer's memory scene.
Give the question a `scene` (a function in `vignettes.js` that builds the remembered place and returns its cues).
