import { SpotLight, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh, Box3, Vector3 } from "three";
import * as THREE from "three";
import { useIsClient } from "usehooks-ts";
import { useQueryPlus } from "@/scripts/helpers/useHooksHelper";
import CandleInstances from "./CandleInstances";

type BoxProps = {
  position: [number, number, number];
  camera?: any;
  boundaries?: any;
  wallWidth?: any;
  score?: any;
  s__score?: any;
  velocityX: any;
  setVelocityX: any;
  velocityY: any;
  setVelocityY: any;
};
function getRandomUnixDate() {
  const now = new Date();
  const oneMonthAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  const oneYearAgo = now.getTime() - 60 * 24 * 60 * 60 * 1000;
  const randomTime = oneMonthAgo + Math.random() * (oneYearAgo - oneMonthAgo);
  return Math.floor(randomTime);
}

export default function Component({
  wallWidth,
  position,
  boundaries,
  score,s__score,
  velocityX, setVelocityX,
  velocityY, setVelocityY,
}: BoxProps) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef<Mesh>();
  const meshRef2 = useRef<Mesh>();
  const playerMesh = useRef<Mesh>();
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const [elapsed, setElapsed] = useState<any>(0);
  const viewport = useThree((state) => state.viewport);
  const [liveId, s__liveId] = useState(0)
  const [liveUnix, s__liveUnix] = useState(0)
  const [initUnix, s__initUnix] = useState(0)
  const [diffUnix, s__diffUnix] = useState(0)
  const isClient = useIsClient()
  const [q__asd, asd] = useQueryPlus({ queryKey: ['asdasd'], 
      refetchOnWindowFocus: false,
      queryFn: async () =>{
        let t = "1m"
        let startUnixDate = getRandomUnixDate()
          let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&startTime=${startUnixDate}&symbol=`
          urlBase += "BTCUSDT"
          const theListRes = await fetch(urlBase)
          let theList = await theListRes.json()
          s__initUnix(theList[0][0])
          let firstUnix:any = parseInt( theList[499][0] )
          let lastUnix:any =  parseInt(theList[0][0])
          s__liveUnix(firstUnix - 2)
          s__diffUnix(lastUnix - firstUnix)
          console.log("thelist[0]: ", theList[499][0])
          
      const closingPrices = theList.map((item: any) => parseFloat(item[4]));
      setPrices(closingPrices);


          return theList
      }
  },[])


  useFrame((state: any, delta) => {
    if (score.score <= 0)
    {
        return
    }
    if (meshRef.current && state && state.get) {
      setElapsed((5*delta) + elapsed);
      meshRef.current.position.y += velocityY;
      let parsedElapsed = parseInt((5*delta) + elapsed)
        if (parsedElapsed > liveId) {
          console.log("asqweqwed", parsedElapsed, (5*delta) + elapsed, initUnix, liveUnix)
          meshRef.current.position.x += wallWidth * 2 / 10
          s__liveId(liveId+1)

        }
      // check if the two meshes are intersecting
      const meshBox = new Box3().setFromObject(meshRef.current);
      const playerBox = new Box3().setFromObject(playerMesh.current);
      if (meshBox.intersectsBox(playerBox)) {
        const playerCenter = new Vector3();
        playerBox.getCenter(playerCenter);
        const playerX = playerCenter.x;
        const meshX = meshRef.current.position.x;
        const diffX = meshX - playerX;
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
      playerMesh.current.position.x = state.mouse.x * boundaries[0];
    }
  });
  const startGame = () => {
    if (clicked) return
    s__score({score:1,maxScore: 0, velocityX:0,velocityY:0})
    setClicked(!clicked)
    setVelocityX(wallWidth)
  }
  const [prices, setPrices] = useState<number[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=3m"
  //     );
  //     const data: any = await response.json();
  //     const closingPrices = data.map((item: any) => parseFloat(item[4]));
  //     setPrices(closingPrices);
  //   };
  //   fetchData();
  // }, []);
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
      {!clicked && <mesh
        castShadow
        receiveShadow
        position={[
          position[0] - boundaries[0],
          0,
          position[2],
        ]}
        ref={meshRef}
        onClick={() => startGame()}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[wallWidth*1.5, wallWidth*3, wallWidth*1.5]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "blue"} />
      </mesh>}

      
    <CandleInstances
        boundaries={boundaries}
      count={prices.length}
      positions={prices.slice(0, liveId || 499).map((price) => price)}
      xRange={[-boundaries[0], boundaries[0]*50]}
      yRange={[-boundaries[2]*5, 1]}
    />

      {/* <Asdasd /> */}
      
    </group>
  );
}