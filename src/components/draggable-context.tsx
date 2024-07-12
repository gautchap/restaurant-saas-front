"use client";

import type { Session } from "next-auth";
import type { Coordinates } from "@dnd-kit/utilities";
import type { DragEndEvent, DragStartEvent, PointerActivationConstraint } from "@dnd-kit/core";

import { useState } from "react";
import { DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors } from "@dnd-kit/core";
import { Droppable } from "@/components/droppable";
import { DraggableItem } from "@/components/draggable-item";
import { TrashDroppable } from "@/components/trash-droppable";
import { deleteItems, updateItems } from "@/actions/items";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ListItems } from "@/utils/list-items";
import { Item } from "@/types/itemSchema";

interface DraggableContextProps {
    activationConstraint?: PointerActivationConstraint;
    defaultCoordinates?: Coordinates;
    defaultItems: Item[];
    session: Session;
}

export function DraggableContext({ activationConstraint, defaultItems, session }: DraggableContextProps) {
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
                userId: Number(session.user.id),
                type: ListItem?.type as string,
                x: handleX((activatorEvent as MouseEvent).clientX - buttonSize.width / 2, delta.x),
                y: handleY((activatorEvent as MouseEvent).clientY - buttonSize.height / 2, delta.y),
                new: true,
            };
            setUpdatedItems((_items) => [..._items, newItem]);
            return setItems((_items) => [..._items, newItem]);
        }

        if (over.id === "drop") {
            const update = items.map((item) => {
                if (item.id === active.id) {
                    const updateItem = {
                        ...item,
                        x: handleX(item.x, delta.x),
                        y: handleY(item.y, delta.y),
                    };
                    const itemExist = updatedItems.find((_item) => _item.id === active.id);
                    if (itemExist) {
                        setUpdatedItems((_items) =>
                            _items.map((_item) => (_item.id === active.id ? updateItem : _item))
                        );
                    } else {
                        setUpdatedItems((_items) => [..._items, updateItem]);
                    }
                    return updateItem;
                }

                return item;
            });

            return setItems(() => update);
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
        if (trash.length > 0) await deleteItems(trash);
        if (!isDisabled && updatedItems.length > 0) {
            await updateItems(updatedItems);
            setUpdatedItems([]);
        }
        return setIsDisabled(!isDisabled);
    };

    return (
        <>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <div>
                    <Droppable id="drop" disabled={isDisabled}>
                        <div className="flex w-full box-border p-5 justify-start">
                            {items.map((item) => (
                                <DraggableItem
                                    key={item.id}
                                    id={item.id}
                                    disabled={isDisabled}
                                    label={item.type as string}
                                    top={item.y}
                                    left={item.x}
                                />
                            ))}
                        </div>
                    </Droppable>
                    {showTrash ? <TrashDroppable id="trash" /> : null}
                </div>

                <div className="w-32 h-screen bg-orange-400">
                    <input
                        className="cursor-pointer size-9"
                        onChange={handleSave}
                        type="checkbox"
                        checked={!isDisabled}
                    />

                    <ul>
                        {ListItems.map((item) => (
                            <li key={item.id}>
                                <DraggableItem id={item.id} isList={true} disabled={isDisabled} label={item.type} />
                            </li>
                        ))}
                    </ul>
                </div>
            </DndContext>
        </>
    );
}
