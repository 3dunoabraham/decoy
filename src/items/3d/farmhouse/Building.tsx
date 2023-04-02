import React, { useRef } from 'react';
import { Group } from 'three';
import Roof from './Roof';
import SideFacade from './SideFacade';
import SideFacadeWDoor from './SideFacadeWDoor';
import Facade from './Facade';
import Pediment from './Pediment';
import Floor from './Floor';
import FarmRoof from './FarmRoof';
import FarmPediment from './FarmPediment';

export default function Component ({
    roofType="pyramid",
    xOut=10, yOut=5, zOut=10, wallWidth=0.2, roofWidth=0.5, 
    optsToggler={}, position=[0, 0, 0],
    facadeColor="#966B3D",
}) {
    const groupRef = useRef<Group>(null);
    const { current: group } = groupRef;

    if (group) {
      group.position.set(position[0], position[1], position[2]);
    }

    return (
        <group ref={groupRef}>
            {optsToggler["leftwall"].bool &&
                <SideFacade position={[0, 0, 0]}  roofHeight={yOut*1.01} 
                diameter={0.05} length={(zOut*2)-wallWidth}
                    wallThick={wallWidth} pillars={ [[-xOut-(wallWidth/2), 0, 0]] } 
                /> 
            }            
            {optsToggler["rightwall"].bool &&
                <SideFacadeWDoor position={[0, 0, 0]}  roofHeight={yOut*1.01} 
                diameter={0.05} length={(zOut*2)-wallWidth}
                    wallThick={wallWidth} pillars={ [[xOut+(wallWidth/2), 0, 0]] } 
                /> 
            } 

            {optsToggler["backwall"].bool &&
                <Facade length={zOut} width={xOut/2} roofHeight={yOut} color={facadeColor}
                    position={[0, 0, -(zOut-(wallWidth*(1.5/2)))]}  thickness={wallWidth}
                />
            }
            {optsToggler["frontwall"].bool &&
                <Facade length={zOut} width={xOut/2} roofHeight={yOut} color={facadeColor}
                    position={[0, 0, (zOut-(wallWidth*1.5))]}  thickness={wallWidth}  
                />
            }



            {roofType == "pyramid" && <>
                {optsToggler["ceil"].bool &&
                    <Roof roofWidth={roofWidth} width={xOut/2}
                        position={[0, yOut-(yOut/2), -(zOut+(wallWidth))]} wallWidth={wallWidth} length={((zOut*2)+(wallWidth*2))} 
                    />
                }
                {optsToggler["ceil"].bool && optsToggler["backwall"].bool &&
                    <Pediment wallThick={wallWidth} 
                        width={xOut/2} position={[0, yOut-(yOut/2), -(zOut)]} thickness={wallWidth}
                    />
                }
                {optsToggler["ceil"].bool && optsToggler["frontwall"].bool &&
                    <Pediment width={xOut/2} position={[0, yOut-(yOut/2), (zOut-wallWidth)]}  
                        thickness={wallWidth}   wallThick={wallWidth}
                    />
                }
            </>}
            {roofType == "farm" && <>
                {optsToggler["ceil"].bool &&
                    <FarmRoof roofWidth={roofWidth} width={xOut/2}
                        position={[0, yOut-(yOut/2), -(zOut+(wallWidth))]} wallWidth={wallWidth} length={((zOut*2)+(wallWidth*2))} 
                    />
                }
                {optsToggler["ceil"].bool && optsToggler["backwall"].bool &&
                    <FarmPediment wallThick={wallWidth} 
                        width={xOut/2} position={[0, yOut-(yOut/2), -(zOut)]} thickness={wallWidth}
                    />
                }
                {optsToggler["ceil"].bool && optsToggler["frontwall"].bool &&
                    <FarmPediment width={xOut/2} position={[0, yOut-(yOut/2), (zOut-wallWidth)]}  
                        thickness={wallWidth}   wallThick={wallWidth}
                    />
                }
            </>}




            {optsToggler["floor"].bool && 
                <Floor  boundaries={[xOut, yOut, zOut]} color={"#777777"}
                position={[0,(-yOut/2 - 0.05)*0.98,0]} floorWidth={0.1}
                /> 
            }
            {optsToggler["floor"].bool && 
                <Floor  boundaries={[xOut*1.6, yOut, zOut*.8]} color={"#48721E"}
                position={[0,(-yOut/2 - (0.05*2))*0.98,0]} floorWidth={0.1} 
                />
            }
            {/* {optsToggler["floor"].bool &&  */}
                <Floor  boundaries={[xOut*1.58, yOut, zOut*.78]} color={"#8B5A2B"}
                position={[0,(-yOut/2 - (0.05*3))*0.98,0]} floorWidth={0.1} 
                />
            {/* } */}
        </group>
    );
}
