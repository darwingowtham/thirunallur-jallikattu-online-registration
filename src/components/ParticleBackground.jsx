import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useLocation } from "react-router-dom";

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const location = useLocation();

    const options = useMemo(() => {
        const path = location.pathname;

        // Configuration for text-heavy or form pages (Registration, Admin, Tracking, Live)
        const isMinimalPage = ['/book', '/tracking', '/admin', '/live'].includes(path);

        // Configuration for media-heavy pages (Gallery, Videos)
        const isMediaPage = ['/gallery', '/videos'].includes(path);

        if (isMinimalPage) {
            return {
                fullScreen: { enable: false },
                background: { color: { value: "transparent" } },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: "push" },
                        onHover: { enable: true, mode: "repulse" },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 2 },
                        repulse: { distance: 100, duration: 0.4 },
                    },
                },
                particles: {
                    color: { value: ["#7F1D1D", "#A16207"] }, // Darker Red (900) & Darker Gold (700)
                    links: { enable: false }, // No connecting lines for cleaner look
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: { default: "bounce" },
                        random: true,
                        speed: 0.5, // Slower movement
                        straight: false,
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 30, // Fewer particles
                    },
                    opacity: { value: 0.6 }, // Increased opacity for visibility of dark colors
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
            };
        }

        if (isMediaPage) {
            return {
                fullScreen: { enable: false },
                background: { color: { value: "transparent" } },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: "push" },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 4 },
                    },
                },
                particles: {
                    color: { value: "#A16207" }, // Dark Gold (700)
                    links: {
                        color: "#A16207",
                        distance: 150,
                        enable: true,
                        opacity: 0.3, // Slightly more visible
                        width: 2, // Enlarged width
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: { default: "bounce" },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 50,
                    },
                    opacity: { value: 0.5 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 4 } },
                },
                detectRetina: true,
            };
        }

        // Default Configuration (Home, Menu) - High Energy
        return {
            fullScreen: { enable: false },
            background: {
                color: { value: "transparent" },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: { enable: true, mode: "push" },
                    onHover: { enable: true, mode: "grab" },
                    resize: true,
                },
                modes: {
                    push: { quantity: 4 },
                    grab: { distance: 140, links: { opacity: 1 } }
                },
            },
            particles: {
                color: {
                    value: ["#991B1B", "#7F1D1D", "#CA8A04", "#A16207", "#EAB308"], // Rich Theme Palette
                    animation: {
                        enable: true,
                        speed: 20,
                        sync: true
                    }
                },
                links: {
                    color: "#A16207", // Dark Gold (700) - Darker
                    distance: 150,
                    enable: true,
                    opacity: 0.5, // More visible
                    width: 2, // Enlarged width
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 100,
                },
                opacity: { value: 0.8 },
                shape: { type: "circle" },
                size: { value: { min: 2, max: 6 } },
            },
            detectRetina: true,
        };
    }, [location.pathname]);

    return (
        <div className="fixed inset-0 -z-0 pointer-events-none">
            <Particles
                id="tsparticles"
                init={particlesInit}
                className="w-full h-full"
                options={options}
            />
        </div>
    );
};

export default ParticleBackground;
