import { useContext, useEffect, useRef, useState } from "react"
import { useMap } from "usehooks-ts"
import { BsTrash } from "react-icons/bs"


import { API_NOTES } from "@/scripts/constants/api"
import { fetchDelete, fetchPost } from "@/scripts/helpers/fetchHelper"
import { AppContext } from "@/scripts/contexts/AppContext"
// ReactFunctionComponent
export const LogsCRUD = ({
    unit,
    refetch=(deps=[])=>{},
    logs,
})=>{
    /****** DATA ******/
    const app = useContext(AppContext)
    const messagesEndRef:any = useRef()
    const DEFAULT_LOAD_ARRAY:any = [["delete",false],["deleteid",""],["create",false],["update",false]]
    
    const [loadMap,loadMap__do] = useMap<string,any>(DEFAULT_LOAD_ARRAY)
    const [theMessage,s__theMessage] = useState("")
    const [uploadingComment,s__uploadingComment] = useState(false)
    const [counter,s__counter] = useState(0)
    const inputRef = useRef(null)

    /****** UPDATE ******/
    const updateMessage = (e)=>{
        s__theMessage(e.target.value)
        let _val = e.target.value
        if (_val.length < 2) return
    }
    const removeNote = (id)=>{ sendDeleteRequest(id) }
    const sendDeleteRequest = async (id)=>{
        loadMap__do.set("deleteid",id)
        app.alertReset()
        let fetchDeleteRes = await fetchDelete(API_NOTES, {logs_ids:[id]})
        if (!fetchDeleteRes) return
        if (fetchDeleteRes.status == 400) return app.alert("error","Request error")

        app.alert("success","Deleted")
        loadMap__do.set("deleteid","")
        refetch(["logs"])
    }
    const scrollToBottom = ()=>{ messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }
    // useEffect(()=>{
    //     s__counter(counter+1)
    //     if (counter < 1) return
    //     scrollToBottom()
    // }, [logs]);
    const addNote = async (author)=>{
        // alert()
        
        app.alertReset()
        if (!theMessage) return 
        if (!author) return
        if (loadMap.get("create")) return
        loadMap__do.set("create",true)

        let fetchPostRes = await fetchPost(`${API_NOTES}${unit.uid}/`,{text:theMessage})
        if (!fetchPostRes)
        {
            loadMap__do.set("create",false)
            app.alert("error", "Network error")
            return
        }

        loadMap__do.set("create",false)
        s__theMessage("")
        app.alert("success","Saved")
        await refetch(["logs"])
        
    }


    /****** HTML ******/
    return (<>
    <div className="flex-col ">
        <div className="bord-r-8  w-100  h-max-300px autoverflow " >
            {logs.map((aNote, index)=>{
                return (
                <div key={index} className="pb-5  px-2 ims-bg-faded-odd bord-r-8">
                    <div className="flex ims-tx-primary flex-align-end">
                        <div className="tx-bold-6 pb-1 pt-2">{aNote.author}</div>
                        <div className="px-1 tx-sm opaci-75 pb-1 pt-2">on</div>
                        <div className="tx-sm opaci-75 pb-1 pt-2 flex-1">{aNote.date}</div>
                        {loadMap.get("deleteid") == aNote.id && <div className="pr-4">
                            <div className="spin-1"> | </div>
                        </div>}
                        {loadMap.get("deleteid") != aNote.id && 
                            <div className="px-2 opaci-25 opaci-chov-50 tx-lg"
                                onClick={()=>{removeNote(aNote.id)}}
                            >
                                <BsTrash/>
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
        {<div className="w-100 flex-col flex-align-end">
            {false && 
                <textarea value={theMessage} onChange={updateMessage}
                    className="w-100 bord-r-8 h-100px pa-1"
                    readOnly={loadMap.get("create")}
                    disabled={loadMap.get("create")}
                    ref={inputRef} 
                    placeholder="Enter a log"
                ></textarea>
            }
            <div onClick={() => !!theMessage && addNote("John Ayer")}
                className={`
                    px-3 py-2 flex mt-2  ims-bg-primary tx-white bord-r-8
                    ${!!theMessage ? "opaci-hov--50" : "opaci-25"}
                    ${loadMap.get("create") || !theMessage ? " stopcursor " : " clickble "}
                `}
            >
                {loadMap.get("create")  && 
                    <div className=" mr-3" >
                        <div className=" opaci-25 spin-1" > | </div>
                    </div>
                }
                <div className=" " > {loadMap.get("create") ? "Sending..." : "Log"} </div>
                
            </div>
        </div>}
    </div>
    </>)
}