function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const images = container.querySelectorAll('.carousel img');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        const indicatorsContainer = container.querySelector('.carousel-indicators');
        
        let currentIndex = 0;
        const totalImages = images.length;
        let intervalId;
        
        // Create indicators
        images.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToImage(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        // Set up auto-rotation
        function startAutoRotation() {
            intervalId = setInterval(() => {
                nextImage();
            }, 5000); // Change image every 5 seconds
        }
        
        function stopAutoRotation() {
            clearInterval(intervalId);
        }
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active indicator
            container.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        function nextImage() {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        }
        
        function prevImage() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        }
        
        function goToImage(index) {
            currentIndex = index;
            updateCarousel();
            stopAutoRotation();
            startAutoRotation();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextImage();
            stopAutoRotation();
            startAutoRotation();
        });
        
        prevBtn.addEventListener('click', () => {
            prevImage();
            stopAutoRotation();
            startAutoRotation();
        });
        
        // Pause on hover
        container.addEventListener('mouseenter', stopAutoRotation);
        container.addEventListener('mouseleave', startAutoRotation);
        
        // Initialize
        startAutoRotation();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCarousels);
