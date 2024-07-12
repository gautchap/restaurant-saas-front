import type { ButtonHTMLAttributes } from "react";
import { Lock, LockOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type LockToggleProps = {
    isDisabled: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function LockToggle({ isDisabled, ...props }: LockToggleProps) {
    return (
        <Button {...props} title="switch floor lock" variant="ghost" size="icon">
            <Lock className={`size-[1.2rem] transform-gpu transition-all ${isDisabled ? "scale-100" : "scale-0"}`} />
            <LockOpen
                className={`absolute size-[1.2rem] transform-gpu transition-all ${isDisabled ? "scale-0" : "scale-100"}`}
            />
        </Button>
    );
}
