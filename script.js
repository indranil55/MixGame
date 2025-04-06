// GamePix API Configuration
const GAMEPIX_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const GAMEPIX_API_URL = 'https://api.gamepix.com/games';
let currentPage = 1;
let isLoading = false;

// DOM Elements
const gamesGrid = document.getElementById('games-grid');
const loadingElement = document.getElementById('loading');
const loadMoreButton = document.getElementById('load-more');
const gameModal = document.getElementById('game-modal');
const gameFrame = document.getElementById('game-frame');
const closeModal = document.querySelector('.close-modal');

// Fetch games from GamePix API
async function fetchGames(page = 1, category = '') {
    isLoading = true;
    loadingElement.style.display = 'block';
    loadMoreButton.style.display = 'none';

    try {
        const response = await fetch(`${GAMEPIX_API_URL}?key=${GAMEPIX_API_KEY}&page=${page}&limit=12${category ? `&category=${category}` : ''}`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            displayGames(data.data);
            currentPage = page;
            
            // Show load more button if there are more games
            if (data.total > (page * 12)) {
                loadMoreButton.style.display = 'block';
            }
        } else {
            loadingElement.textContent = 'No more games available.';
        }
    } catch (error) {
        console.error('Error fetching games:', error);
        loadingElement.textContent = 'Failed to load games. Please try again later.';
    } finally {
        isLoading = false;
        loadingElement.style.display = 'none';
    }
}

// Display games in the grid
function displayGames(games) {
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <img src="${game.thumbnailUrl || 'https://via.placeholder.com/300x150'}" alt="${game.title}" class="game-thumbnail">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <span class="game-category">${game.category || 'General'}</span>
            </div>
        `;
        
        gameCard.addEventListener('click', () => openGame(game));
        gamesGrid.appendChild(gameCard);
    });
}

// Open game in modal
function openGame(game) {
    gameFrame.src = game.gameUrl;
    gameModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeGameModal() {
    gameFrame.src = '';
    gameModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners
closeModal.addEventListener('click', closeGameModal);
gameModal.addEventListener('click', (e) => {
    if (e.target === gameModal) {
        closeGameModal();
    }
});

loadMoreButton.addEventListener('click', () => {
    if (!isLoading) {
        fetchGames(currentPage + 1);
    }
});

// Category filtering
document.querySelectorAll('.category-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        document.querySelector('.category-buttons button.active').classList.remove('active');
        button.classList.add('active');
        
        // Clear current games
        gamesGrid.innerHTML = '';
        
        // Fetch games for selected category
        const category = button.textContent === 'All Games' ? '' : button.textContent.toLowerCase();
        fetchGames(1, category);
    });
});

// Initialize
fetchGames();
