document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const categoryFilter = document.getElementById("categoryFilter");
  const searchInput = document.getElementById("searchInput");
  const topGamesSection = document.getElementById("topGames");
  const modal = document.getElementById("gameModal");
  const modalFrame = document.getElementById("gameFrame");
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
        modalFrame.src = game.url;
        modal.classList.add("active");
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
        modalFrame.src = game.url;
        modal.classList.add("active");
      });
      topGamesSection.appendChild(card);
    });
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

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    modalFrame.src = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      modalFrame.src = "";
    }
  });
});
