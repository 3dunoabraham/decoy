import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Box, Cylinder, useGLTF } from "@react-three/drei";
import * as THREE from 'three';
import { Group, Vector3 } from 'three';
import Angel from './Angel';
import Storefront from './Storefront';
import Observatory from './Observatory';
import ChartBox from '../unorganized/ChartBox';

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

    return <group ref={groupRef} >
        {optsToggler.angel.bool && <Angel /> }
        {optsToggler.storefront.bool && <Storefront /> }
        {optsToggler.observatory.bool && <Observatory /> }

        {optsToggler.services.bool && 
        <ChartBox boundaries={[1,0.1,0.04]} score={{score:0}} timeframe={timeframe.toLowerCase() || "1d"}
            position={[-2.7,0,3]} velocityX={0}  theToken={form.id.split("USDT")[0]}
            velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}}
        />
        }
    </group>
}
