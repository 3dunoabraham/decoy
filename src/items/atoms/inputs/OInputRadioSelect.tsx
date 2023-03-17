import { useState, useMemo } from 'react'
import { BsTrash } from 'react-icons/bs'


// import { isDevEnvironment, dd, dlog } from '@/scripts/helpers/devHelper';
import { validateInteger } from '@/scripts/helpers/validationHelper';
import { InputSelect, InputSelectProps } from '@/src/items/atoms/inputs/InputSelect'
export interface OInputRadioSelectProps {
    theInputObj: any; mapmapmap?; key:any; formObject?:any; valueObj?:any; optObj: any;
}
// ReactFunctionComponent
export const OInputRadioSelect = ({
    theInputObj,..._p
}:InputSelectProps & OInputRadioSelectProps)=>{
    const [radioValue, s__radioValue] = useState(
        !!_p.valueObj.location_related
            ? `${_p.valueObj.location_related}`
            : "0"
    );
    const optMapMap = useMemo(()=>
    {
        let _optMapMap = new Map()
        Object.keys(theInputObj.inputsObj).map((aRadioSelect, index) =>{
            let theNewNewMap = new Map()
            let theOptArray:any[][] = Object.keys(_p.optObj[aRadioSelect]).map((opt,index)=>{
                {
                    theNewNewMap.set(
                        _p.optObj[aRadioSelect][opt].id, _p.optObj[aRadioSelect][opt]
                    )
                }
                return [_p.optObj[aRadioSelect][opt].id,_p.optObj[aRadioSelect][opt]]
            })
            _optMapMap.set(aRadioSelect,theNewNewMap)
        })
        return _optMapMap
    },[_p.optObj,theInputObj.inputsObj]);

 

    /****** UPDATE ******/
    const handleClearUpdate = (event)=>{
        _p.updateNewData({[theInputObj.radioName]:"0", [_p.inputName]:"0"} )
        s__radioValue("0");
    }
    const handleUpdateNewData = (data)=>{
        if (data.value == "") return
        _p.updateNewData({[_p.inputName]:data.value, [theInputObj.radioName]:radioValue})
    }
    const handleRadioChange = event => {s__radioValue(event.target.value); };



return (<>
    <div className={`flex-3 pr-8 flex-col flex-align-start flex-justify-start w-100 `}>
        <div className="flex-center Q_xs_sm_flex-col">
            <div className="flex">
                {Object.keys(theInputObj.inputsObj).map((aRadioSelect, index)=>{
                    return (
                    <div key={index}
                        className={`
                            flex-center  pr-4 clickble block  
                            ${ radioValue == `${index+1}` ? "  ":" opaci-hov-50 "}
                        `}
                    >
                        <div className={`
                            pos-rel flex flex-align-start pr-1 flex-justify-start w-100
                        `} >
                            <div className="" >
                                <input type="radio" name="choose3"
                                    style={{filter:"saturate(22%) hue-rotate(285deg) "}}
                                    value={`${index+1}`} id={`${index+1}`}
                                    checked={`${index+1}` == radioValue}
                                    className="clickble block pa-3 scale-150 "
                                    onChange={handleRadioChange}
                                />
                            </div>
                        </div>
                        {<label
                            onClick={()=>{handleRadioChange({target:{value:`${index+1}`}})}}
                            data-for={`${index+1}`}
                            className={`clickble  tx-bold-5 ims-tx-lightdark tx-smd flex py-2`}
                        >
                            {theInputObj.inputsObj[aRadioSelect].title}
                        </label>}
                    </div>
                    )
                })}
            </div>

            <div className="flex-center ">
                {("0" == radioValue) &&
                    <div className={`
                        opaci-50  ims-tx-dark flex flex-justify-start ims-border-faded 
                        ord-r-8 py-2 tx-mdl w-min-300px px-4 mr-4
                    `}>
                        <i className="opaci-25">Select Type</i>
                    </div>
                }
                {"0" != radioValue &&
                Object.keys(theInputObj.inputsObj).map((aRadioSelect, index)=>{
                    if (`${index+1}` != radioValue) return ""
                    return (<div key={index} className="">
                        <div className={`
                            pos-rel flex flex-align-start  flex-justify-start w-100
                            ${radioValue == `${index+1}` ? "":" opaci-50 "}
                        `} >
                            <div className={`
                                pr-4 w-min-300px 
                                ${radioValue == `${index+1}` ? "":" noclick "} 
                            `} >
                                {true && `${index+1}` == radioValue && <>
                                    {radioValue == _p.valueObj[theInputObj.radioName] && <>
                                        <InputSelect  
                                            refId={_p.valueObj[theInputObj.inputName]}
                                            display={_p.valueObj[theInputObj.inputName] }
                                            inputName={theInputObj.inputName}
                                            optMap={optMapMap.get(aRadioSelect)}  
                                            optName={theInputObj.inputsObj[aRadioSelect].optName} 
                                            boolConfig={[
                                                "isReadOnly",
                                                
                                                (theInputObj.customFormat != "intrange" &&
                                                    theInputObj.customFormat != "enum"
                                                        ? " isErasable "
                                                        : ""
                                                )
                                            ]}
                                            placeholder={
                                                `Select ${theInputObj.inputsObj[aRadioSelect].title}`
                                            }
                                            parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                                if (theInputObj.customFormat == "intrange")
                                                {   return validateInteger(
                                                        newVal,prevVal,0,theInputObj.limit
                                                    )
                                                }
                                            } : (x,y)=>x}
                                            updateNewData={handleUpdateNewData}
                                        />
                                    </>}
                                    {radioValue != _p.valueObj[theInputObj.radioName] && <>
                                        <InputSelect
                                            display={""} refId={""} /*   _p.formObject[_p.key]   */

                                            inputName={theInputObj.inputName}
                                            optMap={optMapMap.get(aRadioSelect)}
                                            optName={theInputObj.inputsObj[aRadioSelect].optName} 
                                            boolConfig={[
                                                " isReadOnly ",
                                                (theInputObj.customFormat != "intrange"
                                                    && theInputObj.customFormat != "enum"
                                                        ? " isErasable "
                                                        : ""
                                                )
                                            ]}
                                            placeholder={
                                                `Select ${theInputObj.inputsObj[aRadioSelect].title}`
                                            } 
                                            updateNewData={handleUpdateNewData}
                                            parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                                if (theInputObj.customFormat == "intrange")
                                                {   return validateInteger(
                                                        newVal,prevVal,0,theInputObj.limit
                                                    )
                                                }
                                            } : (x,y)=>x}
                                        />
                                    </>}
                                </>}
                            </div>
                        </div>
                    </div>)
                })}
            </div> 
            <div onClick={handleClearUpdate}
                className="pt-2 flex-center opaci-hov-50 ims-tx-dark clickble  tx-lg pb-2"
            >
                <BsTrash />
            </div>
        </div> 
    </div> 
</>)}