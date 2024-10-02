"use client";

import HeadBooking from "@/components/table/head-booking";
import RowBooking from "@/components/table/row-booking";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Booking, bookingSchema } from "@/types/bookingSchema";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Transmit } from "@adonisjs/transmit-client";
import { transmitSchema } from "@/types/transmitSchema";
import { v4 as uuidv4 } from "uuid";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();
// const { NODE_ENV } = publicRuntimeConfig;

type TableContentProps = {
    searchParams: {
        sort?: string;
        order?: "asc" | "desc";
        from?: Date;
        canceled?: string;
    };
    from: string | null;
    bookings: (Booking & { newLocal?: boolean })[];
    userId: string;
};

export default function TableContent({ searchParams, from, bookings, userId }: TableContentProps) {
    const [temporaryBookings, setTemporaryBookings] = useState(bookings);

    const totalPersons = temporaryBookings.reduce(function (accumulator, booking) {
        if (booking.status === "cancelled") return accumulator;
        return accumulator + booking.persons;
    }, 0);

    const totalBookings = temporaryBookings.filter((booking) => booking.status !== "cancelled").length;

    const [isNew, setIsNew] = useState(false);

    const handleNew = () => {
        setIsNew(() => true);

        let newDate = new Date().toString();
        if (searchParams.from && from) {
            const _from = new Date(from);
            const thisHour = new Date().getHours();
            _from.setHours(thisHour);
            newDate = _from.toString();
        }

        setTemporaryBookings([
            {
                userId,
                id: "3e7b25d1-fb5e-4612-b604-ad101f39a5b9",
                date: newDate,
                lastName: "",
                persons: 1,
                email: "",
                status: "confirmed",
                newLocal: true,
            },
            ...temporaryBookings,
        ]);
    };

    useEffect(() => {
        if (JSON.stringify(bookings) !== JSON.stringify(temporaryBookings)) setTemporaryBookings(() => bookings);
        if (isNew) setIsNew(() => false);
    }, [bookings]);

    useEffect(() => {
        const transmit = new Transmit({
            baseUrl: `${window.location.protocol}//${window.location.hostname}:3333`,
            uidGenerator: () => uuidv4(),
        });

        async function runEvent() {
            const newBookingSub = transmit.subscription(`user/${userId}/bookings`);
            const updateBookingSub = transmit.subscription(`user/${userId}/bookings/update`);
            await Promise.all([newBookingSub.create(), updateBookingSub.create()]);

            newBookingSub.onMessage((data) => {
                const streamBooking = transmitSchema.parse(data);
                const booking = bookingSchema.parse(JSON.parse(streamBooking.booking));

                toast.success("Nouvelle réservation", {
                    description: `${new Date(booking.date).toLocaleDateString("fr-FR")} à ${new Date(booking.date).getHours()}h`,
                });

                const newBooking = {
                    ...booking,
                    new: true,
                };

                if (from === new Date(booking.date).toLocaleDateString("fr-FR") || !from) {
                    return setTemporaryBookings((_bookings) => [newBooking, ..._bookings]);
                }
            });

            updateBookingSub.onMessage((data) => {
                const streamBooking = transmitSchema.parse(data);
                const booking = bookingSchema.parse(JSON.parse(streamBooking.booking));

                if (from === new Date(booking.date).toLocaleDateString("fr-FR") || !from) {
                    return setTemporaryBookings((_bookings) => {
                        const _booking = _bookings.find((b) => b.id === booking.id);
                        if (booking.status !== "cancelled" && !_booking) return [..._bookings, booking];
                        if (
                            (searchParams.canceled === "false" || !searchParams.canceled) &&
                            booking.status === "cancelled" &&
                            _booking
                        )
                            return _bookings.filter((b) => b.id !== _booking.id);
                        return _bookings.map((b) => (b.id === booking.id ? booking : b));
                    });
                }
            });
        }

        transmit.on("connected", runEvent);
        transmit.on("disconnected", () => transmit.close());

        return () => {
            transmit.close();
        };
    }, [from, searchParams.canceled]);

    return (
        <motion.div className="max-h-[82dvh] overflow-y-auto rounded-md border border-muted-foreground/20 md:max-h-[88dvh]">
            <Table>
                <TableCaption>
                    {bookings.length === 0 ? (
                        <span>Aucune réservation {searchParams.from ? `pour le ${from}` : ""}</span>
                    ) : (
                        <span>Liste des réservations {searchParams.from ? `au ${from}` : ""}</span>
                    )}
                </TableCaption>
                <TableHeader>
                    <TableRow className="group">
                        <HeadBooking title="hour">Heure de réservation</HeadBooking>
                        <HeadBooking title="assigned">Attribué</HeadBooking>
                        <HeadBooking title="name">Nom</HeadBooking>
                        <HeadBooking title="persons">Nb. de couverts</HeadBooking>
                        <HeadBooking title="contact">Contact</HeadBooking>
                        <TableHead className="sticky right-0 flex min-w-[4.5rem] items-center justify-center bg-background px-0 shadow-[5px_0px_5px_-5px_hsl(var(--border))_inset]">
                            {isNew ? null : (
                                <Button className="px-2" variant="ghost" onClick={handleNew}>
                                    <Plus strokeWidth={1} />
                                    <span className="sr-only">Ajouter</span>
                                </Button>
                            )}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {temporaryBookings.map((booking) => (
                        <RowBooking
                            newBooking={setIsNew}
                            edit={setTemporaryBookings}
                            key={booking.id}
                            booking={booking}
                        />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>
                            <span className="transform-view">Total</span>
                        </TableCell>
                        <TableCell className="text-right">
                            <b>{totalPersons}</b> couvert{totalPersons > 1 ? "s" : ""}
                        </TableCell>
                        <TableCell className="text-right">
                            <b>{totalBookings}</b> réservation{totalBookings > 1 ? "s" : ""}
                        </TableCell>
                        <TableCell />
                    </TableRow>
                </TableFooter>
            </Table>
        </motion.div>
    );
}
