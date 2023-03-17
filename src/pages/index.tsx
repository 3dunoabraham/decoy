import { ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { get, getAll } from '@vercel/edge-config';

import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import SessionSidebar from "@/src/items/templates/SessionSidebar";
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { API_UNITS, LOCAL_URL } from '@/scripts/constants/api'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import ImsCard from '@/src/partials/index/ImsCard'
import LoadingPill from '@/src/items/atoms/holders/LoadingPill'
import FailedRequest from '@/src/items/atoms/holders/FailedRequest'
import { AppContext } from '@/scripts/contexts/AppContext'
import { useRouter } from 'next/router'
import { OFFLINE_UNITS_ARRAY } from '@/scripts/constants/inventory';
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { parseDecimals } from '@/components/scripts/helpers';
import { useLocalStorage } from 'usehooks-ts';

const Page: NextPageWithLayout = ({online,asd}:PageProps) => {
    const router = useRouter()
    const inv = useContext(InventoryContext)
    const app = useContext(AppContext)
    const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="

    const [q__btcPrice, btcPrice] = useQueryPlus({ queryKey: ['btcData'], refetchOnWindowFocus: false, retry: 1,
        queryFn: async () =>{
            const priceRes = await fetch(API_PRICE_BASEURL+"BTCUSDT")
            const price = await priceRes.json()
            return price.price
        }
    },[])
    
    // const tokensReqObj:any = ( DEFAULT_TOKENS_ARRAY.reduce((acc, aToken) => (
    //     { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
    //     ), {}))
    //     const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    //     const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    //     const [uid, s__uid] = useState("")
    //     const [showAllTokens,s__showAllTokens] = useState<any>(true)
    //     const [chopAmount,s__chopAmount] = useState<any>(0)
    //     const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
    //     const [klinesArray,s__klinesArray] = useState<any[]>([])
    //     const [clientIP, s__clientIP] = useState('');
    //     const DEFAULT_TOKEN_OBJ = {
    //         mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
    //         min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
    //     }
    //     const p__klinesArray = useMemo(()=>{
    //         let slicedArray = [...klinesArray]
    //         for (let index = 0; index < chopAmount; index++) { slicedArray.push(klinesArray[499]) }
            
    //         return slicedArray.slice(slicedArray.length-500,slicedArray.length)
    //     },[klinesArray,chopAmount])
    //     const queryUSDT:any = useQuery({ queryKey: ['usdt'], refetchInterval: 3000,
    //     queryFn: async () => online ? (await fetchMultipleJsonArray(tokensReqObj)) : DEFAULT_TOKEN,
    // })

    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitData'], refetchOnWindowFocus: false, retry: 1,
        queryFn: async () =>{
            if (!app.online) { return OFFLINE_UNITS_ARRAY }
            let theUrl = API_UNITS+"uids/"
            let theRequest = await fetch(theUrl);
            let theJsonResult = await theRequest.json()
            return theJsonResult
        }
    },[])
    const inventoryItems = useMemo(()=>{
        let rdm = parseInt(`${Math.random()*1000 * unitsArray.length}`).toLocaleString("en-US")

       
        const _inventoryItems = [
            { companyName: "Strategy A", unitsArray, totalValue: parseDecimals(btcPrice) },
            // { companyName: "Company B", unitsArray: [4, 5, 6], totalValue: "20,000" },
        ];
        return _inventoryItems
    },[unitsArray,q__btcPrice])
    useEffect(()=>{
        // inv.s__unitsArray([])
        // console.log(inv)
        
        app.s__sidebarLinks([])
        app.s__sidebarPages([
            {id:0,label:"History",url:"/agreements/",icon:"agreements"},
            // {id:1,label:"Chart",url:"https://www.tradingview.com/chart/EBa5RTfJ/?symbol=BITSTAMP%3ABTCUSD",icon:"users"},
            {id:2,label:"3D Chart",url:"/builder/3d/",icon:"builder3d"},
        ])
    },[])
    const [clientIP, s__clientIP] = useState('');
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [uid, s__uid] = useState("")

    const getData = async (randomThousand:any) => {
        const res:any = await fetch('https://geolocation-db.com/json/')
        let awaited = await res.json()
        s__clientIP(awaited.IPv4)
        let new_uid = `${awaited.IPv4}:${randomThousand}`
        s__uid(new_uid)
        s__LS_uid(new_uid)
        app.alert("success", "Registered succesfully!")
    }
    const register = () => {
        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        if (confirm(`IP+${randomThousand}\nWould you like to Register?`)) {
            getData(randomThousand)

        }
    }

    const { data: session } = useSession();
    return (
    <div className='flex-center w-100 h-min-100vh'>
        <div className="h-min-100vh w-100  flex-col flex-justify-start flex-align-stretch">
            <div className="px-8 ">
                <BreadCrumbs pages={[]} current="Dashboard" />
                
                <div className="flex-center mb-8">
                    {/* <h1 className="pt-4 tx-bold-5 flex-1 ">
                        Dashboard
                    </h1> */}
                    
                    {!uid &&
                        <button   className="ims-button-primary clickble nowrap tx-lg"
                            onClick={()=>{ register() }}
                        >
                            + Join
                        </button>
                    }
                    
                    {uid &&
                        <button   className="ims-button-faded clickble nowrap tx-lg opaci-25"
                            onClick={()=>{  }}
                        >
                            Leave
                        </button>
                    }
                </div>
            </div>
            {q__unitsArray.isLoading &&
                <div className=' flex-col mt-150'>
                    <LoadingPill title={"Loading Bitcoin Price..."} />
                </div> 
            }
            {q__unitsArray.isError &&
                <div className=' flex-col mt-150'>
                    <FailedRequest preview={LOCAL_URL+"/?offline"} />
                </div> 
            }

            {/* |{JSON.stringify(asd)}| */}

            {/*!!session &&*/
                <div className='flex-wrap flex-justify-start gap-4' >
                    {unitsArray.length > 0 && inventoryItems.map((item, index) => (
                        <ImsCard
                            key={index}
                            companyName={item.companyName}
                            unitsArray={asd}
                            totalValue={item.totalValue}
                            />
                        ))
                    }
                </div>
            }
            

            <div className='flex-center  flex-1'>
            </div>
        </div>
    </div>
    )
}

const getEdgeConfig  = async () => {
    // return null
    const tokens = await getAll(["tokens"]);
    // const tokens = await get('tokens');
    console.log("tokens", tokens)
    const tokenstokens:any = tokens.tokens
    return tokenstokens.split(",")
}
type PageProps = {
    online: boolean;
    asd: any;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>DCOY</title></Head>
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
    // const asd =  process.env.GITHUB_ID

    let asd = await getEdgeConfig()
  
    return {
      props: {
        online,asd,
      },
    };
  };