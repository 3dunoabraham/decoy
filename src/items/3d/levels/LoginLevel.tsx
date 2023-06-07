import { Cylinder, } from "@react-three/drei";
import { Vector3 } from "three";
import SimpleOrbit from "../core/camera/SimpleOrbit";
import HumanForReference from "../core/HumanForReference";
import { extend, useFrame } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from '@/scripts/Roboto Medium_Regular.json'
import { useContext, useMemo, useRef, useState } from "react";

import { useLocalStorage } from "usehooks-ts";
import { fetchPost } from "@/scripts/helpers/fetchHelper";
import { AppContext } from "@/scripts/contexts/AppContext";
import DynaText from "../unorganized/DynaText";

extend({ TextGeometry })

export default function Component({
    power, form, onTextClick, onTimeframeClick, toggleTrade, xOut, yOut, zOut, optsToggler, s__rpi, rpi, theuserstart, askTicket
}) {
    const app = useContext(AppContext)
    const font = new FontLoader().parse(myFont);
    const $signin:any = useRef()
    const [loadings, s__loadings]:any = useState({join:false})
    const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "")
    

    useFrame((state) => {
        if (!!$signin.current && !!$signin.current.rotation) {
            $signin.current.rotation.y -= 0.0035
        }
    });
    const signup = async () => {
        return
    }

    
  const UsernameText = useMemo(() => {
    if (!form.username) return
    return (<>
        <DynaText text={form.username} color={0x00ff00}
            position={new Vector3(0,0.32,-0)}  rotation={[0,0,0]}
            isSelected={true}  font={0.11} onClick={()=>{}}
        />
        <DynaText text={form.username} color={0x00ff00}
            position={new Vector3(0,0.32,-0)}  rotation={[0,Math.PI,0]}
            isSelected={true}  font={0.11} onClick={()=>{}}
        />
    </>)
    
  }, [form.username]);

    return (
        <group>
            
            <SimpleOrbit buttonPosition={[0,0,0]} />
            <HumanForReference scale={0.18} position={[0,-0.61,0]}  />

            
            <Cylinder args={[1.85, 1.85, 0.2, 5]}  position={new Vector3(0, -0.85, 0)} receiveShadow castShadow >
                <meshStandardMaterial attach="material" color="#4E5156" />
            </Cylinder>

            <DynaText text={!form.username ? "Enter Username" : "Username:\n"+form.username} color={0xffffff}
                
                position={new Vector3(0,-0.74,-0.7)} 
                isSelected={true}  font={0.22} onClick={()=>{signup()}}
            />
            {<group ref={$signin} position={new Vector3(0, -0.5, 1)} onClick={()=>{signup()}}>
                <Cylinder 
                    rotation={[0,Math.PI/4,0]}
                     args={[0.5, 0.5, 0.5, 4]}  
                     receiveShadow castShadow 
                >
                    <meshStandardMaterial attach="material" color="#56C779" opacity={0.5} transparent={true} />
                </Cylinder>

                <DynaText text={"Play"} color={0xaaaaaa}
                    position={new Vector3(0,0,0.36)} rotation={[0,0,0]}
                    isSelected={true}  font={0.25} onClick={()=>{}}
                />
                 {UsernameText}

                <DynaText text={"Play"} color={0xaaaaaa}
                    position={new Vector3(0,0,-0.36)} rotation={[0,Math.PI,0]}
                    isSelected={true}  font={0.25} onClick={()=>{}}
                />

                <DynaText text={"Play"} color={0xaaaaaa}
                    position={new Vector3(0.36,0,0)} rotation={[0,Math.PI/2,0]}
                    isSelected={true}  font={0.25} onClick={()=>{}}
                />

                <DynaText text={"Play"} color={0xaaaaaa}
                    position={new Vector3(-0.36,0,0)} rotation={[0,-Math.PI/2,0]}
                    isSelected={true}  font={0.25} onClick={()=>{}}
                />

            </group>}
        </group>
    )
}
