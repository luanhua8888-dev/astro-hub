# Hướng Dẫn Triển Khai Astro Hub lên Vercel

Ứng dụng Astro Hub của bạn đã sẵn sàng để triển khai! Dưới đây là các bước đơn giản nhất để đưa website lên internet sử dụng Vercel.

## Cách 1: Triển khai qua GitHub (Khuyên dùng)

Đây là cách dễ nhất và tự động cập nhật mỗi khi bạn push code mới.

1.  **Đẩy code lên GitHub**:
    *   Tạo một repository mới trên GitHub.
    *   Chạy các lệnh sau trong terminal của bạn:
        ```bash
        git add .
        git commit -m "Ready for deploy"
        git branch -M main
        git remote add origin <link-repository-cua-ban>
        git push -u origin main
        ```

2.  **Kết nối với Vercel**:
    *   Truy cập [vercel.com](https://vercel.com) và đăng nhập (bằng GitHub).
    *   Bấm **"Add New..."** -> **"Project"**.
    *   Chọn repository `astro-hub` bạn vừa đẩy lên.
    *   Bấm **"Import"**.

3.  **Cấu hình & Deploy**:
    *   Ở màn hình "Configure Project", bạn **không cần** thay đổi gì cả (vì Firebase config hiện đang được hardcode).
    *   Bấm **"Deploy"**.
    *   Chờ khoảng 1-2 phút, Vercel sẽ build và cung cấp cho bạn đường link website (ví dụ: `astro-hub.vercel.app`).

## Cách 2: Triển khai bằng Vercel CLI (Nhanh chóng)

Nếu bạn muốn deploy trực tiếp từ máy tính mà không qua GitHub:

1.  **Cài đặt Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Đăng nhập**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    *   Chạy lệnh:
        ```bash
        vercel
        ```
    *   Nhấn `Enter` cho tất cả các câu hỏi mặc định (Set up and deploy? [Y], Scope? [Your Name], Link to existing project? [N], ...).

4.  **Production Deploy**:
    *   Sau khi kiểm tra bản preview ok, chạy lệnh này để deploy chính thức:
        ```bash
        vercel --prod
        ```

## 🎉 Chúc mừng!
Website của bạn sẽ chạy trực tuyến với đầy đủ tính năng:
*   ✨ Giao diện Cosmic Luxury
*   🔐 Đăng nhập/Đăng ký Firebase
*   🔮 Bói bài Tarot, Tình yêu, Tử vi...

---
*Lưu ý bảo mật: Hiện tại cấu hình Firebase đang nằm trong code. Sau khi deploy thành công, bạn nên cân nhắc chuyển chúng vào "Environment Variables" trên Vercel và sửa lại code để đọc từ `process.env` để bảo mật tốt hơn.*
