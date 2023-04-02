import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";

export default function Component({ live = false, buttonPosition=null }) {
  const camGroup: any = useRef();
  const [cameraMode, setCameraMode] = useState<"orbit" | "programmatic">("orbit");
  const programmaticCam: any = useRef();

  const { camera } = useThree();

  return (
    <group ref={camGroup}>
        <OrbitControls
          enableZoom={true}
          minDistance={0.5}
          maxDistance={6.5}
          dampingFactor={live ? 0.5 : 0.08}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
    </group>
  );
}
