"use server";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { bookingSchema } from "@/types/bookingSchema";
import { fetcher } from "@/utils/fetcher";

export async function getBookings() {
    const session = await auth();
    if (!session) return;

    const res = await fetcher(`${process.env.BACKEND_URL}/bookings/get?userId=${session.user.id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${session?.accessToken}` },
        customConfig: {
            next: { tags: ["bookings"] },
            cache: "force-cache",
        },
        zodSchema: bookingSchema.array(),
    });

    return res;
}

export const postBookingPublic = actionClient.schema(bookingSchema).action(async ({ parsedInput }) => {
    const res = await fetcher(`${process.env.BACKEND_URL}/bookings/create/public`, {
        method: "POST",
        data: { booking: parsedInput },
        zodSchema: bookingSchema,
        revalidate: "bookings",
    });

    return res;
});

export const postBookingPrivate = actionClient.schema(bookingSchema).action(async ({ parsedInput }) => {
    const session = await auth();
    if (!session) return;

    const res = await fetcher(`${process.env.BACKEND_URL}/bookings/create/private`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session?.accessToken}` },
        data: { booking: parsedInput },
        zodSchema: bookingSchema,
        revalidate: "bookings",
    });

    return res;
});
