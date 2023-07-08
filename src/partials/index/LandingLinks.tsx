"use client";
import Link from "next/link"
import { FaBookOpen, FaChartBar, FaEnvelope, FaListAlt, FaStar, FaTwitter, FaUser, FaUserCircle } from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"


function LandingLinks({sessiondata}:any) {
    return (
        <div className='flex-wrap w-100 gap-2 '>
            <Link href={"/trade/history?pair=BTCUSDT"}   style={{background:"linear-gradient(45deg, #69FD95, #08E3F8)"}}
                className={`px-3 py-2 flex-col bord-r-25 box-shadow-i-2 clickble over-3 nowrap tx-lg opaci-chov--75
                    ${!sessiondata ? "" : "tx-white"}
                `}
                
                
            >
                <div className="opaci-50"><FaListAlt /></div>
                <div className='tx-shadow-5 tx-altfont-4'>Logs</div>
            </Link>
            <Link href={"https://twitter.com/bytecty"}   style={{background:"linear-gradient(45deg, #76ECF3, #5156E5)"}}
                className={`px-3 py-2 flex-col bord-r-25 box-shadow-2-b over-4 clickble nowrap tx-lg 
                    opaci-chov--75 ${!sessiondata ? "" : "tx-white"}
                `}                
            >
                <div className="opaci-50"><FaTwitter /></div>
                <div className='tx-shadow-5 tx-altfont-4'>Twitter</div>
            </Link>
            <Link href={"https://bytc.vercel.app/"}    style={{background:"linear-gradient(-45deg, #FFA4B5, #202ACE)"}}
                className={`px-3 py-2 flex-col bord-r-25 box-shadow-5-b clickble over-2 nowrap tx-lg
                    opaci-chov--75 ${!sessiondata ? "" : "tx-white"}
                `}
            >
                {/* <div><BsBank2 /></div> */}
                {/* <div>🏦</div> */}
                <div className=' tx-xl tx-shadow-5 tx-altfont-4'>Play</div>
            </Link>
            <Link href={"/profile"}      style={{background:"linear-gradient(-45deg, #F5D042, #FE59DA)"}}
                className={`px-3 py-2 flex-col bord-r-25 box-shadow-2-b over-4 clickble nowrap tx-lg 
                    opaci-chov--75 ${!sessiondata ? "" : "tx-white"}
                `}                
            >
                <div className="opaci-50"><FaUserCircle /></div>
                <div className='tx-shadow-5 tx-altfont-4'>Profile</div>
            </Link>
            <Link href={"https://webpov.gitbook.io/bytecity"} style={{background:"linear-gradient(45deg, #FEE882, #F9772B)"}}
                className={`px-3 py-2 flex-col bord-r-25 clickble nowrap tx-lg opaci-chov--75 box-shadow-i-2 
                    ${!sessiondata ? "" : "tx-white"}
                `}
            >
                <div className="opaci-50"><FaBookOpen /></div>
                <div className='tx-shadow-5 tx-altfont-4'>Docs</div>
            </Link>
        </div>
    )
}


export default LandingLinks