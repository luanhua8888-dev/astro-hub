/**
 * Service để lấy thông tin chi tiết về các cung hoàng đạo
 * Có thể lấy từ API, database hoặc cache
 */

export const ZodiacDetailsService = {
    /**
     * Lấy thông tin chi tiết về một cung hoàng đạo
     * Ưu tiên lấy từ API, nếu không có thì fallback về local data
     */
    getSignDetails: async (sign) => {
        try {
            // Thử lấy từ API route (có thể fetch từ external API hoặc database)
            const response = await fetch(`/api/zodiac-details?sign=${sign}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.meaning) {
                    return data;
                }
            }
        } catch (error) {
            console.warn('Error fetching zodiac details from API:', error);
        }

        // Fallback: return null để component xử lý
        return null;
    },

    /**
     * Lấy thông tin cho tất cả các cung hoàng đạo
     */
    getAllSignsDetails: async () => {
        const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
        
        try {
            const promises = signs.map(sign => this.getSignDetails(sign));
            const results = await Promise.allSettled(promises);
            
            const details = {};
            results.forEach((result, index) => {
                if (result.status === 'fulfilled' && result.value) {
                    details[signs[index]] = result.value;
                }
            });

            return details;
        } catch (error) {
            console.error('Error fetching all zodiac details:', error);
            return {};
        }
    },
};


