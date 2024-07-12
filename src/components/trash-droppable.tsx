import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
    id: string;
};

export function TrashDroppable({ id }: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`animate-in fade-in my-4 mx-auto w-72 h-20 border border-dashed border-black rounded flex justify-center items-center text-lg transition-all ${
                isOver && "opacity-80 bg-slate-100"
            }`}
        >
            Trash
        </div>
    );
}
