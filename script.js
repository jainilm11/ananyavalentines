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
  $("giftSubtitle").textContent = "Click to unwrap 🎁";

  img.src = config.intro.underImage;

  btn.addEventListener("click", () => {
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
  if (config.notes.enabled) show($("notesSection"));

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
    showFinalQuestion();
    return;
  }

  storyIndex++;
  renderStory();
});
}
// ---------- Notes (auto-save) ----------
function setupNotes() {
  const box = $("notesBox");
  const key = `valentine_notes_${config.valentineName}`;

  const saved = localStorage.getItem(key);
  box.value = saved ?? (config.notes.defaultText ?? "");

  box.addEventListener("input", () => {
    localStorage.setItem(key, box.value);
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

// ---------- Init ----------
window.addEventListener("DOMContentLoaded", () => {
  document.title = config.pageTitle;

  createFloatingElements();
  setupMusicPlayer();

  setupGiftIntro();
  setupStoryNav();

  if (config.notes.enabled) setupNotes();

  setupEasterEgg();
});
