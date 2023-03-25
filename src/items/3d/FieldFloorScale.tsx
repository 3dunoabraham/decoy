import { SpotLight, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
import * as THREE from "three";

type BoxProps = {
    position?: [number, number, number];
    camera?: any;
    floorWidth?: any;
};
  
export default function Component ({ position=[0,0,0] , floorWidth=0.1}: BoxProps) {
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const meshRef = useRef<Mesh>();
    const depthBuffer = useDepthBuffer({ frames: 1 })
  
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.position.z = position[2] + ( clicked ? -5 : 0 )
            // meshRef.current.rotation.y += delta;
        }
    });
  
    return (
    <group>

        <mesh
            castShadow receiveShadow
            position={position}
            ref={meshRef}
            // scale={clicked ? 2 : 1}
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* <MovingSpot depthBuffer={depthBuffer} color="#ffffff" position={[0,0,0]} /> */}

            <boxGeometry args={[50, floorWidth, 110]} />
            {/* <meshStandardMaterial opacity={0.25} transparent color={"white"} /> */}
            <meshStandardMaterial  color={"#ffffff"} />
        </mesh>
      </group>
    );
};

function MovingSpot({ vec = new THREE.Vector3(), ...props }) {
    const light:any = useRef()
    const viewport = useThree((state) => state.viewport)
    useFrame((state) => {
    //   light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    //   light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    //   light.current.target.updateMatrixWorld()
    })
    return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.85} attenuation={5} anglePower={4} intensity={2} {...props} />
  }