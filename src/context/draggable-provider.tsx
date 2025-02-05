"use client";

import type { PickOne } from "@/types/typeUtils";
import type { ReactNode } from "react";
import type { Session } from "next-auth";
import type { DragEndEvent, DragStartEvent, PointerActivationConstraint } from "@dnd-kit/core";

import { useState, createContext, useContext, memo, useEffect } from "react";
import { DndContext, useSensor, MouseSensor, TouchSensor, KeyboardSensor, useSensors } from "@dnd-kit/core";
import { deleteItems, updateItems } from "@/actions/items";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ListItems } from "@/utils/list-items";
import { Item } from "@/types/itemSchema";
import { v4 as uuidv4 } from "uuid";

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

const handleResize = (_window: Window & typeof globalThis) => {
    if (_window.innerWidth < 1280) {
        return { width: 1280 * 0.8, height: 950 * 0.8 };
    }
    return { width: 1920 * 0.8, height: 950 * 0.8 };
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

        const [size, setSize] = useState(handleResize(window));

        const mouseSensor = useSensor(MouseSensor, {
            activationConstraint,
        });
        const touchSensor = useSensor(TouchSensor, {
            activationConstraint,
        });
        const keyboardSensor = useSensor(KeyboardSensor, {});
        const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

        useEffect(() => {
            const _handleResize = () => {
                if (window.innerWidth < 1280) {
                    return setSize({ width: 1280 * 0.8, height: 950 * 0.8 });
                }
                return setSize({ width: 1920 * 0.8, height: 950 * 0.8 });
            };
            window.addEventListener("resize", _handleResize);
            return () => window.removeEventListener("resize", _handleResize);
        }, []);

        const handleDragEnd = async ({ activatorEvent, active, over, delta }: DragEndEvent) => {
            setShowTrash(false);
            if (!over) return;

            const buttonSize = {
                width: (activatorEvent.target as HTMLElement).offsetWidth,
                height: (activatorEvent.target as HTMLElement).offsetHeight,
            };

            let temporaryX = 0;
            let temporaryY = 0;

            if (activatorEvent instanceof MouseEvent) {
                temporaryX = ((activatorEvent.clientX - buttonSize.width / 2 - over.rect.left) / size.width) * 100;
                temporaryY = (((activatorEvent as MouseEvent).clientY - buttonSize.height / 2) / size.height) * 100;
            }
            if (activatorEvent instanceof TouchEvent) {
                temporaryX =
                    ((activatorEvent.changedTouches[0].clientX - buttonSize.width / 2 - over.rect.left) / size.width) *
                    100;
                temporaryY =
                    (((activatorEvent as TouchEvent).changedTouches[0].clientY - buttonSize.height / 2) / size.height) *
                    100;
            }

            const handleAxis = (x: number, deltaX: number, y: number, deltaY: number) => {
                const xpercent = (deltaX / size.width) * 100;
                const ypercent = (deltaY / size.height) * 100;
                let posX = Number((x + xpercent).toFixed(50));
                let posY = Number((y + ypercent).toFixed(50));

                const handleY = (_posY: number) => {
                    if (_posY > ((over.rect.height - buttonSize.height) / size.height) * 100) {
                        _posY = ((over.rect.height - buttonSize.height) / size.height) * 100;
                        return _posY;
                    }
                    if (_posY < over.rect.top) {
                        _posY = over.rect.top;
                        return _posY;
                    }
                    return _posY;
                };

                if (posX + (buttonSize.width / size.width) * 100 > 100) {
                    posX = ((over.rect.width - buttonSize.width) / size.width) * 100;
                    return { x: posX, y: handleY(posY) };
                }
                if (posX < 0) {
                    posX = 0;
                    return { x: posX, y: handleY(posY) };
                }

                for (const item of items) {
                    const horizChairs = Boolean(item.chairPos.some((pos) => pos === 2 || pos === 3));
                    const vertiChairs = Boolean(item.chairPos.some((pos) => pos === 1 || pos === 4));
                    const width = horizChairs ? (96 / size.width) * 100 : (48 / size.width) * 100;
                    const height = vertiChairs ? (96 / size.height) * 100 : (48 / size.height) * 100;

                    if (
                        item.id !== active.id &&
                        posX + (buttonSize.width / size.width) * 100 > item.x &&
                        posX < item.x + width &&
                        posY + (buttonSize.height / size.height) * 100 > item.y &&
                        posY < item.y + height
                    ) {
                        posX = x;
                        posY = y;
                    }
                }

                return { x: posX, y: handleY(posY) };
            };

            if (Boolean(ListItems.some((item) => item.id === active.id)) && over.id === "drop") {
                const ListItem = ListItems.find((item) => item.id === active.id);

                const newItem = {
                    id: uuidv4(),
                    userId: session.user.id as string,
                    type: ListItem?.type as Item["type"],
                    name: ListItem?.name as string,
                    x: handleAxis(temporaryX, delta.x, temporaryY, delta.y).x,
                    y: handleAxis(temporaryX, delta.x, temporaryY, delta.y).y,
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
