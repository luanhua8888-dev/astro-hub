'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Zodiac symbols
const zodiacSymbols = {
    'Aries': '♈',
    'Taurus': '♉',
    'Gemini': '♊',
    'Cancer': '♋',
    'Leo': '♌',
    'Virgo': '♍',
    'Libra': '♎',
    'Scorpio': '♏',
    'Sagittarius': '♐',
    'Capricorn': '♑',
    'Aquarius': '♒',
    'Pisces': '♓',
};

// Planet symbols
const planetSymbols = {
    Sun: '☉',
    Moon: '☽',
    Mercury: '☿',
    Venus: '♀',
    Mars: '♂',
    Jupiter: '♃',
    Saturn: '♄',
    Uranus: '♅',
    Neptune: '♆',
    Pluto: '♇',
};

// Planet colors
const planetColors = {
    Sun: '#fbbf24',
    Moon: '#93c5fd',
    Mercury: '#9ca3af',
    Venus: '#f472b6',
    Mars: '#ef4444',
    Jupiter: '#fb923c',
    Saturn: '#eab308',
    Uranus: '#22d3ee',
    Neptune: '#6366f1',
    Pluto: '#a855f7',
};

// Zodiac signs in order
const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const ChartCanvas = ({ positions }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!positions || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const size = Math.min(canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = size * 0.35;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background gradient
        const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
        bgGradient.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
        bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw outer circle (zodiac wheel)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw zodiac divisions and symbols
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        zodiacSigns.forEach((sign, index) => {
            const startAngle = (index * 30 - 90) * (Math.PI / 180);
            const midAngle = (index * 30 + 15 - 90) * (Math.PI / 180);

            // Draw division lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(
                centerX + radius * 0.85 * Math.cos(startAngle),
                centerY + radius * 0.85 * Math.sin(startAngle)
            );
            ctx.lineTo(
                centerX + radius * Math.cos(startAngle),
                centerY + radius * Math.sin(startAngle)
            );
            ctx.stroke();

            // Draw zodiac symbol
            const symbolRadius = radius * 0.92;
            const symbolX = centerX + symbolRadius * Math.cos(midAngle);
            const symbolY = centerY + symbolRadius * Math.sin(midAngle);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillText(zodiacSymbols[sign], symbolX, symbolY);
        });

        // Draw inner circle (house wheel)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.75, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw house divisions (12 houses)
        ctx.font = 'bold 16px Arial';
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * (Math.PI / 180);

            // Draw house line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = i % 3 === 0 ? 2 : 1;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + radius * 0.75 * Math.cos(angle),
                centerY + radius * 0.75 * Math.sin(angle)
            );
            ctx.stroke();

            // Draw house number
            const houseRadius = radius * 0.65;
            const houseAngle = angle + (15 * Math.PI / 180);
            const houseX = centerX + houseRadius * Math.cos(houseAngle);
            const houseY = centerY + houseRadius * Math.sin(houseAngle);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillText((i + 1).toString(), houseX, houseY);
        }

        // Draw planets
        ctx.font = 'bold 20px Arial';
        Object.entries(positions).forEach(([planet, data]) => {
            const angle = (data.degree - 90) * (Math.PI / 180);
            const planetRadius = radius * 0.80;
            const x = centerX + planetRadius * Math.cos(angle);
            const y = centerY + planetRadius * Math.sin(angle);

            // Get planet color with fallback
            const color = planetColors[planet] || '#ffffff';

            // Planet glow
            const glow = ctx.createRadialGradient(x, y, 0, x, y, 15);
            glow.addColorStop(0, color);
            glow.addColorStop(0.5, color + '60');
            glow.addColorStop(1, 'transparent');

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, 2 * Math.PI);
            ctx.fill();

            // Planet symbol
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(planetSymbols[planet] || planet[0], x, y);

            // Planet degree label
            ctx.font = 'bold 11px Arial';
            const labelAngle = angle;
            const labelRadius = radius * 0.95;
            const labelX = centerX + labelRadius * Math.cos(labelAngle);
            const labelY = centerY + labelRadius * Math.sin(labelAngle);

            const degrees = Math.floor(data.degree % 30);
            const minutes = Math.floor((data.degree % 1) * 60);
            const degreeText = `${degrees}°${minutes}'`;

            // Background for label
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            const textWidth = ctx.measureText(degreeText).width;
            ctx.fillRect(labelX - textWidth / 2 - 3, labelY - 7, textWidth + 6, 14);

            // Label text
            ctx.fillStyle = color;
            ctx.fillText(degreeText, labelX, labelY);

            // Reset font
            ctx.font = 'bold 20px Arial';
        });

        // Draw center point
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
        ctx.fill();

        // Draw AC and MC markers
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#ffffff';

        // AC (Ascendant) at 9 o'clock
        const acX = centerX - radius * 1.1;
        const acY = centerY;
        ctx.fillText('AC', acX, acY);

        // MC (Midheaven) at 12 o'clock
        const mcX = centerX;
        const mcY = centerY - radius * 1.1;
        ctx.fillText('MC', mcX, mcY);

    }, [positions]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center"
        >
            <canvas
                ref={canvasRef}
                width={700}
                height={700}
                className="max-w-full h-auto"
                style={{ imageRendering: 'crisp-edges' }}
            />
        </motion.div>
    );
};
