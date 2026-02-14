import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ticket, Video, Image as ImageIcon, User, Languages, Search, MoreHorizontal, Sun, Moon } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import templeImg from '../assets/temple/amman_temple.jpeg';
import { useTheme } from '../context/ThemeContext';

const PRIMARY_ITEMS = [
    { key: 'home', label: { en: 'Home', ta: 'முகப்பு' }, path: '/' },
    { key: 'book', label: { en: 'Book Token', ta: 'முன்பதிவு' }, path: '/book', icon: Ticket },
    { key: 'tracking', label: { en: 'Status', ta: 'நிலை' }, path: '/tracking', icon: Search },
    { key: 'live', label: { en: 'Live Updates', ta: 'நேரலை' }, path: '/live', icon: Video },
];

const SECONDARY_ITEMS = [
    { key: 'gallery', label: { en: 'Bull Gallery', ta: 'காளைகள்' }, path: '/gallery', icon: ImageIcon },
    { key: 'videos', label: { en: 'Videos', ta: 'காணொளிகள்' }, path: '/#videos', icon: Video },
    { key: 'admin', label: { en: 'Admin', ta: 'நிர்வாகம்' }, path: '/admin', icon: User },
];

const ALL_ITEMS = [...PRIMARY_ITEMS, ...SECONDARY_ITEMS];

export default function Navbar({ lang, setLang }) {
    const [isOpen, setIsOpen] = useState(false);
    const [instaMenuOpen, setInstaMenuOpen] = useState(false);
    const [waMenuOpen, setWaMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-[100] bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-colors duration-300">
            <div className="w-full mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-thiru-gold to-thiru-red p-0.5 overflow-hidden group-hover:scale-110 transition-transform">
                            <img src={templeImg} alt="Logo" className="w-full h-full object-cover rounded-full" />
                        </div>
                        {lang === 'ta' ? (
                            <span className="hidden lg:block text-sm font-bold text-thiru-gold font-tamil whitespace-nowrap">
                                திருநல்லூர் ஜல்லிக்கட்டு
                            </span>
                        ) : (
                            <div className="hidden lg:flex flex-col">
                                <span className="text-xl font-bold text-thiru-gold leading-none">
                                    THIRUNALLUR
                                </span>
                                <span className="text-xs text-red-500 font-semibold tracking-wider">
                                    JALLIKATTU
                                </span>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1 xl:gap-2">
                        {ALL_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.key}
                                    to={item.path}
                                    className={clsx(
                                        "flex items-center gap-1.5 px-2 py-1 rounded-md transition-all text-[10px] lg:text-xs font-bold uppercase tracking-wide border whitespace-nowrap",
                                        isActive
                                            ? "bg-blue-900 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                            : "bg-gray-100 dark:bg-black text-blue-600 dark:text-blue-500 border-gray-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-800 dark:hover:text-white hover:border-blue-300 dark:hover:border-blue-400 shadow-none dark:shadow-[0_0_10px_rgba(30,58,138,0.3)]",
                                        lang === 'ta' && "font-tamil"
                                    )}
                                >
                                    {Icon && <Icon size={12} className="lg:w-3.5 lg:h-3.5" />}
                                    {item.label[lang]}
                                </Link>
                            );
                        })}

                        <button
                            onClick={() => setLang(l => l === 'en' ? 'ta' : 'en')}
                            className="flex items-center gap-2 px-3 py-1 bg-red-900/20 border border-red-900/50 rounded-full text-red-400 hover:text-red-300 text-xs font-bold transition-colors ml-2"
                        >
                            <Languages size={14} />
                            {lang === 'en' ? 'தமிழ்' : 'ENG'}
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-1.5 ml-1 rounded-full bg-gray-100 dark:bg-white/10 text-yellow-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setLang(l => l === 'en' ? 'ta' : 'en')}
                            className="text-thiru-gold font-bold text-sm"
                        >
                            {lang === 'en' ? 'TA' : 'EN'}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400 hover:text-white">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-zinc-950 border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {ALL_ITEMS.map((item) => (
                                <Link
                                    key={item.key}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        "block px-3 py-3 rounded-md text-base font-medium border-b border-white/5",
                                        location.pathname === item.path ? "text-thiru-gold" : "text-zinc-400",
                                        lang === 'ta' && "font-tamil"
                                    )}
                                >
                                    {item.label[lang]}
                                </Link>
                            ))}
                        </div>

                        {/* Social Links in Mobile Menu */}
                        <div className="border-t border-white/10 px-4 py-6">
                            <p className="text-zinc-500 text-xs uppercase tracking-widest text-center mb-4">Follow Us</p>
                            <div className="flex justify-center flex-wrap gap-4">
                                <div className="relative">
                                    <button
                                        onClick={() => setWaMenuOpen(!waMenuOpen)}
                                        className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-green-500 hover:bg-green-900/20 transition-all border border-zinc-800"
                                    >
                                        <FaWhatsapp size={20} />
                                    </button>
                                    <AnimatePresence>
                                        {waMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 min-w-[160px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col"
                                            >
                                                <a href="https://chat.whatsapp.com/DGv7RbMGvfS2PjotbK8DE7" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white font-tamil whitespace-nowrap border-b border-white/5 last:border-0 text-center">
                                                    மேலக்களம்
                                                </a>
                                                <a href="https://chat.whatsapp.com/FKWs55T5jwOEYdJ1vY6fHF?mode=gi_t" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white font-tamil whitespace-nowrap text-center">
                                                    களர்பட்டி
                                                </a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => setInstaMenuOpen(!instaMenuOpen)}
                                        className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-pink-500 hover:bg-pink-900/20 transition-all border border-zinc-800"
                                    >
                                        <FaInstagram size={20} />
                                    </button>
                                    <AnimatePresence>
                                        {instaMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 min-w-[160px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col"
                                            >
                                                <a href="https://www.instagram.com/thennalur__mannu/" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white font-tamil whitespace-nowrap border-b border-white/5 last:border-0 text-center">
                                                    தென்னலூர் மண்ணு
                                                </a>
                                                <a href="https://www.instagram.com/thennalur_seemai_/" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white font-tamil whitespace-nowrap text-center">
                                                    தென்னலூர் சீமை
                                                </a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <a href="#" className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-red-500 hover:bg-red-900/20 transition-all border border-zinc-800">
                                    <FaYoutube size={20} />
                                </a>
                                <a href="#" className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-blue-500 hover:bg-blue-900/20 transition-all border border-zinc-800">
                                    <FaFacebook size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
