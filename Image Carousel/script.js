document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    // State
    let counter = 0;
    const size = carouselImages[0].clientWidth;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Initialize carousel
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    
    // Disable previous button initially
    prevBtn.style.opacity = '0.5';
    prevBtn.style.cursor = 'not-allowed';
    
    // Create dots
    carouselImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Button listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Touch events for mobile
    carouselSlide.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    }, { passive: true });
    
    carouselSlide.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchEndX < touchStartX && counter < carouselImages.length - 1) {
            nextSlide();
        } else if (touchEndX > touchStartX && counter > 0) {
            prevSlide();
        }
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (counter < carouselImages.length - 1) {
                nextSlide();
            }
        }, 5000);
    }
    
    // Start auto slide on load
    startAutoSlide();
    
    // Pause auto slide on hover
    carouselSlide.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // Resume auto slide when mouse leaves
    carouselSlide.addEventListener('mouseleave', startAutoSlide);
    
    // Navigation functions
    function nextSlide() {
        if (counter >= carouselImages.length - 1) return;
        counter++;
        updateCarousel();
        updateButtons();
    }
    
    function prevSlide() {
        if (counter <= 0) return;
        counter--;
        updateCarousel();
        updateButtons();
    }
    
    function goToSlide(index) {
        counter = index;
        updateCarousel();
        updateButtons();
    }
    
    function updateCarousel() {
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === counter);
        });
    }
    
    function updateButtons() {
        // Update previous button
        if (counter === 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        // Update next button
        if (counter === carouselImages.length - 1) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newSize = carouselImages[0].clientWidth;
        carouselSlide.style.transition = 'none';
        carouselSlide.style.transform = `translateX(${-newSize * counter}px)`;
    });
});
