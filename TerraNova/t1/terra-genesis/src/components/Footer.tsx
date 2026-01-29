import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer-symmetric py-20 bg-[#064E3B] text-white">
            <div className="container-symmetric">
                <div className="flex flex-col items-center justify-center gap-10 text-center">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-black mb-6 tracking-tighter text-white border-none p-0 after:hidden uppercase italic">
                            Terra<span className="text-[#6EE7B7]">-</span>Nova
                        </h2>
                        <p className="text-xl text-white/70 mb-8 font-light italic">
                            "Because the best land to cultivate is the one we create ourselves."
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#6EE7B7] hover:text-[#064E3B] transition-all"><Twitter size={20} /></a>
                        <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#6EE7B7] hover:text-[#064E3B] transition-all"><Linkedin size={20} /></a>
                        <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#6EE7B7] hover:text-[#064E3B] transition-all"><Github size={20} /></a>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/10 text-center text-white/30 text-xs tracking-widest uppercase">
                    © 2026 Terra-Nova. All rights reserved. Nexus 01 - Planetary Terraform.
                </div>
            </div>
        </footer>
    );
}
