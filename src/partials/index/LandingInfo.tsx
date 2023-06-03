import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { FaAccessibleIcon, FaAddressBook, FaAdversal, FaMoneyBillAlt, FaStackExchange } from "react-icons/fa"


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
            <div className="w-100 flex-col pb-100 pt-8 ">
                <div className="w-100 w-max-500px tx-l">
                    Byte City is an innovative 3D Browser platform that merges learning and investing.
                    <small className="py-2 block">With our gamified approach and automated processes, we make investing easy and enjoyable for everyone.</small>
                </div>
            </div>

            <h2 className="mt-8 tx-xxl Q_sm_x">Investing made simple:</h2>
            <h2 className="mt-8 tx-xl Q_xs">Investing made simple:</h2>
            <div className="w-100 w-max-600px tx-lg">
                Byte City is the ideal platform for passive investors. Our automated system manages portfolios, minimizes risks, maximizes profits, and offers a user-friendly 3D Browser interface            </div>

            <h2 className="mt-8 flex flex-justify-start flex-align-end Q_xs_flex-col gap-3">
                <span className="opaci-20 ">Get Started:</span>
                <Link target="_blank" className="tx-blue hover-4 opaci-chov--50  tx-lx" href="https://webgamed.gitbook.io/gtabtc/documentation/getting-started/how-to-play">How to Play?</Link>
                <div className="opaci-chov--50" style={{color:"orangered"}}><Link target="_blank" href="https://webgamed.gitbook.io/gtabtc/documentation/getting-started/how-to-play">(Stage 1)</Link></div>
                <div className="opaci-10 spin-4">|</div>
                <div className="opaci-chov--50" style={{color:"orange"}}><Link target="_blank" href="https://webgamed.gitbook.io/gtabtc/documentation/getting-started/stage-2">(Stage 2)</Link></div>
                <div className="opaci-10 spin-3">|</div>
                <div className="opaci-chov--50" style={{color:"gold"}}><Link target="_blank" href="https://webgamed.gitbook.io/gtabtc/documentation/getting-started/stage-3">(Stage 3)</Link></div>
            </h2>

            <div className="mt-200 hover-3">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#30ADFC" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> */}
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#30ADFC" fill-opacity="1" d="M0,224L720,64L1440,256L1440,320L720,320L0,320Z"></path></svg>
                </div>
            <div style={{background:"linear-gradient(0deg, #30ADFC , #ffffff, #30ADFC)"}} className="">
                




            <div className=" " >
                <div className="flex-wrap flex-justify-center gap-6 ">
                    <div className=" w-100 w-max-250px ">
                        <div className=" tx-white"> 
                            <h3 className="">Gamify Your Investments:</h3>
                            <div className="py-3">
                                Step into the realm of gamification, where the excitement of play and competition meets the world of trading.
                                By incorporating elements of challenge, achievement, and reward,
                            <br /><br />
                                Byte City creates a symbolic arena for investors to engage with the trading process.
                            </div>
                            {/* Explore common or complex processes, confront emotional reactions to financial risk, and enjoy a fun and engaging trading experience. */}
                        </div>
                        <Link href="https://webgamed.gitbook.io/gamification" target="_blank" className="tx-link opaci-chov--50">Learn More: What is Gamification?</Link>
                    </div>

                    <div className="tx-white w-100 w-max-300px ">
                        <h3 className="mt-8">Experience the Fusion of Finance and Gaming:</h3>
                        <div className="py-3">
                            Byte City offers a unique experience by combining the worlds of finance and gaming through our 3D browser game interface.
                            <br /><br />
                            Interact with simulated investments in a game-like environment, making the trading experience more enjoyable 
                        </div>
                    </div>

                    <div className="tx-white w-100 w-max-300px  ">
                        <h3>Frequently Asked Questions:</h3>
                        <div className="py-3">
                            Find answers to common queries about Byte City, its features, and benefits.
                            <br /><br />
                            Learn how Byte City solves the problem of actively managing portfolios across multiple apps and websites, reduces risks, and maximizes profits, while lowering emotional stress.
                        </div>

                        <Link  href="https://webgamed.gitbook.io/gtabtc/what-is-byte-city/faq" target="_blank"  className="tx-link opaci-chov--50">Explore FAQs</Link>
                    </div>

                    <div className=" w-100 w-max-500px ">
                        <h3>Customer Support:</h3>
                        We offer different levels of customer support based on your subscription.
                            <br /><br />
                        If you have any questions or need assistance, get in touch with our support team here.

                        <br />
                        <Link href="https://twitter.com/bytecty" target="_blank" className="tx-lg tx-link opaci-chov--50">Contact on Twitter @bytecty</Link>
                        <br />
                        <Link href="https://twitter.com/bytecty" target="_blank" className="tx-lg tx-link opaci-chov--50">or @webgamed</Link>
                        <br />
                        <Link href="https://twitter.com/bytecty" target="_blank" className="tx-lg tx-link opaci-chov--50 mt-8 block py-2">Videos on Youtube @webgamed</Link>
                    </div>

                    <div className=" w-100 w-max-300px ">
                        <h3>Integration Made Easy:</h3>
                        Byte City seamlessly integrates with other tools and systems.
                        <br />
                        Discover how easy it is to connect Byte City with your preferred tools and enhance your investment experience.

                        Learn About Integration
                    </div>
                </div>
            </div>


            <Suspense>
                <div className="pb-8 pos-rel" >
                    <div className="ma-4  z-500 box-shadow-5 pb-2 z-100 block bord-r-25 noverflow">
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/xkXnh04d1vQ" title="YouTube video player"  
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                    </div>
                    <div className="pos-abs bottom-0  flex-col  w-100 translate-y-100">
                        <Link 
                            className='pos-abs top-0  z-600 py-2 opaci-chov--75 block pb-8 flex-col bg-glass-4 bg-b-10 px-1 pt-2  bord-r-25 '
                            style={{boxShadow:"0 4px 3px #00000022"}}
                            href='https://bytc.vercel.app'
                        >
                            <Image src="/main2.png" alt="bank" width={244} height={255} className='mt-8' />
                            <h1 className='tx-xl tx-shadow-2' style={{color:"orangered"}}>Play Now!</h1>
                        </Link>
                    </div>
                </div>
            </Suspense>
            
            

            </div>
                <div className="z--1">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#30ADFC" fill-opacity="1" d="M0,0L48,32C96,64,192,128,288,160C384,192,480,192,576,176C672,160,768,128,864,101.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#30ADFC" fill-opacity="1" d="M0,192L720,320L1440,288L1440,0L720,0L0,0Z"></path></svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#30ADFC" fill-opacity="1" d="M0,256L720,64L1440,160L1440,0L720,0L0,0Z"></path></svg>
                </div>



            <div className=" py-100 my-100 flex-col flex-align-end px-2">
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

            <div>
                <div>
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
                            <Link href="https://webgamed.gitbook.io/gtabtc/what-is-byte-city/faq" className="tx-link pt-1 tx-lg opaci-chov--50">
                                FAQ: <b>Frequently Asked Questions</b>
                            </Link>
                            <Link href="https://webgamed.gitbook.io/gtabtc/about-us/where-to-go-links" className="tx-link pt-1 tx-lg opaci-chov--50">
                                More: <b>More Links</b>
                            </Link>
                        </div>
                        <div className="flex-1"></div>
                    </div>
                </div>
            </div>









        </div>
    )
}


export default LandingInfo