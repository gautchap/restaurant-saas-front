"use client";

import type { UniqueIdentifier } from "@dnd-kit/core";
import type { Item } from "@/types/itemSchema";
import { Draggable } from "@/components/draggable";
import { useDraggable } from "@dnd-kit/core";
import { memo } from "react";

interface DraggableItemProps {
    label: string;
    top?: number;
    left?: number;
    disabled: boolean;
    id: UniqueIdentifier;
    isList?: boolean;
    shape: Item["shape"];
    tableNumber: Item["tableNumber"];
    chairPos: Item["chairPos"];
}

export const DraggableItem = memo(
    ({ label, top, left, disabled, id, isList, shape, tableNumber, chairPos }: DraggableItemProps) => {
        const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
            id,
            disabled,
        });
        return (
            <Draggable
                tableNumber={tableNumber}
                chairPos={chairPos}
                id={id}
                isList={isList}
                disabled={disabled}
                ref={setNodeRef}
                dragging={isDragging}
                label={label}
                listeners={listeners}
                shape={shape}
                style={{ top, left }}
                transform={transform}
                {...attributes}
            />
        );
    }
);
