import { ZodiacCard } from '@/components/modules/horoscope/ZodiacCard';

const signs = [
    { sign: "Bạch Dương", dates: "21/3 - 19/4", enSign: "Aries" },
    { sign: "Kim Ngưu", dates: "20/4 - 20/5", enSign: "Taurus" },
    { sign: "Song Tử", dates: "21/5 - 20/6", enSign: "Gemini" },
    { sign: "Cự Giải", dates: "21/6 - 22/7", enSign: "Cancer" },
    { sign: "Sư Tử", dates: "23/7 - 22/8", enSign: "Leo" },
    { sign: "Xử Nữ", dates: "23/8 - 22/9", enSign: "Virgo" },
    { sign: "Thiên Bình", dates: "23/9 - 22/10", enSign: "Libra" },
    { sign: "Bọ Cạp", dates: "23/10 - 21/11", enSign: "Scorpio" },
    { sign: "Nhân Mã", dates: "22/11 - 21/12", enSign: "Sagittarius" },
    { sign: "Ma Kết", dates: "22/12 - 19/1", enSign: "Capricorn" },
    { sign: "Bảo Bình", dates: "20/1 - 18/2", enSign: "Aquarius" },
    { sign: "Song Ngư", dates: "19/2 - 20/3", enSign: "Pisces" },
];

export default function HoroscopePage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-12">Cung Hoàng Đạo Hàng Ngày</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {signs.map((s) => (
                    <ZodiacCard key={s.enSign} sign={s.sign} dates={s.dates} enSign={s.enSign} />
                ))}
            </div>
        </div>
    );
}
