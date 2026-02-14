import React, { useState } from 'react';
import { Lock, User, Check, X as XIcon, Search, Filter } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const MOCK_BOOKINGS = [];

export default function Admin({ lang }) {
    const [auth, setAuth] = useState(false);
    const [pin, setPin] = useState('');
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

    if (!auth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 pt-20">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-2xl max-w-sm w-full"
                >
                    <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-900/50">
                        <Lock className="text-red-500 w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white text-center mb-6">{isEn ? 'Organizer Login' : 'நிர்வாகி புகுபதிகை'}</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                placeholder="Enter PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white text-center tracking-[0.5em] text-2xl focus:border-thiru-gold outline-none"
                                maxLength={4}
                            />
                        </div>
                        <button className="w-full bg-thiru-red hover:bg-red-800 text-white font-bold py-3 rounded-lg transition-colors">
                            {isEn ? 'Login' : 'உள்நுழைய'}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

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
