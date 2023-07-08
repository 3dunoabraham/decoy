"use client";
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { FaAccessibleIcon, FaAddressBook, FaAdversal, FaChartBar, FaEnvelope, FaListAlt, FaMoneyBillAlt, FaStackExchange, FaStar, FaUser } from "react-icons/fa"


function LandingInfo({}:any) {
    return (
        <div className='w-100 flex-col pt- pb-100' style={{background:"linear-gradient(0deg, #090909, #171717)"}}>
          <div className="pt-100 Q_xs_md _ddg block">

          </div>
          <a href={"/"} className="block flex-col">
                    <h1 className='tx-bold- tx-ls-5   mt-0  pt-0 z-100 huerotate-  pos-abs top-0 tx-altfont-6 flex Q_xs_flex-col'
                        style={{color:"white", fontSize:"10em", /*  textShadow: "0 10px 50px #ffaa5555" */}}
                    >
                        <span className="opaci-50 opaci-chov--75 tx-bold-2 Q_md_x ">Web</span>
                        <span className="tx-bold-6 opaci-chov--75 blurrotate-3 Q_md_x">POV</span>
                        <div className="tx-bold-6 Q_sm flex-col translate-y--25">
                          <span className="opaci-50 tx-bold-2 h-max-100px opaci-chov--75 translate-y--25">Web</span>
                          <span className="tx-bold-6 h-max-100px opaci-chov--75 blurrotate-3 opaci-50 ">POV</span>
                        </div>
                        <small className="tx-bold-6 Q_xs flex-col ">
                          <span className="opaci-50 tx-bold-2 h-max-100px opaci-chov--75 ">Web</span>
                          <span className="tx-bold-6 h-max-100px opaci-chov--75 blurrotate-3  ">POV</span>
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
                        <div className="bg-white box-shadow-i-5-b bg-hov-r pa-" style={{clipPath: "polygon(100% 0, 0 0, 100% 100%)",paddingLeft:"40px"}}></div>
                        <div className="bg-white box-shadow-i-5-b pa-8 hover-8 bord-r-100p bg-hov-o"></div>
                        <div className="bg-white box-shadow-i-5-b bg-hov-b pa-" style={{clipPath: "polygon(100% 0, 0 0, 0% 100%)",paddingLeft:"40px"}}></div>
                      </div>
                      <div className="bg-white pa-8 box-shadow-i-5-b bg-hov-g" style={{clipPath: "polygon(100% 0, 0 0, 50% 100%)"}}></div>
                    </div>
                  </div>
                  <div className="Q_md_x  ">

                    <div className="flex-col gap-1 scale-90   h-min-500px w-min-500px w-100 bord-r-100p  pos-rel" style={{background:"#090909"}}>
                      
                      <div className="flex  gap-1 ">
                        <div className="bg-white box-shadow-i-5-b bg-hov-r pa-" style={{clipPath: "polygon(100% 0, 0 0, 100% 100%)",paddingLeft:"150px"}}></div>
                        <div className="bg-white box-shadow-i-5-b pa-150 hover-8 bord-r-100p bg-hov-o"></div>
                        <div className="bg-white box-shadow-i-5-b bg-hov-b pa-" style={{clipPath: "polygon(100% 0, 0 0, 0% 100%)",paddingLeft:"150px"}}></div>
                      </div>
                      <div className="bg-white pa-150 box-shadow-i-5-b bg-hov-g" style={{clipPath: "polygon(100% 0, 0 0, 50% 100%)"}}></div>
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
    )
}


export default LandingInfo