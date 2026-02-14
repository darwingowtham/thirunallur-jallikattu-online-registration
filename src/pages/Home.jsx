import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Ticket, Video, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LANG } from '../js/lang';
import clsx from 'clsx';
import VideoSection from '../components/VideoSection';
import ParticleBackground from '../components/ParticleBackground';
import ColorfulParticleBackground from '../components/ColorfulParticleBackground';

export default function Home({ lang }) {
    const t = LANG[lang];
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const elem = document.getElementById(location.hash.replace('#', ''));
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-[#0a0a0a] to-black">
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none z-0"></div>

                {/* Left Side Image - Temple 14 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute left-0 top-0 h-full w-1/3 z-0 pointer-events-none hidden md:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black z-10" />
                    <img
                        src="/images/temple_images/temple14.jpeg"
                        alt="Temple Left"
                        className="w-full h-full object-cover opacity-90"
                        style={{ maskImage: 'linear-gradient(to right, black 60%, transparent)', WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent)' }}
                    />
                </motion.div>

                {/* Right Side Image - Temple 8 */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute right-0 top-0 h-full w-1/3 z-0 pointer-events-none hidden md:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black z-10" />
                    <img
                        src="/images/temple_images/temple8.jpeg"
                        alt="Temple Right"
                        className="w-full h-full object-cover opacity-90"
                        style={{ maskImage: 'linear-gradient(to left, black 60%, transparent)', WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent)' }}
                    />
                </motion.div>

                {/* Parallax Background */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    <img
                        src="/images/temple_images/temple10.jpeg"
                        alt="Temple Background"
                        className="w-full h-full object-contain opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-thiru-black" />
                </motion.div>

                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <ParticleBackground />
                </div>

                {/* Content */}
                <div
                    className="relative z-10 text-center w-full px-4 mx-auto space-y-8 flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >

                        {/* Fallback color text-white added just in case background clip fails */}
                        <h1 className={clsx("font-black text-white drop-shadow-2xl mb-4 whitespace-nowrap w-full uppercase", lang === 'ta' ? "text-[4vw] md:text-[3.5vw] leading-tight font-tamil" : "text-[5vw] md:text-[4.5vw] lg:text-[4vw]")}>
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-yellow-600">
                                {t.title}
                            </span>
                        </h1>
                        <p className={clsx("text-xl md:text-2xl text-zinc-100 font-medium tracking-wide max-w-3xl mx-auto drop-shadow-md bg-black/30 p-2 rounded-lg backdrop-blur-sm", lang === 'ta' && 'font-tamil')}>
                            {t.subtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/book" className="group relative px-8 py-4 bg-thiru-red rounded-sm overflow-hidden shadow-[0_0_20px_rgba(185,28,28,0.5)]">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 transition-transform group-hover:scale-110" />
                            <span className={clsx("relative z-10 font-bold text-white flex items-center justify-center gap-2 uppercase tracking-widest", lang === 'ta' && 'font-tamil')}>
                                <Ticket size={20} /> {t.heroBtn}
                            </span>
                        </Link>
                        <Link to="/live" className="group px-8 py-4 border border-thiru-gold text-thiru-gold rounded-sm hover:bg-thiru-gold/10 transition-colors bg-black/40 backdrop-blur-sm">
                            <span className={clsx("font-bold flex items-center justify-center gap-2 uppercase tracking-widest", lang === 'ta' && 'font-tamil')}>
                                <Video size={20} /> {t.heroSec}
                            </span>
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute bottom-10 z-20 text-white/50 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll Down</span>
                    <ChevronRight className="rotate-90 w-6 h-6" />
                </motion.div>
            </div>

            {/* Intro Section */}
            <section className="relative z-20 py-20 px-6 bg-white dark:bg-thiru-black transition-colors duration-300 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-50">
                    <ColorfulParticleBackground />
                </div>
                <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className={clsx("text-4xl font-bold text-thiru-gold", lang === 'ta' && 'font-tamil')}>
                            {t.about.title}
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-thiru-red to-transparent rounded-full" />
                        <p className={clsx("text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed", lang === 'ta' && 'font-tamil')}>
                            {t.about.desc}
                        </p>

                        <div className="bg-gradient-to-r from-thiru-red/10 to-transparent border-l-4 border-thiru-red p-4 rounded-r-lg my-6">
                            <p className={clsx("text-xl font-bold text-black dark:text-white italic", lang === 'ta' && 'font-tamil')}>
                                {lang === 'en'
                                    ? "Thirunallur is the only place in the world where bulls are released through seven vadivasal."
                                    : "உலகிலேயே ஏழு வாடிவாசல்கள் வழியாக காளைகள் அவிழ்த்துவிடப்படும் ஒரே இடம் திருநல்லூர்."}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 text-zinc-500 font-medium">
                            <MapPin className="text-thiru-red" />
                            <span className={clsx("whitespace-pre-line", lang === 'ta' && 'font-tamil')}>{t.about.loc}</span>
                        </div>

                        <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 mt-6 relative z-10">
                            <iframe
                                src="https://maps.google.com/maps?q=HJV4%2BFWR&t=&z=15&ie=UTF8&iwloc=near&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Thirunallur Temple Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Countdown Card */}
                    <motion.div
                        initial={{ rotate: 3, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-zinc-900 to-black p-1 rounded-2xl border border-white/10 shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-thiru-gold/5 rounded-2xl" />
                        <div className="relative bg-black/80 backdrop-blur rounded-xl flex items-center justify-center h-80 overflow-hidden">
                            <img
                                src="/images/Bulls_Images/logo.png"
                                alt="Thirunallur Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <VideoSection lang={lang} />
        </div >
    );
}
