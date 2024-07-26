"use client";

import type { SelectSingleEventHandler } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { FormEvent, useState } from "react";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ChevronLeft, CircleX, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postBooking } from "@/actions/booking";
import { ScrollArea } from "@/components/ui/scroll-area";

type BookingProps = {
    id: string;
};

export function Booking({ id }: BookingProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [step, setStep] = useState(1);
    const [hour, setHour] = useState<string | null>(null);
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const hours = [
        { hour: "11:00", available: true },
        { hour: "12:00", available: true },
        { hour: "13:00", available: false },
        { hour: "14:00", available: true },
        { hour: "19:00", available: true },
        { hour: "20:00", available: true },
        { hour: "21:00", available: true },
    ];

    const handleSelect: SelectSingleEventHandler = (_date) => {
        setStep((_step) => _step + 1);
        if (!_date) return;
        setDate(_date);
    };

    const handleHour = (_hour: string) => {
        setStep((_step) => _step + 1);
        setHour(_hour);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setDone(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const _date = date;

        _date?.setHours(Number(hour?.split(":")[0] as string));
        _date?.setMinutes(Number(hour?.split(":")[1] as string));

        const newBooking = {
            userId: id,
            date: _date,
            tel: formData.get("tel") || undefined,
            firstName: formData.get("firstName") || undefined,
            lastName: formData.get("lastName"),
            email: formData.get("email") || undefined,
            persons: Number(formData.get("persons")),
            message: formData.get("message") || undefined,
        };

        const booking = await postBooking(newBooking);

        setLoading(false);

        if (!booking?.data) return setError(true);

        if (booking?.data) return setSuccess(true);
    };

    return (
        <>
            <div className="relative size-80">
                <div className={`transform-gpu overflow-hidden transition-all ${done ? "blur-sm" : null}`}>
                    <Button
                        variant="ghost"
                        className="flex"
                        onClick={() => setStep((_step) => (_step > 1 ? _step - 1 : _step))}
                    >
                        <ChevronLeft size={16} strokeWidth={2.25} /> <p>Retour</p>
                    </Button>
                    <form onSubmit={handleSubmit} className="relative flex h-72 w-80 justify-center rounded-md border">
                        <Calendar
                            mode="single"
                            disabled={[
                                { before: new Date() },
                                {
                                    dayOfWeek: [0],
                                },
                            ]}
                            locale={fr}
                            selected={date}
                            onSelect={handleSelect}
                            className={`absolute w-80 transform-gpu p-5 pb-6 transition-transform duration-300 ${step > 1 ? "-translate-x-80" : "-translate-x-0"}`}
                        />
                        <div
                            className={`absolute flex h-full w-80 transform-gpu flex-col p-3 transition-transform duration-300 ${step === 1 && "translate-x-80"} ${step === 2 && "translate-x-0"} ${step === 3 && "-translate-x-80"}`}
                        >
                            <ScrollArea className="h-72">
                                {hours.map((time) => (
                                    <Button
                                        disabled={!time.available}
                                        type="button"
                                        key={time.hour}
                                        className="mx-auto my-1 w-full"
                                        name="time"
                                        onClick={() => handleHour(time.hour)}
                                        variant="secondary"
                                    >
                                        {time.hour}
                                    </Button>
                                ))}
                            </ScrollArea>
                        </div>
                        <div
                            className={`absolute h-full w-80 transform-gpu space-y-3 p-3 transition-transform duration-300 ${step < 3 ? "translate-x-80" : "-translate-x-0"}`}
                        >
                            <div className="flex justify-between gap-2">
                                <Input className="p-2.5" type="mail" name="email" placeholder="test@test.fr" required />
                                <Input
                                    min="1"
                                    max="8"
                                    className="w-1/4"
                                    type="number"
                                    name="persons"
                                    placeholder="1"
                                    defaultValue="1"
                                    required
                                />
                            </div>
                            <Input type="text" name="lastName" placeholder="Dupont" required />
                            <Input
                                className="absolute size-1 -translate-y-96"
                                type="text"
                                name="firstName"
                                placeholder="Jean"
                            />

                            <Input
                                className="absolute size-1 -translate-y-96"
                                type="tel"
                                name="tel"
                                pattern="[0-9]{10}"
                                placeholder="0787053501"
                            />
                            <Textarea
                                name="message"
                                autoCorrect="on"
                                className="resize-none"
                                placeholder="Si vous voulez nous transmettre un message..."
                                rows={5}
                            />
                            <Button type="submit" className="mx-auto my-3" variant="secondary">
                                Réserver
                            </Button>
                        </div>
                    </form>
                </div>

                <>
                    <div
                        className={`absolute left-1/2 top-1/2 transform-gpu ${done ? "z-10" : "-z-10"} size-full -translate-x-1/2 -translate-y-1/2`}
                    ></div>
                    <div
                        className={`absolute left-1/2 top-1/2 transform-gpu ${done ? "z-20 opacity-100" : "-z-10 opacity-0"} h-20 w-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300`}
                    >
                        {loading ? <LoaderCircle className="mx-auto animate-spin" size={50} /> : null}
                        {error ? (
                            <div className="flex flex-col items-center duration-700 animate-in fade-in">
                                <CircleX className="mx-auto" size={50} />
                                <p className="text-center text-sm">Une erreur est survenue</p>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setError(false);
                                        setDone(false);
                                    }}
                                >
                                    réessayer
                                </Button>
                            </div>
                        ) : null}
                        {success ? (
                            <div className="duration-700 animate-in fade-in">
                                <CalendarCheck className="mx-auto" size={50} />
                                <p className="text-center text-sm">Votre réservation a bien été prise en compte</p>
                            </div>
                        ) : null}
                    </div>
                </>
            </div>
        </>
    );
}
