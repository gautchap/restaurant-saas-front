import type { HTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Info, TriangleAlert } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("", {
    variants: {
        variant: {
            danger: "shadow-sm gap-1 bg-red-500/15 text-red-700 transition-colors hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:hover:dark:bg-red-500/20",
            warning:
                "shadow-sm gap-1 bg-orange-500/15 text-orange-700 transition-colors hover:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:dark:bg-orange-500/20",
            success:
                "shadow-sm gap-1 bg-green-500/15 text-green-700 transition-colors hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:dark:bg-green-500/20",
        },
    },
    defaultVariants: {
        variant: "success",
    },
});

interface BadgeIconProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    children: ReactNode;
}

export default function BadgeIcon({ variant, children }: BadgeIconProps) {
    return (
        <Badge className={cn(badgeVariants({ variant }))}>
            {variant === "success" ? <BadgeCheck strokeWidth={2} size={16} className="text-green-700" /> : null}
            {variant === "warning" ? <Info strokeWidth={2} size={16} className="text-orange-700" /> : null}
            {variant === "danger" ? <TriangleAlert strokeWidth={2} size={16} className="text-red-700" /> : null}

            {children}
        </Badge>
    );
}
