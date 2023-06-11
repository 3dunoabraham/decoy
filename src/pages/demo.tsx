import { ReactElement, Suspense, useContext, useMemo, useRef } from 'react'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useIsClient } from 'usehooks-ts';
import dynamic from 'next/dynamic'
import { BsGithub,BsTwitter } from 'react-icons/bs';
import { HiCubeTransparent } from 'react-icons/hi2';
import { ImBook } from 'react-icons/im';


import type { NextPageWithLayout } from '@/src/pages/_app'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import { AppContext } from '@/scripts/contexts/AppContext'
import { OFFLINE_UNITS_ARRAY } from '@/scripts/constants/inventory';
import Layout from '@/src/items/templates/Layout';

const DemoLevel = dynamic(import ("@/src/items/3d/levels/DemoLevel"), { ssr: false })
const Scene = dynamic(import ("@/src/items/3d/core/Scene"), { ssr: false })
const delay = ms => new Promise(res => setTimeout(res, ms));
const Page: NextPageWithLayout = ({online,asd}:PageProps) => {
    const router = useRouter()
    const app = useContext(AppContext)
    const $boxContainer:any = useRef()
    const isClient = useIsClient()
    const wiplookup = {
        art: {txColor:"#ffffff",color:"#33A9FE",title:"Art"},
        code: {txColor:"#ffffff",color:"#35DF91",title:"Code"},
        game: {txColor:"#ffffff",color:"#EC4F30",title:"Games"},
    }
    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitData'], refetchOnWindowFocus: false, retry: 1,
        queryFn: async () =>{

            if (!app.online) { return OFFLINE_UNITS_ARRAY }
            let theUrl = "https://duno.vercel.app/projects.json"
            let theRequest = await fetch(theUrl);
            let theJsonResult = await theRequest.json()
            await delay(5000);
            return theJsonResult
        }
    },[])
    const inventoryItems = useMemo(()=>{
        let rdm = parseInt(`${Math.random()*1000 * unitsArray.length}`).toLocaleString("en-US")
        const _inventoryItems = [
            { companyName: "Company A", unitsArray, totalValue: rdm },
        ];
        return _inventoryItems
    },[unitsArray])
    const cats = useMemo(()=>{
        return getUniqueCategories(unitsArray)
    },[unitsArray])
    function getUniqueCategories(data) {
        let categories = [];
        data.forEach(function(item) {
          if(!categories.includes(item.category)) {
            categories.push(item.category);
          }
        });
        return categories.sort(function (a, b) {
            return a.length[0] - b.length[0];
        }).reverse();
    }

    {/******************************************************************************************************/}

    return (
    <div className='flex-col w-100 h-min-100vh pos-rel ' style={{background:"linear-gradient(-90deg,#f4efdf,#94D8E9)"}} >
        <div className="h-min-100vh w-100   flex-col flex-justify-start flex-align-stretch" style={{}} >
            <div className="pos-abs h-min-100vh  w-100 flex z-10 flex-align-stretch top-0 left-0"
            >
                <Suspense>
                    {isClient &&
                        <Scene ref={$boxContainer} live={false}>
                            <DemoLevel {...{
                                power:null, form:null, onTextClick:null, optsToggler: null, s__tokensArrayObj: null,
                                toggleTrade:null, xOut:null, yOut:null, zOut:null, tokensArrayObj: null, onTimeframeClick: null

                            }}/>
                        </Scene>
                    }
                </Suspense>
            </div>
            <div className='flex flex-justify-center  gap-4 pos-fix w-100 z-800  ' >
                <Link href="/" className="pos-abs top-0 pt-4 opaci-chov--50 left-0 flex-col flex-align-start gap- tx-white  z-800 ">
                    <div className="a tx-lg flex z-400 px-4  gap">
                        <div className="a tx-l tx-bold-8">← Go Back</div>
                    </div>
                    <div className="a tx-lg flex z-400 px-4 ">
                        <div className="a tx-l tx-bold-6">to WebPov</div>
                    </div>
                </Link>
                <div className=' tx-blue  tx-xl pa-8 opaci-chov--50 z-800 pos-abs right-0  spin-120'
                    style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                    onClick={() => {if (isClient && prompt("Reload Game? (yes/no)","yes") == "yes") { router.reload() }}} 
                >
                    <HiCubeTransparent />
                </div>
                <div className='tx-white blur-4 z-500 pos-abs top-0 right-0 noclick pa-8 hover-4 spin-60'>
                    <div className=' tx-blue tx-xl  opaci-chov--50 '
                        style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                    >
                        <HiCubeTransparent />
                    </div>
                </div>
            </div>
            <div className='flex-1 noclick'>
            </div>
            <div className='flex-col   '>
                <div className='flex w-100 w-max-1080px gap-2  z-500'>
                    <Link href="https://github.com/3dunoabraham" target="_blank" 
                        className="bg-w-10 pa-3 opaci-chov--50">
                        <div className="flex bg-white bord-r-100p tx-lg pa-1">
                            <BsGithub />
                        </div>
                    </Link>
                    <Link href="https://twitter.com/webpov" target="_blank" 
                        className="bg-w-10 pa-3 opaci-chov--50">
                        <div className="flex bg-white bord-r-100p tx-lg pa-1">
                            <BsTwitter />
                        </div>
                    </Link>
                    <Link href="https://webpov.gitbook.io/bytecity" target="_blank" 
                        className="bg-w-10 pa-3 opaci-chov--50">
                        <div className="flex bg-white bord-r-100p tx-lg pa-1">
                            <ImBook />
                        </div>
                    </Link>
                </div>
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
        <Head><title>WebPov</title></Head>
        {page}
    </Layout>
    )
}

export default Page

{/**********************************************************************************************************/}

export const getServerSideProps: GetServerSideProps<PageProps, ParsedUrlQuery> = async (context) => {
    const { offline } = context.query;
    const online = typeof offline === 'undefined';
    const asd =  0
  
    return {
        props: {
            online,asd,
        },
    };
};