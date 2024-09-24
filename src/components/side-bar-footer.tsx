"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Settings, ArrowRightToLine } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOutServerSide } from "@/actions/getAuth";
import { Link } from "next-view-transitions";

export default function SideBarFooter({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="flex items-center justify-center">
            <ThemeToggle
                className={cn(
                    "absolute w-10 transition-all transform-gpu duration-300 hover:bg-primary/10",
                    isOpen ? "-translate-x-20 translate-y-0" : "translate-x-0 -translate-y-10"
                )}
            />
            <div
                className={cn("transition-all transform-gpu duration-300", isOpen ? "translate-x-10" : "translate-x-0")}
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
                        <DropdownMenuItem asChild>
                            <Link className="size-full cursor-pointer" href="/account/billing">
                                Factures
                            </Link>
                        </DropdownMenuItem>
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
    );
}
