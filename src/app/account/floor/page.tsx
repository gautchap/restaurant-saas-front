import dynamic from "next/dynamic";
import { getItems } from "@/actions/items";
import { getUserInfo } from "@/actions/getAuth";
import { Droppable } from "@/components/dnd-floor/droppable";
import { DragNavbar } from "@/components/dnd-floor/drag-navbar";
import { TrashDroppable } from "@/components/dnd-floor/trash-droppable";

const DraggableProvider = dynamic(
    // eslint-disable-next-line github/no-then
    () => import("@/context/draggable-provider").then((module_) => module_.DraggableProvider),
    {
        ssr: false,
        loading: () => (
            <div className="flex">
                <div className="relative h-[calc(950px*0.8)] w-[calc(1920px*0.8)] border border-primary md:mx-auto" />
                <div className="flex h-screen w-32 flex-col border-l border-l-primary/10 bg-secondary py-2 shadow-lg" />
            </div>
        ),
    }
);

export default async function Page() {
    const items = await getItems();
    const session = await getUserInfo();

    return (
        <div className="overflow-hidden">
            <DraggableProvider defaultItems={items || []} session={session}>
                <div className="flex justify-end">
                    <div className="mx-auto w-full flex-1">
                        <Droppable droppableId="drop" />
                        <TrashDroppable id="trash" />
                    </div>
                    <DragNavbar />
                </div>
            </DraggableProvider>
        </div>
    );
}
