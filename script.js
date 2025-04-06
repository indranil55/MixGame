document.addEventListener("DOMContentLoaded", () => {
  const gamesGrid = document.getElementById("games-grid");
  const topGames = document.getElementById("topGames");
  const searchBar = document.getElementById("searchBar");
  const categoryButtons = document.querySelectorAll("#categoryFilter button");
  const modal = document.getElementById("gameModal");
  const modalFrame = document.getElementById("gameFrame");
  const modalClose = document.getElementById("modalClose");

  let gamesData = [];

  fetch("games.json")
    .then((res) => res.json())
    .then((data) => {
      gamesData = data;
      renderTopGames(data);
      renderGames(data);
    });

  function renderGames(data) {
    gamesGrid.innerHTML = "";
    data.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
        <h3>${game.title}</h3>
      `;
      card.addEventListener("click", () => openModal(game.url));
      gamesGrid.appendChild(card);
    });
  }

  function renderTopGames(data) {
    topGames.innerHTML = "";
    const top = data.filter((g) => g.top);
    top.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
        <h3>${game.title}</h3>
      `;
      card.addEventListener("click", () => openModal(game.url));
      topGames.appendChild(card);
    });
  }

  function openModal(url) {
    modalFrame.src = url;
    modal.classList.add("active");
  }

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

  searchBar.addEventListener("input", () => {
    const value = searchBar.value.toLowerCase();
    const filtered = gamesData.filter((g) => g.title.toLowerCase().includes(value));
    renderGames(filtered);
  });

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-category");
      const filtered = cat === "All" ? gamesData : gamesData.filter((g) => g.category === cat);
      renderGames(filtered);
    });
  });
});
