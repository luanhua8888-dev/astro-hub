'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import { getLifePathNumber } from '@/lib/numerology/getLifePathNumber';
import numerologyData from '@/data/numerology.json';
import { NumberResult } from '@/components/modules/numerology/NumberResult';
import { Loader } from '@/components/ui/loader';

function ResultContent() {
    const searchParams = useSearchParams();
    const date = searchParams.get('date');

    const result = useMemo(() => {
        if (!date) return null;
        const [year, month, day] = date.split('-').map(Number);
        const number = getLifePathNumber(day, month, year);
        return { number, data: numerologyData[number] };
    }, [date]);

    if (!date) return <div>Ngày không hợp lệ</div>;
    if (!result) return <Loader />;

    return (
        <div className="container mx-auto py-12 px-4">
            <NumberResult number={result.number} data={result.data} />
        </div>
    );
}

export default function NumerologyResultPage() {
    return (
        <Suspense fallback={<Loader />}>
            <ResultContent />
        </Suspense>
    );
}
