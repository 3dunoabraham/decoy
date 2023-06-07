import { Merged } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  count?: number;
  temp?: THREE.Object3D;
  positions?: number[];
  xRange?: [number, number];
  yRange?: [number, number];
  boundaries?: any;
};

export default function Component({
  count = 500,
  temp = new THREE.Object3D(),
  positions = [],
  xRange = [-1, 100],
  yRange = [-100, 1],
  boundaries,
}: Props) {
  const refGreen = useRef<THREE.InstancedMesh>(null);
  const refRed = useRef<THREE.InstancedMesh>(null);
  const refBlue = useRef<THREE.InstancedMesh>(null);
  const ssize = 0.02;

  useEffect(() => {
    // Set positions
    const distanceBetweenCubes = ssize;
    const xRangeSize = xRange[1] - xRange[0];
    const yRangeSize = yRange[1] - yRange[0];
    const minValue = Math.min(...positions);
    for (let i = 0; i < count; i++) {
      temp.scale.set(ssize * 0.4, ssize * 0.9, ssize * 0.9);
      const x = (i * distanceBetweenCubes * xRangeSize) / count + xRange[0];
      const y =
        ((positions[i] - minValue) * yRangeSize) / (Math.max(...positions) - minValue) + yRange[0];
      temp.position.set(x, y, 0);
      temp.updateMatrix();
      refGreen.current.setMatrixAt(i, temp.matrix);
      // refBlue.current.setMatrixAt(i, temp.matrix);
    }
    // Update the instance
    refGreen.current.instanceMatrix.needsUpdate = true;
    // refBlue.current.instanceMatrix.needsUpdate = true;
  }, [positions, xRange, yRange]);

  return (
    <group position={[0,0,boundaries[2]*0.9]}>
      <instancedMesh ref={refGreen} args={[null, null, count]}>
        <boxBufferGeometry />
        <meshStandardMaterial color={"#FFccaa"} />
      </instancedMesh>
      {/* <instancedMesh ref={refBlue} position={[0, 0, 0.1]} args={[null, null, count]} scale={1}>
        <boxBufferGeometry args={[0.2, 1, 1]} />
        <meshStandardMaterial color={"#aaaaff"} />
      </instancedMesh> */}
    </group>
  );
}
