/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    cacheHandler: process.env.NODE_ENV === "production" ? "./cache-handler.mjs" : undefined,
    cacheMaxMemorySize: 0,
};

export default nextConfig;
