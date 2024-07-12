"use client";

import type { CSSProperties } from "react";
import type { Item } from "@/types/itemSchema";
import type { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import { forwardRef } from "react";

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
}

export const Draggable = forwardRef<HTMLButtonElement, Props>(function Draggable(
    { dragging, label, listeners, transform, style, disabled, isList, shape, id, ...props },
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
                className={`flex size-14 shrink translate-x-[--translate-x] translate-y-[--translate-y] scale-100 transform-gpu appearance-none items-center justify-center ${shape === "circle" ? "rounded-full" : null} ${shape === "rectangle" ? "w-20" : null} border-2 border-black bg-white font-bold text-black subpixel-antialiased shadow-sky-300 outline-none transition-shadow fill-mode-forwards ${
                    disabled ? "cursor-auto" : "cursor-grab "
                }  ${dragging && "animate-[pop_250ms_ease-in-out] cursor-grabbing shadow-xl"}`}
                id={id as string}
                {...props}
                aria-label="Draggable"
                data-cypress="draggable-item"
                {...listeners}
                ref={ref}
            >
                {label}
            </button>
        </div>
    );
});
