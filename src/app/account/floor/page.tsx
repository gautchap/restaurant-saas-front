import dynamic from "next/dynamic";
import { getItems } from "@/actions/items";
import { getUserInfo } from "@/actions/getAuth";
// import { Droppable } from "@/components/droppable-use";
// import DragNavbar from "@/components/drag-navbar-use";
// import { TrashDroppable } from "@/components/trash-droppable-use";

const DraggableProvider = dynamic(
    // eslint-disable-next-line github/no-then
    () => import("@/context/draggable-provider").then((module_) => module_.DraggableProvider),
    {
        ssr: false,
        loading: () => (
            <div className="flex">
                <div className="mx-8 h-[80dvh] w-[80dvw] border border-black bg-white" />
                <div className="flex h-screen w-32 flex-col border-l border-l-primary/10 bg-secondary py-2 shadow-lg" />
            </div>
        ),
    }
);

const Droppable = dynamic(
    // eslint-disable-next-line github/no-then
    () => import("@/components/dnd-floor/droppable").then((module_) => module_.Droppable),
    { ssr: false }
);

const TrashDroppable = dynamic(
    // eslint-disable-next-line github/no-then
    () => import("@/components/dnd-floor/trash-droppable").then((module_) => module_.TrashDroppable),
    { ssr: false }
);

const DragNavbar = dynamic(
    // eslint-disable-next-line github/no-then
    () => import("@/components/dnd-floor/drag-navbar").then((module_) => module_.DragNavbar),
    { ssr: false }
);

export default async function Page() {
    const items = await getItems();
    const session = await getUserInfo();

    return (
        <>
            <DraggableProvider defaultItems={items || []} session={session}>
                <div className="flex">
                    <div>
                        <Droppable droppableId="drop" />
                        <TrashDroppable id="trash" />
                    </div>
                    <DragNavbar />
                </div>
            </DraggableProvider>
        </>
    );
}
