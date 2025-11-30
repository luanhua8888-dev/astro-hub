import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">404 - Không Tìm Thấy Trang</h2>
            <p className="text-muted-foreground mb-8">Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
            <Link href="/">
                <Button>Trở Về Trang Chủ</Button>
            </Link>
        </div>
    );
}
