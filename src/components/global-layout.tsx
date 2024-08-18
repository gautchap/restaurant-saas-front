"use client";

import { Fragment, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/nav-bar";

export default function GlobalLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    return (
        <>
            {pathname.includes("account") || pathname.includes("login") || pathname.includes("export") ? null : (
                <NavBar />
            )}
            {children}
        </>
    );
}
