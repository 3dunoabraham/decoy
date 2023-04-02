import { Cylinder } from "@react-three/drei";
import ToggleOrbit from "../core/camera/ToggleOrbit";
import { Vector3 } from "three";
import TradingBox from "../TradingBox";


export default function Component({
    power, form, onTextClick, toggleTrade, xOut, yOut, zOut, optsToggler
}) {
    return (
        <group>
            <ToggleOrbit  buttonPosition={[0,-0.7,-2.5]} />
            
            <Cylinder args={[0.5, 0.6, 0.5, 6]}  position={new Vector3(0,-0.75,-3)} 
                rotation={[0,Math.PI/2,0]}
            >
                <meshStandardMaterial attach="material" color={`#777777`} 
                    // emissive={`#aa6600`}
                />
            </Cylinder>
            {!!power &&
                <Cylinder args={[0.29, 0.3, power*8, 12]}  position={new Vector3(0,-0.5+power*2,-3)} >
                    <meshStandardMaterial attach="material" color={`#${power*320+30}${power*100+50}44`} 
                        emissive={`#6F4200`}
                        // emissive={`#${power*320+50}444477`}
                    />
                </Cylinder>
            }
            {!power &&
                <Cylinder args={[0.29, 0.3, 0.05, 12]}  position={new Vector3(0,-0.5,-3)} >
                    <meshStandardMaterial attach="material" color={`#777777`} 
                        
                    />
                </Cylinder>
            }




            
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="btc" refetchInterval={60000}
                position={[xOut/2,-0.35,-zOut/2]} onTextClick={()=>{onTextClick("btc")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("btc",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="eth" refetchInterval={60000}
                position={[-xOut/2,-0.35,zOut/2]} onTextClick={()=>{onTextClick("eth")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("eth",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="link" refetchInterval={60000}
                position={[xOut/2,-0.35,zOut/2]} onTextClick={()=>{onTextClick("link")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("link",data)}}
            /> 
            <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="ftm" refetchInterval={60000}
                position={[-xOut/2,-0.35,-zOut/2]} onTextClick={()=>{onTextClick("ftm")}} unselectedColor={"#50545B"}
                setVelocityY={(data)=>{toggleTrade("ftm",data)}}
            /> 


                        {/*  Concrete Floor  */}
            {optsToggler.floor.bool && 
                <Cylinder args={[4, 4, 1, 6]}  position={new Vector3(0, -1.3, 0)} receiveShadow castShadow >
                    <meshStandardMaterial attach="material" color="#5E6166" />
                </Cylinder>
            }
        </group>
    )
}