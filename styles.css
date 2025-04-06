// script.js
const games = [
    { title: "Car Racing", category: "Racing", url: "https://example.com/game1", img: "https://via.placeholder.com/180x120?text=Car+Racing" },
    { title: "Puzzle Mania", category: "Puzzle", url: "https://example.com/game2", img: "https://via.placeholder.com/180x120?text=Puzzle+Mania" },
    { title: "Jungle Adventure", category: "Adventure", url: "https://example.com/game3", img: "https://via.placeholder.com/180x120?text=Jungle+Adventure" },
    { title: "Football Strike", category: "Sports", url: "https://example.com/game4", img: "https://via.placeholder.com/180x120?text=Football+Strike" },
    { title: "Zombie Attack", category: "Action", url: "https://example.com/game5", img: "https://via.placeholder.com/180x120?text=Zombie+Attack" },
];

const grid = document.getElementById('games-grid');
const modal = document.getElementById('game-modal');
const gameFrame = document.getElementById('game-frame');
const closeModal = document.querySelector('.close-modal');
const categoryButtons = document.querySelectorAll('.category-buttons button');

function loadGames(category = "All Games") {
    grid.innerHTML = '';
    const filtered = category === "All Games" ? games : games.filter(game => game.category === category);
    filtered.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.img}" alt="${game.title}">
            <h3>${game.title}</h3>
            <button onclick="openGame('${game.url}')">Play</button>
        `;
        grid.appendChild(card);
    });
    document.getElementById('loading').style.display = 'none';
}

function openGame(url) {
    modal.style.display = 'flex';
    gameFrame.src = url;
}

function closeGame() {
    modal.style.display = 'none';
    gameFrame.src = '';
}

closeModal.addEventListener('click', closeGame);
window.addEventListener('click', e => {
    if (e.target === modal) closeGame();
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.category-buttons .active').classList.remove('active');
        button.classList.add('active');
        loadGames(button.textContent);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loadGames();
});
