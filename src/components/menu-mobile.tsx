"use client";

import type { Session } from "next-auth";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronRight, Menu, X } from "lucide-react";
import { Link } from "next-view-transitions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MenuMobile({ session }: { session: Session | null }) {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild className="md:hidden">
                <Menu />
            </DrawerTrigger>
            <DrawerContent>
                <div className="w-full">
                    <DrawerHeader className="flex w-full items-center justify-between text-left">
                        <div className="flex flex-col">
                            <DrawerTitle>Move Goal</DrawerTitle>
                            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                        </div>

                        <div className="flex items-center">
                            <ThemeToggle />

                            <DrawerClose asChild>
                                <X />
                            </DrawerClose>
                        </div>
                    </DrawerHeader>
                    <div className="max-w-sm">
                        <ul className="p-4 pb-0">
                            <li>
                                <DrawerClose asChild>
                                    <Link className="text-3xl" href="/prices">
                                        Tarifs
                                    </Link>
                                </DrawerClose>
                            </li>
                            <li>
                                <DrawerClose asChild>
                                    <Link className="text-3xl" href="/test1">
                                        Test1
                                    </Link>
                                </DrawerClose>
                            </li>
                            <li>
                                <DrawerClose asChild>
                                    <Link className="text-3xl" href="/test2">
                                        Test2
                                    </Link>
                                </DrawerClose>
                            </li>
                        </ul>
                        <Separator className="max-w-sm" />
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button asChild className="pr-2">
                                    {session ? (
                                        <Link href="/account">
                                            <span>Mon compte</span>
                                            <ChevronRight size={15} />
                                        </Link>
                                    ) : (
                                        <Link href="/login">
                                            <span>Se connecter</span>
                                            <ChevronRight size={15} />
                                        </Link>
                                    )}
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
