import { z } from "zod";

export const transmitSchema = z.object({
    booking: z.string(),
});
