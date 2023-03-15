import { ChangeEvent, useState, useRef } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { BsCalendar } from 'react-icons/bs'


// import { dd } from '@/scripts/helpers/devHelper'
import { parseUTCString } from '@/scripts/helpers/type/dateHelper'
// ReactFunctionComponent
export const InputDate = ({
    reference,
    inputName,
    hasTime = false,
    minDate = null,
    maxDate = null,
    updateNewData,
})=>{
    /****** CREATE ******/
    useEffectOnce(()=>{
        let theParsedDate = parseUTCString(new Date(reference))
        setValue(hasTime ? theParsedDate : theParsedDate.split("T")[0])

    })



    /****** DATA ******/
    const [value, setValue] = useState("")
    const $theInput = useRef<any>()



    /****** UPDATE ******/
    const handleDateChange = (event: ChangeEvent<HTMLInputElement>)=>{
        setValue(event.target.value)

        updateNewData({inputName, value: getStringForAPI(event.target.value)})
    }
    const updateAllToNow = ()=>{ 
        let theUTCNow = parseUTCString(new Date())
        setValue(getStringForLocal(theUTCNow))
        updateNewData({inputName, value: getStringForAPI(theUTCNow)})
    }
    const getStringForLocal = (dateString)=>{ 
        return hasTime ? dateString : dateString.split("T")[0]
    }
    const getStringForAPI = (dateString)=>{ 
        return hasTime ? dateString.replace("T"," ")+":00" : dateString.split("T")[0]
    }
    const handleCalendarClick = ()=>{ 
        if (!$theInput) return
        if (!reference)
        {
            updateAllToNow()
        }

        $theInput?.current.showPicker()
    }



    /****** HTML ******/
    return (
    <div className="flex-center w-100 pos-rel" >
        <div onClick={handleCalendarClick}
            className="pos-abs left-0 pl-3 ims-tx-lightdark clickble"
        >
            <BsCalendar />
        </div>
        {/*WIP:for when the user wants to input date and time*/false &&
            <input  type="datetime-local" value={value}
                /*onChange={handleDateTimeChange} onInput={handleDateTimeChange} ref={$theInput}*/
                className="py-2 px-4 pl-8 w-100 ims-tx-dark ims-border-faded bord-r-5 tx-mdl"
            />
        }

        <input onClick={handleCalendarClick} type="date" value={value}
            onChange={handleDateChange} onInput={handleDateChange} ref={$theInput}
            min={minDate} max={maxDate}
            className="py-2 px-4 pl-8 w-100 ims-tx-dark ims-border-faded bord-r-5 tx-mdl"
        />
        <button onClick={updateAllToNow}  className="pa-1">
            <div className="ims-button-faded ">
                <div className="nowrap tx-sm ims-tx-link">Set Today</div>
            </div>
        </button>
    </div>
    )
}