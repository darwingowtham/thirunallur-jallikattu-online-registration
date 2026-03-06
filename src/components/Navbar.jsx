import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { Menu, X, Ticket, Video, Image as ImageIcon, User, Languages, Search, MoreHorizontal, Sun, Moon } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import templeImg from '../assets/temple/amman_temple.jpeg';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const PRIMARY_ITEMS = [
    { key: 'home', label: { en: 'Home', ta: 'முகப்பு' }, path: '/' },
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
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredKey, setHoveredKey] = useState(null);
    const [instaMenuOpen, setInstaMenuOpen] = useState(false);
    const [waMenuOpen, setWaMenuOpen] = useState(false);

    // Refs to track state for event listeners (avoids stale closures)
    const waMenuOpenRef = useRef(false);
    const instaMenuOpenRef = useRef(false);

    // Sync refs with state
    const toggleWaMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newState = !waMenuOpen;
        setWaMenuOpen(newState);
        waMenuOpenRef.current = newState;
        if (newState) {
            setInstaMenuOpen(false);
            instaMenuOpenRef.current = false;
        }
    };

    const toggleInstaMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newState = !instaMenuOpen;
        setInstaMenuOpen(newState);
        instaMenuOpenRef.current = newState;
        if (newState) {
            setWaMenuOpen(false);
            waMenuOpenRef.current = false;
        }
    };

    const closeAllMenus = () => {
        setWaMenuOpen(false);
        waMenuOpenRef.current = false;
        setInstaMenuOpen(false);
        instaMenuOpenRef.current = false;
    };
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // Close menus on scroll
    const waRef = useRef(null);
    const instaRef = useRef(null);

    // Close menus on scroll or click outside - Stable Listener
    React.useEffect(() => {
        const handleScroll = (e) => {
            if (waMenuOpenRef.current || instaMenuOpenRef.current) {
                // If it's a touchmove, prevent defaults? No, let page scroll. Just close menu.
                closeAllMenus();
            }
        };

        const handleClickOutside = (event) => {
            // Check WhatsApp Menu
            if (waMenuOpenRef.current && waRef.current && !waRef.current.contains(event.target)) {
                setWaMenuOpen(false);
                waMenuOpenRef.current = false;
            }
            // Check Instagram Menu
            if (instaMenuOpenRef.current && instaRef.current && !instaRef.current.contains(event.target)) {
                setInstaMenuOpen(false);
                instaMenuOpenRef.current = false;
            }
        };

        // Add listeners with capture to ensure they run before other events if needed, but bubbling is fine here.
        // Using passive: true for scroll performance.
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Add touchmove listener for immediate close on mobile start-scroll
        window.addEventListener('touchmove', handleScroll, { passive: true });

        // Use pointerdown for broader mobile support? mousedown/touchstart is fine.
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []); // Empty dependency array

    return (
        <nav className="fixed top-0 w-full z-[100] bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-colors duration-300">
            <div className="w-full mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        {lang === 'ta' ? (
                            <span className="text-xs sm:text-sm font-bold text-thiru-gold font-tamil whitespace-nowrap">
                                திருநல்லூர் ஜல்லிக்கட்டு
                            </span>
                        ) : (
                            <div className="flex flex-col">
                                <span className="text-lg sm:text-xl font-bold text-thiru-gold leading-none">
                                    THIRUNALLUR
                                </span>
                                <span className="text-[10px] sm:text-xs text-red-500 font-semibold tracking-wider">
                                    JALLIKATTU
                                </span>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <div
                        className="hidden md:flex items-center gap-1 xl:gap-2"
                        onMouseLeave={() => setHoveredKey(null)}
                    >
                        {ALL_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            const isHighlighted = hoveredKey ? hoveredKey === item.key : isActive;
                            return (
                                <div
                                    key={item.key}
                                    className="relative"
                                    onMouseEnter={() => setHoveredKey(item.key)}
                                >
                                    {isHighlighted && (
                                        <motion.span
                                            layoutId="nav-active-pill"
                                            className="absolute inset-0 rounded-md bg-blue-900 border border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-0"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <Link
                                        to={item.path}
                                        className={clsx(
                                            "relative z-10 flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] lg:text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-colors duration-150",
                                            isHighlighted
                                                ? "text-white"
                                                : "bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400",
                                            lang === 'ta' && "font-tamil"
                                        )}
                                    >
                                        {Icon && <Icon size={12} className="lg:w-3.5 lg:h-3.5" />}
                                        {item.label[lang]}
                                    </Link>
                                </div>
                            );
                        })}

                        {user && (
                            <Link to="/profile" className="flex items-center gap-2 px-2 py-1 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors ml-2 border border-black/10 dark:border-white/20">
                                <img src={user.picture} alt="Profile" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                                <span className={clsx("text-xs font-bold text-zinc-800 dark:text-white hidden xl:block uppercase tracking-wider", lang === 'ta' && 'font-tamil')}>
                                    {user.name.split(' ')[0]}
                                </span>
                            </Link>
                        )}

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
                        className="md:hidden bg-zinc-950 border-b border-white/10 overflow-hidden relative z-50"
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
                            {user && (
                                <Link
                                    to="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-3 mt-4 rounded-md text-base font-medium border-t border-white/10 text-white bg-white/5"
                                >
                                    <img src={user.picture} alt="Profile" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                                    <span>{lang === 'ta' ? 'எனது கணக்கு' : 'My Profile'}</span>
                                </Link>
                            )}
                        </div>

                        {/* Social Links in Mobile Menu */}
                        <div className="border-t border-white/10 px-4 py-6">
                            <p className="text-zinc-500 text-xs uppercase tracking-widest text-center mb-4">Follow Us</p>
                            <div className="flex justify-center flex-wrap gap-4">
                                <div className="relative" ref={waRef}>
                                    <button
                                        onClick={toggleWaMenu}
                                        className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-green-500 hover:bg-green-900/20 transition-all border border-zinc-800 relative z-50"
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
                                                <a
                                                    href="https://chat.whatsapp.com/DGv7RbMGvfS2PjotbK8DE7"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={closeAllMenus}
                                                    className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white font-tamil whitespace-nowrap border-b border-white/5 last:border-0 text-center"
                                                >
                                                    மேலக்களம்
                                                </a>
                                                <a
                                                    href="https://chat.whatsapp.com/FKWs55T5jwOEYdJ1vY6fHF?mode=gi_t"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={closeAllMenus}
                                                    className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white font-tamil whitespace-nowrap text-center"
                                                >
                                                    களர்பட்டி
                                                </a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="relative" ref={instaRef}>
                                    <button
                                        onClick={toggleInstaMenu}
                                        className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-pink-500 hover:bg-pink-900/20 transition-all border border-zinc-800 relative z-50"
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
                                                <a
                                                    href="https://www.instagram.com/thennalur__mannu/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={closeAllMenus}
                                                    className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white font-tamil whitespace-nowrap border-b border-white/5 last:border-0 text-center"
                                                >
                                                    தென்னலூர் மண்ணு
                                                </a>
                                                <a
                                                    href="https://www.instagram.com/thennalur_seemai_/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={closeAllMenus}
                                                    className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white font-tamil whitespace-nowrap text-center"
                                                >
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
