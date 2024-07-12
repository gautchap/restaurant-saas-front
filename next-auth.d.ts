import type { DefaultSession } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        id: string;
        accessToken: string;
        error?: string;
        user: {
            image: string | undefined;
        } & DefaultSession["user"];
    }

    interface Account {
        access_token: string;
    }

    interface User {
        accessToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends NextAuthJWT {
        accessToken: string;
    }
}
