// script.js
const gamesPerPage = 20;
let currentPage = 0;
let allGames = [];
let currentCategory = "All";

const gamesGrid = document.getElementById("games-grid");
const loading = document.getElementById("loading");
const loadMoreBtn = document.getElementById("load-more");
const gameModal = document.getElementById("game-modal");
const gameFrame = document.getElementById("game-frame");
const closeModal = document.querySelector(".close-modal");

function loadGames() {
  fetch("games.json")
    .then((response) => response.json())
    .then((data) => {
      allGames = data;
      renderGames();
    });
}

function renderGames() {
  loading.style.display = "block";
  setTimeout(() => {
    const filteredGames = currentCategory === "All"
      ? allGames
      : allGames.filter((game) => game.category === currentCategory);

    const start = currentPage * gamesPerPage;
    const end = start + gamesPerPage;
    const gamesToShow = filteredGames.slice(start, end);

    gamesToShow.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
        <div class="game-title">${game.title}</div>
      `;
      card.addEventListener("click", () => openGame(game.url));
      gamesGrid.appendChild(card);
    });

    loading.style.display = "none";
    currentPage++;
    if (end >= filteredGames.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  }, 500);
}

function openGame(url) {
  gameFrame.src = url;
  gameModal.style.display = "flex";
}

function closeGame() {
  gameFrame.src = "";
  gameModal.style.display = "none";
}

loadMoreBtn.addEventListener("click", renderGames);
closeModal.addEventListener("click", closeGame);

// Category filter
const categoryButtons = document.querySelectorAll(".category-buttons button");
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.category;
    currentPage = 0;
    gamesGrid.innerHTML = "";
    renderGames();
  });
});

loadGames();
