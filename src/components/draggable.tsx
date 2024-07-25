"use client";

import type { CSSProperties } from "react";
import type { Item } from "@/types/itemSchema";
import type { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import { forwardRef, memo } from "react";
import { ChairPositionFloor } from "@/components/chair-position-floor";

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
    tableNumber: Item["tableNumber"];
    chairPos: Item["chairPos"];
}

export const Draggable = memo(
    forwardRef<HTMLButtonElement, Props>(function Draggable(
        { dragging, listeners, transform, style, disabled, isList, shape, tableNumber, id, chairPos, ...props },
        ref
    ) {
        const horizChairs = Boolean(chairPos.some((pos) => pos === 2 || pos === 3));
        const vertiChairs = Boolean(chairPos.some((pos) => pos === 1 || pos === 4));

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
                    className={`flex ${horizChairs ? "w-24" : "w-12"} ${vertiChairs ? "h-24" : "h-12"}  shrink translate-x-[--translate-x] translate-y-[--translate-y] scale-100 transform-gpu appearance-none items-center justify-center font-bold text-black subpixel-antialiased  outline-none transition-shadow fill-mode-forwards ${
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
                        <div
                            className={`size-12 ${shape === "circle" ? "rounded-full" : null} ${shape === "rectangle" ? "rounded" : null} border-2 border-black bg-white transition-shadow group-active:shadow-2xl`}
                        />
                        {chairPos.map((pos) => (
                            <ChairPositionFloor key={pos} num={pos} />
                        ))}
                    </div>
                </button>
            </div>
        );
    })
);
