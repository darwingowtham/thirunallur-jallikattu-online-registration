import React from 'react';
import LoginModal from '../components/LoginModal';
import { useNavigate } from 'react-router-dom';

export default function Login({ lang = 'en' }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <LoginModal isOpen={true} onClose={() => navigate(-1)} lang={lang} />
        </div>
    );
}
