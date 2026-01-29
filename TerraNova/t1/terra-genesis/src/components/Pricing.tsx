import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pricing.css';

const plans = [
    {
        name: "Alpha Module",
        price: "15",
        suffix: "k",
        currency: "€",
        status: "STANDBY",
        desc: "Standard orbital analysis & Preliminary AI report.",
        features: [
            { icon: "🛰️", text: "Sentinel-1 Interferometry" },
            { icon: "🔬", text: "Basic AI (10 variables)" },
            { icon: "⏰", text: "Delivery T+7 days" }
        ],
        cta: "Initialize Flux"
    },
    {
        name: "Horizon Module",
        price: "50",
        suffix: "k",
        currency: "€",
        status: "LIVE STREAM",
        desc: "Complete multi-spectral scan & Generative native design.",
        features: [
            { icon: "📡", text: "Real-Time Satellite v8" },
            { icon: "🧠", text: "Cognitive AI (500+ variables)" },
            { icon: "🌱", text: "Adaptive Native Design" },
            { icon: "☁️", text: "RCP 8.5 Simulation (50 years)" }
        ],
        cta: "Start Analysis",
        highlight: true,
        tag: "OPTIMAL"
    },
    {
        name: "Nexus Module",
        price: "100",
        suffix: "k+",
        currency: "€",
        status: "READY",
        desc: "Dedicated infrastructure & Real-time API integration.",
        features: [
            { icon: "🖥️", text: "Dedicated GEE Server" },
            { icon: "🌐", text: "Integrated Webhooks API" },
            { icon: "🛡️", text: "Dedicated 24/7 Support" },
            { icon: "♾️", text: "Unlimited Projects" }
        ],
        cta: "Deploy Infrastructure"
    }
];

export default function Pricing() {
    const [activeIndex, setActiveIndex] = useState(1);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % plans.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + plans.length) % plans.length);

    return (
        <section id="pricing" className="dashboard-packs-section">
            <div className="dashboard-bg-effects">
                <div className="light-animated-grid"></div>
                <div className="data-wave wave-1"></div>
                <div className="data-wave wave-2"></div>
            </div>

            <div className="container-symmetric relative z-10">
                <h2>Processing Units <span>Available</span></h2>
                <p className="intro-text">
                    Satellite control interface v4.2. Optimized data streams for absolute geotechnical precision.
                </p>

                <div className="packs-viewport">
                    <button onClick={prevSlide} className="slider-arrow prev-arrow" aria-label="Carte précédente">
                        <ChevronLeft size={28} />
                    </button>

                    <div className="packs-container">
                        {plans.map((plan, idx) => {
                            const isActive = idx === activeIndex;
                            const isPrev = (activeIndex === 0 && idx === plans.length - 1) || (idx === activeIndex - 1);
                            const isNext = (activeIndex === plans.length - 1 && idx === 0) || (idx === activeIndex + 1);

                            let cardClass = "dashboard-card";
                            if (isActive) cardClass += " active";
                            else if (isPrev) cardClass += " prev";
                            else if (isNext) cardClass += " next";
                            else cardClass += " hidden-card";

                            return (
                                <div key={idx} className={cardClass} onClick={() => setActiveIndex(idx)}>
                                    <div className={`card-header-gradient ${plan.highlight ? 'premium' : ''}`}>
                                        <div className={`status-indicator ${plan.status === 'LIVE STREAM' ? 'live' : ''}`}>
                                            {plan.status}
                                        </div>
                                        {plan.highlight && plan.tag && <span className="tag-premium">{plan.tag}</span>}
                                        <h3>{plan.name}</h3>
                                    </div>

                                    <div className="card-body">
                                        <div className="price-display">
                                            <span className="currency">{plan.currency}</span>
                                            <span className="amount">{plan.price}</span>
                                            <span className="suffix">{plan.suffix}</span>
                                        </div>

                                        <p className="card-desc">"{plan.desc}"</p>

                                        <ul className="dashboard-features">
                                            {plan.features.map((feature, i) => (
                                                <li key={i}>
                                                    <span className="feature-icon">{feature.icon}</span>
                                                    <span>{feature.text}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button className={`dashboard-cta ${plan.highlight ? 'premium' : ''}`}>
                                            {plan.cta}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button onClick={nextSlide} className="slider-arrow next-arrow" aria-label="Carte suivante">
                        <ChevronRight size={28} />
                    </button>
                </div>

                {/* Indicateurs de pagination */}
                <div className="carousel-dots">
                    {plans.map((_, idx) => (
                        <button
                            key={idx}
                            className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`Go to card ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
