import { ReactElement, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useLocalStorage } from 'usehooks-ts';


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/templates/Layout'
import SidebarContainer from '@/src/items/templates/SidebarContainer'
import WebPOVSidebar from "@/src/partials/index/WebPOVSidebar";
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import { AppContext } from '@/scripts/contexts/AppContext'
import { InventoryProvider } from '@/scripts/contexts/InventoryContext'
import AmountCards from '@/components/dashboard/AmountCards';
import { DEFAULT_TOKENS_ARRAY } from '@/components/scripts/constants';
import { fetchPost } from '@/scripts/helpers/fetchHelper';
import LandingInfo from '@/src/partials/bytecity/LandingInfo';
import LandingLinks from '@/src/partials/bytecity/LandingLinks';
import LandingCard from '@/src/partials/bytecity/LandingCard';
import LandingBackground from '@/src/partials/bytecity/LandingBackground';
import LandingSession from '@/src/partials/bytecity/LandingSession';
import { ChartDashboard } from '@/components/dashboard';
import { useRouter } from 'next/router';
import WebPOVLandingCard from '@/src/partials/webpov/WebPOVLandingCard';
import WebPOVLandingBackground from '@/src/partials/webpov/WebPOVLandingBackground';
import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';

const Page: NextPageWithLayout = ({ tokens }:PageProps) => {
    const { data:sessiondata, }:any = useSession();
    const bigmul = 50
    const mul = 11  
    const app = useContext(AppContext)
    const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "")
    const [rpi, s__rpi] = useState("")
    
    {/******************************************************************************************************/}
    const router = useRouter()

    useEffect(()=>{
        s__rpi(LS_rpi)
        app.s__sidebarLinks([])
        app.s__sidebarPages([
            {id:2,label:"Web Byte City",url:"https://bytc.vercel.app/",icon:"bingo"},
            ...(!LS_rpi ? [] : [
                {id:0,label:"History",url:"/trade/history/?pair=BTCUSDT",icon:"agreements"},
                {id:2,label:"Dashboard",url:"/?timeframe4h&token=btc",icon:"chart"}
            ]),
        ])
    },[])

    {/******************************************************************************************************/}

    const signInGoogle = () => {
        signIn("google")
    }
    const deleteLocalPlayer = async ()=> {
        let aconfirm = prompt("Disconnect Simulated Player Data? (yes/no)","yes")
        if (aconfirm != "yes") return

        localStorage.removeItem("localTokensArrayObj");
        localStorage.removeItem("rpi");
        window.location.reload()
    }
    const setIdByObject = (playerCredentials) => {
        let mergedString = `${playerCredentials.referral}:${playerCredentials.pin}`
        s__rpi(mergedString)
        s__LS_rpi(mergedString)
        window.location.reload()
    }
    const getLocalReferral = () => {
        return !sessiondata ? ( "user" ) : sessiondata.user.email
    }
    const trigger_createPlayer = () => {
        createPlayer(getLocalReferral())
    }
    const createPlayer = (username:string) => {
        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        let numberaccount = prompt(
            `Would you like to create a Simulated Player -> (${username}:${randomThousand})? \n\n\n Account Name: <${username}> \n pin Key Code: ${randomThousand} \n\n\n Remember to save your credentials \n You can use the *pin Key Code* to recover your account! `,
            `${randomThousand}`
        )
        if (!numberaccount) { return }
        if (parseInt(numberaccount) >= 10000) { return}

        registerPlayer({referral:username,pin:numberaccount})
    }
    const registerPlayer = async (playerCredentials:any) => {
        try {
            const res:any = await fetchPost('/api/player',playerCredentials)
            if (res.status >= 400) { return alert("ERROR") }

            setIdByObject(playerCredentials)            
            app.alert("success", "Simulated Player Registered succesfully!")
        } catch (e:any) {
            app.alert("error", "Couldn't log into player!")
        }
    }
    const connectPlayer = async (playerCredentials:any) => {
        try {
            const reqUrl = `/api/player?referral=${playerCredentials.referral}&pin=${playerCredentials.pin}`
            const res:any = await fetch(reqUrl)
            if (res.status >= 400) { return alert("ERROR") }

            setIdByObject(playerCredentials)
            app.alert("success", "Simulated Player logged in succesfully!")
            window.location.reload()
        } catch (e:any) {
            app.alert("error", "Couldn't log into player!")
        }
    }    
    const trigger_connectPlayer = () => {

        let username = getLocalReferral()
        console.table(username)
        
        let numberaccount = prompt(
            `Would you like to create a Simulated Player -> (${username}:????})? \n\n\n Account Name: 
            <${username}> \n pin Key Code: ???? \n\n\n Remember to save your credentials \n You can use the *pin Key Code* to recover your account! `,
            ``
        )
        if (!numberaccount) { return }
        if (parseInt(numberaccount) >= 10000) { return}

        connectPlayer({referral:username,pin:numberaccount})
    }

    {/******************************************************************************************************/}

    return (<>
    <div className='flex-center w-100  -min-100vh'>
        <div className="-min-90vh  w-100  flex-col flex-justify-start flex-align-stretch" 
            style={{background:"linear-gradient(0deg, #0d0d0d, #171717)"}}
        >

        
            {/* <WebPOVLandingCard /> */}





            <div className='w-100 flex-col pt- pb-100' style={{background:"linear-gradient(0deg, #090909, #171717)"}}>
          <div className="pt-100 Q_xs_md _ddg block">

          </div>
          <a href={"/"} className="block flex-col">
                    <h1 className='tx-bold- tx-ls-5   mt-0  pt-0 z-100 huerotate-  pos-abs top-0 tx-altfont-6 flex Q_xs_flex-col'
                        style={{color:"white", fontSize:"10em", /*  textShadow: "0 10px 50px #ffaa5555" */}}
                    >
                        <span className="opaci-50 opaci-chov--75 tx-bold-2 Q_md_x ">FAQ:</span>
                        <span className="tx-bold-6 opaci-chov--75 blurrotate-3 Q_md_x">Priv</span>
                        <div className="tx-bold-6 Q_sm flex-col translate-y--25">
                          <span className="opaci-50 tx-bold-2 h-max-100px opaci-chov--75 translate-y--25">FAQ:</span>
                          <span className="tx-bold-6 h-max-100px opaci-chov--75 blurrotate-3 opaci-50 ">Priv</span>
                        </div>
                        <small className="tx-bold-6 Q_xs flex-col ">
                          <span className="opaci-50 tx-bold-2 h-max-100px opaci-chov--75 ">FAQ:</span>
                          <span className="tx-bold-6 h-max-100px opaci-chov--75 blurrotate-3  ">Priv</span>
                        </small>
                    </h1>
                    </a>

            <div className='tx-white tx-center py-8 '>
                {/* <Link href="/">
                    
                </Link> */}
                {/* <h1 className=' tx-bold '
                    
                >
                    <span className="block Q_xs " style={{fontSize:"2.1em !important"}}>Byte City</span>
                    <span className="block tx-altfont-5 Q_sm_x" style={{fontSize:"3.5em !important"}}>Byte City</span>
                </h1> */}
            </div>
            
            <div className="pos-abs flex-col" >
                  <div className=" py-8 my-8 Q_md_x"></div>
                  <div className="Q_sm_x my-200 py-200 "></div>
                  <div className="Q_xs my-150 py-200 "></div>
                  <div className="Q_xs_md ">

                  <div className="flex-col gap-1    h-min-300px w-min-300px w-100 bord-r-100p  pos-rel" style={{background:"#090909"}}>
                      
                      <div className="flex  gap-1 ">
                        <div className=" bg-white box-shadow-i-5-b bg-ho-r pa- " style={{clipPath: "polygon(100% 0, 0 0, 100% 100%)",paddingLeft:"40px"}}></div>
                        <div className="bg-white box-shadow-i-5-b pa-8  bord-r-100p bg-ho-"></div>
                        <div className=" bg-white box-shadow-i-5-b bg-ho-b pa- " style={{clipPath: "polygon(100% 0, 0 0, 0% 100%)",paddingLeft:"40px"}}></div>
                      </div>
                      <div className=" bg-white pa-8 box-shadow-i-5-b bg-ho-g " style={{clipPath: "polygon(100% 0, 0 0, 50% 100%)"}}></div>
                      {/* <div className="pos-abs top-0 z-999">
                        <div className="spin-6 px-2 tx-xl">.
                          <div className="spin-5 px-2 tx-xl">.
                            <div className="spin-4 px-2 tx-xl">.
                              <div className="spin-3 px-2 tx-xl">.
                                <div className="spin-2 px-2 tx-xl">.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="Q_md_x  ">

                    <div className="flex-col gap-1 scale-90   h-min-500px w-min-500px w-100 bord-r-100p  pos-rel" style={{background:"#090909"}}>
                      
                      <div className="flex  gap-1 ">
                        <div className=" bg-white box-shadow-i-5-b bg-ho-r pa- " style={{clipPath: "polygon(100% 0, 0 0, 100% 100%)",paddingLeft:"150px"}}></div>
                        <div className="bg-white box-shadow-i-5-b pa-150  bord-r-100p bg-ho-"></div>
                        <div className=" bg-white box-shadow-i-5-b bg-ho-b pa- " style={{clipPath: "polygon(100% 0, 0 0, 0% 100%)",paddingLeft:"150px"}}></div>
                      </div>
                      <div className=" bg-white pa-150 box-shadow-i-5-b bg-ho-g " style={{clipPath: "polygon(100% 0, 0 0, 50% 100%)"}}></div>
                      {/* <div className="spin-8 pos-abs top-0 z-999">
                        <div className="spin-6 pr-5 tx-lx">.
                          <div className="spin-4 pl-8 tx-lg">.
                            <div className="spin-5 pr-4 tx-md">.
                              <div className="spin-2 pl-8 tx-sm">.
                                <div className="spin-3 pr-6 tx-xs">.
                                  <div className="spin-9 pl-8 tx-sm">.</div>
                                </div>.
                              </div>.
                            </div>.
                          </div>.
                        </div>.
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="bord-r-20 noverflow">

                </div>
            {/* <div className='py-5 invisible  block Q_xs'>q</div>
            <Link 
                className='pos-abs top-0 mt-250 py-2 opaci-chov--75 block pb-8 flex-col bg-glass-4 bg-b-10 px-1 pt-2  bord-r-25'
                style={{boxShadow:"0 4px 3px #00000022"}}
                href='https://bytc.vercel.app'
            >
                <Image src="/main2.png" alt="bank" width={244} height={255} className='mt-8' />
                <h1 className='tx-xl tx-shadow-2' style={{color:"orangered"}}>Play Now!</h1>
            </Link> */}
        </div>



            <div>
                <WebPOVLandingBackground />
                
                {!!rpi && !!sessiondata &&
                <div className='tx-white pt-100'>
                    <div className='Q_sm_x pt-200'></div>
                    {/* <div className='Q_xs_lg pt-100'></div> */}
                    <div className='Q_xs_lg pt-200'></div>

                    <div className='mt-100'>
                        <LandingLinks sessiondata={sessiondata} />                        
                    </div>
                </div>}
            </div>
            <div className="px-8 Q_xs_px-2 tx-white appear-delay-6">
                <div className='Q_sm_x pt-100'></div>

                <LandingSession {...{ rpi, sessiondata,
                    calls: { createPlayer:trigger_createPlayer, trigger_connectPlayer, signInGoogle, }
                }} />
                {!rpi && !!sessiondata && <>
                    <div className='Q_sm_md pt-100 pb-8'></div>
                </>}
            </div>
            
            {/* <div className='' >
                {!!rpi &&
                    <div className=' pa-3 flex-1 '>
                        <AmountCards tokens={tokens} {...{mul, bigmul}} />
                    </div>
                }
            </div>
            */}
            <div className='flex-center  flex-1'></div>
                
            {!!rpi &&
                <div className='flex flex-justify-end  pa-1'>
                    <button   className="ims-button-faded clickble nowrap  opaci-25 tx-md"
                        onClick={()=>{ deleteLocalPlayer() }}
                    >
                        - Disconnect Simulated Player
                    </button>
                </div>
            } 
        </div>
        
    </div>
    {/* <div className='Q_xs my-100'></div> */}
    <div className='flex-col pb-200 ' style={{background:"linear-gradient(180deg, #0d0d0d, #171717)"}}>
        <div className='w-max-1080px  w-100  flex-col flex-align-start'>
            <div className='my-100'></div>
            {/* <div className='w-100 py-100'> <LandingInfo /> </div> */}
        </div>  
    </div>  
    <div className='pt-200 flex-col tx-white h-100vh pb-200' style={{background:"linear-gradient(0deg, #090909, #171717)"}}>
        <div className='w-max-1080px px-4'>
            <h2 className='tx-xxl tx-bold-8 flex-col flex-justify-start gap-4 '>
                <div className='tx-altfont-6' > <span style={{textShadow:"-2px 0px 50px #9966ff"}}> Intuitive </span> Learning &</div>
                <div className='tx-altfont-4 opaci-chov--100 opaci-25' > Gamified <span style={{textShadow:"-2px 0px 50px #ff9966"}}> Investing </span></div>
            </h2>
            <hr className='my-2' />
            <p className='tx-lgx tx-bold-2 w-max-700px'>
            3D Web-Based Game Framework that optimizes learning and simplifies energy-investing through
            automated processes and immersive browser experiences.
            </p>
            <div className='w-100 flex-col gap-2  '>
                
                <Link href={"/whitepaperwebpov.pdf"} target='_blank' className=' pa-1 hover-  opaci-chov--75 py-3 my-3 bg-w-hov-10'>
                    {/* <div className='bg-b-50  bord-r-100p box-shadow-5-b noverflow'>
                        <Image src="/pfp.png" alt="bank" width={64} height={64} className='block' />
                    </div> */}
                    
                        <i className='pos- nowrap  tx-ls-1 underline flex-col-r pt-1 px-8'> WhitepaperWebPOV.pdf</i>
                    
                </Link>
                <div className='flex gap-4'>

<Link target='_blank' href="https://twitter.com/tresduno" className='bg-w-50 pa-1 hover-6 bord-r-100p flex-col opaci-chov--25'>
    <div className='bg-b-50  bord-r-100p box-shadow-5-b noverflow'>
        <Image src="/logo.jpg" alt="bank" width={64} height={64} className='block' />
    </div>
    <div className='pos-abs nowrap flex-col-r pt-1 bottom-0 translate-y-100'> <FaTwitter /> webpov</div>
</Link>

<Link target='_blank' href="https://twitter.com/tresduno" className='bg-w-50 pa-1 hover-7 bord-r-100p flex-col opaci-chov--25'>
    <div className='bg-b-50  bord-r-100p box-shadow-5-b noverflow'>
        <Image src="/pfp.png" alt="bank" width={64} height={64} className='block' />
    </div>
    <div className='pos-abs nowrap flex-col-r pt-1 bottom-0 translate-y-100'> <FaTwitter /> tresduno</div>
</Link>
                </div>

            </div>

        </div>
    </div>
    
{/* <div className="pos-rel  py-200  "  style={{ zIndex:"2000",background:"#090909" }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='pos-abs bottom-0'
        style={{transform:"translateY(1px)"}}
    >
        <path fill="#111111" fillOpacity="1" d="M0,270L1100,230L1440,320L1440,320L720,320L0,320Z"></path>
    </svg>
</div>

<div className="pos-rel tx-white  g-b-20 "  style={{ background:"#111111", zIndex:"2000", }}>
    <ChartDashboard query={{token:"btc",timeframe:"4h"}} user={sessiondata}/>
</div> */}

<div className='pos-rel noclick pb-200' style={{background:"linear-gradient(0,#DEF2FF, #ffffff)"}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className='pos-abs top-0'>
        <path fill="#111111" fillOpacity="1" d="M0,192L60,165.3C120,139,240,85,360,69.3C480,53,600,75,720,90.7C840,107,960,117,1080,106.7C1200,96,1320,64,1380,48L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
    </svg>

</div>
<div className=" pt-1 g-b-20 px-100 Q_xs_sm_px-2 h-min-100vh pos-rel  "
     style={{background:"linear-gradient(180deg,#DEF2FF, #7DCBFF)",}}
    >
    

    <div className="opaci-50 tx-ls-3 tx-lg my-2">Goal Balance</div>
    <AmountCards tokens={tokens} mul={11} bigmul={50}  />
    
</div>
<div className='pos-rel  w-100  flex-col-stretch'>
    <div className='pos-abs bottom-0  w-100 noverflow opaci-30'>
        <div className='translate-y-50' style={{
        width: '100%',
        height: '533px',
        backgroundImage: `url(https://i.imgur.com/BNcAXMX.png)`,
        backgroundSize: 'cover',
        backgroundPosition: "center",
        }}>
        </div>
    </div>
</div>


    </>)
}

type PageProps = {
    tokens: any;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>WebPOV</title></Head>
        <InventoryProvider>
            <SidebarContainer sidebar={<WebPOVSidebar/>}>{page}</SidebarContainer>
        </InventoryProvider>
    </Layout>
    )
}

export default Page

{/**********************************************************************************************************/}

export const getServerSideProps: GetServerSideProps<PageProps, ParsedUrlQuery> = async (context) => {
    let tokens = DEFAULT_TOKENS_ARRAY
    
    return {
      props: {
            tokens,
        },
    };
};