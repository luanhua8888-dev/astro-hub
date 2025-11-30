'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { useBirthChart } from '@/hooks/useBirthChart';
import { ChartCanvas } from '@/components/modules/birth-chart/ChartCanvas';
import { ChartInfo } from '@/components/modules/birth-chart/ChartInfo';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

function ChartContent() {
    const searchParams = useSearchParams();
    const { chartData, loading, generateChart } = useBirthChart();
    const [hasGenerated, setHasGenerated] = useState(false);

    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const location = searchParams.get('location');

    useEffect(() => {
        if (date && time && location && !hasGenerated) {
            generateChart({ date, time, location });
            setHasGenerated(true);
        }
    }, [searchParams, generateChart, hasGenerated, date, time, location]);

    if (loading) return <Loader />;

    if (!chartData) return (
        <div className="container mx-auto py-12 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto"
            >
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Không có dữ liệu. Vui lòng nhập thông tin sinh của bạn.</p>
                <Link href="/birth-chart">
                    <Button>Quay lại</Button>
                </Link>
            </motion.div>
        </div>
    );

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
            <div className="container mx-auto py-8 px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link href="/birth-chart">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Quay lại
                        </Button>
                    </Link>

                    <div className="text-center mb-8">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
                        >
                            Lá Số Tử Vi Của Bạn
                        </motion.h1>

                        {/* Birth Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-4 mt-6"
                        >
                            <Card className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border-purple-500/20">
                                <Calendar className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium">{formatDate(date)}</span>
                            </Card>
                            <Card className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border-blue-500/20">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-medium">{time}</span>
                            </Card>
                            <Card className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border-pink-500/20">
                                <MapPin className="w-4 h-4 text-pink-400" />
                                <span className="text-sm font-medium">{location}</span>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Chart Canvas */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-purple-500/20">
                        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                            Biểu Đồ Thiên Văn
                        </h2>
                        <div className="relative">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl -z-10" />
                            <ChartCanvas positions={chartData.positions} />
                        </div>
                    </Card>
                </motion.div>

                {/* Chart Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <ChartInfo positions={chartData.positions} aspects={chartData.aspects} />
                </motion.div>

                {/* Mystical decoration */}
                <motion.div
                    className="fixed top-1/4 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="fixed bottom-1/4 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>
        </div>
    );
}

export default function ChartDetailPage() {
    return (
        <Suspense fallback={<Loader />}>
            <ChartContent />
        </Suspense>
    );
}
