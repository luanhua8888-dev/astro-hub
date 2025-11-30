import { generateBirthChart } from '@/lib/astrology/generateBirthChart';
import { calculateAspects } from '@/lib/astrology/calculateAspects';

export const BirthChartService = {
    createChart: async (data) => {
        // In a real app, this might save to DB
        const positions = generateBirthChart(data.date, data.time, data.location);
        const aspects = calculateAspects(positions);
        return { positions, aspects };
    },
};
