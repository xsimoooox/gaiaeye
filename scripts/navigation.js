/**
 * Navigation Script - Common for all pages
 * Handles navigation bar visibility and title animation
 * For pages with fixed headers (about, platform, blog, contact), shows nav immediately
 * For home page, the existing scroll script handles navigation
 */
document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('gaia-title');
    const nav = document.getElementById('main-nav');
    const hamburger = document.getElementById('hamburger');
    
    if (!title || !nav) return;

    // Check if page has a fixed header (like about, platform, blog, contact)
    const hasFixedHeader = document.querySelector('.page-header') !== null;
    
    // Check if we're on mobile/tablet
    const isMobile = window.innerWidth <= 968;
    
    // Function to update hamburger visibility based on nav visibility (desktop only)
    function updateHamburgerVisibility() {
        if (!hamburger) return;
        
        // On mobile, hamburger is always visible (handled by CSS)
        if (isMobile) {
            hamburger.classList.add('show');
            return;
        }
        
        // On desktop, show hamburger only when nav is visible
        if (nav.classList.contains('visible')) {
            hamburger.classList.add('show');
        } else {
            hamburger.classList.remove('show');
        }
    }
    
    // If page has fixed header, show nav immediately
    if (hasFixedHeader) {
        title.classList.add('nav-state');
        nav.classList.add('visible');
        updateHamburgerVisibility();
    } else {
        // For home page, observe nav visibility changes
        const observer = new MutationObserver(() => {
            updateHamburgerVisibility();
        });
        
        observer.observe(nav, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Initial check
        updateHamburgerVisibility();
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateHamburgerVisibility();
        }, 100);
    });

    // Hamburger menu functionality
    if (hamburger) {
        // Ensure menu is closed by default
        hamburger.classList.remove('active');
        nav.classList.remove('mobile-open');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('mobile-open');
            
            // Make nav visible when opening on mobile
            if (nav.classList.contains('mobile-open')) {
                nav.classList.add('visible');
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                // Only remove visible if not on a fixed header page
                if (!hasFixedHeader) {
                    // Check if we should keep visible based on scroll
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
                    const threshold = windowHeight * 0.8;
                    if (scrollY <= threshold) {
                        nav.classList.remove('visible');
                    }
                }
            }
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('mobile-open') && 
                !nav.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
                hamburger.classList.remove('active');
                nav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }
        });
    }
});
