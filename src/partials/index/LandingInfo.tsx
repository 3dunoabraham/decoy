"use client";
import Link from "next/link"
import {  FaAddressBook, FaMoneyBillAlt, FaStackExchange } from "react-icons/fa"


import LandingSectionOne from "./LandingSectionOne";
import LandingSectionTwo from "./LandingSectionTwo";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";

function LandingInfo({}) {
    const [LS_showInfo, s__LS_showInfo] = useLocalStorage("showWelcomeInfo","yes")
    const [showInfo, s__showInfo] = useState("yes")
    const toggleToggle = ()=>{
        let newVal = showInfo == "yes" ? "" : "yes"

        s__LS_showInfo(newVal)
        s__showInfo(newVal)
    }
    useEffect(()=>{
        s__showInfo(LS_showInfo)
    })
    return (
        <>
                {!!showInfo && <>
        <div className="px-4 " style={{background:"linear-gradient(0, #00000000, #099DFF22)", borderRadius:"75px 75px 0 0"}}>
            <div className="flex-col">
                {/* <h1 className="tx-primary tx-xl tx-center Q_xs ">
                    <small className="tx-bold-2 tx-faded tx-roman">Welcome to</small>
                    <span className="tx-altfont-2">
                        <div>web</div>
                        <div>pov</div>
                        <div>app</div>
                    </span>
                    <span className="tx-bold tx-altfont-1">
                        <span className="tx-"> BYTE </span>
                        <span className="tx-"> City: </span>
                    </span>
                </h1> */}
                    <div className="tx-bold-2 tx-faded tx-lg tx-ls-3 pt-8 ">Welcome to:</div>
                
                <h1 className="tx-primary tx-xxxl tx-center  ">
                    <span className="tx-altfont-3 " style={{
                        fontSize: "1.3em",
                        color:"white",
                        textShadow: "0 0 20px #00000077, 1px 1px 2px black, -1px -1px 2px grey, 2px 2px 2px black, -2px -2px 2px grey"
                    }}>
                        <div className="" style={{height:"60px"}}>web</div>
                        <div className="pl-8 " style={{height:"45px"}}>POV</div>
                        <div className="" style={{height:"53px"}}>app</div>
                    </span>
                    <span className="tx-bold tx-altfont-1 block tx-white tx-italic pt-4 flex-center gap-4 "
                        style={{
                            color:"",
                            transform:"rotate(-5deg)", 
                            textShadow: "1px 1px 0 #F379F1, -1px -1px 0 #F379F1, 2px 2px 0 #000000"
                        }}
                    >
                        <div className="tx- "> BYTE </div>
                        <div className="tx- "> City </div>
                    </span>
                </h1>
                <div  className="flex-col tx-lg tx-center gap-1">
                    <div  className="flex-center gap-1">
                        <div className="tx-faded">Intuitive</div>
                        <div><b style={{color:"#F379F1"}}> Learning </b></div>
                        <div><span className="tx-faded"> &</span></div>
                    </div>
                    <div  className="flex-center gap-1">
                        <div className="" style={{color:"orangered"}}>Gamified</div>
                        <div><b style={{color:"#099DFF"}}>Investing!</b></div>                        
                    </div>
                    
                </div>
            </div>


            <LandingSectionOne />


            {/* <div className="mt-200 hover-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#049BFF" fillOpacity="1" d="M0,224L720,64L1440,256L1440,320L720,320L0,320Z"></path></svg>
            </div> */}
            <div style={{background:"linear-gradient(180deg, #049BFF , #AEE3F6)", borderRadius: "75px 75px 0 0"}} className="pt-8 mt-8">
                <LandingSectionTwo />
            </div>
            <div className="z--1 pos-rel" style={{transform:"translateY(-1px)"}}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#AEE3F6" fillOpacity="1" d="M0,256L720,64L1440,160L1440,0L720,0L0,0Z"></path></svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#b3E8Fb" fill-opacity="1" d="M0,192L360,192L720,100L1080,192L1440,64L1440,0L1080,0L720,0L360,0L0,0Z"></path></svg>
            </div>

            <div className="mt-100  py-8  flex-col flex-align-end px-2">
                <div className="w-100 w-max-600px my-100">
                    <Link href="/" className="flex-col flex-align-end px-8 Q_xs_px-4 pt-8 pb-6 opaci-chov-50 opaci-75 box-shadow-2-b bord-r-25 pos-rel">
                        <div className="tx-xxxl pos-abs opaci-10 left-0 pa-4  top-0 tx-start"><FaStackExchange /></div>
                        <h3 className="tx-end pb-4 tx-lgx"
                            style={{color:"#099DFF"}}
                        >
                            Dive Into Investment Strategies:
                        </h3>
                        <p className="tx-end w-100 w-max-500px">Understand the concepts behind Dollar Cost Averaging (DCA) and Automated Trading Systems (ATS).</p>
                        <p className="tx-end w-100 w-max-500px Q_sm_x">Explore how these strategies can benefit your investment journey and enhance your trading approach.</p>
                    </Link>
                    <Link href="/" className="flex-col flex-align-end my-100 px-8 Q_xs_px-4 pt-8 pb-6 opaci-chov-50 opaci-75 box-shadow-2-b bord-r-25 pos-rel">
                        <div className="tx-xxxl pos-abs opaci-25 left-0 pa-4 tx-green top-0 tx-start"><FaMoneyBillAlt /></div>
                        <h3 className="tx-end pb-4 tx-lgx"
                            style={{color:"#099DFF"}}
                        >
                            Learn About DCA:
                        </h3>

                        <p className="tx-end w-100 w-max-500px">Explore the Ecosystem:</p>
                        <p className="tx-end w-100 w-max-500px ">Discover the different market sectors, protocols, and tokens that form the foundation of Byte City. </p>
                        <p className="tx-end w-100 w-max-500px Q_sm_x">Gain insights into the core, utility, and side-chain tokens that power our platform.</p>
                    </Link>
                    <Link href="/" className="flex-col flex-align-end px-8 Q_xs_px-4 pt-8 pb-6 opaci-chov-50 opaci-75 box-shadow-2-b bord-r-25 pos-rel">
                        <div className="tx-xxxl pos-abs opaci-25 left-0 pa-4 tx-link top-0 tx-start"><FaAddressBook /></div>
                        <h3 className="tx-end pb-4 tx-lgx"
                            style={{color:"#099DFF"}}
                        >
                            Browse Ecosystem:
                        </h3>

                        <p className="tx-end w-100 w-max-500px">Get Started with Byte City:</p>
                        <p className="tx-end w-100 w-max-500px ">Follow our step-by-step tutorials to navigate the platform effectively. </p>
                        <p className="tx-end w-100 w-max-500px Q_sm_x">Learn how to play, understand the stages, and amplify your reach. Whether you&apos;re a beginner or an experienced investor, our tutorials will guide you through the process.</p>
                    </Link>
                </div>
            </div>
            </div>
            
        </>}
        
        <div className="flex-col flex-align-end opaci-chov--50 pos-rel"
            onClick={()=>toggleToggle()}
            style={{zIndex:3000}}
        >
            <div>Click here to</div>
            {showInfo && <div>Hide Welcome Info ↑</div> }
            {!showInfo && <div>Show Welcome Info!</div> }
        </div>
        <div className="px-4 py-8 noverflow " style={{background:"linear-gradient(180deg, #00000000, #099DFF22)", borderRadius:"0 0 75px 75px"}}>
            <div className="flex-wrap flex-align-start w-100  bg-w-50 bord-r-50 px-4 py-8 pos-rel" style={{zIndex:2500}}>
                <div className="flex-col flex-align-start">
                    <div className="opaci-50 underline pb-3">Important Links</div>
                    <Link href="/" className="tx-link ma-0 py-1 tx-lg opaci-chov--50">
                        Twitter: <b>@bytecty</b>
                    </Link>
                    <Link href="/" className="tx-link ma-0 py-1 tx-lg opaci-chov--50">
                        Youtube: <b>@webpov</b>
                    </Link>
                    <Link href="/" className="tx-link ma-0 py-1 tx-lg opaci-chov--50">
                        Twitter: <b>@webpov</b>
                    </Link>
                    <Link href="/" className="tx-link  tx-lgx opaci-chov--50 py-6">
                        Byte City Game URL: <b className="underline">bytc.vercel.app</b>
                    </Link>
                </div>
                <div className="flex-col flex-align-start">
                    <div className="opaci-50 underline pb-3">Documentation</div>
                    <Link href="/" className="tx-link pt-1 tx-lg opaci-chov--50">
                        Getting Started: <b>How to Play?</b>
                    </Link>
                    <Link href="https://webpov.gitbook.io/gtabtc/what-is-byte-city/faq" className="tx-link pt-1 tx-lg opaci-chov--50">
                        FAQ: <b>Frequently Asked Questions</b>
                    </Link>
                    <Link href="https://webpov.gitbook.io/gtabtc/about-us/where-to-go-links" className="tx-link pt-1 tx-lg opaci-chov--50">
                        More: <b>More Links</b>
                    </Link>
                </div>
                <div className="flex-1"></div>
            </div>
        </div>
    </>)
}

export default LandingInfo

