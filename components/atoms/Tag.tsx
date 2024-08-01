"use client";

import TagType from "@/interfaces/Tag";
import React from "react";

type TagProps = {
  tag: TagType;
  style?: string;
  onSelectTag?: (tag: TagType) => void;
};

export default function Tag({ tag, style, onSelectTag }: TagProps) {
  const sendEvent = () => {
    if (onSelectTag) {
      onSelectTag(tag); // Envía la etiqueta seleccionada
    }
  };

  return (
    <span
      className={`px-2 py-0.5 ${style} rounded-full text-zinc-500`}
      style={{
        backgroundColor: tag.color,
        border: "1px solid #e6e6e6",
      }}
      onClick={sendEvent}
    >
      {tag.label}
    </span>
  );
}
