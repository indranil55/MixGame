// script.js

const gamesGrid = document.getElementById("games-grid");
const gameModal = document.getElementById("game-modal");
const gameFrame = document.getElementById("game-frame");
const closeModal = document.querySelector(".close-modal");
const loading = document.getElementById("loading");

let allGames = [];

fetch("games.json")
  .then((res) => res.json())
  .then((games) => {
    allGames = games;
    renderGames(allGames);
  });

function renderGames(games) {
  loading.style.display = "none";
  games.forEach((game) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}">
      <h4>${game.title}</h4>
    `;
    card.addEventListener("click", () => openGame(game.url));
    gamesGrid.appendChild(card);
  });
}

function openGame(url) {
  gameFrame.src = url;
  gameModal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
  gameModal.style.display = "none";
  gameFrame.src = "";
});

gameModal.addEventListener("click", (e) => {
  if (e.target === gameModal) {
    gameModal.style.display = "none";
    gameFrame.src = "";
  }
});
