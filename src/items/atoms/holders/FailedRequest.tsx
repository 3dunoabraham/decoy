import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';


// ReactFunctionComponent
export default function Component({err=null,preview=null}) {
    const router = useRouter();
    const handleClick = async (newUrl) => {
      // Wait for route change before do anything
      await router.push(newUrl);
      // Reload after routing
      router.reload();
    } 
    
    return (
    <div className="flex-center pos-rel">
        <div className="flex-col">
            {!!err && <div className="pb-3">
                <small>An error has occurred: </small>
                <div>{(!err.message && "error no message")}</div>
            </div>}

            <div className="tx-  ims-tx-primary  pos-abs mb-200 pb-100 tx-bold-6 tx-lgx tx-center w-min-250px ">
                Couldn&apos;t connect to database.
            </div>
            <Image src='/icons/svg/request-error.svg' alt='next' width='200' height='200' className='opaci-25'/>
            <Link href="#" onClick={()=>{window.location.reload()}} className="pos-abs mb-5  tx-lg bord-r-8  box-shadow-5 tx-lgx ims-button-primary box-shadow-1 ">
                <div className="py-1"> Reload </div>
            </Link>
            {!!preview && 
                <button onClick={()=>{handleClick(preview)}} className="pos-abs translate-y-100 opaci-chov--50   tx-lg bord-r-8    opaci-50 bottom-0">
                    <div className="tx-sm py-3"> View Preview </div>
                </button>
            }
        </div>
    </div>
    )
}