import z from "zod";

const envSchema = z.object({
    AUTH_GITHUB_ID: z.string().trim().min(1),
    AUTH_GITHUB_SECRET: z.string().trim().min(1),
    AUTH_URL: z.string().trim().min(1).url(),
    AUTH_SECRET: z.string().trim().min(1),
    PORT: z.number().default(3000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const envServer = envSchema.safeParse({
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
});

if (!envServer.success) {
    throw new Error("There is an error with the server environment variables");
}

export const envServerSchema = envServer.data;
export type EnvSchemaType = z.infer<typeof envSchema>;
