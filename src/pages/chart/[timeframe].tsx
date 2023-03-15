import { useRouter } from "next/router"
import { useMemo } from "react"
import { ChartDashboard } from "@/components/dashboard/index"
import Layout from "@/src/items/templates/Layout"

export default function Page {
    const router = useRouter()
    let zzz = useMemo(() => {
        return !(router.query && router.query.token && router.query.timeframe)
    }, [router.query])
    
    if (zzz) return
    return (
        <Layout>
            <div className=" h-100">
                <ChartDashboard query={router.query}/>
            </div>
        </Layout>
    )
}