"use server";

import { productSchema } from "@/types/productSchema";
import { fetcher } from "@/utils/fetcher";
import { z } from "zod";

export async function getProducts() {
    const products = await fetcher(`${process.env.BACKEND_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        customConfig: {
            next: { tags: ["products"] },
            cache: "force-cache",
        },
        zodSchema: z.array(productSchema),
    });

    return products;
}
