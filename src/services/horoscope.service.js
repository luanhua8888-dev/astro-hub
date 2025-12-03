import zodiacData from '@/data/zodiac.json';
import { ZodiacApiService } from './zodiac-api.service';

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
    /**
     * Lấy dự báo hàng ngày
     * Ưu tiên lấy từ API, nếu không có thì dùng dữ liệu local
     */
    getDailyHoroscope: async (sign, useAPI = true) => {
        // Thử lấy từ API trước
        if (useAPI) {
            try {
                const apiData = await ZodiacApiService.getDailyHoroscopeFromAPI(sign, 'today');
                if (apiData && apiData.prediction) {
                    // Dịch prediction nếu cần (có thể gọi API dịch hoặc dùng dữ liệu local)
                    const translatedPrediction = await translateText(apiData.prediction);
                    
                    return {
                        sign,
                        date: apiData.date || new Date().toISOString(),
                        prediction: translatedPrediction || apiData.prediction,
                        luckyNumber: apiData.luckyNumber || Math.floor(Math.random() * 100) + 1,
                        mood: translateMood(apiData.mood) || moodOptions[Math.floor(Math.random() * moodOptions.length)],
                        color: apiData.color ? translateColor(apiData.color) : null,
                        compatibility: apiData.compatibility || null,
                        luckyTime: apiData.luckyTime || null,
                    };
                }
                // Nếu apiData là null (API lỗi), sẽ fallback về local data
            } catch (error) {
                console.warn('API không khả dụng, sử dụng dữ liệu local:', error.message);
            }
        }

        // Fallback to local data
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

    getSignInfo: async (sign) => {
        // Thử lấy thông tin chi tiết từ API/service
        try {
            const { ZodiacDetailsService } = await import('./zodiac-details.service');
            const details = await ZodiacDetailsService.getSignDetails(sign);
            if (details) {
                return details;
            }
        } catch (error) {
            console.warn('Error fetching sign details, using local data:', error);
        }

        // Fallback về local data
        return zodiacData[sign] || null;
    },
};

// Helper functions để dịch
const moodTranslations = {
    'Optimistic': 'Lạc quan',
    'Pessimistic': 'Bi quan',
    'Happy': 'Vui vẻ',
    'Sad': 'Buồn',
    'Confident': 'Tự tin',
    'Anxious': 'Lo lắng',
    'Calm': 'Bình tĩnh',
    'Energetic': 'Năng động',
    'Creative': 'Sáng tạo',
    'Focused': 'Tập trung',
    'Relaxed': 'Thư giãn',
    'Motivated': 'Động lực',
};

const colorTranslations = {
    'Red': 'Đỏ',
    'Orange': 'Cam',
    'Yellow': 'Vàng',
    'Green': 'Xanh lá',
    'Blue': 'Xanh dương',
    'Purple': 'Tím',
    'Pink': 'Hồng',
    'White': 'Trắng',
    'Black': 'Đen',
    'Gold': 'Vàng',
    'Silver': 'Bạc',
};

function translateMood(mood) {
    if (!mood) return null;
    return moodTranslations[mood] || mood;
}

function translateColor(color) {
    if (!color) return null;
    return colorTranslations[color] || color;
}

// Dịch text sử dụng API route (có thể tích hợp Google Translate API hoặc dịch thủ công)
async function translateText(text) {
    if (!text) return null;
    
    try {
        // Thử gọi API route dịch (nếu có)
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, target: 'vi' }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.translatedText;
        }
    } catch (error) {
        console.warn('Translation API không khả dụng:', error);
    }

    // Nếu không có API dịch, trả về text gốc (có thể dịch thủ công sau)
    return text;
}
