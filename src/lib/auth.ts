import type { Provider } from "next-auth/providers";
import { getToken } from "@/actions/getAuth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { userSchema } from "@/types/sessionSchema";
import { z } from "zod";

const providers: Provider[] = [
    GitHub,
    Google,
    Credentials({
        credentials: {
            user: {},
            accessToken: {},
        },
        authorize: async (credentials) => {
            let user = null;
            const parsedUserJson = JSON.parse(credentials.user as string);

            const parsedUser = await userSchema.parseAsync(parsedUserJson);

            const parsedToken = await z.string().parseAsync(credentials.accessToken);

            if (!parsedUser || !parsedToken) {
                throw new Error("Invalid credentials.");
            }

            user = {
                ...parsedUser,
                accessToken: parsedToken,
            };

            return user;
        },
    }),
];

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider();
        return { id: providerData.id, name: providerData.name };
    } else {
        return { id: provider.id, name: provider.name };
    }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider) {
                if (account.provider === "credentials") return true;

                const authInfos = await getToken(user);

                if (!authInfos?.data) return false;

                user.id = authInfos.data.user.id;
                user.accessToken = authInfos.data.accessToken;

                return true;
            }
            return false;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            if (token.sub) session.user.id = token.sub;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
    },
});
