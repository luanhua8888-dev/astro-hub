import { Card } from '@/components/ui/card';

export const DailyStats = ({ stats }) => {
    if (!stats) return null;
    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Dự Báo Hôm Nay</h3>
            <p className="mb-4 text-muted-foreground">{stats.prediction}</p>
            <div className="flex justify-between items-center">
                <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.luckyNumber}</div>
                    <div className="text-xs text-muted-foreground">Con Số May Mắn</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-medium">{stats.mood}</div>
                    <div className="text-xs text-muted-foreground">Tâm Trạng</div>
                </div>
            </div>
        </Card>
    );
};
