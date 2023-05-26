import { ReactElement, useContext, useMemo, useState } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import InventoryPage from '@/src/partials/inventory/InventoryPage';
import FilterSidebar from "@/src/items/templates/FilterSidebar";
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import Link from 'next/link'
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { fetchJsonArray, fetchPut, parseChangedDataObj } from '@/scripts/helpers/fetchHelper'
import { API_UNITS, API_UNIT_BASE } from '@/scripts/constants/api'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { LoadingInventory } from '@/src/partials/inventory/LoadingInventory'
import Dropdown from '@/src/items/atoms/common/Dropdown'
import TableConfigJSONCRUD from "@/src/items/molecules/table/TableConfigJSONCRUD"
import LOCAL_SETTINGS_JSON from '@/localSettings.json'
import { UnitTopForm } from '@/src/partials/unit/TopForm'
import { useMap } from 'usehooks-ts'
import { AppContext } from '@/scripts/contexts/AppContext'

const Page: NextPageWithLayout = () => {
    const app = useContext(AppContext);
    const [selectedItem, s__selectedItem] = useState()
    const inv = useContext(InventoryContext)
    const [isQuickAdd, s__isQuickAdd] = useState(false)
    const [isConfigEdit, s__isConfigEdit] = useState(false)
    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitData'], 
        queryFn: async () =>{
            const theList = await fetchJsonArray(API_UNITS, "Units")
            inv.s__unitsArray(theList)
            return theList
        }
    },[])    
    const TABLE_SETTINGS_JSON:any = LOCAL_SETTINGS_JSON["inventory_page_table-config"]
    const defaultSettingsJson:any = {}
    Object.keys(TABLE_SETTINGS_JSON).map((aPro)=>{
        defaultSettingsJson[TABLE_SETTINGS_JSON[aPro].key] = JSON.parse(TABLE_SETTINGS_JSON[aPro].colVal)
    })
    const localSettings = useMemo(()=>{
        if (!defaultSettingsJson.rest) {
            return { key:{title:"id",name:"id"}, rest:{}, }
        }
        let theRestKeys = Object.keys(defaultSettingsJson.rest)
        let theRest:any = {}
        theRestKeys.map((restKey, index) => {
            theRest[restKey] = JSON.parse(defaultSettingsJson.rest[restKey])
        })
        return {
            key: defaultSettingsJson.key,
            rest: theRest
        }
    },[LOCAL_SETTINGS_JSON])
    const exportConfig = {
        filename: "inventory.csv",
        columns: {
            id: "ID",
            vin: "VIN",
            inventory_statuses: "Status",
            location: "Location",
            dealer: "Dealer"
        }
    }
    
    const [changedData, changedData_do] = useMap()
    const updateNewData = (newDataObj)=>{
        changedData_do.set(newDataObj.inputName, newDataObj.value)
    }

    const saveToAPI = async (unit)=>{
        // s__editMode(!editMode)
        // if (!editMode)  return

        let the_url = `${API_UNIT_BASE}${unit.uid}/edit/`
        const changedFieldnames = Array.from(changedData.keys()).join(",")
        if (!changedFieldnames.length) { return }
            
        // s__isLoadingEditing(true)

        let the_data = parseChangedDataObj(changedData)
        try {
            const res = await fetchPut(the_url, the_data);
        //     setRefreshCount(refreshCount+1)
            if (res)
            {
        //         s__succesfulRequest(res.ok)
        //         await refetch()
        //         s__isLoadingEditing(false)
                console.log("res", res)
                changedData_do.reset()
                app.alert("success","Unit saved successfully!")
                console.log("success",)
                s__selectedItem(null)
                //         s__notSaved(false)
                q__unitsArray.refetch()
            }
        } catch (err)    {
        //     s__succesfulRequest(false)
        //     s__isLoadingEditing(false)
            changedData_do.reset()
            app.alert("error","Unit not saved!")
        //     s__notSaved(false)
        //     dd(err)
        //     await refetch()
        }
    }

    return (
    <div className='flex-center w-100 h-min-100vh'>
        <div className="h-min-100vh w-100 px-8 Q_xs_sm_px-2">
            <BreadCrumbs pages={[["/strategy/a","Strategy"]]} current='A' />
            
            <div className="flex-center">
                <h1 className="pt-6 tx-bold-5 flex-1 "> Strategy A</h1>
                <div></div>
                <Dropdown buttonTitle={". . ."}>
                    <div className="flex-col flex-align-stretch gap-1">
                        <Link  href="/unit/add" className="ims-button-primary clickble nowrap">
                            + New Unit
                        </Link>
                        {/* <button className="ims-button-primary clickble nowrap opaci-75 mt-2"
                            onClick={()=>{s__isQuickAdd(!isQuickAdd)}}
                        >
                            New Quick Unit
                        </button>
                        <button className="ims-button-faded clickble nowrap   "
                            onClick={()=>{s__isConfigEdit(!isConfigEdit)}}
                        >
                            Config
                        </button> */}
                    </div>
                </Dropdown>
            </div>

            <hr className="my-2"/>

            <div className='flex'>
                {isQuickAdd && <>
                    <div className='w-100 py-2'>
                        add
                    </div>
                </> }
                {isConfigEdit &&
                    <div className='w-100 y-2'>
                        
                        <div className="flex-col gap-3  flex-align-stretch mb-2">
                            <div className="flex-col gap-3  flex-align-stretch ">
                                <TableConfigJSONCRUD  {...{ keyName: "inventory_page_table-config",}} />
                            </div>
                        </div>
                        
                    </div>
                }
            </div>
            {!!selectedItem && <>
                <div className="flex">
                    <div className="flex-1">
                        im selected: {selectedItem}
                    </div>
                    <div>
                        <div className='ims-button-faded' onClick={()=>{s__selectedItem(null)}}>Cancel</div>
                    </div>
                </div>
                <div className="flex ma-2">
                    <div>
                        <div className='ims-button-primary' onClick={()=>{saveToAPI(unitsArray.filter((theUnit, index) => { return theUnit.uid == selectedItem})[0])}}>Save</div>
                    </div>
                    <div className="flex-1">
                        <UnitTopForm unit={unitsArray.filter((theUnit, index) => { return theUnit.uid == selectedItem})[0]} updateNewData={updateNewData}  />
                    </div>
                </div>

            </>}

            {q__unitsArray.isLoading && <LoadingInventory /> }
            {unitsArray.length > 0 &&
                <InventoryPage unitsArray={unitsArray} tableConfigObj={localSettings} exportConfig={exportConfig}
                    {...{selectedItem, s__selectedItem}}
                />
            }
        </div>
    </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>Strategy A | webgamed</title></Head>
        <InventoryProvider>
            <SidebarContainer sidebar={<FilterSidebar/>}>
                {page}
            </SidebarContainer>
        </InventoryProvider>
    </Layout>
    )
}

export default Page