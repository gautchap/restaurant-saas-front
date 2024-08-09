import { useRouter, useSearchParams } from "next/navigation";

type QueryParameters = {
    _sort?: string;
    _order?: string;
    _from?: string;
    _canceled?: string;
};

export default function useQueryParameters() {
    const router = useRouter();
    const pathName = useSearchParams();
    let sort = pathName.get("sort");
    let order = pathName.get("order");
    let from = pathName.get("from");
    let canceled = pathName.get("canceled");

    const handleSort = ({ _sort, _order, _from, _canceled }: QueryParameters) => {
        sort = _sort || sort;
        order = _order || order;
        from = _from || from;
        canceled = _canceled || canceled;

        router.push(
            `/account/bookings?${sort ? `sort=${sort}` : ""}${order ? `&order=${order}` : ""}${from ? `&from=${from}` : ""}${canceled ? `&canceled=${canceled}` : ""}`
        );
    };

    return { sort, order, from, canceled, handleSort };
}
