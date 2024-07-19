"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { actionClient } from "@/lib/safe-action";
import { tokenSchema, userSchema, userIdSchema } from "@/types/sessionSchema";
import { fetcher } from "@/utils/fetcher";
import { z } from "zod";

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

export const getToken = actionClient.schema(userSchema).action(async ({ parsedInput }) => {
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

export async function getUserInfo() {
    const session = await auth();
    if (!session) return redirect("/login");

    await fetcher(`${process.env.BACKEND_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
        customConfig: {
            next: { tags: ["auth-info"] },
            cache: "force-cache",
        },
    });

    return session;
}
