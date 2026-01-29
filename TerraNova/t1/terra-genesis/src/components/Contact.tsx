import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Satellite, Zap, ShieldCheck, HelpCircle, Plus, Send } from 'lucide-react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        id: 1,
        question: "PROTOCOL_COST",
        answer: "Preliminary satellite analysis is included in the Starter Pack. In-depth audits require the Pro Pack."
    },
    {
        id: 2,
        question: "DATA_SECURITY",
        answer: "All terroir data is AES-256 encrypted and stored on secure sovereign servers."
    },
    {
        id: 3,
        question: "DEPLOYMENT_TIME",
        answer: "Deployment of TERRA-CUBE units begins 48h after validation of the transformation recipe."
    }
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const centerPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    // Handle Form Submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        // Simulate transmission
        setTimeout(() => {
            setFormStatus('success');
        }, 2000); // 2s delay
    };

    // Toggle FAQ
    const toggleFaq = (id: number) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    // 3D Tilt Effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!centerPanelRef.current) return;
        const panel = centerPanelRef.current.querySelector('.glass-contact-panel') as HTMLElement;
        if (!panel) return;

        const rect = centerPanelRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
        const rotateY = ((x - centerX) / centerX) * 5; // Max 5deg

        gsap.to(panel, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: 'power1.out'
        });
    };

    const handleMouseLeave = () => {
        if (!centerPanelRef.current) return;
        const panel = centerPanelRef.current.querySelector('.glass-contact-panel') as HTMLElement;
        if (panel) {
            gsap.to(panel, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power1.out'
            });
        }
    };

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // 1. Staggered Entrance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%"
            }
        });

        // Panels cascade
        tl.to([leftPanelRef.current, centerPanelRef.current, rightPanelRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });



    }, []);

    return (
        <section id="contact" className="futuristic-contact" ref={sectionRef}>
            <div className="contact-bg-elements">
                <div className="contact-waves"></div>
                <div className="data-dust"></div>
            </div>

            <div className="container-symmetric relative z-10">
                <div className="text-center"> {/* Wrapper for centering inline-block H1 */}
                    <h1 ref={titleRef} style={{ minHeight: '1.2em', display: 'inline-block' }}>Initialize Communication</h1>
                    <p className="contact-intro">
                        Establish a direct link with our orbital systems and ground experts.
                    </p>
                </div>

                <div className="contact-dashboard-layout">

                    {/* --- Left Panel: Live Signal --- */}
                    <div className="panel-wrapper" ref={leftPanelRef}>
                        <div className="live-signal-card">
                            <div className="card-header-compact">
                                <div className="signal-title-group">
                                    <Satellite className="satellite-spin" size={24} />
                                    <h3>DIRECT SIGNAL</h3>
                                </div>
                                <div className="status-indicator-group">
                                    <div className="status-light"></div>
                                    <span className="status-text">ONLINE</span>
                                </div>
                            </div>

                            <div className="card-action-buttons">
                                <button className="action-btn">
                                    <Zap size={16} /> Instant Call
                                </button>
                                <button className="action-btn">
                                    <Send size={16} /> Live Chat
                                </button>
                            </div>

                            <div className="mini-info-grid">
                                <div className="info-tag">
                                    <Zap size={14} />
                                    <span>T+ 2m</span>
                                </div>
                                <div className="info-tag">
                                    <ShieldCheck size={14} />
                                    <span>GMT+1</span>
                                </div>
                                <div className="info-tag">
                                    <HelpCircle size={14} />
                                    <span>AES-256</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Center Panel: Transmission Form --- */}
                    <div
                        className="panel-wrapper contact-panel-container"
                        ref={centerPanelRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="glass-contact-panel">
                            {formStatus === 'idle' && (
                                <>
                                    <div className="panel-header">
                                        <div className="equalizer">
                                            <div className="signal-bar"></div>
                                            <div className="signal-bar"></div>
                                            <div className="signal-bar"></div>
                                        </div>
                                        <span className="signal-text">SECURE LINK</span>
                                    </div>

                                    <form ref={formRef} onSubmit={handleSubmit}>
                                        <div className="input-group">
                                            <input type="text" id="name" required placeholder=" " />
                                            <label htmlFor="name">IDENTITY / ORGANIZATION</label>
                                        </div>
                                        <div className="input-group">
                                            <input type="email" id="email" required placeholder=" " />
                                            <label htmlFor="email">DIGITAL COORDINATES</label>
                                        </div>
                                        <div className="input-group">
                                            <textarea id="message" required rows={4} placeholder=" "></textarea>
                                            <label htmlFor="message">MESSAGE</label>
                                        </div>

                                        <button type="submit" className="transmit-button group">
                                            <span>Transmit Signal</span>
                                            <div className="btn-glow"></div>
                                        </button>
                                    </form>
                                </>
                            )}

                            {formStatus === 'sending' && (
                                <div className="transmission-loader">
                                    <div className="loader-satellite"></div>
                                    <div className="signal-text" style={{ fontSize: '14px', marginTop: '20px' }}>SENDING...</div>
                                </div>
                            )}

                            {formStatus === 'success' && (
                                <div className="transmission-loader">
                                    <ShieldCheck size={60} color="#2ecc71" style={{ marginBottom: '20px' }} />
                                    <div className="success-message">SIGNAL RECEIVED<br />TRANSMISSION SUCCESSFUL</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- Right Panel: FAQ Terminal --- */}
                    <div className="panel-wrapper" ref={rightPanelRef}>
                        <div className="faq-terminal">
                            <h3>FAQ_TERMINAL</h3>

                            {faqs.map(faq => (
                                <div key={faq.id} className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`}>
                                    <button className="faq-question" onClick={() => toggleFaq(faq.id)}>
                                        <span>{faq.question}</span>
                                        <Plus className="faq-icon" size={16} />
                                    </button>
                                    <div className="faq-answer">
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
