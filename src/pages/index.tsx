import { ReactElement, useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useLocalStorage } from 'usehooks-ts';


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import SessionSidebar from "@/src/items/templates/SessionSidebar";
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import { AppContext } from '@/scripts/contexts/AppContext'
import { InventoryProvider } from '@/scripts/contexts/InventoryContext'
import AmountCards from '@/components/dashboard/AmountCards';
import { DEFAULT_TOKENS_ARRAY } from '@/components/scripts/constants';
import { fetchPost } from '@/scripts/helpers/fetchHelper';
import LandingInfo from '@/src/partials/index/LandingInfo';
import LandingLinks from '@/src/partials/index/LandingLinks';
import LandingCard from '@/src/partials/index/LandingCard';
import LandingBackground from '@/src/partials/index/LandingBackground';
import LandingSession from '@/src/partials/index/LandingSession';
import { ChartDashboard } from '@/components/dashboard';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = ({ tokens }:PageProps) => {
    const { data:sessiondata, }:any = useSession();
    const bigmul = 50
    const mul = 11  
    const app = useContext(AppContext)
    const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "")
    const [rpi, s__rpi] = useState("")
    
    {/******************************************************************************************************/}
    const router = useRouter()

    useEffect(()=>{
        s__rpi(LS_rpi)
        app.s__sidebarLinks([])
        app.s__sidebarPages([
            {id:2,label:"Web Byte City",url:"https://bytc.vercel.app/",icon:"bingo"},
            ...(!LS_rpi ? [] : [
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
        let aconfirm = prompt("Disconnect Simulated Player Data? (yes/no)","yes")
        if (aconfirm != "yes") return

        localStorage.removeItem("localTokensArrayObj");
        localStorage.removeItem("rpi");
        window.location.reload()
    }
    const setIdByObject = (playerCredentials) => {
        let mergedString = `${playerCredentials.referral}:${playerCredentials.pin}`
        s__rpi(mergedString)
        s__LS_rpi(mergedString)
    }
    const getLocalReferral = () => {
        return !sessiondata ? ( "user" ) : sessiondata.user.email
    }
    const trigger_createPlayer = () => {
        createPlayer(getLocalReferral())
    }
    const createPlayer = (username:string) => {
        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        let numberaccount = prompt(
            `Would you like to create a Simulated Player -> (${username}:${randomThousand})? \n\n\n Account Name: <${username}> \n pin Key Code: ${randomThousand} \n\n\n Remember to save your credentials \n You can use the *pin Key Code* to recover your account! `,
            `${randomThousand}`
        )
        if (!numberaccount) { return }
        if (parseInt(numberaccount) >= 10000) { return}

        registerPlayer({referral:username,pin:numberaccount})
    }
    const registerPlayer = async (playerCredentials:any) => {
        try {
            const res:any = await fetchPost('/api/player',playerCredentials)
            if (res.status >= 400) { return alert("ERROR") }

            setIdByObject(playerCredentials)            
            app.alert("success", "Simulated Player Registered succesfully!")
        } catch (e:any) {
            app.alert("error", "Couldn't log into player!")
        }
    }
    const connectPlayer = async (playerCredentials:any) => {
        try {
            const reqUrl = `/api/player?referral=${playerCredentials.referral}&pin=${playerCredentials.pin}`
            const res:any = await fetch(reqUrl)
            if (res.status >= 400) { return alert("ERROR") }

            setIdByObject(playerCredentials)
            app.alert("success", "Simulated Player logged in succesfully!")
        } catch (e:any) {
            app.alert("error", "Couldn't log into player!")
        }
    }    
    const trigger_connectPlayer = () => {

        let username = getLocalReferral()
        console.table(username)
        
        let numberaccount = prompt(
            `Would you like to create a Simulated Player -> (${username}:????})? \n\n\n Account Name: 
            <${username}> \n pin Key Code: ???? \n\n\n Remember to save your credentials \n You can use the *pin Key Code* to recover your account! `,
            ``
        )
        if (!numberaccount) { return }
        if (parseInt(numberaccount) >= 10000) { return}

        connectPlayer({referral:username,pin:numberaccount})
    }

    {/******************************************************************************************************/}

    return (<>
    <div className='flex-center w-100  -min-100vh'>
        <div className="-min-90vh  w-100  flex-col flex-justify-start flex-align-stretch">

            <LandingCard />
            <div>
                <LandingBackground />
                
                {!!rpi && !!sessiondata &&<>
                    <div className=' pt-150'></div>
                    <div className='Q_xs_lg pt-100'></div>
                    <div className='Q_xs_md pt-8'></div>

                    <LandingLinks sessiondata={sessiondata} />                        
                </>}
            </div>
            <div className="px-8 Q_xs_px-2  ">

                <LandingSession {...{ rpi, sessiondata,
                    calls: { createPlayer:trigger_createPlayer, trigger_connectPlayer, signInGoogle, }
                }} />
                {!rpi && !!sessiondata && <>
                    <div className='Q_sm_md pt-100 pb-8'></div>
                </>}
            </div>
            
            <div className='flex-wrap flex-justify-start  flex-align-stretch' >
                {!!rpi &&
                    <div className=' pa-3 flex-1 '>
                        <AmountCards tokens={tokens} {...{mul, bigmul}} />
                    </div>
                }
            </div>

            <div className='flex-center  flex-1'></div>
                
            {!!rpi &&
                <div className='flex flex-justify-end  pa-1'>
                    <button   className="ims-button-faded clickble nowrap  opaci-25 tx-md"
                        onClick={()=>{ deleteLocalPlayer() }}
                    >
                        - Disconnect Simulated Player
                    </button>
                </div>
            }
        </div>
        
    </div>
    <div className='flex-col'>
        <div className='w-max-1080px w-100  flex-col flex-align-start'>
            <div className='w-100 py-100'> <LandingInfo /> </div>
        </div>  
    </div>  

    

<div className=" h-100 pb-100 pt-8 g-b-20 box-shadow-8" style={{background:"#2D313E"}}>
    <ChartDashboard query={{token:"btc",timeframe:"4h"}} user={sessiondata}/>
</div>
<div className=" h-100 py-8 g-b-20 px-100 Q_xs_sm_px-2 ">
    <div className="opaci-50 tx-ls-3 tx-lg my-2">Goal Balance</div>
    <AmountCards tokens={tokens} mul={11} bigmul={50}  />
</div>


    </>)
}

type PageProps = {
    tokens: any;
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

{/**********************************************************************************************************/}

export const getServerSideProps: GetServerSideProps<PageProps, ParsedUrlQuery> = async (context) => {
    let tokens = DEFAULT_TOKENS_ARRAY
    
    return {
      props: {
            tokens,
        },
    };
};