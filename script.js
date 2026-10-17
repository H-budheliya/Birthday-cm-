/* ==========================================================================
   MUKTI — script.js
   Vanilla JavaScript only. No frameworks, no eval, no network calls.

   SECTIONS
     1. Personalization (edit these three lines first!)
     2. CONFIG — every word on the site lives here
     3. Helpers
     4. Sky (background stars / dust / shooting stars)       – canvas
     5. FX  (confetti / sparks / fireworks)                  – canvas
     6. Decorations (petals, hearts, fireflies, lanterns…)
     7. Builders (garden, story, cake, wishes, letter)
     8. Scenes: intro, transitions, letter, cake, gift, wishes, finale
     9. Music player
    10. Observers, events, init, reset
   ========================================================================== */
"use strict";

/* ==========================================================================
   1. PERSONALIZATION
   ========================================================================== */
const FRIEND_NAME = "Mukti";
const YOUR_NAME = "Harsh Budheliya";          // signs the letter
const FRIEND_NICKNAME = "MUKU"; // birthday nickname shown in the letter

/* ==========================================================================
   2. CONFIG — all text. Tokens you can use inside any string:
      {{FRIEND}}  {{FRIEND_UPPER}}  {{ME}}  {{NICKNAME}}
   ========================================================================== */
const CONFIG = {
  audio: {
    src: "assets/music/birthday-song.mp3",
    volume: 0.6,
    fadeMs: 1800,
    missing: "The music file isn't added yet. Save your song as assets/music/birthday-song.mp3 and refresh. Everything else works without it.",
    blocked: "Your browser needs one more tap to start the music."
  },

  intro: {
    lines: [
      "Some people enter our lives...",
      "And make ordinary moments extraordinary.",
      "Today, the universe has something special to celebrate."
    ],
    title: "{{FRIEND_UPPER}}",
    subtitle: "A little universe, made just for you.",
    enter: "ENTER YOUR UNIVERSE ✨",
    skip: "Skip intro"
  },

  universe: {
    welcome: "Welcome to your own little universe, {{FRIEND}}.",
    line: "If the stars could celebrate one person today, they would all be shining for you.",
    button: "DISCOVER YOUR SURPRISE"
  },

  hero: {
    title: "HAPPY BIRTHDAY",
    name: "{{FRIEND_UPPER}}",
    subtitle: "Today, the world gets another reason to shine.",
    begin: "BEGIN THE CELEBRATION",
    song: "PLAY OUR SONG 🎵",
    songPause: "PAUSE OUR SONG ⏸"
  },

  garden: {
    heading: "The Rose Garden",
    sub: "Four little blessings, grown just for you.",
    next: "CONTINUE ✨",
    messages: [
      { label: "YOUR SMILE", text: "May you always find a reason to smile, even when life feels difficult.", icon: "i-smile" },
      { label: "YOUR DREAMS", text: "May you always have the courage to follow your dreams and believe in yourself.", icon: "i-star" },
      { label: "YOUR HAPPINESS", text: "May happiness find you in the little things and unexpected moments.", icon: "i-flower" },
      { label: "YOUR FUTURE", text: "May the years ahead bring you wonderful opportunities and beautiful memories.", icon: "i-compass" }
    ]
  },

  story: {
    heading: "THE FRIENDSHIP STORY",
    sub: "Five small chapters, written with love.",
    next: "CONTINUE ✨",
    chapters: [
      { title: "THE BEGINNING", icon: "i-spark", text: "Every beautiful friendship has a beginning, and sometimes we only realize how special it is as time passes." },
      { title: "THE LITTLE MOMENTS", icon: "i-flower", text: "Some of the best memories come from small conversations, unexpected laughter, and ordinary days made special." },
      { title: "THE CRAZY SIDE", icon: "i-smile", text: "May we always have reasons to laugh, share silly jokes, and create unforgettable memories." },
      { title: "ALWAYS CHEERING FOR YOU", icon: "i-star", text: "I hope you always find the courage to follow your dreams and the strength to overcome difficult days." },
      { title: "THE MEMORIES AHEAD", icon: "i-book", text: "The best part of friendship is knowing there are still so many stories left to write." }
    ]
  },

  letter: {
    teaser: "{{FRIEND}}, a little something from the heart...",
    openLabel: "OPEN YOUR LETTER 💌",
    envelopeTo: "For {{FRIEND}}",
    envelopeNick: "a.k.a. {{NICKNAME}}",
    skipTyping: "SHOW THE WHOLE LETTER",
    continue: "CONTINUE TO THE BIRTHDAY CAKE 🎂",
    msPerChar: 16,
    greeting: "Dear {{FRIEND}},",
    body: [
      "Happy Birthday! 💗",
      "Today, I just want to remind you that you are a genuinely special person, and I hope life gives you countless reasons to smile.",
      "I'm grateful that I get to call you my best friend. A good friendship makes ordinary days brighter, laughter louder, and difficult moments a little easier to face.",
      "I hope this new chapter brings you peace, confidence, success, and happiness in the things that matter most to you.",
      "Keep being yourself, keep following your dreams, and keep believing that beautiful things are possible.",
      "I hope we continue creating silly memories, sharing endless conversations, laughing at ridiculous things, and cheering each other on through every new chapter.",
      "Thank you for being my best friend.",
      "Happy Birthday, {{FRIEND}}.",
      "Keep shining. The world is brighter with you in it."
    ],
    closing: "With lots of love and friendship,",
    signature: "{{ME}} 💖"
  },

  cake: {
    title: "MAKE A WISH, {{FRIEND_UPPER}}",
    subtitle: "Close your eyes for a moment and make a beautiful wish.",
    button: "BLOW OUT THE CANDLES ✨",
    buttonDone: "WISH MADE ✨",
    message: "May the wishes closest to your heart find their way to you.",
    next: "CONTINUE ✨"
  },

  gift: {
    title: "ONE MORE LITTLE SURPRISE",
    button: "UNWRAP YOUR GIFT 🎁",
    buttonDone: "UNWRAPPED 🎁",
    message: [
      "If I could wrap one thing up for you, it would be all the happiness, confidence, peace, and beautiful opportunities I hope life brings your way.",
      "Since that doesn't fit inside a box, consider this little website a reminder that your birthday deserves to feel special.",
      "Keep dreaming. Keep laughing. Keep shining."
    ],
    next: "CONTINUE ✨"
  },

  wishes: {
    title: "SEVEN WISHES FOR YOUR NEW CHAPTER",
    hint: "Tap a wish to open it.",
    next: "TO THE GRAND FINALE ✨",
    items: [
      { title: "HAPPINESS", icon: "i-sun", line: "Happiness that stays even after difficult days.", more: "Some days will feel heavy. I hope joy keeps finding its way back to you, gently and every single time." },
      { title: "CONFIDENCE", icon: "i-crown", line: "Confidence to believe in yourself.", more: "You deserve to trust your own voice. I hope you walk into every room knowing you belong there." },
      { title: "COURAGE", icon: "i-compass", line: "Courage to explore new possibilities.", more: "Try the new thing. Take the leap. I hope curiosity always wins over fear." },
      { title: "FRIENDS", icon: "i-friends", line: "Friends who respect and appreciate you.", more: "May you be surrounded by people who celebrate you, listen to you, and never make you feel small." },
      { title: "SUCCESS", icon: "i-target", line: "Success in the goals that matter to you.", more: "May your hard work meet perfect timing, and every goal you care about come within reach." },
      { title: "PEACE & HEALTH", icon: "i-leaf", line: "Peace, health, and beautiful everyday moments.", more: "I hope your days are calm, your body is strong, and you notice the quiet, lovely moments." },
      { title: "MEMORIES", icon: "i-book", line: "A year full of memories you will love looking back on.", more: "May this year give you stories that make you smile for a very long time." }
    ]
  },

  finale: {
    lines: [
      "One more year of becoming...",
      "One more year of discovering...",
      "One more year of beautiful possibilities."
    ],
    title: "HAPPY BIRTHDAY, {{FRIEND_UPPER}}",
    message: "I hope this year brings you more happiness than you expected, more opportunities than you imagined, and more reasons to smile than you can count.",
    thanks: "Thank you for being a beautiful part of my life.",
    stay: "Stay happy. Stay fearless. Keep shining.",
    nickLine: "Always cheering for you, {{NICKNAME}} 💫",
    final: "THIS LITTLE UNIVERSE WAS CREATED JUST FOR YOU.",
    celebrate: "CELEBRATE AGAIN ✨",
    replay: "REPLAY FROM THE BEGINNING",
    letterAgain: "READ YOUR LETTER AGAIN 💌"
  },

  lastNote: {
    title: "One Last Thing, Mukti… 💗",
    body: [
      "I may not be your closest friend, your best-best friend, or even someone on your special list, but you will always be one of my best friends.",
      "So, I made this little gift just for you, hoping it would bring a smile to your face and make your birthday a little more special.",
      "I really hope you liked this small surprise from my side!",
      "How did you like it? Please leave your review in the chat!"
    ],
    wish: "With best wishes,",
    from: "Your College Friend,",
    signature: "Harsh Budheliya ❤️",
    button: "Share Your Review 💌",
    reviewMessage: "Thank you for taking the time, Mukti! 💗 When you're ready, please send your thoughts to Harsh through your usual chat app. Nothing is sent from this page; it's just a friendly reminder."
  },

  monkeys: {
    kicker: "WAIT... {{FRIEND_UPPER}}! 🐒",
    title: "Meet Your New Selfie Squad!",
    subtitle: "Forget human models. These monkeys have better poses, better expressions, and absolutely zero camera shyness.",
    button: "MEET THE MONKEYS 📸",
    note: "Captions are just for fun. The monkeys are simply being monkeys. 🐒",
    fallbackHint: "Photo coming soon",
    // Photos live in assets/images/monkeys/. Add `alt` (describe what's really in the picture)
    // and `credit` (author + license) to any photo. `ratio` = [width, height] reserves space; `focus` = crop focus.
    photos: [
      { file: "monkey-01-selfie.jpg",     ratio: [4, 5], focus: "50% 40%", title: "THE SELFIE QUEEN 🐒📸",   caption: "POV: When your selfie game is better than everyone's." },
      { file: "monkey-02-outfit.jpg",     ratio: [1, 1], focus: "50% 35%", title: "OUTFIT CHECK 😎",         caption: "Serving jungle fashion with zero effort." },
      { file: "monkey-03-model-walk.jpg", ratio: [3, 4], focus: "50% 40%", title: "THE MODEL WALK ✨",        caption: "When the photographer says, 'Act natural.'" },
      { file: "monkey-04-good-side.jpg",  ratio: [4, 3], focus: "50% 35%", title: "MY GOOD SIDE 😂",         caption: "Every angle is my good angle. Obviously." },
      { file: "monkey-05-caught-4k.jpg",  ratio: [1, 1], focus: "50% 35%", title: "CAUGHT IN 4K 📷",         caption: "That face when someone opens your front camera accidentally." },
      { file: "monkey-06-besties.jpg",    ratio: [4, 3], focus: "50% 45%", title: "BESTIE ENERGY 💕",         caption: "Two besties. One brain cell. Infinite drama." },
      { file: "monkey-07-drama.jpg",      ratio: [4, 5], focus: "50% 35%", title: "THE DRAMA QUEEN 👑",      caption: "When someone says the birthday cake is finished." },
      { file: "monkey-08-final-pose.jpg", ratio: [3, 4], focus: "50% 40%", title: "THE FINAL POSE 🔥",       caption: "Born to be iconic. Forced to live in the jungle." }
    ],
    quiz: {
      title: "OKAY {{FRIEND_UPPER}}... BE HONEST 😂",
      question: "Which monkey has your energy?",
      hint: "Tap a monkey to find out.",
      found: "HAHA! We found your jungle twin! 🐒",
      options: [
        { photo: 0, name: "THE SELFIE QUEEN",  msg: "Camera-ready at every moment. Every photo is better with you in it." },
        { photo: 2, name: "THE MODEL WALK",    msg: "Effortless style and main-character confidence. The jungle is your runway." },
        { photo: 5, name: "BESTIE ENERGY",     msg: "Loyal, loud and fun. The one who makes every group chat better." },
        { photo: 6, name: "THE DRAMA QUEEN",   msg: "Big feelings, big reactions, and zero boring moments. Everyone loves the show." }
      ]
    },
    final: {
      message: "Life is better with a little madness, a lot of laughter, and friends who make ordinary days unforgettable. 💗",
      birthday: "HAPPY BIRTHDAY, {{FRIEND_UPPER}}! 🎂",
      button: "BACK TO MY BIRTHDAY SURPRISE ✨"
    }
  },

  footer: {
    credit: "Made with ❤️ by Harsh B."
  }
};

/* ==========================================================================
   3. HELPERS
   ========================================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const motionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
const reduced = () => motionMQ.matches;
const small = () => window.innerWidth < 640;

const NICK_SET = Boolean(FRIEND_NICKNAME) && FRIEND_NICKNAME !== "YOUR_SPECIAL_NICKNAME";
const TOKENS = { FRIEND: FRIEND_NAME, FRIEND_UPPER: FRIEND_NAME.toUpperCase(), ME: YOUR_NAME, NICKNAME: FRIEND_NICKNAME };
const fill = (s) => String(s).replace(/\{\{(\w+)\}\}/g, (m, k) => (k in TOKENS ? TOKENS[k] : m));
const text = (path) => fill(path.split(".").reduce((o, k) => (o == null ? o : o[k]), CONFIG) ?? "");

/** Small timer group so every pending timeout can be cancelled at once (skip / replay). */
function createTimers() {
  const ids = new Set();
  return {
    later(fn, ms) { const id = setTimeout(() => { ids.delete(id); fn(); }, ms); ids.add(id); return id; },
    clear() { ids.forEach(clearTimeout); ids.clear(); }
  };
}
const introT = createTimers();
const sceneT = createTimers();
const icon = (id, cls = "icon") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#${id}"/></svg>`;

function applyText() {
  $$("[data-cfg]").forEach((el) => { el.textContent = text(el.dataset.cfg); });
  document.title = `Happy Birthday, ${FRIEND_NAME} ✨`;
  $("#envNick").hidden = !NICK_SET;
  $("#finaleNick").hidden = !NICK_SET;
}

/* ==========================================================================
   4. SKY — stars, golden dust and shooting stars on one canvas
   ========================================================================== */
const Sky = (() => {
  const canvas = $("#bgCanvas");
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = 1, raf = 0, last = 0, nextShoot = 0, rate = 1, prevSmall = null;
  let stars = [], dust = [], shooters = [];
  let mx = 0, my = 0, tx = 0, ty = 0;
  const colors = ["255,246,233", "255,246,233", "232,199,123", "200,170,255", "244,165,197"];

  function build() {
    const s = small();
    const mp = (w * h) / 1e6;
    const count = Math.round(clamp(mp * (s ? 170 : 140), s ? 70 : 120, s ? 110 : 240));
    stars = Array.from({ length: count }, () => {
      const c = pick(colors);
      return { nx: Math.random(), ny: Math.random(), r: rand(0.4, 1.7), a: rand(0.35, 1), sp: rand(0.6, 2.2), ph: rand(0, 6.28), d: rand(0.2, 1), fill: `rgb(${c})` };
    });
    dust = Array.from({ length: s ? 16 : 36 }, () => ({ nx: Math.random(), ny: Math.random(), r: rand(1, 2.6), a: rand(0.25, 0.7), v: rand(0.08, 0.25), ph: rand(0, 6.28), sw: rand(0.3, 1) }));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, small() ? 1.5 : 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (small() !== prevSmall) { prevSmall = small(); build(); }
    if (!raf) draw(performance.now(), 1);
  }

  function spawnShooter() {
    const ang = rand(0.45, 0.75), sp = rand(9, 14);
    shooters.push({ x: rand(0.3, 1.05) * w, y: rand(-0.05, 0.45) * h, vx: -Math.cos(ang) * sp, vy: Math.sin(ang) * sp, tail: rand(7, 11), life: 0, max: rand(45, 70) });
  }

  function draw(ts, dt) {
    ctx.clearRect(0, 0, w, h);
    tx += (mx - tx) * 0.04; ty += (my - ty) * 0.04;
    const sy = window.scrollY, still = reduced();

    for (const s of stars) {
      const tw = still ? 1 : 0.55 + 0.45 * Math.sin(ts * 0.001 * s.sp + s.ph);
      const x = s.nx * w + tx * s.d * 16;
      let y = s.ny * h - sy * s.d * 0.06 + ty * s.d * 16;
      y = ((y % h) + h) % h;
      ctx.globalAlpha = s.a * tw; ctx.fillStyle = s.fill;
      if (s.r < 1) ctx.fillRect(x, y, s.r * 2, s.r * 2);
      else { ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.2832); ctx.fill(); }
    }

    for (const p of dust) {
      if (!still) { p.ny -= p.v * 0.003 * dt; if (p.ny < -0.03) { p.ny = 1.03; p.nx = Math.random(); } }
      const x = p.nx * w + (still ? 0 : Math.sin(ts * 0.0004 * p.sw + p.ph) * 14);
      const y = p.ny * h;
      const a = p.a * (still ? 1 : 0.6 + 0.4 * Math.sin(ts * 0.0012 + p.ph));
      ctx.fillStyle = "#E8C77B";
      ctx.globalAlpha = a * 0.14; ctx.beginPath(); ctx.arc(x, y, p.r * 3.2, 0, 6.2832); ctx.fill();
      ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, p.r * 0.7, 0, 6.2832); ctx.fill();
    }

    if (!still && ts > nextShoot) { spawnShooter(); nextShoot = ts + rand(2800, 7000) / rate; }
    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.x += s.vx * dt; s.y += s.vy * dt; s.life += dt;
      const a = 1 - s.life / s.max;
      if (a <= 0) { shooters.splice(i, 1); continue; }
      const ex = s.x - s.vx * s.tail, ey = s.y - s.vy * s.tail;
      const g = ctx.createLinearGradient(s.x, s.y, ex, ey);
      g.addColorStop(0, `rgba(255,246,233,${a})`); g.addColorStop(1, "rgba(232,199,123,0)");
      ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.7; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(ex, ey); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    if (ts - last < (small() ? 32 : 0)) return;   // ~30fps cap on phones
    const dt = Math.min(50, ts - (last || ts - 16)) / 16.67;
    last = ts;
    draw(ts, dt);
  }

  function start() {
    if (reduced()) { draw(0, 1); return; }
    if (raf) return;
    last = 0; raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  return {
    init() {
      resize(); start();
      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
      motionMQ.addEventListener("change", () => { stop(); start(); });
    },
    show() { canvas.classList.add("on"); },
    hide() { canvas.classList.remove("on", "zoom"); },
    zoomPulse() { canvas.classList.add("zoom"); setTimeout(() => canvas.classList.remove("zoom"), 1700); },
    shoot() { if (!reduced()) spawnShooter(); },
    setRate(r) { rate = r; },
    pointer(nx, ny) { mx = nx; my = ny; }
  };
})();

/* ==========================================================================
   5. FX — sparks, confetti and fireworks on a top-layer canvas.
      The loop only runs while something is alive.
   ========================================================================== */
const FX = (() => {
  const canvas = $("#fxCanvas");
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = 1, raf = 0, last = 0, showOn = false, nextRocket = 0;
  let sparks = [], bits = [], rockets = [];
  const PALETTES = [
    ["#FFE9A8", "#E8C77B", "#FFF6E9"],
    ["#F4A5C5", "#FFD3E4", "#FFF6E9"],
    ["#CDA8FF", "#9D6BFF", "#FFF6E9"],
    ["#E8C77B", "#F4A5C5", "#CDA8FF"]
  ];
  const CONFETTI = ["#E8C77B", "#F4A5C5", "#9D6BFF", "#FFF6E9", "#FFD27A", "#FF8FB8"];
  const cap = () => (small() ? 300 : 650);

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, small() ? 1.5 : 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function ensure() { if (!raf && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } }

  function burst(x, y, o = {}) {
    let n = o.count ?? 60;
    if (reduced()) n = Math.ceil(n / 5);
    if (small()) n = Math.ceil(n * 0.7);
    const cols = o.colors || PALETTES[0], sp = o.speed ?? 5, ring = Boolean(o.ring), g = o.gravity ?? 0.06;
    for (let i = 0; i < n && sparks.length < cap(); i++) {
      const a = ring ? (i / n) * Math.PI * 2 : Math.random() * Math.PI * 2;
      const v = ring ? sp : sp * rand(0.35, 1);
      sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0, max: o.max ?? rand(50, 80), c: pick(cols), g, drag: 0.975, sz: rand(1.2, 2.4) });
    }
    ensure();
  }
  function burstAtElement(el, o) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, o);
  }
  function confetti(o = {}) {
    if (reduced()) return;
    let n = o.count ?? 120;
    if (small()) n = Math.ceil(n * 0.6);
    const rain = o.x === undefined;
    for (let i = 0; i < n && bits.length < cap(); i++) {
      let x, y, vx, vy;
      if (rain) { x = rand(0, w); y = rand(-40, -5); vx = rand(-1, 1); vy = rand(1.5, 4); }
      else {
        const a = ((o.angle ?? -90) + rand(-(o.spread ?? 60) / 2, (o.spread ?? 60) / 2)) * Math.PI / 180;
        const v = rand(0.5, 1) * (o.power ?? 14);
        x = o.x; y = o.y; vx = Math.cos(a) * v; vy = Math.sin(a) * v;
      }
      bits.push({ x, y, vx, vy, w: rand(6, 11), h: rand(4, 7), rot: rand(0, 6.28), vr: rand(-0.2, 0.2), flip: rand(0, 6.28), vf: rand(0.05, 0.2), c: pick(CONFETTI), life: 0, max: rand(160, 280) });
    }
    ensure();
  }
  function launchRocket(x) {
    rockets.push({ x: x ?? rand(0.15, 0.85) * w, y: h + 10, vy: -rand(9, 12) * clamp(h / 900, 0.7, 1.2), ty: rand(0.14, 0.42) * h, pal: pick(PALETTES), ring: Math.random() < 0.4 });
    ensure();
  }
  function volley(n = 5) {
    if (reduced()) { burst(w * 0.5, h * 0.35, { count: 50, ring: true, speed: 4 }); return; }
    for (let i = 0; i < n; i++) sceneT.later(() => launchRocket(w * (0.15 + (0.7 * i) / Math.max(1, n - 1))), i * 260);
  }

  function tick(ts) {
    if (document.hidden) { raf = 0; return; }
    const dt = clamp((ts - last) / 16.67, 0.2, 3); last = ts;
    ctx.clearRect(0, 0, w, h);

    if (showOn && !reduced() && ts > nextRocket && rockets.length < (small() ? 2 : 3)) {
      launchRocket(); nextRocket = ts + (small() ? rand(900, 1700) : rand(600, 1400));
    }

    // Rockets
    ctx.globalCompositeOperation = "source-over";
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy * dt; r.vy *= 0.985;
      if (sparks.length < cap()) sparks.push({ x: r.x, y: r.y, vx: rand(-0.3, 0.3), vy: rand(0.2, 0.8), life: 0, max: 22, c: "#FFE9A8", g: 0.02, drag: 0.95, sz: 1.2 });
      ctx.globalAlpha = 1; ctx.fillStyle = "#FFF6E9"; ctx.beginPath(); ctx.arc(r.x, r.y, 2, 0, 6.2832); ctx.fill();
      if (r.y <= r.ty || r.vy > -2.2) {
        burst(r.x, r.y, { count: small() ? 46 : 80, colors: r.pal, speed: rand(4, 6.5), ring: r.ring, max: rand(60, 90) });
        rockets.splice(i, 1);
      }
    }

    // Confetti
    for (let i = bits.length - 1; i >= 0; i--) {
      const b = bits[i];
      b.vx *= 0.99; b.vy = Math.min(b.vy + 0.12 * dt, 4.2); b.x += (b.vx + Math.sin(b.flip) * 0.5) * dt; b.y += b.vy * dt;
      b.rot += b.vr * dt; b.flip += b.vf * dt; b.life += dt;
      if (b.life > b.max || b.y > h + 20) { bits[i] = bits[bits.length - 1]; bits.pop(); continue; }
      ctx.globalAlpha = Math.min(1, (b.max - b.life) / 40);
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.rot); ctx.scale(1, Math.cos(b.flip));
      ctx.fillStyle = b.c; ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); ctx.restore();
    }

    // Sparks (additive streaks)
    ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.vx *= s.drag; s.vy = s.vy * s.drag + s.g * dt; s.x += s.vx * dt; s.y += s.vy * dt; s.life += dt;
      if (s.life >= s.max) { sparks[i] = sparks[sparks.length - 1]; sparks.pop(); continue; }
      const a = 1 - s.life / s.max;
      ctx.globalAlpha = a * a; ctx.strokeStyle = s.c; ctx.lineWidth = s.sz;
      ctx.beginPath(); ctx.moveTo(s.x - s.vx * 1.6, s.y - s.vy * 1.6); ctx.lineTo(s.x, s.y); ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;

    if (!sparks.length && !bits.length && !rockets.length && !showOn) { raf = 0; ctx.clearRect(0, 0, w, h); return; }
    raf = requestAnimationFrame(tick);
  }

  return {
    init() {
      resize();
      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", () => { if (!document.hidden && (sparks.length || bits.length || rockets.length || showOn)) ensure(); });
    },
    burst, burstAtElement, confetti, launchRocket, volley,
    startShow() { if (reduced()) return; showOn = true; nextRocket = 0; ensure(); },
    stopShow() { showOn = false; },
    clear() { sparks = []; bits = []; rockets = []; showOn = false; ctx.clearRect(0, 0, w, h); }
  };
})();

/* ==========================================================================
   6. DECORATIONS — a handful of DOM elements, animated purely by CSS
   ========================================================================== */
const density = (n) => (small() ? Math.max(3, Math.ceil(n * 0.55)) : n);
function scatter(container, count, build) {
  if (!container) return;
  container.textContent = "";
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) frag.appendChild(build(i));
  container.appendChild(frag);
}
function spawnPetals(container, n) {
  scatter(container, density(n), () => {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.cssText = `--x:${rand(0, 100).toFixed(1)}%;--s:${rand(10, 20).toFixed(0)}px;--dur:${rand(11, 20).toFixed(1)}s;--delay:${(-rand(0, 20)).toFixed(1)}s;--drift:${rand(-120, 120).toFixed(0)}px`;
    return p;
  });
}
function spawnHearts(container, n) {
  scatter(container, density(n), () => {
    const s = document.createElement("span");
    s.className = "heart-f";
    s.style.cssText = `--x:${rand(4, 96).toFixed(1)}%;--s:${rand(12, 24).toFixed(0)}px;--dur:${rand(10, 18).toFixed(1)}s;--delay:${(-rand(0, 16)).toFixed(1)}s;--drift:${rand(-60, 60).toFixed(0)}px`;
    s.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-heartfill"/></svg>';
    return s;
  });
}
function spawnFireflies(container, n) {
  scatter(container, density(n), () => {
    const f = document.createElement("span");
    f.className = "firefly";
    f.style.cssText = `--x:${rand(2, 98).toFixed(1)}%;--y:${rand(20, 90).toFixed(1)}%;--dx:${rand(-60, 60).toFixed(0)}px;--dy:${rand(-70, 40).toFixed(0)}px;--dur:${rand(5, 10).toFixed(1)}s;--delay:${(-rand(0, 8)).toFixed(1)}s`;
    return f;
  });
}
function spawnLanterns(container, n) {
  scatter(container, density(n), () => {
    const l = document.createElement("span");
    l.className = "lantern";
    l.style.cssText = `--x:${rand(3, 94).toFixed(1)}%;--s:${rand(16, 30).toFixed(0)}px;--dur:${rand(16, 28).toFixed(1)}s;--delay:${(-rand(0, 24)).toFixed(1)}s;--drift:${rand(-80, 80).toFixed(0)}px`;
    return l;
  });
}
function spawnButterflies(container, n) {
  const tpl = $("#tpl-butterfly");
  scatter(container, density(n), () => {
    const b = document.createElement("div");
    b.className = "bfly";
    b.style.cssText = `--x:${rand(5, 70).toFixed(0)}%;--y:${rand(20, 65).toFixed(0)}%;--s:${rand(26, 40).toFixed(0)}px;--dur:${rand(12, 20).toFixed(1)}s;--delay:${(-rand(0, 14)).toFixed(1)}s`;
    b.appendChild(tpl.content.cloneNode(true));
    return b;
  });
}
function decorate() {
  spawnPetals($("#heroPetals"), 16);
  spawnHearts($("#heroHearts"), 9);
  spawnFireflies($("#gardenFireflies"), 16);
  spawnPetals($("#gardenPetals"), 12);
  spawnButterflies($("#gardenButterflies"), 5);
  spawnLanterns($("#finaleLanterns"), 10);
  spawnPetals($("#finalePetals"), 14);
  spawnFireflies($("#noteGlow"), 14);
  spawnHearts($("#noteHearts"), 8);
}

/* ==========================================================================
   7. BUILDERS — generate repeated markup from CONFIG
   ========================================================================== */
function buildGarden() {
  // Messages
  const ul = $("#gardenMessages");
  ul.textContent = "";
  CONFIG.garden.messages.forEach((m, i) => {
    const li = document.createElement("li");
    li.className = "msg-card glass reveal";
    li.style.setProperty("--d", `${0.1 + i * 0.18}s`);
    li.innerHTML = `${icon(m.icon, "icon msg-icon")}<p class="msg-label"></p><p class="msg-text"></p>`;
    $(".msg-label", li).textContent = fill(m.label);
    $(".msg-text", li).textContent = fill(m.text);
    ul.appendChild(li);
  });

  // Illustrated rose garden (SVG, no photos)
  const flowers = [
    { x: 90, h: 150, s: 62 }, { x: 210, h: 100, s: 52 }, { x: 330, h: 175, s: 74 }, { x: 450, h: 118, s: 56 }, { x: 575, h: 195, s: 86 },
    { x: 700, h: 125, s: 58 }, { x: 820, h: 170, s: 72 }, { x: 950, h: 105, s: 52 }, { x: 1070, h: 160, s: 66 }, { x: 1150, h: 112, s: 48 }
  ];
  let out = '<path d="M0 280V238C150 214 300 246 450 232S760 214 900 236S1100 222 1200 232V280Z" fill="url(#groundGrad)"/>';
  flowers.forEach((f, i) => {
    const base = 252, top = base - f.h, bend = (i % 2 ? 1 : -1) * 18, side = i % 2 ? 1 : -1;
    const ly1 = base - f.h * 0.35, ly2 = base - f.h * 0.6;
    out += `<g class="sway" style="--sd:${4 + (i % 3)}s;--sa:${(1.1 + (i % 3) * 0.5).toFixed(1)}deg;animation-delay:-${(i * 0.7).toFixed(1)}s;transform-origin:${f.x}px ${base + 4}px">
      <path d="M${f.x} ${base + 4}C${f.x + bend} ${base - f.h * 0.35} ${f.x - bend} ${base - f.h * 0.7} ${f.x} ${top}" fill="none" stroke="url(#stemGrad)" stroke-width="3" stroke-linecap="round"/>
      <path d="M${f.x} ${ly1}q${16 * side} -20 ${30 * side} -8q${-15 * side} 18 ${-30 * side} 8z" fill="#c9a24e" opacity=".85"/>
      <path d="M${f.x} ${ly2}q${-16 * side} -20 ${-30 * side} -8q${15 * side} 18 ${30 * side} 8z" fill="#d9b765" opacity=".8"/>
      <use href="#rose" x="${f.x - f.s / 2}" y="${top - f.s / 2}" width="${f.s}" height="${f.s}"/>
    </g>`;
  });
  $("#gardenSvg").innerHTML = out;
}

function buildStory() {
  const ol = $("#timeline");
  CONFIG.story.chapters.forEach((c, i) => {
    const li = document.createElement("li");
    li.className = "tl-item";
    li.innerHTML = `<span class="tl-node">${icon(c.icon)}</span><div class="tl-card glass reveal"><h3></h3><p></p></div>`;
    $("h3", li).textContent = fill(c.title);
    $("p", li).textContent = fill(c.text);
    $(".tl-card", li).style.setProperty("--d", "0.05s");
    ol.appendChild(li);
  });
}

function buildCake() {
  const scallop = (x0, x1, y, n) => {
    const r = (x1 - x0) / (2 * n);
    return `M${x0} ${y - 16}H${x1}V${y}` + `a${r} ${r} 0 0 1 ${-2 * r} 0`.repeat(n) + "Z";
  };
  const tier = (x0, x1, yt, yb, n) => `
    <rect x="${x0}" y="${yt}" width="${x1 - x0}" height="${yb - yt}" rx="5" fill="url(#cakeBody)"/>
    <path d="${scallop(x0, x1, yt + 22, n)}" fill="url(#cakeFrost)" stroke="rgba(232,199,123,.55)" stroke-width="1"/>
    <ellipse cx="${(x0 + x1) / 2}" cy="${yt}" rx="${(x1 - x0) / 2}" ry="11" fill="url(#cakeTop)" stroke="rgba(232,199,123,.6)"/>
    <rect x="${x0}" y="${yb - 30}" width="${x1 - x0}" height="12" fill="url(#pearls)"/>
    <rect x="${x0}" y="${yb - 14}" width="${x1 - x0}" height="10" rx="4" fill="url(#goldBand)"/>`;
  const rose = (cx, cy, s, leafSide = 1) => `
    <ellipse cx="${cx - leafSide * s * 0.55}" cy="${cy + s * 0.2}" rx="${s * 0.34}" ry="${s * 0.14}" transform="rotate(${-25 * leafSide} ${cx - leafSide * s * 0.55} ${cy + s * 0.2})" fill="#d4ae5f"/>
    <ellipse cx="${cx + leafSide * s * 0.55}" cy="${cy + s * 0.2}" rx="${s * 0.34}" ry="${s * 0.14}" transform="rotate(${25 * leafSide} ${cx + leafSide * s * 0.55} ${cy + s * 0.2})" fill="#c9a24e"/>
    <use href="#rose" x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}"/>`;
  const candle = ([cx, base], i) => `
    <g class="candle" transform="translate(${cx} ${base})">
      <rect x="-4.5" y="-40" width="9" height="40" rx="2" fill="url(#candleBody)"/>
      <rect x="-4.5" y="-40" width="9" height="40" rx="2" fill="url(#stripes)" opacity=".7"/>
      <line x1="0" y1="-40" x2="0" y2="-45" stroke="#3a2a3f" stroke-width="1.6" stroke-linecap="round"/>
      <path class="smoke" style="--sd:${i * 0.15}s" d="M0 -46C-9 -58 9 -70 0 -86"/>
      <ellipse class="halo" cx="0" cy="-55" rx="17" ry="19" fill="url(#flameHalo)"/>
      <path class="flame" d="M0 -64C4.5 -57 5 -51 0 -46C-5 -51 -4.5 -57 0 -64Z" fill="url(#flameGrad)"/>
      <path class="flame-core" d="M0 -58C2 -54.5 2 -52 0 -49.5C-2 -52 -2 -54.5 0 -58Z" fill="#fff8e1"/>
    </g>`;

  $("#cakeSvg").innerHTML = `
    <ellipse cx="200" cy="396" rx="188" ry="22" fill="url(#plateGrad)"/>
    <ellipse cx="200" cy="390" rx="172" ry="15" fill="#fff2cf" opacity=".28"/>
    ${tier(36, 364, 300, 392, 12)}
    ${rose(110, 349, 28, 1)}${rose(200, 349, 30, -1)}${rose(290, 349, 28, 1)}
    ${rose(60, 294, 40, 1)}${rose(340, 294, 40, -1)}
    ${tier(82, 318, 212, 300, 9)}
    ${rose(200, 262, 28, 1)}${rose(98, 208, 34, 1)}${rose(302, 208, 34, -1)}
    ${tier(126, 274, 134, 212, 6)}
    <g id="candleRow">${[[166, 130], [200, 134], [234, 130]].map(candle).join("")}</g>`;
}

function buildWishes() {
  const list = $("#wishList");
  CONFIG.wishes.items.forEach((w, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "wish glass reveal";
    btn.style.setProperty("--d", `${(i % 3) * 0.12}s`);
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", `wishPanel${i}`);
    btn.innerHTML = `<span class="wish-icon">${icon(w.icon)}</span><span class="wish-title"></span><span class="wish-line"></span>
      <span class="wish-chev">${icon("i-chevron")}</span>
      <span class="wish-panel" id="wishPanel${i}"><span><span class="wish-more"></span></span></span>`;
    $(".wish-title", btn).textContent = fill(w.title);
    $(".wish-line", btn).textContent = fill(w.line);
    $(".wish-more", btn).textContent = fill(w.more);
    $(".wish-panel", btn).inert = true;
    list.appendChild(btn);
  });
}

/* Gold-gradient text would tint emoji gold, so keep a trailing emoji in its natural colors */
function keepEmojiColor(el) {
  const m = el.textContent.match(/^([\s\S]*?)(\s*[\p{Extended_Pictographic}\uFE0F\u200D]+)$/u);
  if (!m) return;
  el.textContent = m[1];
  const s = document.createElement("span");
  s.className = "emoji-keep";
  s.textContent = m[2];
  el.appendChild(s);
}

function buildLastNote() {
  const box = $("#noteBody");
  box.textContent = "";
  CONFIG.lastNote.body.forEach((t, i) => {
    const p = document.createElement("p");
    p.className = `note-p reveal${i === CONFIG.lastNote.body.length - 1 ? " accent" : ""}`;
    p.style.setProperty("--d", "0.1s");
    p.textContent = fill(t);
    box.appendChild(p);
  });
}

function buildIntroTitle() {
  const title = $("#introTitle");
  const name = text("intro.title");
  title.textContent = "";
  title.setAttribute("aria-label", name);
  Array.from(name).forEach((ch, i) => {
    const s = document.createElement("span");
    s.textContent = ch; s.style.setProperty("--i", i); s.setAttribute("aria-hidden", "true");
    title.appendChild(s);
  });
}

function buildSceneDots() {
  const nav = $("#sceneDots");
  const frag = document.createDocumentFragment();
  $$("#experience > .scene").forEach((sc) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "dot"; b.dataset.target = sc.id;
    b.setAttribute("aria-label", `Go to ${sc.dataset.nav}`);
    b.innerHTML = `<span class="dot-label"></span>`;
    $(".dot-label", b).textContent = sc.dataset.nav;
    frag.appendChild(b);
  });
  nav.appendChild(frag);
  nav.addEventListener("click", (e) => { const b = e.target.closest(".dot"); if (b) goToScene(`#${b.dataset.target}`); });
}

/* ==========================================================================
   8. SCENES
   ========================================================================== */
/* Smoothly bring an element into view only if it isn't fully visible */
function ensureVisible(el) {
  const r = el.getBoundingClientRect();
  if (r.bottom > window.innerHeight - 70 || r.top < 0) el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
}

/* ---------- Scene transitions ---------- */
function goToScene(target) {
  const el = typeof target === "string" ? $(target) : target;
  if (!el) return;
  el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
}
function transitionToScene(target) {
  const veil = $("#veil");
  if (!reduced()) { veil.classList.add("flash"); sceneT.later(() => veil.classList.remove("flash"), 450); }
  goToScene(target);
}

/* ---------- Scene 1: intro ---------- */
let introAbort = null;
let entered = false;

function initIntro() {
  introT.clear();
  if (introAbort) introAbort.abort();
  introAbort = new AbortController();
  const { signal } = introAbort;
  entered = false;

  const intro = $("#intro");
  intro.hidden = false;
  intro.className = "intro";
  const line = $("#introLine");
  line.className = "intro-line"; line.textContent = "";
  $("#introTitleBlock").className = "intro-title-block";
  buildIntroTitle();

  $("#enterBtn").addEventListener("click", () => enterUniverse(), { signal, once: true });
  $("#skipIntro").addEventListener("click", () => enterUniverse(true), { signal, once: true });
  playIntro();
}

function showIntroLine(str, dur) {
  const el = $("#introLine");
  el.style.setProperty("--dur", `${dur}ms`);
  el.textContent = str;
  el.classList.remove("play");
  void el.offsetWidth; // restart the CSS animation
  el.classList.add("play");
  if (reduced()) introT.later(() => el.classList.remove("play"), dur - 300);
}

function playIntro() {
  const intro = $("#intro");
  const k = reduced() ? 0.55 : 1;
  const dur = 3000 * k;
  introT.later(() => { intro.classList.add("stage-cosmos"); Sky.show(); }, 2300 * k);
  introT.later(() => intro.classList.add("dot-off"), 3300 * k);
  let t = 3400 * k;
  CONFIG.intro.lines.forEach((l) => { introT.later(() => showIntroLine(fill(l), dur), t); t += dur + 200 * k; });
  introT.later(() => {
    const block = $("#introTitleBlock");
    block.classList.add("title-in");
    introT.later(() => block.classList.add("show-cta"), 2600 * k);
  }, t + 200 * k);
}

function enterUniverse(skipped = false) {
  if (entered) return;
  entered = true;
  introT.clear();
  if (introAbort) introAbort.abort();

  const intro = $("#intro");
  if (!skipped) FX.burstAtElement($("#enterBtn"), { count: 110, speed: 7.5, max: 90, colors: ["#FFE9A8", "#E8C77B", "#FFF6E9", "#F4A5C5"] });
  intro.classList.add("leaving", "stage-cosmos");
  Sky.show(); Sky.zoomPulse();
  const k = skipped ? 0.4 : 1;
  introT.later(showExperience, 700 * k);
  introT.later(() => { intro.hidden = true; }, 1800 * k);
}

function showExperience() {
  document.body.classList.remove("locked");
  const ex = $("#experience");
  ex.removeAttribute("inert");
  ex.classList.add("on");
  $("#player").classList.add("show");
  $("#sceneDots").classList.add("show");
  window.scrollTo({ top: 0, behavior: "instant" });
  observeScenes();
  observeReveals();
  introT.later(() => $("#universeTitle").focus({ preventScroll: true }), 900);
}

/* ---------- Scene 6: letter ---------- */
let letterState = "closed"; // closed | opening | typing | open
let letterParas = [];
let typedEls = [];
let typingRaf = 0;

function buildLetter() {
  const L = CONFIG.letter;
  letterParas = [
    { text: fill(L.greeting), cls: "ls-greeting" },
    ...L.body.map((b) => ({ text: fill(b), cls: "" })),
    { text: fill(L.closing), cls: "ls-closing" },
    { text: fill(L.signature), cls: "ls-sign" }
  ].map((p) => ({ ...p, chars: Array.from(p.text) }));

  const make = (parent, withText) => {
    parent.textContent = "";
    return letterParas.map((p) => {
      const el = document.createElement("p");
      el.className = `ls-p ${p.cls}`.trim();
      el.textContent = withText ? p.text : "";
      parent.appendChild(el);
      return el;
    });
  };
  make($("#letterGhost"), true);
  typedEls = make($("#letterTyped"), false);
  $("#letterFull").textContent = letterParas.map((p) => p.text).join("\n\n");
}

function openLetter() {
  if (letterState !== "closed") return;
  letterState = "opening";
  const k = reduced() ? 0.2 : 1;
  const seal = $("#waxSeal"), env = $("#envelope"), wrap = $("#envelopeWrap"), sheet = $("#letterSheet");
  $("#openLetterBtn").disabled = true;
  seal.classList.add("break");
  FX.burstAtElement(seal, { count: 34, speed: 3.5, max: 50 });
  sceneT.later(() => env.classList.add("open"), 550 * k);
  sceneT.later(() => wrap.classList.add("done"), 2700 * k);
  sceneT.later(() => {
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add("show"));
    sheet.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  }, 3000 * k);
  sceneT.later(startTyping, 3700 * k);
}

function startTyping() {
  cancelTyping();
  letterState = "typing";
  const sheet = $("#letterSheet");
  sheet.classList.add("typing");
  $("#skipTypingBtn").hidden = false;
  $("#letterNext").hidden = true;
  typedEls.forEach((e) => { e.textContent = ""; e.classList.remove("caret"); });
  if (reduced()) { finishTyping(); return; }

  const GAP = 10, per = CONFIG.letter.msPerChar, t0 = performance.now();
  const shown = new Array(letterParas.length).fill(-1);
  const total = letterParas.reduce((a, p) => a + p.chars.length + GAP, 0);
  let lastActive = -1;

  const step = (now) => {
    const n = Math.floor((now - t0) / per);
    let off = 0, active = -1;
    for (let i = 0; i < letterParas.length; i++) {
      const len = letterParas[i].chars.length;
      const take = clamp(n - off, 0, len);
      if (take !== shown[i]) {
        shown[i] = take;
        typedEls[i].textContent = take === len ? letterParas[i].text : letterParas[i].chars.slice(0, take).join("");
      }
      if (take > 0 && take < len) active = i;
      off += len + GAP;
    }
    if (active !== lastActive) {
      if (lastActive >= 0) typedEls[lastActive].classList.remove("caret");
      if (active >= 0) typedEls[active].classList.add("caret");
      lastActive = active;
    }
    if (n >= total) { finishTyping(); return; }
    typingRaf = requestAnimationFrame(step);
  };
  typingRaf = requestAnimationFrame(step);
}

function cancelTyping() { if (typingRaf) cancelAnimationFrame(typingRaf); typingRaf = 0; }

function finishTyping() {
  cancelTyping();
  typedEls.forEach((el, i) => { el.textContent = letterParas[i].text; el.classList.remove("caret"); });
  $("#letterSheet").classList.remove("typing");
  $("#skipTypingBtn").hidden = true;
  $("#letterNext").hidden = false;
  letterState = "open";
}

function replayLetter() {
  transitionToScene("#letter");
  sceneT.later(() => {
    if (letterState === "closed") openLetter();
    else if (letterState === "open" || letterState === "typing") { $("#letterSheet").scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" }); startTyping(); }
  }, reduced() ? 0 : 900);
}

function resetLetter() {
  cancelTyping();
  letterState = "closed";
  $("#envelope").classList.remove("open");
  $("#envelopeWrap").classList.remove("done");
  $("#waxSeal").classList.remove("break");
  $("#openLetterBtn").disabled = false;
  const sheet = $("#letterSheet");
  sheet.classList.remove("show", "typing"); sheet.hidden = true;
  typedEls.forEach((e) => { e.textContent = ""; e.classList.remove("caret"); });
  $("#skipTypingBtn").hidden = true; $("#letterNext").hidden = true;
}

/* ---------- Scene 7: cake ---------- */
let cakeState = "lit";

function extinguishCandles() {
  if (cakeState !== "lit") return;           // ignore duplicate clicks
  cakeState = "out";
  const btn = $("#blowBtn");
  btn.disabled = true; btn.textContent = text("cake.buttonDone");
  $("#cakeStage").classList.add("is-out");
  $("#cakeSvg").classList.add("is-out");
  FX.burstAtElement($("#candleRow"), { count: 70, speed: 5.5 });
  sceneT.later(() => {
    FX.confetti({ x: 0, y: window.innerHeight, angle: -60, spread: 50, power: 20, count: 70 });
    FX.confetti({ x: window.innerWidth, y: window.innerHeight, angle: -120, spread: 50, power: 20, count: 70 });
    FX.confetti({ count: 90 });
  }, 350);
  sceneT.later(() => {
    const msg = $("#cakeMessage");
    msg.setAttribute("aria-hidden", "false"); msg.classList.add("show");
    $("#cakeNext").hidden = false;
    sceneT.later(() => ensureVisible($("#cakeNext")), 600);
  }, 1100);
}
function resetCake() {
  cakeState = "lit";
  $("#cakeSvg").classList.remove("is-out"); $("#cakeStage").classList.remove("is-out");
  const btn = $("#blowBtn"); btn.disabled = false; btn.textContent = text("cake.button");
  const msg = $("#cakeMessage"); msg.classList.remove("show"); msg.setAttribute("aria-hidden", "true");
  $("#cakeNext").hidden = true;
}

/* ---------- Scene 8: gift ---------- */
let giftState = "closed";

function releaseGiftMagic() {
  const box = $("#giftMagic"), tpl = $("#tpl-butterfly");
  const nB = small() ? 6 : 9, nS = small() ? 10 : 16;
  const frag = document.createDocumentFragment();
  const add = (el, dur) => { el.addEventListener("animationend", () => el.remove(), { once: true }); frag.appendChild(el); void dur; };
  for (let i = 0; i < nB; i++) {
    const b = document.createElement("div");
    b.className = "fly bfly-g";
    b.style.cssText = `--s:${rand(26, 40).toFixed(0)}px;--dur:${rand(5, 8).toFixed(1)}s;--tx:${rand(-170, 170).toFixed(0)}px;--ty:${(-rand(160, 330)).toFixed(0)}px;--rot:${rand(-25, 25).toFixed(0)}deg;animation-delay:${(i * 0.12).toFixed(2)}s`;
    b.appendChild(tpl.content.cloneNode(true));
    add(b);
  }
  for (let i = 0; i < nS; i++) {
    const s = document.createElement("i");
    s.className = "fly gstar";
    s.style.cssText = `--s:${rand(8, 18).toFixed(0)}px;--dur:${rand(2.8, 4.8).toFixed(1)}s;--tx:${rand(-200, 200).toFixed(0)}px;--ty:${(-rand(120, 360)).toFixed(0)}px;--rot:${rand(-180, 180).toFixed(0)}deg;animation-delay:${(i * 0.07).toFixed(2)}s`;
    add(s);
  }
  box.appendChild(frag);
}

function openGift() {
  if (giftState !== "closed") return;
  giftState = "opening";
  const btn = $("#giftBtn"), stage = $("#giftStage");
  btn.disabled = true; btn.textContent = text("gift.buttonDone");
  stage.classList.add("untying");
  const k = reduced() ? 0.2 : 1;
  sceneT.later(() => {
    stage.classList.add("open");
    FX.burstAtElement($("#giftSvg"), { count: 60, speed: 5 });
    if (!reduced()) releaseGiftMagic();
  }, 700 * k);
  sceneT.later(() => {
    const msg = $("#giftMessage");
    msg.hidden = false;
    requestAnimationFrame(() => msg.classList.add("show"));
    $("#giftNext").hidden = false;
    giftState = "open";
    sceneT.later(() => ensureVisible($("#giftNext")), 900);
  }, 1800 * k);
}
function resetGift() {
  giftState = "closed";
  const stage = $("#giftStage"); stage.classList.remove("untying", "open");
  $("#giftMagic").textContent = "";
  const btn = $("#giftBtn"); btn.disabled = false; btn.textContent = text("gift.button");
  const msg = $("#giftMessage"); msg.classList.remove("show"); msg.hidden = true;
  $("#giftNext").hidden = true;
}
function buildGiftMessage() {
  const box = $("#giftMessage");
  box.textContent = "";
  CONFIG.gift.message.forEach((m) => { const p = document.createElement("p"); p.textContent = fill(m); box.appendChild(p); });
}

/* ---------- Scene 9: wishes ---------- */
function toggleWish(btn, ev) {
  const open = btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", String(open));
  btn.classList.toggle("open", open);
  $(".wish-panel", btn).inert = !open;
  if (open && ev) FX.burst(ev.clientX || btn.getBoundingClientRect().left + 40, ev.clientY || btn.getBoundingClientRect().top + 40, { count: 16, speed: 3, max: 40 });
}
function resetWishes() {
  $$(".wish").forEach((b) => { b.setAttribute("aria-expanded", "false"); b.classList.remove("open"); $(".wish-panel", b).inert = true; });
}

/* ---------- Final note: review reminder (nothing is sent or collected) ---------- */
function toggleReview() {
  const btn = $("#reviewBtn"), note = $("#reviewNote");
  const open = btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", String(open));
  if (open) {
    note.hidden = false;
    requestAnimationFrame(() => note.classList.add("show"));
    FX.burstAtElement(btn, { count: 36, speed: 4, max: 55, colors: ["#F4A5C5", "#FFD3E4", "#FFF6E9", "#E8C77B"] });
    sceneT.later(() => ensureVisible(note), 500);
  } else {
    note.classList.remove("show");
    sceneT.later(() => { note.hidden = true; }, 700);
  }
}
function resetLastNote() {
  $("#reviewBtn").setAttribute("aria-expanded", "false");
  const note = $("#reviewNote"); note.classList.remove("show"); note.hidden = true;
}

/* ---------- Monkey selfie gallery, lightbox & "which monkey?" quiz ---------- */
const MK_DIR = "assets/images/monkeys/";
const mk = { failed: [], open: -1, trigger: null, touchX: 0 };
const mkPhoto = (i) => CONFIG.monkeys.photos[i];
const mkAlt = (i) => mkPhoto(i).alt || `Photograph of a monkey, captioned "${fill(mkPhoto(i).title)}"`;

/** Friendly placeholder shown instead of a broken-image icon */
function monkeyFallback(i) {
  const d = document.createElement("div");
  d.className = "mk-fallback";
  d.setAttribute("role", "img");
  d.setAttribute("aria-label", mkAlt(i));
  d.innerHTML = '<span class="mk-fb-emoji" aria-hidden="true">🐒</span><b></b><small></small>';
  $("b", d).textContent = text("monkeys.fallbackHint");
  $("small", d).textContent = mkPhoto(i).file;
  return d;
}
function monkeyImg(i, { eager = false } = {}) {
  if (mk.failed[i]) return monkeyFallback(i);
  const p = mkPhoto(i);
  const img = new Image();
  img.className = "mk-img";
  img.alt = mkAlt(i);
  img.decoding = "async";
  img.loading = eager ? "eager" : "lazy";
  img.width = p.ratio[0] * 200; img.height = p.ratio[1] * 200;
  img.style.objectPosition = p.focus || "center";
  img.addEventListener("error", () => { mk.failed[i] = true; img.replaceWith(monkeyFallback(i)); }, { once: true });
  img.src = MK_DIR + p.file;
  return img;
}

function buildMonkeys() {
  const M = CONFIG.monkeys, grid = $("#monkeyGallery");
  grid.textContent = "";
  M.photos.forEach((p, i) => {
    const li = document.createElement("li");
    li.className = "mk-card reveal";
    li.style.setProperty("--d", `${(i % 4) * 0.1}s`);
    li.innerHTML = `<button type="button" class="mk-open" data-index="${i}"><span class="mk-media"></span><span class="mk-cap"><span class="mk-title"></span><span class="mk-text"></span></span><span class="mk-cam" aria-hidden="true">${icon("i-camera")}</span></button>`;
    $(".mk-open", li).setAttribute("aria-label", `Open photo: ${fill(p.title)}`);
    const media = $(".mk-media", li);
    media.style.aspectRatio = `${p.ratio[0]} / ${p.ratio[1]}`;
    media.appendChild(monkeyImg(i));
    $(".mk-title", li).textContent = fill(p.title);
    $(".mk-text", li).textContent = fill(p.caption);
    grid.appendChild(li);
  });
  grid.addEventListener("click", (e) => { const b = e.target.closest(".mk-open"); if (b) openLightbox(Number(b.dataset.index), b); });

  // Quiz options (thumbnails reuse the gallery photos)
  const box = $("#quizOptions");
  box.textContent = "";
  M.quiz.options.forEach((o, k) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "mk-pick"; b.dataset.opt = k; b.setAttribute("aria-pressed", "false");
    b.innerHTML = '<span class="mk-thumb"></span><span class="mk-pick-name"></span>';
    $(".mk-thumb", b).appendChild(monkeyImg(o.photo));
    $(".mk-pick-name", b).textContent = fill(o.name);
    box.appendChild(b);
  });
  box.addEventListener("click", (e) => { const b = e.target.closest(".mk-pick"); if (b) pickMonkey(Number(b.dataset.opt), b); });

  // Lightbox controls (bound once)
  const lb = $("#lightbox");
  $("#lbClose").addEventListener("click", () => closeLightbox());
  $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
  $("#lbNext").addEventListener("click", () => stepLightbox(1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-inner")) closeLightbox(); });
  const fig = $("#lbFig");
  fig.addEventListener("touchstart", (e) => { mk.touchX = e.changedTouches[0].clientX; }, { passive: true });
  fig.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - mk.touchX;
    if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
  }, { passive: true });
}

function showLightbox(i) {
  const n = CONFIG.monkeys.photos.length, p = mkPhoto(i);
  mk.open = i;
  const media = $("#lbMedia");
  media.textContent = "";
  const failed = mk.failed[i];
  media.classList.toggle("is-fallback", Boolean(failed));
  const el = monkeyImg(i, { eager: true });
  if (el.tagName === "IMG") {
    el.className = "lb-img"; el.removeAttribute("width"); el.removeAttribute("height"); el.style.objectPosition = "";
    el.addEventListener("error", () => media.classList.add("is-fallback"), { once: true });
  }
  media.appendChild(el);
  $("#lbCount").textContent = `${i + 1} / ${n}`;
  $("#lbTitle").textContent = fill(p.title);
  $("#lbText").textContent = fill(p.caption);
  const credit = $("#lbCredit");
  credit.hidden = !p.credit; credit.textContent = p.credit ? `Photo: ${p.credit}` : "";
  const fig = $("#lbFig");
  fig.style.animation = "none"; void fig.offsetWidth; fig.style.animation = "";
  [(i + 1) % n, (i - 1 + n) % n].forEach((k) => { if (!mk.failed[k]) { const pre = new Image(); pre.src = MK_DIR + mkPhoto(k).file; } });
}
function stepLightbox(d) { const n = CONFIG.monkeys.photos.length; showLightbox((mk.open + d + n) % n); }
const LB_INERT = ["#experience", "#player", "#sceneDots"];
function setBackgroundInert(on) { LB_INERT.forEach((s) => { const el = $(s); if (el) el.inert = on; }); }

function onLightboxKey(e) {
  if (e.key === "Escape") { e.preventDefault(); closeLightbox(); }
  else if (e.key === "ArrowRight") { e.preventDefault(); stepLightbox(1); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); stepLightbox(-1); }
  else if (e.key === "Tab") {                                  // keep focus inside the dialog
    const f = $$("#lightbox button:not([hidden])");
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}
function openLightbox(i, trigger) {
  const lb = $("#lightbox");
  mk.trigger = trigger || null;
  lb.hidden = false;
  document.body.classList.add("modal-open");
  setBackgroundInert(true);
  showLightbox(i);
  requestAnimationFrame(() => lb.classList.add("show"));
  document.addEventListener("keydown", onLightboxKey);
  $("#lbClose").focus({ preventScroll: true });
}
function closeLightbox(instant = false) {
  if (mk.open < 0) return;
  const lb = $("#lightbox");
  mk.open = -1;
  document.removeEventListener("keydown", onLightboxKey);
  document.body.classList.remove("modal-open");
  setBackgroundInert(false);
  lb.classList.remove("show");
  const done = () => { lb.hidden = true; $("#lbMedia").textContent = ""; };
  if (instant || reduced()) done(); else setTimeout(() => { if (mk.open < 0) done(); }, 320);
  if (mk.trigger && !instant) mk.trigger.focus({ preventScroll: true });
  mk.trigger = null;
}

function pickMonkey(k, btn) {
  const Q = CONFIG.monkeys.quiz, o = Q.options[k];
  $$(".mk-pick").forEach((b) => { const on = b === btn; b.classList.toggle("chosen", on); b.setAttribute("aria-pressed", String(on)); });
  const r = $("#quizResult");
  r.hidden = false;
  $(".qr-found", r).textContent = fill(Q.found);
  $(".qr-name", r).textContent = fill(o.name);
  $(".qr-msg", r).textContent = fill(o.msg);
  r.classList.remove("show"); void r.offsetWidth; r.classList.add("show");
  FX.burstAtElement(btn, { count: 30, speed: 4, max: 50, colors: ["#F4A5C5", "#FFD3E4", "#FFF6E9", "#E8C77B"] });
  sceneT.later(() => ensureVisible(r), 450);
}
function resetQuiz() {
  $$(".mk-pick").forEach((b) => { b.classList.remove("chosen"); b.setAttribute("aria-pressed", "false"); });
  const r = $("#quizResult"); r.classList.remove("show"); r.hidden = true;
}

/* ---------- Scene 10: finale ---------- */
let finaleRun = 0;
let finaleStarted = false;
const wait = (ms, run) => new Promise((res) => sceneT.later(() => res(run === finaleRun), ms));

async function runFinale() {
  if (finaleStarted) return;
  finaleStarted = true;
  const run = ++finaleRun;
  Sky.setRate(2.5);
  const k = reduced() ? 0.6 : 1;
  if (!(await wait(700 * k, run))) return;
  for (const el of $$("#finaleLines .fline")) {
    el.classList.add("show");
    if (!(await wait(2700 * k, run))) return;
    el.classList.remove("show");
    if (!(await wait(900 * k, run))) return;
  }
  $("#finaleReveal").classList.remove("is-pending");
  requestAnimationFrame(() => $("#finale").classList.add("revealed"));
  Sky.shoot();
  FX.volley(4);
  FX.startShow();
  sceneT.later(() => FX.confetti({ count: 80 }), 700);
}
function celebrateAgain() {
  FX.volley(6);
  FX.confetti({ count: 120 });
  Sky.shoot(); sceneT.later(Sky.shoot, 400); sceneT.later(Sky.shoot, 900);
  FX.startShow();
}
function resetFinale() {
  finaleRun++; finaleStarted = false;
  Sky.setRate(1);
  const f = $("#finale");
  f.classList.remove("revealed");
  $("#finaleReveal").classList.add("is-pending");
  $$("#finaleLines .fline").forEach((l) => l.classList.remove("show"));
}

/* ==========================================================================
   9. MUSIC PLAYER (HTMLAudioElement)
   ========================================================================== */
const Music = (() => {
  const audio = $("#bgm");
  const player = $("#player");
  let missing = false, playing = false, muted = false, volume = CONFIG.audio.volume, fadeRaf = 0, toastTimer = 0;

  function toast(msg, ms = 6500) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), ms);
  }
  function fadeTo(target, ms) {
    return new Promise((resolve) => {
      cancelAnimationFrame(fadeRaf);
      if (reduced()) ms = Math.min(ms, 200);
      const from = audio.volume, t0 = performance.now();
      const step = (now) => {
        const p = clamp((now - t0) / ms, 0, 1);
        audio.volume = clamp(from + (target - from) * p, 0, 1);
        if (p < 1) fadeRaf = requestAnimationFrame(step); else resolve();
      };
      fadeRaf = requestAnimationFrame(step);
    });
  }
  function ui() {
    player.classList.toggle("is-playing", playing);
    player.classList.toggle("is-missing", missing);
    const pb = $("#playBtn");
    pb.setAttribute("aria-pressed", String(playing));
    pb.setAttribute("aria-label", playing ? "Pause music" : "Play music");
    $("#playIcon").setAttribute("href", playing ? "#i-pause" : "#i-play");
    const mutedNow = muted || volume === 0;
    $("#muteBtn").setAttribute("aria-pressed", String(mutedNow));
    $("#muteBtn").setAttribute("aria-label", mutedNow ? "Unmute music" : "Mute music");
    $("#muteIcon").setAttribute("href", mutedNow ? "#i-mute" : "#i-volume");
    $$("[data-music-label]").forEach((b) => { b.textContent = playing ? text("hero.songPause") : text("hero.song"); });
  }
  function markMissing() { missing = true; playing = false; ui(); toast(CONFIG.audio.missing, 9000); }

  async function play() {
    if (missing) { toast(CONFIG.audio.missing, 9000); return; }
    try {
      audio.volume = 0;
      await audio.play();
      playing = true; ui();
      fadeTo(muted ? 0 : volume, CONFIG.audio.fadeMs);
    } catch (err) {
      if (err && err.name === "NotAllowedError") toast(CONFIG.audio.blocked);
      else markMissing();
      playing = false; ui();
    }
  }
  async function pause() {
    playing = false; ui();
    await fadeTo(0, 600);
    audio.pause();
  }

  return {
    init() {
      audio.src = CONFIG.audio.src;
      audio.volume = 0;
      $("#volume").value = String(Math.round(volume * 100));
      const trackSelect = $("#musicSelect");
      trackSelect.addEventListener("change", async () => {
        const wasPlaying = playing;
        audio.pause();
        playing = false;
        missing = false;
        audio.src = trackSelect.value;
        audio.load();
        ui();
        if (wasPlaying) await play();
        else toast("Song changed! Press play to listen. 🎵", 3000);
      });
      audio.addEventListener("error", markMissing);
      $("#playBtn").addEventListener("click", () => (playing ? pause() : play()));
      $("#playSongBtn").addEventListener("click", () => (playing ? pause() : play()));
      $("#muteBtn").addEventListener("click", () => {
        muted = !muted; if (!muted && volume === 0) { volume = 0.5; $("#volume").value = "50"; }
        audio.muted = false; if (playing) fadeTo(muted ? 0 : volume, 300);
        ui();
      });
      $("#volume").addEventListener("input", (e) => {
        volume = Number(e.target.value) / 100; muted = false;
        if (playing) { cancelAnimationFrame(fadeRaf); audio.volume = volume; }
        ui();
      });
      ui();
    },
    toast
  };
})();

/* ==========================================================================
   10. OBSERVERS · EVENTS · INIT · RESET
   ========================================================================== */
let revealIO = null, sceneIO = null;

function observeReveals() {
  if (!revealIO) {
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  }
  $$(".reveal:not(.in)").forEach((el) => revealIO.observe(el));
}

/* Timeline progress line follows scrolling — the listener only exists while the scene is active */
let timelineRaf = 0;
function updateTimeline() {
  timelineRaf = 0;
  const tl = $("#timeline"), r = tl.getBoundingClientRect();
  const p = clamp((window.innerHeight * 0.65 - r.top) / r.height, 0, 1);
  tl.style.setProperty("--progress", p.toFixed(3));
}
function onTimelineScroll() { if (!timelineRaf) timelineRaf = requestAnimationFrame(updateTimeline); }

const SCENE_HOOKS = {
  hero: { enter() { Sky.shoot(); } },
  story: {
    enter() { window.addEventListener("scroll", onTimelineScroll, { passive: true }); updateTimeline(); },
    leave() { window.removeEventListener("scroll", onTimelineScroll); }
  },
  finale: {
    enter() { runFinale(); if (finaleStarted && $("#finale").classList.contains("revealed")) FX.startShow(); },
    leave() { FX.stopShow(); }
  }
};

function observeScenes() {
  if (!sceneIO) {
    sceneIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const sc = e.target;
        sc.classList.toggle("is-active", e.isIntersecting);
        const hook = SCENE_HOOKS[sc.id];
        if (hook) (e.isIntersecting ? hook.enter : hook.leave)?.();
        if (e.isIntersecting) $$(".dot").forEach((d) => d.classList.toggle("active", d.dataset.target === sc.id));
      });
    }, { rootMargin: "-20% 0px -20% 0px", threshold: 0 });
  }
  $$("#experience > .scene").forEach((s) => sceneIO.observe(s));
}

function initParallax() {
  if (!window.matchMedia("(pointer: fine)").matches || reduced()) return;
  let ticking = false, nx = 0, ny = 0;
  const targets = [$("#universe"), $("#hero"), $("#finale")];
  window.addEventListener("pointermove", (e) => {
    nx = (e.clientX / window.innerWidth - 0.5) * 2; ny = (e.clientY / window.innerHeight - 0.5) * 2;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      Sky.pointer(nx, ny);
      targets.forEach((el) => { if (el.classList.contains("is-active")) { el.style.setProperty("--mx", nx.toFixed(3)); el.style.setProperty("--my", ny.toFixed(3)); } });
    });
  }, { passive: true });
}

function resetExperience() {
  introT.clear(); sceneT.clear(); cancelTyping();
  closeLightbox(true);
  FX.clear();
  resetQuiz();
  resetLetter(); resetCake(); resetGift(); resetWishes(); resetFinale(); resetLastNote();
  $$(".reveal.in").forEach((el) => el.classList.remove("in"));
  $$(".scene").forEach((s) => s.classList.remove("is-active"));
  window.removeEventListener("scroll", onTimelineScroll);
  const ex = $("#experience");
  ex.classList.remove("on"); ex.setAttribute("inert", "");
  $("#sceneDots").classList.remove("show");
  window.scrollTo({ top: 0, behavior: "instant" });
  document.body.classList.add("locked");
  Sky.hide();
  initIntro();
}

function bindEvents() {
  // Any element with data-goto scrolls (with a soft light veil) to that scene
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-goto]");
    if (b) transitionToScene(b.dataset.goto);
  });

  $("#openLetterBtn").addEventListener("click", openLetter);
  $("#waxSeal").addEventListener("click", openLetter);
  $("#skipTypingBtn").addEventListener("click", finishTyping);
  $("#letterSheet").addEventListener("click", () => { if (letterState === "typing") finishTyping(); });

  $("#blowBtn").addEventListener("click", extinguishCandles);
  $("#giftBtn").addEventListener("click", openGift);
  $("#wishList").addEventListener("click", (e) => { const b = e.target.closest(".wish"); if (b) toggleWish(b, e); });

  $("#celebrateBtn").addEventListener("click", celebrateAgain);
  $("#replayBtn").addEventListener("click", resetExperience);
  $("#letterAgainBtn").addEventListener("click", replayLetter);
  $("#reviewBtn").addEventListener("click", toggleReview);
}

function init() {
  if (YOUR_NAME === "YOUR_NAME") console.info("[Mukti] Tip: set YOUR_NAME at the top of script.js so the letter is signed.");
  buildGarden(); buildStory(); buildCake(); buildWishes(); buildGiftMessage(); buildLetter(); buildLastNote(); buildMonkeys();
  applyText();
  $$("#noteTitle, .note-sign, #monkeyKicker, #quizTitle, #mkBirthday").forEach(keepEmojiColor);
  buildSceneDots();
  decorate();
  Sky.init(); FX.init(); Music.init();
  bindEvents(); initParallax();
  initIntro();
}

init();
