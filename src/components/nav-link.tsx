"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavLinkProps = {
    title: string;
    isOpen: boolean;
    children: ReactNode;
} & ComponentProps<typeof Link>;

export default function NavLink({ title, isOpen, children, ...props }: NavLinkProps) {
    const pathname = usePathname();

    return (
        <li className="my-2 ml-1 max-w-40">
            <Link
                {...props}
                className={cn(
                    "flex items-center rounded-md transition-colors",
                    isOpen ? "hover:bg-primary/10" : "",
                    props.href === pathname ? "bg-primary/10" : ""
                )}
            >
                {children}
                <p
                    className={cn(
                        "transform-gpu text-nowrap transition-all duration-300",
                        isOpen ? "w-10 opacity-100" : "w-0 opacity-0"
                    )}
                >
                    {title}
                </p>
            </Link>
        </li>
    );
}
