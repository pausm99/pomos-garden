"use client";

import { Tag as TagType } from "@/prisma/generated/zod";
import { X } from "lucide-react";
import React from "react";

type TagProps = {
  tag: TagType;
  style?: string;
  onSelectTag?: (tag: TagType) => void;
  onDiscardTag?: (tag: TagType) => void;
  deletable: boolean;
};

export default function Tag({ tag, style, onSelectTag, onDiscardTag, deletable }: TagProps) {
  const sendEvent = () => {
    if (deletable && onDiscardTag) {
      onDiscardTag(tag)
    }
    if (onSelectTag) {
      onSelectTag(tag); // Envía la etiqueta seleccionada
    }
  };

  return (
    <span
      className={`flex items-center justify-between gap-1 px-2 py-0.5 ${style} ${tag.color} rounded-full text-zinc-500 text-ellipsis whitespace-nowrap overflow-hidden`}
      style={{
        border: "1px solid #e6e6e6",
      }}
      onClick={sendEvent}
    >
      {deletable && <X size={14}/>}
      {tag.tagDesc}
    </span>
  );
}
