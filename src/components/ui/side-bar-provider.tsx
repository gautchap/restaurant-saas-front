"use client";
import { cn } from "@/lib/utils";
import { LinkProps } from "next/link";
import { Link } from "next-view-transitions";
import React, { useState, createContext, useContext } from "react";
import { motion } from "framer-motion";

interface Links {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProperty,
    setOpen: setOpenProperty,
    animate = true,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    const [openState, setOpenState] = useState(false);

    const open = openProperty === undefined ? openState : openProperty;
    const setOpen = setOpenProperty === undefined ? setOpenState : setOpenProperty;

    return <SidebarContext.Provider value={{ open, setOpen, animate }}>{children}</SidebarContext.Provider>;
};

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
    return (
        <>
            <DesktopSidebar {...props} />
        </>
    );
};

export const DesktopSidebar = ({ className, children, ...props }: React.ComponentProps<typeof motion.div>) => {
    const { open, animate } = useSidebar();
    return (
        <>
            <motion.div
                className={cn(
                    "h-full px-4 py-4 hidden transform-gpu lg:flex lg:flex-col bg-neutral-100 dark:bg-neutral-800 w-56 flex-shrink-0",
                    className
                )}
                animate={{
                    width: animate ? (open ? "224px" : "60px") : "224px",
                }}
                {...props}
            >
                {children}
            </motion.div>
        </>
    );
};

export const SidebarLink = ({ link, className, ...props }: { link: Links; className?: string; props?: LinkProps }) => {
    const { open, animate } = useSidebar();
    return (
        <Link
            href={link.href}
            className={cn("flex items-center justify-start gap-2  group/sidebar py-2", className)}
            {...props}
        >
            {link.icon}

            <motion.span
                animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200"
            >
                {link.label}
            </motion.span>
        </Link>
    );
};
