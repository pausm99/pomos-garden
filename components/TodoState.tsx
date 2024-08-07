import TaskType from "@/interfaces/Task";
import Task from "./Task";
import AddTask from "./AddTask";
import { cn } from "@/lib/utils";

type TodoStateType = "todo" | "doing" | "done";

type TodoStateProps = {
    name: string;
    state: TodoStateType;
    tasks: TaskType[];
};

const stateColor = {
    todo: "bg-zinc-400",
    doing: "bg-amber-500",
    done: "bg-lime-500",
};

export default function TodoState({ name, state, tasks }: TodoStateProps) {
    const dotColor = stateColor[state] || "";

    return (
        <div
            className={cn(
                "flex-1 flex flex-col gap-2.5 p-2.5",
                "border border-zinc-300 rounded-xl",
                "bg-zinc-100 bg-opacity-70"
            )}
        >
            <div className="flex gap-2 py-1.5">
                <span
                    className={cn(
                        "flex justify-center items-center",
                        `rounded-full ${dotColor} h-5 w-5 text-white`
                    )}
                >
                    2
                </span>
                <h2 className="uppercase">{name}</h2>
            </div>
            {state === "todo" && <AddTask />}
            <div className="flex flex-col gap-2.5">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}
