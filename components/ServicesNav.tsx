"use client";

import {
  AlarmClockCheck,
  BotMessageSquare,
  ChartColumnBig,
  ListTodo,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ServiceButton from "./atoms/ServiceButton";
import { useAuth } from "@clerk/nextjs";

type NavProps = {
  className?: string;
};

export default function Nav({ className }: NavProps) {
  const pathName = usePathname();
  const isActiveRoute = (path: string): boolean => {
    return pathName === path;
  };

  const { isSignedIn } = useAuth()

  return !isSignedIn ? <></> : (
    <>
      <div className={className}>
        <Link href="/" passHref>
          <ServiceButton tooltipContent="Timer" active={isActiveRoute("/")}>
            <AlarmClockCheck size={24} />
          </ServiceButton>
        </Link>

        <Link href="/tasks" passHref>
          <ServiceButton
            tooltipContent="Tasks"
            active={isActiveRoute("/tasks")}
          >
            <ListTodo size={24} />
          </ServiceButton>
        </Link>
        <Link href="/chat" passHref>
          <ServiceButton
            disabled
            tooltipContent="ChatBot"
            active={isActiveRoute("/chat")}
          >
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
      </div>
    </>
  );
}
