import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import terroirHandBg from '../assets/terroir-hand.jpg';
import climateChangeBg from '../assets/climate-change.jpg';
import desertificationBg from '../assets/desertification.jpg';
import foodDependencyBg from '../assets/food-dependency.jpg';
import contaminatedSoilBg from '../assets/contaminated-soil.jpg';
import './ProblemSection.css';

gsap.registerPlugin(ScrollTrigger);

interface ProblemCardProps {
    image: string;
    title: string;
    problemImpactText: string;
    exampleSolutionText: string;
    imageScale?: number;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
    image,
    title,
    problemImpactText,
    exampleSolutionText,
    imageScale = 1
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = cardRef.current;
        const parallaxEl = parallaxRef.current;

        if (el && parallaxEl) {
            // Parallax Effect: Move the wrapper slightly on Y axis during scroll
            // Using yPercent for better responsiveness
            gsap.fromTo(parallaxEl,
                { yPercent: -5 }, // Start slightly up
                {
                    yPercent: 5,   // End slightly down
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );
        }
    }, []);

    return (
        <div className="problem-card" ref={cardRef}>
            <div className="card-bg-container">
                <div className="parallax-wrapper" ref={parallaxRef}>
                    <img
                        src={image}
                        alt={title}
                        className="card-bg-image"
                        style={{ transform: `scale(${imageScale})` }}
                    />
                </div>
                <div className="card-gradient-overlay"></div>
            </div>

            <div className="card-content">
                <h3 className="card-title">{title}</h3>

                <div className="card-section card-backdrop">
                    <p className="section-text">{problemImpactText}</p>
                </div>
            </div>

            {/* Example Reveal Block */}
            <div className="card-highlight-panel">
                <div className="tech-box">
                    <span className="section-label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        REAL EXAMPLE
                    </span>
                    <p className="section-text">{exampleSolutionText}</p>
                </div>
            </div>

            {/* Indicator shown when not hovered to suggest more content */}
            <div className="hover-indicator">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>
        </div>

    );
};

const ProblemSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const header = headerRef.current;
        const title = titleRef.current;
        const text = textRef.current;
        const grid = gridRef.current;

        // Header Animation
        if (header && title && text) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: header,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });

            // Title Elastic Drop
            tl.fromTo(title,
                { y: -50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
            );

            // Text Blur Reveal
            tl.fromTo(text,
                { y: 30, opacity: 0, filter: "blur(10px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
                "-=0.8" // Overlap slightly
            );
        }

        // Grid Animation
        if (grid) {
            const cards = grid.querySelectorAll('.problem-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 100 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);


    const content = [
        {
            image: terroirHandBg,
            title: "Rare and Localized Terroirs",
            problemImpactText: "Terroirs of excellence exist only in very specific geographical zones, where soil, climate, and biology are perfectly balanced. This rarity limits premium agricultural production to a few historical regions, excluding vast territories that are otherwise agricultural.",
            exampleSolutionText: "Champagne can only be produced from specific chalky soils in northern France. The same grape variety grown elsewhere loses its identity. Terra-Nova analyzes these unique conditions and allows them to be scientifically recreated in new adapted regions."
        },
        {
            image: climateChangeBg,
            title: "Climate Change",
            problemImpactText: "Global warming alters temperatures, rainfall, and seasons, disrupting the fragile balances of terroirs. Historical agricultural regions are gradually losing their characteristics and quality.",
            exampleSolutionText: "In Burgundy, grapes now ripen too quickly due to rising temperatures, altering the taste of wines. Terra-Nova anticipates these changes and designs terroirs capable of remaining stable in tomorrow's climate.",
            imageScale: 1.1
        },
        {
            image: desertificationBg,
            title: "Desertification",
            problemImpactText: "Desertification transforms once fertile lands into dry and poor soils, severely reducing agricultural yields and threatening food security.",
            exampleSolutionText: "In southern Morocco, cultivated areas have become arid due to prolonged drought. Terra-Nova restores these soils by recreating the conditions necessary for sustainable and productive agriculture."
        },
        {
            image: foodDependencyBg,
            title: "Food Dependency",
            problemImpactText: "Lacking adapted terroirs, many countries depend on imports to access quality agricultural products, increasing costs and weakening their food sovereignty.",
            exampleSolutionText: "Morocco imports the majority of its premium wines and coffees, despite strong local potential. Terra-Nova enables producing these crops locally by recreating terroirs adapted to local conditions."
        },
        {
            image: contaminatedSoilBg,
            title: "Contaminated Soils",
            problemImpactText: "Industrial and agricultural pollution renders certain soils toxic, making them unusable for agriculture and dangerous for human health.",
            exampleSolutionText: "Near old mining sites, lands remain unfit for cultivation for decades. Terra-Nova decontaminates these soils and transforms them back into healthy agricultural terroirs."
        }
    ];

    return (
        <section className="problem-section" id="the-problem" ref={sectionRef}>
            <div className="section-header" ref={headerRef}>
                <h2 className="section-title" ref={titleRef}>
                    THE PROBLEM
                    <div className="title-underline"></div>
                </h2>

                <p className="intro-text" ref={textRef}>
                    Today, agricultural challenges do not come from a lack of land, but from a profound imbalance between soil, climate, and human usage.
                    <br /><br />
                    Structural phenomena silently weaken territories, limit quality production, and accentuate agricultural inequalities on a global scale.
                    Here are the main problems shaping these imbalances and threatening the future of soils.
                </p>
            </div>

            <div className="cards-grid" ref={gridRef}>
                {content.map((item, index) => (
                    <ProblemCard key={index} {...item} />
                ))}
            </div>
        </section>
    );
};
export default ProblemSection;
