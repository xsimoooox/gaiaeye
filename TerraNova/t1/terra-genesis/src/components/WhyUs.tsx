import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Sprout, TrendingUp } from 'lucide-react';
import './WhyUs.css';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
    {
        title: "Food Security",
        desc: "Feeding 500 million people by transforming 1% of deserts.",
        icon: ShieldCheck,
        type: 'standard'
    },
    {
        title: "Revitalized Biodiversity",
        desc: "Reintroduction of 50+ species of microorganisms and pollinators.",
        icon: Sprout,
        type: 'growth' // For specific animation
    },
    {
        title: "Asset Optimization",
        desc: "Transforming valueless land into premium assets (x400% value).",
        icon: TrendingUp,
        type: 'standard'
    }
];

export default function WhyUs() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const cardElements = cardsRef.current?.querySelectorAll('.why-card');

        if (!section || !title || !cardElements) return;

        // 1. Title Elastic Drop Animation
        gsap.fromTo(title,
            {
                y: -50,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%'
                }
            }
        );

        // 2. Cards Cascade Animation
        gsap.fromTo(cardElements,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: 'top 75%'
                }
            }
        );

    }, []);

    return (
        <section id="why-us" className="why-us-section" ref={sectionRef}>
            <div className="why-us-container">
                <div className="why-header">
                    <h2 className="why-title" ref={titleRef}>
                        Why TERRA-NOVA
                    </h2>
                </div>

                <div className="why-grid-v2" ref={cardsRef}>
                    {reasons.map((reason, idx) => (
                        <React.Fragment key={idx}>
                            <div className="why-card">
                                <div className="icon-wrapper">
                                    <reason.icon
                                        className={`why-icon-svg ${reason.type === 'growth' ? 'icon-growth' : ''}`}
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <h3>{reason.title}</h3>
                                <p>{reason.desc}</p>
                                <a href="#contact" className="learn-more-btn">Learn more</a>
                            </div>

                            {/* Separator - Only between items */}
                            {idx < reasons.length - 1 && <div className="vertical-separator" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
