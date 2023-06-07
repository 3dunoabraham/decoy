import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";


export default function Component ({ /* height, width, length */ zPos }) {
    const { camera, gl: { domElement }, } = useThree();
    const viewport = useThree((state) => state.viewport)
    const controls:any = useRef();
    // camera.position.y = -1
    useFrame((state) => {
    // // //   light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    state.camera?.position.set((state.mouse.x * viewport.width) / 10, 1,zPos/2)
    state.camera?.lookAt(new THREE.Vector3((
        state.mouse.x * viewport.width) / 5, (state.mouse.y * viewport.height) / 5 - 0,0
    ))
    // // //     state.camera.up = new THREE.Vector3(0, 1, 0);
        state.camera.updateProjectionMatrix()
    //         // camera.position.x = -width
    //         // camera.position.z = length
    //         // camera.position.y = height
        // if (!controls.current) return
        // console.log("controls.current.update", controls.current.update)
        // controls.current.update()
    });
      
    // useEffect(() => {
    //     camera.position.x = -width
    //     camera.position.z = length
    //     camera.position.y = height
    // },[height, width, length]);
    return (
        /*
        <OrbitControls
            dampingFactor={0.5}
            ref={controls}
            args={[camera, domElement]}
            enableZoom={true} enablePan={false}
            maxPolarAngle={Math.PI/2 * 1.3} minPolarAngle={0}
          />
          */
        //  <>

        <></>
            // <OrbitControls  

            //     args={[camera, domElement]}
            //     enableZoom={false}
            //     enableDamping={false} enablePan={false}
            //     ref={controls}
            // />

        //  </>
    );
};