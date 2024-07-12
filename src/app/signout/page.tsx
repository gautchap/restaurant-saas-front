"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const SignOut = () => {
    useEffect(() => {
        async function signOutAsync() {
            await signOut();
            window.location.href = "/login";
        }
        signOutAsync();
    }, []);

    return null;
};

export default SignOut;
