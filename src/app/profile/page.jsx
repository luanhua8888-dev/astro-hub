'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await AuthService.logout();
        router.push('/login');
    };

    if (!user) {
        return <div className="p-8 text-center">Vui lòng đăng nhập để xem hồ sơ của bạn.</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">Hồ Sơ</h1>
            <div className="bg-card p-6 rounded-lg border">
                <p className="mb-4">Email: {user.email}</p>
                <Button onClick={handleLogout} variant="destructive">Đăng Xuất</Button>
            </div>
        </div>
    );
}
