import type { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
    id: string;
    disabled: boolean;
    children: ReactNode;
};

export function Droppable({ id, disabled, children }: DroppableProps) {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`ml-auto mr-8 h-[80dvh] w-[80dvw] border border-black bg-white ${
                disabled ? "" : " bg-dots-craft bg-[size:40px_40px]"
            }`}
        >
            {children}
        </div>
    );
}
