import { useMemo } from 'react'
import { useEffectOnce, useMap, MapOrEntries } from 'usehooks-ts'


import { useDeviceXS_LG } from '@/scripts/helpers/useHooksHelper';
import { validateInteger } from '@/scripts/helpers/validationHelper'
import { InputSelect } from '@/src/items/atoms/inputs/InputSelect'
import CSS from '@/styles/modules/NMeasure.module.css'
export interface OInputNMeasureProps {
    inputName?: string;
    updateNewData?: any;
    sublabel?: string;
    label: string;
    // display?: string;
    value: string;
    editMode?: boolean;
    inputkeyobj: any; 
}
// ReactFunctionComponent
export const OInputNMeasure = ({
     inputName,
    updateNewData,
    sublabel,
    label,
    // display,
    value,
    editMode,
    inputkeyobj,
}: OInputNMeasureProps)=>{
    /****** CREATE ******/
    const DEFAULT_MEASURE = {width:{feet:0,inches:0},height:{feet:0,inches:0},length:{feet:0,inches:0}}
    useEffectOnce(()=>{
        let _value = typeof value == "string" ? JSON.parse(value) : value
        _value = _value || DEFAULT_MEASURE

        Object.keys(inputkeyobj).map((item, index)=>{
            extraDimensionToggler_do.set(item, !Object.values(_value[item])[0])
            inputkeyForm_do.set(item,
                _value
                    ? (_value[item]
                        ? Object.values(_value[item])
                        : [0,0])
                    : [0,0]) }
        )
    })



    /****** DATA ******/
    const display = useMemo(()=>{
        let __value = value || DEFAULT_MEASURE
        return __value
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [value]);
    const inputkeyArray:MapOrEntries<string, any> = useMemo(()=>{
        return (
            !inputkeyobj && !Object.keys(inputkeyobj).length
                ? []
                : Object.keys(inputkeyobj).map((item) => [item, inputkeyobj[item]])
        )
    } , [inputkeyobj]);
    const [inputkeyMap, inputkeyMap_do] = useMap(inputkeyArray);
    const [inputkeyForm, inputkeyForm_do] = useMap();
    const [extraDimensionToggler, extraDimensionToggler_do] = useMap()
    const measureArraySmall:any = Array.from(Array(13).keys()).map(
        i => ([`${i}`,{label:`${i}`,id:`${i}`}]
    ))
    const measureArrayMedium:any = Array.from(Array(61).keys()).map(
        i => ([`${i}`,{label:`${i}`,id:`${i}`}]
    ))
    const measureArrayLarge:any = Array.from(Array(1000).keys()).map(
        i => ([`${i}`,{label:`${i}`,id:`${i}`}]
    ))
    const [measureMapSmall, measureMapSmall_do] = useMap<string, any>(measureArraySmall)
    const [measureMapMedium, measureMapMedium_do] = useMap<string, any>(measureArrayMedium)
    const [measureMapLarge, measureMapLarge_do] = useMap<string, any>(measureArrayLarge)



    /****** UPDATE ******/
    const toggleExtraDimension = (_key)=>{

        let theFeetInputName = _key+":feet"
        let theInchesInputName = _key+":inches"
        local_updateNewData({ inputName: theFeetInputName, value: "" } )
        if (inputkeyForm.get(_key)[1] > 12 && extraDimensionToggler.get(_key))
        {
            local_updateNewData({ inputName: theInchesInputName, value: "" } )
        }
        extraDimensionToggler_do.set(_key, !extraDimensionToggler.get(_key))
    }
    const whatIs_spreatParse = (newData)=>{
        let spreatParse = Object.keys(inputkeyobj).map(item => {
            const theFirstD = inputkeyobj[item].format_titles[0]
            const theFirstDValue = inputkeyForm.get(item)[0]
            const theSecD = inputkeyobj[item].format_titles[1]
            const theSecDValue = inputkeyForm.get(item)[1]

            if (item != newData.inputName.split(":")[0])
            {
                return (
                    `"${item}":{"${theFirstD}":${theFirstDValue},"${theSecD}":${theSecDValue}}`
                )
            }

            if (theFirstD == newData.inputName.split(":")[1])
            {
                inputkeyForm_do.set(item, [newData.value,theSecDValue])
                return (
                    `"${item}":{"${theFirstD}":${newData.value},"${theSecD}":${theSecDValue}}`
                )
            }

            if (theSecD == newData.inputName.split(":")[1])
            {
                inputkeyForm_do.set(item, [theFirstDValue,newData.value])
                return (
                    `"${item}":{"${theFirstD}":${theFirstDValue},"${theSecD}":${newData.value}}`
                )
            }
        })
        return spreatParse
    }
    const local_updateNewData = (newData)=>{
        let spreatParse = whatIs_spreatParse(newData)
        const newMeasure = (
            `{${spreatParse.join(",")}}`).replace(/:,/g,':"",').replace(/:}/g,':""}'
        )
        updateNewData({ inputName,value:JSON.parse(newMeasure)})
    }

    const _useDeviceXS_LG = useDeviceXS_LG()


    return (
    <div className="flex flex-align-start w-100  ">
        <div className={` flex ${editMode ? CSS["n-measure_label"] : "w-50"} pt-0 `}>
            <div className={
                    "flex-1 flex-col flex-align-start w-20 tx-bold-5 tx-smd ims-tx-lightdark pr-4"
                }
            >
                <div className={`${_useDeviceXS_LG && "tx-mdl"}`}>{label}</div>
                {!!sublabel &&
                    <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div>
                }
            </div>
        </div>
        <div className={` ${editMode ? CSS["n-measure_display"] : " w-50 "}  flex-col flex-align-start `}>
            {!editMode
              &&<div className="tx-md ims-tx-faded pl-5 pr-4 flex">
                    {Array.from(inputkeyMap.entries()).map(([key, aValue],index)=>{
                        const measureTitle = aValue.title[0]
                        const firstDimensionTitle = aValue.format_titles[0]
                        const secDimensionTitle = aValue.format_titles[1]

                        const isFirstDimensioned = !!display && !!display[key] && !!display[key][firstDimensionTitle]
                        const isSecDimensioned = !!display && !!display[key] && !!display[key][secDimensionTitle]
                        return (
                        <div key={key} className="pr-2 flex">
                            {!!display && !!display[key] && <>
                                <b className="pr-1">{measureTitle}</b>
                                {!isFirstDimensioned && !isSecDimensioned && <> -- </>}
                                {(isFirstDimensioned || isSecDimensioned) && <>
                                    {isFirstDimensioned
                                        ? <div className="">
                                            {display[key][firstDimensionTitle]} &apos;
                                        </div>
                                        : (!display[key][secDimensionTitle]) && <i>-</i>
                                    }
                                    {(isSecDimensioned && isSecDimensioned)
                                        ? (<div className="">
                                            {display[key][secDimensionTitle]} &quot;
                                        </div> )
                                        : (!display[key][firstDimensionTitle]) && <i>-</i>
                                    }
                                </>}
                                {index+1 < inputkeyMap.size && (<div> <i>,</i> </div>)}
                            </>}
                        </div>
                        )
                    })}
                </div>
            }
            {editMode && Array.from(inputkeyMap.entries()).map(([key, aValue])=>(
                <div key={key+"edit"}
                    className=" bord-r-8  flex flex-align-center flex-justify-between w-100 my-1 "
                >
                    {aValue.title && <>
                        <div
                            className={
                                (extraDimensionToggler.get(key) ? "w-50 " : "w-50 ")+
                                " clickble opaci-ahov--50 flex-center opaci-ahov-0 "+
                                " tx-bold-5 ims-tx-lightdark tx-smd "
                            }
                            onClick={()=>{toggleExtraDimension(key)}}
                        >
                            <div className="pos-rel">


                                <div
                                    className={
                                        " pos-abs left-0 top-50  opaci-bhov-0 bord-r-8 noverflow"
                                    }
                                    style={{
                                        transform:"translate(-100%,-15%)",
                                    }}
                                >
                                    <div
                                        className={
                                            " w-min-150px px-2 py-1 tx-xsm mr-2 bord-r-8 "+
                                            " tx-white bg-b-50 "
                                        }
                                        
                                    >
                                        {extraDimensionToggler.get(key)
                                            ? `Switch to Feet & Inches`
                                            : `Switch to Inches Only`
                                        }
                                    </div>
                                </div>

                                <div className="opaci-bhov--50">
                                    {aValue.title}
                                </div>
                            </div>
                            <div className="opaci-bhov--50">
                                {extraDimensionToggler.get(key) &&
                                    <div className="pl-1" > {`(in)`} </div>
                                }
                                {!extraDimensionToggler.get(key) &&
                                    <div className="pl-1"> {`(${aValue.format_title})`} </div>
                                }
                            </div>
                        </div>
                    </>}
                    {!extraDimensionToggler.get(key) && 
                        <div className={"w-30 "}>
                            <InputSelect
                                refId={
                                    value && value[key] ? value[key][aValue.format_titles[0]] : 0
                                }
                                display={
                                    !inputkeyForm.get(key) ? "0" : `${inputkeyForm.get(key)[0]}`
                                }
                                inputName={`${key}:${aValue.format_titles[0]}`}
                                optMap={measureMapMedium} optName="label"
                                boolConfig={["isReadOnly", "isCompact"]}
                                updateNewData={local_updateNewData}
                                parseFunction={
                                    (newVal,prevVal)=>validateInteger(newVal,prevVal,0,60)
                                }
                            />
                        </div>
                    }
                    {!extraDimensionToggler.get(key) && 
                        <div className={"ml-1 w-30 "}>
                            <InputSelect
                                refId={
                                    value && value[key] ? value[key][aValue.format_titles[1]] : 0
                                }
                                display={
                                    !inputkeyForm.get(key) ? "0" : `${inputkeyForm.get(key)[1]}`
                                }
                                inputName={`${key}:${aValue.format_titles[1]}`}
                                optMap={measureMapSmall} optName="label"
                                parseFunction={
                                    (newVal,prevVal)=>validateInteger(newVal,prevVal,0,12)
                                }
                                boolConfig={["isReadOnly", "isCompact"]}
                                updateNewData={local_updateNewData}
                            />
                        </div>
                    }
                    {extraDimensionToggler.get(key) && 
                        <div className={"ml-1 w-30 "}>
                            <InputSelect
                                refId={
                                    value && value[key] ? value[key][aValue.format_titles[1]] : 0
                                }
                                display={
                                    !inputkeyForm.get(key) ? "0" : `${inputkeyForm.get(key)[1]}`
                                }
                                inputName={`${key}:${aValue.format_titles[1]}`}
                                optMap={measureMapLarge}
                                optName="label"
                                boolConfig={["isReadOnly", "isCompact", ]}
                                parseFunction={
                                    (newVal,prevVal)=>validateInteger(newVal,prevVal,0,999)
                                }
                                updateNewData={local_updateNewData}
                            />
                        </div>
                    }
                </div>
            ))}
        </div>
    </div>)
}