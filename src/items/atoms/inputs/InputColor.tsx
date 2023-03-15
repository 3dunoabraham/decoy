import { useCallback, useState, useRef, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'


// import { isDevEnvironment, dd } from '@/scripts/helpers/devHelper';
// ReactFunctionComponent
export const InputColor = ({
    reference,  inputName,
    updateNewData,
})=>{
    /****** CREATE ******/
    useEffect(()=>{
        s__theColor(reference)
    },[reference])



    /****** DATA ******/
    const $domContainer = useRef(null)
    const [theColor, s__theColor] = useState<string>(reference)
    const debouncedValue = useDebounce(theColor, 999)
    const [updateCount, s__updateCount] = useState(0)



    /****** UPDATE ******/
    const makeTheUpdate = useCallback(
        ()=>{
            if (theColor === reference && updateCount == 0) return
    
            updateNewData({ inputName, value:`${theColor}`})
            s__updateCount(updateCount+1)
        },
        [theColor,reference,updateCount,inputName,updateNewData],
    );
    useEffect(()=>{ 
        makeTheUpdate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue])
    const handleChange = (event)=>{
        s__theColor(event.target.value)
    }
    const handleBlur = (event)=>{
        s__theColor(event.target.value)
        makeTheUpdate()
    }

    

    /****** HTML ******/
    return (
    <div className="pos-rel w-100 pt-1 pb-2"
        ref={$domContainer} style={{transform: "scale(1.68) translate(10px,2px)"}}
    >
        <input className="pa-0 bord-r-5  ims-border-faded"
            type="color" value={theColor} onChange={handleChange} onBlur={handleBlur}
        />
    </div>
    )
}