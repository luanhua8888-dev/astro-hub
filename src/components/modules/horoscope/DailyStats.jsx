import { Card } from '@/components/ui/card';
import { Sparkles, Clock, Palette, Users } from 'lucide-react';

export const DailyStats = ({ stats }) => {
    if (!stats) return null;
    return (
        <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h3 className="text-lg font-bold mb-4 text-white">Dự Báo Hôm Nay</h3>
            <p className="mb-4 text-slate-300 leading-relaxed">{stats.prediction}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{stats.luckyNumber || 'N/A'}</div>
                    <div className="text-xs text-slate-400">Con Số May Mắn</div>
                </div>
                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                    <div className="text-lg font-medium text-pink-400 mb-1">{stats.mood || 'N/A'}</div>
                    <div className="text-xs text-slate-400">Tâm Trạng</div>
                </div>
            </div>

            {/* Thông tin bổ sung từ API */}
            {(stats.color || stats.compatibility || stats.luckyTime) && (
                <div className="space-y-2 pt-4 border-t border-slate-700">
                    {stats.color && (
                        <div className="flex items-center gap-2 text-sm">
                            <Palette className="w-4 h-4 text-purple-400" />
                            <span className="text-slate-400">Màu may mắn:</span>
                            <span className="text-white">{stats.color}</span>
                        </div>
                    )}
                    {stats.compatibility && (
                        <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-pink-400" />
                            <span className="text-slate-400">Tương hợp:</span>
                            <span className="text-white">{stats.compatibility}</span>
                        </div>
                    )}
                    {stats.luckyTime && (
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-slate-400">Giờ may mắn:</span>
                            <span className="text-white">{stats.luckyTime}</span>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
};
