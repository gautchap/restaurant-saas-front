"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { actionClient } from "@/lib/safe-action";
import { tokenSchema, userIdSchema, signMailSchema, userSchema } from "@/types/sessionSchema";
import { fetcher } from "@/utils/fetcher";
import { z } from "zod";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const userExist = actionClient.schema(z.object({ id: userIdSchema })).action(async ({ parsedInput }) => {
    const res = await fetcher(`${process.env.BACKEND_URL}/auth/exist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: parsedInput,
        customConfig: {
            cache: "no-store",
        },
        zodSchema: z.object({ id: userIdSchema }),
    });

    return res;
});

export const getToken = actionClient.schema(signMailSchema).action(async ({ parsedInput }) => {
    const res = await fetcher(`${process.env.BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: parsedInput,
        customConfig: {
            cache: "no-store",
        },
        zodSchema: tokenSchema,
    });

    return res;
});

export const receiveEmail = actionClient.schema(signMailSchema).action(async ({ parsedInput }) => {
    const res = await fetcher(`${process.env.BACKEND_URL}/auth/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: parsedInput,
        customConfig: {
            cache: "no-store",
        },
        zodSchema: tokenSchema,
    });

    return res;
});

export async function getUserInfo(token: string, customResponse?: NextResponse<unknown>) {
    const user = await fetcher(`${process.env.BACKEND_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        customResponse,
        zodSchema: userSchema,
    });

    return user;
}

export const logIn = actionClient.schema(z.string()).action(async ({ parsedInput }) => {
    await signIn(parsedInput);
});

export async function signOutServerSide() {
    const session = await auth();
    if (!session) return redirect("/login");

    fetcher(`${process.env.BACKEND_URL}/auth/signout`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },

        customConfig: {
            cache: "no-store",
        },
    });
    revalidateTag("auth-info");

    await signOut();
}
