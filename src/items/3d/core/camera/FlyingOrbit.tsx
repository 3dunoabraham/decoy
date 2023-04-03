import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function Component() {
  const camGroup: any = useRef();
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const speed = 0.1;
    const time = clock.getElapsedTime();
    // camera.position.z -= speed * Math.cos(time);
    // camera.position.x += speed * Math.sin(time);
  });

  return (
    <group ref={camGroup}>
      <OrbitControls
        enableZoom={true}
        minDistance={0.5}
        maxDistance={6.5}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 + 0.1}
      />
      {/* <mesh position={[0, 0, -10]}>
        <boxBufferGeometry />
        <meshStandardMaterial color={"hotpink"} />
      </mesh> */}
    </group>
  );
}
