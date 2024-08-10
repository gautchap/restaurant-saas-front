"use client";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";
import { DynamicIcon, Icons } from "@/components/ui/icons";

type SigninButtonProps = {
    isLoading: boolean;
    provider: { id: string; name: string };
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SigninButton({ isLoading, provider, ...props }: SigninButtonProps) {
    return (
        <Button {...props} variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
                <DynamicIcon name={provider.id} className="mr-2 size-4" />
            )}
            {provider.name}
        </Button>
    );
}
