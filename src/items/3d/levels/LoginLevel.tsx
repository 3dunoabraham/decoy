import { Cylinder, } from "@react-three/drei";
import { Vector3 } from "three";
import TradingBox from "../npc/TradingBox";
import SimpleOrbit from "../core/camera/SimpleOrbit";
import HumanForReference from "../core/HumanForReference";
import Text3D from "../core/Text3D";
import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from '@/scripts/Roboto Medium_Regular.json'
import { useLoader } from '@react-three/fiber'
import { Suspense, useContext, useMemo, useRef, useState } from "react";
import DynaText from "../DynaText";
import crypto from 'crypto';
import { useLocalStorage } from "usehooks-ts";
import { fetchPost } from "@/scripts/helpers/fetchHelper";
import { AppContext } from "@/scripts/contexts/AppContext";

extend({ TextGeometry })


// function Text3d(){
//     const font = new FontLoader().parse(myFont);
//     const textOptions = {
//        font,
//        size: 5,
//        height: 1
//     };
//     return (<>
//         {/* <mesh>
//             {(<textGeometry attach='geometry' args={['three.js', textOptions]} />) as any}
//             <meshStandardMaterial attach='material' color="hotpink" />
//         </mesh> */}
     
//         </>)
//  }

export default function Component({
    power, form, onTextClick, onTimeframeClick, toggleTrade, xOut, yOut, zOut, optsToggler, s__uid, uid
}) {
    const app = useContext(AppContext)
    const font = new FontLoader().parse(myFont);
    const $signin:any = useRef()
    const [loadings, s__loadings]:any = useState({join:false})
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    // const [uid, s__uid] = useState("")

    useFrame((state) => {
        if (!!$signin.current && !!$signin.current.rotation) {
            $signin.current.rotation.y -= 0.0035
        }
    });
    const signup = async () => {
        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        s__loadings({join:true})
        let res:any = await startHash()
        if (!res) return
        app.alert("success","Signed in")
        s__loadings({join:false})
        s__uid(res)
        s__LS_uid(res)

        // window.location.reload()
        
        // s__clientIP(awaited.IPv4)
        // let new_uid = `${awaited.IPv4}:${randomThousand}`
        // s__uid(new_uid)
        // s__LS_uid(new_uid)
    }
    const startHash = async () => {
        let username = prompt("Enter username","")
        if (!username) return

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

    return (
        <group>
            
            <SimpleOrbit buttonPosition={[0,0,0]} />
            <HumanForReference scale={0.18} position={[0,-0.61,0]}  />

            
            <Cylinder args={[1.85, 1.85, 0.2, 5]}  position={new Vector3(0, -0.85, 0)} receiveShadow castShadow >
                <meshStandardMaterial attach="material" color="#4E5156" />
            </Cylinder>

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
                
            {/* <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="btc" refetchInterval={60000}
                position={[xOut/2,-0.35,-zOut/2]} onTextClick={()=>{onTextClick("btc")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("btc",data)}}
            /> 

            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="eth" refetchInterval={60000}
                position={[-xOut/2,-0.35,-zOut/2]} onTextClick={()=>{onTextClick("eth")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("eth",data)}}
            />  */}

            {/* <mesh position={[0,10,0]}>
                <textGeometry args={['test', {font, size:5, height: 1}]}/>
                <meshLambertMaterial attach='material' color={'gold'}/>
            </mesh> */}
            {/* <Suspense>
                <Text3D content="hello" />
            </Suspense> */}
        </group>
    )
}
