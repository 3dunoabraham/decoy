import { getServerSession } from "next-auth/next";
import UserInformation from "@/src/items/molecules/auth/UserInformation";


export default async function AppServerDesc() {
    const session = await getServerSession();
    return (<>
        <div>
            <div>This is the application description component (server component).</div>
            <UserInformation data={session.user} />
        </div>
    </>);
}