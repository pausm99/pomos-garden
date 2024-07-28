import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type ServiceButtonProps = {
    className?: string;
    children: React.ReactNode;
    isActive?: boolean;
};

export default function ServiceButton({
    className,
    children,
    isActive,
}: ServiceButtonProps) {
    return (
        <Button
            className={cn(
                "w-20 h-20 rounded-4xl",
                "transition-all ease-in duration-100",
                "bg-zinc-200 text-zinc-500",
                "hover:bg-zinc-100 hover:bg-opacity-80",
                isActive &&
                    "bg-zinc-50 hover:bg-opacity-100 hover:bg-zinc-50 text-lime-500 hover:text-lime-500",
                className
            )}
        >
            {children}
        </Button>
    );
}
