import { ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { getToken } from "next-auth/jwt"
import { signIn, useSession } from 'next-auth/react';
import { useIsClient, useLocalStorage } from 'usehooks-ts';


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import SessionSidebar from "@/src/items/templates/SessionSidebar";
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import ImsCard from '@/src/partials/index/ImsCard'
import { AppContext } from '@/scripts/contexts/AppContext'
import { InventoryProvider } from '@/scripts/contexts/InventoryContext'
import { parseDecimals } from '@/components/scripts/helpers';
import AmountCards from '@/components/dashboard/AmountCards';
import { DEFAULT_TOKENS_ARRAY } from '@/components/scripts/constants';
import { fetchPost } from '@/scripts/helpers/fetchHelper';
import LandingInfo from '@/src/partials/index/LandingInfo';
import LandingLinks from '@/src/partials/index/LandingLinks';
import LandingCard from '@/src/partials/index/LandingCard';
import LandingBackground from '@/src/partials/index/LandingBackground';
import LandingSession from '@/src/partials/index/LandingSession';

const Page: NextPageWithLayout = ({online,tokens, serverSession}:PageProps) => {
    const { data:sessiondata, }:any = useSession();
    const bigmul = 50
    const mul = 11  
    const app = useContext(AppContext)
    const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
    const isClient = useIsClient()
    const unitsArray = []
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [uid, s__uid] = useState("")

    {/******************************************************************************************************/}

    const [q__btcPrice, btcPrice] = useQueryPlus({ queryKey: ['btcData'],
        refetchOnWindowFocus: false, retry: 1,
        queryFn: async () =>{
            const priceRes = await fetch(API_PRICE_BASEURL+"BTCUSDT")
            const price = await priceRes.json()
            return price.price
        }
    },[])
    const inventoryItems = useMemo(()=>{
        const _inventoryItems = [
            { companyName: "Strategy A", unitsArray, totalValue: parseDecimals(btcPrice) },
            // { companyName: "Company B", unitsArray: [4, 5, 6], totalValue: "20,000" },
        ];
        return _inventoryItems
    },[unitsArray,q__btcPrice])
    useEffect(()=>{
        s__uid(LS_uid)
        app.s__sidebarLinks([])
        app.s__sidebarPages([
            {id:2,label:"Web Byte City",url:"https://bytc.vercel.app/",icon:"bingo"},
            ...(!LS_uid ? [] : [
                {id:0,label:"History",url:"/trade/history/?pair=BTCUSDT",icon:"agreements"},
                {id:2,label:"Dashboard",url:"/chart/4h?token=btc",icon:"chart"}
            ]),
        ])
    },[])

    {/******************************************************************************************************/}

    const signInGoogle = () => {
        signIn("google")
    }
    const deleteLocalPlayer = async ()=> {
        let aconfirm = prompt("Delete Simulated Player Data? (yes/no)","yes")
        if (aconfirm != "yes") return

        localStorage.removeItem("localTokensArrayObj");
        localStorage.removeItem("uid");
        window.location.reload()

    }
    const setIdByObject = (playerCredentials) => {
        let mergedString = `${playerCredentials.name}:${playerCredentials.name}`
        s__uid(mergedString)
        s__LS_uid(mergedString)
    }
    const registerPlayer = async (playerCredentials:any) => {
        try {
            const res:any = await fetchPost('/api/start',playerCredentials)

            if (res.status <= 400 && res.status >= 200) {
                console.log("res", res)
                console.log("await res.json()",await res.json())
            } else {
                return alert("ERROR")
            }
            setIdByObject(playerCredentials)
            
            app.alert("success", "Simulated Player Registered succesfully!")
        } catch (e:any) {
            console.log("coudlnt register Simulated Player")
        }
    }
    const connectPlayer = async (newuid:any) => {
        try {
            const res:any = await fetch(
                `/api/start?name=${newuid.split(":")[0]}&secret=${newuid.split(":")[1]}`
            )

            if (res.status <= 400 && res.status >= 200) {
                console.log("res", res)
                console.log("await res.json()",await res.json())
            } else {
                return alert("ERROR")
            }
                        
            let new_uid = newuid
            s__uid(new_uid)
            s__LS_uid(new_uid)
            
            app.alert("success", "Simulated Player logged in succesfully!")
        } catch (e:any) {
            console.log("coudlnt log into Simulated Player")
        }
    }
    
    const createPlayer = () => {
        let username = !sessiondata ? ( "user" ) : sessiondata.user.email

        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        let numberaccount = prompt(
            `Would you like to create a Simulated Player -> (${username}:${randomThousand})? \n\n\n Account Name: <${username}> \n Secret Key Code: ${randomThousand} \n\n\n Remember to save your credentials \n You can use the *Secret Key Code* to recover your account! `,
            `${randomThousand}`
        )
        if (!numberaccount) { return }
        if (parseInt(numberaccount) < 10000) { return}

        if (numberaccount) {
            registerPlayer({name:username,secret:numberaccount})
        }
    }
    const trigger_connectPlayer = () => {
        let username = !sessiondata ? ( "user" ) : sessiondata.user.email

        
        let numberaccount = prompt(
            `Would you like to create a Simulated Player -> (${username}:????})? \n\n\n Account Name: 
            <${username}> \n Secret Key Code: ???? \n\n\n Remember to save your credentials \n You can use the *Secret Key Code* to recover your account! `,
            ``
        )
        if (!numberaccount) { return }
        if (parseInt(numberaccount) >= 10000) { return}

        if (numberaccount) {
            connectPlayer(`${username}:`+numberaccount)
        }
    }

    {/******************************************************************************************************/}

    return (<>
    <div className='flex-center w-100  -min-100vh'>
        <div className="-min-90vh  w-100  flex-col flex-justify-start flex-align-stretch"
            
        >
            <LandingCard />
            <div>
                <LandingBackground />
                
                {!!uid && !!sessiondata &&<>
                        <div className=' pt-150'></div>
                        <div className='Q_xs_lg pt-100'></div>
                        <div className='Q_xs_md pt-8'></div>

                        <LandingLinks sessiondata={sessiondata} />                        
                    </>}
            </div>
            <div className="px-8 Q_xs_px-2  ">

                <LandingSession {...{
                    uid, sessiondata,
                    calls: {
                        createPlayer,
                        trigger_connectPlayer,
                        signInGoogle,
                    }
                }} />
                {!uid && !!sessiondata && <>
                    <div className='Q_sm_md pt-100 pb-8'></div>
                </>}
                
                
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
                
            {!!uid &&
                <div className='flex flex-justify-end  pa-1'>
                    <button   className="ims-button-faded clickble nowrap  opaci-25 tx-md"
                        onClick={()=>{ deleteLocalPlayer() }}
                    >
                        - Delete Simulated Player
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
    
    let tokens = DEFAULT_TOKENS_ARRAY
    
    return {
      props: {
        online,tokens,
        serverSession: session
      },
    };
  };

