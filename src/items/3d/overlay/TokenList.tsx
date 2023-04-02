

export default function Component ({
    setToken,  tokenColors,  form, tokenIcons,
}) {
    return (
        <>
            <div className="flex-wrap w-max-150px flex-align-stretch gap-2 ">
                { Object.keys(tokenIcons).map((aToken, index) => {

                    return (
                        <button onClick={()=>{setToken(aToken)}}
                            key={index}
                            style={{ color:tokenColors[aToken]}}
                            className={`flex-1 flex-col tx-center  pa-1 bord-r- px-2  tx-bold-8 tx-l bg-glass-5
                                ${form.id !== aToken.toUpperCase()+"USDT"+form.id.split("USDT")[1].toUpperCase()
                                    ? " bg-b-hov-20 tx-shadow-b-1 bg-b-50 tx-ls-2  tx-gray"
                                    : "  tx-lgx tx-shadow-b-2  bg-w-50  box-shadow-5 border-white "
                                }
                            `}
                        >
                            <div className='tx-lg'
                                
                                style={{ color:tokenColors[aToken]}}
                            >
                                {tokenIcons[aToken]}
                            </div>
                            {aToken.toUpperCase()}
                            {/* {tokenTranslations[aToken]} */}
                        </button>
                    )
                })}
            </div>
        </>
    )
}



export function TranslatedTokenList ({
    setToken,  tokenColors,  form, tokenIcons,
}) {
    return (
        <>
            <div className="flex-wrap gap-2 w-max-220px ">
                { ["ftm","btc","eth","link",].map((aToken, index) => {

                    return (
                        <button onClick={()=>{setToken(aToken)}}
                            key={index}
                            style={{ color:tokenColors[aToken]}}
                            className={`flex-1 flex-col tx-center pa-1 bord-r- px-2   tx-l bg-glass-5
                                ${form.id !== aToken.toUpperCase()+"USDT"+form.id.split("USDT")[1].toUpperCase()
                                    ? "bg-b-hov-20 tx-bold-8 tx-shadow-b-1 bg-b-50 tx-ls-2  tx-gray"
                                    : " tx-bold-8 tx-lgx tx-shadow-b-2  bg-b-50  box-shadow-5 border-white "
                                }
                            `}
                        >
                            <div className='tx-lg'
                                
                                style={{ color:tokenColors[aToken]}}
                            >
                                {tokenIcons[aToken]}
                            </div>
                            {aToken.toUpperCase()}
                            {/* {tokenTranslations[aToken]} */}
                        </button>
                    )
                })}
            </div>
        </>
    )
}