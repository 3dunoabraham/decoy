import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import { useBox } from "use-cannon";


export const smallboxes = [
    [0, 12, -4  ],
    [0, 16, -4  ],
    [0, 14, -4  ],
    // [-0.7, 15, 0.5],
    // [0.55, 17, 0.6],
  ];
      
  export function BigBox() {
  
      const smallBox = {
          pos: [-0.1, 8, -4.2],
          args: [0.25,0.25,0.25],
          rot: [0.31,0.2,0.15],
      }
      const box = {
          pos: [0, 5, -4    ],
          args: [0.3,0.3,0.3],
          rot: [0.1, 0.5, 0.11],
      }
      const bigBox = {
          pos: [0, 0, -4    ],
          args: [1.5, 0.2, 1.5],
          rot: [0,0,0],
      }
      const bigBox2 = {
          pos: [0, -1.5, -2.5    ],
          args: [1.5, 0.2, 1.5],
          rot: [0,0,0],
      }
      const [smallref, smallapi] = useBox(() => ({ mass: 5000, position: smallBox.pos, args: smallBox.args, rotation: smallBox.rot }));
      const [ref, api] = useBox(() => ({ mass: 2000, position: box.pos, rotation: box.rot, args: box.args, }));
      const [bigref, bigapi] = useBox(() => ({ mass: 0, position: bigBox.pos, args: bigBox.args,rotation: bigBox.rot  }));
      const [bigref2, bigapi2] = useBox(() => ({ mass: 0, position: bigBox2.pos, args: bigBox2.args,rotation: bigBox2.rot  }));
      const redframe = useRef();
  
      // const [mycounter, setCount] = useState(0)
  
       useFrame(({ mouse }) => {
        //    if (mouse.x > 0.33 && mouse.y > 0.33)
        //    {
        //       bigapi.velocity.set(0,(mouse.x+mouse.y)*0.5,0);
        //       if (redframe.current) redframe.current.rotation.y += (mouse.x+mouse.y)*0.001
        //    } else {
        //       bigapi.velocity.set(0,0,0);
        //    }






           if (!bigref.current) return
        //    console.log(mouse.y)
           bigref.current.rotation.set(mouse.y * 1,0,mouse.x * 1);
           bigapi.rotation.set(mouse.y * 1,0,mouse.x * 1);
           //    bigref.current.rotation.set(-mouse.y * 0.01, mouse.x * 0.8,0);
        //    bigref.current.rotation.set(0,0,0);
       });
  
      // useFrame((state) => {
      // 	// console.log("asd")
      // 	// console.log("asd", camera)
      // 	setCount(mycounter+1)
      // 	ref.current.rotation.y = mycounter / 100
      // 	if (controls.current)
      // 		controls.current.update()
  
      // 	// ref.current.rotation.y = Math.sin(mycounter * 0.002 ) * 2
      // 	// console.log(mycounter)
      // 	// ref.rotation.y = Math.sin(mycounter * 0.002 ) * 2
          
      // });
  
      return (<>
          {/* <mesh position={[0, -2, -4    ]} ref={redframe}>
              <boxBufferGeometry attach="geometry" args={[5, 1, 5]} />
              <meshStandardMaterial wireframe  attach="material" color="red" />
          </mesh> */}
          <mesh
              ref={smallref}
              position={new Vector3(...smallBox.pos)}
              rotation={smallBox.rot}
              receiveShadow
              castShadow
            //   onClick={() => {
            //       smallapi.velocity.set(-0.25, 4, -0.25);
            //   }}
          >
              <boxBufferGeometry attach="geometry" args={smallBox.args} />
              <meshStandardMaterial attach="material" color="#14accc" />
          </mesh>
          <mesh
              ref={ref}
              position={new Vector3(...box.pos)}
              rotation={box.rot}
              receiveShadow
              castShadow
            //   onClick={() => {
            //       api.velocity.set(-0.25, 2, -0.25);
            //   }}
          >
              <boxBufferGeometry attach="geometry" args={box.args} />
              <meshStandardMaterial attach="material" color="#00ac00" />
          </mesh>
          <group ref={bigref} position={new Vector3(...bigBox.pos)}
                rotation={bigBox.rot}
            >
            <mesh
                
                
                castShadow
                receiveShadow
            >
                <boxBufferGeometry attach="geometry" args={bigBox.args} />
                <meshStandardMaterial  attach="material" color="gray" />
            </mesh>
            {/* <mesh
                position={[0,0,-bigBox.args[2]/2]}
                castShadow
                receiveShadow
            >
                <boxBufferGeometry attach="geometry" args={[bigBox.args[0],bigBox.args[2]/2,bigBox.args[1]]   } />
                <meshStandardMaterial  attach="material" color="gray" />
            </mesh> */}
        </group>
          <group ref={bigref2} position={new Vector3(...bigBox2.pos)}
                rotation={bigBox2.rot}
            >
            <mesh
                
                
                castShadow
                receiveShadow
            >
                <boxBufferGeometry attach="geometry" args={bigBox2.args} />
                <meshStandardMaterial  attach="material" color="gray" />
            </mesh>
        </group>
      </>);
  }
  
  export function SmallBox2({position}) {
      const [ref, api] = useBox(() => ({ mass: 0.001, position: position, args:[0.2,0.2,0.2],rotation: position }));
  
      return (
          <mesh
              receiveShadow
              castShadow
              ref={ref}
              position={position}
          >
              <boxBufferGeometry attach="geometry" args={[0.2,0.2,0.2]} />
              <meshStandardMaterial attach="material" color="#11ce83" />
          </mesh>
      );
  }
  