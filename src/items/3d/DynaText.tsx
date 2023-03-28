import { Text } from '@react-three/drei';
import { MeshBasicMaterial, MeshStandardMaterial, Vector3 } from 'three';

export default function Component ({text="asd", position=new Vector3(), color , isSelected = false})  {
  const material = new MeshStandardMaterial({ color: color });
  return (
      <Text
        receiveShadow
        // castShadow
        material={material}
        position={position}
        rotation={[-Math.PI/2,0,0]}
        fontSize={0.35}
        maxWidth={100}
        lineHeight={1}
        letterSpacing={-0.06}
        textAlign="center"

      >
        {text}
      </Text>
  );
};