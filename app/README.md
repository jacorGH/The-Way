# The Way as iPhone and Android apps

The game is wrapped in [Capacitor](https://capacitorjs.com), which turns a web game into real store apps. Everything is
built by GitHub, on GitHub's own Linux and Mac machines, so **no Mac is needed**. You only push, tap **Run workflow**, and
download what it makes. On a public repository these builds cost nothing.

The whole game goes inside the app (Bibles and recorded voices too), so it plays offline from the first launch. The app
also does a few things a web page cannot: haptics, saving your book through the share sheet, keeping the screen on
while an episode plays or a voice reads, an optional reminder each morning of Advent, and optional tips.

| Workflow (Actions tab) | What it does | When |
|---|---|---|
| **App · Android** | Builds the Android app. Without an upload key: a test `.apk`. With one: a signed `.aab` for Google Play and a signed `.apk`. | Every release |
| **App · Android upload key (run once)** | Makes your Android upload key, encrypts it with your password, saves it in `app/keys/` | Once |
| **App · iPhone (TestFlight)** | Builds the iPhone app on GitHub's Mac, signs it and sends it to TestFlight | Every release |

**Icons.** `icons/icon-1024.png` is the master: full square, no transparency, because iPhone and Android round the
corners themselves. The iPhone icon and Android's older icon come from it. Android's adaptive icon (the shape each phone
chooses: circle, squircle, rounded square) is built from `icons/android-foreground.png` (the artwork, inside the area
every shape keeps) over `icons/android-background.png` (a soft, enlarged copy of it). To change the icon, replace those
files and run the workflows again.

**What the apps do that the web game does not.** They are iPhone-sized and held upright (portrait); an iPad runs the
iPhone app, so the store needs no iPad screenshots. Android's back button closes what is open, then steps back a screen
(scene → map → timeline → title), then leaves the app. The journey is also copied into the app's own storage as you
play and put back if the phone ever clears the web storage. Music and voices play with the silent switch on, like a
podcast app. Backups, your book and the leader's guide are saved through the share sheet. About shows the version and
build number, which helps when testers report something.

**Size.** The recordings make the app about 300 MB. Google Play allows 500 MB for an app like this; the App Store has
no limit, but above 200 MB an iPhone on mobile data asks before downloading.

The version people see comes from `"version"` in `app/package.json` (now 1.0.0). Raise it for each store release; the
build number goes up by itself.

---

## Android

### 1. Try it (free, no account)

1. Push this repository with the `app` folder and `.github/workflows`.
2. GitHub → **Actions** → **App · Android** → **Run workflow**. It takes about 8 minutes.
3. Open the finished run. Under **Artifacts**, download `the-way-apk-…`. Inside is `the-way-debug-….apk`, which any
   Android phone can install (it will ask to allow installs from that app).

### 2. The upload key (once)

1. GitHub → your repository → **Settings → Secrets and variables → Actions → New repository secret**.
   Name: `ANDROID_KEY_PASSWORD`. Value: a long password (at least 12 characters). **Save it in your password manager
   too.** If it is ever lost, Google can reset the upload key, but it takes a few days.
2. **Actions → App · Android upload key (run once) → Run workflow.** It adds `app/keys/android-upload.jks.enc` to the
   repository: the key, encrypted with your password, useless to anyone without it.
3. Keep that file in the repository from now on (pushing a new zip of the game does not remove it). Then run
   **App · Android** again. Now there are two artifacts: `the-way-google-play-…` holds the `.aab` to upload to Google
   Play, and `the-way-apk-…` a signed `.apk` to install on a phone. Each is about 290 MB; download only the one you
   need.

### 3. Google Play

1. Make a developer account at [play.google.com/console](https://play.google.com/console) ($25, once). Choose a
   personal account.
2. **Create app**: name *The Way: An Eyewitness Account*, game, free.
3. Fill in the store listing: short and full description, the icon (`icons/icon-512.png`), the feature graphic
   (`app/store/feature-graphic.png`, 1024 × 500), and phone screenshots. Privacy policy URL: `https://<you>.github.io/<repo>/privacy.html`.
4. **App content**: privacy policy, no ads, content rating questionnaire (answer honestly: it shows Bible events,
   including the crucifixion, without gore), target audience, data safety (the app collects and shares **no data**).
5. **Testing → Closed testing → Create track.** Upload the `.aab`. Add testers by email (12 or more: friends, family,
   church), and send them the opt-in link.
6. Google's rule for new personal accounts: **at least 12 testers opted in for 14 days in a row**. Then
   **Dashboard → Apply for production.** After approval, promote the same build to Production.

Google Play signs the published app with its own key (Play App Signing, on by default); your upload key only proves the
uploads are yours.

---

## iPhone

### 1. Apple Developer Program

Enroll in the Apple Developer Program ($99 a year). You can do it from the **Apple Developer** app on your iPhone.

### 2. The app's ID and its App Store record

1. [developer.apple.com](https://developer.apple.com/account) → **Certificates, Identifiers & Profiles → Identifiers →
   +** → App IDs → App. Bundle ID (explicit): `com.jacobcooper.theway`.
   (To use another ID, change `appId` in `app/capacitor.config.json` to match.)
2. [App Store Connect](https://appstoreconnect.apple.com) → **Apps → + → New App**: iOS, name *The Way: An Eyewitness
   Account* (if taken, add a word), primary language English, that bundle ID, SKU `theway`.

### 3. The secrets GitHub needs

In GitHub → **Settings → Secrets and variables → Actions**, add these repository secrets:

| Secret | Where it comes from |
|---|---|
| `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8` | App Store Connect → **Users and Access → Integrations → App Store Connect API → Team Keys → +** (access: **Admin**). Copy the Key ID and the Issuer ID. Download the `.p8` (only possible once), open it in Textastic, and paste **all** of its text, including the BEGIN and END lines, as `ASC_KEY_P8`. |
| `APPLE_TEAM_ID` | developer.apple.com → **Membership details → Team ID** (10 letters and numbers) |
| `MATCH_GIT_URL` | Make a new **private**, empty repository, for example `the-way-signing`. Its address: `https://github.com/<you>/the-way-signing.git` |
| `MATCH_GIT_TOKEN` | GitHub → **Settings → Developer settings → Fine-grained tokens → Generate**: repository access *only* `the-way-signing`, permission **Contents: Read and write** |
| `MATCH_PASSWORD` | A passphrase you make up. It encrypts the signing certificate in that private repository. Keep it in your password manager. |

The first build makes the App Store certificate and profile and stores them, encrypted, in `the-way-signing`. Every
later build reuses them. This is how signing works without a Mac or a Keychain of your own.

### 4. Build and test

1. **Actions → App · iPhone (TestFlight) → Run workflow.** About 15 to 25 minutes.
2. App Store Connect → your app → **TestFlight**. The build appears after Apple processes it (10 to 30 minutes). Add
   yourself as an internal tester, then install it with the **TestFlight** app on your iPhone.

### 5. Send it for review

App Store Connect → your app → the version page:

- **Screenshots**: take them on your iPhone in the game (title, a memory scene, the map, the study page, the Advent
  calendar). Screenshots from a large iPhone fill the required size.
- **Description, keywords, support URL** (your GitHub Pages address works), **privacy policy URL**
  (`…/privacy.html`).
- **App Privacy**: *Data Not Collected*.
- **Age rating**: answer the questionnaire honestly (Bible events, including the crucifixion, shown without gore).
- **Notes for Review**: "No account or sign-in. A Bible study game: walk through the Gospels and Acts as an eyewitness.
  Fully offline. Try The Birth of Jesus first (timeline → ✦), and the Advent calendar on the title screen."

Then choose the TestFlight build and **Submit for Review**.

**One licensing note.** The King James Version is under Crown copyright in the United Kingdom. Either leave the KJV out
of the copy you publish in the UK store, or publish outside the UK only (App Store Connect → Pricing and Availability).

---

## Tips (optional gifts, from version 1.1)

The apps are free. Players who want to can leave a tip from Settings → Support The Way, from the line under the title
screen's buttons, or from the one-time note after their third episode. A tip unlocks nothing. Apple and Google require
tips inside an app to go through their in-app purchase, so the apps use four **consumable** products:

| Product ID | Name in the game | Price |
|---|---|---|
| `com.jacobcooper.theway.tip1` | A cup of cold water / Un vaso de agua fría | $0.99 |
| `com.jacobcooper.theway.tip3` | Bread for the road / Pan para el camino | $2.99 |
| `com.jacobcooper.theway.tip5` | Oil for the lamp / Aceite para la lámpara | $4.99 |
| `com.jacobcooper.theway.tip10` | A gift for the journey / Un regalo para el camino | $9.99 |

The code is already in place (`js/support.js`, `js/native.js`, plugin `@capgo/native-purchases`). The apps ask the store
which of these products exist and show their prices in the player's own currency. **Until you create them, the apps show
no tip jar at all**, so the first release can go out without tips. The IDs live in `tips` in `js/about.js`; set it to
`false` to turn tips off.

Tip: send version 1.0 for review without tips, and do the steps below while it is in review. Then release 1.1 with them.

### Apple

1. **App Store Connect → Business** (Agreements, Tax, and Banking): sign the **Paid Apps Agreement**, add your bank
   account and the tax form (W-9 in the United States). Wait until it shows **Active**; in-app purchases do not work
   before that, even in testing.
2. Join the **App Store Small Business Program** (developer.apple.com → App Store Small Business Program). Apple then
   keeps 15% of each tip instead of 30%.
3. Your app → **Monetization → In-App Purchases → +**, type **Consumable**. Reference name `Tip 1`, Product ID
   `com.jacobcooper.theway.tip1`, price $0.99. Add a localization: display name *A cup of cold water*, description
   *An optional tip to support the game. It unlocks nothing.* Add Spanish too (*Un vaso de agua fría* / *Una propina
   opcional para apoyar el juego. No desbloquea nada.*). Review information: a screenshot of the tip jar and the note in
   `app/store/listing.md`. Repeat for the other three.
4. Build version 1.1 (raise `"version"` in `app/package.json`), run **App · iPhone (TestFlight)**, and try a tip in
   TestFlight: purchases there are free test purchases.
5. On the 1.1 version page, under **In-App Purchases**, add the four tips, then submit. Apple reviews the first tips
   together with that version.

### Google Play

1. **Play Console → Settings → Payments profile**: set it up (bank account and tax details).
2. Upload a 1.1 build (it carries Google's billing library) to a testing track. Play only lets you create products after
   such a build has been uploaded.
3. **Monetize with Play → Products → One-time products → Create**: product ID `com.jacobcooper.theway.tip1`, name, a
   description, price $0.99, then **Activate**. Repeat for the other three. (The app marks each tip as used up after
   it goes through, so the same tip can be given again.)
4. **Settings → License testing**: add your Google account and your testers', so you can try tips without being charged.
   Testers must install the app from Play (the testing track), not from a downloaded `.apk`.

Google keeps 15% of the first $1 million a year.

---

## If a build fails

Open the failed step in the run; the error is usually in the last lines. Common ones:

- **Missing secrets**: the first step names the ones it could not find.
- **iPhone: "No Xcode 26 on this runner"**: change `runs-on: macos-latest` in `.github/workflows/app-ios.yml` to
  `macos-26`.
- **iPhone: app record not found**: the App Store Connect record (step 2) must exist with the same bundle ID.
- **npm cannot find a Capacitor version**: in `app/package.json`, change every `^8.0.0` to `^7.0.0`.
