import { useRouter } from "next/router"
import { useMemo } from "react"
import Link from "next/link"
import Head from "next/head"
import { useIsClient } from "usehooks-ts"
import { getToken } from "next-auth/jwt"
import { GetServerSideProps } from "next"


import { ChartDashboard } from "@/components/dashboard/index"
import Layout from "@/src/items/templates/Layout"
import AmountCards from "@/components/dashboard/AmountCards"
import { DEFAULT_TOKENS_ARRAY } from "@/components/scripts/constants"
import SidebarContainer from "@/src/items/templates/SidebarContainer"
import SessionSidebar from "@/src/items/templates/SessionSidebar"

export default function Page({tokens, session}) {
    const isClient = useIsClient()
    const router = useRouter()
    let zzz = useMemo(() => {
        return !(router.query && router.query.token && router.query.timeframe)
    }, [router.query])

    {/******************************************************************************************************/}
    
    if (zzz) return <></>
    return (
        <Layout>
            
            <Head><title>Chart | WebPOV</title></Head>
            <div className="pos-fix flex z-1001">
                <Link className=" bg-white box-shadow-2 px-3 py-2 ord-r-1 ma-1 ord-r-5 z-1001" href="/">
                    Home
                </Link>
            </div>
            
            <SessionSidebar/>

            <div className=" h-100 pb-100 pt-8 g-b-20 box-shadow-8" style={{background:"#2D313E"}}>
                <ChartDashboard query={router.query} user={session}/>
            </div>
            <div className=" h-100 py-8 g-b-20 px-100 Q_xs_sm_px-2 ">
                <div className="opaci-50 tx-ls-3 tx-lg my-2">Goal Balance</div>
                {isClient && <AmountCards tokens={tokens} mul={11} bigmul={50}  /> }
            </div>
        </Layout>
    )
}

{/**********************************************************************************************************/}

export const getServerSideProps: GetServerSideProps = async (context:any) => {
    let tokens = DEFAULT_TOKENS_ARRAY
    const session = await getToken({ req:context.req, secret: process.env.NEXTAUTH_SECRET })
    return {
      props: { tokens, session },
    };
  };