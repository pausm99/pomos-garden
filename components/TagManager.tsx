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

const colors: string[] = ['bg-purple-100', 'bg-blue-100', 'bg-lime-100', 'bg-red-100']

export function TagManager() {
  const [inputText, setInputText] = useState("");
  const [allTags, setAllTags] = useState<TagType[]>(propTags);
  const [filteredTags, setFilteredTags] = useState<TagType[]>(propTags);

  // Manejar la selección de una etiqueta
  const selectTag = (tag: TagType) => {
    console.log(tag);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-xs flex justify-center items-center rounded-full bg-zinc-50 text-zinc-400 h-5 w-5 border border-zinc-400">
          +
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 rounded-lg border border-zinc-300">
        <div className="p-2.5">
          <Input value={inputText} size={12} onChange={handleInputChange} />
        </div>
        <DropdownMenuSeparator className="bg-zinc-300"/>
        <div className="flex flex-wrap gap-2 p-2.5">
          {filteredTags.map((tag, index) => (
            <span key={index}>
              <Tag onSelectTag={selectTag} style="cursor-pointer" tag={tag} />
            </span>
          ))}
        </div>
        <DropdownMenuSeparator className="bg-zinc-300"/>
        <div className="p-2.5 flex flex-col gap-1.5">
          <span className="uppercase">Create new</span>
          <Tag
            style="cursor-pointer w-fit"
            onSelectTag={() =>
              createTag({ label: inputText || "New", color: "#12345" })
            }
            tag={{ label: inputText || "New", color: "#12345" }}
          />
          <div className="flex gap-1">
            {colors.map(color => (
              <span key={color} style={{ border: "1px solid rgba(0,0,0,0.1)" }} className={`${color} h-4 w-4 rounded-full`}></span>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
