import React, { useState } from 'react';
import { Search, FileText, CheckCircle, XCircle, Clock, Smartphone } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import templeImg from '../assets/temple/amman_temple.jpeg';

export default function ApplicationStatus({ lang }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');


    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setResult(null);


        if (!searchQuery.trim()) {
            setError(lang === 'ta' ? 'தயவுசெய்து எண்ணை உள்ளிடவும்' : 'Please enter a valid number');
            return;
        }

        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');

        // Search by ID or Mobile
        const found = registrations.find(r =>
            r.id.toLowerCase() === searchQuery.toLowerCase() ||
            r.mobile === searchQuery
        );

        if (found) {
            setResult(found);
        } else {
            setError(lang === 'ta' ? 'விண்ணப்பம் காணப்படவில்லை' : 'Application not found');
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12">
            {/* Hero Section */}
            <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src={templeImg}
                        alt="Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-thiru-black/80 via-thiru-black/50 to-thiru-black" />
                </div>

                <div className="relative z-10 text-center px-4 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className={clsx("text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-thiru-gold to-thiru-red mb-4 drop-shadow-lg", lang === 'ta' && 'font-tamil')}>
                            {lang === 'ta' ? 'விண்ணப்ப நிலை' : 'Application Status'}
                        </h1>
                        <p className={clsx("text-xl text-zinc-300", lang === 'ta' && 'font-tamil')}>
                            {lang === 'ta' ? 'உங்கள் விண்ணப்ப எண்ணை சரிபார்க்கவும்' : 'Track your Jallikattu Registration'}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Search Section */}
            <div className="max-w-xl mx-auto px-4 -mt-20 relative z-20">
                <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 p-6 rounded-2xl shadow-xl">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={lang === 'ta' ? 'விண்ணப்ப எண் / கைபேசி எண்' : 'Enter Application ID or Mobile Number'}
                                className={clsx("w-full bg-black/50 border border-zinc-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-thiru-gold outline-none", lang === 'ta' && 'font-tamil')}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        </div>
                        <button type="submit" className={clsx("bg-thiru-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors", lang === 'ta' && 'font-tamil')}>
                            {lang === 'ta' ? 'தேடு' : 'Check'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-2xl mx-auto px-4 mt-12">
                <AnimatePresence mode='wait'>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center"
                        >
                            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                            <p className={clsx("text-red-300 text-lg", lang === 'ta' && 'font-tamil')}>{error}</p>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-zinc-900/50 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl"
                        >
                            {/* Header */}
                            <div className="bg-zinc-800/50 p-6 border-b border-zinc-700 flex justify-between items-start">
                                <div>
                                    <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">Application ID</span>
                                    <h3 className="text-2xl font-mono font-bold text-thiru-gold">{result.id}</h3>
                                </div>
                                <div className={clsx(
                                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5",
                                    result.status === 'Submitted' ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30" :
                                        result.status === 'Approved' ? "bg-green-900/30 text-green-400 border border-green-500/30" :
                                            "bg-red-900/30 text-red-400 border border-red-500/30"
                                )}>
                                    {result.status}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs uppercase text-zinc-500 block mb-1">Applicant Name</label>
                                    <p className="text-lg font-bold text-white">{result.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs uppercase text-zinc-500 block mb-1">Mobile Number</label>
                                    <p className="text-lg text-zinc-300 font-mono">{result.mobile}</p>
                                </div>
                                <div>
                                    <label className="text-xs uppercase text-zinc-500 block mb-1">Category</label>
                                    <div className="flex items-center gap-2">
                                        <span className={clsx("w-2 h-2 rounded-full", result.type === 'bull' ? "bg-thiru-gold" : "bg-thiru-red")} />
                                        <p className="text-white capitalize">{result.type === 'bull' ? 'Bull Owner' : 'Bull Tamer'}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase text-zinc-500 block mb-1">Applied On</label>
                                    <div className="flex items-center gap-2 text-zinc-300">
                                        <Clock size={14} />
                                        <span>{new Date(result.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-2 pt-4 border-t border-zinc-800">
                                    <div className="flex items-center justify-between text-sm text-zinc-400">
                                        <span>District: <span className="text-white">{result.district}</span></span>
                                        <span>Village: <span className="text-white">{result.village}</span></span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
