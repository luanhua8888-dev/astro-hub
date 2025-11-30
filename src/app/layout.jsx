import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/animations.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { AnimationProvider } from "@/providers/AnimationProvider";
import { siteConfig } from "@/config/site";
import { NavBar } from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
};



export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider>
                    <AuthProvider>
                        <AnimationProvider>
                            <div className="min-h-screen flex flex-col">
                                <NavBar />
                                <main className="flex-1">
                                    {children}
                                </main>
                            </div>
                        </AnimationProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
