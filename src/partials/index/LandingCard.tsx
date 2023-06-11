"use client";
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { FaAccessibleIcon, FaAddressBook, FaAdversal, FaChartBar, FaEnvelope, FaListAlt, FaMoneyBillAlt, FaStackExchange, FaStar, FaUser } from "react-icons/fa"


function LandingInfo({}:any) {
    return (
        <div className='w-100 flex-col pt- pb-100' style={{background:"linear-gradient(0, #46B7FA, #049BFF)"}}>
            <div className='tx-white tx-center py-8 '>
                <Link href="/">
                    <h1 className='tx-bold-8 opaci-50 tx-ls-5 tx-lgx pt-4 translate-y-50'
                        style={{color:"orangered"}}
                    >
                        Web POV
                    </h1>
                </Link>
                <h1 className=' tx-bold '
                    
                >
                    <span className="block Q_xs " style={{fontSize:"2.1em !important"}}>Byte City</span>
                    <span className="block tx-altfont-5 Q_sm_x" style={{fontSize:"3.5em !important"}}>Byte City</span>
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