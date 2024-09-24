import { getItems } from "@/actions/items";
import { Droppable } from "@/components/dnd-floor/droppable";
import { DragNavbar } from "@/components/dnd-floor/drag-navbar";
import { TrashDroppable } from "@/components/dnd-floor/trash-droppable";
import { auth } from "@/lib/auth";
import { DraggableProvider } from "@/context/draggable-provider";

export default async function Page() {
    const items = await getItems();
    const session = await auth();

    return (
        <div className="overflow-hidden">
            <DraggableProvider defaultItems={items || []} session={session!}>
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
