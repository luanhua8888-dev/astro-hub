import { supabase } from '@/config/supabase';

export const FavoritesService = {
    // Add to favorites
    addFavorite: async (userId, itemType, itemId, itemData = {}) => {
        try {
            const { data, error } = await supabase
                .from('favorites')
                .insert({
                    user_id: userId,
                    item_type: itemType,
                    item_id: itemId,
                    item_data: itemData,
                })
                .select()
                .single();
            
            if (error) {
                // If duplicate, return existing
                if (error.code === '23505') {
                    const { data: existing } = await supabase
                        .from('favorites')
                        .select('*')
                        .eq('user_id', userId)
                        .eq('item_type', itemType)
                        .eq('item_id', itemId)
                        .single();
                    return existing;
                }
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw error;
        }
    },

    // Remove from favorites
    removeFavorite: async (userId, itemType, itemId) => {
        try {
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', userId)
                .eq('item_type', itemType)
                .eq('item_id', itemId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error removing favorite:', error);
            throw error;
        }
    },

    // Check if item is favorited
    isFavorite: async (userId, itemType, itemId) => {
        try {
            const { data, error } = await supabase
                .from('favorites')
                .select('id')
                .eq('user_id', userId)
                .eq('item_type', itemType)
                .eq('item_id', itemId)
                .maybeSingle();
            
            if (error && error.code !== 'PGRST116') throw error;
            return !!data;
        } catch (error) {
            console.error('Error checking favorite:', error);
            return false;
        }
    },

    // Get all favorites
    getFavorites: async (userId, itemType = null) => {
        try {
            let query = supabase
                .from('favorites')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (itemType) {
                query = query.eq('item_type', itemType);
            }

            const { data, error } = await query;
            
            if (error) {
                // If table doesn't exist, return empty array
                if (error.code === '42P01' || error.code === 'PGRST301' || error.message?.includes('does not exist')) {
                    console.warn('Favorites table not accessible:', error.message);
                    return [];
                }
                throw error;
            }
            return data || [];
        } catch (error) {
            console.error('Error getting favorites:', error);
            // Return empty array instead of throwing
            return [];
        }
    },

    // Get favorites by type
    getFavoritesByType: async (userId, itemType, limit = 50) => {
        try {
            const { data, error } = await supabase
                .from('favorites')
                .select('*')
                .eq('user_id', userId)
                .eq('item_type', itemType)
                .order('created_at', { ascending: false })
                .limit(limit);
            
            if (error) {
                // If table doesn't exist, return empty array
                if (error.code === '42P01' || error.code === 'PGRST301' || error.message?.includes('does not exist')) {
                    console.warn('Favorites table not accessible:', error.message);
                    return [];
                }
                throw error;
            }
            return data || [];
        } catch (error) {
            console.error('Error getting favorites by type:', error);
            // Return empty array instead of throwing
            return [];
        }
    },
};

