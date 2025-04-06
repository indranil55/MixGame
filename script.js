document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("games-grid");
  const topGamesSection = document.getElementById("topGames");
  const categoryButtons = document.querySelectorAll("#categoryFilter button");
  const searchInput = document.getElementById("searchBar");
  const modal = document.getElementById("gameModal");
  const modalFrame = document.getElementById("gameFrame");
  const modalClose = document.getElementById("modalClose");

  let gamesData = [];

  // Fetch game data from games.json
  fetch("games.json")
    .then((res) => res.json())
    .then((data) => {
      gamesData = data;
      renderGames(gamesData);
      renderTopGames(gamesData);
    });

  // Render all games
  function renderGames(games) {
    gameContainer.innerHTML = "";
    games.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
        <h3>${game.title}</h3>
      `;
      card.addEventListener("click", () => {
        modal.classList.add("active");
        modalFrame.src = game.url;
      });
      gameContainer.appendChild(card);
    });
  }

  // Render Top Games
  function renderTopGames(games) {
    const topGames = games.filter((game) => game.top);
    topGamesSection.innerHTML = "";
    topGames.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
        <h3>${game.title}</h3>
      `;
      card.addEventListener("click", () => {
        modal.classList.add("active");
        modalFrame.src = game.url;
      });
      topGamesSection.appendChild(card);
    });
  }

  // Filter by category
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      const filteredGames =
        category === "All"
          ? gamesData
          : gamesData.filter((game) => game.category === category);
      renderGames(filteredGames);
    });
  });

  // Search bar filter
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filteredGames = gamesData.filter((game) =>
      game.title.toLowerCase().includes(keyword)
    );
    renderGames(filteredGames);
  });

  // Modal close
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    modalFrame.src = "";
  });

  // Close modal by clicking outside iframe
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      modalFrame.src = "";
    }
  });
});
