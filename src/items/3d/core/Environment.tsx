import { useLayoutEffect, useRef, useState } from 'react'

import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three';

const TextGLB = (props) => {
  const { scene } = useGLTF('/text.glb')
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


  return <primitive ref={ref}
  
            position={[0,-0.8,0]}
            object={scene}
             {...props} 
          />
}

export default TextGLB
