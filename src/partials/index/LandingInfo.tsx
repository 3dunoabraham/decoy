"use client";
import Link from "next/link"
import {  FaAddressBook, FaMoneyBillAlt, FaStackExchange } from "react-icons/fa"


import LandingSectionOne from "./LandingSectionOne";
import LandingSectionTwo from "./LandingSectionTwo";

function LandingInfo({}) {
    return (
        <div className="px-4 pt-8 " style={{background:"linear-gradient(0, #00000000, #099DFF22", borderRadius:"75px 75px 0 0 "}}>
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
                <div className="tx-bold-2 tx-faded tx-lg tx-ls-3 ">Welcome to:</div>
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
                <div  className="flex-col tx-lg tx-center">
                    <div style={{color:"#F379F1"}}>Simplifying <b>Investing</b> and</div>
                    <div className="flex-wrap gap-1" style={{color:"#099DFF"}}>
                        <b>Learning</b>
                        <div className="tx-lgx" style={{color:"orangered"}}>with <b>Gamification</b>!</div>
                    </div>
                    
                </div>
            </div>

            <h1 className="tx-link opaci-chov--25 mt-100 tx-center flex-wrap ">
                <Link href="https://bytc.vercel.app">
                    <span className="block tx-bold-2 nowrap">Click here to play:</span>
                    <b className="block tx-bold-8">bytc.vercel.app</b>
                </Link>
            </h1>

            <LandingSectionOne />


            {/* <div className="mt-200 hover-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#049BFF" fillOpacity="1" d="M0,224L720,64L1440,256L1440,320L720,320L0,320Z"></path></svg>
            </div> */}
            <div style={{background:"linear-gradient(180deg, #049BFF , #AEE3F6)", borderRadius: "75px 75px 0 0"}} className="pt-8 mt-8">
                <LandingSectionTwo />
            </div>
            <div className="z--1 pos-rel" style={{transform:"translateY(-1px)"}}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#AEE3F6" fillOpacity="1" d="M0,256L720,64L1440,160L1440,0L720,0L0,0Z"></path></svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#AEE3F6" fill-opacity="1" d="M0,192L360,192L720,100L1080,192L1440,64L1440,0L1080,0L720,0L360,0L0,0Z"></path></svg>
            </div>

            <div className="mt-150 py-100 my-100 flex-col flex-align-end px-2">
                <div className="w-100 w-max-600px my-100">
                    <Link href="/" className="flex-col flex-align-end px-8 Q_xs_px-4 pt-8 pb-6 opaci-chov-50 opaci-75 box-shadow-2-b bord-r-25 pos-rel">
                        <div className="tx-xxxl pos-abs opaci-10 left-0 pa-4  top-0 tx-start"><FaStackExchange /></div>
                        <h3 className="tx-end pb-2 tx-lgx">Dive Into Investment Strategies:</h3>
                        <p className="tx-end w-100 w-max-500px">Understand the concepts behind Dollar Cost Averaging (DCA) and Automated Trading Systems (ATS).</p>
                        <p className="tx-end w-100 w-max-500px Q_sm_x">Explore how these strategies can benefit your investment journey and enhance your trading approach.</p>
                    </Link>
                    <Link href="/" className="flex-col flex-align-end my-100 px-8 Q_xs_px-4 pt-8 pb-6 opaci-chov-50 opaci-75 box-shadow-2-b bord-r-25 pos-rel">
                        <div className="tx-xxxl pos-abs opaci-25 left-0 pa-4 tx-green top-0 tx-start"><FaMoneyBillAlt /></div>
                        <h3 className="tx-end pb-2 tx-lgx">Learn About DCA | Learn About ATS</h3>

                        <p className="tx-end w-100 w-max-500px">Explore the Ecosystem:</p>
                        <p className="tx-end w-100 w-max-500px ">Discover the different market sectors, protocols, and tokens that form the foundation of Byte City. </p>
                        <p className="tx-end w-100 w-max-500px Q_sm_x">Gain insights into the core, utility, and side-chain tokens that power our platform.</p>
                    </Link>
                    <Link href="/" className="flex-col flex-align-end px-8 Q_xs_px-4 pt-8 pb-6 opaci-chov-50 opaci-75 box-shadow-2-b bord-r-25 pos-rel">
                        <div className="tx-xxxl pos-abs opaci-25 left-0 pa-4 tx-link top-0 tx-start"><FaAddressBook /></div>
                        <h3 className="tx-end pb-2 tx-lgx">Browse Ecosystem</h3>

                        <p className="tx-end w-100 w-max-500px">Get Started with Byte City:</p>
                        <p className="tx-end w-100 w-max-500px ">Follow our step-by-step tutorials to navigate the platform effectively. </p>
                        <p className="tx-end w-100 w-max-500px Q_sm_x">Learn how to play, understand the stages, and amplify your reach. Whether you&apos;re a beginner or an experienced investor, our tutorials will guide you through the process.</p>
                    </Link>
                </div>
            </div>
            <div className="flex-wrap flex-align-start w-100  gap-8">
                <div className="flex-col flex-align-start">
                    <div className="opaci-50 underline pb-3">Important Links</div>
                    <Link href="/" className="tx-link pt-1 tx-lg opaci-chov--50">
                        Twitter: <b>@bytecty</b>
                    </Link>
                    <Link href="/" className="tx-link pt-1 tx-lg opaci-chov--50">
                        Youtube: <b>@webpov</b>
                    </Link>
                    <Link href="/" className="tx-link pt-1 tx-lg opaci-chov--50">
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
    )
}

export default LandingInfo

