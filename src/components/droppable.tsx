import type { PickOne } from "@/types/typeUtils";
import { useDroppable } from "@dnd-kit/core";
import { Item } from "@/types/itemSchema";
import { DraggableItem } from "@/components/draggable-item";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChairPositionMenu } from "@/components/chair-position-menu";

type DroppableProps = {
    droppableId: string;
    disabled: boolean;
    items: Item[];
    // eslint-disable-next-line no-unused-vars
    editChairPos: (id: string, checked: boolean, chairId: number) => void;
    // eslint-disable-next-line no-unused-vars
    handleAmount: ({ id, tableNumber }: PickOne<Item, "id">) => void;
};

const checkboxList = [1, 2, 3, 4];

export function Droppable({ droppableId, disabled, items, handleAmount, editChairPos }: DroppableProps) {
    const { setNodeRef } = useDroppable({
        id: droppableId,
    });

    const handleCkeck = (itemId: string, checked: boolean, checkId: number) => {
        editChairPos(itemId, checked, checkId);
    };

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
                                chairPos={item.chairPos}
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
                                        <Label htmlFor="chairPos">Position des chaises</Label>
                                        <div className="relative h-7 w-8">
                                            {checkboxList.map((_id) => (
                                                <ChairPositionMenu
                                                    key={_id}
                                                    pos={_id}
                                                    itemId={item.id}
                                                    checked={
                                                        item.chairPos ? Boolean(item.chairPos?.includes(_id)) : false
                                                    }
                                                    handleCkeck={handleCkeck}
                                                />
                                            ))}
                                        </div>
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
