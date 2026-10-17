# 🌌 Mukti's Birthday Universe

A luxury, cinematic birthday-surprise website built with **plain HTML, CSS, vanilla JavaScript and Tailwind CSS**. No frameworks, no backend, no photos needed: every illustration (cosmos, roses, cake, gift box, moon) is drawn with CSS, SVG and canvas.

```
mukti-birthday/
├── index.html      structure of all 10 scenes
├── style.css       cinematic effects & animations
├── script.js       config (all text) + every interaction
├── README.md
└── assets/music/birthday-song.mp3   ← optional, you add this
```

## The ten scenes

1. **Intro**: dark screen, golden light, cosmic reveal, "ENTER YOUR UNIVERSE" (with Skip Intro)
2. **Universe**: nebulae, starfield, shooting stars, rotating planet, parallax
3. **Birthday hero**: HAPPY BIRTHDAY + name, moon, petals, hearts, golden frame
4. **Rose garden**: SVG roses, fireflies, butterflies, four blessings
5. **Friendship story**: glowing golden timeline (five chapters)
6. **Letter**: ivory envelope, wax seal, slide-out letter with typing animation
7. **Cake**: three-tier cake, blow out the candles (button, no microphone needed)
8. **Gift box**: ribbon, lid, glowing light, butterflies and stars
9. **Seven wishes**: tap to expand
10. **Grand finale**: moon, lanterns, fireworks, three working buttons

## Run it locally

You can double-click `index.html`, but a tiny local server is better (audio and fonts behave more reliably):

```bash
cd mukti-birthday

# Option A: Python (already on most computers)
python3 -m http.server 8000

# Option B: Node
npx serve .
```

Then open **http://localhost:8000**. The Tailwind CDN script and Google Fonts need an internet connection. If you're offline, the site still works and falls back to system fonts, but some layout utilities will be missing; use the production build below for fully offline use.

## Change the sender's name (the letter signature)

Open `script.js` and edit the three lines at the very top:

```js
const FRIEND_NAME = "Mukti";
const YOUR_NAME = "Harsh B.";                    // ← signs the letter
const FRIEND_NICKNAME = "MUKU";  // optional
```

* `YOUR_NAME` replaces the signature at the end of the letter.
* `FRIEND_NICKNAME` is optional. While it still says `YOUR_SPECIAL_NICKNAME`, the nickname lines are hidden. Once you set it, it appears on the envelope and in the finale.
* Changing `FRIEND_NAME` updates every title and line. The engraved letter on the wax seal is the `M` inside the `#waxSeal` button in `index.html`; change it there if the name starts with a different letter.

## Customize every message

All text lives in the `CONFIG` object in `script.js`, grouped by scene (`intro`, `universe`, `hero`, `garden`, `story`, `letter`, `cake`, `gift`, `wishes`, `finale`). Edit the strings and refresh.

You can use these tokens inside any string:

| Token | Becomes |
|---|---|
| `{{FRIEND}}` | `Mukti` |
| `{{FRIEND_UPPER}}` | `MUKTI` |
| `{{ME}}` | Harsh Budheliya |
| `{{NICKNAME}}` | muku  |

Examples: garden blessings are `CONFIG.garden.messages`, timeline chapters are `CONFIG.story.chapters`, the letter is `CONFIG.letter.body` (one string per paragraph), and the seven wishes are `CONFIG.wishes.items` (each has a short `line` and a longer `more` that appears on tap). You can add or remove items in those lists.

Typing speed of the letter: `CONFIG.letter.msPerChar` (lower = faster). Readers can also tap the letter, or press **Show the whole letter**, to reveal it instantly.

## Add the music

1. Choose a song you have the **right to use** (your own recording, a royalty-free track, or a licensed one). Don't use copyrighted songs without permission, especially if you publish the site.
2. Rename it **`birthday-song.mp3`** and put it in `assets/music/`.
3. Refresh. The player (bottom-right) and the **PLAY OUR SONG 🎵** button will start it after a tap, fading in smoothly. Browsers never allow sound before a click, so nothing autoplays.

If the file is missing, a friendly message explains how to add it and the rest of the site keeps working. To use a different file name or path, change `CONFIG.audio.src`.

## Deploy it online

It's a static site, so any static host works. Upload the whole `mukti-birthday` folder:

* **Netlify Drop**: go to app.netlify.com/drop and drag the folder in. You get a link in seconds.
* **GitHub Pages**: push the folder to a repo → *Settings → Pages* → deploy from the `main` branch.
* **Cloudflare Pages** or **Vercel**: create a project from the folder or repo; no build command and no framework needed (output directory `.`).

Tips: send the link on her birthday, and open it on your phone first to make sure the music plays after your tap. For a surprise, you can give the site a private-looking address (rename the Netlify site) rather than something guessable.

## Production: switch from the Tailwind CDN to the CLI build

`index.html` uses the **Tailwind CSS v4 browser build** (`@tailwindcss/browser@4`). That's perfect for a quick prototype, but it compiles CSS in the browser on every visit. For production, build the CSS once with the **v4 CLI**.

1. Install (Node 18+):

   ```bash
   npm init -y
   npm install tailwindcss @tailwindcss/cli
   ```

2. Create `input.css` next to `index.html`, using the same theme that's in the `<style type="text/tailwindcss">` block:

   ```css
   @import "tailwindcss";

   @theme {
     --color-midnight: #080713;
     --color-navy: #111127;
     --color-royal: #5B2B91;
     --color-cosmic: #9D6BFF;
     --color-rose: #F4A5C5;
     --color-gold: #E8C77B;
     --color-ivory: #FFF6E9;
     --font-display: "Cinzel", "Trajan Pro", Georgia, serif;
     --font-serif: "Cormorant Garamond", Georgia, serif;
     --font-sans: "Jost", system-ui, -apple-system, "Segoe UI", sans-serif;
     --font-script: "Pinyon Script", "Snell Roundhand", cursive;
   }
   ```

3. Build:

   ```bash
   npx @tailwindcss/cli -i ./input.css -o ./tailwind.css --minify
   ```

   (Add `--watch` while developing.) Tailwind v4 automatically scans your project files, including `index.html` and `script.js`, for class names.

4. In `index.html`, **delete** the `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4">` tag and the whole `<style type="text/tailwindcss">…</style>` block, and add this **before** `style.css`:

   ```html
   <link rel="stylesheet" href="tailwind.css">
   ```

> This guide is for **Tailwind v4 only**. Tailwind v3 uses a different setup (`tailwind.config.js`, `@tailwind base/components/utilities` directives, a different CDN script), so don't mix steps between versions. If you edit `script.js`, write class names in full (like `sm:grid-cols-2`) rather than building them from string pieces, so the CLI can detect them.

For extra polish in production you can also self-host the four Google Fonts (Cinzel, Cormorant Garamond, Jost, Pinyon Script) and pin the Tailwind CDN version if you keep using it.

## 🐒 Monkey Selfie Gallery (after the finale)

A funny, cinematic gallery between the grand finale and the "One Last Thing" note: intro, 8-photo masonry gallery, a full-screen photo viewer, a "Which monkey has your energy?" mini-game, and a "back to my birthday surprise" button.

**Two sets of images are not bundled; you need to add them** (the site never shows broken-image icons while they're missing; it shows a friendly "Photo coming soon" tile with the expected filename, and a deep-purple gradient replaces the galaxy photo):

### 1. Galaxy background
Save your galaxy photograph as:

```
assets/images/mukti-galaxy-background.jpg
```

It covers the whole gallery section (`background-size: cover`, centred, fixed on desktop, with a dark overlay for readability). On phones and tablets, where `background-attachment: fixed` is unreliable, the same photo sits on a fixed layer clipped to the section, so it still looks smooth.

### 2. Monkey photographs
Put real monkey photographs in `assets/images/monkeys/` using these exact filenames (or edit `CONFIG.monkeys.photos` in `script.js`):

| File | Caption title | Photo that suits it |
|---|---|---|
| `monkey-01-selfie.jpg` | THE SELFIE QUEEN 🐒📸 | a monkey facing the camera "selfie-style" |
| `monkey-02-outfit.jpg` | OUTFIT CHECK 😎 | a monkey with a stylish-looking expression |
| `monkey-03-model-walk.jpg` | THE MODEL WALK ✨ | a monkey walking or posing |
| `monkey-04-good-side.jpg` | MY GOOD SIDE 😂 | a monkey in profile or showing an angle |
| `monkey-05-caught-4k.jpg` | CAUGHT IN 4K 📷 | a monkey staring into the lens |
| `monkey-06-besties.jpg` | BESTIE ENERGY 💕 | two monkeys together |
| `monkey-07-drama.jpg` | THE DRAMA QUEEN 👑 | a shocked or surprised monkey face |
| `monkey-08-final-pose.jpg` | THE FINAL POSE 🔥 | a monkey sitting like a model |

**Licensing:** only use photos you have the right to use. Good sources are Wikimedia Commons (check each file's license; some require attribution) and Unsplash (read its license). Download the files and keep them in the project rather than hot-linking, so they never disappear. One well-known lead for photo 1 is the Wikimedia Commons file "Macaca nigra self-portrait" (the 2011 crested macaque selfie). It is widely treated as public domain, but its copyright status was publicly disputed, so read its Commons file page and decide for yourself.

**Alt text & credits:** each photo gets a generic alt text by default. For better accessibility, add a real description (and a credit if the license requires one); the credit shows up in the photo viewer:

```js
{ file: "monkey-01-selfie.jpg", ratio: [4, 5], focus: "50% 40%",
  title: "THE SELFIE QUEEN 🐒📸", caption: "POV: ...",
  alt: "A black macaque looking straight at the camera",
  credit: "Author name, CC BY 2.0, via Wikimedia Commons" }
```

`ratio` is the width:height of your photo, which reserves space so the page never jumps while images load, and `focus` is the crop focus point (e.g. `"50% 20%"` keeps heads in frame). The funny captions are only jokes and do not claim the monkeys are actually doing those things.

**Gallery controls:** click or tap a photo to open the viewer. Use ← / → keys, the on-screen arrows, or swipe to move; press Esc, tap the X, or tap the dark backdrop to close. Page scrolling is locked while it's open.

**Quiz:** the four options are `CONFIG.monkeys.quiz.options`; set `photo` to a photo's position (0-based) and write a friendly `name` and `msg`.

## Accessibility & performance notes

* Semantic sections and headings, labelled buttons, visible gold keyboard focus, proper `aria-expanded` on the wishes, `aria-live` on typed and revealed messages.
* `prefers-reduced-motion` is respected: lighter intro, no confetti or fireworks loops, no typing animation, fewer moving decorations.
* One fixed starfield canvas plus one effects canvas, never thousands of DOM nodes. Particle counts shrink on phones, canvas loops pause when the tab is hidden, and the effects canvas stops when nothing is animating. Decorative CSS animations pause while their scene is off-screen.
* No remote images are used anywhere.

Made with love. Happy Birthday, Mukti! 💗
