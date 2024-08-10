import z from "zod";

const envSchema = z.object({
    AUTH_GITHUB_ID: z.string().trim().min(1),
    AUTH_GITHUB_SECRET: z.string().trim().min(1),
    AUTH_GOOGLE_ID: z.string().trim().min(1),
    AUTH_GOOGLE_SECRET: z.string().trim().min(1),
    BACKEND_URL: z.string().trim().min(1).url(),
    AUTH_URL: z.string().trim().min(1).url(),
    AUTH_SECRET: z.string().trim().min(1),
    NEXT_PUBLIC_URL: z.string().trim().min(1),
    PORT: z.number().default(3000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const envServer = envSchema.safeParse({
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    BACKEND_URL: process.env.BACKEND_URL,
    AUTH_URL: process.env.AUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
});

if (!envServer.success) {
    throw new Error("There is an error with the server environment variables");
}

export const envServerSchema = envServer.data;
export type EnvSchemaType = z.infer<typeof envSchema>;
