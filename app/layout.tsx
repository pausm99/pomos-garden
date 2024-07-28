import type { Metadata } from "next";
import { Rubik as FontSans, Roboto_Mono as FontMono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
                    "font-sans text-sm text-zinc-900"
                )}
            >
                {children}
            </body>
        </html>
    );
}
