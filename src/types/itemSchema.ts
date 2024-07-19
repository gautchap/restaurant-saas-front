import { z } from "zod";

export const itemSchema = z.object({
    id: z.string().uuid(),
    type: z.enum(["table", "chair"]),
    name: z.string(),
    userId: z.string().uuid(),
    x: z.number(),
    y: z.number(),
    shape: z.enum(["rectangle", "circle", "multi"]),
    new: z.boolean().optional(),
    tableNumber: z.number().optional(),
    chairAmount: z.number().optional(),
});

export type Item = z.infer<typeof itemSchema>;
