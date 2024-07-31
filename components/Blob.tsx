"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type BlobProps = {
    className?: string;
};

export default function Blob({ className }: BlobProps) {
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            const rect =
                blobRef.current!.parentElement!.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            blobRef.current?.animate(
                {
                    left: `${x}px`,
                    top: `${y / 1.5}px`,
                },
                { duration: 9000, fill: "forwards" }
            );
        };

        window.addEventListener("pointermove", handlePointerMove);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, []);

    return (
        <div className={cn("", className)}>
            <span
                ref={blobRef}
                className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2",
                    "w-11/12 aspect-square rounded-full",
                    "bg-[radial-gradient(circle,#d9f99d_0%,#ecfccb_50%,#f4f4f5_100%)]"
                )}
            />
        </div>
    );
}
