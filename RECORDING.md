# Recording voices for The Way

Every line in the game has a permanent ID (see `js/lines.js`). A recording named `<ID>.m4a` (or `.mp3`) in
`audio/<lang>/`, listed in `audio/manifest.js`, is played instead of the device voice. Lines without a recording are
still read by the device, so you can record a little at a time.

## The quick way: TTS Studio (OpenAI)

Ready-made batches for TTS Studio are in **dub/en/**: one JSON file per episode, testimony and service visit, 64 in all,
covering every spoken line in the game (1,252 lines, about 228,000 characters). On your published copy, open
**dub/index.html** for a tappable list.

1. Open a batch from dub/index.html, and save it to Files (Share → Save to Files).
2. In TTS Studio, import the file, check the voices, and generate.
3. Export the ZIP. It contains `audio/en/<line ID>.mp3`, which is exactly where the game looks.
4. Unzip it into the game folder, so the MP3s land in **audio/en/**, and push to GitHub (for example with GitMobile).

Recordings play whenever Settings → Recorded voices → "Play recorded voices" is on, even with Read aloud off. Read aloud
only decides whether the device voice fills in lines that have no recording. On iPhone the first tap in the game unlocks
the audio player, so a recording may stay silent until you have tapped once.

To check a folder: open the game with `?dev` at the end of its address, play an episode, then Settings → Recorded
voices → Check recordings. It reports how many of that episode's lines have recordings and the exact address it uses.

That is all. The game tries a recording for every line and uses the device voice for any line that has none, so there
is no list to update; the `manifest.json` inside each ZIP can be ignored or overwritten. Settings → Recorded voices has
a switch to turn recordings off.

Notes:
- Scripture lines are recorded from the World English Bible. If a player switches to another Bible version, its
  Scripture lines are read by the device voice.
- A line's ID changes when its words change, so an edited line simply falls back to the device voice until it is
  recorded again. `tools/lines-en.json` is the full catalog; the batches are rebuilt from it.
- Lines only in Elisheva's account are tagged `W` (her narrator voice); narration shared by both accounts is `N`.

There are two other ways to make recordings:

1. **Free, on your iPhone**, with the Shortcuts app and the Enhanced or Premium voices you download.
2. **Paid, with OpenAI's text-to-speech API**: more expressive voices you can direct with a written prompt. Roughly a
   few dollars for the whole English game; check OpenAI's current prices. (The free ChatGPT app cannot export audio files.)

---

## 1. Free: iPhone Shortcuts

### Once: download voices
Settings → Accessibility → Read & Speak (formerly Spoken Content) → Voices → English. Download the Enhanced or
Premium versions of the voices you want. A suggested cast, five voices in all:

| Tag | Who | Suggested voice |
|---|---|---|
| N | Narrator, Eleazar's account | Evan (Enhanced) |
| W | Narrator, Elisheva's account | Ava (Premium) |
| S | Scripture | Nathan (Enhanced), or Zoe (Premium) |
| M | A man speaking | Daniel or Tom (Enhanced) |
| F | A woman speaking | Joelle (Enhanced) or Zoe |

### Once: make the folder
In the Files app, open iCloud Drive → Shortcuts and create a folder named **The Way Audio**.

### Once: build the shortcut
There are two versions. Start with the simple one to check that everything works.

#### Simple version: one voice per run
In the game's Dub Studio, choose a single voice (for example "N · narrator") before copying a batch. The batch then only
contains lines for that voice, so the shortcut needs no If blocks:

1. **Get Clipboard**
2. **Split Text**: split *Clipboard* by **New Lines**
3. **Repeat with Each** item in *Split Text*. Inside the repeat:
   1. **Split Text**: split *Repeat Item* by **Custom** `|`
   2. **Get Item from List**: **First Item** → then **Set Variable** `ID`
   3. **Get Item from List**: **Last Item** of the same split list → then **Set Variable** `Line`
      (tap the list input and choose the *Split Text* from step 3.1, not the first one)
   4. **Make Spoken Audio from Text**: input *Line*; tap the arrow and choose the voice
   5. **Set Name**: input *Spoken Audio*, name *ID*
   6. **Save File**: input *Renamed Item*; **Ask Where to Save** off; destination the Shortcuts folder; subpath
      `The Way Audio/`; **Overwrite If File Exists** on
4. After **End Repeat**: **Show Notification** "Batch recorded"

Make one copy of this shortcut per voice (duplicate it and change the voice), or change the voice before each run.

#### Full version: all five voices in one run
Steps 1–3.3 as above, also adding after 3.2:
**Get Item from List**: **Item At Index** `2` of the same split list → **Set Variable** `Tag`.

Then, still inside the repeat, five **If** blocks, one per voice tag:

- **If** `Tag` **is** `N`
  - **Make Spoken Audio from Text**: input *Line*, voice Evan (Enhanced)
  - **Set Variable** `Audio`  ← the same name in every block
- **End If**
- Repeat for `W`, `S`, `M` and `F`, each with its own voice and each ending in **Set Variable** `Audio`.

After the last **End If**:
- **Set Name**: input the variable **Audio** (not any of the Make Spoken Audio outputs), name *ID*
- **Save File**: input *Renamed Item*, set up as in the simple version.

Why the shared variable: each Make Spoken Audio action has its own output, and Set Name can only point at one of them.
If that branch did not run for a line, there is nothing to save. Setting the same variable, `Audio`, in every branch
gives Set Name one input that always holds whichever voice just spoke.

#### File names and extensions
Name each file with just the `ID` variable and let Shortcuts keep its own extension. After your first test, look at the
file in the Files app (long-press → Get Info). In the game, set **Recordings are … files** in the Dub Studio to that
extension (for example `.m4a` or `.wav`); the manifest the Studio writes uses it.

#### Troubleshooting
- **An If block never matches:** type the tag as plain text, `N`, with no quote marks. Shortcuts compares the exact
  characters, so `'N'` or `"N"` will never equal `N`.
- **No file appears:** check Set Name's input is *Spoken Audio* (simple version) or the *Audio* variable (full version),
  and Save File's input is *Renamed Item*. Make sure the **The Way Audio** folder exists.
- **One file keeps being overwritten:** Set Name is not using the `ID` variable, so every file gets the same name.
- **The wrong text is spoken, or the ID is read aloud:** the "Last Item" list input points at the wrong Split Text.
- **Nothing happens at all:** run the Studio's **1 line (a test)** batch, and add **Quick Look** after Set Name to see
  what the shortcut produced.

### Each time
1. Play an episode in the game.
2. Open your scroll → Settings → **Recorded voices**. Choose the episode (and a single voice, for the simple shortcut)
   and tap **Copy next batch** (10 to 25 lines is kind to the phone).
3. Run the shortcut. Each line becomes a file named by its ID in Files → iCloud Drive → Shortcuts → The Way Audio.
4. Back in the game, tap **Mark batch recorded**.
5. When you have a few batches, copy the files into the game's `audio/en/` folder (for example with GitMobile), tap
   **Copy manifest**, and paste it into `audio/manifest.js`, replacing any earlier line for `en`.

The recordings are made with Apple's voices on your device. They are fine for your own copy of the game; before you
publish a game that includes them, check Apple's current terms for the voices.

---

## 2. Paid: OpenAI text-to-speech

`tools/dub-openai.mjs` turns a batch into MP3 files with OpenAI's speech API, using written direction ("instructions")
for each kind of voice. It needs Node 18 or newer and an OpenAI API key with billing set up.

1. In the game: Settings → Recorded voices → **Copy batch for a voice service**. Save the copied JSON as
   `batch.json` in the game folder.
2. Run: `OPENAI_API_KEY=sk-... node tools/dub-openai.mjs batch.json`
3. The script writes `audio/en/<ID>.mp3` for each line, skips files that already exist, waits between requests, and
   prints the manifest line to paste into `audio/manifest.js`. Tap **Mark batch recorded** in the game afterwards.

The voices and the direction for each tag are at the top of the script, so you can change the cast and the tone. OpenAI's
terms ask you to tell players that the voices are AI-generated; the game's About section is a good place for that.
