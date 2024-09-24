import Header from "@/components/Header";
import ServicesNav from "@/components/ServicesNav";
import Blob from "@/components/atoms/Blob";
import { Toaster } from "@/components/ui/toaster";
import { TimerProvider } from "@/contexts/TimerContext";
import { ToastProviderContext } from "@/contexts/ToastsContext";
import { UserProvider } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Roboto_Mono as FontMono, Rubik as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = FontMono({ subsets: ["latin"], variable: "--font-mono" });
fontSans.variable;

export const metadata: Metadata = {
    title: "Pomo's Garden",
    description: "Creative tools to boost your productivity",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    fontSans.variable,
                    fontMono.variable,
                    "font-sans text-sm text-zinc-900",
                    "bg-zinc-300"
                )}
            >
                <ToastProviderContext>
                    <UserProvider>
                        <TimerProvider>
                            <div className="flex flex-col min-h-screen h-screen px-[1em] max-w-[1400px] mx-auto py-5">
                                {children}
                            </div>
                            <Toaster />
                        </TimerProvider>
                    </UserProvider>
                </ToastProviderContext>
            </body>
        </html>
    );
}
