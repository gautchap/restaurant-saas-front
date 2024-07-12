import { z } from "zod";

export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional(),
});

export const tokenSchema = z.object({
    user: z.object({
        id: z.coerce.string(),
        name: z.string(),
        email: z.string().email(),
    }),
    accessToken: z.string(),
});
