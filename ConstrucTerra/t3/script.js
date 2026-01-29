// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Cinematic Hero Sequence ---
// --- Hero 2025 Sequence ---
const hero25Tl = gsap.timeline();

// 1. Earth & Atmosphere Reveal
hero25Tl.from(".earth-visual", {
    scale: 1.2,
    opacity: 0,
    duration: 3,
    ease: "power2.out"
}, "start")
    .from(".veins-overlay", {
        opacity: 0,
        duration: 2,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })"
    }, "start+=1")

    // 2. Title Sculpting (Upward Float + Dust Disperse)
    .to(".sculpted-title", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
    }, "-=1.5")

    // 3. Subtitle Typewriter-ish Reveal
    .to(".poetic-subtitle", {
        opacity: 1,
        duration: 1.5,
        clipPath: "inset(0 0 0 0)", // Assuming we might add clip-path via CSS or similar, otherwise opacity works
        ease: "power2.out"
    }, "-=0.5")

    // 4. CTA Orb Reveal
    .to(".cta-wrapper", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=0.5");

// --- Interactive Cosmic Particles (Canvas-free lightweight approach) ---
const particlesContainer = document.getElementById('particles-cosmos');
if (particlesContainer) {
    // Generate particles
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'cosmos-particle';

        // Random properties
        const size = Math.random() * 3 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.background = Math.random() > 0.5 ? '#00d4ff' : (Math.random() > 0.5 ? '#00ff9f' : '#e8c547');
        p.style.position = 'absolute';
        p.style.borderRadius = '50%';
        p.style.opacity = Math.random() * 0.5 + 0.1;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.filter = `blur(${Math.random()}px)`;

        particlesContainer.appendChild(p);

        // Ambient Float Animation
        gsap.to(p, {
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Mouse Attraction
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        gsap.to('.cosmos-particle', {
            x: (i, target) => {
                const rect = target.getBoundingClientRect();
                const dx = mouseX - (rect.left + rect.width / 2);
                return dx * 0.05; // Gentle pull
            },
            y: (i, target) => {
                const rect = target.getBoundingClientRect();
                const dy = mouseY - (rect.top + rect.height / 2);
                return dy * 0.05;
            },
            duration: 1,
            ease: "power2.out",
            overwrite: "auto"
        });

        // Parallax for Background Layers
        const xPct = (window.innerWidth - mouseX) / 100;
        const yPct = (window.innerHeight - mouseY) / 100;

        gsap.to('.earth-visual', { x: xPct, y: yPct, duration: 1 });
        gsap.to('.veins-overlay', { x: xPct * 1.5, y: yPct * 1.5, duration: 1 });
    });
}

// --- Constants & Global Section Animations ---
// Animating Headlines & Intros for every section
document.querySelectorAll('section').forEach(section => {
    const title = section.querySelector('h2');
    const intro = section.querySelector('.intro-text');

    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%", // Trigger early
                once: true // Animate only once ("first apparition")
            },
            y: -50,
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)"
        });
    }

    if (intro) {
        gsap.from(intro, {
            scrollTrigger: {
                trigger: intro,
                start: "top 90%",
                once: true
            },
            y: 30,
            opacity: 0,
            filter: "blur(10px)", // Creative blur reveal
            duration: 1,
            delay: 0.3,
            ease: "power2.out"
        });
    }
});

// --- Problems Cards Reveal ---
// --- Problems Cards Reveal (Immersive V2) ---
const problemCards = document.querySelectorAll('.problem-card');
problemCards.forEach((card, index) => {
    // 1. Reveal Animation (Fade In + Slide Up)
    gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1 // Stagger effect
        }
    );

    // 2. Parallax Background Image (Zoom/Move)
    const bgImg = card.querySelector('.card-bg-img');
    if (bgImg) {
        // Subtle Parallax during scroll
        gsap.fromTo(bgImg,
            { scale: 1.1, y: "-5%" },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: "5%",
                ease: "none"
            }
        );
    }
});

// --- Timeline (How it Works) ---
// --- Interactive Timeline (Scroll Based) ---
// 1. Progress Line Animation
gsap.to("#timeline-progress-bar", {
    scrollTrigger: {
        trigger: ".timeline-wrapper",
        start: "top 60%",
        end: "bottom 60%",
        scrub: 0.5, // Sync line height with scroll position
    },
    height: "100%",
    ease: "none"
});

// 2. Steps Activation
const timelineSteps = document.querySelectorAll('.timeline-step');
timelineSteps.forEach((step, index) => {
    const content = step.querySelector('.step-content');
    const marker = step.querySelector('.step-marker');
    const visual = step.querySelector('.step-visual');
    const imgWrapper = step.querySelector('.img-wrapper');
    const entrySide = imgWrapper.classList.contains('left-entry') ? -100 : 100;

    // Timeline logic for each step
    ScrollTrigger.create({
        trigger: step,
        start: "top 60%", // Activate when step is somewhat in view
        end: "bottom 60%",
        onEnter: () => activateStep(step, entrySide),
        onLeave: () => passStep(step), // Mark as passed when scrolling down past it
        onEnterBack: () => activateStep(step, entrySide), // Re-activate when scrolling up back into it
        onLeaveBack: () => resetStep(step) // Reset when scrolling up past it
    });
});

function activateStep(step, xVal) {
    const content = step.querySelector('.step-content');
    const marker = step.querySelector('.step-marker');
    const visual = step.querySelector('.step-visual');
    const imgWrapper = step.querySelector('.img-wrapper');

    // Marker active state
    marker.classList.add('active');
    marker.classList.remove('passed');

    // Text Animation
    gsap.to(content, { opacity: 1, scale: 1, duration: 0.5, delay: 0.1 });

    // Image Entrance
    gsap.to(visual, { opacity: 1, duration: 0.5 });
    gsap.fromTo(imgWrapper,
        { xPercent: xVal, filter: "blur(5px)", opacity: 0 },
        { xPercent: 0, filter: "blur(0px)", opacity: 1, duration: 0.8, ease: "power2.out" }
    );
}

function passStep(step) {
    const marker = step.querySelector('.step-marker');
    const content = step.querySelector('.step-content');

    // Dim the step slightly as we pass it
    marker.classList.remove('active');
    marker.classList.add('passed');
    gsap.to(content, { opacity: 0.5, scale: 0.98, duration: 0.5 });
}

function resetStep(step) {
    const marker = step.querySelector('.step-marker');
    const content = step.querySelector('.step-content');
    const visual = step.querySelector('.step-visual');

    // Reset to invisible state
    marker.classList.remove('active', 'passed');
    gsap.to(content, { opacity: 0, scale: 0.95, duration: 0.3 });
    gsap.to(visual, { opacity: 0, duration: 0.3 });
}

// --- Why Us Reveal (Redesigned) ---
const whySection = document.querySelector('.why-us-section');
const whyCards = document.querySelectorAll('.why-card');

ScrollTrigger.create({
    trigger: whySection,
    start: "top 70%",
    onEnter: () => {
        // 1. Line expansion
        gsap.to(".title-underline", { width: "100%", duration: 1, ease: "power2.out" });

        // 2. Cards Cascade
        gsap.to(whyCards, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });
    }
});

// --- Stats Counters ---
const counters = document.querySelectorAll('.counter');
const runCounters = () => {
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const update = () => {
            current += increment;
            if (current < target) {
                counter.innerText = current.toFixed(target % 1 === 0 ? 0 : 1);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
                counter.parentElement.classList.add('active');
            }
        };
        update();
    });
};

ScrollTrigger.create({
    trigger: "#stats",
    start: "top 80%",
    onEnter: runCounters
});

// --- Dashboard Packs Slider Logic ---
const packsCards = document.querySelectorAll('.dashboard-card');
const nextArrow = document.querySelector('.next-arrow');
const prevArrow = document.querySelector('.prev-arrow');
let currentActiveIndex = 1; // Default to Module Horizon (Middle)

const updatePacksSlider = () => {
    packsCards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');

        if (index === currentActiveIndex) {
            card.classList.add('active');
        } else if (index === (currentActiveIndex - 1 + packsCards.length) % packsCards.length) {
            card.classList.add('prev');
        } else {
            card.classList.add('next');
        }
    });
};

if (nextArrow && prevArrow) {
    nextArrow.addEventListener('click', () => {
        currentActiveIndex = (currentActiveIndex + 1) % packsCards.length;
        updatePacksSlider();
    });

    prevArrow.addEventListener('click', () => {
        currentActiveIndex = (currentActiveIndex - 1 + packsCards.length) % packsCards.length;
        updatePacksSlider();
    });

    // Initial state
    updatePacksSlider();
}

// --- Advanced ROI Calculator (Live & Lifecycle) ---
let myChart = null;
const ctx = document.getElementById('savingsChart')?.getContext('2d');

if (ctx) {
    // Initial Chart
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Construction', 'Soil Risks', 'Maintenance'],
            datasets: [{
                data: [30, 30, 40],
                backgroundColor: ['#FF6384', '#FFCD56', '#4BC0C0'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.formattedValue + ' €';
                        }
                    }
                }
            },
            cutout: '70%',
            responsive: true,
            layout: { padding: 10 }
        }
    });
}

// Elements
const elBudget = document.getElementById('roi-budget');
const elDuration = document.getElementById('roi-duration'); // Years
const displayBudget = document.getElementById('budget-display-val');
const displayDuration = document.getElementById('duration-display-val');

// Helper: Update Slider Visuals (CSS Variable)
const updateSliderFill = (input) => {
    const val = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const percent = ((val - min) / (max - min)) * 100;
    input.style.setProperty('--progress', percent + "%");
};

// Main Update Logic
const updateAdvancedROI = () => {
    if (!elBudget) return;

    const budget = parseInt(elBudget.value);
    const years = parseInt(elDuration.value);

    // Update Displays
    updateSliderFill(elBudget);
    updateSliderFill(elDuration);

    displayBudget.innerText = (budget / 1000000).toFixed(0) + " M€";
    displayDuration.innerText = years + " Years";

    // --- LOGIC FORMULA (Lifecycle) ---
    // 1. Initial Construction Savings (Delays/Materials): ~5% of budget
    const savingsConstruction = Math.round(budget * 0.05);

    // 2. Soil Risks (Unforeseen): ~3% avoided
    const savingsRisk = Math.round(budget * 0.03);

    // 3. Maintenance/Lifecycle Savings: ~0.2% of budget saved per year of optimized life
    // The longer the building lives in harmony with soil, the less cracks/repairs.
    const savingsMaintenance = Math.round(budget * (0.002 * years));

    const totalSavings = savingsConstruction + savingsRisk + savingsMaintenance;

    // Cost of analysis (Hypothetical): 0.5% capped
    const costAnalysis = Math.min(150000, Math.max(15000, budget * 0.005));
    const roi = ((totalSavings - costAnalysis) / costAnalysis) * 100;

    // CO2 Facteur: (Budget M€) * (Years / 10) * 400t
    // Example: 10M * 2.5 * 40 = 1000t
    // Let's tune: 40 tonnes base per M€ budget + bonus for longevity
    const budgetMillions = budget / 1000000;
    const co2Saved = Math.round((budgetMillions * 40) + (years * 10 * budgetMillions * 0.1));

    // Update DOM with Animation
    const animatedUpdate = (id, val) => {
        const el = document.getElementById(id);
        const current = parseInt(el.innerText.replace(/[^0-9]/g, '')) || 0;
        if (current !== val) {
            // Simple GSAP counter could go here, but text swap is fast for sliders
            el.innerText = val.toLocaleString() + (id.includes('percent') ? '%' : (id.includes('co2') ? '' : ' €'));
        }
    };

    animatedUpdate('total-savings', totalSavings);
    animatedUpdate('roi-percent', Math.round(roi));
    animatedUpdate('savings-delay', savingsConstruction);
    animatedUpdate('savings-risk', savingsRisk);
    animatedUpdate('savings-maintenance', savingsMaintenance);

    // CO2 Animation
    const co2El = document.getElementById('co2-saved');
    if (co2El.innerText != co2Saved) {
        co2El.innerText = co2Saved;
        gsap.fromTo("#co2-container", { scale: 1.05 }, { scale: 1, duration: 0.2 });
    }

    // Update Chart
    if (myChart) {
        myChart.data.datasets[0].data = [savingsConstruction, savingsRisk, savingsMaintenance];
        myChart.update('none'); // pure update for speed
    }
};

// Event Listeners
if (elBudget) {
    [elBudget, elDuration].forEach(input => {
        input.addEventListener('input', updateAdvancedROI);
    });

    // Valid Initial Call
    setTimeout(updateAdvancedROI, 500);
}

// --- Smooth Scroll Nav ---
document.querySelectorAll('nav a, .cta-button').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// --- Futuristic Contact Section Logic ---
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

// FAQ Toggle Function
window.toggleFaq = (header) => {
    const item = header.parentElement;
    item.classList.toggle('active');

    // Close other items
    document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
    });
};

// Scroll Reveal for Contact Dashboard
// Scroll Reveal for Contact Dashboard - Strictly Synchronized
gsap.from(".contact-dashboard-layout > div", {
    scrollTrigger: {
        trigger: ".contact-dashboard-layout",
        start: "top 85%" // Trigger slightly earlier
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0 // Force all elements to animate at the exact same time
});

// Typing Effect for Contact Title
const typingTitle = document.querySelector('.typing-title');
if (typingTitle) {
    const text = "Initialize Communication"; // Hardcoded to ensure clean source or use typingTitle.textContent.trim();
    typingTitle.textContent = ''; // Clear initially

    // Create a cursor element if needed, or just append text
    // To preserve spaces in typing effect, usually adding a non-breaking space or just relying on normal behavior.

    ScrollTrigger.create({
        trigger: typingTitle,
        start: "top 80%",
        once: true, // IMPORTANT: Ensure it only triggers once
        onEnter: () => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    typingTitle.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
        }
    });
}

// Form Submission Futuristic Animation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show satellite loader
        formFeedback.style.display = 'flex';
        gsap.from(formFeedback, { opacity: 0, scale: 0.9, duration: 0.5 });

        // Simulate signal transmission
        setTimeout(() => {
            const feedbackText = formFeedback.querySelector('.feedback-text');
            const satellite = formFeedback.querySelector('.satellite-loader');

            satellite.innerHTML = '<i class="fas fa-check-circle"></i>';
            satellite.style.animation = 'none';
            gsap.to(satellite, { scale: 1.5, color: '#2ecc71', duration: 0.5, ease: "back.out(2)" });

            feedbackText.innerText = "SIGNAL RECEIVED - TRANSMISSION SUCCESSFUL";
            feedbackText.style.color = '#2ecc71';

            // Optional: Reset form after delay
            setTimeout(() => {
                gsap.to(formFeedback, {
                    opacity: 0, duration: 0.5, onComplete: () => {
                        formFeedback.style.display = 'none';
                        contactForm.reset();
                        // Restore original feedback text for next use
                        feedbackText.innerText = "Signal transmitting...";
                        feedbackText.style.color = '';
                        satellite.innerHTML = '<i class="fas fa-satellite"></i>';
                        satellite.style.animation = 'satelliteOrbit 2s linear infinite';
                    }
                });
            }, 3000);

        }, 2500);
    });
}

// Scroll-based Navigation Visibility
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('visible-nav');
    } else {
        nav.classList.remove('visible-nav');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}
