import { ChangeEvent, useState, useMemo, useRef, useEffect } from 'react'
import { useToggle, useOnClickOutside, useEventListener  } from 'usehooks-ts'
import { BsChevronDown, BsChevronUp, BsX, BsPlusLg } from 'react-icons/bs'


import { jss, isEqInLowerCase, isIncInLowerCase } from '@/scripts/helpers/type/stringHelper'
import CSS from '@/styles/modules/Select.module.css'
export interface InputSelectProps {
    refId?: string; inputName?: string; display?: string; 
    optName?: any; optMap: any;        
    /* CONFIG */ boolConfig?: any; editMode?: boolean; placeholder?: string;
    /* UPDATE */ updateNewData?: any; parseFunction?: any; 
}
// CORE ReactFunctionComponent
export const InputSelect = ({
    inputName, refId, display, optName, optMap, 
    boolConfig = [], placeholder,
    updateNewData,
    parseFunction = (x,y) => x,
}:InputSelectProps)=>{
    /****** CREATE ******/
    useEffect(()=>{
        s__theId(refId)
        s__displayValue(display == "None" ? "" : display)
    },[refId,display])



    /****** DATA ******/
    const $displayInput = useRef(null)
    const $domContainer = useRef(null)
    const [addNewMode, __toggle_addNewMode, s__addNewMode] = useToggle(false)
    const [isOpen, __toggle_isOpen, s__isOpen] = useToggle(false);
    const [displayValue, s__displayValue] = useState<string>('')
    const [theId, s__theId] = useState<string>('')
    const [descriptionInput, s__descriptionInput] = useState<string>('')
    const _boolConfig = useMemo(() =>(boolConfig.join(",")),[boolConfig])
    const isDisplayAndTypeMatching = useMemo(() =>{
        let theType = optMap.get(`${theId}`)
        if (!theType) return true
        return displayValue == theType[optName]
    } , [optMap,displayValue, theId,optName]); // DEPENDENCIES
    const FILTERED_optMap = useMemo(() =>{
        if (!optMap || !optMap.size) return []
        let theType = optMap.get(`${theId}`)
        if (theType && displayValue == theType[optName]) return optMap
        if (refId == displayValue) return optMap
        if (refId == "None") return optMap
        if (displayValue == "None") return optMap
        if (!_boolConfig.includes("isErasable")) return optMap
        return new Map(
            [...optMap].filter(([key, value]) =>
                {
                    if (!value[optName]) return true
                    if (typeof value[optName] == "string")
                    {
                        return isIncInLowerCase(`${value[optName]}`,`${displayValue}`)
                    }
                    return false
                }
            )
        )
    } , [optMap,displayValue, theId,optName,refId, _boolConfig]); // DEPENDENCIES
    const newDataObj = useMemo(()=>({
        label:displayValue,
        description:descriptionInput
    }), [displayValue, descriptionInput]); // DEPENDENCIES



    /****** UPDATE ******/
    const setNewSelection = (option)=>{
        s__theId(`${option.id}`); s__displayValue(option[optName])
        
        s__isOpen(false)
        let newUpdateObj = { inputName, value:`${option.id}`}
        updateNewData(newUpdateObj)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>)=>{
        s__displayValue(parseFunction(event.target.value,displayValue))

    }
    const handleClickOutside = ()=>{
        if (displayValue == "" && display != "None" && display != "")
        {
            setNewSelection({id:"",[optName]:""})
        }
        
        let theType = optMap.get(`${theId}`)
        if (isDisplayAndTypeMatching && display != "None" && display != "") return s__isOpen(false)
        if (!FILTERED_optMap.size) return s__isOpen(false)
        
        let _value = FILTERED_optMap.entries().next().value[1]
        if (!!_value[optName])
        {
            if (isEqInLowerCase(displayValue,_value[optName]))
            {
                setNewSelection(_value)
            }
        } 
        s__isOpen(false)
    }
    const clearInput = ()=>{
        s__displayValue(''); $displayInput.current.focus(); updateNewData({ inputName, value:``})
    }
    const handle_onkeypress = (e)=>{if (e.keyCode == 9) {handleClickOutside()} }
    useOnClickOutside($domContainer, handleClickOutside)
    useEventListener('keydown', handle_onkeypress, $displayInput)



    /****** HTML ******/
    return (
    <div className="pos-rel  w-100" ref={$domContainer}>
        <input type="text" defaultValue={theId} hidden />

        <div className={"flex  w-100  ims-tx-dark ims-border-faded ord-r-8"}>

            <input ref={$displayInput} value={displayValue}
                onClick={() => s__isOpen(true)} onChange={handleChange} 
                type="text" placeholder={placeholder}
                className={`py-2 tx-mdl block opaci-hov-75 noborder w-100 ml-1 clickble
                    ${_boolConfig.includes("isCompact") ? "px-1" : "px-4"}
                `}
                readOnly={_boolConfig.includes("isReadOnly")}
            />
            {_boolConfig.includes("isErasable") && isOpen &&
                <div onClick={clearInput} className="px-1 flex-center opaci-chov-50  tx-lg">
                <BsX />
            </div> }
            <div onClick={__toggle_isOpen} className="px-2 flex-center opaci-chov-75  ">
                {isOpen ? <BsChevronUp /> : <BsChevronDown />}
            </div>
        </div>

        {isOpen &&
            <div className={`_ddr ims-border-faded-shadow tx-mdl w-100 ${CSS["select_dropdown"]}`+(isOpen ? "" : "")} 
                style={{transform:"translateY(99%)", maxHeight: "320px", overflowY: "auto",}}
            >
                {(FILTERED_optMap.size == 0 || optMap.size == 0) && <>
                    <div className="opaci-50 pa-2 noclick">
                        N/A
                    </div>
                </>}
                {Array.from(FILTERED_optMap.entries()).map(([key, optField],index)=>(
                    <div key={index} className="ims-bg-hov-faded clickble "
                        onClick={()=>{setNewSelection(optField)}}
                    >
                        <div className="pa-3">
                            {optField[optName]}
                        </div>
                    </div>
                ))}
                {_boolConfig.includes("addMode") &&
                    <div className="bg-white  tx-md" >
                        {/*WIP:for when the user wants to add a new option on the fly*/}
                        <hr />
                        <div onClick={()=>{ __toggle_addNewMode() }}
                            className="opaci-chov--50 flex-center tx-bold-5 ims-tx-primary "
                        >
                            {!addNewMode
                                ? <>
                                    <small><BsPlusLg /></small>
                                    <span className="pa-3">Add New</span>
                                </>
                                : <>
                                    <span><BsX /></span>
                                    <span className="pa-3">Cancel</span>
                                </>
                            }
                        </div>
                    </div>
                }
            </div>
        }
    </div>
    )
}