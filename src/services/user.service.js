import { supabase } from '@/config/supabase';

export const UserService = {
    // Get or create profile (for Firebase Auth users)
    getOrCreateProfile: async (userId, email) => {
        try {
            // Try to get existing profile
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            // If profile exists, return it
            if (data) {
                return data;
            }

            // If error is not "not found", log it but don't throw
            if (error && error.code !== 'PGRST116') {
                console.warn('Error getting profile:', error);
                // Return null instead of throwing
                return null;
            }

            // Try to create profile, but don't throw if it fails
            try {
                const { data: newProfile, error: createError } = await supabase
                    .from('profiles')
                    .insert({
                        id: userId,
                        email: email,
                    })
                    .select()
                    .maybeSingle();

                if (createError) {
                    console.warn('Error creating profile:', createError);
                    return null;
                }
                return newProfile || null;
            } catch (createErr) {
                console.warn('Error creating profile:', createErr);
                return null;
            }
        } catch (error) {
            console.warn('Error getting/creating profile:', error);
            // Don't throw, just return null
            return null;
        }
    },

    getProfile: async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) throw error;
        return data;
    },

    updateProfile: async (userId, updates) => {
        try {
            // First, try to get existing profile
            const { data: existing, error: getError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            // If profile doesn't exist, create it
            if (!existing || getError?.code === 'PGRST116') {
                console.log('Profile does not exist, creating new one...');
                const { data: newProfile, error: createError } = await supabase
                    .from('profiles')
                    .insert({
                        id: userId,
                        ...updates,
                    })
                    .select()
                    .maybeSingle();
                
                if (createError) {
                    console.error('Error creating profile:', createError);
                    throw createError;
                }
                
                if (!newProfile) {
                    throw new Error('Không thể tạo profile mới');
                }
                
                return newProfile;
            }

            // Update existing profile
            console.log('Updating existing profile...');
            const { data, error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', userId)
                .select()
                .maybeSingle();
            
            if (error) {
                console.error('Error updating profile:', error);
                throw error;
            }
            
            if (!data) {
                throw new Error('Không thể cập nhật profile - không nhận được dữ liệu');
            }
            
            return data;
        } catch (error) {
            console.error('updateProfile error:', error);
            throw error;
        }
    },

    // Update avatar URL
    updateAvatar: async (userId, avatarUrl) => {
        return await UserService.updateProfile(userId, { avatar_url: avatarUrl });
    },
};
