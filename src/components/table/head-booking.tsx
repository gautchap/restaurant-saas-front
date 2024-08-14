"use client";

import { useState, type ReactNode, type ThHTMLAttributes } from "react";
import { TableHead } from "@/components/ui/table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useQueryParameters from "@/hooks/use-query-parameters";
import { cn } from "@/lib/utils";

type HeadBookingProps = {
    title: string;
    children: ReactNode;
} & ThHTMLAttributes<HTMLTableCellElement>;

export default function HeadBooking({ title, children, ...props }: HeadBookingProps) {
    const { sort, order: orderQuery, handleSort } = useQueryParameters();

    const [order, setOrder] = useState<"asc" | "desc">(orderQuery as "asc" | "desc");

    const handleClick = (_order: "asc" | "desc") => {
        setOrder(() => _order);
        handleSort({ _sort: title, _order });
    };

    return (
        <>
            <DropdownMenu>
                <TableHead {...props}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="-ml-4 flex items-center">
                            <span>{children}</span>
                            {sort === title ? null : <ChevronsUpDown className="ml-2" size={12} strokeWidth={1.5} />}
                            {sort === title ? (
                                <ArrowUp
                                    className={cn(
                                        "transition-transform duration-100 ml-2 text-muted-foreground/70",
                                        order === "asc" ? "rotate-0" : "-rotate-180"
                                    )}
                                    size={12}
                                />
                            ) : null}
                        </Button>
                    </DropdownMenuTrigger>
                </TableHead>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleClick("asc")}>
                        <ArrowUp className="mr-2 text-muted-foreground/70" size={16} />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleClick("desc")}>
                        <ArrowDown className="mr-2 text-muted-foreground/70" size={16} />
                        Desc
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
