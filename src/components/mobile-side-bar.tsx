"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, UserRound, Utensils, NotebookText, ArrowRightToLine, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import NavLink from "@/components/nav-link";
import { formatDate } from "@/lib/format-date";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { signOutServerSide } from "@/actions/getAuth";

export default function MobileSideBar() {
    const todayFormat = formatDate(new Date());
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <button className="absolute z-20 ml-4 mt-2">
                        <Menu />
                        <span className="sr-only">Ouvrir</span>
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="flex h-dvh max-w-[45dvw] flex-col px-2 pb-0">
                    <SheetHeader>
                        <SheetTitle>Mon Restaurant</SheetTitle>
                        <SheetDescription className="sr-only">Navigation</SheetDescription>
                    </SheetHeader>
                    <Separator />
                    <ul className="mt-2 flex-1 space-y-2">
                        <NavLink title="Mon compte" isOpen={true} href="/account" prefetch={true}>
                            <UserRound strokeWidth={1.5} className="transition-colors" />
                        </NavLink>
                        <NavLink title="Plan de salle" isOpen={true} href="/account/floor" prefetch={true}>
                            <Utensils strokeWidth={1.5} className="transition-colors" />
                        </NavLink>
                        <NavLink
                            title="Réservations"
                            isOpen={true}
                            href={`/account/bookings?from=${todayFormat}`}
                            prefetch={true}
                        >
                            <NotebookText strokeWidth={1.5} className="transition-colors" />
                        </NavLink>
                    </ul>
                    <SheetFooter>
                        <div className="flex items-center justify-between">
                            <ThemeToggle className="hover:bg-primary/10" />
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="group px-2 hover:bg-primary/10">
                                            <div className="relative w-16 transform-gpu truncate text-nowrap bg-transparent opacity-100 outline-none transition-all duration-300">
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
                                                <span className="text-red-500 group-hover:text-red-600">
                                                    Déconnecter
                                                </span>
                                                <ArrowRightToLine
                                                    className="text-red-500 group-hover:text-red-600"
                                                    size={15}
                                                />
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
