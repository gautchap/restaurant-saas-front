import { auth } from "@/lib/auth";
import type { Session, User } from "next-auth";
import { redirect } from "next/navigation";

export async function getToken(body: User): Promise<Session> {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    if (res.status !== 200) {
        return redirect("/signout");
    }

    const json = (await res.json()) satisfies Session;

    return json;
}

export async function getUserInfo(): Promise<Session> {
    const session = await auth();
    if (!session) return redirect("/login");

    const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
        next: { tags: ["auth-info"] },
        cache: "force-cache",
    });
    if (res.status === 401) {
        return redirect("/signout");
    }

    return session;
}
