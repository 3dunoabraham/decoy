import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState,  } from 'react'
import { Torus, Cylinder, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { MdOutlineRoofing } from "react-icons/md";
import { MdFlipToBack } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";
import { TiChartAreaOutline } from "react-icons/ti";
import { BiGhost } from "react-icons/bi";
import { FaBtc, FaEthereum, FaMoneyBillAlt } from "react-icons/fa";
import { SiChainlink, SiFantom } from "react-icons/si";
import { GiAngelWings, GiObservatory, GiPayMoney, GiReceiveMoney, GiWheat } from "react-icons/gi";
import { HiBuildingStorefront } from "react-icons/hi2";
import * as THREE from "three";

import BoundaryPillars from "@/src/items/3d/farmhouse/BoundaryPillars";
import { parseDecimals } from "@/components/scripts/helpers";
import TradingBox from "../npc/TradingBox/TradingBox";
import { Vector3 } from "three";
import HumanForReference from "./HumanForReference";
import Environment from "./Environment";
// import { Building } from '../farmhouse/Building';
import RotatingPointLight from './RotatingPointLight';
import FarmNpcContainer from '../npc/FarmNpcContainer';
import { BsSafe2Fill } from 'react-icons/bs';
import { TbNetwork } from 'react-icons/tb';
import HouseButtons from '../overlay/HouseButtons';
import BarnButtons from '../overlay/BarnButtons';
import React from 'react';
import TokenList from '../overlay/TokenList';
import ToggleOrbit from './camera/ToggleOrbit';
import PlayerInventory from '../overlay/PlayerInventory';
import TimeframeList from '../overlay/TimeframeList';
import LiteIconsList from '../overlay/LiteIconsList';
import { useLocalStorage } from 'usehooks-ts';
import SimpleOrbit from './camera/SimpleOrbit';
import LoginLevel from '../levels/LoginLevel';
import { DEFAULT_TIMEFRAME_ARRAY } from '@/components/scripts/constants';


  
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


const Component = forwardRef(({live=false,children=null}:any, ref)=>{
    const DEFAULT_CARPORT_OTPS = {
        frontwall: {bool:false},
        backwall: {bool:false},
        rightwall: {bool:false},
        leftwall: {bool:false},
        ceil: {bool:false},
        floor: {bool:false},
        services: {bool:false},

        
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
    const [form, s__form] = useState({
        id: "BTCUSDT3M",
    })
    const ccc = THREE.Camera
    
    useImperativeHandle(ref, ()=>({
        resize: (size) => {
            let oldNewSize = {...sizeForm}
            // console.log("resize with this", size)
            if (size.width && size.width.feet) {
                // console.log("width connected", size.width.feet)
                oldNewSize.x = size.width.feet
            } // else { be_size(10, "x") }
            if (size.length && size.length.feet) {
                // console.log("length connected", size.length.feet)
                oldNewSize.z = size.length.feet
            } // else { be_size(10, "z") }

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
        return yOut * 70
    },[])



    /****** UPDATE ******/
    
    const toggleTrade = (token, velocity) => {
        // console.log("token, velocity", token, velocity)
        s__lastpower(velocity)
        { 
            setToken(token)

            if (velocity > 0) {
                // console.log(`Buy ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`, "new", power+velocity)
                s__power(parseFloat(""+parseDecimals(power+velocity)))
            }
            else {
                // console.log(`Sell ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`,"new", (power-lastpower))
                s__power(parseFloat(""+parseDecimals(power-0.05)))
            }
        }
    }
    const setTimeframe = (timeframe) => {
        // console.log("id", timeframe)
        let newId = form.id.split("USDT")[0] + "USDT" + timeframe.toUpperCase()
        s__form({...form,...{id:newId}})
    }
    const setToken = (token) => {
        // console.log("id", token)
        let newId = token.toUpperCase()+"USDT"+form.id.split("USDT")[1].toUpperCase()
        s__form({...form,...{id:newId}})
    }
    const toggleOption = (opt) => {
        let oldBool = optsToggler[opt].bool
        s__optsToggler({...optsToggler,...{[opt]:{bool:!oldBool}}})
    }
    const onTextClick = (token) => {
        // console.log("token", token)
        setToken(token)

    }
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [uid, s__uid] = useState("")
    const [clickedPrice, s__clickedPrice] = useState(0)
    const [showAllTokens,s__showAllTokens] = useState<any>(true)
    const [chopAmount,s__chopAmount] = useState<any>(0)
    const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
    const [klinesArray,s__klinesArray] = useState<any[]>([])
    const [clientIP, s__clientIP] = useState('');  
    useEffect(()=>{
        // s__counter(counter+1)
        s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
        // console.log("LS_tokensArrayObj")
        // console.log(JSON.parse(LS_tokensArrayObj)) 
        s__uid(LS_uid)
        s__clientIP(LS_uid.split(":")[0])
        // console.log("s__tokensArrayObj", JSON.parse(LS_tokensArrayObj))
        // console.log("s__uid", LS_uid)
        // console.log("s__clientIP", LS_uid.split(":")[0])
    },[])
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement<any>(child)) {
          return React.cloneElement(child, { power, form, onTextClick, toggleTrade, xOut, yOut, zOut, optsToggler, tokensArrayObj, s__tokensArrayObj });
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

    /****** HTML ******/
    return (
    <div className='h-min-500px w-100 flex-col g-b-20 bord-r- flex-align-stretch flex-justify-stretch pos-rel'>
        
        {!!uid &&
            <div className="flex pos-abs top-0 left-0  bord-r- pa-2 ma-2">
                <div className="flex-col flex-align-start z-700 gap-1  mt-100 ">

                    <div className="flex-center gap-1 tx-shadow-b-1 bg-b-50 px-3 py-2 bg-glass-5">
                        <div className="tx-  tx-white tx-shadow-b-2">
                            <div>SELECTED:</div>
                            <div className='box-shadow-3 bg-b-50 pa-2 ma-1'>{form.id}</div>
                        </div>
                        {selectedToken in tokensArrayObj &&
                            <div className="tx-  tx-white tx-shadow-b-2 w-max-100px">
                                <div>Stats:</div>
                                <div className='box-shadow-3 bg-b-50 pa-2 ma-1'>
                                    State: {(tokensArrayObj[selectedToken][selectedTimeframeIndex]).state}
                                </div>
                                {/* {JSON.stringify(tokensArrayObj[selectedToken][selectedTimeframeIndex])} */}
                                {/* <div className='box-shadow-3 bg-b-50 pa-2 ma-1'>{JSON.stringify()}</div> */}
                            </div>
                        }
                    </div>
                    <details>
                        <summary className='opaci-chov--50 tx-white tx-lg bg-b-50 box-shadow-5 pa-2 bg-glass-5'>
                            Settings
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
                        </div>
                    </details>
                    
                </div>
            </div>
        }



        {!!uid && (live) &&
            <div className="flex pos-abs top-0 right-0  bord-r- pa-2 ma-2">
                <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray mt-100 ">

                    <div className="flex-center gap-1 tx-shadow-b-1 ">
                        <div className="tx-  tx-gray tx-shadow-b-1">Size (m)</div>
                        <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(xOut*2+"")}</div>
                        <div>x</div>
                        <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(zOut*2+"")}</div>
                    </div>
                    <LiteIconsList {...{toggleOption, optsToggler,}} />
                </div>
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

        <div className="flex-col pos-abs bottom-0 right-0  bord-r- pa-2 ma-2 b w-100">
            <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray ">
                <div className="flex-center gap-1 tx-bold-8 tx-ls-5 px-5 py-2 bg-b-20 ma-2 tx-shadow-b-3">
                    Score: {score.maxScore} | Speed: {parseDecimals(score.velocityX)}
                </div>

            </div>
        </div>


        <Canvas shadows  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}
            camera={{ fov: fffooovvv, position: [xOut,1,zOut*2] }} 
        >
            {/* {children} */}
            {!uid && <>
                <LoginLevel {...{
                    power, form, onTextClick, toggleTrade, xOut, yOut, zOut, optsToggler, tokensArrayObj, s__tokensArrayObj
                }} />
            </>}
            {!!uid && <>
                {childrenWithProps}
            </>}

            <RotatingPointLight distance={30} {...{color:"#ffddcc", intensity:1.2, position:[5,1,10]}} 
                speed={10000}
            />
            
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
function TheCamera() {
    
    useThree(({camera}) => {
        camera.rotation.set(0, 0, 0);
      });

    return (
        <OrbitControls target={[.6, .4, 0]}/>
    )
}
Component.displayName = 'HomeContainer'

export default Component