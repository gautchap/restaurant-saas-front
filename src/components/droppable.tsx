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
            className={`mr-8 ml-auto w-[80dvw] h-[80dvh] border border-black ${
                disabled ? "" : " bg-[size:40px_40px] bg-dots-craft"
            }`}
        >
            {children}
        </div>
    );
}
