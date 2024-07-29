import {
    AlarmClockCheck,
    BotMessageSquare,
    ChartColumnBig,
    ListTodo,
} from "lucide-react";
import ServiceButton from "./atoms/ServiceButton";
import { cn } from "@/lib/utils";

type NavProps = {
    className?: string;
};

export default function Nav({ className }: NavProps) {
    return (
        <>
            <div className={className}>
                <ServiceButton active tooltipContent="Timer">
                    <AlarmClockCheck size={24} />
                </ServiceButton>
                <ServiceButton tooltipContent="Tasks">
                    <ListTodo size={24} />
                </ServiceButton>
                <ServiceButton disabled tooltipContent="Comming soon">
                    <BotMessageSquare size={24} />
                </ServiceButton>

                {/* Charts button*/}
                <ServiceButton tooltipContent="Stats" className="mt-auto">
                    <ChartColumnBig size={24} />
                </ServiceButton>
            </div>
        </>
    );
}
