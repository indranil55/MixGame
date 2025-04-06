let games = [];
let filteredGames = [];
let currentIndex = 0;
const gamesPerPage = 20;

const gamesGrid = document.getElementById("games-grid");
const topGamesGrid = document.getElementById("topGames");
const loading = document.getElementById("loading");
const searchBar = document.getElementById("searchBar");
const categoryButtons = document.querySelectorAll("#categoryFilter button");

const modal = document.getElementById("gameModal");
const gameFrame = document.getElementById("gameFrame");
const closeModal = document.getElementById("closeModal");

fetch("games.json")
  .then((res) => res.json())
  .then((data) => {
    games = data;
    filteredGames = games;
    displayTopGames();
    loadGames();
  });

function displayTopGames() {
  const top = games.slice(0, 10);
  topGamesGrid.innerHTML = "";
  top.forEach((game) => {
    const gameCard = createGameCard(game);
    topGamesGrid.appendChild(gameCard);
  });
}

function createGameCard(game) {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `
    <img src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
    <p>${game.title}</p>
  `;
  card.onclick = () => openGameModal(game.url);
  return card;
}

function loadGames() {
  const nextGames = filteredGames.slice(currentIndex, currentIndex + gamesPerPage);
  nextGames.forEach((game) => {
    const card = createGameCard(game);
    gamesGrid.appendChild(card);
  });
  currentIndex += gamesPerPage;
  if (currentIndex >= filteredGames.length) {
    loading.style.display = "none";
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    currentIndex < filteredGames.length
  ) {
    loadGames();
  }
});

searchBar.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  filteredGames = games.filter((g) =>
    g.title.toLowerCase().includes(value)
  );
  resetGameGrid();
});

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    if (category === "All") {
      filteredGames = games;
    } else {
      filteredGames = games.filter((g) => g.category === category);
    }
    resetGameGrid();
  });
});

function resetGameGrid() {
  gamesGrid.innerHTML = "";
  currentIndex = 0;
  loadGames();
}

function openGameModal(url) {
  gameFrame.src = url;
  modal.style.display = "block";
}

closeModal.onclick = () => {
  gameFrame.src = "";
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    gameFrame.src = "";
    modal.style.display = "none";
  }
};
