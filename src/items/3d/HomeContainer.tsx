import { Canvas, useThree } from "@react-three/fiber";
import { MdRoofing, MdBorderLeft, MdBorderRight } from "react-icons/md";
import { MdFlipToBack } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { CgBorderLeft } from "react-icons/cg";
import { TfiLayoutSidebarLeft } from "react-icons/tfi";
import { AiOutlineCaretUp, AiOutlineVerticalAlignBottom } from "react-icons/ai";
import { TbChartAreaLine } from "react-icons/tb";
import { TiChartAreaOutline } from "react-icons/ti";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FiAlertTriangle } from "react-icons/fi";
import { HiOutlineBellAlert } from "react-icons/hi2";

import SemiOrbitCameraControl from "@/src/items/3d/SemiOrbitCameraControl";
import CustomPillars from "@/src/items/3d/CustomPillars";
import ShapeContainer from "@/src/items/3d/ShapeContainer";
import RoofContainer from "@/src/items/3d/RoofContainer";
import CustomWall from "@/src/items/3d/CustomWall";
import CustomHorizontalWall from "@/src/items/3d/CustomHorizontalWall";
import HumanScale from "@/src/items/3d/HumanScale";
import FieldFloorScale from "./FieldFloorScale";
import CustomHorizontalWallDoor from "./CustomHorizontalWallDoor";

import { forwardRef, useContext, useImperativeHandle, useMemo, useState,  } from 'react'
import CustomBox from "./CustomBox";
import MovingBox2 from "./MovingBox2";
import { Cylinder, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import BaseballFieldFloorScale from "./BaseballFieldFloorScale";
import { parseDecimals } from "@/components/scripts/helpers";
import ChartBox from "./ChartBox";
import FloorFloorScale from "./FloorFloorScale";
import TradingOrbitCameraControl from "./TradingOrbitCameraControl";
import TradingBox from "./TradingBox";
import { Vector3 } from "three";

const Component = forwardRef(({}:any, ref)=>{
    const tokenColors = {
      "btc": "orange",
      "eth": "green",
      "link": "cyan",
      "ftm": "violet",
    }
    // const { camera, gl: { domElement }, } = useThree();
    const [form, s__form] = useState({
        id: "BTCUSDT3M",
    })
    const ccc = THREE.Camera
    useImperativeHandle(ref, ()=>({
        // testConnect: () => {
        //     console.log("connected")
        // },
        resize: (size) => {
            let oldNewSize = {...sizeForm}
            console.log("resize with this", size)
            if (size.width && size.width.feet) {
                console.log("width connected", size.width.feet)
                oldNewSize.x = size.width.feet
                // be_size(size.width.feet, "x")
            } // else { be_size(10, "x") }
            if (size.length && size.length.feet) {
                console.log("length connected", size.length.feet)
                oldNewSize.z = size.length.feet
                // be_size(size.length.feet, "z")
            } // else { be_size(10, "z") }

            s__sizeForm(oldNewSize)
        },
    }));
    const [lastpower, s__lastpower] = useState(0)
    const [power, s__power] = useState(0)
    
    const toggleTrade = (token, velocity) => {
        console.log("token, velocity", token, velocity)
        s__lastpower(velocity)
        // if (optsToggler["ceil"].bool)
        { 


            if (velocity > 0) {
                console.log(`Buy ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`, "new", power+velocity)
                s__power(parseFloat(""+parseDecimals(power+velocity)))
                // alert(`Buy ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`)
            }
            else {
                console.log(`Sell ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`,"new", (power-lastpower))
                s__power(parseFloat(""+parseDecimals(power-0.05)))
                // alert(`Sell ${token.toUpperCase()}USDT${form.id.split("USDT")[1]}`)
            }
        }
    }
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);
    function handleMouseDown(e) {
        setMouseDown(true);
        setMousePos({ x: e.clientX, y: e.clientY });
    }
    function handleMouseUp(e) { setMouseDown(false); }
    function handleMouseMove(e) { if (mouseDown) { setMousePos({ x: e.clientX, y: e.clientY }); } }
    const DEFAULT_CARPORT_OTPS = {
        frontwall: {bool:false},
        backwall: {bool:false},
        rightwall: {bool:false},
        leftwall: {bool:false},
        ceil: {bool:false},
        floor: {bool:true},
        services: {bool:true},
    }
    const [optsToggler, s__optsToggler] = useState(DEFAULT_CARPORT_OTPS)
    const toggleOption = (opt) => {
        let oldBool = optsToggler[opt].bool
        s__optsToggler({...optsToggler,...{[opt]:{bool:!oldBool}}})
    }
    // const roofWidth = 0.3
    // const wallWidth = 0.5
    const roofWidth = 0.2
    const wallWidth = 0.1
    const wideFeet = 6
    const lengthFeet = 6
    const heightFeet = 5
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
    const be_size = (e, propName) => {
        // console.log(sizeForm, "be_size", {[propName]:e})
        let theNewSize = {...sizeForm,...{[propName]:e}}
        // console.log("the new size", theNewSize)
        s__sizeForm(theNewSize)
    }
    const [c_velocityX, c_setVelocityX] = useState(0);
    const [c_velocityY, c_setVelocityY] = useState(0);
    
  const [velocityX, setVelocityX] = useState(0);
  const [velocityY, setVelocityY] = useState(0);
    const boundaryBox = useMemo(()=>{
        return [[(xOut), 0, zOut],[-(xOut), 0, -zOut],[-(xOut), 0, zOut],[(xOut), 0, -zOut]]
    },[xOut, zOut])
    const [score, s__score] = useState({score:0,maxScore:0,velocityX:0,velocityY:0})
    const scoreHandle = (data) => {
        // if (score.score < 0) {
        //     console.log("data.score < 0")
        //     setVelocityY(0)
        // }
        s__score(data)
        // if (score.score > 3) {
        //     console.log("score.score > 3")
        //     setVelocityY(0)
        // }
    }
    const fffooovvv = useMemo(()=>{
        return yOut * 70
    },[])
    const tokensArray = ["btc", "eth", "link", "ftm"]
    const timeframesArray = ["3m", "15m", "4h", "1d"]
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
    return (
    <div className='h-min-500px w-100 flex-col g-b-20 bord-r- flex-align-stretch flex-justify-stretch pos-rel'>
        
        <div className="flex-col pos-abs bottom-0 right-0  bord-r- pa-2 ma-2 b w-100">
            <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray tx-shadow-b-1 tx-lg g">
                {/* <div className="flex-center gap-1 opaci-50 tx-ls-5">
                    ID: {form.id}
                </div> */}
                {/* <div className="flex-center gap-1 opaci-50 tx-ls-5">
                    SIZE
                    (ft)
                </div> */}
                {/* <div className="flex-col gap-1 opaci-50 tx-ls-">
                    <div className="flex tx-xsm">width: {sizeForm.x}</div>
                    <input type="range" min="3" max="77" className="w-100" value={sizeForm.x} onChange={(e)=>{be_size(e.target.value,"x")}} />
                </div>
                <div className="flex-col gap-1 opaci-50 tx-ls-">
                    <div className="tx-xsm pr-1">length: {sizeForm.z}</div>
                    <input type="range" min="3" max="77" className="w-100" value={sizeForm.z} onChange={(e)=>{be_size(e.target.value,"z")}} />
                </div> */}
                <div className="flex-col gap-1 opaci-50 tx-ls- ">
                    <div className="flex tx-xsm">Height (ft): {sizeForm.y}</div>
                    <input type="range" min="1" max="12"
                        className="z-900 scale-150 w-100 pos-rel"
                        style={{filter: "hue-rotate(-189deg) "}}
                        value={sizeForm.y} onChange={(e)=>{be_size(e.target.value,"y")}} 
                        
                    />
                </div>
            </div>
            <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray ">
                <div className="flex-center gap-1 tx-bold-8 tx-ls-5 px-5 py-2 bg-b-20 ma-2 tx-shadow-5">
                    Score: {score.maxScore} | Speed: {parseDecimals(score.velocityX)}
                    {/* Y: {score.velocityY} */}
                </div>
            </div>
        </div>


        <div className="flex pos-abs top-0 left-0  bord-r- pa-2 ma-2">
            <div className="flex-col flex-align-stretch z-700 gap-1 tx-gray mt-100 ">

                <div className="flex-center gap-1 tx-shadow-b-1 ">
                    <div className="tx-  tx-gray tx-shadow-b-1">Power: {power}</div>
                </div>
                <div className="flex-center gap-1 tx-shadow-b-1 ">
                    <div className="tx-  tx-gray tx-shadow-b-1">Size (m)</div>
                    <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(xOut*2+"")}</div>
                    <div>x</div>
                    <div className="flex bg-b- bord-r- opaci-chov--50">{parseInt(zOut*2+"")}</div>
                </div>
                <div className="flex-col flex-align-stretch gap-2 rot-180">
                    
                    <div className="flex gap-1">
                        { timeframesArray.map((aTimeframe, index) => {

                            return (
                                <button onClick={()=>{setTimeframe(aTimeframe)}}
                                    key={index}
                                    style={{ color:tokenColors[aTimeframe]}}
                                    className={`flex-1 tx-center pa-1 bord-r- px-2 opaci-chov--50 tx-l
                                        ${form.id.split("USDT")[1] !== aTimeframe.toUpperCase() ? "bg-b-hov-20 opaci-25 border-white tx-gray" : " tx-bold-8 tx-lg tx-red"}
                                    `}
                                >
                                    {aTimeframe.toUpperCase()}
                                    {/* {form.id} */}
                                    {/* | */}
                                    {/* {aTimeframe.toUpperCase()+"USDT3M"}  */}
                                </button>
                            )
                        })}
                    </div>
                    
                    <div className="flex gap-1">
                        { tokensArray.map((aToken, index) => {

                            return (
                                <button onClick={()=>{setToken(aToken)}}
                                    key={index}
                                    style={{ color:tokenColors[aToken]}}
                                    className={`flex-1 tx-center pa-1 bord-r- px-2 opaci-chov--50 tx-l
                                        ${form.id !== aToken.toUpperCase()+"USDT"+form.id.split("USDT")[1].toUpperCase() ? "bg-b-hov-20 opaci-25 border-white tx-gray" : " tx-bold-8 tx-lg "}
                                    `}
                                >
                                    {aToken.toUpperCase()}
                                    {/* {form.id} */}
                                    {/* | */}
                                    {/* {aToken.toUpperCase()+"USDT3M"}  */}
                                </button>
                            )
                        })}
                    </div>
                    <div className="flex tx-center  bord-r-8">
                        <button onClick={()=>{toggleOption("ceil")}}
                            style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                            className={` tx-center w-100 px-1 bord-r- px-2 opaci-chov--50  tx-lx pt-2
                                ${!optsToggler["ceil"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gray" : " tx-blue border-blue"}
                            `}
                        >
                            <div className=""><TbChartAreaLine /></div>
                        </button>
                    </div>
                    <div className="flex-center ">
                        <button onClick={()=>{toggleOption("frontwall")}}
                            style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                            className={` tx-center w-100   bord-r- px-2 opaci-chov--50 tx-lx
                                ${!optsToggler["frontwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gray" : " tx-blue border-blue"}
                            `}
                        >
                            <FiAlertTriangle />
                        </button>
                    </div>
                    <div className="flex gap-1">
                        <button onClick={()=>{toggleOption("leftwall")}}
                            style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                            className={`flex-1 tx-center pa-1 bord-r- px-2 opaci-chov--50 tx-lx
                                ${!optsToggler["leftwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gray" : " tx-blue border-blue"}
                            `}
                        >
                            <GiPayMoney />
                        </button>
                        <button onClick={()=>{toggleOption("rightwall")}} 
                            style={{filter: "hue-rotate(-189deg) brightness(666%)"}}
                            className={`flex-1 tx-center pt-2  bord-r- px-2 opaci-chov--50 tx-lx
                                ${!optsToggler["rightwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gray" : " tx-blue border-blue"}
                            `}
                        >
                            <div className="block" ><GiReceiveMoney /></div>
                        </button>
                    </div>
                    <div className="flex-center">
                        <button onClick={()=>{toggleOption("backwall")}}
                            style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                            className={` tx-center w-100  pt-1 bord-r- px-2 opaci-chov--50  tx-lx
                                ${!optsToggler["backwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gray" : " tx-blue border-blue"}
                            `}
                        >
                            <HiOutlineBellAlert />
                        </button>
                    </div>
                    <div className="flex-center">
                        <button onClick={()=>{toggleOption("floor")}}
                            style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                            className={` tx-center w-100  pt-1 bord-r- px-2 opaci-chov--50  tx-lx
                                ${!optsToggler["floor"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gray" : " tx-blue border-blue"}
                            `}
                        >
                            <TiChartAreaOutline />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Canvas shadows  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}
            
            // camera={{ fov: 50, position: [-xOut*2, yOut/4, zOut*2] }} 
            camera={{ fov: fffooovvv, position: [xOut/2.5,yOut/2,zOut*1.3] }} 
        >
            <OrbitControls  enableZoom={false} dampingFactor={0.5}  />
            {/* <SemiOrbitCameraControl zPos={zOut*2}  /> */}
            <TradingOrbitCameraControl zPos={zOut}  />
            <ambientLight intensity={0.35} />
            <pointLight castShadow intensity={1.2} position={[xOut*2, yOut*2, zOut*1.5]} />
            <pointLight castShadow intensity={0.5} position={[xOut*1.1, yOut*1.1, -zOut*1.2]} />
            <fog attach="fog" args={['#000000', 5, 10]} />

            <Cylinder args={[0.9, 0.9, 1.4, 5]}  position={new Vector3(0, 0, -1)} >
                <meshStandardMaterial attach="material" color="lightgray" />
            </Cylinder>
            <Cylinder args={[1.1, 1.1, 1, 7]}  position={new Vector3(0, 0, -1)} >
                <meshStandardMaterial attach="material" color="gray" />
            </Cylinder>
            {!!power &&
                <Cylinder args={[0.8, 0.8, 1.6, 5]}  position={new Vector3(0, 0, -1)} >
                    <meshStandardMaterial attach="material" color={`#${power*320+50}4444`} />
                </Cylinder>
            }

{optsToggler["floor"].bool && 
    <FloorFloorScale  boundaries={[xOut, yOut, zOut]} 
    position={[0,(-yOut/2 - 0.05)*0.98,0]} floorWidth={0.1}
    /> 
}

{optsToggler["floor"].bool && 
    <FloorFloorScale  boundaries={[xOut*2, yOut, zOut*.8]} 
    position={[0,(-yOut/2 - (0.05*2))*0.98,0]} floorWidth={0.1}
    /> 
}

            <ChartBox {...{s__score: scoreHandle,score, velocityX:c_velocityX,
                setVelocityX:c_setVelocityX, velocityY:c_velocityY, setVelocityY:c_setVelocityY}} 
            wallWidth={wallWidth} boundaries={[xOut, yOut, zOut]}  position={[0, (1.68/2) - 0.95, zOut]} /> 
            <CustomPillars position={[0, 0, 0]}  height={yOut*1.05} diameter={0.05} pillars={boundaryBox} /> 

            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="btc" 
                position={[-xOut/2,-0.35,zOut/2]} 
                setVelocityY={(data)=>{toggleTrade("btc",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="eth" 
                position={[xOut/2,-0.35,zOut/2]} 
                setVelocityY={(data)=>{toggleTrade("eth",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="link" 
                position={[xOut*1.5,-0.35,zOut/2]} 
                setVelocityY={(data)=>{toggleTrade("link",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="ftm" 
                position={[-xOut*1.5,-0.35,zOut/2]} 
                setVelocityY={(data)=>{toggleTrade("ftm",data)}}
            /> 

            

            {optsToggler["leftwall"].bool &&
                <CustomHorizontalWall position={[0, 0, 0]}  roofHeight={yOut*1.01} 
                diameter={0.05} length={(zOut*2)-wallWidth}
                    wallThick={wallWidth} pillars={ [[-xOut-(wallWidth/2), 0, 0]] } 
                /> 
            }
            
            {optsToggler["rightwall"].bool &&
                <CustomHorizontalWallDoor position={[0, 0, 0]}  roofHeight={yOut*1.01} 
                diameter={0.05} length={(zOut*2)-wallWidth}
                    wallThick={wallWidth} pillars={ [[xOut+(wallWidth/2), 0, 0]] } 
                /> 
            } 

            {optsToggler["ceil"].bool &&
                <RoofContainer roofWidth={roofWidth} width={xOut/2} position={[0, yOut-(yOut/2), -(zOut+(wallWidth))]} wallWidth={wallWidth} length={((zOut*2)+(wallWidth*2))} 
            /> }
            


            {optsToggler["backwall"].bool && <CustomWall length={zOut} width={xOut/2} roofHeight={yOut} position={[0, 0, -(zOut-(wallWidth*(1.5/2)))]}  thickness={wallWidth}  />}
            {optsToggler["ceil"].bool && optsToggler["backwall"].bool && <ShapeContainer wallThick={wallWidth} width={xOut/2} position={[0, yOut-(yOut/2), -(zOut)]} thickness={wallWidth} />}
            
            {optsToggler["frontwall"].bool && <CustomWall length={zOut} width={xOut/2} roofHeight={yOut} position={[0, 0, (zOut-(wallWidth*1.5))]}  thickness={wallWidth}  />}
            {optsToggler["ceil"].bool && optsToggler["frontwall"].bool && <ShapeContainer wallThick={wallWidth} width={xOut/2} position={[0, yOut-(yOut/2), (zOut-wallWidth)]}  thickness={wallWidth} />}


            {/* <MovingBox {...{s__score: scoreHandle,score, velocityX, setVelocityX, velocityY, setVelocityY}} 
            wallWidth={wallWidth} boundaries={[xOut, yOut, zOut]}  position={[0, (1.68/2) - 0.95, zOut]} /> 
            <HumanScale roofWidth={roofWidth} width={0.1} wallWidth={wallWidth} length={0.3}  position={[-xOut, (1.68/2) - (yOut/2), zOut*1.3]} /> 

            {optsToggler["floor"].bool && <BaseballFieldFloorScale  position={[0,-yOut/2 - 0.05,0]} floorWidth={0.1}/>  }
            


            {optsToggler["ceil"].bool && <RoofContainer roofWidth={roofWidth} width={xOut/2} position={[0, yOut-(yOut/2), -(zOut+(wallWidth))]} wallWidth={wallWidth} length={((zOut*2)+(wallWidth*2))} /> }
            <CustomPillars position={[0, 0, 0]}  height={yOut*1.05} diameter={0.05} pillars={boundaryBox} /> 


            {optsToggler["backwall"].bool && <CustomWall length={zOut} width={xOut/2} roofHeight={yOut} position={[0, 0, -(zOut-(wallWidth*(1.5/2)))]}  thickness={wallWidth}  />}
            {optsToggler["ceil"].bool && optsToggler["backwall"].bool && <ShapeContainer wallThick={wallWidth} width={xOut/2} position={[0, yOut-(yOut/2), -(zOut)]} thickness={wallWidth} />}
            
            {optsToggler["frontwall"].bool && <CustomWall length={zOut} width={xOut/2} roofHeight={yOut} position={[0, 0, (zOut-(wallWidth*1.5))]}  thickness={wallWidth}  />}
            {optsToggler["ceil"].bool && optsToggler["frontwall"].bool && <ShapeContainer wallThick={wallWidth} width={xOut/2} position={[0, yOut-(yOut/2), (zOut-wallWidth)]}  thickness={wallWidth} />}


            {optsToggler["leftwall"].bool &&
                <CustomHorizontalWall position={[0, 0, 0]}  roofHeight={yOut*1.01} diameter={0.05} length={(zOut*2)-wallWidth}
                    wallThick={wallWidth} pillars={ [[-xOut-(wallWidth/2), 0, 0]] } 
                /> 
            }
            
            {optsToggler["rightwall"].bool &&
                <CustomHorizontalWallDoor position={[0, 0, 0]}  roofHeight={yOut*1.01} diameter={0.05} length={(zOut*2)-wallWidth}
                    wallThick={wallWidth} pillars={ [[xOut+(wallWidth/2), 0, 0]] } 
                /> 
            } */}
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