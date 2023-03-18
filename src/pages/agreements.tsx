import { ReactElement, useContext } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import FilterSidebar from "@/src/items/templates/FilterSidebar";
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import Link from 'next/link'
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper'
import { API_UNITS } from '@/scripts/constants/api'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import LOCAL_AGREEMENTS from '@/localAgreements.json'
import ItemsTable from '@/src/items/molecules/table/ItemsTable'
import { parseDecimals, parseUTCDateString, parseUTCString } from '@/components/scripts/helpers'
import { parseDateTimeString } from '@/scripts/helpers/type/dateHelper'
import { useRouter } from 'next/router'

const Page: NextPageWithLayout = ({}) => {
    const router = useRouter()
    const pair = router.query.pair || "BTCUSDT"
    const inv = useContext(InventoryContext)
    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitData'], 
        queryFn: async () =>{
            // const theList = await fetchJsonArray(API_UNITS, "Units")
            // inv.s__unitsArray(theList)

            const theListRes = await fetch(`/api/trade-history/?symbol=${pair}&limit=99`)
            let theList = await theListRes.json()
            console.log("thelist", theList)
            theList = theList.map((anItem, index) => {
                return {...anItem,...{
                    side: anItem.isBuyer ? "Buy" : "Sell",
                    price: parseDecimals(anItem.price),
                    qty: "$"+parseDecimals(parseFloat(anItem.price)*parseFloat(anItem.qty)),
                    time: parseDateTimeString(new Date(anItem.time/1)),
                }}
            }).reverse()

            // const theList = await fetchJsonArray(API_UNITS, "Units")

            return theList
        }
    },[])

    

    const tradesTableConfig = {
        key: {title:"ID",name:"id",isInvisible:true},
        rest: {
            col1: {title:"Side",fieldName:"side"},
            col2: {title:"Price",fieldName:"price"},
            col3: {title:"Amount",fieldName:"qty"},
            col4: {title:"Date",fieldName:"time"},
            // col1: {title:"asd",fieldName:"status_id"},
            // col2: {title:"Unit Type",fieldName:"structure_type"},
            // col4: {title:"Manufacturer",fieldName:"manufacturer_company"},
            // col5: {title:"Last Update",fieldName:"updated_at"},
        }
    }
    const agreementsTableConfig = {
        key: {title:"RPA ID",name:"rpa_code"},
        rest: {
            col1: {title:"asd",fieldName:"status_id"},
            col2: {title:"Unit Type",fieldName:"structure_type"},
            col4: {title:"Manufacturer",fieldName:"manufacturer_company"},
            col5: {title:"Last Update",fieldName:"updated_at"},
        }
    }
    return (
        <div className='flex-center w-100 h-min-100vh'>
            <div className="h-min-100vh w-100  flex-col flex-justify-start flex-align-stretch gap-4">
                <div className="px-8  mb-">
                    <BreadCrumbs pages={[["/","Trades"]]} current="History" />
                    
                    <div className="flex-center mb-">
                        <h1 className="pt-4 tx-bold-5 flex-1 "> Trade History ({pair})</h1>
                        {/* <Link  href="/unit/add" className="ims-button-primary clickble">+ New Unit</Link> */}
                    </div>
                    <hr className="my-2 "/>
                </div>
                <div className='px-8 Q_xs_sm_px-2 w-100'>
                    <ItemsTable displayConfigObj={tradesTableConfig} theArray={unitsArray}
                        boolConfig={["isSelectable"]}
                    />
                </div>

                {/* <div className='px-8 Q_xs_sm_px-2 w-100'>
                    <ItemsTable displayConfigObj={agreementsTableConfig} theArray={LOCAL_AGREEMENTS.data.list}
                        boolConfig={["isSelectable"]}
                    />
                </div> */}
                {/* {JSON.stringify(LOCAL_AGREEMENTS.data.list)} */}
                
                {/* <div className='flex-center  flex-justify-start px-8 Q_xs_sm_px-2 gap-4'>
                    <div className='box-shadow-1  pt-2 flex-1 ord-r-8'>
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
                    <div className='box-shadow-1  pt-2 flex-1 ord-r-8'>
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
                    <div className='box-shadow-1  pt-2 flex-1 ord-r-8'>
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
                    <div className='box-shadow-1  pt-2 flex-1 ord-r-8'>
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
                    <div className='box-shadow-1  pt-2 flex-1 ord-r-8'>
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
                    <div className='box-shadow-1  pt-2 flex-1 ord-r-8'>
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
                </div> */}
                <div className='flex-center mt-100 flex-1'></div>
                {/* <div className='flex-center  flex-1'>
                </div>
                <div className='flex-center   flex-1'>
                    <LandingButtons />
                </div> */}
                
            </div>
        </div>
        )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>Agreements | DCOY</title></Head>
        <InventoryProvider>
            <SidebarContainer sidebar={<FilterSidebar online={true}/>}>
                {page}
            </SidebarContainer>
        </InventoryProvider>
    </Layout>
    )
}

export default Page

