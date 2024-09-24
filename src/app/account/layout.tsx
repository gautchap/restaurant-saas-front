import type { ReactNode } from "react";
import Layout from "@/components/account/layout";
import { SideBarDesktop, SideBarMobile } from "@/components/side-bar";
import { SidebarLink } from "@/components/ui/side-bar-provider";
import { NotebookText, Utensils, UserRound, Settings, ReceiptText } from "lucide-react";
import { DrawerClose } from "@/components/ui/drawer";
import { Link } from "next-view-transitions";

const links = [
    {
        label: "Mon compte",
        href: "/account",
        icon: <UserRound className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Plan de salle",
        href: "/account/floor",
        icon: <NotebookText className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Réservations",
        href: "/account/bookings",
        icon: <Utensils className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Factures",
        href: "/account/billing",
        icon: <ReceiptText className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Paramètres",
        href: "#",
        icon: <Settings className="size-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
];

export default async function AccountLayout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto flex h-screen w-full flex-1 flex-col rounded-md border border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 lg:flex-row">
            <div className="hidden lg:block">
                <SideBarDesktop>
                    <div className="mt-8 flex flex-col gap-2">
                        {links.map((link, index) => (
                            <SidebarLink key={index} link={link} />
                        ))}
                    </div>
                </SideBarDesktop>
            </div>
            <div className="lg:hidden">
                <SideBarMobile>
                    {links.map((link, index) => (
                        <li key={index}>
                            <DrawerClose asChild>
                                <Link className="flex items-center gap-3 text-3xl" href={link.href}>
                                    <div>{link.icon}</div> <span>{link.label}</span>
                                </Link>
                            </DrawerClose>
                        </li>
                    ))}
                </SideBarMobile>
            </div>
            <div className="flex flex-1">
                <Layout>{children}</Layout>
            </div>
        </div>
    );
}
