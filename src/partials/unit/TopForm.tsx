import { SalesStatusBadge } from '@/src/partials/unit/SalesStatusBadge';
import { validateStringLength, validateInteger } from '@/scripts/helpers/validationHelper'
import { InputText } from '@/src/items/atoms/inputs/InputText'
// ReactFunctionComponent
export const UnitTopForm =({
    unit,
    updateNewData,
}) =>{
    const updateNewData_Year = (newDataObj)=>{
        updateNewData({...newDataObj, value: validateInteger(newDataObj.value,1950,1950,2050)})
    }

    return (
    <div className="flex-wrap gap-2 ims-tx-faded  tx-md ">
        <div className="flex-center">
            <div className="tx-bold-6 pr-1">Sales Status:</div>
            <SalesStatusBadge value={parseInt(unit.sales_status)} reference={[""]} />
        </div>
        <div className="flex"><div className="tx-bold-6 pr-1">Unit ID:</div>{unit.uid}</div>
        <div className="flex-center w-300px">
            <div className="tx-bold-6 pr-1">VIN:</div>
            <InputText inputName={"vin"} reference={unit.vin || ""} updateNewData={updateNewData} 
                parseFunction={(newVal,prevVal)=>(validateStringLength(newVal,prevVal,17))}
            />
        </div>
        <div className="flex-center w-150px">
            <div className="tx-bold-6 pr-1">Year:</div>
            <InputText inputName={"year"} reference={unit.year || ""}
                updateNewData={updateNewData_Year}
                parseFunction={(newVal,prevVal)=>(validateInteger(newVal,prevVal,0,2050))}
            />
        </div>
        <div className="flex">
            <span className="tx-bold-8">Work Order:</span>
            {!!unit.workorder && 
                <a className="ims-tx-link opaci-hov--50 pl-0 pa-1 tx-bold-5 mr-3 pl-2 "
                    href={`${unit.workorder.invoice_url}`}
                >
                    {unit.workorder.invoice_title}
                </a>
            }       
            {!unit.workorder && <div className='px-1'> --- </div>}       
        </div>
    </div>
    )
}