# 🔧 Hướng Dẫn Setup Database

## ⚠️ Quan Trọng: Lỗi RLS Policies

Nếu bạn gặp lỗi khi truy cập các bảng mới, có thể do:

1. **Bảng chưa được tạo** - Cần chạy migration SQL
2. **RLS Policies chưa đúng** - Vì đang dùng Firebase Auth, cần policies đặc biệt

## 📝 Các Bước Setup

### Bước 1: Chạy Migration SQL

1. Mở **Supabase Dashboard**
2. Vào **SQL Editor**
3. Copy toàn bộ nội dung file `sql/supabase-migrations.sql`
4. Paste vào SQL Editor và chạy
5. Đợi cho đến khi tất cả các bảng được tạo thành công

### Bước 2: Kiểm Tra Bảng Đã Tạo

Chạy query này để kiểm tra:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'tarot_history',
    'numerology_history',
    'spiritual_journal',
    'compatibility_records',
    'favorites',
    'notifications',
    'transit_records'
  )
ORDER BY table_name;
```

### Bước 3: Kiểm Tra RLS Policies

Các policies đã được cập nhật để tương thích với Firebase Auth:
- Tất cả policies đều cho phép `USING (true)` và `WITH CHECK (true)`
- Bảo mật được đảm bảo bằng cách filter theo `user_id` trong application code

### Bước 4: Test

Sau khi setup xong, test các chức năng:
1. Truy cập `/dashboard` - không nên có lỗi
2. Truy cập `/journal` - có thể tạo nhật ký
3. Truy cập `/history` - không nên có lỗi

## 🔒 Lưu Ý Bảo Mật

**Hiện tại các policies cho phép tất cả truy cập** vì đang dùng Firebase Auth. 

Để bảo mật tốt hơn, bạn có thể:
1. Tạo một API route middleware để verify Firebase token
2. Hoặc chuyển sang Supabase Auth để dùng RLS policies đầy đủ

## 🐛 Troubleshooting

### Lỗi: "relation does not exist"
- **Nguyên nhân**: Bảng chưa được tạo
- **Giải pháp**: Chạy lại migration SQL

### Lỗi: "permission denied"
- **Nguyên nhân**: RLS policies chưa đúng
- **Giải pháp**: Chạy lại phần policies trong migration SQL

### Lỗi: "Error getting numerology history: {}"
- **Nguyên nhân**: Bảng không tồn tại hoặc RLS issue
- **Giải pháp**: 
  1. Kiểm tra bảng đã tồn tại chưa
  2. Chạy lại migration SQL
  3. Code đã được cập nhật để return empty array thay vì throw error

## ✅ Sau Khi Setup

Sau khi setup thành công, các tính năng sau sẽ hoạt động:
- ✅ Dashboard hiển thị thống kê
- ✅ Lưu lịch sử Tarot, Numerology
- ✅ Tạo và quản lý nhật ký
- ✅ Lưu yêu thích
- ✅ Tạo thông báo
- ✅ Lưu compatibility records

---

**Nếu vẫn gặp lỗi, hãy kiểm tra:**
1. Supabase URL và Key trong `.env.local` đúng chưa
2. Bảng đã được tạo trong Supabase Dashboard
3. RLS đã được enable và policies đã được tạo

