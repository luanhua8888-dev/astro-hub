'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { zodiacIcons } from '@/components/icons/zodiac-icons';

export const ZodiacCard = ({ sign, dates, enSign }) => {
    const icon = zodiacIcons[enSign] || zodiacIcons.Aries;

    return (
        <Link href={`/horoscope/${enSign || sign}`}>
            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <Card className="relative overflow-hidden group cursor-pointer border-2 hover:border-primary/50 transition-all duration-300">
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex flex-col items-center justify-center p-6 space-y-4">
                        {/* Icon with animation */}
                        <motion.div
                            className="w-16 h-16 relative"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="w-full h-full"
                                animate={{
                                    filter: [
                                        "drop-shadow(0 0 0px rgba(99, 102, 241, 0))",
                                        "drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))",
                                        "drop-shadow(0 0 0px rgba(99, 102, 241, 0))",
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                {icon}
                            </motion.div>
                        </motion.div>

                        {/* Text */}
                        <div className="text-center space-y-1">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                {sign}
                            </h3>
                            <p className="text-sm text-muted-foreground">{dates}</p>
                        </div>

                        {/* Shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                        />
                    </div>
                </Card>
            </motion.div>
        </Link>
    );
};
