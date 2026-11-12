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
- `js/role.js` – who you play: Eleazar (a young scribe), Elisheva (Nicodemus's niece), or Both (choose the voice before each scene). Holds exact phrase swaps for Elisheva's dramatized text (never Scripture) and each episode's vantage points
- `js/settings.js` – player settings (text size and speed, auto-advance, reduce motion, contrast, selectable text, language, Bible version)
- `js/i18n.js` – interface language: `TW.t('English text')`; static labels carry `data-i18n`
- `js/lines.js` – permanent line IDs, translations by ID, and recorded voices (`TW.Dubs`)
- `js/bible.js` – swappable Bible versions, WEB fallback, localized book names, and the importer
- `js/scripture.js`, `js/scripture2.js`, `js/scripture3.js` (Acts 1–9, Acts 22 and John 14, 20), `js/scripture4.js` (Acts 9:32–13:13), `js/scripture5.js` (Acts 13:14–16:40) – every Scripture passage, word for word from the WEB (scripture2 also holds Mark 14–16 and John 19 for the coming Passion episodes)
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
- `js/forty.js` – Episode XII, Forty Days (John 20:19–29; Acts 1:1–14): Thomas and the Ascension as memories; closes Era II
- `js/pentecost.js` – Episode XIII, Pentecost (Acts 2): opens Era III; the scribe is baptized
- `js/gate.js` – Episode XIV, The Beautiful Gate (Acts 3:1–4:4)
- `js/trial.js` – Episode XV, Before the Council (Acts 4:5–37)
- `js/seven.js` – Episode XVI, The Seven (Acts 6:1–7), with the daily bread distribution as gameplay
- `js/stephen.js` – Episode XVII, Stephen (Acts 6:8–8:4), told with restraint; closes Era III
- `js/service.js` – Service visits (listen, care, pray) with honest outcomes; opens after The Seven
- `js/era4-art.js` – Era IV art: Sebaste, the desert road, Straight Street in Damascus, a horse-drawn carriage
- `js/samaria.js` – Episode XVIII, Philip in Samaria (Acts 8:4–25)
- `js/desert.js` – Episode XIX, The Desert Road (Acts 8:26–40)
- `js/damascus.js` – Episode XX, The Road to Damascus (Acts 9:1–31)
- `js/coast-art.js` – Joppa, Simon the tanner's racks, Cornelius's atrium in Caesarea, Peter's sheet
- `js/tabitha.js` – Episode XXI, Tabitha (Acts 9:32–43)
- `js/cornelius.js` – Episode XXII, Peter and Cornelius (Acts 10:1–11:18)
- `js/geo-east.js` – geography of Syria, Cilicia and Cyprus (coastline, Cyprus, Lebanon and Anti-Lebanon, Amanus, Taurus, Orontes)
- `js/antioch.js` – Episode XXIII, Antioch (Acts 11:19–30), with Tarsus
- `js/rhoda.js` – Episode XXIV, Rhoda at the Gate (Acts 12:1–17), with Peter's escape as his memory
- `js/cyprus.js` – Episode XXV, Cyprus (Acts 13:1–13): the sending at Antioch, a sea voyage, and Paphos
- `js/pisidia.js` – Episode XXVI, Antioch of Pisidia (Acts 13:14–52)
- `js/lystra.js` – Episode XXVII, Lystra (Acts 14), with Iconium and the report at Antioch
- `js/speech.js` – read aloud with the device's built-in voices (narrator, Scripture and character voices)
- `js/geo-aegean.js` – geography of the Aegean (Greece, Thrace, western Asia Minor, gulfs, straits, islands)
- `js/aegean-art.js` – the river at Philippi, the prison stocks, and a sea crossing
- `js/jcouncil.js` – Episode XXVIII, The Council at Jerusalem (Acts 15)
- `js/lydia.js` – Episode XXIX, Lydia (Acts 16:1–15): Timothy, the vision at Troas, Luke, the river
- `js/jailer.js` – Episode XXX, Midnight in Philippi (Acts 16:16–40)
- `js/berea.js` – Episode XXXI, Thessalonica and Berea (Acts 17:1–15)
- `js/athens.js` – Episode XXXII, The Unknown God (Acts 17:16–34)
- `js/corinth.js` – Episode XXXIII, Corinth (Acts 18:1–18)
- `js/artemis.js` – Episode XXXIV, Great Is Artemis (Acts 18:24–19:41)
- `js/farewell.js` – Episode XXXV, Farewell at Miletus (Acts 20)
- `js/rome-art.js` – the Fortress Antonia and its stairs, horsemen, and looks for Agabus, James, the tribune and others
- `js/arrest.js` – Episode XXXVI, On the Stairs (Acts 21–22)
- `js/plot.js` – Episode XXXVII, The Forty Who Swore (Acts 23)
- `js/geo-west.js` – geography of the central Mediterranean (Italy, Sicily, Malta, Greece, Crete, Lycia, Africa)
- `js/storm.js` – Episode XL, The Storm (Acts 27)
- `js/malta.js` – Episode XLI, Malta (Acts 28:1–10)
- `js/rome.js` – Episode XLII, Rome (Acts 28:11–31), the end of Acts
- `js/scripture8.js` – WEB passages: Acts 27–28
- `js/letter.js` – Episode XLIII, The Letter to Philippi (Philippians)
- `js/onesimus.js` – Episode XLIV, Onesimus (Philemon)
- `js/scripture9.js` – WEB passages: Philippians and Philemon
- `js/felix.js` – Episode XXXVIII, Two Years in Caesarea (Acts 24:1–25:12)
- `js/agrippa.js` – Episode XXXIX, Almost Persuaded (Acts 25:13–26:32)
- `js/scripture7.js` – WEB passages: Acts 25–26
- `js/finale-art.js`, `js/goodfight.js`, `js/fall.js`, `js/lamps.js`, `js/allnew.js` – Eras V and VI: The Good Fight, Not One Stone, The Seven Lamps, All Things New
- `js/data-finale.js` – episode entries for Eras V and VI
- `js/scripture10.js` – WEB passages: 2 Timothy, Luke 21, Revelation
- `tools/lines-en.json` – catalog of every line in the game with its permanent ID (translation and voice work)
- `dub/` – ready-made TTS Studio batches, one per episode (`dub/index.html` lists them)
- `i18n/es-*.js` – Spanish for the whole game: every episode, testimony, service visit, map and screen
- `js/scripture6.js` – WEB passages: Acts 18:24–24:26
- `js/about.js` – copyright holder, contact and license summary shown in the game (fill in your name here)
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

## Questions and answers
Each episode can open a question in the scroll (`question`) and answer earlier ones (`answers: { id: [answer, ref] }`).
Call `TW.Kit.answerAll(game, episodeId)` at the moment in the episode where the answer lands.

## Service
Service visits live in `D.service` (in `js/service.js`). Each has `listen`, `care` and `pray` choices and a fixed
`outcome`. The player's choices change how well they serve, never whether God heals: outcomes are written honestly
(healed, slow recovery, comfort, death in peace, prayer not answered as asked). Prayers quote Scripture word for word.

## Audio notes
Ambience has two kinds of layer. Beds are only low, soft brown-noise textures: `wind` (gusts), `room`, `fire`, `storm`,
and a low `crowd` presence. Everything else is a distinct event, scheduled live: `shore` (lake wavelets lapping and
washing back over pebbles), `crowd` and `city` voices (murmured syllables through moving vowel formants), `city`
(stonemasons' hammers, sheep, passing footsteps), `doves`, `village` (dogs, goats, voices), `birds`, `night` (crickets,
an owl), and travel: `steps` while walking on a map and `oars` while crossing water (`TW.Audio.travel('walk'|'boat'|'')`).
A stage chooses its soundscape with `audio: { music, amb: { layer: level } }`. The sea is heard only at real shorelines.
Taps and scene transitions are soft lyre notes. Footsteps are low tonal thuds, never noise; the reverb is darkened so
echoes never hiss; distant voices play only where a crowd is in the scene (the `crowd` layer). The music engine contains no noise at all
(the frame drum's tek is a tuned tap; the flute has a tuned chiff instead of breath).
On the Jerusalem map the ambience follows the marker: `market` bustle (voices, merchants, carts, donkeys, coins) at the
center, thinning toward the walls; `pasture` (goat bells, flocks) and birds on the slopes; `desert` (wind, a hawk) east
of the Mount of Olives. See `cityAmbience` in `js/main.js`. `TW.Audio._spec()` returns [energy above 3 kHz, total] for testing.

## Three playthroughs
- **Eleazar**, a young scribe who studies under Nicodemus.
- **Elisheva**, Nicodemus's niece, taught to read and write in his house. Where women went with Jesus (Galilee, the cross,
  the spices, the tomb), she goes; where they could not (the council benches, a banquet couch), she stands at the door.
- **Both**: before each episode, testimony or service visit, choose whose eyes to see it through (`TW.Role.VIEW` lists
  each vantage and recommends the richer one).
`TW.Role.is()` is true whenever the current voice is Elisheva. Add swaps to `TW.Role.MAP` as `[Eleazar's text, Elisheva's]`.

## Read aloud
`TW.Speech` speaks each line with the device's voices: narration in the player's voice (male for Eleazar, female for
Elisheva), Scripture more slowly in a second voice, and characters in stable voices matched to whether the speaker is a
man or a woman. Music and ambience dip while a line is spoken. On iPhone, Enhanced or Premium voices (Settings >
Accessibility > Spoken Content > Voices) sound far more natural. Studio-quality dubs are best generated from the final
text in one pass, after translation.

## Future-proofing: versions, languages, voices

### Line IDs
Every line shown gets a permanent ID from its kind and its exact words (`js/lines.js`):
`d-xxxxxxxx` for story and history lines, `s-<VERSION>-xxxxxxxx` for Scripture. If the wording changes, the ID changes,
so a recording or translation is never played over different words. In the game, Settings → Your progress →
Export lines saves every line you have seen with its ID, speaker, kind and text.

### Bible versions
Scripture is stored once, by passage, in the WEB. Other versions are plain lookups (`text[Book]['2:1']`) that fall back
to the WEB, marked "WEB", for any missing verse. Book names follow the version's language (Marcos, Lucas, Juan, Hechos).
- **On a phone:** Settings → Bible translation → Add a Bible translation, then choose a verse-per-line text file. It is
  stored on the device.
- **In the repo:** `node tools/import-bible.mjs eng-asv_vpl.txt --id ASV --name "American Standard Version" --lang en`,
  then add `<script src="bible/ASV.js"></script>` after `bible/versions.js` in `index.html`.
- **One-tap downloads:** Settings → Bible translation offers the American Standard Version, the King James Version and
  the Reina-Valera 1909 (or 1858 if the 1909 is unavailable). The game fetches only the books it uses from getBible.net
  (a whole book per request) or, failing that, bible-api.com (a chapter per request), keeps only the verses it uses, and
  stores them on the device. Downloads need an internet connection and do not work inside the in-chat play link, whose
  security rules block other websites; they work from your own copy, such as GitHub Pages.
- **Sources:** eBible.org offers public-domain texts in "VPL" (verse per line) format, e.g. the American Standard
  Version (eng-asv), the King James Version (eng-kjv; public domain in the US, Crown rights in the UK) and the
  Reina-Valera 1909 (spaRV1909). Re-run the tool when new episodes add passages.

### Spanish and other languages
- Interface strings: add to the dictionary in `js/i18n.js` (`TW.I18n.add('es', { ... })`).
- Story text: `i18n/es-lines.js`, keyed by line ID (`TW.Lines.translations.es['d-1a2b3c4d'] = '…'`). Untranslated lines
  show in English. Spanish Scripture comes from a Spanish Bible version.
- Elisheva's text variants have their own IDs, so they are translated separately.

### Recorded voices
See **RECORDING.md** for the free iPhone Shortcuts method and the paid OpenAI method. In the game, Settings → Recorded
voices is the Dub Studio: it copies batches of lines (ID | voice tag | text), tracks what is recorded, and writes the
manifest. `tools/dub-openai.mjs` records a batch with OpenAI's speech API.
Put recordings at `audio/<lang>/<line id>.mp3` and list the IDs in `audio/manifest.js` with
`TW.Dubs.add('en', [...])`. Read aloud plays a recording when one exists and the device voice otherwise.

### Accessibility and comfort
Settings: text size (S to XL, everything scales), text speed (to instant), auto-advance (waits for the voice to finish
when reading aloud), selectable dialog text (for the iPhone's Speak Selection), reduce motion (no typing, shaking or
long transitions; also follows the system setting), higher contrast, and progress backup and restore.

## License
The game is **free to play and to share unmodified; all other rights are reserved.** See `LICENSE.md`. In short: anyone may
play it and share links or complete, unchanged copies free of charge; no one may copy, change, reuse or sell the code,
art, music or story, or use them to train AI models, without permission. Scripture texts are public domain and are not
covered.

Copyright © 2026 Jacob Cooper. Before publishing, add a contact to `LICENSE.md` and `js/about.js` (they appear in the game's title screen
and Settings). Notes:
- A web game necessarily sends its code to every player's browser. The license is what protects it legally.
- If the GitHub repository is public, GitHub's own Terms of Service let other GitHub users view and fork it on GitHub,
  though your license still applies to everything else. To keep the code out of view, keep the repository private
  (publishing a private repository with GitHub Pages requires a paid GitHub plan).
- This license is a clear starting point, not legal advice. Have it reviewed if you ever sell the game or license it to
  others.

## Catalog of lines, Spanish, and recorded voices
A developer mode (`TW.TURBO`) plays the whole game at full speed. Played six times (every option at each choice, as
both characters), it produced `tools/lines-en.json`: 2,884 lines to translate (about 41,000 words, Scripture excluded)
and 1,252 lines to voice (about 228,000 characters, roughly four hours of audio).

Spanish: interface text, study pages, the timeline and map labels all pass through `TW.tr`, and story lines through
their IDs. Translations live in `i18n/es-*.js`; any line without one stays in English. Scripture is never translated
by these files: it comes from the chosen Spanish Bible version, and book names follow the language.

### Developer tools
The Dub Studio and the line export in Settings appear only when the address ends in `?dev`
(for example `https://YOU.github.io/the-way/?dev`). Players see only the "Play recorded voices" switch.
Recorded voices need no manifest: the game tries `audio/<lang>/<line ID>.mp3` and falls back to the device voice.
Translations may give masculine and feminine forms, `{ m: '…', f: '…' }`, for Eleazar's and Elisheva's accounts.

### Shipping Bible versions with the game
1. On your published copy, download the version in Settings → Bible translation (ASV, KJV or Reina-Valera).
2. Open the game with `?dev` at the end of its address. In Settings → Bible translation, tap "Save … as a game file".
3. Put the saved file (for example `RV1909.js` or `ASV.js`) in the `bible/` folder and push.
`bible/versions.js` loads ASV, KJV, RV1909 and RV1858 if their files are present. A shipped version needs no download,
and the title screen's Español button uses a shipped Spanish version at once.

## Discoveries
`js/discover.js` holds, in English and Spanish:
- **Threads**: undesigned coincidences, where one account quietly explains another (for example, why Jesus asked
  Philip about bread, or why Barnabas stood by Mark). Each unlocks once the player has witnessed both halves.
- **Finds**: keepsakes and archaeology Easter eggs (the Caiaphas ossuary, the Pilate stone, the heel bone of a crucified
  man, the Erastus pavement, the Galilee boat…), unlocked by completing their episode or testimony.
- **Letters**: a reply to every report through Era V, answering the conclusion the player sealed: Nicodemus from
  Capernaum to Philemon (`js/discover2.js`, `js/discover3.js`), then Timothy from Ephesus.
- **Setting a report in order**: when an episode recorded three or more story moments, the report offers an optional
  step to tap them in the order they happened (Luke 1:3); ordered accounts are counted in Discoveries.
- **Your account**: the last page draws on the player's own choices.
They appear on the study page after a report is sealed and in the scroll's Discoveries tab. Where scholars disagree,
the text says so.

## Side stories
- **Zacchaeus** (Luke 19:1–10): a testimony in Jericho with two memory scenes (the sycamore tree, and dinner at his
  house), a find about Jericho's balsam groves, Spanish, and a voice batch (`dub/en/t-zacchaeus.json`).
- **The centurion's servant** (Luke 7:1–10): told at the Capernaum synagogue by one of the elders the centurion sent;
  opens after Episode I.
- **Mary of Magdala** (Luke 8:1–3; John 20:11–18): told at Magdala, which this testimony unlocks on the map; opens
  after the Empty Tomb. Each has a memory scene, a find, Spanish and a voice batch.

## Study features
- **Hands-on moments** (`js/hands.js`): wind the linen at the burial, hold the jailer's lamp, unroll the scroll in
  Berea, throw the grain overboard in the storm, take down Paul's dictation. Counted in Discoveries.
- **Word study** for every episode and **Two accounts** (what Eleazar and Elisheva each saw) on the study page
  (`js/discover4.js`).
