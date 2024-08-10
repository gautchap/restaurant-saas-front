"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useQueryParameters from "@/hooks/use-query-parameters";
import { Checkbox } from "@/components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";

export default function CanceledBooking({ children }: { children: ReactNode }) {
    const { canceled, handleSort } = useQueryParameters();
    const [showCanceled, setShowCanceled] = useState<CheckedState>(canceled === "true");

    const handleChange = (event: CheckedState) => {
        setShowCanceled(() => event);
        handleSort({ _canceled: event ? "true" : "false" });
    };

    return (
        <div>
            <Button variant="outline" asChild>
                <div className="cursor-pointer">
                    <Checkbox id="canceled" className="mr-2" onCheckedChange={handleChange} checked={showCanceled} />
                    <label className="cursor-pointer" htmlFor="canceled">
                        {children}
                    </label>
                </div>
            </Button>
        </div>
    );
}
