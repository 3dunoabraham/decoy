import { useRouter } from "next/router"
import { HiCubeTransparent } from "react-icons/hi2"
import { useIsClient } from "usehooks-ts"


export default function Component ({}) {
    const router = useRouter()
    const isClient = useIsClient()
    
    return (<>
        <div className=' tx-blue  tx-xl pa-8 opaci-chov--50 z-800 pos-abs right-0  spin-120'
            style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
            onClick={() => {if (isClient && prompt("Reload Game? (yes/no)","yes") == "yes") { router.reload() }}} 
        >
            <HiCubeTransparent />
        </div>
        <div className='tx-white blur-4 z-500 pos-abs top-0 right-0 noclick pa-8 hover-4 spin-60'>
            <div className=' tx-blue tx-xl  opaci-chov--50 '
                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
            >
                <HiCubeTransparent />
            </div>
        </div>
    </>)
}