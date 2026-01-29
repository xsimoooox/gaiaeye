import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, ThermometerSun, Leaf, ShoppingCart, Skull, ChevronDown } from 'lucide-react';

const problems = [
    {
        id: 1,
        title: "Rare Terroirs",
        icon: Map,
        problem: "Excellence terroirs geographically confined.",
        impact: "Limited production, exclusion of developing countries.",
        stats: "Only 1-2% of global agricultural land is premium (FAO).",
        solution: "Decoding and recreation via AI for a 'Moroccan Champagne'."
    },
    {
        id: 2,
        title: "Climate Change",
        icon: ThermometerSun,
        problem: "Warming altering natural balances.",
        impact: "Degradation of historical soils.",
        stats: "40% of arable land degraded by 2050 (UN).",
        solution: "50-year climate simulations for resilient microclimats."
    },
    {
        id: 3,
        title: "Desertification",
        icon: Leaf,
        problem: "Expansion of arid zones.",
        impact: "Lower yields, food security threat.",
        stats: "24 billion tons of fertile soil lost per year.",
        solution: "Transformation via amendments to create 'Napa Valleys'."
    },
    {
        id: 4,
        title: "Food Dependency",
        icon: ShoppingCart,
        problem: "Dependency on imports.",
        impact: "Economic and carbon vulnerability.",
        stats: "1.5 trillion $ in agricultural imports/year.",
        solution: "Local production of cloned terroirs (ROI 400%)."
    },
    {
        id: 5,
        title: "Contaminated Soils",
        icon: Skull,
        problem: "Industrial pollution & heavy metals.",
        impact: "Unusable lands, health risks.",
        stats: "33% of global soils degraded by pollution.",
        solution: "Integrated phytoremediation and circular economy."
    }
];

export default function ProblemCards() {
    return (
        <section id="problem" className="bg-[#fcfcfc]">
            <div className="container-symmetric">
                <h2>THE <span>TERROIR</span> PROBLEM</h2>
                <p className="intro-text">
                    Agricultural excellence is today a geological anomaly threatened by climate instability and the scarcity of fertile land.
                </p>

                <div className="problem-grid">
                    {/* Row 1 (3 cards) */}
                    <div className="problem-row">
                        {problems.slice(0, 3).map((card, idx) => (
                            <ProblemCard key={card.id} card={card} delay={idx * 0.1} />
                        ))}
                    </div>

                    {/* Row 2 (2 cards centered) */}
                    <div className="problem-row row-centered">
                        {problems.slice(3, 5).map((card, idx) => (
                            <ProblemCard key={card.id} card={card} delay={idx * 0.1 + 0.3} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProblemCard({ card, delay }: { card: typeof problems[0], delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
            className="card-symmetric group cursor-pointer"
            style={{ opacity: 1 }} // Force visibility for development if JS reveal is delayed
        >
            <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-[#A8DADC]/10 group-hover:bg-[#A8DADC]/30 rounded-2xl flex items-center justify-center text-[#457B9D] transition-colors">
                    <card.icon size={28} />
                </div>
                <span className="text-xs font-black text-[#1D3557]/30">0{card.id}</span>
            </div>

            <h3 className="mb-4 uppercase">{card.title}</h3>
            <p className="text-slate-500 mb-8 min-h-[48px]">{card.problem}</p>

            <div className="problem-example">
                <div className="example-header">
                    <span>View Analysis</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                </div>
                <div className="example-content">
                    <div className="mb-4">
                        <span className="text-[10px] uppercase font-bold text-red-400 block mb-1">Critical Impact</span>
                        <p className="text-sm text-[#1D3557]/80">{card.impact}</p>
                    </div>
                    <div className="mb-4">
                        <span className="text-[10px] uppercase font-bold text-[#457B9D] block mb-1">Observation Data</span>
                        <p className="text-sm text-[#1D3557]/80 font-mono italic">{card.stats}</p>
                    </div>
                    <div className="bg-[#457B9D]/5 p-3 rounded-xl border border-[#457B9D]/10">
                        <span className="text-[10px] uppercase font-bold text-[#457B9D] block mb-1">Alpha Solution</span>
                        <p className="text-sm text-[#457B9D] font-bold">"{card.solution}"</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
