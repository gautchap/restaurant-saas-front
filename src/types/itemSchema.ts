import { z } from "zod";

export const itemSchema = z.object({
    id: z.string().uuid(),
    type: z.string(),
    userId: z.number(),
    x: z.number(),
    y: z.number(),
    new: z.boolean().optional(),
});

export type Item = z.infer<typeof itemSchema>;
