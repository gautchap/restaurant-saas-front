"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const getLocalStorageData = (): T => {
        const storedData = typeof window === "undefined" ? null : localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : initialValue;
    };

    const [data, setData] = useState<T>(() => getLocalStorageData());

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [key, data]);

    return [data, setData];
}
