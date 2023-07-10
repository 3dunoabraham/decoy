import { useLayoutEffect, useRef, useState } from 'react'

import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";

export const TextGLB = (props) => {
  const { scene } = useGLTF('./src/text.glb')
  useLayoutEffect(() => {
    scene.traverse(o => {
      if ((o as THREE.Mesh).isMesh) {
        o.receiveShadow = true;
      }
    });
  }, []);

  const [mycounter, setCount] = useState(0)
  const ref:any = useRef();


  useFrame(({ mouse }) => {
    if (!ref.current) {
      return;
    }
    setCount(mycounter+1)
    ref.current.rotation.z = ( Math.cos(mycounter * 0.004 ) / 1.5 ) - ( mouse.x * 0.5 )
  })

  return <primitive ref={ref}
            position={[0,1,-2]}
            scale={[0.6,0.6,0.6]}
            rotation={[3.14/2,0,0]}
            object={scene}
             {...props} 
          />
}
