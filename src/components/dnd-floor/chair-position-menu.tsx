import type { CheckedState, CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type ChairPositionProps = {
    pos: number;
    itemId: string;
    // eslint-disable-next-line no-unused-vars
    handleCkeck: (ItemId: string, checked: boolean, checkId: number) => void;
} & CheckboxProps;

export function ChairPositionMenu({ itemId, pos, handleCkeck, ...props }: ChairPositionProps) {
    const getPosition = () => {
        switch (pos) {
            case 1: {
                return "-top-1/2 left-1/2 -translate-x-1/2";
            }
            case 2: {
                return "-left-1/2 top-1/2 -translate-y-1/2";
            }
            case 3: {
                return "-right-1/2 top-1/2 -translate-y-1/2";
            }
            case 4: {
                return "-bottom-1/2 left-1/2 -translate-x-1/2";
            }
            default: {
                return "-top-1/2 left-1/2 -translate-x-1/2";
            }
        }
    };

    return (
        <form>
            <Checkbox
                {...props}
                className={cn("absolute transform-gpu", getPosition())}
                id={`chairPos${pos}`}
                checked={props.checked}
                onCheckedChange={(checked: CheckedState) => handleCkeck(itemId, Boolean(checked), pos)}
            />
        </form>
    );
}
