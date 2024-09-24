"use client";

import type { ReactNode } from "react";
import type { Session } from "next-auth";
import { usePathname } from "next/navigation";
import NavBar from "@/components/nav-bar";

export default function GlobalLayout({ session, children }: { session: Session | null; children: ReactNode }) {
    const pathname = usePathname();
    return (
        <>
            {pathname.includes("account") || pathname.includes("login") || pathname.includes("export") ? null : (
                <div className="h-20">
                    <NavBar session={session} />
                </div>
            )}
            {children}
        </>
    );
}
