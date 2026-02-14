import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Video, Image as ImageIcon, User, Search, PlayCircle } from 'lucide-react'; // Added PlayCircle
import clsx from 'clsx';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
    {
        key: 'tracking',
        label: { en: 'Application Status', ta: 'விண்ணப்ப நிலை' },
        path: '/tracking',
        icon: Search,
        desc: { en: 'Track your registration status', ta: 'உங்கள் பதிவின் நிலையை கண்காணிக்கவும்' },
        color: 'from-blue-500 to-cyan-500'
    },
    {
        key: 'live',
        label: { en: 'Live Updates', ta: 'நேரலை' },
        path: '/live',
        icon: Video,
        desc: { en: 'Watch Jallikattu event live', ta: 'ஜல்லிக்கட்டு நேரலையை காணுங்கள்' },
        color: 'from-red-500 to-rose-500'
    },
    {
        key: 'gallery',
        label: { en: 'Bull Gallery', ta: 'காளைகள்' },
        path: '/gallery',
        icon: ImageIcon,
        desc: { en: 'Legendary bulls showcase', ta: 'புகழ்பெற்ற காளைகளின் தொகுப்பு' },
        color: 'from-amber-500 to-yellow-500'
    },
    {
        key: 'videos',
        label: { en: 'Video Archives', ta: 'காணொளி காப்பகம்' },
        path: '/#videos',
        icon: PlayCircle, // Changed icon for variety
        desc: { en: 'Watch past event highlights', ta: 'கடந்த கால நிகழ்வுகளை காணுங்கள்' },
        color: 'from-purple-500 to-violet-500'
    },
    {
        key: 'admin',
        label: { en: 'Admin Portal', ta: 'நிர்வாக தளம்' },
        path: '/admin',
        icon: User,
        desc: { en: 'Official login for officials', ta: 'அலுவலர்களுக்கான உள்நுழைவு' },
        color: 'from-zinc-500 to-zinc-400'
    },
];

export default function Menu({ lang }) {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className={clsx("text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-thiru-gold to-thiru-red mb-4", lang === 'ta' && 'font-tamil')}>
                        {lang === 'en' ? 'Explore Thirunallur' : 'திருநல்லூர் விரிவான பக்கம்'}
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        {lang === 'en'
                            ? 'Discover all features and services available on our platform.'
                            : 'எங்கள் தளத்தில் கிடைக்கும் அனைத்து அம்சங்களையும் சேவைகளையும் கண்டறியவும்.'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MENU_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={item.path}
                                    className="block group relative h-full bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-thiru-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-thiru-gold/10 hover:-translate-y-1"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                    <div className="p-8 h-full flex flex-col items-center text-center">
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} p-4 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-full h-full text-white" />
                                        </div>

                                        <h3 className={clsx("text-2xl font-bold text-white mb-2 group-hover:text-thiru-gold transition-colors", lang === 'ta' && 'font-tamil')}>
                                            {item.label[lang]}
                                        </h3>

                                        <p className={clsx("text-zinc-400 group-hover:text-zinc-300 transition-colors", lang === 'ta' && 'font-tamil')}>
                                            {item.desc[lang]}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
