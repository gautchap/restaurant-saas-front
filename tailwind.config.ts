import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                pop: {
                    from: { transform: "translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scale(1)" },
                    to: {
                        transform: "translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scale(1.06)",
                    },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "dots-craft": "radial-gradient(circle, grey 1px, rgba(0, 0, 0, 0) 1px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
