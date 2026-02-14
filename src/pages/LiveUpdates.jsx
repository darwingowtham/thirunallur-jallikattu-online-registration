import React from 'react';
import { Video, Radio, Bell } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function LiveUpdates({ lang }) {
    const isEn = lang === 'en';

    return (
        <div className="pt-24 pb-12 px-4 min-h-screen bg-thiru-black">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
                    <div>
                        <h2 className={clsx("text-3xl font-bold text-white mb-2", lang === 'ta' && 'font-tamil')}>
                            {isEn ? 'Live Arena Updates' : 'வாடிவாசல் நேரலை'}
                        </h2>
                        <p className="text-zinc-400 flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                            {isEn ? 'Event Status: Pre-Event Checks' : 'நிகழ்வு நிலை: சோதனைகள்'}
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-full text-zinc-300 transition-colors border border-zinc-700">
                        <Bell size={18} /> {isEn ? 'Get Notified' : 'அறிவிப்பைப் பெறுக'}
                    </button>
                </div>

                {/* Video Player Placeholder */}
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform cursor-pointer border-2 border-red-600">
                                <Video className="w-10 h-10 text-red-500" />
                            </div>
                            <p className="text-zinc-500 font-mono tracking-widest uppercase">Stream Offline</p>
                            <p className="text-zinc-600 text-xs mt-2">Starts Jan 16, 08:00 AM</p>
                        </div>
                    </div>

                    {/* Overlay UI */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded flex items-center gap-2">
                            <Radio size={14} className="animate-pulse" /> LIVE
                        </div>
                        <div className="bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded border border-white/10">
                            0 Viewers
                        </div>
                    </div>
                </div>

                {/* Live Ticker */}
                <div className="bg-thiru-gold text-black py-3 overflow-hidden whitespace-nowrap border-y-4 border-black relative rounded-sm">
                    <motion.div
                        className="inline-block text-lg font-bold uppercase tracking-wide"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    >
                        {isEn
                            ? "Registration closes in 24 hours • District Collector inspection complete • Medical team ready • 500+ Bulls Registered"
                            : "பதிவு 24 மணி நேரத்தில் முடிவடைகிறது • மாவட்ட ஆட்சியர் ஆய்வு முடிந்தது • மருத்துவக் குழு தயார் • 500+ காளைகள் பதிவு செய்யப்பட்டுள்ளன"}
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
