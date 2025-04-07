// script.js - Final version for MixGame

let gamesData = [];
const gameContainer = document.getElementById("gameContainer");
const topGamesContainer = document.getElementById("topGames");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("gameModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

fetch("games.json")
  .then(res => res.json())
  .then(data => {
    gamesData = data;
    renderCategories(data);
    renderTopGames(data);
    renderGames(data);
  });

function renderCategories(data) {
  const categories = [...new Set(data.map(game => game.category))];
  categoryFilter.innerHTML = `<option value="all">All</option>` +
    categories.map(cat => `<option value="${cat}">${cat}</option>`).join("");
}

function renderTopGames(data) {
  const topGames = data.filter(game => game.top);
  topGamesContainer.innerHTML = topGames.map(createGameCard).join("");
}

function renderGames(data) {
  gameContainer.innerHTML = data.map(createGameCard).join("");
}

function createGameCard(game) {
  return `
    <div class="game-card" onclick="openModal('${game.url}')">
      <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
      <h3>${game.title}</h3>
    </div>
  `;
}

function openModal(url) {
  modal.style.display = "flex";
  modalContent.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`;
}

closeModal.onclick = () => {
  modal.style.display = "none";
  modalContent.innerHTML = "";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    modalContent.innerHTML = "";
  }
};

categoryFilter.addEventListener("change", () => {
  const selected = categoryFilter.value;
  const filtered = selected === "all" ? gamesData : gamesData.filter(game => game.category === selected);
  renderGames(filtered);
});

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = gamesData.filter(game => game.title.toLowerCase().includes(keyword));
  renderGames(filtered);
});
