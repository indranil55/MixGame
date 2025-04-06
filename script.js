let gamesData = [];
let currentIndex = 0;
const batchSize = 20;

function renderGames(data, reset = true) {
  const container = document.getElementById("games-grid");
  if (reset) container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const gamesToShow = data.slice(currentIndex, currentIndex + batchSize);
  gamesToShow.forEach(game => {
    const div = document.createElement("div");
    div.className = "game-card";
    div.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}" />
      <p>${game.title}</p>
    `;
    div.addEventListener("click", () => openGame(game.url));
    fragment.appendChild(div);
  });
  container.appendChild(fragment);
  currentIndex += batchSize;

  if (currentIndex >= data.length) {
    document.getElementById("loading").style.display = "none";
  }
}

function renderTopGames(data) {
  const topContainer = document.getElementById("topGames");
  topContainer.innerHTML = "";
  data.filter(game => game.top).forEach(game => {
    const div = document.createElement("div");
    div.className = "game-card";
    div.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}" />
      <p>${game.title}</p>
    `;
    div.addEventListener("click", () => openGame(game.url));
    topContainer.appendChild(div);
  });
}

function renderCategories(data) {
  document.querySelectorAll("#categoryFilter button").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category;
      currentIndex = 0;
      const filtered = cat === "All" ? data : data.filter(g => g.category === cat);
      renderGames(filtered);
    });
  });
}

function openGame(url) {
  document.getElementById("gameFrame").src = url;
  document.getElementById("gameModal").style.display = "block";
}

document.getElementById("modalClose").onclick = function () {
  document.getElementById("gameModal").style.display = "none";
  document.getElementById("gameFrame").src = "";
};

window.onclick = function (event) {
  const modal = document.getElementById("gameModal");
  if (event.target === modal) {
    modal.style.display = "none";
    document.getElementById("gameFrame").src = "";
  }
};

document.getElementById("searchBar").addEventListener("input", function () {
  const term = this.value.toLowerCase();
  const filtered = gamesData.filter(game => game.title.toLowerCase().includes(term));
  currentIndex = 0;
  renderGames(filtered);
});

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    renderGames(gamesData, false);
  }
});

fetch("games.json")
  .then(res => res.json())
  .then(data => {
    gamesData = data;
    renderCategories(data);
    renderTopGames(data);
    renderGames(data);
  });
