import { AlarmClockCheck, ChartColumnBig, ListTodo } from "lucide-react";
import ServiceButton from "./atoms/ServiceButton";
import { cn } from "@/lib/utils";

type NavProps = {
    className?: string;
};

export default function Nav({ className }: NavProps) {
    return (
        <>
            <div className={className}>
                <ServiceButton isActive>
                    <AlarmClockCheck size={24} />
                </ServiceButton>
                <ServiceButton>
                    <ListTodo size={24} />
                </ServiceButton>
                <ServiceButton className="mt-auto">
                    <ChartColumnBig size={24} />
                </ServiceButton>
            </div>
        </>
    );
}
