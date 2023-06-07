import { DEFAULT_TIMEFRAME_ARRAY, DEFAULT_TOKENS_ARRAY } from "@/components/scripts/constants";
import { parseDecimals, parseUTCString } from "@/components/scripts/helpers";
import { ChartHigherLastLine, ChartHigherLine, ChartLiveLastLine, ChartLowerLastLine, ChartLowerLine,
ChartMiddleLine, ChartTopBottomLine, ChartTradeHistory } from "./lines";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchPost, fetchPut } from "@/scripts/helpers/fetchHelper";


export default function Component({
    user,
    klinesStats, klinesArray, p__klinesArray, tokensArrayObj, cryptoToken, timeframe, queryUSDT, tradeHistory
}) {
    const {data:session} = useSession()

    const theuserstart:any = useQuery({ queryKey: ['theuserstart'], 
        queryFn: async () => {

            if (!window.localStorage) return
            let rpi = JSON.parse(window.localStorage.getItem("rpi"))
            if (!rpi) return
            let theuserresres:any = await fetchPost("/api/player/verify",{
                referral: rpi.split(":")[0],
                pin: rpi.split(":")[1],
            })

            let theuserresq = await theuserresres.json()
            return theuserresq
        }
    })
    const lastUpdate = useMemo(()=>{
        if (!theuserstart.data) return ""
        return parseUTCString(new Date(theuserstart.data.datenow)).replace("T","===")
    }, [theuserstart.data])
    const attemptRatio = useMemo(()=>{
        if (!theuserstart.data) return ""
        return parseInt(`${theuserstart.data.attempts / theuserstart.data.totalAttempts * 100}`)
    }, [theuserstart.data])


    return (<>
        <div
            className="flex pos-rel w-90 box-shadow-5 bg-w-10 hov-bord-1-w autoverflow  my-3 bord-r-8"
            style={{ resize:"both", height:"400px", }}
        >
            
            <div className="pa-1 pos-abs right-0 tx-green tx-shadow-br-4 bottom-0">{klinesStats.min}</div>
            <div className="pa-1 pos-abs right-0 tx-white tx-shadow-br-4 top-50p">{klinesStats.minMaxAvg}</div>
            <div className="pa-1 pos-abs right-0 opaci-75 top-0 tx-shadow-br-4">{klinesStats.max}</div>
            
            <div className="pa-1 pos-abs right-0 tx-white tx-shadow-br-4 z-100 top-75p">{parseDecimals(klinesStats.minMedian)}</div>
            <div className="pa-1 pos-abs right-0 tx-red top-25p tx-shadow-br-4">{parseDecimals(klinesStats.maxMedian)}</div>

            <ChartHigherLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />
            <ChartLowerLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />
            <ChartHigherLastLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />
            <ChartLowerLastLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />
            <ChartLiveLastLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                livePrice={queryUSDT.data[DEFAULT_TOKENS_ARRAY.indexOf(cryptoToken)].price}

                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />

            <ChartMiddleLine klinesArray={klinesArray} />
            {!!session && !!session.user && !!theuserstart.data && !!theuserstart.data.subscription && <>
                <ChartTradeHistory tradeHistory={tradeHistory} minPrice={klinesStats.min} maxPrice={klinesStats.max} minTime={klinesArray[0][0]} maxTime={klinesArray[499][0]} />
            </>}
            {!!theuserstart && !!theuserstart.data && <div className="tx-sm w-400px autoverflow left-0 pos-abs">
                
            </div>}
            <ChartTopBottomLine klinesArray={klinesArray} />
            {/* <ChartSinLine chopAmount={chopAmount} klinesArray={klinesArray} wavelength={wavelength} /> */}
                    
        </div>
    </>)
}