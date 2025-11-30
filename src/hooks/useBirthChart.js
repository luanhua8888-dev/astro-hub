import { useState, useCallback } from 'react';
import { BirthChartService } from '@/services/birthchart.service';

export const useBirthChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateChart = useCallback(async (data) => {
        setLoading(true);
        try {
            const result = await BirthChartService.createChart(data);
            setChartData(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { chartData, loading, generateChart };
};
