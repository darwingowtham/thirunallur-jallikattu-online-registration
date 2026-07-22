import React from 'react';
import { Shield, Award, Calendar } from 'lucide-react';
import clsx from 'clsx';

import templeImg from '../assets/temple/amman_temple.jpeg';

const BULLS = [
    { id: 1, name: "Karuppu", color: "bg-slate-900", stats: "12 Wins", desc: "The Untamed Legend of Trichy", weight: "450kg", image: "images/Bulls_Images/bull3.jpeg" },
    { id: 2, name: "Sevalai", color: "bg-red-700", stats: "8 Wins", desc: "Pride of Thirunallur", weight: "420kg", image: "images/Bulls_Images/bull5.jpeg" },
    { id: 3, name: "Komban", color: "bg-amber-800", stats: "15 Wins", desc: "Feared by Tamers", weight: "500kg", image: "images/Bulls_Images/bull3.jpeg" },
    { id: 4, name: "Mayil", color: "bg-zinc-600", stats: "5 Wins", desc: "Rising Star", weight: "380kg", image: "images/Bulls_Images/bull5.jpeg" },
    { id: 5, name: "Rudra", color: "bg-orange-800", stats: "21 Wins", desc: "Unstoppable Force", weight: "480kg", image: "images/Bulls_Images/bull3.jpeg" },
    { id: 6, name: "Vettai", color: "bg-neutral-800", stats: "9 Wins", desc: "Speed Demon", weight: "410kg", image: "images/Bulls_Images/bull5.jpeg" },
];

export default function BullGallery({ lang }) {
    return (
        <div className="pt-24 pb-12 px-4 min-h-screen bg-thiru-black">
            <div className="max-w-7xl mx-auto">
                <h2 className={clsx("text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-thiru-gold to-thiru-red mb-12", lang === 'ta' && 'font-tamil')}>
                    {lang === 'en' ? 'Bull Legend Gallery' : 'காளைகள் காட்சியகம்'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {BULLS.map((bull) => (
                        <div key={bull.id} className="group h-[22rem] sm:h-96 perspective-1000">
                            <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">

                                {/* Front Side */}
                                <div className="absolute inset-0 bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl backface-hidden overflow-hidden">
                                    <div className={`h-2/3 ${bull.color} flex items-center justify-center relative p-0 overflow-hidden`}>
                                        <div className="absolute inset-0 bg-black/30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-40 z-10 pointer-events-none"></div>
                                        <img src={bull.image} alt={bull.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-2 py-1 rounded text-xs font-mono text-thiru-gold border border-white/10 z-20">
                                            #{bull.id.toString().padStart(3, '0')}
                                        </div>
                                    </div>
                                    <div className="h-1/3 p-6 flex flex-col justify-center bg-zinc-950">
                                        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">{bull.name}</h3>
                                        <div className="flex items-center gap-2 text-thiru-gold">
                                            <Award size={18} /> <span className="font-bold">{bull.stats}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Back Side */}
                                <div
                                    className="absolute inset-0 bg-red-950 rounded-xl border border-red-900 shadow-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 text-center bg-cover bg-center"
                                    style={{ backgroundImage: `url("${templeImg}")` }}
                                >
                                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-xl"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black text-white mb-4 uppercase">{bull.name}</h3>
                                        <p className="text-zinc-300 italic mb-6 text-lg">&quot;{bull.desc}&quot;</p>

                                        <div className="space-y-3 text-sm text-red-200/90 font-mono border-t border-red-900/50 pt-4">
                                            <p className="flex justify-between w-48 mx-auto"><span>Weight:</span> <span>{bull.weight}</span></p>
                                            <p className="flex justify-between w-48 mx-auto"><span>Age:</span> <span>4 Years</span></p>
                                            <p className="flex justify-between w-48 mx-auto"><span>Owner:</span> <span>Unknown</span></p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
