import Link from "next/link";


export default function Component ({}) {
    return (
        <Link href="/" className="pos-abs top-0 left-0 flex-col flex-align-start gap-2 tx-white  z-800 ">
            <div className="a tx-xl flex z-400 px-4 h-50px gap-2">
                <div className="a tx-xxl tx-bold-8">B</div>
                <div className="a tx-xxl tx-bold-3 pl-5">t</div>
            </div>
            <div className="a tx-lx flex z-400 px-4 h-50px">
                <div className="a tx-lx tx-bold-5 pl-3">B</div>
                <div className="a tx-lx tx-bold-3 ">
                    <div className='invisible'>III</div>
                    <div className='tx-xxl scale-200 pos-abs bottom-0 pb-2 pl-1 tx-bold-3'>
                        i
                    </div>
                </div>
                <div className="a tx-lx tx-bold-6">NGO</div>
            </div>
        </Link>
    )
}