'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'Trang Chủ', href: '/' },
    { name: 'Cung Hoàng Đạo', href: '/horoscope' },
    { name: 'Bói Tình Yêu', href: '/compatibility' },
    { name: 'Tarot Hàng Ngày', href: '/tarot' },
    { name: 'Thần Số Học', href: '/numerology' },
    { name: 'Lá Số Tử Vi', href: '/birth-chart' },
];

export function NavBar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                            AstroHub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Button (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link href="/profile">
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <User className="h-4 w-4" />
                                        <span>Hồ Sơ</span>
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Đăng Xuất</span>
                                </Button>
                            </>
                        ) : (
                            <Link href="/login">
                                <Button size="sm" className="gap-2">
                                    <LogIn className="h-4 w-4" />
                                    <span>Đăng Nhập</span>
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b bg-background"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "block text-sm font-medium transition-colors hover:text-primary",
                                        pathname === item.href
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t space-y-2">
                                {user ? (
                                    <>
                                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                                                <User className="h-4 w-4" />
                                                <span>Hồ Sơ</span>
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start gap-2 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
                                            }}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Đăng Xuất</span>
                                        </Button>
                                    </>
                                ) : (
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <Button size="sm" className="w-full justify-start gap-2">
                                            <LogIn className="h-4 w-4" />
                                            <span>Đăng Nhập</span>
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
