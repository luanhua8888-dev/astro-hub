'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Calendar, 
    Star, 
    Heart, 
    BookOpen, 
    Bell, 
    TrendingUp,
    Clock,
    Sparkles,
    MapPin,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HistoryService } from '@/services/history.service';
import { JournalService } from '@/services/journal.service';
import { FavoritesService } from '@/services/favorites.service';
import { NotificationsService } from '@/services/notifications.service';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        tarotReadings: 0,
        numerologyResults: 0,
        birthCharts: 0,
        journalEntries: 0,
        favorites: 0,
        unreadNotifications: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        loadDashboardData();
    }, [user]);

    const loadDashboardData = async () => {
        if (!user) return;

        try {
            setLoading(true);

            // Load statistics (with error handling)
            const [tarotHistory, numerologyHistory, birthChartHistory, journalEntries, favorites, notificationsData] = await Promise.allSettled([
                HistoryService.getTarotHistory(user.id, 1).catch(() => []),
                HistoryService.getNumerologyHistory(user.id, 1).catch(() => []),
                HistoryService.getBirthChartHistory(user.id, 1).catch(() => []),
                JournalService.getEntries(user.id, { limit: 1 }).catch(() => []),
                FavoritesService.getFavorites(user.id).catch(() => []),
                NotificationsService.getNotifications(user.id, { limit: 5 }).catch(() => []),
            ]).then(results => results.map(r => r.status === 'fulfilled' ? r.value : []));

            const unreadCount = await NotificationsService.getUnreadCount(user.id).catch(() => 0);
            
            setStats({
                tarotReadings: tarotHistory.length > 0 ? tarotHistory[0] : null,
                numerologyResults: numerologyHistory.length > 0 ? numerologyHistory[0] : null,
                birthCharts: birthChartHistory.length > 0 ? birthChartHistory[0] : null,
                journalEntries: journalEntries.length,
                favorites: favorites.length,
                unreadNotifications: unreadCount,
            });

            // Combine recent activity
            const activities = [
                ...tarotHistory.map(item => ({ ...item, type: 'tarot', date: item.created_at })),
                ...numerologyHistory.map(item => ({ ...item, type: 'numerology', date: item.created_at })),
                ...birthChartHistory.map(item => ({ ...item, type: 'birth_chart', date: item.created_at })),
                ...journalEntries.map(item => ({ ...item, type: 'journal', date: item.created_at })),
            ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

            setRecentActivity(activities);
            setNotifications(notificationsData);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkNotificationRead = async (notificationId) => {
        try {
            await NotificationsService.markAsRead(user.id, notificationId);
            await loadDashboardData();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Dashboard Cá Nhân
                    </h1>
                    <p className="text-slate-400">
                        Tổng quan về hoạt động và thông tin của bạn
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={Sparkles}
                        title="Lá Bài Tarot"
                        value={stats.tarotReadings ? 'Đã rút' : 'Chưa có'}
                        href="/tarot"
                        color="purple"
                    />
                    <StatCard
                        icon={Star}
                        title="Thần Số Học"
                        value={stats.numerologyResults ? 'Đã tính' : 'Chưa có'}
                        href="/numerology"
                        color="blue"
                    />
                    <StatCard
                        icon={MapPin}
                        title="Lá Số Tử Vi"
                        value={stats.birthCharts ? 'Đã tạo' : 'Chưa có'}
                        href="/birth-chart"
                        color="pink"
                    />
                    <StatCard
                        icon={BookOpen}
                        title="Nhật Ký"
                        value={`${stats.journalEntries} mục`}
                        href="/journal"
                        color="green"
                    />
                    <StatCard
                        icon={Heart}
                        title="Yêu Thích"
                        value={`${stats.favorites} mục`}
                        href="/favorites"
                        color="red"
                    />
                    <StatCard
                        icon={Bell}
                        title="Thông Báo"
                        value={stats.unreadNotifications > 0 ? `${stats.unreadNotifications} mới` : 'Không có'}
                        href="/notifications"
                        color="yellow"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-purple-400" />
                                Hoạt Động Gần Đây
                            </h2>
                            <Link href="/history">
                                <Button variant="ghost" size="sm" className="text-purple-400">
                                    Xem tất cả
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentActivity.length > 0 ? (
                                recentActivity.map((activity, index) => (
                                    <motion.div
                                        key={activity.id || index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            activity.type === 'tarot' ? 'bg-purple-500/20 text-purple-400' :
                                            activity.type === 'numerology' ? 'bg-blue-500/20 text-blue-400' :
                                            activity.type === 'birth_chart' ? 'bg-pink-500/20 text-pink-400' :
                                            'bg-green-500/20 text-green-400'
                                        }`}>
                                            {activity.type === 'tarot' ? <Sparkles className="w-5 h-5" /> :
                                             activity.type === 'numerology' ? <Star className="w-5 h-5" /> :
                                             activity.type === 'birth_chart' ? <MapPin className="w-5 h-5" /> :
                                             <BookOpen className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white text-sm font-medium">
                                                {activity.type === 'tarot' ? `Lá bài: ${activity.card_name || 'Tarot'}` :
                                                 activity.type === 'numerology' ? `Thần số học: ${activity.name || 'Numerology'}` :
                                                 activity.type === 'birth_chart' ? `Lá số tử vi: ${activity.name || 'Birth Chart'}` :
                                                 `Nhật ký: ${activity.title || 'Journal Entry'}`}
                                            </p>
                                            <p className="text-slate-400 text-xs">
                                                {new Date(activity.date).toLocaleDateString('vi-VN')}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-slate-400 text-center py-8">
                                    Chưa có hoạt động nào
                                </p>
                            )}
                        </div>
                    </Card>

                    {/* Notifications */}
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Bell className="w-5 h-5 text-yellow-400" />
                                Thông Báo
                            </h2>
                            <Link href="/notifications">
                                <Button variant="ghost" size="sm" className="text-yellow-400">
                                    Xem tất cả
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-3 rounded-lg transition-colors cursor-pointer ${
                                            notification.is_read 
                                                ? 'bg-slate-700/30' 
                                                : 'bg-yellow-500/10 border border-yellow-500/20'
                                        }`}
                                        onClick={() => handleMarkNotificationRead(notification.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            {!notification.is_read && (
                                                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-white text-sm font-medium">
                                                    {notification.title}
                                                </p>
                                                <p className="text-slate-400 text-xs mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-slate-500 text-xs mt-1">
                                                    {new Date(notification.created_at).toLocaleDateString('vi-VN')}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-slate-400 text-center py-8">
                                    Không có thông báo nào
                                </p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="bg-slate-800/50 border-slate-700 p-6 mt-6">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        Thao Tác Nhanh
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/tarot">
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                Rút Tarot
                            </Button>
                        </Link>
                        <Link href="/numerology">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                Tính Thần Số
                            </Button>
                        </Link>
                        <Link href="/birth-chart">
                            <Button className="w-full bg-pink-600 hover:bg-pink-700">
                                Tạo Lá Số
                            </Button>
                        </Link>
                        <Link href="/journal">
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                Viết Nhật Ký
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, title, value, href, color }) {
    const colorClasses = {
        purple: 'bg-purple-500/20 text-purple-400',
        blue: 'bg-blue-500/20 text-blue-400',
        pink: 'bg-pink-500/20 text-pink-400',
        green: 'bg-green-500/20 text-green-400',
        red: 'bg-red-500/20 text-red-400',
        yellow: 'bg-yellow-500/20 text-yellow-400',
    };

    return (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Card className="bg-slate-800/50 border-slate-700 p-6 cursor-pointer hover:bg-slate-800 transition-colors">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm mb-1">{title}</p>
                            <p className="text-2xl font-bold text-white">{value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                    </div>
                </Card>
            </motion.div>
        </Link>
    );
}

