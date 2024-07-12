import type { Session, User } from "next-auth";

export async function getToken(body: User): Promise<Session> {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const json = await res.json();

    return json;
}
