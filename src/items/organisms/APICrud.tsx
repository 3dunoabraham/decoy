import { AppContext } from "@/scripts/contexts/AppContext"
import { fetchDelete } from "@/scripts/helpers/fetchHelper"
import Link from "next/link"
import { useContext } from "react"
import ItemsTable from "@/src/items/molecules/table/ItemsTable"


export default function Component ({q__queriedObj, queriedObj, q__queriedAPI, queriedAPI, hardCoded1, keyName, saveAPIListToJson}) {
    const app = useContext(AppContext)
    
    const refreshAPIList = async ()=> {
        await q__queriedAPI.refetch()
        app.alert("success", "API List Refreshed")
    }
    const tableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Label",fieldName:"label"},
        },
    }
    
    const backupAPIToJson = async ()=> {
        const response = await fetchDelete(hardCoded1[keyName].baseUrl,{keyName,})
        await saveAPIListToJson()
        app.alert("success", "API backed-up successfully to JSON")
    }
    return (<>
        <div className="flex-col flex-1 -100 flex-align-start w-min-200px">
            <h2 className=" tx-bold-5 flex-1 ">
                API
                {!q__queriedObj.isLoading ? (q__queriedObj.isError ? ": error" : ": success") : "..."}
            </h2>
            <hr className="my-2 w-100"/>
            {q__queriedAPI.isFetching  &&  
                <div className="spin-20 w-100 my-5  tx-xl flex-center tx-center opaci-50">.
                    <div className="spin-3 tx-center opaci-50">. <div className="spin-2 tx-center opaci-50">.</div> </div>
                </div>
            }
            {!q__queriedAPI.isFetching  &&  
                <div className="flex-col w-100 flex-align-stretch ">
                    <ItemsTable  displayConfigObj={tableConfigObj} boolConfig={["isCompact"]}
                            headerStyle={{filter:"hue-rotate(60deg)",background:app.THEME.primaryColor,color:app.THEME.textColorLight}}
                        theArray={queriedAPI} urlBase="/user/"  
                    />
                </div>
            }
            <Link target="_blank" href={hardCoded1[keyName].apiUrl} className=" tx-bold-3 opaci-50 w-max-300px ma-1 tx-xsm"> {hardCoded1[keyName].apiUrl} </Link>
            
            <div className='flex-center gap-2'>
                <div className='flex-col pa-2 opaci-chov--50 bg-b-10 bord-r-5'
                    onClick={()=>{refreshAPIList()}}
                >
                    <div className='flex-col tx-xsm'>refresh</div>
                    <div className='flex-col tx-'>API</div>
                </div>
                <div className='pa-2 opaci-chov--50 bg-b-10 bord-r-5 flex-center tx- gap-1'
                    onClick={()=>{backupAPIToJson()}}
                    style={{filter:"hue-rotate(60deg)",background:app.THEME.primaryColor,color:app.THEME.textColorLight}}
                >
                    <div className='flex-col '>Backup</div>
                </div>
            </div>
        </div>
    </>)
}