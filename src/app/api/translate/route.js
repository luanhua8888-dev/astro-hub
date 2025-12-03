import { NextResponse } from 'next/server';

/**
 * API route để dịch text từ tiếng Anh sang tiếng Việt
 * Có thể tích hợp với Google Translate API, DeepL, hoặc dịch thủ công
 */
export async function POST(request) {
    try {
        const { text, target = 'vi' } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        // Option 1: Sử dụng Google Translate API (cần API key)
        // const translatedText = await translateWithGoogle(text, target);

        // Option 2: Sử dụng DeepL API (cần API key)
        // const translatedText = await translateWithDeepL(text, target);

        // Option 3: Dịch thủ công cho các cụm từ phổ biến
        const translatedText = translateCommonPhrases(text);

        return NextResponse.json({
            translatedText: translatedText || text,
            originalText: text,
            target,
        });
    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json(
            { error: 'Translation failed', originalText: text },
            { status: 500 }
        );
    }
}

/**
 * Dịch các cụm từ phổ biến trong horoscope
 * Dictionary mở rộng cho các cụm từ thường gặp
 */
function translateCommonPhrases(text) {
    const translations = {
        // Common horoscope phrases - full sentences
        'today is a great day': 'hôm nay là một ngày tuyệt vời',
        'today is a good day': 'hôm nay là một ngày tốt',
        'you will': 'bạn sẽ',
        'you may': 'bạn có thể',
        'you should': 'bạn nên',
        'it is time': 'đã đến lúc',
        'this is': 'đây là',
        'be careful': 'hãy cẩn thận',
        'take time': 'dành thời gian',
        'focus on': 'tập trung vào',
        'pay attention': 'chú ý',
        'trust your': 'tin vào',
        'listen to': 'lắng nghe',
        
        // Single words
        'today': 'hôm nay',
        'tomorrow': 'ngày mai',
        'great': 'tuyệt vời',
        'good': 'tốt',
        'opportunity': 'cơ hội',
        'opportunities': 'cơ hội',
        'challenge': 'thử thách',
        'challenges': 'thử thách',
        'success': 'thành công',
        'love': 'tình yêu',
        'career': 'sự nghiệp',
        'health': 'sức khỏe',
        'money': 'tiền bạc',
        'family': 'gia đình',
        'friends': 'bạn bè',
        'friend': 'bạn',
        'focus': 'tập trung',
        'patience': 'kiên nhẫn',
        'confidence': 'tự tin',
        'creativity': 'sáng tạo',
        'communication': 'giao tiếp',
        'intuition': 'trực giác',
        'balance': 'cân bằng',
        'passion': 'đam mê',
        'adventure': 'phiêu lưu',
        'discipline': 'kỷ luật',
        'unique': 'độc đáo',
        'compassion': 'đồng cảm',
        'energy': 'năng lượng',
        'positive': 'tích cực',
        'negative': 'tiêu cực',
        'new': 'mới',
        'old': 'cũ',
        'important': 'quan trọng',
        'decision': 'quyết định',
        'decisions': 'quyết định',
        'change': 'thay đổi',
        'changes': 'thay đổi',
        'relationship': 'mối quan hệ',
        'relationships': 'mối quan hệ',
        'work': 'công việc',
        'personal': 'cá nhân',
        'professional': 'chuyên nghiệp',
        'spiritual': 'tâm linh',
        'emotional': 'cảm xúc',
        'physical': 'thể chất',
        'mental': 'tinh thần',
        // Add more translations as needed
    };

    let translated = text;
    
    // Dịch các cụm từ dài trước (để tránh dịch sai)
    const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);
    
    sortedKeys.forEach(key => {
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        translated = translated.replace(regex, (match) => {
            // Giữ nguyên chữ hoa/chữ thường
            if (match === match.toUpperCase()) {
                return translations[key].toUpperCase();
            } else if (match[0] === match[0].toUpperCase()) {
                return translations[key].charAt(0).toUpperCase() + translations[key].slice(1);
            }
            return translations[key];
        });
    });

    return translated;
}

/**
 * Tích hợp với Google Translate API (cần API key)
 * Uncomment và thêm API key vào .env.local
 */
/*
async function translateWithGoogle(text, target) {
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
        throw new Error('Google Translate API key not found');
    }

    const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: target,
            }),
        }
    );

    const data = await response.json();
    return data.data.translations[0].translatedText;
}
*/

/**
 * Tích hợp với DeepL API (cần API key)
 * Uncomment và thêm API key vào .env.local
 */
/*
async function translateWithDeepL(text, target) {
    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) {
        throw new Error('DeepL API key not found');
    }

    const response = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
            'Authorization': `DeepL-Auth-Key ${apiKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            text: text,
            target_lang: target.toUpperCase(),
        }),
    });

    const data = await response.json();
    return data.translations[0].text;
}
*/

