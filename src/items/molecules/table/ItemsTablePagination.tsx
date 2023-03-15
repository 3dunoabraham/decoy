// ReactFunctionComponent
export default function StandardTablePagination ({
    currentPage, s__currentPage, lastPage,
}) {
    const nextPage = ()=>{
        if (currentPage+1 > lastPage) return
        s__currentPage(currentPage+1)
    }
    const prevPage = ()=>{
        if (currentPage == 0) return
        s__currentPage(currentPage-1)
    }



    return(
    <div className="bloc  pos-rel flex  ims-border-faded flex-justify-start flex-align-center bord-r-b-8">
        <button onClick={prevPage}
            className={`
                px-3 py-1 ma-3 flex-center clickble opaci-hov-50 ims-button-faded tx-md 
                ${currentPage == 0 && "invisible"}
            `}
        >
            Previous
        </button>
        <div className={`flex-1 flex-center opaci-75 py-3 px-4 Q_xs_sm_flex-col flex-row`}>
            <div className="px-1">Page</div>
            <div className="px-1">{currentPage+1} of {lastPage+1}</div>
        </div>
        <button onClick={nextPage}
            className={`
                px-3 py-1 ma-3 flex-center clickble opaci-hov-50 ims-button-faded tx-md 
                ${currentPage == lastPage && "invisible"}
            `}
        >
            Next
        </button>
    </div>
    )
}
