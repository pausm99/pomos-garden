import TaskSection from "./TasksSection";

type SectionProps = {
    name: string;
    section: string;
};

export default function Section({ name, section }: SectionProps) {
    return (
        <div className="flex-1 flex flex-col">
            <h1 className="pt-4 pb-3 px-7 uppercase bg-zinc-100 bg-opacity-50">
                {name}
            </h1>
            <hr className="border-zinc-300" />
            {section === "tasks" && <TaskSection />}
            {/* add the same for all other sections */}
        </div>
    );
}
