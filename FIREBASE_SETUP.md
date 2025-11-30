# Hướng Dẫn Chuyển Sang Firebase Authentication

## 📋 Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** hoặc **"Thêm dự án"**
3. Nhập tên project: `astro-hub`
4. Bỏ chọn Google Analytics (không bắt buộc)
5. Click **"Create project"**

## 🔧 Bước 2: Thiết Lập Firebase Authentication

1. Trong Firebase Console, chọn project vừa tạo
2. Vào **Build** → **Authentication**
3. Click **"Get started"**
4. Chọn **"Email/Password"** trong tab **Sign-in method**
5. Bật **"Email/Password"** (toggle ON)
6. Click **"Save"**

## 🔑 Bước 3: Lấy Firebase Config

1. Vào **Project Settings** (icon bánh răng ⚙️)
2. Scroll xuống **"Your apps"**
3. Click icon **Web** (`</>`)
4. Nhập app nickname: `astro-hub-web`
5. Click **"Register app"**
6. Copy **Firebase configuration** (sẽ có dạng như sau):

\`\`\`javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "astro-hub.firebaseapp.com",
  projectId: "astro-hub",
  storageBucket: "astro-hub.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
\`\`\`

## 📦 Bước 4: Cài Đặt Firebase SDK

Chạy lệnh sau trong terminal:

\`\`\`bash
npm install firebase
\`\`\`

## 🔐 Bước 5: Tạo File .env.local

Tạo hoặc cập nhật file `.env.local` với thông tin từ Firebase Config:

\`\`\`env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=astro-hub.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=astro-hub
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=astro-hub.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
\`\`\`

## ✅ Bước 6: Tích Hợp Vào Code

Sau khi hoàn thành các bước trên, tôi sẽ tạo các file cần thiết:

1. `src/config/firebase.js` - Firebase initialization
2. `src/services/auth.service.js` - Authentication service
3. `src/providers/AuthProvider.jsx` - Auth context provider
4. Cập nhật login/register pages

## 📝 Lưu Ý Quan Trọng

- ⚠️ **KHÔNG** commit file `.env.local` lên Git
- ✅ Đã có `.env.local` trong `.gitignore`
- 🔒 Giữ API keys an toàn
- 📧 Email verification có thể bật trong Firebase Console

## 🎯 Tính Năng Firebase Sẽ Có

✅ Email/Password Authentication
✅ Email Verification
✅ Password Reset
✅ User Session Management
✅ Protected Routes
✅ Auto Login (Remember Me)

---

**Sẵn sàng chưa?** Hãy cho tôi biết khi bạn đã:
1. ✅ Tạo Firebase project
2. ✅ Bật Email/Password authentication
3. ✅ Copy Firebase config
4. ✅ Cập nhật `.env.local`

Sau đó tôi sẽ tạo code tích hợp Firebase! 🚀
