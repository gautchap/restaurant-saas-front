"use server";

import { auth } from "@/lib/auth";
import { invoicesSchema } from "@/types/invoiceSchema";
import { fetcher } from "@/utils/fetcher";

export async function getInvoices() {
    const session = await auth();
    const invoices = await fetcher(`${process.env.BACKEND_URL}/invoices`, {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.accessToken}` },
        customConfig: {
            next: { tags: ["invoices"] },
            cache: "force-cache",
        },
        zodSchema: invoicesSchema,
    });

    return invoices;
}
