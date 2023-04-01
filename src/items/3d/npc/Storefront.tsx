import { useLayoutEffect, useRef, useState } from 'react'

import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three';

export default function Component (props) {
  const { scene } = useGLTF('/storefront.glb')
  useLayoutEffect(() => scene.traverse(o =>
    {
      if(o instanceof THREE.Mesh ) {

        o.receiveShadow = true
        o.castShadow = true
      }
     }
    ), [])

  const [mycounter, setCount] = useState(0)
  const ref:any = useRef();


  // useFrame(({ mouse }) => {
  //   if (!ref.current) {
  //     return;
  //   }
  //   setCount(mycounter+1)
  //   ref.current.rotation.z = ( Math.cos(mycounter * 0.004 ) / 1.5 ) - ( mouse.x * 0.5 )
  // })

  return <primitive ref={ref}
  
            // onClick={() => {
            //   console.log(ref)
            // }}
            position={[0,-0.8,0]}
            // scale={[0.6,0.6,0.6]}
            // scale={[0.6,0.6,0.6]}
            // rotation={[3.14/2,0,0]}
            object={scene}
             {...props} 
          />
}
