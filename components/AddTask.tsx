import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export default function AddTask() {
    return (
        <div className="flex w-full max-w-sm items-center gap-2">
            <Input
                className="!placeholder-zinc-400 rounded-lg"
                type="text"
                placeholder="Add task"
            />
            <Button
                className={cn(
                    "aspect-square rounded-lg bg-zinc-50 border border-zinc-300",
                    "hover:bg-white"
                )}
                type="button"
                size="icon"
            >
                <Plus size={14} strokeWidth={3} className="text-zinc-800" />
            </Button>
        </div>
    );
}
