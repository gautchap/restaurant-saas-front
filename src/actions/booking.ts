"use server";

import { auth } from "@/lib/auth";
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

export async function getBookings() {
    const session = await auth();
    if (!session) return;

    const res = await fetcher(`${process.env.BACKEND_URL}/bookings/get?userId=${session.user.id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.accessToken}` },
        customConfig: {
            next: { tags: ["bookings"] },
        },
        zodSchema: bookingSchema.array(),
    });

    return res;
}
