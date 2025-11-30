import { useZodiacStore } from '@/store/zodiac.store';
import { getZodiacSign } from '@/lib/zodiac/getZodiacSign';

export const useZodiac = () => {
    const { selectedSign, setSelectedSign } = useZodiacStore();

    const calculateSign = (date) => {
        const d = new Date(date);
        const sign = getZodiacSign(d.getDate(), d.getMonth() + 1);
        return sign;
    };

    return { selectedSign, setSelectedSign, calculateSign };
};
