"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/side-bar-provider";
import { PanelRightOpen, PanelLeftOpen, Menu, X, Chrome } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { Link } from "next-view-transitions";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import SideBarFooter from "@/components/side-bar-footer";

export const SideBarMobile = ({ children }: { children: ReactNode }) => {
    return (
        <header className="flex h-10 w-full flex-row items-center justify-between bg-neutral-100 p-4 dark:bg-neutral-800 lg:hidden">
            <Link href="/" className={`${navigationMenuTriggerStyle()} pl-0`}>
                <Chrome />
            </Link>
            <Drawer direction="right">
                <DrawerTrigger className="z-20 flex w-full justify-end">
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
                            <ul className="p-4 pb-0">{children}</ul>
                            <Separator className="max-w-sm" />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </header>
    );
};

export const SideBarDesktop = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(true);

    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
                <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <div className="hidden lg:block">
                        {open ? (
                            <PanelRightOpen
                                className="size-5 shrink-0 cursor-pointer text-neutral-700 dark:text-neutral-200"
                                onClick={() => setOpen(false)}
                            />
                        ) : (
                            <PanelLeftOpen
                                className="size-5 shrink-0 cursor-pointer text-neutral-700 dark:text-neutral-200"
                                onClick={() => setOpen(true)}
                            />
                        )}
                    </div>
                    {children}
                </div>
                <div>
                    <SideBarFooter isOpen={open} />
                </div>
            </SidebarBody>
        </Sidebar>
    );
};
