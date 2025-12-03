'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { 
    BookOpen, 
    Plus, 
    Edit, 
    Trash2, 
    Search,
    Filter,
    Calendar,
    Heart,
    Sparkles,
    Star,
    MapPin,
    Loader2,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { JournalService } from '@/services/journal.service';
import { FavoritesService } from '@/services/favorites.service';
import { DatePicker } from '@/components/ui/datepicker';

export default function JournalPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [editingEntry, setEditingEntry] = useState(null);
    const [favoritesMap, setFavoritesMap] = useState({}); // Map entry.id -> isFavorite
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        entryType: 'general',
        mood: '',
        tags: '',
    });

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        loadEntries();
    }, [user]);

    useEffect(() => {
        filterEntries();
    }, [entries, searchQuery, filterType]);

    const loadEntries = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const data = await JournalService.getEntries(user.id);
            setEntries(data);
            
            // Load favorite status for all entries
            try {
                const favorites = await FavoritesService.getFavoritesByType(user.id, 'journal');
                const favoritesMap = {};
                favorites.forEach(fav => {
                    favoritesMap[fav.item_id] = true;
                });
                setFavoritesMap(favoritesMap);
            } catch (favError) {
                console.warn('Error loading favorites:', favError);
                // Continue even if favorites fail to load
            }
        } catch (error) {
            console.error('Error loading entries:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterEntries = () => {
        let filtered = [...entries];

        if (searchQuery) {
            filtered = filtered.filter(entry => 
                entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entry.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterType !== 'all') {
            filtered = filtered.filter(entry => entry.entry_type === filterType);
        }

        setFilteredEntries(filtered);
    };

    const handleCreate = () => {
        setEditingEntry(null);
        setFormData({
            title: '',
            content: '',
            entryType: 'general',
            mood: '',
            tags: '',
        });
        setShowModal(true);
    };

    const handleViewDetail = (entry) => {
        setSelectedEntry(entry);
        setShowDetailModal(true);
    };

    const handleEdit = (entry) => {
        setEditingEntry(entry);
        setFormData({
            title: entry.title || '',
            content: entry.content || '',
            entryType: entry.entry_type || 'general',
            mood: entry.mood || '',
            tags: (entry.tags || []).join(', '),
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!user) return;
        try {
            // Validate required fields
            if (!formData.title.trim()) {
                alert('Vui lòng nhập tiêu đề');
                return;
            }
            if (!formData.content.trim()) {
                alert('Vui lòng nhập nội dung');
                return;
            }

            const entryData = {
                title: formData.title.trim(),
                content: formData.content.trim(),
                entryType: formData.entryType,
                mood: formData.mood?.trim() || null,
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
                relatedData: {},
            };

            if (editingEntry) {
                await JournalService.updateEntry(user.id, editingEntry.id, entryData);
            } else {
                await JournalService.createEntry(user.id, entryData);
            }

            setShowModal(false);
            await loadEntries();
        } catch (error) {
            console.error('Error saving entry:', error);
            let errorMessage = 'Lỗi khi lưu nhật ký. Vui lòng thử lại.';
            
            // Check for specific error types
            if (error.message?.includes('does not exist') || error.message?.includes('relation') || error.code === '42P01') {
                errorMessage = 'Bảng nhật ký chưa được tạo. Vui lòng chạy migration SQL trong Supabase Dashboard (file supabase-migrations.sql)';
            } else if (error.message?.includes('permission denied') || error.code === '42501') {
                errorMessage = 'Không có quyền truy cập. Vui lòng kiểm tra RLS policies trong Supabase.';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            alert(errorMessage);
        }
    };

    const handleDelete = async (entryId) => {
        if (!user || !confirm('Bạn có chắc muốn xóa mục nhật ký này?')) return;
        try {
            await JournalService.deleteEntry(user.id, entryId);
            await loadEntries();
        } catch (error) {
            console.error('Error deleting entry:', error);
            alert('Lỗi khi xóa nhật ký. Vui lòng thử lại.');
        }
    };

    const handleToggleFavorite = async (entry) => {
        if (!user) return;
        try {
            const entryId = entry.id;
            const isFavorite = favoritesMap[entryId] || false;
            
            if (isFavorite) {
                await FavoritesService.removeFavorite(user.id, 'journal', entryId);
            } else {
                await FavoritesService.addFavorite(user.id, 'journal', entryId, {
                    title: entry.title,
                    entryType: entry.entry_type,
                    createdAt: entry.created_at
                });
            }
            
            // Update local state
            setFavoritesMap(prev => ({
                ...prev,
                [entryId]: !isFavorite
            }));
        } catch (error) {
            console.error('Error toggling favorite:', error);
            alert('Lỗi khi cập nhật yêu thích. Vui lòng thử lại.');
        }
    };

    const getEntryIcon = (type) => {
        switch (type) {
            case 'horoscope': return <Star className="w-5 h-5" />;
            case 'tarot': return <Sparkles className="w-5 h-5" />;
            case 'numerology': return <Star className="w-5 h-5" />;
            case 'birth_chart': return <MapPin className="w-5 h-5" />;
            default: return <BookOpen className="w-5 h-5" />;
        }
    };

    const getEntryColor = (type) => {
        switch (type) {
            case 'horoscope': return 'bg-blue-500/20 text-blue-400';
            case 'tarot': return 'bg-purple-500/20 text-purple-400';
            case 'numerology': return 'bg-pink-500/20 text-pink-400';
            case 'birth_chart': return 'bg-green-500/20 text-green-400';
            default: return 'bg-slate-500/20 text-slate-400';
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
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                <BookOpen className="w-10 h-10 text-purple-400" />
                                Nhật Ký Tâm Linh
                            </h1>
                            <p className="text-slate-400">
                                Ghi lại những cảm nhận và trải nghiệm của bạn
                            </p>
                        </div>
                        <Button
                            onClick={handleCreate}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Viết Mới
                        </Button>
                    </div>

                    {/* Filters */}
                    <Card className="bg-slate-800/50 border-slate-700 p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    placeholder="Tìm kiếm trong nhật ký..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={filterType === 'all' ? 'default' : 'outline'}
                                    onClick={() => setFilterType('all')}
                                    className="bg-slate-700 border-slate-600"
                                >
                                    Tất cả
                                </Button>
                                <Button
                                    variant={filterType === 'horoscope' ? 'default' : 'outline'}
                                    onClick={() => setFilterType('horoscope')}
                                    className="bg-slate-700 border-slate-600"
                                >
                                    Horoscope
                                </Button>
                                <Button
                                    variant={filterType === 'tarot' ? 'default' : 'outline'}
                                    onClick={() => setFilterType('tarot')}
                                    className="bg-slate-700 border-slate-600"
                                >
                                    Tarot
                                </Button>
                                <Button
                                    variant={filterType === 'general' ? 'default' : 'outline'}
                                    onClick={() => setFilterType('general')}
                                    className="bg-slate-700 border-slate-600"
                                >
                                    Chung
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Entries List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEntries.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card 
                                className="bg-slate-800/50 border-slate-700 p-6 h-full hover:bg-slate-800 transition-colors cursor-pointer"
                                onClick={() => handleViewDetail(entry)}
                            >
                                <div className="flex items-start justify-between mb-4" onClick={(e) => e.stopPropagation()}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getEntryColor(entry.entry_type)}`}>
                                        {getEntryIcon(entry.entry_type)}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleFavorite(entry);
                                            }}
                                            className={`${favoritesMap[entry.id] ? 'text-red-400 hover:text-red-300' : 'text-slate-400 hover:text-red-400'}`}
                                            title={favoritesMap[entry.id] ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                                        >
                                            <Heart className={`w-4 h-4 ${favoritesMap[entry.id] ? 'fill-current' : ''}`} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(entry);
                                            }}
                                            className="text-blue-400 hover:text-blue-300"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(entry.id);
                                            }}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {entry.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                                    {entry.content}
                                </p>
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(entry.created_at).toLocaleDateString('vi-VN')}
                                    </div>
                                    {entry.mood && (
                                        <div className="flex items-center gap-1">
                                            <Heart className="w-3 h-3" />
                                            {entry.mood}
                                        </div>
                                    )}
                                </div>
                                {entry.tags && entry.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {entry.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filteredEntries.length === 0 && (
                    <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
                        <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">
                            {searchQuery || filterType !== 'all' 
                                ? 'Không tìm thấy mục nhật ký nào' 
                                : 'Chưa có mục nhật ký nào. Hãy bắt đầu viết!'}
                        </p>
                    </Card>
                )}

                {/* Create/Edit Modal */}
                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title={editingEntry ? 'Chỉnh Sửa Nhật Ký' : 'Viết Nhật Ký Mới'}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-slate-300 mb-1 block">Tiêu đề</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Nhập tiêu đề..."
                                className="bg-slate-900/50 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-slate-300 mb-1 block">Nội dung</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Viết nội dung nhật ký của bạn..."
                                rows={6}
                                className="w-full rounded-md border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-slate-300 mb-1 block">Loại</label>
                                <select
                                    value={formData.entryType}
                                    onChange={(e) => setFormData({ ...formData, entryType: e.target.value })}
                                    className="w-full rounded-md border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="general">Chung</option>
                                    <option value="horoscope">Horoscope</option>
                                    <option value="tarot">Tarot</option>
                                    <option value="numerology">Thần Số Học</option>
                                    <option value="birth_chart">Lá Số Tử Vi</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-slate-300 mb-1 block">Tâm trạng</label>
                                <Input
                                    value={formData.mood}
                                    onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                                    placeholder="Vui, buồn, bình thường..."
                                    className="bg-slate-900/50 border-slate-700 text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-slate-300 mb-1 block">Tags (phân cách bằng dấu phẩy)</label>
                            <Input
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="tag1, tag2, tag3..."
                                className="bg-slate-900/50 border-slate-700 text-white"
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                variant="outline"
                                onClick={() => setShowModal(false)}
                                className="border-slate-700"
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                {editingEntry ? 'Cập Nhật' : 'Lưu'}
                            </Button>
                        </div>
                    </div>
                </Modal>

                {/* Detail View Modal */}
                {showDetailModal && selectedEntry && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div 
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowDetailModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative z-50 w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/50">
                                <h2 className="text-xl font-semibold text-white">{selectedEntry.title}</h2>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="rounded-sm opacity-70 hover:opacity-100 transition-opacity text-slate-400 hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getEntryColor(selectedEntry.entry_type)}`}>
                                            {getEntryIcon(selectedEntry.entry_type)}
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400">Loại nhật ký</div>
                                            <div className={`inline-block px-3 py-1 rounded-full text-sm mt-1 ${getEntryColor(selectedEntry.entry_type)}`}>
                                                {selectedEntry.entry_type === 'general' && 'Chung'}
                                                {selectedEntry.entry_type === 'horoscope' && 'Horoscope'}
                                                {selectedEntry.entry_type === 'tarot' && 'Tarot'}
                                                {selectedEntry.entry_type === 'numerology' && 'Thần Số Học'}
                                                {selectedEntry.entry_type === 'birth_chart' && 'Lá Số Tử Vi'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="text-xs text-slate-400 mb-2 block">Nội dung</label>
                                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 min-h-[200px] max-h-[400px] overflow-y-auto">
                                            <p className="text-white whitespace-pre-wrap leading-relaxed break-words">
                                                {selectedEntry.content}
                                            </p>
                                        </div>
                                    </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="text-xs text-slate-400 mb-1 block">Ngày tạo</label>
                                        <div className="flex items-center gap-2 text-sm text-white">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {new Date(selectedEntry.created_at).toLocaleDateString('vi-VN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                    {selectedEntry.mood && (
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1 block">Tâm trạng</label>
                                            <div className="flex items-center gap-2 text-sm text-white">
                                                <Heart className="w-4 h-4 text-red-400" />
                                                {selectedEntry.mood}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                                    <div>
                                        <label className="text-xs text-slate-400 mb-2 block">Tags</label>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedEntry.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between p-6 border-t border-slate-700 bg-slate-800/50">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleToggleFavorite(selectedEntry)}
                                    className={`${favoritesMap[selectedEntry.id] ? 'text-red-400 hover:text-red-300' : 'text-slate-400 hover:text-red-400'}`}
                                >
                                    <Heart className={`w-4 h-4 mr-1 ${favoritesMap[selectedEntry.id] ? 'fill-current' : ''}`} />
                                    {favoritesMap[selectedEntry.id] ? 'Đã yêu thích' : 'Yêu thích'}
                                </Button>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDetailModal(false)}
                                        className="border-slate-700"
                                    >
                                        Đóng
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setShowDetailModal(false);
                                            handleEdit(selectedEntry);
                                        }}
                                        className="bg-purple-600 hover:bg-purple-700"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Chỉnh sửa
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            if (confirm('Bạn có chắc muốn xóa mục nhật ký này?')) {
                                                handleDelete(selectedEntry.id);
                                                setShowDetailModal(false);
                                            }
                                        }}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Xóa
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}

