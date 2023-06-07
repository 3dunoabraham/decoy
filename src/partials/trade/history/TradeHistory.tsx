"use client";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";


import { parseDecimals } from "@/components/scripts/helpers";
import { fetchPost } from "@/scripts/helpers/fetchHelper"
import { parseDateTimeString } from "@/scripts/helpers/type/dateHelper";
import ItemsTable from "@/src/items/molecules/table/ItemsTable"

export function TradeHistory({tradeHistory=[], session, pair}:any) {
    const [superuser, s__superuser] = useState(null)
    const tradesTableConfig = {
        key: {title:"ID",name:"id",isInvisible:true},
        rest: {
            col1: {title:"Side",fieldName:"side"},
            col2: {title:"Price",fieldName:"price"},
            col3: {title:"Amount",fieldName:"qty"},
            col4: {title:"Date",fieldName:"time"},
        }
    }
    const theuserstart:any = useQuery({ queryKey: ['theuserstart'], 
        queryFn: async () => {
            if (!window.localStorage) return
            let rpi = JSON.parse(window.localStorage.getItem("rpi"))
            if (!rpi) return

            let theuserresres:any = await fetchPost("/api/player/verify",{
                referral: rpi.split(":")[0],
                pin: rpi.split(":")[1]
            })

            let theuserresq = await theuserresres.json()
            
            s__superuser(theuserresq)
            let splitted = theuserresq.binancekeys.split(":")
            let binancePublic = splitted[0]
            let binanceSecret = splitted[1]

            const theListRes = await fetch(`/api/trade-history/`,{
                method:"POST",
                body:JSON.stringify({
                    symbol: pair,
                    limit:99,
                    binancePublic,
                    binanceSecret,
                })
            })
            let theList = await theListRes.json()
            theList = theList.map((anItem, index) => {
                return {...anItem,...{
                    side: anItem.isBuyer ? "Buy" : "Sell",
                    price: parseDecimals(anItem.price),
                    qty: "$"+parseDecimals(parseFloat(anItem.price)*parseFloat(anItem.qty)),
                    time: parseDateTimeString(new Date(anItem.time/1)),
                }}
            }).reverse()

            return theList
        }
    })

    {/******************************************************************************************************/}

    if (theuserstart.isError) return <> Failed Request </>
    if (!theuserstart.data) return <>
        {!superuser && <> no binance keys found  </>}
        {!!superuser && <>
            {superuser.binancekeys > 132 && <> Loading </>}
            {superuser.binancekeys < 132 && <> no api keys found </>}
        </>}
    </>
    return (
        <div className='px-8 Q_xs_sm_px-2 w-100'>
            <ItemsTable displayConfigObj={tradesTableConfig} theArray={theuserstart.data}
                boolConfig={["isSelectable"]}
            />
        </div>
    )
}

export default TradeHistory