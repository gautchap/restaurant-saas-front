import dynamic from "next/dynamic";
import { getItems } from "@/actions/items";
import { getUserInfo } from "@/actions/getAuth";

const DraggableContext = dynamic(
    // eslint-disable-next-line github/no-then
    () => import("@/components/draggable-context").then((module_) => module_.DraggableContext),
    {
        ssr: false,
        loading: () => (
            <div className="flex">
                <div className="mx-8 h-[80dvh] w-[80dvw] border border-black bg-white" />
                <div className="flex h-screen w-32 flex-col border-l border-l-primary/10 bg-secondary py-2 shadow-lg" />
            </div>
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
