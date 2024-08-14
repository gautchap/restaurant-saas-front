import { z } from "zod";

export const userIdSchema = z.string().uuid();

export const signMailSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    provider: z.string(),
});

export const userSchema = z.object({
    id: userIdSchema,
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional(),
    customerId: z.string().nullable(),
    priceId: z.string().nullable(),
    plan: z.coerce.number().min(0).max(1),
    provider: z.string(),
});

export const tokenSchema = z.object({
    user: userSchema,
    accessToken: z.string(),
});
