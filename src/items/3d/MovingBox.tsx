import { SpotLight, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Box3, Vector3 } from "three";
import * as THREE from "three";

type BoxProps = {
  position: [number, number, number];
  camera?: any;
  boundaries?: any;
  wallWidth?: any;
  score?: any;
  s__score?: any;
};

export default function Component({
  wallWidth,
  position,
  boundaries,
  score,
  s__score,
}: BoxProps) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef<Mesh>();
  const playerMesh = useRef<Mesh>();
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const [elapsed, setElapsed] = useState<any>(0);
  const [velocityY, setVelocityY] = useState(0.1);
  const [velocityX, setVelocityX] = useState(0);
  const viewport = useThree((state) => state.viewport);

  useFrame((state: any, delta) => {
    if (meshRef.current && state && state.get) {
      setElapsed(delta + elapsed);
      meshRef.current.position.y += velocityY;
      meshRef.current.position.x += velocityX;

      // check if the two meshes are intersecting
      const meshBox = new Box3().setFromObject(meshRef.current);
      const playerBox = new Box3().setFromObject(playerMesh.current);
      if (meshBox.intersectsBox(playerBox)) {
        const playerCenter = new Vector3();
        playerBox.getCenter(playerCenter);
        const playerX = playerCenter.x;
        const meshX = meshRef.current.position.x;
        const diffX = meshX - playerX;
        console.log(`Difference in X position: ${diffX}`);
        s__score(score+1)
        setVelocityX(diffX/10 + velocityX);
        return setVelocityY(-velocityY);
      }

      if (
        meshRef.current.position.y > boundaries[1] / 2 ||
        meshRef.current.position.y < -boundaries[1] / 2
      ) {
        setVelocityY(-velocityY);
        s__score(score-1)
      }
      if (
        meshRef.current.position.x > boundaries[0] ||
        meshRef.current.position.x < -boundaries[0]
      ) {
        setVelocityX(-velocityX);
      }
    }

    if (playerMesh.current) {
      playerMesh.current.position.x = state.mouse.x * boundaries[0];
    }
  });

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        position={[
          position[0],
          position[1] - boundaries[1] / 2 + wallWidth,
          position[2],
        ]}
        ref={playerMesh}
      >
        <boxGeometry args={[1, wallWidth, 1]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        position={position}
        ref={meshRef}
        scale={clicked ? 1.68 : 1}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    </group>
  );
}
function MovingSpot({ ref, position, depthBuffer, vec = new THREE.Vector3(), ...props }) {
    const light:any = useRef()
    const viewport = useThree((state) => state.viewport)
    useFrame((state) => {
    //   light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    //   light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    //   light.current.target.updateMatrixWorld()
    })
    return (
        
        <mesh
            castShadow receiveShadow
            position={position}
            ref={ref}
            // scale={clicked ? 1.68 : 1}
            // onClick={() => setClicked(!clicked)}
            // onPointerOver={() => setHovered(true)}
            // onPointerOut={() => setHovered(false)}
        >
            {/* <MovingSpot depthBuffer={depthBuffer} color="#fcac8f" position={[0,0,0]} /> */}
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial color="blue" />
        </mesh>
    )
    return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
  }

  