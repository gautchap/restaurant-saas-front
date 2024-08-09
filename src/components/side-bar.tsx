import MobileSideBar from "@/components/mobile-side-bar";
import DesktopSideBar from "@/components/desktop-side-bar";

export default function SideBar() {
    return (
        <>
            <DesktopSideBar />
            <MobileSideBar />
        </>
    );
}
