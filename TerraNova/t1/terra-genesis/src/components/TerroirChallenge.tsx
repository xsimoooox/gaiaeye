import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Cloud, Droplets, Mountain, Microscope } from 'lucide-react';
import './TerroirChallenge.css';

gsap.registerPlugin(ScrollTrigger);

const TerroirChallenge: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const introListRef = useRef<HTMLUListElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<HTMLDivElement>(null);
    const threatsRef = useRef<HTMLDivElement>(null);
    const particleContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Introduction Animations
            gsap.to(titleRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                }
            });

            if (introListRef.current) {
                gsap.to(introListRef.current.children, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.3,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: introListRef.current,
                        start: 'top 80%',
                    }
                });
            }

            // 2. Orbit Animations
            const cards = gsap.utils.toArray('.orbit-card');
            const angleStep = (Math.PI * 2) / cards.length;
            const radius = window.innerWidth > 768 ? 250 : 150;

            cards.forEach((card: any, idx: number) => {
                const angle = idx * angleStep;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                gsap.set(card, { x, y });

                // Animate lines
                const line = card.querySelector('.orbit-line-element');
                if (line) {
                    gsap.set(line, {
                        width: radius,
                        rotation: (angle * 180) / Math.PI + 180,
                        x: -x / 2,
                        y: -y / 2,
                        left: '50%',
                        top: '50%',
                        position: 'absolute',
                        zIndex: -1,
                        background: 'linear-gradient(90deg, #00E5FF, transparent)',
                        height: '1px',
                        transformOrigin: 'left center',
                        opacity: 0.3
                    });
                }

                // Continuous floating/orbit rotation
                gsap.to(card, {
                    rotation: 360,
                    duration: 30 + idx * 5,
                    repeat: -1,
                    ease: 'none',
                    transformOrigin: `${-x}px ${-y}px`
                });
            });

            // Globe continuous pulse
            gsap.to(globeRef.current, {
                scale: 1.1,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // 3. Transition Horizontal Wave
            gsap.from('.transition-text', {
                scale: 0.5,
                opacity: 0,
                y: 50,
                scrollTrigger: {
                    trigger: '.terroir-transition',
                    start: 'top 70%',
                    end: 'bottom 20%',
                    scrub: 1
                }
            });

            // 4. Threats Stacking Animations
            const threatCards = gsap.utils.toArray('.threat-card');
            threatCards.forEach((card: any) => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Particles effect
            if (particleContainerRef.current) {
                for (let i = 0; i < 30; i++) {
                    const p = document.createElement('div');
                    p.className = 'particle';
                    const size = Math.random() * 5 + 2;
                    const color = Math.random() > 0.5 ? '#00E5FF' : '#FFE082';
                    Object.assign(p.style, {
                        position: 'absolute',
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color,
                        borderRadius: '50%',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.2,
                        filter: 'blur(2px)'
                    });
                    particleContainerRef.current.appendChild(p);

                    gsap.to(p, {
                        y: `+=${Math.random() * 200 - 100}`,
                        x: `+=${Math.random() * 200 - 100}`,
                        opacity: 0,
                        duration: Math.random() * 3 + 2,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    });
                }
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const elements = [
        {
            id: 'soil',
            title: 'Soil',
            icon: <Mountain className="card-icon" />,
            text: "Soil is the living foundation of the terroir. Its unique mineral composition directly determines the flavor and complexity of crops. Example: Champagne chalk.",
            fullText: "Soil is the living foundation of the terroir. Its unique mineral composition (clay, limestone, silica…), its pH, its structure and its richness in organic matter directly determine the flavor, complexity and natural resistance of crops. Iconic example: the porous limestone chalk of Champagne brings a characteristic minerality and vivid acidity to sparkling wines."
        },
        {
            id: 'climate',
            title: 'Climate',
            icon: <Cloud className="card-icon" />,
            text: "The climate orchestrates the plant's life cycle: temperature, sunshine and precipitation. These parameters create stable microclimats.",
            fullText: "The climate orchestrates the plant's life cycle thanks to the average temperature, daily and seasonal thermal amplitudes, well-distributed precipitation and sunshine. These parameters create stable microclimats essential for slow and balanced ripening. Example: in the Napa Valley, differences of 12–15°C between day and night preserve the acidity of the grapes while allowing optimal sugar."
        },
        {
            id: 'hydrology',
            title: 'Hydrology',
            icon: <Droplets className="card-icon" />,
            text: "Hydrology governs water movement: drainage, infiltration and groundwater. Perfect balance avoids water stress.",
            fullText: "Hydrology governs the availability, movement and quality of water in the soil: efficient drainage, infiltration, groundwater and retention. A perfect balance avoids both water stress and excess humidity which promotes disease. Example: the well-drained soils of Burgundy limit root rot and concentrate aromas in the berries."
        },
        {
            id: 'topography',
            title: 'Topography',
            icon: <Mountain className="card-icon" transform="rotate(45)" />,
            text: "Relief influences solar exposure and runoff. Slopes and altitude create subtle variations.",
            fullText: "Relief influences sun exposure, wind circulation, runoff and local microclimate. Slopes, altitude and orientation create subtle variations that enrich the aromatic diversity of the same plot. Example: the 10–20% sloping hillsides of the Australian Barossa offer excellent natural drainage and differentiated ripening according to orientation."
        },
        {
            id: 'biodiversity',
            title: 'Biodiversity',
            icon: <Microscope className="card-icon" />,
            text: "The microbial ecosystem ensures nutrition and protection. It's the 'hidden brain' of the soil.",
            fullText: "Under our feet lives an extremely rich microbial ecosystem (bacteria, fungi, actinomycetes, mycorrhizae…) which fixes nitrogen, solubilizes minerals, protects against pathogens and improves root absorption. It is the “hidden brain” of the terroir. Example: mycorrhizae in Tuscany increase water and nutrient absorption by up to 30%, strengthening the vine against stress."
        }
    ];

    const threats = [
        {
            title: "Rare and Localized Terroirs",
            problem: "Extremely rare combination of factors impossible to reproduce naturally.",
            impact: "Premium production captive to restricted areas, global inequalities.",
            desc: "A great terroir requires specific geology and a stable microclimate. Only 1 to 2% of the world's agricultural land is premium.",
            solution: "Terra-Nova: Spectral analysis and signature recreation via AI to open unexplored zones.",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Climate Change",
            problem: "Global warming disrupting thermal and water balances.",
            impact: "Degradation of historical sites, loss of signature wines.",
            desc: "Since 1900, +1.1°C global → increased evaporation, irregular precipitation. In Burgundy, grapes lose 15-25% acidity.",
            solution: "Terra-Nova: 50-year climate modeling + adaptation strategies to restore resilience.",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Desertification",
            problem: "Advancement of arid zones eroding fertile soils.",
            impact: "Massive loss of cultivable land, collapse of yields.",
            desc: "24 billion tons of fertile soil lost annually. The Sahel loses 12 million hectares per year.",
            solution: "Terra-Nova: Active regeneration by bio-engineering to transform arid into productive terroir.",
            image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Food Dependency",
            problem: "Massive import of quality products due to lack of local terroirs.",
            impact: "High costs, economic vulnerability, high carbon footprint.",
            desc: "Morocco imports 90% of its premium wines. Transport generates 2–5 kg of CO2 per kg of imported wine.",
            solution: "Terra-Nova: Creation of cloned local terroirs to reduce imports by 50%.",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Contaminated Soils",
            problem: "Industrial and agricultural pollution making land toxic.",
            impact: "Loss of agricultural potential, serious health risks.",
            desc: "33% of global soils are degraded. Heavy metals and pesticides block any quality cultivation.",
            solution: "Terra-Nova: Decontamination by phytoremediation and full circular economy restoration.",
            image: "https://images.unsplash.com/photo-1533240332313-0db49b459421?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <section className="terroir-section" ref={sectionRef} id="defi-terroir">
            <div className="terroir-particles" ref={particleContainerRef}></div>

            {/* 1. Introduction */}
            <div className="terroir-intro">
                <h1 className="terroir-title" ref={titleRef}>
                    The Quality of an Agricultural Product Relies Entirely on its Terroir
                </h1>
                <div className="terroir-intro-text">
                    Terroir is this unique alchemy born from five fundamental factors that interact constantly:
                    <ul className="terroir-intro-list" ref={introListRef}>
                        <li><strong>Soil</strong> – mineral matrix, nutrients and texture</li>
                        <li><strong>Climate</strong> – thermal, water and light conditions</li>
                        <li><strong>Hydrology</strong> – drainage and underground reserves</li>
                        <li><strong>Topography</strong> – relief, exposure and winds</li>
                        <li><strong>Microbial Biodiversity</strong> – the invisible ecosystem of the soil</li>
                    </ul>
                </div>
            </div>

            {/* 2. Elements Orbit */}
            <div className="terroir-orbit-container">
                <div className="terroir-central-globe" ref={globeRef}>
                    <div className="globe-veins"></div>
                    <Leaf color="white" size={60} style={{ zIndex: 11 }} />
                </div>
                <div className="orbit-cards-wrapper" ref={orbitRef}>
                    {elements.map((el) => (
                        <div key={el.id} className="orbit-card" id={`card-${el.id}`}>
                            <div className="orbit-line-element"></div>
                            {el.icon}
                            <h3>{el.title}</h3>
                            <p>{el.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Transition */}
            <div className="terroir-transition">
                <div className="horizon-wave"></div>
                <h2 className="transition-text">Yet, today, this fragile harmony is seriously threatened…</h2>
            </div>

            {/* 4. Threats Stacking */}
            <div className="terroir-threats-container" ref={threatsRef}>
                {threats.map((threat, idx) => (
                    <div key={idx} className="threat-card">
                        <div className="threat-image">
                            <img src={threat.image} alt={threat.title} />
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                background: 'linear-gradient(45deg, rgba(0,229,255,0.2), transparent)'
                            }}></div>
                        </div>
                        <div className="threat-content">
                            <h2>{threat.title}</h2>
                            <table className="threat-table">
                                <thead>
                                    <tr>
                                        <th>Problem</th>
                                        <th>Impact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{threat.problem}</td>
                                        <td>{threat.impact}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="threat-desc">{threat.desc}</p>
                            <p className="threat-solution"><strong>With Terra-Nova:</strong> {threat.solution}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TerroirChallenge;
