import { useLayoutEffect, useMemo, useRef, useState } from 'react'

import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, useGLTF } from "@react-three/drei";
import * as THREE from 'three';
import { Group, Vector3 } from 'three';
import Angel from './Angel';
import Storefront from './Storefront';
import Observatory from './Observatory';
import TradingBox from '../TradingBox';
import ChartBox from '../ChartBox';
import DynaText from '../DynaText';

export default function Component ({position, optsToggler, form, ...props}) {
  const { scene } = useGLTF('/angel.glb')
  useLayoutEffect(() => scene.traverse(o =>
    {
      if(o instanceof THREE.Mesh ) {

        o.receiveShadow = true
        o.castShadow = true
      }
     }
    ), [])


    
    const groupRef = useRef<Group>(null);
    const { current: group } = groupRef;

    if (group) {
      group.position.set(position[0], position[1], position[2]);
    }

  const [mycounter, setCount] = useState(0)
  const ref:any = useRef();

    const timeframe = useMemo(()=>{
      return form.id.split("USDT")[1]
    },[form.id])
  // useFrame(({ mouse }) => {
  //   if (!ref.current) {
  //     return;
  //   }
  //   setCount(mycounter+1)
  //   ref.current.rotation.z = ( Math.cos(mycounter * 0.004 ) / 1.5 ) - ( mouse.x * 0.5 )
  // })

  return <group ref={groupRef} >
      {optsToggler.angel.bool && <Angel /> }
      {optsToggler.storefront.bool && <Storefront /> }
      {optsToggler.observatory.bool && <Observatory /> }
      {/* <TradingBox /> */}
      {/* <Cylinder args={[20, 20, 1, 8]}  position={new Vector3(0, -1.3, 0)} receiveShadow castShadow >
          <meshStandardMaterial attach="material" color="#48721E" />
      </Cylinder> */}
      {/* asd */}
      
      
      <ChartBox boundaries={[1,0.1,0.04]} score={{score:0}} timeframe={timeframe.toLowerCase() || "1d"}
        position={[-2.7,0,3]} velocityX={0}  theToken={form.id.split("USDT")[0]}
        velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}}
      />
      {/* {optsToggler.safe.bool && <Observatory /> } */}
  </group>
}
