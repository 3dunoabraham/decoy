import { Cylinder } from "@react-three/drei";
import ToggleOrbit from "../core/camera/ToggleOrbit";
import { Vector3 } from "three";
import TradingBox from "../npc/TradingBox";
import LiteNpcContainer from "../npc/LiteNpcContainer";
import { Suspense, useEffect, useMemo, useState } from "react";
import { getComputedLevels } from "@/components/scripts/helpers";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";
import { DEFAULT_TIMEFRAME_ARRAY } from "@/components/scripts/constants";
// import { Physics } from "use-cannon";
// import { BigBox, SmallBox2, smallboxes } from "../npc/LiteGame";
// import { GPT4All } from 'gpt4all';

// const main = async () => {
//     // Instantiate GPT4All with default or custom settings
//     const gpt4all = new GPT4All('gpt4all-lora-unfiltered-quantized', true); // Default is 'gpt4all-lora-quantized' model

//     // Initialize and download missing files
//     await gpt4all.init();

//     // Open the connection with the model
//     await gpt4all.open();
//     // Generate a response using a prompt
//     const prompt = 'Tell me about how Open Access to AI is going to help humanity.';
//     const response = await gpt4all.prompt(prompt);
//     console.log(`Prompt: ${prompt}`);
//     console.log(`Response: ${response}`);

//     const prompt2 = 'Explain to a five year old why AI is nothing to be afraid of.';
//     const response2 = await gpt4all.prompt(prompt2);
//     console.log(`Prompt: ${prompt2}`);
//     console.log(`Response: ${response2}`);

//     // Close the connection when you're done
//     gpt4all.close();
// }

export default function Component({
    power, form, onTextClick, onTimeframeClick, toggleTrade, xOut, yOut, zOut, optsToggler, tokensArrayObj, s__tokensArrayObj
}) {
    const [clipbloardValue, clipbloard__do] = useCopyToClipboard()
    const copyToClipboard = ()=>{
        // clipbloard__do(OFFICIAL_URL+"unit/"+newUID)
        // app.alert("neutral","Copied to clipboard")
    }
    const AI_BASE = `
    analyze this data and make a report:
    include trend direction, resistance and support levels.
    each array of the json represents the latest candlestick chart data with only the closing price
    generate the report including all 4 timeframes  \n\n candles data:`
    const [AIdata, s__AIdata] = useState({})
    const askAI = (data) => {
        let verbose = {
            "3m": "3 minutes between prices",
            "15m": "15 minutes between prices",
            "4h": "4 hours between prices",
            "1d": "1 day between prices",
        }
        let newPrompt = AIdata
        newPrompt[verbose[selectedTimeframe.toLowerCase()]] = ([...data]).splice(400,499)
        // newPrompt = AIdata + newPrompt
        s__AIdata(newPrompt)
        // console.clear()
        // console.log("timeframe", newPrompt)
        clipbloard__do(AI_BASE + JSON.stringify(newPrompt))
        console.log("main().catch(console.error)")
        // main().catch(console.error)
        console.log("main().catch(console.error)")
    }
    const [showPhysics, s__showPhysics] = useState(false)
    // useEffect(()=>{
    //     console.log("asdasd", tokensArrayObj)
    // },[tokensArrayObj])
    const _timeframe = useMemo(()=>{
        return form.id.split("USDT")[1].toLowerCase()
    },[form.id])
    const hasAnyToken = useMemo(()=>{
        // console.log("tokensArrayObj", tokensArrayObj)
        let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
            // console.log("token", token)
            return token in tokensArrayObj
        })
        // console.log("interestCount", interestCount)
        return interestCount.length > 0
    },[tokensArrayObj])
    const turnOff = (token) => {

        // if (prompt("turnOff?","yes") !== "yes") return

        // console.log(token,0,"state","0")
        updateTokenOrder(token,selectedTimeframeIndex,"state","0")

        // window.location.reload()
    }
    const trendDown = (token) => {
        console.log("trendDown", token)
        if (!(token in tokensArrayObj)) { return alert("join first") }

        // if (prompt("turnOn?","yes") !== "yes") return
        updateTokenOrder(token,selectedTimeframeIndex,"mode","0")
        // window.location.reload()
    }
    const trendUp = (token) => {
        console.log("trendUp", token)

        // if (prompt("turnOff?","yes") !== "yes") return

        // console.log(token,0,"mode","1")
        updateTokenOrder(token,selectedTimeframeIndex,"mode","1")

        // window.location.reload()
    }
    const turnOn = (token) => {
        // console.log("tokensArrayObj", tokensArrayObj)
        if (!(token in tokensArrayObj)) { return alert("join first") }

        // if (prompt("turnOn?","yes") !== "yes") return
        updateTokenOrder(token,selectedTimeframeIndex,"state",1)
        // window.location.reload()
    }
    const join = (token) => {
        // if (prompt("join?","yes") !== "yes") return
        // updateTokenOrder(token,0,"state",1)
        let result = addToken(token,1)
        s__tokensArrayObj(result)

        // window.location.reload()
    }
    const leave = (token) => {
        // alert("Developer tools -> Storage -> Local Storage")
        // if (prompt("Confirm deletion (yes/no)","yes") !== "yes") return
        if (selectedToken != token) return alert("You cant leave when unfocused, click again to leave.")
        
        let result = removeToken(token)
        s__tokensArrayObj(result)
    }
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    // const onTimeframeClick = (token, timeframe) => {
    //     console.log("onTimeframeClick", token, timeframe)
    // }

    const clickImportConfig = () => {
        try {
            let backup = prompt("Backup:")
            if (!backup) return
            if (!JSON.parse(backup)) return
            importConfig(backup)
        } catch (e) {
            console.log("backup failed ")
        }
    }
    const importConfig = (strTokensArrayObj) => {
        s__LS_tokensArrayObj(strTokensArrayObj)
        window.location.reload()
    }
    const DEFAULT_TOKEN_OBJ = {
        mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
        min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
    }

    const addToken = (token:string,price:number) => {
        if (!token) return
        let new_tokensArrayObj = {
            ...tokensArrayObj, ...
            {
                [`${token}`]: DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe, index)=> (
                    {...DEFAULT_TOKEN_OBJ,...{
                        ...getComputedLevels({floor:price*0.8,ceil:price*1.2})
                    }}
                ) )
            }
        }
        // s__tokensArrayObj(new_tokensArrayObj)
        s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj))
        return new_tokensArrayObj
    }
    const removeToken = (token: string) => {
        if (!token) return
        let new_tokensArrayObj = {...tokensArrayObj};
        delete new_tokensArrayObj[token];
        s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj));
        return new_tokensArrayObj
    }


  
// main().catch(console.error);
    
    // const removeToken = (token:string,price:number) => {
    //     if (!token) return
    //     let new_tokensArrayObj = {
    //         ...tokensArrayObj, ...
    //         {
    //             [`${token}`]: DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe, index)=> (
    //                 {...DEFAULT_TOKEN_OBJ,...{
    //                     ...getComputedLevels({floor:price*0.8,ceil:price*1.2})
    //                 }}
    //             ) )
    //         }
    //     }
    //     // s__tokensArrayObj(new_tokensArrayObj)
    //     s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj))
    // }


    const updateTokenOrder = async (token:string, timeframe:any, substate:string,val:any="") => {
        if (!token) return
        let promptVal = !val ? prompt("Enter Value") : val
        let value = !promptVal ? 0 : parseFloat(promptVal)
        let timeframeIndex = timeframe
        let old_tokensArrayObj = tokensArrayObj[token][timeframeIndex]
        
        let old_tokensArrayObjArray = [...tokensArrayObj[token]]
        let newCrystal = {
            ...{[substate]:value},
            ...getComputedLevels({
                ...old_tokensArrayObjArray[timeframeIndex],
                ...{[substate]:value}
            }),
        }
        old_tokensArrayObjArray[timeframeIndex] = {...old_tokensArrayObj,...newCrystal}
        let bigTokensObj = {...tokensArrayObj, ...{[token]:old_tokensArrayObjArray}}
        s__tokensArrayObj(bigTokensObj)
        // console.log("bigTokensObj", bigTokensObj)
        s__LS_tokensArrayObj((prevValue) => JSON.stringify(bigTokensObj))
        // let theKey = `${token.toUpperCase()}USDT${DEFAULT_TIMEFRAME_ARRAY[timeframe].toUpperCase()}`
        // const response = await updateStrat(theKey, {key:theKey, [substate]:value})
    }

    
    const selectedToken = useMemo(()=>{
        return form.id.split("USDT")[0].toLowerCase()
      },[form.id])
      const selectedTimeframe = useMemo(()=>{
        return form.id.split("USDT")[1].toLowerCase()
      },[form.id])
      const selectedTimeframeIndex = useMemo(()=>{
        return DEFAULT_TIMEFRAME_ARRAY.indexOf(selectedTimeframe)
      },[selectedTimeframe])

    
    return (
        <group>
            <ToggleOrbit {...{s__showPhysics, showPhysics}}  buttonPosition={hasAnyToken ? [0,-0.7,-2.5] : [0,-99999,0]} />

            
            <LiteNpcContainer {...{optsToggler}} position={[0,0,0]}  
                form={form} askAI={askAI}
            />

            
                <Cylinder args={[0.5, 0.6, 0.5, 6]}  position={new Vector3(0,-0.75,-3)} 
                    rotation={[0,Math.PI/2,0]}
                >
                    <meshStandardMaterial attach="material" color={`#777777`} 
                        // emissive={`#aa6600`}
                    />
                </Cylinder>
                {optsToggler["services"].bool && 
                <Cylinder args={[0.15, 0.1, 0.1, 8]}  position={new Vector3(0,-0.8,-3.48)} 
                    onClick={()=>{clickImportConfig()}}
                    rotation={[Math.PI/1.8,0,0]}
                >
                    <meshStandardMaterial attach="material" color={`#773377`} 
                        emissive={`#221122`}
                    />
                </Cylinder>
                }
            
            {hasAnyToken && <>
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
            </>}


            {/*  Concrete Floor  */}
            {optsToggler["floor"].bool && 
                <>
                    <Cylinder args={[4, 4, 0.1, 6]}  position={new Vector3(0, -0.8, 0)} receiveShadow castShadow >
                        <meshStandardMaterial attach="material" color="#5E6166" />
                    </Cylinder>


                    
                </>
            }

            {/*  Lower Floor  */}
            {optsToggler["services"].bool && 
                <>
                    <Cylinder args={[4.2, 4.2, 1, 8]}  position={new Vector3(0, -1.3, 0)} receiveShadow castShadow >
                        <meshStandardMaterial attach="material" color="#4E5156" />
                    </Cylinder>

                    <Cylinder args={[6, 6, 0.1, 9]}  position={new Vector3(0, -1.6, 0)} receiveShadow castShadow >
                        <meshStandardMaterial attach="material" color="#81868E" />
                    </Cylinder>

                    
                </>
            }
            {/* {showPhysics &&

                <Physics >
                    <Suspense fallback={null}>
                        {smallboxes.map((position, idx) => (
                        <SmallBox2 position={position} key={idx} />
                        ))}
                    </Suspense>
                    <BigBox />
                </Physics>
            } */}
            {<>
                <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="btc" refetchInterval={selectedToken == "btc" ? 1000 : 60000}
                    position={[xOut/2,-0.35,-zOut/2]} onTextClick={()=>{onTextClick("btc")}} unselectedColor={"#50545B"}
                    setVelocityY={(data)=>{toggleTrade("btc",data)}}
                    turnOn={()=>{turnOn("btc")}} turnOff={()=>{turnOff("btc")}}
                    join={()=>{join("btc")}} leave={()=>{leave("btc")}}
                    trendDown={()=>{trendDown("btc")}} trendUp={()=>{trendUp("btc")}} onTimeframeClick={(token, tf)=>{onTimeframeClick("btc",tf)}}
                    tokensArrayArray={"btc" in tokensArrayObj ? tokensArrayObj["btc"] : null}
                /> 
            </>}
            {<>
                <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="eth" refetchInterval={selectedToken == "eth" ? 1000 : 60000}
                    position={[-xOut/2,-0.35,zOut/2]} onTextClick={()=>{onTextClick("eth")}} unselectedColor={"#50545B"}
                    setVelocityY={(data)=>{toggleTrade("eth",data)}}
                    turnOn={()=>{turnOn("eth")}} turnOff={()=>{turnOff("eth")}}
                    join={()=>{join("eth")}} leave={()=>{leave("eth")}}
                    trendDown={()=>{trendDown("eth")}} trendUp={()=>{trendUp("eth")}} onTimeframeClick={(token, tf)=>{onTimeframeClick("eth",tf)}}
                    tokensArrayArray={"eth" in tokensArrayObj ? tokensArrayObj["eth"] : null}
                /> 
            </>}
            {<>
                <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="link" refetchInterval={selectedToken == "link" ? 1000 : 60000}
                    position={[xOut/2,-0.35,zOut/2]} onTextClick={()=>{onTextClick("link")}} unselectedColor={"#50545B"}
                    setVelocityY={(data)=>{toggleTrade("link",data)}}
                    turnOn={()=>{turnOn("link")}} turnOff={()=>{turnOff("link")}}
                    join={()=>{join("link")}} leave={()=>{leave("link")}}
                    trendDown={()=>{trendDown("link")}} trendUp={()=>{trendUp("link")}} onTimeframeClick={(token, tf)=>{onTimeframeClick("link",tf)}}
                    tokensArrayArray={"link" in tokensArrayObj ? tokensArrayObj["link"] : null}
                /> 
            </>}
            {<>
                <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="ftm" refetchInterval={selectedToken == "ftm" ? 1000 : 60000}
                    position={[-xOut/2,-0.35,-zOut/2]} onTextClick={()=>{onTextClick("ftm")}} unselectedColor={"#50545B"}
                    setVelocityY={(data)=>{toggleTrade("ftm",data)}}
                    turnOn={()=>{turnOn("ftm")}} turnOff={()=>{turnOff("ftm")}}
                    join={()=>{join("ftm")}} leave={()=>{leave("ftm")}}
                    trendDown={()=>{trendDown("ftm")}} trendUp={()=>{trendUp("ftm")}} onTimeframeClick={(token, tf)=>{onTimeframeClick("ftm",tf)}}
                    tokensArrayArray={"ftm" in tokensArrayObj ? tokensArrayObj["ftm"] : null}
                /> 
            </>}


        </group>
    )
}