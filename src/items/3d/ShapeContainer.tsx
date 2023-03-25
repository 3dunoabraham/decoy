import { useEffect, useMemo, useRef, useState } from "react";
import { BufferGeometry, DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function Component({ position=[0,0,0], points=null, thickness=0.1, width, wallThick }) {
    const { viewport } = useThree();

    const shapePoints = useMemo(() => {
      let mult = 2
      const starPoints = [
          [width, 0], [0, 1 ],[-width, 0],
      ];
      return points ? points : starPoints.map(([x, y, z]) => [x * mult, y * mult, z * mult]);
    }, [points, width]);
    const vertices = useMemo(() => shapePoints.map(point => new THREE.Vector3(...point)), [shapePoints])
    const basic_material = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide,  });
    const material = new MeshStandardMaterial({ color: 0xffffff, side: DoubleSide, roughness: 0.5 });
    const meshRef = useRef<Mesh>();
    
    


  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(shapePoints[0][0], shapePoints[0][1]);
    for (let i = 1; i < shapePoints.length; i++) {
      shape.lineTo(shapePoints[i][0], shapePoints[i][1]);
    }
    return shape;
  }, [shapePoints]);

  const geometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.computeBoundingBox();
    const center = geometry.boundingBox.getCenter(new THREE.Vector3());
    geometry.translate(-center.x, -center.y, 0);
    geometry.scale(viewport.width / 2, viewport.height / 2, 1);
    return geometry;
  }, [shape, viewport]);

    // var length = 14,
    //   width = 2,
    //   deg = 10
    const extrudeSettings = {
        curveSegments: 1,
        steps: 1,
        depth: thickness,
        bevelEnabled: false
      }

    useEffect(()=>{
        if (!!position) {
            meshRef.current.position.set(position[0],position[1],position[2])
        }
        
        // meshRef.current.rotation.y = 1.68;
    },[position])
    // return <Truss1  />
    return (
    <mesh  castShadow receiveShadow
        ref={meshRef} // geometry={new THREE.BufferGeometry().setFromPoints(vertices)} material={basic_material}
    >
        <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]} />
        <meshStandardMaterial color="#966B3D" side={DoubleSide} />

    </mesh>    
    )
};