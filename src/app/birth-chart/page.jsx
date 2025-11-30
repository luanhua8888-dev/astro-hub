'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { TimePicker } from '@/components/ui/timepicker';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function BirthChartPage() {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: '',
    });
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = new URLSearchParams(formData).toString();
        router.push(`/birth-chart/detail?${query}`);
    };

    const isFormValid = formData.date && formData.time && formData.location;

    return (
        <div className="container mx-auto py-12 px-4 flex justify-center">
            <Card className="w-full max-w-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Tạo Lá Số Tử Vi Của Bạn</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Ngày Sinh</label>
                        <DatePicker
                            value={formData.date}
                            onChange={(date) => setFormData({ ...formData, date })}
                            placeholder="Chọn ngày sinh"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Giờ Sinh</label>
                        <TimePicker
                            value={formData.time}
                            onChange={(time) => setFormData({ ...formData, time })}
                            placeholder="Chọn giờ sinh"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Nơi Sinh (Thành phố)</label>
                        <Input
                            type="text"
                            placeholder="VD: Thành phố Hồ Chí Minh"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full size-lg" disabled={!isFormValid}>
                        Tạo Lá Số
                    </Button>
                </form>
            </Card>
        </div>
    );
}
