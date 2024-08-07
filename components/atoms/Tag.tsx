"use client";

import TagType from "@/interfaces/Tag";
import { cn } from "@/lib/utils";
import React from "react";

type TagProps = {
    className?: string;
    tag: TagType;
    onSelectTag?: (tag: TagType) => void;
};

export default function Tag({ className, tag, onSelectTag }: TagProps) {
    const sendEvent = () => {
        if (onSelectTag) {
            onSelectTag(tag); // Envía la etiqueta seleccionada
        }
    };

    return (
        <span
            /*
        Colores predeterminados:
        - bg-red-200
        - bg-orange-200
        - bg-yellow-200
        - bg-lime-200
        - bg-emerald-200
        - bg-sky-200
        - bg-indigo-200
        - bg-fuchsia-200
        */
            className={cn(
                "px-2 py-0.5 rounded-full cursor-default select-none",
                `text-[11px] uppercase text-zinc-700 ${tag.color}`,
                "outline outline-[#00000010] outline-1 outline-offset-[-1px]",
                className
            )}
            onClick={sendEvent}
        >
            {tag.label}
        </span>
    );
}
