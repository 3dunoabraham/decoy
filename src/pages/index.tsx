import { ReactElement, Suspense, useContext, useMemo, useRef } from 'react'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';


import type { NextPageWithLayout } from '@/src/pages/_app'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { LOCAL_URL } from '@/scripts/constants/api'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import { AppContext } from '@/scripts/contexts/AppContext'
import { useRouter } from 'next/router'
import { OFFLINE_UNITS_ARRAY } from '@/scripts/constants/inventory';
import Link from 'next/link';
import { BsGear, BsGithub, BsMenuButton, BsSafe, BsTwitter } from 'react-icons/bs';
import { HiCubeTransparent } from 'react-icons/hi2';
import { ImBook } from 'react-icons/im';
import Layout from '@/src/items/templates/Layout';
import LoadingPill from '@/src/items/atoms/holders/LoadingPill';
import DarkImsCard from '@/src/partials/index/DarkImsCard';
import FailedRequest from '@/src/items/atoms/holders/FailedRequest';
import { useIsClient } from 'usehooks-ts';
import dynamic from 'next/dynamic'
import { FaExternalLinkAlt } from 'react-icons/fa';
const LiteLevel = dynamic(import ("@/src/items/3d/levels/LiteLevel"), { ssr: false })
const Scene = dynamic(import ("@/src/items/3d/core/Scene"), { ssr: false })
const delay = ms => new Promise(res => setTimeout(res, ms));
const Page: NextPageWithLayout = ({online,asd}:PageProps) => {
    const router = useRouter()
    const app = useContext(AppContext)
    const $boxContainer:any = useRef()
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
    const wiplookup = {
        art: {txColor:"#ffffff",color:"#33A9FE",title:"Art"},
        code: {txColor:"#ffffff",color:"#35DF91",title:"Code"},
        game: {txColor:"#ffffff",color:"#EC4F30",title:"Games"},
    }
    const isClient = useIsClient()
    return (
    <div className='flex-col w-100 h-min-100vh pos-rel ' style={{background:"linear-gradient(0deg,#50545B,#28292D)"}} >
        <div className="h-min-100vh w-100   flex-col flex-justify-start flex-align-stretch" style={{}} >
            <div className="pos-abs h-min-100vh  w-100 flex z-10 flex-align-stretch top-0 left-0"
            >
                <Suspense> {/* power is dynamic, argument sent is hardcoded and useless */}
                    {isClient && <Scene live={true} ref={$boxContainer}>
                        <LiteLevel 
                            {...{
                                power:null, form:null, onTextClick:null, toggleTrade:null, xOut:null, yOut:null, zOut:null,
                            }}
                        />
                    </Scene>}
                </Suspense>
            </div>
            <div className='flex flex-justify-center  gap-4 pos-fix w-100 z-800  ' >
                <Link href="/" className="pos-abs top-0 left-0 flex-col flex-align-start gap-2 tx-white  z-800 ">
                    <div className="a tx-xl flex z-400 px-4 h-50px gap-2">
                        <div className="a tx-xxl tx-bold-8">B</div>
                        <div className="a tx-xxl tx-bold-3 pl-5">t</div>
                    </div>
                    <div className="a tx-lx flex z-400 px-4 h-50px">
                        <div className="a tx-lx tx-bold-5 pl-3">C</div>
                        <div className="a tx-lx tx-bold-3 ">
                            <div className='invisible'>III</div>
                            <div className='tx-xxl scale-200 pos-abs bottom-0 pb-2 pl-1 tx-bold-3'>
                                i
                            </div>
                        </div>
                        <div className="a tx-lx tx-bold-6">TY</div>
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
            <div className='flex-center z-500'>
                <div className="flex-center pos-abs bg-b-50 bg-glass-5 " style={{border:"1px solid #FED034"}}>
                    <Link target="_blank" href="/dashboard" className="tx-blue px-6 gap-2 tx-lgx flex-center opaci-chov--50 w-100 tx-bold-2 pt-100 pb-3"
                        style={{filter: "hue-rotate(-189deg) brightness(666%)"}}
                    >
                        <FaExternalLinkAlt /> Dashboard 
                    </Link>
                    <Link target="_blank" href="/demo" className="tx-blue px-6 gap-2 tx-lgx flex-center opaci-chov--50 w-100 tx-bold-2 pt-100 pb-3"
                        style={{filter: "hue-rotate(-189deg) brightness(666%)"}}
                    >
                        DEMO
                    </Link>
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
                    <Link href="https://twitter.com/alt_dunno" target="_blank" 
                        className="bg-w-10 pa-3 opaci-chov--50">
                        <div className="flex bg-white bord-r-100p tx-lg pa-1">
                            <BsTwitter />
                        </div>
                    </Link>
                    <Link href="https://dev.to/3dunoabraham" target="_blank" 
                        className="bg-w-10 pa-3 opaci-chov--50">
                        <div className="flex bg-white bord-r-100p tx-lg pa-1">
                            <ImBook />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        {/* {q__unitsArray.isLoading &&
            <div className=' flex-col  z-999' style={{filter: "hue-rotate(180deg) brightness(250%)"}}>
                <LoadingPill title={"Fetching units..."} />
            </div> 
        }
        {q__unitsArray.isError &&
            <div className=' flex-col mt-150'>
                <FailedRequest preview={LOCAL_URL+"/?offline"} />
            </div> 
        } */}
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
        <Head><title>Bitcity</title></Head>
        {page}
    </Layout>
    )
}

export default Page

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