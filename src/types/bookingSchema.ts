import { z } from "zod";

export const bookingSchema = z.object({
    userId: z.string().uuid(),
    id: z.string().uuid().default("3e7b25d1-fb5e-4612-b604-ad101f39a5b9"),
    assigned: z.string().uuid().optional().nullable(),
    date: z.coerce.string().datetime({ offset: true }),
    tel: z.string().optional(),
    persons: z.number(),
    firstName: z.string().optional(),
    lastName: z.string(),
    email: z.string().email(),
    message: z.string().optional().nullable(),
    status: z.enum(["confirmed", "cancelled", "completed"]).default("confirmed"),
});

export const bookingSchemaEdit = bookingSchema.omit({ userId: true });

export type Booking = z.infer<typeof bookingSchema>;
