"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import {
    NotebookText,
    Utensils,
    PanelRightOpen,
    PanelLeftOpen,
    Settings,
    ArrowRightToLine,
    UserRound,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavLink from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";
import { signOutServerSide } from "@/actions/getAuth";

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
            <div className="mx-2 flex items-center justify-center">
                <ThemeToggle
                    className={cn(
                        "absolute w-10 transition-all transform-gpu duration-300 hover:bg-primary/10",
                        isOpen ? "-translate-x-20 translate-y-0" : "translate-x-0 -translate-y-10"
                    )}
                />
                <div
                    className={cn(
                        "transition-all transform-gpu duration-300",
                        isOpen ? "translate-x-10" : "translate-x-0"
                    )}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="group px-2 hover:bg-primary/10">
                                <div
                                    className={cn(
                                        "relative truncate text-nowrap transform-gpu bg-transparent outline-none transition-all duration-300",
                                        isOpen ? "w-16 opacity-100" : "-z-10 w-0 opacity-0"
                                    )}
                                >
                                    <span>Options</span>
                                </div>
                                <Settings
                                    strokeWidth={1.5}
                                    className="group-hover:animate-spin group-hover:transition-all group-hover:duration-2500"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="group cursor-pointer p-0 text-red-500 hover:text-red-600">
                                <button
                                    className="flex size-full items-center justify-between px-1.5 py-1"
                                    onClick={async () => {
                                        await signOutServerSide();
                                    }}
                                >
                                    <span className="text-red-500 group-hover:text-red-600">Déconnecter</span>
                                    <ArrowRightToLine className="text-red-500 group-hover:text-red-600" size={15} />
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
