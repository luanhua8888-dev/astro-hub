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

    // Calculate compatibility (Mock logic for frontend)
    calculate: (sign1, sign2) => {
        // Simple consistent hash-based scoring
        const combined = [sign1, sign2].sort().join('-');
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = ((hash << 5) - hash) + combined.charCodeAt(i);
            hash |= 0;
        }

        // Normalize hash to 0-100 range with a bias towards higher scores for better UX
        const baseScore = Math.abs(hash % 41) + 60; // 60-100 random base

        // Aspect scores
        const aspects = {
            emotional: Math.min(100, Math.abs((hash * 2) % 40) + 60),
            communication: Math.min(100, Math.abs((hash * 3) % 40) + 60),
            intimacy: Math.min(100, Math.abs((hash * 4) % 40) + 60),
            trust: Math.min(100, Math.abs((hash * 5) % 40) + 60),
        };

        // Titles based on score
        let title = '';
        let description = '';

        if (baseScore >= 90) {
            title = 'Cặp Đôi Định Mệnh';
            description = 'Hai bạn sinh ra là để dành cho nhau. Sự hòa hợp giữa hai người gần như tuyệt đối, tạo nên một mối quan hệ bền vững và đầy đam mê.';
        } else if (baseScore >= 80) {
            title = 'Hòa Hợp Tuyệt Vời';
            description = 'Hai bạn có rất nhiều điểm chung và bổ sung cho nhau rất tốt. Mối quan hệ này hứa hẹn sẽ mang lại nhiều niềm vui và hạnh phúc.';
        } else if (baseScore >= 70) {
            title = 'Tương Lai Hứa Hẹn';
            description = 'Dù có vài khác biệt, nhưng hai bạn hoàn toàn có thể xây dựng một mối quan hệ tốt đẹp nếu biết lắng nghe và thấu hiểu nhau.';
        } else {
            title = 'Thử Thách Thú Vị';
            description = 'Hai bạn là hai mảnh ghép trái ngược nhau. Mối quan hệ này sẽ cần nhiều sự nỗ lực và kiên nhẫn, nhưng chính sự khác biệt sẽ tạo nên sức hút.';
        }

        return {
            score: baseScore,
            title,
            description,
            aspects
        };
    }
};
