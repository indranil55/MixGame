document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const categoryFilter = document.getElementById("categoryFilter");
  const searchInput = document.getElementById("searchInput");
  const topGamesSection = document.getElementById("topGames");
  const modal = document.getElementById("gameModal");
  const modalContent = document.querySelector(".modal-content");
  const modalClose = document.getElementById("modalClose");

  let gamesData = [];

  fetch("games.json")
    .then((res) => res.json())
    .then((data) => {
      gamesData = data;
      renderCategories(data);
      renderGames(data);
      renderTopGames(data);
    });

  function renderCategories(data) {
    const categories = [...new Set(data.map((game) => game.category))];
    categories.sort();
    categories.unshift("All");

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  function renderGames(data) {
    gameContainer.innerHTML = "";
    data.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
        <h3>${game.title}</h3>
      `;
      card.addEventListener("click", () => {
        openGameModal(game.url);
      });
      gameContainer.appendChild(card);
    });
  }

  function renderTopGames(data) {
    const topGames = data.filter((game) => game.top);
    topGames.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
        <h3>${game.title}</h3>
      `;
      card.addEventListener("click", () => {
        openGameModal(game.url);
      });
      topGamesSection.appendChild(card);
    });
  }

  function openGameModal(url) {
    modalContent.innerHTML = `
      <span id="modalClose" class="close">&times;</span>
      <iframe src="${url}" frameborder="0" allowfullscreen></iframe>
    `;
    modal.classList.add("active");

    // Re-bind close button (as it's now re-rendered)
    document.getElementById("modalClose").addEventListener("click", closeModal);
  }

  function closeModal() {
    modal.classList.remove("active");
    modalContent.innerHTML = ""; // Clear iframe
  }

  categoryFilter.addEventListener("change", () => {
    const value = categoryFilter.value;
    const filtered = value === "All" ? gamesData : gamesData.filter((g) => g.category === value);
    renderGames(filtered);
  });

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = gamesData.filter((g) => g.title.toLowerCase().includes(value));
    renderGames(filtered);
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});
