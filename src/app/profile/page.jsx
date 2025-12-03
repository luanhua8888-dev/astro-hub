'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AuthService } from '@/services/auth.service';
import { StorageService } from '@/services/storage.service';
import { UserService } from '@/services/user.service';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
    User, 
    Upload, 
    X, 
    Mail, 
    CheckCircle, 
    AlertCircle,
    Camera,
    Loader2,
    ZoomIn,
    Phone,
    Calendar,
    MapPin,
    Edit,
    Save
} from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { DatePicker } from '@/components/ui/datepicker';
import { parseGoogleMapsUrl } from '@/utils/maps';
import { LocationService } from '@/services/location.service';
import { HistoryService } from '@/services/history.service';
import { JournalService } from '@/services/journal.service';
import { FavoritesService } from '@/services/favorites.service';
import { NotificationsService } from '@/services/notifications.service';
import { 
    Clock,
    Sparkles,
    BookOpen,
    Bell,
    Heart,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const fileInputRef = useRef(null);
    
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [preview, setPreview] = useState(null);
    const [profile, setProfile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('info'); // 'info' or 'dashboard'
    
    // Dashboard data
    const [dashboardStats, setDashboardStats] = useState({
        tarotReadings: 0,
        numerologyResults: 0,
        birthCharts: 0,
        journalEntries: 0,
        favorites: 0,
        unreadNotifications: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loadingDashboard, setLoadingDashboard] = useState(false);
    
    // Location data
    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);
    
    // Form fields
    const [formData, setFormData] = useState({
        birthDate: '',
        phone: '',
        birthLocation: '',
        birthLatitude: '',
        birthLongitude: '',
        provinceCode: '',
        wardCode: '',
        googleMapsUrl: '',
    });

    // Load profile from Supabase
    useEffect(() => {
        const loadProfile = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError('');
                // Get or create profile in Supabase
                const profileData = await UserService.getOrCreateProfile(user.id, user.email);
                
                // If profile exists, set it; otherwise leave empty
                if (profileData) {
                    setProfile(profileData);
                    setAvatarUrl(profileData.avatar_url || null);
                    // Set form data from profile
                    setFormData({
                        birthDate: profileData.birth_date || '',
                        phone: profileData.phone || '',
                        birthLocation: profileData.birth_location || '',
                        birthLatitude: profileData.birth_latitude?.toString() || '',
                        birthLongitude: profileData.birth_longitude?.toString() || '',
                        provinceCode: '',
                        districtCode: '',
                        googleMapsUrl: '',
                    });
                } else {
                    // No profile yet, that's okay - user can still upload
                    setProfile(null);
                    setAvatarUrl(null);
                }
            } catch (err) {
                console.warn('Error loading profile:', err);
                // Don't show error, just leave profile empty
                setProfile(null);
                setAvatarUrl(null);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user]);

    // Load provinces on mount
    useEffect(() => {
        const loadProvinces = async () => {
            try {
                setLoadingProvinces(true);
                const data = await LocationService.getProvinces();
                setProvinces(data);
            } catch (error) {
                console.error('Error loading provinces:', error);
            } finally {
                setLoadingProvinces(false);
            }
        };
        loadProvinces();
    }, []);

    // Districts are no longer used - removed to simplify the form

    // Load wards when province changes
    useEffect(() => {
        const loadWards = async () => {
            if (!formData.provinceCode) {
                setWards([]);
                return;
            }

            try {
                setLoadingWards(true);
                // Get all communes from province
                const allWards = await LocationService.getWardsByProvince(parseInt(formData.provinceCode));
                setWards(allWards);
            } catch (error) {
                console.error('Error loading wards:', error);
                setWards([]);
            } finally {
                setLoadingWards(false);
            }
        };
        loadWards();
    }, [formData.provinceCode]);

    // Load dashboard data when tab is active
    useEffect(() => {
        const loadDashboardData = async () => {
            if (!user || activeTab !== 'dashboard') return;
            try {
                setLoadingDashboard(true);
                
                // Load statistics (with error handling) - get all data to count
                const [tarotHistory, numerologyHistory, birthChartHistory, journalEntries, favorites, notificationsData] = await Promise.allSettled([
                    HistoryService.getTarotHistory(user.id, 100).catch(() => []),
                    HistoryService.getNumerologyHistory(user.id, 100).catch(() => []),
                    HistoryService.getBirthChartHistory(user.id, 100).catch(() => []),
                    JournalService.getEntries(user.id).catch(() => []),
                    FavoritesService.getFavorites(user.id).catch(() => []),
                    NotificationsService.getNotifications(user.id, { limit: 5 }).catch(() => []),
                ]).then(results => results.map(r => r.status === 'fulfilled' ? r.value : []));

                const unreadCount = await NotificationsService.getUnreadCount(user.id).catch(() => 0);
                
                setDashboardStats({
                    tarotReadings: tarotHistory.length,
                    numerologyResults: numerologyHistory.length,
                    birthCharts: birthChartHistory.length,
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
                setLoadingDashboard(false);
            }
        };

        if (activeTab === 'dashboard' && user) {
            loadDashboardData();
        }
    }, [activeTab, user]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset form data to profile data
        if (profile) {
            setFormData({
                birthDate: profile.birth_date || '',
                phone: profile.phone || '',
                birthLocation: profile.birth_location || '',
                birthLatitude: profile.birth_latitude?.toString() || '',
                birthLongitude: profile.birth_longitude?.toString() || '',
                provinceCode: '',
                districtCode: '',
                wardCode: '',
                googleMapsUrl: '',
            });
        }
    };

    const handleParseGoogleMapsUrl = async () => {
        if (!formData.googleMapsUrl) {
            setError('Vui lòng nhập link Google Maps');
            return;
        }

        try {
            setError('');
            const coords = await parseGoogleMapsUrl(formData.googleMapsUrl);
            
            if (coords) {
                setFormData({
                    ...formData,
                    birthLatitude: coords.latitude.toString(),
                    birthLongitude: coords.longitude.toString(),
                });
                setSuccess('Đã lấy tọa độ thành công!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError('Không thể lấy tọa độ từ link. Vui lòng kiểm tra lại link Google Maps.');
            }
        } catch (error) {
            console.error('Error parsing Google Maps URL:', error);
            setError('Lỗi khi xử lý link Google Maps. Vui lòng thử lại.');
        }
    };



    const handleSaveProfile = async () => {
        if (!user) {
            setError('Bạn chưa đăng nhập');
            return;
        }

        try {
            setSaving(true);
            setError('');
            setSuccess('');
            
            // Build location string from province and ward
            let locationString = formData.birthLocation;
            const selectedProvince = provinces.find(p => p.code === parseInt(formData.provinceCode));
            const selectedWard = wards.find(w => w.code === parseInt(formData.wardCode));
            
            const locationParts = [];
            if (selectedWard) locationParts.push(selectedWard.name);
            if (selectedProvince) locationParts.push(selectedProvince.name);
            
            if (locationParts.length > 0) {
                locationString = locationParts.join(', ');
            } else if (selectedProvince) {
                locationString = selectedProvince.name;
            }
            
            const updates = {
                birth_date: formData.birthDate || null,
                phone: formData.phone || null,
                birth_location: locationString || null,
                birth_latitude: formData.birthLatitude ? parseFloat(formData.birthLatitude) : null,
                birth_longitude: formData.birthLongitude ? parseFloat(formData.birthLongitude) : null,
            };

            console.log('Saving profile updates:', updates);
            const updatedProfile = await UserService.updateProfile(user.id, updates);
            
            if (!updatedProfile) {
                throw new Error('Không nhận được dữ liệu từ server');
            }

            console.log('Profile updated successfully:', updatedProfile);
            setProfile(updatedProfile);
            
            // Update form data with saved values
            setFormData({
                birthDate: updatedProfile.birth_date || '',
                phone: updatedProfile.phone || '',
                birthLocation: updatedProfile.birth_location || '',
                birthLatitude: updatedProfile.birth_latitude?.toString() || '',
                birthLongitude: updatedProfile.birth_longitude?.toString() || '',
            });
            
            setIsEditing(false);
            setSuccess('Cập nhật thông tin thành công!');
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Error updating profile:', err);
            const errorMessage = err.message || 'Không thể cập nhật thông tin. Vui lòng thử lại.';
            setError(errorMessage);
            
            // Show more specific error if available
            if (err.message?.includes('permission') || err.message?.includes('policy')) {
                setError('Lỗi quyền truy cập. Vui lòng kiểm tra cấu hình Supabase.');
            } else if (err.message?.includes('violates')) {
                setError('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin nhập vào.');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Vui lòng chọn file hình ảnh');
            return;
        }

        // Validate file size (max 2MB - Supabase free tier limit)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            setError('Kích thước file không được vượt quá 2MB');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setError('');
        setSuccess('');
    };

    const handleUpload = async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            setError('Vui lòng chọn hình ảnh');
            return;
        }

        if (!user) {
            setError('Bạn chưa đăng nhập');
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        try {
            // Check if user is authenticated
            const currentUser = AuthService.getCurrentUser();
            if (!currentUser) {
                throw new Error('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
            }

            // Upload image to Firebase Storage
            const downloadURL = await StorageService.uploadProfileImage(user.id, file);

            // Delete old image from Storage if exists
            if (avatarUrl) {
                try {
                    await StorageService.deleteProfileImage(avatarUrl);
                } catch (deleteErr) {
                    // Don't fail the upload if delete fails
                    console.warn('Could not delete old image:', deleteErr);
                }
            }

            // Save avatar URL to Supabase
            const updatedProfile = await UserService.updateAvatar(user.id, downloadURL);
            setProfile(updatedProfile);
            setAvatarUrl(downloadURL);

            setSuccess('Cập nhật ảnh đại diện thành công!');
            setPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err) {
            console.error('Upload error:', err);
            const errorMessage = err.message || 'Không thể upload hình ảnh. Vui lòng thử lại.';
            setError(errorMessage);
            
            // Show specific guidance for common errors
            if (err.message?.includes('unauthorized') || err.message?.includes('permission')) {
                setError('Lỗi quyền truy cập. Vui lòng kiểm tra Firebase Storage Rules. Xem file FIREBASE_STORAGE_SETUP.md để biết cách cấu hình.');
            }
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = async () => {
        if (!avatarUrl) return;

        if (!confirm('Bạn có chắc chắn muốn xóa ảnh đại diện?')) {
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        try {
            // Delete image from Storage
            await StorageService.deleteProfileImage(avatarUrl);

            // Remove avatar URL from Supabase
            const updatedProfile = await UserService.updateAvatar(user.id, null);
            setProfile(updatedProfile);
            setAvatarUrl(null);

            setSuccess('Đã xóa ảnh đại diện');
            setPreview(null);
        } catch (err) {
            setError(err.message || 'Không thể xóa ảnh. Vui lòng thử lại.');
        } finally {
            setUploading(false);
        }
    };

    const handleCancelPreview = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-400" />
                    <p className="text-muted-foreground">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Vui lòng đăng nhập để xem hồ sơ của bạn.</p>
                    <Button onClick={() => router.push('/login')}>Đăng Nhập</Button>
                </div>
            </div>
        );
    }

    const displayImage = preview || avatarUrl;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 py-2 sm:py-3 px-3 sm:px-4 lg:px-6">
            <div className="mx-auto max-w-6xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm border-purple-500/20 w-full overflow-hidden">
                        <div className="text-center mb-3">
                            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                                Hồ Sơ
                            </h1>
                            <p className="text-xs sm:text-sm text-muted-foreground">Quản lý thông tin tài khoản của bạn</p>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 mb-4 border-b border-slate-700/50">
                            <button
                                onClick={() => setActiveTab('info')}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${
                                    activeTab === 'info'
                                        ? 'text-purple-400 border-b-2 border-purple-400'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Thông Tin
                            </button>
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${
                                    activeTab === 'dashboard'
                                        ? 'text-purple-400 border-b-2 border-purple-400'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Thống Kê
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'info' && (
                            <>
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center mb-3">
                            <div className="relative mb-4 group">
                                {displayImage ? (
                                    <div className="relative cursor-pointer" onClick={() => setShowImageModal(true)}>
                                        <img
                                            src={displayImage}
                                            alt="Profile"
                                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-purple-500/30 shadow-lg transition-transform group-hover:scale-105"
                                        />
                                        {preview && (
                                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">Preview</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-full flex items-center justify-center transition-colors">
                                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2 border-purple-500/30 shadow-lg">
                                        <User className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="profile-image-input"
                                />
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5 cursor-pointer text-xs sm:text-sm"
                                    disabled={uploading || loading}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Camera className="w-3.5 h-3.5" />
                                    {displayImage ? 'Đổi Ảnh' : 'Tải Ảnh Lên'}
                                </Button>
                                
                                {avatarUrl && !preview && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1.5 text-red-400 hover:text-red-300 text-xs sm:text-sm"
                                        onClick={handleRemoveImage}
                                        disabled={uploading}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        Xóa
                                    </Button>
                                )}
                            </div>

                            {preview && (
                                <div className="mt-2 flex gap-2">
                                    <Button
                                        onClick={handleUpload}
                                        disabled={uploading}
                                        className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                    >
                                        {uploading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Đang tải lên...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4" />
                                                Lưu Ảnh
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleCancelPreview}
                                        disabled={uploading}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Messages */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2"
                            >
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-400">{error}</p>
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-2"
                            >
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-green-400">{success}</p>
                            </motion.div>
                        )}

                        {/* User Info - 2 Columns Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-3 mb-3">
                            {/* Left Column - Email & Display Name */}
                            <div className="bg-slate-800/50 p-2.5 sm:p-3 rounded-lg border border-slate-700/50 h-full">
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-2.5">
                                        <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                                            <p className="font-medium text-sm truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    {user.displayName && (
                                        <div className="flex items-center gap-2.5 pt-2.5 border-t border-slate-700/50">
                                            <User className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-muted-foreground mb-0.5">Tên hiển thị</p>
                                                <p className="font-medium text-sm truncate">{user.displayName}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Personal Information */}
                            <div className="bg-slate-800/50 p-2.5 sm:p-3 rounded-lg border border-slate-700/50 w-full overflow-hidden">
                                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-2.5">
                                     <h3 className="text-sm sm:text-base font-semibold text-white">Thông tin cá nhân</h3>
                                     {!isEditing ? (
                                         <Button
                                             variant="outline"
                                             size="sm"
                                             onClick={handleEdit}
                                             className="gap-2 w-full sm:w-auto"
                                         >
                                             <Edit className="w-4 h-4" />
                                             Chỉnh sửa
                                         </Button>
                                     ) : (
                                         <div className="flex gap-2 w-full sm:w-auto">
                                             <Button
                                                 variant="outline"
                                                 size="sm"
                                                 onClick={handleCancelEdit}
                                                 disabled={saving}
                                                 className="gap-2 flex-1 sm:flex-initial"
                                             >
                                                 Hủy
                                             </Button>
                                             <Button
                                                 size="sm"
                                                 onClick={handleSaveProfile}
                                                 disabled={saving}
                                                 className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 flex-1 sm:flex-initial"
                                             >
                                                 {saving ? (
                                                     <>
                                                         <Loader2 className="w-4 h-4 animate-spin" />
                                                         Đang lưu...
                                                     </>
                                                 ) : (
                                                     <>
                                                         <Save className="w-4 h-4" />
                                                         Lưu
                                                     </>
                                                 )}
                                             </Button>
                                         </div>
                                     )}
                                 </div>

                                 <div className="space-y-2.5">
                                    {/* Birth Date */}
                                    <div>
                                        <label className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-1.5">
                                            <Calendar className="w-4 h-4 text-purple-400" />
                                            Ngày sinh
                                        </label>
                                        {isEditing ? (
                                            <DatePicker
                                                value={formData.birthDate}
                                                onChange={(value) => setFormData({ ...formData, birthDate: value })}
                                                placeholder="Chọn ngày sinh"
                                            />
                                        ) : (
                                            <p className="font-medium text-white">
                                                {profile?.birth_date ? new Date(profile.birth_date).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-1.5">
                                            <Phone className="w-4 h-4 text-purple-400" />
                                            Số điện thoại
                                        </label>
                                        {isEditing ? (
                                            <Input
                                                type="tel"
                                                placeholder="Nhập số điện thoại"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="bg-slate-900/50 border-slate-700 text-white"
                                            />
                                        ) : (
                                            <p className="font-medium text-white">
                                                {profile?.phone || 'Chưa cập nhật'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Birth Location */}
                                    <div>
                                        <label className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-1.5">
                                            <MapPin className="w-4 h-4 text-purple-400" />
                                            Nơi sinh
                                        </label>
                                        {isEditing ? (
                                            <div className="space-y-2">
                                                {/* Province and Ward in two columns */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    {/* Province Select with Search */}
                                                    <div>
                                                        <label className="text-xs text-muted-foreground mb-1 block">Tỉnh/Tp</label>
                                                        <Combobox
                                                            options={provinces}
                                                            value={formData.provinceCode}
                                                            onChange={(code) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    provinceCode: code,
                                                                    wardCode: '', // Reset ward when province changes
                                                                });
                                                            }}
                                                            placeholder="Tìm kiếm tỉnh/thành phố..."
                                                            displayKey="name"
                                                            valueKey="code"
                                                            disabled={loadingProvinces}
                                                            className="bg-slate-900/50 border-slate-700 text-white"
                                                        />
                                                    </div>

                                                    {/* Ward/Commune Select with Search */}
                                                    <div>
                                                        <label className="text-xs text-muted-foreground mb-1 block">Phường/Xã</label>
                                                        <Combobox
                                                            options={wards}
                                                            value={formData.wardCode}
                                                            onChange={(code) => setFormData({ ...formData, wardCode: code })}
                                                            placeholder="Tìm kiếm phường/xã..."
                                                            displayKey="name"
                                                            valueKey="code"
                                                            disabled={loadingWards || !formData.provinceCode}
                                                            className="bg-slate-900/50 border-slate-700 text-white"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Google Maps URL Input */}
                                                <div>
                                                    <label className="text-xs text-muted-foreground mb-1 block">Hoặc dán link Google Maps</label>
                                                    <div className="flex gap-2">
                                                        <Input
                                                            type="text"
                                                            placeholder="https://maps.app.goo.gl/..."
                                                            value={formData.googleMapsUrl}
                                                            onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                                                            className="bg-slate-900/50 border-slate-700 text-white text-sm flex-1"
                                                        />
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={handleParseGoogleMapsUrl}
                                                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 whitespace-nowrap"
                                                        >
                                                            Lấy tọa độ
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Coordinates */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="text-xs text-muted-foreground mb-1 block">Vĩ độ (Latitude)</label>
                                                        <Input
                                                            type="number"
                                                            step="any"
                                                            placeholder="Ví dụ: 21.0285"
                                                            value={formData.birthLatitude}
                                                            onChange={(e) => setFormData({ ...formData, birthLatitude: e.target.value })}
                                                            className="bg-slate-900/50 border-slate-700 text-white text-sm w-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-muted-foreground mb-1 block">Kinh độ (Longitude)</label>
                                                        <Input
                                                            type="number"
                                                            step="any"
                                                            placeholder="Ví dụ: 105.8542"
                                                            value={formData.birthLongitude}
                                                            onChange={(e) => setFormData({ ...formData, birthLongitude: e.target.value })}
                                                            className="bg-slate-900/50 border-slate-700 text-white text-sm w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="font-medium text-white text-sm mb-1.5">
                                                    {profile?.birth_location || 'Chưa cập nhật'}
                                                </p>
                                                {(profile?.birth_latitude && profile?.birth_longitude) && (
                                                    <p className="text-xs text-muted-foreground">
                                                        Tọa độ: {profile.birth_latitude}, {profile.birth_longitude}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                 </div>
                            </div>
                        </div>
                            </>
                        )}

                        {/* Thống Kê Tab */}
                        {activeTab === 'dashboard' && (
                            <div className="space-y-3">
                                {loadingDashboard ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                                    </div>
                                ) : (
                                    <>
                                        {/* Statistics Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                            <Card className="bg-slate-800/50 p-3 border-slate-700/50">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                                    <span className="text-xs text-muted-foreground">Tarot</span>
                                                </div>
                                                <p className="text-lg font-bold text-white">
                                                    {dashboardStats.tarotReadings || 0}
                                                </p>
                                            </Card>

                                            <Card className="bg-slate-800/50 p-3 border-slate-700/50">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <TrendingUp className="w-4 h-4 text-pink-400" />
                                                    <span className="text-xs text-muted-foreground">Numerology</span>
                                                </div>
                                                <p className="text-lg font-bold text-white">
                                                    {dashboardStats.numerologyResults || 0}
                                                </p>
                                            </Card>

                                            <Card className="bg-slate-800/50 p-3 border-slate-700/50">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Clock className="w-4 h-4 text-blue-400" />
                                                    <span className="text-xs text-muted-foreground">Birth Chart</span>
                                                </div>
                                                <p className="text-lg font-bold text-white">
                                                    {dashboardStats.birthCharts || 0}
                                                </p>
                                            </Card>

                                            <Card className="bg-slate-800/50 p-3 border-slate-700/50">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <BookOpen className="w-4 h-4 text-green-400" />
                                                    <span className="text-xs text-muted-foreground">Nhật Ký</span>
                                                </div>
                                                <p className="text-lg font-bold text-white">
                                                    {dashboardStats.journalEntries}
                                                </p>
                                            </Card>

                                            <Card className="bg-slate-800/50 p-3 border-slate-700/50">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Heart className="w-4 h-4 text-red-400" />
                                                    <span className="text-xs text-muted-foreground">Yêu Thích</span>
                                                </div>
                                                <p className="text-lg font-bold text-white">
                                                    {dashboardStats.favorites}
                                                </p>
                                            </Card>

                                            <Card className="bg-slate-800/50 p-3 border-slate-700/50">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Bell className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-xs text-muted-foreground">Thông Báo</span>
                                                </div>
                                                <p className="text-lg font-bold text-white">
                                                    {dashboardStats.unreadNotifications > 0 ? (
                                                        <span className="text-yellow-400">{dashboardStats.unreadNotifications}</span>
                                                    ) : (
                                                        '0'
                                                    )}
                                                </p>
                                            </Card>
                                        </div>

                                        {/* Recent Activity */}
                                        <Card className="bg-slate-800/50 p-3 border-slate-700/50">
                                            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-purple-400" />
                                                Hoạt Động Gần Đây
                                            </h3>
                                            {recentActivity.length > 0 ? (
                                                <div className="space-y-2">
                                                    {recentActivity.map((activity, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {activity.type === 'tarot' && <Sparkles className="w-4 h-4 text-purple-400" />}
                                                                {activity.type === 'numerology' && <TrendingUp className="w-4 h-4 text-pink-400" />}
                                                                {activity.type === 'birth_chart' && <Clock className="w-4 h-4 text-blue-400" />}
                                                                {activity.type === 'journal' && <BookOpen className="w-4 h-4 text-green-400" />}
                                                                <span className="text-xs text-white">
                                                                    {activity.type === 'tarot' && 'Bài Tarot'}
                                                                    {activity.type === 'numerology' && 'Numerology'}
                                                                    {activity.type === 'birth_chart' && 'Birth Chart'}
                                                                    {activity.type === 'journal' && activity.title}
                                                                </span>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground">
                                                                {new Date(activity.date).toLocaleDateString('vi-VN')}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-muted-foreground text-center py-4">
                                                    Chưa có hoạt động nào
                                                </p>
                                            )}
                                        </Card>

                                        {/* Quick Links */}
                                        <div className="grid grid-cols-2 gap-2.5">
                                            <Link href="/history">
                                                <Card className="bg-slate-800/50 p-3 border-slate-700/50 hover:border-purple-500/50 transition-colors cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-purple-400" />
                                                        <span className="text-sm text-white">Lịch Sử</span>
                                                    </div>
                                                </Card>
                                            </Link>
                                            <Link href="/journal">
                                                <Card className="bg-slate-800/50 p-3 border-slate-700/50 hover:border-purple-500/50 transition-colors cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4 text-green-400" />
                                                        <span className="text-sm text-white">Nhật Ký</span>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>

            {/* Image Preview Modal */}
            <Modal
                isOpen={showImageModal}
                onClose={() => setShowImageModal(false)}
                title="Xem Ảnh Đại Diện"
            >
                <div className="flex items-center justify-center p-4">
                    {displayImage && (
                        <img
                            src={displayImage}
                            alt="Profile Preview"
                            className="max-w-full max-h-[70vh] rounded-lg object-contain"
                        />
                    )}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setShowImageModal(false)}
                    >
                        Đóng
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
