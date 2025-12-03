'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '@/services/auth.service';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen to auth state changes
        const unsubscribe = AuthService.onAuthStateChange((user) => {
            setUser(user);
            setLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const refreshUser = () => {
        const updatedUser = AuthService.refreshUser();
        if (updatedUser) {
            setUser(updatedUser);
        }
    };

    const value = {
        user,
        loading,
        login: AuthService.login,
        register: AuthService.register,
        logout: AuthService.logout,
        resetPassword: AuthService.resetPassword,
        confirmPasswordReset: AuthService.confirmPasswordReset,
        resendVerification: AuthService.resendVerification,
        updateUserProfile: AuthService.updateUserProfile,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
