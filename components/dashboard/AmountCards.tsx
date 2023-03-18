import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function Component ({ tokens, mul, bigmul }) {
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
  

  return (
    <div className='flex-center flex-align-start flex-justify-start  gap-4'>
                        {/* {JSON.stringify(LS_tokensArrayObj)} */}
                        {tokens.map((aToken,index)=>{
                            if (!JSON.parse(LS_tokensArrayObj)[aToken]) return 
                            let aSelectedTimeframe = JSON.parse(LS_tokensArrayObj)[aToken]
                            let aCrystal = 0
                            let localMul = index < 2 ? mul*2 : mul
                            let localBigMul = index < 2 ? bigmul*2 : bigmul
                            // let totalValue = aSelectedTimeframe.reduce((prev, curr, i, acc)=>{

                            // },0)
                            // if (!index) return // hide  btc
                            return (
                                <div className='box-shadow-1   flex-1 ord-r-8' key={index}>
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