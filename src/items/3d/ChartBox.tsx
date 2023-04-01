import { Box, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Box3, Vector3 } from "three";
import { useIsClient } from "usehooks-ts";
import { useQueryPlus } from "@/scripts/helpers/useHooksHelper";
import CandleInstances from "./CandleInstances";
import * as THREE from "three";
import DynaText from "./DynaText";
import { AppContext } from "@/scripts/contexts/AppContext";
import { useContext,  } from 'react'

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
  timeframe?: any;
  theToken?: any;
};
function getRandomUnixDate() {
  const now = new Date();
  const oneMonthAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  const oneYearAgo = now.getTime() - 365 * 24 * 60 * 60 * 1000;
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
  timeframe, theToken
}: BoxProps) {
  const app = useContext(AppContext)
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
      refetchOnWindowFocus: false, enabled: false ,
      queryFn: async () =>{
        let t = timeframe || "3m"
        // let startUnixDate = getRandomUnixDate()
          // let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&startTime=${startUnixDate}&symbol=`
          let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&symbol=`
          urlBase += (theToken || "btc").toUpperCase()+"USDT"
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

          app.alert("success","Chart refreshed")
          return theList
      }
  },[theToken])


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

  return (
    <group position={position}>
      
      <DynaText text={!!theToken ? theToken.toUpperCase() : ""} color={0xaaaaaa}
        position={new Vector3(-0.15,0.95+0.3,-0.06)} rotation={[0, Math.PI, 0]}

        isSelected={false}  font={0.3} onClick={()=>{}}
      />
        <Box onClick={()=>{q__asd.refetch()}} args={[0.6,0.4,0.1]} 
          position={[-0.15,0.99+0.3,0]} >
            <meshStandardMaterial color="#888888" />
        </Box>
        <CandleInstances
            boundaries={boundaries}
            count={prices.length}
            positions={prices.slice(0, liveId || 499).map((price) => price)}
            xRange={[-boundaries[0], boundaries[0]*50]}
            yRange={[-boundaries[2]*20, 1]}
        />
      <Box args={[1.2,1.7,.1]}  position={new Vector3(-0.5, 0.37, 0.09)} receiveShadow castShadow >
          <meshStandardMaterial emissive={"#93603F22"} attach="material" color="#93603F" />
      </Box>
      <Box args={[0.05,2.2,.05]}  position={new Vector3(0, -0.5, 0.09)} receiveShadow castShadow >
          <meshStandardMaterial emissive={"#93603F22"} attach="material" color="#93603F" />
      </Box>
      <Box args={[0.05,2.2,.05]}  position={new Vector3(-1, -0.5, 0.09)} receiveShadow castShadow >
          <meshStandardMaterial emissive={"#93603F22"} attach="material" color="#93603F" />
      </Box>
    </group>
  );
}