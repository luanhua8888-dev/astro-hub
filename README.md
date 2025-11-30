# 🌟 Astro Hub - Astrology & Numerology Platform

A comprehensive Next.js application for Horoscope, Numerology, and Birth Charts built with modern web technologies.

## ✨ Features

- 🔮 **Daily Horoscope** - Get personalized daily insights based on your zodiac sign
- 🔢 **Numerology Calculator** - Calculate your Life Path Number and discover your strengths
- 🌌 **Birth Chart Generator** - Generate detailed astrological birth charts with planetary positions
- 🔐 **Authentication** - User login and registration with Supabase
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS and Framer Motion animations
- 📱 **Responsive** - Works perfectly on all devices

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Authentication**: Supabase (or Firebase)
- **Language**: JavaScript/JSX
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── horoscope/         # Horoscope pages
│   ├── numerology/        # Numerology calculator
│   ├── birth-chart/       # Birth chart generator
│   ├── login/             # Authentication
│   └── ...
├── components/
│   ├── ui/                # Reusable UI components
│   └── modules/           # Feature-specific components
├── lib/                   # Core logic
│   ├── zodiac/           # Zodiac calculations
│   ├── numerology/       # Numerology calculations
│   └── astrology/        # Birth chart logic
├── services/             # API services
├── store/                # Zustand stores
├── hooks/                # Custom React hooks
├── utils/                # Helper functions
├── data/                 # Static JSON data
├── types/                # TypeScript definitions
├── providers/            # Context providers
├── config/               # App configuration
└── styles/               # Global styles
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd astro-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📚 Key Features Explained

### Horoscope
- View all 12 zodiac signs
- Get daily predictions
- See personality traits and compatibility

### Numerology
- Calculate Life Path Number from birth date
- Discover strengths and weaknesses
- Understand your life purpose

### Birth Chart
- Generate planetary positions
- Calculate aspects between planets
- Visual chart representation

## 🔧 Configuration

### Supabase Setup
1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Add them to `.env.local`

### Firebase Setup (Alternative)
If you prefer Firebase over Supabase:
1. Create a project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication
3. Update environment variables accordingly

## 🎨 Customization

### Styling
- Modify `src/styles/globals.css` for global styles
- Update Tailwind config in `tailwind.config.js`
- Customize color scheme in CSS variables

### Data
- Update zodiac data in `src/data/zodiac.json`
- Modify numerology meanings in `src/data/numerology.json`
- Customize planet descriptions in `src/data/planets.json`

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for astrology enthusiasts

---

**Note**: This is a demonstration project. For production use, consider:
- Adding proper error handling
- Implementing real astronomical calculations
- Setting up a proper database
- Adding comprehensive testing
- Implementing rate limiting
