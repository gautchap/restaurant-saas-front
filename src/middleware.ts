import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const middleware = auth(async (request) => {
    if (!request.auth && request.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!request.auth && request.nextUrl.pathname === "/login") {
        return NextResponse.next();
    }

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${request.auth?.accessToken}`,
            },
            cache: "no-store",
        });

        if (res.status === 401) {
            return NextResponse.redirect(new URL("/signout", request.url));
        }

        if (request.auth && request.nextUrl.pathname === "/login") {
            return NextResponse.redirect(new URL("/account", request.url));
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/signout", request.url));
    }
});

export const config = {
    matcher: ["/login", "/account/:path*"],
};
