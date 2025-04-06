const games = [
  {
    title: "Temple Run",
    category: "Adventure",
    thumbnail: "https://img.gamedistribution.com/51e2dc353f3645c19a2dfef2c8b4a306-512x384.jpeg",
    url: "https://html5.gamedistribution.com/51e2dc353f3645c19a2dfef2c8b4a306/?gd_sdk_referrer_url=https://indranil55.github.io/MixGame/"
  },
  {
    title: "Cut The Rope",
    category: "Puzzle",
    thumbnail: "https://img.gamedistribution.com/45bbef079f814dd3a7dd292d9e4bc5e2-512x384.jpeg",
    url: "https://html5.gamedistribution.com/45bbef079f814dd3a7dd292d9e4bc5e2/?gd_sdk_referrer_url=https://indranil55.github.io/MixGame/"
  },
  {
    title: "Penalty Kick",
    category: "Sports",
    thumbnail: "https://img.gamedistribution.com/8d4bb97953cb4b1db3ed6e1e5458cfd4-512x384.jpeg",
    url: "https://html5.gamedistribution.com/8d4bb97953cb4b1db3ed6e1e5458cfd4/?gd_sdk_referrer_url=https://indranil55.github.io/MixGame/"
  }
];

const gamesGrid = document.getElementById("games-grid");
const modal = document.getElementById("game-modal");
const iframe = document.getElementById("game-frame");
const closeModal = document.querySelector(".close-modal");

function loadGames() {
  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}">
      <div class="overlay">▶ Tap to Play</div>
      <h3>${game.title}</h3>
    `;
    card.addEventListener("click", () => {
      iframe.src = game.url;
      modal.style.display = "flex";
    });
    gamesGrid.appendChild(card);
  });
  document.getElementById("loading").style.display = "none";
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = "";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    iframe.src = "";
  }
});

window.addEventListener("DOMContentLoaded", loadGames);
