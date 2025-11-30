'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TarotService } from '@/services/tarot.service';
import { Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TarotPage() {
    const [card, setCard] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    const handleDrawCard = () => {
        if (isShuffling) return;

        setIsShuffling(true);
        setCard(null);
        setIsFlipped(false);

        // Simulate shuffling
        setTimeout(() => {
            const newCard = TarotService.drawCard();
            setCard(newCard);
            setIsShuffling(false);

            // Auto flip after a short delay
            setTimeout(() => {
                setIsFlipped(true);
            }, 500);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#0B0B1E] text-white py-20 px-4 relative overflow-hidden flex flex-col items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.1),_rgba(15,23,42,1))]" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 relative z-10"
            >
                <div className="inline-block p-3 rounded-full bg-purple-500/10 mb-4">
                    <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    Tarot Hàng Ngày
                </h1>
                <p className="text-slate-300 text-lg max-w-xl mx-auto">
                    Tập trung vào câu hỏi của bạn và rút một lá bài để nhận thông điệp từ vũ trụ.
                </p>
            </motion.div>

            <div className="relative z-10 w-full max-w-md h-[500px] perspective-1000 mb-8 flex justify-center items-center">
                <AnimatePresence mode="wait">
                    {!card && !isShuffling ? (
                        <motion.div
                            key="deck"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="cursor-pointer group"
                            onClick={handleDrawCard}
                        >
                            <div className="w-64 h-96 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl border-2 border-purple-400/30 shadow-[0_0_30px_rgba(124,58,237,0.3)] flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] transition-shadow duration-500">
                                <div className="absolute inset-0 bg-[url('/tarot-back.png')] opacity-20 bg-cover bg-center" />
                                <div className="border-4 border-white/10 w-[90%] h-[90%] rounded-xl flex items-center justify-center">
                                    <span className="text-4xl font-serif text-purple-200 opacity-50">TAROT</span>
                                </div>
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                            </div>
                            <p className="text-center mt-6 text-purple-300 animate-bounce">
                                Chạm để rút bài
                            </p>
                        </motion.div>
                    ) : (
                        <div key="card" className="relative w-64 h-96 preserve-3d transition-transform duration-1000" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                            {/* Card Back */}
                            <div className="absolute inset-0 backface-hidden w-full h-full bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl border-2 border-purple-400/30 shadow-2xl flex items-center justify-center">
                                <div className="border-4 border-white/10 w-[90%] h-[90%] rounded-xl flex items-center justify-center">
                                    <span className="text-4xl font-serif text-purple-200 opacity-50">TAROT</span>
                                </div>
                            </div>

                            {/* Card Front */}
                            <div className="absolute inset-0 backface-hidden w-full h-full bg-[#1a103c] rounded-2xl border-2 border-purple-400/50 shadow-[0_0_50px_rgba(168,85,247,0.4)] flex flex-col items-center justify-between p-4 rotate-y-180 overflow-hidden" style={{ transform: 'rotateY(180deg)' }}>
                                <div className="text-xs text-purple-400 uppercase tracking-widest mb-2">Lá bài của bạn</div>

                                <div className={`relative w-full flex-1 mb-4 rounded-lg overflow-hidden transition-transform duration-500 ${card?.isReversed ? 'rotate-180' : ''}`}>
                                    {card?.image ? (
                                        <img
                                            src={card.image}
                                            alt={card.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                            <span className="text-4xl">🎴</span>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center w-full">
                                    <h3 className="text-xl font-bold text-white mb-1 truncate">{card?.name}</h3>
                                    {card?.isReversed && <span className="text-xs text-red-400 font-medium uppercase tracking-wider block">Ngược</span>}
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {isFlipped && card && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto text-center px-6 py-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 relative z-10"
                >
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">Thông Điệp</h3>
                    <p className="text-lg text-slate-200 leading-relaxed italic">
                        "{card.meaning}"
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Button
                            onClick={handleDrawCard}
                            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Rút Lá Khác
                        </Button>
                        <Link href="/">
                            <Button variant="outline" className="border-white/20 hover:bg-white/10 gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Về Trang Chủ
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            )}


        </div>
    );
}
