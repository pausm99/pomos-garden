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
import { cn } from "@/lib/utils";

// Etiquetas iniciales
const propTags: TagType[] = [
    { label: "Finanzas", color: "bg-red-200" },
    { label: "Urgente", color: "bg-orange-200" },
    { label: "Desarrollo", color: "bg-yellow-200" },
    { label: "Marketing", color: "bg-lime-200" },
    { label: "Investigación", color: "bg-emerald-200" },
    { label: "Eventos", color: "bg-sky-200" },
];

const colors: string[] = [
    "bg-red-200",
    "bg-orange-200",
    "bg-yellow-200",
    "bg-lime-200",
    "bg-emerald-200",
    "bg-sky-200",
    "bg-indigo-200",
    "bg-fuchsia-200",
];

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
                <button
                    className={cn(
                        "flex justify-center items-center h-4 w-4 rounded-full",
                        "bg-zinc-50 text-xs text-zinc-800",
                        "outline outline-[#00000030] outline-1 outline-offset-[-1px]",
                        "hover:outline-zinc-400 hover:bg-white"
                    )}
                >
                    +
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 rounded-lg border border-zinc-300 p-0">
                <div>
                    <Input
                        className="border-none h-6"
                        value={inputText}
                        size={12}
                        onChange={handleInputChange}
                    />
                </div>
                <DropdownMenuSeparator className="bg-zinc-200" />
                <div className="flex flex-wrap gap-2 p-2.5">
                    {filteredTags.map((tag, index) => (
                        <span key={index}>
                            <Tag
                                onSelectTag={selectTag}
                                className={(cn("cursor-pointer"), tag.color)}
                                tag={tag}
                            />
                        </span>
                    ))}
                </div>
                <DropdownMenuSeparator className="bg-zinc-300" />
                <div className="flex flex-col gap-1.5 p-2.5">
                    <span className="uppercase">Create new</span>
                    <Tag
                        className="cursor-pointer w-fit"
                        onSelectTag={() =>
                            createTag({
                                label: inputText || "New",
                                color: "#12345",
                            })
                        }
                        tag={{ label: inputText || "New", color: "#12345" }}
                    />
                    <div className="flex gap-1 mt-0.5">
                        {colors.map((color) => (
                            <span
                                key={color}
                                style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                                className={`${color} h-4 w-4 rounded-full`}
                            ></span>
                        ))}
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
