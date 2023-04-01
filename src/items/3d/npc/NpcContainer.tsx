import { useLayoutEffect, useRef, useState } from 'react'

import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, useGLTF } from "@react-three/drei";
import * as THREE from 'three';
import { Group, Vector3 } from 'three';
import Angel from './Angel';
import Storefront from './Storefront';
import Observatory from './Observatory';
import TradingBox from '../TradingBox';
import ChartBox from '../ChartBox';

export default function Component ({position, optsToggler, ...props}) {
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
      <Box args={[1.2,0.7,.1]}  position={new Vector3(-0.5, 0.8, 2.95)} receiveShadow castShadow >
          <meshStandardMaterial emissive={"#93603F22"} attach="material" color="#93603F" />
      </Box>
      <Box args={[0.05,2.2,.05]}  position={new Vector3(0, -0.5, 2.95)} receiveShadow castShadow >
          <meshStandardMaterial emissive={"#93603F22"} attach="material" color="#93603F" />
      </Box>
      <Box args={[0.05,2.2,.05]}  position={new Vector3(-1, -0.5, 2.95)} receiveShadow castShadow >
          <meshStandardMaterial emissive={"#93603F22"} attach="material" color="#93603F" />
      </Box>
      <ChartBox boundaries={[1,1,1]} score={{score:0}}
        position={[0,0,2]} velocityX={0} 
        velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}}
      />
      {/* {optsToggler.safe.bool && <Observatory /> } */}
  </group>
}
