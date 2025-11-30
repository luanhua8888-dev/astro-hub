'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const planetNames = {
    Sun: 'Mặt Trời',
    Moon: 'Mặt Trăng',
    Mercury: 'Sao Thủy',
    Venus: 'Sao Kim',
    Mars: 'Sao Hỏa',
    Jupiter: 'Sao Mộc',
    Saturn: 'Sao Thổ',
    Uranus: 'Sao Thiên Vương',
    Neptune: 'Sao Hải Vương',
    Pluto: 'Sao Diêm Vương',
};

const aspectNames = {
    Conjunction: 'Hợp',
    Opposition: 'Đối',
    Trine: 'Tam phân',
    Square: 'Vuông',
    Sextile: 'Lục phân',
};

const planetColors = {
    Sun: 'from-yellow-400 to-orange-500',
    Moon: 'from-blue-200 to-blue-400',
    Mercury: 'from-gray-400 to-gray-600',
    Venus: 'from-pink-400 to-rose-500',
    Mars: 'from-red-500 to-red-700',
    Jupiter: 'from-orange-400 to-amber-600',
    Saturn: 'from-yellow-600 to-yellow-800',
    Uranus: 'from-cyan-400 to-blue-500',
    Neptune: 'from-blue-500 to-indigo-600',
    Pluto: 'from-purple-600 to-purple-800',
};

export const ChartInfo = ({ positions, aspects }) => {
    if (!positions) return null;

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Planetary Positions */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-purple-500/20 h-full">
                    <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Vị Trí Các Hành Tinh
                    </h3>
                    <div className="space-y-3">
                        {Object.entries(positions).map(([planet, data], index) => (
                            <motion.div
                                key={planet}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                className="group"
                            >
                                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-300 border border-transparent hover:border-purple-500/30">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${planetColors[planet] || 'from-gray-400 to-gray-600'} shadow-lg`} />
                                        <span className="font-semibold text-foreground group-hover:text-purple-300 transition-colors">
                                            {planetNames[planet] || planet}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-purple-300">
                                            {data.sign}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {Math.floor(data.degree)}°
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </motion.div>

            {/* Aspects */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="p-6 bg-slate-900/50 backdrop-blur-sm border-blue-500/20 h-full">
                    <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                        Các Góc Chiếu (Aspects)
                    </h3>
                    <div className="space-y-3">
                        {aspects && aspects.length > 0 ? (
                            aspects.map((aspect, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                    className="group"
                                >
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-300 border border-transparent hover:border-blue-500/30">
                                        <div className="flex items-center gap-2 flex-1">
                                            <span className="text-sm font-medium text-foreground group-hover:text-blue-300 transition-colors">
                                                {planetNames[aspect.planet1] || aspect.planet1}
                                            </span>
                                            <span className="text-xs text-muted-foreground">-</span>
                                            <span className="text-sm font-medium text-foreground group-hover:text-blue-300 transition-colors">
                                                {planetNames[aspect.planet2] || aspect.planet2}
                                            </span>
                                        </div>
                                        <span className="text-sm px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                                            {aspectNames[aspect.type] || aspect.type}
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-8"
                            >
                                <p className="text-muted-foreground">Không tìm thấy góc chiếu chính nào.</p>
                            </motion.div>
                        )}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};
