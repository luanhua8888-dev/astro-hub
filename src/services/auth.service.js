import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateProfile,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

export const AuthService = {
    // Register new user
    register: async (email, password, displayName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update display name
            if (displayName) {
                await updateProfile(user, { displayName });
            }

            // Send email verification
            await sendEmailVerification(user);

            return {
                user: {
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                },
                message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.',
            };
        } catch (error) {
            throw new Error(getErrorMessage(error.code));
        }
    },

    // Login user
    login: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            return {
                user: {
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                },
            };
        } catch (error) {
            throw new Error(getErrorMessage(error.code));
        }
    },

    // Logout user
    logout: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error('Đăng xuất thất bại. Vui lòng thử lại.');
        }
    },

    // Send password reset email
    resetPassword: async (email) => {
        try {
            // Get the current origin (works in browser environment)
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            const actionCodeSettings = {
                url: `${origin}/reset`,
                handleCodeInApp: false,
            };

            // Log for debugging (remove in production)
            if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
                console.log('Sending password reset email to:', email);
                console.log('Redirect URL:', actionCodeSettings.url);
            }

            // Firebase will automatically append oobCode and mode query params to the URL
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            
            return { message: 'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn (bao gồm cả thư mục spam).' };
        } catch (error) {
            // Log error for debugging
            if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
                console.error('Password reset error:', error);
            }
            throw new Error(getErrorMessage(error.code));
        }
    },

    // Confirm password reset
    confirmPasswordReset: async (oobCode, newPassword) => {
        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            return { message: 'Mật khẩu đã được đặt lại thành công. Bạn có thể đăng nhập với mật khẩu mới.' };
        } catch (error) {
            throw new Error(getErrorMessage(error.code));
        }
    },

    // Update user profile (photoURL, displayName)
    updateUserProfile: async (updates) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('Không tìm thấy người dùng.');
            }
            await updateProfile(user, updates);
            return {
                user: {
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified,
                },
            };
        } catch (error) {
            throw new Error('Không thể cập nhật hồ sơ. Vui lòng thử lại.');
        }
    },

    // Resend email verification
    resendVerification: async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('Không tìm thấy người dùng.');
            }
            await sendEmailVerification(user);
            return { message: 'Email xác thực đã được gửi lại.' };
        } catch (error) {
            throw new Error('Không thể gửi email xác thực. Vui lòng thử lại.');
        }
    },

    // Get current user
    getCurrentUser: () => {
        return auth.currentUser;
    },

    // Listen to auth state changes
    onAuthStateChange: (callback) => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                callback({
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified,
                });
            } else {
                callback(null);
            }
        });
    },

    // Refresh current user
    refreshUser: () => {
        const user = auth.currentUser;
        if (user) {
            return {
                id: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
            };
        }
        return null;
    },
};

// Helper function to get Vietnamese error messages
function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'Email này đã được sử dụng.',
        'auth/invalid-email': 'Email không hợp lệ.',
        'auth/operation-not-allowed': 'Thao tác không được phép.',
        'auth/weak-password': 'Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn.',
        'auth/user-disabled': 'Tài khoản này đã bị vô hiệu hóa.',
        'auth/user-not-found': 'Không tìm thấy tài khoản với email này.',
        'auth/wrong-password': 'Mật khẩu không đúng.',
        'auth/invalid-credential': 'Thông tin đăng nhập không hợp lệ.',
        'auth/too-many-requests': 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
        'auth/network-request-failed': 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.',
        'auth/expired-action-code': 'Link đặt lại mật khẩu đã hết hạn. Vui lòng yêu cầu link mới.',
        'auth/invalid-action-code': 'Link đặt lại mật khẩu không hợp lệ. Vui lòng yêu cầu link mới.',
    };

    return errorMessages[errorCode] || 'Đã xảy ra lỗi. Vui lòng thử lại.';
}
