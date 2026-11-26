import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Radio, Bell, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import VideoModal from './VideoModal';

// Standalone Kabaddi video links - Left unpopulated as requested.
// When ready, add items with format: { id, title, tamilTitle, url, status, time, venue, thumbnail, badge }
const KABADDI_VIDEOS = [];

export default function KabaddiSection({ lang = 'en' }) {
    const isEn = lang === 'en';
    const [notified, setNotified] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null);

    const hasVideos = KABADDI_VIDEOS.length > 0;

    return (
        <section
            id="kabaddi"
            className="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white overflow-hidden border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300"
        >
            {/* Ambient Decorative Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-600/10 blur-[130px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto space-y-10">
                {/* Section Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                        <Trophy size={16} className="text-amber-600 dark:text-amber-400" />
                        <span>{isEn ? 'Traditional Sports Arena' : 'பாரம்பரிய விளையாட்டு அரங்கம்'}</span>
                    </div>

                    <h2 className={clsx("text-3xl sm:text-4xl md:text-5xl font-black tracking-tight", !isEn && "font-tamil")}>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-300 dark:via-orange-400 dark:to-red-500">
                            {isEn ? 'Kabaddi Live & Highlights' : 'கபடி நேரலை & சிறப்பம்சங்கள்'}
                        </span>
                    </h2>

                    <p className={clsx("text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto", !isEn && "font-tamil")}>
                        {isEn
                            ? 'The official tournament arena for Thirunallur Kabaddi matches, live broadcasts, and game highlights.'
                            : 'திருநல்லூர் கபடி சாம்பியன்ஷிப் போட்டிகளின் நேரலை காட்சிகள், போட்டி சிறப்பம்சங்கள் மற்றும் முக்கிய தருணங்கள்.'}
                    </p>
                </div>

                {/* Main Content Area */}
                {hasVideos ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {KABADDI_VIDEOS.map((video) => (
                            <div
                                key={video.id}
                                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm"
                            >
                                {/* Ready to render videos when provided */}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Clean, High-Visibility Placeholder / Ready Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative max-w-3xl mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-8 sm:p-12 text-center shadow-lg dark:shadow-2xl overflow-hidden"
                    >
                        {/* Subtle Card Accent */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600" />

                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400 shadow-inner">
                            <Trophy size={32} className="sm:w-10 sm:h-10" />
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 mb-4">
                            <Calendar size={13} className="text-amber-600 dark:text-amber-400" />
                            <span>{isEn ? 'Tournament Schedule Coming Soon' : 'போட்டி அட்டவணை விரைவில்'}</span>
                        </div>

                        <h3 className={clsx("text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-3", !isEn && "font-tamil")}>
                            {isEn ? 'Kabaddi Streams & Highlights Container Ready' : 'கபடி நேரலை மற்றும் காணொளி அரங்கம்'}
                        </h3>

                        <p className={clsx("text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed", !isEn && "font-tamil")}>
                            {isEn
                                ? 'No match streams are active currently. The official tournament YouTube live links, match replays, and highlights will be published here once the season begins.'
                                : 'தற்போது நேரலை ஒளிபரப்பு எதுவும் நடைபெறவில்லை. கபடி போட்டி தொடங்கும் போது அதிகாரப்பூர்வ யூடியூப் நேரலை மற்றும் காணொளி இணைப்புகள் இங்கு வெளியிடப்படும்.'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => setNotified(true)}
                                disabled={notified}
                                className={clsx(
                                    "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all touch-target w-full sm:w-auto",
                                    notified
                                        ? "bg-green-600/15 border border-green-600/40 text-green-700 dark:text-green-400 cursor-default"
                                        : "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md hover:shadow-lg shadow-amber-500/20"
                                )}
                            >
                                {notified ? (
                                    <>
                                        <CheckCircle2 size={18} />
                                        <span>{isEn ? 'Notification Registered' : 'அறிவிப்பு பதிவு செய்யப்பட்டது'}</span>
                                    </>
                                ) : (
                                    <>
                                        <Bell size={18} />
                                        <span>{isEn ? 'Notify Me When Match Starts' : 'போட்டி தொடங்கும் போது அறிவிக்கவும்'}</span>
                                    </>
                                )}
                            </button>

                            <a
                                href="#videos"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold border border-zinc-300 dark:border-zinc-700 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors touch-target w-full sm:w-auto"
                            >
                                <Sparkles size={16} className="text-amber-600 dark:text-amber-400" />
                                <span>{isEn ? 'Watch Jallikattu Archives' : 'ஜல்லிக்கட்டு காணொளிகள்'}</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* In-Page Video Modal for future Kabaddi videos */}
            <VideoModal
                isOpen={!!activeVideo}
                onClose={() => setActiveVideo(null)}
                video={activeVideo}
            />
        </section>
    );
}
