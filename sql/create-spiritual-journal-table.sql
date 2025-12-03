-- ============================================
-- TẠO BẢNG SPIRITUAL_JOURNAL
-- ============================================
-- Chạy script này trong Supabase SQL Editor
-- Nếu bảng đã tồn tại, script sẽ không tạo lại

-- Tạo bảng
CREATE TABLE IF NOT EXISTS spiritual_journal (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  entry_type TEXT, -- 'horoscope', 'tarot', 'numerology', 'birth_chart', 'general'
  related_data JSONB, -- Lưu dữ liệu liên quan (horoscope sign, tarot card, etc.)
  mood TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tạo indexes
CREATE INDEX IF NOT EXISTS idx_journal_user_id ON spiritual_journal(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_created_at ON spiritual_journal(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_journal_entry_type ON spiritual_journal(entry_type);

-- Enable RLS
ALTER TABLE spiritual_journal ENABLE ROW LEVEL SECURITY;

-- Tạo policy (Firebase Auth compatible)
DROP POLICY IF EXISTS "Users can manage their own journal" ON spiritual_journal;
CREATE POLICY "Users can manage their own journal" 
  ON spiritual_journal FOR ALL 
  USING (true)  -- Allow all for now, filter by user_id in application
  WITH CHECK (true);

-- Tạo function update timestamp
CREATE OR REPLACE FUNCTION public.handle_journal_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger
DROP TRIGGER IF EXISTS on_journal_updated ON spiritual_journal;
CREATE TRIGGER on_journal_updated
  BEFORE UPDATE ON spiritual_journal
  FOR EACH ROW EXECUTE FUNCTION public.handle_journal_updated_at();

-- Kiểm tra bảng đã được tạo
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'spiritual_journal'
ORDER BY ordinal_position;

