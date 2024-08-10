"use client";

import { signOutServerSide } from "@/actions/getAuth";
import { useEffect } from "react";

const SignOut = () => {
    useEffect(() => {
        (async () => {
            await signOutServerSide();
            window.location.href = "/login";
        })();
    }, []);

    return null;
};

export default SignOut;
