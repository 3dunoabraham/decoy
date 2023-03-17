import { useContext, useEffect, useRef, useState } from "react"
import { BsTrash } from "react-icons/bs"


import { API_NOTES } from "@/scripts/constants/api"
import { fetchDelete, fetchPost } from "@/scripts/helpers/fetchHelper"
import { useMap } from "usehooks-ts"
import { AppContext } from "@/scripts/contexts/AppContext"
// ReactFunctionComponent
export const NotesCRUD = ({
    unit, notes,
    refetch=(deps=[])=>{},
})=>{
    /****** DATA ******/
    const app = useContext(AppContext);
    const messagesEndRef:any = useRef()
    const DEFAULT_LOAD_ARRAY:any = [["delete",false],["deleteid",""],["create",false],["update",false]]
    const [loadMap,loadMap__do] = useMap<string,any>(DEFAULT_LOAD_ARRAY)
    const [theMessage,s__theMessage] = useState("")
    const [counter,s__counter] = useState(0)
    const inputRef = useRef(null)



    /****** UPDATE ******/
    const onKeyDown = (evt)=>{ if (evt.keyCode === 13) { addNote() } }
    const updateMessage = (e)=>{ s__theMessage(e.target.value) }
    const removeNote = (id)=>{ sendDeleteRequest(id) }
    const scrollToBottom = ()=>{ messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }
    const sendDeleteRequest = async (id)=>{
        loadMap__do.set("deleteid",id)
        app.alert("neutral","Deleting note...")
        let fetchDeleteRes = await fetchDelete(API_NOTES, {notes_ids:[id]})
        if (!fetchDeleteRes) return
        if (fetchDeleteRes.status >= 400) return app.alert("error","Request error")

        app.alert("success","Note deleted successfully!")
        loadMap__do.set("deleteid","")
        refetch(["notes"])
    }
    // useEffect(()=>{
    //     s__counter(counter+1)
    //     if (counter < 1) return
    //     scrollToBottom()
    // }, [notes]);
    const addNote = async (author="John Doe")=>{
        app.alert("neutral", "Uploading note...")
        if (!theMessage) return 
        if (!author) return
        if (loadMap.get("create")) return
        loadMap__do.set("create",true)

        let fetchPostRes = await fetchPost(`${API_NOTES}${unit.uid}/`,{text:theMessage})
        if (!fetchPostRes){loadMap__do.set("create",false); return app.alert("error", "Network error")}

        loadMap__do.set("create",false)
        s__theMessage("")
        app.alert("success","Note uploaded successfully!")
        await refetch(["notes"])
    }



    /****** HTML ******/
    return (<>
    <div className="flex-col ">
        <div className="ord-r-8  w-100  h-max-300px autoverflow " >
            {notes.map((aNote, index)=>{
                const isMissingId = aNote.id == -1
                const isDeletingNote = loadMap.get("deleteid") == aNote.id
                return (
                <div key={index} className="pb-5  px-2 ims-bg-faded-odd ord-r-8">
                    <div className="flex ims-tx-primary flex-align-end">
                        <div className="tx-bold-6 pb-1 pt-2">{aNote.author}</div>
                        <div className="px-1 tx-sm opaci-75 pb-1 pt-2">on</div>
                        <div className="tx-sm opaci-75 pb-1 pt-2 flex-1">{aNote.date}</div>
                        {isDeletingNote &&<div className="pr-4"> <div className="spin-1"> | </div></div>}
                        {isMissingId && <div className="tx-red-50">noID</div>}
                        {!isDeletingNote && !isMissingId &&
                            <div className="opaci-25 opaci-chov-50" onClick={()=>{removeNote(aNote.id)}}>
                                <div className="px-2 tx-lg"><BsTrash/></div>
                            </div>
                        }
                    </div>
                    <div className="tx-sm ">{aNote.message}</div>
                </div>
                )
            })}
            <div ref={messagesEndRef} />
        </div>
        <hr className="w-100 my-2 "/>
        <div className="w-100 flex-col flex-align-end">
            <textarea value={theMessage}  ref={inputRef}  placeholder="Enter a note"
                className="w-100 ord-r-8 h-100px pa-1"
                onKeyDown={onKeyDown} onChange={updateMessage}
                readOnly={loadMap.get("create")} disabled={loadMap.get("create")}
            ></textarea>
            <div onClick={() => !!theMessage && addNote("John Doe")}
                className={`px-3 py-2 flex mt-2  ims-bg-primary tx-white ord-r-8
                    ${loadMap.get("create") || !theMessage ? "stopcursor opaci-25":"opaci-hov--50 clickble"}
                `}
            >
                {loadMap.get("create")  && 
                    <div className=" mr-3" ><div className=" opaci-25 spin-1" > | </div></div>
                }
                <div className=" " > {loadMap.get("create") ? "Sending..." : "Comment"} </div>
                
            </div>
        </div>
    </div>
    </>)
}