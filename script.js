let allGames = [];
let loadedCount = 0;
const GAMES_PER_LOAD = 12;

fetch("games.json")
  .then(res => res.json())
  .then(data => {
    allGames = data;
    loadGames();
  });

function loadGames() {
  const grid = document.getElementById("games-grid");
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  setTimeout(() => {
    let slice = allGames.slice(loadedCount, loadedCount + GAMES_PER_LOAD);
    slice.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${game.thumbnail}" loading="lazy" alt="${game.title}">
        <h3>${game.title}</h3>
      `;
      card.addEventListener("click", () => openGame(game.url));
      grid.appendChild(card);
    });

    loadedCount += GAMES_PER_LOAD;
    loading.style.display = "none";
  }, 500);
}

document.getElementById("load-more").addEventListener("click", loadGames);

document.querySelectorAll(".category-buttons button").forEach(button => {
  button.addEventListener("click", e => {
    document.querySelectorAll(".category-buttons button").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    const category = e.target.dataset.category;
    const filtered = category === "All" ? allGames : allGames.filter(g => g.category === category);
    document.getElementById("games-grid").innerHTML = "";
    loadedCount = 0;
    allGames = filtered;
    loadGames();
  });
});

document.querySelector(".close-modal").addEventListener("click", () => {
  document.getElementById("game-modal").style.display = "none";
  document.getElementById("game-frame").src = "";
});

function openGame(url) {
  document.getElementById("game-modal").style.display = "flex";
  document.getElementById("game-frame").src = url;
}
