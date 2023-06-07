import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"


export function LandingSectionTwo({}) {
    return (
        <>
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
                        <Link href="https://webga.gitbook.io/gamification" target="_blank" className="tx-link opaci-chov--50">Learn More: What is Gamification?</Link>
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

                        <Link  href="https://webga.gitbook.io/gtabtc/what-is-byte-city/faq" target="_blank"  className="tx-link opaci-chov--50">Explore FAQs</Link>
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
                            <Image src="/main2.png" alt="bank" width={244} height={255} className='mt-8' />
                            <h1 className='tx-xl tx-shadow-2' style={{color:"orangered"}}>Play Now!</h1>
                        </Link>
                    </div>
                </div>
            </Suspense>
            
        </>
    )
}

export default LandingSectionTwo