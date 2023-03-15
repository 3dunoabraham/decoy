import { useMemo, useState } from "react";
import { BsCollection, BsFileEarmark, BsPencilSquare } from "react-icons/bs";


import Modal from "@/src/items/atoms/common/Modal";
import { DocumentsCRUD } from "@/src/partials/unit/DocumentsCRUD";
import { NotesCRUD } from "@/src/partials/unit/NotesCRUD";
import { LogsCRUD } from "@/src/partials/unit/LogsCRUD";
// ReactFunctionComponent
export const UnitModalsSection = ({
    unit, editMode,
    fileArrayMap, notesArray,logsArray,
    refetch,    
})=>{
    const [logsModal, s__logsModal] = useState(false);
    const [notesModal, s__notesModal] = useState(false);
    const [docsModal, s__docsModal] = useState(false);
    const notes = useMemo(()=>(
        notesArray.map((aNote,index)=>{
            return {
                id: aNote.id,
                author: aNote.created_by == "1" ? "John Doe" : "<Author>",
                date: aNote.created_at,
                message: aNote.text,
            }
        })
    ),[notesArray])
    const logs = useMemo(()=>(
        logsArray.map((aLog,index)=>(
            {id: aLog.id,message: "a log "+index,author: "Joe Doe",date: "0000-00-00"}
        ))
    ),[logsArray])
    

    
    /****** HTML ******/
    return(<>
    <div className="flex-wrap">
        {!editMode && <>
            <button onClick={()=>{s__logsModal(!logsModal)}} className="pa-1 tx-smd tx-bold-6">
                <div className=" ims-tx-faded  opaci-hov-75 pa-1 flex-center flex-row Q_xs_flex-col">
                    <BsCollection className="ml-2 tx-mdl " />
                    <div className="px-1">
                        <span>History</span>
                        <span className="pl-1">({logs.length})</span>
                    </div>
                </div>
            </button>
            <button onClick={()=>{s__docsModal(!docsModal)}} className="pa-1 tx-smd tx-bold-6">
                <div className=" ims-tx-faded  opaci-hov-75 pa-1 flex-center flex-row Q_xs_flex-col">
                    <BsFileEarmark className="ml-2 tx-mdl " />
                    <div className="px-1">
                        <span>Documents</span>
                        <span className="pl-1">
                            ({(!unit.docs || unit.docs == "[]") ? 0 : unit.docs.split(",").length})
                        </span>
                    </div>
                </div>
            </button>
            <button onClick={()=>{s__notesModal(!notesModal)}} className="pa-1 tx-smd tx-bold-6">
                <div className=" ims-tx-faded  opaci-hov-75 pa-1 flex-center flex-row Q_xs_flex-col">
                    <BsPencilSquare className="ml-2 tx-mdl " />
                    <div className="px-1">
                        <span>Notes</span>
                        <span className="pl-1">({notes.length})</span>
                    </div>
                </div>
            </button>
        </>}
    </div>
    <div>
        {docsModal &&
            <Modal subtitle="Upload, remove and view files accompanying this trailer" 
                title="Documents" handleClose={()=>{s__docsModal(!docsModal)}}
            >
                <DocumentsCRUD unit={{uid:unit.uid}} fileArrayMap={fileArrayMap} refetch={refetch}/>
            </Modal>
        }
        {notesModal &&
            <Modal title="Notes" subtitle="Add Comments" 
                handleClose={()=>{s__notesModal(!notesModal)}}
            >
                <NotesCRUD unit={{uid:unit.uid}} {...{notes}} refetch={refetch} />
            </Modal>
        }
        {logsModal &&
            <Modal title="Logs" subtitle="Add Logs" handleClose={()=>{s__logsModal(!logsModal)}}>
                <LogsCRUD unit={{uid:unit.uid}} {...{logs}} refetch={refetch} />
            </Modal>
        }
    </div>
</>)
}