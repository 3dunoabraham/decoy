


export default function Component ({
    timeframesArray, setTimeframe, tokenColors, form
}) {
    return <>
        <div className="flex gap-1">
            { timeframesArray.map((aTimeframe, index) => {

                return (
                    <button onClick={()=>{setTimeframe(aTimeframe)}}
                        key={index}
                        style={{ color:tokenColors[aTimeframe]}}
                        className={`flex-1  tx-center pa-1 bord-r- border-white px-1 tx-bold-8 opaci-chov--50 tx-l
                            ${form.id.split("USDT")[1] !== aTimeframe.toUpperCase()
                                ? " tx-shadow-2 bg-b-50 tx-white tx-shadow-b-1 "
                                : "  tx-lgx tx-red bg-w-50 tx-shadow-b-1 "}
                        `}
                    >
                        {aTimeframe.toUpperCase()}
                    </button>
                )
            })}
        </div>
    </>
}