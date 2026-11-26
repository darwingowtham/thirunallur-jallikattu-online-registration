import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, AlertCircle } from 'lucide-react';

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * (watch, embed, short link, live stream)
 */
export function getYouTubeEmbedUrl(url) {
    if (!url || url === '#' || typeof url !== 'string') return null;

    // Already an embed URL
    if (url.includes('youtube.com/embed/')) {
        const idPart = url.split('youtube.com/embed/')[1].split('?')[0].split('&')[0];
        return `https://www.youtube.com/embed/${idPart}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    }

    let videoId = '';

    // youtu.be/VIDEO_ID
    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
    }
    // youtube.com/live/VIDEO_ID
    else if (url.includes('youtube.com/live/')) {
        videoId = url.split('youtube.com/live/')[1].split('?')[0].split('&')[0];
    }
    // youtube.com/watch?v=VIDEO_ID or m.youtube.com
    else if (url.includes('v=')) {
        const match = url.match(/[?&]v=([^&]+)/);
        if (match && match[1]) {
            videoId = match[1];
        }
    }
    // Direct ID passed
    else if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        videoId = url.trim();
    }

    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    }

    return null;
}

export default function VideoModal({ isOpen, onClose, video }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !video) return null;

    const embedUrl = getYouTubeEmbedUrl(video.url || video.embedUrl);

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="video-modal-title"
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 15 }}
                    transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
                    className="relative z-10 w-full max-w-5xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/90">
                        <div className="flex items-center gap-2.5 overflow-hidden mr-3">
                            <span className="p-1.5 rounded-md bg-thiru-red/15 text-thiru-red">
                                <Play size={16} className="fill-thiru-red" />
                            </span>
                            <h3
                                id="video-modal-title"
                                className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white truncate max-w-lg"
                            >
                                {video.title || 'Video Player'}
                            </h3>
                            {video.badge && (
                                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-thiru-gold border border-amber-500/30 dark:border-thiru-gold/30">
                                    {video.badge}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors touch-target flex items-center justify-center"
                            aria-label="Close video player"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* 16:9 Video Container */}
                    <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                title={video.title || 'YouTube video player'}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : (
                            <div className="p-8 text-center text-zinc-400 space-y-3">
                                <AlertCircle size={36} className="mx-auto text-amber-500" />
                                <p className="text-base font-semibold text-white">Video Stream Unavailable</p>
                                <p className="text-xs text-zinc-400 max-w-sm">
                                    The stream or video link could not be embedded directly. Please check back when the broadcast starts.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer Info if available */}
                    {video.description && (
                        <div className="px-4 sm:px-6 py-3 bg-zinc-50 dark:bg-zinc-900/50 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-white/5">
                            <p>{video.description}</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
