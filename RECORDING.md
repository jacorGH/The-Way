# Recording voices for The Way

Every line in the game has a permanent ID (see `js/lines.js`). A recording named `<ID>.m4a` (or `.mp3`) in
`audio/<lang>/`, listed in `audio/manifest.js`, is played instead of the device voice. Lines without a recording are
still read by the device, so you can record a little at a time.

There are two ways to make recordings:

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

### Once: build the shortcut "The Way: record"
In the Shortcuts app, tap **+** and add these actions in order. (Names can differ slightly between iOS versions; search
for them by the words shown.)

1. **Get Clipboard**
2. **Split Text**: split *Clipboard* by **New Lines**
3. **Repeat with Each** item in *Split Text*. Inside the repeat:
   1. **Split Text**: split *Repeat Item* by **Custom** `|`
   2. **Get Item from List**: **First Item** of that list → **Set Variable** `ID`
   3. **Get Item from List**: **Item At Index** `2` of the same list → **Set Variable** `Tag`
   4. **Get Item from List**: **Last Item** of the same list → **Set Variable** `Line`
   5. Five **If** blocks, one per voice tag. For the first: **If** `Tag` **is** `N`, add **Make Spoken Audio from Text**
      with *Line*, tap the arrow to choose the voice (Evan (Enhanced)), then **Set Variable** `Audio`. End If.
      Repeat for `W`, `S`, `M` and `F` with their voices.
   6. **Set Name** of `Audio` to `ID` followed by `.m4a` (insert the `ID` variable, then type `.m4a`)
   7. **Save File**: turn **Ask Where to Save** off, choose the Shortcuts folder in iCloud Drive, set the subpath to
      `The Way Audio/`, and turn **Overwrite If File Exists** on.
4. After the repeat: **Show Notification** "Batch recorded".

You can also set the speaking rate and pitch in each Make Spoken Audio action (the defaults are fine).

### Each time
1. Play an episode in the game.
2. Open your scroll → Settings → **Recorded voices**. Choose the episode and tap **Copy next batch** (10 to 25 lines is
   kind to the phone).
3. Run **The Way: record**. Each line becomes `<ID>.m4a` in Files → iCloud Drive → Shortcuts → The Way Audio.
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
