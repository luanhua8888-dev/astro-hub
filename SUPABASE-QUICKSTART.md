# ⚡ Quick Start - Kết Nối Supabase (5 phút)

## 📋 Checklist Nhanh

### Bước 1: Lấy Credentials (2 phút)
1. Vào Supabase Dashboard: https://supabase.com/dashboard
2. Chọn project của bạn (hoặc tạo mới)
3. Click **Settings** (⚙️) → **API**
4. Copy 2 thông tin:
   - ✅ **Project URL** (ví dụ: `https://abcxyz.supabase.co`)
   - ✅ **anon public key** (chuỗi dài bắt đầu bằng `eyJ...`)

### Bước 2: Tạo File .env.local (1 phút)
```bash
# Tạo file trong thư mục gốc project
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

### Bước 3: Setup Database (1 phút)
1. Vào Supabase Dashboard → **SQL Editor**
2. Copy toàn bộ nội dung file `supabase-setup.sql`
3. Paste vào SQL Editor
4. Click **Run** ▶️

### Bước 4: Enable Authentication (30 giây)
1. Vào **Authentication** → **Providers**
2. Enable **Email** provider
3. Tắt "Confirm email" (để test nhanh)

### Bước 5: Restart Server (30 giây)
```bash
# Dừng server (Ctrl+C)
# Chạy lại
npm run dev
```

## ✅ Test Ngay

1. Mở http://localhost:3000/register
2. Đăng ký với email/password bất kỳ
3. Vào http://localhost:3000/login
4. Đăng nhập → Thành công! 🎉

## 🔍 Verify

Kiểm tra trong Supabase Dashboard:
- **Authentication** → **Users** → Thấy user mới
- **Table Editor** → **profiles** → Thấy profile mới

---

**Xong! Giờ bạn có thể dùng đầy đủ tính năng auth! 🚀**

Xem hướng dẫn chi tiết tại: `supabase-setup-guide.md`
