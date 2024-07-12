import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface FetcherConfig<T> {
    data?: unknown;
    zodSchema?: z.ZodSchema<T>;
    method?: "DELETE" | "GET" | "OPTIONS" | "PATCH" | "POST" | "PUT";
    headers?: HeadersInit;
    revalidate?: string;
    customConfig?: RequestInit;
}

export async function fetcher<T>(
    url: string,
    { data, zodSchema, method, headers: customHeaders, revalidate, customConfig }: FetcherConfig<T>
): Promise<T> {
    const config: RequestInit = {
        method: method ?? (data ? "POST" : "GET"),
        body: data ? JSON.stringify(data) : null,
        headers: {
            "Content-Type": data ? "application/json" : "",
            Accept: "application/json",
            ...customHeaders,
        },
        ...customConfig,
    };

    // eslint-disable-next-line github/no-then
    return fetch(url, config).then(async (response) => {
        if (response.status === 401) return redirect("/signout");

        let result = null;

        try {
            result = await response.json();
            revalidate ? revalidateTag(revalidate) : null;
        } catch (error: unknown) {
            // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject
            return Promise.reject(error);
        }

        if (response.ok) {
            return zodSchema && result ? zodSchema.parse(result) : result;
        } else {
            throw result;
        }
    });
}
