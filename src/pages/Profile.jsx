import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { LogOut, User, FileText, ChevronRight } from 'lucide-react';
import templeImg from '../assets/temple/amman_temple.jpeg';

export default function Profile({ lang }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        if (user) {
            const allRegs = JSON.parse(localStorage.getItem('registrations') || '[]');
            setRegistrations(allRegs);
        }
    }, [user]);

    if (!user) {
        return <Navigate to="/book" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="pt-24 pb-12 px-4 min-h-screen flex flex-col items-center bg-fixed bg-cover relative" style={{ backgroundImage: `url("${templeImg}")` }}>
            <div className="absolute inset-0 bg-thiru-black/90 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-3xl">
                <div className="bg-zinc-950/80 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-md text-white text-center mb-8">
                    <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-thiru-gold" referrerPolicy="no-referrer" />
                    <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                    <p className="text-zinc-400 mb-6">{user.email}</p>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600/20 hover:bg-red-600/40 text-red-500 hover:text-red-400 border border-red-500/50 px-6 py-2 rounded-full font-bold flex items-center justify-center gap-2 mx-auto transition-colors"
                    >
                        <LogOut size={18} /> {lang === 'ta' ? 'வெளியேறு' : 'Logout'}
                    </button>
                </div>

                <div className="bg-zinc-950/80 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-thiru-gold mb-6 border-b border-zinc-800 pb-2 flex items-center gap-2">
                        <FileText size={24} /> {lang === 'ta' ? 'என் பதிவுகள்' : 'My Registrations'}
                    </h3>

                    {registrations.length === 0 ? (
                        <div className="text-center py-8 text-zinc-500">
                            <p>{lang === 'ta' ? 'தேடல்கள் எதுவும் இல்லை' : 'No registrations found.'}</p>
                            <button onClick={() => navigate('/book')} className="mt-4 text-thiru-gold hover:text-white underline">
                                {lang === 'ta' ? 'புதிய பதிவு செய்க' : 'Create New Registration'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {registrations.map((reg) => (
                                <div key={reg.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:border-thiru-gold/50 transition-colors cursor-pointer" onClick={() => navigate('/tracking')}>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-zinc-800 text-xs px-2 py-0.5 rounded text-white font-mono">{reg.id}</span>
                                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${reg.type === 'bull' ? 'bg-yellow-900/50 text-yellow-500' : 'bg-red-900/50 text-red-500'}`}>
                                                {reg.type}
                                            </span>
                                        </div>
                                        <p className="font-bold text-white">{reg.name}</p>
                                        <p className="text-sm text-zinc-400">{reg.district}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-bold text-blue-400 mb-2">{reg.status}</span>
                                        <ChevronRight className="text-zinc-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
