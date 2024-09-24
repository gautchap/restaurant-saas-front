"use client";

import type { ComponentProps, ReactNode } from "react";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type NavLinkProps = {
    title: string;
    isOpen: boolean;
    children: ReactNode;
} & ComponentProps<typeof Link>;

export default function NavLink({ title, isOpen, children, ...props }: NavLinkProps) {
    const pathname = usePathname();

    return (
        <li className={cn("transition-all transform-gpu duration-300", isOpen ? "translate-x-1" : "translate-x-1")}>
            <Link {...props} className="inline-flex">
                <Button
                    variant="ghost"
                    className={cn(
                        "px-2 hover:bg-primary/10",
                        String(props.href).split("?")[0] === pathname ? "bg-primary/10" : ""
                    )}
                >
                    {children}
                    <div
                        className={cn(
                            "relative truncate text-nowrap transform-gpu bg-transparent outline-none transition-all duration-300",
                            isOpen ? "w-24 opacity-100" : "-z-10 w-0 opacity-0"
                        )}
                    >
                        <span>{title}</span>
                    </div>
                </Button>
            </Link>
        </li>
    );
}
