import { ReactElement, useMemo } from 'react'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import UnitAddComponent from '@/src/partials/unit/UnitAddComponent'
import { useQuery } from '@tanstack/react-query'
import { fetchUnitPageData } from '@/scripts/helpers/fetchHelper'
import { DEFAULT_UNIT } from '@/scripts/constants/unit'
import Head from 'next/head'

const Page: NextPageWithLayout = () => {
    
    const q_foreigns = useQuery({queryKey: ['foreignsData'], queryFn: async () => await fetchUnitPageData(),})
    const q__foreigns = useMemo(()=>
        (q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading) ? null : q_foreigns.data
    ,[q_foreigns])

    return (
        <div className='flex-col w-100 h-min-100vh'><UnitAddComponent unit={DEFAULT_UNIT} optMapObj={q__foreigns} /></div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>IMS</title></Head>
        {page}
    </Layout>
    )
}

export default Page