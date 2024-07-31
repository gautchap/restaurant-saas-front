"use client";

import { useCustomDraggable } from "@/context/draggable-provider";
import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import { memo } from "react";

type DroppableProps = {
    id: string;
};

export const TrashDroppable = memo(({ id }: DroppableProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });
    const { showTrash } = useCustomDraggable();
    if (!showTrash) return null;

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
});
