import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState,  } from 'react'
import { Cylinder } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FaBtc, FaDiceD6, FaEthereum, FaExternalLinkAlt, FaRandom } from "react-icons/fa";
import { SiChainlink, SiFantom } from "react-icons/si";
import * as THREE from "three";
import React from 'react';
import { Vector3 } from "three";
import { useIsClient, useLocalStorage } from 'usehooks-ts';


import adjectives from '@/scripts/adjectives.json'
import nouns from '@/scripts/nouns.json'
import { parseDecimals, parseUTCString } from "@/components/scripts/helpers";
import HumanForReference from "./HumanForReference";
import Environment from "./Environment";
import RotatingPointLight from './RotatingPointLight';
import HouseButtons from '../overlay/HouseButtons';
import BarnButtons from '../overlay/BarnButtons';
import TokenList from '../overlay/TokenList';
import PlayerInventory from '../overlay/PlayerInventory';
import TimeframeList from '../overlay/TimeframeList';
import LiteIconsList from '../overlay/LiteIconsList';
import LoginLevel from '../levels/LoginLevel';
import { DEFAULT_TIMEFRAME_ARRAY } from '@/components/scripts/constants';
import { AppContext } from '@/scripts/contexts/AppContext';
import { fetchPost, fetchPut } from '@/scripts/helpers/fetchHelper';
import Link from 'next/link';
import { BiQuestionMark } from 'react-icons/bi';
import DynaText from '../DynaText';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { BsInfoCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

export const tokenColors = {
    "btc": "#EE8E1B",
    "eth": "#3EDF5D",
    "link": "#2A5ADA",
    "ftm": "#1A6AFF",
}
export const tokenTranslations = {
    "btc": "Wheat",
    "eth": "Money",
    "link": "Data",
    "ftm": "Tools",
}
export const tokenIcons
 = {
    "btc": <FaBtc />,
    "eth": <FaEthereum />,
    "link": <SiChainlink />,
    "ftm": <SiFantom />,
}
const Component = forwardRef(({live=false,children=null,theuserstart=null}:any, ref)=>{
    const DEFAULT_CARPORT_OTPS = {
        frontwall: {bool:false},
        backwall: {bool:false},
        rightwall: {bool:false},
        leftwall: {bool:false},
        ceil: {bool:false},
        floor: {bool:false},
        services: {bool:false},
        tutorial: {bool:true},

        
        house_frontwall: {bool:false},
        house_backwall: {bool:false},
        house_rightwall: {bool:false},
        house_leftwall: {bool:false},
        house_ceil: {bool:false},
        house_floor: {bool:false},

        safe: {bool:false},
        angel: {bool:false},
        storefront: {bool:false},
        observatory: {bool:false},
    }
    const app = useContext(AppContext)
    const tokensArray = ["btc", "eth", "link", "ftm"]
    const timeframesArray = ["3m", "15m", "4h", "1d"]
    // const roofWidth = 0.3
    // const wallWidth = 0.5
    const roofWidth = 0.2
    const wallWidth = 0.1
    const wideFeet = 4
    const lengthFeet = 5
    const heightFeet = 3
    const [farmPosition,s__farmPosition]:any = useState([-3,-0.45,-4]);
    const [buildingPosition,s__buildingPosition]:any = useState([0,-0.25,-4]);
    const rdm = function(opts,min=0) {return Math.floor(Math.random()*opts+min)}
    const [form, s__form] = useState({
        id: "BTCUSDT3M",
        username:"",
    })
    const ccc = THREE.Camera
    const setRandomName = ()=>{
        s__form({...form,...{username:
            adjectives[rdm(adjectives.length)]+" "+nouns[rdm(nouns.length)]
        }})
    }
    useImperativeHandle(ref, ()=>({
        resize: (size) => {
            let oldNewSize = {...sizeForm}
            if (size.width && size.width.feet) {
                oldNewSize.x = size.width.feet
            }
            if (size.length && size.length.feet) {
                oldNewSize.z = size.length.feet
            }
            s__sizeForm(oldNewSize)
        },
    }));
    const [lastpower, s__lastpower] = useState(0)
    const [power, s__power] = useState(0)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);
    const [optsToggler, s__optsToggler] = useState(DEFAULT_CARPORT_OTPS)
    const [farmOptsToggler, s__farmOptsToggler] = useState(DEFAULT_CARPORT_OTPS)
    function handleMouseDown(e) {
        setMouseDown(true);
        setMousePos({ x: e.clientX, y: e.clientY });
    }
    function handleMouseUp(e) { setMouseDown(false); }
    function handleMouseMove(e) { if (mouseDown) { setMousePos({ x: e.clientX, y: e.clientY }); } }
    const [sizeForm, s__sizeForm] = useState({x:wideFeet,z:lengthFeet,y:heightFeet})
    const roofHeight = useMemo(()=>{
        return parseInt(`${heightFeet/3.281}`)
    }
    ,[])
    const xOut = useMemo(()=>{
        return sizeForm.x/3.281
    }
    ,[sizeForm.x])
    const zOut = useMemo(()=>{
        return sizeForm.z/3.281
    }
    ,[sizeForm.z])
    const yOut = useMemo(()=>{
        return sizeForm.y/3.281
    }
    ,[sizeForm.y])
    const boundaryBox = useMemo(()=>{
        return [[(xOut), 0, zOut],[-(xOut), 0, -zOut],[-(xOut), 0, zOut],[(xOut), 0, -zOut]]
    },[xOut, zOut])
    const [score, s__score] = useState({score:0,maxScore:0,velocityX:0,velocityY:0})
    const fffooovvv = useMemo(()=>{
        return yOut * 60
    },[])


    const signup = async () => {
        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        // s__loadings({join:true})
        let res:any = await startHash()
        if (!res) return
        app.alert("success","Signed in")
        // s__loadings({join:false})
        s__uid(res)
        s__LS_uid(res)
        theuserstart.refetch()
    }
    const startHash = async () => {
        let username = form.username
        if (!username) {
            app.alert("neutral","Enter username")
            document.getElementById("username").focus()
            return
        }

        try {
            const res = await fetchPost('/api/start',{
                name: username,
            });
            const { IPv4, hash } = await res.json();
            return hash
        } catch (e) {
            return false
        }
    };

    /****** UPDATE ******/
    
    const toggleTrade = (token, {value, price}) => {
        alert()
        s__lastpower(value)
        { 
            setToken(token)
            if (value > 0) {
                // console.log(`Buy ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`, "new", power+value)
                
                let trigger = prompt(`Enter trigger price (${parseDecimals(price)})`,``)//`${parseFloat(price)*0.99}`)
                if (!!trigger) 
                {
                    startOrder(token, price, trigger)
                    alert()
                    s__power(parseFloat(""+parseDecimals(power+value)))
                }
            }
            else {
        alert()
        // console.log(`Sell ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`,"new", (power-lastpower))
                s__power(parseFloat(""+parseDecimals(power-0.05)))
            }
        }

    }
    const isClient = useIsClient()
    
    const startOrder = async (token, price, trigger) => {
        alert()
        

        try {
            const res = await fetchPost('/api/order',{
                symbol: token.toUpperCase()+"USDT",
                trigger: trigger,
                price,
            });
            const ress = await res.json();
            if (res.status >= 200 && res.status <= 300)
            {
                app.alert("success","Trade saved")
            } else {
                app.alert("error","Trade not completed")
            }
            return ress
        } catch (e) {
            app.alert("error","Trade not completed")
            return false
        }
    };
    const setTimeframe = (timeframe) => {
        let newId = form.id.split("USDT")[0] + "USDT" + timeframe.toUpperCase()
        s__form({...form,...{id:newId}})
    }
    const setToken = (token) => {
        if (!(token in tokensArrayObj)) return
        let newId = token.toUpperCase()+"USDT"+form.id.split("USDT")[1].toUpperCase()
        s__form({...form,...{id:newId}})
    }
    const toggleOption = (opt) => {
        let oldBool = optsToggler[opt].bool
        s__optsToggler({...optsToggler,...{[opt]:{bool:!oldBool}}})
    }
    const onTimeframeClick = (token, timeframe) => {
        setTimeframe(DEFAULT_TIMEFRAME_ARRAY[timeframe])
    }
    const onTextClick = (token) => {
        setToken(token)
    }
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [uid, s__uid] = useState("")
    const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
    useEffect(()=>{
        // let randomname = adjectives[rdm(adjectives.length)]+" "+nouns[rdm(nouns.length)]
        // console.log("theuserstart", theuserstart, randomname)
        console.log("max adjectives", Math.max.apply(Math, adjectives.map(x=>x.length)))
        console.log("max nouns", Math.max.apply(Math, nouns.map(x=>x.length)))
        
        app.s__userstart(theuserstart)
        s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
        s__uid(LS_uid)
        if (!!LS_uid) {  app.alert("success","Logged in!")}
    },[])
    const askTicket = async () => {
        console.log("askTicketaskTicketaskTicket")
        try {
            const res = await fetchPut('/api/order',{
            });
            const ress = await res.json();
            if (res.status >= 200 && res.status <= 300)
            {
                app.alert("success","request saved")
            } else {
                app.alert("error","request not completed")
            }
            return ress
        } catch (e) {
            app.alert("error","request not completed")
            return false
        }

    }
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement<any>(child)) {
          return React.cloneElement(child, {
                power, form, onTimeframeClick, onTextClick, toggleTrade, xOut, yOut,
                zOut, optsToggler, tokensArrayObj, s__tokensArrayObj, askTicket
            });
        }
        return child;
      });
      const selectedToken = useMemo(()=>{
        return form.id.split("USDT")[0].toLowerCase()
      },[form.id])
      const selectedTimeframe = useMemo(()=>{
        return form.id.split("USDT")[1].toLowerCase()
      },[form.id])
      const selectedTimeframeIndex = useMemo(()=>{
        return DEFAULT_TIMEFRAME_ARRAY.indexOf(selectedTimeframe)
      },[selectedTimeframe])

      const lastUpdate = useMemo(()=>{
        if (!theuserstart.data) return ""
        return parseUTCString(new Date(theuserstart.data.datenow)).replace("T","===")
    }, [theuserstart.data])

    /****** HTML ******/
    return (
    <div className='h-min-500px w-100 flex-col g-b-20 bord-r- flex-align-stretch flex-justify-stretch pos-rel'>
        
        {theuserstart.data && theuserstart.data.totalAttempts == 0 && optsToggler.tutorial.bool &&
            <div className='pos-abs top-0 left-0 w-100 h-100 bg-glass-5 z-100 flex-col'>
                <div className='tx-white'>
                    <div className='tx-lg opaci-50 tx-center Q_sm_x'
                         
                    >
                        How to play?
                    </div>

                    <div className='tx-lx flex-col gap-4 flex-align-start mb-8 Q_sm_x'>
                        <div className='flex flex-align-end gap-2'>
                            <div className='opaci-50'>1.</div> Turn 
                            <div className='tx-xl pt-1 tx-shadow-br-5' style={{color:"gold"}}>sync</div>
                            on
                        </div>
                        <div className='flex flex-align-end gap-2'>
                            <div className='opaci-50'>2.</div> Set
                            <div className='tx-xl pt-1 tx-shadow-br-5' style={{color:"cyan"}}>demo</div>
                            off
                        </div>
                        <div className='flex flex-align-end gap-2'>
                            <div className='opaci-50'>3.</div> Send
                            <div className='tx-xl pt-1 tx-shadow-br-5' style={{color:"#00ff00"}}>buy</div>
                            order
                        </div>
                        <div className='bg-b-50 px-2 bord-r-5 py-1 w-100'>
                            <div className='tx-xl opaci-chov-50 box-shadow-5 tx-center bg-b-90 bord-r-5 my-2 w-100 hover-3'
                                onClick={()=>{toggleOption("tutorial")}}
                            >
                                Start !
                            </div>
                            
                            <details className='ops-rel tx-sm'>
                                <summary className='w-100 opaci-chov--50'>
                                    Details
                                </summary>
                                <div className='pos-abs flex-col flex-align-stretch  w-100 left-0 pt-2'>
                                
                                    <div className='tx-sm opaci-50 tx-center '>
                                        <div>3 free virtual orders (tickets) every 3 minutes</div>
                                        <div>New tickets cannot be stacked</div>
                                    </div>
                                    <div className='tx-sm  tx-center flex flex-justify-center gap-1'>
                                        <div className='opaci-50'>* This message will dissapear </div>
                                        <div className='flex gap-1'>
                                            once you <div className='tx-bold'>level up</div><div className='tx-'>(send first order)</div>
                                        </div>
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>

                    <div className='bg-b-50 px-2 bord-r-5 py-1 w-100'>
                                <div className='tx-lx opaci-chov-50 box-shadow-5 tx-center bg-b-90 bord-r-5 my-2 hover-3'
                                    onClick={()=>{toggleOption("tutorial")}}
                                >
                                    Start !
                                </div>
                        </div>
                    <div className='tx-lg opaci-50 tx-center Q_xs  '
                         
                    >
                        How to play?
                    </div>

                    <div className='tx-lg  flex-col gap-1 flex-align-start px-4 mb-8 Q_xs '>
                        <div className='flex flex-align-end gap-2'>
                            <div className='opaci-50'>0.</div> <div className='opaci-50'>Press</div>
                            <div className='tx-lx  tx-shadow-br-5' style={{color:"beige"}}>start</div>
                        </div>
                        <div className='flex flex-align-end gap-2'>
                            <div className='opaci-50'>1.</div> Turn 
                            <div className='tx-lx  tx-shadow-br-5' style={{color:"gold"}}>sync</div>
                            on
                        </div>
                        <div className='flex flex-align-end gap-2'>
                            <div className='opaci-50'>2.</div> Set
                            <div className='tx-lx  tx-shadow-br-5' style={{color:"cyan"}}>demo</div>
                            off
                        </div>
                        <div className='flex flex-align-end gap-2'>
                            <div className='opaci-50'>3.</div> Send
                            <div className='tx-lx  tx-shadow-br-5' style={{color:"#00ff00"}}>buy</div>
                            order
                        </div>
                            <details className='ops-rel'>
                                <summary className='w-100 opaci-chov--50'>
                                    Game Details
                                </summary>
                                <div className='pos-abs flex-col flex-align-stretch  w-100 left-0 pt-2'>
                                
                                    <div className='tx-sm opaci-50 tx-center '>
                                        <div>3 free virtual orders (tickets) every 3 minutes</div>
                                        <div>New tickets cannot be stacked</div>
                                    </div>
                                    <div className='tx-sm  tx-center flex-col flex-justify-center gap-1'>
                                        <div className='opaci-50'>* This message will dissapear once </div>
                                        <div className='flex gap-1'>
                                            you <div className='tx-bold'>level up</div><div className='tx-'>(send first order)</div>
                                        </div>
                                    </div>
                                </div>
                            </details>
                    </div>
                </div>
            </div>
        }
        
        {isClient && !!uid && !!theuserstart.data && <>
            <div className='tx-white   pa-3 pos-abs dg left-0 bottom-0 -y-100  z-999 tx-ls-1'>
                <div className='pb-3 flex flex-align-end gap-2'>
                    <div className='opaci-75 tx-lg'>Tickets:</div>
                    <div className='opaci- tx-bold tx-ls-3 tx-lgx'>{theuserstart.data.attempts || 0}</div>
                </div>    
                {!optsToggler.tutorial.bool && <>
                
                    <div onClick={()=>{toggleOption("tutorial")}}
                        className="tx- opaci-chov--50  tx-white tx-shadow-b-1 tx-lg"
                    >
                        <BsInfoCircleFill /> <i>Menu</i>
                    </div>
                </>}
                {!!optsToggler.tutorial.bool && <>
                    <div className='pb-3 flex flex-align-end gap-2'>
                        <div className='opaci-50 tx-'>Total Orders:</div>
                        <div className='opaci-75 tx-bold tx-ls-3 tx-lg'>{theuserstart.data.totalAttempts || 0}</div>
                    </div>    
                    <div className='pb-3'>
                        <div className='opaci-50 tx-'>LAST UPDATE:</div>
                        {!!theuserstart.data.datenow && lastUpdate}
                    </div>    
                    {/* <div className='w-100 py-4 Q_xs'  ></div> */}
                    <hr className='bg-white w-100 my-2 Q_sm_x'  />
                    <div className="flex-col  flex-align-start gap-1 tx-shadow-b-1 Q_sm_x">
                        <Link href="/dashboard" target='_blank'
                            className="tx- opaci-chov--50  tx-white tx-shadow-b-1 tx-lg"
                        >
                            <FaExternalLinkAlt /> <i>Dashboard</i>
                        </Link>
                    </div>
                    
                    <div onClick={()=>{toggleOption("tutorial")}}
                        className="tx- opaci-chov--50  tx-white tx-shadow-b-1 tx-lg pt-2 Q_sm_x"
                    >
                        <MdClose /> <i>Close Menu</i>
                    </div>
                </>}
            </div>
            <div className='tx-white   pa-3 pos-abs dg right-0 bottom-0 -y-100  z-999 tx-ls-1 Q_xs'>
                {!!optsToggler.tutorial.bool && <>
                    <div className="flex-col  flex-align-end gap-1 tx-shadow-b-1 Q_xs">
                        <Link href="/dashboard" target='_blank'
                            className="tx- opaci-chov--50  tx-white tx-shadow-b-1 py-2 tx-lg"
                        >
                            <i>Dashboard</i> <FaExternalLinkAlt /> 
                        </Link>
                    </div>
                    
                    <div onClick={()=>{toggleOption("tutorial")}}
                        className="tx- opaci-chov--50  tx-white tx-shadow-b-1 tx-lg py-2  Q_xs"
                    >
                        <i>Close Menu</i> <MdClose /> 
                    </div>
                </>}
            </div>
        </>}
        
        {!uid && 
            <div className='pos-abs mt-200 ml-8 z-1001 box-shadow-i-bl-8 flex-row Q_xs_sm_flex-col' >
                <div onClick={setRandomName} className='pa-1 tx-white bg-b-50 flex-col px-3 tx-lx opaci-chov--50'>
                    <GiPerspectiveDiceSixFacesRandom />
                </div>
                <input type="text" value={form.username} id="username" name="username" maxLength={30}
                    onSubmit={signup}
                    placeholder='Username' className='tx-lgx w-max-220px z-1001 px-3 py-2 tx-ls-1 box-shadow-5 '
                     onChange={(e)=>{s__form({...form,...{username:e.target.value}});console.log("qqq", e.target.value)}} 
                />
                <div onClick={signup} className='pa-1 tx-white bg-b-50 flex-col px-3 tx-lx opaci-chov--50'>
                    Play
                </div>
            </div>
        }
        {!!uid && !optsToggler.tutorial.bool &&
            <div className="flex pos-abs top-0 left-0  bord-r- pa-2 ma-2">
                <div className="flex-col flex-align-start z-700 gap-1  mt-100 ">

                    <div className="flex-center gap-1 tx-shadow-b-1 bg-b-50 px-3 py-2 bg-glass-5">
                        
                        <div className='Q_xs box-shadow-3 bg-b-50 pa-1  tx-white'>{form.id}</div>
                        <div className="tx-  tx-white tx-shadow-b-2 Q_sm_x">
                            <div>SELECTED:</div>
                            <div className='box-shadow-3 bg-b-50 pa-2 ma-1'>{form.id}</div>
                        </div>
                        {selectedToken in tokensArrayObj &&
                            <div className="tx-  tx-white tx-shadow-b-2 w-max-100px">
                                <div>Stats:</div>
                                <div className='box-shadow-3 bg-b-50 pa-2 ma-1'>
                                    State: {(tokensArrayObj[selectedToken][selectedTimeframeIndex]).state}
                                </div>
                            </div>
                        }
                    </div>
                    <details className='nodeco'>
                        <summary className='opaci-chov--50 tx-white tx-lg bg-b-50 box-shadow-5 pa-2 bg-glass-5'
                            onClick={()=>{}}
                        >
                            <div className='Q_xs tx-sm'>Settings</div>
                            <div className='Q_sm_x'>Settings</div>
                        </summary>
                        <div className="flex-col flex-align-start  gap-1 mt-2 ">
                            <div className="flex-col flex-align-start gap-2 rot-180">
                                <TimeframeList {...{timeframesArray, setTimeframe, tokenColors, form}} />
                                <TokenList {...{setToken,  tokenColors,  form, tokenIcons,}} />
                                {!live && <>
                                    <PlayerInventory {...{toggleOption, optsToggler}}  />
                                </>}
                            </div>
                            <hr className='bg-white w-100 mt-2'  />
                            <div className="flex-center gap-1 tx-shadow-b-1 ">
                                <div className="tx-  tx-white tx-shadow-b-1">Power: {power}</div>
                            </div>
                            {/* <hr className='bg-white w-100 mt-2'  />
                            <div className="flex-col  flex-align-start gap-1 tx-shadow-b-1 ">
                                <Link href="/dashboard" target='_blank'
                                    className="tx- opaci-chov--50  tx-white tx-shadow-b-1 tx-lg"
                                >
                                    <FaExternalLinkAlt /> <i>Dashboard</i>
                                </Link>
                            </div> */}
                        </div>
                    </details>
                </div>
            </div>
        }



        {!!uid && (live) &&
            <div className="flex pos-abs top-0 right-0  bord-r- pa-2 ma-2">
                {theuserstart.data && !(theuserstart.data.totalAttempts == 0 && optsToggler.tutorial.bool) &&
                <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray mt-100 ">

                    <div className="flex-center gap-1 tx-shadow-b-1 ">
                        <div className="tx-  tx-gray tx-shadow-b-1">Size (m)</div>
                        <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(xOut*2+"")}</div>
                        <div>x</div>
                        <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(zOut*2+"")}</div>
                    </div>
                    <LiteIconsList {...{toggleOption, optsToggler,}} />
                </div>
            }
        </div>
        }


        {!!uid && (!live) &&
            <div className="flex pos-abs top-0 right-0  bord-r- pa-2 ma-2">
                <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray mt-100 ">

                    <div className="flex-center gap-1 tx-shadow-b-1 ">
                        <div className="tx-  tx-gray tx-shadow-b-1">Size (m)</div>
                        <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(xOut*2+"")}</div>
                        <div>x</div>
                        <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(zOut*2+"")}</div>
                    </div>
                    <BarnButtons toggleOption={toggleOption} optsToggler={optsToggler} />
                    <HouseButtons toggleOption={toggleOption} optsToggler={optsToggler} />
                </div>
            </div>
        }

        {/* {!!uid && theuserstart.data && !(theuserstart.data.totalAttempts == 0 && optsToggler.tutorial.bool) && 
            <div className="flex-col pos-abs bottom-0 right-0  bord-r- pa-2 ma-2 b w-100">
                <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray ">
                    <div className="flex-center gap-1 tx-bold-8 tx-ls-5 px-5 py-2 bg-b-20 ma-2 tx-shadow-b-3">
                        Score: {score.maxScore} | Speed: {parseDecimals(score.velocityX)}
                    </div>

                </div>
            </div>
        } */}


        <Canvas shadows  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}
            camera={{ fov: fffooovvv, position: [xOut,1,zOut*2] }} 
        >
            {/* {children} */}
            
            {!uid && <>
                <LoginLevel {...{
                    s__uid, uid, askTicket,
                    power, form, onTextClick, onTimeframeClick, toggleTrade, 
                    xOut, yOut, zOut, optsToggler, tokensArrayObj,theuserstart, s__tokensArrayObj
                }} />
            </>}

            {!!uid && <>
                {childrenWithProps}
            </>}
            {

                <RotatingPointLight distance={30} {...{color:"#ffddcc", intensity:1.2, position:[5,1,10]}} 
                    speed={10000}
                />
            }
            
            {/* {live && <fog attach="fog" args={['#2C2D32', 5, 10]} /> } */}
            {!live && <fog attach="fog" args={['#C5E4E4', 5, 20]} /> }
            {!live && <Environment /> }
            
            
            {!live && <HumanForReference scale={0.18} position={[2.2,-0.6,-1.3]}  />}
            {!live && /* Grass Floor */
                <Cylinder args={[20, 20, 1, 8]}  position={new Vector3(0, -1.3, 0)} receiveShadow castShadow >
                    <meshStandardMaterial attach="material" color="#48721E" />
                </Cylinder>
            }

        </Canvas>
    </div>)
})
Component.displayName = 'Scene'

export default Component