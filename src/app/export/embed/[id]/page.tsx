import { Booking } from "@/components/booking";

type PageProps = {
    params: {
        id: string;
    };
};

export default function Page({ params }: PageProps) {
    const user = "2";
    if (params.id !== user) {
        return <div>404</div>;
    }
    return <Booking id={params.id} />;
}
