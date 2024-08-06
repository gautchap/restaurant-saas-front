import { z } from "zod";

export const bookingSchema = z.object({
    userId: z.string().uuid(),
    id: z.string().uuid().optional(),
    date: z.coerce.string().datetime({ offset: true }),
    tel: z.string().optional(),
    persons: z.number(),
    firstName: z.string().optional(),
    lastName: z.string(),
    email: z.string().email(),
    message: z.string().optional().nullable(),
});

export type Boonking = z.infer<typeof bookingSchema>;
