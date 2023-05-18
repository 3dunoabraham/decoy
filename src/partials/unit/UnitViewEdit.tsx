// import { dd, dlog, isDevEnvironment } from '@/scripts/helpers/devHelper';
import Head from 'next/head'
import { useContext, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'


import { FooterLayout } from '@/src/items/templates/FooterLayout'
import { API_DOCS, API_NOTES } from '@/scripts/constants/api';
import { fetchJsonArray, fetchParsedUnit, parseNoteObj} from '@/scripts/helpers/fetchHelper';
import { DEFAULT_UNIT } from '@/scripts/constants/unit'
import { UnitPageComponent } from '@/src/partials/unit/UnitPageComponent'
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { ErrorBlock } from '@/src/items/atoms/holders/ErrorBlock'
import { PagePlaceholder } from '@/src/items/atoms/holders/PagePlaceholder'
import { AppContext } from '@/scripts/contexts/AppContext';
// ReactFunctionPageComponent
export default function UnitPage({
    // online, id, optMapObj,
    id, optMapObj,
}) {
    const app = useContext(AppContext)
    // const optMapObj = DEFAULT_UNIT_OPTS
    const online = true
    /****** DATA ******/
    // const router = useRouter()
    // const { id } = router.query
    const [editMode, s__editMode] = useState(false);
    const q_unit = useQuery({queryKey: ['unitData'],
        queryFn: async () => online ? await fetchParsedUnit(id) : DEFAULT_UNIT,        
    })
    const q_docs = useQuery({queryKey: ['docsData'],refetchOnWindowFocus: false,
        queryFn: async () => online ? await fetchJsonArray(API_DOCS, "Data") : [],
    })
    const q_logs = useQuery({queryKey: ['logsData'],refetchOnWindowFocus: false,
        queryFn: async () => online ? await fetchJsonArray(API_NOTES+id+"/", "Notes") : [],
    })
    const q_notes = useQuery({queryKey: ['notesData'],
        queryFn: async ()=>{
            if (!online) return []
            let notesArray = await fetchJsonArray(API_NOTES+id+"/", "Notes")
            let notesReference = await fetchJsonArray(API_NOTES, "Data")
            return notesArray.map((aNote,index)=>{
                let theParsedNote = parseNoteObj(aNote,index+1)
                let theIdNote = notesReference.filter((aNoteObj,secindex)=>(
                    aNoteObj.text == theParsedNote.text
                ))
                return  {...theParsedNote, ...{
                    id:theIdNote[0] ? theIdNote[0].id : -1
                }}
            })
        },
    })
    const localOptsReady = useMemo(()=>{
        if (q_docs.isLoading || q_docs.isLoading || !q_docs.data) { return false }
        if (q_logs.isLoading || q_logs.isLoading || !q_logs.data) { return false }
        if (q_notes.isLoading || q_notes.isLoading || !q_notes.data) { return false }
        return true
    },[q_docs,q_logs, q_notes])
    const qReady_unit = useMemo(()=>(!(q_unit.isLoading || q_unit.isLoading || !q_unit.data)),[q_unit])
    const q_obj:any = useMemo(()=>{
        if (!localOptsReady) return []
        if (!qReady_unit) return []
        
        return {
            docs:q_docs.data.filter((aDoc, index)=>q_unit.data.docs.includes(aDoc.id)),
            notes: q_notes.data,
            logs: q_logs.data,
        }
    },[q_docs,q_unit,q_notes,q_logs,localOptsReady, qReady_unit])
    
    

    /****** UPDATE ******/
    const refetchHandler = async (dependencies = [])=>{
        q_unit.refetch()
        if (dependencies.includes("docs")) { q_docs.refetch() }
        if (dependencies.includes("notes")) { q_notes.refetch() }
        if (dependencies.includes("logs")) { q_logs.refetch() }
    }



    /****** HTML ******/
    if (q_unit.isLoading || !optMapObj) {
        return (
        <div className={`ims-body-wide w-100`}>
            <div className="ims-body-inner">
                <BreadCrumbs pages={[["/inventory","Inventory"]]} current={`Detail`} />
                {/* <div className='opaci-50 hover-4 my-4'>loading details . . .</div> */}
                <div className='flex-center'>
                    <div className="flex spin-4   tx-xl  opaci-50">.
                        <div className="spin-3 tx-center opaci-50">. <div className="spin-2 tx-center opaci-50">.</div> </div>
                    </div>
                    <div className='pl-8 '>
                        <div className='tx-lgx'>#{id}</div>
                        <div className='opaci-50 tx-ls-3'>  Loading Details...</div>
                    </div>
                    <div className='flex-1'></div>
                </div>
                <div className='py-6'><PagePlaceholder /></div>
            </div>
        </div>
        )
    }
    if (q_unit.error) return ErrorBlock({err:q_unit.error})

    return (<>
    <Head> <title>{`${id} | tresduno`}</title> </Head>
    <div className={`ims-body-wide w-100 px-100 Q_xs_sm_px-2`}>
        <div className="ims-body-inner">
            <BreadCrumbs pages={[["/inventory","Inventory"]]} current={`Detail`} />

            <div className="Q_xs_md my-2 invisible block">.</div>
            {!q_unit.data && ErrorBlock({err:q_unit.error}) }
            {q_unit.data &&
                <UnitPageComponent refetch={refetchHandler} {...{editMode, s__editMode, optMapObj}}
                    unit={q_unit.data} docsArray={q_obj.docs} notesArray={q_obj.notes} logsArray={q_obj.logs}
                />
            }
        </div>
        <FooterLayout email={app.institution.email} 
            emailTitle={app.institution.titleSupport} copyright={app.institution.copyrights}
        />
    </div>
    </>)
}


