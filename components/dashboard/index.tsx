import { useState, useEffect, useMemo } from "react";
import { useIsClient, useLocalStorage } from "usehooks-ts";
import { useQuery } from '@tanstack/react-query'
import { BsFillGearFill } from "react-icons/bs"
// import { fetchJsonArray, fetchMultipleJsonArray, getComputedLevels, getStrategyResult, parseDecimals,
// parseUTCDateString, timeDifference, _parseDecimals } from "@/scripts/helpers";
import { DEFAULT_TIMEFRAME_ARRAY, DEFAULT_TOKENS_ARRAY } from "@/components/scripts/constants";
import Chart from "@/components/chart";
import TokenRow from "@/components/dashboard/TokenRow";
import { Strat } from "@/src/pages/api/strat";
import { LimitOrderParams, parseQuantity } from "@/components/scripts/utils";
import { fetchJsonArray, fetchMultipleJsonArray, getComputedLevels, getStrategyResult, parseDecimals, parseUTCDateString, timeDifference, _parseDecimals } from "@/components/scripts/helpers";
import { DownloadButton } from "./DownloadButton";
import ToolButtons from "./ToolButtons";
import { useQueryPlus } from "@/scripts/helpers/useHooksHelper";
import { parseDateTimeString } from "@/scripts/helpers/type/dateHelper";


export function ChartDashboard({query}) {
    /********** CREATE **********/

    const isClient = useIsClient()
    const [q__asd, asd] = useQueryPlus({ queryKey: ['asdasd'], 
        queryFn: async () =>{
            // const theList = await fetchJsonArray(API_UNITS, "Units")
            // inv.s__asd(theList)

            const theListRes = await fetch(`/api/account-balance`)
            let theList = await theListRes.json()
            console.log("thelist", theList)
            // theList = theList.map((anItem, index) => {
            //     return {...anItem,...{
            //         side: anItem.isBuyer ? "Buy" : "Sell",
            //         price: parseDecimals(anItem.price),
            //         qty: "$"+parseDecimals(parseFloat(anItem.price)*parseFloat(anItem.qty)),
            //         time: parseDateTimeString(new Date(anItem.time/1)),
            //     }}
            // }).reverse()

            // const theList = await fetchJsonArray(API_UNITS, "Units")

            return theList
        }
    },[])

    
    const [q__tradeHistory, tradeHistory] = useQueryPlus({ queryKey: ['tradeHistory'], 
        queryFn: async () =>{
            // const theList = await fetchJsonArray(API_UNITS, "Units")
            // inv.s__tradeHistory(theList)
            if (!query.token) return []
            const theListRes = await fetch(`/api/trade-history/?symbol=${query.token.toUpperCase()+"USDT"}&limit=99`)
            let theList = await theListRes.json()
            console.log("thelist", theList)
            // theList = theList.map((anItem, index) => {
            //     return {...anItem,...{
            //         side: anItem.isBuyer ? "Buy" : "Sell",
            //         price: parseDecimals(anItem.price),
            //         qty: "$"+parseDecimals(parseFloat(anItem.price)*parseFloat(anItem.qty)),
            //         time: parseDateTimeString(new Date(anItem.time/1)),
            //     }}
            // }).reverse()

            // const theList = await fetchJsonArray(API_UNITS, "Units")

            return theList
        }
    },[])

    
    const [timeframe,s__timeframe] = useState<any>(query.timeframe)
    const [counter, s__counter] = useState(0);
    const [loadings, s__loadings] = useState('all');
    const getKlineArray = async(t,token) => {
        s__loadings("klinesArray")
        let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&symbol=`

        const theArray = await fetchJsonArray(urlBase+token.toUpperCase()+"USDT")
        let lastIndex = theArray.length - 1
        while (lastIndex < 499)
        {
            theArray.unshift(theArray[0])
            lastIndex++
        }
        
        s__klinesArray(theArray)
        s__loadings("")
    }
    const cryptoToken = useMemo(()=>{
        return query.token && DEFAULT_TOKENS_ARRAY.includes(query.token.toLowerCase()) ? query.token.toLowerCase() : ""
    },[query]) 
    const [selectedToken,s__selectedToken] = useState<any>(cryptoToken)
    useEffect(()=>{
        if (cryptoToken != selectedToken) { getKlineArray(timeframe,query.token) }
    },[counter,selectedToken,cryptoToken])
    useEffect(()=>{
        s__counter(counter+1)
        s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
        // console.log("LS_tokensArrayObj")
        // console.log(JSON.parse(LS_tokensArrayObj)) 
        s__uid(LS_uid)
        s__clientIP(LS_uid.split(":")[0])
        {
            getKlineArray(timeframe,cryptoToken)
        }
    },[])
    
    
    
    /********** DATA **********/
    const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
    const baseToken = "usdt"
    const online = true
    const DEFAULT_TOKEN = {}
    const tokensReqObj:any = ( DEFAULT_TOKENS_ARRAY.reduce((acc, aToken) => (
        { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
        ), {}))
        const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
        const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
        const [uid, s__uid] = useState("")
        const [showAllTokens,s__showAllTokens] = useState<any>(true)
        const [chopAmount,s__chopAmount] = useState<any>(0)
        const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
        const [klinesArray,s__klinesArray] = useState<any[]>([])
        const [clientIP, s__clientIP] = useState('');
        const DEFAULT_TOKEN_OBJ = {
            mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
            min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
        }
        const p__klinesArray = useMemo(()=>{
            let slicedArray = [...klinesArray]
            for (let index = 0; index < chopAmount; index++) { slicedArray.push(klinesArray[499]) }
            
            return slicedArray.slice(slicedArray.length-500,slicedArray.length)
        },[klinesArray,chopAmount])
        const queryUSDT:any = useQuery({ queryKey: ['usdt'], refetchInterval: 3000,
        queryFn: async () => online ? (await fetchMultipleJsonArray(tokensReqObj)) : DEFAULT_TOKEN,
    })
    const klinesStats = useMemo(()=>{
        if (!tokensArrayObj[cryptoToken]) return {}
        if (p__klinesArray.length == 0) return {}
        let tokenConfirg = tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]
        if (!tokenConfirg) return {}
        // console.log("tokenConfirg", tokenConfirg, p__klinesArray)
        
        let maxPrice = 0
        let minPrice = p__klinesArray.length ? p__klinesArray[0][3] : 99999999999
        for (let kline of p__klinesArray)
        {
            maxPrice = parseFloat(kline[2]) > maxPrice ? parseFloat(kline[2]) : maxPrice
            minPrice = parseFloat(kline[3]) < minPrice ? parseFloat(kline[3]) : minPrice
        }
        let min = parseFloat(`${parseDecimals(minPrice)}`)
        let max = parseFloat(`${parseDecimals(maxPrice)}`)
        let startDate = parseUTCDateString(new Date(p__klinesArray.length ? p__klinesArray[0][0] : 0))
        let midDate = parseUTCDateString(new Date(p__klinesArray.length ? p__klinesArray[250][0] : 0))
        let endDate = parseUTCDateString(new Date(p__klinesArray.length ? p__klinesArray[499][0] : 0))
        let range = parseFloat(`${parseDecimals(tokenConfirg.ceil-tokenConfirg.floor)}`)
        
        let dropPercent = parseFloat(100-parseInt(`${p__klinesArray.length ? min/max*100 : 0}`)+"")
        let timeDiff = p__klinesArray.length ? timeDifference(p__klinesArray[499][0], p__klinesArray[0][0]) : ""
        let minMaxAvg = parseDecimals((parseFloat(tokenConfirg.ceil)+parseFloat(tokenConfirg.floor))/2)
        let minMedian = (parseFloat(tokenConfirg.floor)+parseFloat(`${minMaxAvg}`))/2
        let maxMedian = (parseFloat(tokenConfirg.ceil)+parseFloat(`${minMaxAvg}`))/2
        return {
            minMaxAvg,minMedian,maxMedian,range,minPrice: min,maxPrice: max,
            min: parseFloat(tokenConfirg.floor),
            max: parseFloat(tokenConfirg.ceil),
            endDate,midDate,startDate,dropPercent,timeDiff,
        }
    },[p__klinesArray, tokensArrayObj])
    
    
    
    /********** UPDATE **********/
    const getData = async (randomThousand:any) => {
        const res:any = await fetch('https://geolocation-db.com/json/')
        let awaited = await res.json()
        s__clientIP(awaited.IPv4)
        let new_uid = `${awaited.IPv4}:${randomThousand}`
        s__uid(new_uid)
        s__LS_uid(new_uid)
    }
    const register = () => {
        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        if (confirm(`IP+${randomThousand}\nWould you like to Register?`)) {
            getData(randomThousand)
        }
    }
    const clickImportConfig = () => {
        let backup = prompt("Backup:")
        importConfig(backup)
    }
    const importConfig = (strTokensArrayObj) => {
        s__LS_tokensArrayObj(strTokensArrayObj)
        window.location.reload()
    }
    const exportConfig = () => { console.log(JSON.stringify(tokensArrayObj)) }
    const joinToken = (token:string) => {
        // console.log("queryUSDT queryUSDT", queryUSDT.isLoading, queryUSDT.data)
        let thePrice = parseFloat(queryUSDT.data[DEFAULT_TOKENS_ARRAY.indexOf(`${token}`)].price)
        addToken(token,thePrice)
    }
    const addToken = (token:string,price:number) => {
        if (!token) return
        let new_tokensArrayObj = {
            ...tokensArrayObj, ...
            {
                [`${token}`]: DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe, index)=> (
                    {...DEFAULT_TOKEN_OBJ,...{
                        ...getComputedLevels({floor:price*0.8,ceil:price*1.2})
                    }}
                ) )
            }
        }
        s__tokensArrayObj(new_tokensArrayObj)
        s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj))
    }
    const updateTokenOrder = async (token:string, timeframe:any, substate:string,val:any="") => {
        if (!token) return
        let promptVal = !val ? prompt("Enter Value") : val
        let value = !promptVal ? 0 : parseFloat(promptVal)
        let timeframeIndex = timeframe
        let old_tokensArrayObj = tokensArrayObj[token][timeframeIndex]
        
        let old_tokensArrayObjArray = [...tokensArrayObj[token]]
        let newCrystal = {
            ...{[substate]:value},
            ...getComputedLevels({
                ...old_tokensArrayObjArray[timeframeIndex],
                ...{[substate]:value}
            }),
        }
        old_tokensArrayObjArray[timeframeIndex] = {...old_tokensArrayObj,...newCrystal}
        let bigTokensObj = {...tokensArrayObj, ...{[token]:old_tokensArrayObjArray}}
        s__tokensArrayObj(bigTokensObj)
        s__LS_tokensArrayObj((prevValue) => JSON.stringify(bigTokensObj))
        let theKey = `${token.toUpperCase()}USDT${DEFAULT_TIMEFRAME_ARRAY[timeframe].toUpperCase()}`
        const response = await updateStrat(theKey, {key:theKey, [substate]:value})
    }
    
    async function updateStrat(key: string, updates: Partial<Strat>): Promise<Strat> {
        const response = await fetch(`/api/strat`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        })
        if (!response.ok) {
            console.log("response no ok", response)
        }
        return
    }
    
    const updateTokenState = async (token:string, timeframe:any, substate:string, value:number) => {
        if (!token) return
        let timeframeIndex = timeframe
        let old_tokensArrayObj = tokensArrayObj[token][timeframeIndex]
        
        let old_tokensArrayObjArray = [...tokensArrayObj[token]]
        let newCrystal = {...{
            [substate]:value
        },...getComputedLevels(old_tokensArrayObjArray[timeframeIndex])}
        old_tokensArrayObjArray[timeframeIndex] = {...old_tokensArrayObj,...newCrystal}
        let bigTokensObj = {...tokensArrayObj, ...{[token]:old_tokensArrayObjArray}}
        s__tokensArrayObj(bigTokensObj)
        s__LS_tokensArrayObj((prevValue) => JSON.stringify(bigTokensObj))
        
        let randomHundred = parseInt(`${(Math.random()*90) + 10}`)
        let theKey = `${token.toUpperCase()}USDT${DEFAULT_TIMEFRAME_ARRAY[timeframe].toUpperCase()}`
        
        const response = await updateStrat(theKey, {key: theKey, mode: randomHundred})
    }
    const setNewTimeframe = async(aTimeframe:string) => {
        s__timeframe(aTimeframe)
        getKlineArray(aTimeframe,cryptoToken)
    }
    const removeToken = (token:string) => {
        if (!confirm("Confirm exit?")) return
        if (!token) return
        let new_tokensArrayObj:any = {...tokensArrayObj}
        delete new_tokensArrayObj[token]
        s__tokensArrayObj(new_tokensArrayObj)
        s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj))
    }
    
    
    
    const dollarAmount = 11
    async function placeOrder(order: LimitOrderParams): Promise<any> {
        const response = await fetch('/api/place-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        
        return response.json();
    }
    
    
    const computeOrderParams = (_token, operation, priceAdjustmentFactor) => {
        const theLivePrice = _parseDecimals(queryUSDT.data[DEFAULT_TOKENS_ARRAY.indexOf(_token)].price) * priceAdjustmentFactor;
        const tokenAmount = (dollarAmount * (operation === 'buy' ? 1 : 2)) / theLivePrice;
        return {
          symbol: _token.toUpperCase() + 'USDT',
          side: operation.toUpperCase(),
          type: 'LIMIT',
          quantity: parseQuantity(_token.toUpperCase(), tokenAmount),
          price: theLivePrice,
        };
      };
      
      const buy_min = (_token) => {
        const orderParams = computeOrderParams(_token, 'buy', 1.01);
        placeOrder(orderParams);
        updateTokenState(_token, DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe), 'buy', 1);
        q__asd.refetch()
      };
      
      const sell_all = (_token) => {
        const orderParams = computeOrderParams(_token, 'sell', 0.99);
        placeOrder(orderParams);
        updateTokenState(_token, DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe), 'buy', 0);
        q__asd.refetch()
      };
      
      const buy_all = (_token) => {
        const orderParams = computeOrderParams(_token, 'buy', 1.01);
        placeOrder(orderParams);
        updateTokenState(_token, DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe), 'buy', 2);
        q__asd.refetch()
      };
      
      const sell_min = (_token) => {
        const orderParams = computeOrderParams(_token, 'sell', 0.99);
        placeOrder(orderParams);
        updateTokenState(_token, DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe), 'buy', 1);
        q__asd.refetch()
      };

    /********** HTML **********/
    if (!uid) {
        return (
            <button className="ma-2 tx-lg tx-gray opaci-chov-50 duno-btn hov-bord-1-w py-4 px-8 bord-r-50"
                onClick={()=>{register()}}
            >
                Register
            </button>
        )
    }
    // console.log("DEFAULT_TOKENS_ARRAY", DEFAULT_TOKENS_ARRAY, tokensArrayObj)
    return (
    <div className="body h-min-100  pos-rel flex-col flex-justify-start noverflow">
        
        {/* {JSON.stringify(asd.balances)} */}
        <div className="opaci-50 tx-ls-3 tx-lg mb-2 tx-white">Current Balance</div>
        <div className="flex-wrap gap-2">

            {queryUSDT.data && asd.balances && asd.balances.map((anAsset, i)=>{
                if (!queryUSDT.data[i]) return
                return (
                    <div key={i} className="tx-white pa-1 flex-col">
                        <div className="opaci-50">{asd.balances[i].asset}:</div>
                        <div>{parseDecimals(asd.balances[i].free)}</div>
                        {/* <div>{parseDecimals(queryUSDT.data[i].price)}</div> */}
                        <div>${parseDecimals(parseFloat(asd.balances[i].free)*parseFloat(queryUSDT.data[i].price))}</div>
                    </div>
                )
            })
            }
        </div>
        {/* <div className="tx-white">BTC: {parseDecimals(asd.balances[3].free)}</div> */}

            <div className="opaci-50 tx-ls-3 tx-lg mt-100 tx-white">Strategy</div>
        <div className={"bg-glass-6   bord-r-10 tx-gray mt-4 py-2 z-999 fade-in w-95 noverflow flex flex-between"}
            style={{border:"1px solid #777",boxShadow:"0 10px 50px -20px #00000077"}}
        >
            <div className={` flex-row mq_xs_md_flex-col w-100 flex-align-start `}>
                <div className="flex-wrap flex-align-start w-100  my-">
                    <div className="flex-col flex-1 pa-4 ">
                        {!showAllTokens &&
                            <div className={`pa-2 bord-r-8 bg-b-50 tx-white opaci-chov--50`}onClick={()=>{s__showAllTokens(true)}}>
                                Show All Tokens
                            </div>
                        }
                        {showAllTokens &&
                            <div className={`pa-2 bord-r-8 bg-b-50 tx-white opaci-chov--50`}onClick={()=>{s__showAllTokens(false)}}>
                                Hide Tokens
                            </div>
                        }
                        {/* JSON.stringify(tokensArrayObj) */}
                        {DEFAULT_TOKENS_ARRAY.map((aToken,index)=>{
                            let isQ = true
                            if (queryUSDT.isLoading) { isQ = false }
                            if (queryUSDT.error) { isQ = false }
                            let isK = isQ
                            
                            // if (tokensArrayObj[aToken]) {
                            //     return (
                            //         <div key={index}>asd
                            //         </div>
                            //     )
                            // }

                            if (!tokensArrayObj[aToken] || (tokensArrayObj[aToken] && !tokensArrayObj[aToken][0])) { isQ = false }
                            if (!showAllTokens && aToken != cryptoToken) return <div key={index}></div>

                            let aTokenCristayl = isQ ? tokensArrayObj[aToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)] : null
                            let crystal = (
                                queryUSDT.data && aTokenCristayl
                                ? getStrategyResult(aTokenCristayl,parseFloat(queryUSDT.data[index].price))
                                : 0
                            )

                            return (
                            <div key={index}
                                className={`flex pa-2 w-min-350px bord-r-8 mt-2 w-100
                                    ${aToken == cryptoToken ? "bg-w-20 " : "bg-b-10 "} 
                                `}
                            >
                                {/* {JSON.stringify(aTokenCristayl)} */}
                                {/* aTokenCristayl != null && */
                                    <TokenRow {...{
                                        tokensArrayObj, aToken, cryptoToken, index, queryUSDT, isK, aTokenCristayl, isQ,
                                        buy_all, buy_min, sell_min, sell_all, crystal, timeframe, uid, updateTokenOrder,
                                        removeToken, joinToken  
                                    }}/>
                                }
                            </div>
                            )
                        })}
                    </div>
                </div>
                
                {cryptoToken in tokensArrayObj &&
                    <div className="w-100 flex-col flex-align-stretch">
                        <div className="flex-col mt-8">
                            <div className="w-100 flex-center flex-align-end">
                                <div className="tx-sm pr-1 opaci-50">Timeframe:</div>
                                <div className="tx-lgx tx-bold-6">{timeframe}</div>
                            </div>
                            <div className="flex-wrap w-300px ">
                                {DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe,index)=>{
                                    return (
                                    <button className="ma-1 pa-2  opaci-chov--50 bg-w-10 bord-r-8 tx-gray"
                                        key={index} onClick={()=>setNewTimeframe(aTimeframe)}
                                    >
                                        {aTimeframe}
                                    </button>
                                    )
                                })}
                            </div>
                        </div>
                        <ToolButtons {...{cryptoToken, baseToken, timeframe, exportConfig, clickImportConfig}} />
                        {klinesArray.length > 0  && <div className="flex-1 w-100 flex-col mt-4 ">
                            <div className=" flex  flex-justify-between w-90">
                                <div className="flex-1 px-2 opaci-10"><hr/></div>
                                <div className="opaci-50"><div className=" left-0 top-0">{klinesStats.timeDiff}</div></div>
                                <div className=" opaci-10 px-2 "><hr className="px-2"/></div>
                                <div className="opaci-50"><div className=" left-0 top-0">{klinesStats.dropPercent}%</div></div>
                            </div>
                        
                            {loadings == "" &&  tokensArrayObj[cryptoToken] && queryUSDT.data && isClient &&
                                <div className=" w-100 h-100">
                                    <Chart
                                        {...{
                                            tradeHistory: tradeHistory,
                                            klinesStats, klinesArray, p__klinesArray, tokensArrayObj, cryptoToken,
                                            timeframe, queryUSDT
                                        }}
                                    />
                                </div>
                            }
                            <div className=" flex  flex-justify-between w-90">
                                <div className="">{klinesStats.startDate}</div>
                                <div className="flex-1 px-2 opaci-10"><hr/></div>
                                <div className="">{klinesStats.midDate}</div>
                                <div className="flex-1 px-2 opaci-10"><hr/></div>
                                <div className="">{klinesStats.endDate}</div>
                            </div>
                        </div>}

                    </div>
                }   

                

                <div className="flex-1 px-2 w-100 mt-3 opaci-10"><hr/></div>
                <div className="flex-1 w-100    ">
                    {!!uid && 
                        <details className="tx-gray flex flex-align-end ">
                            <summary className="flex    flex-justify-end">
                                <div className="tx-lg opaci-chov--50  py-2 mx-2 bord-r-8 px-2 bg-w-hov-20">
                                    <BsFillGearFill />
                                </div>
                            </summary>
                                
                            <div className="  flex flex-justify-end ma-2">
                                <div className="bg-w-50  bord-r-50 px-2 py-1 tx-sm ">
                                    {uid}
                                </div>
                            </div>
                        </details>
                    }

                </div>

            </div>
        </div>
        <div className=" pt-200"></div>
        <DownloadButton filename="database" data={tokensArrayObj} />
    </div>
    )
}