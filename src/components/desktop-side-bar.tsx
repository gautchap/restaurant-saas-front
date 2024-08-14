"use client";

import { NotebookText, Utensils, PanelRightOpen, PanelLeftOpen, UserRound } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import NavLink from "@/components/nav-link";
import { formatDate } from "@/lib/format-date";
import SideBarFooter from "@/components/side-bar-footer";

export default function DesktopSideBar() {
    const [isOpen, setIsOpen] = useState(true);
    const todayFormat = formatDate(new Date());

    return (
        <div
            className={cn(
                "hidden md:flex flex-col h-screen transform-gpu border-r border-r-primary/10 bg-muted md:bg-muted/50 p-2 shadow-lg transition-all duration-300 ease-in-out lg:flex",
                isOpen ? "w-56" : "w-[calc(2rem+32px)]"
            )}
        >
            <div className={cn("transition-all duration-300 mx-auto", isOpen ? "translate-x-20" : "translate-x-0")}>
                <button>
                    {isOpen ? (
                        <>
                            <PanelRightOpen onClick={async () => setIsOpen(false)} />
                            <span className="sr-only">Fermer</span>
                        </>
                    ) : (
                        <>
                            <PanelLeftOpen onClick={async () => setIsOpen(true)} />
                            <span className="sr-only">Ouvrir</span>
                        </>
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
            <ul className="mt-2 flex-1 space-y-2">
                <NavLink title="Mon compte" isOpen={isOpen} href="/account" prefetch={true}>
                    <UserRound strokeWidth={1.5} className="transition-colors" />
                </NavLink>
                <NavLink title="Plan de salle" isOpen={isOpen} href="/account/floor" prefetch={true}>
                    <Utensils strokeWidth={1.5} className="transition-colors" />
                </NavLink>
                <NavLink
                    title="Réservations"
                    isOpen={isOpen}
                    href={`/account/bookings?from=${todayFormat}`}
                    prefetch={true}
                >
                    <NotebookText strokeWidth={1.5} className="transition-colors" />
                </NavLink>
            </ul>
            <SideBarFooter isOpen={isOpen} />
        </div>
    );
}
