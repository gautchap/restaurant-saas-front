import type { ReactNode } from "react";
import SideBar from "@/components/side-bar";

export default async function AccountLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-1 pl-5">{children}</div>
        </div>
    );
}
