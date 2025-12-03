import { supabase } from '@/config/supabase';

export const StorageService = {
    // Upload profile image to Supabase Storage
    uploadProfileImage: async (userId, file) => {
        try {
            // Validate Supabase config
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
            
            if (!supabaseUrl || supabaseUrl.includes('placeholder') || 
                !supabaseKey || supabaseKey.includes('placeholder')) {
                throw new Error('Supabase chưa được cấu hình. Vui lòng kiểm tra file .env.local');
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error('File phải là hình ảnh');
            }

            // Validate file size (max 2MB - Supabase free tier limit)
            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                throw new Error('Kích thước file không được vượt quá 2MB');
            }

            // Create unique file name
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `profiles/${userId}/${fileName}`;

            // Upload file to Supabase Storage
            // Note: Since we're using Firebase Auth, we'll use public bucket
            // The folder structure (profiles/{userId}/) provides basic organization
            const { error } = await supabase.storage
                .from('AstroHub')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.type
                });

            if (error) {
                console.error('Supabase upload error:', error);
                
                // Provide specific error messages
                let errorMessage = 'Không thể upload hình ảnh. Vui lòng thử lại.';
                
                if (error.message?.includes('Bucket not found') || error.message?.includes('not found')) {
                    errorMessage = 'Bucket "AstroHub" chưa được tạo trong Supabase Storage. Vui lòng tạo bucket trước.';
                } else if (error.message?.includes('new row violates row-level security policy') || 
                          error.message?.includes('policy')) {
                    errorMessage = 'Lỗi quyền truy cập. Vui lòng kiểm tra Storage Policies trong Supabase Dashboard.';
                } else if (error.message?.includes('JWT') || error.message?.includes('token')) {
                    errorMessage = 'Lỗi xác thực. Vui lòng đăng nhập lại.';
                } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
                    errorMessage = 'Lỗi kết nối. Vui lòng kiểm tra: 1) Supabase URL và Key trong .env.local, 2) Bucket "AstroHub" đã được tạo chưa, 3) Policies đã được cấu hình chưa.';
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                throw new Error(errorMessage);
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('AstroHub')
                .getPublicUrl(filePath);

            return urlData.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            
            // Re-throw with better message if it's already our custom error
            if (error.message && !error.message.includes('Không thể upload')) {
                throw error;
            }
            
            // Provide more specific error messages
            let errorMessage = 'Không thể upload hình ảnh. Vui lòng thử lại.';
            
            if (error.message?.includes('already exists')) {
                errorMessage = 'File đã tồn tại. Vui lòng chọn file khác.';
            } else if (error.message?.includes('not found')) {
                errorMessage = 'Storage bucket chưa được tạo. Vui lòng kiểm tra cấu hình Supabase.';
            } else if (error.message?.includes('JWT')) {
                errorMessage = 'Lỗi xác thực. Vui lòng đăng nhập lại.';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            throw new Error(errorMessage);
        }
    },

    // Delete profile image from Supabase Storage
    deleteProfileImage: async (imageUrl) => {
        try {
            // Extract path from Supabase Storage URL
            // URL format: https://[project].supabase.co/storage/v1/object/public/AstroHub/profiles/[userId]/[filename]
            const urlParts = imageUrl.split('/');
            const publicIndex = urlParts.findIndex(part => part === 'public');
            
            if (publicIndex === -1) {
                console.warn('Invalid Supabase Storage URL:', imageUrl);
                return;
            }

            // Get path after 'public/AstroHub/'
            const pathParts = urlParts.slice(publicIndex + 1);
            const filePath = pathParts.slice(1).join('/'); // Skip 'AstroHub' bucket name

            // Delete file from Supabase Storage
            const { error } = await supabase.storage
                .from('AstroHub')
                .remove([filePath]);

            if (error) {
                console.error('Error deleting image:', error);
                // Don't throw error, just log it
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            // Don't throw error, just log it
        }
    },
};
