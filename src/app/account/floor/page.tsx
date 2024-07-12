import dynamic from "next/dynamic";
import { getItems } from "@/actions/items";
import { getUserInfo } from "@/actions/getAuth";

const DraggableContext = dynamic(
    // eslint-disable-next-line github/no-then
    () => import("@/components/draggable-context").then((module_) => module_.DraggableContext),
    {
        ssr: false,
        loading: () => (
            <>
                <div className="mr-8 ml-auto w-[80dvw] h-[80dvh] border border-black" />

                <div className="w-32 h-screen bg-orange-400" />
            </>
        ),
    }
);

export default async function Page() {
    const items = await getItems();
    const session = await getUserInfo();

    return (
        <>
            <DraggableContext defaultItems={items || []} session={session} />
        </>
    );
}
