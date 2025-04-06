document.addEventListener("DOMContentLoaded", () => {
  const gamesGrid = document.getElementById("games-grid");
  const modal = document.getElementById("game-modal");
  const gameFrame = document.getElementById("game-frame");
  const closeModal = document.querySelector(".close-modal");
  const loading = document.getElementById("loading");

  fetch("games.json")
    .then((response) => response.json())
    .then((games) => {
      loading.style.display = "none";

      games.forEach((game) => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
          <img loading="lazy" src="${game.thumbnail}" alt="${game.title}">
          <h3>${game.title}</h3>
        `;
        card.addEventListener("click", () => {
          gameFrame.src = game.url;
          modal.style.display = "flex";
        });
        gamesGrid.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Failed to load games.json", err);
      loading.textContent = "Failed to load games.";
    });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    gameFrame.src = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      gameFrame.src = "";
    }
  });
});
