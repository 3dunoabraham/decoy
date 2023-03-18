import { fetchMultipleJsonArray } from '@/scripts/helpers/fetchHelper'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { BsBarChart } from 'react-icons/bs'
import { useLocalStorage } from 'usehooks-ts'
import { DEFAULT_TOKENS_ARRAY } from '../scripts/constants'
import { getStrategyResult, parseDecimals } from '../scripts/helpers'

export default function Component ({ tokens, mul, bigmul, prices= null }) {
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    const baseToken = "USDT"
    const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
    const tokensReqObj:any = ( DEFAULT_TOKENS_ARRAY.reduce((acc, aToken) => (
        { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
    ), {}))
    const queryUSDT:any = useQuery({ queryKey: ['usdt'], refetchInterval: 3000,
        queryFn: async () => (await fetchMultipleJsonArray(tokensReqObj))
    })

    if (!queryUSDT.data) return 
    return (
    <div className='flex-center flex-align-start flex-justify-start  gap-4'>
                        {/* {JSON.stringify(Object.keys(queryUSDT.data[0]))} */}
                        {/* {JSON.stringify(LS_tokensArrayObj)} */}
                        {tokens.map((aToken,index)=>{
                            if (!JSON.parse(LS_tokensArrayObj)[aToken]) return 
                            let aSelectedTimeframe = JSON.parse(LS_tokensArrayObj)[aToken]
                            let aCrystal0 = !!queryUSDT.data ? getStrategyResult(aSelectedTimeframe[2],queryUSDT.data[index].price) : 0
                            let aCrystal1 = !!queryUSDT.data ? getStrategyResult(aSelectedTimeframe[3],queryUSDT.data[index].price) : 0
                            let localMul = index < 2 ? mul*2 : mul
                            let localBigMul = index < 2 ? bigmul*2 : bigmul
                            // let totalValue = aSelectedTimeframe.reduce((prev, curr, i, acc)=>{

                            // },0)
                            // if (!index) return // hide  btc
                            return (
                                <div className='box-shadow-1   flex-1 ord-r-8' key={index}>
                                    
                                    {(!!aCrystal0 || !!aCrystal1) && <>
                                        
                                            {/* <BsBarChart />
                                            <div className="ims-tx-primary tx-bold-5 py-4 tx-end">Chart</div> */}
                                            
                                            <div className='flex-center gap-1 my-2'>
                                                {/* <div className='ims-tx-faded py-1 flex gap-1'>
                                                    State:
                                                </div> */}
                                                <div className='tx-bold-6 flex flex-align-end gap-1'>
                                                    <small className='opaci-50 tx-ls-1'>Alert:</small>
                                                    {!!aCrystal0 &&
                                                        
                                                        <Link href={"/chart/4h?token="+aToken}
                                                            className='opaci-chov--50'
                                                            /* className="px-6 opaci-chov--50 block flex-center gap-1" */
                                                        >
                                                            <div className='tx-lg'>(4h)</div>
                                                        </Link>
                                                    }
                                                    {!!aCrystal1 &&
                                                        
                                                        <Link href={"/chart/1d?token="+aToken}
                                                            className='opaci-chov--50'
                                                            /* className="px-6 opaci-chov--50 block flex-center gap-1" */
                                                        >
                                                            <div className='tx-lg'>(1d)</div>
                                                        </Link>
                                                    }
                                                    {/* {aCrystal0}-{aCrystal1} */}
                                                </div>
                                                
                                            </div>
                                        
                                        {/* <hr className='w-100'/> */}
                                    </>}

                                    <div className='flex   flex-justify-start px-6' style={index<2?{boxShadow:"0 0 1px green"}:{}}>
                                        <div className=' py-2 '>
                                            <div className='ims-tx-faded py-1 flex gap-1'>
                                                {aToken.toUpperCase()} {index<2 && <div>(X*2)</div>}
                                            </div>
                                            {/* {!aSelectedTimeframe[2].buy && 
                                                <div className='tx-lx  tx-bold-6'>
                                                    -
                                                </div>
                                            } */}
                                            {/* {
                                                aSelectedTimeframe.map((aTimeframe, i) => {
                                                    return (
                                                        <div key={i}>
                                                            {aSelectedTimeframe[i].buy}
                                                        </div>
                                                    )
                                                })
                                            } */}
                                            {!aSelectedTimeframe[2].buy && !aSelectedTimeframe[3].buy && <>
                                                <div className='tx-lx  tx-bold-6'>
                                                    -
                                                </div>
                                            </>}   
                                            {!!aSelectedTimeframe[2].buy && !!aSelectedTimeframe[3].buy && <>
                                                <div className='tx-lx  tx-bold-6'>
                                                    ${(aSelectedTimeframe[2].buy*localMul)+(aSelectedTimeframe[3].buy*localBigMul)}
                                                </div>
                                                <div className='nowrap'>TF: 4h + 1d</div>
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
                                            {/* <div>
                                                {Object.keys(aSelectedTimeframe[2]).map((aProperty,index)=>{
                                                    return (
                                                        <div key={index}>
                                                            {aProperty}
                                                            {aSelectedTimeframe[2][aProperty]}
                                                        </div>
                                                    )
                                                })}
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <hr  className='mt-3' /> */}
                                </div>
                            )
                        })}
                    </div>
  )
}