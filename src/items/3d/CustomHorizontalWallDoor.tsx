import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

type BoxProps = {
    position: [number, number, number];
    camera?: any;
    pillars?: any;
    diameter?: number;
    length?: number;
    roofHeight?: number;
    wallThick?: number;
};
  
export default function Component ({ position, pillars, diameter=0.1,  length=2, roofHeight, wallThick }: BoxProps) {
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const meshRef = useRef<Mesh>();
  
    useFrame((state, delta) => {
        if (meshRef.current) {
            // meshRef.current.position.y = clicked ? 3 : -2;
            // meshRef.current.rotation.y += delta;
        }
    });
  
    return (
    <group position={position}>
        {pillars.map((aPillar, index) => {
            return (
                <mesh key={index}
                    castShadow receiveShadow
                    position={aPillar}
                    ref={meshRef}
                    // scale={clicked ? 1.5 : 1}
                    onClick={() => setClicked(!clicked)}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <boxGeometry args={[wallThick, roofHeight, length+wallThick]} />
                    <meshStandardMaterial color={"gray"} />
                </mesh>
            )
        })}
    </group>
    );
};