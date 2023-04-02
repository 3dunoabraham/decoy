
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
import TradingBox from "../npc/TradingBox/TradingBox";
import { Vector3 } from "three";
// import { Building } from '../farmhouse/Building';
import NpcContainer from '../npc/FarmNpcContainer';
import { BsSafe2Fill } from 'react-icons/bs';
import { TbNetwork } from 'react-icons/tb';
import HouseButtons from '../overlay/HouseButtons';



export default function Compopnent ({
    toggleOption, optsToggler
}) {
    return (
        <>
          
          <div className="flex gap-1">
            <button onClick={()=>{toggleOption("safe")}}
                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                className={`flex-1 tx-white bg-black tx-center pa-1 pb-0 bord-r- px-2 opaci-chov--50 tx-lx 
                    ${!optsToggler["safe"].bool ? "bg-b-hov-20 opaci-50 border-white tx-" : " tx-blue border-blue"}
                `}
            >
                <BsSafe2Fill />
            </button>
            <button onClick={()=>{toggleOption("angel")}}
                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                className={`flex-1 tx-white bg-black tx-center pa-1 pb-0 bord-r- px-2 opaci-chov--50 tx-lx 
                    ${!optsToggler["angel"].bool ? "bg-b-hov-20 opaci-50 border-white tx-" : " tx-blue border-blue"}
                `}
            >
                <GiAngelWings />
            </button>
        </div>
        <div className="flex-center">
            <button onClick={()=>{toggleOption("storefront")}}
                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                className={`flex-1 tx-white bg-black tx-center pa-1 pb-0 bord-r- px-2 opaci-chov--50 tx-lx 
                    ${!optsToggler["storefront"].bool ? "bg-b-hov-20 opaci-50 border-white tx-" : " tx-blue border-blue"}
                `}
            >
                <HiBuildingStorefront />
            </button>
            <button onClick={()=>{toggleOption("observatory")}}
                style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                className={`flex-1 tx-white bg-black tx-center pa-1 pb-0 bord-r- px-2 opaci-chov--50 tx-lx 
                    ${!optsToggler["observatory"].bool ? "bg-b-hov-20 opaci-50 border-white tx-" : " tx-blue border-blue"}
                `}
            >
                <GiObservatory />
            </button>
        </div>
        </>
    )
}