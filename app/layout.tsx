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
                <Header />
                <div className="h-full flex gap-7">
                  <ServicesNav className="w-20 flex flex-col gap-5" />
                  <div className="h-[733px] w-full flex rounded-4xl bg-zinc-100 overflow-y-auto overflow-x-auto relative">
                    <Blob className="absolute w-full h-full max-w-full max-h-full overflow-hidden" />
                    <div className="absolute w-full h-full backdrop-blur-3xl"></div>
                    <div className="flex-1 z-10 no-cursor">{children}</div>
                  </div>
                </div>
              </div>
              <Toaster />
            </TimerProvider>
          </UserProvider>
        </ToastProviderContext>
      </body>
    </html>
  );
}
