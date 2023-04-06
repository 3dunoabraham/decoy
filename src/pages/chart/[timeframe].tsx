import { useRouter } from "next/router"
import { useMemo } from "react"
import { ChartDashboard } from "@/components/dashboard/index"
import Layout from "@/src/items/templates/Layout"
import Link from "next/link"
import Head from "next/head"
import { useIsClient } from "usehooks-ts"
import AmountCards from "@/components/dashboard/AmountCards"
import { GetServerSideProps } from "next"
// import { getEdgeConfig } from "@/scripts/helpers/fetchHelper"
import { useQueryPlus } from "@/scripts/helpers/useHooksHelper"
import { parseDecimals } from "@/components/scripts/helpers"
import { parseDateTimeString } from "@/scripts/helpers/type/dateHelper"
import { DEFAULT_TOKENS_ARRAY } from "@/components/scripts/constants"

export default function Page({tokens}) {
    const isClient = useIsClient()

    const router = useRouter()
    let zzz = useMemo(() => {
        return !(router.query && router.query.token && router.query.timeframe)
    }, [router.query])

    
    
    if (zzz) return
    return (
        <Layout>
            <Head><title>BitCity | Chart</title></Head>
            <div className="pos-fix flex z-1001">
                <Link className=" bg-white box-shadow-2 px-3 py-2 ord-r-1 ma-1 ord-r-5 z-1001" href="/">Home</Link>
                <Link className=" bg-white box-shadow-2 px-3 py-2 ord-r-1 ma-1 ord-r-5 z-1001" href="/dashboard">Dashboard</Link>
            </div>
            <div className=" h-100 py-8 g-b-20 px-100 Q_xs_sm_px-2 "
                // style={{background:"#2D313E"}}
            >
                <div className="opaci-50 tx-ls-3 tx-lg my-2">Goal Balance</div>
                {isClient && <AmountCards tokens={tokens} mul={11} bigmul={50}  /> }
            </div>
            <div className=" h-100 pb-100 pt-8 g-b-20 box-shadow-8"
                style={{background:"#2D313E"}}
            >
                <ChartDashboard query={router.query}/>
            </div>

        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { offline } = context.query;
    const online = typeof offline === 'undefined';
    // const tokens =  process.env.GITHUB_ID

    // let tokens = await getEdgeConfig()
    let tokens = DEFAULT_TOKENS_ARRAY
  
    return {
      props: {
        online,tokens,
      },
    };
  };