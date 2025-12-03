-- Insert dữ liệu đầy đủ cho tất cả 12 cung hoàng đạo
-- Chạy file này sau khi đã chạy create-zodiac-details-table.sql

-- Aries (Bạch Dương)
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
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Taurus (Kim Ngưu)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Taurus',
    'Đất',
    'Kiên định',
    'Sao Kim',
    ARRAY['Đáng tin cậy', 'Kiên nhẫn', 'Thực tế', 'Ổn định'],
    'Kim Ngưu là cung hoàng đạo thứ hai, đại diện cho sự ổn định, kiên nhẫn và tận hưởng cuộc sống. Người thuộc cung này thường có tính cách điềm đạm, thực tế và biết cách tận hưởng những điều tốt đẹp trong cuộc sống.',
    'Trong thần thoại Hy Lạp, Kim Ngưu gắn liền với câu chuyện về thần Zeus biến thành một con bò đực trắng để bắt cóc công chúa Europa, con gái của vua Phoenicia. Zeus đã xuất hiện dưới hình dạng một con bò đực đẹp đẽ và hiền lành, khiến Europa bị thu hút. Khi cô leo lên lưng con bò, Zeus đã mang cô đến đảo Crete, nơi ông tiết lộ danh tính thật và hai người kết hôn. Hòn đảo Crete sau đó được đặt tên theo tên của Europa.',
    '{"strengths": ["Kiên nhẫn và bền bỉ", "Đáng tin cậy và trung thành", "Thực tế và có khả năng quản lý tài chính tốt", "Biết tận hưởng cuộc sống", "Ổn định và an toàn", "Có khả năng nghệ thuật và thẩm mỹ cao"], "weaknesses": ["Cứng đầu và khó thay đổi", "Có thể quá vật chất và tham lam", "Lười biếng khi không có động lực", "Khó chấp nhận thay đổi", "Có thể quá bảo thủ", "Dễ bị dụ dỗ bởi sự thoải mái"]}'::jsonb,
    '{"best": ["Virgo", "Capricorn", "Cancer", "Pisces"], "good": ["Scorpio", "Libra"], "challenging": ["Leo", "Aquarius", "Aries"]}'::jsonb,
    'Người Kim Ngưu phù hợp với các nghề nghiệp liên quan đến tài chính, nghệ thuật, ẩm thực, bất động sản, nông nghiệp, thiết kế, kiến trúc, ngân hàng, đầu tư, và các công việc đòi hỏi sự kiên nhẫn và ổn định.',
    'Trong tình yêu, Kim Ngưu là người trung thành, chung thủy và tận tâm. Họ yêu một cách sâu sắc và muốn xây dựng một mối quan hệ bền vững. Họ cần sự an toàn và ổn định trong tình yêu, và sẽ làm mọi thứ để bảo vệ người mình yêu.',
    'Con bò đực',
    ARRAY['Xanh lá', 'Hồng', 'Trắng'],
    'Ngọc lục bảo, Hồng ngọc',
    ARRAY[2, 6, 24],
    'Thứ Sáu'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Gemini (Song Tử)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Gemini',
    'Khí',
    'Linh hoạt',
    'Sao Thủy',
    ARRAY['Thông minh', 'Tò mò', 'Linh hoạt', 'Giao tiếp tốt'],
    'Song Tử là cung hoàng đạo thứ ba, đại diện cho sự đa dạng, giao tiếp và trí tuệ. Người thuộc cung này thường có tính cách năng động, tò mò và thích khám phá những điều mới mẻ.',
    'Trong thần thoại Hy Lạp, Song Tử được đại diện bởi cặp song sinh Castor và Pollux (còn gọi là Dioscuri). Castor là con trai của vua Sparta, còn Pollux là con trai của thần Zeus. Khi Castor bị giết trong một cuộc chiến, Pollux đã cầu xin cha mình cho phép chia sẻ sự bất tử với anh trai. Zeus đã biến cả hai thành chòm sao Song Tử trên bầu trời, để họ có thể ở bên nhau mãi mãi.',
    '{"strengths": ["Thông minh và nhanh nhẹn", "Giao tiếp tốt và hài hước", "Linh hoạt và thích ứng nhanh", "Tò mò và ham học hỏi", "Đa tài và sáng tạo", "Năng động và nhiệt tình"], "weaknesses": ["Thiếu kiên nhẫn và dễ chán", "Có thể nông cạn và thiếu tập trung", "Khó cam kết lâu dài", "Hay thay đổi ý kiến", "Có thể nói dối hoặc phóng đại", "Khó giữ bí mật"]}'::jsonb,
    '{"best": ["Libra", "Aquarius", "Aries", "Leo"], "good": ["Sagittarius", "Gemini"], "challenging": ["Virgo", "Pisces", "Scorpio"]}'::jsonb,
    'Người Song Tử phù hợp với các nghề nghiệp liên quan đến giao tiếp, truyền thông, báo chí, viết lách, giáo dục, du lịch, bán hàng, marketing, công nghệ thông tin, và các công việc đòi hỏi sự linh hoạt và đa nhiệm.',
    'Trong tình yêu, Song Tử là người thú vị, hài hước và không bao giờ nhàm chán. Họ cần một đối tác có thể theo kịp nhịp độ năng động của họ và không cảm thấy bị áp đảo bởi tính cách đa dạng của họ. Họ cần sự tự do và không gian riêng trong mối quan hệ.',
    'Cặp song sinh',
    ARRAY['Vàng', 'Xanh lá', 'Bạc'],
    'Ngọc trai, Agate',
    ARRAY[3, 12, 21],
    'Thứ Tư'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Cancer (Cự Giải)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Cancer',
    'Nước',
    'Tiên phong',
    'Mặt Trăng',
    ARRAY['Nhạy cảm', 'Trung thành', 'Bảo vệ', 'Trực giác'],
    'Cự Giải là cung hoàng đạo thứ tư, đại diện cho cảm xúc, gia đình và sự bảo vệ. Người thuộc cung này thường có tính cách nhạy cảm, trung thành và luôn quan tâm đến những người thân yêu.',
    'Trong thần thoại Hy Lạp, Cự Giải gắn liền với câu chuyện về con cua khổng lồ được nữ thần Hera cử đến để giúp Hydra trong cuộc chiến chống lại Heracles. Mặc dù con cua đã bị Heracles đánh bại, nhưng Hera đã tôn vinh nó bằng cách đặt nó lên bầu trời như một chòm sao để ghi nhận lòng dũng cảm và sự trung thành.',
    '{"strengths": ["Nhạy cảm và đồng cảm", "Trung thành và tận tâm", "Bảo vệ người thân", "Trực giác mạnh mẽ", "Trí nhớ tốt", "Sáng tạo và giàu trí tưởng tượng"], "weaknesses": ["Quá nhạy cảm và dễ tổn thương", "Hay lo lắng và sợ hãi", "Có thể ích kỷ và thao túng", "Khó quên những tổn thương", "Có thể quá phụ thuộc", "Thay đổi tâm trạng thất thường"]}'::jsonb,
    '{"best": ["Scorpio", "Pisces", "Taurus", "Virgo"], "good": ["Cancer", "Capricorn"], "challenging": ["Aries", "Libra", "Aquarius"]}'::jsonb,
    'Người Cự Giải phù hợp với các nghề nghiệp liên quan đến chăm sóc, giáo dục, y tế, tư vấn, tâm lý học, nấu ăn, thiết kế nội thất, bất động sản, và các công việc đòi hỏi sự nhạy cảm và đồng cảm.',
    'Trong tình yêu, Cự Giải là người tình cảm, chung thủy và tận tâm. Họ yêu một cách sâu sắc và muốn xây dựng một gia đình hạnh phúc. Họ cần sự an toàn và ổn định trong tình yêu, và sẽ làm mọi thứ để bảo vệ và chăm sóc người mình yêu.',
    'Con cua',
    ARRAY['Trắng', 'Bạc', 'Xanh dương'],
    'Ngọc trai, Ngọc mặt trăng',
    ARRAY[2, 7, 11],
    'Thứ Hai'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Leo (Sư Tử)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Leo',
    'Lửa',
    'Kiên định',
    'Mặt Trời',
    ARRAY['Tự tin', 'Hào phóng', 'Sáng tạo', 'Lãnh đạo'],
    'Sư Tử là cung hoàng đạo thứ năm, đại diện cho sự tự tin, lãnh đạo và sáng tạo. Người thuộc cung này thường có tính cách mạnh mẽ, hào phóng và luôn muốn được công nhận.',
    'Trong thần thoại Hy Lạp, Sư Tử gắn liền với câu chuyện về con sư tử Nemean, một trong mười hai kỳ công của Heracles. Con sư tử này có bộ da không thể bị xuyên thủng bởi bất kỳ vũ khí nào. Heracles đã phải vật lộn với nó bằng tay không và cuối cùng đã giết nó. Sau đó, ông đã dùng móng vuốt của con sư tử để lột da nó và mặc bộ da đó như một chiếc áo giáp. Zeus đã tôn vinh con sư tử bằng cách đặt nó lên bầu trời như chòm sao Sư Tử.',
    '{"strengths": ["Tự tin và mạnh mẽ", "Hào phóng và rộng lượng", "Lãnh đạo tự nhiên", "Sáng tạo và nghệ thuật", "Trung thành và bảo vệ người thân", "Nhiệt tình và đam mê"], "weaknesses": ["Kiêu ngạo và tự phụ", "Cần được công nhận và chú ý", "Có thể độc đoán", "Khó chấp nhận phê bình", "Có thể lãng phí", "Dễ bị dụ dỗ bởi sự tán dương"]}'::jsonb,
    '{"best": ["Aries", "Sagittarius", "Gemini", "Libra"], "good": ["Leo", "Aquarius"], "challenging": ["Taurus", "Scorpio", "Capricorn"]}'::jsonb,
    'Người Sư Tử phù hợp với các nghề nghiệp liên quan đến giải trí, nghệ thuật, lãnh đạo, quản lý, giáo dục, chính trị, kinh doanh, thiết kế, và các công việc đòi hỏi sự tự tin và khả năng trình diễn.',
    'Trong tình yêu, Sư Tử là người hào phóng, lãng mạn và trung thành. Họ yêu một cách mãnh liệt và muốn được yêu lại với cùng cường độ. Họ cần một đối tác có thể công nhận và tán dương họ, đồng thời có thể chia sẻ niềm đam mê và sự nhiệt tình với họ.',
    'Con sư tử',
    ARRAY['Vàng', 'Cam', 'Đỏ'],
    'Hổ phách, Ruby',
    ARRAY[1, 5, 19],
    'Chủ Nhật'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Virgo (Xử Nữ)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Virgo',
    'Đất',
    'Linh hoạt',
    'Sao Thủy',
    ARRAY['Tỉ mỉ', 'Phân tích', 'Khiêm tốn', 'Thực tế'],
    'Xử Nữ là cung hoàng đạo thứ sáu, đại diện cho sự hoàn hảo, phân tích và phục vụ. Người thuộc cung này thường có tính cách tỉ mỉ, thực tế và luôn cố gắng đạt được sự hoàn hảo.',
    'Trong thần thoại Hy Lạp, Xử Nữ thường được liên kết với nữ thần Demeter, nữ thần của mùa màng và nông nghiệp, hoặc với Astraea, nữ thần công lý và trong sạch. Astraea là nữ thần cuối cùng rời khỏi Trái Đất khi thời đại vàng kết thúc, và được đặt lên bầu trời như chòm sao Xử Nữ, tượng trưng cho sự trong sạch và công lý.',
    '{"strengths": ["Tỉ mỉ và cẩn thận", "Phân tích và logic", "Khiêm tốn và phục vụ", "Đáng tin cậy và trung thành", "Thực tế và có tổ chức", "Có khả năng chữa bệnh và chăm sóc"], "weaknesses": ["Quá chỉ trích và khắt khe", "Hay lo lắng và căng thẳng", "Có thể quá cầu toàn", "Khó chấp nhận sự không hoàn hảo", "Có thể quá khiêm tốn", "Khó thể hiện cảm xúc"]}'::jsonb,
    '{"best": ["Taurus", "Capricorn", "Cancer", "Scorpio"], "good": ["Virgo", "Pisces"], "challenging": ["Gemini", "Sagittarius", "Pisces"]}'::jsonb,
    'Người Xử Nữ phù hợp với các nghề nghiệp liên quan đến y tế, nghiên cứu, phân tích, kế toán, biên tập, viết lách, giáo dục, dinh dưỡng, và các công việc đòi hỏi sự tỉ mỉ và chính xác.',
    'Trong tình yêu, Xử Nữ là người trung thành, tận tâm và chăm sóc. Họ yêu một cách thực tế và muốn xây dựng một mối quan hệ ổn định và lâu dài. Họ cần một đối tác có thể đánh giá cao sự chăm sóc và tận tâm của họ, đồng thời có thể chấp nhận tính cách cầu toàn của họ.',
    'Trinh nữ',
    ARRAY['Nâu', 'Vàng', 'Xanh lá'],
    'Sapphire, Carnelian',
    ARRAY[5, 14, 23],
    'Thứ Tư'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Libra (Thiên Bình)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Libra',
    'Khí',
    'Tiên phong',
    'Sao Kim',
    ARRAY['Cân bằng', 'Hợp tác', 'Ngoại giao', 'Duyên dáng'],
    'Thiên Bình là cung hoàng đạo thứ bảy, đại diện cho sự cân bằng, công lý và hài hòa. Người thuộc cung này thường có tính cách công bằng, ngoại giao và luôn tìm kiếm sự cân bằng trong cuộc sống.',
    'Trong thần thoại Hy Lạp, Thiên Bình được liên kết với nữ thần Astraea, người cầm cán cân công lý. Cán cân này được sử dụng để cân đo công lý và sự công bằng. Khi thời đại vàng kết thúc và con người trở nên tham lam và bất công, Astraea đã rời khỏi Trái Đất và được đặt lên bầu trời cùng với cán cân của mình, tạo thành chòm sao Thiên Bình.',
    '{"strengths": ["Công bằng và công lý", "Ngoại giao và hòa giải", "Duyên dáng và lịch sự", "Hợp tác và làm việc nhóm tốt", "Có thẩm mỹ và nghệ thuật", "Cân bằng và hài hòa"], "weaknesses": ["Khó đưa ra quyết định", "Có thể quá phụ thuộc vào người khác", "Tránh xung đột quá mức", "Có thể thiếu quyết đoán", "Có thể quá lý tưởng hóa", "Khó nói không"]}'::jsonb,
    '{"best": ["Gemini", "Aquarius", "Leo", "Sagittarius"], "good": ["Libra", "Aries"], "challenging": ["Cancer", "Capricorn", "Scorpio"]}'::jsonb,
    'Người Thiên Bình phù hợp với các nghề nghiệp liên quan đến luật pháp, ngoại giao, thiết kế, nghệ thuật, tư vấn, quan hệ công chúng, thời trang, và các công việc đòi hỏi sự cân bằng và hài hòa.',
    'Trong tình yêu, Thiên Bình là người lãng mạn, duyên dáng và công bằng. Họ yêu một cách hài hòa và muốn xây dựng một mối quan hệ cân bằng và công bằng. Họ cần một đối tác có thể chia sẻ giá trị về sự công bằng và hài hòa, đồng thời có thể đánh giá cao sự duyên dáng và lịch sự của họ.',
    'Cán cân công lý',
    ARRAY['Hồng', 'Xanh lá', 'Xanh dương'],
    'Opal, Sapphire',
    ARRAY[3, 6, 9],
    'Thứ Sáu'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Scorpio (Bọ Cạp)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Scorpio',
    'Nước',
    'Kiên định',
    'Sao Diêm Vương',
    ARRAY['Đam mê', 'Quyết đoán', 'Bí ẩn', 'Mạnh mẽ'],
    'Bọ Cạp là cung hoàng đạo thứ tám, đại diện cho sự biến đổi, đam mê và bí ẩn. Người thuộc cung này thường có tính cách mạnh mẽ, quyết đoán và có khả năng tái sinh sau những khó khăn.',
    'Trong thần thoại Hy Lạp, Bọ Cạp gắn liền với câu chuyện về con bọ cạp được nữ thần Hera cử đến để giết thợ săn Orion. Orion đã khoe khoang rằng mình có thể giết bất kỳ con vật nào trên Trái Đất, điều này khiến nữ thần Gaia tức giận. Bà đã cử một con bọ cạp khổng lồ đến tấn công Orion. Cuộc chiến giữa hai bên kết thúc khi cả hai đều bị giết và được đặt lên bầu trời như các chòm sao đối lập nhau.',
    '{"strengths": ["Đam mê và mãnh liệt", "Quyết đoán và mạnh mẽ", "Trung thành và bảo vệ", "Có khả năng tái sinh", "Trực giác mạnh mẽ", "Bí ẩn và hấp dẫn"], "weaknesses": ["Ghen tuông và sở hữu", "Có thể thao túng", "Hay giữ thù hận", "Có thể quá bí mật", "Có thể quá cực đoan", "Khó tha thứ"]}'::jsonb,
    '{"best": ["Cancer", "Pisces", "Virgo", "Capricorn"], "good": ["Scorpio", "Taurus"], "challenging": ["Leo", "Aquarius", "Aries"]}'::jsonb,
    'Người Bọ Cạp phù hợp với các nghề nghiệp liên quan đến điều tra, tâm lý học, nghiên cứu, y học, pháp y, đầu tư, tài chính, và các công việc đòi hỏi sự quyết đoán và khả năng xử lý những tình huống khó khăn.',
    'Trong tình yêu, Bọ Cạp là người đam mê, mãnh liệt và trung thành. Họ yêu một cách sâu sắc và toàn tâm toàn ý. Họ cần một đối tác có thể hiểu và chấp nhận tính cách mạnh mẽ và đam mê của họ, đồng thời có thể chia sẻ sự tin tưởng và trung thành với họ.',
    'Con bọ cạp',
    ARRAY['Đỏ', 'Đen', 'Tím'],
    'Topaz, Obsidian',
    ARRAY[4, 13, 22],
    'Thứ Ba'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Sagittarius (Nhân Mã)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Sagittarius',
    'Lửa',
    'Linh hoạt',
    'Sao Mộc',
    ARRAY['Phiêu lưu', 'Lạc quan', 'Hài hước', 'Tự do'],
    'Nhân Mã là cung hoàng đạo thứ chín, đại diện cho sự phiêu lưu, tự do và khám phá. Người thuộc cung này thường có tính cách lạc quan, hài hước và luôn tìm kiếm những trải nghiệm mới.',
    'Trong thần thoại Hy Lạp, Nhân Mã được đại diện bởi Chiron, một nhân mã thông thái và tốt bụng, khác với những nhân mã hoang dã khác. Chiron là thầy dạy của nhiều anh hùng Hy Lạp, bao gồm Heracles, Achilles và Jason. Khi bị vô tình bắn trúng bởi một mũi tên độc, Chiron đã từ bỏ sự bất tử của mình để giải thoát Prometheus. Zeus đã tôn vinh Chiron bằng cách đặt ông lên bầu trời như chòm sao Nhân Mã.',
    '{"strengths": ["Lạc quan và tích cực", "Phiêu lưu và khám phá", "Hài hước và vui vẻ", "Trung thực và thẳng thắn", "Triết học và thông thái", "Tự do và độc lập"], "weaknesses": ["Thiếu kiên nhẫn", "Có thể quá thẳng thắn và làm tổn thương", "Khó cam kết", "Có thể quá lý tưởng hóa", "Thiếu tổ chức", "Có thể bỏ qua chi tiết"]}'::jsonb,
    '{"best": ["Aries", "Leo", "Gemini", "Libra"], "good": ["Sagittarius", "Aquarius"], "challenging": ["Virgo", "Pisces", "Cancer"]}'::jsonb,
    'Người Nhân Mã phù hợp với các nghề nghiệp liên quan đến du lịch, giáo dục, triết học, thể thao, xuất bản, pháp luật, và các công việc đòi hỏi sự tự do và khám phá.',
    'Trong tình yêu, Nhân Mã là người lạc quan, vui vẻ và tự do. Họ yêu một cách nhiệt tình và muốn chia sẻ những trải nghiệm phiêu lưu với người mình yêu. Họ cần một đối tác có thể hiểu và tôn trọng nhu cầu tự do của họ, đồng thời có thể chia sẻ niềm đam mê khám phá và phiêu lưu với họ.',
    'Nhân mã với cung tên',
    ARRAY['Tím', 'Xanh dương', 'Đỏ'],
    'Turquoise, Topaz',
    ARRAY[3, 12, 21],
    'Thứ Năm'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Capricorn (Ma Kết)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Capricorn',
    'Đất',
    'Tiên phong',
    'Sao Thổ',
    ARRAY['Kỷ luật', 'Trách nhiệm', 'Tham vọng', 'Thực tế'],
    'Ma Kết là cung hoàng đạo thứ mười, đại diện cho sự kỷ luật, trách nhiệm và thành công. Người thuộc cung này thường có tính cách thực tế, có tổ chức và luôn hướng đến mục tiêu.',
    'Trong thần thoại Hy Lạp, Ma Kết gắn liền với thần Pan, vị thần của thiên nhiên và những người chăn cừu. Khi các thần bị tấn công bởi quái vật Typhon, Pan đã nhảy xuống sông Nile và biến phần dưới cơ thể thành cá để trốn thoát, trong khi phần trên vẫn là dê. Zeus đã tôn vinh Pan bằng cách đặt ông lên bầu trời như chòm sao Ma Kết, với hình dạng nửa dê nửa cá.',
    '{"strengths": ["Kỷ luật và có tổ chức", "Tham vọng và quyết tâm", "Trách nhiệm và đáng tin cậy", "Thực tế và kiên nhẫn", "Có khả năng lãnh đạo", "Bền bỉ và kiên trì"], "weaknesses": ["Có thể quá nghiêm khắc", "Khó thể hiện cảm xúc", "Có thể quá tham vọng", "Có thể quá bảo thủ", "Khó thư giãn", "Có thể quá tập trung vào công việc"]}'::jsonb,
    '{"best": ["Taurus", "Virgo", "Scorpio", "Pisces"], "good": ["Capricorn", "Cancer"], "challenging": ["Aries", "Libra", "Cancer"]}'::jsonb,
    'Người Ma Kết phù hợp với các nghề nghiệp liên quan đến quản lý, tài chính, kỹ thuật, kiến trúc, chính trị, luật pháp, và các công việc đòi hỏi sự kỷ luật và trách nhiệm.',
    'Trong tình yêu, Ma Kết là người trung thành, tận tâm và có trách nhiệm. Họ yêu một cách thực tế và muốn xây dựng một mối quan hệ ổn định và lâu dài. Họ cần một đối tác có thể đánh giá cao sự trách nhiệm và kỷ luật của họ, đồng thời có thể chia sẻ mục tiêu và tham vọng với họ.',
    'Dê biển (nửa dê nửa cá)',
    ARRAY['Nâu', 'Đen', 'Xám'],
    'Garnet, Onyx',
    ARRAY[4, 8, 13],
    'Thứ Bảy'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Aquarius (Bảo Bình)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Aquarius',
    'Khí',
    'Kiên định',
    'Sao Thiên Vương',
    ARRAY['Độc đáo', 'Tiến bộ', 'Nhân đạo', 'Độc lập'],
    'Bảo Bình là cung hoàng đạo thứ mười một, đại diện cho sự tiến bộ, nhân đạo và độc lập. Người thuộc cung này thường có tính cách độc đáo, tiến bộ và luôn hướng đến tương lai.',
    'Trong thần thoại Hy Lạp, Bảo Bình gắn liền với Ganymede, một chàng trai trẻ đẹp trai được thần Zeus yêu mến. Zeus đã biến thành đại bàng và bắt cóc Ganymede lên đỉnh Olympus để làm người rót rượu cho các thần. Ganymede được tôn vinh bằng cách đặt lên bầu trời như chòm sao Bảo Bình, thường được miêu tả như một người đàn ông đang rót nước từ một bình nước.',
    '{"strengths": ["Độc đáo và sáng tạo", "Tiến bộ và đổi mới", "Nhân đạo và từ thiện", "Độc lập và tự do", "Thông minh và logic", "Thân thiện và xã hội"], "weaknesses": ["Có thể quá lý tưởng hóa", "Khó thể hiện cảm xúc", "Có thể quá độc lập", "Có thể quá cứng nhắc trong quan điểm", "Khó cam kết", "Có thể quá xa cách"]}'::jsonb,
    '{"best": ["Gemini", "Libra", "Aries", "Sagittarius"], "good": ["Aquarius", "Leo"], "challenging": ["Taurus", "Scorpio", "Leo"]}'::jsonb,
    'Người Bảo Bình phù hợp với các nghề nghiệp liên quan đến công nghệ, khoa học, nhân đạo, xã hội học, thiên văn học, phát minh, và các công việc đòi hỏi sự sáng tạo và tiến bộ.',
    'Trong tình yêu, Bảo Bình là người độc lập, thân thiện và tiến bộ. Họ yêu một cách tự do và muốn một mối quan hệ dựa trên sự tôn trọng và tự do lẫn nhau. Họ cần một đối tác có thể hiểu và tôn trọng nhu cầu độc lập của họ, đồng thời có thể chia sẻ giá trị về sự tiến bộ và nhân đạo với họ.',
    'Người rót nước',
    ARRAY['Xanh dương', 'Bạc', 'Xám'],
    'Amethyst, Aquamarine',
    ARRAY[4, 7, 11],
    'Thứ Bảy'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

-- Pisces (Song Ngư)
INSERT INTO public.zodiac_details (
    sign, element, quality, ruler, traits, meaning, mythology, personality, compatibility, career, love, symbol, colors, gemstone, lucky_numbers, lucky_day
) VALUES (
    'Pisces',
    'Nước',
    'Linh hoạt',
    'Sao Hải Vương',
    ARRAY['Trực giác', 'Từ bi', 'Nghệ thuật', 'Mơ mộng'],
    'Song Ngư là cung hoàng đạo cuối cùng, đại diện cho trực giác, từ bi và tâm linh. Người thuộc cung này thường có tính cách nhạy cảm, mơ mộng và có khả năng kết nối với thế giới tâm linh.',
    'Trong thần thoại Hy Lạp, Song Ngư gắn liền với câu chuyện về Aphrodite và Eros khi họ đang chạy trốn khỏi quái vật Typhon. Họ đã nhảy xuống sông Euphrates và biến thành cá để trốn thoát. Để đảm bảo không bị lạc nhau, họ đã buộc mình lại với nhau bằng một sợi dây. Sau đó, họ được đặt lên bầu trời như chòm sao Song Ngư, với hai con cá được nối với nhau bằng một sợi dây.',
    '{"strengths": ["Trực giác mạnh mẽ", "Từ bi và đồng cảm", "Nghệ thuật và sáng tạo", "Linh hoạt và thích ứng", "Tâm linh và mơ mộng", "Vị tha và hy sinh"], "weaknesses": ["Quá nhạy cảm và dễ tổn thương", "Có thể quá mơ mộng", "Khó đối mặt với thực tế", "Có thể quá phụ thuộc", "Khó nói không", "Có thể bị lợi dụng"]}'::jsonb,
    '{"best": ["Cancer", "Scorpio", "Taurus", "Capricorn"], "good": ["Pisces", "Virgo"], "challenging": ["Gemini", "Sagittarius", "Virgo"]}'::jsonb,
    'Người Song Ngư phù hợp với các nghề nghiệp liên quan đến nghệ thuật, âm nhạc, tâm lý học, tư vấn, tâm linh, y học thay thế, và các công việc đòi hỏi sự nhạy cảm và trực giác.',
    'Trong tình yêu, Song Ngư là người lãng mạn, mơ mộng và tận tâm. Họ yêu một cách sâu sắc và toàn tâm toàn ý. Họ cần một đối tác có thể hiểu và bảo vệ sự nhạy cảm của họ, đồng thời có thể chia sẻ thế giới mơ mộng và tâm linh với họ.',
    'Hai con cá được nối với nhau',
    ARRAY['Xanh dương', 'Tím', 'Xanh lá'],
    'Amethyst, Aquamarine',
    ARRAY[3, 9, 12],
    'Thứ Năm'
) ON CONFLICT (sign) DO UPDATE SET
    element = EXCLUDED.element,
    quality = EXCLUDED.quality,
    ruler = EXCLUDED.ruler,
    traits = EXCLUDED.traits,
    meaning = EXCLUDED.meaning,
    mythology = EXCLUDED.mythology,
    personality = EXCLUDED.personality,
    compatibility = EXCLUDED.compatibility,
    career = EXCLUDED.career,
    love = EXCLUDED.love,
    symbol = EXCLUDED.symbol,
    colors = EXCLUDED.colors,
    gemstone = EXCLUDED.gemstone,
    lucky_numbers = EXCLUDED.lucky_numbers,
    lucky_day = EXCLUDED.lucky_day,
    updated_at = NOW();

