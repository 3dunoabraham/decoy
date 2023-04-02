import { Cylinder, SpotLight, Torus, useDepthBuffer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Mesh, Box3, Vector3 } from "three";
import * as THREE from "three";
import { TextGLB } from '@/src/items/3d/Text'
import DynaText from "./DynaText";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { fetchMultipleJsonArray, parseDecimals } from "@/components/scripts/helpers";
import { tokenColors } from "./core/Scene";
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
  onTextClick: any;
  form: any;
  refetchInterval?: any;
  unselectedColor?: any;
};

export default function Component({
  unselectedColor="#48721E",
  refetchInterval=3000,
  form= null,
  token= "btc",
  timeframe= "3m",
  wallWidth=0.1,
  position=[0,0,0],
  boundaries=[1,1,1],
  onTextClick=()=>{},
  score=0,s__score=()=>{},
  velocityX=0, setVelocityX=()=>{},
  velocityY=0, setVelocityY=()=>{},
}: BoxProps) {
  const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
  const baseToken = "USDT"
  
  // const tokensReqObj:any = useMemo(()=>{
  //   return ( [token].reduce((acc, aToken) => (
  //     { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
  //     ), {}))
  // },[token])
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [clickedPrice, s__clickedPrice] = useState(0)
    const [uid, s__uid] = useState("")
    const [showAllTokens,s__showAllTokens] = useState<any>(true)
    const [chopAmount,s__chopAmount] = useState<any>(0)
    const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
    const [klinesArray,s__klinesArray] = useState<any[]>([])
    const [clientIP, s__clientIP] = useState('');
    const DEFAULT_TOKEN_OBJ = {
        mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
        min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
    }
    const p__klinesArray = useMemo(()=>{
        let slicedArray = [...klinesArray]
        for (let index = 0; index < chopAmount; index++) { slicedArray.push(klinesArray[499]) }
        
        return slicedArray.slice(slicedArray.length-500,slicedArray.length)
    },[klinesArray,chopAmount])
    const queryUSDT:any = useQuery({ queryKey: ['usdt'+token], refetchInterval: refetchInterval,
    queryFn: async () => {
      let theList = await fetchMultipleJsonArray(( [token].reduce((acc, aToken) => (
        { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
        ), {})))
      // console.log("asd", theList[0])
      let prr = parseDecimals(theList[0].price)
      // console.log("prr", token, prr)
      return prr
    }
})

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef<Mesh>();
  const playerMesh = useRef<Mesh>();
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const [elapsed, setElapsed] = useState<any>(0);
  const viewport = useThree((state) => state.viewport);
  // const tokenColors = {
  //   "btc": "white",
  //   "eth": "green",
  //   "link": "cyan",
  //   "ftm": "blue",
  // }
  const tokenColor = useMemo(()=>{
    return tokenColors[token]
  },[token])
  const isSelectedId = useMemo(()=>{
    return form && form.id == token.toUpperCase()+"USDT"+timeframe.toUpperCase()
  },[form])
  useFrame((state: any, delta) => {
    if (meshRef.current && state && state.get) {
      setElapsed(delta + elapsed);
      meshRef.current.position.y += velocityY;
      meshRef.current.position.x += velocityX;
      return
    }
  });
  const toggleGame = () => {
    // console.log("asd")
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
    s__clickedPrice(queryUSDT.data)
  }
  return (
    <group>
      {clicked &&
        <DynaText text={""+clickedPrice+"" || ""}  color={0x006600}
          position={new Vector3(position[0]+0.25,position[1]-0.32,position[2]-0.25)}
          isSelected={isSelectedId} font={0.15} 
        />
      }
      {!isSelectedId &&
        <DynaText text={token+"" || ""} color={isSelectedId ? 0xaaaaaa : 0xaaaaaa}
          position={new Vector3(position[0]-0.2,position[1]-0.32,position[2]-0.3)}
          isSelected={isSelectedId}  font={0.25} onClick={()=>{onTextClick()}}
        />
      }
      {isSelectedId &&
        <DynaText text={token+"" || ""} color={isSelectedId ? tokenColor : tokenColor}
          position={new Vector3(position[0]-0.2,position[1]-0.2,position[2]-0.3)} rotation={[-Math.PI/4,0,0]}
          isSelected={isSelectedId}  font={0.25} onClick={()=>{onTextClick()}}
        />
      }
      <DynaText text={queryUSDT.data+"" || ""} color={isSelectedId ? 0xaa6600 : 0xaaaaaa}
        onClick={()=>{onTextClick()}} font={0.29}
        position={new Vector3(position[0] + 0.1,position[1]-0.32,position[2]+0.3)} isSelected={isSelectedId} 
      />
      {/* <Text3D /> */}
      {/* {isSelectedId && <>
        
        
        <Cylinder args={[0.5, 0.7, 0.5, 4, 1]}  
          scale={[1,1,1]}
          rotation={[0,Math.PI/4,0]}
          position={[
            position[0],
            position[1] - 0.2 ,
            position[2],
          ]}
        >
                <meshStandardMaterial wireframe={true} attach="material" color="#aaaaaa" />
            </Cylinder>
      </>} */}
      {isSelectedId && <>
        
        
        
        <mesh
          castShadow
          receiveShadow
          position={[
            position[0],
            -0.73,
            position[2]-0.32,
          ]}
          ref={playerMesh}
        >
          <boxGeometry args={[0.9, 0.1, wallWidth*3]} />
          <meshStandardMaterial 
            color={!isSelectedId ? "#777" : "#777"} 
          />
        </mesh>
        </>}
      {/* {isSelectedId && <>
        
        
        
      <mesh
        castShadow
        receiveShadow
        position={[
          position[0],
          -0.3*2,
          position[2]-0.5,
        ]}
        ref={playerMesh}
      >
        <boxGeometry args={[0.9, 0.3, wallWidth]} />
        <meshStandardMaterial
          color={!isSelectedId ? unselectedColor : unselectedColor} 
        />
      </mesh>
      </>} */}
      {isSelectedId && <>
        
        <Torus args={[0.7,0.05,4,4]}  
        
        position={[
          position[0],
          position[1]-0.45,
          position[2],
        ]}
          rotation={[Math.PI/2,0,Math.PI/4]}>
                <meshStandardMaterial  attach="material" color="#aaaaaa" />
            </Torus>
      </>}
      
      {/* selected ring */}
      {clicked && <>
        
        <Torus args={[0.7,0.04,4,4]}  
        
        position={[
          position[0],
          position[1]-0.36,
          position[2],
        ]}
         receiveShadow castShadow
          rotation={[Math.PI/2,0,Math.PI/4]}>
                <meshStandardMaterial  attach="material" color="#55ff55" />
            </Torus>
      </>}



      {/* platform */}
      <mesh
      onClick={()=>{onTextClick()}}
        castShadow
        receiveShadow
        position={[
          position[0],
          (position[1] - boundaries[1] / 2 + wallWidth) - (0 ),
          // (position[1] - boundaries[1] / 2 + wallWidth) - (isSelectedId ? 0 : +0.05 ),
          position[2],
        ]}
        ref={playerMesh}
      >
        <boxGeometry args={[1, wallWidth, 1]} />
        <meshStandardMaterial
          color={!isSelectedId ? unselectedColor : unselectedColor} 
        />
      </mesh>



      {/* buy/sell button */}
      <mesh
        castShadow
        receiveShadow
        onClick={() => toggleGame()}
        position={[
          !clicked ? position[0] - 0.2 : position[0] + 0.1,
          clicked ? position[1] - 0.4 : position[1] - 0.3,
          position[2],
        ]}
        ref={meshRef}
        scale={score.score ? 1 : 3}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.1, 0.05, 0.05]} />
        <meshStandardMaterial
          
          color={clicked ? "red" : "#15C771"} 
        />
      </mesh>


        {/* mini buttons */}
        {isSelectedId &&
        <mesh
          castShadow
          receiveShadow
          // onClick={() => alert()}
          // rotation={[isSelectedId ? 0.25 : -0.25,0,0]}
          position={[
            position[0] - 0.42,
            position[1] - 0.35,
            position[2] + 0.15
          ]}
          ref={meshRef}
          scale={score.score ? 1 : 3}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[0.02, 0.06, 0.02]} />
          <meshStandardMaterial
            
            color={"#FEEA4D"} 
          />
        </mesh>
      }
      {isSelectedId &&
      <mesh
        castShadow
        receiveShadow
        // onClick={() => alert()}
        // rotation={[isSelectedId ? 0.25 : -0.25,0,0]}
        position={[
          position[0] - 0.42,
          position[1] - 0.35,
          position[2] + 0.01
        ]}
        ref={meshRef}
        scale={score.score ? 1 : 3}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.02, 0.06, 0.02]} />
        <meshStandardMaterial
          
            color={"#FEEA4D"} 
        />
      </mesh>
    }
    {isSelectedId &&
    <mesh
      castShadow
      receiveShadow
      // onClick={() => alert()}
      // rotation={[isSelectedId ? 0.25 : -0.25,0,0]}
      position={[
        position[0] - 0.42,
        position[1] - 0.35,
        position[2] - 0.12
      ]}
      ref={meshRef}
      scale={score.score ? 1 : 3}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.02, 0.06, 0.02]} />
      <meshStandardMaterial
        
        color={"red"} 
      />
    </mesh>
  }


        {/* toggles */}
      {isSelectedId &&
        <mesh
          castShadow
          receiveShadow
          // onClick={() => alert()}
          rotation={[isSelectedId ? 0.25 : -0.25,0,0]}
          position={[
            position[0] - 0.4,
            position[1] - 0.35,
            position[2] + 0.3,
          ]}
          ref={meshRef}
          scale={score.score ? 1 : 3}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[0.04, 0.03, 0.06]} />
          <meshStandardMaterial
            
            color={"gray"} 
          />
        </mesh>
      }
      
      {isSelectedId &&
        <mesh
          castShadow
          receiveShadow
          // onClick={() => alert()}
          rotation={[isSelectedId ? 0.25 : -0.25,0,0]}
          position={[
            position[0] + 0.37,
            position[1] - 0.35,
            position[2] -0,
          ]}
          ref={meshRef}
          scale={score.score ? 1 : 3}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[0.04, 0.03, 0.06]} />
          <meshStandardMaterial
            
            color={"#4CF8F8"} 
          />
        </mesh>
      }
    </group>
  );
}