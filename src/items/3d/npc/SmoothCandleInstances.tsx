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
  maPeriod?: number;
};

export default function Component({
  count = 500,
  temp = new THREE.Object3D(),
  positions = [],
  xRange = [-1, 100],
  yRange = [-100, 1],
  boundaries,
  maPeriod = 10,
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
    const maPositions = calculateMA(positions, maPeriod);
    for (let i = 0; i < count; i++) {
      temp.scale.set(ssize * 0.4, ssize * 0.9, ssize * 0.9);
      const x = (i * distanceBetweenCubes * xRangeSize) / count + xRange[0];
      const y =
        ((maPositions[i] - minValue) * yRangeSize) / (Math.max(...maPositions) - minValue) + yRange[0];
      temp.position.set(x, y, 0);
      temp.updateMatrix();
      refGreen.current.setMatrixAt(i, temp.matrix);
      // refBlue.current.setMatrixAt(i, temp.matrix);
    }
    // Update the instance
    refGreen.current.instanceMatrix.needsUpdate = true;
    // refBlue.current.instanceMatrix.needsUpdate = true;
  }, [positions, xRange, yRange]);

  function calculateMA(data: number[], period: number) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period) {
        result.push(data[i]);
      } else {
        let sum = 0;
        for (let j = i - period; j <= i; j++) {
          sum += data[j];
        }
        result.push(sum / period);
      }
    }
    return result;
  }

  return (
    <group position={[0, 0, boundaries[2] * 0.9]}>
      <instancedMesh ref={refGreen} args={[null, null, count]}>
        <boxBufferGeometry />
        <meshStandardMaterial color={"#aaccFF"} />
      </instancedMesh>
    </group>
  );
}

