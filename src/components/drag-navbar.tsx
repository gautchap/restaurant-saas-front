import { LockToggle } from "@/components/lock-toggle";
import { DraggableItem } from "@/components/draggable-item";
import { ListItems } from "@/utils/list-items";

type DragNavbarProps = {
    handleSave: () => Promise<void>;
    isDisabled: boolean;
};

export default function DragNavbar({ handleSave, isDisabled }: DragNavbarProps) {
    return (
        <div className="flex h-screen w-32 flex-col border-l border-l-primary/10 bg-secondary py-2 shadow-lg">
            <LockToggle className="mx-auto" onClick={handleSave} isDisabled={isDisabled} />
            <ul>
                {ListItems.map((item) => (
                    <li key={item.id}>
                        <DraggableItem
                            shape={item.shape}
                            id={item.id}
                            isList={true}
                            disabled={isDisabled}
                            label={item.name}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
