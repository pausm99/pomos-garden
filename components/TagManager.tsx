"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tag as TagType, TagCreateInputSchema } from "@/prisma/generated/zod";
import { useState } from "react";
import Tag from "./atoms/Tag";
import { Input } from "./ui/input";
import { useTagsContext } from "@/contexts/TagsContext";
import { z } from "zod";

type TagCreateInput = z.infer<typeof TagCreateInputSchema>;

const colors: color[] = [
  "bg_red_200",
  "bg_orange_200",
  "bg_yellow_200",
  "bg_lime_200",
  "bg_emerald_200",
  "bg_sky_200",
  "bg_indigo_200",
  "bg_fuchsia_200",
];

type color =
  | "bg_red_200"
  | "bg_orange_200"
  | "bg_yellow_200"
  | "bg_lime_200"
  | "bg_emerald_200"
  | "bg_sky_200"
  | "bg_indigo_200"
  | "bg_fuchsia_200";

type TagManagerProps = {
  onTagSelect: (tag: TagType) => void;
};

export function TagManager({ onTagSelect }: TagManagerProps) {
  const [inputText, setInputText] = useState("");
  const [selectedColor, setSelectedColor] = useState<color>("bg_red_200");
  const { tagsCollection, addTag } = useTagsContext();
  const [allTags, setAllTags] = useState<TagType[]>(tagsCollection);
  const [filteredTags, setFilteredTags] = useState<TagType[]>(tagsCollection);
  const [isOpen, setIsOpen] = useState(false);

  // Manejar la selección de una etiqueta
  const selectTag = (tag: TagType) => {
    onTagSelect(tag);
    setIsOpen(false);
  };

  // Manejar la creación de un nuevo tag
  const createTag = async (newTag: TagCreateInput) => {
    if (newTag.tagDesc) {
      if (!allTags.find((tag) => tag.tagDesc === newTag.tagDesc)) {
        const addedTag = await addTag(newTag);
        setAllTags([...allTags, addedTag]);
        setFilteredTags([...allTags, addedTag]);
        setInputText("");
        selectTag(addedTag);
      }
    }
  };

  // Manejar el cambio en el input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputText(value);
    filterTags(value);
  };

  // Filtrar etiquetas basadas en el texto de entrada
  const filterTags = (text: string) => {
    if (text === "") {
      setFilteredTags(allTags); // Restaurar etiquetas originales
    } else {
      const filtered = allTags.filter((tag) =>
        tag.tagDesc.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTags(filtered);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs flex justify-center items-center rounded-full bg-zinc-50 text-zinc-400 h-5 w-5 border border-zinc-400"
        >
          +
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-lg border border-zinc-300">
        <form
          action={() =>
            createTag({
              userId: "66d6edd4f3aeb2c0285644e1",
              tagDesc: inputText || "New",
              color: selectedColor,
            })
          }
        >
          <div className="p-2.5">
            <Input value={inputText} size={12} onChange={handleInputChange} />
          </div>
          {filteredTags.length > 0 && (
            <>
              <DropdownMenuSeparator className="bg-zinc-300" />
              <div className="flex flex-wrap gap-2 p-2.5 h-32 overflow-y-scroll">
                {filteredTags.map((tag, index) => (
                  <span key={index}>
                    <Tag
                      onSelectTag={selectTag}
                      style="cursor-pointer"
                      tag={tag}
                      deletable={false}
                    />
                  </span>
                ))}
              </div>
            </>
          )}
          <DropdownMenuSeparator className="bg-zinc-300" />
          <div className="p-2.5 flex flex-col gap-1.5">
            <span className="uppercase">Create new</span>
            <Tag
              style="cursor-pointer w-fit max-w-full"
              onSelectTag={() =>
                createTag({
                  userId: "66d6edd4f3aeb2c0285644e1",
                  tagDesc: inputText || "New",
                  color: selectedColor,
                })
              }
              deletable={false}
              tag={{
                userId: "66d6edd4f3aeb2c0285644e1",
                tagDesc: inputText || "New",
                color: selectedColor,
              }}
            />
            <div className="flex gap-2">
              {colors.map((color: color) => (
                <span
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    border: `${
                      selectedColor === color
                        ? "2px solid rgba(0,0,0,0.1)"
                        : "1px solid rgba(0,0,0,0.1)"
                    }`,
                    backgroundColor: color,
                  }}
                  className={`h-4 w-4 rounded-full cursor-pointer hover:scale-125 transition-all ${
                    selectedColor === color ? "scale-125" : ""
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
