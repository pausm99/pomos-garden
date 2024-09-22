"use client";

import { twClassFormatter } from "@/lib/utils";
import { Tag as TagType, TagCreateInputSchema } from "@/prisma/generated/zod";
import { X } from "lucide-react";
import React from "react";
import { z } from "zod";

type TagCreateInput = z.infer<typeof TagCreateInputSchema>;

type CompleteTag = TagCreateInput & {
  id: string;
  userId: string;
  taskIDs: string[];
};

type TagProps = {
  tag: TagCreateInput;
  style?: string;
  onSelectTag?: (tag: TagType) => void;
  onDiscardTag?: (tag: TagType) => void;
  deletable: boolean;
};

export default function Tag({ tag, style, onSelectTag, onDiscardTag, deletable }: TagProps) {
  const sendEvent = () => {
    if (deletable && onDiscardTag) {
      onDiscardTag(tag as CompleteTag)
    }
    if (onSelectTag) {
      onSelectTag(tag as CompleteTag);
    }
  };

  return (
    <span
      className={`flex items-center outline outline-2 outline-offset-[-2px] outline-[#0000000e] justify-between text-[12px] gap-1 px-2.5 py-[1px] ${style} ${twClassFormatter(tag.color)} rounded-full text-zinc-600 uppercase text-ellipsis whitespace-nowrap overflow-hidden`}
      onClick={sendEvent}
    >
      {deletable && <X size={14}/>}
      {tag.tagDesc}
    </span>
  );
}
