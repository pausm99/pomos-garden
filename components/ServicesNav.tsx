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
                <ServiceButton tooltipContent="Timer" isActive={isActiveRoute('/')}>
                    <AlarmClockCheck size={24} />
                </ServiceButton>
                <ServiceButton tooltipContent="Tasks" isActive={isActiveRoute('/tasks')}>
                    <ListTodo size={24} />
                </ServiceButton>
                <ServiceButton tooltipContent="Comming soon" isActive={isActiveRoute('/chat')}>
                    <BotMessageSquare size={24} />
                </ServiceButton>

                {/* Charts button*/}
                <ServiceButton tooltipContent="Stats" className="mt-auto" isActive={isActiveRoute('/stats')}>
                    <ChartColumnBig size={24} />
                </ServiceButton>
            </div>
        </>
    );
}
