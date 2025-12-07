'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Moon, Star, Zap, ArrowRight, Compass } from 'lucide-react';
import { useRef } from 'react';
import { StarField, ShootingStars } from '@/components/ui/backgrounds/StarField';
import { PosterSlideshow } from '@/components/ui/features/PosterSlideshow';

const FeatureCard = ({ icon: Icon, title, description, href, color, delay }) => {
    return (
        <Link href={href} className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
                whileHover={{ y: -10 }}
                className="relative h-full group"
            >
                {/* Hover Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/20 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative h-full p-8 rounded-[2rem] glass-panel border border-white/10 group-hover:border-white/20 transition-all duration-300 overflow-hidden">
                    {/* Corner Accent */}
                    <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${color}-500/20 rounded-full blur-3xl group-hover:bg-${color}-500/30 transition-colors duration-500`} />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className={`inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                            <Icon className={`w-8 h-8 text-${color}-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`} />
                        </div>

                        <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-${color}-300 transition-all">
                            {title}
                        </h3>

                        <p className="text-slate-400 leading-relaxed mb-8 flex-grow group-hover:text-slate-200 transition-colors">
                            {description}
                        </p>

                        <div className={`flex items-center text-sm font-bold uppercase tracking-widest text-${color}-400 group-hover:translate-x-2 transition-transform`}>
                            Khám phá <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default function Home() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-purple-500/30">
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.1),_rgba(15,23,42,1))]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                <StarField />
                <ShootingStars />
            </div>

            {/* Hero Section */}
            <section ref={ref} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32 overflow-hidden">
                {/* Nebula Background for Hero */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000" />

                <motion.div
                    style={{ y, opacity }}
                    className="text-center max-w-5xl mx-auto relative z-10"
                >
                    {/* Decorative Elements - Nebula Glow Only */}


                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-8 inline-block relative group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative px-6 py-2 rounded-full border border-white/20 bg-black/30 text-white text-sm font-bold uppercase tracking-widest backdrop-blur-xl shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:border-white/40 group-hover:scale-105 transition-all flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            Khám phá vận mệnh
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-20 text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]"
                    >
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] filter blur-[0.5px]">
                            ASTRO
                        </span>
                        <div className="relative inline-block">
                            <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-50 animate-pulse" />
                            <span className="relative block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-6xl md:text-8xl font-black mt-2 tracking-wide drop-shadow-lg">
                                HUB
                            </span>
                        </div>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
                    >
                        Giải mã vũ trụ bên trong bạn. <span className="text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Lá số tử vi</span>, <span className="text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Thần số học</span> và <span className="text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Tarot</span>.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <Link href="/horoscope">
                            <Button size="lg" className="group h-16 px-10 text-xl bg-white text-black hover:bg-white/90 rounded-full font-black tracking-tight shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.8)] hover:scale-105 transition-all duration-300">
                                <Compass className="mr-3 w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
                                Bắt Đầu Ngay
                            </Button>
                        </Link>
                        <Link href="/birth-chart">
                            <Button size="lg" variant="outline" className="h-16 px-10 text-xl border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-xl transition-all hover:scale-105 hover:border-white/30 shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)]">
                                Tạo Lá Số
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-[0.2em] opacity-70">Cuộn xuống</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-slate-500 via-slate-500 to-transparent opacity-50" />
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                            Công Cụ Huyền Học
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Bộ công cụ toàn diện giúp bạn thấu hiểu bản thân và định hướng tương lai
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Moon}
                            title="Cung Hoàng Đạo"
                            description="Dự báo hàng ngày, phân tích tính cách và độ tương hợp tình yêu dựa trên vị trí các chòm sao."
                            href="/horoscope"
                            color="purple"
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Sparkles}
                            title="Thần Số Học"
                            description="Khám phá ý nghĩa ẩn sau ngày sinh và tên của bạn. Tìm ra con số chủ đạo và sứ mệnh cuộc đời."
                            href="/numerology"
                            color="blue"
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={Star}
                            title="Lá Số Tử Vi"
                            description="Bản đồ chi tiết vị trí các hành tinh vào thời điểm bạn chào đời. Giải mã sâu sắc về vận mệnh."
                            href="/birth-chart"
                            color="pink"
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>

            {/* Poster Slideshow Section */}
            <section className="relative z-10 py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">
                            Khám Phá Vũ Trụ
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
                            Cung hoàng đạo, tin tức thiên văn và những bí ẩn của vũ trụ
                        </p>
                    </motion.div>

                    <PosterSlideshow />
                </div>
            </section>

            {/* Quote Section */}
            <section className="relative z-10 py-32 px-4 text-center">
                <div className="max-w-5xl mx-auto relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 blur-3xl opacity-50 rounded-full" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative p-12 md:p-20 rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                    >
                        <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-10 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-pulse" />
                        <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-relaxed tracking-wide drop-shadow-lg">
                            "Các vì sao không quyết định số phận của chúng ta, chúng chỉ <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-500">soi sáng con đường</span> để ta tự quyết định."
                        </h2>
                    </motion.div>
                </div>
            </section>

            {/* Footer Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
    );
}
