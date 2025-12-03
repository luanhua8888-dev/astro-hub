import { supabase } from '@/config/supabase';

export const TransitService = {
    // Save transit record
    saveTransit: async (userId, transitData) => {
        try {
            const { data, error } = await supabase
                .from('transit_records')
                .insert({
                    user_id: userId,
                    transit_date: transitData.transitDate || new Date().toISOString().split('T')[0],
                    transit_type: transitData.transitType || 'daily',
                    transit_data: transitData.transitData || {},
                    notes: transitData.notes || '',
                })
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error saving transit record:', error);
            throw error;
        }
    },

    // Get transit records
    getTransits: async (userId, filters = {}) => {
        try {
            let query = supabase
                .from('transit_records')
                .select('*')
                .eq('user_id', userId)
                .order('transit_date', { ascending: false });

            if (filters.transitType) {
                query = query.eq('transit_type', filters.transitType);
            }

            if (filters.startDate) {
                query = query.gte('transit_date', filters.startDate);
            }

            if (filters.endDate) {
                query = query.lte('transit_date', filters.endDate);
            }

            if (filters.limit) {
                query = query.limit(filters.limit);
            }

            const { data, error } = await query;
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error getting transit records:', error);
            throw error;
        }
    },

    // Get transit by date
    getTransitByDate: async (userId, date, transitType = null) => {
        try {
            let query = supabase
                .from('transit_records')
                .select('*')
                .eq('user_id', userId)
                .eq('transit_date', date);

            if (transitType) {
                query = query.eq('transit_type', transitType);
            }

            const { data, error } = await query;
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error getting transit by date:', error);
            throw error;
        }
    },

    // Delete transit record
    deleteTransit: async (userId, transitId) => {
        try {
            const { error } = await supabase
                .from('transit_records')
                .delete()
                .eq('id', transitId)
                .eq('user_id', userId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting transit record:', error);
            throw error;
        }
    },
};

