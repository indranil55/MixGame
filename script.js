let gamesData = [];
let loadedGames = 0;
const gamesPerLoad = 20;

const gameContainer = document.getElementById("gameContainer");
const topGamesContainer = document.getElementById("topGames");
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const loading = document.getElementById("loading");
const modal = document.getElementById("gameModal");
const gameFrame = document.getElementById("gameFrame");
const modalClose = document.getElementById("modalClose");

fetch("games.json")
  .then(res => res.json())
  .then(data => {
    gamesData = data;
    renderCategories(data);
    renderTopGames(data);
    renderGames(data);
  });

function renderCategories(data) {
  const categories = ["All", ...new Set(data.map(game => game.category))];
  categoryFilter.innerHTML = categories.map(cat => `<button data-category="${cat}">${cat}</button>`).join("");
}

function renderGames(data, append = false) {
  const filteredGames = filterGames(data);
  const gamesToRender = filteredGames.slice(loadedGames, loadedGames + gamesPerLoad);
  if (!append) gameContainer.innerHTML = "";

  gamesToRender.forEach(game => {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";
    gameCard.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
      <p>${game.title}</p>
    `;
    gameCard.addEventListener("click", () => openGameModal(game.url));
    gameContainer.appendChild(gameCard);
  });

  loadedGames += gamesPerLoad;
  loading.style.display = loadedGames < filteredGames.length ? "block" : "none";
}

function renderTopGames(data) {
  const topGames = data.filter(game => game.top);
  topGamesContainer.innerHTML = topGames.map(game => `
    <div class="game-card" onclick="openGameModal('${game.url}')">
      <img src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
      <p>${game.title}</p>
    </div>
  `).join("");
}

function filterGames(data) {
  const searchTerm = searchBar.value.toLowerCase();
  const selectedCategory = document.querySelector("#categoryFilter .active")?.dataset.category || "All";
  return data.filter(game => {
    const matchTitle = game.title.toLowerCase().includes(searchTerm);
    const matchCategory = selectedCategory === "All" || game.category === selectedCategory;
    return matchTitle && matchCategory;
  });
}

categoryFilter.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    document.querySelectorAll("#categoryFilter button").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    loadedGames = 0;
    renderGames(gamesData);
  }
});

searchBar.addEventListener("input", () => {
  loadedGames = 0;
  renderGames(gamesData);
});

function openGameModal(url) {
  modal.style.display = "block";
  gameFrame.src = url;
}

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  gameFrame.src = "";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    gameFrame.src = "";
  }
});

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    renderGames(gamesData, true);
  }
});
