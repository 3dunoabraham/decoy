"use client";
import { ReactElement } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import { InventoryProvider } from '@/scripts/contexts/InventoryContext'
import { BreadCrumbs } from '@/src/items/atoms/common/BreadCrumbs'
import TradeHistory from '@/src/partials/trade/history/TradeHistory';

const Page: NextPageWithLayout = ({pair, session}:any) => {
    
    return (
        <div className='flex-center w-100 h-min-100vh'>
            <div className="h-min-100vh w-100  flex-col flex-justify-start flex-align-stretch gap-4">
                <div className="px-8  mb-">
                    <BreadCrumbs pages={[["/trade","Trade"]]} current="History" />
                    
                    <div className="flex-center mb-">
                        <h1 className="pt-4 tx-bold-5 flex-1 "> Trade History ({pair})</h1>
                    </div>
                    <hr className="my-2 "/>
                </div>

                <TradeHistory session={session} pair={pair} />

                <div className='flex-center mt-100 flex-1'></div>
            </div>
        </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>History | WebPov</title></Head>
        <InventoryProvider>
            <SidebarContainer sidebar={<></>}>
                {page}
            </SidebarContainer>
        </InventoryProvider>
    </Layout>
    )
}

export default Page

{/**********************************************************************************************************/}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { pair } = context.query;
    const session = await getToken({ req:context.req, secret: process.env.NEXTAUTH_SECRET })

    return {
      props: {
        pair,session,
      },
    };
  };