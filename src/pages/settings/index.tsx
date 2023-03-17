import { ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import Link from 'next/link'
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper'
import { API_UNITS } from '@/scripts/constants/api'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import SessionSidebar from '@/src/items/templates/SessionSidebar'
import { AppContext } from '@/scripts/contexts/AppContext'
import _localJson from '@/localSettings.json'
import __localJson from '@/localJson.json'
import { useIsClient } from 'usehooks-ts'

const Page: NextPageWithLayout = () => {
    const app = useContext(AppContext)
    const inv = useContext(InventoryContext)
    const [isQuickAdd, s__isQuickAdd] = useState(false)
    const [isConfigEdit, s__isConfigEdit] = useState(true)
    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitData'], 
        queryFn: async () =>{
            const theList = await fetchJsonArray(API_UNITS, "Units")
            // inv.s__unitsArray(theList)
            return theList
        }
    },[])
    const isClient = useIsClient()
    const keyName = "inventory_page_table-config"
    const inventoryTableConfig = useMemo(() => {
        return keyName in _localJson ? _localJson[keyName] : null
    }, [isClient, keyName, _localJson])

    const FETCH_CONFIG = {
        sales_status: 
        {
            key: "sales_status",
            title: "Sales Status",
            label: "Sales Status",
            plural: "sales_statuses",
            apiUrl: "",
            nestedProp: "",
            isRequestForced: false,
        },
        dealer: 
        {
            key: "dealer",
            title: "Dealers",
            label: "Dealers",
            plural: "dealers",
            apiUrl: "",
            nestedProp: "",
            isRequestForced: true,
        },
    }
    useEffect(()=>{
        // inv.s__unitsArray([])
        // console.log(inv)
        app.s__sidebarLinks([])
        app.s__sidebarPages([
            {id:0,label:"Inventory",url:"/inventory/",icon:"inventory"},
            // {id:1,label:"Users",url:"/users/",icon:"users"},
            // {id:2,label:"3D Builder",url:"/builder/3d/",icon:"builder3d"},
        ])
    },[])

    return (
    <div className='flex-center w-100 h-min-100vh'>
        <div className="h-min-100vh w-100 px-8 Q_xs_sm_px-2">
            <BreadCrumbs pages={[["/inventory","Inventory"]]} />

            <div className="flex-center">
                <h1 className="pt-6 tx-bold-5 flex-1 "> Foreigns</h1>
            </div>
            <hr className="my-2"/>
            
            <div className='flex-wrap gap-1 flex-justify-start'>
                {/* <div>
                    {Object.keys(__localJson).join(", ")}
                </div> */}
                {Object.keys(__localJson).map((aForeign, index) => {
                    return (
                        <div key={index}>
                            <div className="px-2 py-1 ord-r-8 flex opaci-chov--50 tx-lg bg-b-10"><Link href={`/foreigns/${aForeign}`}>{aForeign}</Link> </div>
                        </div>
                    )
                })}
                
            </div>
            
            <br className="my-8"/>
            
            {/* <div className="flex-center">
                <h1 className="pt-6 tx-bold-5 flex-1 "> Inventory</h1>
                
                <Dropdown buttonTitle={". . ."}>
                    <div className="flex-col flex-align-stretch gap-1">
                        <Link  href="/unit/add" className="ims-button-primary clickble nowrap">
                            + New Unit
                        </Link>
                        <button className="ims-button-primary clickble nowrap opaci-50 mt-2"
                            onClick={()=>{s__isQuickAdd(!isQuickAdd)}}
                        >
                            New Quick Unit
                        </button>
                        <button className="ims-button-faded clickble nowrap   "
                            onClick={()=>{s__isConfigEdit(!isConfigEdit)}}
                        >
                            Config
                        </button>
                    </div>
                </Dropdown>
            </div> */}

            
            <div className="flex-center">
                <h1 className="pt-6 tx-bold-5 flex-1 "> Units Settings</h1>
            </div>
            <hr className="my-2"/>
            <div className="flex-center mb-2">
                <h2 className=" opaci-50 tx-bold-5 flex-1  "> Inventory Table</h2>
            </div>
            <div className='flex-col flex-align-start'>
                <div className='flex gap-2'>
                    {/* {JSON.stringify(inventoryTableConfig[0])} */}
                    <div> <b>Identifier</b>: {JSON.parse(inventoryTableConfig[0].colVal).name}</div>
                    <div> <b>ID Title</b>: {JSON.parse(inventoryTableConfig[0].colVal).title}</div>
                </div>
                <div>
                    <b>Columns</b>: {Object.keys(JSON.parse(inventoryTableConfig[1].colVal)).join(", ")}
                </div>
            </div>
            <div className='flex'>
                {isConfigEdit &&
                    <div className='w-100 y-2'>
                        
                        <div className="flex-col gap-3  flex-align-stretch ">
                            <div className="flex-col gap-3  flex-align-stretch ">
                            </div>
                        </div>
                    </div>
                }
            </div>
            <br className="my-2"/>
            <div className="flex-center mb-2">
                <h2 className="opaci-50  tx-bold-5 flex-1  "> Unit View/Edit</h2>
            </div>
        </div>
    </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>Settings | DCOY</title></Head>
        <InventoryProvider>
            <SidebarContainer sidebar={<SessionSidebar/>}>
                {page}
            </SidebarContainer>
        </InventoryProvider>
    </Layout>
    )
}

export default Page