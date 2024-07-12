import { getUserInfo } from "@/actions/getAuth";

export default async function Page() {
    const user = await getUserInfo();

    return (
        <>
            <div>{user ? <p>user: {JSON.stringify(user)}</p> : null}</div>
        </>
    );
}
