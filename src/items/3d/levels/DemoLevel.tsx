
// import { Cylinder, Torus } from "@react-three/drei";
// import SimpleOrbit from "../core/camera/SimpleOrbit";
// import { Vector3 } from "three";
// import TradingBox from "../TradingBox";
import dynamic from "next/dynamic";
import { Suspense, useMemo, useState } from "react";
import FarmNpcContainer from "../npc/FarmNpcContainer";

'use client';
// import { OrbitControls } from "@react-three/drei";

// const Vector3 = dynamic(() => import('three').then(module => module.Vector3));
const Cylinder = dynamic(() => import('@react-three/drei').then(module => module.Cylinder));
const Torus = dynamic(() => import('@react-three/drei').then(module => module.Torus));
const OrbitControls:any = dynamic(() => import('@react-three/drei').then(module => module.Torus));

const SimpleOrbit:any = dynamic(import ("@/src/items/3d/core/camera/SimpleOrbit"), { ssr: false });
// const Building:any = dynamic(import ("@/src/items/3d/farmhouse/Building"), { ssr: false });
const BoundaryPillars:any = dynamic(import ("@/src/items/3d/farmhouse/BoundaryPillars"), { ssr: false });
const Building:any = dynamic(import ("@/src/items/3d/farmhouse/Building"), { ssr: false });
// const ChartBox = dynamic(import ("@/src/items/3d/core/camera/ChartBox"), { ssr: false });
// const TradingBox = dynamic(import ("@/src/items/3d/core/camera/TradingBox"), { ssr: false });

export default function Component({
    power, form, onTextClick, onTimeframeClick, toggleTrade, xOut, yOut, zOut, optsToggler, tokensArrayObj
}) {
    const roofWidth = 0.2
    const wallWidth = 0.1

    // const farmPosition = [-3,-0.45,-4]
    // const buildingPosition = [0,-0.25,-4]
    const [farmPosition,s__farmPosition]:any = useState([-3,-0.45,-4]);
    const [buildingPosition,s__buildingPosition]:any = useState([0,-0.25,-4]);
    const boundaryBox = useMemo(()=>{
        return [[(xOut), 0, zOut],[-(xOut), 0, -zOut],[-(xOut), 0, zOut],[(xOut), 0, -zOut]]
    },[xOut, zOut])
    // const boundaryBox = [[(xOut), 0, zOut],[-(xOut), 0, -zOut],[-(xOut), 0, zOut],[(xOut), 0, -zOut]]
    return (
        <>
            <Suspense>
                <SimpleOrbit />
                {/* <OrbitControls
                // enableZoom={true}
                // minDistance={0.5}
                // maxDistance={6.5}
                // dampingFactor={0.05}
                // enablePan={false}
                // maxPolarAngle={Math.PI / 2 + 0.1}
                /> */}

                    
                <FarmNpcContainer {...{optsToggler}} position={[0,0,0]}  
                    form={form} 
                />

                

                {/* Storage Tower */}
                {/* Tower Live State */}
                {<>
                    <Cylinder args={[0.55, 0.55, 1.68, 6]}  position={[3, 0, -3]} receiveShadow castShadow >
                        <meshStandardMaterial attach="material" color="#aaaaaa" />
                    </Cylinder>
                    <Cylinder args={[0.5, 0.5, 1.7, 9]}  position={[3, 0, -3]}  receiveShadow castShadow>
                        <meshStandardMaterial attach="material" color="#ffffff"  />
                    </Cylinder>
                    <Torus args={[0.6,0.1,4,5]}  position={[3, 0.85, -3]} receiveShadow castShadow rotation={[Math.PI/2,0,Math.PI/2]}>
                        <meshStandardMaterial  attach="material" color="#aaaaaa" />
                    </Torus>
                </>}
                { <>
                    {!!power &&
                        <Cylinder args={[0.5, 0.6, power, 5]}  position={[3, 0.85, -3]} >
                            <meshStandardMaterial attach="material" color={`#${power*320+50}${power*100+50}44`} 
                                emissive={`#${power*320+50}444477`}
                            />
                        </Cylinder>
                    }
                    {!power &&
                        <Cylinder args={[0.5, 0.6, 0.05, 5]}  position={[3, 0.85, -3]} >
                            <meshStandardMaterial attach="material" color={`#000`} 
                                
                            />
                        </Cylinder>
                    }
                </>}





                {<Building {...{xOut,yOut,zOut:zOut,wallWidth,roofWidth}}  facadeColor="#963B2D"
                    optsToggler={optsToggler} position={buildingPosition} roofType="farm"
                />}
                {<Building {...{xOut:xOut/2,yOut:yOut/1.5,zOut:zOut/2,wallWidth,roofWidth}}  
                    optsToggler={{
                        leftwall: optsToggler.house_leftwall,
                        rightwall: optsToggler.house_rightwall,
                        backwall: optsToggler.house_backwall,
                        frontwall: optsToggler.house_frontwall,
                        ceil: optsToggler.house_ceil,
                        floor: optsToggler.house_floor,
                    }} position={farmPosition} 
                />}
                {/* House */}
                {/* FarmHouse */}



                {<BoundaryPillars position={buildingPosition}  height={yOut*1.05} diameter={0.05} pillars={boundaryBox} /> }
                
                {/* <ChartBox {...{s__score: scoreHandle,score, velocityX:c_velocityX,
                    setVelocityX:c_setVelocityX, velocityY:c_velocityY, setVelocityY:c_setVelocityY}} 
                wallWidth={wallWidth} boundaries={[xOut, yOut, zOut]}  position={[0, (1.68/2) - 0.95, zOut]} />  */}

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


            </Suspense>
        </>
    )
}