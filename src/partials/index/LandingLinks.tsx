"use client";
import Link from "next/link"
import { FaBookOpen, FaChartBar, FaEnvelope, FaListAlt, FaStar, FaTwitter, FaUser } from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"


function LandingLinks({sessiondata}:any) {
    return (
        <div className='flex-wrap w-100 gap-2 '>
            <Link href={"/trade/history?pair=BTCUSDT"}   
                className={`px-3 py-2 flex-col box-shadow-2-b clickble over-3 nowrap tx-lg opaci-chov--75
                    ${!sessiondata ? "" : "tx-white"}
                `}
                style={{background:"#001420"}} // 001420 | 5BB0D7
                
            >
                <div className="opaci-50"><FaListAlt /></div>
                <div className='tx-shadow-5'>Logs</div>
            </Link>
            <Link href={"https://bytc.vercel.app/"}    style={{background:"orangered"}}
                className={`px-3 py-2 flex-col box-shadow-5-b clickble over-2 nowrap tx-lg
                    opaci-chov--75 ${!sessiondata ? "" : "tx-white"}
                `}
            >
                {/* <div><BsBank2 /></div> */}
                <div>🏦</div>
                <div className='tx-shadow-5'>Enter Game!</div>
            </Link>
            <Link href={"https://webpov.gitbook.io/bytecity"}    style={{background:"orange"}}
                className={`px-3 py-2 flex-col clickble nowrap tx-lg opaci-chov--75 
                    ${!sessiondata ? "" : "tx-white"}
                `}
            >
                <div className="opaci-50"><FaBookOpen /></div>
                <div className='tx-shadow-5'>Docs</div>
            </Link>
            <Link href={"https://twitter.com/bytecty"}   style={{background:"#5BB0D7"}}
                className={`px-3 py-2 flex-col box-shadow-2-b over-4 clickble nowrap tx-lg 
                    opaci-chov--75 ${!sessiondata ? "" : "tx-white"}
                `}                
            >
                <div className="opaci-50"><FaTwitter /></div>
                <div className='tx-shadow-5'>Ask</div>
            </Link>
        </div>
    )
}


export default LandingLinks