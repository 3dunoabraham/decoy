import { useRouter } from "next/router"
import { useMemo } from "react"
import { ChartDashboard } from "@/components/dashboard/index"
import Layout from "@/src/items/templates/Layout"
import Link from "next/link"
import Head from "next/head"

export default function Page() {
    const router = useRouter()
    let zzz = useMemo(() => {
        return !(router.query && router.query.token && router.query.timeframe)
    }, [router.query])
    
    if (zzz) return
    return (
        <Layout>
            <Head><title>DCOY | Chart</title></Head>
            <Link className="pos-fix bg-white box-shadow-2 px-3 py-2 ord-r-1 ma-1 ord-r-5 z-1001" href="/">Home</Link>
            <div className=" h-100 pb-100 pt-8 g-b-20"
                style={{background:"#2D313E"}}
            >
                <ChartDashboard query={router.query}/>
            </div>

        </Layout>
    )
}