const compatibilityData = {
    default: {
        score: 70,
        title: "Tương Hợp Khá",
        description: "Hai bạn có nhiều điểm chung nhưng cũng cần nỗ lực để thấu hiểu nhau hơn. Hãy kiên nhẫn và lắng nghe đối phương.",
        aspects: {
            emotional: 75,
            communication: 65,
            intimacy: 70,
            trust: 70
        }
    },
    high: {
        score: 95,
        title: "Cặp Đôi Hoàn Hảo",
        description: "Hai bạn sinh ra là để dành cho nhau! Sự thấu hiểu và đồng điệu giữa hai tâm hồn thật đáng ngưỡng mộ.",
        aspects: {
            emotional: 98,
            communication: 95,
            intimacy: 92,
            trust: 95
        }
    },
    low: {
        score: 45,
        title: "Cần Nhiều Nỗ Lực",
        description: "Sự khác biệt về tính cách có thể gây ra mâu thuẫn. Cả hai cần học cách chấp nhận và tôn trọng sự khác biệt của nhau.",
        aspects: {
            emotional: 40,
            communication: 50,
            intimacy: 45,
            trust: 45
        }
    }
};

// Logic giả lập độ hợp nhau dựa trên nguyên tố (Fire, Earth, Air, Water)
const elements = {
    Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
    Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
    Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
    Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water'
};

export const CompatibilityService = {
    calculate: (sign1, sign2) => {
        const elem1 = elements[sign1];
        const elem2 = elements[sign2];

        let result = { ...compatibilityData.default };

        // Cùng nguyên tố -> Hợp nhau nhất
        if (elem1 === elem2) {
            result = { ...compatibilityData.high };
        }
        // Các cặp nguyên tố hợp nhau: Fire-Air, Earth-Water
        else if (
            (elem1 === 'Fire' && elem2 === 'Air') || (elem1 === 'Air' && elem2 === 'Fire') ||
            (elem1 === 'Earth' && elem2 === 'Water') || (elem1 === 'Water' && elem2 === 'Earth')
        ) {
            result.score = 85;
            result.title = "Tương Hợp Tốt";
            result.description = "Hai bạn bổ sung cho nhau rất tốt. Một mối quan hệ hài hòa và bền vững.";
        }
        // Các cặp xung khắc: Fire-Water, Air-Earth
        else if (
            (elem1 === 'Fire' && elem2 === 'Water') || (elem1 === 'Water' && elem2 === 'Fire') ||
            (elem1 === 'Air' && elem2 === 'Earth') || (elem1 === 'Earth' && elem2 === 'Air')
        ) {
            result = { ...compatibilityData.low };
        }

        // Randomize nhẹ để không bị trùng lặp hoàn toàn
        const randomOffset = Math.floor(Math.random() * 10) - 5;
        result.score = Math.min(100, Math.max(0, result.score + randomOffset));

        return {
            sign1,
            sign2,
            ...result
        };
    }
};
