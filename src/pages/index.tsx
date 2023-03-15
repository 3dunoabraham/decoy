import { ReactElement, useContext, useEffect, useMemo } from 'react'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import SessionSidebar from "@/src/items/templates/SessionSidebar";
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { API_UNITS, LOCAL_URL } from '@/scripts/constants/api'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import ImsCard from '@/src/partials/index/ImsCard'
import LoadingPill from '@/src/items/atoms/holders/LoadingPill'
import FailedRequest from '@/src/items/atoms/holders/FailedRequest'
import { AppContext } from '@/scripts/contexts/AppContext'
import { useRouter } from 'next/router'
import { OFFLINE_UNITS_ARRAY } from '@/scripts/constants/inventory';
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import Link from 'next/link';

const Page: NextPageWithLayout = ({online,asd}:PageProps) => {
    const router = useRouter()
    const inv = useContext(InventoryContext)
    const app = useContext(AppContext)

    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitData'], refetchOnWindowFocus: false, retry: 1,
        queryFn: async () =>{
            if (!app.online) { return OFFLINE_UNITS_ARRAY }
            let theUrl = API_UNITS+"uids/"
            let theRequest = await fetch(theUrl);
            let theJsonResult = await theRequest.json()
            return theJsonResult
        }
    },[])
    const inventoryItems = useMemo(()=>{
        let rdm = parseInt(`${Math.random()*1000 * unitsArray.length}`).toLocaleString("en-US")

       
        const _inventoryItems = [
            { companyName: "Company A", unitsArray, totalValue: rdm },
            // { companyName: "Company B", unitsArray: [4, 5, 6], totalValue: "20,000" },
        ];
        return _inventoryItems
    },[unitsArray])
    useEffect(()=>{
        // inv.s__unitsArray([])
        // console.log(inv)
        app.s__sidebarLinks([])
        app.s__sidebarPages([
            {id:0,label:"Agreements",url:"/agreements/",icon:"agreements"},
            {id:1,label:"Users",url:"/users/",icon:"users"},
            {id:2,label:"3D Builder",url:"/builder/3d/",icon:"builder3d"},
        ])
    },[])


    return (
    <div className='flex-center w-100 h-min-100vh'>
        <div className="h-min-100vh w-100  flex-col flex-justify-start flex-align-stretch">
            <div className="px-8 ">
                <BreadCrumbs pages={[]} current="Dashboard" />
                
                <div className="flex-center mb-8">
                    <h1 className="pt-4 tx-bold-5 flex-1 ">
                        Inventory
                    </h1>
                    
                    <Link  href="/unit/add" className="ims-button-primary clickble nowrap">
                        + New Unit
                    </Link>
                </div>
            </div>
            {q__unitsArray.isLoading &&
                <div className=' flex-col mt-150'>
                    <LoadingPill title={"Fetching units..."} />
                </div> 
            }
            {q__unitsArray.isError &&
                <div className=' flex-col mt-150'>
                    <FailedRequest preview={LOCAL_URL+"/?offline"} />
                </div> 
            }
            <div className='flex-wrap flex-justify-start gap-4' >
                {unitsArray.length > 0 && inventoryItems.map((item, index) => (
                    <ImsCard
                        key={index}
                        companyName={item.companyName}
                        unitsArray={item.unitsArray}
                        totalValue={item.totalValue}
                        />
                    ))
                }
            </div>
            

            <div className='flex-center  flex-1'>
            </div>
        </div>
    </div>
    )
}

type PageProps = {
    online: boolean;
    asd: any;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>IMS</title></Head>
        <InventoryProvider>
            <SidebarContainer sidebar={<SessionSidebar/>}>{page}</SidebarContainer>
        </InventoryProvider>
    </Layout>
    )
}

export default Page

export const getServerSideProps: GetServerSideProps<PageProps, ParsedUrlQuery> = async (context) => {
    const { offline } = context.query;
    const online = typeof offline === 'undefined';
    const asd =  process.env.GITHUB_ID
  
    return {
      props: {
        online,asd,
      },
    };
  };