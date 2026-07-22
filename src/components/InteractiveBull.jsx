import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function InteractiveBull({ imageSrc }) {
    const [isGoring, setIsGoring] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 70 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const x = useTransform(smoothX, [-1, 1], [-30, 30]);
    const y = useTransform(smoothY, [-1, 1], [-30, 30]);
    const rotateX = useTransform(smoothY, [-1, 1], [10, -10]);
    const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);

    const handleGore = useCallback(() => {
        if (isGoring) return;
        setIsGoring(true);
        setTimeout(() => setIsGoring(false), 800);
    }, [isGoring]);

    useEffect(() => {
        const interval = setInterval(() => {
            // 40% chance every 4 seconds to autonomously gore
            if (Math.random() > 0.6) {
                handleGore();
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [handleGore]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const normalizedX = (e.clientX / innerWidth) * 2 - 1;
            const normalizedY = (e.clientY / innerHeight) * 2 - 1;
            mouseX.set(normalizedX);
            mouseY.set(normalizedY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ perspective: '1200px', zIndex: 1 }}>
            {/* Floating Animation Wrapper */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center"
            >
                {/* 3D Parallax Image */}
                <motion.img
                    src={imageSrc}
                    alt="Interactive Bull"
                    className="w-[85vw] sm:w-[60vw] max-w-[700px] h-auto object-contain pointer-events-auto cursor-pointer origin-bottom"
                    style={{
                        x, y, rotateX, rotateY,
                        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.7))',
                        transformStyle: 'preserve-3d'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isGoring ? {
                        opacity: 1,
                        rotateX: [0, -35, 15, 0],
                        rotateY: [0, -15, 5, 0],
                        y: [0, -60, 20, 0],
                        x: [0, -30, 10, 0],
                        scale: [1, 1.2, 0.9, 1],
                        transition: { duration: 0.6, ease: "easeOut" }
                    } : { opacity: 0.85, scale: 1 }}
                    whileHover={!isGoring ? {
                        scale: 1.05,
                        opacity: 1,
                        filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.2))'
                    } : undefined}
                    onClick={handleGore}
                />
            </motion.div>
        </div>
    );
}
