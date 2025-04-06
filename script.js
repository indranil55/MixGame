const games = [
    {
        title: "Temple Run",
        category: "Action",
        thumbnail: "https://via.placeholder.com/200x150?text=Temple+Run",
        url: "https://html5.gamedistribution.com/rvvASMiH/71b0f09a711a4c848bf6db0c10d118a0/index.html"
    },
    {
        title: "Candy Crush",
        category: "Puzzle",
        thumbnail: "https://via.placeholder.com/200x150?text=Candy+Crush",
        url: "https://html5.gamedistribution.com/rvvASMiH/c0f23092e1864f7f9fb3ed5f9790933a/index.html"
    }
];

function loadGames(category = "All Games") {
    const grid = document.getElementById("games-grid");
    grid.innerHTML = "";
    const filteredGames = category === "All Games" ? games : games.filter(g => g.category === category);

    filteredGames.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.className = "game-card";
        gameCard.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <h3>${game.title}</h3>
        `;
        gameCard.addEventListener("click", () => openGameModal(game.url));
        grid.appendChild(gameCard);
    });

    document.getElementById("loading").style.display = "none";
}

function openGameModal(url) {
    const modal = document.getElementById("game-modal");
    const iframe = document.getElementById("game-frame");
    iframe.src = url;
    modal.style.display = "flex";
}

document.querySelector(".close-modal").addEventListener("click", () => {
    const modal = document.getElementById("game-modal");
    const iframe = document.getElementById("game-frame");
    iframe.src = "";
    modal.style.display = "none";
});

document.querySelectorAll(".category-buttons button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".category-buttons button").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        loadGames(button.textContent);
    });
});

window.onload = () => {
    loadGames();
};
