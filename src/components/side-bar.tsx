"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Home, NotebookText, Utensils, PanelRightOpen, PanelLeftOpen, Power } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import { signOut } from "next-auth/react";
import NavLink from "@/components/nav-link";

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={cn(
                "flex flex-col h-screen transform-gpu border-r border-r-primary/10 bg-secondary p-2 shadow-lg transition-all duration-300 ease-in-out lg:flex",
                isOpen ? "w-56" : "w-[calc(2rem+32px)]"
            )}
        >
            <div className={cn("transition-all duration-300 mx-auto", isOpen ? "translate-x-20" : "translate-x-0")}>
                <button>
                    {isOpen ? (
                        <PanelRightOpen onClick={async () => setIsOpen(false)} />
                    ) : (
                        <PanelLeftOpen onClick={async () => setIsOpen(true)} />
                    )}
                </button>
            </div>
            <div className="mb-4 mt-2 flex transform-gpu justify-between pl-0 transition-all duration-200">
                <h2
                    className={cn(
                        "relative text-nowrap transform-gpu text-xl bg-transparent outline-none transition-all duration-200",
                        isOpen ? "w-auto opacity-100" : "-z-10 w-0 opacity-0"
                    )}
                >
                    Mon Restaurant
                </h2>
            </div>
            <Separator />
            <ul className="flex-1">
                <NavLink title="Mon compte" isOpen={isOpen} href="/account" prefetch={true}>
                    <Home
                        className={cn("size-10 rounded-lg px-2 transition-colors", isOpen ? "" : "hover:bg-primary/10")}
                    />
                </NavLink>
                <NavLink title="Plan de salle" isOpen={isOpen} href="/account/floor" prefetch={true}>
                    <Utensils
                        className={cn("size-10 rounded-lg px-2 transition-colors", isOpen ? "" : "hover:bg-primary/10")}
                    />
                </NavLink>
                <NavLink title="Réservations" isOpen={isOpen} href="/account/bookings" prefetch={true}>
                    <NotebookText
                        className={cn("size-10 rounded-lg px-2 transition-colors", isOpen ? "" : "hover:bg-primary/10")}
                    />
                </NavLink>
            </ul>
            <div className="mx-2 flex items-center justify-center">
                <ThemeToggle
                    className={cn(
                        "absolute w-10 transition-all transform-gpu duration-300",
                        isOpen ? "-translate-x-20 translate-y-0" : "translate-x-0 -translate-y-10"
                    )}
                />
                <div
                    className={cn(
                        "flex items-center transition-all transform-gpu duration-300",
                        isOpen ? "translate-x-10" : "translate-x-0"
                    )}
                >
                    <button
                        onClick={() => signOut()}
                        className="group flex cursor-pointer items-center rounded-lg bg-red-500/80 px-2 py-1 text-white transition-colors"
                    >
                        <div
                            className={cn(
                                "relative truncate text-nowrap transform-gpu bg-transparent outline-none transition-all duration-300",
                                isOpen ? "w-20 opacity-100" : "-z-10 w-0 opacity-0"
                            )}
                        >
                            <p className="transition-colors group-hover:text-red-100">Sign Out</p>
                        </div>
                        <Power strokeWidth={3} className="font-normal transition-colors group-hover:text-red-100" />
                    </button>
                </div>
            </div>
        </div>
    );
}
