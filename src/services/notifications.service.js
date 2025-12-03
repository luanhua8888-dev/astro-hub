import { supabase } from '@/config/supabase';

export const NotificationsService = {
    // Create notification
    createNotification: async (userId, notificationData) => {
        try {
            const { data, error } = await supabase
                .from('notifications')
                .insert({
                    user_id: userId,
                    type: notificationData.type || 'general',
                    title: notificationData.title || '',
                    message: notificationData.message || '',
                    action_url: notificationData.actionUrl || null,
                })
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    },

    // Get all notifications
    getNotifications: async (userId, filters = {}) => {
        try {
            let query = supabase
                .from('notifications')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (filters.isRead !== undefined) {
                query = query.eq('is_read', filters.isRead);
            }

            if (filters.type) {
                query = query.eq('type', filters.type);
            }

            if (filters.limit) {
                query = query.limit(filters.limit);
            }

            const { data, error } = await query;
            
            if (error) {
                // If table doesn't exist, return empty array
                if (error.code === '42P01' || error.code === 'PGRST301' || error.message?.includes('does not exist')) {
                    console.warn('Notifications table not accessible:', error.message);
                    return [];
                }
                throw error;
            }
            return data || [];
        } catch (error) {
            console.error('Error getting notifications:', error);
            // Return empty array instead of throwing
            return [];
        }
    },

    // Get unread count
    getUnreadCount: async (userId) => {
        try {
            const { count, error } = await supabase
                .from('notifications')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .eq('is_read', false);
            
            if (error) {
                // If table doesn't exist, return 0
                if (error.code === '42P01' || error.code === 'PGRST301' || error.message?.includes('does not exist')) {
                    console.warn('Notifications table not accessible:', error.message);
                    return 0;
                }
                throw error;
            }
            return count || 0;
        } catch (error) {
            console.error('Error getting unread count:', error);
            return 0;
        }
    },

    // Mark as read
    markAsRead: async (userId, notificationId) => {
        try {
            const { data, error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('id', notificationId)
                .eq('user_id', userId)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    },

    // Mark all as read
    markAllAsRead: async (userId) => {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('user_id', userId)
                .eq('is_read', false);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error marking all as read:', error);
            throw error;
        }
    },

    // Delete notification
    deleteNotification: async (userId, notificationId) => {
        try {
            const { error } = await supabase
                .from('notifications')
                .delete()
                .eq('id', notificationId)
                .eq('user_id', userId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    },
};

