"use client";

import type { PickOne } from "@/types/typeUtils";
import type { Session } from "next-auth";
import type { Coordinates } from "@dnd-kit/utilities";
import type { DragEndEvent, DragStartEvent, PointerActivationConstraint } from "@dnd-kit/core";

import { memo, useState } from "react";
import { DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors } from "@dnd-kit/core";
import { Droppable } from "@/components/droppable";
import { TrashDroppable } from "@/components/trash-droppable";
import { deleteItems, updateItems } from "@/actions/items";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ListItems } from "@/utils/list-items";
import { Item } from "@/types/itemSchema";
import DragNavbar from "@/components/drag-navbar";

interface DraggableContextProps {
    activationConstraint?: PointerActivationConstraint;
    defaultCoordinates?: Coordinates;
    defaultItems: Item[];
    session: Session;
}

export const DraggableContext = memo(({ activationConstraint, defaultItems, session }: DraggableContextProps) => {
    const [items, setItems] = useState(defaultItems);
    const [updatedItems, setUpdatedItems] = useState<Item[]>([]);
    const [trash, setTrash] = useState<Item[]>([]);
    const [showTrash, setShowTrash] = useState(false);
    const [isDisabled, setIsDisabled] = useLocalStorage("isEdit", false);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint,
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint,
    });
    const keyboardSensor = useSensor(KeyboardSensor, {});
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const handleDragEnd = async ({ activatorEvent, active, over, delta }: DragEndEvent) => {
        setShowTrash(false);
        if (!over) return;

        const buttonSize = {
            width: (activatorEvent.target as HTMLElement).offsetWidth || 0,
            height: (activatorEvent.target as HTMLElement).offsetHeight || 0,
        };

        const handleX = (x: number, _delta: number) => {
            let result = x + _delta;
            if (x + _delta > over.rect.right - buttonSize.width) result = over.rect.right - buttonSize.width;
            if (x + _delta < over.rect.left) result = over.rect.left;

            return Number(result.toFixed(0));
        };

        const handleY = (y: number, _delta: number) => {
            let result = y + _delta;
            if (y + _delta > over.rect.bottom - buttonSize.height) result = over.rect.bottom - buttonSize.height;
            if (y + _delta < over.rect.top) result = over.rect.top;

            return Number(result.toFixed(0));
        };

        if (Boolean(ListItems.some((item) => item.id === active.id)) && over.id === "drop") {
            const ListItem = ListItems.find((item) => item.id === active.id);

            const newItem = {
                id: window.crypto.randomUUID(),
                userId: session.user.id as string,
                type: ListItem?.type as Item["type"],
                name: ListItem?.name as string,
                x: handleX((activatorEvent as MouseEvent).clientX - buttonSize.width / 2, delta.x),
                y: handleY((activatorEvent as MouseEvent).clientY - buttonSize.height / 2, delta.y),
                shape: ListItem?.shape as Item["shape"],
                new: true,
                tableNumber: Math.floor(Math.random() * (100 - 1 + 1) + 1),
                chairAmount: 4,
            } satisfies Item;
            setUpdatedItems((_items) => [..._items, newItem]);
            return setItems((_items) => [..._items, newItem]);
        }

        if (over.id === "drop") {
            const itemExist = items.find((item) => item.id === active.id);
            const updatedItemExist = updatedItems.find((item) => item.id === active.id);

            if (itemExist) {
                const updateItem = {
                    ...itemExist,
                    x: handleX(itemExist.x, delta.x),
                    y: handleY(itemExist.y, delta.y),
                };

                setItems((_items) => _items.map((_item) => (_item.id === active.id ? updateItem : _item)));

                if (updatedItemExist) {
                    setUpdatedItems((_items) => _items.map((_item) => (_item.id === active.id ? updateItem : _item)));
                } else {
                    setUpdatedItems((_items) => [..._items, updateItem]);
                }
            }
        }

        if (over.id === "trash") {
            setTrash((_items) => [..._items, ...items.filter((item) => item.id === active.id && !item.new)]);
            setUpdatedItems((_items) => _items.filter((item) => item.id !== active.id));
            setItems((_items) => _items.filter((item) => item.id !== active.id));
        }
    };

    const handleDragStart = ({ active }: DragStartEvent) => {
        if (!ListItems.some((item) => item.id === active.id)) return setShowTrash(true);
    };

    const handleSave = async () => {
        setIsDisabled((disable) => !disable);
        if (trash.length > 0) await deleteItems(trash);
        if (!isDisabled && updatedItems.length > 0) {
            await updateItems(updatedItems);
            setUpdatedItems([]);
        }
    };

    const handleAmount = ({ id, tableNumber, chairAmount }: PickOne<Item, "id">) => {
        const itemExist = items.find((item) => item.id === id);
        const updatedItemExist = updatedItems.find((item) => item.id === id);

        if (itemExist) {
            const updateItem = {
                ...itemExist,
                tableNumber: tableNumber || itemExist.tableNumber,
                chairAmount: chairAmount || itemExist.chairAmount,
            };

            setItems((_items) => _items.map((_item) => (_item.id === id ? updateItem : _item)));

            if (updatedItemExist) {
                setUpdatedItems((_items) => _items.map((_item) => (_item.id === id ? updateItem : _item)));
            } else {
                setUpdatedItems((_items) => [..._items, updateItem]);
            }
        }
    };

    return (
        <>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <div className="flex">
                    <div>
                        <Droppable handleAmount={handleAmount} droppableId="drop" disabled={isDisabled} items={items} />
                        {showTrash ? <TrashDroppable id="trash" /> : null}
                    </div>
                    <DragNavbar handleSave={handleSave} isDisabled={isDisabled} />
                </div>
            </DndContext>
        </>
    );
});
