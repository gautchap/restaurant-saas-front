"use client";

import type { PickOne } from "@/types/typeUtils";
import type { ReactNode } from "react";
import type { Session } from "next-auth";
import type { DragEndEvent, DragStartEvent, PointerActivationConstraint } from "@dnd-kit/core";

import { useState, createContext, useContext, memo } from "react";
import { DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors } from "@dnd-kit/core";
import { deleteItems, updateItems } from "@/actions/items";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ListItems } from "@/utils/list-items";
import { Item } from "@/types/itemSchema";

type DraggableProviderProps = {
    activationConstraint?: PointerActivationConstraint;
    children: ReactNode;
    defaultItems: Item[];
    session: Session;
};

type DraggableContextType = {
    isDisabled: boolean;
    showTrash: boolean;
    // eslint-disable-next-line no-unused-vars
    editChairPos: (id: string, checked: boolean, chairId: number) => void;
    // eslint-disable-next-line no-unused-vars
    handleAmount: ({ id, tableNumber }: PickOne<Item, "id">) => void;
    handleSave: () => Promise<void>;
    items: Item[];
};

const DraggableContext = createContext<DraggableContextType | undefined>(undefined);

export const useCustomDraggable = () => {
    const context = useContext(DraggableContext);
    if (typeof window === "undefined") {
        throw new TypeError("useCustomDraggable cannot be used outside client component");
    }
    if (context === undefined) {
        throw new Error("useCustomDraggable must be used within a DraggableContext");
    }
    return context;
};

export const DraggableProvider = memo(
    ({ activationConstraint, defaultItems, session, children }: DraggableProviderProps) => {
        const [items, setItems] = useState(defaultItems);
        const [updatedItems, setUpdatedItems] = useState<Item[]>([]);
        const [trash, setTrash] = useState<Item[]>([]);
        const [showTrash, setShowTrash] = useState(false);
        const [isDisabled, setIsDisabled] = useLocalStorage("isEditDisabled", true);

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
                width: (activatorEvent.target as HTMLElement).offsetWidth,
                height: (activatorEvent.target as HTMLElement).offsetHeight,
            };

            const handleAxis = (x: number, deltaX: number, y: number, deltaY: number) => {
                let posX = x + deltaX;
                let posY = y + deltaY;
                if (posX > over.rect.right - buttonSize.width) {
                    posX = over.rect.right - buttonSize.width;
                    return { x: posX, y };
                }
                if (posX < over.rect.left) {
                    posX = over.rect.left;
                    return { x: posX, y };
                }
                if (posY > over.rect.bottom - buttonSize.height) {
                    posY = over.rect.bottom - buttonSize.height;
                    return { x, y: posY };
                }
                if (posY < over.rect.top) {
                    posY = over.rect.top;
                    return { x, y: posY };
                }

                for (const item of items) {
                    const horizChairs = Boolean(item.chairPos.some((pos) => pos === 2 || pos === 3));
                    const vertiChairs = Boolean(item.chairPos.some((pos) => pos === 1 || pos === 4));
                    const width = horizChairs ? 96 : 48;
                    const height = vertiChairs ? 96 : 48;

                    if (
                        item.id !== active.id &&
                        posX < item.x + width &&
                        item.x < posX + buttonSize.width &&
                        posY < item.y + height &&
                        item.y < posY + buttonSize.height
                    ) {
                        posX = x;
                        posY = y;
                    }
                }

                return { x: posX, y: posY };
            };

            if (Boolean(ListItems.some((item) => item.id === active.id)) && over.id === "drop") {
                const ListItem = ListItems.find((item) => item.id === active.id);

                const newItem = {
                    id: window.crypto.randomUUID(),
                    userId: session.user.id as string,
                    type: ListItem?.type as Item["type"],
                    name: ListItem?.name as string,
                    x: handleAxis(
                        (activatorEvent as MouseEvent).clientX - buttonSize.width / 2,
                        delta.x,
                        (activatorEvent as MouseEvent).clientY - buttonSize.height / 2,
                        delta.y
                    ).x,
                    y: handleAxis(
                        (activatorEvent as MouseEvent).clientX - buttonSize.width / 2,
                        delta.x,
                        (activatorEvent as MouseEvent).clientY - buttonSize.height / 2,
                        delta.y
                    ).y,
                    shape: ListItem?.shape as Item["shape"],
                    new: true,
                    tableNumber: Math.floor(Math.random() * (100 - 1 + 1) + 1),
                    chairPos: [1, 2, 3, 4],
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
                        x: handleAxis(itemExist.x, delta.x, itemExist.y, delta.y).x,
                        y: handleAxis(itemExist.x, delta.x, itemExist.y, delta.y).y,
                    };

                    setItems((_items) => _items.map((_item) => (_item.id === active.id ? updateItem : _item)));

                    if (updatedItemExist) {
                        setUpdatedItems((_items) =>
                            _items.map((_item) => (_item.id === active.id ? updateItem : _item))
                        );
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

        const editChairPos = (id: string, checked: boolean, chairId: number) => {
            const itemExist = items.find((item) => item.id === id);
            const updatedItemExist = updatedItems.find((item) => item.id === id);
            if (itemExist) {
                if (checked) {
                    itemExist?.chairPos?.push(chairId);
                } else {
                    itemExist?.chairPos?.splice(itemExist?.chairPos?.indexOf(chairId), 1);
                }

                setItems((_items) => _items.map((_item) => (_item.id === id ? itemExist : _item)));

                if (updatedItemExist) {
                    setUpdatedItems((_items) => _items.map((_item) => (_item.id === id ? itemExist : _item)));
                } else {
                    setUpdatedItems((_items) => [..._items, itemExist]);
                }
            }
        };

        const handleAmount = ({ id, tableNumber }: PickOne<Item, "id">) => {
            const itemExist = items.find((item) => item.id === id);
            const updatedItemExist = updatedItems.find((item) => item.id === id);

            if (itemExist) {
                const updateItem = {
                    ...itemExist,
                    tableNumber: tableNumber || itemExist.tableNumber,
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
            <DraggableContext.Provider
                value={{
                    isDisabled,
                    showTrash,
                    editChairPos,
                    handleAmount,
                    handleSave,
                    items,
                }}
            >
                <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                    {children}
                </DndContext>
            </DraggableContext.Provider>
        );
    }
);
