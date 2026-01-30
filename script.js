const config = window.VALENTINE_CONFIG;

// ---------- Helpers ----------
function $(id) { return document.getElementById(id); }

function show(el) { el.classList.remove("hidden"); }
function hide(el) { el.classList.add("hidden"); }

// ---------- Floating Emojis ----------
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");

  const spawn = (emoji, cls) => {
    const el = document.createElement("div");
    el.className = cls;
    el.textContent = emoji;
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDelay = Math.random() * 5 + "s";
    el.style.animationDuration = 10 + Math.random() * 20 + "s";
    container.appendChild(el);
  };

  config.floatingEmojis.hearts.forEach(e => spawn(e, "heart"));
  config.floatingEmojis.bears.forEach(e => spawn(e, "bear"));
}

// ---------- Music ----------
function setupMusicPlayer() {
  const musicControls = $("musicControls");
  const musicToggle = $("musicToggle");
  const bgMusic = $("bgMusic");
  const musicSource = $("musicSource");

  if (!config.music.enabled) {
    musicControls.style.display = "none";
    return;
  }

  musicSource.src = config.music.musicUrl;
  bgMusic.volume = config.music.volume ?? 0.5;
  bgMusic.load();

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.textContent = config.music.stopText;
    } else {
      bgMusic.pause();
      musicToggle.textContent = config.music.startText;
    }
  });
}

// ---------- Gift Unwrap ----------
function setupGiftIntro() {
  const overlay = $("giftOverlay");
  const btn = $("unwrapBtn");
  const img = $("giftImage");

  $("giftTitle").textContent = config.intro.title;
  $("giftSubtitle").textContent = "";

  img.src = config.intro.underImage;

  btn.addEventListener("click", () => {
  const bgMusic = document.getElementById("bgMusic");

  if (bgMusic) {
    bgMusic.currentTime = 0;   // start from beginning
    bgMusic.play().catch(() => {});
  }

  overlay.classList.add("unwrapped");
  setTimeout(() => {
    overlay.classList.add("hidden");
    overlay.style.display = "none";
  }, 700);

  startStory();
});
}

// ---------- Story + Password Gates ----------
let storyIndex = 0;

function startStory() {
  $("valentineTitle").textContent = `${config.valentineName}, my love...`;

  show($("storySection"));

  renderStory();
}

function renderStory() {
  const story = config.story;
  const chapter = story.chapters[storyIndex];

  $("storyTitle").textContent = story.title;
  $("storyText").textContent = chapter.text;
  $("storyCaption").textContent = chapter.caption ?? "";
  $("storyImg").src = chapter.image;

  $("storyBack").disabled = storyIndex === 0;
  $("storyBack").classList.toggle("disabled-btn", storyIndex === 0);

  // If next chapter requires password, we handle on Next click
}

function setupStoryNav() {
  $("storyBack").addEventListener("click", () => {
    if (storyIndex > 0) {
      storyIndex--;
      renderStory();
    }
  });

  $("storyNext").addEventListener("click", () => {
  const chapters = config.story.chapters;

 if (storyIndex >= chapters.length - 1) {
  hide($("storySection"));
  showLoveGame();   // 👈 NEW FUN THING
  return;
}


  storyIndex++;
  renderStory();
});
}

// ---------- Final Question + No runs away ----------
function showFinalQuestion() {
  const q = config.finalQuestion;

  $("question3Text").textContent = q.text;
  $("yesBtn3").textContent = q.yesBtn;
  $("noBtn3").textContent = q.noBtn;

  show($("question3"));
  setupFinalButtons();
}

function runAway(button) {
  const padding = 20;
  const maxX = window.innerWidth - button.offsetWidth - padding;
  const maxY = window.innerHeight - button.offsetHeight - padding;

  const x = padding + Math.random() * Math.max(0, maxX);
  const y = padding + Math.random() * Math.max(0, maxY);

  button.style.position = "fixed";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

function setupFinalButtons() {
  const yes = $("yesBtn3");
  const no = $("noBtn3");

  no.addEventListener("mouseenter", () => runAway(no));
  no.addEventListener("click", () => runAway(no));

  yes.addEventListener("mouseenter", () => yes.classList.add("grow-big"));
  yes.addEventListener("click", celebrate);
}

function celebrate() {
  hide($("question3"));
  const celebration = $("celebration");
  show(celebration);

  $("celebrationTitle").textContent = config.celebration.title;
  $("celebrationMessage").textContent = config.celebration.message;
  $("celebrationEmojis").textContent = config.celebration.emojis;

  createHeartExplosion();
}

function createHeartExplosion() {
  const container = document.querySelector(".floating-elements");
  for (let i = 0; i < 45; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = config.floatingEmojis.hearts[
      Math.floor(Math.random() * config.floatingEmojis.hearts.length)
    ];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDelay = "0s";
    heart.style.animationDuration = 6 + Math.random() * 10 + "s";
    container.appendChild(heart);
  }
}

// ---------- Easter Egg (type “love” reveals hidden button) ----------
function setupEasterEgg() {
  const code = (config.easterEgg.typeCode || "love").toLowerCase();
  let buffer = "";

  const btn = $("easterEggBtn");
  btn.textContent = config.easterEgg.hiddenButtonText || "Secret ❤️";

  const reveal = () => {
    btn.classList.remove("hidden");
    btn.classList.add("pop");
    window.setTimeout(() => btn.classList.remove("pop"), 500);
  };

  window.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-code.length);
    if (buffer === code) reveal();
  });

  btn.addEventListener("click", () => {
    // fun: jump to final question immediately if they find it
    hide($("storySection"));
    showFinalQuestion();
  });
}

let loveProgress = 0;
let loveTaps = 0;

// tiny heart burst effect each tap (no libraries)
function burstHearts() {
  const container = document.querySelector(".floating-elements");
  const emojis = (config.floatingEmojis && config.floatingEmojis.hearts) ? config.floatingEmojis.hearts : ["💖","💗","💓","❤️"];
  for (let i = 0; i < 10; i++) {
    const h = document.createElement("div");
    h.className = "tap-heart";
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = (45 + Math.random() * 10) + "vw";
    h.style.top = (65 + Math.random() * 10) + "vh";
    h.style.animationDuration = (0.8 + Math.random() * 0.7) + "s";
    container.appendChild(h);
    setTimeout(() => h.remove(), 1400);
  }
}

function showLoveGame() {
  const game = $("loveGame");
  const fill = $("loveFill");
  const status = $("loveStatus");
  const counter = $("loveCounter");
  const tapBtn = $("tapHeart");
  const nextBtn = $("loveNext");

  // MORE TAPS: smaller increment
  const INCREMENT = 4;          // 5% = ~20 taps to fill
  const COMPLETE_DELAY_MS = 2000; // longer “break” before Next appears

  loveProgress = 0;
  loveTaps = 0;

  fill.style.width = "0%";
  fill.classList.remove("pulse");
  status.textContent = "Okay… start tapping 😛";
  counter.textContent = `0% • 0 taps`;

  tapBtn.disabled = false;
  tapBtn.classList.remove("disabled-btn");
  nextBtn.classList.add("hidden");

  show(game);

  tapBtn.onclick = () => {
    loveProgress += INCREMENT;

    if (loveProgress > 100) loveProgress = 100;

    fill.style.width = loveProgress + "%";
    counter.textContent = `${loveProgress}%`;

  // tap animation
    fill.classList.remove("bump");
    void fill.offsetWidth;
    fill.classList.add("bump");

    if (loveProgress === 100) {
      status.textContent = "Alr bro how were you able to get the max limit u should say infinity but... one last thing 👀";

      tapBtn.disabled = true;
      tapBtn.classList.add("disabled-btn");

    // 👇 FORCE SHOW NEXT
      nextBtn.classList.remove("hidden");
      nextBtn.style.display = "inline-block";

      return; // stop further taps
  }

    status.textContent =
      loveProgress < 35 ? "WOOO" :
      loveProgress < 70 ? "Yay u like me" :
      "U cringe u love me sm";
};

    nextBtn.onclick = () => {
      hide(game);
      showFinalQuestion();
  };
}

// ---------- Init ----------
window.addEventListener("DOMContentLoaded", () => {
  document.title = config.pageTitle;

  createFloatingElements();
  setupMusicPlayer();

  setupGiftIntro();
  setupStoryNav();

  setupEasterEgg();
});
