import AppClientDesc from "@/src/items/molecules/auth/AppClientDesc";
import LoginBtn from "@/src/items/molecules/auth/LoginBtn";
import Link from "next/link";
import Image from "next/image";
import { BsBox, BsChat, BsFillArchiveFill, BsFillBarChartFill, BsGear, BsInfoCircle, BsPerson, BsStack } from "react-icons/bs";
import {  FaBars, FaChartLine, FaCity, FaGoogle, FaKey, FaQuestion, FaSync, FaUncharted } from "react-icons/fa";
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
                referral:LS_rpi.split(":")[0],
                pin:LS_rpi.split(":")[1],
            }
            // console.log(datapack)
            // return null
            const res = await fetchPut('/api/player',datapack);
            const result = await res.json();
            // console.log("success????", result)
            return result
        } catch (e) {
            return false
        }
      }
    
      if (!session) {
        return <></>
      }
    return (<>
        
    <div className=" flex-col flex-align-end pos-fix  bottom-0  right-0  " style={{}}>
        {<div className="flex-col gap-1 pr-2">
                <div className='pt-1 px-2 bord-r-25 box-shadow-2 ' style={{background:"orangered"}}>
                    <LoginBtn><AppClientDesc /></LoginBtn>
                </div>
                {/* <hr className="w-90 opaci-50  my-3" style={{borderColor: "white"}} /> */}
                <div className='mb-100'>
                    {/* <Link href="/#" className="flex-center py-2 clickble  px-2 bg-w-hov-10  ">
                        <div className=" pr-3  Q_xl_x"></div>
                        <div className="px-1 tx-center tx-lg opaci-hov--50"><BsInfoCircle /></div>
                        <div className="flex-1 pl-1 Q_xl_x w-min-220p">Support</div>
                    </Link> */}
                    <Link href="https://webpov.gitbook.io/bytecity" 
                        target="_blank" className="flex-center box-shadow-2 py-2 clickble  px-2 ims-bg-primary bord-r-100"
                    >
                        <div className="   Q_xl_x"></div>
                        <div className="px-1 pt-1 tx-center tx-lg opaci-hov--50"><FaQuestion /></div>
                        <div className="flex-1  Q_xl_x ">FAQ</div>
                    </Link>
                </div>
            </div>}
        </div>
        <div className=" flex-col flex-align-end pos-fix  top-0  right-0  " style={{}}>
            <details className="flex-1 w-100">
                <summary className="flex pa-1 opaci-chov--50 mb-2" >
                    <div className="flex-1"></div>
                    <button className="noclick tx-white pa-2 px-1 bord-r-50 tx-lg flex-center gap-2 tx-lgx px-2" style={{background:"linear-gradient(0, #13A1FE, #059BFF)"}}>
                        <FaBars />
                        <div className="Q_sm_x ">Menu</div>
                    </button>
                </summary>
                <div className='flex-1 pr-2 '>
                    {(!!session && !!session.user && !!LS_rpi)  && <>
                        <div className="box-shadow-5-b pa-4 pb-0 bord-r-25 bg-b-40 tx-center opaci-chov--50 bg-glass-20 tx-shadow-5"
                                onClick={()=>{syncBinance()}}
                            >
                                <div className="tx-center tx-lx ">
                                    <GiCardExchange/>
                                </div>
                                <div className="Q_xl_x">Sync </div>
                                <div className="Q_xl_x pb-2"  style={{color:""}}> API Keys!</div>
                            </div>
                    </>}

                    {!!app && !!app.sidebarPages && app.sidebarPages.map((aLink, index)=>{
                        return (
                            <Link href={aLink.url || "#"} className="flex-center pb-2 py-3 clickble  px-2 bg-b-50 bord-r-50 opaci-chov--75 my-2 bg-glass-20 box-shadow-i-2-t  " key={index}>
                                <div style={{}}
                                    className="px-1 tx-center tx-lg opaci-hov--50 "
                                >
                                    {aLink.icon ? ICONS[aLink.icon]: <BsPerson /> }
                                </div>
                                <div className="flex-1 px-1 Q_md_x w-min-220p tx-shadow-5">{aLink.label}</div>
                                <div className="flex-1 px-1 Q_sm w-min-220p tx-shadow-5 tx-sm w-max-50px ellipsis nowrap noverflow">{aLink.label}</div>
                            </Link>
                        )
                    }) }
                    <hr className="w-100 opaci-10 my-3" style={{borderColor: "white"}} />
                    
                    {!!app && !!app.sidebarLinks && app.sidebarLinks.map((anUnit, index)=>{
                        if (router.query.key == anUnit.label) { return (
                            <div key={index} className="flex-center py-1 clickble  px-2 bg-w-50   " >
                                <div className="px-1 tx-center tx-lg opaci-hov--50 "><BsFillArchiveFill /></div>
                                <div className="flex-1 px-1 Q_xl_x w-min-220p">{anUnit.label.replace("_"," ").toUpperCase()}</div>
                            </div>
                        )}
                        return (
                        <Link key={index}  className="flex-center py-1 clickble  px-2 bg-w-hov-10  " href={`/foreigns/${anUnit.label}`} >
                            <div className="px-1 tx-center tx-lg opaci-hov--50"><BsFillArchiveFill /></div>
                            <div className="flex-1 px-1 Q_xl_x w-min-220p">{anUnit.label.replace("_"," ").toUpperCase()}</div>
                        </Link>
                        )
                    })}
                </div>
            </details>
        </div>


    </>)
}