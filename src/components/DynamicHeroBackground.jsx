import React from 'react';
import { motion } from 'framer-motion';

export default function DynamicHeroBackground() {
    return (
        <div
            className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none z-0"
            style={{ perspective: '1200px' }}
        >
            {/* Ambient glowing core behind the rings */}
            <div className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-thiru-gold/20 rounded-full blur-[100px] sm:blur-[140px]" />
            <div className="absolute w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-thiru-red/10 rounded-full blur-[120px] sm:blur-[160px]" />

            {/* 3D Ring System Layer */}
            <div
                className="relative w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Ring 1 - Outer Gold */}
                <motion.div
                    className="absolute inset-0 border-[1px] border-thiru-gold/20 rounded-full border-t-thiru-gold/60 border-b-thiru-red/60 mix-blend-screen"
                    animate={{
                        rotateX: [60, 60, 60],
                        rotateY: [0, 180, 360],
                        rotateZ: [0, 90, 180, 270, 360]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                {/* Ring 2 - Inner Red */}
                <motion.div
                    className="absolute inset-6 sm:inset-16 border-[2px] border-thiru-red/10 rounded-full border-l-thiru-red/70 border-r-thiru-gold/80"
                    animate={{
                        rotateX: [70, 70, 70],
                        rotateY: [360, 180, 0],
                        rotateZ: [360, 270, 180, 90, 0]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                {/* Ring 3 - Middle White/Silver accent */}
                <motion.div
                    className="absolute inset-12 sm:inset-32 border-[1px] border-white/5 rounded-full border-t-white/30 border-b-white/10"
                    animate={{
                        rotateX: [55, 55, 55],
                        rotateY: [180, 360, 540],
                        rotateZ: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                {/* Ring 4 - Deep Core Gold */}
                <motion.div
                    className="absolute inset-20 sm:inset-48 border-[3px] border-transparent rounded-full border-r-thiru-gold/90 border-l-thiru-red/90 shadow-[0_0_40px_rgba(212,175,55,0.4)] mix-blend-lighten"
                    animate={{
                        rotateX: [80, 80, 80],
                        rotateY: [0, 180, 360],
                        rotateZ: [360, 180, 0]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                {/* Additional floating light orbs inside the 3D space */}
                <motion.div
                    className="absolute w-3 h-3 bg-thiru-gold rounded-full blur-[2px]"
                    animate={{
                        rotateY: [0, 360],
                        rotateZ: [0, -360],
                        z: [-200, 200, -200],
                        x: [-100, 100, -100]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                <motion.div
                    className="absolute w-4 h-4 bg-thiru-red rounded-full blur-[4px]"
                    animate={{
                        rotateY: [360, 0],
                        rotateX: [0, 360],
                        z: [200, -200, 200],
                        y: [-150, 150, -150]
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                />
            </div>
        </div>
    );
}
