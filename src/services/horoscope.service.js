import zodiacData from '@/data/zodiac.json';

const moodOptions = ['Vui vẻ', 'Lạc quan', 'Bình tĩnh', 'Tự tin', 'Sáng tạo', 'Năng động'];
const predictions = {
    Aries: 'Hôm nay là ngày tuyệt vời để bạn khám phá những cơ hội mới và thể hiện sự dũng cảm của mình.',
    Taurus: 'Sự kiên nhẫn của bạn sẽ được đền đáp. Hãy tập trung vào những mục tiêu dài hạn.',
    Gemini: 'Khả năng giao tiếp của bạn đang ở đỉnh cao. Đây là thời điểm tốt để kết nối với mọi người.',
    Cancer: 'Hãy lắng nghe trực giác của bạn. Gia đình và tình cảm sẽ mang lại niềm vui.',
    Leo: 'Sự tự tin và sáng tạo của bạn sẽ tỏa sáng. Đừng ngại thể hiện bản thân.',
    Virgo: 'Sự tỉ mỉ và chu đáo của bạn sẽ giúp giải quyết mọi vấn đề một cách hiệu quả.',
    Libra: 'Cân bằng là chìa khóa. Hãy tìm kiếm sự hài hòa trong mọi khía cạnh của cuộc sống.',
    Scorpio: 'Đam mê và quyết tâm của bạn sẽ giúp vượt qua mọi thử thách. Hãy tin vào bản thân.',
    Sagittarius: 'Tinh thần phiêu lưu đang gọi tên bạn. Hãy mở lòng với những trải nghiệm mới.',
    Capricorn: 'Sự kỷ luật và trách nhiệm của bạn sẽ dẫn đến thành công. Hãy kiên trì.',
    Aquarius: 'Tư duy độc đáo của bạn sẽ mang lại những ý tưởng đột phá. Hãy sáng tạo.',
    Pisces: 'Trực giác và sự đồng cảm của bạn sẽ giúp kết nối sâu sắc với người khác.',
};

export const HoroscopeService = {
    getDailyHoroscope: async (sign) => {
        // Mock API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    sign,
                    date: new Date().toISOString(),
                    prediction: predictions[sign] || `Hôm nay là ngày tốt lành cho ${sign}.`,
                    luckyNumber: Math.floor(Math.random() * 100) + 1,
                    mood: moodOptions[Math.floor(Math.random() * moodOptions.length)],
                });
            }, 500);
        });
    },

    getSignInfo: (sign) => {
        return zodiacData[sign];
    },
};
