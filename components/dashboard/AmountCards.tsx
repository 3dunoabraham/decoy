"use client";
import { fetchMultipleJsonArray } from '@/scripts/helpers/fetchHelper'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { DEFAULT_TOKENS_ARRAY } from '../scripts/constants'
import { getStrategyResult } from '../scripts/helpers'

export default function Component ({ tokens, mul, bigmul, prices= null }) {
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    const baseToken = "USDT"
    const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
    const tokensReqObj:any = ( DEFAULT_TOKENS_ARRAY.reduce((acc, aToken) => (
        { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
    ), {}))
    const queryUSDT:any = useQuery({ queryKey: ['usdt'], refetchInterval: 13000,
        queryFn: async () => (await fetchMultipleJsonArray(tokensReqObj))
    })
    const totals = useMemo(()=>{
        let total = {
            2: 0,
            3: 0,
            total: 0
        }
        tokens.map((aToken,index)=>{
            let localMul = index < 2 ? mul*2 : mul
            let localBigMul = index < 2 ? bigmul*2 : bigmul

            let aSelectedTimeframe = JSON.parse(LS_tokensArrayObj)[aToken]
            total[2] += !!aSelectedTimeframe ? aSelectedTimeframe[2].buy*localMul : 0
            total[3] += !!aSelectedTimeframe ? aSelectedTimeframe[3].buy*localBigMul : 0
            return 0
        })
        total.total = total[2]+total[3]
        return total
    },[queryUSDT.data])


    
    if (!queryUSDT.data) return 
    return (<>
        <div className='flex-wrap flex-align-start flex-justify-center  gap-4'>
            {tokens.map((aToken,index)=>{
                if (!JSON.parse(LS_tokensArrayObj)[aToken]) return 
                let aSelectedTimeframe = JSON.parse(LS_tokensArrayObj)[aToken]
                let aCrystal0 = !!queryUSDT.data ? getStrategyResult(aSelectedTimeframe[2],queryUSDT.data[index].price) : 0
                let aCrystal1 = !!queryUSDT.data ? getStrategyResult(aSelectedTimeframe[3],queryUSDT.data[index].price) : 0
                let localMul = index < 2 ? mul*2 : mul
                let localBigMul = index < 2 ? bigmul*2 : bigmul
                
                return (
                    <div className='box-shadow-1-b  bord-r-5 ord-r-8' key={index}>
                        
                        {(!!aCrystal0 || !!aCrystal1) && <>
                            
                                
                                <div className='flex-center gap-1 my-2 pos-rel'>
                                    <div className='tx-bold-6 flex  flex-align-end gap-1 w-min-150px'>
                                        <small className='Q_sm_x opaci-50 tx-ls-1 pl-2'>Alert:</small>
                                        <div className='Q_xs pr-4  px-1 flex-1 block pos-abs top-0 left-0 translate-y--100 bg-white box-shadow-1-b'>
                                            <small className='opaci-50 tx-ls-1'>Alert</small>
                                        </div>
                                        {!!aCrystal0 &&
                                            
                                            <Link href={"/chart/4h?token="+aToken} className='opaci-chov--50 box-shadow-1-r'>
                                                <div
                                                    className={`tx-lg px-1 ${aCrystal0 > 0 ? "tx-green" : "tx-red"}`}
                                                >
                                                    (4h)
                                                </div>
                                            </Link>
                                        }
                                        {!!aCrystal1 &&
                                            
                                            <Link href={"/chart/1d?token="+aToken} className='opaci-chov--50 box-shadow-1-l'>
                                                <div
                                                    className={`tx-lg px-1 ${aCrystal1 > 0 ? "tx-green" : "tx-red"}`}
                                                >
                                                    (1d)
                                                </div>
                                            </Link>
                                        }
                                    </div>
                                </div>
                        </>}

                        <div className='flex   flex-justify-start px-6' style={index<2?{boxShadow:"0 0 1px #2D313E"}:{}}>
                            <div className=' py-2 '>
                                <div className='ims-tx-faded py-1 flex gap-1'>
                                    {aToken.toUpperCase()} {index<2 && <div>(X*2)</div>}
                                </div>
                                {!aSelectedTimeframe[2].buy && !aSelectedTimeframe[3].buy && <>
                                    <div className='tx-lx  tx-bold-6'>
                                        -
                                    </div>
                                </>}   
                                {!!aSelectedTimeframe[2].buy && !!aSelectedTimeframe[3].buy && <>
                                    <div className='tx-lx  tx-bold-6'
                                        title={`${(aSelectedTimeframe[2].buy*localMul)}-${(aSelectedTimeframe[3].buy*localBigMul)}`}
                                    >
                                        ${(aSelectedTimeframe[2].buy*localMul)+(aSelectedTimeframe[3].buy*localBigMul)}
                                    </div>
                                    <div className='nowrap'>
                                        <span>TF: 4h <small className='opaci-50'>(${(aSelectedTimeframe[2].buy*localMul)})</small> </span>
                                        +
                                        1d
                                    </div>
                                </>}   
                                {!!aSelectedTimeframe[2].buy && !aSelectedTimeframe[3].buy && <>
                                    <div className='tx-lx  tx-bold-6'>
                                        ${aSelectedTimeframe[2].buy*localMul}
                                    </div>
                                    TF: 4h
                                </>}   
                                {!aSelectedTimeframe[2].buy && !!aSelectedTimeframe[3].buy && <>
                                    <div className='tx-lx  tx-bold-6'>
                                        ${aSelectedTimeframe[3].buy*localBigMul}
                                    </div>
                                    TF: 1d
                                </>}   
                            </div>
                        </div>
                    </div>
                )
            })}
    </div>
        <div className='pa-2 w-100 flex-col flex-justify-end flex-align-end'>
            <div className='px-1 pt-1 opaci-25 tx-ls-3 tx-bold-6'>Total Score</div>
            <div className='px-1 flex-center gap-1'>
                <div className='opaci-50'>Balance:</div>
                {totals[2]}+{totals[3]} =
                <div className='tx-lgx'>{totals["total"]}</div>
            </div>
        </div>
    </>)
}