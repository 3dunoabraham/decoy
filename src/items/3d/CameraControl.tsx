import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function Component ({ height, width, length }) {
    const { camera, gl: { domElement }, } = useThree();
    // camera.position.y = -1
    const controls:any = useRef();
    useFrame((state) => {
        // camera.position.z += 0.001
        // controls.current.update()
    });
    useEffect(() => {
        camera.position.x = -width*1.3
        camera.position.z = length*1.5
        camera.position.y = height
    },[]);
    return (
        <OrbitControls
            dampingFactor={0.5}
            ref={controls}
            args={[camera, domElement]}
            enableZoom={true} enablePan={false}
            /* minDistance={2} */
            maxPolarAngle={Math.PI/2 * 1.3} minPolarAngle={0}
          />
    );
};