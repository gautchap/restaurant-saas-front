"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, UserRound, Utensils, NotebookText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import NavLink from "@/components/nav-link";
import { formatDate } from "@/lib/format-date";
import SideBarFooter from "@/components/side-bar-footer";

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
                        <SheetClose asChild>
                            <NavLink title="Mon compte" isOpen={true} href="/account" prefetch={true}>
                                <UserRound strokeWidth={1.5} className="transition-colors" />
                            </NavLink>
                        </SheetClose>
                        <SheetClose asChild>
                            <NavLink title="Plan de salle" isOpen={true} href="/account/floor" prefetch={true}>
                                <Utensils strokeWidth={1.5} className="transition-colors" />
                            </NavLink>
                        </SheetClose>
                        <SheetClose asChild>
                            <NavLink
                                title="Réservations"
                                isOpen={true}
                                href={`/account/bookings?from=${todayFormat}`}
                                prefetch={true}
                            >
                                <NotebookText strokeWidth={1.5} className="transition-colors" />
                            </NavLink>
                        </SheetClose>
                    </ul>
                    <SheetFooter>
                        <SideBarFooter isOpen={true} />
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
