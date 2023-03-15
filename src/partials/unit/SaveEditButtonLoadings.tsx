import { useMemo } from "react"
import { BsPencil } from "react-icons/bs"


// ReactFunctionComponent
export const UnitSaveEditButtonLoadings = ({
    editMode,isLoadingEditing,isLoadingRefetching,isLoader = true,isCancelable = true,
    refreshCount,    succesfulRequest,cancelEdit,handleTopBottomSave,blockIfEditing,
})=>{
    const isWaiting = useMemo(()=>((isLoadingEditing || isLoadingRefetching) && refreshCount>1)
    ,[isLoadingEditing, isLoadingRefetching, refreshCount])
    const isFinished = useMemo(()=>(!isLoadingEditing && refreshCount>1)
    ,[isLoadingEditing, refreshCount])
    
    return (<>
    <div className="flex-center">
        {isCancelable && editMode &&
            <div className=" ma-1  bord-r-8 bg-white ">
                <div onClick={cancelEdit} className="clickble ims-button-faded ">
                    Cancel
                </div>
            </div>
        }
        <div onClick={handleTopBottomSave} className={`bord-r-8 bg-white  ${blockIfEditing} ma-1 clickble`} >
            <div className={`ims-button-primary   ${editMode ? 'tx-bold-6':''} `}>
                {isCancelable && <div className="pr-2  pt-1"><BsPencil/></div>}
                {editMode ? "Save" : isLoadingEditing ? "Editing" : "Edit"}
            </div>
        </div>    
    </div>
    </>)
}