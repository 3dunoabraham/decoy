import { useMemo, useRef, useState } from "react"


import ItemsTable from "@/src/items/molecules/table/ItemsTable"
import _localJson from '@/localJson.json'
import { useIsClient, useLocalStorage } from "usehooks-ts"
import JSONFullCrudForm from "@/src/items/organisms/JSONFullCrudForm"

export default function Component ({keyName, queriedObj, keyConfig, q__queriedObj, deleteUnit }) {
    const $jsonCrudForm:any = useRef()
    const DEFAULT_DB = {[keyName]:[]}
    const [LS_crud, s__LS_crud] = useLocalStorage('crud', JSON.stringify(DEFAULT_DB) )
    const localJson:any = _localJson
    const theJsonArray = JSON.parse(LS_crud)[keyName]
    const [selectedItemIndex, s__selectedItemIndex] = useState(-1)
    const isClient = useIsClient()
    const tableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Label",fieldName:"label"},
        },
    }
    const compactTableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Label",fieldName:"label"},
            col2:{title:"V2",fieldName:"colVal",widget:"keys"},
        },
    }
    const nestedTableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Label",fieldName:"label"},
            col2:{title:"Title",fieldName:"title"},
        },
    }
    const updateSelectedColName = (colName) => {
        $jsonCrudForm.current.s__form({...$jsonCrudForm.current.form,...{colName: colName}})
    }
    const updateSelectedArray = (id) => {
        let foundItemArray = queriedObj[keyName].findIndex((x,i) => {return x.id == id})
        s__selectedItemIndex(foundItemArray)
        $jsonCrudForm.current.s__form({...$jsonCrudForm.current.form,...{id: id}})        
    }



    return (<>
    <div className="flex-col flex-1 w-100 flex-align-stretch">
        <div className="flex flex-align-end">
            <h2 className=" tx-bold-5 flex-1 ">
                JSON CRUD  
            </h2>                        
            <div className=" tx-bold-3 opaci-50 tx-end tx-sm w-max-250px flex-col flex-align-end">
                <div className=" tx-bold-6 opaci-75 tx-sm"> {keyConfig[keyName].baseUrl}</div>
            </div>
        </div>
        <hr className="my-2"/>
        {!(keyName in queriedObj) && <div className='tx-xl opaci-10'> KEY NOT FOUND </div> }
        {keyName in queriedObj &&
            <ItemsTable  displayConfigObj={tableConfigObj} boolConfig={["isActionable", "isSelectable", "isCompact"]} 
                updateSelectedArray={updateSelectedArray}
                actionCard={(id)=>(
                    <button className={`ims-button-faded  tx-green block `}
                        onClick={async (evt)=>{
                            console.log("id, evt",id,evt)
                            deleteUnit(id)
                        }}
                    >
                        <span className="">Delete Unit</span>
                    </button>
                )}
                theArray={localJson[keyName]} urlBase="/user/" 
            /> 
        }                    
    </div>
    {isClient && 
        <div className="flex-col flex-1 w-100 flex-align-stretch">
            {/* <div className="flex flex-align-end gap-2">
                <h2 className=" tx-bold-5 flex-1 "> JSON</h2>
                <div className=" tx-bold-3 opaci-50 tx-sm w-max-300px"> Hardcoded JSON file inside project files</div>
            </div>
            <hr className="my-2"/>
            {isClient && keyName in localJson &&
                <ItemsTable  displayConfigObj={compactTableConfigObj} boolConfig={["isCompact","isSelectable"]}
                    
                    updateSelectedArray={updateSelectedArray}
                    theArray={localJson[keyName]} urlBase="/user/"  deleteUnit={(id)=>{alert("delete from json: "+id)}} 
                />
            } */}
            
            {/* {keyName in localJson && selectedItemIndex > -1 && <>
                <div className="tx-lg tx-bold-5 mb-1 mt-6">Item: {localJson[keyName][selectedItemIndex].label}</div>
                <hr className="my-2"/>
                {!localJson[keyName][selectedItemIndex].colVal && 
                    <div className="flex opaci-25 mb-8">
                        No nested value
                    </div>
                }
                {!!localJson[keyName][selectedItemIndex].colVal && 
                    <ItemsTable  displayConfigObj={nestedTableConfigObj} boolConfig={["isCompact"]}
                        updateSelectedArray={updateSelectedArray}
                        theArray={
                            Object.keys(JSON.parse(localJson[keyName][selectedItemIndex].colVal))
                                .map((x,i)=>({id:i,label:x,title:JSON.parse(localJson[keyName][selectedItemIndex].colVal)[x]}))
                        } 
                        urlBase="/user/"  deleteUnit={(id)=>{alert("delete from json: "+id)}} 
                    />
                }
                {!!localJson[keyName][selectedItemIndex].colVal &&
                    <div className="flex gap-1 ma-2">
                        {Object.keys(JSON.parse(localJson[keyName][selectedItemIndex].colVal)).map((anItem, index) => {
                            return (
                                <div className="px-2 py-1 bg-b-20 ord-r-8 opaci-chov--50" key={index}
                                    onClick={()=>{updateSelectedColName(anItem)}}
                                >
                                    {anItem}
                                </div>
                            )
                        })}
                    </div>
                }
            </>} */}

            {/* <hr className="my-2"/> */}

            <div className="flex Q_xs_lg_flex-col gap-1 my-2">
                    <JSONFullCrudForm {...{ theUrl:keyConfig[keyName].baseUrl, q__queriedObj, 
                        masterKeyName: keyName, backup: theJsonArray, queriedArray: queriedObj[keyName]
                    }} ref={$jsonCrudForm} />
            </div>
            {theJsonArray && theJsonArray.length > 0 && <div className=" opaci-50 tx-end"> *Backup from Local Storage </div> }
        </div>
    }
    
    </>)
}

