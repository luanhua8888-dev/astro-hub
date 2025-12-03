'use client';

import { motion } from 'framer-motion';

export const Logo = ({ className = '', size = 'default', showText = true }) => {
    const sizes = {
        sm: 'w-6 h-6',
        default: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    const textSizes = {
        sm: 'text-lg',
        default: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-3xl',
    };

    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`${sizes[size]} relative flex-shrink-0`}
            >
                <svg
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-lg"
                >
                    {/* Outer ring - zodiac circle */}
                    <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="url(#ringGradient)"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.6"
                    />
                    
                    {/* Inner decorative circles */}
                    <circle
                        cx="40"
                        cy="40"
                        r="28"
                        stroke="url(#innerGradient)"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.4"
                    />
                    
                    {/* Crescent moon */}
                    <path
                        d="M 25 25 A 8 8 0 0 1 25 35 A 8 8 0 0 1 25 25 Z"
                        fill="url(#moonGradient)"
                        opacity="0.9"
                    />
                    <circle
                        cx="28"
                        cy="30"
                        r="6"
                        fill="url(#bgGradient)"
                    />
                    
                    {/* Main star - 8 pointed */}
                    <g transform="translate(40, 40)">
                        <path
                            d="M 0 -18 L 4 -6 L 16 -6 L 6 2 L 10 14 L 0 8 L -10 14 L -6 2 L -16 -6 L -4 -6 Z"
                            fill="url(#starGradient)"
                        />
                        <path
                            d="M 0 -12 L 3 -4 L 12 -4 L 4 1 L 7 10 L 0 5 L -7 10 L -4 1 L -12 -4 L -3 -4 Z"
                            fill="url(#starInner)"
                            opacity="0.8"
                        />
                    </g>
                    
                    {/* Small stars decoration */}
                    <circle cx="55" cy="20" r="2" fill="url(#starGradient)" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="60" cy="55" r="1.5" fill="url(#starGradient)" opacity="0.7">
                        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="20" cy="60" r="1.5" fill="url(#starGradient)" opacity="0.6">
                        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Zodiac symbols - simplified dots */}
                    <circle cx="40" cy="8" r="1.5" fill="url(#accentGradient)" opacity="0.6" />
                    <circle cx="72" cy="40" r="1.5" fill="url(#accentGradient)" opacity="0.6" />
                    <circle cx="40" cy="72" r="1.5" fill="url(#accentGradient)" opacity="0.6" />
                    <circle cx="8" cy="40" r="1.5" fill="url(#accentGradient)" opacity="0.6" />
                    
                    {/* Gradients */}
                    <defs>
                        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#F472B6" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FBBF24" />
                            <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1E1B4B" />
                            <stop offset="100%" stopColor="#312E81" />
                        </linearGradient>
                        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A855F7" />
                            <stop offset="50%" stopColor="#EC4899" />
                            <stop offset="100%" stopColor="#F472B6" />
                        </linearGradient>
                        <linearGradient id="starInner" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C084FC" />
                            <stop offset="100%" stopColor="#F0ABFC" />
                        </linearGradient>
                        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#818CF8" />
                            <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>
            {showText && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_auto] animate-[shimmer_3s_ease-in-out_infinite] ${textSizes[size]}`}
                >
                    Astro Hub
                </motion.span>
            )}
        </div>
    );
};

export const LogoIcon = ({ className = '', size = 'default' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        default: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    };

    return (
        <div className={`${sizes[size]} ${className}`}>
            <svg
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-lg"
            >
                <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="url(#ringGradient)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                />
                <circle
                    cx="40"
                    cy="40"
                    r="28"
                    stroke="url(#innerGradient)"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.4"
                />
                <path
                    d="M 25 25 A 8 8 0 0 1 25 35 A 8 8 0 0 1 25 25 Z"
                    fill="url(#moonGradient)"
                    opacity="0.9"
                />
                <circle
                    cx="28"
                    cy="30"
                    r="6"
                    fill="url(#bgGradient)"
                />
                <g transform="translate(40, 40)">
                    <path
                        d="M 0 -18 L 4 -6 L 16 -6 L 6 2 L 10 14 L 0 8 L -10 14 L -6 2 L -16 -6 L -4 -6 Z"
                        fill="url(#starGradient)"
                    />
                    <path
                        d="M 0 -12 L 3 -4 L 12 -4 L 4 1 L 7 10 L 0 5 L -7 10 L -4 1 L -12 -4 L -3 -4 Z"
                        fill="url(#starInner)"
                        opacity="0.8"
                    />
                </g>
                <circle cx="55" cy="20" r="2" fill="url(#starGradient)" opacity="0.8" />
                <circle cx="60" cy="55" r="1.5" fill="url(#starGradient)" opacity="0.7" />
                <circle cx="20" cy="60" r="1.5" fill="url(#starGradient)" opacity="0.6" />
                <circle cx="40" cy="8" r="1.5" fill="url(#accentGradient)" opacity="0.6" />
                <circle cx="72" cy="40" r="1.5" fill="url(#accentGradient)" opacity="0.6" />
                <circle cx="40" cy="72" r="1.5" fill="url(#accentGradient)" opacity="0.6" />
                <circle cx="8" cy="40" r="1.5" fill="url(#accentGradient)" opacity="0.6" />
                <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#F472B6" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1E1B4B" />
                        <stop offset="100%" stopColor="#312E81" />
                    </linearGradient>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="50%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#F472B6" />
                    </linearGradient>
                    <linearGradient id="starInner" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C084FC" />
                        <stop offset="100%" stopColor="#F0ABFC" />
                    </linearGradient>
                    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
