export interface ZodiacSign {
    sign: string;
    element: string;
    quality: string;
    ruler: string;
    traits: string[];
}

export interface DailyHoroscope {
    sign: string;
    date: string;
    prediction: string;
    luckyNumber: number;
    mood: string;
}
