// Mapping zodiac signs from English to Vietnamese
export const zodiacNames = {
    'Aries': 'Bạch Dương',
    'Taurus': 'Kim Ngưu',
    'Gemini': 'Song Tử',
    'Cancer': 'Cự Giải',
    'Leo': 'Sư Tử',
    'Virgo': 'Xử Nữ',
    'Libra': 'Thiên Bình',
    'Scorpio': 'Bọ Cạp',
    'Sagittarius': 'Nhân Mã',
    'Capricorn': 'Ma Kết',
    'Aquarius': 'Bảo Bình',
    'Pisces': 'Song Ngư',
};

export const getZodiacVietnameseName = (englishName) => {
    return zodiacNames[englishName] || englishName;
};

export const getZodiacDisplayName = (englishName) => {
    const vietnameseName = getZodiacVietnameseName(englishName);
    return `${englishName} - ${vietnameseName}`;
};

