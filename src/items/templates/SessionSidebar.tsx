import AppClientDesc from "@/src/items/molecules/auth/AppClientDesc";
import LoginBtn from "@/src/items/molecules/auth/LoginBtn";
import Link from "next/link";
import Image from "next/image";
import { BsBox, BsChat, BsFillArchiveFill, BsFillBarChartFill, BsGear, BsInfoCircle, BsPerson, BsStack } from "react-icons/bs";
import {  FaChartLine, FaCity, FaGoogle, FaKey, FaQuestion, FaSync, FaUncharted } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { GiCardExchange } from "react-icons/gi";
import { MdOutlineHistory } from "react-icons/md";
import { useRouter } from "next/router";
import { InventoryContext } from "@/scripts/contexts/InventoryContext";
import { useContext, useEffect, useMemo } from "react";
import { AppContext } from "@/scripts/contexts/AppContext";
import { MdOutlineInventory2 } from "react-icons/md";
import { isDevEnvironment } from "@/scripts/helpers/devHelper";
import { GiEightBall, GiWheat } from "react-icons/gi";
import { useSession } from "next-auth/react";
import { useLocalStorage } from "usehooks-ts";
import { fetchPut } from "@/scripts/helpers/fetchHelper";

export default function Component({}) {
    const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "")
    const { data: session } = useSession();

    const router = useRouter();
    const handleClick = async (newUrl,...args) => {
      await router.push(newUrl);
    } 
    const app = useContext(AppContext)
    const inv = useContext(InventoryContext)
    const ICONS = {
        agreements: <MdOutlineHistory />,
        users: <BsFillBarChartFill />,
        builder3d: <FaUncharted />,
        farm: <GiWheat />,
        bingo: <GiEightBall />,
        inventory: <MdOutlineInventory2 />,
        city: <FaCity />,
        chart: <FaChartLine />,
    }
    
    const syncBinance = async () => {
        const binancekeys = prompt ("Enter your keys -> <public:secret>")
        if (!binancekeys) return
        try {
            let datapack = {
                binancekeys: binancekeys,
                name:LS_rpi.split(":")[0],
                secret:LS_rpi.split(":")[1],
            }
            console.log(datapack)
            // return null
            const res = await fetchPut('/api/player',datapack);
            const result = await res.json();
            console.log("success????", result)
            return result
        } catch (e) {
            return false
        }
      }
    
      if (!session) {
        return <></>
      }
    return (<>
        <div className="flex-col   invisible ">
            <div className='flex px-3 px- w-100'>
                
                {/* <button onClick={()=>{handleClick("/")}} className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white px-1 pt-1 ord-r-10 scale-90'>
                        <Image src='/icons/logo.svg' alt='next' width='28' height='28'/>
                    </div>
                    <div className='Q_xl_x pl-1'>
                        <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
                    </div>
                </button> */}
                
                <Link href="/" className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white px-1 pt-1 ord-r-10 scale-90'>
                        <Image src='/icons/logo2.png' alt='next' width='28' height='28'/>

                    </div>
                    <div className='Q_xl_x pl-1'>
                        <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
                    </div>
                </Link>
            </div>
            <div className='flex-1'>
                {!!app && !!app.sidebarPages && app.sidebarPages.map((aLink, index)=>{
                        return (
                            <Link href="/users/" className="flex-center py-3  clickble  px-2 bg-w-hov-10  " key={index}>
                                <div className=" pr-3  Q_xl_x"></div>
                                <div className="px-1 tx-center tx-lg opaci-hov--50">{aLink.icon ? ICONS[aLink.icon]: <BsPerson /> }</div>
                                {/* <div className="flex-1 pl-3 Q_xl_x w-min-220px">{aLink.url}</div> */}
                                <div className="flex-1 pl-3 Q_xl_x w-min-220px">{aLink.label}</div>
                            </Link>
                        )
                    }) }
                    
                {!!app && !!app.sidebarLinks && app.sidebarLinks.length == 0 && 
                    <div className="flex-center py-1 clickble  px-2 bg-w-50   " >
                        <div className=" pr-3  Q_xl_x"></div>
                        <div className="px-1 tx-center tx-lg opaci-hov--50"><BsFillArchiveFill /></div>
                        <div className="flex-1 pl-3 Q_xl_x w-min-220px">asd</div>
                    </div>
                }
            </div>
        </div>

        <div className="h-min-100vh flex-col pos-fix ims-bg-primary top-0  right-0  ">
            <div className='flex px-3 px- w-100'>
                {/* <button onClick={()=>{handleClick("/")}} className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white px-1 pt-1 ord-r-10 scale-90'>
                        <Image src='/icons/logo.svg' alt='next' width='28' height='28'/>
                    </div>
                    <div className='Q_xl_x pl-1'>
                        <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
                    </div>
                </button> */}
                
                <Link href="/" className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white flex-center ord-r-10 scale-90 bord-r-100p'>
                        <Image src='/icons/logo2.png' alt='next' width='36' height='36' className="bord-r-100p"/>
                    </div>
                    <div className='Q_xl_x pl-1 tx-ls-5'>
                        {/* <Image src='/icons/Vector.png' alt='next' width='129' height='19'/> */}
                        {app.institution.title}
                    </div>
                </Link>
            </div>
            <div className='flex-1'>

                {(!!session && !!session.user && !!LS_rpi)  && <>
                    <div className="box-shadow-2 pa-4 bord-r-8 bg-b-50 tx-center opaci-chov--75"
                             onClick={()=>{syncBinance()}}
                        >
                            <div className="tx-center tx-lx ">
                                <GiCardExchange/>
                            </div>
                            <div className="Q_xl_x">Sync </div>
                            <div className="Q_xl_x"  style={{color:""}}> Hot Wallet!</div>
                        </div>
                </>}

                {!!app && !!app.sidebarPages && app.sidebarPages.map((aLink, index)=>{
                    return (
                        <Link href={aLink.url || "#"} className="flex-center pb-2 py-3 clickble  px-2 ims-bg-primary bord-r-5 my-1 box-shadow-2  " key={index}>
                            <div className=" pr-3  Q_xl_x"></div>
                            <div className="px-1 tx-center tx-lg opaci-hov--50">{aLink.icon ? ICONS[aLink.icon]: <BsPerson /> }</div>
                            {/* <div className="flex-1 pl-3 Q_xl_x w-min-220px">{aLink.url}</div> */}
                            <div className="flex-1 pl-3 Q_xl_x w-min-220px">{aLink.label}</div>
                        </Link>
                    )
                }) }
                <hr className="w-100 opaci-10 my-3" style={{borderColor: "white"}} />
                
                {!!app && !!app.sidebarLinks && app.sidebarLinks.map((anUnit, index)=>{
                    if (router.query.key == anUnit.label) { return (
                        <div key={index} className="flex-center py-1 clickble  px-2 bg-w-50   " >
                            <div className=" pr-3  Q_xl_x"></div>
                            <div className="px-1 tx-center tx-lg opaci-hov--50"><BsFillArchiveFill /></div>
                            <div className="flex-1 pl-3 Q_xl_x w-min-220px">{anUnit.label.replace("_"," ").toUpperCase()}</div>
                        </div>
                    )}
                    return (
                    <Link key={index}  className="flex-center py-1 clickble  px-2 bg-w-hov-10  " href={`/foreigns/${anUnit.label}`} >
                        <div className=" pr-3  Q_xl_x"></div>
                        <div className="px-1 tx-center tx-lg opaci-hov--50"><BsFillArchiveFill /></div>
                        <div className="flex-1 pl-3 Q_xl_x w-min-220px">{anUnit.label.replace("_"," ").toUpperCase()}</div>
                    </Link>
                    )
                })}
            </div>
            {<>
                <div className='w-100 bord-r-t-5 box-shadow-2 ' style={{background:"orangered"}}>
                    <LoginBtn><AppClientDesc /></LoginBtn>
                </div>
                <hr className="w-90 opaci-50  my-3" style={{borderColor: "white"}} />
            </>}
            <div className='mb-100'>
                {/* <Link href="/#" className="flex-center py-2 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_xl_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsInfoCircle /></div>
                    <div className="flex-1 pl-1 Q_xl_x w-min-220px">Support</div>
                </Link> */}
                <Link href="https://twitter.com/webgamed" target="_blank" className="flex-center box-shadow-2 py-2 clickble  px-2 ims-bg-primary bord-r-b-5">
                    <div className=" pr-3  Q_xl_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><FaQuestion /></div>
                    <div className="flex-1 pl-1 Q_xl_x w-min-220px">Support</div>
                </Link>
            </div>
        </div>


    </>)
}