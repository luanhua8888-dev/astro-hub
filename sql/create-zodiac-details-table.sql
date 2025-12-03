-- Create table for zodiac signs details
-- This table stores comprehensive information about all 12 zodiac signs

CREATE TABLE IF NOT EXISTS public.zodiac_details (
    sign TEXT PRIMARY KEY,
    element TEXT NOT NULL,
    quality TEXT NOT NULL,
    ruler TEXT NOT NULL,
    traits TEXT[] NOT NULL DEFAULT '{}',
    meaning TEXT,
    mythology TEXT,
    personality JSONB,
    compatibility JSONB,
    career TEXT,
    love TEXT,
    symbol TEXT,
    colors TEXT[] DEFAULT '{}',
    gemstone TEXT,
    lucky_numbers INTEGER[] DEFAULT '{}',
    lucky_day TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_zodiac_details_sign ON public.zodiac_details(sign);

-- Enable RLS (Row Level Security)
ALTER TABLE public.zodiac_details ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (since this is public information)
CREATE POLICY "Allow public read access to zodiac_details"
    ON public.zodiac_details
    FOR SELECT
    USING (true);

-- Create policy to allow authenticated users to insert/update (for admin purposes)
-- You can restrict this further if needed
CREATE POLICY "Allow authenticated users to manage zodiac_details"
    ON public.zodiac_details
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_zodiac_details_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_zodiac_details_updated_at
    BEFORE UPDATE ON public.zodiac_details
    FOR EACH ROW
    EXECUTE FUNCTION update_zodiac_details_updated_at();

-- Insert initial data for Aries (example)
-- You can add more signs or update via API/dashboard
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Aries',
    'Lửa',
    'Tiên phong',
    'Sao Hỏa',
    ARRAY['Dũng cảm', 'Quyết đoán', 'Tự tin'],
    'Bạch Dương là cung hoàng đạo đầu tiên trong vòng tròn hoàng đạo, tượng trưng cho sự khởi đầu, năng lượng và tinh thần tiên phong. Người thuộc cung này thường có tính cách mạnh mẽ, quyết đoán và luôn sẵn sàng đối mặt với thử thách.',
    'Trong thần thoại Hy Lạp, Bạch Dương gắn liền với câu chuyện về con cừu vàng có bộ lông quý giá. Vua Athamas có hai người con là Phrixus và Helle. Khi mẹ của họ qua đời, vua cưới một người vợ mới tên là Ino, người muốn giết hai đứa trẻ. Thần Hermes đã cử một con cừu vàng có cánh đến cứu họ. Con cừu đã mang Phrixus và Helle bay đi, nhưng Helle rơi xuống biển (nơi sau này được gọi là Hellespont). Phrixus đến được Colchis an toàn và đã hiến tế con cừu cho thần Zeus, treo bộ lông vàng trong một khu rừng thiêng. Bộ lông vàng này sau đó trở thành mục tiêu của cuộc hành trình của Jason và các Argonauts.',
    '{"strengths": ["Dũng cảm và không sợ thử thách", "Lãnh đạo tự nhiên, có khả năng dẫn dắt người khác", "Năng động, nhiệt huyết và đầy năng lượng", "Quyết đoán, không do dự khi đưa ra quyết định", "Tự tin và độc lập", "Trung thực, thẳng thắn trong giao tiếp"], "weaknesses": ["Nóng tính, dễ mất kiên nhẫn", "Bốc đồng, đôi khi hành động mà không suy nghĩ kỹ", "Có thể quá tự tin, dẫn đến kiêu ngạo", "Khó chấp nhận thất bại hoặc phê bình", "Thiếu kiên nhẫn với những người chậm chạp", "Có xu hướng bỏ qua chi tiết nhỏ"]}'::jsonb,
    '{"best": ["Leo", "Sagittarius", "Gemini", "Aquarius"], "good": ["Libra", "Scorpio"], "challenging": ["Cancer", "Capricorn", "Pisces"]}'::jsonb,
    'Người Bạch Dương phù hợp với các nghề nghiệp đòi hỏi sự lãnh đạo, quyết đoán và năng động như: quân đội, cảnh sát, vận động viên, doanh nhân, nhà quản lý, bác sĩ phẫu thuật, luật sư, nhà báo, nhà thám hiểm.',
    'Trong tình yêu, Bạch Dương là người chủ động, nhiệt tình và trung thực. Họ yêu một cách mãnh liệt và không ngại thể hiện cảm xúc. Tuy nhiên, họ cần một đối tác có thể hiểu và chấp nhận tính cách mạnh mẽ của họ, đồng thời có thể đối đầu với họ một cách công bằng.',
    'Con cừu đực với sừng cong',
    ARRAY['Đỏ', 'Cam', 'Vàng'],
    'Kim cương, Hồng ngọc',
    ARRAY[1, 8, 17],
    'Thứ Ba'
) ON CONFLICT (sign) DO NOTHING;

-- Add comment to table
COMMENT ON TABLE public.zodiac_details IS 'Stores comprehensive information about zodiac signs including meaning, mythology, personality, compatibility, career, and love life';


