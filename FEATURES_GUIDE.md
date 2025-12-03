# 🌟 Hướng Dẫn Sử Dụng Các Tính Năng Mới - Astro Hub

## 📋 Tổng Quan

Đã thêm các tính năng mới vào Astro Hub để nâng cao trải nghiệm người dùng:

1. ✅ **Dashboard Cá Nhân** - Tổng quan thông tin và hoạt động
2. ✅ **Nhật Ký Tâm Linh** - Ghi lại cảm nhận và trải nghiệm
3. ✅ **Lịch Sử** - Xem lại tất cả các kết quả đã tạo
4. ✅ **Yêu Thích** - Lưu các kết quả quan trọng
5. ✅ **Thông Báo** - Nhận thông báo cá nhân hóa
6. ✅ **So Sánh Tương Hợp** - Lưu và so sánh với bạn bè
7. ✅ **Transit & Dự Báo** - Dự báo theo thời gian

## 🚀 Cài Đặt

### Bước 1: Chạy Migration SQL

1. Mở Supabase Dashboard
2. Vào SQL Editor
3. Copy và chạy file `sql/supabase-migrations.sql`
4. Đợi cho đến khi tất cả các bảng được tạo thành công

### Bước 2: Kiểm Tra Services

Tất cả các service đã được tạo trong thư mục `src/services/`:
- `history.service.js` - Quản lý lịch sử
- `journal.service.js` - Quản lý nhật ký
- `favorites.service.js` - Quản lý yêu thích
- `compatibility.service.js` - Quản lý tương hợp
- `notifications.service.js` - Quản lý thông báo
- `transit.service.js` - Quản lý dự báo

## 📱 Các Trang Mới

### 1. Dashboard (`/dashboard`)

Trang tổng quan hiển thị:
- Thống kê các hoạt động (Tarot, Numerology, Birth Chart)
- Hoạt động gần đây
- Thông báo mới nhất
- Quick actions để truy cập nhanh

**Cách sử dụng:**
- Truy cập `/dashboard` sau khi đăng nhập
- Click vào các stat cards để xem chi tiết
- Xem thông báo và đánh dấu đã đọc

### 2. Nhật Ký Tâm Linh (`/journal`)

Ghi lại cảm nhận về các dự báo và trải nghiệm.

**Tính năng:**
- Tạo mục nhật ký mới
- Chỉnh sửa và xóa mục nhật ký
- Tìm kiếm và lọc theo loại
- Phân loại theo: Horoscope, Tarot, Numerology, Birth Chart, Chung
- Thêm tags và tâm trạng

**Cách sử dụng:**
1. Click "Viết Mới" để tạo mục nhật ký
2. Điền tiêu đề, nội dung, chọn loại
3. Thêm tags và tâm trạng (tùy chọn)
4. Lưu và xem lại trong danh sách

### 3. Lịch Sử (`/history`)

Xem lại tất cả các kết quả đã tạo.

**Tính năng:**
- Xem lịch sử Tarot, Numerology, Birth Chart
- Lọc theo loại
- Xóa các mục không cần thiết
- Xem lại kết quả cũ

**Cách sử dụng:**
1. Truy cập `/history`
2. Chọn tab để lọc theo loại
3. Click "Xem lại" để xem chi tiết
4. Click icon xóa để xóa mục

## 🔧 Tích Hợp Vào Các Trang Hiện Có

### Thêm nút "Lưu vào Yêu Thích"

Trong các trang Tarot, Numerology, Birth Chart, thêm:

```jsx
import { FavoritesService } from '@/services/favorites.service';

const [isFavorite, setIsFavorite] = useState(false);

useEffect(() => {
    const checkFavorite = async () => {
        const favorite = await FavoritesService.isFavorite(user.id, 'tarot', cardId);
        setIsFavorite(favorite);
    };
    checkFavorite();
}, []);

const handleToggleFavorite = async () => {
    if (isFavorite) {
        await FavoritesService.removeFavorite(user.id, 'tarot', cardId);
    } else {
        await FavoritesService.addFavorite(user.id, 'tarot', cardId, { cardName, meaning });
    }
    setIsFavorite(!isFavorite);
};
```

### Tự động lưu lịch sử

Trong các trang tính toán, sau khi có kết quả:

```jsx
import { HistoryService } from '@/services/history.service';

// Sau khi rút Tarot
await HistoryService.saveTarotReading(user.id, {
    cardName: selectedCard.name,
    meaning: selectedCard.meaning,
    spreadType: 'single',
    readingData: { card: selectedCard }
});

// Sau khi tính Numerology
await HistoryService.saveNumerologyResult(user.id, {
    name: formData.name,
    birthDate: formData.birthDate,
    lifePathNumber: result.lifePathNumber,
    resultData: result
});
```

### Tạo thông báo

```jsx
import { NotificationsService } from '@/services/notifications.service';

await NotificationsService.createNotification(user.id, {
    type: 'horoscope_daily',
    title: 'Dự báo hôm nay',
    message: 'Hãy xem dự báo horoscope của bạn!',
    actionUrl: '/horoscope'
});
```

## 📊 Database Schema

### Các bảng mới:

1. **tarot_history** - Lưu lịch sử rút Tarot
2. **numerology_history** - Lưu lịch sử tính Numerology
3. **spiritual_journal** - Nhật ký tâm linh
4. **compatibility_records** - Bản ghi so sánh tương hợp
5. **favorites** - Danh sách yêu thích
6. **notifications** - Thông báo
7. **transit_records** - Dự báo theo thời gian

## 🎨 UI Components

Tất cả các trang mới sử dụng:
- Card component từ `@/components/ui/card`
- Button component từ `@/components/ui/button`
- Modal component từ `@/components/ui/modal`
- Framer Motion cho animations
- Tailwind CSS cho styling

## 🔐 Security

Tất cả các bảng đều có:
- Row Level Security (RLS) enabled
- Policies để chỉ user có thể truy cập dữ liệu của mình
- Hỗ trợ cả Firebase Auth và Supabase Auth

## 📝 Lưu Ý

1. **Firebase Auth**: Vì đang dùng Firebase Auth, các policies cần check `user_id` từ JWT hoặc từ request body
2. **Error Handling**: Tất cả các service đều có error handling, nhưng nên thêm UI feedback cho user
3. **Performance**: Các query đều có limit và index để tối ưu performance
4. **Testing**: Nên test kỹ các chức năng sau khi chạy migration

## 🚧 Tính Năng Sắp Tới

Các tính năng còn đang phát triển:
- [ ] Trang Favorites chi tiết
- [ ] Trang Notifications chi tiết
- [ ] Trang Transit & Dự báo
- [ ] Cải thiện Compatibility với visualization
- [ ] Chia sẻ kết quả (share buttons)
- [ ] Xuất PDF
- [ ] Birth Chart visualization tương tác

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra console logs
2. Kiểm tra Supabase Dashboard để xem data
3. Kiểm tra RLS policies
4. Kiểm tra network requests trong DevTools

---

**Chúc bạn sử dụng vui vẻ! 🌟**

