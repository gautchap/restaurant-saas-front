import { z } from "zod";

export const bookingSchema = z.object({
    userId: z.string().uuid(),
    date: z.coerce.date(),
    tel: z.string().optional(),
    persons: z.number(),
    firstName: z.string().optional(),
    lastName: z.string(),
    email: z.string().email(),
    message: z.string().optional(),
});

export type Boonking = z.infer<typeof bookingSchema>;
