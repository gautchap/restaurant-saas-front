"use client";

import type { Session } from "next-auth";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from "react";
import { ChevronRight, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import MenuMobile from "@/components/menu-mobile";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description: "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description: "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

export default function NavBar({ session }: { session: Session | null }) {
    const { scrollY } = useScroll();

    const [scroll, setScroll] = useState(0);
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScroll(() => latest);
    });

    return (
        <motion.header
            className={cn(
                "fixed inset-x-0 top-4 z-10 mx-3 md:mx-auto flex max-w-5xl items-center justify-between rounded-full transition-color-extend duration-700 px-4 py-1",
                scroll > 20 ? "bg-accent shadow-lg" : "bg-background"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ ease: "circOut" }}
        >
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" className={`${navigationMenuTriggerStyle()} pl-0`}>
                            <Chrome />
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:flex">
                        <NavigationMenuTrigger className="cursor-auto">Getting started</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Beautifully designed components that you can copy and paste into your
                                                apps. Accessible. Customizable. Open Source.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs" title="Introduction">
                                    Re-usable components built using Radix UI and Tailwind CSS.
                                </ListItem>
                                <ListItem href="/docs/installation" title="Installation">
                                    How to install dependencies and structure your app.
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Typography">
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:flex">
                        <NavigationMenuTrigger className="cursor-auto">Components</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem key={component.title} title={component.title} href={component.href}>
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:flex">
                        <Link href="/prices" className={`${navigationMenuTriggerStyle()}cursor-pointer`}>
                            Tarifs
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:flex">
                        <Link href="/test1" className={`${navigationMenuTriggerStyle()}cursor-pointer`}>
                            test1
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:flex">
                        <Link href="/test2" className={`${navigationMenuTriggerStyle()}cursor-pointer`}>
                            test2
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Button asChild className="hidden rounded-full pr-2 md:flex">
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
            <MenuMobile session={session} />
        </motion.header>
    );
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";
