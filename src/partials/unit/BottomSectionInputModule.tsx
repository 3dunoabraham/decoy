import { useState, useMemo, useEffect } from 'react'
import { useMap } from 'usehooks-ts'


// import { dlog, dd } from '@/scripts/helpers/devHelper'
import { tenYearsAgoDateString, tenYearsFutureDateString } from '@/scripts/helpers/type/dateHelper'
import { validateFloat, validateInteger, validateBigint, validateStringLength
} from '@/scripts/helpers/validationHelper'
import { jssWSwitch } from '@/scripts/helpers/type/stringHelper'
import { InputSelect } from '@/src/items/atoms/inputs/InputSelect'
import { InputText } from '@/src/items/atoms/inputs/InputText'
import { InputDate } from '@/src/items/atoms/inputs/InputDate'
import { InputNEnum } from '@/src/items/atoms/inputs/InputNEnum'
import { OInputRadioSelect } from '@/src/items/atoms/inputs/OInputRadioSelect'
export interface BottomSectionInputModuleProps {
    uid: any; inputName: string; label: string; sublabel?: string; 
    inputsMapObj: any; optsObj?: any; values: any; flex?: any;
    needsFullObjectAtAPI?: boolean;  editMode?: boolean;
    updateNewData?: (arg:any) => void;
}
// ReactFunctionComponent
export const BottomSectionInputModule = ({
    uid, inputName, label, sublabel, inputsMapObj,
    values, optsObj = {}, flex = "wrap",
    needsFullObjectAtAPI = true, editMode, 
    updateNewData,
}: BottomSectionInputModuleProps)=>{
    /****** CREATE ******/
    useEffect(()=>{
        s__formObject({})
        if (typeof inputsMapObj == "undefined") {return }
        if (!inputsMapObj) {return }
        Object.keys(inputsMapObj).map((item, index)=>{
            const inputName = inputsMapObj[item].inputName ? inputsMapObj[item].inputName : item
            s__formObject(current => ({...current,...{[item]:""}}))
            if (!values[inputName]) return
                
            s__formObject(current => ({...current,...{[item]:values[inputName]}}))
            switch (inputsMapObj[item].customFormat)
            {
                case "price":
                    s__formObject(current => ({...current,
                        ...{[item]:parseFloat(values[inputName]).toFixed(2)}
                    }))
                    break;
            }
            // switch (inputsMapObj[item].widget)
            // {
            //     case "enum":
            //         s__formObject(current => ({...current,
            //             ...{[item]:(
            //                 values[inputName].includes(",")
            //                     ? values[inputName]
            //                     : values[inputName]
            //             )}
            //         }))
            //         break;
            // }
        })
    },[uid,values, inputsMapObj])



    /****** DATA ******/
    const wdsRefObj = {
        string: {
            refs: ["tiny","narrow","price","integer","entity",""], widths: [100,150,120,120,240,200],
        },
        color: {
            refs: ["tiny","narrow","price","integer","entity",""], widths: [100,150,120,120,240,200],
        },
        select: {
            refs: ["tiny","narrow","entity","intrange","enum",""], widths: [100,200,250,100,250,200],
        },
        radio: {
            refs: ["tiny","narrow","entity","intrange","","enum"], widths: [200,150,220,100,200,250]
        }
    }
    const [mapmapmap, mapmapmap_do] = useMap<string, any>()
    const inputsKeyList = useMemo(() => Object.keys(inputsMapObj).filter(i=>i!="_"),
    [inputsMapObj]);
    const realInputsKeyList = useMemo(() => inputsKeyList.filter(i=>!inputsMapObj[i].autogen) 
    , [inputsKeyList,inputsMapObj]);
    const [modifiedObject,s__modifiedObject] = useState({})
    const [formObject,s__formObject] = useState({})
    useEffect(()=>{ 
        for (let key in optsObj)
        {
            mapmapmap_do.set(key, new Map(optsObj[key].map(
            object => {return [`${object.id}`, object]; }))
        )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optsObj])



    /****** UPDATE ******/
    const handleUpdateNewData = (data)=>{
        const indexOf = Object.keys(inputsMapObj)
                        .filter(i=>(    !!inputsMapObj[i].inputName &&
                                        inputsMapObj[i].inputName == data.inputName))[0]
        let newFieldObj = !!indexOf ? {[inputsMapObj[indexOf].inputName]:`${data.value}`} : data
        let newDataObj = {...modifiedObject,...newFieldObj}
        s__modifiedObject(newDataObj)
        let valuesThatChanged = {...values}
        if (!needsFullObjectAtAPI)
        {
            for (const inputProp in values)
            {
                if (!newDataObj.hasOwnProperty(inputProp)) {delete valuesThatChanged[inputProp] }
            }
        }
        let newParsed = { inputName, value: {...valuesThatChanged,...newDataObj}}
        updateNewData(newParsed)
    }



    /****** HTML ******/
    return (editMode && <>
    <div className="flex w-100  Q_xs_md_flex-col">
        <div className="flex flex-1 w-max-400px pt-0 ">
            <div className="flex-1 flex-col flex-align-start w-20 tx-bold-5 tx-smd ims-tx-lightdark pr-4">
                <div className={`tx-mdl`}>{label}</div>
                {!!sublabel && <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div> }
            </div>
        </div>
        {<div className={`flex-3 flex-${flex} flex-align-start flex-justify-start w-100`}>
            {realInputsKeyList.map((key,index)=>{
                const theInputObj = inputsMapObj[key]
                const theFormat = theInputObj.customFormat
                const theWidget = theInputObj.widget

                return <div key={key+"edit"} className=" px-4 py-3 bord-r-8 ims-bg-hov-faded">
                    {theInputObj.title && theFormat != "radio" &&
                        <div className="pb-2 tx-bold-5 ims-tx-lightdark tx-smd">{theInputObj.title}</div>
                    }
                    {theWidget == "color" &&
                        <div className="w-max-250px">
                            <InputNEnum  inputName={theInputObj.inputName} display={""}                                
                                optMap={mapmapmap.has(key) ? mapmapmap.get(key) : new Map()}
                                value={formObject[key] || ""}
                                updateNewData={handleUpdateNewData} 
                            />
                        </div>
                    }
                    {theWidget == "string"
                      &&<div className={jssWSwitch(theFormat, wdsRefObj.string.refs, wdsRefObj.string.widths )}>
                            <InputText
                                inputName={theInputObj.inputName} updateNewData={handleUpdateNewData}
                                reference={formObject[key] || ""}
                                parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                    if (theFormat == "price")
                                    {   return validateFloat(newVal,prevVal,theInputObj.limit) }
                                    if (theFormat == "integer")
                                    { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                    if (theFormat == "bigint")
                                    { return validateBigint(newVal,prevVal,theInputObj.limit) }
                                    if (theFormat == "")
                                    { return validateStringLength(newVal,prevVal,theInputObj.limit) }
                                } : (x,y)=>x}
                            />
                        </div>
                    }
                    {theWidget == "date" &&
                        <InputDate inputName={theInputObj.inputName}
                            minDate={tenYearsAgoDateString} maxDate={tenYearsFutureDateString}
                            updateNewData={handleUpdateNewData} reference={formObject[key] || ""}  
                        />
                    }
                    {theWidget == "select" && theFormat != "radio" &&
                        <div className={
                            !theInputObj.customWidth
                                ? jssWSwitch(theFormat,wdsRefObj.select.refs, wdsRefObj.select.widths)
                                : `w-max-${theInputObj.customWidth}px`
                            }
                          >
                            <InputSelect
                                refId={formObject[key] || ""} inputName={theInputObj.inputName}
                                display={
                                    (theWidget != "enum"
                                        ? formObject[key] || ""
                                        : (
                                            !!mapmapmap.get(key) && mapmapmap.get(key).has(formObject[key])
                                            ? mapmapmap.get(key).get(formObject[key]).label
                                            : ""
                                        )
                                    )
                                }
                                boolConfig={[
                                    ...theInputObj.config,
                                    ...(theFormat != "intrange" &&
                                    theWidget != "enum"
                                            ? [" isErasable "]
                                            : [""]
                                    )
                                ]}
                                optMap={mapmapmap.has(key) ? mapmapmap.get(key) : new Map()} 
                                optName={theInputObj.optName}
                                updateNewData={handleUpdateNewData} 
                                parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                    if (theFormat == "intrange") {
                                        return validateInteger(newVal,prevVal,0,theInputObj.limit)
                                    }
                                } : (x,y)=>x}
                            />
                        </div>
                    }
                    {theWidget == "enum" && theFormat != "radio" &&
                        <div className={
                            !theInputObj.customWidth
                                ? jssWSwitch(theWidget,wdsRefObj.select.refs, wdsRefObj.select.widths)
                                : `w-max-${theInputObj.customWidth}px`
                            }
                          >
                            <InputSelect
                                inputName={theInputObj.inputName} refId={formObject[key] || ""}
                                display={
                                    !!mapmapmap.get(key) && mapmapmap.get(key).has(formObject[key])
                                        ? mapmapmap.get(key).get(formObject[key]).label
                                        : ""
                                }
                                boolConfig={theInputObj.config}
                                optMap={mapmapmap.has(key) ? mapmapmap.get(key) : new Map()} 
                                optName={theInputObj.optName}
                                updateNewData={handleUpdateNewData} 
                                parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                    if (theFormat == "intrange") {
                                        return validateInteger(newVal,prevVal,0,theInputObj.limit)
                                    }
                                } : (x,y)=>x}
                            />
                        </div>
                    }
                    {theWidget == "select" && theFormat == "radio"
                      &&<div className={
                            jssWSwitch(theFormat, wdsRefObj.color.refs, wdsRefObj.color.widths)
                        }>
                            <OInputRadioSelect refId={formObject[key] || ""} display={formObject[key] || ""}
                                valueObj={values} mapmapmap={mapmapmap} key={key} formObject={formObject}
                                theInputObj={theInputObj}  inputName={theInputObj.inputName}
                                optObj={optsObj}  optMap={new Map()} 
                                optName={theFormat == "entity" ? "name" : "label"}
                                boolConfig={[" isErasable "]}
                                parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                    if (theFormat == "intrange")
                                    { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                } : (x,y)=>x}
                                updateNewData={handleUpdateNewData} 
                            />
                        </div>
                    }
                </div>
            })}
        </div>}
    </div>
    </>)
}