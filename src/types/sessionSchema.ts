import { z } from "zod";

export const userIdSchema = z.string().uuid();

export const userSchema = z.object({
    id: userIdSchema,
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional(),
});

export const tokenSchema = z.object({
    user: userSchema,
    accessToken: z.string(),
});
