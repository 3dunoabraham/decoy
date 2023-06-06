"use client";
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { FaAccessibleIcon, FaAddressBook, FaAdversal, FaChartBar, FaEnvelope, FaListAlt, FaMoneyBillAlt, FaStackExchange, FaStar, FaUser } from "react-icons/fa"


function LandingInfo({uid, sessiondata, calls}:any) {
    return (
        <div className="flex-row Q_xs_flex-col my-4 gap-2 mt-8">
            {!uid && !!sessiondata && <div className='flex-col gap-2'>
                <div className='Q_xs pt-150'></div>
                <button   className={`px-3 py-2 clickble nowrap   tx-lg opaci-chov--75 ${!sessiondata ? "" : "tx-white"}`}
                    style={{background:!sessiondata ? "#F7C127" : "orangered"}}
                    onClick={()=>{ calls.registerWithRandom() }}
                >
                    + Create Simulation Account
                </button>
                <div className='Q_xs pt-150'></div>
                <button   className={`px-3 py-2 clickble nowrap   tx-lg opaci-chov--75 ${!sessiondata ? "" : "tx-white"}`}
                    style={{background:"orange"}}
                    onClick={()=>{ calls.loginToAccount() }}
                >
                    ↑ Connect Account
                </button>
            </div>}
            
            {!sessiondata &&
                <div className='flex-col'>
                    <div className='Q_xs py-100'></div>
                    <div className='Q_sm_md pt-100 pb-8'></div>
                    {<>
                        <div className='flex-col tx-center tx-sm'>Connect w/Google to create your new Account!</div>
                    </>}
                    <button   className="px-3 py-2 clickble nowrap tx-lg tx-white opaci-chov--75"
                        style={{background:"orangered"}}
                        onClick={()=>{ calls.signInGoogle() }}
                    >
                        Connect w/Google
                    </button>
                </div>
            }
            
            <div className='flex-1'></div>
        </div>
    )
}


export default LandingInfo