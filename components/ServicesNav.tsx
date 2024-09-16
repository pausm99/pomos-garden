"use client";

import {
  AlarmClockCheck,
  BotMessageSquare,
  ChartColumnBig,
  Gamepad2Icon,
  ListTodo,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServiceButton from "./atoms/ServiceButton";

type NavProps = {
  className?: string;
};

export default function Nav({ className }: NavProps) {
  const pathName = usePathname();

  const isActiveRoute = (path: string): boolean => {
    return pathName === path;
  };

  // El usuario está autenticado, mostramos el componente de navegación
  return (
    <div className={className}>
      <Link href="/" passHref>
        <ServiceButton tooltipContent="Timer" active={isActiveRoute("/")}>
          <AlarmClockCheck size={24} />
        </ServiceButton>
      </Link>

      <Link href="/tasks" passHref>
        <ServiceButton tooltipContent="Tasks" active={isActiveRoute("/tasks")}>
          <ListTodo size={24} />
        </ServiceButton>
      </Link>

      <Link href="/chat" passHref>
        <ServiceButton tooltipContent="ChatBot" active={isActiveRoute("/chat")}>
          <BotMessageSquare size={24} />
        </ServiceButton>
      </Link>

      <Link href="/analytics" passHref>
        <ServiceButton
          tooltipContent="Stats"
          className="mt-auto"
          active={isActiveRoute("/analytics")}
        >
          <ChartColumnBig size={24} />
        </ServiceButton>
      </Link>

      <Link href="/minigame" passHref>
        <ServiceButton tooltipContent="Garden" active={isActiveRoute("/minigame")}>
          <Gamepad2Icon size={24} />
        </ServiceButton>
      </Link>
    </div>
  );
}
