import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import timelineStep3Bg from '../assets/timeline-step-3.jpg';
import timelineStep4Bg from '../assets/timeline-step-4-v2.png';
import timelineStep5Bg from '../assets/timeline-step-5.jpg';
import timelineStep6Bg from '../assets/timeline-step-6.png';
import './TimelineSection.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineStep {
    number: string;
    title: string;
    description: string;
    details: string[];
    objective: string;
    image: string;
}

const TimelineSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    const steps: TimelineStep[] = [
        {
            number: "STEP 1",
            title: "Multi-dimensional site satellite scan",
            description: "Every project begins with a complete reading of the territory from space. Satellites analyze:",
            details: [
                "Mineral composition of the soil",
                "Humidity and water dynamics",
                "Day / night temperatures",
                "Topography and exposure",
                "Existing vegetation and its stress"
            ],
            objective: "Objective: Establish a precise environmental footprint of the site, over several years.",
            image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&q=80&w=800"
        },
        {
            number: "STEP 2",
            title: "Decoding local soil DNA",
            description: "Satellite data is cross-referenced with historical climate models, indirect biological indicators, and spectral signatures of the soil. The soil is then translated into an actionable scientific profile:",
            details: [
                "Mineral balances",
                "Climatic constraints",
                "Biological capacities",
                "Limiting factors invisible to the human eye"
            ],
            objective: "Soil ceases to be a surface: it becomes a measurable system.",
            image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800"
        },
        {
            number: "STEP 3",
            title: "Matching with the global terroir database",
            description: "Terra-Nova compares the site profile with a database of exceptional terroirs (vineyards, coffee plantations, premium agricultural zones). AI identifies:",
            details: [
                "The closest global terroir",
                "The environmental similarity rate",
                "Precise gaps to correct"
            ],
            objective: "Example: \"This site can become a functional equivalent of Saint-Émilion at 78%\"",
            image: timelineStep3Bg
        },
        {
            number: "STEP 4",
            title: "Generation of the transformation recipe",
            description: "The algorithm generates a terroir transformation recipe, unique to the site. It defines:",
            details: [
                "Necessary mineral amendments",
                "Water adjustments",
                "Microclimatic modifications",
                "Adapted cover crops",
                "Transformation schedule"
            ],
            objective: "Every action is quantified, localized, and prioritized.",
            image: timelineStep4Bg
        },
        {
            number: "STEP 5",
            title: "Physical deployment on the ground (TERRA-CUBE)",
            description: "TERRA-CUBE executes the transformation on the ground:",
            details: [
                "Incorporation of amendments at the right level",
                "Implementation of drainage and irrigation",
                "Installation of smart sensors",
                "Sowing of specific cover crops",
                "Creation of controlled microclimates"
            ],
            objective: "Transformation is progressive, respectful of the soil, and continuously measured.",
            image: timelineStep5Bg
        },
        {
            number: "STEP 6",
            title: "Living monitoring and continuous adjustments",
            description: "After deployment, Terra-Nova monitors terroir evolution:",
            details: [
                "IoT sensors in the soil",
                "Continuous satellite surveillance",
                "Alerts in case of drift",
                "Automatic or recommended adjustments"
            ],
            objective: "The terroir becomes a piloted living system, not a frozen intervention.",
            image: timelineStep6Bg
        },
        {
            number: "STEP 7",
            title: "Stabilization and quality rise",
            description: "Over 24 to 36 months, the soil reaches its target equilibrium, crops fully express their potential, and quality becomes reproducible and predictable.",
            details: [],
            objective: "The site now produces premium local agriculture, stable and resilient.",
            image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const progress = progressRef.current;
        const stepsContainer = stepsRef.current;

        if (!section || !progress || !stepsContainer) return;

        // Progress Bar Animation
        gsap.to(progress, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: 0.5
            }
        });

        // Individual Step Animations
        const stepElements = stepsContainer.querySelectorAll('.timeline-step');

        stepElements.forEach((step, index) => {

            const content = step.querySelector('.step-content');
            const visual = step.querySelector('.step-visual');
            const isEven = index % 2 === 0;

            // Step Entry Animation
            ScrollTrigger.create({
                trigger: step,
                start: 'top 60%',
                end: 'bottom 60%',
                onEnter: () => {
                    step.classList.add('active');
                    step.classList.remove('passed');

                    // Animate content
                    gsap.fromTo(content,
                        { opacity: 0, scale: 0.95 },
                        { opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: 'power2.out', overwrite: 'auto' }
                    );

                    // Animate visual
                    gsap.fromTo(visual,
                        {
                            opacity: 0,
                            xPercent: isEven ? 100 : -100, // Fixed: Step 1 (Index 0) is Odd -> Image Right -> 100
                            filter: 'blur(5px)'
                        },
                        {
                            opacity: 1,
                            xPercent: 0,
                            filter: 'blur(0px)',
                            duration: 0.8,
                            ease: 'power2.out',
                            // delay: 0.2, // Removed delay on visual to match "Lorsqu'un Step s'active... lancer les animations suivantes en parallèle" (content has delay 0.1)
                            overwrite: 'auto'
                        }
                    );
                },
                onLeave: () => {
                    step.classList.remove('active');
                    step.classList.add('passed');

                    // Dim content
                    gsap.to(content, { opacity: 0.5, scale: 0.98, duration: 0.3, overwrite: 'auto' });
                },
                onEnterBack: () => {
                    step.classList.remove('passed');
                    step.classList.add('active');

                    // Restore content
                    gsap.to(content, { opacity: 1, scale: 1, duration: 0.3, overwrite: 'auto' });
                },
                onLeaveBack: () => {
                    step.classList.remove('active');
                    // Reset to initial state
                    gsap.to(content, { opacity: 0, scale: 0.95, duration: 0.3, overwrite: 'auto' });
                    gsap.to(visual, { opacity: 0, xPercent: isEven ? 100 : -100, filter: 'blur(5px)', duration: 0.3, overwrite: 'auto' });
                }
            });
        });

    }, []);

    return (
        <section className="timeline-section" id="how-it-works" ref={sectionRef}>
            <div className="timeline-container">
                <div className="timeline-header">
                    <h2 className="timeline-title">
                        How TERRA-NOVA Works: A Deep Dialogue with the Earth
                    </h2>
                    <p className="timeline-intro">
                        From satellite analysis to physical soil transformation, discover the 7 steps that transform ordinary land into exceptional terroir.
                    </p>
                </div>

                {/* Timeline Track */}
                <div className="timeline-track">
                    <div className="timeline-progress" ref={progressRef}></div>
                </div>

                {/* Timeline Steps */}
                <div className="timeline-steps" ref={stepsRef}>
                    {steps.map((step, index) => (
                        <div key={index} className="timeline-step">
                            <div className="step-marker">{index + 1}</div>

                            <div className="step-content">
                                <div className="step-number">{step.number}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>

                                {step.details.length > 0 && (
                                    <ul className="step-list">
                                        {step.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                )}

                                <div className="step-objective">
                                    👉 {step.objective}
                                </div>
                            </div>

                            <div className="step-visual">
                                <img src={step.image} alt={step.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
