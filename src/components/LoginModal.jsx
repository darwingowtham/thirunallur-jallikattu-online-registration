import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, User, LogIn } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

export default function LoginModal({ isOpen, onClose, lang = 'en' }) {
    const { login } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const isEn = lang === 'en';

    const handleGoogleSuccess = (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            login({
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture,
                id: decoded.sub,
                authMethod: 'google'
            });
            onClose();
        } catch (err) {
            setError(isEn ? 'Google sign-in failed' : 'கூகிள் உள்நுழைவு தோல்வியடைந்தது');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError(isEn ? 'Please fill in all fields' : 'அனைத்து புலங்களையும் நிரப்பவும்');
            return;
        }

        login({
            name: formData.name || formData.email.split('@')[0],
            email: formData.email,
            picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
            authMethod: 'email'
        });
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden transition-colors duration-200"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors touch-target"
                    >
                        <X size={20} />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                            <User className="text-amber-600 dark:text-thiru-gold" size={24} />
                        </div>
                        <h2 className={clsx("text-2xl font-bold text-zinc-900 dark:text-white", !isEn && 'font-tamil')}>
                            {isSignUp
                                ? (isEn ? 'Create Account' : 'கணக்கை உருவாக்கவும்')
                                : (isEn ? 'Welcome Back' : 'மீண்டும் வருக')}
                        </h2>
                        <p className={clsx("text-sm text-zinc-600 dark:text-zinc-400 mt-1", !isEn && 'font-tamil')}>
                            {isEn ? 'Sign in to access your Jallikattu registrations' : 'உங்கள் விண்ணப்பங்களை அணுக உள்நுழையவும்'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-900/20 dark:bg-red-900/30 border border-red-300 dark:border-red-800/50 rounded-lg text-red-700 dark:text-red-300 text-xs sm:text-sm text-center space-y-1">
                            <p className="font-semibold">{error}</p>
                            {error.includes('Google') && (
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                    {isEn
                                        ? "Tip: Check that your current domain is listed in Authorized JavaScript Origins in Google Cloud Console, or use email login below."
                                        : "குறிப்பு: உங்கள் கூகிள் கிளவுட் அமைப்புகளில் Authorized Origin சரியாக உள்ளதா என சரிபார்க்கவும், அல்லது மின்னஞ்சல் மூலம் உள்நுழையவும்."}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Google Login Section */}
                    <div className="mb-6 flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                                console.error("[Google OAuth] Sign-In failed. Verify Authorized JavaScript Origins for", window.location.origin);
                                setError(isEn ? 'Google Sign-In failed (Origin mismatch or network issue)' : 'கூகிள் உள்நுழைவு தோல்வி (Origin mismatch)');
                            }}
                            theme="filled_black"
                            shape="pill"
                            text="continue_with"
                        />
                    </div>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
                        <span className="bg-white dark:bg-zinc-950 px-3 text-xs uppercase text-zinc-500 font-medium absolute">
                            {isEn ? 'or email' : 'அல்லது மின்னஞ்சல்'}
                        </span>
                    </div>

                    {/* Standard Email/Password Form */}
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {isSignUp && (
                            <div>
                                <label className="block text-xs font-medium uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                                    {isEn ? 'Full Name' : 'முழு பெயர்'}
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder={isEn ? 'John Doe' : 'உங்கள் பெயர்'}
                                        className="w-full min-h-[44px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-thiru-gold outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                                {isEn ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="user@example.com"
                                    className="w-full min-h-[44px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-thiru-gold outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                                {isEn ? 'Password' : 'கடவுச்சொல்'}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full min-h-[44px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg py-2.5 pl-10 pr-10 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-thiru-gold outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 touch-target flex items-center justify-center"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full min-h-[44px] bg-thiru-red hover:bg-red-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors touch-target shadow-lg shadow-red-900/30"
                        >
                            <LogIn size={18} />
                            <span>{isSignUp ? (isEn ? 'Register' : 'பதிவு செய்') : (isEn ? 'Sign In' : 'உள்நுழைய')}</span>
                        </button>
                    </form>

                    {/* Toggle Login / Signup */}
                    <div className="mt-6 text-center text-xs text-zinc-400">
                        <span>
                            {isSignUp
                                ? (isEn ? 'Already have an account?' : 'ஏற்கனவே கணக்கு உள்ளதா?')
                                : (isEn ? "Don't have an account?" : 'கணக்கு இல்லையா?')}
                        </span>
                        <button
                            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                            className="ml-2 text-thiru-gold hover:underline font-bold"
                        >
                            {isSignUp ? (isEn ? 'Sign In' : 'உள்நுழைய') : (isEn ? 'Sign Up' : 'பதிவு செய்ய')}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
