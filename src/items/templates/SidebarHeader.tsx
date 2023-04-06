import { AppContext } from "@/scripts/contexts/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";


export default function Component({}) {
    const app = useContext(AppContext)

    const router = useRouter();
    const handleClick = async (newUrl) => {
      // Wait for route change before do anything
      await router.push(newUrl);
      // Reload after routing
      router.reload();
    } 
    
    return (<>
    <div className='flex px-4'>
        <Link href={"/"} className='tx-white tx-lgx nodeco py-4' >
            {/* <div className='Q_xs_lg px-2'>{app.institution.title}</div> */}
            <div className='Q_lg_x'>Filters</div>
            {/* <div className='Q_lg_x'>{app.institution.title}</div> */}
        </Link>
        {/* <button onClick={()=>{handleClick("/")}} className='tx-white tx-lgx nodeco py-4' >
            <div className='Q_xs_lg px-2'>BitCity</div>
            <div className='Q_lg_x'>Inventory</div>
        </button> */}
    </div>
    </>)
}