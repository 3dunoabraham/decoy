import { useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";


import { AppContext } from "@/scripts/contexts/AppContext";
import ItemsTableContainer from '@/src/items/molecules/table/ItemsTableContainer'
import { DEFAULT_UNIT_FOREIGNS, fetchDelete, fetchUnitForeigns, parsedFetchedUnit }
from "@/scripts/helpers/fetchHelper";
import { sortIDDesc } from "@/scripts/helpers/type/arrayHelper";
import { SidebarFilterToolbar } from "@/src/items/templates/SidebarFilterToolbar";
import { API_UNITS } from "@/scripts/constants/api";
import { DEFAULT_TOKENS_ARRAY } from "@/components/scripts/constants";
// import LOCAL_SETTINGS_JSON from '@/localSettings.json'

export default function Component({ unitsArray=[], fetchConfig=null, tableConfigObj, exportConfig, selectedItem, s__selectedItem }) {
    const app = useContext(AppContext)
    const q_foreigns = useQuery({queryKey: ['foreignsData'], queryFn: async () =>
        await fetchUnitForeigns()
    ,})
    const q__foreigns = useMemo(()=>
        (q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading)
            ? DEFAULT_UNIT_FOREIGNS : q_foreigns.data
    ,[q_foreigns])
    const pq__units = useMemo(()=>{
        return DEFAULT_TOKENS_ARRAY
        if (unitsArray.length == 0) return []
        let newUnitsArray= unitsArray.map((aUnit, index)=> (
            parsedFetchedUnit(aUnit, q__foreigns.orgsArray, q__foreigns.customersArray) 
        ))
        let filteredUnitsArray = newUnitsArray.filter((theUnit, index) => {
            if (app.filters.sales_status && theUnit.sales_status != app.filters.sales_status.id)
            { return false }
            if (app.filters.dealer && theUnit.dealer != app.filters.dealer.label) { return false }
            return true
        })
        return filteredUnitsArray.sort(sortIDDesc)
    },[unitsArray, q__foreigns, app.filters])
    const deleteUnit = async (id)=>{
        let fetchDeleteRes:any = await fetchDelete(API_UNITS, {uids:[id]})
        if (fetchDeleteRes && fetchDeleteRes.status >= 200 && fetchDeleteRes.status < 300)
        {
            app.alert("success","Deleted")
            window.location.reload()
        }
    }



    return (
    <>
        <SidebarFilterToolbar configObj={app.filters} />
        {pq__units.length == 0 && 
            <div className='tx-xl opaci-10 tx-ls-5 pt-100 pb-8 tx-center w-100 tx-center'>
                No Units Found
            </div>
        }
        {pq__units.length > 0 &&
            <div className="mt-4 mb-150 " >
                <ItemsTableContainer items={pq__units} exportConfig={exportConfig} 
                    tableConfigObj={tableConfigObj} urlBase="/token/"
                    boolConfig={["isActionable"]}
                    // boolConfig={[]}
                    // actionCard=null
                    actionCard={(id)=>(
                        <button className={`ims-button-faded  tx-green block `}
                            onClick={async (evt)=>{
                                console.log("id, evt",id,evt)
                                s__selectedItem(id)
                                // deleteUnit(id)
                            }}
                        >
                            <span className="">Quick Edit</span>
                        </button>
                    )}
                    // actionCard={(id)=>(
                    //     <button className={`ims-button-faded  tx-green block `}
                    //         onClick={async (evt)=>{
                    //             console.log("id, evt",id,evt)
                    //             deleteUnit(id)
                    //         }}
                    //     >
                    //         <span className="">Delete Unit</span>
                    //     </button>
                    // )}
                />
            </div>
        }
    </>
    )
}