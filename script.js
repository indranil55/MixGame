// script.js
document.addEventListener("DOMContentLoaded", () => {
  const gamesGrid = document.getElementById("games-grid");
  const loading = document.getElementById("loading");
  const modal = document.getElementById("game-modal");
  const iframe = document.getElementById("game-frame");
  const closeModal = document.querySelector(".close-modal");

  fetch("games.json")
    .then(response => response.json())
    .then(games => {
      loading.style.display = "none";
      games.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
          <img loading="lazy" src="${game.thumbnail}" alt="${game.title}" />
          <h3>${game.title}</h3>
        `;
        card.addEventListener("click", () => {
          iframe.src = game.url;
          modal.style.display = "block";
        });
        gamesGrid.appendChild(card);
      });
    });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = "";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
      iframe.src = "";
    }
  });
});
