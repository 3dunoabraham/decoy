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

export function Instances({
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
    for (let i = 0; i < count; i++) {
      temp.scale.set(ssize * 0.9, ssize * 0.9, ssize * 0.9);
      const x = (i * distanceBetweenCubes * xRangeSize) / count + xRange[0];
      const y =
        ((positions[i] || 0) * yRangeSize) / Math.max(...positions) + yRange[0];
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
      <meshStandardMaterial color={"gray"} />
    </instancedMesh>
  );
}

export function BtcInstances({xRange, yRange, boundaries}) {
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=3m"
      );
      const data: any = await response.json();
      const closingPrices = data.map((item: any) => parseFloat(item[4]));
      setPrices(closingPrices);
    };
    fetchData();
  }, []);

  return (
    <Instances
        boundaries={boundaries}
      count={prices.length}
      positions={prices.map((price) => price)}
      yRange={yRange}
      xRange={xRange}
      // xRange={[0, 1]}
      // yRange={[-0.5, 0.5]}
    />
  );
}
  
export function Asdasd () {
    return (
        <Merged
          meshes={[
            new THREE.Mesh(
              new THREE.BoxGeometry(1, 1, 1),
                // new boxGeometry(1,1,1),
              new THREE.MeshNormalMaterial()
            ),
            new THREE.Mesh(
              new THREE.SphereGeometry(1, 1, 1),
              new THREE.MeshNormalMaterial()
            )
          ]}
        >
          {(Box, Sphere) => (
            <>
              <Box position={[-2, -2, 0]} />
              <Box position={[-3, -3, 0]} />
              {/* <Sphere position={[1, -1, 0]} /> */}
            </>
          )}
        </Merged>
    )
}


  
  
  