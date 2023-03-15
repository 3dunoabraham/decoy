export const SidebarFilterButton = ({
    theOption, handleClick, filter,
})=>{
    return (
    <div className="flex w-100">
        <div className="flex w-100 Q_xs_lg  pos-rel "
            onClick={()=>{handleClick(theOption.id, theOption[filter.optField],filter.optName) }}
        >
            <div className="tx-mdl nowrap   ims-bg-primary w-min-200px ">
                <div className="flex-1  pl-4 py-2 opaci-hov--50">{theOption[filter.optField]}</div>
            </div>
        </div>
        <div className="flex w-100 Q_lg_x pa-3  "
            onClick={()=>{handleClick(theOption.id, theOption[filter.optField],filter.optName) }}
        >
            <div className="w-min-50px tx-lgx"></div>
            <div className="flex-1 ">{theOption[filter.optField]}</div>
            <div className=" px-2 py-1 bg-w-20 box-shadow-2 opaci-chov--50  bord-r-25 tx-sm ">{theOption._COUNT}</div>
        </div>
    </div>
    )
}