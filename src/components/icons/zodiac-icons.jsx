export const zodiacIcons = {
    Aries: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="aries-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="100%" stopColor="#FF8E53" />
                </linearGradient>
            </defs>
            <path
                d="M12 2C12 2 8 6 8 10C8 12 9 14 12 14C15 14 16 12 16 10C16 6 12 2 12 2Z"
                fill="url(#aries-grad)"
            />
            <path
                d="M8 10C8 10 6 12 4 14M16 10C16 10 18 12 20 14"
                stroke="url(#aries-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    Taurus: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="taurus-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4ECDC4" />
                    <stop offset="100%" stopColor="#44A08D" />
                </linearGradient>
            </defs>
            <circle cx="12" cy="14" r="6" fill="url(#taurus-grad)" />
            <path
                d="M6 8C6 8 8 4 12 4C16 4 18 8 18 8"
                stroke="url(#taurus-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    Gemini: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7B733" />
                    <stop offset="100%" stopColor="#FC4A1A" />
                </linearGradient>
            </defs>
            <rect x="8" y="4" width="2" height="16" rx="1" fill="url(#gemini-grad)" />
            <rect x="14" y="4" width="2" height="16" rx="1" fill="url(#gemini-grad)" />
            <line x1="6" y1="6" x2="18" y2="6" stroke="url(#gemini-grad)" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="18" x2="18" y2="18" stroke="url(#gemini-grad)" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    Cancer: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="cancer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A8EDEA" />
                    <stop offset="100%" stopColor="#6DD5FA" />
                </linearGradient>
            </defs>
            <circle cx="8" cy="8" r="4" fill="url(#cancer-grad)" />
            <circle cx="16" cy="16" r="4" fill="url(#cancer-grad)" />
            <path
                d="M12 8C12 8 14 10 16 12M12 16C12 16 10 14 8 12"
                stroke="url(#cancer-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    Leo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="leo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD89B" />
                    <stop offset="100%" stopColor="#FF6B6B" />
                </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="6" fill="url(#leo-grad)" />
            <path
                d="M12 6L13 3M12 18L13 21M6 12L3 11M18 12L21 13"
                stroke="url(#leo-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    Virgo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="virgo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A8E6CF" />
                    <stop offset="100%" stopColor="#3D9970" />
                </linearGradient>
            </defs>
            <path
                d="M6 4V14C6 16 7 18 9 18M10 4V14C10 16 11 18 13 18M14 4V14C14 16 15 18 17 18C19 18 20 16 20 14V12"
                stroke="url(#virgo-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    Libra: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="libra-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFB6D9" />
                    <stop offset="100%" stopColor="#D946EF" />
                </linearGradient>
            </defs>
            <line x1="4" y1="16" x2="20" y2="16" stroke="url(#libra-grad)" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="20" x2="20" y2="20" stroke="url(#libra-grad)" strokeWidth="2" strokeLinecap="round" />
            <path
                d="M8 16V12C8 10 9 8 12 8C15 8 16 10 16 12V16"
                stroke="url(#libra-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle cx="12" cy="5" r="2" fill="url(#libra-grad)" />
        </svg>
    ),
    Scorpio: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="scorpio-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8E2DE2" />
                    <stop offset="100%" stopColor="#4A00E0" />
                </linearGradient>
            </defs>
            <path
                d="M6 4V14C6 16 7 18 9 18M10 4V14C10 16 11 18 13 18M14 4V18L18 14L22 18"
                stroke="url(#scorpio-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Sagittarius: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="sagittarius-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F093FB" />
                    <stop offset="100%" stopColor="#F5576C" />
                </linearGradient>
            </defs>
            <path
                d="M4 20L20 4M20 4H14M20 4V10"
                stroke="url(#sagittarius-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <line x1="8" y1="16" x2="12" y2="12" stroke="url(#sagittarius-grad)" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    Capricorn: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="capricorn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A5568" />
                    <stop offset="100%" stopColor="#2D3748" />
                </linearGradient>
            </defs>
            <path
                d="M6 4V12C6 14 7 16 9 16C11 16 12 14 12 12V4M12 12C12 14 13 18 16 18C18 18 20 16 20 14C20 12 18 10 16 10"
                stroke="url(#capricorn-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    Aquarius: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="aquarius-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D2FF" />
                    <stop offset="100%" stopColor="#3A7BD5" />
                </linearGradient>
            </defs>
            <path
                d="M4 10C6 8 8 10 10 8C12 6 14 8 16 6C18 4 20 6 22 4"
                stroke="url(#aquarius-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 16C6 14 8 16 10 14C12 12 14 14 16 12C18 10 20 12 22 10"
                stroke="url(#aquarius-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Pisces: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="pisces-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A8EDEA" />
                    <stop offset="100%" stopColor="#667EEA" />
                </linearGradient>
            </defs>
            <path
                d="M6 4C6 4 4 8 4 12C4 16 6 20 6 20M18 4C18 4 20 8 20 12C20 16 18 20 18 20"
                stroke="url(#pisces-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <line x1="6" y1="12" x2="18" y2="12" stroke="url(#pisces-grad)" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
};
