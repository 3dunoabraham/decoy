import { ReactElement, useMemo } from 'react'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import UnitViewEdit from '@/src/partials/unit/UnitViewEdit'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { fetchUnitPageData } from '@/scripts/helpers/fetchHelper'

const Page: NextPageWithLayout = () => {
    
    const router = useRouter()
    const { id } = router.query

    const q_foreigns = useQuery({queryKey: ['foreignsData'], queryFn: async () => await fetchUnitPageData(),})
    const q__foreigns = useMemo(()=>
        (q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading) ? null : q_foreigns.data
    ,[q_foreigns])

    if (!id) {return <div></div>}
    return (
        <div className='flex-center w-100 h-min-100vh'><UnitViewEdit id={id} optMapObj={q__foreigns} /></div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        {page}
    </Layout>
    )
}

export default Page