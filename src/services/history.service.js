import { supabase } from '@/config/supabase';

export const HistoryService = {
    // ============================================
    // TAROT HISTORY
    // ============================================
    
    saveTarotReading: async (userId, readingData) => {
        try {
            const { data, error } = await supabase
                .from('tarot_history')
                .insert({
                    user_id: userId,
                    card_name: readingData.cardName || '',
                    card_meaning: readingData.meaning || '',
                    spread_type: readingData.spreadType || 'single',
                    reading_data: readingData,
                })
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error saving tarot reading:', error);
            throw error;
        }
    },

    getTarotHistory: async (userId, limit = 50) => {
        try {
            const { data, error } = await supabase
                .from('tarot_history')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(limit);
            
            if (error) {
                // If table doesn't exist or RLS issue, return empty array
                if (error.code === '42P01' || error.code === 'PGRST301' || error.message?.includes('permission denied')) {
                    console.warn('Tarot history table not accessible:', error.message);
                    return [];
                }
                throw error;
            }
            return data || [];
        } catch (error) {
            console.error('Error getting tarot history:', error);
            // Return empty array instead of throwing to prevent breaking the app
            return [];
        }
    },

    deleteTarotReading: async (userId, readingId) => {
        try {
            const { error } = await supabase
                .from('tarot_history')
                .delete()
                .eq('id', readingId)
                .eq('user_id', userId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting tarot reading:', error);
            throw error;
        }
    },

    // ============================================
    // NUMEROLOGY HISTORY
    // ============================================
    
    saveNumerologyResult: async (userId, resultData) => {
        try {
            const { data, error } = await supabase
                .from('numerology_history')
                .insert({
                    user_id: userId,
                    name: resultData.name || '',
                    birth_date: resultData.birthDate || null,
                    life_path_number: resultData.lifePathNumber || null,
                    result_data: resultData,
                })
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error saving numerology result:', error);
            throw error;
        }
    },

    getNumerologyHistory: async (userId, limit = 50) => {
        try {
            const { data, error } = await supabase
                .from('numerology_history')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(limit);
            
            if (error) {
                // If table doesn't exist or RLS issue, return empty array
                if (error.code === '42P01' || error.code === 'PGRST301' || error.message?.includes('permission denied')) {
                    console.warn('Numerology history table not accessible:', error.message);
                    return [];
                }
                throw error;
            }
            return data || [];
        } catch (error) {
            console.error('Error getting numerology history:', error);
            // Return empty array instead of throwing to prevent breaking the app
            return [];
        }
    },

    deleteNumerologyResult: async (userId, resultId) => {
        try {
            const { error } = await supabase
                .from('numerology_history')
                .delete()
                .eq('id', resultId)
                .eq('user_id', userId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting numerology result:', error);
            throw error;
        }
    },

    // ============================================
    // BIRTH CHART HISTORY (sử dụng bảng birth_charts có sẵn)
    // ============================================
    
    getBirthChartHistory: async (userId, limit = 50) => {
        try {
            // Convert userId to string if it's not already (for Firebase Auth compatibility)
            const userIdStr = String(userId);
            
            const { data, error } = await supabase
                .from('birth_charts')
                .select('*')
                .eq('user_id', userIdStr)
                .order('created_at', { ascending: false })
                .limit(limit);
            
            if (error) {
                // If table doesn't exist or RLS issue, return empty array
                if (error.code === '42P01' || 
                    error.code === 'PGRST301' || 
                    error.code === '42501' ||
                    error.code === 'PGRST116' ||
                    error.message?.includes('permission denied') ||
                    error.message?.includes('does not exist') ||
                    error.message?.includes('relation') ||
                    error.message?.includes('schema cache') ||
                    !error.message) {
                    console.warn('Birth chart history table not accessible:', error.code || error.message || 'Unknown error');
                    return [];
                }
                // Log other errors but still return empty array
                console.warn('Error getting birth chart history:', error.code, error.message || 'Unknown error');
                return [];
            }
            return data || [];
        } catch (error) {
            console.warn('Error getting birth chart history (catch):', error?.code || error?.message || 'Unknown error');
            // Always return empty array instead of throwing to prevent breaking the app
            return [];
        }
    },
};

