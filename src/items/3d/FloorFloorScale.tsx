import { SpotLight, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
import * as THREE from "three";

type BoxProps = {
    position?: [number, number, number];
    camera?: any;
    floorWidth?: any;
    boundaries?: any;
};
  
export default function Component ({ boundaries=[0,0,0] ,position=[0,0,0] , floorWidth=0.1}: BoxProps) {
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const meshRef = useRef<Mesh>();
    const depthBuffer = useDepthBuffer({ frames: 1 })
  
    return (
    <group>

        <mesh
            castShadow receiveShadow
            position={position}
            ref={meshRef}
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >

            <boxGeometry args={[boundaries[0]*2.1, floorWidth, boundaries[2]*2.1]} />

            <meshStandardMaterial  color={"#ffffff"} />
        </mesh>
      </group>
    );
};
