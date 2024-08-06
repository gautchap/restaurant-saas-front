"use client";

import type { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

type CopyButtonProps = { element: string; children: ReactNode } & ButtonProps;

export default function CopyButton({ element, children, ...props }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);
    const handleClick = () => {
        setIsCopied(true);
        navigator.clipboard.writeText(element);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    return (
        <div className="relative inline-block">
            <div
                className={cn(
                    "transition-all duration-200 inline-flex pointer-events-none absolute left-1/2 top-0 h-6 w-20 -translate-x-1/2 items-center justify-evenly rounded-md bg-primary/90 text-sm text-secondary outline-none",
                    isCopied ? "opacity-1 z-auto translate-y-[-115%]" : "-z-10 opacity-0 -translate-y-2/4"
                )}
            >
                <div className="flex items-center justify-center rounded-full bg-green-500 p-[2px]">
                    <Check strokeWidth={4} className="size-3 text-white" />
                </div>

                <p>Copié !</p>
            </div>
            <Button {...props} onClick={handleClick}>
                {children}
            </Button>
        </div>
    );
}
