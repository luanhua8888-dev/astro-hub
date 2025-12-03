import { supabase } from '@/config/supabase';

export const CompatibilityService = {
    // Save compatibility record
    saveCompatibility: async (userId, compatibilityData) => {
        try {
            const { data, error } = await supabase
                .from('compatibility_records')
                .insert({
                    user_id: userId,
                    partner_name: compatibilityData.partnerName || '',
                    partner_birth_date: compatibilityData.partnerBirthDate || null,
                    partner_birth_time: compatibilityData.partnerBirthTime || null,
                    partner_birth_location: compatibilityData.partnerBirthLocation || '',
                    compatibility_data: compatibilityData.compatibilityData || {},
                    notes: compatibilityData.notes || '',
                })
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error saving compatibility record:', error);
            throw error;
        }
    },

    // Get all compatibility records
    getCompatibilityRecords: async (userId, limit = 50) => {
        try {
            const { data, error } = await supabase
                .from('compatibility_records')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(limit);
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error getting compatibility records:', error);
            throw error;
        }
    },

    // Get single compatibility record
    getCompatibilityRecord: async (userId, recordId) => {
        try {
            const { data, error } = await supabase
                .from('compatibility_records')
                .select('*')
                .eq('id', recordId)
                .eq('user_id', userId)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error getting compatibility record:', error);
            throw error;
        }
    },

    // Update compatibility record
    updateCompatibility: async (userId, recordId, updates) => {
        try {
            const { data, error } = await supabase
                .from('compatibility_records')
                .update({
                    partner_name: updates.partnerName,
                    partner_birth_date: updates.partnerBirthDate,
                    partner_birth_time: updates.partnerBirthTime,
                    partner_birth_location: updates.partnerBirthLocation,
                    compatibility_data: updates.compatibilityData,
                    notes: updates.notes,
                })
                .eq('id', recordId)
                .eq('user_id', userId)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating compatibility record:', error);
            throw error;
        }
    },

    // Delete compatibility record
    deleteCompatibility: async (userId, recordId) => {
        try {
            const { error } = await supabase
                .from('compatibility_records')
                .delete()
                .eq('id', recordId)
                .eq('user_id', userId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting compatibility record:', error);
            throw error;
        }
    },
};
