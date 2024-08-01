"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useState } from "react";

type BlobProps = {
    className?: string;
};

export default function Blob({ className }: BlobProps) {
    const blobRef = useRef<HTMLDivElement>(null);
    const isFirstMoveRef = useRef(true);
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            if (blobRef.current) {
                const rect =
                    blobRef.current.parentElement!.getBoundingClientRect();
                setPointerPosition({
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top,
                });
                blobRef.current.animate(
                    {
                        left: `${pointerPosition.x}px`,
                        top: `${pointerPosition.y / 1.5}px`,
                    },
                    {
                        duration: isFirstMoveRef.current ? 0 : 9000,
                        fill: "forwards",
                    }
                );

                isFirstMoveRef.current = false;
            }
        };
        document.addEventListener("pointermove", handlePointerMove);
        return () =>
            document.removeEventListener("pointermove", handlePointerMove);
    }, [pointerPosition]);

    return (
        <div className={cn("", className)}>
            <span
                ref={blobRef}
                className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2",
                    "w-11/12 aspect-square rounded-full",
                    "bg-[radial-gradient(circle,#d9f99d_0%,#ecfccb_40%,#f4f4f5_100%)]",
                    "transition-opacity duration-1000",
                    isFirstMoveRef.current ? "opacity-0" : "opacity-100"
                )}
            />
        </div>
    );
}
