"use client";
import Link from "next/link"
import { FaChartBar, FaEnvelope, FaListAlt, FaStar, FaUser } from "react-icons/fa"


function LandingLinks({sessiondata}:any) {
    return (
        <div className='flex-wrap w-100 gap-2 '>
            <Link href={"/chart/4h?token=btc"}   
                className={`px-3 py-2 flex-col clickble nowrap tx-lg opaci-chov--75
                     ${!sessiondata ? "" : "tx-white"}
                `}
                style={{background:"#001420"}}                
            >
                <div><FaChartBar /></div>
                <div className='tx-shadow-5'>Dashboard</div>
            </Link>
            <Link href={"/trade/history?pair=BTCUSDT"}   
                className={`px-3 py-2 flex-col box-shadow-2-b clickble over-3 nowrap tx-lg opaci-chov--75
                    ${!sessiondata ? "" : "tx-white"}
                `}
                style={{background:"#5BB0D7"}}
                
            >
                <div><FaListAlt /></div>
                <div className='tx-shadow-5'>History</div>
            </Link>
            <Link href={"/"}    style={{background:"orangered"}}
                className={`px-3 py-2 flex-col box-shadow-2-b clickble over-2 nowrap tx-lg
                    opaci-chov--75 ${!sessiondata ? "" : "tx-white"}
                `}
            >
                <div><FaUser /></div>
                <div className='tx-shadow-5'>Profile</div>
            </Link>
            <Link href={"/"}   style={{background:"orange"}}
                className={`px-3 py-2 flex-col box-shadow-2-b over-4 clickble nowrap tx-lg 
                    opaci-chov--75 ${!sessiondata ? "" : "tx-white"}
                `}                
            >
                <div><FaStar /></div>
                <div className='tx-shadow-5'>Ranking</div>
            </Link>
            <Link href={"https://twitter.com/webgamed"}    style={{background:"lightgrey"}}
                className={`px-3 py-2 flex-col clickble nowrap tx-lg opaci-chov--75 
                    ${!sessiondata ? "" : "tx-white"}
                `}
            >
                <div><FaEnvelope /></div>
                <div className='tx-shadow-5'>Support</div>
            </Link>
        </div>
    )
}


export default LandingLinks