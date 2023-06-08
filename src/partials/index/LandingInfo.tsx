"use client";
import Link from "next/link"
import {  FaAddressBook, FaMoneyBillAlt, FaStackExchange } from "react-icons/fa"


import LandingSectionOne from "./LandingSectionOne";
import LandingSectionTwo from "./LandingSectionTwo";

function LandingInfo({}) {
    return (
        <div className="px-4">
            <div className="flex-col">
                <h1 className="tx-primary tx-xl tx-center Q_xs ">Welcome to Byte City:</h1>
                <h1 className="tx-primary tx-xxl tx-center Q_sm_x ">Welcome to Byte City:</h1>
                <div style={{color:"orangered"}} className="flex-col tx-lg tx-center">
                    <div>Simplifying Learning</div>
                    <div>and Investing</div>
                    <div>Through Gamification!</div>
                </div>
            </div>

            <h1 className="tx-link opaci-chov--25 mt-100 tx-center">
                <Link href="https://bytc.vercel.app">
                    Click here to play: bytc.vercel.app
                </Link>
            </h1>

            <LandingSectionOne />


            <div className="mt-200 hover-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#30ADFC" fillOpacity="1" d="M0,224L720,64L1440,256L1440,320L720,320L0,320Z"></path></svg>
            </div>
            <div style={{background:"linear-gradient(0deg, #30ADFC , #A1DAFE, #30ADFC)"}} className="">
                <LandingSectionTwo />
            </div>
            <div className="z--1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#30ADFC" fillOpacity="1" d="M0,256L720,64L1440,160L1440,0L720,0L0,0Z"></path></svg>
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
                        Youtube: <b>@webgamed</b>
                    </Link>
                    <Link href="/" className="tx-link pt-1 tx-lg opaci-chov--50">
                        Twitter: <b>@webgamed</b>
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

