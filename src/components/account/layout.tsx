"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: ReactNode }) {
    const pathName = usePathname();

    return (
        <div
            className={cn(
                "flex size-full flex-1 flex-col gap-2 shadow-[0px_0px_15px_-3px_rgb(0_0_0_/_0.1),0px_0px_6px_-4px_rgb(0_0_0_/_0.1)] rounded-tr-2xl lg:rounded-tr-none rounded-tl-2xl  border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900",
                pathName.includes("floor") ? "pr-32 pt-0" : "md:p-10"
            )}
        >
            <div className={cn(pathName.includes("floor") ? "" : "overflow-auto container")}>{children}</div>
        </div>
    );
}
