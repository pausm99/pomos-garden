import { useTasksContext } from "@/contexts/TasksContext";
import { Task as TaskType } from "@/prisma/generated/zod";
import { Tag as TagType } from "@/prisma/generated/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import TaskActions from "./TaskActions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { TagManager } from "./TagManager";
import { useTagsContext } from "@/contexts/TagsContext";
import Tag from "./atoms/Tag";
import { TaskStatus } from "@/interfaces/State";
import { SelectState } from "./atoms/SelectState";
import { useSortable } from "@dnd-kit/sortable";

type TaskProps = {
  task: TaskType;
  draggingTask: TaskType | null;
};

export default function Task({ task, draggingTask }: TaskProps) {
  const { tagsCollection } = useTagsContext();
  const { updateTask, deleteTask } = useTasksContext();
  const [titleInputText, setTitleInputText] = useState(task.title);
  const [descriptionInputText, setDescriptionInputText] = useState(
    task.description || ""
  );
  const [isEditing, setIsEditing] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transition,
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
    opacity: draggingTask?.id === task.id ? 0.7 : 1,
  };
  const handleStatusChange = (newStatus: TaskStatus) => {
    task.status = newStatus;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInputText(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionInputText(event.target.value);
  };

  const handleTagSelect = (newTag: TagType) => {
    if (!task.tagIDs.includes(newTag.id)) {
      task.tagIDs.push(newTag.id);
      updateTask(task);
    }
  };

  const handleDiscardTag = (oldTag: TagType) => {
    const updatedTags = task.tagIDs.filter((tagID) => tagID !== oldTag.id);
    task.tagIDs = updatedTags;
    updateTask(task);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditTask = (event: React.FormEvent) => {
    event.preventDefault();
    updateTask({
      ...task,
      title: titleInputText,
      description: descriptionInputText,
    });
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-4 p-4 bg-white text-black rounded-lg"
    >
      <form onSubmit={handleEditTask} className="flex flex-col gap-3">
        <div className="flex justify-between gap-2 items-center">
          {isEditing ? (
            <Input
              alt="Task Title"
              value={titleInputText}
              onChange={handleTitleChange}
            />
          ) : (
            <h3
              className="flex-1 text-zinc-700 text-ellipsis whitespace-nowrap overflow-hidden"
              {...listeners}
              {...attributes}
            >
              {titleInputText}
            </h3>
          )}
          {isEditing ? (
            <Button
              onClick={handleEditTask}
              className="doneEditingButton"
              type="submit"
              size="icon"
            >
              <Check size={16} />
            </Button>
          ) : (
            <TaskActions onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
        {isEditing ? (
          <>
            <Textarea
              value={descriptionInputText}
              onChange={handleDescriptionChange}
            />
            <SelectState
              onStatusChange={handleStatusChange}
              status={task.status}
            />
          </>
        ) : (
          descriptionInputText && (
            <p className="flex-1 text-[13px] leading-[1.3em] text-zinc-400">{descriptionInputText}</p>
          )
        )}
      </form>
      <div className="flex gap-1.5 flex-wrap items-center">
        {task.tagIDs.length > 0 &&
          task.tagIDs
            .map((tagId: string) =>
              tagsCollection.find(
                (collectionTag: TagType) => collectionTag.id === tagId
              )
            )
            .filter((tag): tag is TagType => tag !== undefined)
            .map((tag: TagType) => (
              <Tag
                key={tag.id}
                tag={tag}
                style="cursor-pointer"
                deletable={isEditing}
                onDiscardTag={handleDiscardTag}
              />
            ))}
        <TagManager onTagSelect={handleTagSelect} />
      </div>
    </div>
  );
}
