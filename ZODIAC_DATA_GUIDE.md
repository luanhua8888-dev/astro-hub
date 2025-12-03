# Hướng Dẫn Quản Lý Dữ Liệu Cung Hoàng Đạo

## Cấu Trúc Hệ Thống

Hệ thống được thiết kế để lấy dữ liệu **động** thay vì hardcode, cho phép:

1. **Lấy từ API bên ngoài** (có thể tích hợp sau)
2. **Lấy từ Database** (Supabase hoặc database khác)
3. **Fallback về local data** (nếu API/database không có)

## Các File Quan Trọng

### 1. `src/services/zodiac-details.service.js`
Service để lấy thông tin chi tiết về cung hoàng đạo từ API route.

### 2. `src/app/api/zodiac-details/route.js`
API route để xử lý request. Có thể mở rộng để:
- Fetch từ external API
- Lấy từ database
- Cache dữ liệu

### 3. `src/services/horoscope.service.js`
Service chính, tự động gọi `ZodiacDetailsService` để lấy dữ liệu động.

## Cách Thêm Dữ Liệu Cho Các Cung Hoàng Đạo

### Option 1: Thêm Vào Database (Khuyến nghị)

Tạo bảng trong Supabase:

```sql
CREATE TABLE zodiac_details (
    sign TEXT PRIMARY KEY,
    element TEXT,
    quality TEXT,
    ruler TEXT,
    traits TEXT[],
    meaning TEXT,
    mythology TEXT,
    personality JSONB,
    compatibility JSONB,
    career TEXT,
    love TEXT,
    symbol TEXT,
    colors TEXT[],
    gemstone TEXT,
    lucky_numbers INTEGER[],
    lucky_day TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

Sau đó cập nhật `src/app/api/zodiac-details/route.js`:

```javascript
async function getFromDatabase(sign) {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase
        .from('zodiac_details')
        .select('*')
        .eq('sign', sign)
        .single();

    if (error) return null;
    return data;
}
```

### Option 2: Tích Hợp External API

Cập nhật `src/app/api/zodiac-details/route.js`:

```javascript
async function fetchFromExternalAPI(sign) {
    try {
        const response = await fetch(`https://api.example.com/zodiac/${sign}`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            // Transform data to match our structure
            return transformAPIResponse(data);
        }
    } catch (error) {
        console.error('External API error:', error);
    }
    
    return null;
}
```

### Option 3: Thêm Vào JSON (Tạm thời)

Nếu cần thêm dữ liệu nhanh vào `src/data/zodiac.json`, đảm bảo cấu trúc giống Aries:

```json
{
    "Taurus": {
        "element": "Đất",
        "quality": "Kiên định",
        "ruler": "Sao Kim",
        "traits": ["Đáng tin cậy", "Kiên nhẫn", "Thực tế"],
        "meaning": "...",
        "mythology": "...",
        "personality": {
            "strengths": [...],
            "weaknesses": [...]
        },
        "compatibility": {
            "best": [...],
            "good": [...],
            "challenging": [...]
        },
        "career": "...",
        "love": "...",
        "symbol": "...",
        "colors": [...],
        "gemstone": "...",
        "luckyNumbers": [...],
        "luckyDay": "..."
    }
}
```

## Cấu Trúc Dữ Liệu Đầy Đủ

Mỗi cung hoàng đạo cần có:

- `element`: Nguyên tố (Lửa, Đất, Khí, Nước)
- `quality`: Tính chất (Tiên phong, Kiên định, Linh hoạt)
- `ruler`: Sao chiếu mệnh
- `traits`: Mảng các đặc điểm
- `meaning`: Ý nghĩa (bắt buộc để hiển thị)
- `mythology`: Thần thoại (bắt buộc để hiển thị)
- `personality`: Object với `strengths` và `weaknesses`
- `compatibility`: Object với `best`, `good`, `challenging`
- `career`: Mô tả về sự nghiệp
- `love`: Mô tả về tình yêu
- `symbol`: Biểu tượng
- `colors`: Mảng màu sắc may mắn
- `gemstone`: Đá quý
- `luckyNumbers`: Mảng số may mắn
- `luckyDay`: Ngày may mắn

## Lưu Ý

- Hệ thống tự động fallback về local data nếu API/database không có
- Component `SignDetails` sẽ chỉ hiển thị các phần có dữ liệu
- Có thể cập nhật dữ liệu mà không cần deploy lại code (nếu dùng database)


