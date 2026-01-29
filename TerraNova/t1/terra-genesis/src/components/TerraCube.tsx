import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TerraCube.css';

// Import the new full-screen image
import terraCubeFullImg from '../assets/terra-cube-full.png';

gsap.registerPlugin(ScrollTrigger);

export default function TerraCube() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const image = imageRef.current;
        const overlay = overlayRef.current;

        if (!section || !image || !overlay) return;

        // 1. Image Fade-In Entrance Animation (no scale to avoid gaps)
        gsap.fromTo(image,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                }
            }
        );

        // 3. Overlay Fade Animation
        gsap.fromTo(overlay,
            { opacity: 0.6 },
            {
                opacity: 0.2,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                }
            }
        );

        // 4. Floating Particles Animation (if we add them)
        const particles = section.querySelectorAll('.terra-particle');
        if (particles.length > 0) {
            gsap.to(particles, {
                y: -30,
                opacity: 0.8,
                duration: 3,
                stagger: 0.1,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }

    }, []);

    return (
        <section id="terracube" className="terracube-fullscreen-section" ref={sectionRef}>
            {/* Full-Screen Background Image */}
            <img
                ref={imageRef}
                src={terraCubeFullImg}
                alt="TERRA-CUBE - Autonomous Terroir Transformation Kit"
                className="terracube-fullscreen-image"
            />

            {/* Subtle Overlay for Depth */}
            <div ref={overlayRef} className="terracube-fullscreen-overlay"></div>

            {/* Floating Particles for Extra Animation */}
            <div className="terracube-particles-container">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="terra-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 6 + 3}px`,
                            height: `${Math.random() * 6 + 3}px`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 8 + 6}s`
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
