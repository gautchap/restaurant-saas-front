import type { PickOne } from "@/types/typeUtils";
import { useDroppable } from "@dnd-kit/core";
import { Item } from "@/types/itemSchema";
import { DraggableItem } from "@/components/draggable-item";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DroppableProps = {
    droppableId: string;
    disabled: boolean;
    items: Item[];
    // eslint-disable-next-line no-unused-vars
    handleAmount: ({ id, tableNumber, chairAmount }: PickOne<Item, "id">) => void;
};

export function Droppable({ droppableId, disabled, items, handleAmount }: DroppableProps) {
    const { setNodeRef } = useDroppable({
        id: droppableId,
    });

    return (
        <div
            ref={setNodeRef}
            className={`mx-8 h-[80dvh] w-[80dvw] border border-black bg-white ${disabled ? "" : " bg-dots-craft bg-[size:40px_40px]"}`}
        >
            <div className="box-border flex w-full justify-start p-5">
                {items.map((item) => (
                    <ContextMenu key={item.id}>
                        <ContextMenuTrigger disabled={disabled}>
                            <DraggableItem
                                tableNumber={item.tableNumber}
                                chairAmount={item.chairAmount}
                                key={item.id}
                                id={item.id}
                                shape={item.shape}
                                disabled={disabled}
                                label={item.name}
                                top={item.y}
                                left={item.x}
                            />
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64 p-4">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Dimensions</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Modifiez les informations de la table
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="tableNumber">N° de table</Label>
                                        <Input
                                            id="tableNumber"
                                            type="number"
                                            min="0"
                                            max="1000"
                                            onChange={(e) =>
                                                handleAmount({
                                                    id: item.id,
                                                    tableNumber:
                                                        Number(e.target.value) >= 1000 ? 1000 : Number(e.target.value),
                                                })
                                            }
                                            value={item.tableNumber}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="chairAmount">Nb. de chaises</Label>
                                        <Input
                                            id="chairAmount"
                                            min="1"
                                            max="4"
                                            onChange={(e) =>
                                                handleAmount({
                                                    id: item.id,
                                                    chairAmount:
                                                        Number(e.target.value) >= 4 ? 4 : Number(e.target.value),
                                                })
                                            }
                                            type="number"
                                            value={item.chairAmount}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ContextMenuContent>
                    </ContextMenu>
                ))}
            </div>
        </div>
    );
}
