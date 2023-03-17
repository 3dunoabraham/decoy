import ItemsTable from "@/src/items/molecules/table/ItemsTable"


export default function Component ({updateQueriedToLocalstorage, updateClientToLocalstorage, theJsonArray}) {
    const tableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Label",fieldName:"label"},
        },
    }

    return (
        <div className="flex-col  flex-align-stretch  ">
            <h2 className="pt-6 tx-bold-5 flex-1 opaci-50 Q_xs_md"> Local Storage</h2>
            <div className="tx-right  flex-1 opaci-50 Q_md_x">* Local Storage </div>
            <hr className="my-2 Q_xs_md"/>
            <ItemsTable  displayConfigObj={tableConfigObj} boolConfig={["isActionable", "isCompact"]}
                actionCard={(id)=>(
                    <button className={`ims-button-faded  tx-green  `}
                        onClick={async (evt)=>{console.log("id, evt",id,evt)}}
                    >
                        <span className="">Delete Unit</span>
                    </button>
                )}
                theArray={theJsonArray} urlBase="/user/"  
            /> 
            <div className="flex-col flex-justify-end my-2 gap-2">
                <div className="flex-center flex-align-self-end  gap-2">
                    <div className="bg-b-10 tx-center opaci-chov--50 pa-2 ord-r-8" onClick={()=>{updateClientToLocalstorage()}}>
                        Save to Local
                    </div>
                    <div className="ims-bg-primary tx-center opaci-chov--50 pa-2 ord-r-8 "
                        style={{filter:"hue-rotate(240deg) brightness(220%)"}}
                        onClick={()=>{updateQueriedToLocalstorage()}}
                    >
                        Queried to Local 
                    </div>
                </div>
            </div>
        </div>
    )
}