document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Game data for the carousel
    const games = {
        moveon: {
            title: "Move On",
            description: "Move On is a 2D Platformer made for the 2025 Winter GameJam held by the RWTH Aachen. The theme was 'Nothing is permanent'. Your goal is to complete four different levels by collecting the flag at the end of each one. But don't wait for too long because only the fastest can make it onto the leaderboard!",
            images: [
                "assets/moveon-ingame_1.webp",
                "assets/moveon-ingame_2.webp",
                "assets/moveon-ingame_3.webp",
                "assets/moveon-ingame_4.webp"
            ]
        },
        choros: {
            title: "Choros",
            description: "Choros is a 2D action space shooter game. Your goal is to stay alive as long as possible while fighting off waves of enemies and challenging bosses. Upgrade your ship, collect power-ups, and climb the leaderboards in this intense arcade-style shooter.",
            images: [
                "assets/choros-ingame_1_mod.webp",
                "assets/choros-ingame_2_mod.webp",
                "assets/choros-ingame_3_mod.webp"
            ]
        },
        sac: {
            title: "S.A.C.",
            description: "In S.A.C., you are a Secret Agent who works for the company S.A.C.! Your mission is to prevent a new company from building a deadly weapon. Infiltrate their offices, steal classified documents, and take out key employees in this stealth action game.",
            images: [
                "assets/sac-ingame_1.webp",
                "assets/sac-ingame_2.webp",
                "assets/sac-ingame_3.webp"
            ]
        },
        catadventure: {
            title: "Cat Adventure",
            description: "Cat Adventure is a Run and Gun Platformer Game where you play as a cat on a mission to catch the mouse at the end of each level. The game features over 30 levels across three different worlds, each with unique challenges and enemies. Test your skills in the final boss fight!",
            images: [
                "assets/catadventure-ingame_1.webp",
                "assets/catadventure-ingame_2.webp",
                "assets/catadventure-ingame_3.webp",
                "assets/catadventure-ingame_4.webp",
                "assets/catadventure-ingame_5.webp",
                "assets/catadventure-ingame_6.webp",
                "assets/catadventure-ingame_7.webp",
                "assets/catadventure-ingame_8.webp"
            ]
        }
    };
    
    // Initialize carousel
    let currentGame = null;
    let currentImageIndex = 0;
    let carouselInterval = null;
    
    // Set up game card click handlers
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game');
            showGameDetails(gameId);
            
        });
    });
    
    // Carousel controls
    document.querySelector('.prev').addEventListener('click', () => {
        navigateCarousel(-1);
        resetCarouselInterval();
    });
    
    document.querySelector('.next').addEventListener('click', () => {
        navigateCarousel(1);
        resetCarouselInterval();
    });
    
    function showGameDetails(gameId) {
        currentGame = games[gameId];
        currentImageIndex = 0;
        
        // Update game info
        document.querySelector('.game-title').textContent = currentGame.title;
        document.querySelector('.game-description').textContent = currentGame.description;
        
        // Update carousel images
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = '';
        
        currentGame.images.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${currentGame.title} Screenshot ${index + 1}`;
            if (index === 0) img.classList.add('active');
            carouselInner.appendChild(img);
        });
        
        // Start auto-rotation
        resetCarouselInterval();
    }
    
    function navigateCarousel(direction) {
        if (!currentGame) return;
        
        const images = document.querySelectorAll('.carousel-inner img');
        images[currentImageIndex].classList.remove('active');
        
        currentImageIndex += direction;
        
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }
        
        images[currentImageIndex].classList.add('active');
    }
    
    function resetCarouselInterval() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        
        if (currentGame) {
            carouselInterval = setInterval(() => {
                navigateCarousel(1);
            }, 5000);
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize with first game
    showGameDetails('moveon');
});
