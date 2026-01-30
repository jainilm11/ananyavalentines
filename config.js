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
    title: "Some little appreciations 😇",
    chapters: [
      {
        text: "Hi peanut, I wanted to showcase some things that make our loVe so insanely special and how grateful I am for you in my life. We have so so many cutesy moments that I don't think I could ever forget, from laughing in rAin, school car rides, crafty dates, pumpkin carving/gingerbreads, and sm sm more. I never feel like I have enough time with you and I'm glad to be with someone that geniunely makes time fly. I have cherished the 502 days I have spent being your boyfriend and am truLy ready for the ∞ to come.",
        caption: "",
        image: "./assets/photo1.jpg",
      },
      {
        text: "Apart from the strong love in our relationship, one of my favorites is our weirdness. From the cute yet funny faces that you make in 500+ facetime photos to insane bathroom stories, I feel so comfortable around you and I don't think I could ever judge/find you weird at all. Having a best friend and girlfriend that can make me constantly laugh and smile is the best thing of our relationship, something I would never ever give up. Thank you for being so unapologeticly yourself #YouDoYou❤️",
        caption: "",
        image: "./assets/photo2.jpg",
      },
      {
        text: "The one we've been waiting for. Causation = Correlation here, we argue every time we know that we are seeing each other. I want to sincerely apologize for everything thats happened these past few weeks and that none of it should have happened and our communication was just weak, and on top of that my efforts. While being sick, I let that count as an excuse and I wanted this to show you I care about you so much and will put in any effort to see you smile. I will do much better this quarter to put spotlight on US and how we can be the best ever while in long distance, this is my priority and I'm here to show you that too :)! Hope you've enjoyed this and let's move on...... ",
        caption: "",
        image: "./assets/photo3.jpg",
      }
    ]
  },

  // ✅ Final question (after story)
  finalQuestion: {
    text: "Will you be my Valentine?",
    yesBtn: "Yes",
    noBtn: "No"
  },

  // ✅ Celebration
  celebration: {
    title: "WOOOOOOOOOOOO!!!!! VALENTINE ✅ ✅ ✅ ✅  ",
    message: "Check out what's in your closet :)",
    emojis: "😜😊🫶🏼😍🤗💕"
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
  polaroids: [
  { src: "./assets/photo4.jpg", caption: "" },
  { src: "./assets/photo5.jpg", caption: "" },
  { src: "./assets/photo6.jpg", caption: "" },
  { src: "./assets/photo7.jpg", caption: "" }
],

  // ✅ Easter egg unlock
  // Type this secret code anywhere to reveal a hidden button
  easterEgg: {
    typeCode: "love", // typing L O V E reveals the hidden button
    hiddenButtonText: "I don't like you, I love you! ❤️"
  }
};

window.VALENTINE_CONFIG = CONFIG;
