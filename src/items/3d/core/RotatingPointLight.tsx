import { useEffect, useRef } from "react";

export default function Component({ color, intensity, distance, position, speed=10 })  {
    
    const pointlightRef:any = useRef();
    const amblightRef:any = useRef();
    const lightRef:any = useRef();
    const angleRef:any = useRef(0);
    const step = 0.01; // set the step to the desired value
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        angleRef.current += step;
        pointlightRef.current.position.y = Math.sin(angleRef.current)*5;
        amblightRef.current.intensity = Math.sin(angleRef.current)/5+0.2;
        lightRef.current.rotation.y = angleRef.current;
        console.log(Math.sin(angleRef.current)/5+0.2)
        // lightRef.current.rotation.z = angleRef.current;
      }, speed); // set the interval duration to the desired value
      
      return () => clearInterval(intervalId); // clear the interval on unmount
    }, []);
  
    return (
      <group ref={lightRef}>
        <ambientLight ref={amblightRef} intensity={0.1} />
        <mesh>
          <pointLight
            ref={pointlightRef}
            castShadow
            color={color}
            intensity={intensity}
            position={[
                position[0],
                position[1],
                position[2],
            ]}
          />
        </mesh>
      </group>
    );
  };