'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Clock, 
    Sparkles, 
    Star, 
    MapPin,
    Trash2,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HistoryService } from '@/services/history.service';
import { FavoritesService } from '@/services/favorites.service';
import Link from 'next/link';

export default function HistoryPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [tarotHistory, setTarotHistory] = useState([]);
    const [numerologyHistory, setNumerologyHistory] = useState([]);
    const [birthChartHistory, setBirthChartHistory] = useState([]);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        loadHistory();
    }, [user]);

    const loadHistory = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const [tarot, numerology, birthCharts] = await Promise.all([
                HistoryService.getTarotHistory(user.id),
                HistoryService.getNumerologyHistory(user.id),
                HistoryService.getBirthChartHistory(user.id),
            ]);
            setTarotHistory(tarot);
            setNumerologyHistory(numerology);
            setBirthChartHistory(birthCharts);
        } catch (error) {
            console.error('Error loading history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!user || !confirm('Bạn có chắc muốn xóa mục này?')) return;
        try {
            if (type === 'tarot') {
                await HistoryService.deleteTarotReading(user.id, id);
            } else if (type === 'numerology') {
                await HistoryService.deleteNumerologyResult(user.id, id);
            }
            await loadHistory();
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const allHistory = [
        ...tarotHistory.map(item => ({ ...item, type: 'tarot' })),
        ...numerologyHistory.map(item => ({ ...item, type: 'numerology' })),
        ...birthChartHistory.map(item => ({ ...item, type: 'birth_chart' })),
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const filteredHistory = activeTab === 'all' 
        ? allHistory 
        : allHistory.filter(item => item.type === activeTab);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                        <Clock className="w-10 h-10 text-purple-400" />
                        Lịch Sử
                    </h1>
                    <p className="text-slate-400">
                        Xem lại tất cả các kết quả và hoạt động của bạn
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <Button
                        variant={activeTab === 'all' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('all')}
                        className={activeTab === 'all' ? 'bg-purple-600' : 'bg-slate-800 border-slate-700'}
                    >
                        Tất cả
                    </Button>
                    <Button
                        variant={activeTab === 'tarot' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('tarot')}
                        className={activeTab === 'tarot' ? 'bg-purple-600' : 'bg-slate-800 border-slate-700'}
                    >
                        Tarot
                    </Button>
                    <Button
                        variant={activeTab === 'numerology' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('numerology')}
                        className={activeTab === 'numerology' ? 'bg-purple-600' : 'bg-slate-800 border-slate-700'}
                    >
                        Thần Số Học
                    </Button>
                    <Button
                        variant={activeTab === 'birth_chart' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('birth_chart')}
                        className={activeTab === 'birth_chart' ? 'bg-purple-600' : 'bg-slate-800 border-slate-700'}
                    >
                        Lá Số Tử Vi
                    </Button>
                </div>

                {/* History List */}
                <div className="space-y-4">
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="bg-slate-800/50 border-slate-700 p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                item.type === 'tarot' ? 'bg-purple-500/20 text-purple-400' :
                                                item.type === 'numerology' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-pink-500/20 text-pink-400'
                                            }`}>
                                                {item.type === 'tarot' ? <Sparkles className="w-6 h-6" /> :
                                                 item.type === 'numerology' ? <Star className="w-6 h-6" /> :
                                                 <MapPin className="w-6 h-6" />}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white mb-1">
                                                    {item.type === 'tarot' ? item.card_name || 'Lá Bài Tarot' :
                                                     item.type === 'numerology' ? `${item.name} - Số ${item.life_path_number}` :
                                                     item.name || 'Lá Số Tử Vi'}
                                                </h3>
                                                <p className="text-slate-400 text-sm mb-2">
                                                    {item.type === 'tarot' && item.card_meaning && (
                                                        <span>{item.card_meaning}</span>
                                                    )}
                                                    {item.type === 'numerology' && item.birth_date && (
                                                        <span>Ngày sinh: {new Date(item.birth_date).toLocaleDateString('vi-VN')}</span>
                                                    )}
                                                    {item.type === 'birth_chart' && item.birth_date && (
                                                        <span>Ngày sinh: {new Date(item.birth_date).toLocaleDateString('vi-VN')}</span>
                                                    )}
                                                </p>
                                                <p className="text-slate-500 text-xs">
                                                    {new Date(item.created_at).toLocaleString('vi-VN')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href={
                                                item.type === 'tarot' ? '/tarot' :
                                                item.type === 'numerology' ? '/numerology' :
                                                '/birth-chart'
                                            }>
                                                <Button variant="ghost" size="sm" className="text-blue-400">
                                                    Xem lại
                                                </Button>
                                            </Link>
                                            {(item.type === 'tarot' || item.type === 'numerology') && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(item.type, item.id)}
                                                    className="text-red-400"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
                            <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 text-lg">
                                Chưa có lịch sử nào
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

