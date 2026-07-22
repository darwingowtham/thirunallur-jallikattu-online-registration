import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const YellowParticleBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = useMemo(() => {
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
                    grab: {
                        distance: 200,
                        links: { opacity: 1, color: "#FACC15" }
                    }
                },
            },
            particles: {
                color: {
                    value: ["#FFFF00", "#FACC15", "#EAB308", "#CA8A04"], // Pure vibrant yellow palette
                    animation: {
                        enable: true,
                        speed: 15,
                        sync: false
                    }
                },
                links: {
                    color: "#FACC15", // Bright Yellow
                    distance: 120,
                    enable: true,
                    opacity: 0.6,
                    width: 2,
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
                    value: 120, // High density for a rich effect
                },
                opacity: {
                    value: 0.9,
                    animation: { enable: true, speed: 1, minimumValue: 0.5 }
                },
                shape: { type: "circle" },
                size: {
                    value: { min: 2, max: 6 },
                    animation: { enable: true, speed: 2, minimumValue: 1 }
                },
            },
            detectRetina: true,
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-auto">
            <Particles
                id="yellow-particles"
                init={particlesInit}
                className="w-full h-full"
                options={options}
            />
        </div>
    );
};

export default YellowParticleBackground;
