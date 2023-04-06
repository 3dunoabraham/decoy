import { ReactElement, Suspense, useContext, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useIsClient, useLocalStorage } from 'usehooks-ts';
import dynamic from 'next/dynamic'
import { FaExternalLinkAlt } from 'react-icons/fa';


import Layout from '@/src/items/templates/Layout';
import type { NextPageWithLayout } from '@/src/pages/_app'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import { AppContext } from '@/scripts/contexts/AppContext'
import ReloadCube from '../items/3d/overlay/ReloadCube';
import BitBingoLogo from '../items/3d/overlay/BitBingoLogo';
import SocialMediaButtons from '../items/3d/overlay/SocialMediaButtons';
import { useQuery } from '@tanstack/react-query';
import { parseDecimals } from '@/components/scripts/helpers';
const LiteLevel = dynamic(import ("@/src/items/3d/levels/LiteLevel"), { ssr: false })
const Scene = dynamic(import ("@/src/items/3d/core/Scene"), { ssr: false })

const Page: NextPageWithLayout = ({}) => {
    const router = useRouter()
    const app = useContext(AppContext)
    const $boxContainer:any = useRef()
    
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [uid, s__uid] = useState(LS_uid)
    const isClient = useIsClient()

    const theuserstart:any = useQuery({ queryKey: ['theuserstart'], 
        queryFn: async () => {
            let theuserres = await fetch("/api/start")
            let theuserinfo = await theuserres.json()
            console.log("theuserstart", theuserinfo)
            return theuserinfo
        }
    })




    return (
    <div className='flex-col h-min-100vh' style={{background:"linear-gradient(-15deg,#50545B,#28292D)"}}>
        <div className="h-min-100vh w-100   flex-col flex-justify-start flex-align-stretch" >
            <div className="pos-abs h-min-100vh  w-100 flex z-10 flex-align-stretch top-0 left-0"
            >
                <Suspense> {/* power is dynamic, argument sent is hardcoded and useless */}
                    {isClient && <Scene live={true} ref={$boxContainer}>
                        <LiteLevel {...{ power:null, form:null, onTextClick:null, optsToggler: null,
                                s__tokensArrayObj: null, toggleTrade:null, xOut:null, yOut:null, zOut:null,
                                tokensArrayObj: null, onTimeframeClick: null
                            }}
                        />
                    </Scene>}
                </Suspense>
            </div>
            <div className='flex flex-justify-center  gap-4 pos-fix w-100 z-800  ' >
                <BitBingoLogo />
                <ReloadCube />
            </div>
            <div className='flex-center z-500'>
                {isClient &&
                    <div className="flex-center pos-abs bg-b-50 bg-glass-5 " style={{border:"1px solid #FED034"}}>
                        {!!uid &&
                            <Link target="_blank" href="/dashboard"
                                className="tx-blue px-6 gap-2 tx-lgx flex-center opaci-chov--50 w-100 tx-bold-2 pt-100 pb-3 Q_sm_x"
                                style={{filter: "hue-rotate(-189deg) brightness(666%)"}}
                            >
                                <FaExternalLinkAlt /> Dashboard 
                            </Link>
                        }
                        {!uid &&
                            <Link target="_blank" href="/demo" className="tx-blue px-6 gap-2 tx-lgx flex-center opaci-chov--50 w-100 tx-bold-2 pt-100 pb-3"
                                style={{filter: "hue-rotate(-189deg) brightness(666%)"}}
                            >
                                DEMO
                            </Link>
                        }
                    </div>
                }
            </div>
            <div className='flex-1 noclick'>
            </div>
            <div className='flex-col   '>
                <SocialMediaButtons />
            </div>
        </div>
    </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>Bit Bingo Boom</title></Head>
        {page}
    </Layout>
    )
}

export default Page