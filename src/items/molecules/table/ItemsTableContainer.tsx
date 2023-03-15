import { useContext, useMemo, useState } from "react"
import { useIsClient, useLocalStorage } from "usehooks-ts"


import { AppContext } from "@/scripts/contexts/AppContext"
import ItemsTable from "@/src/items/molecules/table/ItemsTable"
import ItemsTablePagination from "@/src/items/molecules/table/ItemsTablePagination"
import ExportItemsCSV from "@/src/items/molecules/table/ExportItemsCSV"
import InputItemsPPage from "@/src/items/atoms/inputs/InputItemsPP"

export default function Component({items, exportConfig, tableConfigObj, urlBase, actionCard, boolConfig }) {
    const app = useContext(AppContext)
    const isClient = useIsClient()
    const [LS_itemsPerPage, s__LS_itemsPerPage] = useLocalStorage('itemsPerPage', 25)
    const [itemsPerPage,s__itemsPerPage] = useState<number>(LS_itemsPerPage)
    const [currentPage,s__currentPage] = useState(0)
    const itemsOffsetStart = useMemo(()=>(currentPage * itemsPerPage),[currentPage, itemsPerPage])
    const [selectedId,s__selectedId] = useState(-1)
    const lastPage = useMemo(()=>{
        if (items.length < itemsPerPage) return 0
        return parseInt(`${Math.ceil((items.length / itemsPerPage) - 1)}`) 
    } ,[items, itemsPerPage])
    const paginatedItems = useMemo(()=>{
        let thePaginatedItems = items.slice(itemsOffsetStart,itemsOffsetStart+itemsPerPage)
        return thePaginatedItems // .sort(sortIDDesc)
    },[items,itemsOffsetStart,itemsPerPage])

    return (<>
        <ItemsTable 
            displayConfigObj={tableConfigObj}
            {...{s__selectedId,selectedId, urlBase}}
            theArray={paginatedItems} 
            actionCard={actionCard}
            boolConfig={boolConfig}
        />
        <ItemsTablePagination {...{currentPage,s__currentPage, lastPage}} />
        {isClient && <>
            <InputItemsPPage up__Value={s__itemsPerPage} />
            <div className="flex flex-justify-end mt-2 ">
                <ExportItemsCSV itemsArray={items} columnLookup={exportConfig.columns}
                    filename={exportConfig.filename} 
                />
            </div>
        </>}
    </>)
}