import { cn } from "@/lib/utils";

export function ChairPositionFloor({ num }: { num: number }) {
    const getPosition = () => {
        switch (num) {
            case 1: {
                return "-top-1/2 left-1/2 -translate-x-1/2";
            }
            case 2: {
                return "-left-1/2 top-1/2 -translate-y-1/2 -rotate-90";
            }
            case 3: {
                return "-right-1/2 top-1/2 -translate-y-1/2 rotate-90 ";
            }
            case 4: {
                return "-bottom-1/2 left-1/2 -translate-x-1/2 rotate-180";
            }
            default: {
                return "-top-1/2 left-1/2 -translate-x-1/2";
            }
        }
    };
    return (
        <div
            className={cn(
                "absolute size-5 transform-gpu rounded-b-lg border-2 border-black bg-white transition-shadow group-active:shadow-sm",
                getPosition()
            )}
        >
            <div className="mt-px border border-black" />
        </div>
    );
}
