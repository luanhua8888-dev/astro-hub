'use client';

import { Card } from '@/components/ui/card';
import { Sparkles, BookOpen, Heart, Briefcase, Users, Gem, Calendar } from 'lucide-react';

export const SignDetails = ({ data }) => {
    if (!data) return null;

    return (
        <div className="space-y-6">
            {/* Ý Nghĩa */}
            {data.meaning && (
                <Card className="p-6 bg-slate-800/50 border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <h2 className="text-xl font-bold text-white">Ý Nghĩa</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{data.meaning}</p>
                </Card>
            )}

            {/* Thần Thoại */}
            {data.mythology && (
                <Card className="p-6 bg-slate-800/50 border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                        <h2 className="text-xl font-bold text-white">Thần Thoại</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">{data.mythology}</p>
                </Card>
            )}

            {/* Tính Cách Chi Tiết */}
            {data.personality && (
                <div className="grid gap-4 md:grid-cols-2">
                    {data.personality.strengths && (
                        <Card className="p-6 bg-slate-800/50 border-slate-700">
                            <h3 className="text-lg font-semibold text-green-400 mb-3">Điểm Mạnh</h3>
                            <ul className="space-y-2">
                                {data.personality.strengths.map((strength, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-300">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}

                    {data.personality.weaknesses && (
                        <Card className="p-6 bg-slate-800/50 border-slate-700">
                            <h3 className="text-lg font-semibold text-red-400 mb-3">Điểm Yếu</h3>
                            <ul className="space-y-2">
                                {data.personality.weaknesses.map((weakness, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-300">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span>{weakness}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}
                </div>
            )}

            {/* Tình Yêu & Sự Nghiệp */}
            <div className="grid gap-4 md:grid-cols-2">
                {data.love && (
                    <Card className="p-6 bg-slate-800/50 border-slate-700">
                        <div className="flex items-center gap-2 mb-3">
                            <Heart className="w-5 h-5 text-pink-400" />
                            <h3 className="text-lg font-semibold text-white">Tình Yêu</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{data.love}</p>
                    </Card>
                )}

                {data.career && (
                    <Card className="p-6 bg-slate-800/50 border-slate-700">
                        <div className="flex items-center gap-2 mb-3">
                            <Briefcase className="w-5 h-5 text-yellow-400" />
                            <h3 className="text-lg font-semibold text-white">Sự Nghiệp</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{data.career}</p>
                    </Card>
                )}
            </div>

            {/* Độ Tương Hợp */}
            {data.compatibility && (
                <Card className="p-6 bg-slate-800/50 border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-semibold text-white">Độ Tương Hợp</h3>
                    </div>
                    <div className="space-y-3">
                        {data.compatibility.best && data.compatibility.best.length > 0 && (
                            <div>
                                <span className="text-sm font-semibold text-green-400">Rất hợp: </span>
                                <span className="text-slate-300">{data.compatibility.best.join(', ')}</span>
                            </div>
                        )}
                        {data.compatibility.good && data.compatibility.good.length > 0 && (
                            <div>
                                <span className="text-sm font-semibold text-blue-400">Hợp: </span>
                                <span className="text-slate-300">{data.compatibility.good.join(', ')}</span>
                            </div>
                        )}
                        {data.compatibility.challenging && data.compatibility.challenging.length > 0 && (
                            <div>
                                <span className="text-sm font-semibold text-orange-400">Cần nỗ lực: </span>
                                <span className="text-slate-300">{data.compatibility.challenging.join(', ')}</span>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* Thông Tin Bổ Sung */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.symbol && (
                    <Card className="p-4 bg-slate-800/50 border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-semibold text-slate-400">Biểu tượng</span>
                        </div>
                        <p className="text-white">{data.symbol}</p>
                    </Card>
                )}

                {data.colors && data.colors.length > 0 && (
                    <Card className="p-4 bg-slate-800/50 border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-semibold text-slate-400">Màu sắc may mắn</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.colors.map((color, i) => (
                                <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                                    {color}
                                </span>
                            ))}
                        </div>
                    </Card>
                )}

                {data.gemstone && (
                    <Card className="p-4 bg-slate-800/50 border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Gem className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-semibold text-slate-400">Đá quý</span>
                        </div>
                        <p className="text-white">{data.gemstone}</p>
                    </Card>
                )}

                {data.luckyNumbers && data.luckyNumbers.length > 0 && (
                    <Card className="p-4 bg-slate-800/50 border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-semibold text-slate-400">Số may mắn</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.luckyNumbers.map((num, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                                    {num}
                                </span>
                            ))}
                        </div>
                    </Card>
                )}

                {data.luckyDay && (
                    <Card className="p-4 bg-slate-800/50 border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-semibold text-slate-400">Ngày may mắn</span>
                        </div>
                        <p className="text-white">{data.luckyDay}</p>
                    </Card>
                )}
            </div>
        </div>
    );
};


