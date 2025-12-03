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

// Poster Slideshow Component
const PosterSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        // Zodiac Signs
        { type: 'zodiac', title: 'Bạch Dương', subtitle: 'Aries • 21/3 - 19/4', description: 'Dũng cảm, nhiệt huyết, tiên phong', gradient: 'from-red-500 via-orange-500 to-yellow-500', icon: '♈' },
        { type: 'zodiac', title: 'Kim Ngưu', subtitle: 'Taurus • 20/4 - 20/5', description: 'Kiên định, thực tế, đáng tin cậy', gradient: 'from-green-600 via-emerald-500 to-teal-500', icon: '♉' },
        { type: 'zodiac', title: 'Song Tử', subtitle: 'Gemini • 21/5 - 20/6', description: 'Linh hoạt, giao tiếp, tò mò', gradient: 'from-yellow-400 via-amber-400 to-orange-400', icon: '♊' },
        { type: 'zodiac', title: 'Cự Giải', subtitle: 'Cancer • 21/6 - 22/7', description: 'Nhạy cảm, chu đáo, bảo vệ', gradient: 'from-blue-400 via-cyan-400 to-teal-400', icon: '♋' },
        { type: 'zodiac', title: 'Sư Tử', subtitle: 'Leo • 23/7 - 22/8', description: 'Tự tin, lãnh đạo, hào phóng', gradient: 'from-orange-500 via-red-500 to-pink-500', icon: '♌' },
        { type: 'zodiac', title: 'Xử Nữ', subtitle: 'Virgo • 23/8 - 22/9', description: 'Tỉ mỉ, phân tích, hoàn hảo', gradient: 'from-green-500 via-lime-500 to-yellow-500', icon: '♍' },
        { type: 'zodiac', title: 'Thiên Bình', subtitle: 'Libra • 23/9 - 22/10', description: 'Cân bằng, hài hòa, công bằng', gradient: 'from-pink-400 via-rose-400 to-red-400', icon: '♎' },
        { type: 'zodiac', title: 'Bọ Cạp', subtitle: 'Scorpio • 23/10 - 21/11', description: 'Mạnh mẽ, bí ẩn, quyết đoán', gradient: 'from-purple-600 via-indigo-600 to-blue-600', icon: '♏' },
        { type: 'zodiac', title: 'Nhân Mã', subtitle: 'Sagittarius • 22/11 - 21/12', description: 'Tự do, phiêu lưu, lạc quan', gradient: 'from-violet-500 via-purple-500 to-fuchsia-500', icon: '♐' },
        { type: 'zodiac', title: 'Ma Kết', subtitle: 'Capricorn • 22/12 - 19/1', description: 'Kỷ luật, tham vọng, trách nhiệm', gradient: 'from-slate-600 via-gray-600 to-zinc-600', icon: '♑' },
        { type: 'zodiac', title: 'Bảo Bình', subtitle: 'Aquarius • 20/1 - 18/2', description: 'Độc lập, sáng tạo, nhân đạo', gradient: 'from-cyan-500 via-blue-500 to-indigo-500', icon: '♒' },
        { type: 'zodiac', title: 'Song Ngư', subtitle: 'Pisces • 19/2 - 20/3', description: 'Trực giác, nghệ sĩ, từ bi', gradient: 'from-blue-500 via-purple-500 to-pink-500', icon: '♓' },

        // Space News
        { type: 'news', title: 'Sao Hỏa', subtitle: 'Hành Tinh Đỏ', description: 'Khám phá tiềm năng sự sống trên sao Hỏa', gradient: 'from-red-600 via-orange-600 to-amber-600', icon: '🔴' },
        { type: 'news', title: 'Hố Đen', subtitle: 'Bí Ẩn Vũ Trụ', description: 'Nghiên cứu mới về lực hấp dẫn cực mạnh', gradient: 'from-black via-purple-900 to-indigo-900', icon: '⚫' },
        { type: 'news', title: 'Trái Đất', subtitle: 'Hành Tinh Xanh', description: 'Bảo vệ môi trường cho thế hệ tương lai', gradient: 'from-blue-600 via-green-600 to-teal-600', icon: '🌍' },
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
        <div className="relative w-full max-w-5xl mx-auto">
            {/* Slideshow Container */}
            <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
                {slides.map((slide, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentSlide === index ? 1 : 0 }}
                        transition={{ duration: 0.7 }}
                        className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
                        style={{ pointerEvents: currentSlide === index ? 'auto' : 'none' }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: currentSlide === index ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-8xl md:text-9xl mb-8 drop-shadow-2xl"
                            >
                                {slide.icon}
                            </motion.div>

                            <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: currentSlide === index ? 0 : 20, opacity: currentSlide === index ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-lg"
                            >
                                {slide.title}
                            </motion.h3>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: currentSlide === index ? 0 : 20, opacity: currentSlide === index ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 mb-3 font-semibold"
                            >
                                {slide.subtitle}
                            </motion.p>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: currentSlide === index ? 0 : 20, opacity: currentSlide === index ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="text-lg md:text-xl text-white/80 max-w-2xl"
                            >
                                {slide.description}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${currentSlide === index
                            ? 'bg-white w-8'
                            : 'bg-white/40 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>
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
                        <h2 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300">
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
