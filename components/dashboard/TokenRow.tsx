import { DEFAULT_TIMEFRAME_ARRAY, DEFAULT_TOKENS_ARRAY } from "@/components/scripts/constants"
import { parseDecimals } from "@/components/scripts/helpers"
import { TokenConfigStateButtons } from "../chart/tokenConfig"
import Link from "next/link"

export default function Component({
    tokensArrayObj, aToken, cryptoToken, index, queryUSDT, isK, aTokenCristayl, isQ,
    buy_all, buy_min, sell_min, sell_all, crystal, timeframe, rpi, updateTokenOrder,
    removeToken, joinToken    
}) {
    let theTokenConfig = tokensArrayObj[aToken] ? tokensArrayObj[aToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)] : null
    return (
        <div className="      flex-col w-100 " >
            <div className="w-100">
                <div className="flex  opaci-75 ">
                    {!!tokensArrayObj[aToken] && (
                        <div className="flex-center  flex-justify-between w-100">
                            <div className="tx-lgx flex flex-align-start  " >
                                <Link className={`opaci-chov--50 tx-gray ${aToken == cryptoToken?"":"nodeco"} `}
                                    href={`/?timeframe=${timeframe}&token=${aToken}`}>
                                    <span className="px-1">{aToken.toUpperCase()}:</span>
                                    <span className="tx-ls-2">{isK && parseDecimals(queryUSDT.data[index].price)}</span>
                                </Link>
                            </div>
                            {(!aTokenCristayl || (!!aTokenCristayl && !aTokenCristayl.state)) && <div className="opaci- tx-red-75">Inactive</div>}
                            
                            {!isQ || (!aTokenCristayl || (!!aTokenCristayl && !aTokenCristayl.state))
                                ? (<div className="opaci- tx-ls-1 tx-xsm ">
                                        offline
                                    </div>
                                )
                                : (
                                    <div className="opaci-75 flex-center">
                                        {/* {crystal} */}
                                        {crystal == 2 && <>
                                            <div className="bg-w-50 opaci-chov--50 tx-black bord-r-8 pa-1"
                                                onClick={()=>{
                                                    buy_all(aToken)                                                                                        
                                                }}
                                            >
                                                buy all
                                            </div>
                                        </>}
                                        {crystal == 1 && <>
                                            <div className="bg-w-50 opaci-chov--50 tx-black bord-r-8 pa-1"
                                                onClick={()=>{
                                                    buy_min(aToken)                                                                                        
                                                }}
                                            >
                                                buy min
                                            </div>
                                        </>}
                                        {crystal == -1 && <>
                                            <div className="bg-w-50 opaci-chov--50 tx-black bord-r-8 pa-1"
                                                onClick={()=>{
                                                    sell_min(aToken)                                                                                        
                                                }}
                                            >
                                                sell min
                                            </div>
                                        </>}
                                        {crystal == -2 && <>
                                            <div className="bg-w-50 opaci-chov--50 tx-black bord-r-8 pa-1"
                                                onClick={()=>{
                                                    sell_all(aToken)                                                                                        
                                                }}
                                            >
                                                sell all
                                            </div>
                                        </>}
                                        {crystal == 0 && <>
                                            <div className="flex-col tx-sm">
                                                {aTokenCristayl.buy == 0 && <div>wait to buy</div>}
                                                {aTokenCristayl.buy == 1 && <div>wait to sell</div>}
                                                {aTokenCristayl.buy == 2 && <div className="tx-bold">wait to sell</div>}
                                                {aTokenCristayl.buy == 1 && <div>{theTokenConfig && theTokenConfig.minMaxAvg}</div> }
                                                {aTokenCristayl.buy == 2 && <div className="flex gap-1"><div className="tx-white">{theTokenConfig && theTokenConfig.minMedian}</div> or {theTokenConfig.minMaxAvg}</div> }
                                                {aTokenCristayl.buy == 0 && <div className="flex gap-1"><div className="tx-white">{theTokenConfig && theTokenConfig.minMedian}</div> or {theTokenConfig.min}</div> }
                                            </div>
                                        </>}
                                        {aTokenCristayl.buy > 0 &&
                                            <div className="bg-w-50 opaci-chov--50 tx-black bord-r-8 pa-1 px-2 ml-2"
                                                onClick={()=>{
                                                    // sell_all(aToken)                                                                                        
                                                }}
                                            >
                                                x
                                            </div>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
            
            {aToken == cryptoToken &&
                <div className="flex-center w-100">
                    
                    {!(aToken in tokensArrayObj) && !!rpi &&
                        <div className="flex-1 w-100  ">

                        </div>
                    }
                    <div className="w-100 mt-1">
                        
                        {tokensArrayObj &&  tokensArrayObj[aToken] && tokensArrayObj[aToken][0] && theTokenConfig &&
                            <details className="">
                                <summary className="pa-2  clickable opaci-chov--50 bg-w-10 bord-r-8">. . .</summary>
                                <div>
                                    
                                    <TokenConfigStateButtons 
                                        timeframe={timeframe}
                                        index={DEFAULT_TOKENS_ARRAY.indexOf(aToken)}
                                        tokensArrayObj={tokensArrayObj}
                                        queryUSDT={queryUSDT}
                                        aToken={aToken}
                                        theToken={theTokenConfig}
                                        updateTokenOrder={updateTokenOrder}
                                    />
                                    {(aToken in tokensArrayObj) && 
                                        <div className="tx-bold flex-center  mt-3  " >
                                            <button className="clickble tx-ls-5  opaci-50 opaci-chov-50 duno-btn hov-bord-1-w py-2 px-3 bord-r-50 tx-md"
                                                onClick={()=>{removeToken(aToken)}}
                                                style={{boxShadow:"0px 0px 25px #CF589433"}}
                                            >
                                                LEAVE
                                            </button>
                                        </div>
                                    }
                                    
                                </div>
                            </details>
                        }

                    </div>
                    

                </div>
            }
            
            {!(aToken in tokensArrayObj) && !!rpi &&
                <div className={`tx-bold flex-center mt-1   ${!rpi && "opaci-50"}`}
                    
                >
                    <button className="box-shadow-5 bg-b-10 clickble tx-ls-5 opaci-50 tx-gray opaci-chov-50  hov-bord-1-w py-2 px-4 bord-r-50 tx-lg"
                        style={{color:aToken == cryptoToken ? "orange" : "grey"}}
                        onClick={()=>{!!rpi && joinToken(aToken)}} 
                        // style={{boxShadow:"0px 0px 25px #CF589433"}}
                    >
                        Add {aToken.toUpperCase()}
                    </button>
                </div>
            }

        </div>
    )
}