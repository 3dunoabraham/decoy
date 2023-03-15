import { ReactElement, Suspense, useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useIsClient, useMediaQuery } from 'usehooks-ts'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import SessionSidebar from "@/src/items/templates/SessionSidebar";
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import ItemsTable from '@/src/items/molecules/table/ItemsTable'
import { AppContext } from '@/scripts/contexts/AppContext'
import _localJson from '@/localJson.json'
import InputItemsPPage from '@/src/items/atoms/inputs/InputItemsPP'
import BoxContainer from '@/src/items/3d/BoxContainer'
import { OFFLINE_UNITS_ARRAY } from '@/scripts/constants/inventory'
import { API_UNITS } from '@/scripts/constants/api'
import FeetInchesLabel from '@/src/items/templates/FeetInchesLabel'
import Link from 'next/link'
import { BsDownload, BsEye, BsGear } from 'react-icons/bs'

const Page: NextPageWithLayout & any = ({ data, nextauthenv }) => {
    const app = useContext(AppContext)
    const inv = useContext(InventoryContext)
    const $boxContainer:any = useRef()

    const [selectedItemIndex, s__selectedItemIndex] = useState(-1)
    const updateSelectedArray = (id) => {
        let foundItemArray = unitsArray.findIndex((x,i) => {return x.uid == id})
        s__selectedItemIndex(foundItemArray)
        let theUnit = unitsArray[foundItemArray]
        $boxContainer.current.resize(theUnit.size)        
    }
    const matches = useMediaQuery('(min-width: 1437px)')
    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitsArray'], refetchOnWindowFocus: false, retry: 1,
        queryFn: async () =>{
            if (!app.online) { return OFFLINE_UNITS_ARRAY }
            let theUrl = API_UNITS
            let theRequest = await fetch(theUrl);
            let theJsonResult = await theRequest.json()
            console.log("theJsonResult",theJsonResult)

            let filteredUnits = theJsonResult.Units.filter((aUnit,index) => {
                if (!aUnit.size) { return false }
                if (!aUnit.size.width && !aUnit.size.length && !aUnit.size.height ) { return false }
                if (!aUnit.size.width.feet && !aUnit.size.length.feet && !aUnit.size.height.feet ) { return false }
                return true
            })

            return filteredUnits
        }
    },[])    
    const keyName = "hitch_type"
    const baseUrls = {[keyName]:'/api/crud'}
    const [q__queriedObj, queriedObj] = useQueryPlus({ queryKey: ['unitData'], retry: 1,
        refetchOnWindowFocus: false,
        queryFn: async () =>{
            const theList = await fetch(baseUrls[keyName])
            if (!theList) throw new Error()
            return (await theList.json())
        }
    },{[keyName]:[]})
    const shopConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Title",fieldName:"title"},
            col2:{title:"Label",fieldName:"label"},
        },
    }
    const isClient = useIsClient()
    useEffect(()=>{
        console.log("data.products", data.products)
        if (q__queriedObj.isLoading || q__queriedObj.isError) return
        inv.s__unitsArray(Object.keys(queriedObj).map((x,i)=>({id:i,label:x})))
    },[q__queriedObj.isLoading]) 

    const matchestableConfigObj = {
        key:{title:"UID",name:"uid"},
        rest:{
            vin:{title:"VIN",fieldName:"vin"},
            status:{title:"Status",fieldName:"sales_status",widget:"badge"},
            location:{title:"Location",fieldName:"location"},
            dealer:{title:"Dealer",fieldName:"dealer"},
        },
    }    
    const tableConfigObj = {
        key:{title:"UID",name:"uid"},
        rest:{
            status:{title:"Status",fieldName:"sales_status",widget:"badge"},
        },
    }    
    return (
    <div className='flex-col  w-100 h-min-100vh flex-align-stretch '>
        <div className=" w-100 px-8 Q_xs_sm_px-2 mb-100">
            <BreadCrumbs pages={[["/builder/3d","3D Builder"]]} />


            <div className="flex-col flex-align-stretch gap-3 pos-rel">                
            {/* <div className="flex-row flex-align-stretch flex-row Q_xs_lg_flex-col gap-3 pos-rel">                 */}
                <div className=' pos-abs right-0 top-0 flex-col gap-2'>
                    <button className='px-2 py-1 opaci-chov--50 bg-b-10 bord-r-8 tx-lg'><BsGear/></button>
                    <button className='px-2 py-1 opaci-chov--50 bg-b-10 bord-r-8 tx-lg'><BsEye/></button>
                    <button className='px-2 py-1 opaci-chov--50 bg-b-10 bord-r-8 tx-lg'><BsDownload/></button>
                </div>
                <Suspense>
                    <div className="flex-1 h-max-700px pos-rel  w-95  flex" id="root">
                        <BoxContainer ref={$boxContainer} />
                        {selectedItemIndex >= 0 &&
                            <div className="pos-abs flex div top-0 right-0 flex pa-1 box-shadow-i-1-bl bord-r-8">
                                <div className="flex-col pa-1 ">
                                    <Link target={"_blank"} href={`/unit/${unitsArray[selectedItemIndex][matchestableConfigObj.key.name]}`}
                                        className="tx-ls-1 opaci-75"
                                    >
                                        #{unitsArray[selectedItemIndex][matchestableConfigObj.key.name]}
                                    </Link>
                                    <div className="flex-col pa-1 ma-1 bord-r-8 bg-b-10 box-shadow-3 bord-r-8">
                                        <FeetInchesLabel size={unitsArray[selectedItemIndex].size} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>          
                </Suspense>

                <div className="flex-col flex-align-stretch flex-1">
                    <div className="flex flex-align-end">
                        <div className="tx-lgx tx-bold-5 flex-1 "> Sizeable Inventory </div>
                    </div>
                    <hr className="my-2"/>
                    {q__unitsArray.isLoading && isClient && <>
                        <div className='opaci-50 hover-4 my-4'>loading units . . .</div>
                    </>}
                    {unitsArray.length > 0 && isClient && <>
                            <ItemsTable  displayConfigObj={matches ? tableConfigObj : matchestableConfigObj } 
                                theArray={unitsArray} urlBase="/user/"    
                                updateSelectedArray={updateSelectedArray} boolConfig={["isSelectable"]}
                            />
                    </>}
                    
                    {isClient && <> <InputItemsPPage /> </>}
                </div>

            </div>

        </div>

        <div className='flex-1'>
        </div>
    </div>
    )
}
Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <InventoryProvider>
                <Head><title>3D Builder | IMS</title></Head>
                <SidebarContainer sidebar={<SessionSidebar/>}>{page}</SidebarContainer>
            </InventoryProvider>
        </Layout>
    )
}
export default Page
export const getServerSideProps = async (context) => {
    let spaRes:any = {datas:{products:[]}}
    return { props: { data: spaRes.datas, }, };
};