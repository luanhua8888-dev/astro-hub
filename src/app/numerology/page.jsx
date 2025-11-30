'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Card } from '@/components/ui/card';

export default function NumerologyPage() {
    const [birthdate, setBirthdate] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (birthdate) {
            router.push(`/numerology/result?date=${birthdate}`);
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 flex justify-center">
            <Card className="w-full max-w-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Máy Tính Thần Số Học</h1>
                <p className="text-center text-muted-foreground mb-8">
                    Nhập ngày sinh của bạn để khám phá Con Số Chủ Đạo.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <DatePicker
                        value={birthdate}
                        onChange={setBirthdate}
                        placeholder="Chọn ngày sinh của bạn"
                    />
                    <Button type="submit" className="w-full size-lg" disabled={!birthdate}>
                        Tính Toán
                    </Button>
                </form>
            </Card>
        </div>
    );
}
