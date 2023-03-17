import { useMemo } from 'react'
import { useMap } from 'usehooks-ts'


// import { dlog, dd } from '@/scripts/helpers/devHelper'
import { useDeviceXS_LG } from '@/scripts/helpers/useHooksHelper'
import { jss, jssWSwitch } from '@/scripts/helpers/type/stringHelper'
export interface BottomSectionOutputModuleProps {
    uid: any; label: string; sublabel?: string; flex?: string;
    inputsMapObj: any; optsObj?: any; values: any;
    editMode?: boolean;
}
// ReactFunctionComponent
export const BottomSectionOutputModule = ({
    uid, label, sublabel, inputsMapObj, flex = "wrap",
    values, optsObj = {}, 
    editMode, 
}: BottomSectionOutputModuleProps)=>{
    /****** DATA ******/
    const _useDeviceXS_LG = useDeviceXS_LG()
    const [mapmapmap, mapmapmap_do] = useMap<string, any>()
    const optMapObj = useMemo(()=>{ 
        for (let key in optsObj)
        {
            mapmapmap_do.set(key, new Map(optsObj[key].map(
            object => {return [`${object.id}`, object]; }))
        )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optsObj])
    const inputsKeyList = useMemo(() => Object.keys(inputsMapObj).filter(i=>i!="_"),
    [inputsMapObj]);
    const realInputsKeyList = useMemo(() => inputsKeyList.filter(i=>!inputsMapObj[i].autogen) 
    , [inputsKeyList,inputsMapObj]);



    const getNestedMapProp = (key,secKey,propName)=> {
        if (!mapmapmap.has(key)) return ""
        if (!mapmapmap.get(key).size) return ""
        if (!mapmapmap.get(key).has(secKey)) return ""
                
        return mapmapmap.get(key).get(secKey)[propName]
    }


    
    /****** HTML ******/
    return (!editMode && <>
    <div className="flex w-100  Q_xs_md_flex-col">
        <div className="flex flex-1 w-max-400px pt-0 ">
            <div className="flex-1 flex-col flex-align-start w-20 tx-bold-5 tx-smd ims-tx-lightdark pr-4">
                <div className={`${_useDeviceXS_LG && "tx-mdl"}`}>{label}</div>
                {!!sublabel && <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div> }
            </div>
        </div>
        {<div className={`flex-3 flex-wrap flex-align-start flex-justify-start w-100`}>
            {realInputsKeyList.map((key,index)=>{
                const theInputObj = inputsMapObj[key]
                const theFormat = theInputObj.customFormat

                const theWidget = theInputObj.widget

                return <div key={key} className=" px-4 py-3 ord-r-8 ims-bg-hov-faded w-min-100px">
                    
                    {theWidget == "select" && theFormat == "radio" && <div>
                        <div className="flex">
                            <div className={`${values[theInputObj.radioName] != 2 && "opaci-50"}`}>
                                {theInputObj.titlesObj[Object.keys(theInputObj.titlesObj)[1]]}
                            </div>
                            <div className="px-1 opaci-50">
                                or
                            </div>
                            <div className={`${values[theInputObj.radioName] != 1 && "opaci-50"}`}>
                                {theInputObj.titlesObj[Object.keys(theInputObj.titlesObj)[0]]}
                            </div>
                        </div>
                    </div>}
                    {( theWidget != "select" ||
                     (theWidget == "select" && theFormat != "radio") ) &&
                        <div>
                            {theInputObj.title &&
                                <div className="pb-2 tx-bold-5 ims-tx-lightdark tx-smd">
                                    {theInputObj.title}
                                </div>
                            }
                        </div>
                    }
                    
                    {!!theInputObj.inputName && !values[theInputObj.inputName] && (
                        <div className={`tx-smd ims-tx-faded`}>
                            ---
                        </div>
                    ) }
                    {!!theInputObj.inputName && values[theInputObj.inputName] && (
                        <div
                            className={
                                " tx-smd flex-center flex-justify-start autoverflow "+
                                jssWSwitch(theFormat,["narrow","price","integer",""],[150,120,80,200])+
                                (theInputObj.path
                                    ? " ims-tx-link tx-bold-5 tx-md opaci-chov--50"
                                    : " ims-tx-faded  "
                                )
                            }
                        >
                            {theFormat == "price" && (values[theInputObj.inputName] == "0.00"
                                ? "---"
                                : `$${values[theInputObj.inputName]}` )
                            }
                            {   theFormat != "price" && theWidget != "color" &&
                                theWidget != "enum" && theFormat != "date" &&
                                // theInputObj.inputName != "location" &&
                                    <div>
                                        {values[theInputObj.inputName]}
                                    </div>
                            }
                            {(theWidget == "enum") && getNestedMapProp(key,values[key],"label")}
                            {(theWidget == "color") &&
                                mapmapmap.has(key) && !!mapmapmap.get(key).size &&
                                    <div className='flex'>
                                        {!!values[key] && values[key].includes(",") 
                                            ? <div className='flex'>
                                                {mapmapmap.get(key).get(values[key].split(",")[0]).label}
                                                <div className='px-1'>&</div>
                                                {values[key].split(",")[1] && mapmapmap.get(key).get(values[key].split(",")[1]).label}
                                            </div>
                                            : <div>
                                                {!!values[key] &&
                                                    mapmapmap.get(key).has(values[key])
                                                    ? mapmapmap.get(key).get(values[key]).label
                                                    : "---"
                                                }
                                            </div>
                                        }
                                    </div>
                            }
                        </div>
                    )}
                </div>
            })}
        </div>}
    </div>
    </>)
}