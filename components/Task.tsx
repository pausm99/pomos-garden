import { useTasksContext } from "@/contexts/TasksContext";
import TagType from "@/interfaces/Tag";
import TaskType from "@/interfaces/Task";
import { Check } from "lucide-react";
import { useState } from "react";
import { TagManager } from "./TagManager";
import TaskActions from "./TaskActions";
import Tag from "./atoms/Tag";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskProps = {
  task: TaskType;
};

export default function Task({ task }: TaskProps) {
  const { updateTask, deleteTask } = useTasksContext();
  const [titleInputText, setTitleInputText] = useState(task.title);
  const [descriptionInputText, setDescriptionInputText] = useState(task.description || "");
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState<TagType[]>(task.tags);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
    cursor: "pointer",
    opacity: isDragging ? 0.5 : 1,
    height: "175px",
    boxSizing: "border-box" as "border-box",
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInputText(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionInputText(event.target.value);
  };

  const handleTagAdd = (newTag: TagType) => {
    if (!tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      updateTask({ ...task, tags: updatedTags });
    }
  };

  const handleDiscardTag = (oldTag: TagType) => {
    const updatedTags = tags.filter((tag) => tag.label !== oldTag.label);
    setTags(updatedTags);
    updateTask({ ...task, tags: updatedTags });
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
      tags,
    });
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col gap-5 p-4 bg-white text-black rounded-lg"
    >
      <form onSubmit={handleEditTask} className="flex flex-col gap-5">
        <div className="flex justify-between gap-2 items-center">
          {isEditing ? (
            <Input
              alt="Task Title"
              value={titleInputText}
              onChange={handleTitleChange}
            />
          ) : (
            <h3 className="flex-1 text-zinc-700 text-ellipsis whitespace-nowrap overflow-hidden">
              {titleInputText}
            </h3>
          )}
          {isEditing ? (
            <Button
              onClick={() => setIsEditing(false)}
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
          <Textarea
            value={descriptionInputText}
            onChange={handleDescriptionChange}
          />
        ) : (
          descriptionInputText && (
            <p className="flex-1 text-zinc-500">{descriptionInputText}</p>
          )
        )}
      </form>
      <div className="flex gap-2 flex-wrap items-center">
        {tags &&
          tags.map((tag, index) => (
            <span key={index}>
              <Tag
                tag={tag}
                style="cursor-pointer"
                deletable={isEditing}
                onDiscardTag={handleDiscardTag}
              />
            </span>
          ))}
        <TagManager onTagAdd={handleTagAdd} />
      </div>
    </div>
  );
}
