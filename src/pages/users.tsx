import { ReactElement, useContext } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import FilterSidebar from "@/src/items/templates/FilterSidebar";
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper'
import { API_UNITS } from '@/scripts/constants/api'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'

const Page: NextPageWithLayout = () => {
    const inv = useContext(InventoryContext)
    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitData'], 
        queryFn: async () =>{
            const theList = await fetchJsonArray(API_UNITS, "Units")
            inv.s__unitsArray(theList)
            return theList
        }
    },[])


    return (
        <div className='flex-center w-100 h-min-100vh'>
            <div className="h-min-100vh w-100  flex-col flex-justify-start flex-align-stretch gap-4">
                <div className="px-8  mb-">
                    <BreadCrumbs pages={[["/","IMS"]]} current="Users" />
                    
                    <div className="flex-center mb-">
                        <h1 className="pt-4 tx-bold-5 flex-1 "> Users</h1>
                    </div>
                    <hr className="my-2 "/>
                </div>
                
                
                <div className='flex-center  flex-justify-start px-8 Q_xs_sm_px-2 gap-4'>
                    <div className='box-shadow-1  pt-2 flex-1 bord-r-8'>
                        <div className='flex-center flex-justify-start px-6'>
                            <div className=' py-2 '>
                                <div className='ims-tx-faded py-1'>
                                    New Order
                                </div>
                                <div className='tx-lx  tx-bold-6'>
                                    {unitsArray.length || "-"}
                                </div>
                            </div>
                        </div>
                        <hr  className='mt-3' />
                    </div>
                    <div className='box-shadow-1  pt-2 flex-1 bord-r-8'>
                        <div className='flex-center flex-justify-start px-6'>
                            <div className=' py-2 '>
                                <div className='ims-tx-faded py-1'>
                                    New Order
                                </div>
                                <div className='tx-lx  tx-bold-6'>
                                    {unitsArray.length || "-"}
                                </div>
                            </div>
                        </div>
                        <hr  className='mt-3' />
                    </div>
                    <div className='box-shadow-1  pt-2 flex-1 bord-r-8'>
                        <div className='flex-center flex-justify-start px-6'>
                            <div className=' py-2 '>
                                <div className='ims-tx-faded py-1'>
                                    New Order
                                </div>
                                <div className='tx-lx  tx-bold-6'>
                                    {unitsArray.length || "-"}
                                </div>
                            </div>
                        </div>
                        <hr  className='mt-3' />
                    </div>
                </div>
                
                <div className='flex-center  flex-justify-start px-8 Q_xs_sm_px-2 gap-4'>
                    <div className='box-shadow-1  pt-2 flex-1 bord-r-8'>
                        <div className='flex-center flex-justify-start px-6'>
                            <div className=' py-2 '>
                                <div className='ims-tx-faded py-1'>
                                    New Order
                                </div>
                                <div className='tx-lx  tx-bold-6'>
                                    {unitsArray.length || "-"}
                                </div>
                            </div>
                        </div>
                        <hr  className='mt-3' />
                    </div>
                    <div className='box-shadow-1  pt-2 flex-1 bord-r-8'>
                        <div className='flex-center flex-justify-start px-6'>
                            <div className=' py-2 '>
                                <div className='ims-tx-faded py-1'>
                                    New Order
                                </div>
                                <div className='tx-lx  tx-bold-6'>
                                    {unitsArray.length || "-"}
                                </div>
                            </div>
                        </div>
                        <hr  className='mt-3' />
                    </div>
                    <div className='box-shadow-1  pt-2 flex-1 bord-r-8'>
                        <div className='flex-center flex-justify-start px-6'>
                            <div className=' py-2 '>
                                <div className='ims-tx-faded py-1'>
                                    New Order
                                </div>
                                <div className='tx-lx  tx-bold-6'>
                                    {unitsArray.length || "-"}
                                </div>
                            </div>
                        </div>
                        <hr  className='mt-3' />
                    </div>
                </div>
                <div className='flex-center  flex-1'>
                </div>
            </div>
        </div>
        )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>Users | IMS</title></Head>
        <InventoryProvider>
            <SidebarContainer sidebar={<FilterSidebar online={true}/>}>
                {page}
            </SidebarContainer>
        </InventoryProvider>
    </Layout>
    )
}

export default Page