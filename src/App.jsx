import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registration from './pages/Registration';
import BullGallery from './pages/BullGallery';
import LiveUpdates from './pages/LiveUpdates';
import Admin from './pages/Admin';
import ApplicationStatus from './pages/ApplicationStatus';

import ParticleBackground from './components/ParticleBackground';
import SocialLinks from './components/SocialLinks';
import Videos from './pages/Videos';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [lang, setLang] = useState('en');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-thiru-black text-black dark:text-white selection:bg-thiru-red selection:text-white font-sans relative transition-colors duration-300">
        <SocialLinks lang={lang} vertical={true} />
        <ParticleBackground />
        <div className="relative z-10">
          <Navbar lang={lang} setLang={setLang} />
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/book" element={<Registration lang={lang} />} />
            <Route path="/menu" element={<Menu lang={lang} />} />
            <Route path="/profile" element={<Profile lang={lang} />} />
            <Route path="/tracking" element={<ApplicationStatus lang={lang} />} />
            <Route path="/gallery" element={<BullGallery lang={lang} />} />
            <Route path="/videos" element={<Navigate to="/#videos" replace />} />
            <Route path="/live" element={<LiveUpdates lang={lang} />} />
            <Route path="/admin" element={<Admin lang={lang} />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}


export default App;
