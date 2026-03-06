import React, { useState } from 'react';
import { Lock, User, Check, X as XIcon, Search, UserPlus, LogIn } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_BOOKINGS = [];

export default function Admin({ lang }) {
    const [auth, setAuth] = useState(false);
    const [pin, setPin] = useState('');
    const [toggled, setToggled] = useState(false); // false = Login, true = Register
    const [regName, setRegName] = useState('');
    const [regPin, setRegPin] = useState('');
    const [regPin2, setRegPin2] = useState('');
    const [bookings, setBookings] = useState([]);
    const isEn = lang === 'en';

    React.useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('registrations') || '[]');
        setBookings(stored.reverse());
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') {
            setAuth(true);
        } else {
            alert('Invalid PIN (Try: 1234)');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!regName.trim()) return alert('Please enter a name.');
        if (regPin.length < 4) return alert('PIN must be 4 digits.');
        if (regPin !== regPin2) return alert('PINs do not match.');
        alert(`Organizer "${regName}" registered! (Demo only — use PIN 1234 to login)`);
        setToggled(false);
        setRegName(''); setRegPin(''); setRegPin2('');
    };

    if (!auth) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 pt-16"
                style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)' }}>

                {/* Outer card */}
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="auth-wrapper relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,200,220,0.15)] border border-cyan-900/30"
                    style={{ minHeight: '420px' }}
                >
                    <div className="flex h-full" style={{ minHeight: '420px' }}>

                        {/* ── WELCOME PANEL (teal gradient) ── */}
                        <AnimatePresence mode="wait">
                            {!toggled ? (
                                /* Login state: Welcome panel on RIGHT */
                                <motion.div
                                    key="welcome-login"
                                    initial={{ x: 60, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 60, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="hidden md:flex flex-col items-center justify-center flex-1 p-10 text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 40%, #023e8a 100%)',
                                        order: 2
                                    }}
                                >
                                    <div className="text-4xl font-black tracking-wide text-center leading-tight drop-shadow-lg">
                                        WELCOME<br />BACK!
                                    </div>
                                    <p className="mt-3 text-cyan-100/80 text-sm text-center">
                                        {isEn ? 'Login to manage your event' : 'நிகழ்வை நிர்வகிக்க உள்நுழைக'}
                                    </p>
                                </motion.div>
                            ) : (
                                /* Register state: Welcome panel on LEFT */
                                <motion.div
                                    key="welcome-register"
                                    initial={{ x: -60, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -60, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="hidden md:flex flex-col items-center justify-center flex-1 p-10 text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #023e8a 0%, #0077b6 60%, #00b4d8 100%)',
                                        order: 1
                                    }}
                                >
                                    <div className="text-4xl font-black tracking-wide text-center leading-tight drop-shadow-lg">
                                        WELCOME!
                                    </div>
                                    <p className="mt-3 text-cyan-100/80 text-sm text-center">
                                        {isEn ? 'Create an organizer account' : 'நிர்வாகி கணக்கு உருவாக்க'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div
                            className="flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-10"
                            style={{
                                background: '#0f1923',
                                order: !toggled ? 1 : 2
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {!toggled ? (
                                    /* LOGIN FORM */
                                    <motion.div
                                        key="form-login"
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -30, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                                    >
                                        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
                                        <form onSubmit={handleLogin} className="space-y-5">
                                            {/* Username field */}
                                            <div className="relative border-b border-zinc-600 focus-within:border-cyan-400 transition-colors">
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    className="w-full bg-transparent text-white placeholder-zinc-500 py-2 pr-8 outline-none text-sm"
                                                />
                                                <User size={16} className="absolute right-1 top-2.5 text-zinc-500" />
                                            </div>
                                            {/* PIN / Password field */}
                                            <div className="relative border-b border-zinc-600 focus-within:border-cyan-400 transition-colors">
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    value={pin}
                                                    onChange={(e) => setPin(e.target.value)}
                                                    className="w-full bg-transparent text-white placeholder-zinc-500 py-2 pr-8 outline-none text-sm"
                                                    maxLength={4}
                                                />
                                                <Lock size={16} className="absolute right-1 top-2.5 text-zinc-500" />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full py-2.5 rounded-full font-bold text-white text-sm tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
                                                style={{ background: 'linear-gradient(90deg, #00b4d8, #0077b6)' }}
                                            >
                                                Login
                                            </button>
                                            <p className="text-center text-zinc-500 text-xs">
                                                Don&apos;t have an account?{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => setToggled(true)}
                                                    className="register-trigger text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                                                >
                                                    Sign Up
                                                </button>
                                            </p>
                                        </form>
                                    </motion.div>
                                ) : (
                                    /* REGISTER FORM */
                                    <motion.div
                                        key="form-register"
                                        initial={{ x: 30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 30, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                                    >
                                        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
                                        <form onSubmit={handleRegister} className="space-y-4">
                                            {/* Username */}
                                            <div>
                                                <label className="text-xs text-zinc-400 mb-1 block">Username</label>
                                                <div className="relative border-b border-zinc-600 focus-within:border-cyan-400 transition-colors">
                                                    <input
                                                        type="text"
                                                        value={regName}
                                                        onChange={(e) => setRegName(e.target.value)}
                                                        className="w-full bg-transparent text-white py-2 pr-8 outline-none text-sm"
                                                    />
                                                    <User size={16} className="absolute right-1 top-2.5 text-zinc-500" />
                                                </div>
                                            </div>
                                            {/* Email */}
                                            <div>
                                                <label className="text-xs text-zinc-400 mb-1 block">Email</label>
                                                <div className="relative border-b border-zinc-600 focus-within:border-cyan-400 transition-colors">
                                                    <input
                                                        type="email"
                                                        className="w-full bg-transparent text-white py-2 pr-8 outline-none text-sm"
                                                    />
                                                    <svg className="absolute right-1 top-2.5 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                </div>
                                            </div>
                                            {/* Password / PIN */}
                                            <div>
                                                <label className="text-xs text-zinc-400 mb-1 block">Password</label>
                                                <div className="relative border-b border-zinc-600 focus-within:border-cyan-400 transition-colors">
                                                    <input
                                                        type="password"
                                                        value={regPin}
                                                        onChange={(e) => setRegPin(e.target.value)}
                                                        className="w-full bg-transparent text-white py-2 pr-8 outline-none text-sm"
                                                        maxLength={4}
                                                        placeholder="4-digit PIN"
                                                    />
                                                    <Lock size={16} className="absolute right-1 top-2.5 text-zinc-500" />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full py-2.5 rounded-full font-bold text-white text-sm tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
                                                style={{ background: 'linear-gradient(90deg, #00b4d8, #0077b6)' }}
                                            >
                                                Register
                                            </button>
                                            <p className="text-center text-zinc-500 text-xs">
                                                Already have an account?{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => setToggled(false)}
                                                    className="login-trigger text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                                                >
                                                    Sign In
                                                </button>
                                            </p>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </motion.div>

                <p className="absolute bottom-6 text-zinc-600 text-xs">
                    Thirunallur Jallikattu · Admin Portal
                </p>
            </div>
        );
    }

    const updateStatus = (id, newStatus) => {
        // Update Local State
        const updatedBookings = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
        setBookings(updatedBookings);

        // Update Local Storage
        const allRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        const updatedRegistrations = allRegistrations.map(r => r.id === id ? { ...r, status: newStatus } : r);
        localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
    };

    // Calculate Stats
    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'Submitted').length,
        approved: bookings.filter(b => b.status === 'Approved').length,
        rejected: bookings.filter(b => b.status === 'Rejected').length
    };


    return (
        <div className="min-h-screen bg-zinc-950 px-4 pt-24 pb-12">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{isEn ? 'Event Dashboard' : 'நிகழ்வு பலகை'}</h1>
                        <p className="text-zinc-400 text-sm">Welcome back, Organizer</p>
                    </div>
                    {/* Search Bar - Visual Only for now */}
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search Token/Owner"
                                className="bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-thiru-gold outline-none w-64"
                            />
                        </div>
                    </div>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Bookings', val: stats.total, color: 'text-white' },
                        { label: 'Pending', val: stats.pending, color: 'text-yellow-500' },
                        { label: 'Approved', val: stats.approved, color: 'text-green-500' },
                        { label: 'Rejected', val: stats.rejected, color: 'text-red-500' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-2">{stat.label}</p>
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-zinc-400">
                            <thead className="bg-zinc-950 text-xs uppercase font-bold text-zinc-500">
                                <tr>
                                    <th className="px-6 py-4">Token ID</th>
                                    <th className="px-6 py-4">Applicant</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-zinc-500">
                                            No registrations found.
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((b) => (
                                        <tr key={b.id} className="hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4 font-mono font-bold text-white">{b.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-white font-medium">{b.name}</div>
                                                <div className="text-xs uppercase text-zinc-500 flex items-center gap-1">
                                                    <span className={clsx("w-1.5 h-1.5 rounded-full", b.type === 'bull' ? "bg-thiru-gold" : "bg-thiru-red")} />
                                                    {b.type === 'bull' ? 'Bull Owner' : 'Tamer'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-mono">{b.mobile}</td>
                                            <td className="px-6 py-4">
                                                <span className={clsx(
                                                    "px-2 py-1 rounded text-xs font-bold uppercase border",
                                                    b.status === 'Approved' && "bg-green-900/20 text-green-400 border-green-900",
                                                    b.status === 'Rejected' && "bg-red-900/20 text-red-400 border-red-900",
                                                    b.status === 'Submitted' && "bg-yellow-900/20 text-yellow-400 border-yellow-900",
                                                )}>
                                                    {b.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {b.status === 'Submitted' && (
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => updateStatus(b.id, 'Approved')}
                                                            className="p-2 bg-green-900/20 hover:bg-green-500 hover:text-white text-green-500 border border-green-900/50 rounded transition-all"
                                                            title="Approve"
                                                        >
                                                            <Check size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(b.id, 'Rejected')}
                                                            className="p-2 bg-red-900/20 hover:bg-red-500 hover:text-white text-red-500 border border-red-900/50 rounded transition-all"
                                                            title="Reject"
                                                        >
                                                            <XIcon size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
