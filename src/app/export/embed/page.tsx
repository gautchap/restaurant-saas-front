import { userExist } from "@/actions/getAuth";
import { Booking } from "@/components/booking";

type PageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
    const queryId = (searchParams["id"] ?? "1") as string;

    const id = await userExist({ id: queryId });

    if (!id?.data) return <div>404</div>;

    return <Booking id={id?.data.id} />;
}
