"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TagType from "@/interfaces/Tag";
import { useState } from "react";
import Tag from "./atoms/Tag";
import { Input } from "./ui/input";

// Etiquetas iniciales
const propTags: TagType[] = [
  { label: "Finanzas", color: "#FEE2E2" },
  { label: "Urgente", color: "#FEE2E2" },
  { label: "Desarrollo", color: "#ECFCCB" },
  { label: "Marketing", color: "#DBEAFE" },
  { label: "Investigación", color: "#EDE9FE" },
  { label: "Eventos", color: "#FAFAFA" },
];

const colors: string[] = ["#F3E8FF", "#DBEAFE", "#ECFCCB", "#FEE2E2"];

type TagManagerProps = {
  onTagAdd: (tag: TagType) => void;
};

export function TagManager({ onTagAdd }: TagManagerProps) {
  const [inputText, setInputText] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[1]);
  const [allTags, setAllTags] = useState<TagType[]>(propTags);
  const [filteredTags, setFilteredTags] = useState<TagType[]>(propTags);
  const [isOpen, setIsOpen] = useState(false)

  // Manejar la selección de una etiqueta
  const selectTag = (tag: TagType) => {
    onTagAdd(tag);
    setIsOpen(false)
  };

  // Manejar la creación de una nueva etiqueta
  const createTag = (newTag: TagType) => {
    if (newTag.label) {
      if (!allTags.find((tag) => tag.label === newTag.label)) {
        setAllTags([...allTags, newTag]);
        setInputText("");
        setFilteredTags([...allTags, newTag]);
        selectTag(newTag);
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
        tag.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTags(filtered);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button onClick={() => setIsOpen(!isOpen)} className="text-xs flex justify-center items-center rounded-full bg-zinc-50 text-zinc-400 h-5 w-5 border border-zinc-400">
          +
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 rounded-lg border border-zinc-300">
        <form
          action={() =>
            createTag({ label: inputText || "New", color: selectedColor })
          }
        >
          <div className="p-2.5">
            <Input value={inputText} size={12} onChange={handleInputChange} />
          </div>
          {filteredTags.length > 0 && (
            <>
              <DropdownMenuSeparator className="bg-zinc-300" />
              <div className="flex flex-wrap gap-2 p-2.5">
                {filteredTags.map((tag, index) => (
                  <span key={index}>
                    <Tag
                      onSelectTag={selectTag}
                      style="cursor-pointer"
                      tag={tag}
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
                createTag({ label: inputText || "New", color: selectedColor })
              }
              tag={{ label: inputText || "New", color: selectedColor }}
            />
            <div className="flex gap-2">
              {colors.map((color) => (
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
