"use server";

import { actionClient } from "@/lib/safe-action";
import { bookingSchema } from "@/types/bookingSchema";
import { fetcher } from "@/utils/fetcher";

export const postBooking = actionClient.schema(bookingSchema).action(async ({ parsedInput }) => {
    const res = await fetcher(`${process.env.BACKEND_URL}/bookings/create`, {
        method: "POST",
        data: { booking: parsedInput },
        zodSchema: bookingSchema,
    });
    return res;
});
