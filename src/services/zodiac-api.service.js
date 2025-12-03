/**
 * Service để lấy thông tin chi tiết về cung hoàng đạo từ các API bên ngoài
 * Có thể tích hợp với nhiều nguồn API khác nhau
 */

// Các API có thể tham khảo:
// 1. https://api.astrologyapi.com/v1/ (có free tier)
// 2. https://horoscope-api.herokuapp.com/horoscope/today/{sign} (free, nhưng chỉ có daily)
// 3. https://aztro.sameerkumar.website/ (free, daily horoscope) - Đang sử dụng qua /api/horoscope
// 4. https://api.quotable.io/ (có thể dùng cho quotes, không phải horoscope)

// Note: API endpoints được gọi từ server-side qua /api/horoscope route để tránh CORS

export const ZodiacApiService = {
    /**
     * Lấy dự báo hàng ngày từ API miễn phí
     * @param {string} sign - Tên cung hoàng đạo (Aries, Taurus, etc.)
     * @param {string} day - today, tomorrow, yesterday
     */
    getDailyHoroscopeFromAPI: async (sign, day = 'today') => {
        try {
            // Sử dụng Next.js API route để tránh CORS issue
            const response = await fetch(`/api/horoscope?sign=${sign}&day=${day}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Nếu API lỗi (503, 500, etc.), không throw error mà return null để fallback
                const errorData = await response.json().catch(() => ({}));
                console.warn(`API không khả dụng (${response.status}):`, errorData.message || 'Service unavailable');
                return null;
            }

            const data = await response.json();
            
            return {
                sign: data.sign,
                date: data.date,
                prediction: data.prediction,
                luckyNumber: data.luckyNumber,
                luckyTime: data.luckyTime,
                mood: data.mood,
                color: data.color,
                compatibility: data.compatibility,
                dateRange: data.dateRange,
            };
        } catch (error) {
            // Network error hoặc các lỗi khác
            console.warn('Error fetching horoscope from API:', error.message);
            // Fallback to local data
            return null;
        }
    },

    /**
     * Lấy dự báo từ Horoscope API (alternative)
     * Note: API này cũng có thể gặp CORS issue, nên có thể cần tạo proxy route tương tự
     */
    getDailyHoroscopeAlternative: async (sign) => {
        try {
            // Có thể tạo API route proxy tương tự nếu cần
            const response = await fetch(`/api/horoscope?sign=${sign}&day=today`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch horoscope');
            }

            const data = await response.json();
            
            return {
                sign: data.sign,
                date: data.date,
                prediction: data.prediction,
                luckyNumber: data.luckyNumber,
                mood: data.mood,
            };
        } catch (error) {
            console.error('Error fetching horoscope from alternative API:', error);
            return null;
        }
    },

    /**
     * Lấy thông tin chi tiết về cung hoàng đạo
     * Note: Hầu hết các API miễn phí không cung cấp thông tin chi tiết như thần thoại, ý nghĩa
     * Nên cần tự xây dựng database hoặc sử dụng dữ liệu local
     */
    getSignDetails: async () => {
        // API miễn phí thường không có thông tin này
        // Cần sử dụng dữ liệu local từ zodiac.json
        return null;
    },
};

