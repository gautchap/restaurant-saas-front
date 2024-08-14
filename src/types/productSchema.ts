import { z } from "zod";

export const productSchema = z.object({
    link: z.string().trim().min(1).url(),
    priceId: z.string().trim().min(1),
    price: z.number(),
    duration: z.enum(["month", "year"]),
});
