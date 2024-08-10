"use client";

import type { FormEvent, HTMLAttributes } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { receiveEmail, logIn } from "@/actions/getAuth";
import { providerMap } from "@/lib/auth";
import SigninButton from "@/components/signin-button";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const providers = providerMap.filter((provider) => provider.id !== "credentials");

    const handleSignIn = async (provider: string) => {
        setIsLoading(true);
        await logIn(provider);
    };

    async function onSubmit(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email");
        await receiveEmail({ email: email as string, name: "user" });

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return email;
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
            {providers.map((provider) => (
                <SigninButton
                    key={provider.id}
                    isLoading={isLoading}
                    provider={provider}
                    onClick={() => handleSignIn(provider.id)}
                />
            ))}
        </div>
    );
}
