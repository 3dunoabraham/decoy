import { ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { getToken } from "next-auth/jwt"

import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import SessionSidebar from "@/src/items/templates/SessionSidebar";
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import ImsCard from '@/src/partials/index/ImsCard'
import { AppContext } from '@/scripts/contexts/AppContext'
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import { signIn, useSession } from 'next-auth/react';
import { parseDecimals } from '@/components/scripts/helpers';
import { useIsClient, useLocalStorage } from 'usehooks-ts';
import AmountCards from '@/components/dashboard/AmountCards';
import { DEFAULT_TOKENS_ARRAY } from '@/components/scripts/constants';
import { fetchPost, fetchPut } from '@/scripts/helpers/fetchHelper';
import TradingViewNews from '../partials/index/TradingViewNews';
import Image from 'next/image';
import LandingInfo from '../partials/index/LandingInfo';
import Link from 'next/link';

const Page: NextPageWithLayout = ({online,tokens, serverSession}:PageProps) => {
    const bigmul = 50
    const mul = 11  
    const app = useContext(AppContext)
    const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
    const isClient = useIsClient()
    const [q__btcPrice, btcPrice] = useQueryPlus({ queryKey: ['btcData'], refetchOnWindowFocus: false, retry: 1,
        queryFn: async () =>{
            const priceRes = await fetch(API_PRICE_BASEURL+"BTCUSDT")
            const price = await priceRes.json()
            return price.price
        }
    },[])
    const signInGoogle = () => {
        
        signIn("google")
    }
        const leaveAll = async ()=> {
            let aconfirm = prompt("Delete Simulation Account Data? (yes/no)","ye")
            if (aconfirm != "yes") return

            if (!isClient) return;
            try {
                localStorage.removeItem("localTokensArrayObj");
                localStorage.removeItem("uid");
                window.location.reload()
            } catch (e) {
                console.log("err",e)
                return false
            }

        }

    const unitsArray = []
    const inventoryItems = useMemo(()=>{
        const _inventoryItems = [
            { companyName: "Strategy A", unitsArray, totalValue: parseDecimals(btcPrice) },
            // { companyName: "Company B", unitsArray: [4, 5, 6], totalValue: "20,000" },
        ];
        return _inventoryItems
    },[unitsArray,q__btcPrice])
    useEffect(()=>{
        s__uid(LS_uid)
        if (!!LS_uid) {
            s__clientIP(LS_uid.split(":")[0])
        }        
        app.s__sidebarLinks([])
        console.log("!uid", !uid)
        app.s__sidebarPages([
            {id:2,label:"Web Byte City",url:"https://wbyte.vercel.app/",icon:"bingo"},
            ...(!LS_uid ? [] : [
                {id:0,label:"History",url:"/trade/history/?pair=BTCUSDT",icon:"agreements"},
                {id:2,label:"Chart (BTC 4h)",url:"/chart/4h?token=btc",icon:"chart"}
            ]),
        ])
    },[])
    const [clientIP, s__clientIP] = useState('');
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [uid, s__uid] = useState("")

    const getData = async (newuid:any) => {
        try {
            const res:any = await fetchPost('/api/start',{
                uid:uid,
                name: newuid.split(":")[0],
                secret:newuid.split(":")[1],
                ...sessiondata
            })

            if (res.status <= 400 && res.status >= 200) {
                console.log("res", res)
                console.log("await res.json()",await res.json())
            } else {
                return alert("ERROR")
            }
                        
            s__clientIP(newuid)
            let new_uid = newuid
            s__uid(new_uid)
            s__LS_uid(new_uid)
            app.alert("success", "Simulation Account Registered succesfully!")
        } catch (e:any) {
            console.log("coudlnt register simulation account")
        }
    }
    const register = () => {
        let username = !sessiondata ? ( "user" ) : sessiondata.user.email

        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        let numberaccount = prompt(
            `Would you like to create a simulation account -> (${username}:${randomThousand})? \n\n\n Account Name: <${username}> \n Secret Key Code: ${randomThousand} \n\n\n Remember to save your credentials \n You can use the *Secret Key Code* to recover your account! `,
            `${randomThousand}`
        )
        if (numberaccount) {
            getData(`${username}:`+numberaccount)
        }
    }

    const { data:sessiondata, }:any = useSession();
    return (<>
    <div className='flex-center w-100 h-min-100vh'>
        <div className="h-min-100vh w-100  flex-col flex-justify-start flex-align-stretch"
            
        >
            <div className='w-100 flex-col pt-100' style={{background:"#46B7FA"}}>
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
                        <span className=" Q_xs" style={{fontSize:"2.5em !important"}}>Byte City</span>
                        <span className=" Q_sm_x" style={{fontSize:"6.5em !important"}}>Byte City</span>
                    </h1>
                </div>
                <Link className='pos-abs top-0  mt-200 py-2 opaci-chov--75 block pb-8 flex-col  bg-b-10 px-2 pt-8  bord-r-25'
                    style={{boxShadow:"0 4px 3px #00000022"}}
                    href='https://wbyte.vercel.app'
                >
                    <Image src="/main2.png" alt="bank" width={244} height={255} className='mt-8' />
                    <h1 className='tx-xl ' style={{color:"orangered"}}>Play Now!</h1>
                </Link>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#46B7FA" 
                    fill-opacity="1" d="M0,396L720,0L1440,292L1440,0L720,0L0,0Z"></path>
                </svg>
            </div>
            <div className="px-8 Q_xs_px-2 pt-200 ">
                {/* <BreadCrumbs pages={[["/", "Web Gamed App"]]} /> */}
                
                <div className="flex-row Q_xs_flex-col my-4 gap-2 mt-100">
                    {!uid && !!sessiondata && <>
                        <button   className={`px-3 py-2 clickble nowrap tx-lg opaci-chov--75 ${!sessiondata ? "" : "tx-white"}`}
                            style={{background:!sessiondata ? "#F7C127" : "orangered"}}
                            onClick={()=>{ register() }}
                        >
                            + Create Simulation Account
                        </button>
                    </>}
                    
                    {!sessiondata &&
                        <div className='flex-col'>
                            {<>
                                <div className='flex-col tx-sm'>Connect w/Google to create your new Account!</div>
                            </>}
                            <button   className="px-3 py-2 clickble nowrap tx-lg tx-white opaci-chov--75"
                                style={{background:"orangered"}}
                                onClick={()=>{ signInGoogle() }}
                            >
                                Connect w/Google
                            </button>
                        </div>
                    }
                    
                    <div className='flex-1'></div>
                </div>
            </div>

            
            <div className='flex-wrap flex-justify-start  flex-align-stretch' >
                {unitsArray.length > 0 && inventoryItems.map((item, index) => (
                    <ImsCard
                        uid={uid}
                        key={index}
                        companyName={item.companyName}
                        unitsArray={tokens}
                        totalValue={item.totalValue}
                        />
                    ))
                }
                
                {isClient && !!uid && <div className=' pa-3 flex-1 '>
                    <AmountCards tokens={tokens} {...{mul, bigmul}} />
                </div> }
            </div>

            <div className='flex-center  flex-1'>
            </div>
                
            {/* {!!uid &&
                <div className='flex pa-1'>
                    {(!!sessiondata && !!sessiondata.user) &&
                        <div className='flex-1 mt-100 Q_sm_x'>

                            <TradingViewNews />
                        </div>
                    }
                </div>
            } */}
            {!!uid &&
                <div className='flex flex-justify-end  pa-1'>
                    <button   className="ims-button-faded clickble nowrap  opaci-25 tx-md"
                        onClick={()=>{ leaveAll() }}
                    >
                        - Delete Simulation Account
                    </button>
                </div>
            }
        </div>
        
    </div>
    <div className='flex-col'>
        <div className='w-max-1080px w-100  flex-col flex-align-start'>
            <div className='w-100 py-100'>
                <LandingInfo />
            </div>
        </div>  
    </div>  
    </>)
}

type PageProps = {
    online: boolean;
    tokens: any;
    serverSession: any;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>WebGamed</title></Head>
        <InventoryProvider>
            <SidebarContainer sidebar={<SessionSidebar/>}>{page}</SidebarContainer>
        </InventoryProvider>
    </Layout>
    )
}

export default Page

export const getServerSideProps: GetServerSideProps<PageProps, ParsedUrlQuery> = async (context) => {
    const { offline } = context.query;
    const online = typeof offline === 'undefined';

    const session = await getToken({ req:context.req, secret: process.env.NEXTAUTH_SECRET })
    // let jwt = await getToken(context.requet)
    
    let tokens = DEFAULT_TOKENS_ARRAY
    
    return {
      props: {
        online,tokens,
        serverSession: session
      },
    };
  };