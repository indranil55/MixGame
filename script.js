const games = [
  {
    title: "Zombie Hunter",
    thumbnail: "https://games-assets.crazygames.com/zombie-hunter/thumb-512x384.webp",
    url: "https://games.crazygames.com/en_US/zombie-hunter/index.html"
  },
  {
    title: "Temple Run 2",
    thumbnail: "https://games-assets.crazygames.com/temple-run-2/thumb-512x384.webp",
    url: "https://games.crazygames.com/en_US/temple-run-2/index.html"
  },
  {
    title: "Moto X3M",
    thumbnail: "https://games-assets.crazygames.com/moto-x3m/thumb-512x384.webp",
    url: "https://games.crazygames.com/en_US/moto-x3m/index.html"
  },
  {
    title: "Stacky Bird",
    thumbnail: "https://games-assets.crazygames.com/stacky-bird/thumb-512x384.webp",
    url: "https://games.crazygames.com/en_US/stacky-bird/index.html"
  },
  {
    title: "Basketball Stars",
    thumbnail: "https://games-assets.crazygames.com/basketball-stars/thumb-512x384.webp",
    url: "https://games.crazygames.com/en_US/basketball-stars/index.html"
  }
];

const gameGrid = document.getElementById("games-grid");
const loading = document.getElementById("loading");
const gameModal = document.getElementById("game-modal");
const gameFrame = document.getElementById("game-frame");
const closeModal = document.querySelector(".close-modal");

function loadGames() {
  loading.style.display = "none";
  games.forEach(game => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    gameCard.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}">
      <h4>${game.title}</h4>
    `;

    gameCard.addEventListener("click", () => {
      gameFrame.src = game.url;
      gameModal.style.display = "flex";
    });

    gameGrid.appendChild(gameCard);
  });
}

closeModal.addEventListener("click", () => {
  gameModal.style.display = "none";
  gameFrame.src = "";
});

window.addEventListener("click", (e) => {
  if (e.target === gameModal) {
    gameModal.style.display = "none";
    gameFrame.src = "";
  }
});

window.onload = loadGames;
