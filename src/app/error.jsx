'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Đã Xảy Ra Lỗi!</h2>
            <p className="text-muted-foreground mb-8">Đã có lỗi không mong muốn xảy ra. Vui lòng thử lại.</p>
            <Button onClick={() => reset()}>Thử Lại</Button>
        </div>
    );
}
