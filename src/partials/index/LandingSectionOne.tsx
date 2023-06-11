import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import Image from "next/image"


export function LandingSectionOne({}) {
    return (
        <>            
            <div className="w-100 flex-col pb-100 pt-8 ">
                <div className="w-100 w-max-500px  bg-white px-3 py-8 bord-r-50 ">
                    <div className="tx-mdl tx-center">
                        <div> Byte City is an innovative </div>
                        <div> 3D Browser platform that </div>
                        <div> merges learning and investing. </div>
                    </div>
                    <div className="flex-center">
                        <hr className="mt-4 opaci-10 w-50" />
                    </div>
                    <small className="pt-4 block   tx-ls-1">With our gamified approach and intuitive interface, we make investing easy and enjoyable for everyone.</small>
                </div>
                
                <h1 className="tx-link opaci-chov--25 pt-8 tx-center flex-wrap ">
                    <Link href="https://bytc.vercel.app">
                        <span className="block tx-bold-2 nowrap">Game URL:</span>
                        <b className="block tx-bold-8">bytc.vercel.app</b>
                    </Link>
                </h1>
            </div>

            <div className="pos-rel my-100" 
                style={{transform:"translateX(-20px)"}}
            >
                <Image src="/ethtower-removebg-preview.png" alt="bank" width={339} height={184} className='pos-abs left-0 bottom-0 ' />
                <div className="pos-abs bottom-0  pl-4">
                    
                    <Link href="https://bytc.vercel.app" className="opaci-chov--75 box-shadow-5-b bord-r-50 block translate-y-50">
                        <div className="px-4   tx-lgx bord-r-50  tx-white box-shadow-i-1-t" 
                            style={{background:"#099DFF"}}
                        >
                            <span>Enter</span> Game
                        </div>
                    </Link>
                </div>
            </div>

            <h2 className=" flex-col flex-justify-start flex-align-end pt-8">
                <span className="opaci-20 ">Get Started (<small>Docs</small>):</span>
                <Link target="_blank" className="pa-2 tx-link hover-4 opaci-chov--50  tx-lx" 
                    href="https://webpov.gitbook.io/gtabtc/documentation/getting-started/how-to-play"
                >
                    {">"} How to Play? 
                </Link>
                <div className="pa-2 opaci-chov--50" style={{color:"orangered"}}>
                    <Link target="_blank" href="https://webpov.gitbook.io/gtabtc/documentation/getting-started/how-to-play"
                        className="px-4"
                    >
                         <small className="opaci-25">Stage </small>1: Profit 💵 <small><FaExternalLinkAlt /></small>
                    </Link>
                </div>
                {/* <div className="pa-2 opaci-10 Q_sm_x ">|</div> */}
                <div className="pa-2 opaci-chov--50" style={{color:"orange"}}>
                    <Link target="_blank" href="https://webpov.gitbook.io/gtabtc/documentation/getting-started/stage-2"
                        className="px-4"
                    >
                         <small className="opaci-25">Stage </small>2: Upgrade 📈 <small><FaExternalLinkAlt /></small>
                    </Link>
                </div>
                {/* <div className="pa-2 opaci-10 Q_sm_x ">|</div> */}
                <div className="pa-2 opaci-chov--50" style={{color:"gold"}}>
                    <Link target="_blank" href="https://webpov.gitbook.io/gtabtc/documentation/getting-started/stage-3"
                        className="px-4"
                    >
                         <small className="opaci-25">Stage </small>3: Sync 🗝️ <small><FaExternalLinkAlt /></small>
                    </Link>
                </div>
            </h2>


            

            <h2 className="mt-100 tx-xxl Q_sm_x">Investing made simple:</h2>
            <h2 className="mt-100 tx-xl Q_xs">Investing made simple:</h2>
            <div className="w-100 mb-100 w-max-600px tx-lg">
                Byte City is the ideal platform for passive investors. Our automated system manages portfolios, minimizes risks, maximizes profits, and offers a user-friendly 3D Browser interface            
            </div>
        </>
    )
}

export default LandingSectionOne