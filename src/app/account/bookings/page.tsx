import { getBookings } from "@/actions/booking";
import { getUserInfo } from "@/actions/getAuth";
import CanceledBooking from "@/components/table/canceled-booking";
import { DatePicker } from "@/components/table/date-picker";
import TableContent from "@/components/table/table-content";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/ui/copy-button";
import { Booking } from "@/types/bookingSchema";
import Link from "next/link";

type PageProps = {
    searchParams: {
        sort?: string;
        order?: "asc" | "desc";
        from?: Date;
        canceled?: string;
    };
};

export default async function Page({ searchParams }: PageProps) {
    const user = await getUserInfo();

    const iframeElement = `<iframe id="reservation" title="reservation restaurant" width="320" height="330" scrolling="no" frameBorder="0" src="${process.env.NEXT_PUBLIC_URL}/export/embed?id=${user?.user.id}"></iframe>`;

    const bookings = await getBookings();

    const from = searchParams.from ? new Date(searchParams.from).toLocaleDateString("fr-FR") : null;

    const handleSearch = (_bookings: Booking[]) => {
        if (searchParams.canceled === "false" || !searchParams.canceled) {
            _bookings = _bookings.filter((booking) => booking.status !== "cancelled");
        }

        if (searchParams.from) {
            _bookings = _bookings.filter((booking) => new Date(booking.date).toLocaleDateString("fr-FR") === from);
        }

        if (searchParams.sort === "hour") {
            return _bookings.sort((a: Booking, b: Booking) => {
                if (searchParams?.order === "asc") {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                }

                if (searchParams?.order === "desc") {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                }
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
        }

        if (searchParams.sort === "name") {
            return _bookings.sort((a: Booking, b: Booking) => {
                if (searchParams?.order === "asc") {
                    return a.lastName.localeCompare(b.lastName);
                }
                if (searchParams?.order === "desc") {
                    return b.lastName.localeCompare(a.lastName);
                }
                return a.lastName.localeCompare(b.lastName);
            });
        }

        if (searchParams.sort === "persons") {
            return _bookings.sort((a: Booking, b: Booking) => {
                if (searchParams?.order === "asc") {
                    return a.persons - b.persons;
                }

                if (searchParams?.order === "desc") {
                    return b.persons - a.persons;
                }
                return a.persons - b.persons;
            });
        }

        if (searchParams.sort === "contact") {
            return _bookings.sort((a: Booking, b: Booking) => {
                if (searchParams?.order === "asc") {
                    return a.email.localeCompare(b.email);
                }
                if (searchParams?.order === "desc") {
                    return b.email.localeCompare(a.email);
                }
                return a.email.localeCompare(b.email);
            });
        }

        return _bookings;
    };

    return (
        <section>
            <div className="mb-5 flex max-h-[10dvh] flex-wrap items-center gap-2">
                <DatePicker />
                <Link href="/account/bookings">
                    <Button variant="outline">Reset</Button>
                </Link>
                <CanceledBooking>Annulations</CanceledBooking>
                <CopyButton element={iframeElement}>Copier le code</CopyButton>
            </div>
            <TableContent
                userId={user?.user.id || ""}
                bookings={handleSearch((bookings as Booking[]) || [])}
                searchParams={searchParams}
                from={from}
            />
        </section>
    );
}
