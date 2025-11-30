'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CompatibilityService } from '@/services/compatibility.service';
import { Heart, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

const zodiacSigns = [
    { id: 'Aries', name: 'Bạch Dương', icon: '♈' },
    { id: 'Taurus', name: 'Kim Ngưu', icon: '♉' },
    { id: 'Gemini', name: 'Song Tử', icon: '♊' },
    { id: 'Cancer', name: 'Cự Giải', icon: '♋' },
    { id: 'Leo', name: 'Sư Tử', icon: '♌' },
    { id: 'Virgo', name: 'Xử Nữ', icon: '♍' },
    { id: 'Libra', name: 'Thiên Bình', icon: '♎' },
    { id: 'Scorpio', name: 'Bọ Cạp', icon: '♏' },
    { id: 'Sagittarius', name: 'Nhân Mã', icon: '♐' },
    { id: 'Capricorn', name: 'Ma Kết', icon: '♑' },
    { id: 'Aquarius', name: 'Bảo Bình', icon: '♒' },
    { id: 'Pisces', name: 'Song Ngư', icon: '♓' },
];

export default function CompatibilityPage() {
    const [sign1, setSign1] = useState(null);
    const [sign2, setSign2] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = () => {
        if (!sign1 || !sign2) return;
        setLoading(true);

        // Simulate calculation delay for effect
        setTimeout(() => {
            const data = CompatibilityService.calculate(sign1.id, sign2.id);
            setResult(data);
            setLoading(false);
        }, 1500);
    };

    const reset = () => {
        setSign1(null);
        setSign2(null);
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-[#0B0B1E] text-white py-20 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.1),_rgba(15,23,42,1))]" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block p-3 rounded-full bg-pink-500/10 mb-4">
                        <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                        Bói Tình Yêu
                    </h1>
                    <p className="text-slate-300 text-lg">
                        Khám phá mức độ hòa hợp giữa hai chòm sao
                    </p>
                </motion.div>

                {!result ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Sign 1 Selection */}
                        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold mb-4 text-center text-pink-300">Bạn là ai?</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {zodiacSigns.map((sign) => (
                                    <button
                                        key={sign.id}
                                        onClick={() => setSign1(sign)}
                                        className={`p-3 rounded-xl border transition-all ${sign1?.id === sign.id
                                                ? 'bg-pink-500 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                                                : 'border-white/10 hover:bg-white/10 text-slate-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">{sign.icon}</div>
                                        <div className="text-xs font-medium">{sign.name}</div>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Sign 2 Selection */}
                        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">Người ấy là ai?</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {zodiacSigns.map((sign) => (
                                    <button
                                        key={sign.id}
                                        onClick={() => setSign2(sign)}
                                        className={`p-3 rounded-xl border transition-all ${sign2?.id === sign.id
                                                ? 'bg-purple-500 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                                                : 'border-white/10 hover:bg-white/10 text-slate-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">{sign.icon}</div>
                                        <div className="text-xs font-medium">{sign.name}</div>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Calculate Button */}
                        <div className="md:col-span-2 flex justify-center mt-4">
                            <Button
                                size="lg"
                                onClick={handleCalculate}
                                disabled={!sign1 || !sign2 || loading}
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-12 h-14 rounded-full shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                        Đang kết nối vũ trụ...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Xem Kết Quả
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto"
                    >
                        <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

                            <div className="flex justify-center items-center gap-8 mb-8">
                                <div className="text-center">
                                    <div className="text-6xl mb-2">{sign1.icon}</div>
                                    <div className="font-bold text-pink-300">{sign1.name}</div>
                                </div>
                                <Heart className="w-12 h-12 text-red-500 animate-pulse" fill="currentColor" />
                                <div className="text-center">
                                    <div className="text-6xl mb-2">{sign2.icon}</div>
                                    <div className="font-bold text-purple-300">{sign2.name}</div>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                                    {result.score}%
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{result.title}</h2>
                                <p className="text-slate-300 leading-relaxed">{result.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm text-slate-400 mb-1">Cảm Xúc</div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.aspects.emotional}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="h-full bg-pink-500"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm text-slate-400 mb-1">Giao Tiếp</div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.aspects.communication}%` }}
                                            transition={{ duration: 1, delay: 0.4 }}
                                            className="h-full bg-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm text-slate-400 mb-1">Sự Thân Mật</div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.aspects.intimacy}%` }}
                                            transition={{ duration: 1, delay: 0.6 }}
                                            className="h-full bg-red-500"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-sm text-slate-400 mb-1">Niềm Tin</div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.aspects.trust}%` }}
                                            transition={{ duration: 1, delay: 0.8 }}
                                            className="h-full bg-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <Button variant="outline" onClick={reset} className="border-white/20 hover:bg-white/10">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Thử Cặp Đôi Khác
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
