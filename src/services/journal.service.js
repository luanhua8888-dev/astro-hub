import { supabase } from '@/config/supabase';

export const JournalService = {
    // Create journal entry
    createEntry: async (userId, entryData) => {
        try {
            const { data, error } = await supabase
                .from('spiritual_journal')
                .insert({
                    user_id: userId,
                    title: entryData.title || '',
                    content: entryData.content || '',
                    entry_type: entryData.entryType || 'general',
                    related_data: entryData.relatedData || {},
                    mood: entryData.mood || null,
                    tags: entryData.tags || [],
                })
                .select()
                .single();
            
            if (error) {
                // If table doesn't exist, log and return null
                if (error.code === '42P01' || error.code === 'PGRST301' || error.message?.includes('does not exist')) {
                    console.warn('Journal table not found. Please run migration SQL:', error.message);
                    throw new Error('Bảng nhật ký chưa được tạo. Vui lòng chạy migration SQL trong Supabase Dashboard.');
                }
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Error creating journal entry:', error);
            throw error;
        }
    },

    // Get all entries
    getEntries: async (userId, filters = {}) => {
        try {
            let query = supabase
                .from('spiritual_journal')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (filters.entryType) {
                query = query.eq('entry_type', filters.entryType);
            }

            if (filters.startDate) {
                query = query.gte('created_at', filters.startDate);
            }

            if (filters.endDate) {
                query = query.lte('created_at', filters.endDate);
            }

            if (filters.search) {
                query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
            }

            if (filters.limit) {
                query = query.limit(filters.limit);
            }

            const { data, error } = await query;
            
            if (error) {
                // If table doesn't exist, return empty array
                if (error.code === '42P01' || error.code === 'PGRST301' || error.message?.includes('does not exist')) {
                    console.warn('Journal table not found. Please run migration SQL.');
                    return [];
                }
                throw error;
            }
            return data || [];
        } catch (error) {
            console.error('Error getting journal entries:', error);
            // Return empty array instead of throwing
            return [];
        }
    },

    // Get single entry
    getEntry: async (userId, entryId) => {
        try {
            const { data, error } = await supabase
                .from('spiritual_journal')
                .select('*')
                .eq('id', entryId)
                .eq('user_id', userId)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error getting journal entry:', error);
            throw error;
        }
    },

    // Update entry
    updateEntry: async (userId, entryId, updates) => {
        try {
            const { data, error } = await supabase
                .from('spiritual_journal')
                .update({
                    title: updates.title,
                    content: updates.content,
                    entry_type: updates.entryType,
                    related_data: updates.relatedData,
                    mood: updates.mood,
                    tags: updates.tags,
                })
                .eq('id', entryId)
                .eq('user_id', userId)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating journal entry:', error);
            throw error;
        }
    },

    // Delete entry
    deleteEntry: async (userId, entryId) => {
        try {
            const { error } = await supabase
                .from('spiritual_journal')
                .delete()
                .eq('id', entryId)
                .eq('user_id', userId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting journal entry:', error);
            throw error;
        }
    },

    // Get entries by type
    getEntriesByType: async (userId, entryType, limit = 20) => {
        try {
            const { data, error } = await supabase
                .from('spiritual_journal')
                .select('*')
                .eq('user_id', userId)
                .eq('entry_type', entryType)
                .order('created_at', { ascending: false })
                .limit(limit);
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error getting entries by type:', error);
            throw error;
        }
    },
};

