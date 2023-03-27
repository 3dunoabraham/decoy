import { SpotLight, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Mesh, Box3, Vector3 } from "three";
import * as THREE from "three";
import { TextGLB } from '@/src/items/3d/Text'
type BoxProps = {
  position?: [number, number, number];
  camera?: any;
  boundaries?: any;
  wallWidth?: any;
  score?: any;
  s__score?: any;
  velocityX?: any;
  setVelocityX?: any;
  velocityY?: any;
  setVelocityY?: any;
  timeframe: any;
  token: any;
  form: any;
};

export default function Component({
  form= null,
  token= "btc",
  timeframe= "3m",
  wallWidth=0.1,
  position=[0,0,0],
  boundaries=[1,1,1],
  score=0,s__score=()=>{},
  velocityX=0, setVelocityX=()=>{},
  velocityY=0, setVelocityY=()=>{},
}: BoxProps) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef<Mesh>();
  const playerMesh = useRef<Mesh>();
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const [elapsed, setElapsed] = useState<any>(0);
//   const [velocityY, setVelocityY] = useState(0);
//   const [velocityX, setVelocityX] = useState(0);
  const viewport = useThree((state) => state.viewport);
  const tokenColors = {
    "btc": "orange",
    "eth": "green",
    "link": "cyan",
    "ftm": "violet",
  }
  const tokenColor = useMemo(()=>{
    return tokenColors[token]
  },[token])
  const isSelectedId = useMemo(()=>{
    return form && form.id == token.toUpperCase()+"USDT"+timeframe.toUpperCase()
  },[form])
  useFrame((state: any, delta) => {
    if (score.score <= 0)
    {
        // meshRef.current.position.set (0,0,position[2])
        // return
        // setVelocityY(0)
        // setVelocityX(0)
    }
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
        // console.log(`Difference in X position: ${diffX}`);
        s__score({maxScore: score.score,score: score.score+1, velocityX: velocityX > score.velocityX ? velocityX : score.velocityX})
        setVelocityX(diffX/10 + velocityX);
        return setVelocityY(-velocityY);
      }

      if (
        meshRef.current.position.y > boundaries[1] / 2 ||
        meshRef.current.position.y < -boundaries[1] / 2
      ) {
        if (meshRef.current.position.y < 0)
        { s__score({maxScore: score.score ,score: 0, velocityX: velocityX > score.velocityX ? velocityX : score.velocityX}) }
        setVelocityY(-velocityY);        
      }
      if (
        meshRef.current.position.x > boundaries[0] ||
        meshRef.current.position.x < -boundaries[0]
      ) {
        setVelocityX(-velocityX);
      }
    }

    if (playerMesh.current) {
      // playerMesh.current.rotation.y = state.mouse.x * boundaries[0];
    }
  });
  const toggleGame = () => {
    console.log("asd")
    if (clicked) 
    {
      setVelocityX(0)
      setVelocityY(0)  
      setClicked(false)
      return
    }
    s__score({score:1,maxScore: 0, velocityX:0,velocityY:0})
    setClicked(true)
    setVelocityX((0.05+((Math.random()/2)-0.55)) / 5)
    setVelocityY(0.05)
  }
  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        position={[
          position[0],
          (position[1] - boundaries[1] / 2 + wallWidth) - (isSelectedId ? -0.05 : 0 ),
          position[2],
        ]}
        ref={playerMesh}
      >
        <boxGeometry args={[1, wallWidth, 1]} />
        <meshStandardMaterial
          color={isSelectedId ? "gray" : "darkgray"} 
          // color={hovered ? "hotpink" : "gray"} 
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        onClick={() => toggleGame()}
        position={[
          position[0],
          clicked ? position[1] - 0.2 : position[1],
          position[2],
        ]}
        ref={meshRef}
        scale={score.score ? 1 : 3}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          // color={"orange"} 
          color={hovered ? "red" : tokenColor} 
        />
      </mesh>

        {/* <Text  /> */}
      
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

  