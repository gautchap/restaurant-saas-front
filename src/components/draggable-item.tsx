"use client";

import type { UniqueIdentifier } from "@dnd-kit/core";
import { Draggable } from "@/components/draggable";
import { useDraggable } from "@dnd-kit/core";

interface DraggableItemProps {
    label: string;
    top?: number;
    left?: number;
    disabled: boolean;
    id: UniqueIdentifier;
    isList?: boolean;
}

export function DraggableItem({ label, top, left, disabled, id, isList }: DraggableItemProps) {
    const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
        id,
        disabled,
    });

    return (
        <Draggable
            id={id}
            isList={isList}
            disabled={disabled}
            ref={setNodeRef}
            dragging={isDragging}
            label={label}
            listeners={listeners}
            style={{ top, left }}
            transform={transform}
            {...attributes}
        />
    );
}
