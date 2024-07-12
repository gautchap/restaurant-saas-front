import type { ReactNode } from "react";
import { signOut } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRightToLine } from "lucide-react";

export default async function AccountLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <div className="h-screen w-48 border-r border-r-primary/10 bg-secondary py-2 shadow-lg">
                <div className="flex h-full flex-col">
                    <ul className="flex-1">
                        <li className="text-center">
                            <Link prefetch={true} href="/account">
                                Mon compte
                            </Link>
                        </li>
                        <li className="text-center">
                            <Link prefetch={true} href="/account/floor">
                                Salle
                            </Link>
                        </li>
                    </ul>
                    <div>
                        <div className="mx-2 flex items-center justify-between">
                            <ThemeToggle />
                            <form
                                className="flex cursor-pointer items-center transition-colors hover:text-red-600"
                                action={async () => {
                                    "use server";
                                    await signOut();
                                    revalidateTag("auth-info");
                                }}
                            >
                                <button type="submit">Sign Out</button>
                                <ArrowRightToLine strokeWidth={1.5} className="font-normal" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
}
