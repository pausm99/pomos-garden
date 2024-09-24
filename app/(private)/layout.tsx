import Header from "@/components/Header";
import ServicesNav from "@/components/ServicesNav";
import Blob from "@/components/atoms/Blob";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <div className="h-full flex gap-7">
                <ServicesNav className="w-20 flex flex-col gap-5" />
                <div className="h-[733px] w-full flex rounded-4xl bg-zinc-100 overflow-y-auto overflow-x-auto relative">
                    <Blob className="absolute w-full h-full max-w-full max-h-full overflow-hidden" />
                    <div className="absolute w-full h-full backdrop-blur-3xl"></div>
                    <div className="flex-1 z-10 no-cursor">{children}</div>
                </div>
            </div>
        </>
    );
}
