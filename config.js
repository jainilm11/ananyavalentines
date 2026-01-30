const CONFIG = {
  valentineName: " Dear Ananya,",
  pageTitle: "Secret Surprise 🤭😛",

  floatingEmojis: {
    hearts: ["❤️","🥜","💌","💕","🪐"],
    bears: ["🧸","😈"]
  },

  // ✅ Gift intro screen
  intro: {
    title: "Heyyyyyyy",
    subtitle: "OPEN!",
    // put an image in /assets and set the path here
    underImage: "./assets/cover.jpg",
    holdToUnwrapMs: 1400
  },

  // ✅ Mini story chapters
  // Each chapter can require a password.
  // Passwords are case-insensitive.
  story: {
    title: "Some little appreications 😇",
    chapters: [
      {
        text: "Chapter 1 — There’s this person who somehow makes normal days feel like special ones.",
        caption: "Memory #1",
        image: "./assets/photo1.jpg",
      },
      {
        text: "Chapter 2 — I started collecting little moments. The kind you don’t want to forget.",
        caption: "Memory #2",
        image: "./assets/photo2.jpg",
      },
      {
        text: "Chapter 3 — If I could replay one thing, it would be your laugh (and the way you look when you’re happy).",
        caption: "Memory #3",
        image: "./assets/photo3.jpg",
      }
    ]
  },

  // ✅ Final question (after story)
  finalQuestion: {
    text: "Will you be my Valentine on February 14th, 2026? 🌹",
    yesBtn: "YES!!! 💝",
    noBtn: "No"
  },

  // ✅ Celebration
  celebration: {
    title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
    message: "Now come get your gift, a big warm hug and a huge kiss!",
    emojis: "🎁💖🤗💝💋❤️💕"
  },

  colors: {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757"
  },

  animations: {
    floatDuration: "15s",
    floatDistance: "50px",
    bounceSpeed: "0.5s",
    heartExplosionSize: 1.5
  },

  music: {
    enabled: true,
    autoplay: true,
    musicUrl: "./assets/song.mp3",
    startText: "🎵 Play Music",
    stopText: "🔇 Stop Music",
    volume: 0.5
  },

  // ✅ Easter egg unlock
  // Type this secret code anywhere to reveal a hidden button
  easterEgg: {
    typeCode: "love", // typing L O V E reveals the hidden button
    hiddenButtonText: "I don't like you, I love you! ❤️"
  }
};

window.VALENTINE_CONFIG = CONFIG;
