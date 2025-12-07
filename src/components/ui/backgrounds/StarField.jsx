'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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



export const ShootingStars = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const createStar = () => {
            const id = Date.now();
            const top = Math.random() * 40 + "%"; // Top 40%
            const left = Math.random() * 30 + 50 + "%"; // Right side
            const duration = Math.random() * 1.5 + 1;
            const delay = Math.random() * 4000 + 2000; // 2-6s delay

            setStars(prev => [...prev, { id, top, left, duration }]);

            setTimeout(() => {
                setStars(prev => prev.filter(s => s.id !== id));
            }, duration * 1000);

            // Schedule next star
            setTimeout(createStar, delay);
        };

        // Start loop
        const initialTimeout = setTimeout(createStar, 1000);

        return () => clearTimeout(initialTimeout);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <AnimatePresence>
                {stars.map(star => (
                    <motion.div
                        key={star.id}
                        initial={{
                            top: star.top,
                            left: star.left,
                            rotate: -45,
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            y: 0
                        }}
                        animate={{
                            x: -800, // Move Left
                            y: 800,  // Move Down
                            opacity: [0, 1, 1, 0], // Fate in, stay, fade out
                        }}
                        transition={{
                            duration: star.duration,
                            ease: "easeOut",
                        }}
                        className="absolute h-[2px] w-[120px] bg-gradient-to-l from-white via-slate-200 to-transparent shadow-[0_0_20px_2px_rgba(255,255,255,0.5)]"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
