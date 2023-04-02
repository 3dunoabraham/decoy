import { forwardRef, useImperativeHandle, useMemo, useRef, useState,  } from 'react'
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
import TradingBox from "../TradingBox";
import { Vector3 } from "three";
import HumanForReference from "./HumanForReference";
import Environment from "./Environment";
import { Building } from '../farmhouse/Building';
import RotatingPointLight from './RotatingPointLight';
import NpcContainer from '../npc/NpcContainer';
import { BsSafe2Fill } from 'react-icons/bs';
import { TbNetwork } from 'react-icons/tb';
import HouseButtons from '../overlay/HouseButtons';
import BarnButtons from '../overlay/BarnButtons';
import React from 'react';
import TokenList from '../overlay/TokenList';
import ToggleOrbit from './camera/ToggleOrbit';
import PlayerInventory from '../overlay/PlayerInventory';


  
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
            console.log("resize with this", size)
            if (size.width && size.width.feet) {
                console.log("width connected", size.width.feet)
                oldNewSize.x = size.width.feet
            } // else { be_size(10, "x") }
            if (size.length && size.length.feet) {
                console.log("length connected", size.length.feet)
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
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement<any>(child)) {
          return React.cloneElement(child, { power });
        }
        return child;
      });
    
    
    const toggleTrade = (token, velocity) => {
        console.log("token, velocity", token, velocity)
        s__lastpower(velocity)
        { 
            setToken(token)

            if (velocity > 0) {
                console.log(`Buy ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`, "new", power+velocity)
                s__power(parseFloat(""+parseDecimals(power+velocity)))
            }
            else {
                console.log(`Sell ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`,"new", (power-lastpower))
                s__power(parseFloat(""+parseDecimals(power-0.05)))
            }
        }
    }
    const setTimeframe = (timeframe) => {
        console.log("id", timeframe)
        let newId = form.id.split("USDT")[0] + "USDT" + timeframe.toUpperCase()
        s__form({...form,...{id:newId}})
    }
    const setToken = (token) => {
        console.log("id", token)
        let newId = token.toUpperCase()+"USDT"+form.id.split("USDT")[1].toUpperCase()
        s__form({...form,...{id:newId}})
    }
    const toggleOption = (opt) => {
        let oldBool = optsToggler[opt].bool
        s__optsToggler({...optsToggler,...{[opt]:{bool:!oldBool}}})
    }
    const onTextClick = (token) => {
        console.log("token", token)
        setToken(token)

    }
    


    /****** HTML ******/
    return (
    <div className='h-min-500px w-100 flex-col g-b-20 bord-r- flex-align-stretch flex-justify-stretch pos-rel'>
        
        <div className="flex-col pos-abs bottom-0 right-0  bord-r- pa-2 ma-2 b w-100">
            <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray ">
                <div className="flex-center gap-1 tx-bold-8 tx-ls-5 px-5 py-2 bg-b-20 ma-2 tx-shadow-b-3">
                    Score: {score.maxScore} | Speed: {parseDecimals(score.velocityX)}
                </div>

            </div>
        </div>


        <div className="flex pos-abs top-0 left-0  bord-r- pa-2 ma-2">
            <div className="flex-col flex-align-start z-700 gap-1  mt-100 ">

                <div className="flex-center gap-1 tx-shadow-b-1 bg-b-50 px-3 py-2 bg-glass-5">
                    <div className="tx-  tx-white tx-shadow-b-2">
                        <div>SELECTED:</div>
                        <div className='box-shadow-3 bg-b-50 pa-2 ma-1'>{form.id}</div>
                    </div>
                </div>
                <details>
                    <summary className='opaci-chov--50 tx-white tx-lg bg-b-50 box-shadow-5 pa-2 bg-glass-5'>
                        Change
                    </summary>
                    <div className="flex-col flex-align-start  gap-1 mt-2 ">
                        <div className="flex-col flex-align-start gap-2 rot-180">
                            
                            <div className="flex gap-1">
                                { timeframesArray.map((aTimeframe, index) => {

                                    return (
                                        <button onClick={()=>{setTimeframe(aTimeframe)}}
                                            key={index}
                                            style={{ color:tokenColors[aTimeframe]}}
                                            className={`flex-1  tx-center pa-1 bord-r- border-white px-1 tx-bold-8 opaci-chov--50 tx-l
                                                ${form.id.split("USDT")[1] !== aTimeframe.toUpperCase()
                                                    ? " tx-shadow-2 bg-b-50 tx-white tx-shadow-b-1 "
                                                    : "  tx-lgx tx-red bg-w-50 tx-shadow-b-1 "}
                                            `}
                                        >
                                            {aTimeframe.toUpperCase()}
                                        </button>
                                    )
                                })}
                            </div>
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



        {live &&
            <div className="flex pos-abs top-0 right-0  bord-r- pa-2 ma-2">
                <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray mt-100 ">

                    <div className="flex-center gap-1 tx-shadow-b-1 ">
                        <div className="tx-  tx-gray tx-shadow-b-1">Size (m)</div>
                        <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(xOut*2+"")}</div>
                        <div>x</div>
                        <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(zOut*2+"")}</div>
                    </div>
                    <div className="flex-col flex-align-stretch gap-2 rot-180">
                        
                        {/* <div className="flex tx-center  bord-r-8">
                            <button onClick={()=>{toggleOption("ceil")}}
                                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                                className={` tx-center w-100 px-1 bord-r- px-2 opaci-chov--50  tx-lx pt-2
                                    ${!optsToggler["ceil"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gra" : " tx-blue border-blue"}
                                `}
                            >
                                <div className=""><MdOutlineRoofing /></div>
                            </button>
                        </div> */}
                        <div className="flex-center ">
                            <button onClick={()=>{toggleOption("floor")}}
                                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                                className={` tx-center w-100   bord-r- px-2 opaci-chov--50 tx-lx pt-1
                                    ${!optsToggler["floor"].bool
                                        ? "bg-b-hov-20 opaci-25 border-white tx-gra"
                                        : " tx-blue border-blue"
                                    }
                                `}
                            >
                                <AiFillEyeInvisible />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }


        {!live &&
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


        <Canvas shadows  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}
            camera={{ fov: fffooovvv, position: [xOut,1,zOut*2] }} 
        >
            {/* {children} */}
            {childrenWithProps}
            <RotatingPointLight distance={30} {...{color:"#ffddcc", intensity:1.2, position:[5,1,10]}} 
                speed={10000}
            />
            
            {/* {live && <fog attach="fog" args={['#2C2D32', 5, 10]} /> } */}
            {!live && <fog attach="fog" args={['#C5E4E4', 5, 20]} /> }
            {!live && <Environment /> }
            
            <NpcContainer {...{optsToggler}} position={[0,0,0]}  
                form={form} 
            />
            
            {!live && <HumanForReference scale={0.18} position={[2.2,-0.6,-1.3]}  />}
            {!live && /* Grass Floor */
                <Cylinder args={[20, 20, 1, 8]}  position={new Vector3(0, -1.3, 0)} receiveShadow castShadow >
                    <meshStandardMaterial attach="material" color="#48721E" />
                </Cylinder>
            }
            {/*  Concrete Floor  */}
            {live && optsToggler.floor.bool && 
                <Cylinder args={[4, 4, 1, 6]}  position={new Vector3(0, -1.3, 0)} receiveShadow castShadow >
                    <meshStandardMaterial attach="material" color="#5E6166" />
                </Cylinder>
            }

            {!live && /* Storage Tower */ <>
                <Cylinder args={[0.55, 0.55, 1.68, 6]}  position={new Vector3(3, 0, -3)} receiveShadow castShadow >
                    <meshStandardMaterial attach="material" color="#aaaaaa" />
                </Cylinder>
                <Cylinder args={[0.5, 0.5, 1.7, 9]}  position={new Vector3(3, 0, -3)}  receiveShadow castShadow>
                    <meshStandardMaterial attach="material" color="#ffffff"  />
                </Cylinder>
                <Torus args={[0.6,0.1,4,5]}  position={new Vector3(3, 0.85, -3)} receiveShadow castShadow rotation={[Math.PI/2,0,Math.PI/2]}>
                    <meshStandardMaterial  attach="material" color="#aaaaaa" />
                </Torus>
            </>}
            {!live && /* Tower Live State */ <>
                {!!power &&
                    <Cylinder args={[0.5, 0.6, power, 5]}  position={new Vector3(3, 0.85, -3)} >
                        <meshStandardMaterial attach="material" color={`#${power*320+50}${power*100+50}44`} 
                            emissive={`#${power*320+50}444477`}
                        />
                    </Cylinder>
                }
                {!power &&
                    <Cylinder args={[0.5, 0.6, 0.05, 5]}  position={new Vector3(3, 0.85, -3)} >
                        <meshStandardMaterial attach="material" color={`#000`} 
                            
                        />
                    </Cylinder>
                }
            </>}





            {/* FarmHouse */}
            {!live && <Building {...{xOut,yOut,zOut:zOut,wallWidth,roofWidth}}  facadeColor="#963B2D"
                optsToggler={optsToggler} position={buildingPosition} roofType="farm"
            />}
            {/* House */}
            {!live && <Building {...{xOut:xOut/2,yOut:yOut/1.5,zOut:zOut/2,wallWidth,roofWidth}}  
                optsToggler={{
                    leftwall: optsToggler.house_leftwall,
                    rightwall: optsToggler.house_rightwall,
                    backwall: optsToggler.house_backwall,
                    frontwall: optsToggler.house_frontwall,
                    ceil: optsToggler.house_ceil,
                    floor: optsToggler.house_floor,
                }} position={farmPosition} 
            />}

            {!live && <BoundaryPillars position={buildingPosition}  height={yOut*1.05} diameter={0.05} pillars={boundaryBox} /> }
            
            {/* <ChartBox {...{s__score: scoreHandle,score, velocityX:c_velocityX,
                setVelocityX:c_setVelocityX, velocityY:c_velocityY, setVelocityY:c_setVelocityY}} 
            wallWidth={wallWidth} boundaries={[xOut, yOut, zOut]}  position={[0, (1.68/2) - 0.95, zOut]} />  */}

            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="btc" refetchInterval={60000}
                position={[xOut/2,-0.35,-zOut/2]} onTextClick={()=>{onTextClick("btc")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("btc",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="eth" refetchInterval={60000}
                position={[-xOut/2,-0.35,zOut/2]} onTextClick={()=>{onTextClick("eth")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("eth",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="link" refetchInterval={60000}
                position={[xOut/2,-0.35,zOut/2]} onTextClick={()=>{onTextClick("link")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("link",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="ftm" refetchInterval={60000}
                position={[-xOut/2,-0.35,-zOut/2]} onTextClick={()=>{onTextClick("ftm")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("ftm",data)}}
            /> 
            {/* <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="btc" 
                position={[2.,-0.35,-2]} onTextClick={()=>{onTextClick("btc")}}
                setVelocityY={(data)=>{toggleTrade("btc",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="eth" 
                position={[-3,-0.35,1]} onTextClick={()=>{onTextClick("eth")}}
                setVelocityY={(data)=>{toggleTrade("eth",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="link" 
                position={[6,-0.35,3]} onTextClick={()=>{onTextClick("link")}}
                setVelocityY={(data)=>{toggleTrade("link",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="ftm" 
                position={[-4,-0.35,-2.5]} onTextClick={()=>{onTextClick("ftm")}}
                setVelocityY={(data)=>{toggleTrade("ftm",data)}}
            />  */}

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