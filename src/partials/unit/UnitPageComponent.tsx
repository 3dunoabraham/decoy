import { useState, useMemo, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import { useMap } from 'usehooks-ts'
import { useEffectOnce } from 'usehooks-ts'


import { dd  } from '@/scripts/helpers/devHelper';
// import { DEFAULT_UNIT, IUnit } from '@/scripts/constants/unit'
import { IUnit, DEFAULT_DOC_CATEGORIES } from '@/scripts/constants/unit'
import { useUnloadHandler } from '@/scripts/helpers/useHooksHelper';
import { UnitTopSummary } from '@/src/partials/unit/TopSummary'
import { UnitMainForm } from '@/src/partials/unit/MainForm'
import { UnitTopForm } from '@/src/partials/unit/TopForm'
import { UnitBottomForm } from '@/src/partials/unit/BottomForm'
import { UnitModalsSection } from '@/src/partials/unit/ModalsSection';
import { UnitSaveEditButtonLoadings } from '@/src/partials/unit/SaveEditButtonLoadings';
import { API_UNIT_BASE } from '@/scripts/constants/api';
import { parseChangedDataObj, PostData } from '@/scripts/helpers/fetchHelper';
import { AppContext } from '@/scripts/contexts/AppContext';
import { unit2Form } from '@/scripts/helpers/type/unitHelper';
export interface UnitPageComponentProps {
    unit?: IUnit;
    optMapObj?: any; docsArray?: any; notesArray?: any;logsArray?: any;
    isLoadingRefetching?: any;editMode?: any;
    refetch?: (deps?) => void;s__editMode?: (deps?) => void;
}
// ReactFunctionComponent
export const UnitPageComponent = ({
    unit,
    optMapObj,docsArray, notesArray = [],logsArray = [],
    isLoadingRefetching,editMode,
    s__editMode=(deps)=>{},refetch=(deps=[])=>{},
  ...others
}: UnitPageComponentProps)=>{
    /****** CREATE ******/
    useEffectOnce(()=>{
        setRefreshCount(refreshCount+1)
    })



    /****** DATA ******/
    const app = useContext(AppContext);
    const [changedData, changedData_do] = useMap()
    const [notSaved,s__notSaved] = useState(false)
    const router = useRouter()
    const $mainDOMObj = useRef(null)
    const [isLoadingEditing, s__isLoadingEditing] = useState<boolean>(false);
    const [succesfulRequest, s__succesfulRequest] = useState<boolean>(true);
    const [refreshCount, setRefreshCount] = useState<number>(0)
    const fileArrayMap = useMemo(()=>{
        let theMap = new Map()
        DEFAULT_DOC_CATEGORIES.map((aCat, index)=>{ theMap.set(aCat,{}) })
        if (!docsArray){return theMap}
        docsArray.map((aDoc, index)=>{
            if (!DEFAULT_DOC_CATEGORIES[aDoc.category]) return
            let prevObj: Object = theMap.get(DEFAULT_DOC_CATEGORIES[aDoc.category])
            let newObj = {...prevObj,...{[aDoc.id]: {id: aDoc.id,file_name: `${aDoc.file_name}`}}}
            theMap.set(DEFAULT_DOC_CATEGORIES[aDoc.category], newObj)
        })
        return theMap
    },[docsArray])
    const blockIfEditing = useMemo(()=>{
        return editMode ? "Save" : isLoadingEditing ? "stopcursor" : ""
    },[isLoadingEditing,editMode])
    const customFormValues = useMemo(()=> (unit2Form(unit)), [unit]);



    /****** UPDATE ******/
    useUnloadHandler(router, notSaved,)
    const handleTopBottomSave = ()=>{
        if (isLoadingEditing) return 

        if (!editMode) return toggle_editMode()
        toggle_editMode()
    }
    const cancelEdit = async ()=>{
        s__notSaved(false); s__editMode(!editMode)
    }
    const updateNewData = (newDataObj)=>{
        s__notSaved(true);
        changedData_do.set(newDataObj.inputName, newDataObj.value)
    }
    const toggle_editMode = async ()=>{
        s__editMode(!editMode)
        if (!editMode)  return
        let the_url = `${API_UNIT_BASE}${unit.uid}/edit/`
        const changedFieldnames = Array.from(changedData.keys()).join(",")
        if (!changedFieldnames.length) { return }
            
        s__isLoadingEditing(true)

        let the_data = parseChangedDataObj(changedData)
        try {
            const res = await PostData(the_url, the_data, "PUT");
            setRefreshCount(refreshCount+1)
            if (res)
            {
                s__succesfulRequest(res.ok)
                await refetch()
                s__isLoadingEditing(false)
                changedData_do.reset()
                app.alert("success","Unit saved successfully!")
                s__notSaved(false)
            }
        } catch (err)    {
            s__succesfulRequest(false)
            s__isLoadingEditing(false)
            changedData_do.reset()
            app.alert("error","Unit not saved!")
            s__notSaved(false)
            dd(err)
            await refetch()
        }
    }



    /****** HTML ******/
    return(<>        
        <div className="flex-between Q_xs_md_flex-col">
            <div className="flex-col pt-3  ">
                <h1 className="tx-bold-5 ims-tx-dark flex ">
                    {`${editMode ? 'Edit' : 'Details'} - Trailer`}
                </h1>
            </div>

            <div className="flex Q_xs_md_flex-col">
                <UnitModalsSection unit={{uid:unit.uid,docs:unit.docs}} editMode={editMode}
                    fileArrayMap={fileArrayMap} notesArray={notesArray} logsArray={logsArray}
                    refetch={refetch}
                />
                <div className='pl-100 ml-6'></div>
            </div>
        </div>
        {<>
            <div className="flex pt-2 pb-3"> 
                {!editMode && <UnitTopSummary {...{unit}} />}
                {!!editMode && <UnitTopForm {...{unit,updateNewData}} />}
            </div>
            <hr/>
        </>}
        <div className="pt-8 mt-3 pos-rel" ref={$mainDOMObj}>
            <div className={`flex  mt-8 pt-8   mr-100  pos-fixed top-0 right-0 z-500 `} >
                <UnitSaveEditButtonLoadings editMode={editMode} refreshCount={refreshCount}
                    isLoadingEditing={isLoadingEditing} isLoadingRefetching={isLoadingRefetching} 
                    succesfulRequest={succesfulRequest} blockIfEditing={blockIfEditing} isCancelable={true} 
                    cancelEdit={cancelEdit} handleTopBottomSave={handleTopBottomSave}
                />
            </div>
            {<>
                <UnitMainForm refetch={refetch} editMode={editMode}  isAddPage={false} 
                    unit={unit} optMapObj={optMapObj} updateNewData={updateNewData}
                />
                <UnitBottomForm unit={unit} optMapObj={optMapObj} values={customFormValues}
                    updateNewData={updateNewData} editMode={editMode} 
                />
            </>}
            <div className='flex flex-justify-end'>
                <UnitSaveEditButtonLoadings  editMode={editMode}
                    isCancelable={true} isLoader={false} isLoadingEditing={isLoadingEditing}
                    isLoadingRefetching={isLoadingRefetching} refreshCount={refreshCount}
                    cancelEdit={cancelEdit} succesfulRequest={succesfulRequest}
                    blockIfEditing={blockIfEditing} handleTopBottomSave={handleTopBottomSave}
                    />
            </div>
        </div>
    </>)
}