"use client";
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { FaAccessibleIcon, FaAddressBook, FaAdversal, FaChartBar, FaEnvelope, FaListAlt, FaMoneyBillAlt, FaStackExchange, FaStar, FaUser } from "react-icons/fa"


function LandingInfo({}:any) {
    return (
        <div className='w-100 flex-col pt- pb-100' style={{background:"#46B7FA"}}>
            <div className='tx-white tx-center py-8 '>
                <Link href="https://twitter.com/webgame">
                    <h1 className='tx-bold-2 opaci-50 tx-ls-5 tx-lg pt-4 '
                        style={{color:"orangered"}}
                    >
                        Web Gamed
                    </h1>
                </Link>
                <h1 className=' tx-bold '
                    
                >
                    <span className=" Q_xs " style={{fontSize:"2.1em !important"}}>Byte City</span>
                    <span className=" Q_sm_x" style={{fontSize:"3.5em !important"}}>Byte City</span>
                </h1>
            </div>
            <div className='py-5 invisible  block Q_xs'>q</div>
            <Link 
                className='pos-abs top-0 mt-250 py-2 opaci-chov--75 block pb-8 flex-col bg-glass-4 bg-b-10 px-1 pt-2  bord-r-25'
                style={{boxShadow:"0 4px 3px #00000022"}}
                href='https://bytc.vercel.app'
            >
                <Image src="/main2.png" alt="bank" width={244} height={255} className='mt-8' />
                <h1 className='tx-xl tx-shadow-2' style={{color:"orangered"}}>Play Now!</h1>
            </Link>
        </div>
    )
}


export default LandingInfo