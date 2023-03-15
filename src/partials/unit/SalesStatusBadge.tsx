export const SalesStatusBadge = ({
    value, reference, date = "",
})=>{
    switch (value)
    {
        case 1: return <span className="ims-badge-success pa-1 tx-sm ">Available</span>
        case 2: return (
            <div className="nowrap flex">
                <span className="ims-badge-secondary pa-1 tx-sm flex">
                    Sold
                    {!date && <div  className="">, Jan 1 2023</div>}
                    {!!date && <div  className="">, {date}</div>}
                </span>
            </div>
        )
        case 3: return (
            <div className="nowrap flex">
                <span className="ims-badge-tertiary pa-1 tx-sm flex">
                    Rented
                    {!date && <div  className="">, Jan 1 2023</div>}
                    {!!date && <div  className="">, {date}</div>}
                </span>
            </div>
        )
        case 4: return <span className="ims-badge-error pa-1 tx-sm ">Not Available</span>
        default: return <span className="ims-bg-faded px-4 pa-1 tx-sm ">?</span>
    }
}