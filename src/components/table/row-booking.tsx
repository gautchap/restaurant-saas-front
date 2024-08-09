import type { Booking } from "@/types/bookingSchema";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Check, Ellipsis, LoaderCircle, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { postBookingPrivate } from "@/actions/booking";
import { motion } from "framer-motion";

type RowBookingProps = {
    booking: Booking & { new?: boolean; newLocal?: boolean };
    edit: Dispatch<SetStateAction<Booking[]>>;
    newBooking: Dispatch<SetStateAction<boolean>>;
};

export default function RowBooking({ booking, edit, newBooking }: RowBookingProps) {
    const [isEdit, setIsEdit] = useState(booking.newLocal ?? false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const [editInfos, setEditInfos] = useState({ ...booking, hour: new Date(booking.date).getHours() });

    const handleEdit = async (mode?: Booking["status"]) => {
        setIsLoading(() => true);
        const formEditInfos = {
            ...editInfos,
            date: new Date(new Date(booking.date).setHours(editInfos.hour)).toISOString(),
            status: mode ?? booking.status,
        };
        if (!isUpdated && !mode) {
            setIsEdit(() => false);
            setIsLoading(() => false);
            setIsUpdated(() => false);
            return;
        }

        const update = await postBookingPrivate(formEditInfos);

        if (update?.data) {
            setIsEdit(() => false);
            setIsLoading(() => false);
            setIsUpdated(() => false);
            return;
        }
    };

    return (
        <motion.tr
            layout
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            className={cn(
                "border-b transition-colors relative",
                booking.status === "cancelled"
                    ? "after:pointer-events-none after:absolute after:left-0 after:top-1/2 after:block after:h-px after:w-[80%] after:-translate-y-1/2 after:bg-primary"
                    : `${isEdit ? "after:bg-primary" : null}`,
                booking.new
                    ? "bg-green-400/60 hover:bg-green-400/80 dark:bg-green-700/50 dark:hover:bg-green-700/60"
                    : "hover:bg-muted/50 data-[state=selected]:bg-muted"
            )}
        >
            <TableCell className={cn("w-72 font-medium", isEdit ? "animate-pulse" : null)}>
                {isEdit && !isLoading ? (
                    <input
                        className="w-1/4 border-none bg-transparent outline-none"
                        type="number"
                        name="hour"
                        min={10}
                        max={22}
                        onChange={(e) => {
                            setIsUpdated(() => true);
                            return setEditInfos({ ...editInfos, hour: Number.parseInt(e.target.value) });
                        }}
                        defaultValue={editInfos.hour}
                    />
                ) : (
                    <span>{editInfos.hour}h</span>
                )}
            </TableCell>
            <TableCell className={cn(isEdit ? "animate-pulse" : null)}>
                {booking.assigned ? (
                    <Badge variant="outline">Table 99</Badge>
                ) : (
                    <Badge variant="outline" className="bg-background">
                        <LoaderCircle strokeWidth={4} className="mr-2 size-3 animate-spin  text-muted-foreground/50" />
                        <span className="truncate whitespace-nowrap">En attente</span>
                    </Badge>
                )}
            </TableCell>
            <TableCell className={cn("w-48", isEdit ? "animate-pulse" : null)}>
                {isEdit && !isLoading ? (
                    <input
                        className="w-full border-none bg-transparent outline-none"
                        name="lastName"
                        type="text"
                        onChange={(e) => {
                            setIsUpdated(() => true);
                            return setEditInfos({ ...editInfos, lastName: e.target.value });
                        }}
                        defaultValue={editInfos.lastName}
                    />
                ) : (
                    <span>{editInfos.lastName}</span>
                )}
            </TableCell>
            <TableCell className={cn("w-60", isEdit ? "animate-pulse" : null)}>
                {isEdit && !isLoading ? (
                    <input
                        className="w-1/4 border-none bg-transparent outline-none"
                        type="number"
                        name="persons"
                        min={1}
                        onChange={(e) => {
                            setIsUpdated(() => true);
                            return setEditInfos({ ...editInfos, persons: Number.parseInt(e.target.value) });
                        }}
                        defaultValue={editInfos.persons}
                    />
                ) : (
                    <span>{editInfos.persons}</span>
                )}
            </TableCell>
            <TableCell className={cn("w-64", isEdit ? "animate-pulse" : null)}>
                {isEdit && !isLoading ? (
                    <input
                        className="w-full border-none bg-transparent outline-none"
                        type="email"
                        name="email"
                        onChange={(e) => {
                            setIsUpdated(() => true);
                            return setEditInfos({ ...editInfos, email: e.target.value });
                        }}
                        defaultValue={editInfos.email}
                    />
                ) : (
                    <span>{editInfos.email}</span>
                )}
            </TableCell>
            <TableCell className="sticky right-0 flex min-w-[4.5rem] items-center justify-center bg-background px-0 shadow-[5px_0px_5px_-5px_hsl(var(--border))_inset]">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {isEdit ? null : (
                            <Button className="px-2" variant="ghost">
                                <Ellipsis strokeWidth={1} />
                                <span className="sr-only">Options</span>
                            </Button>
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer p-0">
                            <button
                                className="size-full px-2 py-1.5 text-left transition-all duration-500"
                                onClick={() => setIsEdit(() => true)}
                            >
                                <span>Modifier</span>
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="group cursor-pointer p-0 text-red-500 hover:text-red-600">
                            {booking.status === "cancelled" ? (
                                <button
                                    className="flex size-full items-center justify-between px-2 py-1.5"
                                    onClick={() => handleEdit("confirmed")}
                                >
                                    <span className="text-green-500 group-hover:text-green-600">Conserver</span>
                                    <Check className="text-green-500 group-hover:text-green-600" size={16} />
                                </button>
                            ) : (
                                <button
                                    className="flex size-full items-center justify-between px-2 py-1.5"
                                    onClick={() => handleEdit("cancelled")}
                                >
                                    <span className="text-red-500 group-hover:text-red-600">Annuler</span>
                                    <X className="text-red-500 group-hover:text-red-600" size={16} />
                                </button>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {isEdit ? (
                    <>
                        <Button
                            disabled={isLoading}
                            onClick={() => handleEdit()}
                            className="size-9 px-2 duration-200 animate-in fade-in"
                            variant="ghost"
                        >
                            {isLoading ? (
                                <LoaderCircle
                                    size={12}
                                    strokeWidth={4}
                                    className="animate-spin text-muted-foreground"
                                />
                            ) : (
                                <Check size={12} strokeWidth={4} className="text-green-500" />
                            )}
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={() => {
                                if (booking?.newLocal) {
                                    newBooking(() => false);
                                    edit((bookings) => bookings.filter((b) => b.id !== booking.id));
                                }
                                setEditInfos({
                                    ...booking,
                                    hour: new Date(booking.date).getHours(),
                                });
                                setIsEdit(() => false);
                            }}
                            className="size-9 px-2 duration-200 animate-in fade-in"
                            variant="ghost"
                        >
                            <X size={12} strokeWidth={4} className="text-red-500" />
                        </Button>
                    </>
                ) : null}
            </TableCell>
        </motion.tr>
    );
}
