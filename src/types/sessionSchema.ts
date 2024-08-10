import { z } from "zod";

export const userIdSchema = z.string().uuid();
export const signMailSchema = z.object({
    email: z.string().email(),
    name: z.string(),
});

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
