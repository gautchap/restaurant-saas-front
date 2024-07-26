"use server";

import { actionClient } from "@/lib/safe-action";
import { bookingSchema } from "@/types/bookingSchema";
import { fetcher } from "@/utils/fetcher";
import { z } from "zod";

export const postBooking = actionClient.schema(bookingSchema).action(async ({ parsedInput }) => {
    const res = await fetcher(`${process.env.BACKEND_URL}/booking`, {
        method: "POST",
        data: { booking: parsedInput },
        zodSchema: z.object({ booking: bookingSchema }),
    });
    return res;
});
