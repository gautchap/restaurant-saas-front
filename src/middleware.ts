import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getUserInfo } from "@/actions/getAuth";

export const middleware = auth(async (request) => {
    if (!request.auth && request.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!request.auth && request.nextUrl.pathname === "/login") {
        return NextResponse.next();
    }

    try {
        await getUserInfo(request?.auth?.accessToken || "", NextResponse.redirect(new URL("/signout", request.url)));

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
