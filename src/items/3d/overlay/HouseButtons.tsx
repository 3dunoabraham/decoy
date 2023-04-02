
import { forwardRef, useImperativeHandle, useMemo, useRef, useState,  } from 'react'
import { Torus, Cylinder, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { MdOutlineRoofing } from "react-icons/md";
import { MdFlipToBack } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";
import { TiChartAreaOutline } from "react-icons/ti";
import { BiGhost } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GiAngelWings, GiObservatory, GiPayMoney, GiReceiveMoney, GiWheat } from "react-icons/gi";
import { HiBuildingStorefront } from "react-icons/hi2";
import * as THREE from "three";

import BoundaryPillars from "@/src/items/3d/farmhouse/BoundaryPillars";
import { parseDecimals } from "@/components/scripts/helpers";
import TradingBox from "../TradingBox";
import { Vector3 } from "three";
// import { Building } from '../farmhouse/Building';
import NpcContainer from '../npc/FarmNpcContainer';
import { BsSafe2Fill } from 'react-icons/bs';
import { TbNetwork } from 'react-icons/tb';
import HouseButtons from '../overlay/HouseButtons';



export default function Compopnent ({
    toggleOption,
    optsToggler
}) {
    return (
        <>
          
          <div className="flex-col flex-align-stretch gap-2 rot-180">
                        
                        <div className="flex tx-center  bord-r-8">
                            <button onClick={()=>{toggleOption("house_ceil")}}
                                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                                className={` tx-center w-100 px-1 bord-r- px-2 opaci-chov--50  tx-lg pt-2
                                    ${!optsToggler["house_ceil"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gra" : " tx-blue border-blue"}
                                `}
                            >
                                <div className=""><MdOutlineRoofing /></div>
                            </button>
                        </div>
                        <div className="flex-center ">
                            <button onClick={()=>{toggleOption("house_frontwall")}}
                                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                                className={` tx-center w-100   bord-r- px-2 opaci-chov--50 tx-lg pt-1
                                    ${!optsToggler["house_frontwall"].bool
                                        ? "bg-b-hov-20 opaci-25 border-white tx-gra"
                                        : " tx-blue border-blue"
                                    }
                                `}
                            >
                                <AiFillEyeInvisible />
                            </button>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={()=>{toggleOption("house_leftwall")}}
                                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                                className={`flex-1 tx-center pa-1 pb-0 bord-r- px-2 opaci-chov--50 tx-lg 
                                    ${!optsToggler["house_leftwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gra" : " tx-blue border-blue"}
                                `}
                            >
                                <GiPayMoney />
                            </button>
                            <button onClick={()=>{toggleOption("house_rightwall")}} 
                                style={{filter: "hue-rotate(-189deg) brightness(666%)"}}
                                className={`flex-1 tx-center pt-2  bord-r- px-2 opaci-chov--50 tx-lg
                                    ${!optsToggler["house_rightwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gra" : " tx-blue border-blue"}
                                `}
                            >
                                <div className="block" ><GiReceiveMoney /></div>
                            </button>
                        </div>
                        <div className="flex-center">
                            <button onClick={()=>{toggleOption("house_backwall")}}
                                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                                className={` tx-center w-100  pt-1 bord-r- px-2 opaci-chov--50  tx-lg
                                    ${!optsToggler["house_backwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gra" : " tx-blue border-blue"}
                                `}
                            >
                                <MdFlipToBack />
                            </button>
                        </div>
                        <div className="flex-center">
                            <button onClick={()=>{toggleOption("house_floor")}}
                                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                                className={` tx-center w-100  pt-1 bord-r- px-2 opaci-chov--50  tx-lg
                                    ${!optsToggler["house_floor"].bool ? "bg-b-hov-20 opaci-25 border-white tx-gra" : " tx-blue border-blue"}
                                `}
                            >
                                <TiChartAreaOutline />
                            </button>
                        </div>
                    </div>
        </>
    )
}