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
            className={`mx-auto my-4 flex h-20 w-72 items-center justify-center rounded border border-dashed border-black text-lg transition-all animate-in fade-in ${
                isOver && "bg-slate-100 opacity-80"
            }`}
        >
            Trash
        </div>
    );
}
