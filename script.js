const games = [
  {
    title: "Zombie Hunter",
    thumbnail: "https://www.gamepix.com/assets/img/zombie-hunter.jpg",
    url: "https://www.gamepix.com/play/zombie-hunter"
  },
  {
    title: "Candy Crush Saga",
    thumbnail: "https://www.gamepix.com/assets/img/candy-crush.jpg",
    url: "https://www.gamepix.com/play/candy-crush"
  },
  {
    title: "Car Racing",
    thumbnail: "https://www.gamepix.com/assets/img/car-racing.jpg",
    url: "https://www.gamepix.com/play/car-racing"
  }
];
const gamesGrid = document.getElementById("games-grid");
const modal = document.getElementById("game-modal");
const iframe = document.getElementById("game-frame");
const closeModal = document.querySelector(".close-modal");

function loadGames() {
  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}">
      <div class="overlay">▶ Tap to Play</div>
      <h3>${game.title}</h3>
    `;
    card.addEventListener("click", () => {
      iframe.src = game.url;
      modal.style.display = "flex";
    });
    gamesGrid.appendChild(card);
  });
  document.getElementById("loading").style.display = "none";
}

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

window.addEventListener("DOMContentLoaded", loadGames);
