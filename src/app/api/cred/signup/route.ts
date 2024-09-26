"use server";

import { signIn } from "@/lib/auth";
import { tokenSchema } from "@/types/sessionSchema";
import { fetcher } from "@/utils/fetcher";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParameters = request.nextUrl.searchParams;
    const token = searchParameters.get("token");

    const user = await fetcher(`${process.env.BACKEND_URL}/auth/signup-mail?token=${token}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        customConfig: {
            cache: "no-store",
        },
        zodSchema: tokenSchema,
    });

    await signIn("credentials", {
        user: JSON.stringify(user.user),
        accessToken: token,
        redirect: false,
    });
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/account`);
}
