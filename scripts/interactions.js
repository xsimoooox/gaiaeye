/**
 * GaiaEye Interactions
 * Handling carousel logic and general UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initPlatformCarousel();
    initTeamCarousel();
    initCounterAnimation();
    initTimelineAnimation();
});

/**
 * Platforms Carousel Logic
 */
function initPlatformCarousel() {
    const carousel = document.querySelector('.platforms-carousel');
    const cards = document.querySelectorAll('.platform-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!carousel || cards.length === 0) return;

    let currentIndex = 0;

    function updateCarousel(index) {
        // Ensure index is within bounds
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        
        currentIndex = index;

        // Update cards
        cards.forEach((card, i) => {
            card.classList.remove('active', 'side');
            
            if (i === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.add('side');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // If you want to reorder DOM for the 3-card effect (left, center, right)
        // This is a simple implementation where active is always in middle visually if only 3 cards
        // For a more robust circular carousel, you'd move elements or use translateX
    }

    // Event listeners for cards
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            updateCarousel(i);
        });
    });

    // Event listeners for dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            updateCarousel(i);
        });
    });

    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateCarousel(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateCarousel(currentIndex + 1);
        });
    }
}

/**
 * Team Carousel Logic
 */
function initTeamCarousel() {
    const carousel = document.querySelector('.team-carousel');
    const cards = document.querySelectorAll('.team-card');
    const prevBtn = document.querySelector('.team-nav-prev');
    const nextBtn = document.querySelector('.team-nav-next');
    
    if (!carousel || cards.length === 0) return;

    let currentIndex = 1; // Start with the middle card (index 1) as active

    function updateTeamCarousel(index) {
        // Ensure index is within bounds
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        
        currentIndex = index;

        // Update cards
        cards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === currentIndex) {
                card.classList.add('active');
            }
        });

        // Scroll to active card
        const activeCard = cards[currentIndex];
        if (activeCard) {
            activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateTeamCarousel(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateTeamCarousel(currentIndex + 1);
        });
    }

    // Auto-scroll on card click
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            updateTeamCarousel(i);
        });
    });
}

/**
 * Counter Animation
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

/**
 * Timeline Animation
 */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}
