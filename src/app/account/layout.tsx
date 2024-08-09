import type { ReactNode } from "react";
import SideBar from "@/components/side-bar";
import Layout from "@/components/account/layout";

export default async function AccountLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <SideBar />
            <Layout>{children}</Layout>
        </div>
    );
}
