-- ============================================
-- ASTRO HUB - SUPABASE DATABASE SETUP
-- ============================================
-- Chạy script này trong Supabase SQL Editor
-- để tạo các bảng và policies cần thiết

-- ============================================
-- 1. TẠO BẢNG PROFILES
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  birth_date DATE,
  zodiac_sign TEXT,
  life_path_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- 2. TẠO BẢNG SAVED BIRTH CHARTS
-- ============================================
CREATE TABLE IF NOT EXISTS birth_charts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  birth_location TEXT NOT NULL,
  chart_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- 3. TẠO BẢNG FAVORITE HOROSCOPES
-- ============================================
CREATE TABLE IF NOT EXISTS favorite_horoscopes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  zodiac_sign TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, zodiac_sign)
);

-- ============================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_horoscopes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. TẠO POLICIES CHO PROFILES
-- ============================================

-- Cho phép user xem profile của chính mình
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Cho phép user update profile của chính mình
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Cho phép user insert profile của chính mình
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 6. TẠO POLICIES CHO BIRTH CHARTS
-- ============================================

-- Cho phép user xem birth charts của mình
DROP POLICY IF EXISTS "Users can view their own birth charts" ON birth_charts;
CREATE POLICY "Users can view their own birth charts" 
  ON birth_charts FOR SELECT 
  USING (auth.uid() = user_id);

-- Cho phép user tạo birth charts
DROP POLICY IF EXISTS "Users can create birth charts" ON birth_charts;
CREATE POLICY "Users can create birth charts" 
  ON birth_charts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Cho phép user xóa birth charts của mình
DROP POLICY IF EXISTS "Users can delete their own birth charts" ON birth_charts;
CREATE POLICY "Users can delete their own birth charts" 
  ON birth_charts FOR DELETE 
  USING (auth.uid() = user_id);

-- ============================================
-- 7. TẠO POLICIES CHO FAVORITE HOROSCOPES
-- ============================================

-- Cho phép user xem favorites của mình
DROP POLICY IF EXISTS "Users can view their own favorites" ON favorite_horoscopes;
CREATE POLICY "Users can view their own favorites" 
  ON favorite_horoscopes FOR SELECT 
  USING (auth.uid() = user_id);

-- Cho phép user tạo favorites
DROP POLICY IF EXISTS "Users can create favorites" ON favorite_horoscopes;
CREATE POLICY "Users can create favorites" 
  ON favorite_horoscopes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Cho phép user xóa favorites của mình
DROP POLICY IF EXISTS "Users can delete their own favorites" ON favorite_horoscopes;
CREATE POLICY "Users can delete their own favorites" 
  ON favorite_horoscopes FOR DELETE 
  USING (auth.uid() = user_id);

-- ============================================
-- 8. TẠO FUNCTION TỰ ĐỘNG TẠO PROFILE
-- ============================================

-- Function để tự động tạo profile khi user đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, created_at)
  VALUES (new.id, new.email, NOW());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 9. TẠO TRIGGER
-- ============================================

-- Xóa trigger cũ nếu có
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Tạo trigger mới
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 10. TẠO FUNCTION UPDATE TIMESTAMP
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger cho profiles
DROP TRIGGER IF EXISTS on_profile_updated ON profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 11. TẠO INDEXES ĐỂ TỐI ƯU PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_birth_charts_user_id ON birth_charts(user_id);
CREATE INDEX IF NOT EXISTS idx_favorite_horoscopes_user_id ON favorite_horoscopes(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- ============================================
-- 12. KIỂM TRA KẾT QUẢ
-- ============================================

-- Kiểm tra các bảng đã được tạo
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'birth_charts', 'favorite_horoscopes')
ORDER BY table_name;

-- ============================================
-- HOÀN TẤT!
-- ============================================
-- Bạn đã setup xong database cho Astro Hub
-- Bây giờ có thể test authentication và các tính năng
