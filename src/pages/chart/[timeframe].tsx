import { useRouter } from "next/router"
import { useMemo } from "react"
import { ChartDashboard } from "@/components/dashboard/index"
import Layout from "@/src/items/templates/Layout"
import Link from "next/link"
import Head from "next/head"
import { useIsClient } from "usehooks-ts"
import AmountCards from "@/components/dashboard/AmountCards"
import { GetServerSideProps } from "next"
import { getEdgeConfig } from "@/scripts/helpers/fetchHelper"

export default function Page({tokens}) {
    const isClient = useIsClient()

    const router = useRouter()
    let zzz = useMemo(() => {
        return !(router.query && router.query.token && router.query.timeframe)
    }, [router.query])
    
    if (zzz) return
    return (
        <Layout>
            <Head><title>DCOY | Chart</title></Head>
            <Link className="pos-fix bg-white box-shadow-2 px-3 py-2 ord-r-1 ma-1 ord-r-5 z-1001" href="/">Home</Link>
            <div className=" h-100 pb-100 pt-8 g-b-20 px-100 Q_xs_sm_px-2 "
                // style={{background:"#2D313E"}}
            >
                {isClient && <AmountCards tokens={tokens} mul={20} bigmul={50} /> }
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

    let tokens = await getEdgeConfig()
  
    return {
      props: {
        online,tokens,
      },
    };
  };