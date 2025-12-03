'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SignOverview } from '@/components/modules/horoscope/SignOverview';
import { SignDetails } from '@/components/modules/horoscope/SignDetails';
import { DailyStats } from '@/components/modules/horoscope/DailyStats';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader } from '@/components/ui/loader';
import { HoroscopeService } from '@/services/horoscope.service';
import { getZodiacDisplayName } from '@/utils/zodiac-names';

export default function SignPage() {
    const params = useParams();
    const [signData, setSignData] = useState(null);
    const [dailyData, setDailyData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (params.sign) {
                setLoading(true);
                try {
                    // Get sign info (async now)
                    const info = await HoroscopeService.getSignInfo(params.sign);
                    setSignData(info);

                    // Get daily horoscope (tự động dùng API nếu có)
                    const daily = await HoroscopeService.getDailyHoroscope(params.sign, true);
                    setDailyData(daily);
                } catch (error) {
                    console.error('Error fetching horoscope data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [params.sign]);

    if (loading) return <Loader />;
    if (!signData) return <div className="text-center py-12">Không tìm thấy thông tin cung hoàng đạo.</div>;

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="mb-8">
                <Link href="/horoscope">
                    <Button variant="outline">← Quay lại</Button>
                </Link>
            </div>

            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold mb-6 capitalize">
                        {getZodiacDisplayName(params.sign)}
                    </h1>
                    <div className="grid gap-6 md:grid-cols-2">
                        <SignOverview data={signData} />
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Dự Báo Hàng Ngày</h2>
                            {dailyData && <DailyStats stats={dailyData} />}
                        </div>
                    </div>
                </div>

                {/* Chi Tiết */}
                <SignDetails data={signData} />
            </div>
        </div>
    );
}
