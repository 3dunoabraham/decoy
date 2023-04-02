import { Cylinder } from "@react-three/drei";
import ToggleOrbit from "../core/camera/ToggleOrbit";
import { Vector3 } from "three";


export default function Component({
    power,
}) {
    return (
        <group>
            <ToggleOrbit  buttonPosition={[0,-0.7,-2.5]} />
            
            <Cylinder args={[0.5, 0.6, 0.5, 6]}  position={new Vector3(0,-0.75,-3)} 
                rotation={[0,Math.PI/2,0]}
            >
                <meshStandardMaterial attach="material" color={`#777777`} 
                    // emissive={`#aa6600`}
                />
            </Cylinder>
            {!!power &&
                <Cylinder args={[0.29, 0.3, power*8, 12]}  position={new Vector3(0,-0.5+power*2,-3)} >
                    <meshStandardMaterial attach="material" color={`#${power*320+30}${power*100+50}44`} 
                        emissive={`#6F4200`}
                        // emissive={`#${power*320+50}444477`}
                    />
                </Cylinder>
            }
            {!power &&
                <Cylinder args={[0.29, 0.3, 0.05, 12]}  position={new Vector3(0,-0.5,-3)} >
                    <meshStandardMaterial attach="material" color={`#777777`} 
                        
                    />
                </Cylinder>
            }
        </group>
    )
}