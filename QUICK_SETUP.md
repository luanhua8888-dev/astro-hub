# 🚀 Hướng Dẫn Setup Nhanh - Spiritual Journal

## ⚠️ Lỗi: "Could not find the table 'public.spiritual_journal'"

Lỗi này xảy ra vì bảng `spiritual_journal` chưa được tạo trong Supabase.

## ✅ Giải Pháp

### Cách 1: Chạy Script Đơn Giản (Khuyến nghị)

1. Mở **Supabase Dashboard**
2. Vào **SQL Editor**
3. Copy toàn bộ nội dung file `sql/create-spiritual-journal-table.sql`
4. Paste vào SQL Editor
5. Click **Run** hoặc nhấn `Ctrl+Enter`
6. Đợi cho đến khi thấy thông báo thành công

### Cách 2: Chạy Toàn Bộ Migration

Nếu muốn tạo tất cả các bảng cùng lúc:

1. Mở **Supabase Dashboard**
2. Vào **SQL Editor**
3. Copy toàn bộ nội dung file `sql/supabase-migrations.sql`
4. Paste vào SQL Editor
5. Click **Run**
6. Đợi cho đến khi tất cả các bảng được tạo

## 🔍 Kiểm Tra Bảng Đã Tạo

Sau khi chạy script, chạy query này để kiểm tra:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name = 'spiritual_journal';
```

Nếu thấy kết quả, bảng đã được tạo thành công!

## 🧪 Test

Sau khi tạo bảng, thử lại:
1. Refresh trang `/journal`
2. Tạo một mục nhật ký mới
3. Nếu không còn lỗi, đã thành công!

## 📝 Lưu Ý

- Nếu vẫn gặp lỗi sau khi chạy script, kiểm tra:
  - Supabase URL và Key trong `.env.local` đúng chưa
  - Đã chọn đúng project trong Supabase Dashboard
  - RLS policies đã được tạo (script đã bao gồm)

---

**Nếu vẫn gặp vấn đề, hãy kiểm tra console logs để xem lỗi chi tiết!**

