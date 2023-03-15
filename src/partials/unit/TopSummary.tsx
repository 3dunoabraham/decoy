import { SalesStatusBadge } from '@/src/partials/unit/SalesStatusBadge';
// ReactFunctionComponent
export const UnitTopSummary =({ unit }) =>{
    return (
    <div className="flex-wrap gap-2 ims-tx-faded py-1 tx-md ">
        <div className="flex nowrap  ">
            <div className="tx-bold-6 mt-1  pr-1">Sales Status:</div>
            <div className=" mr-1      " >
                <SalesStatusBadge value={parseInt(unit.sales_status)}
                    date={unit.sales_date} reference={[""]}
                />
            </div>
            {/*Available*/}
        </div>
        <div className="flex"><div className="tx-bold-6 pr-1">Unit ID:</div>{unit.uid}</div>
        <div className="flex"><div className="tx-bold-6 pr-1">VIN:</div>{unit.vin || "---"}</div>
        <div className="flex"><div className="tx-bold-6 pr-1">Year:</div>{unit.year || "---"}</div>
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