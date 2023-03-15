import { useEffect, useState } from "react";
import { MapOrEntries, useLocalStorage, useMap } from "usehooks-ts";
import { InputSelect } from "@/src/items/atoms/inputs/InputSelect";

export default function Component({up__Value=(arg1)=>{}}) {
    const [LS_itemsPerPage, s__LS_itemsPerPage] = useLocalStorage('itemsPerPage', 25)
    const [itemsPerPage,s__itemsPerPage] = useState<number>(LS_itemsPerPage)
    
    const updateItemsPerPage = (newChangeObj)=> {
        if (!newChangeObj.value) return
        s__itemsPerPage(parseInt(`${newChangeObj.value}`))
        s__LS_itemsPerPage((prevValue: number) => parseInt(`${newChangeObj.value}`))
        up__Value(parseInt(`${newChangeObj.value}`))
    }
    const ITEMSPERPAGE_MAPARRAY:MapOrEntries<string, any> = (
        ["25", "50", "100", ].map(i => ([`${i}`,{label:`${i}`,id:`${i}`},]))
    )
    
    const [itemsPerPageMap, itemsPerPageMap_do] = useMap<string, any>(ITEMSPERPAGE_MAPARRAY)

    

    return (
        <div className="flex flex-justify-end mt-2 ">
            <div className="tx-sm flex-center pr-2 opaci-50"> Items Per Page </div>
            <div className="tx-sm w-100px scale-90 ">
                <InputSelect refId={`${itemsPerPage}`} display={`${itemsPerPage}`} optName="label" optMap={itemsPerPageMap} 
                    boolConfig={["isReadOnly"]} updateNewData={updateItemsPerPage}
                />
            </div>
        </div>
    )
}