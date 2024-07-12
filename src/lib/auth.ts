import { getToken } from "@/actions/getAuth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider === "github") {
                const authInfos = await getToken(user);
                user.id = authInfos.user.id;
                user.accessToken = authInfos.accessToken;

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
