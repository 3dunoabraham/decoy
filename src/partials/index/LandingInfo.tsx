import Link from "next/link"


function LandingInfo({}) {
    return (
        <div className="px-4">
            <div className="flex-col">
                <h1 className="tx-xl Q_xs">Welcome to Byte City:</h1>
                <h1 className="tx-xxl Q_sm_x">Welcome to Byte City:</h1>
                <div style={{color:"orangered"}} className="flex-col tx-lgx">
                    <div>Simplifying Learning and Investing</div>
                    <div>Through Gamification!</div>
                </div>
            </div>


            <h1 className="tx-link opaci-chov--25 mt-100 tx-center">
                <Link href="https://wbyte.vercel.app">
                    Play Now: → WByte.vercel.app ←
                </Link>
            </h1>
            <div className="w-100 flex-col pb-100 pt-8 ">
                <div className="w-100 w-max-500px tx-l">
                    Byte City is an innovative 3D Browser platform that merges learning and investing.
                    <small>With our gamified approach and automated processes, we make investing easy and enjoyable for everyone.</small>
                </div>
            </div>

            <h2 className="mt-8 tx-xxl">Investing made simple:</h2>
            <div className="w-100 w-max-600px tx-lg">
                Byte City is the ideal platform for passive investors. Our automated system manages portfolios, minimizes risks, maximizes profits, and offers a user-friendly 3D Browser interface            </div>

            <h2 className="mt-8 flex flex-justify-start Q_xs_flex-col gap-3">
                <span className="opaci-20 ">Get Started:</span>
                <Link target="_blank" className="tx-blue hover-4 opaci-chov--50 tx-lx" href="https://3duno.gitbook.io/gtabtc/documentation/getting-started/how-to-play">How to Play?</Link>
                <div className="opaci-chov--50" style={{color:"orangered"}}><Link target="_blank" href="https://3duno.gitbook.io/gtabtc/documentation/getting-started/how-to-play">(Stage 1)</Link></div>
                <div className="opaci-10">|</div>
                <div className="opaci-chov--50" style={{color:"orange"}}><Link target="_blank" href="https://3duno.gitbook.io/gtabtc/documentation/getting-started/stage-2">(Stage 2)</Link></div>
                <div className="opaci-10">|</div>
                <div className="opaci-chov--50" style={{color:"gold"}}><Link target="_blank" href="https://3duno.gitbook.io/gtabtc/documentation/getting-started/stage-3">(Stage 3)</Link></div>
            </h2>
            <div className="mt-200">
                <div className="flex-wrap flex-justify-center gap-6 ">
                    <div className=" w-100 w-max-250px ">
                        <div>
                            <h3 className="mt-8">Gamify Your Investments:</h3>
                            <div className="py-3">
                                Step into the realm of gamification, where the excitement of play and competition meets the world of trading.
                                By incorporating elements of challenge, achievement, and reward,
                            <br /><br />
                                Byte City creates a symbolic arena for investors to engage with the trading process.
                            </div>
                            {/* Explore common or complex processes, confront emotional reactions to financial risk, and enjoy a fun and engaging trading experience. */}
                        </div>
                        <Link href="/" className="tx-link opaci-chov--50">Learn More: What is Gamification?</Link>
                    </div>

                    <div className=" w-100 w-max-300px ">
                        <h3 className="mt-8">Experience the Fusion of Finance and Gaming:</h3>
                        <div className="py-3">
                            Byte City offers a unique experience by combining the worlds of finance and gaming through our 3D browser game interface.
                            <br /><br />
                            Interact with simulated investments in a game-like environment, making the trading experience more enjoyable 
                        </div>
                        <Link href="/" className="tx-link opaci-chov--50">Explore FAQs</Link>
                    </div>

                    <div className=" w-100 w-max-300px  ">
                        <h3>Frequently Asked Questions:</h3>
                        <div className="py-3">
                            Find answers to common queries about Byte City, its features, and benefits.
                            <br /><br />
                            Learn how Byte City solves the problem of actively managing portfolios across multiple apps and websites, reduces risks, and maximizes profits, while lowering emotional stress.
                        </div>

                        <Link href="/" className="tx-link opaci-chov--50">Read About Data Protection</Link>
                    </div>

                    <div className=" w-100 w-max-500px ">
                        <h3>Customer Support:</h3>
                        We offer different levels of customer support based on your subscription.
                            <br /><br />
                        If you have any questions or need assistance, get in touch with our support team here.

                        <br />
                        <Link href="/" className="tx-lg tx-link opaci-chov--50">Contact Support</Link>
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
            <div className=" py-100 my-100 flex-col flex-align-end px-2">
                <div className="w-100 w-max-600px my-100">
                    <div className="flex-col flex-align-end">
                        <h3 className="tx-end tx-lgx">Dive Into Investment Strategies:</h3>
                        <p className="tx-end w-100 w-max-500px">Understand the concepts behind Dollar Cost Averaging (DCA) and Automated Trading Systems (ATS). Explore how these strategies can benefit your investment journey and enhance your trading approach.</p>
                    </div>
                    <div className="flex-col flex-align-end my-100">
                        <h3 className="tx-end tx-lgx">Learn About DCA | Learn About ATS</h3>

                        <p className="tx-end w-100 w-max-500px">Explore the Ecosystem:</p>
                        <p className="tx-end w-100 w-max-500px">Discover the different market sectors, protocols, and tokens that form the foundation of Byte City. Gain insights into the core, utility, and side-chain tokens that power our platform.</p>
                    </div>
                    <div className="flex-col flex-align-end">
                        <h3 className="tx-end tx-lgx">Browse Ecosystem</h3>

                        <p className="tx-end w-100 w-max-500px">Get Started with Byte City:</p>
                        <p className="tx-end w-100 w-max-500px">Follow our step-by-step tutorials to navigate the platform effectively. Learn how to play, understand the stages, and amplify your reach. Whether you&apos;re a beginner or an experienced investor, our tutorials will guide you through the process.</p>
                    </div>
                </div>


            </div>











        </div>
    )
}


export default LandingInfo