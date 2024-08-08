import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

type TaskActionsProps = {
  onDelete: () => void;
  onEdit: () => void;
};

export default function TaskActions({ onEdit, onDelete }: TaskActionsProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical size={16} cursor="pointer" color="#a1a1aa" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="right"
          className="rounded-lg border border-zinc-300"
        >
          <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="cursor-pointer">
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
