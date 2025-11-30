'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export const NumberResult = ({ number, data }) => {
    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="p-8 text-center max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6">
                    {number}
                </div>
                <h2 className="text-3xl font-bold mb-2">Con Số Chủ Đạo {number}</h2>
                <p className="text-xl text-muted-foreground mb-6">{data.meaning}</p>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div>
                        <h3 className="font-semibold text-green-500 mb-2">Điểm Mạnh</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-red-500 mb-2">Điểm Yếu</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {data.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
