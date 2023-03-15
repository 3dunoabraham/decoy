import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


export default function Component({}) {
    const [loadingNewPage, s__loadingNewPage] = useState(false)
    const { data: session } = useSession();

    return (
    <div className="flex-col">
        {loadingNewPage && <div className="tx-lg opaci-10 tx-ls-8 mb-8">Loading</div>}
        {/* !!session && */ !loadingNewPage &&
            <div className="flex-wrap ma-8">
            <div className="ims-button-primary" onClick={()=>{s__loadingNewPage(true)}}>
                <Link  className="px-2 py-4 tx-" href="/unit/add">
                    <div className="tx-ls-1 tx-lgx">+ New Unit </div>
                    <p className="mt-1 tx-">Add Unit to Inventory</p>
                </Link>
            </div>
                <Link href="/inventory">
                    <div  className="ims-cardlink" onClick={()=>{s__loadingNewPage(true)}} >
                        <h2 className="">Inventory &uarr;</h2><p className="">Unit List</p>
                    </div>
                </Link>
                <Link href="/inventory?stts=1">
                    <div  className="ims-cardlink" onClick={()=>{s__loadingNewPage(true)}} >
                        <h2 className="">Store &rarr;</h2><p className="">Available Units</p>
                    </div>
                </Link>
            </div>
        }
    </div>
    )
}