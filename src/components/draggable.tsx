"use client";

import type { CSSProperties } from "react";
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
    id: UniqueIdentifier;
    isList?: boolean;
}

export const Draggable = forwardRef<HTMLButtonElement, Props>(function Draggable(
    { dragging, label, listeners, transform, style, disabled, isList, id, ...props },
    ref
) {
    return (
        <div
            className={`${isList ? "relative" : "absolute"} ${
                dragging ? "z-10" : "z-auto"
            } flex items-center flex-col justify-center transition-transform ease-in-out`}
            style={
                {
                    ...style,
                    "--translate-x": `${transform?.x ?? 0}px`,
                    "--translate-y": `${transform?.y ?? 0}px`,
                } as CSSProperties
            }
        >
            <button
                className={`subpixel-antialiased transform-gpu flex items-center justify-center shrink appearance-none outline-none border-2 border-black bg-white rounded-full shadow-sky-300 fill-mode-forwards transition-shadow translate-x-[--translate-x] translate-y-[--translate-y] scale-100 font-bold size-14 ${
                    disabled ? "cursor-auto" : "cursor-grab "
                }  ${dragging && "animate-[pop_250ms_ease-in-out] shadow-xl cursor-grabbing"}`}
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
