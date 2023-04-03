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
  const ref = useRef<THREE.InstancedMesh>(null);
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
      ref.current.setMatrixAt(i, temp.matrix);
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true;
  }, [positions, xRange, yRange]);

  return (
    <instancedMesh ref={ref} args={[null, null, count]} position={[0,0,boundaries[2]*0.9]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={"#aaaaaa"} />
    </instancedMesh>
  );
}
