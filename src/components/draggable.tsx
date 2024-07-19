"use client";

import type { CSSProperties } from "react";
import type { Item } from "@/types/itemSchema";
import type { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import { forwardRef, memo } from "react";

interface Props {
    dragging?: boolean;
    label?: string;
    listeners?: DraggableSyntheticListeners;
    style?: CSSProperties;
    transform?: Transform | null;
    disabled: boolean;
    shape: Item["shape"];
    id: UniqueIdentifier;
    isList?: boolean;
    tableNumber?: number;
    chairAmount?: number;
}

export const Draggable = memo(
    forwardRef<HTMLButtonElement, Props>(function Draggable(
        { dragging, listeners, transform, style, disabled, isList, tableNumber, chairAmount, id, ...props },
        ref
    ) {
        return (
            <div
                className={`${isList ? "relative" : "absolute"} ${
                    dragging ? "z-10" : "z-auto"
                } flex flex-col items-center justify-center transition-transform ease-in-out`}
                style={
                    {
                        ...style,
                        "--translate-x": `${transform?.x ?? 0}px`,
                        "--translate-y": `${transform?.y ?? 0}px`,
                    } as CSSProperties
                }
            >
                <button
                    className={`flex size-24 shrink translate-x-[--translate-x] translate-y-[--translate-y] scale-100 transform-gpu appearance-none items-center justify-center font-bold text-black subpixel-antialiased  outline-none transition-shadow fill-mode-forwards ${
                        disabled ? "cursor-auto" : "cursor-grab "
                    }  ${dragging && "group animate-[pop_200ms_ease-in-out] cursor-grabbing"}`}
                    id={id as string}
                    {...props}
                    aria-label="Draggable"
                    data-cypress="draggable-item"
                    {...listeners}
                    ref={ref}
                >
                    <div className="pointer-events-none relative">
                        <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform-gpu">
                            {tableNumber}
                        </p>
                        <div className="size-12 rounded border-2 border-black bg-white transition-shadow group-active:shadow-lg" />
                        {Number(chairAmount) >= 1 ? (
                            <div className="absolute -top-1/2 left-1/2 size-5 -translate-x-1/2 transform-gpu rounded-b-lg border-2 border-black bg-white transition-shadow group-active:shadow-lg">
                                <div className="mt-px border border-black" />
                            </div>
                        ) : null}

                        {Number(chairAmount) >= 2 ? (
                            <div className="absolute -left-1/2 top-1/2 size-5 -translate-y-1/2 -rotate-90 transform-gpu rounded-b-lg border-2 border-black bg-white transition-shadow group-active:shadow-lg">
                                <div className="mt-px border border-black" />
                            </div>
                        ) : null}
                        {Number(chairAmount) >= 3 ? (
                            <div className="absolute -right-1/2 top-1/2 size-5 -translate-y-1/2 rotate-90 transform-gpu rounded-b-lg border-2 border-black bg-white transition-shadow group-active:shadow-lg">
                                <div className="mt-px border border-black" />
                            </div>
                        ) : null}
                        {Number(chairAmount) >= 4 ? (
                            <div className="absolute -bottom-1/2 left-1/2 size-5 -translate-x-1/2 rotate-180 transform-gpu rounded-b-lg border-2 border-black bg-white transition-shadow group-active:shadow-lg">
                                <div className="mt-px border border-black" />
                            </div>
                        ) : null}
                    </div>
                </button>
            </div>
        );
    })
);
