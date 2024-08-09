"use client";

import type { FormEvent, HTMLAttributes } from "react";
import type { BuiltInProviderType } from "next-auth/providers";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logIn } from "@/actions/getAuth";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignIn = async (provider: BuiltInProviderType) => {
        setIsLoading(true);
        await logIn(provider);
    };

    async function onSubmit(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.target as HTMLFormElement);
        // console.log(formData.get("email"));

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return formData.get("email");
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            name="email"
                            id="email"
                            placeholder="name@exemple.fr"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
                        Continuer avec cet email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading} onClick={() => handleSignIn("github")}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 size-4" />
                )}
                GitHub
            </Button>
        </div>
    );
}
