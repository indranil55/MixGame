document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("game-container");
  const categoryFilter = document.getElementById("category-filter");
  const searchInput = document.getElementById("search-input");
  const topGamesSection = document.getElementById("top-games");
  const modal = document.getElementById("game-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModal = document.getElementById("close-modal");
  const loader = document.getElementById("loader");

  let allGames = [];
  let loadedCount = 0;
  const loadStep = 20;

  fetch("games.json")
    .then((res) => res.json())
    .then((games) => {
      allGames = games;
      populateCategories(games);
      renderTopGames(games);
      renderGames();
    });

  function renderGames(filter = "", category = "") {
    loader.style.display = "block";
    const filtered = allGames.filter((game) => {
      const matchTitle = game.title.toLowerCase().includes(filter.toLowerCase());
      const matchCategory = category ? game.category === category : true;
      return matchTitle && matchCategory;
    });

    const toRender = filtered.slice(loadedCount, loadedCount + loadStep);
    toRender.forEach((game) => {
      const card = createGameCard(game);
      gameContainer.appendChild(card);
    });
    loadedCount += loadStep;
    loader.style.display = "none";
  }

  function createGameCard(game) {
    const div = document.createElement("div");
    div.className = "game-card";
    div.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
      <div class="game-title">${game.title}</div>
    `;
    div.addEventListener("click", () => openGameModal(game));
    return div;
  }

  function populateCategories(games) {
    const categories = [
      ...new Set(games.map((game) => game.category))
    ];
    categories.sort();
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.className = "filter-button";
      btn.addEventListener("click", () => {
        gameContainer.innerHTML = "";
        loadedCount = 0;
        renderGames(searchInput.value, cat);
      });
      categoryFilter.appendChild(btn);
    });
  }

  function renderTopGames(games) {
    const top = games.filter((g) => g.top);
    top.slice(0, 6).forEach((game) => {
      const div = createGameCard(game);
      topGamesSection.appendChild(div);
    });
  }

  function openGameModal(game) {
    modal.style.display = "flex";
    modalContent.innerHTML = `
      <iframe src="${game.url}" frameborder="0" allowfullscreen></iframe>
    `;
  }

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    modalContent.innerHTML = "";
  });

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      renderGames(searchInput.value, getActiveCategory());
    }
  });

  function getActiveCategory() {
    const active = document.querySelector(".filter-button.active");
    return active ? active.textContent : "";
  }

  searchInput.addEventListener("input", () => {
    gameContainer.innerHTML = "";
    loadedCount = 0;
    renderGames(searchInput.value, getActiveCategory());
  });
});
