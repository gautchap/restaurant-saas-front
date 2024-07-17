"use client";

import type { SelectSingleEventHandler } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { FormEvent, useState } from "react";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { CalendarCheck, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

type BookingProps = {
    id: string;
};
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function Booking({ id }: BookingProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [step, setStep] = useState(1);
    const [hour, setHour] = useState<string | null>(null);
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);
    const hours = ["12:00", "12:30", "13:00"];

    const handleSelect: SelectSingleEventHandler = (_date) => {
        setStep((_step) => _step + 1);
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
            tel: formData.get("tel"),
        };

        await wait(2000);
        setLoading(false);
        return newBooking;
    };

    return (
        <>
            <div className="relative h-80 w-[250px]">
                <div className={`transform-gpu overflow-hidden transition-all ${done ? "blur-sm" : null}`}>
                    <button onClick={() => setStep((_step) => (_step > 1 ? _step - 1 : _step))}>Retour</button>
                    <form onSubmit={handleSubmit} className="relative flex h-72 w-[250px] rounded-md border">
                        <Calendar
                            mode="single"
                            disabled={{ before: new Date() }}
                            locale={fr}
                            selected={date}
                            onSelect={handleSelect}
                            className={`absolute w-[250px] transform-gpu transition-transform duration-300 ${step > 1 ? "-translate-x-64" : "-translate-x-0"}`}
                        />
                        <div
                            className={`absolute flex h-full w-[250px] transform-gpu flex-col transition-transform duration-300 ${step === 1 && "translate-x-64"} ${step === 2 && "translate-x-0"} ${step === 3 && "-translate-x-64"}`}
                        >
                            {hours.map((_hour) => (
                                <Button
                                    type="button"
                                    key={_hour}
                                    className="mx-auto my-3"
                                    name="time"
                                    onClick={() => handleHour(_hour)}
                                    variant="secondary"
                                >
                                    {_hour}
                                </Button>
                            ))}
                        </div>
                        <div
                            className={`absolute h-full w-[250px] transform-gpu transition-transform duration-300 ${step < 3 ? "translate-x-64" : "-translate-x-0"}`}
                        >
                            <Input type="tel" name="tel" required />
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
                        {loading ? (
                            <LoaderCircle className="mx-auto animate-spin" size={50} />
                        ) : (
                            <div className="duration-700 animate-in fade-in">
                                <CalendarCheck className="mx-auto" size={50} />
                                <p className="text-center text-sm">Votre réservation a bien été prise en compte</p>
                            </div>
                        )}
                    </div>
                </>
            </div>
        </>
    );
}
