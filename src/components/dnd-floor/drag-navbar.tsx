"use client";

import { LockToggle } from "@/components/dnd-floor/lock-toggle";
import { DraggableItem } from "@/components/dnd-floor/draggable-item";
import { ListItems } from "@/utils/list-items";
import { useCustomDraggable } from "@/context/draggable-provider";
import { memo } from "react";

export const DragNavbar = memo(() => {
    const { handleSave, isDisabled } = useCustomDraggable();

    return (
        <div className="flex h-screen w-32 flex-col border-l border-l-primary/10 bg-secondary py-2 shadow-lg md:flex">
            <LockToggle className="mx-auto" onClick={handleSave} isDisabled={isDisabled} />
            <ul>
                {ListItems.map((item) => (
                    <li key={item.id}>
                        <DraggableItem
                            tableNumber={99}
                            chairPos={item.chairPos}
                            shape={item.shape}
                            id={item.id}
                            isList={true}
                            disabled={isDisabled}
                            label={item.name}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
});
