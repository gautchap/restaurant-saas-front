/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    cacheHandler: process.env.NODE_ENV === "production" ? "./cache-handler.mjs" : undefined,
    cacheMaxMemorySize: process.env.NODE_ENV === "production" ? 0 : 50_000_000,
};

export default nextConfig;
