import { AiFillEyeInvisible } from "react-icons/ai"
import { BiScatterChart } from "react-icons/bi"

export default function Component ({
    toggleOption, optsToggler,
}) {
    return (
        <div className="flex-col flex-align-stretch gap-2 ">
            <div className="flex-center ">
                <button onClick={()=>{toggleOption("floor")}}
                    style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                    className={` tx-center w-100   bord-r- px-2 opaci-chov--50 tx-lx pt-1
                        ${!optsToggler["floor"].bool
                            ? "bg-b-hov-20 opaci-25 border-white tx-gra"
                            : " tx-blue border-blue"
                        }
                    `}
                >
                    <AiFillEyeInvisible />
                </button>
            </div>

            <div className="flex-center ">
                <button onClick={()=>{toggleOption("services")}}
                    style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
                    className={` tx-center w-100   bord-r- px-2 opaci-chov--50 tx-lx pt-1
                        ${!optsToggler["services"].bool
                            ? "bg-b-hov-20 opaci-25 border-white tx-gra"
                            : " tx-blue border-blue"
                        }
                    `}
                >
                    <BiScatterChart />
                </button>
            </div>
        </div>
    )
}