'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Moon, Star, Zap, ArrowRight, Compass } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Component sao băng
// Component sao băng
const ShootingStar = ({ delay }) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setCoords({
            x: Math.random() * 50 + 50, // 50-100vw
            y: Math.random() * 50 // 0-50vh
        });
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ x: `${coords.x}vw`, y: `${coords.y}vh`, opacity: 0, scale: 0 }}
            animate={{
                x: [`${coords.x}vw`, `${coords.x - 40}vw`],
                y: [`${coords.y}vh`, `${coords.y + 40}vh`],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
            }}
            transition={{
                duration: 2,
                delay: delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 10 + 5,
                ease: "easeInOut"
            }}
            className="absolute z-0"
        >
            {/* Star head */}
            <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#fff]" />

            {/* Star tail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-45 origin-center -z-10" />
        </motion.div>
    );
};

// Component nền sao lấp lánh
const StarField = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const newStars = Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full opacity-70"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                    transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
                />
            ))}
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description, href, color, delay }) => {
    return (
        <Link href={href} className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative h-full group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full p-8 rounded-2xl card-glass overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                    {/* Background Gradient Blob */}
                    <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${color}-500/20 rounded-full blur-3xl group-hover:bg-${color}-500/30 transition-colors duration-500`} />

                    <div className="relative z-10">
                        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-${color}-500/20 to-${color}-500/5 mb-6 border border-${color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-8 h-8 text-${color}-400`} />
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-glow transition-all">
                            {title}
                        </h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            {description}
                        </p>

                        <div className={`flex items-center text-${color}-400 font-medium group-hover:translate-x-2 transition-transform`}>
                            Khám phá ngay <ArrowRight className="ml-2 w-4 h-4" />
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
        <div className="relative min-h-screen bg-[#0B0B1E] text-white overflow-hidden selection:bg-purple-500/30">
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.1),_rgba(15,23,42,1))]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                <StarField />
                <ShootingStar delay={0} />
                <ShootingStar delay={5} />
                <ShootingStar delay={12} />
            </div>

            {/* Hero Section */}
            <section ref={ref} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32">
                <motion.div
                    style={{ y, opacity }}
                    className="text-center max-w-5xl mx-auto relative"
                >
                    {/* Decorative Elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none border-dashed"
                    />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-8 inline-block relative"
                    >
                        <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full" />
                        <span className="relative px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium uppercase tracking-wider backdrop-blur-md">
                            ✨ Khám phá vận mệnh của bạn
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight"
                    >
                        <span className="block hero-gradient-text drop-shadow-2xl">
                            ASTRO HUB
                        </span>
                        <span className="block text-4xl md:text-6xl text-white/90 font-bold mt-2">
                            Giải Mã Vũ Trụ
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Hành trình khám phá bản thân qua lăng kính của các vì sao.
                        Kết hợp trí tuệ cổ xưa và công nghệ hiện đại.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <Link href="/horoscope">
                            <Button size="lg" className="h-14 px-8 text-lg bg-white text-purple-900 hover:bg-slate-200 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1">
                                <Compass className="mr-2 w-5 h-5" />
                                Bắt Đầu Ngay
                            </Button>
                        </Link>
                        <Link href="/birth-chart">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-md transition-all">
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
                    <span className="text-xs uppercase tracking-widest">Cuộn xuống</span>
                    <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent" />
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
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
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

            {/* Quote Section */}
            <section className="relative z-10 py-32 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto relative"
                >
                    <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-8 animate-pulse" />
                    <h2 className="text-3xl md:text-5xl font-serif italic text-slate-200 leading-relaxed">
                        "Các vì sao không quyết định số phận của chúng ta, chúng chỉ soi sáng con đường để ta tự quyết định."
                    </h2>
                </motion.div>
            </section>

            {/* Footer Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>
    );
}
