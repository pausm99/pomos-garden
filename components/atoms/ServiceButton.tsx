import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

type ServiceButtonProps = {
    className?: string;
    children: React.ReactNode;
    tooltipContent?: string;
    active?: boolean;
    disabled?: boolean;
};

export default function ServiceButton({
    className,
    children,
    tooltipContent,
    active: active,
    disabled: disabled,
}: ServiceButtonProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className={cn(
                            "w-20 h-20 rounded-4xl",
                            "transition-all ease-in duration-100",
                            "bg-zinc-200 text-zinc-600",
                            "hover:bg-zinc-100 hover:bg-opacity-80",
                            active &&
                                "bg-zinc-50 hover:bg-opacity-100 hover:bg-zinc-50 text-lime-500 hover:text-lime-500",
                            disabled &&
                                "text-zinc-600 hover:text-zinc-600 cursor-default opacity-30 bg-opacity-0 hover:bg-opacity-0 outline outline-1 outline-zinc-500",
                            className
                        )}
                    >
                        {children}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipContent}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
