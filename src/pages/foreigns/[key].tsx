import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useIsClient, useLocalStorage } from 'usehooks-ts'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import SessionSidebar from "@/src/items/templates/SessionSidebar";
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { fetchDelete, fetchJsonArray, fetchPost, fetchPut } from '@/scripts/helpers/fetchHelper'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import { AppContext } from '@/scripts/contexts/AppContext'
import BrowserCRUDContainer from '@/src/items/organisms/BrowserCRUDContainer'
import _localJson from '@/localJson.json'
import JSONFullCrud from '@/src/items/organisms/JSONFullCrud'
import APICrud from '@/src/items/organisms/APICrud'
import LocalStorageCRUD from '@/src/items/organisms/LocalStorageCRUD'

const Page: NextPageWithLayout & any = ({ data, asd, theK }) => {
    const localJson:any = _localJson
    const app = useContext(AppContext)
    const inv = useContext(InventoryContext)
    const keyName = theK
    let hardCodedJson = {
        global: { id:1, label: "global", title: "Settings", plural: "Settings", isApiful: false,  },
        hitch_type: { id:2, label: "hitch_type", title: "Hitch Type", plural: "hitch_types", isApiful: false,  },
        color: { id:3, label: "color", title: "Color", plural: "colors", isApiful: false,  },
        sales_status: { id:4, label: "sales_status", title: "Sales Status", plural: "sales_statuses", isApiful: true,  },
        inventory_status: { id:4, label: "inventory_status", title: "Inventory Status", plural: "inventory_statuses", isApiful: true,  },
        condition: { id:5, label: "condition", title: "Condition", plural: "conditions", isApiful: true,  },
        model_style: { id:6, label: "model_style", title: "Style", plural: "model_styles", isApiful: false,  },
    }
    let defaultHardcoded1 = { id:-1, label: "unknown", title: "None", plural: "nones", isApiful: false, baseUrl: '/api/crud',
        apiUrl: "",
    }
    // console.log("asd1")
    let hardCoded1 = Object.keys(hardCodedJson).reduce((acc, key) => {
        acc[key] = {
            ...hardCodedJson[key],
            baseUrl: '/api/crud',
            apiUrl: keyName in hardCodedJson ? `https://ims.jinaron.com/api/v1/units/opt/${hardCodedJson[keyName].plural}/` : "",
        };
        return acc;
    }, {});

    // console.log("asd3")
    const hardCodedMemo:any = useMemo(()=>{
        console.log("keyName in hardCoded1", keyName in hardCoded1)
        return keyName in hardCoded1 ? hardCoded1 : {...hardCoded1,...{[keyName]:{
            baseUrl: '/api/crud',
            apiUrl: "",
        }}}
    },[keyName])
    const DEFAULT_DB = {[keyName]:[]}
    const [LS_crud, s__LS_crud] = useLocalStorage('crud', JSON.stringify(DEFAULT_DB) )
    const [crud,s__crud] = useState(DEFAULT_DB)
    const [q__queriedObj, queriedObj] = useQueryPlus({ queryKey: ['unitData'], retry: 1,
        refetchOnWindowFocus: false,
        queryFn: async () =>{
            return _localJson
            // const theList = await fetch(hardCodedMemo[keyName].baseUrl)
            // if (!theList) throw new Error()
            // return await theList.json()
        }
    },{[keyName]:[]})
    const [q__queriedAPI, queriedAPI] = useQueryPlus({ queryKey: ['apiData'], retry: 1,
        refetchOnWindowFocus: false,
        queryFn: async () =>{
            let apiList = hardCodedMemo[keyName].isApiful ? await fetchJsonArray(hardCodedMemo[keyName].apiUrl) : []
            return apiList
        }
    },{[keyName]:[]})
    const isClient = useIsClient()
    const clearClientCrud = async ()=>{ s__crud(DEFAULT_DB) }
    const deleteUnit = async (e)=>{  await deleteItem(e); /* q__queriedObj.refetch() */ }
    async function deleteItem(id) {
        const response = await fetchDelete(hardCodedMemo[keyName].baseUrl, {keyName:keyName, id: parseInt(id),})
        if (!response) { throw new Error('Failed to delete item'); }
    }
    const $browserCrudRef:any = useRef()
    const [newBrowserArray, s__newBrowserArray] = useState([])
    // console.log("asd4")
    
    const updateJSONToClient = () => { s__crud({[keyName]: localJson[keyName]}) }
    const updateQueriedToLocalstorage = () => { s__LS_crud(JSON.stringify({[keyName]: queriedObj[keyName]})) }
    const clearNewItems = () => { $browserCrudRef.current.clearNewItems(); s__newBrowserArray([]) }
    // console.log("LS_crud", LS_crud)
    const updateClientToLocalstorage = () => { s__LS_crud(JSON.stringify({...JSON.parse(LS_crud),...crud})) }
    const browserArrayList = useMemo(()=>{
        return crud[keyName] || []
    },[crud[keyName],keyName])
    const theJsonArray = JSON.parse(LS_crud)[keyName]
    const isArrayInJson = keyName in JSON.parse(LS_crud)
    const saveAPIListToJson = async ()=> {
        for (let index = 0; index < queriedAPI.length; index++) {
            const item = queriedAPI[index];
            await addNewItem(item.label)
        }
    }
    async function addNewItem(label) {
        const response = fetchPost(hardCodedMemo[keyName].baseUrl, {keyName,label: label,})
        if (!response) { return app.alert("error", "Error") }
        app.alert("success", "Item successfully added to JSON file")
    }


    
    useEffect(()=>{
        if (q__queriedObj.isLoading) return
        if (q__queriedObj.isError) return

        if (keyName in queriedObj) { s__crud({[keyName]:queriedObj[keyName]}) }
        app.s__sidebarLinks(Object.keys(localJson).map((x,i)=>({id:i,label:x})))
        // inv.s__unitsArray(Object.keys(localJson).map((x,i)=>({id:i,label:x})))
        
        app.s__sidebarPages([
            {id:0,label:"Inventory",url:"/inventory/",icon:"inventory"},
            // {id:1,label:"Users",url:"/users/",icon:"users"},
            // {id:2,label:"3D Builder",url:"/builder/3d/",icon:"builder3d"},
        ])
    },[q__queriedObj.isLoading, queriedObj, keyName]) 

    
    // useEffect(()=>{
    //     app.s__sidebarPages([
    //         {id:0,label:"Agreements",url:"/agreements/",icon:"agreements"},
    //         {id:1,label:"Users",url:"/users/",icon:"users"},
    //         {id:2,label:"3D Builder",url:"/builder/3d/",icon:"builder3d"},
    //     ])
    // },[])


    useEffect(()=>{
        if (hardCodedMemo[keyName].isApiful) {
            q__queriedAPI.refetch()
        }
        let theLocalStorageCrud = JSON.parse(LS_crud)
        if (!q__queriedObj.isLoading && !q__queriedObj.isError) {
            return s__crud({[keyName]:queriedObj[keyName]})
        }
        
        if (theLocalStorageCrud[keyName] == undefined) {
            return s__crud({...localJson,[keyName]:[]})
        } else {
            if (theLocalStorageCrud[keyName].length !== 0) {
                return s__crud({[keyName]:theLocalStorageCrud[keyName]})
            }
        }
        return s__crud({[keyName]:localJson[keyName]})
    },[keyName]) 



    return (
    <div className='flex-center w-100 h-min-100vh'>
        <Head><title>{hardCoded1[keyName] ? hardCoded1[keyName].title : `not found`} | BitCity</title></Head>
        <div className="h-min-100vh w-100 px-8 Q_xs_sm_px-2 mb-100">
            <BreadCrumbs pages={[["/settings/global/","Global"],["/settings/"+keyName,keyName]]} current={hardCodedMemo.title} />



            <h1 className="pt-6 tx-bold-5 flex-1 w-100"> {hardCoded1[keyName] ? hardCoded1[keyName].title : `${keyName} (not found)`}</h1>
            <hr className="my-2"/>        
            <div className="  flex Q_xs_sm_flex-col flex-align-stretch gap-3 mb-3">

                <BrowserCRUDContainer  {...{queriedObj, s__crud, browserArrayList, keyName,
                    clearClientCrud, hardCoded1, clearNewItems, crud, s__LS_crud,
                }} />

                {isClient && isArrayInJson && theJsonArray.length > 0 &&
                    <LocalStorageCRUD {...{updateQueriedToLocalstorage, updateClientToLocalstorage, theJsonArray}} />
                }
                {isClient && !(isArrayInJson && theJsonArray.length > 0) &&
                    <div className="flex-col  flex-align-start flex-align-self-start">
                        <h2 className=" tx-bold-5 flex-1 "> NO Local Storage </h2>
                        <hr className="my-2 w-100"/>
                        <div className='tx-center w-100'> <Image src='/icons/svg/404-error.svg' alt='next' width='100' height='100'/> </div>
                        {browserArrayList.length > 0 &&
                            <div className='tx-center w-100 mt-4'>
                                <div className="bg-b-10 tx-center opaci-chov--50 pa-2 ord-r-8" onClick={()=>{updateClientToLocalstorage()}}>
                                    Save to Local
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
            <div className="flex-center Q_xs_sm_flex-col w-100 gap-4 flex-align-start ">
                {((keyName in hardCoded1 && !hardCoded1[keyName].isApiful) || !(keyName in hardCoded1)) &&
                    <div className="flex-col  flex-align-start ">
                        <h2 className=" tx-bold-5 flex-1 "> NO API Endpoint</h2>
                        <hr className="my-2 w-100"/>
                        <div className='tx-center w-100'> <Image src='/icons/svg/404-error.svg' alt='next' width='100' height='100'/> </div>
                    </div>
                }
                {keyName in hardCoded1 && hardCoded1[keyName].isApiful && <>
                    <APICrud {...{q__queriedObj, queriedObj, q__queriedAPI, queriedAPI, hardCoded1, keyName, saveAPIListToJson}}  />
                </>}
                
                <JSONFullCrud keyConfig={hardCodedMemo} {...{ keyName, q__queriedObj, queriedObj, deleteUnit}}/>
            </div>
        </div>
    </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <InventoryProvider>
                <SidebarContainer sidebar={<SessionSidebar/>}>{page}</SidebarContainer>
            </InventoryProvider>
        </Layout>
    )
}
    
export default Page

const getShopifyProducts = async function () {
    // const response = await fetch('https://dunowhy.myshopify.com/admin/api/2023-01/products.json', {
    // headers: {
    //     'X-Shopify-Access-Token': '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',
    //     'Content-Type': 'application/json'
    // }
    // });
    // const products = await response.json();
    return {
        datas: {
            // products: products.products,
            products: [],
            local: []
        }
    };
}
export const getServerSideProps = async (context) => {
    const asd =  process.env.GITHUB_ID
    let spaRes:any = {datas:{products:[]}}
    let theK = context.query.key
    // try {
    //     spaRes = await getShopifyProducts()
    // } catch (e) {
    //     console.log("failed server side request")
    // }
    return {
        props: {
            data: spaRes.datas,
            asd, theK, 
        },
    };
};
