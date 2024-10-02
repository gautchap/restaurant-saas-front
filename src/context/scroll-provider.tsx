"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProvider({ children }: { children: ReactNode }) {
    const options = { wheelMultiplier: 1.5, smoothWheel: true, duration: 1.5 };
    const pathname = usePathname();
    const userAgent = typeof window === "undefined" ? "" : window.navigator.userAgent;

    useEffect(() => {
        (async () => {
            if (pathname.includes("account") || !userAgent.includes("Windows")) return;
            const Lenis = (await import("lenis")).default;
            const lenis = new Lenis(options);

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
        })();
    }, []);

    return <>{children} </>;
}
