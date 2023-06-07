import dynamic from "next/dynamic";
import { Suspense, useMemo, useState } from "react";
import FarmNpcContainer from "../npc/FarmNpcContainer";

const Cylinder = dynamic(() => import('@react-three/drei').then(module => module.Cylinder));
const Torus = dynamic(() => import('@react-three/drei').then(module => module.Torus));
const SimpleOrbit:any = dynamic(import ("@/src/items/3d/core/camera/SimpleOrbit"), { ssr: false });
const BoundaryPillars:any = dynamic(import ("@/src/items/3d/farmhouse/BoundaryPillars"), { ssr: false });
const Building:any = dynamic(import ("@/src/items/3d/farmhouse/Building"), { ssr: false });

export default function Component({
    power, form, onTextClick, onTimeframeClick, toggleTrade, xOut, yOut, zOut, optsToggler, tokensArrayObj
}) {
    const roofWidth = 0.2
    const wallWidth = 0.1

    const [farmPosition,s__farmPosition]:any = useState([-3,-0.45,-4]);
    const [buildingPosition,s__buildingPosition]:any = useState([0,-0.25,-4]);
    const boundaryBox = useMemo(()=>{
        return [[(xOut), 0, zOut],[-(xOut), 0, -zOut],[-(xOut), 0, zOut],[(xOut), 0, -zOut]]
    },[xOut, zOut])
    return (
        <>
            <Suspense>
                <SimpleOrbit />
                <FarmNpcContainer {...{optsToggler}} position={[0,0,0]}  
                    form={form} 
                />

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

                {<BoundaryPillars position={buildingPosition}  height={yOut*1.05} diameter={0.05} pillars={boundaryBox} /> }

            </Suspense>
        </>
    )
}