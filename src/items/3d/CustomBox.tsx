import { SpotLight, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
import * as THREE from "three";

type BoxProps = {
    position: [number, number, number];
    camera?: any;
};
  
export default function Component ({ position }: BoxProps) {
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const meshRef = useRef<Mesh>();
    const depthBuffer = useDepthBuffer({ frames: 1 })
  
    useFrame((state, delta) => {
        if (meshRef.current) {
            // meshRef.current.position.y = position[1] + ( clicked ? 1 : -2 )
            // meshRef.current.rotation.y += delta;
        }
    });
  
    return (
    <group>

        <mesh
            castShadow receiveShadow
            position={position}
            ref={meshRef}
            scale={clicked ? 1.68 : 1}
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* <MovingSpot depthBuffer={depthBuffer} color="#fcac8f" position={[0,0,0]} /> */}

            <boxGeometry args={[0.25,0.25,0.25]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
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
    return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
  }