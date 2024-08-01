"use client";

import {
    AlarmClockCheck,
    BotMessageSquare,
    ChartColumnBig,
    ListTodo,
} from "lucide-react";
import { usePathname } from "next/navigation";
import ServiceButton from "./atoms/ServiceButton";

type NavProps = {
    className?: string;
};

export default function Nav({ className }: NavProps) {
    const pathName = usePathname()
    const isActiveRoute = (path: string): boolean => {
        return pathName === path;
    }

    return (
        <>
            <div className={className}>
                <ServiceButton tooltipContent="Timer" active={isActiveRoute('/')}>
                    <AlarmClockCheck size={24} />
                </ServiceButton>
                <ServiceButton tooltipContent="Tasks" active={isActiveRoute('/tasks')}>
                    <ListTodo size={24} />
                </ServiceButton>
                <ServiceButton tooltipContent="Comming soon" disabled active={isActiveRoute('/chat')}>
                    <BotMessageSquare size={24} />
                </ServiceButton>

                {/* Charts button*/}
                <ServiceButton tooltipContent="Stats" className="mt-auto" active={isActiveRoute('/stats')}>
                    <ChartColumnBig size={24} />
                </ServiceButton>
            </div>
        </>
    );
}
