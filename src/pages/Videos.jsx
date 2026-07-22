import React from 'react';
import { Play, Calendar, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const ALL_VIDEOS = [
    {
        year: "2026",
        videos: [
            { id: "2026-1", title: "Thirunallur Jallikattu 2026 Live Stream", thumbnail: "https://img.youtube.com/vi/Jl8EVhA-z9g/maxresdefault.jpg", url: "https://www.youtube.com/live/Jl8EVhA-z9g?si=02VE2E4UMqQ1sQdy" }
        ]
    },
    {
        year: "2025",
        videos: [
            { id: "0", title: "Thirunallur Jallikattu 2025 Live Stream", thumbnail: "https://img.youtube.com/vi/zJJghba8fV0/maxresdefault.jpg", url: "https://www.youtube.com/live/zJJghba8fV0?si=eqfqjsMBr_UiwGSU" }
        ]
    },
    {
        year: "2024",
        videos: [
            { id: "1", title: "Thirunallur Jallikattu 2024 Live Stream", thumbnail: "https://img.youtube.com/vi/6sfpznNJipo/maxresdefault.jpg", url: "https://www.youtube.com/live/6sfpznNJipo?si=viIgi5hmCcmi5K-m" }
        ]
    },
    {
        year: "2023",
        videos: [
            { id: "3", title: "Thirunallur Jallikattu 2023 Live Stream", thumbnail: "https://img.youtube.com/vi/jpoa0ywFuKY/maxresdefault.jpg", url: "https://www.youtube.com/live/jpoa0ywFuKY?si=2LOuT14Wim6o0D6X" }
        ]
    },
    {
        year: "2022",
        videos: [
            { id: "5", title: "Thirunallur Jallikattu 2022 Live Stream", thumbnail: "https://img.youtube.com/vi/f3XiWKcqmwY/maxresdefault.jpg", url: "https://www.youtube.com/live/f3XiWKcqmwY?si=UXoaBuHULjnFFRea" }
        ]
    },
    {
        year: "2021",
        videos: [
            { id: "6", title: "Thirunallur Jallikattu 2021 - Part 1", thumbnail: "https://img.youtube.com/vi/siRLzXi77mw/maxresdefault.jpg", url: "https://youtu.be/siRLzXi77mw?si=kRAH2eHSn58qZIda" },
            { id: "7", title: "Thirunallur Jallikattu 2021 - Part 2", thumbnail: "https://img.youtube.com/vi/TfarqKhnPkY/maxresdefault.jpg", url: "https://youtu.be/TfarqKhnPkY?si=MIdix8FkZUy9VPVB" }
        ]
    },
    {
        year: "2020",
        videos: [
            { id: "8", title: "Thirunallur Jallikattu 2020 - Part 1", thumbnail: "https://img.youtube.com/vi/tZyJ6GWIz_g/maxresdefault.jpg", url: "https://youtu.be/tZyJ6GWIz_g?si=SoUenfgGKLKbapi1" },
            { id: "9", title: "Thirunallur Jallikattu 2020 - Part 2", thumbnail: "https://img.youtube.com/vi/8Or-YnCzYt4/maxresdefault.jpg", url: "https://youtu.be/8Or-YnCzYt4?si=GgWH87NnANlmQTG8" },
            { id: "10", title: "Thirunallur Jallikattu 2020 - Part 3", thumbnail: "https://img.youtube.com/vi/PEKQiuchXKQ/maxresdefault.jpg", url: "https://youtu.be/PEKQiuchXKQ?si=4sdaXbjpFeeqf9Vl" }
        ]
    },
    {
        year: "2019",
        videos: [
            { id: "11", title: "Video Coming Soon", thumbnail: "https://placehold.co/640x360/1a1a1a/666666?text=Coming+Soon", url: "#" }
        ]
    },
    {
        year: "2018",
        videos: [
            { id: "12", title: "Thirunallur Jallikattu 2018", thumbnail: "https://img.youtube.com/vi/Jl185DPV_B8/maxresdefault.jpg", url: "https://youtu.be/Jl185DPV_B8?si=Mgqp4vOq8I6sf6Tr" }
        ]
    },
    {
        year: "2017",
        videos: [
            { id: "13", title: "Thirunallur Jallikattu 2017 - Part 1", thumbnail: "https://img.youtube.com/vi/gIX9gzjEox4/hqdefault.jpg", url: "https://youtu.be/gIX9gzjEox4?si=Un8R3VCYYTWbJArr" },
            { id: "14", title: "Thirunallur Jallikattu 2017 - Part 2", thumbnail: "https://img.youtube.com/vi/J4j333AYFuU/hqdefault.jpg", url: "https://youtu.be/J4j333AYFuU?si=Ee59oU256lQzzjQt" },
            { id: "15", title: "Thirunallur Jallikattu 2017 - Part 3", thumbnail: "https://img.youtube.com/vi/oQJrc2zUA-o/hqdefault.jpg", url: "https://youtu.be/oQJrc2zUA-o?si=XhvHByaKXrQ4Nluj" },
            { id: "16", title: "Thirunallur Jallikattu 2017 - Part 4", thumbnail: "https://img.youtube.com/vi/bww10vpzJ3A/hqdefault.jpg", url: "https://youtu.be/bww10vpzJ3A?si=lFHXpOzUp7XARQ3Y" }
        ]
    }
];

export default function Videos({ lang }) {
    return (
        <div className="pt-24 pb-12 px-4 min-h-screen bg-thiru-black relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className={clsx("text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-thiru-gold to-thiru-red mb-4", lang === 'ta' && 'font-tamil')}>
                        {lang === 'en' ? 'Jallikattu Video Archives' : 'ஜல்லிக்கட்டு காணொளிகள்'}
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        {lang === 'en'
                            ? 'Witness the glory, bravery, and tradition of Thirunallur Jallikattu through the years.'
                            : 'திருநல்லூர் ஜல்லிக்கட்டின் பெருமையையும் வீரத்தையும் கடந்த கால காணொளிகள் மூலம் காணுங்கள்.'}
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {ALL_VIDEOS.map((yearGroup) => (
                        <div key={yearGroup.year} className="relative">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px bg-white/10 flex-grow"></div>
                                <h3 className="text-3xl font-black text-white/20 font-mono">{yearGroup.year}</h3>
                                <div className="h-px bg-white/10 flex-grow"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {yearGroup.videos.map((video) => (
                                    <motion.a
                                        key={video.id}
                                        href={video.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-white/10 hover:border-thiru-gold/50 transition-all shadow-xl hover:shadow-thiru-gold/10"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>

                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                            />
                                        </div>

                                        {/* Play Icon Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-thiru-red group-hover:border-thiru-red transition-all shadow-lg">
                                                <Play size={20} className="text-white fill-white ml-1" />
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                            <div className="flex items-center gap-2 text-thiru-gold mb-2 text-xs font-mono">
                                                <Calendar size={12} />
                                                <span>{yearGroup.year}</span>
                                            </div>
                                            <h4 className={clsx("text-lg font-bold text-white group-hover:text-thiru-gold transition-colors leading-tight", lang === 'ta' && 'font-tamil')}>
                                                {video.title}
                                            </h4>
                                            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400 font-medium uppercase tracking-wider group-hover:text-white transition-colors">
                                                <span>Watch on YouTube</span>
                                                <ExternalLink size={12} />
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
