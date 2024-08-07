import type { Metadata } from "next";
import { Rubik as FontSans, Roboto_Mono as FontMono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import ServicesNav from "@/components/ServicesNav";
import Blob from "@/components/atoms/Blob";

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
                    "flex flex-col flex-1",
                    "min-h-screen max-w-[1400px] m-auto p-6",
                    "font-sans text-sm text-zinc-900",
                    "bg-zinc-300"
                )}
            >
                <Header />

                <div className="flex-1 flex gap-7 h-[95dvh]">
                    <ServicesNav className="w-20 flex flex-col gap-5" />
                    <div className="flex flex-1 rounded-4xl bg-zinc-100 overflow-hidden relative">
                        <Blob className="absolute w-full h-full" />
                        <div className="absolute w-full h-full backdrop-blur-3xl"></div>
                        <div className="flex-1 flex flex-col z-10">
                            {children}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
