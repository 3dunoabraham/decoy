import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";

export default function Component({ live = false, buttonPosition }) {
  const camGroup: any = useRef();
  const [cameraMode, setCameraMode] = useState<"orbit" | "programmatic">("orbit");
  const programmaticCam: any = useRef();

  const { camera } = useThree();

  useFrame((state) => {
    if (cameraMode === "programmatic") {
      if (!!programmaticCam.current && !!programmaticCam.current.position) {
        if (programmaticCam.current.position.y < 3 &&
          programmaticCam.current.position.x < 3 &&
          programmaticCam.current.position.z < 3)
        {
            programmaticCam.current.position.set(
            programmaticCam.current.position.x- 0.005,
            programmaticCam.current.position.y+ 0.005,
            programmaticCam.current.position.z+ 0.005, 
            );

        // update the OrbitControls camera position based on the programmatic camera position
        camera.position.copy(programmaticCam.current.position);
        camera.lookAt(new Vector3(0, 0, 0));
            }
        }
    }
  });

  const toggleCameraMode = () => {
    setCameraMode(cameraMode === "orbit" ? "programmatic" : "orbit");
  };

  return (
    <group ref={camGroup}>
      {cameraMode === "orbit" ? (
        <OrbitControls
          enableZoom={true}
          minDistance={0.5}
          maxDistance={6.5}
          dampingFactor={live ? 0.5 : 0.08}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      ) : (
        <></>
      )}
      <mesh onClick={toggleCameraMode} 
        rotation={[
          0 + (cameraMode !== "orbit" ? 0.25 : -0.4),
          0,
          0,
        ]}
        position={[
          buttonPosition[0],
          buttonPosition[1],
          buttonPosition[2],
        ]}
       >
        <boxBufferGeometry args={[0.4,0.3,0.2]} />
        <meshStandardMaterial color={cameraMode === "orbit" ? "red" : "blue"} />
      </mesh>

      {/* programmatic camera */}
      {cameraMode === "programmatic" && (
        <perspectiveCamera
          ref={programmaticCam}
          position={[0, 0, 1]}
          near={0.1}
          far={100}
          fov={75}
        />
      )}
    </group>
  );
}