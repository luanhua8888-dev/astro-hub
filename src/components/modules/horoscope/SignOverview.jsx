import { Card } from '@/components/ui/card';

export const SignOverview = ({ data }) => {
    if (!data) return null;
    return (
        <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Tổng Quan</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="font-semibold">Nguyên tố:</span> {data.element}
                </div>
                <div>
                    <span className="font-semibold">Tính chất:</span> {data.quality}
                </div>
                <div>
                    <span className="font-semibold">Sao chiếu mệnh:</span> {data.ruler}
                </div>
            </div>
            <div>
                <span className="font-semibold">Đặc điểm:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                    {data.traits.map((trait, i) => (
                        <span key={i} className="bg-secondary px-2 py-1 rounded-md text-sm">
                            {trait}
                        </span>
                    ))}
                </div>
            </div>
        </Card>
    );
};
