import { BsArrowDown, BsSearch } from 'react-icons/bs'
import { useContext, useMemo, useRef, useState } from 'react';
import Link from 'next/link';


import ItemsTableRest from '@/src/items/molecules/table/ItemsTableRest';
import { AppContext } from '@/scripts/contexts/AppContext';

export default function Component({
    theArray, s__selectedId=(arg)=>{}, selectedId=null, displayConfigObj, updateSelectedArray=(id)=>{},
    boolConfig=[],urlBase="", headerStyle=null, tableStyle=null, actionCard=null,
}) {
    const _boolConfig = useMemo(() =>(boolConfig.join(",")),[boolConfig])
    const app = useContext(AppContext)
    const $divObj = useRef<HTMLDivElement>()
    const [isMenu, s__isMenu] = useState<number>(-1);



    return(<>
    <div className={` flex bord-r-t-8 ${!!headerStyle?"":"ims-border-faded ims-bg-lightest"} `} style={headerStyle}>
        {!displayConfigObj.key.isInvisible && <div className={`w-20 flex  py-3 px-4 tx-sm`}>
            <div className="opaci-50 "> {displayConfigObj.key.title} </div>
            <div className=" opaci-50 px-1"> <BsArrowDown /> </div>
        </div>}
        <div className={`flex-1 flex-center flex-justify-start tx-sm Q_md_x ${displayConfigObj.key.isInvisible?"px-3":""}`}>
            {Object.keys(displayConfigObj.rest).map((aKey, index)=>(
                <div className={`opaci-50  py-3 flex-1 `} key={aKey}> {displayConfigObj.rest[aKey].title} </div>
            ))}
        </div>        
        { _boolConfig.includes("isActionable") &&
            <div className="bord-r-8  flex-center px-3 pt-1 pb-3 ma-1 pos-rel ">
                <button className="tx-gray scale-200 invisible"> ...  </button>
            </div>
        }                            
    </div>
    <div className={`${!!tableStyle?"":"ims-border-faded "} `} style={tableStyle}>
        {theArray.map((item,index)=>{
            return (
            <div key={index} className={`pos-rel`}>
                {_boolConfig.includes("isSelectable") && 
                    <div className=' pos-abs  w-100 h-100 clickble  bg-b-10 paci-75   flex'>
                        <div className=' z-400 clickble  g-b-10 paci-75 opaci-chov--50  flex-1'>
                            <div className=' h-100 flex-center' onClick={()=>{ updateSelectedArray(item[displayConfigObj.key.name]) }}></div>
                        </div>                   
                        { _boolConfig.includes("isActionable") &&
                            <div className="flex-center px-3 pt-1 pb-3 ma-1 pos-rel noclick invisible">
                                <button className="tx-gray scale-200 "> ... </button>
                            </div>
                        }
                    </div>
                }
                <div
                    className={
                        `bloc pos-rel flex  flex-justify-start flex-align-center ${displayConfigObj.key.isInvisible?"px-3":""} `+
                        `${index == 0 || "ims-border-t-faded"}`
                    }
                >
                    <div  className="w-100 pos-rel " key={item[displayConfigObj.key.name]}>
                        <div className={`  opaci-cahov--50  Q_xs_sm_flex-col flex    pos-rel `}>
                            {!displayConfigObj.key.isInvisible && 
                                <Link href={`${urlBase}${item[displayConfigObj.key.name]}`}
                                    className={`flex-justify-start w-20 py-${_boolConfig.includes("isCompact")?1:3} opaci-cbhov--50 `}
                                >
                                    <div className=" " onClick={() => {s__selectedId(index)}}>
                                        <div className="px-3 flex">
                                            {selectedId == index && 
                                                <div className='opaci-75 pos-abs hover-1 mr-2'>
                                                    <div style={{transform:"translateX(-250%)"}}> <BsSearch/> </div>
                                                </div>
                                            }
                                            {item[displayConfigObj.key.name] == "5916-9759" ? "*" : ""}
                                            {item[displayConfigObj.key.name]}
                                        </div>
                                        <div className="Q_xs_md px-2 opaci-75 flex-1 py-2"></div>
                                    </div>
                                </Link>
                            }
                            <Link href={`${urlBase}${item[displayConfigObj.key.name]}`} className="flex-1 flex-center " >
                                <div className={`flex-1 flex-center `}
                                    onClick={() => {;s__selectedId(index)}}>
                                    <ItemsTableRest {...{displayConfigObj, item, _boolConfig}}  />
                                </div>
                            </Link>
                            { _boolConfig.includes("isActionable") &&
                                <div className={`bg-b-hov-10 bord-r-8  flex-center px-3 pt-1 ma-1 pos-rel pb-${_boolConfig.includes("isCompact")?0:3}`}
                                    onClick={()=>{s__isMenu(isMenu == index ? -1 : index );}}
                                >
                                    <button className={`tx-gray scale-200 pb-${_boolConfig.includes("isCompact")?1:0}`}>
                                        ... 
                                    </button>
                                
                                    { isMenu == index && actionCard && 
                                        <div className="z-100 pos-abs cursor  left-0 translate-x--100 translate-x--100 z-600 nowrap mt-2 px-2" 
                                            ref={$divObj}
                                        >                                    
                                            <div className='tx-mdl z-100 bg-white box-shadow-3 bord-r-8  w-100 autoverflow-y' >
                                                <div className="flex-col -min-100px pa-2 ">
                                                    {actionCard(item[displayConfigObj.key.name])}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>)}
        )}
    </div>
    </>)
}