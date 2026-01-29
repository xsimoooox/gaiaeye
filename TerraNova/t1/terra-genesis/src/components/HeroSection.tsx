import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './HeroSection.css';

import heroBg from '../assets/hero-bg-full.jpg';

const HeroSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const earthRef = useRef<HTMLImageElement>(null);
    const veinsRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    // Mouse Parallax Logic
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate percentages -0.5 to 0.5
        const xPos = (clientX / innerWidth) - 0.5;
        const yPos = (clientY / innerHeight) - 0.5;

        // Apply Parallax (Earth moves opposite, Veins move faster)
        if (earthRef.current) {
            gsap.to(earthRef.current, {
                duration: 1,
                x: -xPos * 30,
                y: -yPos * 30,
                ease: "power2.out"
            });
        }
        if (veinsRef.current) {
            gsap.to(veinsRef.current, {
                duration: 1,
                x: -xPos * 50,
                y: -yPos * 50,
                ease: "power2.out"
            });
        }
    };

    // Particles Generation
    const [particles, setParticles] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const generatedParticles = [];
        const colors = ['#00d4ff', '#00ff9f', '#e8c547']; // Cyan Electric, Green Neon, Gold Earth

        for (let i = 0; i < 30; i++) {
            const size = Math.random() * 4 + 2; // 2px to 6px
            const style: React.CSSProperties = {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                filter: `blur(${Math.random() * 2}px)`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
            };
            generatedParticles.push(<div key={i} className="particle" style={style} />);
        }
        setParticles(generatedParticles);
    }, []);

    // Entrance Animations
    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Earth Entry
        if (earthRef.current) {
            tl.fromTo(earthRef.current,
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2.5, ease: "power3.out" } // Changed opacity to 1 as requested for full visibility
            );
        }

        // 2. Title & Content Entry
        if (titleRef.current) {
            tl.fromTo(titleRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
                "-=1.5"
            );
        }

        if (subtitleRef.current) {
            tl.fromTo(subtitleRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power2.out" },
                "-=0.5"
            );
        }

    }, []);

    return (
        <section
            id="hero"
            className="hero-section"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
        >
            {/* Layer 1: Earth */}
            <div className="hero-layer layer-earth">
                <img
                    ref={earthRef}
                    src={heroBg}
                    alt="Terra-Nova Technology"
                    className="earth-image"
                />
            </div>

            {/* Layer 2: Veins */}
            <div className="hero-layer layer-veins" ref={veinsRef}></div>

            {/* Layer 3: Atmosphere */}
            <div className="hero-layer layer-atmosphere"></div>

            {/* Layer 4: Particles */}
            <div className="hero-layer layer-particles" ref={particlesRef}>
                {particles}
            </div>

            {/* Content */}
            <div className="hero-content">
                <h1 className="hero-title" ref={titleRef}>
                    TERRA-NOVA
                </h1>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <span className="scroll-text">Explore</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
};

export default HeroSection;
