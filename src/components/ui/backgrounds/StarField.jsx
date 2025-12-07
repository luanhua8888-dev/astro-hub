'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

// Simplified StarField for maximum performance and clean aesthetics
export const StarField = () => {
    useEffect(() => {
        const canvas = document.getElementById('starfield-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let stars = [];

        const initStars = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const numStars = 200; // Optimal density
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5 + 0.5, // Smaller, sharper stars
                    speed: Math.random() * 0.2 + 0.05, // Very slow drift
                    opacity: Math.random(),
                    twinkleDir: Math.random() > 0.5 ? 0.01 : -0.01
                });
            }
        };

        // Handle resize
        window.addEventListener('resize', initStars);
        initStars();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Batch drawing settings
            ctx.fillStyle = "white";

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];

                // Simple vertical drift
                star.y -= star.speed;
                // Wrap around
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }

                // Smooth Twinkle
                star.opacity += star.twinkleDir;
                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.twinkleDir *= -1;
                }

                // Draw
                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', initStars);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            id="starfield-canvas"
            className="absolute inset-0 z-0 pointer-events-none opacity-60"
        />
    );
};



export const ShootingStar = ({ delay = 0 }) => {
    // Generate random starting position
    const top = Math.floor(Math.random() * 30) + "%";
    const left = Math.floor(Math.random() * 50) + 50 + "%";

    return (
        <motion.div
            initial={{
                top: top,
                left: left,
                opacity: 0,
                scale: 0.5,
                translateX: 0,
                translateY: 0,
            }}
            animate={{
                opacity: [0, 1, 0],
                translateX: -800, // Move left
                translateY: 800,  // Move down
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: delay,
                repeatDelay: Math.random() * 15 + 10, // Random delay between shots
                ease: "easeOut"
            }}
            className="absolute z-0 h-[2px] w-[100px] bg-gradient-to-l from-white to-transparent rotate-[-45deg]"
            style={{
                boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.4)"
            }}
        />
    );
};
