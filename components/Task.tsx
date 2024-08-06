import TaskType from "@/interfaces/Task";
import { EllipsisVertical } from "lucide-react";
import { TagManager } from "./TagManager";
import Tag from "./atoms/Tag";
import { useDraggable } from "@dnd-kit/core";

type TaskProps = {
  task: TaskType;
};

export default function Task({ task }: TaskProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.1)",
    cursor: "pointer",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col gap-5 p-[15px] bg-white text-black rounded-[12px] text-wrap"
    >
      <div className="flex justify-between">
        <h3 className="text-zinc-700">{task.title}</h3>
        <EllipsisVertical size={16} cursor="pointer" color="#a1a1aa" />
      </div>
      {task.description && <p className="text-zinc-500">{task.description}</p>}
      <div className="flex gap-2 flex-wrap items-center">
        {task.tags &&
          task.tags.map((tag, index) => (
            <span key={index}>
              <Tag tag={tag} />
            </span>
          ))}
        <TagManager />
      </div>
    </div>
  );
}
