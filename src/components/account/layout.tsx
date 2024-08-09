"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: ReactNode }) {
    const pathName = usePathname();

    return (
        <div
            className={cn(
                "flex-1",
                pathName.includes("floor") ? "pl-5" : "overflow-auto container px-4 md:px-8 pt-10 md:pt-7"
            )}
        >
            {children}
        </div>
    );
}
