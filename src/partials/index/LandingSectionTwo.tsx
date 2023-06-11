import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"


export function LandingSectionTwo({}) {
    return (
        <>
            <div className=" " >
                <div className="flex-wrap flex-justify-center flex-align-center gap-6 ">
                    <div className=" w-100 w-max-300px box-shadow-2-b pb-8 pa-4 bord-r-50 bg-b-10 ">
                        <div className=" tx-white"> 
                            <h3 className="tx-lx"><span style={{borderBottom:"2px solid orangered"}}>Gamify</span> Your Investments:</h3>
                            <div className="py-3">
                                Step into the realm of gamification, where the excitement of play and competition meets the world of trading.
                                {/* By incorporating elements of challenge, achievement, and reward, */}
                                <br /><br />
                                <div className="">
                                    <div className="">
                                        Byte City creates a symbolic arena for investors to engage with the trading process.
                                    </div>
                                </div>
                            </div>
                            {/* Explore common or complex processes, confront emotional reactions to financial risk, and enjoy a fun and engaging trading experience. */}
                        </div>
                        <Link href="https://webpov.gitbook.io/gamification" target="_blank" className="tx-link opaci-chov--50">Learn More: What is <b>Gamification</b>?</Link>
                    </div>

                    <div className="tx-white w-100 w-max-400px ">
                        <h3 className="flex-col flex-align-start flex-justify-start tx-lg px-2" >
                            <div className="tx-bold-2">Experience the fusion of</div>
                            <div className="flex-wrap flex-align-end flex-justify-start gap-2 " >
                                <div style={{borderBottom:"2px solid orange"}} className="tx-comic tx-lx">Finance</div>
                                <div >+</div>
                                <div style={{borderBottom:"2px solid orange"}} className="tx-roman tx-lx">Gaming</div>
                            </div>
                        </h3>
                        <div className="py-8 px-2">
                            <div className="tx-lg">Byte City offers a unique experience by combining the worlds of finance and gaming through our 3D browser game interface.</div>
                            {/* <br /><br /> */}
                            {/* Interact with simulated investments in a game-like environment, making the trading experience more enjoyable  */}
                        </div>
                    </div>

                    {/* <div className="tx-white w-100 w-max-300px  ">
                        <h3>Frequently Asked Questions:</h3>
                        <div className="py-3">
                            Find answers to common queries about Byte City, its features, and benefits.
                            <br /><br />
                            Learn how Byte City solves the problem of actively managing portfolios across multiple apps and websites, reduces risks, and maximizes profits, while lowering emotional stress.
                        </div>

                        <Link  href="https://webpov.gitbook.io/gtabtc/what-is-byte-city/faq" target="_blank"  className="tx-link opaci-chov--50">Explore FAQs</Link>
                    </div> */}

                    <div className=" w-100 w-max-500px mt-100">
                        <h3 className="px-2">Customer Support:</h3>
                        {/* We offer different levels of customer support based on your subscription. */}
                            {/* <br /><br /> */}
                        <div className="px-2">
                            If you have any questions or need assistance, get in touch with our support team here.
                        </div>
                        <ul>
                            <li>
                                <Link href="https://twitter.com/bytecty" target="_blank"
                                    className="tx-lg tx-link opaci-chov--50"
                                >
                                    Support on Twitter @ByteCTY
                                </Link>
                            </li>
                            <li>
                                <Link href="https://twitter.com/bytecty" target="_blank"
                                    className="tx-lg tx-link opaci-chov--50"
                                >
                                    Contact on Twitter @WebPOV
                                </Link>
                            </li>
                            <li>Gameplay & Tutorials 👇:
                                <ul>
                                    <li>
                                    <Link href="https://twitter.com/bytecty" target="_blank"
                                        className="tx-lg tx-link opaci-chov--50 block py-2 tx-bold-8"
                                    >
                                        Videos on Youtube @webpov
                                    </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className=" w-100 w-max-300px ">
                        <h3 className="px-2">Integration Made Easy:</h3>
                        {/* Byte City seamlessly integrates with other tools and systems. */}
                        {/* <br /> */}
                        <div className="tx-bold-5 tx-lg px-2">
                            Discover how easy it is to connect Byte City with your preferred tools and enhance your investment experience.
                        </div>

                        {/* <div>
                            Learn About Integration
                        </div> */}
                    </div>
                </div>
            </div>
            
            <Suspense>
                <div className="pb-8 pos-rel" >
                    {/* <details>
                        <summary className="flex-col opaci-chov--50 pos-rel ">
                            <button className="pos-abs flex-col tx-shadow-5 noclick">
                                <div className="tx-lgx tx-bold-8 " style={{color:"#ff9D0C"}}>Click me to</div>
                                <div className="tx-lgx tx-bold-8 " style={{color:"#ff9D0C"}}>Open Tutorial</div>
                                <div className="tx-lgx pt-4 hover-4 mt-8 tx-bold-8 " style={{color:"#ff9D0C"}}>↓↓↓</div>
                            </button>
                            <div className="box-shadow-2-b bord-r-100p mt-8">
                                <Image  src="/city1.png" alt="bank" width={300} height={300} className=' bord-r-100p box-shadow-i-2-b  noverflow' />
                            </div>
                        </summary>
                    
                        <div className="ma-4  z-500 box-shadow-5 pb-2 z-100 block bord-r-25 noverflow">
                            <iframe width="100%" height="420" src="https://www.youtube.com/embed/EQk-6z9mK-I" title="YouTube video player"  
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                        </div>
                    </details> */}
                    <div className="pos-abs bottom-0  flex-col  w-100 mb-8 translate-y-100">
                        <Link 
                            className='pos-abs top-0  z-600 py-2 opaci-chov--75 block pb-8 flex-col bg-glass-4 bg-b-10 px-1 pt-2  bord-r-25 '
                            style={{boxShadow:"0 4px 3px #00000022"}}
                            href='https://bytc.vercel.app'
                        >
                            <Image src="/main2.png" alt="bank" width={122} height={128} className='mt-8 z-1001 pos-rel' />
                            <h1 className='tx-lx px-2 tx-shadow-2' style={{color:"#099DFF"}}>Play Now!</h1>
                        </Link>
                    </div>
                </div>
            </Suspense>
            
        </>
    )
}

export default LandingSectionTwo