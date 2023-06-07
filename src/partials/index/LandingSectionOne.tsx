import Link from "next/link"

export function LandingSectionOne({}) {
    return (
        <>
            
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
                <Link target="_blank" className="tx-blue hover-4 opaci-chov--50  tx-lx" href="https://webga.gitbook.io/gtabtc/documentation/getting-started/how-to-play">How to Play?</Link>
                <div className="opaci-chov--50" style={{color:"orangered"}}><Link target="_blank" href="https://webga.gitbook.io/gtabtc/documentation/getting-started/how-to-play">(Stage 1)</Link></div>
                <div className="opaci-10 spin-4">|</div>
                <div className="opaci-chov--50" style={{color:"orange"}}><Link target="_blank" href="https://webga.gitbook.io/gtabtc/documentation/getting-started/stage-2">(Stage 2)</Link></div>
                <div className="opaci-10 spin-3">|</div>
                <div className="opaci-chov--50" style={{color:"gold"}}><Link target="_blank" href="https://webga.gitbook.io/gtabtc/documentation/getting-started/stage-3">(Stage 3)</Link></div>
            </h2>
        </>
    )
}

export default LandingSectionOne