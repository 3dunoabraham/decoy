"use client";
import { parseDecimals } from "@/components/scripts/helpers";
import { InventoryContext } from "@/scripts/contexts/InventoryContext";
import { fetchPost } from "@/scripts/helpers/fetchHelper"
import { parseDateTimeString } from "@/scripts/helpers/type/dateHelper";
import { useQueryPlus } from "@/scripts/helpers/useHooksHelper";
import ItemsTable from "@/src/items/molecules/table/ItemsTable"
import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react";

export function TradeHistory({tradeHistory=[], session, pair}:any) {
    const [superuser, s__superuser] = useState(null)

    const tradesTableConfig = {
        key: {title:"ID",name:"id",isInvisible:true},
        rest: {
            col1: {title:"Side",fieldName:"side"},
            col2: {title:"Price",fieldName:"price"},
            col3: {title:"Amount",fieldName:"qty"},
            col4: {title:"Date",fieldName:"time"},
            // col1: {title:"asd",fieldName:"status_id"},
            // col2: {title:"Unit Type",fieldName:"structure_type"},
            // col4: {title:"Manufacturer",fieldName:"manufacturer_company"},
            // col5: {title:"Last Update",fieldName:"updated_at"},
        }
    }

    
    const theuserstart:any = useQuery({ queryKey: ['theuserstart'], 
        queryFn: async () => {
            if (!window.localStorage) return
            console.log("localStorage", window.localStorage.getItem("rpi"))
            let secret = JSON.parse(window.localStorage.getItem("rpi"))
            console.log("creds", session.email, secret)
            if (!secret) return

            console.log("creds", session.email, secret)

            let theuserresres:any = await fetchPost("/api/start/verify",{
                binanceKeys:"0:0",
                name: session.email,
                secret: secret.split(":")[1]
            })

            let theuserresq = await theuserresres.json()
            console.log("theuserresq", theuserresq)
            
            s__superuser(theuserresq)
            let splitted = theuserresq.binancekeys.split(":")
            let binancePublic = splitted[0]
            let binanceSecret = splitted[1]


            // console.log("theListRes", `/api/trade-history/?symbol=${pair}&limit=99`,{
            //     method:"POST",
            //     body:JSON.stringify({
            //         symbol: pair,
            //         limit:99,
            //         binancePublic,
            //         binanceSecret,
            //     })
            // })
            const theListRes = await fetch(`/api/trade-history/`,{
                method:"POST",
                body:JSON.stringify({
                    symbol: pair,
                    limit:99,
                    binancePublic,
                    binanceSecret,
                })
            })
            // console.log("trade history res", theListRes)
            let theList = await theListRes.json()
            // console.log("thelist", theList)
            theList = theList.map((anItem, index) => {
                return {...anItem,...{
                    side: anItem.isBuyer ? "Buy" : "Sell",
                    price: parseDecimals(anItem.price),
                    qty: "$"+parseDecimals(parseFloat(anItem.price)*parseFloat(anItem.qty)),
                    time: parseDateTimeString(new Date(anItem.time/1)),
                }}
            }).reverse()

            // const theList = await fetchJsonArray(API_UNITS, "Units")
            console.log("thelist", theList)

            return theList


            return theuserresq
            let theuserres:any = await fetch("/api/start",)
            let theuserinfo = await theuserres.json()
            console.log("theuserstart", theuserinfo)
            return theuserinfo
        }
    })

    
    // const inv = useContext(InventoryContext)
    // const [q__tradeHistory, fetched_tradeHistory] = useQueryPlus({ queryKey: ['qwe'], 
        
    //     queryFn: async () =>{
    //         // const theList = await fetchJsonArray(API_UNITS, "Units")
    //         // inv.s__tradeHistory(theList)
    //         console.log("theuserstart", theuserstart)
    //         console.log("theuserstart data", theuserstart.data)
    //         if (!theuserstart.data) return []
    //         console.log("theuserstart 668", theuserstart.data)
    //         if ((`${theuserstart.data.binancekeys}`).length < 132) {
    //             return []
    //         }
    //         if (!pair) return []

    //         let splitted = theuserstart.data.binancekeys.split(":")
    //         let binancePublic = splitted[0]
    //         let binanceSecret = splitted[1]


    //         const theListRes = await fetch(`/api/trade-history/?symbol=${pair}&limit=99`,{
    //             method:"POST",
    //             body:JSON.stringify({
    //                 binancePublic,
    //                 binanceSecret,
    //             })
    //         })
    //         let theList = await theListRes.json()
    //         console.log("thelist", theList)
    //         theList = theList.map((anItem, index) => {
    //             return {...anItem,...{
    //                 side: anItem.isBuyer ? "Buy" : "Sell",
    //                 price: parseDecimals(anItem.price),
    //                 qty: "$"+parseDecimals(parseFloat(anItem.price)*parseFloat(anItem.qty)),
    //                 time: parseDateTimeString(new Date(anItem.time/1)),
    //             }}
    //         }).reverse()

    //         // const theList = await fetchJsonArray(API_UNITS, "Units")

    //         return theList
    //     }
    // },[theuserstart])
    // if (!theuserstart.data) return <>
    //     Loading
    // </>
    if (theuserstart.isError) return <>
        Failed Request
    </>
    if (!theuserstart.data) return <>
        {!superuser && <>
           no binance keys found 
        </>}
        {!!superuser && <>
            
            {superuser.binancekeys > 132 && <>
                Loading
            </>}
            {superuser.binancekeys < 132 && <>
                no api keys found
            </>}
        </>}
    </>
    return (
        <div>
            
            <div className='px-8 Q_xs_sm_px-2 w-100'>
                    <ItemsTable displayConfigObj={tradesTableConfig} theArray={theuserstart.data}
                        boolConfig={["isSelectable"]}
                    />
                </div>


        </div>
    )
}

export default TradeHistory