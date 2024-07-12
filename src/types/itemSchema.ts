import { z } from "zod";

export const itemSchema = z.object({
    id: z.string().uuid(),
    type: z.enum(["table", "chair"]),
    name: z.string(),
    userId: z.number(),
    x: z.number(),
    y: z.number(),
    shape: z.enum(["rectangle", "circle"]),
    new: z.boolean().optional(),
});

export type Item = z.infer<typeof itemSchema>;
