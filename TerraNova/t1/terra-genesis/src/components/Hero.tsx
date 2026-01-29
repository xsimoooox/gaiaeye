import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function Hero() {
    return (
        <section className="hero-2025">
            <div className="hero-cosmos-bg">
                <div className="earth-visual" style={{ backgroundImage: "url('/terra-genesis-hero.png')" }}></div>
                <div className="veins-overlay"></div>
                <div className="atmosphere-glow"></div>
            </div>

            <div className="hero-content-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <Globe size={16} className="text-[#00d4ff]" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-white/70 uppercase">Planetary Terraform Initiative</span>
                    </div>

                    <h1 className="sculpted-title" style={{ opacity: 1, transform: 'none' }}>
                        Terra-Nova
                    </h1>

                    <div className="subtitle-wrapper">
                        <p className="poetic-subtitle" style={{ opacity: 1 }}>
                            "We don't just grow plants. We cultivate entire ecosystems."
                        </p>
                        <p className="text-white/60 mt-4 text-lg font-light tracking-wide italic">
                            Cloning the best terroirs on the planet thanks to AI Satellite.
                        </p>
                    </div>

                    <div className="cta-wrapper flex flex-col md:flex-row gap-6 mt-12" style={{ opacity: 1, transform: 'none' }}>
                        <a href="#technology" className="orb-cta group">
                            <span className="cta-content">Explore the Nexus</span>
                            <div className="orb-ring"></div>
                            <div className="orb-pulse"></div>
                        </a>
                        <a href="#pricing" className="px-8 py-4 rounded-full border border-white/20 text-white font-bold tracking-widest text-xs uppercase hover:bg-white/5 transition-all">
                            View Modules
                        </a>
                    </div>
                </motion.div>
            </div>

            <div className="hero-scroll-indicator">
                <span className="scroll-text">Scroll to Scan</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
}
