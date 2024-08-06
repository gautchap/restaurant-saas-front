"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

export function ThemeToggle({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            {...props}
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
