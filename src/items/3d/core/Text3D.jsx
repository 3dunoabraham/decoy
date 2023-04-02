
import * as THREE from 'three';
import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from '@/scripts/Roboto Medium_Regular.json'
import { useLoader } from '@react-three/fiber'
import { useMemo } from "react";

extend({ TextGeometry })


export default function Component({content}){
    const font = new FontLoader().parse(myFont);
    const textOptions = {
       font,
       size: 5,
       height: 1
    };
    
    return (
        <mesh>
            <textGeometry attach='geometry' args={[content, textOptions]} />
            <meshStandardMaterial attach='material' color="hotpink" />
        </mesh>
     
     )
 }
