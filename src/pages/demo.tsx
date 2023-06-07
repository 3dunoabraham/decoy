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
const DemoLevel = dynamic(import ("@/src/items/3d/levels/DemoLevel"), { ssr: false })
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
                        <div className="a tx-l tx-bold-6">to WebGamed</div>
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
                    <Link href="https://twitter.com/webgamed" target="_blank" 
                        className="bg-w-10 pa-3 opaci-chov--50">
                        <div className="flex bg-white bord-r-100p tx-lg pa-1">
                            <BsTwitter />
                        </div>
                    </Link>
                    <Link href="https://webgamed.gitbook.io/bytecity" target="_blank" 
                        className="bg-w-10 pa-3 opaci-chov--50">
                        <div className="flex bg-white bord-r-100p tx-lg pa-1">
                            <ImBook />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        {q__unitsArray.isLoading &&
            <div className=' flex-col  z-999' style={{filter: "hue-rotate(180deg) brightness(250%)"}}>
                <LoadingPill title={"Fetching units..."} />
            </div> 
        }
        {q__unitsArray.isError &&
            <div className=' flex-col mt-150'>
                <FailedRequest preview={LOCAL_URL+"/?offline"} />
            </div> 
        }


        {false && <>
            <div className="h-min-100vh w-100  flex-col " style={{background:"#0a0a0a"}}>
                <div className='flex-wrap flex-justify-center gap-5 my-100 w-max-1080px' >
                    {cats.map((aCat, index) => {
                        const catArray = unitsArray.filter((aUnit,index)=> {return aUnit.category == aCat})
                        return (
                            <div className="flex" key={index}>
                                {unitsArray.length > 0 && inventoryItems.map((item, index) => (
                                    <DarkImsCard
                                        url={"/portfolio?cat="+aCat}
                                        key={index}
                                        title=" Projects"
                                        subtitle=" Projects"
                                        companyName={wiplookup[aCat].title}
                                        color={wiplookup[aCat].color}
                                        txColor={wiplookup[aCat].txColor}
                                        unitsArray={catArray}
                                        action="Details"
                                    >
                                        <div className="flex-col px-3 ddb">
                                            <details className="flex ddr w-100">
                                                <summary className='opaci-chov--50 pa-2 w-100 ddg'>
                                                    Projects
                                                </summary>
                                                <div className='flex-wrap w-max-400px gap-1 ddg'>
                                                    {catArray.map((aCatItem,index)=>{
                                                        if (!!aCatItem.url) {
                                                            return (
                                                                <Link href={aCatItem.url} key={index}
                                                                    className="flex px-2 opaci-chov--50  py-1 ims-border-faded bord-r-8"
                                                                >
                                                                    {aCatItem.slug}
                                                                    <div className="tx-xs">
                                                                        {!!aCatItem.url ? "+URL" : ""}
                                                                    </div>
                                                                </Link>
                                                            )
                                                        }
                                                        return (
                                                            <div className="flex px-2 py-1 ims-border-faded bord-r-8 opaci-50 tx-bold-2 tx-sm"
                                                                key={index}
                                                            >
                                                                {aCatItem.slug}
                                                                <div className="tx-xs">
                                                                    {!!aCatItem.url ? "+URL" : ""}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </details>
                                        </div>
                                    </DarkImsCard>
                                    ))
                                }
                            </div>
                        )
                    })}
                </div>
                <div className='flex-center  flex-1'>
                </div>
            </div>
            <div className="h-min-100vh w-100  flex-col " >
                <div className='flex-wrap flex-justify-center gap-5 my-100 w-max-1080px tx-white' >
                    <div className="tx-xl opaci-75">Abraham Duno</div>
                    <div className="tx-lg opaci-50 w-50 w-max-250px">Full-Stack Developer for Web, App, and Game Platforms. </div>
                </div>
                <div className=' flex-justify-center gap-5 my-100  tx-white Q_xs_lg_flex-col flex-row px-100 Q_xs_lg_px-4 ' >
                    <div className="tx-lgx   w-max-600px w-100">
                        <span className='opaci-50'>Over 5 years of experience in</span>
                        <span>
                            <b className='tx-lgx'> Front-end </b>
                            <span className='opaci-50'> and </span>
                            <b className='tx-lgx'> Back-end </b>
                            development
                            <span className='opaci-50'> across </span>
                            all the most popular platforms
                        </span>
                        .
                    </div>
                    <div className="tx-lg w-max-600px w-100 px-2">
                        <span className='opaci-50 pr-2'>
                            Throughout my career, I have
                            gained expertise in creating interactive and intuitive digital experiences in 
                        </span>
                        <span className='tx-lgx' style={{filter:"brightness(999%) "}}>
                            <span className=' tx-bold-2'>more than </span>
                            <b> 100 </b> 
                            <span className=' tx-bold-2'> projects such as </span>
                            <b style={{filter:"hue-rotate(15deg)"}} className='tx-bold-2 tx-red'> games </b>
                            ,
                            <b className='tx-bold-2 tx-green opaci-75' style={{filter:"hue-rotate(80deg)"}}> websites </b>
                            ,
                            <b style={{filter:"hue-rotate(40deg)"}} className='tx-bold-2 tx-red opaci-75'> apps </b>
                            ,
                            <b style={{filter:"hue-rotate(-10deg)"}} className='tx-bold-3 opaci-75 tx-blue'> shops </b>
                            ,
                            <b className='tx-bold-2 opaci-75 tx-blue' style={{filter:"hue-rotate(50deg)"}}> blogs </b>
                            ,
                            <span className='opaci-50'>and</span>
                            <b className='tx-green tx-bold-2'> libraries</b>.
                        </span>
                        <span className='opaci-50 pl-2'>
                            I am experienced in using frameworks such as Laravel, Next.js, Three.js, Jest, and Hardhat for
                            development and testing of various applications. 
                        </span>
                    </div>
                    <div className="tx-lx opaci-75 w-min-300px">Priorities
                        <ul>
                            <li>  User Experience </li>
                            <li>  Clean Code </li>
                            <li className='tx-lgx'>  Online/Offline Data Sync </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="h-min-100vh w-100  flex-col " style={{background:"#0a0a0a"}} >
                <div className=' flex-justify-center gap-5 my-100  tx-white Q_xs_lg_flex-col flex-row px-100 Q_xs_lg_px-4 ' >
                    <div className="tx-lg w-max-600px w-100">
                        <span className='opaci-50'> I have a passion for </span>
                        creating interactive and intuitive digital experiences.
                        <span className='opaci-50'> Throughout my career, I always keep
                        the user&apos;s engagement in mind. </span>
                    </div>
                    <div className="tx-lx opaci- w-min-300px">Key Skills
                        <ul className='tx-lgx opaci-75'>
                            <li>  Engaging UX/UI</li>
                            <li>  Excelling in Teams</li>
                            <li>  Expert in Responsive Design</li>
                            <li>  Efficient Framework Utilization</li>
                            <li>  Low Dependency Projects </li>
                            <li>  3D Browser Experience </li>
                            <li>  EVM-Readable Contracts</li>
                            <li>  Full-Stack MVC Projects</li>
                            <li>  Seamless Multi-Platform Apps</li>
                        </ul>
                    </div>
                    <div className="tx-lg w-max-600px w-100 px-2">
                        <span className='opaci-50 pr-2'>
                            Throughout my career, I have
                            created e-commerce, portfolio, and blog websites using WordPress and PrestaShop,
                            including custom plugins and libraries from developed scratch.
                        </span>
                    </div>
                    <div className="tx-lg w-max-600px w-100 px-2">
                        <span className='opaci-50 pl-2'>
                            I have collaborated with development and design teams to create a user-friendly and intuitive UI/UX software.
                        </span>
                    </div>
                    <div className="tx-lg w-max-600px w-100 px-2">
                        <span className='opaci-50 pl-2'>
                            I&apos;ve also developed several fully-equipped scheduling and inventory systems with 2D and 3D components using NextJs
                            and ThreeJs for data visualization, and utilized problem-solving skills to troubleshoot and resolve issues with product owner&apos;s requirements.
                        </span>
                    </div>
                </div>
            </div>
        </>}
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
        <Head><title>WebGamed</title></Head>
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