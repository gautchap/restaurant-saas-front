"use client";

import type { ButtonHTMLAttributes } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

export const ThemeToggle = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ ...props }, ref) => {
        const { theme, setTheme } = useTheme();

        return (
            <Button
                {...props}
                ref={ref}
                title="switch theme white"
                onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
                variant="ghost"
                size="icon"
            >
                <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
        );
    }
);
