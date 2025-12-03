# API Tham Khảo cho Astro Hub

## API Miễn Phí về Horoscope/Zodiac

### 1. AZTRO API (Miễn phí, không cần API key)
- **URL**: `https://aztro.sameerkumar.website`
- **Endpoint**: `POST /?sign={sign}&day={day}`
- **Signs**: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces
- **Days**: today, tomorrow, yesterday
- **Response**: 
  ```json
  {
    "date_range": "Mar 21 - Apr 19",
    "current_date": "December 19, 2023",
    "description": "...",
    "compatibility": "Leo",
    "mood": "Optimistic",
    "color": "Orange",
    "lucky_number": "64",
    "lucky_time": "4pm"
  }
  ```
- **Ưu điểm**: Miễn phí, không cần đăng ký
- **Nhược điểm**: Chỉ có dự báo hàng ngày, không có thông tin chi tiết về cung hoàng đạo

### 2. Horoscope API (Miễn phí)
- **URL**: `https://horoscope-api.herokuapp.com`
- **Endpoints**:
  - `/horoscope/today/{sign}` - Dự báo hôm nay
  - `/horoscope/week/{sign}` - Dự báo tuần
  - `/horoscope/month/{sign}` - Dự báo tháng
- **Response**:
  ```json
  {
    "date": "2023-12-19",
    "horoscope": "..."
  }
  ```
- **Ưu điểm**: Miễn phí, có dự báo tuần/tháng
- **Nhược điểm**: Chỉ có text dự báo, không có thông tin khác

### 3. AstrologyAPI (Có free tier, cần đăng ký)
- **URL**: `https://api.astrologyapi.com/v1`
- **Features**: 
  - Birth chart calculations
  - Planetary positions
  - Compatibility analysis
  - Daily predictions
- **Ưu điểm**: Dữ liệu chi tiết, chuyên nghiệp
- **Nhược điểm**: Cần đăng ký, có giới hạn free tier

### 4. API Ninjas - Horoscope (Miễn phí với API key)
- **URL**: `https://api.api-ninjas.com/v1/horoscope`
- **Endpoint**: `GET /?sign={sign}`
- **Cần**: API key (miễn phí khi đăng ký)
- **Response**: Daily horoscope text

## Lưu Ý

1. **Dữ liệu tiếng Việt**: Hầu hết các API miễn phí đều chỉ có tiếng Anh. Cần tự dịch hoặc xây dựng database riêng.

2. **Thông tin chi tiết**: Các API miễn phí thường chỉ có dự báo hàng ngày, không có:
   - Thần thoại
   - Ý nghĩa chi tiết
   - Tính cách phân tích sâu
   - Tương thích chi tiết
   
   → Cần tự xây dựng database cho các thông tin này.

3. **Rate Limits**: Các API miễn phí thường có giới hạn số lần gọi API mỗi ngày/tháng.

## Khuyến Nghị

- **Dự báo hàng ngày**: Sử dụng AZTRO API hoặc Horoscope API (miễn phí)
- **Thông tin chi tiết**: Tự xây dựng database từ các nguồn uy tín về chiêm tinh học
- **Tích hợp**: Có thể kết hợp cả API và dữ liệu local để có trải nghiệm tốt nhất


