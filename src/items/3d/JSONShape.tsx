import { useLoader } from "@react-three/fiber";
// import { ShapeBufferGeometry, Mesh, MeshBasicMaterial } from "three";
import StarJSON from "@/StarJSON.json";
import { useMemo } from "react";
import * as THREE from "three";

export default function Component() {
  const starPoints = StarJSON.Star.map(([x, y, z]) => [x * 10, y * 10, z * 10]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(starPoints[0][0], starPoints[0][1]);
    for (let i = 1; i < starPoints.length; i++) {
      shape.lineTo(starPoints[i][0], starPoints[i][1]);
    }
    return shape;
  }, [starPoints]);

//   const geometry = useMemo(() => new ShapeBufferGeometry(shape), [shape]);

//   const material = new MeshBasicMaterial({ color: 0xffffff });
    return
//   return <mesh geometry={geometry} material={material} />;
}

function Scene() {
//   const star = useLoader(THREE.JSONLoader, "@/StarJSON.json");
  
  return (
    <mesh>
      {/* <bufferGeometry {...star.geometry} /> */}
      <meshBasicMaterial color={0xffffff} />
    </mesh>
  );
}