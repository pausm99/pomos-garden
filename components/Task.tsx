import TaskType from "@/interfaces/Task";
import { EllipsisVertical } from "lucide-react";
import { TagManager } from "./TagManager";
import Tag from "./atoms/Tag";

type TaskProps = {
    task: TaskType;
};

export default function Task({ task }: TaskProps) {
    return (
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between">
                <h3 className="text-zinc-900">{task.title}</h3>
                <EllipsisVertical size={16} cursor="pointer" color="#a1a1aa" />
            </div>
            {task.description && (
                <p className="text-zinc-400 text-xs mb-1">{task.description}</p>
            )}
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
