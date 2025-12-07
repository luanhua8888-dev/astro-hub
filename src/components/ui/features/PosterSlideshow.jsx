'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PosterSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Zodiac SVG Paths
    const zodiacIcons = {
        aries: "M12 21a9 9 0 0 0 9-9h-2a7 7 0 0 1-7 7 7 7 0 0 1-7-7H3a9 9 0 0 0 9 9z M12 7a4 4 0 1 0-4-4 4 4 0 0 0 4 4a4 4 0 0 0 4-4 4 4 0 0 0-4 4z M2 12h2a8 8 0 0 1 8 8 8 8 0 0 1 8-8h2v-2h-2a8 8 0 0 1-8-8v-2h-2v2a8 8 0 0 1-8 8H2z", // Custom simplified ram
        taurus: "M12 3a6 6 0 0 1 6 6h-2a4 4 0 0 0-4-4 4 4 0 0 0-4 4H6a6 6 0 0 1 6-6z M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", // Bull
        gemini: "M6 3h12v2H6zm0 16h12v2H6zm2-14h2v14H8zm6 0h2v14h-2z", // Pillars
        cancer: "M6 12a3 3 0 1 0 3 3 3 3 0 0 0-3-3m0-2a5 5 0 1 1 5 5h3.5a.5.5 0 0 0 0-1H11a3 3 0 1 0 0-6 3 3 0 0 0-3 3v2z M18 12a3 3 0 1 1-3-3 3 3 0 0 1 3 3m0 2a5 5 0 1 0-5-5H9.5a.5.5 0 0 1 0 1H13a3 3 0 1 1 0 6 3 3 0 0 1 3-3v-2z", // 69 style
        leo: "M12 3a3 3 0 0 0-3 3v.5a.5.5 0 0 1-.5.5H8a4 4 0 0 0 0 8h1a4 4 0 0 0 4-4v-1.5a.5.5 0 0 1 .5-.5h.5a1 1 0 1 1 0 2H13v2h1a3 3 0 1 0 0-6h-.5a2.5 2.5 0 0 0-2.5-2.5V3z", // Lion tail
        virgo: "M5 3v18h2V5h2v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V5h2v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V8l3 4-1.5 1L19 16l-3 4h-2l3-4-3-4V3z", // Stylized M
        libra: "M12 3a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0h2a5 5 0 0 0-5-5z M4 14h16v2H4z M2 18h20v2H2z", // Scales
        scorpio: "M5 6v12h2V8h2v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V8h2v4a2 2 0 0 0 2 2h0a3 3 0 0 0 3-3v-1l2 2 1.5-1.5L18 8V6z", // M with arrow
        sagittarius: "M12 2L2 12h5v8h10v-8h5L12 2z", // Arrow upward
        capricorn: "M12 4a2 2 0 0 0-2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4h4a2 2 0 1 0 0-4H8a2 2 0 0 1-2-2z", // Goat horn
        aquarius: "M2 10l2-2 4 4 4-4 4 4 4-4v2l-4 4-4-4-4 4-4-4-2 2z M2 16l2-2 4 4 4-4 4 4 4-4v2l-4 4-4-4-4 4-4-4-2 2z", // Waves
        pisces: "M5 4a8 8 0 0 1 0 16M19 4a8 8 0 0 0 0 16M2 12h20", // Two fish brackets
        // News Icons
        mars: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z", // Circle
        blackhole: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z m0 4a6 6 0 1 1-6 6 6 6 0 0 1 6-6z", // Ring
        earth: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z M3.5 8h17 M3.5 16h17 M12 2c-3 6-3 14 0 20 M12 2c3 6 3 14 0 20" // Globe
    };

    // Better Paths from Lucide or similar standard shapes
    const icons = {
        aries: <path d="M12 3a2 2 0 0 1 2 2c0 1.1-.9 2-2 2a2 2 0 0 1-2-2c0-1.1.9-2 2-2zm-5 5v5a5 5 0 0 0 10 0V8" />, // Simplified Ram
        taurus: <path d="M7 6a5 5 0 0 1 10 0v2h-2V6a3 3 0 0 0-6 0v2H7V6zm5 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />, // Bull
        gemini: <path d="M6 4h12M6 20h12M8 4v16M16 4v16" />, // II
        cancer: <path d="M8 12a4 4 0 1 1 4-4H8v4zm8 0a4 4 0 1 1-4 4h4v-4z" />, // 69ish
        leo: <path d="M16 6a3 3 0 1 0-6 0v1a3 3 0 0 1-6 0h2a1 1 0 0 0 2 0v-1a1 1 0 1 1 2 0v1a5 5 0 0 0 5 5h1a2 2 0 0 0 0-4h-1" />, // Tail
        virgo: <path d="M4 4v16h2V6h2v6a2 2 0 0 0 4 0V6h2v6a2 2 0 0 0 4 0v-1l3 4" />, // M-like
        libra: <path d="M5 13h14M5 17h14M12 4a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z" />, // Scales
        scorpio: <path d="M4 4v16h2V6h2v6a2 2 0 0 0 4 0V6h2v6a2 2 0 0 0 4 0v-1l3 4-2.5 1.5" />, // M with tail
        sagittarius: <path d="M12 2l10 10-2 2-10-10M22 2h-6M22 2v6M2 22l10-10" />, // Arrow
        capricorn: <path d="M4 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4v0a4 4 0 0 0 8 0v-2" />, // Hornish (Simplified)
        aquarius: <path d="M2 10l5-3 5 3 5-3 5 3M2 16l5-3 5 3 5-3 5 3" />, // Waves
        pisces: <path d="M6 2c2 6 2 14 0 20M18 2c-2 6-2 14 0 20M2 12h20" />, // Fish

        // News
        mars: <circle cx="12" cy="12" r="8" />,
        blackhole: <g><circle cx="12" cy="12" r="10" opacity="0.3" /><circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" /><circle cx="12" cy="12" r="3" fill="white" /></g>,
        earth: <g><circle cx="12" cy="12" r="10" /><path d="M4 12h16M12 4c2 4 2 12 0 16" /></g>
    };

    const slides = [
        // Zodiac Signs
        { type: 'zodiac', title: 'Bạch Dương', subtitle: 'Aries • 21/3 - 19/4', description: 'Dũng cảm, nhiệt huyết, tiên phong', gradient: 'from-orange-500 via-red-500 to-rose-900', icon: icons.aries },
        { type: 'zodiac', title: 'Kim Ngưu', subtitle: 'Taurus • 20/4 - 20/5', description: 'Kiên định, thực tế, đáng tin cậy', gradient: 'from-emerald-400 via-teal-500 to-cyan-700', icon: icons.taurus },
        { type: 'zodiac', title: 'Song Tử', subtitle: 'Gemini • 21/5 - 20/6', description: 'Linh hoạt, giao tiếp, tò mò', gradient: 'from-yellow-300 via-amber-400 to-orange-600', icon: icons.gemini },
        { type: 'zodiac', title: 'Cự Giải', subtitle: 'Cancer • 21/6 - 22/7', description: 'Nhạy cảm, chu đáo, bảo vệ', gradient: 'from-cyan-300 via-blue-500 to-indigo-600', icon: icons.cancer },
        { type: 'zodiac', title: 'Sư Tử', subtitle: 'Leo • 23/7 - 22/8', description: 'Tự tin, lãnh đạo, hào phóng', gradient: 'from-yellow-400 via-orange-500 to-red-600', icon: icons.leo },
        { type: 'zodiac', title: 'Xử Nữ', subtitle: 'Virgo • 23/8 - 22/9', description: 'Tỉ mỉ, phân tích, hoàn hảo', gradient: 'from-lime-400 via-green-500 to-emerald-700', icon: icons.virgo },
        { type: 'zodiac', title: 'Thiên Bình', subtitle: 'Libra • 23/9 - 22/10', description: 'Cân bằng, hài hòa, công bằng', gradient: 'from-pink-300 via-rose-400 to-fuchsia-700', icon: icons.libra },
        { type: 'zodiac', title: 'Bọ Cạp', subtitle: 'Scorpio • 23/10 - 21/11', description: 'Mạnh mẽ, bí ẩn, quyết đoán', gradient: 'from-purple-500 via-indigo-600 to-slate-900', icon: icons.scorpio },
        { type: 'zodiac', title: 'Nhân Mã', subtitle: 'Sagittarius • 22/11 - 21/12', description: 'Tự do, phiêu lưu, lạc quan', gradient: 'from-violet-400 via-fuchsia-500 to-purple-800', icon: icons.sagittarius },
        { type: 'zodiac', title: 'Ma Kết', subtitle: 'Capricorn • 22/12 - 19/1', description: 'Kỷ luật, tham vọng, trách nhiệm', gradient: 'from-slate-400 via-zinc-600 to-stone-800', icon: icons.capricorn },
        { type: 'zodiac', title: 'Bảo Bình', subtitle: 'Aquarius • 20/1 - 18/2', description: 'Độc lập, sáng tạo, nhân đạo', gradient: 'from-sky-300 via-cyan-500 to-blue-700', icon: icons.aquarius },
        { type: 'zodiac', title: 'Song Ngư', subtitle: 'Pisces • 19/2 - 20/3', description: 'Trực giác, nghệ sĩ, từ bi', gradient: 'from-teal-300 via-blue-500 to-violet-600', icon: icons.pisces },

        // Space News
        { type: 'news', title: 'Sao Hỏa', subtitle: 'Hành Tinh Đỏ', description: 'Khám phá tiềm năng sự sống trên sao Hỏa', gradient: 'from-orange-500 via-red-600 to-rose-900', icon: icons.mars },
        { type: 'news', title: 'Hố Đen', subtitle: 'Bí Ẩn Vũ Trụ', description: 'Nghiên cứu mới về lực hấp dẫn cực mạnh', gradient: 'from-violet-900 via-fuchsia-900 to-black', icon: icons.blackhole },
        { type: 'news', title: 'Trái Đất', subtitle: 'Hành Tinh Xanh', description: 'Bảo vệ môi trường cho thế hệ tương lai', gradient: 'from-blue-400 via-cyan-500 to-teal-700', icon: icons.earth },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Auto-play every 5 seconds

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto px-4">
            {/* Main Card Container */}
            <div className="relative h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-[#0B0B1E]/80 backdrop-blur-xl group">
                {/* Dynamic Background Effects */}
                {slides.map((slide, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentSlide === index ? 1 : 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        {/* Ambient Glows - Nebula Effect */}
                        <div className={`absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br ${slide.gradient} opacity-[0.15] blur-[80px] rounded-full mix-blend-screen animate-pulse`} />
                        <div className={`absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-gradient-to-tl ${slide.gradient} opacity-[0.15] blur-[80px] rounded-full mix-blend-screen animate-pulse`} style={{ animationDelay: '2s' }} />

                        {/* Mesh/Noise Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
                    </motion.div>
                ))}

                {/* Content Container */}
                <div className="relative h-full flex flex-col items-center justify-center text-center px-8 z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            {/* Icon Ring */}
                            <div className="relative mb-10 group-hover:scale-105 transition-transform duration-500">
                                <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} rounded-full blur-xl opacity-30`} />
                                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-inner ring-1 ring-white/10">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                    >
                                        {slides[currentSlide].icon}
                                    </svg>
                                </div>
                            </div>

                            {/* Text Content */}
                            <h3 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 mb-4 tracking-tight drop-shadow-sm">
                                {slides[currentSlide].title}
                            </h3>

                            <div className={`inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6`}>
                                <p className="text-lg md:text-xl text-white/90 font-medium tracking-wide">
                                    {slides[currentSlide].subtitle}
                                </p>
                            </div>

                            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mx-auto font-light">
                                {slides[currentSlide].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
                    <button
                        onClick={prevSlide}
                        className="pointer-events-auto w-14 h-14 rounded-full bg-black/20 hover:bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110 group/btn"
                    >
                        <svg className="w-6 h-6 transform group-hover/btn:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="pointer-events-auto w-14 h-14 rounded-full bg-black/20 hover:bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110 group/btn"
                    >
                        <svg className="w-6 h-6 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index
                                ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-8 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                                : 'bg-white/20 w-1.5 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
