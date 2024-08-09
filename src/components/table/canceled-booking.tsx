"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import useQueryParameters from "@/hooks/use-query-parameters";

export default function CanceledBooking({ children }: { children: ReactNode }) {
    const { canceled, handleSort } = useQueryParameters();
    const [showCanceled, setShowCanceled] = useState(canceled === "true");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setShowCanceled(() => event.target.checked);
        handleSort({ _canceled: event.target.checked ? "true" : "false" });
    };

    return (
        <Button variant="outline" className="cursor-auto">
            <input id="canceled" type="checkbox" className="mr-2" onChange={handleChange} checked={showCanceled} />
            <label htmlFor="canceled">{children}</label>
        </Button>
    );
}
