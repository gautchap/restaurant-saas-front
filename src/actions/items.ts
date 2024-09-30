"use server";

import { auth } from "@/lib/auth";
import { itemSchema } from "@/types/itemSchema";
import { fetcher } from "@/utils/fetcher";
import { actionClient } from "@/lib/safe-action";
import { revalidateTag } from "next/cache";

export async function getItems() {
    const session = await auth();
    if (!session) return;

    const res = await fetcher(`${process.env.BACKEND_URL}/items/get?userId=${session.user.id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.accessToken}` },
        customConfig: {
            next: { tags: ["items"] },
            cache: "force-cache",
        },
        zodSchema: itemSchema.array(),
    });
    return res;
}

export const updateItems = actionClient.schema(itemSchema.array()).action(async ({ parsedInput }) => {
    const session = await auth();
    if (!session) return;

    const res = await fetcher(`${process.env.BACKEND_URL}/items/update`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${session?.accessToken}` },
        data: { items: parsedInput },
    });
    revalidateTag("items");
    return res;
});

export const deleteItems = actionClient.schema(itemSchema.array()).action(async ({ parsedInput }) => {
    const session = await auth();
    if (!session) return;

    const res = await fetcher(`${process.env.BACKEND_URL}/items/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.accessToken}` },
        data: { items: parsedInput },
    });
    revalidateTag("items");
    return res;
});
