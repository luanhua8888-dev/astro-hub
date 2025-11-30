const majorArcana = [
    { id: 0, name: "The Fool", meaning: "Khởi đầu mới, tự do, ngây thơ, mạo hiểm", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" },
    { id: 1, name: "The Magician", meaning: "Sức mạnh ý chí, kỹ năng, sự tập trung, hành động", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" },
    { id: 2, name: "The High Priestess", meaning: "Trực giác, bí ẩn, tiềm thức, sự tĩnh lặng", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg" },
    { id: 3, name: "The Empress", meaning: "Sự trù phú, thiên nhiên, sáng tạo, nuôi dưỡng", image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg" },
    { id: 4, name: "The Emperor", meaning: "Quyền lực, cấu trúc, ổn định, lãnh đạo", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg" },
    { id: 5, name: "The Hierophant", meaning: "Truyền thống, niềm tin, tôn giáo, học hỏi", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg" },
    { id: 6, name: "The Lovers", meaning: "Tình yêu, sự hòa hợp, lựa chọn, mối quan hệ", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg" },
    { id: 7, name: "The Chariot", meaning: "Chiến thắng, ý chí, kiểm soát, hành trình", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg" },
    { id: 8, name: "Strength", meaning: "Sức mạnh nội tâm, can đảm, kiên nhẫn, kiểm soát", image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg" },
    { id: 9, name: "The Hermit", meaning: "Sự cô đơn, tìm kiếm bên trong, soi rọi, hướng dẫn", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg" },
    { id: 10, name: "Wheel of Fortune", meaning: "Vận mệnh, thay đổi, chu kỳ, may mắn", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
    { id: 11, name: "Justice", meaning: "Công lý, sự thật, luật nhân quả, cân bằng", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg" },
    { id: 12, name: "The Hanged Man", meaning: "Hy sinh, buông bỏ, góc nhìn mới, chờ đợi", image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
    { id: 13, name: "Death", meaning: "Kết thúc, chuyển hóa, thay đổi lớn, buông bỏ cái cũ", image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg" },
    { id: 14, name: "Temperance", meaning: "Cân bằng, kiên nhẫn, mục đích, điều độ", image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg" },
    { id: 15, name: "The Devil", meaning: "Ràng buộc, cám dỗ, vật chất, nghiện ngập", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg" },
    { id: 16, name: "The Tower", meaning: "Sự sụp đổ, thay đổi bất ngờ, thức tỉnh, giải phóng", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg" },
    { id: 17, name: "The Star", meaning: "Hy vọng, niềm tin, cảm hứng, sự chữa lành", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg" },
    { id: 18, name: "The Moon", meaning: "Ảo tưởng, sợ hãi, tiềm thức, giấc mơ", image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg" },
    { id: 19, name: "The Sun", meaning: "Niềm vui, thành công, tích cực, sức sống", image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg" },
    { id: 20, name: "Judgement", meaning: "Phán xét, tái sinh, tiếng gọi nội tâm, tha thứ", image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg" },
    { id: 21, name: "The World", meaning: "Hoàn thành, trọn vẹn, thành tựu, du hành", image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg" }
];

export const TarotService = {
    drawCard: () => {
        const randomIndex = Math.floor(Math.random() * majorArcana.length);
        const isReversed = Math.random() < 0.3; // 30% chance of reversed card
        const card = majorArcana[randomIndex];

        return {
            ...card,
            isReversed,
            displayMeaning: isReversed ? `(Ngược) Cần chú ý: ${card.meaning}` : card.meaning
        };
    },

    getAllCards: () => majorArcana
};
