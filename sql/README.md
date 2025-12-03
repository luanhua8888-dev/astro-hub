# 📁 SQL Migrations

Folder này chứa tất cả các file SQL migration cho Astro Hub.

## 📄 Các File SQL

### 1. `supabase-setup.sql`
**Mục đích**: Setup cơ bản ban đầu cho Supabase
- Tạo bảng `profiles`
- Tạo bảng `birth_charts`
- Tạo bảng `favorite_horoscopes`
- Tạo RLS policies cơ bản

**Khi nào dùng**: Lần đầu setup project hoặc khi cần tạo lại các bảng cơ bản

### 2. `supabase-migrations.sql`
**Mục đích**: Migration cho các tính năng mới
- Tạo các bảng: `tarot_history`, `numerology_history`, `spiritual_journal`, `compatibility_records`, `favorites`, `notifications`, `transit_records`
- Tạo indexes và RLS policies
- Tạo triggers và functions

**Khi nào dùng**: Khi muốn thêm tất cả các tính năng mới cùng lúc

### 3. `create-spiritual-journal-table.sql`
**Mục đích**: Tạo riêng bảng `spiritual_journal` (nhật ký tâm linh)
- Tạo bảng với đầy đủ columns
- Tạo indexes
- Tạo RLS policy
- Tạo trigger cho auto-update timestamp

**Khi nào dùng**: Khi chỉ cần tạo bảng nhật ký (quick fix)

### 4. `create-zodiac-details-table.sql`
**Mục đích**: Tạo bảng `zodiac_details` để lưu thông tin chi tiết về các cung hoàng đạo
- Tạo bảng với đầy đủ thông tin (meaning, mythology, personality, compatibility, career, love, etc.)
- Tạo indexes và RLS policies
- Tạo trigger cho auto-update timestamp
- Insert dữ liệu mẫu cho Aries

**Khi nào dùng**: Khi muốn quản lý dữ liệu cung hoàng đạo từ database thay vì hardcode trong JSON

## 🚀 Cách Sử Dụng

### Chạy trong Supabase Dashboard:

1. Mở **Supabase Dashboard**
2. Vào **SQL Editor**
3. Copy nội dung file SQL bạn cần
4. Paste vào SQL Editor
5. Click **Run** hoặc nhấn `Ctrl+Enter` / `Cmd+Enter`

### Thứ Tự Chạy (Nếu chưa setup):

1. Chạy `supabase-setup.sql` trước (nếu chưa có bảng cơ bản)
2. Sau đó chạy `supabase-migrations.sql` (để thêm các tính năng mới)
3. (Tùy chọn) Chạy `create-zodiac-details-table.sql` (để quản lý dữ liệu cung hoàng đạo từ database)

### Quick Fix:

Nếu chỉ cần tạo bảng `spiritual_journal`, chạy `create-spiritual-journal-table.sql`

## ⚠️ Lưu Ý

- Tất cả các file đều sử dụng `CREATE TABLE IF NOT EXISTS` nên an toàn chạy nhiều lần
- Các policies đã được thiết lập để tương thích với Firebase Auth
- Sau khi chạy, refresh ứng dụng để schema cache được cập nhật

## 🔍 Kiểm Tra

Sau khi chạy, có thể kiểm tra bằng query:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'profiles',
    'birth_charts',
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

