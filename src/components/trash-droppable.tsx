import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";

type DroppableProps = {
    id: string;
};

export function TrashDroppable({ id }: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`mx-auto my-4 flex h-20 w-72 items-center justify-center rounded border border-dashed border-primary text-lg transition-all animate-in fade-in ${
                isOver && "bg-secondary/90 opacity-80"
            }`}
        >
            <Trash2 />
        </div>
    );
}
