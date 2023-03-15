import { Canvas } from "@react-three/fiber";
import { MdRoofing, MdBorderLeft, MdBorderRight } from "react-icons/md";
import { MdFlipToBack } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { CgBorderLeft } from "react-icons/cg";
import { TfiLayoutSidebarLeft } from "react-icons/tfi";
import { AiOutlineCaretUp, AiOutlineVerticalAlignBottom } from "react-icons/ai";


import CameraControl from "@/src/items/3d/CameraControl";
import CustomPillars from "@/src/items/3d/CustomPillars";
import ShapeContainer from "@/src/items/3d/ShapeContainer";
import RoofContainer from "@/src/items/3d/RoofContainer";
import CustomWall from "@/src/items/3d/CustomWall";
import CustomHorizontalWall from "@/src/items/3d/CustomHorizontalWall";
import HumanScale from "@/src/items/3d/HumanScale";
import FieldFloorScale from "@/src/items/3d/FieldFloorScale";
import CustomHorizontalWallDoor from "@/src/items/3d/CustomHorizontalWallDoor";

import { forwardRef, useContext, useImperativeHandle, useMemo, useState,  } from 'react'
import CustomBox from "@/src/items/3d/CustomBox";

const Component = forwardRef(({}:any, ref)=>{
    
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
    

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);
    function handleMouseDown(e) {
        setMouseDown(true);
        setMousePos({ x: e.clientX, y: e.clientY });
    }
    function handleMouseUp(e) { setMouseDown(false); }
    function handleMouseMove(e) { if (mouseDown) { setMousePos({ x: e.clientX, y: e.clientY }); } }
    const DEFAULT_CARPORT_OTPS = {
        frontwall: {bool:true},
        backwall: {bool:true},
        rightwall: {bool:true},
        leftwall: {bool:true},
        roof: {bool:true},
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
    const wideFeet = 12
    const lengthFeet = 25
    const heightFeet = 13
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
    const boundaryBox = useMemo(()=>{
        return [[(xOut), 0, zOut],[-(xOut), 0, -zOut],[-(xOut), 0, zOut],[(xOut), 0, -zOut]]
    },[xOut, zOut])
    
    return (
    <div className='h-min-500px w-100 flex-col g-b-20 bord-r-8 flex-align-stretch flex-justify-stretch pos-rel'>
        
        <div className="flex pos-abs bottom-0 right-0  bord-r-8 pa-2 ma-2">
            <div className="flex-col flex-align-stretch z-700 gap-1 ">
                <div className="flex-center gap-1 opaci-50 tx-ls-5">
                    SIZE (ft/in)
                </div>
                <div className="flex-col gap-1 opaci-50 tx-ls-">
                    
                    <div className="flex tx-xsm">width: {sizeForm.x}</div>
                    <input type="range" min="3" max="77" className="w-100" value={sizeForm.x} onChange={(e)=>{be_size(e.target.value,"x")}} />
                </div>
                <div className="flex-col gap-1 opaci-50 tx-ls-">
                    
                    <div className="tx-xsm pr-1">length: {sizeForm.z}</div>
                    <input type="range" min="3" max="77" className="w-100" value={sizeForm.z} onChange={(e)=>{be_size(e.target.value,"z")}} />
                </div>
                <div className="flex-col gap-1 opaci-50 tx-ls-">
                    
                    <div className="flex tx-xsm">height: {sizeForm.y}</div>
                    <input type="range" min="3" max="55" className="w-100" value={sizeForm.y} onChange={(e)=>{be_size(e.target.value,"y")}} />
                </div>
            </div>
        </div>


        <div className="flex pos-abs top-0 left-0  bord-r-8 pa-2 ma-2">
            <div className="flex-col flex-align-stretch z-700 gap-1 ">

                <div className="flex-center gap-1">
                    <div className="tx-sm opaci-50">Current Size (m)</div>
                    <div className="flex bg-w- bord-r-8 opaci-chov--50">{parseInt(xOut*2+"")}&#39;</div>
                    <div className="flex bg-w- bord-r-8 opaci-chov--50">{parseInt(zOut*2+"")}&#39;</div>
                </div>
                <div className="flex-col flex-align-stretch gap-2 rot-180">
                    <div className="flex tx-center  bord-r-8">
                        <button onClick={()=>{toggleOption("roof")}}
                            className={` tx-center w-100 px-1 bord-r-8 px-2 opaci-chov--50  tx-lx pt-2
                                ${!optsToggler["roof"].bool ? "bg-b-hov-20 opaci-25" : "bg-b-10 tx-green"}
                            `}
                        >
                            <div className="scale-150"><AiOutlineCaretUp /></div>
                        </button>
                    </div>
                    <div className="flex-center ">
                        <button onClick={()=>{toggleOption("frontwall")}}
                            className={` tx-center w-100   bord-r-8 px-2 opaci-chov--50 tx-lx
                                ${!optsToggler["frontwall"].bool ? "bg-b-hov-20 opaci-25" : "bg-b-10 tx-green"}
                            `}
                        >
                            <FaWarehouse />
                        </button>
                    </div>
                    <div className="flex gap-1">
                        <button onClick={()=>{toggleOption("leftwall")}}
                            className={`flex-1 tx-center pa-1 bord-r-8 px-2 opaci-chov--50 tx-lx
                                ${!optsToggler["leftwall"].bool ? "bg-b-hov-20 opaci-25" : "bg-b-10 tx-green"}
                            `}
                        >
                            <TfiLayoutSidebarLeft />
                        </button>
                        <button onClick={()=>{toggleOption("rightwall")}} style={{transform:"rotate(180deg)"}}
                            className={`flex-1 tx-center pt-2  bord-r-8 px-2 opaci-chov--50 tx-lx
                                ${!optsToggler["rightwall"].bool ? "bg-b-hov-20 opaci-25" : "bg-b-10 tx-green"}
                            `}
                        >
                            <div className="block" ><TfiLayoutSidebarLeft /></div>
                        </button>
                    </div>
                    <div className="flex-center">
                        <button onClick={()=>{toggleOption("backwall")}}
                            className={` tx-center w-100  pt-1 bord-r-8 px-2 opaci-chov--50  tx-lx
                                ${!optsToggler["backwall"].bool ? "bg-b-hov-20 opaci-25" : "bg-b-10 tx-green"}
                            `}
                        >
                            <MdFlipToBack />
                        </button>
                    </div>
                    <div className="flex-center">
                        <button onClick={()=>{toggleOption("floor")}}
                            className={` tx-center w-100  pt-1 bord-r-8 px-2 opaci-chov--50  tx-lx
                                ${!optsToggler["floor"].bool ? "bg-b-hov-20 opaci-25" : "bg-b-10 tx-green"}
                            `}
                        >
                            <AiOutlineVerticalAlignBottom />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Canvas shadows  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} >
            <CameraControl width={xOut} length={zOut} height={yOut}  />
            <ambientLight intensity={0.35} />
            <pointLight castShadow intensity={1.2} position={[xOut*2, yOut*2, zOut*1.5]} />
            <pointLight castShadow intensity={0.5} position={[xOut*1.1, yOut*1.1, -zOut*1.2]} />
            <fog attach="fog" args={['#ffffff', 5, zOut*6]} />

            <CustomBox  position={[0, (1.68/2) - 0.95, zOut*1.32]} /> 
            <HumanScale roofWidth={roofWidth} width={0.1} wallWidth={wallWidth} length={0.3}  position={[0, (1.68/2) - (yOut/2), zOut*1.3]} /> 

            {optsToggler["floor"].bool && <FieldFloorScale  position={[0,-yOut/2 - 0.05,0]} floorWidth={0.1}/>  }
            


            {optsToggler["roof"].bool && <RoofContainer roofWidth={roofWidth} width={xOut/2} position={[0, yOut-(yOut/2), -(zOut+(wallWidth))]} wallWidth={wallWidth} length={((zOut*2)+(wallWidth*2))} /> }
            <CustomPillars position={[0, 0, 0]}  height={yOut*1.05} diameter={0.05} pillars={boundaryBox} /> 


            {optsToggler["backwall"].bool && <CustomWall length={zOut} width={xOut/2} roofHeight={yOut} position={[0, 0, -(zOut-(wallWidth*(1.5/2)))]}  thickness={wallWidth}  />}
            {optsToggler["roof"].bool && optsToggler["backwall"].bool && <ShapeContainer wallThick={wallWidth} width={xOut/2} position={[0, yOut-(yOut/2), -(zOut)]} thickness={wallWidth} />}
            
            {optsToggler["frontwall"].bool && <CustomWall length={zOut} width={xOut/2} roofHeight={yOut} position={[0, 0, (zOut-(wallWidth*1.5))]}  thickness={wallWidth}  />}
            {optsToggler["roof"].bool && optsToggler["frontwall"].bool && <ShapeContainer wallThick={wallWidth} width={xOut/2} position={[0, yOut-(yOut/2), (zOut-wallWidth)]}  thickness={wallWidth} />}


            {optsToggler["leftwall"].bool &&
                <CustomHorizontalWall position={[0, 0, 0]}  roofHeight={yOut*1.01} diameter={0.05} length={(zOut*2)-wallWidth}
                    wallThick={wallWidth} pillars={ [[-xOut-(wallWidth/2), 0, 0]] } 
                /> 
            }
            
            {optsToggler["rightwall"].bool &&
                <CustomHorizontalWallDoor position={[0, 0, 0]}  roofHeight={yOut*1.01} diameter={0.05} length={(zOut*2)-wallWidth}
                    wallThick={wallWidth} pillars={ [[xOut+(wallWidth/2), 0, 0]] } 
                /> 
            }
        </Canvas>
    </div>)
})

Component.displayName = 'BoxContainer'

export default Component