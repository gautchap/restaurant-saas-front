"use client";

import type { SelectSingleEventHandler } from "react-day-picker";
import { CalendarRange } from "lucide-react";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import useQueryParameters from "@/hooks/use-query-parameters";
import { formatDate } from "@/lib/format-date";

export function DatePicker() {
    const { from, handleSort } = useQueryParameters();
    const [date, setDate] = useState<Date | undefined>(() => (from ? new Date(from) : undefined));

    const handleSelect: SelectSingleEventHandler = (_date) => {
        if (!_date) return;
        const formatedDate = formatDate(_date);
        handleSort({ _from: formatedDate });
        setDate(_date);
    };

    useEffect(() => {
        setDate(() => (from ? new Date(from) : undefined));
    }, [from]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                    <CalendarRange className="mr-2 size-4" />
                    {date ? formatDate(date, "PPP") : <span>Sélectionnez un jour</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus locale={fr} />
            </PopoverContent>
        </Popover>
    );
}
