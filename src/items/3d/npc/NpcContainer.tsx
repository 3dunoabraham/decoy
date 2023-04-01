import { useLayoutEffect, useRef, useState } from 'react'

import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three';
import { Group } from 'three';
import Angel from './Angel';
import Storefront from './Storefront';
import Observatory from './Observatory';

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
      {/* {optsToggler.safe.bool && <Observatory /> } */}
  </group>
}
