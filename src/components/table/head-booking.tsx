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

type HeadBookingProps = {
    title: string;
    children: ReactNode;
} & ThHTMLAttributes<HTMLTableCellElement>;

export default function HeadBooking({ title, children, ...props }: HeadBookingProps) {
    const { sort, handleSort } = useQueryParameters();
    const [order, setOrder] = useState(sort === title ? false : true);

    const handleClick = (_order: boolean) => {
        setOrder(() => _order);
        handleSort({ _sort: title, _order: _order === false ? "asc" : "desc" });
    };

    return (
        <>
            <DropdownMenu>
                <TableHead {...props}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="-ml-4 flex items-center">
                            <span>{children}</span>
                            {sort === title ? null : <ChevronsUpDown className="ml-2" size={12} strokeWidth={1.5} />}
                            {sort === title && order === false ? (
                                <ArrowUp className="ml-2 text-muted-foreground/70" size={12} />
                            ) : null}
                            {sort === title && order === true ? (
                                <ArrowDown className="ml-2 text-muted-foreground/70" size={12} />
                            ) : null}
                        </Button>
                    </DropdownMenuTrigger>
                </TableHead>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleClick(false)}>
                        <ArrowUp className="mr-2 text-muted-foreground/70" size={16} />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleClick(true)}>
                        <ArrowDown className="mr-2 text-muted-foreground/70" size={16} />
                        Desc
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
