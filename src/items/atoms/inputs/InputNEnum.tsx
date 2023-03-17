import { useState, useMemo, useEffect } from 'react'


// import { isDevEnvironment, dd } from '@/scripts/helpers/devHelper';
import { InputSelect } from '@/src/items/atoms/inputs/InputSelect'
export interface InputNEnumProps {
    value?: any; sublabel?: string; label?: string;  inputName?: string; display?: string;
    optMap: any; 
    /* CONFIG */ editMode?: boolean; boolConfig?: any;
    /* UPDATE */ updateNewData?: any;
}
// ReactFunctionComponent
export const InputNEnum = ({
    optMap, value, display,
    sublabel, label,  inputName, boolConfig = [], editMode,
    updateNewData,
}: InputNEnumProps)=>{
    // useEffect(()=>{
    //     if (hasExtraEnums)
    //     {
    //         s__extraDimensionToggler(true)
    //     }
    // },[])
    // const optMap:any = new Map(Array.from(Array(4).keys()).map(i => ([
    //     `${i+1}`, {label:`${i+1}`,id:`${i+1}`}
    // ])))
    const [extraDimensionToggler,s__extraDimensionToggler] = useState(value.includes(","))
    const [selectedColor,s__selectedColor] = (
        useState(value.includes(",") ? value : value.split(",")[0])
    )
    const hasExtraEnums = useMemo(()=>{
        return value.includes(",")
    },[value])
    const memoValue0 = useMemo(()=>{
        return hasExtraEnums ? value.split(",")[0] : value
    }, [value, hasExtraEnums])
    const memoValue1 = useMemo(()=>{
        return hasExtraEnums ? value.split(",")[1] : value
    }, [value, hasExtraEnums])
    const memoDisplay0 = useMemo(()=>{
        if (!optMap.size) return ""
        return hasExtraEnums
            ? optMap.get(value.split(",")[0]).label
            : optMap.has(value) ? optMap.get(value).label : ""
    }, [value, hasExtraEnums, optMap])
    const memoDisplay1 = useMemo(()=>{
        if (!optMap.size) return ""
        return hasExtraEnums && value.split(",")[1]
            ? optMap.get(value.split(",")[1]).label
            : ""
    }, [value, hasExtraEnums, optMap])


    const handleDimensionToggler = (theNewBool) =>
    {
        if (extraDimensionToggler)
        {
            if (selectedColor.includes(","))
            {
                emit_updateNewData(selectedColor.split(",")[0])
            }
            // alert("remove extra dimension")
        } else {
            // alert("add select")
        }
        s__extraDimensionToggler(theNewBool)
    }
    const handleFirstColorChange = (theData) =>
    {
        let secondCurrentColor = 
        (
            selectedColor.includes(",") ? selectedColor.split(",")[1] : null
        )
        // console.table({secondCurrentColor,value:theData.value})
        let theNewValue = (
            secondCurrentColor ? `${theData.value},${secondCurrentColor}` : theData.value
        )
        s__selectedColor(theNewValue)
        emit_updateNewData(theNewValue)
    }
    const handleSecondColorChange = (theData) =>
    {
        let firstCurrentColor = (
            selectedColor.includes(",") ? selectedColor.split(",")[0] : selectedColor
        )
        // console.table({firstCurrentColor,value:theData.value})
        s__selectedColor(`${firstCurrentColor},${theData.value}`)        
        emit_updateNewData(`${firstCurrentColor},${theData.value}`)
    }
    const emit_updateNewData = (newValue)=>{
        updateNewData({inputName, value: newValue})
    }


    return (<>
    <div className="flex-col ">
        <div className="flex ">
            {<InputSelect 
                refId={memoValue0}  display={memoDisplay0}
                inputName={ inputName}  
                optMap={optMap} optName="label"
                boolConfig={[...boolConfig,...["isReadOnly"]]}
                updateNewData={(e)=>{handleFirstColorChange(e)}}
            />}
            {!extraDimensionToggler && 
                <div onClick={()=>{handleDimensionToggler(!extraDimensionToggler)}}
                    className={
                        " pa-1 px-3 ims-tx-primary ims-border-faded  tx-lgx ml-2 ord-r-8 "+
                        " ims-bg-faded opaci-hov--50 clickble block "
                }
                >
                    +
                </div>
            }
            {extraDimensionToggler &&
                <div onClick={()=>{handleDimensionToggler(!extraDimensionToggler)}}
                    className={
                        " pa-1 px-3 ims-tx-primary ims-border-faded "+
                        " tx-lgx ml-2 ord-r-8 ims-bg-faded opaci-hov--50 clickble block "
                    }
                >
                    -
                </div>
            }
        </div>

        {extraDimensionToggler &&
            <div className="flex-col mt-2">
                <InputSelect                     
                    refId={memoValue1}  display={memoDisplay1}
                    inputName={ inputName} 
                    optMap={optMap} optName="label"
                    boolConfig={[...boolConfig,...["isReadOnly"]]}
                    updateNewData={(e)=>{handleSecondColorChange(e)}}
                />
            </div>
        }

    </div>
    </>)
}