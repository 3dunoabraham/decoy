import { SalesStatusBadgePlus } from '@/src/partials/unit/SalesStatusBadgePlus';
// ReactFunctionComponent
export default function Component ({
    item, displayConfigObj, _boolConfig
}) {
    return(
    <div className={` flex-1 py-${_boolConfig.includes("isCompact")?1:3}  Q_xs_sm_flex-col flex-row`}>
        {Object.keys(displayConfigObj.rest).map((aKey, index)=>{
            const theWidget = displayConfigObj.rest[aKey].widget
            return (
            <div key={index}
                className="w-20  flex-center flex-1  flex-justify-start"
            >
                <div className="Q_xs_md px-2 opaci-75 flex-1 py-2">
                    {displayConfigObj.rest[aKey].title}:
                </div>
                <div className="flex-1 ellipsis w-100 noverflow">
                    {(!theWidget) &&
                        item[displayConfigObj.rest[aKey].fieldName]
                    }
                    {(theWidget) == "label" &&
                        item[displayConfigObj.rest[aKey].fieldName]
                    }
                    {(theWidget) == "badge" && displayConfigObj.rest[aKey].fieldName && 
                        <SalesStatusBadgePlus
                            value={item[displayConfigObj.rest[aKey].fieldName]}
                            reference={[""]}
                        />
                    }
                    {(theWidget) == "keys" && displayConfigObj.rest[aKey].fieldName && 
                        <>
                            {item[displayConfigObj.rest[aKey].fieldName] != undefined && 
                                <>
                                    {Object.keys(JSON.parse(item[displayConfigObj.rest[aKey].fieldName])).join(",")}
                                </>
                            }
                        </>
                    }
                </div>
            </div>
            )
        })}
    </div>
    )
}