import { Box, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Mesh, Box3, Vector3 } from "three";
import { useIsClient } from "usehooks-ts";
import { useQueryPlus } from "@/scripts/helpers/useHooksHelper";
import CandleInstances from "./CandleInstances";
import * as THREE from "three";
import DynaText from "./DynaText";
import { AppContext } from "@/scripts/contexts/AppContext";
import { useContext,  } from 'react'
import { tokenColors } from "./core/Scene";
import { parseDecimals } from "@/components/scripts/helpers";

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
  refetched?: any;
  askAI?: any;
};
function getRandomUnixDate() {
  const now = new Date();
  const oneMonthAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  const oneYearAgo = now.getTime() - 365 * 24 * 60 * 60 * 1000;
  const randomTime = oneMonthAgo + Math.random() * (oneYearAgo - oneMonthAgo);
  return Math.floor(randomTime);
}

const Component = forwardRef(({
  // export default function Component({
  askAI=()=>{},
  refetched=()=>{},
  wallWidth,
  position,
  boundaries,
  score,s__score,
  velocityX, setVelocityX,
  velocityY, setVelocityY,
  timeframe, theToken
}: BoxProps, ref) => {
  const _askAI = ()  => {
    askAI(prices)
  }
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
  // refetched(theList)


  useImperativeHandle(ref, ()=>({
    refetch: () => {
      q__asd.refetch()
    }
  }))

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
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);

  const maxPrice = useMemo(()=>{
    return Math.max.apply(Math, prices)
  },[prices])
  const minPrice = useMemo(()=>{
    return Math.min.apply(Math, prices)
  },[prices])
  const midPrice = useMemo(()=>{
    return parseDecimals((minPrice + maxPrice)  / 2)
  },[minPrice, maxPrice])


  return (
    <group position={position}>
      
      <DynaText text={!!theToken ? theToken.toUpperCase() : ""} color={0xaaaaaa}
        position={new Vector3(-0.17,0.95+0.36,0.19)} rotation={[0, 0, 0]}

        isSelected={false}  font={0.28} onClick={()=>{}}
      />
      <DynaText text={!!timeframe ? timeframe.toLowerCase() : ""} color={0xaaaaaa}
        position={new Vector3(0,1.16,0.19)} rotation={[0, 0, 0]}

        isSelected={false}  font={0.1} onClick={()=>{}}
      />
      <DynaText text={"?"} color={0xaaaaaa}
        position={new Vector3(-0.9,0.95+0.3,0.19)} rotation={[0, 0, 0]}

        isSelected={false}  font={0.3} onClick={()=>{}}
      />
      {prices.length > 0 &&  <>
        <DynaText text={`${maxPrice}`} color={0xaaaaaa}
          position={new Vector3(-1.12,1.02,0.145)} rotation={[0, 0, 0]}

          isSelected={false}  font={0.05} onClick={()=>{}}
        />
        <DynaText text={`${midPrice}`} color={0xaaaaaa}
          position={new Vector3(-1.16,((1.02)+(-0.4))/2,0.145)} rotation={[0, 0, 0]}

          isSelected={false}  font={0.05} onClick={()=>{}}
        />
        <DynaText text={`${minPrice}`} color={0xaaaaaa}
          position={new Vector3(-1.12,-0.4,0.145)} rotation={[0, 0, 0]}

          isSelected={false}  font={0.05} onClick={()=>{}}
        />
    </>}
      
      <Box onClick={()=>{q__asd.refetch()}} args={[0.6,0.4,0.15]} 
        position={[-0.15,0.99+0.3,0.1]} 

          onPointerOver={() => setHovered2(true)}
          onPointerOut={() => setHovered2(false)}
      >
          <meshStandardMaterial color={!hovered2 ? "#888888" : tokenColors[theToken.toLowerCase()] } />
      </Box>
      
      <Box onClick={()=>{_askAI()}} args={[0.2,0.3,0.15]} 
          position={[-0.9,0.99+0.3,0.1]} 

            onPointerOver={() => setHovered3(true)}
            onPointerOut={() => setHovered3(false)}
        >
            <meshStandardMaterial color={!hovered3 ? "#888888" : tokenColors[theToken.toLowerCase()] } />
        </Box>
        <group position={[0.15,0,0.12]}>
            <CandleInstances
                boundaries={boundaries}
                count={prices.length}
                positions={prices.slice(0, liveId || 499).map((price) => price)}
                xRange={[-boundaries[0], boundaries[0]*50]}
                yRange={[-boundaries[2]*20, 1]}
            />
        </group>

      <Box args={[1.5,1.7,.1]}  position={new Vector3(-0.5, 0.37, 0.09)} receiveShadow castShadow >
          <meshStandardMaterial emissive={"#93603F22"} attach="material" color="#666666" />
      </Box>
      <Box args={[0.05,2.2,.05]}  position={new Vector3(0, -0.5, 0.09)} receiveShadow castShadow >
          <meshStandardMaterial emissive={"#93603F22"} attach="material" color="#888888" />
      </Box>
      <Box args={[0.05,2.2,.05]}  position={new Vector3(-1, -0.5, 0.09)} receiveShadow castShadow >
          <meshStandardMaterial emissive={"#93603F22"} attach="material" color="#888888" />
      </Box>
    </group>
  );
})


Component.displayName = 'ChartBox'

export default Component